// url=<PRIMEONE>?node-id=505-29350
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/fileupload/fileupload.ts
// component=FileUpload
import figma from 'figma'
import { is } from '../../figma/helpers'

const instance = figma.selectedInstance
const basic = is(instance, 'Type', 'Basic')

const example = basic
  ? figma.code`<p-fileupload mode="basic" name="file" url="/api/upload" accept="image/*" [maxFileSize]="1000000" chooseLabel="Seleccionar" />`
  : figma.code`<p-fileupload name="files[]" url="/api/upload" multiple accept="image/*" [maxFileSize]="1000000" />`
const imports = ["import { FileUpload } from 'primeng/fileupload';"]

export default {
  example,
  imports,
  id: 'fileupload-popup',
  metadata: { nestable: true },
}
