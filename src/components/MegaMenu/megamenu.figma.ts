// url=<PRIMEONE>?node-id=6590-27038
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/megamenu/megamenu.ts
// component=MegaMenu
import figma from 'figma'
import { attr, is } from '../../figma/helpers'

const instance = figma.selectedInstance

const example = figma.code`<p-megamenu [model]="items"${attr('orientation', is(instance, 'Orientation', 'Vertical') ? 'vertical' : undefined)} />`
const imports = ["import { MegaMenu } from 'primeng/megamenu';", "import { MegaMenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'megamenu',
  metadata: { nestable: true },
}
