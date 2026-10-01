/**
 * AEM Carousel (`[data-aem-carousel]`): the arrows scroll the track by one item, the progress bar follows the
 * scroll position and the arrows turn off at both ends. Used by the Card Block, Hero Home and Testimonial.
 */
export function initCarousel(root = document) {
  for (const carousel of root.querySelectorAll('[data-aem-carousel]:not([data-aem-ready])')) {
    const track = carousel.querySelector('.aem-carousel__track');
    if (!track) continue;
    carousel.dataset.aemReady = '';
    const prev = carousel.querySelector('.aem-carousel__prev');
    const next = carousel.querySelector('.aem-carousel__next');
    const step = () => {
      const item = track.firstElementChild;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
    };
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const size = track.scrollWidth ? (track.clientWidth / track.scrollWidth) * 100 : 100;
      const start = max > 0 ? (track.scrollLeft / max) * (100 - size) : 0;
      carousel.style.setProperty('--aem-carousel-size', `${size}%`);
      carousel.style.setProperty('--aem-carousel-start', `${start}%`);
      if (prev) prev.disabled = track.scrollLeft <= 1;
      if (next) next.disabled = track.scrollLeft >= max - 1;
    };
    prev?.addEventListener('click', () => track.scrollBy({ left: -step() }));
    next?.addEventListener('click', () => track.scrollBy({ left: step() }));
    track.addEventListener('scroll', update, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
    update();
  }
}
