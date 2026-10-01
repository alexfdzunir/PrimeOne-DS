/**
 * AEM Chip: a click toggles aria-pressed. In a group with data-aem-chips="single" only one stays pressed.
 * Fires `aem-chip-change` with `{ pressed }`.
 */
export function initChip(root = document) {
  for (const chip of root.querySelectorAll('.aem-chip:not([data-aem-ready])')) {
    chip.dataset.aemReady = '';
    chip.addEventListener('click', () => {
      if (chip.disabled) return;
      const pressed = chip.getAttribute('aria-pressed') !== 'true';
      const group = chip.closest('[data-aem-chips="single"]');
      if (group && pressed) {
        for (const other of group.querySelectorAll('.aem-chip[aria-pressed="true"]')) other.setAttribute('aria-pressed', 'false');
      }
      chip.setAttribute('aria-pressed', String(pressed));
      chip.dispatchEvent(new CustomEvent('aem-chip-change', { bubbles: true, detail: { pressed } }));
    });
  }
}
