import type { Meta, StoryObj } from '@storybook/angular';
import footer from '../../components/footer/footer.stories';
import { heading, icon } from '../../stories/helpers';
import {
  accordion,
  downloads,
  financing,
  landingCalculator,
  landingClosing,
  landingForm,
  landingHero,
  landingPage,
  moduleHtml,
  pageImg,
  pagesFigma,
  proposal,
  richText,
  section,
  studentsStat,
  studyPlan,
  textImageBlock,
} from '../../stories/page-parts';

/** One of the compared programmes: photo, title, facts, study plan and areas. */
const program = (title: string) => `<div class="aem-content-block aem-content-block--40-60">
  <div class="aem-content-block__media"><img src="${pageImg('landing-programa')}" alt="" loading="lazy" /></div>
  <div class="aem-content-block__column">
${heading({ pretitle: 'Maestría en', title })}
${richText(['Una formación orientada a la gestión y dirección efectiva y responsable de instituciones, hospitales, centros, servicios y programas de salud nacionales e internacionales.'])}
    <ul class="aem-program-facts">
      <li>${icon('calendar-blank')} Abierta próxima convocatoria</li>
      <li>${icon('timer')} Plazas limitadas</li>
      <li class="is-highlight">${icon('lightning')} 37% descuento hasta el 14 de mayo</li>
    </ul>
${downloads([['Descarga ahora el Plan de estudios en PDF', 'Archivo.PDF']])}
${accordion(['Ciencias Sociales y Jurídicas', 'Técnicas', 'Expresión artística'].map((t) => [t, `Asignaturas del área de ${t.toLowerCase()} incluidas en el plan de estudios.`, 'Incluido'] as [string, string, string]))}
  </div>
</div>`;

const promo = `<ul class="aem-accelerator aem-accelerator--highlight aem-accelerator--accent" aria-label="Promoción">
  <li><a class="aem-accelerator__link" href="#">${icon('seal-percent')} 30% de descuento hasta el 7 de enero. Contacta con tu asesor</a></li>
</ul>`;

const content = [
  landingHero({ logo: true, image: pageImg('landing-hero-producto'), title: 'Internacionaliza tu perfil con una Maestría en Administración Hospitalaria', logos: 1 }),
  studyPlan([
    'Estas maestrías están enfocadas a la gestión y dirección efectiva y responsable de instituciones, hospitales, centros, servicios y programas de salud nacionales e internacionales.',
    'Nuestros títulos están avalados por la Secretaría de Educación Pública de México y el Ministerio de Educación de España: obtendrás una doble titulación con validez en ambos países.',
  ]),
  section(program('Dirección y Administración en Salud con doble título oficial EU-MX'), { secondary: true }),
  section(program('Gestión Sanitaria con doble título oficial EU-MX'), { secondary: true, flush: true }),
  proposal(false),
  studentsStat('100', 'de matriculados finalizan este máster'),
  landingCalculator(),
  financing(),
  section(textImageBlock(pageImg('landing-trabajo-2'), true, 'Salidas profesionales', '¿Dónde podrás trabajar?')),
  studentsStat('87', 'de nuestros egresados de Psicología está ya trabajando'),
  ...landingClosing(),
];

const meta: Meta = {
  title: 'AEM/Pages/Landing Comparativa',
  parameters: {
    figmaUrl: pagesFigma('3219:16706'),
    order: 22,
    layout: 'fullscreen',
    docs: { description: { component: 'Landing comparativa: barra de promoción, hero con foto, dos programas enfrentados (foto, datos de convocatoria, plan de estudios y áreas), propuesta educativa, cifras, calculadora, financiación, reconocimientos y universidad oficial, con el formulario lateral.' } },
  },
  render: () => ({ template: landingPage(content, moduleHtml(footer, { showContact: true }), landingForm(), promo) }),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
