// url=<PRIMEONE>?node-id=14010-215017
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/Topbar/topbar.ts
// component=PrimeOneTopbar
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const mobile = is(instance, 'Size', 'Mobile')

const example = figma.code`<prime-one-topbar heading="Section Title" subtitle="Section subtitle" [sections]="sections"${instance.getBoolean('Back Button') ? '' : ' [showBack]="false"'}${instance.getBoolean('Button') ? ' actionLabel="Button"' : ''}${mobile ? ' [mobile]="true" [contrast]="true"' : ''} (back)="goBack()" (action)="onAction()" />`
const imports = ["import { PrimeOneTopbar } from 'prime-one-ds';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'topbar',
  metadata: { nestable: true },
}
