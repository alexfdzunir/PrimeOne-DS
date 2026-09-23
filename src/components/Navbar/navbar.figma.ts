// url=<PRIMEONE>?node-id=14037-135115
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/Navbar/navbar.ts
// component=PrimeOneNavbar
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const mobile = is(instance, 'Display', 'Mobile')
const heading = instance.getBoolean('Section') && !mobile ? ' heading="Section Title"' : ''

const example = figma.code`<prime-one-navbar logo="assets/logo-unir.svg" logoAlt="UNIR"${heading} [actions]="actions"${is(instance, 'Contrast') ? ' [contrast]="true"' : ''}${mobile ? ' [mobile]="true"' : ''} (menuToggle)="menuOpen = !menuOpen" (actionClick)="onAction($event)" />`
const imports = ["import { PrimeOneNavbar } from 'prime-one-ds';"]

export default {
  example,
  imports,
  id: 'navbar',
  metadata: { nestable: true },
}
