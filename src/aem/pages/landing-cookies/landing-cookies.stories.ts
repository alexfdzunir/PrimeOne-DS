import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import { icon } from '../../stories/helpers';
import { landingForm, landingHero, landingPage, moduleHtml, pageImg, pagesFigma, studyPlan } from '../../stories/page-parts';

const content = [
  landingHero({
    logo: true,
    image: pageImg('landing-hero-producto'),
    pretitle: 'Máster Universitario',
    title: 'Máster en Formación del Profesorado en Educación Secundaria, Bachillerato y FP combinada',
    text: 'Fórmate con un máster oficial asistiendo a clases online en directo',
    logos: 3,
  }),
  studyPlan([
    'Con el Grado en Derecho de UNIR podrás aprender de manera práctica y prepararte para el ejercicio de las profesiones jurídicas y te abre las puertas a otros puestos especializados en entes públicos o en empresas privadas.',
    'Además, estudiarás con casos prácticos reales impartidos por abogados y socios de Gómez-Acebo &amp; Pombo, de uno de los principales despachos con especialización en todas las áreas del derecho de los negocios y la Administración.',
  ]),
];

const banner = `<section class="aem-cookies" role="dialog" aria-modal="true" aria-labelledby="aem-cookies-title">
  <h2 id="aem-cookies-title">Cuidamos tu privacidad</h2>
  <p>Utilizamos Cookies propias y de terceros para analizar el uso del sitio web y mostrarte publicidad relacionada con tus preferencias sobre la base de un perfil elaborado a partir de tus hábitos de navegación (por ejemplo, páginas visitadas). <a href="#">Política de Cookies</a>.</p>
  <div class="aem-cookies__buttons">
    <button class="aem-button aem-button--secondary" type="button">Aceptar Cookies</button>
    <button class="aem-button aem-button--outlined" type="button">Rechazar Cookies</button>
  </div>
  <a class="aem-link-button aem-cookies__settings" href="#">${icon('sliders-horizontal')} Configurar Cookies</a>
</section>`;

const GROUPS: [string, string, boolean][] = [
  ['Cookies necesarias', 'Las cookies necesarias ayudan a hacer una página web utilizable activando funciones básicas como la navegación en la página y el acceso a áreas seguras de la página web. La página web no puede funcionar adecuadamente sin estas cookies.', false],
  ['Cookies funcionales', 'Estas cookies permiten que el sitio web proporcione una mejor funcionalidad y personalización. Pueden ser establecidas por nuestra empresa o por proveedores externos cuyos servicios hemos agregado a nuestras páginas. Si no permite utilizar estas cookies, es posible que algunos de estos servicios no funcionen correctamente.', true],
  ['Cookies analíticas', 'Estas cookies permiten a los propietarios de la página web comprender cómo interactúan los visitantes con la página web, así como el seguimiento y análisis de su comportamiento.', true],
  ['Cookies de publicidad', 'Las cookies de marketing se utilizan para rastrear a los visitantes en las páginas web. La intención es mostrar anuncios relevantes y atractivos para el usuario individual, y por lo tanto, más valiosos para los editores y terceros anunciantes.', true],
];

const settings = `<section class="aem-cookies aem-cookies--settings" role="dialog" aria-modal="true" aria-labelledby="aem-cookies-settings-title">
  <h2 id="aem-cookies-settings-title">Cookies y tecnologías relacionadas en este sitio</h2>
  <p>Elija si desea que este sitio pueda utilizar cookies o tecnologías relacionadas, como balizas web, etiquetas de píxel y objetos Flash (“cookies”), según se describe a continuación. Si desea obtener más información sobre la manera en que este sitio utiliza cookies y tecnologías relacionadas, puede leer nuestra <a href="#">Política de Cookies</a>.</p>
  <div class="aem-cookies__buttons">
    <button class="aem-button aem-button--outlined" type="button">Rechazar Cookies</button>
    <button class="aem-button aem-button--secondary" type="button">Aceptar Cookies</button>
  </div>
${GROUPS.map(
  ([title, text, optional]) => `  <div class="aem-cookies__group" role="group" aria-label="${title}">
    <h3>${title}</h3>
    <p>${text}</p>
    <div class="aem-cookies__choice">${optional ? '<button type="button" aria-pressed="true">Sí</button><button type="button" aria-pressed="false">No</button>' : ''}<a href="#">Ver ${title.toLowerCase()}</a></div>
  </div>`,
).join('\n')}
</section>`;

const meta: Meta = {
  title: 'AEM/Pages/Landing Cookies',
  parameters: {
    figmaUrl: pagesFigma('3262:24200'),
    order: 26,
    storyOrder: ['Default', 'Configurar'],
    layout: 'fullscreen',
    docs: { description: { component: 'Aviso de cookies de las landings (`aem-cookies`, fijo abajo a la derecha): aviso con aceptar, rechazar y configurar, y panel de configuración por tipo de cookie.' } },
  },
  args: { panel: 'banner' },
  render: (args) => {
    const page = landingPage(content, moduleHtml(footer, { showContact: true }), landingForm());
    return { template: page.replace(/<\/div>\s*$/, `<div class="aem-cookies-preview">\n${args['panel'] === 'settings' ? settings : banner}\n</div>\n</div>`) };
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = { name: 'Aviso' };
export const Configurar: Story = { name: 'Configurar', args: { panel: 'settings' } };
