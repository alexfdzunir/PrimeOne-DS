/**
 * AEM Pagination: `.aem-pagination[data-pages]` builds its page list (first, last and the pages around the
 * current one, with "..." between them) and handles the arrows. Fires `aem-page` with `{ page }`; the page
 * starts on `data-page`.
 */
export function initPagination(root = document) {
  for (const nav of root.querySelectorAll('.aem-pagination[data-pages]:not([data-aem-ready])')) {
    nav.dataset.aemReady = '';
    const total = Number(nav.dataset.pages) || 1;
    let page = Math.min(total, Math.max(1, Number(nav.dataset.page) || 1));
    const list = nav.querySelector('.aem-pagination__list');
    const prev = nav.querySelector('[data-aem-page="prev"]');
    const next = nav.querySelector('[data-aem-page="next"]');
    const slots = () => {
      const near = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total));
      const sorted = [...near].sort((a, b) => a - b);
      return sorted.flatMap((p, i) => (i && p - sorted[i - 1] > 1 ? ['…', p] : [p]));
    };
    const render = () => {
      const items = slots().map((slot) => {
        const li = document.createElement('li');
        if (slot === '…') {
          li.innerHTML = '<span class="aem-pagination__ellipsis" aria-hidden="true">...</span>';
          return li;
        }
        const button = Object.assign(document.createElement('button'), { type: 'button', className: 'aem-pagination__page', textContent: String(slot) });
        button.setAttribute('aria-label', `Página ${slot}`);
        if (slot === page) button.setAttribute('aria-current', 'page');
        button.addEventListener('click', () => go(slot));
        li.append(button);
        return li;
      });
      list.replaceChildren(prev.closest('li'), ...items, next.closest('li'));
      prev.disabled = page === 1;
      next.disabled = page === total;
    };
    const go = (target) => {
      page = Math.min(total, Math.max(1, target));
      render();
      nav.dispatchEvent(new CustomEvent('aem-page', { bubbles: true, detail: { page } }));
      nav.querySelector('[aria-current="page"]')?.focus();
    };
    prev?.addEventListener('click', () => go(page - 1));
    next?.addEventListener('click', () => go(page + 1));
    render();
  }
}
