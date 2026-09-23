import figma from 'figma'
import type { InstanceHandle } from 'figma'
import { isInstance, part, prop, text } from '../helpers'
import { P } from '../props'

// `true` unless the card defines the boolean and it is off
function on(instance: InstanceHandle, ...names: string[]): boolean {
  return names.every((name) => prop(instance, name) !== false)
}

// Shared by the DS card family: blocks come from the nested `card-content` parts
export function cardTemplate(instance: InstanceHandle, options: { expandable?: boolean; image?: boolean } = {}) {
  const blocks = instance.findLayers((node) => node.name === 'card-content').filter(isInstance)
  const blockText = (type: string) => {
    const block = blocks.find((b) => b.getPropertyValue('type') === type)
    return block ? text(block, type === 'title' || type === 'metric' ? 'Title' : 'Description Text') : undefined
  }
  const title = on(instance, P.nestedTitle) ? blockText('title') : undefined
  const subtitle = on(instance, 'Subtitle', P.nestedSubtitle) ? blockText('subtitle') : undefined
  const body = on(instance, 'Content', P.nestedShowText) ? blockText('text') : undefined
  const bullet = on(instance, 'Content', P.nestedShowBullets) ? blockText('bullet') : undefined
  const metric = on(instance, 'Content', P.nestedShowNumber) ? blockText('metric') : undefined
  const tag = on(instance, 'Tag', P.nestedTag) ? part(instance, 'tag') : undefined
  const image = options.image && on(instance, 'Show Image')
  const buttons = on(instance, 'Show Footer', P.deepShowButton)
    ? instance.findLayers((node) => node.name === 'button-large' || node.name === 'button-small').filter(isInstance)
    : []
  const link = on(instance, 'Show Footer', P.nestedShowLink)

  const lines: string[] = []
  if (image) lines.push('  <ng-template #header>\n    <img alt="Imagen" src="assets/card.jpg" />\n  </ng-template>')
  if (title) lines.push(`  <ng-template #title>${title}</ng-template>`)
  if (subtitle) lines.push(`  <ng-template #subtitle>${subtitle}</ng-template>`)
  const content: string[] = []
  if (tag) content.push(`<p-tag value="${tag.getString('Text')}" />`)
  if (metric) content.push(`<strong>${metric}</strong>`)
  if (body) content.push(`<p>${body}</p>`)
  if (bullet) content.push(`<ul>\n  <li>${bullet}</li>\n</ul>`)
  const indented = content.join('\n').split('\n').map((l) => (options.expandable ? '    ' : '  ') + l).join('\n')
  if (content.length) lines.push(options.expandable ? `  @if (expanded) {\n${indented}\n  }` : indented)
  const footer: string[] = buttons.slice(0, 2).map((b) => `    <p-button label="${b.getString('Text')}" />`)
  if (link) footer.push('    <a href="#">Ver más</a>')
  if (options.expandable) footer.push(`    <p-button [icon]="expanded ? 'ph ph-caret-up' : 'ph ph-caret-down'" (click)="expanded = !expanded" text rounded />`)
  if (footer.length) lines.push(`  <ng-template #footer>\n${footer.join('\n')}\n  </ng-template>`)

  const imports = ["import { Card } from 'primeng/card';"]
  if (tag) imports.push("import { Tag } from 'primeng/tag';")
  if (buttons.length || options.expandable) imports.push("import { Button } from 'primeng/button';")
  return { example: figma.code`<p-card>\n${lines.join('\n')}\n</p-card>`, imports }
}
