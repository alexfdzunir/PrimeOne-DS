// url=<PRIMEONE>?node-id=17343-53189
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/Agenda/agenda.ts
// component=PrimeOneAgenda
import figma from 'figma'

const instance = figma.selectedInstance
const view = instance.getEnum('Filtro', { 'Día': 'day', 'Tres días': 'three-days', Semana: 'week', 'Semana académica': 'academic-week', mes: 'month', Agenda: 'agenda' })

const example = figma.code`<prime-one-agenda [events]="events"${view === 'week' ? ' [(view)]="view"' : ` view="${view}"`} [(date)]="date" (eventClick)="openEvent($event)" />`
const imports = ["import { PrimeOneAgenda } from 'prime-one-ds';"]

export default {
  example,
  imports,
  id: 'agenda',
  metadata: { nestable: true },
}
