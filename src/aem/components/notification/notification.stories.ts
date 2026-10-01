import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, cx, figmaNode, icon } from '../../stories/helpers';

const TYPES: Record<string, { icon: string; title: string; text: string; role: string }> = {
  success: { icon: 'check-circle', title: 'Solicitud enviada', text: 'Hemos recibido tu solicitud de información. Un asesor te llamará en las próximas 24 horas.', role: 'status' },
  error: { icon: 'prohibit', title: 'No se ha podido enviar', text: 'Revisa tu conexión e inténtalo de nuevo. Si el problema continúa, escríbenos.', role: 'alert' },
  warning: { icon: 'warning', title: 'Plazas limitadas', text: 'Quedan pocas plazas para la convocatoria de octubre. Reserva la tuya cuanto antes.', role: 'status' },
  info: { icon: 'info', title: 'Nueva convocatoria', text: 'La matrícula para la convocatoria de febrero abre el 15 de noviembre.', role: 'status' },
};

const meta: Meta = {
  title: 'AEM/Messaging/Notification',
  parameters: {
    figmaUrl: figmaNode('8605:42607'),
    controls: { expanded: true },
    storyOrder: ['Default', 'Error', 'Warning', 'Info', 'Small'],
    docs: { description: { component: 'Aviso en línea por tipo (`aem-notification`, `--error`, `--warning`, `--info`, `--sm`). Usa `role="status"` o `role="alert"` según la urgencia.' } },
  },
  args: { type: 'success', size: 'lg', title: '', text: '', showIcon: true, showButton: true },
  argTypes: {
    type: { control: 'inline-radio', options: ['success', 'error', 'warning', 'info'], description: 'Type en Figma.' },
    size: { control: 'inline-radio', options: ['lg', 'sm'], description: 'Size en Figma: SM solo icono y título.' },
    title: { control: 'text', description: 'Vacío: el título de ejemplo del tipo.' },
    text: { control: 'text', description: 'Vacío: la descripción de ejemplo del tipo.' },
    showIcon: { control: 'boolean', description: 'Show Icon en Figma.' },
    showButton: { control: 'boolean', description: 'Show Button en Figma.' },
  },
  render: (args) => {
    const type = TYPES[args['type']] ?? TYPES['success'];
    const small = args['size'] === 'sm';
    const classes = cx('aem-notification', args['type'] !== 'success' && `aem-notification--${args['type']}`, small && 'aem-notification--sm');
    const head = `  <div class="aem-notification__head">${args['showIcon'] ? `\n    ${icon(type.icon, 'aem-notification__icon')}` : ''}\n    <p class="aem-notification__title">${args['title'] || type.title}</p>\n  </div>`;
    const body = small
      ? ''
      : `\n  <p class="aem-notification__text">${args['text'] || type.text}</p>${args['showButton'] ? `\n  <a class="aem-notification__link" href="#">Más información ${icon('arrow-right')}</a>` : ''}`;
    return { template: `<div ${attrs({ class: classes, role: type.role })} style="max-width: 32.5rem">\n${head}${body}\n</div>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Error: Story = { args: { type: 'error' } };
export const Warning: Story = { args: { type: 'warning' } };
export const Info: Story = { args: { type: 'info' } };
export const Small: Story = { args: { size: 'sm' } };
