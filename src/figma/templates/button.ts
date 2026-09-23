import figma from 'figma'
import type { InstanceHandle } from 'figma'
import { attr, flag, is, swapIcon } from '../helpers'
import { P } from '../props'

// Shared template for the six Figma button sets (size is fixed per set)
export function buttonTemplate(instance: InstanceHandle, size?: 'small' | 'large') {
  const label = instance.getString('Text')
  const severity = instance.getEnum('Severity', {
    Primary: undefined,
    Secondary: 'secondary',
    Contrast: 'contrast',
    Plain: undefined,
    Success: 'success',
    Danger: 'danger',
  })
  const plain = is(instance, 'Severity', 'Plain')
  const variant = is(instance, 'Link') ? 'link' : is(instance, P.ghost) ? 'text' : is(instance, P.outlined) ? 'outlined' : undefined
  const disabled = is(instance, 'Disabled')
  const iconOnly = is(instance, 'Icon Only')
  const left = instance.getBoolean('Show Left Icon') ? swapIcon(instance, 'Left Icon') : undefined
  const right = instance.getBoolean('Show Right Icon') ? swapIcon(instance, 'Right Icon') : undefined
  const state = `${flag('plain', plain)}${attr('size', size)}${flag('disabled', disabled)}`
  // In PrimeNG 21 `variant` only accepts outlined | text and link is a boolean input of p-button
  const common = `${attr('severity', severity)}${attr('variant', variant === 'link' ? undefined : variant)}${flag('link', variant === 'link')}${state}`
  // pButton has no `variant` or `link` input: text/outlined are booleans
  const directive = `${attr('severity', severity)}${flag('text', variant === 'text')}${flag('outlined', variant === 'outlined')}${state}`

  if (iconOnly) {
    return {
      example: figma.code`<p-button${attr('icon', swapIcon(instance, 'Icon'))}${common}${attr('ariaLabel', label)} />`,
      imports: ["import { Button } from 'primeng/button';"],
    }
  }
  if (left && right && variant !== 'link') {
    return {
      example: figma.code`<button pButton type="button"${directive}>
  <i pButtonIcon class="${left}"></i>
  <span pButtonLabel>${label}</span>
  <i pButtonIcon class="${right}"></i>
</button>`,
      imports: ["import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';"],
    }
  }
  const icon = left ?? right
  return {
    example: figma.code`<p-button${attr('label', label)}${attr('icon', icon)}${attr('iconPos', !left && right ? 'right' : undefined)}${common} />`,
    imports: ["import { Button } from 'primeng/button';"],
  }
}
