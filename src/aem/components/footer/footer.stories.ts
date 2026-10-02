import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon, unirLogo } from '../../stories/helpers';

const COLUMNS: [string, string[]][] = [
  ['Aspectos legales', ['Aviso Legal', 'Política de Privacidad', 'Política de Cookies', 'Cláusulas legales RGPD', 'Canal de consultas y denuncias']],
  ['Sobre nosotros', ['Misión y Valores', 'Facultades', 'Nuestro Equipo', 'Trabaja en UNIR', 'Actualidad', 'UNIR Revista', 'Alianzas corporativas', 'Sala de prensa', 'Contacto']],
  ['Oferta académica', ['Grados', 'Másteres Oficiales', 'Másteres Propios', 'Experto Universitario', 'Doctorados', 'Postgrados', 'Cursos Universitarios']],
];
const CONTACT: [string, string][] = [
  ['phone', '+34 941 209 743'],
  ['user', '¿Te llamamos?'],
  ['envelope-simple-open', 'info@unir.net'],
];
/** Accreditation logos (white PNGs in aem/assets/footer). */
const LOGOS: [string, string][] = [
  ['crue', 'CRUE Universidades Españolas'],
  ['eees', 'Espacio Europeo de Educación Superior'],
  ['ministerio', 'Ministerio de Universidades'],
  ['aneca', 'ANECA'],
  ['erasmus', 'Erasmus+'],
  ['universia', 'Universia'],
  ['eua', 'European University Association'],
  ['global-compact', 'The Global Compact'],
];
const SOCIAL: [string, string][] = [
  ['tiktok-logo', 'TikTok'],
  ['youtube-logo', 'YouTube'],
  ['whatsapp-logo', 'WhatsApp'],
  ['instagram-logo', 'Instagram'],
  ['x-logo', 'X'],
  ['facebook-logo', 'Facebook'],
  ['linkedin-logo', 'LinkedIn'],
];

const meta: Meta = {
  title: 'AEM/Modules/Footer',
  parameters: {
    figmaUrl: figmaNode('9888:3741'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Pie de los portales: banda de contacto opcional y pie oscuro con logo, vías de contacto, tres columnas de enlaces, sellos de acreditación (`aem/assets/footer`), redes sociales y copyright (`aem-footer`). En móvil las columnas se pliegan en acordeón (`footer.js`).' } },
  },
  args: { showContact: false },
  argTypes: { showContact: { control: 'boolean', description: 'Banda "Contacta con UNIR".' } },
  render: (args) => {
    const contacts = args['showContact']
      ? `  <div class="aem-footer__contacts">
    <p class="aem-footer__contacts-title">Contacta con UNIR</p>
    <ul class="aem-footer__contacts-links">
      <li><a class="aem-link-button" href="#">${icon('phone')} +34 941 209 743</a></li>
      <li><a class="aem-link-button" href="#">${icon('user')} ¿Te llamamos?</a></li>
      <li><a class="aem-link-button" href="#">${icon('envelope-simple-open')} info@unir.net</a></li>
    </ul>
  </div>\n`
      : '';
    const columns = COLUMNS.map(
      ([title, links], i) => `        <nav class="aem-footer__column" aria-label="${title}">
          <h2 class="aem-footer__title"><button class="aem-footer__toggle" type="button" aria-expanded="false" aria-controls="aem-footer-links-${i}">${title} ${icon('caret-down')}</button></h2>
          <ul class="aem-footer__links" id="aem-footer-links-${i}">
${links.map((link) => `            <li><a href="#">${link}</a></li>`).join('\n')}
          </ul>
        </nav>`,
    );
    return {
      template: `<footer class="aem-footer">
${contacts}  <div class="aem-footer__main">
    <div class="aem-footer__inner">
      <div class="aem-footer__logo">${unirLogo('aem-logo--inverse')}</div>
      <ul class="aem-footer__contact">
${CONTACT.map(([name, label]) => `        <li><a class="aem-link-button aem-link-button--inverse" href="#">${icon(name)} ${label}</a></li>`).join('\n')}
      </ul>
      <div class="aem-footer__columns">
${columns.join('\n')}
      </div>
      <ul class="aem-footer__logos" aria-label="Acreditaciones">
${LOGOS.map(([file, label]) => `        <li><img src="aem/assets/footer/${file}.png" alt="${label}" loading="lazy" /></li>`).join('\n')}
      </ul>
      <ul class="aem-footer__social" aria-label="Redes sociales">
${SOCIAL.map(([name, label]) => `        <li><a href="#" aria-label="${label}">${icon(name)}</a></li>`).join('\n')}
      </ul>
      <p class="aem-footer__copy">© UNIR - Universidad Internacional de La Rioja 2025</p>
    </div>
  </div>
</footer>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Contact: Story = { args: { showContact: true } };
