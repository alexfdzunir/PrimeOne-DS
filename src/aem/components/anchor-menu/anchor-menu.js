/**
 * AEM Anchor Menu: a click marks the link as current (aria-current); with IntersectionObserver the link of the
 * section in view becomes current while scrolling, and the bar scrolls to keep it visible.
 */
export function initAnchorMenu(root = document) {
  for (const menu of root.querySelectorAll('.aem-anchor-menu:not([data-aem-ready])')) {
    menu.dataset.aemReady = '';
    const links = [...menu.querySelectorAll('.aem-anchor-menu__link')];
    const setCurrent = (link) => {
      links.forEach((other) => (other === link ? other.setAttribute('aria-current', 'true') : other.removeAttribute('aria-current')));
      link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };
    links.forEach((link) => link.addEventListener('click', () => setCurrent(link)));
    const targets = links.map((link) => document.getElementById(decodeURIComponent((link.hash || '').slice(1)))).filter(Boolean);
    if (!targets.length || !('IntersectionObserver' in window)) continue;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        const link = visible && links.find((l) => l.hash === `#${visible.target.id}`);
        if (link) setCurrent(link);
      },
      { rootMargin: '0px 0px -60% 0px' },
    );
    targets.forEach((target) => observer.observe(target));
  }
}
