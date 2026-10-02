// url=<AEM>?node-id=16960-12445
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/slider/slider.css
// component=aem-slider
import figma from 'figma'
import { flag, is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const disabled = is(instance, 'Disabled')

export default {
  example: figma.code`<div class="${cls('aem-slider', disabled && 'aem-slider--disabled')}" style="--aem-slider-pct: 50%">
  <label class="aem-slider__label" for="aem-slider">Presupuesto mensual</label>
  <div class="aem-slider__scale" aria-hidden="true">
    <span>0</span>
    <span class="aem-slider__bubble">500</span>
    <span>1000</span>
  </div>
  <input class="aem-slider__input" id="aem-slider" type="range" min="0" max="1000" step="50" value="500"${flag('disabled', disabled)} />
</div>`,
  id: 'aem-slider',
  metadata: { nestable: true },
}
