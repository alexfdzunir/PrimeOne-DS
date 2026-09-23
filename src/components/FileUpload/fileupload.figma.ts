// url=<PRIMEONE>?node-id=12371-104640
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/fileupload/fileupload.ts
// component=FileUpload
import figma from 'figma'

const example = figma.code`<p-fileupload name="files[]" url="/api/upload" multiple [maxFileSize]="10000000" chooseLabel="Subir archivos" />`
const imports = ["import { FileUpload } from 'primeng/fileupload';"]

export default {
  example,
  imports,
  id: 'fileupload',
  metadata: { nestable: true },
}
