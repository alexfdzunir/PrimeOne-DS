// url=<PRIMEONE>?node-id=503-31819
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/image/image.ts
// component=Image
import figma from 'figma'
import { flag, is } from '../../figma/helpers'

const instance = figma.selectedInstance

const example = figma.code`<p-image src="assets/imagen.jpg" alt="Imagen" width="250"${flag('preview', is(instance, 'Preview'))} />`
const imports = ["import { Image } from 'primeng/image';"]

export default {
  example,
  imports,
  id: 'image',
  metadata: { nestable: true },
}
