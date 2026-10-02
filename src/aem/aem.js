/**
 * AEM Portales behaviours, without dependencies. `initAem()` wires every component in `root` (the document by
 * default); it can run again after adding markup, since each component only initialises once.
 *
 *   import { initAem } from 'prime-one-ds/aem/aem.js';
 *   initAem();
 */
import { initAccordion } from './components/accordion/accordion.js';
import { initCarousel } from './components/card-block/carousel.js';
import { initAnchorMenu } from './components/anchor-menu/anchor-menu.js';
import { initCheckbox } from './components/checkbox/checkbox.js';
import { initChip } from './components/chip/chip.js';
import { initDatePicker } from './components/date-picker/date-picker.js';
import { initDropdown } from './components/dropdown/dropdown.js';
import { initFooter } from './components/footer/footer.js';
import { initModal } from './components/modal/modal.js';
import { initNavigationHeader } from './components/navigation-header/navigation-header.js';
import { initPagination } from './components/pagination/pagination.js';
import { initSearch } from './components/search/search.js';
import { initShareBanner } from './components/share-banner/share-banner.js';
import { initSlider } from './components/slider/slider.js';
import { initTabs } from './components/tabs/tabs.js';
import { initTextArea } from './components/text-area/text-area.js';

export {
  initAccordion,
  initAnchorMenu,
  initCarousel,
  initCheckbox,
  initChip,
  initDatePicker,
  initDropdown,
  initFooter,
  initModal,
  initNavigationHeader,
  initPagination,
  initSearch,
  initShareBanner,
  initSlider,
  initTabs,
  initTextArea,
};

export function initAem(root = document) {
  initAccordion(root);
  initAnchorMenu(root);
  initCarousel(root);
  initCheckbox(root);
  initChip(root);
  initDatePicker(root);
  initDropdown(root);
  initFooter(root);
  initModal(root);
  initNavigationHeader(root);
  initPagination(root);
  initSearch(root);
  initShareBanner(root);
  initSlider(root);
  initTabs(root);
  initTextArea(root);
}
