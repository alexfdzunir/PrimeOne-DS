/**
 * AEM Modal: `[data-aem-modal-open="<dialog id>"]` opens the dialog as a modal, `[data-aem-modal-close]` inside it
 * and a click on the overlay close it (Escape is native). Focus goes back to the opener on close.
 */
export function initModal(root = document) {
  for (const opener of root.querySelectorAll('[data-aem-modal-open]:not([data-aem-ready])')) {
    opener.dataset.aemReady = '';
    opener.addEventListener('click', () => {
      const dialog = document.getElementById(opener.dataset.aemModalOpen);
      if (!dialog || dialog.open) return;
      dialog.showModal();
      dialog.addEventListener('close', () => opener.focus(), { once: true });
    });
  }
  for (const dialog of root.querySelectorAll('dialog.aem-modal:not([data-aem-ready])')) {
    dialog.dataset.aemReady = '';
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog || event.target.closest('[data-aem-modal-close]')) dialog.close();
    });
  }
}
