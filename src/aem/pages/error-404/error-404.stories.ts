import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import { cx, icon, unirLogo } from '../../stories/helpers';
import { landingFooter, modalPreview, moduleHtml, pageImg, pagesFigma } from '../../stories/page-parts';

type Proposal = 'p1' | 'p2' | 'p3' | 'p4';

const TEXTS = `<p>La página solicitada puede no estar disponible, haber cambiado de dirección (URL) o no existir. Por favor, comprueba que has escrito la dirección correctamente.</p>
      <p>Si quieres más información sobre las titulaciones de UNIR puedes visitarnos en <a href="#">unir.net</a>.</p>`;

function error(proposal: Proposal): string {
  const brand = proposal !== 'p3' && proposal !== 'p4';
  const art = proposal !== 'p2' ? `\n    <img class="aem-error__art" src="${pageImg('error-404', 'png')}" alt="" />` : '';
  const action =
    proposal === 'p2'
      ? `<dl class="aem-error__contacts aem-glass">
        <div><dt>Contacta con UNIR</dt><dd><a href="#">¿Te llamamos?</a></dd></div>
        <div><dt>Email</dt><dd>info@unir.net</dd></div>
        <div><dt>Teléfono España</dt><dd>+34 941 209 743</dd></div>
        <div><dt>Teléfono (fuera de España)</dt><dd>+34 915 674 498</dd></div>
      </dl>`
      : `<a class="${cx('aem-button', 'aem-button--lg', brand ? 'aem-error__accent' : 'aem-button--secondary')}" href="#">Ir a la web</a>`;
  return `<main class="${cx('aem-error', brand && 'aem-brand', proposal === 'p2' && 'aem-error--compact')}">
  <div class="aem-error__inner">
    <div class="aem-error__content">${proposal !== 'p2' ? `\n      <a class="aem-error__logo" href="#">${unirLogo(brand ? 'aem-logo--inverse' : '')}</a>` : ''}
      <h1 class="aem-error__title">¡Lo sentimos!<br />Página no encontrada</h1>
      ${TEXTS}
      ${action}
    </div>${art}
  </div>
</main>`;
}

const call = modalPreview(
  'Llama ahora',
  `<div class="aem-modal__call">
  <p>y un asesor te informará sin compromiso</p>
  <a class="aem-link-button" href="tel:+34941209743">${icon('phone')} +34 941 209 743</a>
  <p>o si prefieres</p>
  <a class="aem-button aem-button--secondary" href="#">¿Te llamamos?</a>
</div>`,
  { size: 'sm', centered: true },
);

const meta: Meta = {
  title: 'AEM/Pages/Error 404',
  parameters: {
    figmaUrl: pagesFigma('3263:27783'),
    order: 27,
    storyOrder: ['Default', 'Conservadora', 'Blanca', 'Llamada'],
    layout: 'fullscreen',
    docs: { description: { component: 'Página de error 404 (`aem-error`) en las propuestas de Figma: sobre el azul de marca con ilustración, conservadora con los datos de contacto, sobre blanco, y con el modal de llamada abierto.' } },
  },
  args: { proposal: 'p1' },
  render: (args) => {
    const proposal = args['proposal'] as Proposal;
    const foot = landingFooter(moduleHtml(footer, { showContact: proposal !== 'p2' }));
    return { template: `<div class="aem-page">\n${error(proposal)}\n${foot}${proposal === 'p4' ? `\n${call}` : ''}\n</div>` };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = { name: 'Propuesta 1' };
export const Conservadora: Story = { name: 'Conservadora', args: { proposal: 'p2' } };
export const Blanca: Story = { name: 'Propuesta 3', args: { proposal: 'p3' } };
export const Llamada: Story = { name: 'Propuesta 4', args: { proposal: 'p4' } };
