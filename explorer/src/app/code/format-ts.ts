import type { ComponentEntry } from '../model';
import type { Line, Token } from './tokens';

const KEYWORDS = new Set(['import', 'from', 'export', 'class', 'const', 'protected', 'readonly']);

/**
 * Standalone component that uses the snippet: the real imports of the story (PrimeNG, Angular and
 * `prime-one-ds`), with services in `providers` and design-token constants exposed to the template.
 */
export function formatTs(entry: ComponentEntry): Line[] {
  const imports = [...entry.codeImports];
  const angular = imports.findIndex((line) => line.endsWith("from '@angular/core';"));
  if (angular >= 0) imports[angular] = imports[angular].replace('import { ', 'import { Component, ');
  else imports.unshift("import { Component } from '@angular/core';");

  const components: string[] = [];
  const services: string[] = [];
  const constants: string[] = [];
  for (const line of entry.codeImports) {
    const names = (/\{([^}]+)\}/.exec(line)?.[1] ?? '').split(',').map((name) => name.trim()).filter(Boolean);
    for (const name of names) {
      if (/Service$/.test(name)) services.push(name);
      else if (/^[a-z]/.test(name)) constants.push(name);
      else components.push(name);
    }
  }

  const slug = entry.title
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .toLowerCase();
  const className = `${entry.title.replace(/[^a-zA-Z0-9]/g, '')}Example`;

  const source = [
    ...imports,
    '',
    '@Component({',
    `  selector: 'app-${slug}-example',`,
    `  imports: [${components.join(', ')}],`,
    ...(services.length ? [`  providers: [${services.join(', ')}],`] : []),
    `  templateUrl: './${slug}-example.html',`,
    '})',
    constants.length ? `export class ${className} {` : `export class ${className} {}`,
    ...constants.map((name) => `  protected readonly ${name} = ${name};`),
    ...(constants.length ? ['}'] : []),
  ];
  return source.map(tokenizeTs);
}

/** Minimal TypeScript highlighter for the generated lines. */
function tokenizeTs(line: string): Line {
  const tokens: Token[] = [];
  const pattern = /(\s+)|(\/\/.*$)|('(?:[^'\\]|\\.)*')|(@\w+)|([A-Za-z_$][\w$]*)(\s*:)?|(.)/g;
  for (const match of line.matchAll(pattern)) {
    const [, space, comment, string, decorator, identifier, colon, other] = match;
    if (space) tokens.push({ text: space, kind: 'ws' });
    else if (comment) tokens.push({ text: comment, kind: 'comment' });
    else if (string) tokens.push({ text: string, kind: 'string' });
    else if (decorator) tokens.push({ text: decorator, kind: 'keyword' });
    else if (identifier) {
      if (colon) tokens.push({ text: identifier, kind: 'attr' }, { text: colon, kind: 'punct' });
      else if (KEYWORDS.has(identifier)) tokens.push({ text: identifier, kind: 'keyword' });
      else tokens.push({ text: identifier, kind: /^[A-Z]/.test(identifier) ? 'tag' : 'text' });
    } else if (other) tokens.push({ text: other, kind: 'punct' });
  }
  return tokens;
}
