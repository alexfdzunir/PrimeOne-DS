import type { Line, Token } from './tokens';

/**
 * Minimal CSS highlighter for the AEM sources: comments, selectors, properties, custom properties, strings and
 * `var()`. Works line by line and keeps the state of block comments between lines.
 */
export function formatCss(source: string): Line[] {
  let inComment = false;
  let depth = 0;
  return source.split('\n').map((line) => {
    const tokens: Token[] = [];
    let rest = line;
    while (rest) {
      if (inComment) {
        const end = rest.indexOf('*/');
        const text = end < 0 ? rest : rest.slice(0, end + 2);
        tokens.push({ text, kind: 'comment' });
        rest = rest.slice(text.length);
        if (end >= 0) inComment = false;
        continue;
      }
      const match = /^(\s+)|^(\/\*)|^(['"][^'"]*['"])|^(--[\w-]+)(\s*:)?|^([a-z-]+)(\s*:)(?!:)|^(var|calc|rgb|linear-gradient|min|max)(?=\()|^([{};(),])|^([^\s{};(),'"/]+|\/)/i.exec(rest);
      if (!match) break;
      const [text, space, comment, string, custom, customColon, property, propertyColon, fn, punct, other] = match;
      if (space) tokens.push({ text: space, kind: 'ws' });
      else if (comment) {
        inComment = true;
        continue;
      } else if (string) tokens.push({ text: string, kind: 'string' });
      else if (custom) {
        tokens.push({ text: custom, kind: customColon ? 'attr' : 'binding' });
        if (customColon) tokens.push({ text: customColon, kind: 'punct' });
      } else if (property && depth > 0) tokens.push({ text: property, kind: 'attr' }, { text: propertyColon, kind: 'punct' });
      else if (fn) tokens.push({ text: fn, kind: 'keyword' });
      else if (punct) {
        if (punct === '{') depth++;
        if (punct === '}') depth = Math.max(0, depth - 1);
        tokens.push({ text: punct, kind: 'punct' });
      } else tokens.push({ text: property ? property + propertyColon : other, kind: depth > 0 ? 'string' : 'tag' });
      rest = rest.slice(text.length);
    }
    return tokens;
  });
}
