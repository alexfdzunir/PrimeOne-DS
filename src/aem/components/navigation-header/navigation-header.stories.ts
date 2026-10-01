import type { Meta, StoryObj } from '@storybook/angular';
import { attrs, figmaNode, icon, unirLogo } from '../../stories/helpers';

const MENU = ['Oferta académica', 'Grados', 'Másteres', 'Estudiar en UNIR', 'La Universidad'];
const SECTIONS: [string, string[]][] = [
  ['Educación', ['Grado en Maestro en Educación Infantil', 'Grado en Maestro en Educación Primaria', 'Grado en Pedagogía', 'Máster en Formación del Profesorado', 'Máster en Psicopedagogía']],
  ['Ciencias de la Salud', ['Grado en Psicología', 'Grado en Nutrición Humana y Dietética', 'Máster en Psicología General Sanitaria']],
  ['Ingeniería y Tecnología', ['Grado en Ingeniería Informática', 'Máster en Inteligencia Artificial', 'Máster en Ciberseguridad']],
  ['Empresa', ['Grado en Administración y Dirección de Empresas', 'MBA', 'Máster en Marketing Digital']],
  ['Derecho', ['Grado en Derecho', 'Máster en Acceso a la Abogacía y la Procura']],
];

const meta: Meta = {
  title: 'AEM/Modules/Navigation Header',
  parameters: {
    figmaUrl: figmaNode('10741:32866'),
    layout: 'fullscreen',
    height: '560px',
    controls: { expanded: true },
    storyOrder: ['Default', 'Expanded'],
    docs: { description: { component: 'Cabecera de los portales: barra de servicio, menú principal con megamenú por sección y botón de solicitud. En móvil, menú hamburguesa. `navigation-header.js`.' } },
  },
  args: { expanded: false },
  argTypes: { expanded: { control: 'boolean', description: 'Expanded en Figma: megamenú de "Oferta académica" abierto.' } },
  render: (args) => {
    const sections = SECTIONS.map(
      ([label], i) => `            <li><button ${attrs({ class: 'aem-megamenu__section', type: 'button', role: 'tab', 'aria-selected': String(i === 0), 'aria-controls': `aem-mega-panel-${i}` })}>${label} ${icon('arrow-right')}</button></li>`,
    );
    const panels = SECTIONS.map(
      ([label, links], i) => `          <div ${attrs({ class: 'aem-megamenu__panel', id: `aem-mega-panel-${i}`, role: 'tabpanel', hidden: i !== 0 })}>
            <ul class="aem-megamenu__links">
              <li class="aem-megamenu__title">${label}</li>
${links.map((link) => `              <li><a href="#">${link}</a></li>`).join('\n')}
            </ul>
            <a class="aem-megamenu__all" href="#">Todos los estudios de ${label.toLowerCase()} ${icon('arrow-right')}</a>
          </div>`,
    );
    const menu = MENU.map((label, i) =>
      i === 0
        ? `      <li>
        <button ${attrs({ class: 'aem-header__item', type: 'button', 'aria-expanded': String(!!args['expanded']), 'aria-controls': 'aem-mega-0' })}>${label}</button>
        <div ${attrs({ class: 'aem-megamenu', id: 'aem-mega-0', hidden: !args['expanded'] })}>
          <ul class="aem-megamenu__sections" role="tablist" aria-label="Áreas">
${sections.join('\n')}
          </ul>
${panels.join('\n')}
        </div>
      </li>`
        : `      <li><a class="aem-header__item" href="#">${label}</a></li>`,
    );
    return {
      template: `<header class="aem-header">
  <nav class="aem-header__utility" aria-label="Servicios">
    <a class="aem-link-button" href="#">${icon('magnifying-glass')} Buscar titulación</a>
    <a class="aem-link-button" href="#">${icon('globe')} Internacional</a>
    <a class="aem-link-button" href="#">${icon('user')} Acceso estudiante</a>
  </nav>
  <div class="aem-header__main">
    <a class="aem-header__logo" href="#">${unirLogo()}</a>
    <nav class="aem-header__nav" aria-label="Principal">
      <ul class="aem-header__menu">
${menu.join('\n')}
      </ul>
    </nav>
    <a class="aem-button" href="#">Solicita información</a>
    <button class="aem-button aem-button--ghost aem-button--icon-only aem-header__burger" type="button" aria-label="Menú" aria-expanded="false">${icon('list', 'aem-button__icon')}</button>
  </div>
</header>`,
    };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Expanded: Story = { args: { expanded: true } };
