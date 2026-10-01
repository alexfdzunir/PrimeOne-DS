import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon } from '../../stories/helpers';

const NETWORKS = [
  ['facebook-logo', 'Facebook'],
  ['x-logo', 'X'],
  ['linkedin-logo', 'LinkedIn'],
  ['whatsapp-logo', 'WhatsApp'],
];

const meta: Meta = {
  title: 'AEM/Modules/Share Banner',
  parameters: {
    figmaUrl: figmaNode('16517:16736'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Barra para compartir: redes sociales y «Copiar enlace», que confirma con un check (`aem-share`, `share-banner.js`).' } },
  },
  args: { label: 'Comparte esta noticia' },
  argTypes: { label: { control: 'text' } },
  render: (args) => ({
    template: `<section class="aem-section">
  <div class="aem-section__inner">
    <div class="aem-share">
      <p class="aem-share__label">${args['label']}</p>
      <ul class="aem-share__links">
${NETWORKS.map(([name, label]) => `        <li><a class="aem-button aem-button--ghost aem-button--icon-only" href="#" aria-label="Compartir en ${label}">${icon(name, 'aem-button__icon')}</a></li>`).join('\n')}
        <li>
          <button class="aem-button aem-button--outlined aem-button--sm aem-share__copy" type="button" data-aem-share-copy>
            <span class="aem-share__idle">${icon('link', 'aem-button__icon')} Copiar enlace</span>
            <span class="aem-share__done" role="status">${icon('check', 'aem-button__icon')} Enlace copiado</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</section>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
