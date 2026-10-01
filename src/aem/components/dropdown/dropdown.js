/**
 * AEM Dropdown and Filter: `[data-aem-dropdown]` with a `[aria-haspopup="listbox"]` trigger, a `.aem-menu`
 * listbox and `[role="option"]` items. Click or Enter/Space/ArrowDown opens it; arrows move, Enter or a click
 * picks, Escape or a click outside closes. With `aria-multiselectable="true"` several stay selected. The text of
 * the choice goes to `[data-aem-dropdown-value]` (filters count it in `[data-aem-dropdown-count]`) and the
 * component fires `aem-change` with `{ values }`.
 */
export function initDropdown(root = document) {
  for (const host of root.querySelectorAll('[data-aem-dropdown]:not([data-aem-ready])')) {
    const trigger = host.querySelector('[aria-haspopup="listbox"]');
    const menu = host.querySelector('.aem-menu');
    if (!trigger || !menu) continue;
    host.dataset.aemReady = '';
    const multiple = menu.getAttribute('aria-multiselectable') === 'true';
    const options = [...menu.querySelectorAll('[role="option"]')];
    const valueEl = host.querySelector('[data-aem-dropdown-value]');
    const countEl = host.querySelector('[data-aem-dropdown-count]');
    const field = trigger.closest('.aem-field') ?? trigger;
    let active = -1;

    const isOpen = () => !menu.hidden;
    const setActive = (index) => {
      options.forEach((option, i) => option.classList.toggle('is-active', i === index));
      active = index;
      options[index]?.scrollIntoView({ block: 'nearest' });
    };
    const open = () => {
      if (trigger.disabled) return;
      menu.hidden = false;
      field.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      setActive(Math.max(0, options.findIndex((o) => o.getAttribute('aria-selected') === 'true')));
    };
    const close = () => {
      menu.hidden = true;
      field.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      setActive(-1);
    };
    const render = () => {
      const chosen = options.filter((o) => o.getAttribute('aria-selected') === 'true');
      const labels = chosen.map((o) => o.textContent.trim());
      if (valueEl) valueEl.textContent = multiple && !countEl ? labels.join(', ') : (labels[0] ?? '');
      if (countEl) countEl.textContent = multiple && labels.length ? `(${labels.length})` : '';
      field.classList.toggle('has-value', labels.length > 0);
      host.dispatchEvent(new CustomEvent('aem-change', { bubbles: true, detail: { values: chosen.map((o) => o.dataset.value ?? o.textContent.trim()) } }));
    };
    const pick = (index) => {
      const option = options[index];
      if (!option) return;
      if (multiple) option.setAttribute('aria-selected', String(option.getAttribute('aria-selected') !== 'true'));
      else options.forEach((o) => o.setAttribute('aria-selected', String(o === option)));
      render();
      if (!multiple) {
        close();
        trigger.focus();
      }
    };

    trigger.addEventListener('click', () => (isOpen() ? close() : open()));
    trigger.addEventListener('keydown', (event) => {
      const keys = { ArrowDown: 1, ArrowUp: -1 };
      if (event.key in keys) {
        event.preventDefault();
        if (!isOpen()) open();
        else setActive((active + keys[event.key] + options.length) % options.length);
      } else if ((event.key === 'Enter' || event.key === ' ') && isOpen() && active >= 0) {
        event.preventDefault();
        pick(active);
      } else if (event.key === 'Escape' && isOpen()) {
        event.preventDefault();
        close();
      }
    });
    options.forEach((option, i) => {
      option.addEventListener('mousedown', (event) => event.preventDefault());
      option.addEventListener('click', () => pick(i));
    });
    document.addEventListener('click', (event) => {
      if (isOpen() && !host.contains(event.target)) close();
    });
  }
}
