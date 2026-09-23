import type { InstanceHandle } from 'figma'
import { attr, part, swapIcon } from '../helpers'

// DS avatar sizes: XS 24, S 32, M 48, L 64, XL 100 px. PrimeNG: normal 32, large 48, xlarge 64.
const SIZE: Record<string, string> = {
  XS: ` [style]="{ width: '24px', height: '24px' }"`,
  S: '',
  M: ' size="large"',
  L: ' size="xlarge"',
  XL: ` size="xlarge" [style]="{ width: '100px', height: '100px' }"`,
}

export function avatarCode(instance: InstanceHandle): string {
  const size = SIZE[String(instance.getPropertyValue('Size'))] ?? ''
  const type = instance.getEnum('Type', {
    Capitals: 'label',
    'Photo Unit': 'image',
    'Photo Duo': 'image',
    'Icon Light': 'icon',
    'Icon Dark': 'icon',
  })
  const content =
    type === 'image' ? ' image="assets/avatar.png"' : type === 'icon' ? attr('icon', swapIcon(instance, 'Icon')) : ' label="AB"'
  const avatar = `<p-avatar${content}${size} shape="circle" />`
  const badge = instance.getBoolean('Show Badge') ? part(instance, 'overlaybadge') : undefined
  return badge ? `<p-overlay-badge value="${badge.getString('Text')}">\n  ${avatar}\n</p-overlay-badge>` : avatar
}
