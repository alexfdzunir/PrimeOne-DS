// url=<AEM>?node-id=9448-32740
// source=https://github.com/alexfdzunir/UNIR-Design-Systems/blob/main/src/aem/components/card/card.css
// component=aem-card
import figma from 'figma'
import { is } from '../../../figma/helpers'
import { cls, nested, texts } from '../../../figma/aem'

const instance = figma.selectedInstance
const fill = instance.getEnum('Surface Fill', { Primary: undefined, Secondary: 'aem-card--secondary', Empty: 'aem-card--empty', 'Image-Background': 'aem-card--image' })
const size = instance.getEnum('Size', { MD: undefined, LG: 'aem-card--lg' })
const copy = texts(instance)
let n = 0
const pretitle = instance.getBoolean('Show Pretitle') ? copy[n++] : undefined
const title = instance.getBoolean('Show Title') ? copy[n++] : undefined
const body = instance.getBoolean('Show Body') ? copy[n++] : undefined
const header = instance.getBoolean('Show Header') ? nested(instance.getInstanceSwap('Select Header')) : undefined
const footer = instance.getBoolean('Show Footer') ? nested(instance.getInstanceSwap('Select Footer')) : undefined
const play = instance.getBoolean('Show Play-Button') ? '\n    <button class="aem-media-button aem-card__play" type="button" aria-label="Reproducir vídeo"><i class="ph-fill ph-play" aria-hidden="true"></i></button>' : ''
const image = is(instance, 'Image') || fill === 'aem-card--image'
const media = image ? figma.code`  <div class="aem-card__media">
    <img src="imagen.webp" alt="" loading="lazy" />${header ? figma.code`\n    ${header}` : ''}${play}
  </div>
` : ''
const arrow = instance.getBoolean('Show Icon-Button') ? '\n      <span class="aem-card__arrow" aria-hidden="true"><i class="ph ph-arrow-right" aria-hidden="true"></i></span>' : ''
const foot = footer || arrow ? figma.code`
    <div class="aem-card__footer">${footer ? figma.code`\n      ${footer}` : ''}${arrow}
    </div>` : ''

export default {
  example: figma.code`<article class="${cls('aem-card', size, fill)}">
${media}  <div class="aem-card__body">
    <div class="aem-card__text">${pretitle ? `\n      <p class="aem-card__pretitle">${pretitle}</p>` : ''}${title ? `\n      <h3 class="aem-card__title"><a class="aem-card__link" href="#">${title}</a></h3>` : ''}${body ? `\n      <p class="aem-card__description">${body}</p>` : ''}
    </div>${foot}
  </div>
</article>`,
  id: 'aem-card',
  metadata: { nestable: true },
}
