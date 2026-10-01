/**
 * AEM Navigation Header: the menu buttons open their mega menu (one at a time; Escape or a click outside closes
 * it), the first level items show their panel, and the burger opens the menu on mobile.
 */
export function initNavigationHeader(root = document) {
  for (const header of root.querySelectorAll('.aem-header:not([data-aem-ready])')) {
    header.dataset.aemReady = '';
    const items = [...header.querySelectorAll('.aem-header__item[aria-controls]')];
    const closeAll = () =>
      items.forEach((item) => {
        item.setAttribute('aria-expanded', 'false');
        const menu = document.getElementById(item.getAttribute('aria-controls'));
        if (menu) menu.hidden = true;
      });
    for (const item of items) {
      item.addEventListener('click', () => {
        const open = item.getAttribute('aria-expanded') !== 'true';
        closeAll();
        item.setAttribute('aria-expanded', String(open));
        const menu = document.getElementById(item.getAttribute('aria-controls'));
        if (menu) menu.hidden = !open;
      });
    }
    for (const section of header.querySelectorAll('.aem-megamenu__section')) {
      const select = () => {
        const mega = section.closest('.aem-megamenu');
        for (const other of mega.querySelectorAll('.aem-megamenu__section')) {
          const selected = other === section;
          other.setAttribute('aria-selected', String(selected));
          const panel = document.getElementById(other.getAttribute('aria-controls'));
          if (panel) panel.hidden = !selected;
        }
      };
      section.addEventListener('click', select);
      section.addEventListener('mouseenter', () => window.matchMedia('(hover: hover)').matches && select());
    }
    const burger = header.querySelector('.aem-header__burger');
    burger?.addEventListener('click', () => {
      const open = !header.classList.contains('is-open');
      header.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    header.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const open = items.find((item) => item.getAttribute('aria-expanded') === 'true');
      closeAll();
      open?.focus();
    });
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) closeAll();
    });
  }
}
