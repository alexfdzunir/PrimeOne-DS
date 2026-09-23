// url=<PRIMEONE>?node-id=6978-73977
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/stepper/stepper.ts
// component=Stepper
import figma from 'figma'
import { is, isInstance, prop } from '../../figma/helpers'

const instance = figma.selectedInstance
const vertical = is(instance, 'Orientation', 'Vertical')
const titles = instance.findLayers((node) => node.name === 'stepper-step-title').filter(isInstance)
const steps = titles.filter((_, i) => i < 1 || prop(instance, `Item ${i + 1}`) !== false)
const activeIndex = Math.max(0, steps.findIndex((step) => is(step, 'Active')))
const panels = instance.getBoolean('Show Step Panels')
const title = (i: number) => steps[i].getString('Title')

const horizontal = `<p-stepper [value]="${activeIndex + 1}">
  <p-step-list>
${steps.map((_, i) => `    <p-step [value]="${i + 1}">${title(i)}</p-step>`).join('\n')}
  </p-step-list>${panels ? `
  <p-step-panels>
${steps.map((_, i) => `    <p-step-panel [value]="${i + 1}">\n      <ng-template #content let-activateCallback="activateCallback">\n        <p>Contenido ${i + 1}</p>\n      </ng-template>\n    </p-step-panel>`).join('\n')}
  </p-step-panels>` : ''}
</p-stepper>`
const verticalCode = `<p-stepper [value]="${activeIndex + 1}">
${steps.map((_, i) => `  <p-step-item [value]="${i + 1}">\n    <p-step>${title(i)}</p-step>${panels ? `\n    <p-step-panel>\n      <ng-template #content let-activateCallback="activateCallback">\n        <p>Contenido ${i + 1}</p>\n      </ng-template>\n    </p-step-panel>` : ''}\n  </p-step-item>`).join('\n')}
</p-stepper>`

const example = figma.code`${vertical ? verticalCode : horizontal}`
const imports = [vertical
  ? "import { Stepper, StepItem, Step, StepPanel } from 'primeng/stepper';"
  : "import { Stepper, StepList, Step, StepPanels, StepPanel } from 'primeng/stepper';"]

export default {
  example,
  imports,
  id: 'stepper',
  metadata: { nestable: true },
}
