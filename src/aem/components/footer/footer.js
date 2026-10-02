/**
 * AEM Footer: on mobile each link column folds under its title; the title button toggles its list.
 */
export function initFooter(root = document) {
  for (const button of root.querySelectorAll('.aem-footer__toggle:not([data-aem-ready])')) {
    button.dataset.aemReady = '';
    button.addEventListener('click', () => button.setAttribute('aria-expanded', String(button.getAttribute('aria-expanded') !== 'true')));
  }
}
