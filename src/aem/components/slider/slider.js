/** AEM Slider: keeps the bubble (`.aem-slider__bubble`) and the track fill on the value of the range input. */
export function initSlider(root = document) {
  for (const host of root.querySelectorAll('.aem-slider:not([data-aem-ready])')) {
    const input = host.querySelector('.aem-slider__input');
    const bubble = host.querySelector('.aem-slider__bubble');
    if (!input) continue;
    host.dataset.aemReady = '';
    const update = () => {
      const min = Number(input.min || 0);
      const max = Number(input.max || 100);
      const pct = ((Number(input.value) - min) / (max - min)) * 100;
      host.style.setProperty('--aem-slider-pct', `${pct}%`);
      if (bubble) bubble.textContent = input.value;
    };
    input.addEventListener('input', update);
    update();
  }
}
