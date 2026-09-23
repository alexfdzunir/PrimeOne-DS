import type { MegaMenuItem, MenuItem, TreeNode } from 'primeng/api';
import { UNIR_LOGO_MARK, UNIR_LOGO_TAGLINE, UNIR_LOGO_VIEWBOX } from './unir-logo';

/** Sample data shared by the stories. */

export interface City {
  name: string;
  code: string;
}

export const CITIES: City[] = [
  { name: 'Madrid', code: 'MAD' },
  { name: 'Barcelona', code: 'BCN' },
  { name: 'Valencia', code: 'VLC' },
  { name: 'Sevilla', code: 'SVQ' },
  { name: 'Bilbao', code: 'BIO' },
  { name: 'Logroño', code: 'LGR' },
];

export const COUNTRIES = [
  {
    name: 'España',
    code: 'ES',
    states: [
      { name: 'Comunidad de Madrid', cities: [{ cname: 'Madrid', code: 'MAD' }, { cname: 'Alcalá de Henares', code: 'AHE' }] },
      { name: 'La Rioja', cities: [{ cname: 'Logroño', code: 'LGR' }, { cname: 'Calahorra', code: 'CAL' }] },
    ],
  },
  {
    name: 'México',
    code: 'MX',
    states: [
      { name: 'Ciudad de México', cities: [{ cname: 'Coyoacán', code: 'COY' }, { cname: 'Tlalpan', code: 'TLA' }] },
      { name: 'Jalisco', cities: [{ cname: 'Guadalajara', code: 'GDL' }, { cname: 'Zapopan', code: 'ZAP' }] },
    ],
  },
];

export type Severity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

export interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
  status: string;
  severity: Severity;
}

export const PRODUCTS: Product[] = [
  { code: 'A-101', name: 'Álgebra lineal', category: 'Matemáticas', quantity: 42, status: 'Activa', severity: 'success' },
  { code: 'A-102', name: 'Cálculo', category: 'Matemáticas', quantity: 38, status: 'Activa', severity: 'success' },
  { code: 'B-201', name: 'Programación I', category: 'Informática', quantity: 64, status: 'Completa', severity: 'info' },
  { code: 'B-202', name: 'Bases de datos', category: 'Informática', quantity: 12, status: 'Últimas plazas', severity: 'warn' },
  { code: 'B-203', name: 'Redes', category: 'Informática', quantity: 0, status: 'Cerrada', severity: 'danger' },
  { code: 'C-301', name: 'Marketing digital', category: 'Empresa', quantity: 27, status: 'Activa', severity: 'success' },
  { code: 'C-302', name: 'Finanzas', category: 'Empresa', quantity: 8, status: 'Últimas plazas', severity: 'warn' },
  { code: 'D-401', name: 'Psicología del desarrollo', category: 'Educación', quantity: 51, status: 'Activa', severity: 'success' },
  { code: 'D-402', name: 'Didáctica', category: 'Educación', quantity: 33, status: 'Completa', severity: 'info' },
  { code: 'E-501', name: 'Derecho civil', category: 'Derecho', quantity: 19, status: 'Activa', severity: 'success' },
  { code: 'E-502', name: 'Derecho penal', category: 'Derecho', quantity: 0, status: 'Cerrada', severity: 'danger' },
  { code: 'F-601', name: 'Anatomía', category: 'Salud', quantity: 45, status: 'Activa', severity: 'success' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Archivo',
    icon: 'ph ph-file',
    items: [
      { label: 'Nuevo', icon: 'ph ph-plus', items: [{ label: 'Documento', icon: 'ph ph-file-text' }, { label: 'Carpeta', icon: 'ph ph-folder' }] },
      { label: 'Abrir', icon: 'ph ph-folder-open' },
      { separator: true },
      { label: 'Exportar', icon: 'ph ph-export' },
    ],
  },
  {
    label: 'Editar',
    icon: 'ph ph-pencil-simple',
    items: [
      { label: 'Deshacer', icon: 'ph ph-arrow-counter-clockwise' },
      { label: 'Rehacer', icon: 'ph ph-arrow-clockwise' },
    ],
  },
  { label: 'Buscar', icon: 'ph ph-magnifying-glass' },
  { label: 'Ayuda', icon: 'ph ph-question', disabled: true },
];

export const FLAT_MENU_ITEMS: MenuItem[] = [
  {
    label: 'Documentos',
    items: [
      { label: 'Nuevo', icon: 'ph ph-plus' },
      { label: 'Buscar', icon: 'ph ph-magnifying-glass' },
    ],
  },
  {
    label: 'Perfil',
    items: [
      { label: 'Ajustes', icon: 'ph ph-gear' },
      { label: 'Cerrar sesión', icon: 'ph ph-sign-out' },
    ],
  },
];

export const ACTION_ITEMS: MenuItem[] = [
  { label: 'Actualizar', icon: 'ph ph-arrows-clockwise' },
  { label: 'Duplicar', icon: 'ph ph-copy' },
  { separator: true },
  { label: 'Eliminar', icon: 'ph ph-trash' },
];

export const MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    label: 'Estudios',
    icon: 'ph ph-graduation-cap',
    items: [
      [{ label: 'Grados', items: [{ label: 'Informática' }, { label: 'Educación' }, { label: 'Derecho' }] }],
      [{ label: 'Másteres', items: [{ label: 'Ciberseguridad' }, { label: 'Marketing' }, { label: 'Psicología' }] }],
    ],
  },
  {
    label: 'Campus',
    icon: 'ph ph-buildings',
    items: [[{ label: 'Servicios', items: [{ label: 'Biblioteca' }, { label: 'Secretaría' }] }]],
  },
];

export const TREE_NODES: TreeNode[] = [
  {
    key: '0',
    label: 'Documentos',
    icon: 'ph ph-folder',
    children: [
      {
        key: '0-0',
        label: 'Trabajo',
        icon: 'ph ph-folder',
        children: [
          { key: '0-0-0', label: 'Plan docente.pdf', icon: 'ph ph-file-pdf' },
          { key: '0-0-1', label: 'Calendario.xlsx', icon: 'ph ph-file-xls' },
        ],
      },
      { key: '0-1', label: 'Personal', icon: 'ph ph-folder', children: [{ key: '0-1-0', label: 'Notas.docx', icon: 'ph ph-file-doc' }] },
    ],
  },
  {
    key: '1',
    label: 'Imágenes',
    icon: 'ph ph-images',
    children: [{ key: '1-0', label: 'Portada.png', icon: 'ph ph-file-image' }],
  },
];

export const FILE_TREE: TreeNode[] = [
  {
    data: { name: 'Asignaturas', size: '120 MB', type: 'Carpeta' },
    expanded: true,
    children: [
      { data: { name: 'Temario.pdf', size: '8 MB', type: 'PDF' } },
      { data: { name: 'Ejercicios', size: '32 MB', type: 'Carpeta' }, children: [{ data: { name: 'Tema 1.docx', size: '1 MB', type: 'Word' } }] },
    ],
  },
  { data: { name: 'Vídeos', size: '2 GB', type: 'Carpeta' }, children: [{ data: { name: 'Clase 1.mp4', size: '700 MB', type: 'Vídeo' } }] },
];

export const FILE_COLUMNS = [
  { field: 'name', header: 'Nombre' },
  { field: 'size', header: 'Tamaño' },
  { field: 'type', header: 'Tipo' },
];

export const ORG_CHART: TreeNode[] = [
  {
    label: 'Rectorado',
    expanded: true,
    children: [
      { label: 'Facultad de Ingeniería', expanded: true, children: [{ label: 'Informática' }, { label: 'Industrial' }] },
      { label: 'Facultad de Educación', expanded: true, children: [{ label: 'Primaria' }, { label: 'Secundaria' }] },
    ],
  },
];

export const TIMELINE_EVENTS = [
  { status: 'Matrícula', date: '01/09/2026', icon: 'ph ph-pencil-simple' },
  { status: 'Inicio de clases', date: '15/09/2026', icon: 'ph ph-chalkboard-teacher' },
  { status: 'Evaluación continua', date: '20/11/2026', icon: 'ph ph-check-square' },
  { status: 'Examen final', date: '18/01/2027', icon: 'ph ph-exam' },
];

/** Inline SVG placeholder so the stories do not depend on external images. */
export function placeholderImage(label: string, from: string, to: string, width = 800, height = 500): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
    `<defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>` +
    `<rect width="${width}" height="${height}" fill="url(#g)"/>` +
    `<text x="50%" y="50%" fill="#fff" font-family="system-ui, sans-serif" font-size="${Math.round(height / 10)}" ` +
    `text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const IMAGES = [
  { label: 'Campus', from: '#0d61f2', to: '#052761' },
  { label: 'Biblioteca', from: '#10b981', to: '#064e3b' },
  { label: 'Laboratorio', from: '#f97316', to: '#7c2d12' },
  { label: 'Auditorio', from: '#d946ef', to: '#4a044e' },
  { label: 'Residencia', from: '#0ea5e9', to: '#0c4a6e' },
].map(({ label, from, to }) => ({
  alt: label,
  src: placeholderImage(label, from, to),
  thumbnail: placeholderImage(label, from, to, 160, 100),
}));

/**
 * UNIR horizontal logo for `<img>`: colour version (black mark, blue tagline), all white when the element that
 * embeds it has a dark `color-scheme` (the explorer sets it with the dark mode).
 */
export const UNIR_LOGO = logoImage('.m{fill:#000}.t{fill:#0d61f2}@media (prefers-color-scheme: dark){.m,.t{fill:#fff}}');

/** Negative UNIR logo (all white) for primary backgrounds. */
export const UNIR_LOGO_NEGATIVE = logoImage('.m,.t{fill:#fff}');

function logoImage(style: string): string {
  const { width, height } = UNIR_LOGO_VIEWBOX;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">` +
    `<style>${style}</style><path class="t" fill-rule="evenodd" clip-rule="evenodd" d="${UNIR_LOGO_TAGLINE}"/>` +
    `<path class="m" d="${UNIR_LOGO_MARK}"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Inline SVG portrait (head and shoulders) for the photo avatars, so the stories stay offline. */
export function portraitImage(background: string, skin: string, hair: string, shirt: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">` +
    `<rect width="96" height="96" fill="${background}"/>` +
    `<path d="M12 96c2-19 16-29 36-29s34 10 36 29z" fill="${shirt}"/>` +
    `<rect x="41" y="50" width="14" height="18" rx="6" fill="${skin}"/>` +
    `<circle cx="48" cy="38" r="17" fill="${skin}"/>` +
    `<path d="M30 38c-1-13 7-22 18-22s19 9 18 22c-3-7-9-11-18-11s-15 4-18 11z" fill="${hair}"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const PORTRAITS = [
  portraitImage('#dbeafe', '#e8b894', '#3b2416', '#0d61f2'),
  portraitImage('#fce7f3', '#c68863', '#1f1510', '#be185d'),
  portraitImage('#dcfce7', '#f1c9a8', '#8a5a2b', '#15803d'),
  portraitImage('#fef3c7', '#9c6644', '#111827', '#b45309'),
];

/**
 * Card cover: UNIR blue gradient with the negative UNIR logo. Without intrinsic size, so the SVG takes the
 * box of the image: the gradient fills any aspect ratio and the logo always fits whole (product, horizontal
 * and the narrow strip of the horizontal-full card on phones).
 */
export const CARD_COVER = (() => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#3d81f5"/><stop offset="0.55" stop-color="#0d61f2"/><stop offset="1" stop-color="#052761"/>` +
    `</linearGradient></defs>` +
    `<rect width="100%" height="100%" fill="url(#g)"/>` +
    `<svg x="27.5%" y="30%" width="45%" height="40%" viewBox="0 0 ${UNIR_LOGO_VIEWBOX.width} ${UNIR_LOGO_VIEWBOX.height}">` +
    `<g fill="#ffffff"><path fill-rule="evenodd" clip-rule="evenodd" d="${UNIR_LOGO_TAGLINE}"/><path d="${UNIR_LOGO_MARK}"/></g></svg></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
})();
