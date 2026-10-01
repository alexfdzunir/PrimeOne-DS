/**
 * AEM Accordion: each `.aem-accordion__trigger` toggles the panel of its `aria-controls`. With
 * data-aem-accordion="single" opening one closes the others. Fires `aem-toggle` with `{ expanded }`.
 */
export function initAccordion(root = document) {
  for (const accordion of root.querySelectorAll('.aem-accordion:not([data-aem-ready])')) {
    accordion.dataset.aemReady = '';
    const single = accordion.dataset.aemAccordion === 'single';
    const triggers = [...accordion.querySelectorAll('.aem-accordion__trigger')];
    const set = (trigger, expanded) => {
      trigger.setAttribute('aria-expanded', String(expanded));
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (panel) panel.hidden = !expanded;
    };
    for (const trigger of triggers) {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') !== 'true';
        if (single && expanded) triggers.forEach((other) => other !== trigger && set(other, false));
        set(trigger, expanded);
        trigger.dispatchEvent(new CustomEvent('aem-toggle', { bubbles: true, detail: { expanded } }));
      });
    }
  }
}
