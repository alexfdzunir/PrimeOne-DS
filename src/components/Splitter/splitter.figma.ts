// url=<PRIMEONE>?node-id=313-12050
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/splitter/splitter.ts
// component=Splitter
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const nested = is(instance, 'Layout', 'Nested')
const vertical = is(instance, 'Layout', 'Vertical')

const example = nested
  ? figma.code`<p-splitter [style]="{ height: '300px' }" [panelSizes]="[20, 80]">
  <ng-template #panel>Panel 1</ng-template>
  <ng-template #panel>
    <p-splitter layout="vertical" [panelSizes]="[50, 50]">
      <ng-template #panel>Panel 2</ng-template>
      <ng-template #panel>Panel 3</ng-template>
    </p-splitter>
  </ng-template>
</p-splitter>`
  : figma.code`<p-splitter [style]="{ height: '300px' }"${vertical ? ' layout="vertical"' : ''}>
  <ng-template #panel>Panel 1</ng-template>
  <ng-template #panel>Panel 2</ng-template>
</p-splitter>`
const imports = ["import { Splitter } from 'primeng/splitter';"]

export default {
  example,
  imports,
  id: 'splitter',
  metadata: { nestable: true },
}
