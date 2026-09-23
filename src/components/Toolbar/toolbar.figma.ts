// url=<PRIMEONE>?node-id=13779-84262
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/toolbar/toolbar.ts
// component=Toolbar
import figma from 'figma'
import { isInstance, prop, swapIcon } from '../../figma/helpers'
import { P } from '../../figma/props'

const instance = figma.selectedInstance
const buttons = instance.findLayers((node) => node.name === 'button').filter(isInstance)
const leftFlags = [P.nestedIcon1, P.nestedIcon2, P.nestedIcon3, P.nestedIcon4].map((name) => prop(instance, name) === true)
const rightFlags = [P.nestedShowIcon2, P.nestedShowIcon3, P.nestedShowIcon4, P.nestedShowIcon5].map((name) => prop(instance, name) === true)
const iconButton = (index: number) => {
  const button = buttons[index]
  const icon = button ? swapIcon(button, 'Icon') : undefined
  return `    <p-button icon="${icon ?? 'ph ph-placeholder'}" text severity="secondary" />`
}
const start = instance.getBoolean('Left Actions') ? leftFlags.map((on, i) => (on ? iconButton(i) : '')).filter(Boolean).join('\n') : ''
const end = instance.getBoolean('Right Actions') ? rightFlags.map((on, i) => (on ? iconButton(4 + i) : '')).filter(Boolean).join('\n') : ''
const search = instance.getBoolean('Show Search')
  ? `\n  <ng-template #center>
    <p-iconfield>
      <p-inputicon class="ph ph-magnifying-glass" />
      <input pInputText placeholder="Buscar" />
    </p-iconfield>
  </ng-template>`
  : ''

const example = figma.code`<p-toolbar>${start ? `\n  <ng-template #start>\n${start}\n  </ng-template>` : ''}${search}${end ? `\n  <ng-template #end>\n${end}\n  </ng-template>` : ''}
</p-toolbar>`
const imports = ["import { Toolbar } from 'primeng/toolbar';", "import { Button } from 'primeng/button';", ...(search ? ["import { IconField } from 'primeng/iconfield';", "import { InputIcon } from 'primeng/inputicon';", "import { InputText } from 'primeng/inputtext';"] : [])]

export default {
  example,
  imports,
  id: 'toolbar',
  metadata: { nestable: true },
}
