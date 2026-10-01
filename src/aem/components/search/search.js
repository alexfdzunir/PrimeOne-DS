/**
 * AEM Search: the clear button empties the field; with a suggestions menu (`.aem-menu` and `.aem-menu__item`)
 * the items that contain the text show while typing, with the match in bold. Enter or a click on a suggestion
 * fills the field and fires `aem-search` with `{ value }`.
 */
export function initSearch(root = document) {
  for (const host of root.querySelectorAll('.aem-search:not([data-aem-ready])')) {
    const input = host.querySelector('.aem-search__input');
    if (!input) continue;
    host.dataset.aemReady = '';
    const clear = host.querySelector('.aem-search__clear');
    const menu = host.querySelector('.aem-menu');
    const items = menu ? [...menu.querySelectorAll('.aem-menu__item')] : [];
    const labels = items.map((item) => item.textContent.trim());
    const submit = (value) => host.dispatchEvent(new CustomEvent('aem-search', { bubbles: true, detail: { value } }));

    const filter = () => {
      if (!menu) return;
      const query = input.value.trim().toLowerCase();
      let shown = 0;
      items.forEach((item, i) => {
        const label = labels[i];
        const at = label.toLowerCase().indexOf(query);
        const match = query && at >= 0;
        item.hidden = !match;
        if (match) {
          shown++;
          // One span, so the gap of the flex item does not split the text around the match
          const text = document.createElement('span');
          text.append(label.slice(0, at), Object.assign(document.createElement('mark'), { textContent: label.slice(at, at + query.length) }), label.slice(at + query.length));
          item.replaceChildren(text);
        }
      });
      menu.hidden = shown === 0;
      input.setAttribute('aria-expanded', String(shown > 0));
    };

    input.addEventListener('input', filter);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') submit(input.value);
      if (event.key === 'Escape' && menu) menu.hidden = true;
    });
    clear?.addEventListener('click', () => {
      input.value = '';
      filter();
      input.focus();
    });
    items.forEach((item, i) =>
      item.addEventListener('click', () => {
        input.value = labels[i];
        if (menu) menu.hidden = true;
        submit(input.value);
      }),
    );
    document.addEventListener('click', (event) => {
      if (menu && !host.contains(event.target)) menu.hidden = true;
    });
  }
}
