import type { TokenRecord } from '../model';

/** Pseudo-elements and interaction states: dropped so a rule for `:hover` or `::before` still counts. */
const PSEUDO = /::[\w-]+(\([^)]*\))?|:(hover|focus-visible|focus-within|focus|active)\b/g;

/**
 * Design tokens the rendered story uses: the `--p-*` variables referenced by every CSS rule that applies to the
 * story or to its overlays, with their value in the active theme and colour scheme. The names follow the Figma
 * variables (`--p-stepper-step-number-active-background` is `stepper/step/number/active/background`).
 */
export function collectTokens(): TokenRecord[] {
  const story = document.querySelector('po-story');
  if (!story) return [];
  // The story and whatever it appended to <body> (dialogs, panels, tooltips)
  const scopes = [story, ...Array.from(document.body.children).filter((el) => !['PO-ROOT', 'SCRIPT', 'STYLE'].includes(el.tagName))];
  const applies = (selectorText: string) =>
    selectorText.split(',').some((part) => {
      const selector = part.replace(PSEUDO, '').trim() || '*';
      try {
        return scopes.some((scope) => scope.matches(selector) || scope.querySelector(selector));
      } catch {
        return false;
      }
    });

  const names = new Set<string>();
  const visit = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule && rule.style.cssText.includes('var(--p-') && applies(rule.selectorText)) {
        for (const match of rule.style.cssText.matchAll(/var\((--p-[\w-]+)/g)) names.add(match[1]);
      }
      const nested = (rule as CSSGroupingRule).cssRules;
      if (nested?.length) visit(nested);
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      visit(sheet.cssRules);
    } catch {
      // Cross-origin sheet (fonts): no rules to read
    }
  }

  const computed = getComputedStyle(document.documentElement);
  return [...names]
    .sort()
    .map((cssVar) => ({ cssVar, name: cssVar.slice(4).replace(/-/g, '/'), value: computed.getPropertyValue(cssVar).trim() }))
    .filter((token) => token.value !== '');
}
