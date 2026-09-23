// url=<PRIMEONE>?node-id=12095-8334
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/InputLink/input-link.ts
// component=PrimeOneInputLink
import figma from 'figma'
import { attr, is, part } from '../../figma/helpers'
import { P } from '../../figma/props'

const instance = figma.selectedInstance
const field = part(instance, 'inputtext')
const label = is(instance, 'Out Label', 'On') && field ? field.getString(P.subLabelText) : undefined

const example = figma.code`<prime-one-inputlink [(ngModel)]="url"${attr('label', label)} />`
const imports = ["import { PrimeOneInputLink } from 'prime-one-ds';", "import { FormsModule } from '@angular/forms';"]

export default {
  example,
  imports,
  id: 'inputlink',
  metadata: { nestable: true },
}
