// url=<PRIMEONE>?node-id=340-12980
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/inplace/inplace.ts
// component=Inplace
import figma from 'figma'
import { part } from '../../figma/helpers'

const instance = figma.selectedInstance
const content = part(instance, 'inplace-content')

const example = figma.code`<p-inplace>
  <ng-template #display>${instance.getString('Text')}</ng-template>
  <ng-template #content>
    <p>${content ? content.getString('Text') : 'Contenido'}</p>
  </ng-template>
</p-inplace>`
const imports = ["import { Inplace } from 'primeng/inplace';"]

export default {
  example,
  imports,
  id: 'inplace',
  metadata: { nestable: true },
}
