import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal } from '@angular/core';
import { ExplorerState } from '../explorer-state';
import { FOUNDATIONS_STYLES } from './foundations.component';

/** `color/text/primary` -> `--aem-color-text-primary`. */
const cssVar = (path: string) => `--aem-${path.replace(/[/\s]+/g, '-')}`;

/** Sections of the AEM Foundations page: anchors, the sidebar items and the page index. */
export const AEM_FOUNDATION_SECTIONS = [
  { id: 'aem-tipografia', label: 'Tipografía' },
  { id: 'aem-color', label: 'Color' },
  { id: 'aem-semanticos', label: 'Tokens semánticos' },
  { id: 'aem-radios', label: 'Radios y bordes' },
  { id: 'aem-espaciado', label: 'Espaciado' },
  { id: 'aem-layout', label: 'Layout' },
  { id: 'aem-iconos', label: 'Iconos' },
  { id: 'aem-efectos', label: 'Sombras y degradados' },
];

const SHADES = ['950', '900', '850', '800', '700', '600', '500', '400', '300', '200', '100'];
const PALETTES = [
  { label: 'Neutral', path: 'color/neutral', note: 'Textos, fondos y bordes', shades: ['1000', ...SHADES] },
  { label: 'Blue', path: 'color/blue', note: 'Azul de marca e interacción', shades: SHADES.filter((s) => s !== '850') },
  { label: 'Rioja', path: 'color/rioja', note: 'Acento: botón primario', shades: SHADES.filter((s) => s !== '850') },
  { label: 'Sky', path: 'color/sky', note: 'Acento sobre fondos oscuros', shades: SHADES.filter((s) => s !== '850') },
  { label: 'Honey', path: 'color/honey', note: 'Acento cálido', shades: SHADES.filter((s) => s !== '850') },
  { label: 'Jade', path: 'color/jade', note: 'Éxito', shades: SHADES.filter((s) => s !== '850') },
  { label: 'Red', path: 'color/red', note: 'Error y peligro', shades: SHADES.filter((s) => s !== '850') },
  { label: 'Orange', path: 'color/orange', note: 'Aviso', shades: SHADES.filter((s) => s !== '850') },
  { label: 'Orchid', path: 'color/orchid', note: 'Marca secundaria', shades: SHADES.filter((s) => s !== '850') },
  { label: 'Turquoise', path: 'color/turquoise', note: 'Marca secundaria', shades: SHADES.filter((s) => s !== '850') },
];

const SEMANTIC: { group: string; tokens: string[] }[] = [
  { group: 'Fondo', tokens: ['primary', 'secondary', 'tertiary', 'accent', 'inverse'].map((t) => `color/background/${t}`) },
  {
    group: 'Superficie',
    tokens: ['primary', 'secondary', 'tertiary', 'accent', 'inverse/primary', 'inverse/secondary', 'inverse/tertiary', 'inverse/accent'].map((t) => `color/surface/${t}`),
  },
  {
    group: 'Texto',
    tokens: ['primary', 'secondary', 'subtle', 'accent', 'accent-soft', 'inverse/primary', 'inverse/secondary', 'inverse/subtle', 'inverse/accent'].map((t) => `color/text/${t}`),
  },
  {
    group: 'Enlaces',
    tokens: ['primary/default', 'primary/hover', 'primary/active', 'secondary/default', 'secondary/hover', 'inverse/primary/default', 'inverse/primary/hover'].map(
      (t) => `color/text/link/${t}`,
    ),
  },
  { group: 'Iconos', tokens: ['primary', 'secondary', 'subtle', 'accent', 'accent-soft', 'inverse/primary', 'inverse/accent'].map((t) => `color/icon/${t}`) },
  { group: 'Bordes', tokens: ['primary', 'subtle', 'inverse/primary', 'inverse/subtle', 'link/primary/default', 'link/primary/hover'].map((t) => `color/border/${t}`) },
  {
    group: 'Sistema',
    tokens: [
      'color/text/system/success/main',
      'color/surface/system/success/soft',
      'color/text/system/error/main',
      'color/surface/system/error/soft',
      'color/text/system/warning/main',
      'color/surface/system/warning/soft',
      'color/text/system/info/main',
      'color/surface/system/info/soft',
      'color/text/system/disabled/main',
      'color/surface/system/disabled/main',
    ],
  },
  {
    group: 'Interacción y estado',
    tokens: [
      'color/surface/interactive/fill/primary/default',
      'color/surface/interactive/fill/primary/hover',
      'color/surface/interactive/fill/secondary/default',
      'color/surface/interactive/fill/secondary/hover',
      'color/surface/interactive/layer/hover',
      'color/surface/interactive/layer/active',
      'color/state/focus/main',
      'color/state/focus/inverse',
      'color/state/overlay/soft',
      'color/state/overlay/strong',
    ],
  },
  {
    group: 'Marca',
    tokens: ['primary/blue', 'primary/dark-blue', 'secondary/orchid', 'secondary/turquoise', 'accent/rioja', 'accent/coral', 'accent/orange', 'accent/honey', 'accent/sky', 'accent/indigo'].map(
      (t) => `color/brand/${t}`,
    ),
  },
];

/** Figma text styles; sizes in px for Mobile·Tablet and Desktop (the responsive size collection). */
const TYPE_SCALE: { name: string; cls: string; weight: string; mobile: [number, number]; desktop: [number, number]; sample: string }[] = [
  { name: 'Display 1', cls: 'aem-display-1', weight: 'Regular', mobile: [120, 120], desktop: [152, 152], sample: 'UNIR' },
  { name: 'Display 2', cls: 'aem-display-2', weight: 'Regular', mobile: [72, 72], desktop: [84, 84], sample: 'Tu futuro' },
  { name: 'Display 3', cls: 'aem-display-3', weight: 'Regular', mobile: [64, 64], desktop: [72, 72], sample: 'Tu futuro' },
  { name: 'Display 4', cls: 'aem-display-4', weight: 'Medium', mobile: [42, 42], desktop: [52, 52], sample: 'Estudia online' },
  { name: 'Headline 1', cls: 'aem-headline-1', weight: 'Medium', mobile: [28, 34], desktop: [32, 36], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 2', cls: 'aem-headline-2', weight: 'Medium', mobile: [24, 30], desktop: [28, 34], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 3', cls: 'aem-headline-3', weight: 'Medium', mobile: [22, 28], desktop: [24, 30], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 4', cls: 'aem-headline-4', weight: 'Medium', mobile: [20, 24], desktop: [22, 28], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 5', cls: 'aem-headline-5', weight: 'Medium', mobile: [18, 22], desktop: [20, 24], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 6', cls: 'aem-headline-6', weight: 'Medium', mobile: [16, 20], desktop: [16, 20], sample: 'Grado en Ingeniería Informática' },
  { name: 'Body', cls: 'aem-body', weight: 'Regular · Strong', mobile: [16, 24], desktop: [16, 24], sample: 'Estudia a tu ritmo con clases en directo y un tutor personal.' },
  { name: 'Small 1', cls: 'aem-small-1', weight: 'Regular · Strong', mobile: [14, 20], desktop: [14, 20], sample: 'Estudia a tu ritmo con clases en directo y un tutor personal.' },
  { name: 'Small 2', cls: 'aem-small-2', weight: 'Regular · Strong', mobile: [10, 16], desktop: [10, 16], sample: 'Estudia a tu ritmo con clases en directo y un tutor personal.' },
  { name: 'Label 1', cls: 'aem-label-1', weight: 'Medium', mobile: [14, 14], desktop: [14, 14], sample: 'Solicitar información' },
  { name: 'Label 2', cls: 'aem-label-2', weight: 'Medium', mobile: [12, 12], desktop: [12, 12], sample: 'Solicitar información' },
  { name: 'Label 3 · Uppercase', cls: 'aem-label-3-uppercase', weight: 'Medium', mobile: [10, 10], desktop: [10, 10], sample: 'Nuevo' },
  { name: 'Caption', cls: 'aem-caption', weight: 'Regular · Strong', mobile: [12, 16], desktop: [12, 16], sample: 'Actualizado hace 2 horas' },
];

const RADII = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];
const BORDER_WIDTHS = ['default', 'strong', 'focus'];
const UNITS = ['01', '02', '04', '08', '12', '16', '20', '24', '32', '40', '48', '56', '64', '72', '80', '96', '128', '184', '256'];
const ICON_SIZES = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'];
const LAYOUT: { label: string; path: string; values: [string, string, string] }[] = [
  { label: 'Padding vertical de sección', path: 'layout/section/vertical-padding', values: ['64', '64', '80'] },
  { label: 'Padding horizontal de sección', path: 'layout/section/horizontal-padding', values: ['16', '32', '48'] },
  { label: 'Separación entre columnas', path: 'layout/section/column-gap', values: ['8', '12', '16'] },
  { label: 'Ancho base', path: 'layout/section/width/base', values: ['375', '768', '1280'] },
  { label: 'Ancho mínimo', path: 'layout/section/width/min-width', values: ['320', '768', '960'] },
  { label: 'Ancho máximo', path: 'layout/section/width/max-width', values: ['767', '1279', '1280'] },
];
const EFFECTS = [
  { label: 'Sombra general', path: 'shadow/default/general', kind: 'shadow' },
  { label: 'Sombra inferior', path: 'shadow/default/bellow', kind: 'shadow' },
  { label: 'Sombra superior', path: 'shadow/default/above', kind: 'shadow' },
  { label: 'Degradado', path: 'gradient/gradient', kind: 'gradient' },
  { label: 'Degradado suave', path: 'gradient/gradient-soft', kind: 'gradient' },
];
const ICONS = ['house', 'magnifying-glass', 'calendar-dots', 'bell', 'user-circle', 'graduation-cap', 'arrow-right', 'download-simple', 'heart', 'check-circle'];

/**
 * Foundations of AEM Portales read live from its CSS variables (`--aem-*`, src/aem/styles/tokens.css): text styles,
 * core palettes, semantic tokens, radii, spacing, layout, icon sizes, shadows and gradients.
 */
@Component({
  selector: 'po-aem-foundations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Dark mode: the page takes the AEM dark tokens, so swatches and values are those of the dark mode
  host: { class: 'po-page po-scroll', '[class.aem-dark]': "state.scheme() === 'dark'" },
  template: `
    <div class="po-page__inner">
      <nav class="po-found__crumbs" aria-label="Ruta">
        <button type="button" (click)="state.goHome()">Inicio</button>
        <i class="ph ph-caret-right" aria-hidden="true"></i>
        <span aria-current="page">Foundations</span>
      </nav>
      <header class="po-found__header">
        <p class="po-eyebrow">Foundations · AEM Portales</p>
        <h1>Tokens del sistema</h1>
        <p class="po-found__lead">
          Valores reales de las variables CSS de AEM Portales (<code>src/aem/styles/tokens.css</code>), generadas desde las
          variables de Figma: core, semantic y responsive size. Las responsive cambian en tablet (768px) y escritorio (1280px).
          El modo oscuro (<code>.aem-dark</code>) lleva los tokens semánticos a sus valores inverse de Figma.
          Pulsa un token para copiar su <code>var()</code>.
        </p>
        <nav class="po-found__toc" aria-label="Secciones">
          @for (s of sections; track s.id) {
            <a [href]="'#' + s.id" (click)="jump($event, s.id)">{{ s.label }}</a>
          }
        </nav>
      </header>

      <section id="aem-tipografia" class="po-found__section">
        <h2>Tipografía</h2>
        <div class="po-found__family">
          <span class="po-found__aa">Aa</span>
          <div>
            <strong>Proeduca Sans</strong>
            <button type="button" class="po-token" (click)="copy('typography/family')"><code>typography/family</code></button>
            <div class="po-found__weights">
              @for (w of weights; track w) {
                <button type="button" class="po-found__weight" [style.font-weight]="value('typography/weight/' + w)" (click)="copy('typography/weight/' + w)">
                  {{ w }} · {{ value('typography/weight/' + w) }}
                </button>
              }
            </div>
          </div>
        </div>
        <div class="po-found__type">
          @for (t of typeScale; track t.cls) {
            <div class="po-found__type-row">
              <div class="po-found__type-meta">
                <strong>{{ t.name }}</strong>
                <code>.{{ t.cls }}</code>
                <span class="po-token"><span class="po-muted">Móvil y tablet</span><span>{{ t.mobile[0] }}/{{ t.mobile[1] }}px</span></span>
                <span class="po-token"><span class="po-muted">Escritorio</span><span>{{ t.desktop[0] }}/{{ t.desktop[1] }}px</span></span>
                <span class="po-found__chips"><span>{{ t.weight }}</span></span>
              </div>
              <p class="po-found__sample" [class]="'po-found__sample ' + t.cls">{{ t.sample }}</p>
            </div>
          }
        </div>
      </section>

      <section id="aem-color" class="po-found__section">
        <h2>Color</h2>
        @for (p of palettes; track p.path) {
          <div class="po-found__palette">
            <div class="po-found__palette-head">
              <strong>{{ p.label }}</strong>
              <span class="po-muted">{{ p.note }}</span>
            </div>
            <div class="po-found__swatches">
              @for (shade of p.shades; track shade) {
                <button type="button" class="po-found__swatch" (click)="copy(p.path + '/' + shade)" [attr.aria-label]="p.path + '/' + shade + ' ' + value(p.path + '/' + shade)">
                  <span class="po-found__chip" [style.background]="ref(p.path + '/' + shade)"></span>
                  <span class="po-found__shade">{{ shade }}</span>
                  <code>{{ value(p.path + '/' + shade) }}</code>
                </button>
              }
            </div>
          </div>
        }
      </section>

      <section id="aem-semanticos" class="po-found__section">
        <h2>Tokens semánticos</h2>
        <div class="po-found__groups">
          @for (g of semantic; track g.group) {
            <div class="po-found__group">
              <h3 class="po-eyebrow">{{ g.group }}</h3>
              @for (t of g.tokens; track t) {
                <button type="button" class="po-found__row" (click)="copy(t)">
                  <span class="po-found__dot" [style.background]="ref(t)"></span>
                  <code>{{ t }}</code>
                  <span class="po-found__val">{{ value(t) }}</span>
                </button>
              }
            </div>
          }
        </div>
      </section>

      <section id="aem-radios" class="po-found__section">
        <h2>Radios y bordes</h2>
        <div class="po-found__radii">
          @for (r of radii; track r) {
            <button type="button" class="po-found__radius" (click)="copy('size/border radius/' + r)">
              <span [style.border-radius]="ref('size/border radius/' + r)"></span>
              <code>size/border radius/{{ r }}</code>
              <em>{{ px('size/border radius/' + r) }}</em>
            </button>
          }
        </div>
        <h3 class="po-eyebrow po-found__sub">Grosor de borde</h3>
        <div class="po-found__radii">
          @for (b of borderWidths; track b) {
            <button type="button" class="po-found__radius" (click)="copy('size/border width/' + b)">
              <span [style.border-width]="ref('size/border width/' + b)" style="border-radius: 8px"></span>
              <code>size/border width/{{ b }}</code>
              <em>{{ px('size/border width/' + b) }}</em>
            </button>
          }
        </div>
      </section>

      <section id="aem-espaciado" class="po-found__section">
        <h2>Espaciado</h2>
        <div class="po-found__scale">
          @for (u of units; track u) {
            <button type="button" class="po-found__step" (click)="copy('unit/' + u)">
              <code>unit/{{ u }}</code>
              <span class="po-found__bar" [style.width]="ref('unit/' + u)"></span>
              <em>{{ px('unit/' + u) }}</em>
            </button>
          }
        </div>
      </section>

      <section id="aem-layout" class="po-found__section">
        <h2>Layout</h2>
        <div class="po-found__groups">
          <div class="po-found__group">
            <h3 class="po-eyebrow">Sección · móvil / tablet / escritorio</h3>
            @for (l of layout; track l.path) {
              <button type="button" class="po-found__row" (click)="copy(l.path)">
                <span class="po-found__dot" style="box-shadow: none"><i class="ph ph-arrows-out-line-horizontal" aria-hidden="true"></i></span>
                <code>{{ l.path }}</code>
                <span class="po-found__val">{{ l.values.join(' / ') }}px</span>
              </button>
            }
          </div>
        </div>
      </section>

      <section id="aem-iconos" class="po-found__section">
        <h2>Iconos</h2>
        <div class="po-found__radii">
          @for (s of iconSizes; track s) {
            <button type="button" class="po-found__radius" (click)="copy('size/icon/' + s)">
              <i class="ph ph-graduation-cap" [style.font-size]="ref('size/icon/' + s)" style="line-height: 1; color: var(--aem-color-icon-accent-soft)" aria-hidden="true"></i>
              <code>size/icon/{{ s }}</code>
              <em>{{ px('size/icon/' + s) }}</em>
            </button>
          }
        </div>
        <div class="po-found__icons" style="margin-top: 16px">
          <code>ph</code>
          @for (icon of icons; track icon) {
            <i [class]="'ph ph-' + icon" [attr.title]="'ph-' + icon"></i>
          }
        </div>
      </section>

      <section id="aem-efectos" class="po-found__section">
        <h2>Sombras y degradados</h2>
        <div class="po-found__shadows">
          @for (e of effects; track e.path) {
            <button type="button" class="po-found__shadow" (click)="copy(e.path)">
              @if (e.kind === 'shadow') {
                <span [style.box-shadow]="ref(e.path)"></span>
              } @else {
                <span [style.background]="ref(e.path)"></span>
              }
              <strong>{{ e.label }}</strong>
              <code>{{ e.path }}</code>
            </button>
          }
        </div>
      </section>

      @if (copied()) {
        <div class="po-found__toast" role="status">Copiado: <code>{{ copied() }}</code></div>
      }
    </div>
  `,
  styles: FOUNDATIONS_STYLES,
})
export class AemFoundationsComponent {
  protected readonly state = inject(ExplorerState);
  protected readonly sections = AEM_FOUNDATION_SECTIONS;
  protected readonly palettes = PALETTES;
  protected readonly semantic = SEMANTIC;
  protected readonly typeScale = TYPE_SCALE;
  protected readonly weights = ['regular', 'medium', 'bold'];
  protected readonly radii = RADII;
  protected readonly borderWidths = BORDER_WIDTHS;
  protected readonly units = UNITS;
  protected readonly layout = LAYOUT;
  protected readonly iconSizes = ICON_SIZES;
  protected readonly effects = EFFECTS;
  protected readonly icons = ICONS;
  protected readonly copied = signal('');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** Bumped after the colour scheme changes, once the host has its new class. */
  private readonly version = signal(0);
  private copyTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      this.state.scheme();
      setTimeout(() => this.version.update((v) => v + 1));
    });
    // A section picked in the sidebar or in the index
    effect(() => {
      const target = this.state.foundationsTarget();
      if (target) setTimeout(() => document.getElementById(target.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    });
  }

  protected ref(path: string): string {
    return `var(${cssVar(path)})`;
  }

  protected value(path: string): string {
    this.version();
    return getComputedStyle(this.host).getPropertyValue(cssVar(path)).trim();
  }

  /** rem values also in px (16px root). */
  protected px(path: string): string {
    const raw = this.value(path);
    const rem = /^(-?[\d.]+)rem$/.exec(raw);
    return rem ? `${Math.round(parseFloat(rem[1]) * 16 * 100) / 100}px` : raw === '0' ? '0px' : raw;
  }

  protected jump(event: Event, id: string): void {
    event.preventDefault();
    this.state.openFoundations(id);
  }

  protected async copy(path: string): Promise<void> {
    const text = `var(${cssVar(path)})`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    this.copied.set(text);
    clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.copied.set(''), 1600);
  }
}
