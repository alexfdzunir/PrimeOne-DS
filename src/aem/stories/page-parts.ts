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
export function section(content: string, options: { heading?: Parameters<typeof heading>[0]; secondary?: boolean; flush?: boolean; className?: string; id?: string } = {}): string {
  const head = options.heading ? `${indent(heading(options.heading), 4)}\n` : '';
  return `<section class="${cx('aem-section', options.secondary && 'aem-section--secondary', options.flush && 'aem-section--flush', options.className)}"${options.id ? ` id="${options.id}"` : ''}>
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

/** Shared images of the page templates (aem/pages/images). */
export const pageImg = (name: string, ext = 'webp') => `aem/pages/images/${name}.${ext}`;

let uid = 0;
const nextId = (prefix: string) => `${prefix}-${++uid}`;

/** Breadcrumb (inverse on the blue heroes). */
export function breadcrumb(items: string[], inverse = true): string {
  const last = items.length - 1;
  return `<nav class="${cx('aem-breadcrumb', 'aem-breadcrumb--sm', inverse && 'aem-breadcrumb--inverse')}" aria-label="Migas de pan">
  <ol class="aem-breadcrumb__list">
${items.map((c, i) => (i === last ? `    <li class="aem-breadcrumb__item"><span aria-current="page">${c}</span></li>` : `    <li class="aem-breadcrumb__item"><a class="aem-breadcrumb__link" href="#">${c}</a></li>`)).join('\n')}
  </ol>
</nav>`;
}

/** Hero module on the brand blue: breadcrumb, pretitle or tags, title, text and an optional block (key data, tiles, meta). */
export function hero(parts: { crumbs: string[]; title: string; pretitle?: string; text?: string; tags?: string[]; data?: [string, string][]; after?: string; extra?: string }): string {
  const tags = parts.tags ? `\n      <ul class="aem-tag-set">\n${parts.tags.map((t) => `        <li><span class="aem-category-tag">${t}</span></li>`).join('\n')}\n      </ul>` : '';
  const data = parts.data ? `\n    <dl class="aem-hero__data aem-glass">\n${parts.data.map(([dt, dd]) => `      <div><dt>${dt}</dt><dd>${dd}</dd></div>`).join('\n')}\n    </dl>` : '';
  return `<section class="aem-hero aem-brand">
  <div class="aem-hero__inner">
${indent(breadcrumb(parts.crumbs), 4)}
    <div class="aem-hero__content">${tags}${parts.pretitle ? `\n      <p class="aem-hero__pretitle">${parts.pretitle}</p>` : ''}
      <h1 class="aem-hero__title">${parts.title}</h1>${parts.text ? `\n      <p class="aem-hero__text">${parts.text}</p>` : ''}${parts.extra ? `\n      ${parts.extra}` : ''}
    </div>${data}${parts.after ? `\n${indent(parts.after, 4)}` : ''}
  </div>
</section>`;
}

/** Anchor menu of a long page. */
export function anchors(labels: string[]): string {
  return `<nav class="aem-anchor-menu" aria-label="En esta página">
  <ul class="aem-anchor-menu__list">
${labels.map((label, i) => `    <li><a class="aem-anchor-menu__link" href="#seccion-${i + 1}"${i === 0 ? ' aria-current="true"' : ''}>${label}</a></li>`).join('\n')}
  </ul>
</nav>`;
}

/** Rich text: paragraphs and an optional bullet list. */
export function richText(paragraphs: string[], bullets?: string[]): string {
  const list = bullets ? `\n  <ul class="aem-list">\n${bullets.map((b) => `    <li><span>${b}</span></li>`).join('\n')}\n  </ul>` : '';
  return `<div class="aem-rich-text">\n${paragraphs.map((p) => `  <p>${p}</p>`).join('\n')}${list}\n</div>`;
}

/** Download buttons. */
export function downloads(items: [string, string][]): string {
  return `<div class="aem-download-set">
${items.map(([label, meta]) => `  <a class="aem-download" href="#" download>${icon('file-arrow-down', 'aem-download__icon')}<span class="aem-download__text"><span class="aem-download__label">${label}</span><span class="aem-download__meta">${meta}</span></span></a>`).join('\n')}
</div>`;
}

/** Accordion (accordion.js); the first item open when `open` is true; [title, text, tag?]. */
export function accordion(items: [string, string, string?][], open = false): string {
  const id = nextId('aem-acc');
  return `<div class="aem-accordion" data-aem-accordion="single">
${items
  .map(
    ([title, text, tag], i) => `  <div class="aem-accordion__item">
    <h3 class="aem-accordion__heading">
      <button class="aem-accordion__trigger" type="button" id="${id}-h${i}" aria-expanded="${open && i === 0}" aria-controls="${id}-p${i}">
        <span class="aem-accordion__title">${title}${tag ? `<span class="aem-tag">${tag}</span>` : ''}</span>
        <span class="aem-accordion__toggle">${icon('plus')}${icon('minus')}</span>
      </button>
    </h3>
    <div class="aem-accordion__panel" id="${id}-p${i}" role="region" aria-labelledby="${id}-h${i}"${open && i === 0 ? '' : ' hidden'}>
      <p>${text}</p>
    </div>
  </div>`,
  )
  .join('\n')}
</div>`;
}

/** Data table with a header row; the first cell of each row is its header. */
export function table(head: string[], rows: string[][], caption?: string): string {
  return `<div class="aem-table-wrap">
  <table class="aem-table">${caption ? `\n    <caption>${caption}</caption>` : ''}
    <thead>
      <tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr>
    </thead>
    <tbody>
${rows.map((r) => `      <tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('\n')}
    </tbody>
  </table>
</div>`;
}

/** Featured figures: [value, unit, title, text]. */
export function figures(items: [string, string, string, string][]): string {
  return `<ul class="aem-featured-data">
${items.map(([v, u, t, x]) => `  <li class="aem-featured-data__item">\n    <p class="aem-featured-data__number">${v}${u ? `<span class="aem-featured-data__unit">${u}</span>` : ''}</p>\n    <h3 class="aem-featured-data__title">${t}</h3>${x ? `\n    <p class="aem-featured-data__text">${x}</p>` : ''}\n  </li>`).join('\n')}
</ul>`;
}

/** Profile list groups: [group title, [photo, role, name, text][]]. */
export function profiles(groups: [string, [string, string, string, string][]][]): string {
  return `<div class="aem-profiles">
${groups
  .map(
    ([title, people]) => `  <div class="aem-profiles__group">
    ${title ? `<h3 class="aem-profiles__title">${title}</h3>` : ''}
    <ul class="aem-profiles__list">
${people.map(([photo, role, name, text]) => `      <li class="aem-profile">\n        <span class="aem-profile__photo">${photo ? `<img src="${photo}" alt="" loading="lazy" />` : `<span class="aem-placeholder">${icon('user')}</span>`}</span>\n        <div class="aem-profile__body">\n          <p class="aem-profile__role">${role}</p>\n          <p class="aem-profile__name"><a href="#">${name}</a></p>${text ? `\n          <p class="aem-profile__text">${text}</p>` : ''}\n        </div>\n      </li>`).join('\n')}
    </ul>
  </div>`,
  )
  .join('\n')}
</div>`;
}

/** Five stars. */
export const stars = (label = '5 de 5') => `<p class="aem-stars" role="img" aria-label="${label}">${icon('star', '', 'fill').repeat(5)}</p>`;

/** Reviews with the average. */
export function reviews(average: string, note: string, items: [string, string][]): string {
  return `<div class="aem-reviews">
  <div class="aem-reviews__summary">
    ${stars()}
    <p class="aem-reviews__average">${average}</p>
    <p class="aem-reviews__note">${note}</p>
  </div>
  <ul class="aem-reviews__list">
${items.map(([quote, name]) => `    <li><figure class="aem-review"><blockquote class="aem-review__quote">${quote}</blockquote><figcaption>${stars()}<cite class="aem-review__name">${name}</cite></figcaption></figure></li>`).join('\n')}
  </ul>
</div>`;
}

/** Testimonial carousel: [quote, name, role, photo][]. */
export function testimonials(items: [string, string, string, string?][]): string {
  return carousel(
    items.map(
      ([quote, name, role, photo]) => `<figure class="aem-testimonial">
  <blockquote class="aem-testimonial__quote">${quote}</blockquote>
  <figcaption class="aem-testimonial__profile">
    <span class="aem-testimonial__photo">${photo ? `<img src="${photo}" alt="" loading="lazy" />` : `<span class="aem-placeholder">${icon('user')}</span>`}</span>
    <span class="aem-testimonial__who"><cite class="aem-testimonial__name">${name}</cite><span class="aem-testimonial__role">${role}</span></span>
  </figcaption>
</figure>`,
    ),
    'Testimonios',
  ).replace('class="aem-carousel"', 'class="aem-carousel aem-testimonials"');
}

/** Programme card (card-product): [image, pretitle, title, tags]. */
export function programCard(image: string, pretitle: string, title: string, tags: string[], filter?: string): string {
  return `<article class="aem-card aem-card--product aem-card--secondary"${filter ? ` data-aem-filter="${filter}"` : ''}>
  <div class="aem-card__media"><img src="${image}" alt="" loading="lazy" /></div>
  <div class="aem-card__body">
    <div class="aem-card__text">
      <p class="aem-card__pretitle">${pretitle}</p>
      <h3 class="aem-card__title"><a class="aem-card__link" href="#">${title}</a></h3>
    </div>
    <ul class="aem-tag-set">${tags.map((t) => `<li><span class="aem-category-tag">${t}</span></li>`).join('')}</ul>
  </div>
</article>`;
}

/** Sidebar request form of the programme pages. */
export function formPanel(promo: [string, string, boolean?][]): string {
  const field = (label: string, type = 'text', half = false, iconName = '') =>
    `<div class="${cx('aem-field-host', 'aem-input', half && 'aem-form-panel__half')}"><label class="aem-field"><span class="aem-field__control"><input class="aem-field__input" type="${type}" placeholder=" " /><span class="aem-field__label">${label}</span></span>${iconName ? icon(iconName, 'aem-field__icon') : ''}</label></div>`;
  const select = (label: string, value = '', half = false) =>
    `<div class="${cx('aem-field-host', 'aem-dropdown', half && 'aem-form-panel__half')}" data-aem-dropdown><button class="aem-field aem-dropdown__trigger${value ? ' has-value' : ''}" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="aem-field__control"><span class="aem-dropdown__value" data-aem-dropdown-value>${value}</span><span class="aem-field__label">${label}</span></span>${icon('caret-down', 'aem-dropdown__caret')}</button></div>`;
  return `<div class="aem-form-panel">
  <ul class="aem-form-panel__promo">
${promo.map(([name, label, hl]) => `    <li${hl ? ' class="is-highlight"' : ''}>${icon(name)} ${label}</li>`).join('\n')}
  </ul>
  <form class="aem-form-panel__body" action="#">
    <h2 class="aem-form-panel__title">Solicita información</h2>
    <div class="aem-form-panel__fields">
      ${field('Nombre')}
      ${field('Apellidos')}
      ${field('Fecha de nacimiento', 'text', false, 'calendar-blank')}
      ${field('Email', 'email')}
      ${select('País', 'España', true)}
      ${field('Código postal', 'text', true)}
      ${select('Nivel de estudios')}
      <div class="aem-field-host aem-input aem-input--phone"><div class="aem-input__row"><span class="aem-field aem-input__prefix">+34</span><label class="aem-field"><span class="aem-field__control"><input class="aem-field__input" type="tel" placeholder=" " /><span class="aem-field__label">Teléfono</span></span></label></div></div>
    </div>
    <p class="aem-form__legal" tabindex="0">UNIVERSIDAD INTERNACIONAL DE LA RIOJA, S.A.U. (en adelante, "UNIR"), tratará los datos de carácter personal que usted ha proporcionado con la finalidad de: atender a su solicitud de información, reclamación, duda o sugerencia que realice sobre los productos y/o servicios ofrecidos por UNIR, incluido por vía telefónica, o a través de WhatsApp, así como para mantenerle informado de nuestra actividad.</p>
    <button class="aem-button" type="submit">Solicita información</button>
  </form>
</div>`;
}

/** Glass tiles of the distributor hero: [icon, label][]. */
export function heroTiles(items: [string, string][]): string {
  return `<ul class="aem-hero__tiles">
${items.map(([name, label]) => `  <li><a class="aem-hero__tile aem-glass" href="#">${icon(name)}<span>${label}</span></a></li>`).join('\n')}
</ul>`;
}

/** Tabs bar used as the navigation of a section of the portal (the first tab selected). */
export function tabsNav(labels: string[]): string {
  const id = nextId('aem-tabs');
  return `<div class="aem-tabs aem-tabs--bar">
  <div class="aem-tabs__list" role="tablist" aria-label="Secciones">
${labels.map((label, i) => `    <button class="aem-tabs__tab" type="button" role="tab" id="${id}-t${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${label}</button>`).join('\n')}
  </div>
</div>`;
}

/** Event card (Surface Fill=Empty): image with the date tag, title, text and tags. */
export function eventCard(image: string | true, date: { day: string; month: string; year: string; state?: 'online' | 'presencial' | 'finalizado' }, title: string, text: string, tags: string[]): string {
  const state = date.state ?? 'online';
  const label = { online: 'Online', presencial: 'Presencial', finalizado: 'Finalizado' }[state];
  const tag = `<div class="${cx('aem-date-tag', state === 'finalizado' && 'aem-date-tag--past')}"><span class="aem-state-tag aem-state-tag--${state}">${label}</span><span class="aem-date-tag__date"><span class="aem-date-tag__day">${date.day}</span><span class="aem-date-tag__meta"><span class="aem-date-tag__month">${date.month}</span><span class="aem-date-tag__time">${date.year}</span></span></span></div>`;
  return card({ title, text, fill: 'empty', image, overlay: tag, tags });
}

/** Pagination (pagination.js builds the page buttons). */
export function pagination(page: number, pages: number): string {
  return `<nav class="aem-pagination" aria-label="Paginación" data-pages="${pages}" data-page="${page}">
  <ul class="aem-pagination__list">
    <li><button class="aem-button aem-button--ghost aem-button--sm aem-button--icon-only" type="button" aria-label="Página anterior" data-aem-page="prev">${icon('caret-left', 'aem-button__icon')}</button></li>
    <li><button class="aem-button aem-button--ghost aem-button--sm aem-button--icon-only" type="button" aria-label="Página siguiente" data-aem-page="next">${icon('caret-right', 'aem-button__icon')}</button></li>
  </ul>
</nav>`;
}

/** Newsletter banner (banner contact): heading beside the subscription form. */
export function newsletter(title: string, text: string): string {
  const input = (label: string, type = 'text') => `<div class="aem-field-host aem-input"><label class="aem-field"><span class="aem-field__control"><input class="aem-field__input" type="${type}" placeholder=" " /><span class="aem-field__label">${label}</span></span></label></div>`;
  return `<div class="aem-banner aem-banner--contact">
${indent(heading({ title, text }), 2)}
  <form class="aem-banner__contact aem-form" action="#">
    ${input('Nombre')}
    ${input('Apellidos')}
    <div class="aem-form__full">${input('Email', 'email')}</div>
    <label class="aem-checkbox__item aem-form__full"><input class="aem-checkbox__input" type="checkbox" /><span class="aem-checkbox__box">${icon('check', 'aem-checkbox__check', 'bold')}${icon('minus', 'aem-checkbox__minus', 'bold')}</span><span>Deseo recibir información, también por WhatsApp, de UNIR y otras empresas educativas del Grupo Proeduca.</span></label>
    <p class="aem-form__legal aem-form__full" tabindex="0">UNIVERSIDAD INTERNACIONAL DE LA RIOJA, S.A.U. (en adelante, "UNIR"), tratará los datos de carácter personal que usted ha proporcionado con la finalidad de: atender a su solicitud de información, reclamación, duda o sugerencia que realice sobre los productos y/o servicios ofrecidos por UNIR.</p>
    <button class="aem-button aem-form__full" type="submit">Suscríbete gratis</button>
  </form>
</div>`;
}

/** Overlapping speaker photos for a caption. */
export const speakers = (photos: string[]) => `<span class="aem-avatar-group">${photos.map((p) => `<span class="aem-avatar"><img src="${p}" alt="" /></span>`).join('')}</span>`;

/** Tabs of the magazine: the portal areas. */
export const MAGAZINE_TABS = ['Portada', 'Educación', 'Derecho', 'Ciencias Políticas y RRII', 'Empresa', 'Marketing', 'Ingeniería', 'Diseño', 'Artes', 'Música', 'Humanidades', 'Salud', 'CC. Sociales'];

/** Closing sections shared by the listing pages: educational proposal and videos. */
export const closing = () => [
  section(
    grid(
      (
        [
          ['monitor', 'Docencia 100% Online', 'Nuestra metodología te permite estudiar sin desplazarte mediante un modelo de aprendizaje personalizado'],
          ['chalkboard-teacher', 'Clases en directo', 'Nuestros profesores imparten 4.000 horas de clases online a la semana. Puedes asistir en directo o verlas en otro momento'],
          ['users', 'Mentor - UNIR', 'En UNIR nunca estarás solo. Un tutor realizará un seguimiento individualizado y te ayudará en todo lo que necesites'],
        ] as [string, string, string][]
      ).map(([name, title, text]) => card({ icon: name, title, text })),
      '20rem',
    ),
    { flush: true, heading: { title: 'UNIR, una propuesta educativa única' } },
  ),
  section(
    grid(
      (
        [
          ['video-fuerza-2', 'La fuerza que necesitas'],
          ['video-graduacion-2', 'Graduación España 2024'],
          ['video-acompanamiento-2', 'Acompañamiento personalizado'],
        ] as [string, string][]
      ).map(([file, title]) => card({ title, fill: 'image', image: pageImg(file), play: true, mediaHeight: '28.3125rem' })),
      '20rem',
    ),
    { flush: true, heading: { title: 'Conoce UNIR' } },
  ),
];

/** Hero of a news page: breadcrumb, category, title and the author, date and share row. */
export function newsHero(crumbs: string[], category: string, title: string, author: string, date: string): string {
  return hero({
    crumbs,
    pretitle: category.toUpperCase(),
    title,
    after: `<div class="aem-hero__byline">
  <span>${author} <span aria-hidden="true">|</span> ${icon('calendar-blank')} ${date}</span>
  <button class="aem-link-button aem-link-button--inverse" type="button">Compártelo ${icon('export')}</button>
</div>`,
  });
}

/** Share banner of an article. */
export function shareBanner(label: string): string {
  return `<div class="aem-share">
  <p class="aem-share__label">${label}</p>
  <ul class="aem-share__links">
${(
  [
    ['facebook-logo', 'Facebook'],
    ['x-logo', 'X'],
    ['linkedin-logo', 'LinkedIn'],
    ['whatsapp-logo', 'WhatsApp'],
  ] as [string, string][]
)
  .map(([name, net]) => `    <li><a class="aem-button aem-button--ghost aem-button--icon-only" href="#" aria-label="Compartir en ${net}">${icon(name, 'aem-button__icon')}</a></li>`)
  .join('\n')}
    <li><button class="aem-button aem-button--ghost aem-button--icon-only aem-share__copy" type="button" aria-label="Copiar enlace" data-aem-share-copy>${icon('link', 'aem-button__icon')}</button></li>
  </ul>
</div>`;
}

/** Sidebar form of a news page (Figma form_contextual_portal Type=Noticia). */
export function newsFormPanel(): string {
  return formPanel([])
    .replace(/\s*<ul class="aem-form-panel__promo">\s*<\/ul>/, '')
    .replace(/\s*<div class="aem-field-host aem-input"><label class="aem-field"><span class="aem-field__control"><input class="aem-field__input" type="text" placeholder=" " \/><span class="aem-field__label">Fecha de nacimiento<\/span>.*?<\/div>/, '')
    .replace('<span class="aem-field__label">Código postal</span>', '<span class="aem-field__label">Provincia</span>')
    .replace('<div class="aem-form-panel__fields">', `<div class="aem-form-panel__fields">
      <div class="aem-field-host aem-dropdown" data-aem-dropdown><button class="aem-field aem-dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="aem-field__control"><span class="aem-dropdown__value" data-aem-dropdown-value></span><span class="aem-field__label">Tipo de estudios</span></span>${icon('caret-down', 'aem-dropdown__caret')}</button></div>
      <div class="aem-field-host aem-dropdown" data-aem-dropdown><button class="aem-field aem-dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="aem-field__control"><span class="aem-dropdown__value" data-aem-dropdown-value></span><span class="aem-field__label">Título que te interesa</span></span>${icon('caret-down', 'aem-dropdown__caret')}</button></div>`);
}

/** Tabs of the news section. */
export const NEWS_TABS = ['Toda la actualidad', 'Vida Académica', 'Estudiantes', 'Profesores', 'Investigación', 'Internacional', 'RSC', 'Cultura'];

/** Group of checkboxes in a filter sidebar: [label, checked][]. */
export function filterGroup(title: string, options: [string, boolean?][]): string {
  return `<details class="aem-listing__group" open>
  <summary>${title} ${icon('caret-up')}</summary>
  <fieldset class="aem-checkbox aem-checkbox--sm">
    <legend class="aem-visually-hidden">${title}</legend>
${options.map(([label, checked]) => `    <label class="aem-checkbox__item"><input class="aem-checkbox__input" type="checkbox"${checked ? ' checked' : ''} /><span class="aem-checkbox__box">${icon('check', 'aem-checkbox__check', 'bold')}${icon('minus', 'aem-checkbox__minus', 'bold')}</span><span>${label}</span></label>`).join('\n')}
  </fieldset>
</details>`;
}

/** Row of filters with search (Figma "filters_module", Type=Row): [label, icon][]. */
export function filterRow(filters: string[]): string {
  return `<div class="aem-section" style="padding-block: 0"><div class="aem-section__inner aem-filter-module"><div class="aem-filter-module__bar">
  <button class="aem-button aem-button--secondary aem-button--icon-only" type="button" aria-label="Buscar">${icon('magnifying-glass', 'aem-button__icon')}</button>
${filters.map((label) => `  <div class="aem-filter" data-aem-dropdown><button class="aem-field aem-filter__trigger" type="button" aria-haspopup="listbox" aria-expanded="false"><span>${label}</span>${icon('caret-down', 'aem-filter__caret')}</button></div>`).join('\n')}
</div></div></div>`;
}

/** People grid: [photo, role, name][]. */
export function people(items: [string, string, string][]): string {
  return `<ul class="aem-people">
${items.map(([photo, role, name]) => `  <li><span class="aem-profile__photo"><img src="${photo}" alt="" loading="lazy" /></span>${role ? `<p class="aem-profile__role">${role}</p>` : ''}<p class="aem-profile__name"><a href="#">${name}</a></p></li>`).join('\n')}
</ul>`;
}
