// url=<PRIMEONE>?node-id=373-13715
// source=https://github.com/primefaces/primeng/blob/master/packages/primeng/src/terminal/terminal.ts
// component=Terminal
import figma from 'figma'

const example = figma.code`<p-terminal welcomeMessage="Bienvenido a PrimeOne" prompt="$" />`
const imports = ["import { Terminal, TerminalService } from 'primeng/terminal';"]

export default {
  example,
  imports,
  id: 'terminal',
  metadata: { nestable: true },
}
