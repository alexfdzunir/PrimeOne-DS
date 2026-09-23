// url=<PRIMEONE>?node-id=14685-27237
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/Profile/profile.ts
// component=PrimeOneProfile
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance

const example = figma.code`<prime-one-profile [name]="user.name" [image]="user.avatar"${instance.getBoolean('Icon Right') ? '' : ' [showToggle]="false"'}${is(instance, 'Contrast', 'Yes') ? ' [contrast]="true"' : ''} (editProfile)="openProfile()" />`
const imports = ["import { PrimeOneProfile } from 'prime-one-ds';"]

export default {
  example,
  imports,
  id: 'profile',
  metadata: { nestable: true },
}
