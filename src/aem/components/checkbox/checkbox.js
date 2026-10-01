/** AEM Checkbox: inputs with `data-indeterminate` start in the mixed state (it only exists as a property). */
export function initCheckbox(root = document) {
  for (const input of root.querySelectorAll('.aem-checkbox__input[data-indeterminate]:not([data-aem-ready])')) {
    input.dataset.aemReady = '';
    input.indeterminate = true;
  }
}
