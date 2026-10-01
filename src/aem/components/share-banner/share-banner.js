/**
 * AEM Share Banner: `[data-aem-share-copy]` copies the page URL (or its `data-aem-share-copy` value) to the
 * clipboard and shows the confirmation for two seconds.
 */
export function initShareBanner(root = document) {
  for (const button of root.querySelectorAll('[data-aem-share-copy]:not([data-aem-ready])')) {
    button.dataset.aemReady = '';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.aemShareCopy || location.href);
      } catch {
        return;
      }
      button.classList.add('is-copied');
      setTimeout(() => button.classList.remove('is-copied'), 2000);
    });
  }
}
