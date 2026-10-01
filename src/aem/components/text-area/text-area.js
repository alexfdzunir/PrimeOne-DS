/** AEM Text Area: keeps the character count (`.aem-textarea__count`, "12/250") in step with the text. */
export function initTextArea(root = document) {
  for (const host of root.querySelectorAll('.aem-textarea:not([data-aem-ready])')) {
    const input = host.querySelector('textarea');
    const count = host.querySelector('.aem-textarea__count');
    if (!input || !count) continue;
    host.dataset.aemReady = '';
    const max = input.maxLength > 0 ? input.maxLength : null;
    const update = () => (count.textContent = max ? `${input.value.length}/${max}` : String(input.value.length));
    input.addEventListener('input', update);
    update();
  }
}
