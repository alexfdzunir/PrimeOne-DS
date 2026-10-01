import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/**
 * Keeps the active step of a horizontal stepper in the centre of its list when the steps do not fit (mobile), as a
 * carousel (the first one stays at the start): on load, when the step changes and when the list is resized. `<p-step-list poCenterActive>`.
 */
@Directive({ selector: 'p-step-list[poCenterActive]' })
export class PrimeOneStepListCenter {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const center = (behavior: ScrollBehavior) => {
        const steps = host.querySelectorAll<HTMLElement>('.p-step');
        const active = host.querySelector<HTMLElement>('.p-step-active');
        if (!active || !steps.length) return;
        // When the steps overflow, room after the last one so it can be centred too. The first stays aligned to the
        // start (the scroll cannot go before it), the rest are centred
        const first = steps[0];
        const last = steps[steps.length - 1];
        const overflow = last.getBoundingClientRect().right - first.getBoundingClientRect().left > host.clientWidth;
        const end = overflow ? `${Math.max(0, (host.clientWidth - last.offsetWidth) / 2)}px` : '';
        if (host.style.paddingInlineEnd !== end) host.style.paddingInlineEnd = end;
        if (!overflow) return;
        const offset = active.getBoundingClientRect().left - host.getBoundingClientRect().left + host.scrollLeft;
        host.scrollTo({ left: offset - (host.clientWidth - active.offsetWidth) / 2, behavior });
      };
      center('auto');
      const steps = new MutationObserver(() => center('smooth'));
      steps.observe(host, { subtree: true, attributes: true, attributeFilter: ['class'] });
      const size = new ResizeObserver(() => center('auto'));
      size.observe(host);
      destroyRef.onDestroy(() => {
        steps.disconnect();
        size.disconnect();
      });
    });
  }
}
