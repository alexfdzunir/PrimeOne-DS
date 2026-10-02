// url=<AEM>?node-id=5178-12733
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/button/button.css
// component=aem-link-button
import figma from 'figma'
import { attr, is } from '../../../figma/helpers'
import { aemSwapIcon, cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const label = instance.getString('Button text')
const severity = instance.getEnum('Severity', { Primary: undefined, Secondary: 'aem-link-button--secondary', Danger: 'aem-link-button--danger' })
const size = instance.getEnum('Size', { MD: undefined, SM: 'aem-link-button--sm' })
const classes = cls('aem-link-button', severity, size, is(instance, 'On-Inverse') && 'aem-link-button--inverse')
const prefix = instance.getBoolean('Prefix-Icon') ? `${aemSwapIcon(instance, 'Select Prefix-Icon', '')} ` : ''
const suffix = instance.getBoolean('Sufix-Icon') ? ` ${aemSwapIcon(instance, 'Select Suffix-Icon', '')}` : ''

export default {
  example: figma.code`<a class="${classes}" href="#"${attr('aria-disabled', is(instance, 'Disabled') && 'true')}>${prefix}${label}${suffix}</a>`,
  id: 'aem-link-button',
  metadata: { nestable: true },
}
