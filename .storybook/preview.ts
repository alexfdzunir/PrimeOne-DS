import { applicationConfig, type Preview } from '@storybook/angular';
import { usePreset } from '@primeuix/themes';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeOneEstudiantes, PrimeOneFoundations, PrimeOneProdi } from '../src/theme/presets';

const PRESETS = { estudiantes: PrimeOneEstudiantes, prodi: PrimeOneProdi, foundations: PrimeOneFoundations };

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tema del design system',
      toolbar: {
        title: 'Tema',
        icon: 'paintbrush',
        items: [
          { value: 'estudiantes', title: 'Estudiantes' },
          { value: 'prodi', title: 'Prodi' },
          { value: 'foundations', title: 'Foundations' },
        ],
        dynamicTitle: true,
      },
    },
    scheme: {
      description: 'Modo claro u oscuro',
      toolbar: {
        title: 'Modo',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Oscuro' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'estudiantes', scheme: 'light' },
  decorators: [
    applicationConfig({
      providers: [
        providePrimeNG({ theme: { preset: PrimeOneEstudiantes, options: { darkModeSelector: '.po-dark' } } }),
        MessageService,
        ConfirmationService,
      ],
    }),
    (story, context) => {
      usePreset(PRESETS[context.globals['theme'] as keyof typeof PRESETS] ?? PrimeOneEstudiantes);
      document.documentElement.classList.toggle('po-dark', context.globals['scheme'] === 'dark');
      return story();
    },
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default preview;
