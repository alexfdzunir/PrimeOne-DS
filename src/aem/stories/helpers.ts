import { UNIR_LOGO_MARK, UNIR_LOGO_TAGLINE } from '../../stories/unir-logo';
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


/** UNIR horizontal logo as inline SVG (`.aem-logo`; white with --inverse). */
export function unirLogo(className = ''): string {
  return `<svg class="${cx('aem-logo', className)}" viewBox="0 0 166 32" role="img" aria-label="UNIR, Universidad Internacional de La Rioja"><path class="aem-logo__tagline" fill-rule="evenodd" clip-rule="evenodd" d="${UNIR_LOGO_TAGLINE}"/><path class="aem-logo__mark" d="${UNIR_LOGO_MARK}"/></svg>`;
}

/** Shared module heading (pretitle, title, second headline, text and link). Empty parts are left out. */
export function heading(parts: { pretitle?: string; title?: string; subtitle?: string; text?: string; link?: string; level?: number }): string {
  const level = parts.level ?? 2;
  const titles = [parts.pretitle && `    <p class="aem-heading__pretitle">${parts.pretitle}</p>`, parts.title && `    <h${level} class="aem-heading__title">${parts.title}</h${level}>`].filter(Boolean);
  const body = [parts.subtitle && `    <h${level + 1} class="aem-heading__subtitle">${parts.subtitle}</h${level + 1}>`, parts.text && `    <p class="aem-heading__text">${parts.text}</p>`].filter(Boolean);
  const link = parts.link ? `\n  <a class="aem-link-button" href="#">${parts.link} ${icon('caret-right')}</a>` : '';
  return `<div class="aem-heading">
  <div class="aem-heading__titles">
${titles.join('\n')}
  </div>${body.length ? `\n  <div class="aem-heading__body">\n${body.join('\n')}\n  </div>` : ''}${link}
</div>`;
}
