import type { TabsDesignTokens } from '@primeuix/themes/types/tabs';

/**
 * Size S for p-tabs, applied per instance with `[dt]="tabsSm"`.
 * Values resolve the Figma variables Custom > Component/Common/tabs/sm/*
 * (aliases of navigation/item/padding/y, list/gap and content/item/padding).
 * The tab font size (Label-S, 0.75rem) has no token in PrimeNG 21: set it on `p-tablist`, which the tabs inherit.
 */
export const tabsSm: TabsDesignTokens = {
  tab: {
    padding: '6px 12px',
    gap: '4px',
  },
  tabpanel: {
    padding: '12px',
  },
};
