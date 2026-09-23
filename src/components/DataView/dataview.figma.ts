// url=<PRIMEONE>?node-id=399-20261
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/dataview/dataview.ts
// component=DataView
import figma from 'figma'
const example = figma.code`<p-dataview [value]="products" [layout]="layout" [paginator]="true" [rows]="6">
  <ng-template #header>
    <p-selectbutton [(ngModel)]="layout" [options]="['list', 'grid']" [allowEmpty]="false" />
  </ng-template>
  <ng-template #list let-items>
    @for (item of items; track item.id) {
      <div>{{ item.name }} · {{ item.price }}</div>
    }
  </ng-template>
  <ng-template #grid let-items>
    @for (item of items; track item.id) {
      <div>{{ item.name }} · {{ item.price }}</div>
    }
  </ng-template>
</p-dataview>`
const imports = ["import { DataView } from 'primeng/dataview';", "import { SelectButton } from 'primeng/selectbutton';", "import { FormsModule } from '@angular/forms';"]

export default {
  example,
  imports,
  id: 'dataview',
  metadata: { nestable: true },
}
