// url=<PRIMEONE>?node-id=373-13099
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/scrolltop/scrolltop.ts
// component=ScrollTop
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance

const example = is(instance, 'Type', 'Element')
  ? figma.code`<p-scrollpanel [style]="{ width: '250px', height: '200px' }">
  <p>${instance.getString('Content').trim()}</p>
  <p-scrolltop target="parent" [threshold]="100" icon="ph ph-arrow-up" />
</p-scrollpanel>`
  : figma.code`<p-scrolltop icon="ph ph-arrow-up" />`
const imports = ["import { ScrollTop } from 'primeng/scrolltop';", ...(is(instance, 'Type', 'Element') ? ["import { ScrollPanel } from 'primeng/scrollpanel';"] : [])]

export default {
  example,
  imports,
  id: 'scrolltop',
  metadata: { nestable: true },
}
