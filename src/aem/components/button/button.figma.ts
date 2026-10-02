// url=<AEM>?node-id=8512-12742
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/button/button.css
// component=aem-button
import figma from 'figma'
import { attr, flag, is } from '../../../figma/helpers'
import { aemSwapIcon, cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const label = instance.getString('Text')
const severity = instance.getEnum('Severity', { Primary: undefined, Secondary: 'aem-button--secondary', Ghost: 'aem-button--ghost', Outlined: 'aem-button--outlined' })
const size = instance.getEnum('Size', { LG: 'aem-button--lg', MD: undefined, SM: 'aem-button--sm' })
const iconOnly = is(instance, 'Icon-Only')
const classes = cls('aem-button', severity, size, iconOnly && 'aem-button--icon-only', is(instance, 'Danger') && 'aem-button--danger', is(instance, 'On-Inverse') && 'aem-button--inverse')
const disabled = flag('disabled', is(instance, 'Disabled'))

let example
if (iconOnly) {
  example = figma.code`<button class="${classes}" type="button"${attr('aria-label', label)}${disabled}>
  ${aemSwapIcon(instance, 'Select Icon', 'aem-button__icon')}
</button>`
} else {
  const prefix = instance.getBoolean('Show Prefix-Icon') ? `\n  ${aemSwapIcon(instance, 'Select Prefix-Icon', 'aem-button__icon')}` : ''
  const suffix = instance.getBoolean('Show Suffix-Icon') ? `\n  ${aemSwapIcon(instance, 'Select Suffix-Icon', 'aem-button__icon')}` : ''
  example = figma.code`<button class="${classes}" type="button"${disabled}>${prefix}
  <span class="aem-button__label">${label}</span>${suffix}
</button>`
}

export default { example, id: 'aem-button', metadata: { nestable: true } }
