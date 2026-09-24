import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject } from '@angular/core';
import { accentColor, componentMeta } from '../catalog-meta';
import { ExplorerState } from '../explorer-state';
import { CATEGORIES } from '../model';

/** Overview of a section: header and a visual card per component that opens it in the stage. */
@Component({
  selector: 'po-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'po-page po-scroll', '[style.--po-accent]': 'accent()' },
  template: `
    <div class="po-page__inner">
      <nav class="po-section__crumbs" aria-label="Ruta">
        <button type="button" (click)="state.goHome()">Inicio</button>
        <i class="ph ph-caret-right" aria-hidden="true"></i>
        <span aria-current="page">{{ section().label }}</span>
      </nav>

      <header class="po-section__header">
        <div class="po-tile po-section__tile" aria-hidden="true"><i [class]="section().icon"></i></div>
        <div class="po-section__intro">
          <p class="po-eyebrow">Sección</p>
          <h1>{{ section().label }}</h1>
          <p class="po-section__lead">{{ section().description }}</p>
          <ul class="po-section__stats">
            <li><strong>{{ cards().length }}</strong> componentes</li>
            <li><strong>{{ variants() }}</strong> variantes</li>
            <li><i class="ph ph-figma-logo" aria-hidden="true"></i><strong>{{ linked() }}</strong> enlazados con Figma</li>
          </ul>
        </div>
      </header>

      <ul class="po-section__grid">
        @for (card of cards(); track card.id) {
          <li>
            <button type="button" class="po-link-card po-card" (click)="state.select(card.id)">
              <span class="po-tile po-card__art" aria-hidden="true">
                <i [class]="card.icon"></i>
                @if (card.figma) {
                  <span class="po-card__figma" title="Enlazado con Figma"><i class="ph ph-figma-logo"></i></span>
                }
              </span>
              <span class="po-card__body">
                <span class="po-card__title">{{ card.title }}</span>
                @if (card.summary) {
                  <span class="po-card__summary">{{ card.summary }}</span>
                }
                <span class="po-card__meta">
                  <span>{{ card.variants }} {{ card.variants === 1 ? 'variante' : 'variantes' }}</span>
                  <i class="ph ph-arrow-right po-card__arrow" aria-hidden="true"></i>
                </span>
              </span>
            </button>
          </li>
        }
      </ul>

      <nav class="po-section__pager" aria-label="Otras secciones">
        @if (previous(); as prev) {
          <button type="button" class="po-section__step" (click)="state.openSection(prev.id)">
            <i class="ph ph-arrow-left" aria-hidden="true"></i>
            <span><span class="po-eyebrow">Anterior</span>{{ prev.label }}</span>
          </button>
        }
        @if (next(); as nxt) {
          <button type="button" class="po-section__step po-section__step--next" (click)="state.openSection(nxt.id)">
            <span><span class="po-eyebrow">Siguiente</span>{{ nxt.label }}</span>
            <i class="ph ph-arrow-right" aria-hidden="true"></i>
          </button>
        }
      </nav>
    </div>
  `,
  styles: `
    .po-section__crumbs {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 20px;
      color: var(--p-text-muted-color);
      font-size: 0.8125rem;
    }

    .po-section__crumbs button {
      padding: 0;
      border: 0;
      background: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }

    .po-section__crumbs button:hover {
      color: var(--p-primary-color);
      text-decoration: underline;
    }

    .po-section__crumbs span {
      color: var(--p-text-color);
      font-weight: 500;
    }

    .po-section__header {
      display: flex;
      align-items: center;
      gap: 28px;
      margin-bottom: 32px;
    }

    .po-section__tile {
      flex: none;
      width: 128px;
      height: 128px;
      border-radius: 28px;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--po-accent) 25%, transparent);
      font-size: 56px;
    }

    .po-section__intro {
      min-width: 0;
    }

    .po-section__intro .po-eyebrow {
      margin: 0 0 4px;
    }

    h1 {
      margin: 0;
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .po-section__lead {
      max-width: 60ch;
      margin: 10px 0 16px;
      color: var(--p-text-muted-color);
      font-size: 1rem;
    }

    .po-section__stats {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .po-section__stats li {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border: 1px solid var(--p-content-border-color);
      border-radius: 999px;
      background: var(--p-content-background);
      color: var(--p-text-muted-color);
      font-size: 0.8125rem;
    }

    .po-section__stats strong {
      color: var(--p-text-color);
    }

    .po-section__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .po-section__grid li {
      display: flex;
    }

    .po-card {
      flex: 1;
    }

    .po-card__art {
      height: 132px;
      border-bottom: 1px solid var(--p-content-border-color);
      font-size: 52px;
    }

    .po-card__figma {
      position: absolute;
      top: 10px;
      right: 10px;
      display: grid;
      place-items: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--p-content-background);
      box-shadow: 0 1px 3px rgb(0 0 0 / 0.12);
      color: var(--p-text-muted-color);
      font-size: 14px;
    }

    .po-card__body {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 4px;
      padding: 14px 16px 12px;
    }

    .po-card__title {
      font-size: 0.9375rem;
      font-weight: 600;
    }

    .po-card__summary {
      color: var(--p-text-muted-color);
      font-size: 0.8125rem;
      line-height: 1.45;
    }

    .po-card__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 10px;
      color: var(--p-text-muted-color);
      font-size: 0.75rem;
    }

    .po-card__arrow {
      font-size: 1rem;
      transition: transform 180ms ease, color 180ms ease;
    }

    .po-card:hover .po-card__arrow {
      color: var(--p-primary-color);
      transform: translateX(3px);
    }

    .po-section__pager {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid var(--p-content-border-color);
    }

    .po-section__step {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      border: 1px solid var(--p-content-border-color);
      border-radius: var(--po-radius);
      background: var(--p-content-background);
      color: var(--p-text-color);
      font: inherit;
      font-weight: 600;
      text-align: start;
      cursor: pointer;
      transition: border-color 150ms, color 150ms;
    }

    .po-section__step > span {
      display: flex;
      flex-direction: column;
    }

    .po-section__step:hover {
      border-color: var(--p-primary-color);
      color: var(--p-primary-color);
    }

    .po-section__step--next {
      margin-inline-start: auto;
      text-align: end;
    }

    .po-section__step i {
      font-size: 1.125rem;
    }

    button:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: 2px;
    }

    @media (max-width: 767.98px) {
      .po-section__header {
        align-items: flex-start;
        gap: 16px;
      }

      .po-section__tile {
        width: 72px;
        height: 72px;
        border-radius: 18px;
        font-size: 34px;
      }

      .po-section__grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 12px;
      }

      .po-card__art {
        height: 96px;
        font-size: 40px;
      }
    }
  `,
})
export class SectionComponent {
  protected readonly state = inject(ExplorerState);

  protected readonly section = computed(() => {
    const view = this.state.view();
    return CATEGORIES.find((c) => view.kind === 'section' && c.id === view.id) ?? CATEGORIES[0];
  });
  protected readonly accent = computed(() => accentColor(this.section().accent));
  private readonly index = computed(() => CATEGORIES.indexOf(this.section()));
  protected readonly previous = computed(() => CATEGORIES[this.index() - 1]);
  protected readonly next = computed(() => CATEGORIES[this.index() + 1]);

  protected readonly cards = computed(() =>
    this.state.entries
      .filter((entry) => entry.category === this.section().id)
      .map((entry) => ({
        id: entry.id,
        title: entry.title,
        ...componentMeta(entry.title, this.section().icon),
        variants: entry.presets.length,
        figma: !!entry.figmaUrl,
      })),
  );
  protected readonly variants = computed(() => this.cards().reduce((total, card) => total + card.variants, 0));
  protected readonly linked = computed(() => this.cards().filter((card) => card.figma).length);

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  constructor() {
    // The same component serves every section: a new section starts at the top
    effect(() => {
      this.section();
      this.host.nativeElement.scrollTop = 0;
    });
  }
}
