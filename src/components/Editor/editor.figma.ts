// url=<PRIMEONE>?node-id=276-10374
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/editor/editor.ts
// component=Editor
import figma from 'figma'
import { FORMS } from '../../figma/templates/field'

const example = figma.code`<p-editor [(ngModel)]="text" [style]="{ height: '320px' }" />`
const imports = ["import { Editor } from 'primeng/editor';", FORMS]

export default {
  example,
  imports,
  id: 'editor',
  metadata: { nestable: true },
}
