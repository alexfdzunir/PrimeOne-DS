import type { Meta } from '@storybook/angular';
import { cx, heading, icon, indent } from './helpers';

/** HTML of a module story with its default args (plus overrides), to compose the page templates. */
export function moduleHtml(meta: Meta, args: Record<string, unknown> = {}): string {
  const render = meta.render as unknown as (values: Record<string, unknown>) => { template: string };
  return render({ ...meta.args, ...args }).template;
}

/** Link to a frame of the Figma file of the page templates. */
export function pagesFigma(id: string): string {
  return `https://www.figma.com/design/YgIL4otUrbrMOM9ibtxkjT/Pages---Templates---Design-System---AEM?node-id=${id.replace(':', '-')}`;
}

/** Section module: heading plus content, primary (default) or secondary background; `flush` drops the top padding (Padding Top=False in Figma, after a section of the same fill). */
export function section(content: string, options: { heading?: Parameters<typeof heading>[0]; secondary?: boolean; flush?: boolean; className?: string } = {}): string {
  const head = options.heading ? `${indent(heading(options.heading), 4)}\n` : '';
  return `<section class="${cx('aem-section', options.secondary && 'aem-section--secondary', options.flush && 'aem-section--flush', options.className)}">
  <div class="aem-section__inner">
${head}${indent(content, 4)}
  </div>
</section>`;
}

/** Carousel (carousel.js) with progress bar and arrows. */
export function carousel(items: string[], label: string): string {
  return `<div class="aem-carousel" data-aem-carousel>
  <div class="aem-carousel__track" tabindex="0" aria-label="${label}">
${indent(items.join('\n'), 4)}
  </div>
  <div class="aem-carousel__controls">
    <span class="aem-carousel__progress"><span class="aem-carousel__bar"></span></span>
    <button class="aem-carousel__prev" type="button" aria-label="Anterior">${icon('arrow-left')}</button>
    <button class="aem-carousel__next" type="button" aria-label="Siguiente">${icon('arrow-right')}</button>
  </div>
</div>`;
}

/** Card (card-master): optional image, pretitle, linked title, text and footer link or tags. */
export function card(parts: {
  title?: string;
  pretitle?: string;
  text?: string;
  /** Image URL (or true for the brand placeholder). */
  image?: string | boolean;
  /** Caption over the bottom of the image. */
  caption?: string;
  /** Extra markup over the image (date tag, info tag). */
  overlay?: string;
  /** Image height, as `--aem-card-media-height`. */
  mediaHeight?: string;
  link?: string;
  tags?: string[];
  icon?: string;
  /** Logo image in place of the icon. */
  logo?: [src: string, alt: string];
  play?: boolean;
  fill?: 'secondary' | 'empty' | 'image';
  size?: 'lg';
}): string {
  const picture = typeof parts.image === 'string' ? `\n    <img src="${parts.image}" alt="" loading="lazy" />` : '';
  const extras = [
    parts.overlay && `\n    ${parts.overlay}`,
    parts.caption && `\n    <p class="aem-card__caption">${parts.caption}</p>`,
    parts.play && `\n    <button class="aem-media-button aem-card__play" type="button" aria-label="Reproducir vídeo">${icon('play', '', 'fill')}</button>`,
  ].filter(Boolean).join('');
  const media = parts.image ? `  <div class="${cx('aem-card__media', parts.image === true && 'aem-card__media--placeholder')}">${picture}${extras}\n  </div>\n` : '';
  const lines = [
    parts.icon && `      ${icon(parts.icon, 'aem-card__icon')}`,
    parts.logo && `      <img class="aem-card__logo" src="${parts.logo[0]}" alt="${parts.logo[1]}" loading="lazy" />`,
    parts.pretitle && `      <p class="aem-card__pretitle">${parts.pretitle}</p>`,
    parts.title && `      <h3 class="aem-card__title"><a class="aem-card__link" href="#">${parts.title}</a></h3>`,
    parts.text && `      <p class="aem-card__description">${parts.text}</p>`,
  ].filter(Boolean);
  const footer = parts.tags
    ? `\n    <div class="aem-card__footer">\n      <ul class="aem-tag-set">\n${parts.tags.map((tag) => `        <li><span class="aem-category-tag">${tag}</span></li>`).join('\n')}\n      </ul>\n    </div>`
    : parts.link
      ? `\n    <div class="aem-card__footer">\n      <span class="aem-link-button aem-link-button--sm">${parts.link}</span>\n    </div>`
      : '';
  const style = parts.mediaHeight ? ` style="--aem-card-media-height: ${parts.mediaHeight}"` : '';
  return `<article class="${cx('aem-card', parts.size === 'lg' && 'aem-card--lg', parts.fill && `aem-card--${parts.fill}`)}"${style}>
${media}  <div class="aem-card__body">
    <div class="aem-card__text">
${lines.join('\n')}
    </div>${footer}
  </div>
</article>`;
}

/** Grid of cards (`aem-grid`), each one in a list item. */
export function grid(items: string[], min?: string): string {
  return `<ul class="aem-grid"${min ? ` style="--aem-grid-min: ${min}"` : ''}>
${items.map((item) => `  <li>\n${indent(item, 4)}\n  </li>`).join('\n')}
</ul>`;
}
