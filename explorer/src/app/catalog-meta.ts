/** Icon (Phosphor name) and one-line summary of each component for the home and section pages, by story title. */
const META: Record<string, [icon: string, summary: string]> = {
  // Button
  Button: ['cursor-click', 'Acción principal con variantes, tamaños, iconos y estados.'],
  SpeedDial: ['plus-circle', 'Botón flotante que despliega acciones rápidas.'],
  SplitButton: ['split-horizontal', 'Acción por defecto con un menú de alternativas.'],
  // Form
  AutoComplete: ['magnifying-glass', 'Campo con sugerencias mientras se escribe.'],
  CascadeSelect: ['flow-arrow', 'Selección en niveles anidados.'],
  Checkbox: ['check-square', 'Casilla de selección simple o múltiple.'],
  ColorPicker: ['palette', 'Selector de color en línea o desplegable.'],
  DatePicker: ['calendar-dots', 'Fecha y hora con calendario.'],
  Editor: ['text-aa', 'Editor de texto enriquecido.'],
  FileUpload: ['upload-simple', 'Subida de ficheros con arrastrar y soltar.'],
  FloatLabel: ['cursor-text', 'Etiqueta que flota sobre el campo al escribir.'],
  IconField: ['selection-plus', 'Campo de texto con icono dentro.'],
  IftaLabel: ['text-indent', 'Etiqueta dentro del campo, encima del valor.'],
  InputGroup: ['brackets-curly', 'Campo con complementos a los lados.'],
  InputNumber: ['hash', 'Entrada numérica con formato y botones.'],
  InputOtp: ['password', 'Código de un solo uso, dígito a dígito.'],
  InputText: ['textbox', 'Campo de texto básico.'],
  Knob: ['circle-half', 'Control circular de valor.'],
  Listbox: ['list-checks', 'Lista de opciones seleccionables.'],
  MultiSelect: ['check-circle', 'Desplegable de selección múltiple.'],
  Password: ['lock-key', 'Contraseña con indicador de fortaleza.'],
  RadioButton: ['radio-button', 'Una opción entre varias.'],
  Rating: ['star', 'Valoración con estrellas.'],
  Select: ['caret-up-down', 'Desplegable de selección única.'],
  SelectButton: ['selection-foreground', 'Grupo de botones que actúa como selector.'],
  Slider: ['sliders-horizontal', 'Valor o rango deslizando.'],
  Textarea: ['article', 'Texto de varias líneas.'],
  ToggleButton: ['toggle-left', 'Botón con estado activado o no.'],
  ToggleSwitch: ['toggle-right', 'Interruptor de encendido y apagado.'],
  TreeSelect: ['tree-evergreen', 'Desplegable con opciones en árbol.'],
  // Data
  DataTable: ['table', 'Tabla con ordenación, selección, filtros y paginación.'],
  DataView: ['squares-four', 'Resultados en rejilla o lista con plantilla propia.'],
  OrderList: ['list-numbers', 'Lista que el usuario puede reordenar.'],
  OrganizationChart: ['tree-structure', 'Organigrama jerárquico de nodos.'],
  Paginator: ['caret-double-right', 'Navegación entre páginas de resultados.'],
  PickList: ['arrows-left-right', 'Mueve elementos entre dos listas.'],
  Timeline: ['clock-counter-clockwise', 'Secuencia cronológica de eventos.'],
  Tree: ['tree-view', 'Árbol jerárquico expandible con selección.'],
  TreeTable: ['rows', 'Tabla con filas jerárquicas expandibles.'],
  // Panel
  Accordion: ['caret-circle-down', 'Secciones plegables.'],
  Card: ['cards', 'Tarjeta de contenido con los tipos y tamaños del DS.'],
  Divider: ['minus', 'Separador horizontal o vertical.'],
  Fieldset: ['bounding-box', 'Agrupa campos bajo una leyenda plegable.'],
  Panel: ['square-half-bottom', 'Contenedor con cabecera y plegado.'],
  ScrollPanel: ['scroll', 'Área con scroll personalizado.'],
  Splitter: ['columns', 'Paneles redimensionables.'],
  Stepper: ['steps', 'Proceso guiado en pasos.'],
  Tabs: ['tabs', 'Contenido organizado en pestañas.'],
  Toolbar: ['toolbox', 'Barra de acciones agrupadas.'],
  // Overlay
  ConfirmDialog: ['seal-question', 'Diálogo modal de confirmación.'],
  ConfirmPopup: ['chat-centered-text', 'Confirmación junto al elemento que la lanza.'],
  Dialog: ['frame-corners', 'Ventana modal con contenido libre.'],
  Drawer: ['sidebar-simple', 'Panel lateral deslizante.'],
  Popover: ['chat-circle', 'Capa flotante anclada a un elemento.'],
  Tooltip: ['info', 'Ayuda contextual al pasar el ratón.'],
  // Menu
  Breadcrumb: ['signpost', 'Ruta de navegación jerárquica.'],
  ContextMenu: ['dots-three-vertical', 'Menú al hacer clic derecho.'],
  Dock: ['app-window', 'Barra de aplicaciones con efecto lupa.'],
  MegaMenu: ['grid-four', 'Menú amplio en columnas.'],
  Menu: ['list', 'Menú simple de acciones.'],
  Menubar: ['browser', 'Barra de menú horizontal.'],
  PanelMenu: ['list-dashes', 'Menú en paneles tipo acordeón.'],
  TieredMenu: ['list-bullets', 'Menú con submenús en cascada.'],
  // Messages
  Message: ['warning-circle', 'Mensaje en línea por nivel de gravedad.'],
  Toast: ['bell-simple', 'Notificación temporal superpuesta.'],
  // Media
  Carousel: ['slideshow', 'Carrusel de elementos con navegación.'],
  Galleria: ['images', 'Galería con miniaturas y pantalla completa.'],
  Image: ['image-square', 'Imagen con vista previa ampliada.'],
  ImageCompare: ['split-vertical', 'Compara dos imágenes con un deslizador.'],
  // Misc
  Avatar: ['user-circle', 'Imagen, iniciales o icono de usuario.'],
  AvatarGroup: ['users-three', 'Avatares agrupados y solapados.'],
  Badge: ['notification', 'Indicador numérico o de estado.'],
  BlockUI: ['prohibit', 'Bloquea un área mientras se procesa.'],
  ButtonChip: ['funnel', 'Chip de filtro activable.'],
  Chip: ['tag-simple', 'Elemento compacto con texto, icono o imagen.'],
  Inplace: ['pencil-simple', 'Contenido que se edita en el sitio.'],
  MeterGroup: ['chart-bar', 'Medidas agrupadas en una barra.'],
  OverlayBadge: ['seal', 'Badge superpuesto sobre otro elemento.'],
  ProgressBar: ['chart-bar-horizontal', 'Progreso de una tarea.'],
  ProgressSpinner: ['spinner', 'Indicador de carga circular.'],
  ScrollTop: ['arrow-line-up', 'Botón para volver arriba.'],
  Skeleton: ['rectangle', 'Marcador de posición mientras carga.'],
  Tag: ['tag', 'Etiqueta de estado o categoría.'],
  Terminal: ['terminal-window', 'Consola de comandos simulada.'],
  // Proeduca
  ActionButtons: ['hand-tap', 'Botones de acción del patrón Proeduca.'],
  Agenda: ['calendar', 'Agenda de eventos y clases.'],
  BottomBar: ['device-mobile', 'Barra inferior de acciones en móvil.'],
  BottomSheet: ['arrow-square-up', 'Hoja inferior deslizante en móvil.'],
  ChatIaMessage: ['robot', 'Mensaje del asistente de IA.'],
  ChatMessage: ['chats-circle', 'Mensaje de chat entre personas.'],
  DocumentType: ['file-text', 'Tipo de documento con su icono.'],
  HistoryItem: ['chat-teardrop-text', 'Conversación del historial del chat IA.'],
  InputChat: ['paper-plane-right', 'Caja de entrada del chat.'],
  InputLink: ['link', 'Campo para enlaces.'],
  InputPhone: ['phone', 'Teléfono con prefijo de país.'],
  InputRGPD: ['shield-check', 'Aceptación de la protección de datos.'],
  Navbar: ['navigation-arrow', 'Barra de navegación principal.'],
  Profile: ['user-list', 'Perfil de usuario.'],
  Question: ['question', 'Pregunta de evaluación.'],
  Sidebar: ['sidebar', 'Menú lateral de la aplicación.'],
  StepperMobile: ['number-circle-one', 'Pasos de un proceso en móvil.'],
  TapBar: ['hand-pointing', 'Barra de pestañas inferior en móvil.'],
  TaskCard: ['note', 'Tarjeta de tarea.'],
  TaskColumn: ['kanban', 'Columna de tareas por estado.'],
  Topbar: ['align-top', 'Barra superior de página.'],
};

export interface ComponentMeta {
  /** Phosphor icon class. */
  icon: string;
  summary: string;
}

/** Components without an entry fall back to the section icon and no summary. */
export function componentMeta(title: string, fallbackIcon: string): ComponentMeta {
  const meta = META[title];
  return meta ? { icon: `ph ph-${meta[0]}`, summary: meta[1] } : { icon: fallbackIcon, summary: '' };
}

/** CSS colour of a section accent (see `CategoryDef.accent`). */
export function accentColor(accent: string): string {
  return `var(--p-${accent}-500)`;
}
