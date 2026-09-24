/** Shared model of the explorer. Entries are built from the stories by `registry.ts`. */

export type ControlKind = 'boolean' | 'text' | 'number' | 'select' | 'inline-radio' | 'color';

export interface ControlDef {
  name: string;
  kind: ControlKind;
  /** Values for select and inline-radio; `undefined` means "component default". */
  options?: unknown[];
  description?: string;
  /** Default documented by the component, if any. */
  defaultSummary?: string;
  /** Value in the story's base args (may be undefined). */
  initial: unknown;
}

export interface EventDef {
  name: string;
  description?: string;
}

export interface PresetDef {
  id: string;
  name: string;
  args: Record<string, unknown>;
}

export interface RenderedStory {
  template: string;
  props: Record<string, unknown>;
  imports: unknown[];
  providers: unknown[];
}

export type LayoutKind = 'padded' | 'fullscreen' | 'centered';

export interface ComponentEntry {
  /** URL-safe id, e.g. `form-select`. */
  id: string;
  title: string;
  category: CategoryId;
  description?: string;
  figmaUrl?: string;
  /** `import { ... } from '...';` lines a consumer needs, taken from the story source. */
  codeImports: string[];
  layout: LayoutKind;
  /** Suggested minimum height of the stage, from the story parameters. */
  height?: string;
  controls: ControlDef[];
  events: EventDef[];
  /** `Default` first. */
  presets: PresetDef[];
  /** Story args without the event recorders. */
  baseArgs: Record<string, unknown>;
  imports: unknown[];
  providers: unknown[];
  /** Runs the story `render` with the given args; `handlers` are bound to the events. */
  render: (args: Record<string, unknown>, handlers: Record<string, (payload: unknown) => void>) => RenderedStory;
}

export type CategoryId = 'Button' | 'Form' | 'Data' | 'Panel' | 'Overlay' | 'Menu' | 'Messages' | 'Media' | 'Misc' | 'Proeduca';

export interface CategoryDef {
  id: CategoryId;
  label: string;
  /** Phosphor icon class, e.g. `ph ph-textbox`. */
  icon: string;
  /** One line for the home and the section page. */
  description: string;
}

export const CATEGORIES: CategoryDef[] = [
  { id: 'Button', label: 'Botones', icon: 'ph ph-cursor-click', description: 'Acciones principales y secundarias: botones, split buttons y speed dial.' },
  { id: 'Form', label: 'Formulario', icon: 'ph ph-textbox', description: 'Campos de entrada, selección y etiquetas para construir formularios.' },
  { id: 'Data', label: 'Datos', icon: 'ph ph-table', description: 'Tablas, listas, árboles y paginación para mostrar y ordenar información.' },
  { id: 'Panel', label: 'Paneles', icon: 'ph ph-layout', description: 'Contenedores y estructura: cards, pestañas, acordeones y separadores.' },
  { id: 'Overlay', label: 'Superposición', icon: 'ph ph-stack', description: 'Capas sobre el contenido: diálogos, drawers, popovers y confirmaciones.' },
  { id: 'Menu', label: 'Menús', icon: 'ph ph-list', description: 'Navegación: breadcrumb, menubar, menú contextual, mega menú y dock.' },
  { id: 'Messages', label: 'Mensajes', icon: 'ph ph-chat-circle-dots', description: 'Mensajes en línea y notificaciones toast por nivel de gravedad.' },
  { id: 'Media', label: 'Media', icon: 'ph ph-image', description: 'Imágenes, galerías, carruseles y comparadores de imágenes.' },
  { id: 'Misc', label: 'Varios', icon: 'ph ph-puzzle-piece', description: 'Avatares, badges, chips, tags, indicadores de progreso y utilidades.' },
  { id: 'Proeduca', label: 'Proeduca', icon: 'ph ph-graduation-cap', description: 'Patrones propios de Proeduca: chat IA, agenda, tareas, navegación móvil y campos.' },
];

/** What the stage shows: the home, the overview of a section or the selected component. */
export type ExplorerView = { kind: 'home' } | { kind: 'section'; id: CategoryId } | { kind: 'component' };

export interface CategoryGroup extends CategoryDef {
  entries: ComponentEntry[];
}

export interface EventRecord {
  id: number;
  name: string;
  /** Epoch ms. */
  time: number;
  /** Short, safe description of the payload. */
  payload: string;
}

export type ThemeId = 'estudiantes' | 'prodi' | 'foundations';
export type SchemeId = 'light' | 'dark';
export type ViewportId = 'auto' | 'mobile' | 'tablet';

export const THEMES: { id: ThemeId; label: string }[] = [
  { id: 'estudiantes', label: 'Estudiantes' },
  { id: 'prodi', label: 'Prodi' },
  { id: 'foundations', label: 'Foundations' },
];

export const VIEWPORTS: { id: ViewportId; label: string; icon: string; width?: number }[] = [
  { id: 'auto', label: 'Escritorio', icon: 'ph ph-desktop' },
  { id: 'tablet', label: 'Tablet', icon: 'ph ph-device-tablet', width: 768 },
  { id: 'mobile', label: 'Móvil', icon: 'ph ph-device-mobile', width: 390 },
];
