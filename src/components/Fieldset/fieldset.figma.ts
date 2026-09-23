// url=<PRIMEONE>?node-id=306-11917
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/fieldset/fieldset.ts
// component=Fieldset
import figma from 'figma'
import { is, part } from '../../figma/helpers'

const instance = figma.selectedInstance
const legend = part(instance, '_fieldset-legend')
const toggleable = is(instance, 'Toggleable')
const slot = instance.getBoolean('Show Slot') ? instance.getSlot('Slot') : undefined
const text = instance.getBoolean('Show Text') ? '\n  <p>Contenido</p>' : ''

const example = figma.code`<p-fieldset legend="${legend ? legend.getString('Header') : 'Legend'}"${toggleable ? ' [toggleable]="true"' : ''}${toggleable && is(instance, 'Collapsed') ? ' [collapsed]="true"' : ''}>${text}${slot ? figma.code`\n  ${slot}` : ''}
</p-fieldset>`
const imports = ["import { Fieldset } from 'primeng/fieldset';"]

export default {
  example,
  imports,
  id: 'fieldset',
  metadata: { nestable: true },
}
