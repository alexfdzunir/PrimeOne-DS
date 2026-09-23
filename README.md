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
| `npm run figma:parse` | Valida las plantillas de Code Connect sin publicar |
| `npm run figma:publish` | Publica Code Connect en Figma (requiere token) |

## Uso

```ts
import { providePrimeNG } from 'primeng/config';
import { PrimeOneEstudiantes } from 'prime-one-ds';

providePrimeNG({ theme: { preset: PrimeOneEstudiantes, options: { darkModeSelector: '.po-dark' } } });
```

Presets disponibles: `PrimeOneEstudiantes`, `PrimeOneProdi`, `PrimeOneFoundations`. El modo oscuro se activa con la clase `po-dark` en `<html>`. Los iconos son de Phosphor (`@phosphor-icons/web`).

`p-editor` no se reexporta desde `prime-one-ds`: PrimeNG carga `quill` bajo demanda y quien lo use debe instalarlo (`npm install quill`).

## Storybook

Cada componente tiene una story con controles generados desde su API real (inputs de PrimeNG 21 y de los componentes `prime-one-*`). La barra superior permite cambiar de tema (Estudiantes, Prodi, Foundations) y de modo (claro u oscuro). Los eventos aparecen en el panel Actions.

## Code Connect

Las plantillas están junto a cada componente (`src/components/**/*.figma.ts`) y usan los helpers de `src/figma/`. Para publicarlas en el fichero de Figma del DS:

```bash
FIGMA_ACCESS_TOKEN=<token con permiso Code Connect> npm run figma:publish
```

El token necesita los scopes *Code Connect: Write* y *File content: Read* y acceso al fichero del DS. No lo guardes en el repositorio.
