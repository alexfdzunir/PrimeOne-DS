import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { ExplorerState } from '../explorer-state';

/** Catalogue of the DS: search and the components grouped by category. Width and collapse are owned by the shell. */
@Component({
  selector: 'po-sidebar',
  imports: [IconField, InputIcon, InputText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onDocumentKeydown($event)' },
  template: `
    <div class="po-sidebar__search">
      <p-iconfield>
        <p-inputicon class="ph ph-magnifying-glass" />
        <input
          #search
          pInputText
          pSize="small"
          [fluid]="true"
          type="text"
          autocomplete="off"
          placeholder="Buscar componente"
          aria-label="Buscar componente"
          [value]="state.query()"
          (input)="state.query.set(search.value)"
        />
        @if (state.query()) {
          <button type="button" class="po-sidebar__clear" aria-label="Limpiar búsqueda" (click)="clear()">
            <i class="ph ph-x"></i>
          </button>
        } @else {
          <kbd class="po-sidebar__kbd" aria-hidden="true">/</kbd>
        }
      </p-iconfield>
    </div>

    <nav #list class="po-sidebar__list po-scroll" aria-label="Componentes">
      @for (group of state.groups(); track group.id) {
        <section class="po-sidebar__group">
          <h2 class="po-sidebar__group-title">
            <i [class]="group.icon" aria-hidden="true"></i>
            <span>{{ group.label }}</span>
            <span class="po-sidebar__group-count">{{ group.entries.length }}</span>
          </h2>
          <ul class="po-sidebar__items">
            @for (entry of group.entries; track entry.id) {
              <li>
                <button
                  type="button"
                  class="po-sidebar__item"
                  [class.po-sidebar__item--active]="entry.id === state.selectedId()"
                  [attr.aria-current]="entry.id === state.selectedId() ? 'page' : null"
                  (click)="state.select(entry.id)"
                >
                  {{ entry.title }}
                </button>
              </li>
            }
          </ul>
        </section>
      } @empty {
        <p class="po-sidebar__empty">Sin resultados para «{{ state.query() }}»</p>
      }
    </nav>

    <footer class="po-sidebar__footer">
      <span>PrimeNG 21 · Angular 21</span>
      <a href="https://github.com/alexfdzunir/PrimeOne-DS" target="_blank" rel="noopener" aria-label="Repositorio en GitHub" title="Repositorio en GitHub">
        <i class="ph ph-github-logo" aria-hidden="true"></i>
      </a>
    </footer>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--po-surface-2);
      border-right: 1px solid var(--p-content-border-color);
    }

    .po-sidebar__search {
      padding: 0.75rem 1rem;
    }

    .po-sidebar__clear,
    .po-sidebar__kbd {
      position: absolute;
      top: 50%;
      inset-inline-end: 0.5rem;
      transform: translateY(-50%);
      z-index: 1;
    }

    .po-sidebar__clear {
      display: grid;
      place-items: center;
      width: 1.5rem;
      height: 1.5rem;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: var(--p-text-muted-color);
      cursor: pointer;
      transition: background 150ms, color 150ms;
    }

    .po-sidebar__clear:hover {
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
    }

    .po-sidebar__clear:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: 1px;
    }

    .po-sidebar__kbd {
      padding: 0 0.375rem;
      border: 1px solid var(--p-content-border-color);
      border-radius: 4px;
      color: var(--p-text-muted-color);
      font-family: inherit;
      font-size: 0.6875rem;
      font-weight: 600;
      line-height: 1.4;
    }

    .po-sidebar__list {
      flex: 1;
      padding: 0.25rem 0.75rem 1rem;
    }

    .po-sidebar__group {
      margin-top: 0.75rem;
    }

    .po-sidebar__group-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.25rem;
      padding: 0.25rem 0.5rem;
      color: var(--p-text-muted-color);
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .po-sidebar__group-title i {
      font-size: 0.875rem;
    }

    .po-sidebar__group-count {
      margin-inline-start: auto;
      font-weight: 500;
      letter-spacing: 0;
    }

    .po-sidebar__items {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .po-sidebar__item {
      position: relative;
      display: block;
      width: 100%;
      padding: 0.375rem 0.75rem;
      border: 0;
      border-radius: var(--po-radius-sm);
      background: transparent;
      color: var(--p-text-color);
      font: inherit;
      font-size: 0.8125rem;
      text-align: start;
      cursor: pointer;
      transition: background 150ms, color 150ms;
    }

    .po-sidebar__item::before {
      content: '';
      position: absolute;
      inset-inline-start: 0;
      top: 25%;
      width: 3px;
      height: 50%;
      border-radius: 3px;
      background: var(--p-primary-color);
      opacity: 0;
      transition: opacity 150ms;
    }

    .po-sidebar__item:hover {
      background: var(--p-content-hover-background);
    }

    .po-sidebar__item:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: -2px;
    }

    .po-sidebar__item--active,
    .po-sidebar__item--active:hover {
      background: var(--p-highlight-background);
      color: var(--p-highlight-color);
      font-weight: 600;
    }

    .po-sidebar__item--active::before {
      opacity: 1;
    }

    .po-sidebar__empty {
      margin: 1rem 0.5rem;
      color: var(--p-text-muted-color);
    }

    .po-sidebar__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border-top: 1px solid var(--p-content-border-color);
      color: var(--p-text-muted-color);
      font-size: 0.75rem;
    }

    .po-sidebar__footer a {
      display: grid;
      place-items: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: var(--po-radius-sm);
      color: inherit;
      font-size: 1rem;
      transition: background 150ms, color 150ms;
    }

    .po-sidebar__footer a:hover {
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
    }

    .po-sidebar__footer a:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
    }
  `,
})
export class SidebarComponent {
  protected readonly state = inject(ExplorerState);

  private readonly search = viewChild.required<ElementRef<HTMLInputElement>>('search');
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');

  constructor() {
    afterNextRender(() => this.list().nativeElement.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'center' }));
  }

  /** "/" focuses the search from anywhere, unless the user is already typing. */
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
    event.preventDefault();
    this.search().nativeElement.focus();
  }

  protected clear(): void {
    this.state.query.set('');
    this.search().nativeElement.focus();
  }
}
