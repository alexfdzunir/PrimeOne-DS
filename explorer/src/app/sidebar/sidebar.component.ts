import { afterNextRender, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, Injector, signal, untracked, viewChild } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { ExplorerState } from '../explorer-state';
import { CATEGORIES, type CategoryId } from '../model';

const COLLAPSED_KEY = 'po-explorer.collapsed';
/** Unfold transition of `.po-sidebar__collapse` (200ms) plus a frame. */
const UNFOLD_MS = 220;

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

    <div class="po-sidebar__bar">
      <span>Componentes</span>
      @if (!state.query()) {
        <button
          type="button"
          class="po-sidebar__all"
          [attr.aria-label]="allCollapsed() ? 'Desplegar todas las secciones' : 'Plegar todas las secciones'"
          [title]="allCollapsed() ? 'Desplegar todas' : 'Plegar todas'"
          (click)="toggleAll()"
        >
          <i [class]="allCollapsed() ? 'ph ph-arrows-out-line-vertical' : 'ph ph-arrows-in-line-vertical'" aria-hidden="true"></i>
        </button>
      }
    </div>

    <nav #list class="po-sidebar__list po-scroll" aria-label="Componentes">
      @if (!state.query()) {
        <button
          type="button"
          class="po-sidebar__item po-sidebar__item--page po-sidebar__home"
          [class.po-sidebar__item--active]="state.view().kind === 'home'"
          [attr.aria-current]="state.view().kind === 'home' ? 'page' : null"
          (click)="state.goHome()"
        >
          <i class="ph ph-house" aria-hidden="true"></i>
          Inicio
        </button>
      }
      @for (group of state.groups(); track group.id) {
        <section class="po-sidebar__group">
          <!-- The caret folds the group; the title opens the section overview -->
          <h2 class="po-sidebar__group-heading">
            <button
              type="button"
              class="po-sidebar__group-toggle"
              [attr.aria-expanded]="isOpen(group.id)"
              [attr.aria-controls]="'po-group-' + group.id"
              [attr.aria-label]="(isOpen(group.id) ? 'Plegar ' : 'Desplegar ') + group.label"
              (click)="toggle(group.id)"
            >
              <i class="ph ph-caret-down po-sidebar__caret" aria-hidden="true"></i>
            </button>
            @let overview = isSectionActive(group.id);
            <button
              type="button"
              class="po-sidebar__group-title"
              [class.po-sidebar__group-title--active]="overview"
              [attr.aria-current]="overview ? 'page' : null"
              (click)="state.openSection(group.id)"
            >
              <i [class]="group.icon" aria-hidden="true"></i>
              <span>{{ group.label }}</span>
              <span class="po-sidebar__group-count">{{ group.entries.length }}</span>
            </button>
          </h2>
          <div
            class="po-sidebar__collapse"
            [class.po-sidebar__collapse--closed]="!isOpen(group.id)"
            [attr.inert]="isOpen(group.id) ? null : ''"
          >
            <ul class="po-sidebar__items" [id]="'po-group-' + group.id">
              @for (entry of group.entries; track entry.id) {
                @let active = isComponentActive(entry.id);
                <li>
                  <button
                    type="button"
                    class="po-sidebar__item"
                    [class.po-sidebar__item--active]="active"
                    [attr.aria-current]="active ? 'page' : null"
                    (click)="state.select(entry.id)"
                  >
                    {{ entry.title }}
                  </button>
                </li>
              }
            </ul>
          </div>
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
      /* Current page: a primary tint that reads in both schemes (highlight.background is primary.50, almost white) */
      --po-sidebar-active: color-mix(in srgb, var(--p-primary-color) 12%, transparent);
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--po-surface-2);
      border-right: 1px solid var(--p-content-border-color);
    }

    :host-context(html.po-dark) {
      --po-sidebar-active: color-mix(in srgb, var(--p-primary-color) 20%, transparent);
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

    .po-sidebar__bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 1.75rem;
      padding: 0 1rem 0 1.25rem;
      color: var(--p-text-muted-color);
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .po-sidebar__all {
      display: grid;
      place-items: center;
      width: 1.75rem;
      height: 1.75rem;
      padding: 0;
      border: 0;
      border-radius: var(--po-radius-sm);
      background: transparent;
      color: inherit;
      font-size: 1rem;
      cursor: pointer;
      transition: background 150ms, color 150ms;
    }

    .po-sidebar__all:hover {
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
    }

    .po-sidebar__group-heading {
      display: flex;
      align-items: center;
      gap: 2px;
      margin: 0 0 0.25rem;
      font: inherit;
    }

    .po-sidebar__group-toggle {
      display: grid;
      flex: none;
      place-items: center;
      width: 1.5rem;
      height: 1.75rem;
      padding: 0;
      border: 0;
      border-radius: var(--po-radius-sm);
      background: transparent;
      color: var(--p-text-muted-color);
      font-size: 0.875rem;
      cursor: pointer;
      transition: background 150ms, color 150ms;
    }

    .po-sidebar__group-toggle:hover {
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
    }

    .po-sidebar__group-title {
      display: flex;
      flex: 1;
      align-items: center;
      gap: 0.5rem;
      min-width: 0;
      padding: 0.375rem 0.5rem;
      border: 0;
      border-radius: var(--po-radius-sm);
      background: transparent;
      color: var(--p-text-muted-color);
      font: inherit;
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-align: start;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 150ms, color 150ms;
    }

    .po-sidebar__group-title:hover {
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
    }

    .po-sidebar__group-title--active,
    .po-sidebar__group-title--active:hover {
      background: var(--po-sidebar-active);
      color: var(--p-highlight-color);
    }

    .po-sidebar__group-title:focus-visible,
    .po-sidebar__group-toggle:focus-visible,
    .po-sidebar__all:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: -2px;
    }

    .po-sidebar__caret {
      transition: transform 200ms ease;
    }

    .po-sidebar__group-toggle[aria-expanded='false'] .po-sidebar__caret {
      transform: rotate(-90deg);
    }

    /* Height animation without measuring: the grid row goes from 1fr to 0fr */
    .po-sidebar__collapse {
      display: grid;
      grid-template-rows: 1fr;
      transition: grid-template-rows 200ms ease;
    }

    .po-sidebar__collapse--closed {
      grid-template-rows: 0fr;
    }

    .po-sidebar__collapse > .po-sidebar__items {
      min-height: 0;
      overflow: hidden;
    }

    @media (prefers-reduced-motion: reduce) {
      .po-sidebar__collapse,
      .po-sidebar__caret {
        transition: none;
      }
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

    .po-sidebar__item--page {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--p-text-muted-color);
    }

    .po-sidebar__item--page i {
      font-size: 1rem;
    }

    .po-sidebar__home {
      margin-top: 0.25rem;
      color: var(--p-text-color);
      font-weight: 500;
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
      background: var(--po-sidebar-active);
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

  /** Folded categories, remembered per browser. While searching every group with results is open. */
  private readonly collapsed = signal<ReadonlySet<CategoryId>>(readCollapsed());
  protected readonly allCollapsed = computed(() => CATEGORIES.every((category) => this.collapsed().has(category.id)));

  private readonly injector = inject(Injector);
  private readonly search = viewChild.required<ElementRef<HTMLInputElement>>('search');
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');

  constructor() {
    // The section (or the category of the component) opened from the URL is always unfolded
    const view = this.state.view();
    if (view.kind !== 'home') this.open(view.kind === 'section' ? view.id : this.state.selected().category);
    effect(() => writeCollapsed(this.collapsed()));
    afterNextRender(() => this.list().nativeElement.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'center' }));
    // Opening a component from anywhere (card, pager, back button) unfolds its group and brings it into view
    effect(() => {
      if (this.state.view().kind !== 'component') return;
      const category = this.state.selected().category;
      untracked(() => this.reveal(category));
    });
    // Arriving at the home folds every group; they can still be unfolded while there
    effect(() => {
      if (this.state.view().kind === 'home') untracked(() => this.collapsed.set(new Set(CATEGORIES.map((category) => category.id))));
    });
  }

  protected isComponentActive(id: string): boolean {
    return this.state.view().kind === 'component' && this.state.selectedId() === id;
  }

  protected isSectionActive(id: CategoryId): boolean {
    const view = this.state.view();
    return view.kind === 'section' && view.id === id;
  }

  protected isOpen(id: CategoryId): boolean {
    return !!this.state.query() || !this.collapsed().has(id);
  }

  protected toggle(id: CategoryId): void {
    if (this.state.query()) return;
    this.collapsed.update((set) => {
      const next = new Set(set);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }

  protected toggleAll(): void {
    this.collapsed.set(this.allCollapsed() ? new Set() : new Set(CATEGORIES.map((category) => category.id)));
  }

  /** Unfolds the group and, once rendered and unfolded, scrolls the list just enough to show the current item. */
  private reveal(id: CategoryId): void {
    const folded = !this.isOpen(id);
    this.open(id);
    afterNextRender(() => setTimeout(() => this.scrollToCurrent(), folded ? UNFOLD_MS : 0), { injector: this.injector });
  }

  /** An item out of sight is centred in the list, so its section shows too. Only the list scrolls (never the page or the drawer). */
  private scrollToCurrent(): void {
    const list = this.list().nativeElement;
    const item = list.querySelector<HTMLElement>('.po-sidebar__items [aria-current="page"]');
    if (!item) return;
    const bounds = list.getBoundingClientRect();
    const rect = item.getBoundingClientRect();
    if (rect.top >= bounds.top && rect.bottom <= bounds.bottom) return;
    list.scrollTop += rect.top + rect.height / 2 - (bounds.top + bounds.height / 2);
  }

  private open(id: CategoryId): void {
    this.collapsed.update((set) => {
      const next = new Set(set);
      next.delete(id);
      return next;
    });
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

function readCollapsed(): ReadonlySet<CategoryId> {
  try {
    const ids = JSON.parse(localStorage.getItem(COLLAPSED_KEY) ?? '[]') as unknown;
    const known = new Set(CATEGORIES.map((category) => category.id));
    return new Set(Array.isArray(ids) ? ids.filter((id): id is CategoryId => known.has(id)) : []);
  } catch {
    return new Set();
  }
}

function writeCollapsed(ids: ReadonlySet<CategoryId>): void {
  try {
    localStorage.setItem(COLLAPSED_KEY, JSON.stringify([...ids]));
  } catch {
    // Storage unavailable: the folded sections are just not remembered.
  }
}
