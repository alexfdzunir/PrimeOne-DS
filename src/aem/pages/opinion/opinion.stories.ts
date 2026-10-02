import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import navigationHeader from '../../components/navigation-header/navigation-header.stories';
import { card, carousel, closing, figures, grid, hero, moduleHtml, pageImg, pagesFigma, section, testimonials } from '../../stories/page-parts';

const VIDEOS: [string, string, string][] = [
  ['op-montanes', '"Lo que más me ha sorprendido es el nivel de los profesores. Son personas muy experimentadas con unos CV increíbles"', 'Lidia Montañés, private banker en Morabanc, valora junto a otros compañeros su paso por la universidad en el programa MBA Executive durante el evento presencial ‘Madrid Executive Week’.'],
  ['op-ribas', '"La experiencia de aprendizaje online ha sido mi salvación, porque por mi trabajo no lo podría haber hecho de otra manera"', 'María del Mar Ribas Requena, egresada del Máster en Composición Musical, señala cómo estos estudios le han aportado una visión de la música totalmente diferente a la de la interpretación.'],
  ['op-bartone', '"A pesar de que es online, mantienes un vínculo importante con los compañeros, que sirven de apoyo"', 'Magdalena Bartone, egresada del Máster en Educación del Carácter y Educación Emocional, nos cuenta cómo con UNIR encontró las herramientas que necesitaba para trabajar las emociones.'],
  ['op-soler', '"He podido compaginar mi vida laboral con los estudios aprovechando las facilidades que te da UNIR"', 'Marc Soler estudió el Grado de Educación Bilingüe en Primaria. Valora enormemente su paso por UNIR, no solo por los contenidos, sino también por la comodidad de la metodología del centro.'],
  ['op-moreiras', '"UNIR me ha permitido no estancarme en las metodologías tradicionales y apostar por la innovación"', 'Laura Moreiras, egresada del Máster en Innovación Educativa, señala que en UNIR encontró una nueva forma de percibir la educación, aprendiendo a buscar ideas creativas y a implementar el cambio.'],
  ['op-montero', '“Elegí UNIR porque no había encontrado otra universidad que tuviera un plan de estudios tan amplio”', 'Paula Montero, egresada del Máster en Educación Especial, se decantó por este centro universitario para mejorar su predisposición a ayudar a sus alumnos a descubrir sus necesidades y fortalezas.'],
  ['op-discapacidad', '"La educación online te brinda muchas herramientas que reducen la desigualdad si tienes discapacidad"', 'Times Higher Education analiza 13 indicadores clave de 1.800 universidades y pone en valor nuestro espíritu internacional.'],
  ['op-ballesteros', '"He adquirido nuevas herramientas para desarrollar mi carrera en Literatura y generar una marca propia"', 'María Lorena Ballesteros, egresada del Máster en Literatura Española y Latinoamericana, está al frente de ‘Books By Lolita’, una insignia personal para fomentar la lectura en jóvenes y adultos.'],
];
const SUCCESS: [string, string, string][] = [
  ['exito-gonzalez', 'María González, jefa de Marca de Redeia: "Gracias al máster de UNIR, ahora me siento más segura al tomar decisiones y defenderlas”', 'La jefa del Departamento de Marca e Imagen de la matriz de Red Eléctrica cuenta su experiencia tras estudiar el Máster en Gestión de Marca.'],
  ['exito-hielo', 'Héctor González, campeón de España en danza sobre hielo: “El patinaje es mi pasión, pero los estudios son mi base de futuro”', 'De Toledo a Helsinki, el patinador sobre hielo ha cruzado Europa para luchar por su sueño. Paralelamente, estudia el Grado en Matemática Computacional en UNIR y forma parte del PADAN.'],
  ['exito-teruel', 'Irene Teruel: “Mi consejo para quienes compaginan trabajo con estudios es: organización, planificación y anticipación"', 'Con tan solo 32 años, la alumni de UNIR ha sido nominada entre las Top 100 Mujeres Líderes en el Exterior. Actualmente es country manager en Bioelements.'],
  ['edu-peru', 'De Quito a Logroño: María Elena Flores alcanza el doctorado con UNIR', 'La ecuatoriana María Elena Flores obtuvo la máxima calificación en la defensa de su tesis doctoral en Ciencias Sociales en UNIR.'],
  ['edu-peru', 'Expertos analizan en UNIR el papel transformador de la IA y el IoT en la enseñanza técnica y profesional', "El ciclo de debates 'IoT en educación: hacia la industria 5.0' exploró cómo las tecnologías emergentes pueden impulsar metodologías innovadoras."],
];

const content = [
  hero({ crumbs: ['Inicio', 'Estudiar en Unir', 'Opiniones'], title: 'Opiniones de estudiantes en UNIR' }),
  `<img class="aem-page__banner-image" src="${pageImg('opinion-banner')}" alt="" />`,
  section('', {
    heading: {
      title: 'Nuestros estudiantes, los mejores embajadores',
      text: 'En UNIR estamos orgullosos de nuestros estudiantes por el esfuerzo y empeño con el que enfocan los objetivos que se ponen en el camino. Por ello, cuando hablan de su experiencia de aprendizaje en la universidad, nosotros les escuchamos. Sus opiniones son el mejor testimonio de nuestro trabajo, que les brinda un aprendizaje integral, siempre acompañados por la figura del asesor personal. Te invitamos a que conozcas sus historias, les escuches detenidamente y descubras por qué estudiar una de nuestras titulaciones mejorará tu futuro profesional.',
    },
  }),
  section(
    figures([
      ['155', 'mil', 'egresados han pasado por las aulas online de UNIR en todo el mundo', ''],
      ['83', '%', 'de ellos recomendarían UNIR, su claustro y los conocimientos adquiridos', ''],
      ['87', '%', 'de estos estudiantes valoran positivamente el acompañamiento del asesor personal', ''],
    ]),
    { className: 'aem-section--accent', heading: { title: 'Datos de la facultad' } },
  ),
  section(grid(VIDEOS.map(([file, title, text]) => card({ title, text, fill: 'empty', image: pageImg(file), play: true })), '16rem'), { heading: { title: 'Así opinan nuestros egresados' } }),
  section(testimonials([['“UNIR es educación de calidad en un clic. De hecho, desde el principio tuve un tutor que me acompañó en todo el proceso de aprendizaje. Siento que tengo todas las herramientas que necesito para ponerme delante de un aula y poder dar clase”.', 'Micaella Cattani', 'Egresada del Máster Universitario en Pedagogía Musical', pageImg('alumni-sanz')]]), { flush: true }),
  section(carousel(SUCCESS.map(([file, title, text]) => card({ title, text, fill: 'empty', image: pageImg(file), mediaHeight: '20rem' })), 'Historias'), {
    flush: true,
    className: 'aem-card-block',
    heading: { title: 'Historias de éxito que inspiran' },
  }),
  section(
    carousel(
      (
        [
          ['logo-forbes-color', 'Forbes', 'Líderes en innovación educativa, según ‘Forbes’', 'Forbes nos posiciona entre las tres mejores universidades de España y como la primera online.'],
          ['logo-qs', 'QS Stars', 'UNIR: una universidad de 5 estrellas, según QS Stars', 'UNIR alcanza la máxima calificación en el rating de la reconocida consultora británica.'],
          ['logo-the-2', 'Times Higher Education', 'UNIR, la universidad en línea nº1 del mundo en español, según Times Higher Education', 'La prestigiosa revista THE reconoce a UNIR en 2024 como la primera universidad hispanohablante en línea del mundo.'],
        ] as [string, string, string, string][]
      ).map(([file, alt, title, text]) => card({ logo: [pageImg(file, 'png'), alt], title, text, fill: 'secondary' })),
      'Rankings',
    ),
    { secondary: true, className: 'aem-card-block', heading: { title: 'Los rankings nos avalan' } },
  ),
  ...closing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Opinión',
  parameters: {
    figmaUrl: pagesFigma('2107:237616'),
    order: 15,
    layout: 'fullscreen',
    docs: { description: { component: 'Opiniones de estudiantes: hero, imagen, presentación, cifras, vídeos de egresados, testimonio, historias de éxito, rankings, propuesta educativa y vídeos.' } },
  },
  render: () => ({
    template: `<div class="aem-page">
${moduleHtml(navigationHeader)}
<main>
${content.join('\n')}
</main>
${moduleHtml(footer)}
</div>`,
  }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
