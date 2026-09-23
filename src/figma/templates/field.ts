import type { InstanceHandle } from 'figma'
import { attr, flag, is, prop, swapIcon } from '../helpers'
import { P } from '../props'

export type FloatVariant = 'default' | 'on' | 'in' | 'over'

export interface Field {
  id: string
  label?: string
  float?: FloatVariant
  floatText?: string
  ifta: boolean
  helper?: string
  invalid: boolean
  disabled: boolean
  filled: boolean
  size?: 'small' | 'large'
  showClear: boolean
  leftIcon?: string
  rightIcon?: string
}

const SIZE: Record<string, 'small' | 'large' | undefined> = { Small: 'small', sm: 'small', SM: 'small', Large: 'large', lg: 'large' }

export function sizeOf(value: unknown): 'small' | 'large' | undefined {
  return typeof value === 'string' ? SIZE[value] : undefined
}

export function textProp(instance: InstanceHandle | undefined, name: string): string | undefined {
  const value = prop(instance, name)
  return typeof value === 'string' ? value : undefined
}

export function slug(value: string | undefined, fallback: string): string {
  const s = (value ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s && s !== 'label' && s !== 'placeholder' ? s : fallback
}

// DS field pattern: label, float/ifta label, helper, state flags, size and icons
export function readField(input: InstanceHandle | undefined, fallbackId: string): Field {
  const label = prop(input, P.fieldShowLabel) === true ? textProp(input, P.subLabelText) : undefined
  const variant = textProp(input, P.subFloatLabelVariant)
  const float: FloatVariant | undefined = is(input, P.floatLabel)
    ? variant === 'On' ? 'on' : variant === 'In' ? 'in' : variant === 'Over' ? 'over' : 'default'
    : undefined
  const floatText = textProp(input, P.subFloatLabel)
  return {
    id: slug(label ?? floatText, fallbackId),
    label,
    float,
    floatText,
    ifta: is(input, P.iftaLabel),
    helper: prop(input, P.showHelper) === true ? textProp(input, P.subHelperText) : undefined,
    invalid: is(input, P.invalid),
    disabled: is(input, P.disabled),
    filled: is(input, P.filled),
    size: sizeOf(prop(input, P.size)),
    showClear: prop(input, P.showClearIcon) === true,
    leftIcon: input && prop(input, P.showLeftIcon) === true ? swapIcon(input, P.subLeftIcon) : undefined,
    rightIcon: input && prop(input, P.showRightIcon) === true ? swapIcon(input, P.subRightIcon) : undefined,
  }
}

// Shared state attributes for PrimeNG form components
export function stateAttrs(f: Field, sizeAttr = 'size'): string {
  return `${attr(sizeAttr, f.size)}${attr('variant', f.filled ? 'filled' : undefined)}${flag('invalid', f.invalid)}${flag('disabled', f.disabled)}`
}

export function describedBy(f: Field): string {
  return attr('aria-describedby', f.helper ? `${f.id}-help` : undefined)
}

function indent(code: string, spaces = 2): string {
  const pad = ' '.repeat(spaces)
  return code.split('\n').map((line) => (line ? pad + line : line)).join('\n')
}

// Wraps a native input with p-iconfield when the field shows icons
export function withIcons(f: Field, control: string): string {
  if (!f.leftIcon && !f.rightIcon) return control
  const position = !f.leftIcon && f.rightIcon ? ' iconPosition="right"' : ''
  const left = f.leftIcon ? `\n  <p-inputicon class="${f.leftIcon}" />` : ''
  const right = f.rightIcon ? `\n  <p-inputicon class="${f.rightIcon}" />` : ''
  return `<p-iconfield${position}>${left}\n${indent(control)}${right}\n</p-iconfield>`
}

// Label placement (top, float or ifta) plus helper text around a control
export function wrapField(f: Field, control: string): string {
  const helper = f.helper ? `\n<small id="${f.id}-help">${f.helper}</small>` : ''
  if (f.float) {
    const variant = f.float === 'default' ? '' : ` variant="${f.float}"`
    return `<p-floatlabel${variant}>\n${indent(control)}\n  <label for="${f.id}">${f.floatText ?? ''}</label>\n</p-floatlabel>${helper}`
  }
  if (f.ifta) {
    return `<p-iftalabel>\n${indent(control)}\n  <label for="${f.id}">${f.floatText ?? f.label ?? ''}</label>\n</p-iftalabel>${helper}`
  }
  const top = f.label ? `<label for="${f.id}">${f.label}</label>\n` : ''
  return `${top}${control}${helper}`
}

export function fieldImports(f: Field, extra: string[] = []): string[] {
  const out = [...extra]
  if (f.float) out.push("import { FloatLabel } from 'primeng/floatlabel';")
  else if (f.ifta) out.push("import { IftaLabel } from 'primeng/iftalabel';")
  if (f.leftIcon || f.rightIcon) out.push("import { IconField } from 'primeng/iconfield';", "import { InputIcon } from 'primeng/inputicon';")
  return out
}

export const FORMS = "import { FormsModule } from '@angular/forms';"
