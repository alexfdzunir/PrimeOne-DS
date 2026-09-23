import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UNIR_LOGO_MARK, UNIR_LOGO_TAGLINE } from '../../../../src/stories/unir-logo';

/**
 * UNIR horizontal logo exported from the DS component "Logo UNIR" (Figma, Color=UNIR_h_color / UNIR_h_negativo).
 * Light mode uses the colour version (black mark, blue tagline); dark mode the negative one (all white).
 */
@Component({
  selector: 'po-unir-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'img', 'aria-label': 'UNIR, Universidad Internacional de La Rioja' },
  template: `
    <svg viewBox="0 0 166 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path
        class="po-logo__tagline"
        fill-rule="evenodd"
        clip-rule="evenodd"
        [attr.d]="tagline"
      />
      <path
        class="po-logo__mark"
        [attr.d]="mark"
      />
    </svg>
  `,
  styles: `
    :host { display: inline-flex; align-items: center; height: 24px; }
    /* Never scaled down to the host width: a narrower host crops the tagline (navbar on small phones) */
    svg { flex: none; height: 100%; width: auto; display: block; }
    .po-logo__mark { fill: #000000; }
    .po-logo__tagline { fill: #0d61f2; }
    :host-context(html.po-dark) .po-logo__mark,
    :host-context(html.po-dark) .po-logo__tagline { fill: #ffffff; }
  `,
})
export class UnirLogoComponent {
  protected readonly tagline = UNIR_LOGO_TAGLINE;
  protected readonly mark = UNIR_LOGO_MARK;
}
