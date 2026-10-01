/**
 * AEM Tabs: ARIA tabs pattern. A click or Enter selects; the arrows, Home and End move between tabs (automatic
 * activation). Each tab shows the panel of its `aria-controls`. Fires `aem-tab` with `{ index }`.
 */
export function initTabs(root = document) {
  for (const tabs of root.querySelectorAll('.aem-tabs:not([data-aem-ready])')) {
    tabs.dataset.aemReady = '';
    const list = [...tabs.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      list.forEach((other) => {
        const selected = other === tab;
        other.setAttribute('aria-selected', String(selected));
        other.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(other.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
      tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      tabs.dispatchEvent(new CustomEvent('aem-tab', { bubbles: true, detail: { index: list.indexOf(tab) } }));
    };
    list.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab, false));
      tab.addEventListener('keydown', (event) => {
        const enabled = list.filter((t) => !t.disabled);
        const at = enabled.indexOf(tab);
        const target = { ArrowRight: enabled[(at + 1) % enabled.length], ArrowLeft: enabled[(at - 1 + enabled.length) % enabled.length], Home: enabled[0], End: enabled.at(-1) }[event.key];
        if (!target) return;
        event.preventDefault();
        select(target, true);
      });
    });
  }
}
