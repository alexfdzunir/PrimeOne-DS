import { indentToken, type Line, lineLength, textTokens, type Token } from './tokens';

/**
 * Turns the rendered story template into readable, copyable Angular code:
 * - the controls take their current values (strings as static attributes, the rest as bindings),
 * - the story wiring goes away (event recorders, demo triggers, `@if` on story args),
 * - it is printed Prettier-style (one element per line, attributes split past 80 columns).
 */

const MAX_WIDTH = 80;
const INDENT = 2;
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const BLOCKS = new Set(['if', 'else', 'for', 'empty', 'switch', 'case', 'default', 'defer', 'placeholder', 'loading', 'error']);

/** Story-only helpers of `src/stories/demo.ts`, replaced by what an app does instead. */
const DEMO_ELEMENTS: Record<string, string> = {
  'po-confirm-trigger': 'Se abre llamando a ConfirmationService.confirm() desde el componente',
  'po-toast-trigger': 'Se muestra llamando a MessageService.add() desde el componente',
  'po-terminal-responder': 'Responde con TerminalService: commandHandler y sendResponse()',
};

interface Attr {
  name: string;
  /** `undefined` for bare attributes such as `pInputText`. */
  value?: string;
}

type Node =
  | { type: 'element'; name: string; attrs: Attr[]; children: Node[]; selfClosing: boolean }
  | { type: 'text'; value: string }
  | { type: 'interp'; expr: string }
  | { type: 'comment'; value: string }
  | { type: 'block'; keyword: string; params?: string; children: Node[] }
  | { type: 'let'; source: string };

export interface SnippetContext {
  /** Current value of every story control (inputs and story args). */
  args: Record<string, unknown>;
  /** Names that can be resolved to a value. */
  controls: ReadonlySet<string>;
  /** Outputs recorded by the explorer: `(x)="x($event)"` bindings are story wiring. */
  events: ReadonlySet<string>;
  /** Story render props: computed flags (primitives) resolve like args; data stays as a reference. */
  props: Record<string, unknown>;
  /** Documented default of each control: a value equal to it is left out of the snippet. */
  defaults: ReadonlyMap<string, string>;
}

export function formatTemplate(template: string, context: SnippetContext): Line[] {
  const nodes = unwrapLayout(resolveNodes(parse(template), context));
  const lines: Line[] = [];
  printNodes(nodes, 0, lines);
  return lines;
}

// ---------------------------------------------------------------- parser

function parse(source: string): Node[] {
  const root: Node[] = [];
  const stack: { children: Node[]; element?: string; block?: boolean }[] = [{ children: root }];
  const top = () => stack[stack.length - 1];
  const insideBlock = () => stack.some((frame) => frame.block);
  let i = 0;

  const isBlockStart = (at: number) => {
    if (source[at] !== '@') return false;
    const word = /^@([a-z]+)/.exec(source.slice(at, at + 12));
    return !!word && (BLOCKS.has(word[1]) || word[1] === 'let');
  };
  const isTextEnd = (at: number) =>
    source[at] === '<' || source.startsWith('{{', at) || isBlockStart(at) || (source[at] === '}' && insideBlock());

  while (i < source.length) {
    if (source.startsWith('<!--', i)) {
      const end = source.indexOf('-->', i + 4);
      const stop = end < 0 ? source.length : end;
      top().children.push({ type: 'comment', value: source.slice(i + 4, stop).trim() });
      i = end < 0 ? source.length : end + 3;
    } else if (source.startsWith('</', i)) {
      const end = source.indexOf('>', i);
      const name = source.slice(i + 2, end < 0 ? source.length : end).trim();
      for (let k = stack.length - 1; k > 0; k--) {
        if (stack[k].element === name) {
          stack.length = k;
          break;
        }
      }
      i = end < 0 ? source.length : end + 1;
    } else if (source[i] === '<' && /[a-zA-Z]/.test(source[i + 1] ?? '')) {
      const { node, next } = parseElement(source, i);
      top().children.push(node);
      if (!node.selfClosing && !VOID.has(node.name)) stack.push({ children: node.children, element: node.name });
      i = next;
    } else if (source.startsWith('{{', i)) {
      const end = source.indexOf('}}', i + 2);
      const stop = end < 0 ? source.length : end;
      top().children.push({ type: 'interp', expr: source.slice(i + 2, stop).trim() });
      i = end < 0 ? source.length : end + 2;
    } else if (isBlockStart(i)) {
      const { node, next } = parseBlock(source, i);
      top().children.push(node);
      if (node.type === 'block') stack.push({ children: node.children, block: true });
      i = next;
    } else if (source[i] === '}' && insideBlock()) {
      while (stack.length > 1 && !top().block) stack.pop();
      if (stack.length > 1) stack.pop();
      i++;
    } else {
      let j = i + 1;
      while (j < source.length && !isTextEnd(j)) j++;
      top().children.push({ type: 'text', value: source.slice(i, j) });
      i = j;
    }
  }
  return root;
}

function parseElement(source: string, start: number): { node: Extract<Node, { type: 'element' }>; next: number } {
  let i = start + 1;
  const name = /^[^\s/>]+/.exec(source.slice(i))![0];
  i += name.length;
  const attrs: Attr[] = [];
  let selfClosing = false;
  while (i < source.length) {
    while (/\s/.test(source[i] ?? '')) i++;
    if (source.startsWith('/>', i)) {
      selfClosing = true;
      i += 2;
      break;
    }
    if (source[i] === '>') {
      i++;
      break;
    }
    const attrName = /^[^\s=>/]+|^\/(?!>)/.exec(source.slice(i))?.[0] ?? source[i];
    i += attrName.length;
    while (/\s/.test(source[i] ?? '')) i++;
    let value: string | undefined;
    if (source[i] === '=') {
      i++;
      while (/\s/.test(source[i] ?? '')) i++;
      const quote = source[i];
      if (quote === '"' || quote === "'") {
        const end = source.indexOf(quote, i + 1);
        value = source.slice(i + 1, end < 0 ? source.length : end);
        i = end < 0 ? source.length : end + 1;
      } else {
        value = /^[^\s>]+/.exec(source.slice(i))?.[0] ?? '';
        i += value.length;
      }
    }
    if (attrName !== '/') attrs.push({ name: attrName, value });
  }
  return { node: { type: 'element', name, attrs, children: [], selfClosing }, next: i };
}

function parseBlock(source: string, start: number): { node: Node; next: number } {
  let i = start + 1;
  let keyword = /^[a-z]+/.exec(source.slice(i))![0];
  i += keyword.length;
  if (keyword === 'let') {
    const end = source.indexOf(';', i);
    const stop = end < 0 ? source.length : end + 1;
    return { node: { type: 'let', source: source.slice(start, stop).trim() }, next: stop };
  }
  const elseIf = /^\s+if\b/.exec(source.slice(i));
  if (keyword === 'else' && elseIf) {
    keyword = 'else if';
    i += elseIf[0].length;
  }
  while (/\s/.test(source[i] ?? '')) i++;
  let params: string | undefined;
  if (source[i] === '(') {
    let depth = 0;
    let quote = '';
    const open = i;
    for (; i < source.length; i++) {
      const c = source[i];
      if (quote) {
        if (c === quote) quote = '';
      } else if (c === '"' || c === "'") quote = c;
      else if (c === '(') depth++;
      else if (c === ')' && --depth === 0) break;
    }
    params = source.slice(open + 1, i).trim();
    i++;
  }
  while (/\s/.test(source[i] ?? '')) i++;
  if (source[i] === '{') i++;
  return { node: { type: 'block', keyword, params, children: [] }, next: i };
}

// ---------------------------------------------------------------- resolution of the story args

function resolveNodes(nodes: Node[], context: SnippetContext): Node[] {
  const out: Node[] = [];
  for (let k = 0; k < nodes.length; k++) {
    const node = nodes[k];
    if (node.type === 'block' && node.keyword === 'if') {
      // `@if` chain: the node plus the `@else if` / `@else` blocks that follow it
      const chain: Extract<Node, { type: 'block' }>[] = [node];
      let next = k + 1;
      for (let j = k + 1; j < nodes.length; j++) {
        const sibling = nodes[j];
        if (sibling.type === 'text' && !sibling.value.trim()) continue;
        if (sibling.type === 'block' && (sibling.keyword === 'else' || sibling.keyword === 'else if')) {
          chain.push(sibling);
          next = j + 1;
          continue;
        }
        break;
      }
      const picked = pickBranch(chain, context);
      if (picked === 'unknown') {
        out.push(...chain.map((block) => ({ ...block, children: resolveNodes(block.children, context) })));
      } else if (picked) {
        out.push(...resolveNodes(picked.children, context));
      }
      k = next - 1;
      continue;
    }
    if (node.type === 'element') {
      const demo = DEMO_ELEMENTS[node.name];
      if (demo) {
        out.push({ type: 'comment', value: demo });
        continue;
      }
      if (node.name.startsWith('po-')) continue;
      const attrs = node.attrs.map((attr) => resolveAttr(attr, context)).filter((attr): attr is Attr => !!attr);
      const children = resolveNodes(node.children, context);
      // A template whose only content depended on story args is left out
      if (node.name === 'ng-template' && node.children.some(hasContent) && !children.some(hasContent)) continue;
      out.push({ ...node, attrs, children });
      continue;
    }
    if (node.type === 'interp') {
      const value = evaluate(node.expr, context);
      const printable = value === undefined || value === null || typeof value !== 'object';
      out.push(value === NOT_RESOLVED || !printable ? node : { type: 'text', value: value === undefined || value === null ? '' : String(value) });
      continue;
    }
    if (node.type === 'block') {
      out.push({ ...node, children: resolveNodes(node.children, context) });
      continue;
    }
    out.push(node);
  }
  return out;
}

/** Drops story layout wrappers: a lone `div` with only style/class attributes around a single element. */
function unwrapLayout(nodes: Node[]): Node[] {
  const content = nodes.filter(hasContent);
  if (content.length !== 1 || content[0].type !== 'element' || content[0].name !== 'div') return nodes;
  const wrapper = content[0];
  const layoutOnly = wrapper.attrs.every((attr) => /^(style|class|\[(style|class)(\.[^\]]+)?\])$/.test(attr.name));
  const children = wrapper.children.filter(hasContent);
  return layoutOnly && children.length === 1 && children[0].type === 'element' ? unwrapLayout(children) : nodes;
}

function hasContent(node: Node): boolean {
  return node.type !== 'text' || node.value.trim().length > 0;
}

/** First branch whose condition holds, `null` when none, `'unknown'` when a condition is not about story args. */
function pickBranch(chain: Extract<Node, { type: 'block' }>[], context: SnippetContext) {
  for (const block of chain) {
    if (block.keyword === 'else') return block;
    const result = evaluate(block.params ?? '', context);
    if (result === NOT_RESOLVED) return 'unknown';
    if (result) return block;
  }
  return null;
}

function resolveAttr(attr: Attr, context: SnippetContext): Attr | null {
  const value = attr.value?.trim();
  const event = /^\((\w+)\)$/.exec(attr.name);
  if (event && context.events.has(event[1]) && value === `${event[1]}($event)`) return null;

  const property = /^\[([^()[\]]+)\]$/.exec(attr.name);
  if (!property || value === undefined) return attr;
  const target = property[1];

  return resolveBinding(attr.name, target, value, context);
}

/** `[target]="expression"` with its current value, the branch in use of a ternary, or unchanged. */
function resolveBinding(name: string, target: string, expression: string, context: SnippetContext): Attr | null {
  const value = evaluate(expression, context);
  if (value !== NOT_RESOLVED) return isEmpty(value) || isDefault(target, value, context) ? null : literal(target, value);
  const ternary = splitTernary(unwrapParens(expression));
  if (ternary) {
    const condition = evaluate(ternary.condition, context);
    if (condition !== NOT_RESOLVED) return resolveBinding(name, target, condition ? ternary.whenTrue : ternary.whenFalse, context);
  }
  return { name, value: expression.trim() };
}

/** Same value as the documented default of the input. */
function isDefault(target: string, value: unknown, context: SnippetContext): boolean {
  const fallback = context.defaults.get(target);
  return fallback !== undefined && typeof value !== 'object' && String(value) === fallback;
}

/** Values that leave the input at its default, so the attribute is dropped. */
function isEmpty(value: unknown): boolean {
  return value === undefined || value === null || (Array.isArray(value) && value.length === 0);
}

/** Current value as a static attribute (strings) or a binding (anything else); `null` drops it. */
function literal(target: string, value: unknown): Attr | null {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string') {
    // `attr.x`, `class.x` and `style.x` only exist as bindings
    if (target.includes('.')) return { name: `[${target}]`, value: `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` };
    return { name: target, value: value.replace(/&/g, '&amp;').replace(/"/g, '&quot;') };
  }
  if (typeof value === 'boolean' || typeof value === 'number') return { name: `[${target}]`, value: String(value) };
  return { name: `[${target}]`, value: JSON.stringify(value).replace(/"/g, "'") };
}

const NOT_RESOLVED = Symbol('not-resolved');

function identifierValue(expression: string, context: SnippetContext): unknown {
  const name = expression.trim();
  if (!/^\w+$/.test(name)) return NOT_RESOLVED;
  if (context.controls.has(name)) return context.args[name];
  // Computed flags of the story (booleans, numbers) resolve; texts and data stay as references
  const prop = Object.prototype.hasOwnProperty.call(context.props, name) ? context.props[name] : NOT_RESOLVED;
  return prop === null || ['number', 'boolean', 'undefined'].includes(typeof prop) ? prop : NOT_RESOLVED;
}

/**
 * Evaluates the story wiring expressions on the current args: literals, arg names, `!`, `&&`, `||`, `??`,
 * `===`, `!==`, `==`, `!=`, `?:`, parentheses and array literals. Anything else (loop variables, data,
 * member access, calls) is `NOT_RESOLVED`, and so is any operation that depends on it.
 */
function evaluate(expression: string, context: SnippetContext): unknown {
  const tokens = tokenize(expression);
  if (!tokens) return NOT_RESOLVED;
  let pos = 0;
  const peek = () => tokens[pos];
  const accept = (value: string) => (tokens[pos] === value ? (pos++, true) : false);
  const fail = (): never => {
    throw NOT_RESOLVED;
  };

  const ternary = (): unknown => {
    const condition = coalesce();
    if (!accept('?')) return condition;
    const whenTrue = ternary();
    if (!accept(':')) fail();
    const whenFalse = ternary();
    return condition === NOT_RESOLVED ? NOT_RESOLVED : condition ? whenTrue : whenFalse;
  };
  const coalesce = (): unknown => {
    let left = or();
    while (accept('??')) {
      const right = or();
      left = left === NOT_RESOLVED ? NOT_RESOLVED : left ?? right;
    }
    return left;
  };
  const or = (): unknown => {
    let left = and();
    while (accept('||')) {
      const right = and();
      left = left === NOT_RESOLVED ? NOT_RESOLVED : left || right;
    }
    return left;
  };
  const and = (): unknown => {
    let left = equality();
    while (accept('&&')) {
      const right = equality();
      left = left === NOT_RESOLVED ? NOT_RESOLVED : left && right;
    }
    return left;
  };
  const equality = (): unknown => {
    let left = unary();
    for (let op = peek(); op === '===' || op === '!==' || op === '==' || op === '!='; op = peek()) {
      pos++;
      const right = unary();
      if (left === NOT_RESOLVED || right === NOT_RESOLVED) left = NOT_RESOLVED;
      else left = op === '===' ? left === right : op === '!==' ? left !== right : op === '==' ? left == right : left != right;
    }
    return left;
  };
  const unary = (): unknown => {
    if (accept('!')) {
      const value = unary();
      return value === NOT_RESOLVED ? NOT_RESOLVED : !value;
    }
    return primary();
  };
  const primary = (): unknown => {
    if (accept('(')) {
      const value = ternary();
      if (!accept(')')) fail();
      return value;
    }
    if (accept('[')) {
      const items: unknown[] = [];
      while (!accept(']')) {
        if (items.length && !accept(',')) fail();
        items.push(ternary());
      }
      return items.includes(NOT_RESOLVED) ? NOT_RESOLVED : items;
    }
    const token = peek();
    if (token === undefined) fail();
    pos++;
    const constant = parseLiteral(token);
    if (constant !== NOT_RESOLVED) return constant;
    if (/^[A-Za-z_$][\w$]*$/.test(token)) return identifierValue(token, context);
    return fail();
  };

  try {
    const value = ternary();
    return pos === tokens.length ? value : NOT_RESOLVED;
  } catch {
    return NOT_RESOLVED;
  }
}

/** `(a ? b : c)` -> `a ? b : c` when the parentheses wrap the whole expression. */
function unwrapParens(expression: string): string {
  let text = expression.trim();
  while (text.startsWith('(') && text.endsWith(')')) {
    let depth = 0;
    let wraps = true;
    for (let i = 0; i < text.length - 1; i++) {
      if (text[i] === '(') depth++;
      else if (text[i] === ')' && --depth === 0) {
        wraps = false;
        break;
      }
    }
    if (!wraps) break;
    text = text.slice(1, -1).trim();
  }
  return text;
}

/** Splits a top-level `condition ? a : b` (not `??` or `?.`), ignoring strings and brackets. */
function splitTernary(expression: string): { condition: string; whenTrue: string; whenFalse: string } | null {
  let depth = 0;
  let quote = '';
  let question = -1;
  let nested = 0;
  for (let i = 0; i < expression.length; i++) {
    const c = expression[i];
    if (quote) {
      if (c === quote && expression[i - 1] !== '\\') quote = '';
      continue;
    }
    if (c === "'" || c === '"') quote = c;
    else if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) depth--;
    else if (depth === 0 && c === '?') {
      if (expression[i + 1] === '?' || expression[i + 1] === '.') {
        i++;
        continue;
      }
      if (question < 0) question = i;
      else nested++;
    } else if (depth === 0 && c === ':' && question >= 0) {
      if (nested > 0) {
        nested--;
        continue;
      }
      return {
        condition: expression.slice(0, question).trim(),
        whenTrue: expression.slice(question + 1, i).trim(),
        whenFalse: expression.slice(i + 1).trim(),
      };
    }
  }
  return null;
}

/** Expression tokens, or `null` when the text uses syntax the evaluator does not cover. */
function tokenize(expression: string): string[] | null {
  const pattern = /\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?|[A-Za-z_$][\w$]*|===|!==|==|!=|&&|\|\||\?\?|[!?:()[\],])/y;
  const tokens: string[] = [];
  let last = 0;
  for (let match = pattern.exec(expression); match; match = pattern.exec(expression)) {
    tokens.push(match[1]);
    last = pattern.lastIndex;
  }
  return expression.slice(last).trim() ? null : tokens;
}

function parseLiteral(text: string): unknown {
  if (/^'[^']*'$|^"[^"]*"$/.test(text)) return text.slice(1, -1);
  if (/^-?\d+(\.\d+)?$/.test(text)) return Number(text);
  if (text === 'true' || text === 'false') return text === 'true';
  if (text === 'undefined') return undefined;
  if (text === 'null') return null;
  return NOT_RESOLVED;
}

// ---------------------------------------------------------------- printer

function isBinding(name: string): boolean {
  return /^[[(#*@]|^let-/.test(name);
}

function attrTokens(attr: Attr): Token[] {
  const tokens: Token[] = [{ text: attr.name, kind: isBinding(attr.name) ? 'binding' : 'attr' }];
  if (attr.value !== undefined) {
    tokens.push({ text: '="', kind: 'punct' });
    tokens.push(...textTokens(attr.value, isBinding(attr.name) && !attr.name.startsWith('#') ? 'expr' : 'string'));
    tokens.push({ text: '"', kind: 'punct' });
  }
  return tokens;
}

function openTag(node: Extract<Node, { type: 'element' }>, close: '>' | '/>'): Token[] {
  const tokens: Token[] = [{ text: '<', kind: 'punct' }, { text: node.name, kind: 'tag' }];
  for (const attr of node.attrs) tokens.push({ text: ' ', kind: 'ws' }, ...attrTokens(attr));
  tokens.push({ text: close === '/>' ? ' />' : '>', kind: 'punct' });
  return tokens;
}

function closeTag(name: string): Token[] {
  return [{ text: '</', kind: 'punct' }, { text: name, kind: 'tag' }, { text: '>', kind: 'punct' }];
}

function collapse(text: string): string {
  return text.replace(/\s+/g, ' ');
}

/** One-line rendering of a node, or `null` when it can only be printed on several lines. */
function inline(node: Node): Token[] | null {
  switch (node.type) {
    case 'text':
      return textTokens(collapse(node.value), 'text');
    case 'interp':
      return [{ text: '{{ ', kind: 'punct' }, { text: node.expr, kind: 'expr' }, { text: ' }}', kind: 'punct' }];
    case 'element': {
      const empty = !node.children.some(hasContent);
      if (empty) return node.selfClosing || VOID.has(node.name) ? openTag(node, node.selfClosing ? '/>' : '>') : [...openTag(node, '>'), ...closeTag(node.name)];
      const children = inlineChildren(node.children);
      return children ? [...openTag(node, '>'), ...children, ...closeTag(node.name)] : null;
    }
    default:
      return null;
  }
}

function inlineChildren(children: Node[]): Token[] | null {
  const tokens: Token[] = [];
  for (const child of children) {
    const rendered = inline(child);
    if (!rendered) return null;
    tokens.push(...rendered);
  }
  // trim the whitespace at the edges of the content
  while (tokens.length && tokens[0].kind === 'text' && !tokens[0].text.trim()) tokens.shift();
  while (tokens.length && tokens[tokens.length - 1].kind === 'text' && !tokens[tokens.length - 1].text.trim()) tokens.pop();
  if (tokens.length && tokens[0].kind === 'text') tokens[0] = { ...tokens[0], text: tokens[0].text.trimStart() };
  const last = tokens.length - 1;
  if (last >= 0 && tokens[last].kind === 'text') tokens[last] = { ...tokens[last], text: tokens[last].text.trimEnd() };
  return tokens;
}

function printNodes(nodes: Node[], indent: number, out: Line[]): void {
  for (const node of nodes) {
    switch (node.type) {
      case 'text':
        for (const text of wrap(collapse(node.value).trim(), MAX_WIDTH - indent)) out.push([...indentToken(indent), ...textTokens(text, 'text')]);
        break;
      case 'interp':
        out.push([...indentToken(indent), ...inline(node)!]);
        break;
      case 'comment':
        out.push([...indentToken(indent), { text: `<!-- ${node.value} -->`, kind: 'comment' }]);
        break;
      case 'let':
        out.push([...indentToken(indent), ...letTokens(node.source)]);
        break;
      case 'block': {
        // `} @else {` stays on the closing line of the previous branch
        if (out.length && node.keyword.startsWith('else') && isClosingBrace(out[out.length - 1])) {
          out[out.length - 1] = [...out[out.length - 1], { text: ' ', kind: 'ws' }, ...blockHeader(node)];
        } else {
          out.push([...indentToken(indent), ...blockHeader(node)]);
        }
        printNodes(node.children, indent + INDENT, out);
        out.push([...indentToken(indent), { text: '}', kind: 'punct' }]);
        break;
      }
      case 'element':
        printElement(node, indent, out);
        break;
    }
  }
}

/** Fills lines word by word up to `width` columns (a word longer than that keeps its own line). */
function wrap(text: string, width: number): string[] {
  const lines: string[] = [];
  let current = '';
  for (const word of text.split(' ').filter(Boolean)) {
    if (current && current.length + 1 + word.length > width) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function isClosingBrace(line: Line): boolean {
  const content = line.filter((token) => token.kind !== 'ws');
  return content.length === 1 && content[0].text === '}';
}

function blockHeader(node: Extract<Node, { type: 'block' }>): Token[] {
  const tokens: Token[] = [{ text: `@${node.keyword}`, kind: 'keyword' }];
  if (node.params !== undefined) tokens.push({ text: ' (', kind: 'punct' }, { text: node.params, kind: 'expr' }, { text: ')', kind: 'punct' });
  tokens.push({ text: ' {', kind: 'punct' });
  return tokens;
}

function letTokens(source: string): Token[] {
  const match = /^@let\s+(\w+)\s*=\s*([\s\S]*?);?$/.exec(source);
  if (!match) return [{ text: source, kind: 'expr' }];
  return [
    { text: '@let', kind: 'keyword' },
    { text: ' ', kind: 'ws' },
    { text: match[1], kind: 'binding' },
    { text: ' = ', kind: 'punct' },
    { text: match[2].trim(), kind: 'expr' },
    { text: ';', kind: 'punct' },
  ];
}

function printElement(node: Extract<Node, { type: 'element' }>, indent: number, out: Line[]): void {
  const oneLine = inline(node);
  if (oneLine && indent + lineLength(oneLine) <= MAX_WIDTH) {
    out.push([...indentToken(indent), ...oneLine]);
    return;
  }
  const empty = !node.children.some(hasContent);
  const selfClose = empty && (node.selfClosing || VOID.has(node.name));
  const close: '>' | '/>' = selfClose && node.selfClosing ? '/>' : '>';
  const single = openTag(node, close);
  if (indent + lineLength(single) <= MAX_WIDTH) {
    out.push([...indentToken(indent), ...single]);
  } else {
    out.push([...indentToken(indent), { text: '<', kind: 'punct' }, { text: node.name, kind: 'tag' }]);
    for (const attr of node.attrs) out.push([...indentToken(indent + INDENT), ...attrTokens(attr)]);
    out.push([...indentToken(indent), { text: close, kind: 'punct' }]);
  }
  if (selfClose) return;
  if (!empty) {
    const children = inlineChildren(node.children);
    if (children && indent + INDENT + lineLength(children) <= MAX_WIDTH) {
      out.push([...indentToken(indent + INDENT), ...children]);
    } else {
      printNodes(node.children, indent + INDENT, out);
    }
  }
  out.push([...indentToken(indent), ...closeTag(node.name)]);
}
