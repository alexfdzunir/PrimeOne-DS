import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ExplorerState } from '../explorer-state';
import { CATEGORIES, THEMES } from '../model';

const FIGMA_URL = 'https://www.figma.com/design/lWpcnToQVkqEqFifm67QaG/Design-system---PrimeOne';
const REPO_URL = 'https://github.com/alexfdzunir/PrimeOne-DS';

/** Landing of the explorer: brand hero with the key figures, and the sections of the catalogue. */
@Component({
  selector: 'po-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'po-page po-scroll' },
  template: `
    <header class="po-hero">
      <div class="po-hero__inner">
        <span class="po-hero__eyebrow"><i class="ph ph-graduation-cap" aria-hidden="true"></i> Proeduca · UNIR</span>
        <h1>PrimeOne <span>Design System</span></h1>
        <p class="po-hero__lead">
          Componentes Angular sobre PrimeNG 21 con los temas de Proeduca, conectados a Figma con Code Connect. Un único
          lenguaje visual para Estudiantes, Prodi y Foundations, en claro y oscuro.
        </p>
        <div class="po-hero__actions">
          <button type="button" class="po-cta po-cta--solid" (click)="state.openSection(firstSection)">
            Explorar componentes <i class="ph ph-arrow-right" aria-hidden="true"></i>
          </button>
          <a class="po-cta po-cta--ghost" [href]="figmaUrl" target="_blank" rel="noopener">
            <i class="ph ph-figma-logo" aria-hidden="true"></i> Abrir en Figma
          </a>
          <a class="po-cta po-cta--ghost" [href]="repoUrl" target="_blank" rel="noopener">
            <i class="ph ph-github-logo" aria-hidden="true"></i> Repositorio
          </a>
        </div>
        <dl class="po-hero__figures">
          @for (figure of figures(); track figure.label) {
            <div>
              <dt>{{ figure.label }}</dt>
              <dd>{{ figure.value }}</dd>
            </div>
          }
        </dl>
      </div>
    </header>

    <div class="po-page__inner po-home__body">

      <section aria-labelledby="po-home-sections">
        <h2 class="po-eyebrow" id="po-home-sections">Secciones</h2>
        <ul class="po-home__sections">
          @for (section of sections(); track section.id) {
            <li>
              <button type="button" class="po-home__section" (click)="state.openSection(section.id)">
                <i [class]="section.icon + ' po-home__icon'" aria-hidden="true"></i>
                <span class="po-home__title">
                  {{ section.label }}
                  <span class="po-home__count">{{ section.count }}</span>
                </span>
                <span class="po-home__summary">{{ section.description }}</span>
                <i class="ph ph-arrow-right po-home__arrow" aria-hidden="true"></i>
              </button>
            </li>
          }
        </ul>
      </section>

      <footer class="po-home__footer">PrimeOne Design System · PrimeNG 21 · Angular 21</footer>
    </div>
  `,
  styles: `
    :host {
      background: var(--p-content-background);
    }

    /* Hero: brand band with grid pattern and soft glows */
    .po-hero {
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(circle at 85% 20%, rgb(255 255 255 / 0.18), transparent 45%),
        radial-gradient(circle at 10% 110%, rgb(255 255 255 / 0.1), transparent 40%),
        linear-gradient(135deg, var(--p-primary-800) 0%, var(--p-primary-600) 60%, var(--p-primary-500) 100%);
      color: #fff;
    }

    :host-context(html.po-dark) .po-hero {
      background:
        radial-gradient(circle at 85% 20%, rgb(255 255 255 / 0.08), transparent 45%),
        linear-gradient(135deg, var(--p-primary-950) 0%, var(--p-primary-900) 55%, var(--p-primary-800) 100%);
    }

    .po-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgb(255 255 255 / 0.07) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: linear-gradient(to right, transparent 10%, #000 75%);
    }

    .po-hero__inner {
      position: relative;
      width: min(100%, 1200px);
      margin: 0 auto;
      padding: 72px 32px 48px;
    }

    .po-hero__eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      border: 1px solid rgb(255 255 255 / 0.3);
      border-radius: 999px;
      background: rgb(255 255 255 / 0.1);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    h1 {
      margin: 20px 0 16px;
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 800;
      line-height: 1.02;
      letter-spacing: -0.03em;
    }

    h1 span {
      display: block;
      font-weight: 400;
      opacity: 0.85;
    }

    .po-hero__lead {
      max-width: 56ch;
      margin: 0 0 32px;
      font-size: 1.0625rem;
      line-height: 1.6;
      opacity: 0.9;
    }

    .po-hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .po-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 18px;
      border: 1px solid transparent;
      border-radius: 999px;
      font: inherit;
      font-size: 0.9375rem;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: background 150ms, transform 150ms;
    }

    .po-cta i {
      font-size: 1.125rem;
    }

    .po-cta--solid {
      background: #fff;
      color: var(--p-primary-700);
    }

    .po-cta--solid:hover {
      background: var(--p-primary-50);
      transform: translateY(-1px);
    }

    .po-cta--ghost {
      border-color: rgb(255 255 255 / 0.4);
      background: transparent;
      color: #fff;
    }

    .po-cta--ghost:hover {
      background: rgb(255 255 255 / 0.12);
    }

    .po-cta:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }

    .po-hero__figures {
      display: flex;
      flex-wrap: wrap;
      gap: 24px 56px;
      margin: 56px 0 0;
      padding-top: 24px;
      border-top: 1px solid rgb(255 255 255 / 0.2);
    }

    .po-hero__figures div {
      display: flex;
      flex-direction: column-reverse;
    }

    .po-hero__figures dt {
      font-size: 0.8125rem;
      opacity: 0.75;
    }

    .po-hero__figures dd {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
    }

    .po-home__body {
      padding-top: 48px;
    }

    section > .po-eyebrow {
      margin: 0 0 16px;
    }

    .po-home__sections {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .po-home__sections li {
      display: flex;
    }

    .po-home__section {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 4px;
      padding: 20px;
      border: 1px solid var(--p-content-border-color);
      border-radius: var(--po-radius);
      background: transparent;
      color: var(--p-text-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
      transition: border-color 150ms, background 150ms;
    }

    .po-home__section:hover {
      border-color: var(--p-text-muted-color);
      background: var(--po-surface-2);
    }

    .po-home__section:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: 2px;
    }

    .po-home__icon {
      margin-bottom: 12px;
      color: var(--p-text-muted-color);
      font-size: 1.5rem;
      transition: color 150ms;
    }

    .po-home__section:hover .po-home__icon,
    .po-home__section:hover .po-home__arrow {
      color: var(--p-primary-color);
    }

    .po-home__title {
      display: flex;
      align-items: baseline;
      gap: 8px;
      font-size: 1rem;
      font-weight: 600;
    }

    .po-home__count {
      color: var(--p-text-muted-color);
      font-size: 0.8125rem;
      font-weight: 400;
      font-variant-numeric: tabular-nums;
    }

    .po-home__summary {
      color: var(--p-text-muted-color);
      font-size: 0.8125rem;
      line-height: 1.5;
    }

    .po-home__arrow {
      position: absolute;
      top: 20px;
      right: 20px;
      color: transparent;
      font-size: 1rem;
      transition: color 150ms, transform 150ms;
    }

    .po-home__section:hover .po-home__arrow {
      transform: translateX(2px);
    }

    .po-home__footer {
      margin-top: 72px;
      padding-top: 24px;
      border-top: 1px solid var(--p-content-border-color);
      color: var(--p-text-muted-color);
      font-size: 0.75rem;
    }

    a:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: 2px;
    }

    @media (max-width: 767.98px) {
      .po-hero__inner {
        padding: 40px 16px 32px;
      }

      .po-hero__figures {
        gap: 20px 32px;
        margin-top: 40px;
      }

      .po-home__body {
        padding-top: 32px;
      }

      .po-home__footer {
        margin-top: 48px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .po-home__section,
      .po-home__arrow {
        transition: none;
      }
    }
  `,
})
export class HomeComponent {
  protected readonly state = inject(ExplorerState);
  protected readonly firstSection = CATEGORIES[0].id;
  protected readonly figmaUrl = FIGMA_URL;
  protected readonly repoUrl = REPO_URL;

  protected readonly sections = computed(() =>
    CATEGORIES.map((category) => ({ ...category, count: this.state.entries.filter((entry) => entry.category === category.id).length })).filter(
      (section) => section.count > 0,
    ),
  );

  protected readonly figures = computed(() => {
    const entries = this.state.entries;
    return [
      { label: 'Componentes', value: entries.length },
      { label: 'Secciones', value: this.sections().length },
      { label: 'Variantes', value: entries.reduce((total, entry) => total + entry.presets.length, 0) },
      { label: 'Temas', value: THEMES.length },
    ];
  });
}
