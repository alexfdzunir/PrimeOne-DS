// url=<AEM>?node-id=7448-19133
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/ticker/ticker.css
// component=aem-ticker
import figma from 'figma'

export default {
  example: figma.code`<div class="aem-ticker">
  <ul class="aem-tag-set">
    <li><span class="aem-state-tag aem-state-tag--online">Online</span></li>
    <li><span class="aem-tag aem-tag--plain"><i class="ph ph-calendar-blank aem-tag__icon" aria-hidden="true"></i><span class="aem-tag__text">Inicio: octubre 2026</span></span></li>
    <li><span class="aem-tag aem-tag--plain"><i class="ph ph-certificate aem-tag__icon" aria-hidden="true"></i><span class="aem-tag__text">60 ECTS</span></span></li>
  </ul>
</div>`,
  id: 'aem-ticker',
  metadata: { nestable: false },
}
