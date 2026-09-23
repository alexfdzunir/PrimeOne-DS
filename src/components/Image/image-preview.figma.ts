// url=<PRIMEONE>?node-id=6650-34731
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/image/image.ts
// component=Image
import figma from 'figma'

const example = figma.code`<p-image src="assets/imagen.jpg" alt="Imagen" width="250" preview />`
const imports = ["import { Image } from 'primeng/image';"]

export default {
  example,
  imports,
  id: 'image-preview',
  metadata: { nestable: true },
}
