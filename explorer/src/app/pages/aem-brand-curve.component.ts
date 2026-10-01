import { ChangeDetectionStrategy, Component } from '@angular/core';

let curveSeq = 0;

/**
 * Brand curve of the AEM Portales hero (Figma "Pages · Templates · Design System · AEM", hero-home_module
 * `.brand-vector`): a 400px wide stroke fading from blue 500 to transparent over the blue 400 background.
 */
@Component({
  selector: 'po-aem-curve',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 1100 518" preserveAspectRatio="xMinYMin slice" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <path
        d="M73.6146 -16C77.1388 -14.6096 109.416 -1.67517 155.902 24.2985C182.946 39.4058 209.694 56.0678 235.419 73.8204C267.66 96.0747 298.444 120.175 326.915 145.457C350.05 165.992 372.038 187.651 392.263 209.836C414.61 234.326 435.363 260.076 453.955 286.36C473.178 313.533 490.545 341.94 505.568 370.783C557.312 470.123 583.68 578.375 583.935 692.547L584.793 1098.98"
        [attr.stroke]="'url(#' + id + ')'"
        stroke-width="400"
        stroke-miterlimit="10"
      />
      <defs>
        <linearGradient [attr.id]="id" x1="721.115" y1="401" x2="190.615" y2="-49" gradientUnits="userSpaceOnUse">
          <stop offset="0.37" stop-color="#0D61F2" />
          <stop offset="1" stop-color="#0A4EC2" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  `,
  styles: `
    :host { display: block; pointer-events: none; }
    svg { display: block; width: 100%; height: 100%; }
  `,
})
export class AemBrandCurveComponent {
  protected readonly id = `po-aem-curve-${++curveSeq}`;
}
