// url=<AEM>?node-id=9333-4599
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/data-table/data-table.css
// component=aem-table
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const columns = instance.getEnum('Columns', { '5': 5, '3': 3, '2': 2 }) as number
const heads = ['Asignatura', 'Curso', 'Créditos', 'Modalidad', 'Guía'].slice(0, columns)
const cells = ['1.º', '6 ECTS', 'Online', '<a href="#">Ver guía</a>'].slice(0, columns - 1)
const row = `      <tr><th scope="row">Asignatura</th>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`
const head = instance.getBoolean('Header') ? `\n    <thead>\n      <tr>${heads.map((h) => `<th scope="col">${h}</th>`).join('')}</tr>\n    </thead>` : ''
const foot = instance.getBoolean('Footer') ? `\n    <tfoot>\n      <tr><th scope="row">Total</th><td colspan="${columns - 1}">60 ECTS</td></tr>\n    </tfoot>` : ''

export default {
  example: figma.code`<div class="aem-table-wrap">
  <table class="${cls('aem-table', is(instance, 'Striped', 'Yes') && 'aem-table--striped')}">${head}
    <tbody>
${row}
${row}
    </tbody>${foot}
  </table>
</div>`,
  id: 'aem-data-table',
  metadata: { nestable: true },
}
