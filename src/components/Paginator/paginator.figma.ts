// url=<PRIMEONE>?node-id=599-33074
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/paginator/paginator.ts
// component=Paginator
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const report = is(instance, 'Current Page Report')
  ? ' showCurrentPageReport currentPageReportTemplate="{first} - {last} de {totalRecords}"'
  : ''

const example = figma.code`<p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="10" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]"${report} />`
const imports = ["import { Paginator } from 'primeng/paginator';", "import { PaginatorState } from 'primeng/types/paginator';"]

export default {
  example,
  imports,
  id: 'paginator',
  metadata: { nestable: true },
}
