/** Highlighted code: each line is a list of tokens whose `kind` picks the colour. */
export type TokenKind =
  | 'ws'
  | 'punct'
  | 'tag'
  | 'attr'
  | 'binding'
  | 'string'
  | 'expr'
  | 'keyword'
  | 'text'
  | 'entity'
  | 'comment';

export interface Token {
  text: string;
  kind: TokenKind;
}

export type Line = Token[];

export function linesToText(lines: Line[]): string {
  return lines.map((line) => line.map((token) => token.text).join('')).join('\n');
}

export function lineLength(tokens: Token[]): number {
  return tokens.reduce((total, token) => total + token.text.length, 0);
}

export function indentToken(indent: number): Token[] {
  return indent > 0 ? [{ text: ' '.repeat(indent), kind: 'ws' }] : [];
}

/** Splits text so HTML entities (`&quot;`, `&#39;`...) get their own colour. */
export function textTokens(text: string, kind: TokenKind): Token[] {
  const tokens: Token[] = [];
  const entity = /&(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);/g;
  let last = 0;
  for (const match of text.matchAll(entity)) {
    if (match.index > last) tokens.push({ text: text.slice(last, match.index), kind });
    tokens.push({ text: match[0], kind: 'entity' });
    last = match.index + match[0].length;
  }
  if (last < text.length) tokens.push({ text: text.slice(last), kind });
  return tokens;
}
