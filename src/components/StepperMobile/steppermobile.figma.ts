// url=<PRIMEONE>?node-id=12717-77340
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/components/StepperMobile/stepper-mobile.ts
// component=PrimeOneStepperMobile
import figma from 'figma'

const instance = figma.selectedInstance
const state = Number(instance.getEnum('State', { '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7' }))

const example = figma.code`<prime-one-stepper-mobile [steps]="steps" [activeStep]="${state - 1}" />`
const imports = ["import { PrimeOneStepperMobile } from 'prime-one-ds';"]

export default {
  example,
  imports,
  id: 'steppermobile',
  metadata: { nestable: true },
}
