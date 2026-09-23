import figma from 'figma'
import type { InstanceHandle } from 'figma'
import { attr, flag, part, prop } from '../helpers'
import { FORMS, fieldImports, readField, sizeOf, stateAttrs, textProp, wrapField } from './field'

// Shared by select, select-language and select-location (same anatomy, different data)
export function selectTemplate(instance: InstanceHandle, id: string, optionsVar: string, modelVar: string) {
  const input = part(instance, '_select-input')
  const f = readField(input, id)
  f.size = sizeOf(prop(instance, 'Size')) ?? f.size
  const content = input ? part(input, '_select-input-content') : undefined
  const placeholder = f.float || f.ifta ? undefined : textProp(content, 'Placeholder')
  const control = `<p-select inputId="${f.id}" [options]="${optionsVar}" optionLabel="name" [(ngModel)]="${modelVar}"${attr('placeholder', placeholder)}${flag('filter', prop(instance, 'Show Filter') === true)}${flag('showClear', f.showClear)}${stateAttrs(f)} />`
  return {
    example: figma.code`${wrapField(f, control)}`,
    imports: fieldImports(f, ["import { Select } from 'primeng/select';", FORMS]),
  }
}
