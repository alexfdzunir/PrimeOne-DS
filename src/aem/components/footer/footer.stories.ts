import type { Meta, StoryObj } from '@storybook/angular';
import { figmaNode, icon, unirLogo } from '../../stories/helpers';

const COLUMNS: [string, string[]][] = [
  ['Estudios', ['Grados', 'Másteres', 'Doctorados', 'Formación permanente']],
  ['La universidad', ['Sobre UNIR', 'Profesorado', 'Investigación', 'Trabaja con nosotros']],
  ['Estudiantes', ['Campus virtual', 'Becas y ayudas', 'Calendario académico', 'Biblioteca']],
  ['Ayuda', ['Contacto', 'Preguntas frecuentes', 'Sedes', 'Canal ético']],
];
const SOCIAL = ['facebook-logo', 'x-logo', 'instagram-logo', 'linkedin-logo', 'youtube-logo'];
const LEGAL = ['Aviso legal', 'Política de privacidad', 'Política de cookies', 'Accesibilidad'];

const meta: Meta = {
  title: 'AEM/Modules/Footer',
  parameters: {
    figmaUrl: figmaNode('9888:3741'),
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: { description: { component: 'Pie de los portales: barra de contacto azul y pie oscuro con logo, columnas de enlaces, sellos, redes sociales y avisos legales (`aem-footer`).' } },
  },
  args: { showContact: true },
  argTypes: { showContact: { control: 'boolean', description: 'Barra de contacto.' } },
  render: (args) => {
    const contact = args['showContact']
      ? `  <div class="aem-footer__contact">
    <a href="#">${icon('phone')} +34 941 209 743</a>
    <a href="#">${icon('envelope-simple')} Escríbenos</a>
    <a href="#">${icon('chats')} Chat con un asesor</a>
  </div>\n`
      : '';
    const columns = COLUMNS.map(
      ([title, links]) => `        <nav aria-label="${title}">
          <h2 class="aem-footer__title">${title}</h2>
          <ul class="aem-footer__links">
${links.map((link) => `            <li><a href="#">${link}</a></li>`).join('\n')}
          </ul>
        </nav>`,
    );
    return {
      template: `<footer class="aem-footer">
${contact}  <div class="aem-footer__main">
    <div class="aem-footer__inner">
      ${unirLogo('aem-logo--inverse')}
    </div>
    <div class="aem-footer__inner">
      <div class="aem-footer__columns">
${columns.join('\n')}
      </div>
    </div>
    <div class="aem-footer__inner aem-footer__row">
      <div class="aem-footer__logos">
        <span class="aem-logo-placeholder">Sello</span>
        <span class="aem-logo-placeholder">Sello</span>
        <span class="aem-logo-placeholder">Sello</span>
      </div>
      <ul class="aem-footer__social">
${SOCIAL.map((name) => `        <li><a href="#" aria-label="${name.replace('-logo', '')}">${icon(name)}</a></li>`).join('\n')}
      </ul>
    </div>
    <div class="aem-footer__inner aem-footer__row">
      <ul class="aem-footer__legal">
${LEGAL.map((link) => `        <li><a href="#">${link}</a></li>`).join('\n')}
      </ul>
      <p class="aem-footer__copy">© UNIR, Universidad Internacional de La Rioja</p>
    </div>
  </div>
</footer>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
