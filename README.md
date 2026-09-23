# PrimeOne DS

Librería Angular del design system PrimeOne: componentes PrimeNG 21 (licencia MIT) con los presets del DS y componentes propios de Proeduca (`prime-one-*`), conectados a Figma con Code Connect.

## Requisitos

- Node.js `^20.19.0`, `^22.12.0` o `>=24` (requisito de Angular 21)
- `npm install`

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Compila la librería en `dist/prime-one-ds` (ng-packagr) |
| `npm run storybook` | Navegable de componentes en `http://localhost:6006` |
| `npm run build-storybook` | Genera el navegable estático en `storybook-static/` |
| `npm run explorer` | Explorador del DS (catálogo, componente en vivo y panel de control) en `http://localhost:4300` |
| `npm run build-explorer` | Genera el explorador estático en `dist/explorer/browser` |
| `npm run figma:parse` | Valida las plantillas de Code Connect sin publicar |
| `npm run figma:publish` | Publica Code Connect en Figma (requiere token) |

## Uso

```ts
import { providePrimeNG } from 'primeng/config';
import { PrimeOneEstudiantes } from 'prime-one-ds';

providePrimeNG({ theme: { preset: PrimeOneEstudiantes, options: { darkModeSelector: '.po-dark' } } });
```

Presets disponibles: `PrimeOneEstudiantes`, `PrimeOneProdi`, `PrimeOneFoundations`. El modo oscuro se activa con la clase `po-dark` en `<html>`. Los iconos son de Phosphor (`@phosphor-icons/web`): los componentes usan los pesos regular, bold y fill, así que la app debe cargar `src/regular/style.css`, `src/bold/style.css` y `src/fill/style.css`.

`p-editor` no se reexporta desde `prime-one-ds`: PrimeNG carga `quill` bajo demanda y quien lo use debe instalarlo (`npm install quill`).

## Storybook

Cada componente tiene una story con controles generados desde su API real (inputs de PrimeNG 21 y de los componentes `prime-one-*`). La barra superior permite cambiar de tema (Estudiantes, Prodi, Foundations) y de modo (claro u oscuro). Los eventos aparecen en el panel Actions.

## Explorador

App Angular propia (`explorer/`) para enseñar el DS: navbar con tema (Estudiantes, Prodi, Foundations) y modo claro u oscuro, catálogo a la izquierda, el componente real en el centro y el panel de control a la derecha (las dos columnas laterales se pliegan). Cada componente muestra sus variantes, todas sus propiedades, el registro de eventos y el código listo para copiar (HTML y TypeScript) con los valores actuales.

- Usa las stories como fuente única (`src/components/**/*.stories.ts`); `scripts/generate-explorer-index.mjs` genera el índice al arrancar o compilar.
- Las plantillas de las stories se compilan en el navegador (JIT). Por eso la build de producción no optimiza los scripts: esa optimización elimina los metadatos de los NgModules (`FormsModule`, `TableModule`...) que el compilador necesita.

## Code Connect

Las plantillas están junto a cada componente (`src/components/**/*.figma.ts`) y usan los helpers de `src/figma/`. Para publicarlas en el fichero de Figma del DS:

```bash
FIGMA_ACCESS_TOKEN=<token con permiso Code Connect> npm run figma:publish
```

El token necesita los scopes *Code Connect: Write* y *File content: Read* y acceso al fichero del DS. No lo guardes en el repositorio.
