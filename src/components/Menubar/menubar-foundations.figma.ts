// url=<PRIMEONE>?node-id=14477-21821
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/menubar/menubar.ts
// component=Menubar
import figma from 'figma'

const example = figma.code`<p-menubar [model]="items">
  <ng-template #start>
    <img src="assets/logo-foundations.svg" alt="Foundations" height="32" />
  </ng-template>
  <ng-template #end>
    <p-iconfield>
      <p-inputicon class="ph ph-magnifying-glass" />
      <input pInputText type="search" placeholder="Buscar" />
    </p-iconfield>
  </ng-template>
</p-menubar>`
const imports = ["import { Menubar } from 'primeng/menubar';", "import { IconField } from 'primeng/iconfield';", "import { InputIcon } from 'primeng/inputicon';", "import { InputText } from 'primeng/inputtext';", "import { MenuItem } from 'primeng/api';"]

export default {
  example,
  imports,
  id: 'menubar-foundations',
  metadata: { nestable: true },
}
