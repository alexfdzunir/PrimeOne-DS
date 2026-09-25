import type { SchemeId, ThemeId, TokenRecord } from '../model';

/*
 * The stage renders the story inside a same-origin iframe of the explorer itself (`./?frame=1`), so media
 * queries, `matchMedia` breakpoints of PrimeNG and container widths see the chosen device width.
 */

/** Explorer -> frame: what to render. */
export interface RenderMessage {
  source: 'po-explorer';
  type: 'render';
  id: string;
  args: Record<string, unknown>;
  theme: ThemeId;
  scheme: SchemeId;
}

/** Frame -> explorer: lifecycle, content height, story events and the design tokens in use. */
export type FrameMessage =
  | { source: 'po-frame'; type: 'ready' }
  | { source: 'po-frame'; type: 'size'; height: number }
  | { source: 'po-frame'; type: 'event'; name: string; payload: string }
  | { source: 'po-frame'; type: 'tokens'; tokens: TokenRecord[] };

export function isFrameMode(): boolean {
  return new URLSearchParams(location.search).has('frame');
}

/** Args without functions, so they survive `postMessage` (structured clone). */
export function cloneableArgs(args: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(args).filter(([, value]) => typeof value !== 'function'));
}
