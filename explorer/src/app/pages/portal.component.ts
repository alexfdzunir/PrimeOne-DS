import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ExplorerState } from '../explorer-state';
import { CATEGORIES, DESIGN_SYSTEMS, type DesignSystemId } from '../model';
import { AemBrandCurveComponent } from './aem-brand-curve.component';

/** Look of each design system card: preview colours and the icons of its mosaic. */
const LOOK: Record<DesignSystemId, { tag: string; icons: string[]; cta: string }> = {
  'prime-one': {
    tag: 'Aplicaciones · Estudiantes, Prodi y Foundations',
    icons: ['ph ph-cursor-click', 'ph ph-textbox', 'ph ph-table', 'ph ph-calendar-dots', 'ph ph-chat-circle-dots', 'ph ph-toggle-right'],
    cta: 'Entrar en PrimeOne',
  },
  aem: {
    tag: 'Portales web · Adobe Experience Manager',
    icons: ['ph ph-browser', 'ph ph-cursor-click', 'ph ph-image', 'ph ph-cards', 'ph ph-list-bullets', 'ph ph-megaphone'],
    cta: 'Entrar en AEM Portales',
  },
};

/** General home: the design systems of Proeduca, each one opening its own catalogue. */
@Component({
  selector: 'po-portal',
  imports: [AemBrandCurveComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'po-page po-scroll' },
  template: `
    <header class="po-portal__hero">
      <div class="po-portal__inner">
        <span class="po-portal__eyebrow"><i class="ph ph-graduation-cap" aria-hidden="true"></i> Proeduca · UNIR</span>
        <h1>Design Systems</h1>
        <p class="po-portal__lead">
          Los sistemas de diseño de Proeduca en un mismo sitio: componentes vivos, código listo para copiar, tokens y
          medidas reales, conectados a sus ficheros de Figma. Elige uno para empezar.
        </p>
      </div>
    </header>

    <div class="po-page__inner">
      <ul class="po-portal__systems" aria-label="Sistemas de diseño">
        @for (ds of systems(); track ds.id) {
          <li>
            <button type="button" class="po-portal__card" [class]="'po-portal__card po-portal__card--' + ds.id" (click)="state.setDesignSystem(ds.id)">
              <span class="po-portal__preview" aria-hidden="true">
                @if (ds.id === 'aem') {
                  <po-aem-curve class="po-portal__curve" />
                }
                @for (icon of ds.look.icons; track icon; let i = $index) {
                  <span class="po-portal__tile" [class.po-portal__tile--solid]="i === 2"><i [class]="icon"></i></span>
                }
              </span>
              <span class="po-portal__body">
                <span class="po-portal__tag">{{ ds.look.tag }}</span>
                <span class="po-portal__name">{{ ds.name }}</span>
                <span class="po-portal__stack">{{ ds.stack }}</span>
                <span class="po-portal__description">{{ ds.description }}</span>
                <span class="po-portal__figures">
                  <span><strong>{{ ds.components }}</strong> {{ ds.components === 1 ? 'componente' : 'componentes' }}</span>
                  <span><strong>{{ ds.sections }}</strong> {{ ds.sections === 1 ? 'sección' : 'secciones' }}</span>
                </span>
                <span class="po-portal__cta">{{ ds.look.cta }} <i class="ph ph-arrow-right" aria-hidden="true"></i></span>
              </span>
            </button>
          </li>
        }
      </ul>
      <footer class="po-portal__footer">Design Systems · Proeduca · UNIR</footer>
    </div>
  `,
  styles: `
    :host { background: var(--po-surface-2); }

    .po-portal__hero {
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(circle at 85% 20%, rgb(255 255 255 / 0.18), transparent 45%),
        linear-gradient(135deg, #052761 0%, #0a4ec2 55%, #0d61f2 100%);
      color: #fff;
    }

    .po-portal__hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgb(255 255 255 / 0.07) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: linear-gradient(to right, transparent 10%, #000 75%);
    }

    .po-portal__inner {
      position: relative;
      max-width: 1180px;
      margin: 0 auto;
      padding: 72px 32px 120px;
    }

    .po-portal__eyebrow {
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

    .po-portal__lead {
      max-width: 60ch;
      margin: 0;
      font-size: 1.125rem;
      line-height: 1.6;
      opacity: 0.9;
    }

    .po-page__inner {
      position: relative;
      margin-top: -72px;
    }

    .po-portal__systems {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
      gap: 24px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .po-portal__systems li { display: flex; }

    .po-portal__card {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: hidden;
      padding: 0;
      border: 1px solid var(--p-content-border-color);
      border-radius: 20px;
      background: var(--p-content-background);
      color: var(--p-text-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
      box-shadow: 0 24px 48px -32px rgb(5 39 97 / 0.45);
      transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
    }

    .po-portal__card:hover {
      transform: translateY(-4px);
      border-color: var(--p-primary-color);
      box-shadow: 0 32px 56px -32px rgb(5 39 97 / 0.6);
    }

    .po-portal__card:focus-visible {
      outline: 3px solid var(--p-focus-ring-color);
      outline-offset: 3px;
    }

    .po-portal__preview {
      position: relative;
      overflow: hidden;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 12px;
      padding: 32px;
      background: linear-gradient(135deg, var(--po-portal-from) 0%, var(--po-portal-to) 100%);
    }

    /* Both blue: PrimeOne with the grid of its hero, AEM Portales flat blue 400 with the brand curve of the portals */
    .po-portal__card--prime-one { --po-portal-from: #0a4ec2; --po-portal-to: #3d81f5; --po-portal-accent: #0d61f2; }
    .po-portal__card--prime-one .po-portal__preview {
      background:
        linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(135deg, var(--po-portal-from) 0%, var(--po-portal-to) 100%);
    }
    .po-portal__card--aem { --po-portal-accent: #0a4ec2; }
    .po-portal__card--aem .po-portal__preview { background: #0a4ec2; }

    .po-portal__curve {
      position: absolute;
      inset: 0 0 0 30%;
    }

    .po-portal__tile { position: relative; }

    .po-portal__tile {
      display: grid;
      place-items: center;
      aspect-ratio: 1;
      border: 1px solid rgb(255 255 255 / 0.3);
      border-radius: 14px;
      background: rgb(255 255 255 / 0.14);
      color: #fff;
      font-size: clamp(1.25rem, 2.4vw, 1.75rem);
      backdrop-filter: blur(6px);
    }

    .po-portal__tile--solid {
      background: #fff;
      color: var(--po-portal-accent);
    }

    .po-portal__body {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 8px;
      padding: 28px 32px 32px;
    }

    .po-portal__tag {
      color: var(--p-text-muted-color);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .po-portal__name {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .po-portal__stack {
      align-self: flex-start;
      padding: 2px 10px;
      border-radius: 999px;
      background: var(--p-highlight-background);
      color: var(--p-highlight-color);
      font-size: 0.8125rem;
      font-weight: 600;
    }

    .po-portal__description {
      color: var(--p-text-muted-color);
      line-height: 1.55;
    }

    .po-portal__figures {
      display: flex;
      gap: 20px;
      margin-top: 8px;
      color: var(--p-text-muted-color);
      font-size: 0.875rem;
    }

    .po-portal__figures strong {
      color: var(--p-text-color);
      font-size: 1.125rem;
    }

    .po-portal__cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: auto;
      padding-top: 16px;
      color: var(--p-primary-color);
      font-weight: 600;
    }

    .po-portal__card:hover .po-portal__cta i { transform: translateX(4px); }
    .po-portal__cta i { transition: transform 200ms ease; }

    .po-portal__footer {
      margin: 48px 0 0;
      color: var(--p-text-muted-color);
      font-size: 0.8125rem;
      text-align: center;
    }

    @media (max-width: 767.98px) {
      .po-portal__inner { padding: 48px 16px 104px; }
      .po-portal__preview { gap: 8px; padding: 20px; }
      .po-portal__body { padding: 20px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .po-portal__card, .po-portal__cta i { transition: none; }
      .po-portal__card:hover { transform: none; }
    }
  `,
})
export class PortalComponent {
  protected readonly state = inject(ExplorerState);
  protected readonly systems = computed(() =>
    DESIGN_SYSTEMS.map((ds) => {
      const entries = this.state.entries.filter((entry) => entry.ds === ds.id);
      return {
        ...ds,
        look: LOOK[ds.id],
        components: entries.length,
        sections: CATEGORIES.filter((category) => category.ds === ds.id && entries.some((entry) => entry.category === category.id)).length,
      };
    }),
  );
}
