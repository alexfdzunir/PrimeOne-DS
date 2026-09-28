import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ExplorerState } from '../explorer-state';

/** `primary.contrastColor` -> `--p-primary-contrast-color`. */
const cssVar = (path: string) => `--p-${path.replace(/\./g, '-').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
/** Figma-style name: `primary/contrast-color`. */
const figmaName = (path: string) =>
  path
    .split('.')
    .map((part) => part.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase())
    .join('/');

const SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const PALETTES = [
  { label: 'Primario', path: 'primary', note: 'Azul de marca del tema activo' },
  { label: 'Superficie', path: 'surface', note: 'Fondos, bordes y textos', zero: true },
  { label: 'Éxito', path: 'green', note: 'severity="success"' },
  { label: 'Info', path: 'sky', note: 'severity="info"' },
  { label: 'Aviso', path: 'orange', note: 'severity="warn"' },
  { label: 'Peligro', path: 'red', note: 'severity="danger"' },
  { label: 'Ayuda', path: 'purple', note: 'severity="help"' },
];

const SEMANTIC: { group: string; tokens: string[] }[] = [
  { group: 'Primario', tokens: ['primary.color', 'primary.contrastColor', 'primary.hoverColor', 'primary.activeColor'] },
  { group: 'Texto', tokens: ['text.color', 'text.mutedColor', 'text.hoverColor', 'text.hoverMutedColor'] },
  { group: 'Contenido', tokens: ['content.background', 'content.hoverBackground', 'content.borderColor', 'content.color'] },
  { group: 'Resaltado', tokens: ['highlight.background', 'highlight.color', 'highlight.focusBackground', 'highlight.focusColor'] },
  {
    group: 'Campos de formulario',
    tokens: [
      'formField.background',
      'formField.color',
      'formField.borderColor',
      'formField.hoverBorderColor',
      'formField.focusBorderColor',
      'formField.placeholderColor',
      'formField.invalidBorderColor',
      'formField.disabledBackground',
      'formField.disabledColor',
    ],
  },
  { group: 'Acciones negativas', tokens: ['danger.color', 'danger.hoverBackground'] },
  { group: 'Foco y máscara', tokens: ['focusRing.color', 'mask.background', 'mask.color'] },
];

const TYPE_SCALE: { name: string; path: string; weights: [string, string][]; sample: string }[] = [
  { name: 'Headline 1', path: 'typography.headline.h1', weights: [['SemiBold', 'semibold']], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 2', path: 'typography.headline.h2', weights: [['SemiBold', 'semibold']], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 3', path: 'typography.headline.h3', weights: [['SemiBold', 'semibold']], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 4', path: 'typography.headline.h4', weights: [['SemiBold', 'semibold']], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 5', path: 'typography.headline.h5', weights: [['SemiBold', 'semibold']], sample: 'Grado en Ingeniería Informática' },
  { name: 'Headline 6', path: 'typography.headline.h6', weights: [['SemiBold', 'semibold']], sample: 'Grado en Ingeniería Informática' },
  { name: 'Body M', path: 'typography.body.m', weights: [['Regular', 'regular'], ['Medium', 'medium'], ['Bold', 'semibold']], sample: 'Accede a tus asignaturas, tareas y calificaciones.' },
  { name: 'Body S', path: 'typography.body.s', weights: [['Regular', 'regular'], ['Medium', 'medium'], ['Bold', 'semibold']], sample: 'Accede a tus asignaturas, tareas y calificaciones.' },
  { name: 'Body XS', path: 'typography.body.xs', weights: [['Regular', 'regular'], ['Medium', 'medium'], ['Bold', 'semibold']], sample: 'Accede a tus asignaturas, tareas y calificaciones.' },
  { name: 'Label L', path: 'typography.label.l', weights: [['Regular', 'regular'], ['Medium', 'medium']], sample: 'Nombre y apellidos' },
  { name: 'Label M', path: 'typography.label.m', weights: [['Regular', 'regular'], ['Medium', 'medium']], sample: 'Nombre y apellidos' },
  { name: 'Label S', path: 'typography.label.s', weights: [['Regular', 'regular'], ['Medium', 'medium']], sample: 'Nombre y apellidos' },
  { name: 'Caption', path: 'typography.caption', weights: [['Regular', 'regular'], ['Medium', 'medium'], ['Bold', 'semibold']], sample: 'Actualizado hace 2 horas' },
];

const WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];
const RADII = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const RADIUS_ROLES = [
  ['Contenido', 'content.borderRadius'],
  ['Campos', 'formField.borderRadius'],
  ['Opción de lista', 'list.option.borderRadius'],
  ['Ítem de navegación', 'navigation.item.borderRadius'],
  ['Desplegable', 'overlay.select.borderRadius'],
  ['Popover', 'overlay.popover.borderRadius'],
  ['Modal', 'overlay.modal.borderRadius'],
];
const SHADOWS = [
  ['Desplegable', 'overlay.select.shadow'],
  ['Popover', 'overlay.popover.shadow'],
  ['Modal', 'overlay.modal.shadow'],
  ['Navegación', 'overlay.navigation.shadow'],
];
const SCALE = ['0-125', '0-25', '0-375', '0-5', '0-625', '0-75', '0-875', '1', '1-125', '1-25', '1-5', '1-75', '2', '2-5', '3', '4', '5'];
const ICONS = ['house', 'magnifying-glass', 'calendar-dots', 'bell', 'user-circle', 'graduation-cap', 'book-open-text', 'chat-circle-dots', 'trash', 'check-circle'];

/** Sections of the Foundations page: anchors, the sidebar items and the page index. */
export const FOUNDATION_SECTIONS = [
  { id: 'tipografia', label: 'Tipografía' },
  { id: 'color', label: 'Color' },
  { id: 'semanticos', label: 'Tokens semánticos' },
  { id: 'radios', label: 'Radios' },
  { id: 'espaciado', label: 'Espaciado' },
  { id: 'sombras', label: 'Sombras' },
  { id: 'iconos', label: 'Iconos' },
];

/**
 * Foundations of the DS read live from the tokens of the active theme and scheme (the same CSS variables the
 * components use): typography, colour palettes, semantic tokens, radii, spacing, shadows and icons.
 */
@Component({
  selector: 'po-foundations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'po-page po-scroll' },
  template: `
    <div class="po-page__inner">
      <nav class="po-found__crumbs" aria-label="Ruta">
        <button type="button" (click)="state.goHome()">Inicio</button>
        <i class="ph ph-caret-right" aria-hidden="true"></i>
        <span aria-current="page">Foundations</span>
      </nav>
      <header class="po-found__header">
        <p class="po-eyebrow">Foundations</p>
        <h1>Tokens del sistema</h1>
        <p class="po-found__lead">
          Valores reales de los tokens del tema <strong>{{ themeLabel() }}</strong> en modo {{ state.scheme() === 'dark' ? 'oscuro' : 'claro' }}: son las variables
          CSS que usan los componentes y cambian al cambiar de tema. Pulsa un token para copiar su <code>var()</code>.
        </p>
        <nav class="po-found__toc" aria-label="Secciones">
          @for (s of sections; track s.id) {
            <a [href]="'#' + s.id" (click)="jump($event, s.id)">{{ s.label }}</a>
          }
        </nav>
      </header>

      <section id="tipografia" class="po-found__section">
        <h2>Tipografía</h2>
        <div class="po-found__family">
          <span class="po-found__aa">Aa</span>
          <div>
            <strong>Proeduca Sans</strong>
            <button type="button" class="po-token" (click)="copy('typography.family')">
              <code>{{ name('typography.family') }}</code>
            </button>
            <div class="po-found__weights">
              @for (w of weights; track w) {
                <button type="button" class="po-found__weight" [style.font-weight]="value('typography.weight.' + w)" (click)="copy('typography.weight.' + w)">
                  {{ w }} · {{ value('typography.weight.' + w) }}
                </button>
              }
            </div>
          </div>
        </div>
        <div class="po-found__type">
          @for (t of typeScale; track t.path) {
            <div class="po-found__type-row">
              <div class="po-found__type-meta">
                <strong>{{ t.name }}</strong>
                <button type="button" class="po-token" (click)="copy(t.path + '.size')">
                  <code>{{ name(t.path + '.size') }}</code>
                  <span>{{ px(t.path + '.size') }}</span>
                </button>
                <button type="button" class="po-token" (click)="copy(t.path + '.lineHeight')">
                  <code>{{ name(t.path + '.lineHeight') }}</code>
                  <span>{{ px(t.path + '.lineHeight') }}</span>
                </button>
                <span class="po-found__chips">
                  @for (w of t.weights; track w[0]) {
                    <span>{{ w[0] }} {{ value('typography.weight.' + w[1]) }}</span>
                  }
                </span>
              </div>
              <p
                class="po-found__sample"
                [style.font-size]="ref(t.path + '.size')"
                [style.line-height]="ref(t.path + '.lineHeight')"
                [style.font-weight]="ref('typography.weight.' + t.weights[0][1])"
              >
                {{ t.sample }}
              </p>
            </div>
          }
        </div>
      </section>

      <section id="color" class="po-found__section">
        <h2>Color</h2>
        @for (p of palettes; track p.path) {
          <div class="po-found__palette">
            <div class="po-found__palette-head">
              <strong>{{ p.label }}</strong>
              <span class="po-muted">{{ p.note }}</span>
            </div>
            <div class="po-found__swatches">
              @for (shade of p.zero ? shadesWithZero : shades; track shade) {
                <button type="button" class="po-found__swatch" (click)="copy(p.path + '.' + shade)" [attr.aria-label]="name(p.path + '.' + shade) + ' ' + value(p.path + '.' + shade)">
                  <span class="po-found__chip" [style.background]="ref(p.path + '.' + shade)"></span>
                  <span class="po-found__shade">{{ shade }}</span>
                  <code>{{ value(p.path + '.' + shade) }}</code>
                </button>
              }
            </div>
          </div>
        }
      </section>

      <section id="semanticos" class="po-found__section">
        <h2>Tokens semánticos</h2>
        <div class="po-found__groups">
          @for (g of semantic; track g.group) {
            <div class="po-found__group">
              <h3 class="po-eyebrow">{{ g.group }}</h3>
              @for (t of g.tokens; track t) {
                <button type="button" class="po-found__row" (click)="copy(t)">
                  <span class="po-found__dot" [style.background]="ref(t)"></span>
                  <code>{{ name(t) }}</code>
                  <span class="po-found__val">{{ value(t) }}</span>
                </button>
              }
            </div>
          }
        </div>
      </section>

      <section id="radios" class="po-found__section">
        <h2>Radios</h2>
        <div class="po-found__radii">
          @for (r of radii; track r) {
            <button type="button" class="po-found__radius" (click)="copy('borderRadius.' + r)">
              <span [style.border-radius]="ref('borderRadius.' + r)"></span>
              <code>{{ name('borderRadius.' + r) }}</code>
              <em>{{ value('borderRadius.' + r) }}</em>
            </button>
          }
        </div>
        <h3 class="po-eyebrow po-found__sub">Roles del tema</h3>
        <div class="po-found__radii">
          @for (r of radiusRoles; track r[1]) {
            <button type="button" class="po-found__radius" (click)="copy(r[1])">
              <span [style.border-radius]="ref(r[1])"></span>
              <strong>{{ r[0] }}</strong>
              <code>{{ name(r[1]) }}</code>
              <em>{{ value(r[1]) }}</em>
            </button>
          }
        </div>
      </section>

      <section id="espaciado" class="po-found__section">
        <h2>Espaciado</h2>
        <div class="po-found__scale">
          @for (s of scale; track s) {
            <button type="button" class="po-found__step" (click)="copy('scale.' + s)">
              <code>{{ name('scale.' + s) }}</code>
              <span class="po-found__bar" [style.width]="ref('scale.' + s)"></span>
              <em>{{ px('scale.' + s) }}</em>
            </button>
          }
        </div>
      </section>

      <section id="sombras" class="po-found__section">
        <h2>Sombras</h2>
        <div class="po-found__shadows">
          @for (s of shadows; track s[1]) {
            <button type="button" class="po-found__shadow" (click)="copy(s[1])">
              <span [style.box-shadow]="ref(s[1])"></span>
              <strong>{{ s[0] }}</strong>
              <code>{{ name(s[1]) }}</code>
            </button>
          }
        </div>
      </section>

      <section id="iconos" class="po-found__section">
        <h2>Iconos</h2>
        <p class="po-muted">Phosphor Icons en tres pesos: <code>ph</code> (regular), <code>ph-bold</code> y <code>ph-fill</code>.</p>
        @for (weight of iconWeights; track weight) {
          <div class="po-found__icons">
            <code>{{ weight }}</code>
            @for (icon of icons; track icon) {
              <i [class]="weight + ' ph-' + icon" [attr.title]="'ph-' + icon"></i>
            }
          </div>
        }
      </section>

      @if (copied()) {
        <div class="po-found__toast" role="status">Copiado: <code>{{ copied() }}</code></div>
      }
    </div>
  `,
  styles: `
    :host { background: var(--p-content-background); }
    .po-found__crumbs { display: flex; align-items: center; gap: 6px; margin-bottom: 20px; color: var(--p-text-muted-color); font-size: 0.8125rem; }
    .po-found__crumbs button { padding: 0; border: 0; background: none; color: inherit; font: inherit; cursor: pointer; }
    .po-found__crumbs button:hover { color: var(--p-primary-color); text-decoration: underline; }
    .po-found__crumbs span { color: var(--p-text-color); font-weight: 500; }
    .po-found__header .po-eyebrow { margin: 0 0 4px; }
    h1 { margin: 0; font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; letter-spacing: -0.02em; }
    .po-found__lead { max-width: 70ch; margin: 10px 0 16px; color: var(--p-text-muted-color); font-size: 1rem; }
    code { font-family: var(--po-font-mono); font-size: 0.75rem; }
    .po-found__toc { display: flex; flex-wrap: wrap; gap: 8px; }
    .po-found__toc a {
      padding: 4px 12px;
      border: 1px solid var(--p-content-border-color);
      border-radius: 999px;
      color: var(--p-text-color);
      font-size: 0.8125rem;
      text-decoration: none;
    }
    .po-found__toc a:hover { border-color: var(--p-primary-color); color: var(--p-primary-color); }
    .po-found__section { margin-top: 48px; scroll-margin-top: 16px; }
    h2 { margin: 0 0 16px; padding-bottom: 8px; border-bottom: 1px solid var(--p-content-border-color); font-size: 1.375rem; font-weight: 700; }
    button { font: inherit; color: inherit; cursor: pointer; }
    button:focus-visible, a:focus-visible { outline: 2px solid var(--p-focus-ring-color); outline-offset: 2px; }
    .po-token { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; width: 100%; padding: 0; border: 0; background: none; color: var(--p-text-muted-color); }
    .po-token:hover code { color: var(--p-primary-color); }
    .po-token span { color: var(--p-text-color); font-size: 0.75rem; font-variant-numeric: tabular-nums; white-space: nowrap; }

    /* Typography */
    .po-found__family { display: flex; align-items: center; gap: 24px; margin-bottom: 24px; padding: 20px; border: 1px solid var(--p-content-border-color); border-radius: var(--po-radius); }
    .po-found__aa { font-size: 4rem; font-weight: 600; line-height: 1; color: var(--p-primary-color); }
    .po-found__family strong { display: block; font-size: 1.25rem; }
    .po-found__weights { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
    .po-found__weight { padding: 4px 10px; border: 1px solid var(--p-content-border-color); border-radius: 8px; background: none; font-size: 0.875rem; }
    .po-found__weight:hover { border-color: var(--p-primary-color); }
    .po-found__type { display: flex; flex-direction: column; }
    .po-found__type-row { display: grid; grid-template-columns: minmax(300px, 360px) minmax(0, 1fr); gap: 24px; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--p-content-border-color); }
    .po-found__type-meta { display: flex; flex-direction: column; gap: 2px; }
    .po-found__type-meta strong { font-size: 0.875rem; }
    .po-found__chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
    .po-found__chips span { padding: 0 6px; border-radius: 4px; background: var(--po-surface-3); color: var(--p-text-muted-color); font-size: 0.6875rem; }
    .po-found__sample { margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    /* Colour */
    .po-found__palette { margin-bottom: 20px; }
    .po-found__palette-head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px; }
    .po-found__palette-head .po-muted { font-size: 0.75rem; }
    .po-found__swatches { display: flex; flex-wrap: wrap; gap: 8px; }
    .po-found__swatch { display: flex; flex: 1 1 56px; flex-direction: column; gap: 4px; min-width: 0; padding: 0; border: 0; background: none; text-align: start; }
    .po-found__chip { height: 48px; border-radius: 8px; box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.08); }
    .po-found__swatch:hover .po-found__chip { outline: 2px solid var(--p-primary-color); outline-offset: 2px; }
    .po-found__shade { font-size: 0.75rem; font-weight: 600; }
    .po-found__swatch code { color: var(--p-text-muted-color); font-size: 0.6875rem; }

    /* Semantic */
    .po-found__groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px 32px; }
    .po-found__group h3 { margin: 0 0 6px; }
    .po-found__row { display: grid; grid-template-columns: 18px minmax(0, 1fr) auto; gap: 10px; align-items: center; width: 100%; padding: 6px 4px; border: 0; border-bottom: 1px solid var(--p-content-border-color); background: none; text-align: start; }
    .po-found__row:hover { background: var(--p-content-hover-background); }
    .po-found__dot { width: 18px; height: 18px; border-radius: 5px; box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.12); }
    .po-found__row code { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .po-found__val { color: var(--p-text-muted-color); font-family: var(--po-font-mono); font-size: 0.6875rem; }

    /* Radii */
    .po-found__radii { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; }
    .po-found__radius { display: flex; flex-direction: column; gap: 4px; padding: 12px; border: 1px solid var(--p-content-border-color); border-radius: 10px; background: none; text-align: start; }
    .po-found__radius:hover { border-color: var(--p-primary-color); }
    .po-found__radius > span { width: 56px; height: 56px; margin-bottom: 6px; border: 2px solid var(--p-primary-color); background: var(--p-highlight-background); }
    .po-found__radius strong { font-size: 0.8125rem; }
    .po-found__radius code { overflow-wrap: anywhere; }
    .po-found__radius em, .po-found__step em { white-space: nowrap; color: var(--p-text-muted-color); font-size: 0.75rem; font-style: normal; font-variant-numeric: tabular-nums; }
    .po-found__sub { margin: 20px 0 8px; }

    /* Spacing */
    .po-found__scale { display: flex; flex-direction: column; gap: 4px; }
    .po-found__step { display: grid; grid-template-columns: 110px minmax(0, 1fr) 120px; gap: 12px; align-items: center; padding: 4px; border: 0; background: none; text-align: start; }
    .po-found__step:hover { background: var(--p-content-hover-background); }
    .po-found__bar { height: 12px; border-radius: 3px; background: color-mix(in srgb, var(--p-primary-color) 55%, transparent); }

    /* Shadows */
    .po-found__shadows { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
    .po-found__shadow { display: flex; flex-direction: column; gap: 4px; padding: 0; border: 0; background: none; text-align: start; }
    .po-found__shadow > span { height: 80px; margin-bottom: 8px; border-radius: 10px; background: var(--p-content-background); border: 1px solid var(--p-content-border-color); }

    /* Icons */
    .po-found__icons { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 1px solid var(--p-content-border-color); }
    .po-found__icons code { width: 64px; color: var(--p-text-muted-color); }
    .po-found__icons i { font-size: 1.5rem; }

    .po-found__toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 14px;
      border-radius: 8px;
      background: var(--p-text-color);
      color: var(--p-content-background);
      font-size: 0.8125rem;
      box-shadow: 0 8px 24px -8px rgb(0 0 0 / 0.4);
    }
    .po-found__toast code { color: inherit; }

    @media (max-width: 767.98px) {
      .po-found__type-row { grid-template-columns: minmax(0, 1fr); gap: 8px; }
      .po-found__step { grid-template-columns: 96px minmax(0, 1fr) 104px; }
    }
  `,
})
export class FoundationsComponent {
  protected readonly state = inject(ExplorerState);
  protected readonly sections = FOUNDATION_SECTIONS;
  protected readonly palettes = PALETTES;
  protected readonly shades = SHADES;
  protected readonly shadesWithZero = ['0', ...SHADES];
  protected readonly semantic = SEMANTIC;
  protected readonly typeScale = TYPE_SCALE;
  protected readonly weights = WEIGHTS;
  protected readonly radii = RADII;
  protected readonly radiusRoles = RADIUS_ROLES;
  protected readonly shadows = SHADOWS;
  protected readonly scale = SCALE;
  protected readonly icons = ICONS;
  protected readonly iconWeights = ['ph', 'ph-bold', 'ph-fill'];
  protected readonly copied = signal('');
  protected readonly themeLabel = computed(() => ({ estudiantes: 'Estudiantes', prodi: 'Prodi', foundations: 'Foundations' })[this.state.theme()]);

  /** Bumped after the theme or scheme changes, once the new variables are in place. */
  private readonly version = signal(0);
  private copyTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      this.state.theme();
      this.state.scheme();
      setTimeout(() => this.version.update((v) => v + 1), 60);
    });
    // A section picked in the sidebar or in the index
    effect(() => {
      const target = this.state.foundationsTarget();
      if (target) setTimeout(() => document.getElementById(target.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    });
  }

  /** `var(--p-…)` for a style binding. */
  protected ref(path: string): string {
    return `var(${cssVar(path)})`;
  }

  protected name(path: string): string {
    return figmaName(path);
  }

  protected value(path: string): string {
    this.version();
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar(path)).trim();
  }

  /** rem values also in px (16px root). */
  protected px(path: string): string {
    const raw = this.value(path);
    const rem = /^(-?[\d.]+)rem$/.exec(raw);
    return rem ? `${Math.round(parseFloat(rem[1]) * 16 * 100) / 100}px · ${raw}` : raw;
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
