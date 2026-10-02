/**
 * AEM Chip: a click toggles aria-pressed. In a group with data-aem-chips="single" the chips work as tabs: one is
 * always pressed. With data-aem-chips-filter="<id>" the group also filters that container: its children with
 * data-aem-filter="<values>" stay visible when they include the value (data-value) of the pressed chip, or all of
 * them with the value "all". Fires `aem-chip-change` with `{ pressed, value }`.
 */
export function initChip(root = document) {
  for (const chip of root.querySelectorAll('.aem-chip:not([data-aem-ready])')) {
    chip.dataset.aemReady = '';
    chip.addEventListener('click', () => {
      if (chip.disabled) return;
      const pressed = chip.getAttribute('aria-pressed') !== 'true';
      const group = chip.closest('[data-aem-chips="single"]');
      if (group && !pressed) return;
      if (group) {
        for (const other of group.querySelectorAll('.aem-chip[aria-pressed="true"]')) other.setAttribute('aria-pressed', 'false');
      }
      chip.setAttribute('aria-pressed', String(pressed));
      if (group?.dataset.aemChipsFilter) filter(document.getElementById(group.dataset.aemChipsFilter), chip.dataset.value);
      chip.dispatchEvent(new CustomEvent('aem-chip-change', { bubbles: true, detail: { pressed, value: chip.dataset.value } }));
    });
  }
}

function filter(container, value) {
  if (!container) return;
  for (const item of container.querySelectorAll('[data-aem-filter]')) {
    item.hidden = !(value === undefined || value === 'all' || item.dataset.aemFilter.split(' ').includes(value));
  }
  // A carousel goes back to the start and updates its bar
  container.scrollLeft = 0;
  container.dispatchEvent(new Event('scroll'));
}
