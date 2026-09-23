import { computed, effect, Injectable, signal } from '@angular/core';
import { usePreset } from '@primeuix/themes';
import { PrimeOneEstudiantes, PrimeOneFoundations, PrimeOneProdi } from '../../../src/theme/presets';
import { CATEGORIES, type CategoryGroup, type ComponentEntry, type EventRecord, type RenderedStory, type SchemeId, type ThemeId, type ViewportId } from './model';
import { buildRegistry } from './registry';

const PRESETS = { estudiantes: PrimeOneEstudiantes, prodi: PrimeOneProdi, foundations: PrimeOneFoundations };
const MAX_EVENTS = 50;
const CATALOG_KEY = 'po-explorer.catalog';
const PANEL_KEY = 'po-explorer.panel';
/** Same breakpoint as the drawer layout in styles.css; below it the preview switches to the tablet device. */
const COMPACT_QUERY = '(max-width: 1023.98px)';
/** Below it the preview switches to the mobile device (same breakpoint as the navbar theme dropdown). */
const MOBILE_QUERY = '(max-width: 767.98px)';

function readFlag(key: string, fallback: boolean): boolean {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value === '1';
  } catch {
    return fallback;
  }
}

function writeFlag(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, value ? '1' : '0');
  } catch {
    // Storage unavailable (private mode): the preference just is not remembered.
  }
}

/** Single source of truth of the explorer: catalogue, selection, args, theme and event log. */
@Injectable({ providedIn: 'root' })
export class ExplorerState {
  readonly entries: ComponentEntry[] = buildRegistry();

  readonly query = signal('');
  readonly selectedId = signal(this.entries[0]?.id ?? '');
  readonly presetId = signal('Default');
  /** Current values of the controls; missing keys fall back to the story base args. */
  readonly args = signal<Record<string, unknown>>({});
  readonly theme = signal<ThemeId>('estudiantes');
  readonly scheme = signal<SchemeId>('light');
  readonly viewport = signal<ViewportId>('auto');
  readonly events = signal<EventRecord[]>([]);
  /** Side columns; remembered per browser. */
  readonly catalogOpen = signal(readFlag(CATALOG_KEY, true));
  readonly panelOpen = signal(readFlag(PANEL_KEY, true));
  /** Narrow window: the side columns become drawers over the stage, closed by default. */
  readonly compact = signal(false);

  readonly selected = computed(() => this.entries.find((e) => e.id === this.selectedId()) ?? this.entries[0]);

  /** Catalogue filtered by the search text, grouped by category (empty groups removed). */
  readonly groups = computed<CategoryGroup[]>(() => {
    const q = normalize(this.query());
    return CATEGORIES.map((category) => ({
      ...category,
      entries: this.entries.filter((e) => e.category === category.id && (!q || normalize(e.title).includes(q) || normalize(category.label).includes(q))),
    })).filter((group) => group.entries.length > 0);
  });

  /** Story output for the current component and args. */
  readonly rendered = computed<RenderedStory>(() => this.selected().render(this.args(), this.handlersFor(this.selected())));

  /** Args that differ from the active preset. */
  readonly dirty = computed(() => {
    const entry = this.selected();
    const preset = entry.presets.find((p) => p.id === this.presetId());
    const expected = { ...entry.baseArgs, ...(preset?.args ?? {}) };
    return Object.entries(this.args()).some(([key, value]) => value !== expected[key]);
  });

  private readonly handlers = new WeakMap<ComponentEntry, Record<string, (payload: unknown) => void>>();
  private eventSeq = 0;

  constructor() {
    this.readUrl();
    effect(() => {
      usePreset(PRESETS[this.theme()]);
      document.documentElement.classList.toggle('po-dark', this.scheme() === 'dark');
    });
    this.watchWidth();
    // Only the wide layout is remembered: drawers always start closed
    effect(() => {
      if (!this.compact()) writeFlag(CATALOG_KEY, this.catalogOpen());
    });
    effect(() => {
      if (!this.compact()) writeFlag(PANEL_KEY, this.panelOpen());
    });
    effect(() => {
      const url = new URL(location.href);
      url.searchParams.set('c', this.selectedId());
      if (this.presetId() !== 'Default') url.searchParams.set('p', this.presetId());
      else url.searchParams.delete('p');
      history.replaceState(null, '', url);
    });
  }

  select(id: string): void {
    const entry = this.entries.find((e) => e.id === id);
    if (!entry) return;
    if (this.compact()) this.catalogOpen.set(false);
    this.selectedId.set(entry.id);
    this.applyPreset('Default');
    this.events.set([]);
  }

  applyPreset(presetId: string): void {
    const entry = this.selected();
    const preset = entry.presets.find((p) => p.id === presetId) ?? entry.presets[0];
    this.presetId.set(preset?.id ?? 'Default');
    this.args.set({ ...entry.baseArgs, ...(preset?.args ?? {}) });
  }

  setArg(name: string, value: unknown): void {
    this.args.update((args) => ({ ...args, [name]: value }));
  }

  /** Back to the active preset values. */
  reset(): void {
    this.applyPreset(this.presetId());
  }

  logEvent(name: string, payload: unknown): void {
    const record: EventRecord = { id: ++this.eventSeq, name, time: Date.now(), payload: describe(payload) };
    this.events.update((events) => [record, ...events].slice(0, MAX_EVENTS));
  }

  clearEvents(): void {
    this.events.set([]);
  }

  closeDrawers(): void {
    this.catalogOpen.set(false);
    this.panelOpen.set(false);
  }

  /** Layout and preview device follow the window; the device can still be changed until the next breakpoint. */
  private watchWidth(): void {
    const compact = matchMedia(COMPACT_QUERY);
    const mobile = matchMedia(MOBILE_QUERY);
    const applyLayout = () => {
      this.compact.set(compact.matches);
      if (compact.matches) this.closeDrawers();
      else {
        this.catalogOpen.set(readFlag(CATALOG_KEY, true));
        this.panelOpen.set(readFlag(PANEL_KEY, true));
      }
    };
    const applyViewport = () => this.viewport.set(mobile.matches ? 'mobile' : compact.matches ? 'tablet' : 'auto');
    applyLayout();
    applyViewport();
    compact.addEventListener('change', () => {
      applyLayout();
      applyViewport();
    });
    mobile.addEventListener('change', applyViewport);
  }

  private handlersFor(entry: ComponentEntry): Record<string, (payload: unknown) => void> {
    let handlers = this.handlers.get(entry);
    if (!handlers) {
      handlers = Object.fromEntries(entry.events.map((event) => [event.name, (payload: unknown) => this.logEvent(event.name, payload)]));
      this.handlers.set(entry, handlers);
    }
    return handlers;
  }

  private readUrl(): void {
    const params = new URLSearchParams(location.search);
    const id = params.get('c');
    if (id && this.entries.some((e) => e.id === id)) this.selectedId.set(id);
    this.applyPreset(params.get('p') ?? 'Default');
  }
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/** Short, cycle-safe summary of an event payload for the log. */
export function describe(payload: unknown, depth = 0): string {
  if (payload === null || payload === undefined) return '';
  if (typeof payload !== 'object') return String(payload);
  if (payload instanceof Event) {
    const target = payload.target as Element | null;
    return `${payload.type}${target?.tagName ? ` en <${target.tagName.toLowerCase()}>` : ''}`;
  }
  if (payload instanceof Date) return payload.toLocaleString('es-ES');
  if (Array.isArray(payload)) return depth > 1 ? `[${payload.length}]` : `[${payload.map((item) => describe(item, depth + 1)).join(', ')}]`;
  if (depth > 1) return '{…}';
  const entries = Object.entries(payload as Record<string, unknown>)
    .filter(([key, value]) => key !== 'originalEvent' && typeof value !== 'function')
    .slice(0, 6)
    .map(([key, value]) => `${key}: ${describe(value, depth + 1)}`);
  return `{ ${entries.join(', ')} }`.slice(0, 160);
}
