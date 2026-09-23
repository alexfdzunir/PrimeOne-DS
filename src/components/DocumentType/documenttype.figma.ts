// url=<PRIMEONE>?node-id=12160-28633
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/DocumentType/document-type.ts
// component=PrimeOneDocumentType
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance

const example = figma.code`<prime-one-documenttype [(ngModel)]="documentType"${is(instance, 'Float Label') ? ' [floatLabel]="true"' : ''}${is(instance, 'Size', 'Small') ? ' size="small"' : ''} />`
const imports = ["import { PrimeOneDocumentType } from 'prime-one-ds';", "import { FormsModule } from '@angular/forms';"]

export default {
  example,
  imports,
  id: 'documenttype',
  metadata: { nestable: true },
}
