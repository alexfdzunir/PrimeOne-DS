// url=<PRIMEONE>?node-id=232-9351
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/accordion/accordion.ts
// component=Accordion
import figma from 'figma'
import { flag, is, isInstance, part, prop } from '../../figma/helpers'

const instance = figma.selectedInstance
const panels = instance
  .findLayers((node) => node.name === '_accordion-panel')
  .filter(isInstance)
  .filter((_, i) => i < 2 || prop(instance, `Item ${i + 1}`) === true)
const open = panels.findIndex((panel) => is(panel, 'Toggle Status', 'Expanded'))
const body = panels
  .map((panel, i) => {
    const header = part(panel, '_accordion-header')
    const title = header ? header.getString('Header') : `Header ${i + 1}`
    return `  <p-accordion-panel value="${i}"${flag('disabled', is(header, 'Disabled'))}>
    <p-accordion-header>${title}</p-accordion-header>
    <p-accordion-content>
      <p>Contenido</p>
    </p-accordion-content>
  </p-accordion-panel>`
  })
  .join('\n')

const example = figma.code`<p-accordion${open >= 0 ? ` value="${open}"` : ''}>
${body}
</p-accordion>`
const imports = ["import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'primeng/accordion';"]

export default {
  example,
  imports,
  id: 'accordion',
  metadata: { nestable: true },
}
