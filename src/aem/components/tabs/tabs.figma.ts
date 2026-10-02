// url=<AEM>?node-id=9111-9533
// source=https://github.com/alexfdzunir/PrimeOne-DS/blob/main/src/aem/components/tabs/tabs.css
// component=aem-tabs
import figma from 'figma'

export default {
  example: figma.code`<div class="aem-tabs aem-tabs--bar">
  <div class="aem-tabs__list" role="tablist" aria-label="Secciones">
    <button class="aem-tabs__tab" type="button" role="tab" id="aem-tabs-t0" aria-selected="true" aria-controls="aem-tabs-p0" tabindex="0">Presentación</button>
    <button class="aem-tabs__tab" type="button" role="tab" id="aem-tabs-t1" aria-selected="false" aria-controls="aem-tabs-p1" tabindex="-1">Plan de estudios</button>
  </div>
  <div class="aem-tabs__panel" role="tabpanel" id="aem-tabs-p0" aria-labelledby="aem-tabs-t0" tabindex="0">Contenido</div>
  <div class="aem-tabs__panel" role="tabpanel" id="aem-tabs-p1" aria-labelledby="aem-tabs-t1" tabindex="0" hidden>Contenido</div>
</div>`,
  id: 'aem-tabs',
  metadata: { nestable: false },
}
