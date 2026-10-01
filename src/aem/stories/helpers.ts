/** Helpers of the AEM stories: they build plain HTML (no Angular syntax), the markup a portal component outputs. */

/** Class list without the falsy entries: `cx('aem-chip', selected && 'is-selected')`. */
export function cx(...classes: (string | number | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Attribute list for a tag: `attrs({ type: 'button', disabled: true, 'aria-label': label })`. */
export function attrs(values: Record<string, string | number | boolean | null | undefined>): string {
  return Object.entries(values)
    .filter(([, value]) => value !== false && value !== null && value !== undefined && value !== '')
    .map(([name, value]) => (value === true ? name : `${name}="${String(value).replace(/"/g, '&quot;')}"`))
    .join(' ');
}

/** Indents every line of an HTML block, for readable nested snippets. */
export function indent(html: string, spaces = 2): string {
  const pad = ' '.repeat(spaces);
  return html
    .split('\n')
    .map((line) => (line ? pad + line : line))
    .join('\n');
}

/** Phosphor icon (the icon set of the AEM Figma file), decorative. */
export function icon(name: string, className = '', weight: 'regular' | 'bold' | 'fill' = 'regular'): string {
  const base = weight === 'regular' ? 'ph' : `ph-${weight}`;
  return `<i class="${cx(base, `ph-${name}`, className)}" aria-hidden="true"></i>`;
}

const FIGMA = 'https://www.figma.com/design/hT9BgF8wE5lXM54ldUcy9H/Design-System---AEM-Portales?node-id=';

/** Link to a node of the AEM Portales Figma file (`8512:12742`). */
export function figmaNode(id: string): string {
  return FIGMA + id.replace(':', '-');
}
