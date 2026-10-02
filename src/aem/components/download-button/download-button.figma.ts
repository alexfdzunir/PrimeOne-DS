// url=<AEM>?node-id=8598-15445
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/download-button/download-button.css
// component=aem-download
import figma from 'figma'
import { attr, firstText, is } from '../../../figma/helpers'
import { cls } from '../../../figma/aem'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', { Button: undefined, 'Link-Button': 'aem-download--link' })
const size = instance.getEnum('Size', { LG: undefined, SM: 'aem-download--sm' })
const label = firstText(instance) ?? 'Descargar el plan de estudios'
const meta = instance.getBoolean('Show Subtext') ? '\n    <span class="aem-download__meta">Archivo.PDF</span>' : ''

export default {
  example: figma.code`<a class="${cls('aem-download', type, size)}" href="#" download${attr('aria-disabled', is(instance, 'Disabled') && 'true')}>
  <i class="ph ph-file-arrow-down aem-download__icon" aria-hidden="true"></i>
  <span class="aem-download__text">
    <span class="aem-download__label">${label}</span>${meta}
  </span>
</a>`,
  id: 'aem-download-button',
  metadata: { nestable: true },
}
