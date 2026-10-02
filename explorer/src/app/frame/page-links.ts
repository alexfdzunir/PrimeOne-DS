/*
 * AEM page templates: links between pages. The templates keep `href="#"` (their code is the real markup); in the
 * explorer each link, button or card that has a matching template points to it (`data-po-page`), and a click on it
 * opens that page in the explorer.
 */

/** Rules on the visible text, first match wins. */
type Rules = [RegExp, string][];

const BREADCRUMB: Rules = [
  [/^Inicio$/, 'home'],
  [/^Educación$/, 'area-estudio'],
  [/^Facultades$/, 'facultad'],
  [/^Revista/, 'revista'],
  [/^Ciencias de la salud$/i, 'revista-categoria'],
  [/^Noticias$/, 'actualidad'],
  [/^(Eventos|Seminarios)$/, 'eventos'],
  [/^Profesores$/, 'profesores'],
  [/^Becas/, 'becas'],
  [/^Estudiar en UNIR$/i, 'faqs'],
  [/^(Máster|MBA|Formación del Profesorado)/, 'ficha-mba'],
];

const HEADER: Rules = [
  [/^Grados$/, 'area-estudio'],
  [/^Másteres$|Buscar titulación/, 'distributiva'],
  [/^Estudiar en UNIR$/, 'becas'],
  [/^La Universidad$/, 'facultad'],
];

const FOOTER: Rules = [
  [/^Facultades$/, 'facultad'],
  [/^Actualidad$/, 'actualidad'],
  [/^UNIR Revista$|^Sala de prensa$/, 'revista'],
  [/^Nuestro Equipo$/, 'profesores'],
  [/^Contacto$/, 'faqs'],
  [/^Grados$/, 'area-estudio'],
  [/^(Másteres|Experto|Doctorados|Postgrados|Cursos)/, 'distributiva'],
];

/** Link buttons and buttons. */
const ACTIONS: Rules = [
  [/^Ir a la web$/, 'home'],
  [/eventos/i, 'eventos'],
  [/artículos/i, 'revista-categoria'],
  [/noticias/i, 'actualidad'],
  [/profesores|claustro/i, 'profesores'],
  [/dicen de nosotros|opiniones/i, 'opinion'],
  [/oferta académica|titulaciones|título|grados|másteres|programas/i, 'distributiva'],
  [/^Conoce más$/, 'area-estudio'],
];

/** Card titles that name their own destination. */
const CARD_TITLES: Rules = [
  [/^(Foros|Openclasses|Sesiones informativas|Seminarios|Jornadas y congresos)$/, 'eventos'],
  [/^(Innovación|Tecnología|Bilingüismo)$/, 'revista-categoria'],
  [/^Becas y ayudas$/, 'becas'],
  [/^(Requisitos de acceso|¿Tienes dudas\?)$/, 'faqs'],
  [/MBA/, 'ficha-mba'],
  [/^UNIR Revista/, 'revista'],
  [/^["“]/, 'opiniones-fichas'],
  [/historia personal/, 'opinion'],
];

/** Cards by the heading of their section. */
const CARD_SECTIONS: Rules = [
  [/evento/i, 'evento-detalle'],
  [/compromiso social|investigación/i, 'facultad'],
  [/propuesta educativa|metodología/i, 'faqs'],
  [/ranking|reconocimientos|reconocidos/i, 'opinion'],
  [/opciones económicas/i, 'becas'],
  [/títulos|titulaciones|requisitos|te puede interesar/i, 'ficha-mba'],
];

function match(rules: Rules, text: string): string | null {
  return rules.find(([pattern]) => pattern.test(text))?.[1] ?? null;
}

const text = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim() ?? '';

function cardTarget(card: Element): string | null {
  if (card.querySelector('.aem-card__play')) return null;
  if (card.classList.contains('aem-card--product')) return /^Grado/.test(text(card.querySelector('.aem-card__pretitle'))) ? 'ficha-grado-educacion' : 'ficha-mba';
  if (card.querySelector('.aem-date-tag')) return 'evento-detalle';
  return match(CARD_TITLES, text(card.querySelector('.aem-card__title'))) ?? match(CARD_SECTIONS, text(card.closest('section')?.querySelector('h2'))) ?? 'noticia';
}

function target(el: Element): string | null {
  const label = text(el);
  if (el.matches('.aem-header__logo, .aem-hero__logo, .aem-error__logo')) return 'home';
  if (el.matches('.aem-breadcrumb__link')) return match(BREADCRUMB, label);
  if (el.closest('.aem-megamenu')) return el.matches('.aem-megamenu__all') ? 'area-estudio' : /^Grado/.test(label) ? 'ficha-grado-educacion' : 'ficha-mba';
  if (el.closest('.aem-header')) return match(HEADER, label);
  if (el.closest('.aem-footer')) return match(FOOTER, label);
  if (el.matches('.aem-card__link')) return cardTarget(el.closest('.aem-card')!);
  if (el.matches('.aem-feature-card')) return /MBA/.test(label) ? 'ficha-mba' : 'noticia';
  if (el.matches('.aem-distributor__item')) return 'distributiva';
  if (el.matches('.aem-hero__tile')) return 'area-estudio';
  if (el.closest('.aem-offer__title')) return 'beca-detalle';
  if (el.closest('.aem-profile__name, .aem-people')) return 'profesor-detalle';
  if (el.closest('.aem-list')) return /^(Grado|Curso|Mención)/.test(label) ? 'ficha-grado-educacion' : null;
  if (el.matches('.aem-link-button, .aem-button')) return match(ACTIONS, label);
  return null;
}

/** Marks every link of the page with a template; `current` (the page shown) is left out. */
export function linkPages(root: ParentNode, current: string): void {
  root.querySelectorAll<HTMLElement>('a[href="#"]:not([data-po-page]), button.aem-button[type="button"]:not([data-po-page])').forEach((el) => {
    const page = target(el);
    if (!page || `aem-pages-${page}` === current) return;
    el.dataset['poPage'] = `aem-pages-${page}`;
    if (el instanceof HTMLAnchorElement) {
      el.href = `./?ds=aem&c=aem-pages-${page}`;
      el.target = '_top';
    }
  });
}
