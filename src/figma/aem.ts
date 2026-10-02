import type { InstanceHandle } from 'figma'
import { phIcon } from './helpers'

// Shared bits of the AEM Portales templates (HTML + BEM, no framework)

// class="..." from the parts that are set
export function cls(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}

// Phosphor <i> for an icon instance (INSTANCE_SWAP or child layer), or '' when there is none
export function aemIcon(handle: unknown, className: string, fallback?: string): string {
  const icon = phIcon(handle) ?? (fallback ? `ph ph-${fallback}` : undefined)
  return icon ? `<i class="${cls(icon, className)}" aria-hidden="true"></i>` : ''
}

// Phosphor <i> for an INSTANCE_SWAP property
export function aemSwapIcon(instance: InstanceHandle, prop: string, className: string, fallback?: string): string {
  return aemIcon(instance.getInstanceSwap(prop), className, fallback)
}

// Own text layers of an instance in layer order (their names follow the content, so they are read by position)
export function texts(instance: InstanceHandle): string[] {
  return instance.findLayers((layer) => layer.type === 'TEXT').map((layer) => (layer.type === 'TEXT' ? layer.textContent : ''))
}

// Snippet of a swapped or child instance, through its own Code Connect template
export function nested(handle: unknown) {
  return handle && (handle as { type?: string }).type === 'INSTANCE' ? (handle as InstanceHandle).executeTemplate().example : undefined
}

// HTML of an AEM module story for the given args (the same markup the explorer shows)
export function storyHtml(meta: { args?: Record<string, unknown>; render?: unknown }, args: Record<string, unknown> = {}): string {
  const render = meta.render as (values: Record<string, unknown>) => { template: string }
  return render({ ...meta.args, ...args }).template
}
