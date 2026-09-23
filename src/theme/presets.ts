import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

type Shade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';
type Palette = Record<Shade, string>;

// Values resolved from the Figma variables Semantic/Common primary/* and Semantic/Color Scheme surface/*.
const BLUE_UNIR: Palette = {
  50: '#f9fcff', 100: '#e7effe', 200: '#cfdffc', 300: '#9ec0fa', 400: '#6ea0f7', 500: '#3d81f5',
  600: '#0d61f2', 700: '#0a4ec2', 800: '#083a91', 900: '#052761', 950: '#031330',
};

const BLUE_PRODI: Palette = {
  50: '#f9fcff', 100: '#e6efff', 200: '#bad2ff', 300: '#8eb6ff', 400: '#6299ff', 500: '#367cff',
  600: '#0a5cf5', 700: '#0047cc', 800: '#0039a3', 900: '#002b7b', 950: '#001d52',
};

const SURFACE_ESTUDIANTES: Palette = {
  50: '#fcfcfe', 100: '#f7f8fd', 200: '#eff2fb', 300: '#ebeefa', 400: '#bbc1d8', 500: '#848eae',
  600: '#5a6481', 700: '#4a5268', 800: '#383c48', 900: '#22252f', 950: '#181c26',
};

const SURFACE_SLATE: Palette = {
  50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b',
  600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617',
};

const SURFACE_DARK: Palette = {
  50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a',
  600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b',
};

/** Radius scale of the Figma "Primitive" collection, mode "Base 16" (the one the DS uses). */
const BORDER_RADIUS = { none: '0', xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px' };

/** Radius roles of the Figma "Semantic/Common" and "Component/Common" collections, per theme. */
interface ThemeRadius {
  content: string;
  formField: string;
  listOption: string;
  navigationItem: string;
  overlaySelect: string;
  overlayModal: string;
  card: string;
  components?: Record<string, unknown>;
}

/**
 * Figma "Component/Common" paginator: vertical padding and nav button radius per theme. Colours, sizes and
 * the transparent nav button background match Aura.
 */
function paginatorTokens(paddingY: string, navButtonRadius: string) {
  return {
    root: { padding: `${paddingY} 1rem` },
    navButton: { borderRadius: navButtonRadius },
  };
}

/**
 * Figma button sizes (same in every theme): md 42px high (padding 10/12, text 16/20), sm 34px (8/10, 14/16)
 * and lg 50px (14/14, 16/20). Icon-only buttons are square: 42 and 30 as in Figma, and 50 for lg to match
 * the row height (Figma draws it 52x50). The line height is fixed so the heights do not depend on the font.
 */
const BUTTON_SIZES = {
  paddingX: '0.75rem',
  paddingY: '0.625rem',
  gap: '0.5rem',
  iconOnlyWidth: '2.625rem',
  sm: { fontSize: '0.875rem', paddingX: '0.625rem', paddingY: '0.5rem', iconOnlyWidth: '1.875rem' },
  lg: { fontSize: '1rem', paddingX: '0.875rem', paddingY: '0.875rem', iconOnlyWidth: '3.125rem' },
};

const BUTTON_CSS = `
.p-button { line-height: 1.25rem; }
.p-button-sm { line-height: 1rem; }
.p-button-icon-only { height: var(--p-button-icon-only-width); padding-block: 0; }
.p-button-sm.p-button-icon-only { height: var(--p-button-sm-icon-only-width); }
.p-button-lg.p-button-icon-only { height: var(--p-button-lg-icon-only-width); }
`;

/** Terminal as a code console: code font, prompt in the primary colour, output muted and multi-line. */
const TERMINAL_CSS = `
.p-terminal { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.875rem; line-height: 1.5; }
.p-terminal-welcome-message { color: var(--p-primary-color); font-weight: 600; }
.p-terminal-prompt-label { color: var(--p-primary-color); font-weight: 600; }
.p-terminal-command-value { color: var(--p-text-color); font-weight: 500; }
.p-terminal-command-response { color: var(--p-text-muted-color); white-space: pre-wrap; }
.p-terminal-prompt-value { font: inherit; color: var(--p-text-color); }
`;

const RADIUS_ESTUDIANTES: ThemeRadius = {
  content: '{border.radius.md}',
  formField: '{border.radius.sm}',
  listOption: '{border.radius.sm}',
  navigationItem: '{border.radius.md}',
  overlaySelect: '{border.radius.sm}',
  overlayModal: '{border.radius.lg}',
  card: '{content.border.radius}',
  components: {
    tag: { root: { borderRadius: '{border.radius.md}' } },
    toast: { root: { borderRadius: '{border.radius.lg}' } },
    badge: { root: { borderRadius: '{border.radius.lg}' } },
    listbox: { root: { borderRadius: '{border.radius.lg}' } },
    paginator: paginatorTokens('0.625rem', '{border.radius.lg}'),
  },
};

const RADIUS_PRODI: ThemeRadius = {
  content: '{border.radius.xl}',
  formField: '{border.radius.xl}',
  listOption: '{border.radius.sm}',
  navigationItem: '{border.radius.2xl}',
  overlaySelect: '{border.radius.md}',
  overlayModal: '{border.radius.xl}',
  card: '{border.radius.2xl}',
  components: {
    button: { root: { roundedBorderRadius: '{border.radius.xl}' } },
    paginator: paginatorTokens('0.5rem', '1.25rem'),
  },
};

const RADIUS_FOUNDATIONS: ThemeRadius = {
  content: '{border.radius.none}',
  formField: '{border.radius.none}',
  listOption: '{border.radius.none}',
  navigationItem: '{border.radius.none}',
  overlaySelect: '{border.radius.none}',
  overlayModal: '{border.radius.none}',
  card: '{content.border.radius}',
  components: {
    paginator: paginatorTokens('0.5rem', '1.25rem'),
  },
};

function primeOnePreset(primary: Palette, lightSurface: Palette, radius: ThemeRadius) {
  const { button: themeButton, ...themeComponents } = (radius.components ?? {}) as { button?: { root?: object } };
  return definePreset(Aura, {
    primitive: { borderRadius: BORDER_RADIUS },
    components: {
      button: { root: { ...BUTTON_SIZES, ...themeButton?.root }, css: BUTTON_CSS },
      card: { root: { borderRadius: radius.card } },
      // Aura lets the horizontal marker shrink next to the 100% wide connector, so it turns into an oval
      timeline: { css: '.p-timeline-horizontal .p-timeline-event-marker { flex-shrink: 0; }' },
      terminal: { css: TERMINAL_CSS },
      ...themeComponents,
    },
    semantic: {
      primary,
      formField: { borderRadius: radius.formField },
      content: { borderRadius: radius.content },
      list: { option: { borderRadius: radius.listOption } },
      navigation: { item: { borderRadius: radius.navigationItem } },
      overlay: {
        select: { borderRadius: radius.overlaySelect },
        popover: { borderRadius: '{border.radius.md}' },
        modal: { borderRadius: radius.overlayModal },
      },
      colorScheme: {
        light: {
          surface: { 0: '#ffffff', ...lightSurface },
          primary: {
            color: '{primary.600}',
            contrastColor: '#ffffff',
            hoverColor: '{primary.900}',
            activeColor: '{primary.800}',
          },
          highlight: {
            background: '{primary.50}',
            focusBackground: '{primary.100}',
            color: '{primary.700}',
            focusColor: '{primary.800}',
          },
          text: { color: '{surface.950}', mutedColor: '{surface.500}' },
          content: { borderColor: '{surface.300}' },
          formField: { background: '{surface.0}', borderColor: '{surface.500}' },
        },
        dark: {
          surface: { 0: '#ffffff', ...SURFACE_DARK },
          primary: {
            color: '{primary.400}',
            contrastColor: '{surface.900}',
            hoverColor: '{primary.300}',
            activeColor: '{primary.200}',
          },
          highlight: {
            background: '{primary.900}',
            focusBackground: '{primary.800}',
            color: 'rgba(255,255,255,.87)',
            focusColor: 'rgba(255,255,255,.87)',
          },
          text: { color: '{surface.0}', mutedColor: '{surface.400}' },
          content: { borderColor: '{surface.700}' },
          formField: { background: '{surface.950}', borderColor: '{surface.200}' },
        },
      },
    },
  });
}

/** PrimeNG presets per DS theme. Dark mode is enabled by the `darkModeSelector` option of `providePrimeNG`. */
export const PrimeOneEstudiantes = primeOnePreset(BLUE_UNIR, SURFACE_ESTUDIANTES, RADIUS_ESTUDIANTES);
export const PrimeOneProdi = primeOnePreset(BLUE_PRODI, SURFACE_SLATE, RADIUS_PRODI);
export const PrimeOneFoundations = primeOnePreset(BLUE_UNIR, SURFACE_SLATE, RADIUS_FOUNDATIONS);
