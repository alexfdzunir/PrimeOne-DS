import type { InstanceHandle, SelectorOptions } from 'figma'

// Figma "Phosphor Icons PRO" weight variant -> @phosphor-icons/web base class
const WEIGHT_CLASS: Record<string, string> = {
  Regular: 'ph',
  Thin: 'ph-thin',
  Light: 'ph-light',
  Bold: 'ph-bold',
  Fill: 'ph-fill',
  Duotone: 'ph-duotone',
}

export function isInstance(handle: unknown): handle is InstanceHandle {
  return !!handle && (handle as { type?: string }).type === 'INSTANCE'
}

// Phosphor class for an icon instance: layer "HouseLine" + Weight=Bold -> "ph-bold ph-house-line"
export function phIcon(handle: unknown): string | undefined {
  if (!isInstance(handle)) return undefined
  const base = handle.name.split('/')[0].trim()
  const kebab = base
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
  const weight = handle.properties?.['Weight']?.value
  const cls = (typeof weight === 'string' && WEIGHT_CLASS[weight]) || 'ph'
  return `${cls} ph-${kebab}`
}

export function swapIcon(instance: InstanceHandle, prop: string): string | undefined {
  return phIcon(instance.getInstanceSwap(prop))
}

export function part(instance: InstanceHandle, layer: string, opts?: SelectorOptions): InstanceHandle | undefined {
  const handle = instance.findInstance(layer, opts)
  return isInstance(handle) ? handle : undefined
}

export function text(instance: InstanceHandle, layer: string, opts?: SelectorOptions): string | undefined {
  const handle = instance.findText(layer, opts)
  return handle && handle.type === 'TEXT' ? handle.textContent : undefined
}

// Variant/boolean property read without throwing when the property is absent
export function prop(instance: InstanceHandle | undefined, name: string): string | boolean | undefined {
  if (!instance) return undefined
  const value = instance.getPropertyValue(name)
  return typeof value === 'string' || typeof value === 'boolean' ? value : undefined
}

export function is(instance: InstanceHandle | undefined, name: string, expected: string | boolean = 'True'): boolean {
  return prop(instance, name) === expected
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

// ` name="value"` or '' when the value is empty
export function attr(name: string, value: string | number | undefined | null | false): string {
  return value === undefined || value === null || value === false || value === '' ? '' : ` ${name}="${escapeAttr(String(value))}"`
}

// Bare boolean attribute for inputs with booleanAttribute transform
export function flag(name: string, on: boolean | undefined): string {
  return on ? ` ${name}` : ''
}

// Property binding ` [name]="expr"` or ''
export function bind(name: string, expr: string | undefined | false): string {
  return expr ? ` [${name}]="${expr}"` : ''
}

// Text for a single-quoted JS string inside a double-quoted template attribute
export function jsText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;')
}

// First text layer of an instance (text layer names follow their content, so they are not stable selectors)
export function firstText(instance: InstanceHandle): string | undefined {
  const node = instance.findLayers((layer) => layer.type === 'TEXT')[0]
  return node && node.type === 'TEXT' ? node.textContent : undefined
}
