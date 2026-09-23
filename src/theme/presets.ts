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

function primeOnePreset(primary: Palette, lightSurface: Palette) {
  return definePreset(Aura, {
    semantic: {
      primary,
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
export const PrimeOneEstudiantes = primeOnePreset(BLUE_UNIR, SURFACE_ESTUDIANTES);
export const PrimeOneProdi = primeOnePreset(BLUE_PRODI, SURFACE_SLATE);
export const PrimeOneFoundations = primeOnePreset(BLUE_UNIR, SURFACE_SLATE);
