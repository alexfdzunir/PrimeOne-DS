// url=<PRIMEONE>?node-id=427-22270
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/treetable/treetable.ts
// component=TreeTable
import figma from 'figma'
import { part } from '../../figma/helpers'

const instance = figma.selectedInstance
const caption = instance.getBoolean('Show Header') ? part(instance, 'treetable-header') : undefined
const summary = instance.getBoolean('Show Footer') ? part(instance, 'treetable-footer') : undefined
const footerCells = instance.getBoolean('Show Footer Cells')

const example = figma.code`<p-treetable [value]="files" [columns]="cols">${caption ? `
  <ng-template #caption>${caption.getString('Text')}</ng-template>` : ''}
  <ng-template #header let-columns>
    <tr>
      @for (col of columns; track col.field) {
        <th>{{ col.header }}</th>
      }
    </tr>
  </ng-template>
  <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
    <tr [ttRow]="rowNode">
      @for (col of columns; track col.field; let first = $first) {
        <td>
          @if (first) {
            <p-treetable-toggler [rowNode]="rowNode" />
          }
          {{ rowData[col.field] }}
        </td>
      }
    </tr>
  </ng-template>${footerCells ? `
  <ng-template #footer let-columns>
    <tr>
      @for (col of columns; track col.field) {
        <td>{{ col.footer }}</td>
      }
    </tr>
  </ng-template>` : ''}${summary ? `
  <ng-template #summary>${summary.getString('Text')}</ng-template>` : ''}
</p-treetable>`
const imports = ["import { TreeTableModule } from 'primeng/treetable';", "import { TreeNode } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'treetable',
  metadata: { nestable: true },
}
