import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { icon } from '../../stories/helpers';
import { closing, eventCard, formPanel, grid, hero, moduleHtml, pageImg, pagesFigma, profiles, section, shareBanner } from '../../stories/page-parts';

const content = [
  hero({
    crumbs: ['Inicio', 'Eventos', 'Seminarios', 'Investigar con humanidad'],
    tags: ['Openclasses', 'Ciencias de la salud'],
    title: 'Investigar con humanidad: el enfoque cualitativo en la salud',
    extra: `<div class="aem-hero__speakers"><span class="aem-avatar aem-avatar--shadow"><img src="${pageImg('ponente-torres')}" alt="" /></span> Manuel Torres</div>`,
    after: `<div class="aem-hero__meta">
  <ul class="aem-tag-set">
    <li><span class="aem-state-tag aem-state-tag--online">Online</span></li>
    <li><span class="aem-tag aem-tag--plain">${icon('calendar-blank', 'aem-tag__icon')}<span class="aem-tag__text">27/10/2025</span></span></li>
    <li><span class="aem-tag aem-tag--plain">${icon('clock-countdown', 'aem-tag__icon')}<span class="aem-tag__text">17:00 - 17:45</span></span></li>
  </ul>
  <button class="aem-link-button aem-link-button--inverse" type="button">Compártelo ${icon('export')}</button>
</div>`,
  }),
  section(`<div class="aem-article">
  <div class="aem-rich-text"><h2>Presentación</h2></div>
  <p class="aem-article__lead">La investigación cualitativa permite explorar la complejidad humana detrás de los datos. En este encuentro descubriremos cómo las emociones, vivencias y percepciones enriquecen el conocimiento científico y mejoran la comprensión de la salud.</p>
  <figure class="aem-article__figure"><img src="${pageImg('evento-cualitativo')}" alt="" loading="lazy" /></figure>
</div>`),
  section(
    `<div class="aem-article"><div class="aem-rich-text">
  <p>En la actualidad los datos cuantitativos dominan el mundo. El big data y la inteligencia artificial permiten disponer de evidencia concreta de cualquier sector. La investigación no es ajena a esta realidad. Sin embargo, hay aspectos de la salud que los números no alcanzan a explicar: las experiencias, los significados y las emociones de las personas.</p>
  <p>En esta sesión abordaremos qué aporta el enfoque cualitativo a la investigación en salud, cuáles son sus principales métodos (entrevistas, grupos focales, observación) y cómo se analizan los datos para obtener resultados rigurosos y útiles para la práctica clínica.</p>
</div></div>`,
    { flush: true },
  ),
  section(
    profiles([['', [[pageImg('ponente-torres'), 'Docente en el Máster de Metodología de la Investigación en Ciencias de la Salud', 'Manuel Torres', 'Ha publicado múltiples artículos didácticos sobre programación, ciencia de datos, estadística y psicología. Entre los temas que ha abordado destacan: aprendizaje de lenguajes como R o python, bases de datos y minería de textos.']]]]),
    { flush: true, heading: { title: 'Ponentes invitados' } },
  ),
  `<div class="aem-section aem-section--flush" style="padding-bottom: 0">${shareBanner('Comparte este evento')}</div>`,
  section(
    grid(
      [
        eventCard(pageImg('evento-ambiental'), { day: '26', month: 'Sep 2025', year: 'Horario' }, 'Profesionalización de la educación ambiental: docencia clave para la crisis climática', 'La educación ambiental es estratégica para impulsar la resiliencia climática y acompañar la transición ecosocial.', ['Openclasses', 'Derecho']),
        eventCard(pageImg('evento-groenlandia'), { day: '27', month: 'Sep 2025', year: 'Horario' }, 'Venezuela, Groenlandia y el nuevo tablero global: ¿hacia dónde se dirige la geopolítica mundial?', 'Los expertos diplomáticos, Inocencio Arias y Yago Pico de Coaña, analizarán los principales retos geopolíticos actuales.', ['Openclasses', 'Derecho']),
      ],
      '20rem',
    ),
    { heading: { title: 'No te pierdas los próximos eventos' } },
  ),
  ...closing(),
];

const eventForm = formPanel([])
  .replace(/\s*<ul class="aem-form-panel__promo">\s*<\/ul>/, '')
  .replace('<h2 class="aem-form-panel__title">Solicita información</h2>', '<h2 class="aem-form-panel__title">¿Quieres asistir a este evento?</h2>')
  .replace(/\s*<div class="aem-field-host aem-input"><label class="aem-field"><span class="aem-field__control"><input class="aem-field__input" type="text" placeholder=" " \/><span class="aem-field__label">Fecha de nacimiento<\/span>.*?<\/div>/, '')
  .replace('<span class="aem-field__label">Código postal</span>', '<span class="aem-field__label">Provincia</span>')
  .replace(/\s*<div class="aem-field-host aem-dropdown" data-aem-dropdown><button class="aem-field aem-dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="aem-field__control"><span class="aem-dropdown__value" data-aem-dropdown-value><\/span><span class="aem-field__label">Nivel de estudios<\/span>.*?<\/div>/, '')
  .replace('</div>\n    <p class="aem-form__legal"', `  <div class="aem-field-host aem-text-area"><label class="aem-field aem-text-area__field"><span class="aem-field__control"><textarea class="aem-field__input" rows="3" placeholder=" "></textarea><span class="aem-field__label">Pregunta al ponente</span></span></label></div>\n    </div>\n    <p class="aem-form__legal"`);

const meta: Meta = {
  title: 'AEM/Pages/Evento Detalle',
  parameters: {
    figmaUrl: pagesFigma('2106:397496'),
    order: 12,
    layout: 'fullscreen',
    docs: { description: { component: 'Detalle de evento: hero de evento con ponente, modalidad, fecha y hora, presentación con imagen, descripción, ponentes, compartir, próximos eventos y el formulario de inscripción lateral.' } },
  },
  render: () => ({
    template: `<div class="aem-page">
${moduleHtml(navigationHeader)}
<div class="aem-page__aside-layout">
<main>
${content.join('\n')}
</main>
<aside aria-label="Inscripción">
${eventForm}
</aside>
</div>
${moduleHtml(footer)}
</div>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
