import type { BoxMeasure, MeasureData, MeasureElement } from '../model';

const MAX_ELEMENTS = 80;
const MAX_DEPTH = 6;
const OVERLAY_ID = 'po-measure-overlay';
/** Measure colours: element and sizes (pink, as in Zeroheight), padding and gaps. */
const PINK = '#e5467a';
const BLUE = '#3b82f6';

const px = (value: string) => Math.round((parseFloat(value) || 0) * 100) / 100;
const sized = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0;
};

/** Component root: the first sized element of the story with a DS class (`p-*`, `po-*`) or a `prime-one-*` tag. */
function componentRoot(story: Element): Element | null {
  const all = Array.from(story.querySelectorAll('*')).filter(sized);
  return (
    all.find((el) => el.tagName.startsWith('PRIME-ONE-') || Array.from(el.classList).some((c) => /^(p|po)-[a-z]/.test(c))) ?? all[0] ?? null
  );
}

/** PrimeNG utility classes that do not name the element. */
const UTILITY = new Set(['p-ripple', 'p-component', 'p-disabled', 'p-focus', 'p-hidden-accessible', 'p-element']);

function label(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const classes = Array.from(el.classList).filter((c) => !UTILITY.has(c));
  const cls = classes.find((c) => /^(p|po)-[a-z]/.test(c)) ?? classes[0];
  return cls ? `${tag}.${cls}` : tag;
}

/** Sized elements under the component root (and the overlays it appended to <body>), depth-first. */
export function measurableElements(): Element[] {
  const story = document.querySelector('po-story');
  const root = story && componentRoot(story);
  if (!root) return [];
  const overlays = Array.from(document.body.children).filter((el) => !['PO-ROOT', 'SCRIPT', 'STYLE'].includes(el.tagName) && el.id !== OVERLAY_ID);
  const out: Element[] = [];
  const walk = (el: Element, depth: number) => {
    if (out.length >= MAX_ELEMENTS || depth > MAX_DEPTH) return;
    if (sized(el)) out.push(el);
    for (const child of Array.from(el.children)) walk(child, sized(el) ? depth + 1 : depth);
  };
  walk(root, 0);
  for (const overlay of overlays) walk(overlay, 0);
  return out;
}

function depthOf(el: Element, list: Element[]): number {
  let depth = 0;
  for (let parent = el.parentElement; parent; parent = parent.parentElement) if (list.includes(parent)) depth++;
  return depth;
}

function measureBox(el: Element): BoxMeasure {
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const sides = (prop: string, suffix = '') => ['top', 'right', 'bottom', 'left'].map((side) => px(cs.getPropertyValue(`${prop}-${side}${suffix}`)));
  const padding = sides('padding');
  const border = sides('border', '-width');
  const radius = ['top-left', 'top-right', 'bottom-right', 'bottom-left'].map((corner) => px(cs.getPropertyValue(`border-${corner}-radius`)));
  return {
    label: label(el),
    width: Math.round(r.width * 100) / 100,
    height: Math.round(r.height * 100) / 100,
    content: [
      Math.round((r.width - padding[1] - padding[3] - border[1] - border[3]) * 100) / 100,
      Math.round((r.height - padding[0] - padding[2] - border[0] - border[2]) * 100) / 100,
    ],
    padding,
    border,
    margin: sides('margin'),
    radius,
    boxSizing: cs.boxSizing,
    display: cs.display,
    direction: cs.flexDirection,
    gap: [px(cs.rowGap), px(cs.columnGap)],
    font: { family: cs.fontFamily.split(',')[0].replace(/["']/g, ''), size: px(cs.fontSize), lineHeight: cs.lineHeight, weight: cs.fontWeight },
    children: Array.from(el.children).filter(sized).length,
  };
}

/**
 * Default element: the root, unless it only wraps a same-size child (host elements such as `prime-one-card` or
 * `p-card`), then the first element down that chain with its own box (padding or border).
 */
function defaultIndex(list: Element[]): number {
  let el = list[0];
  while (el) {
    const cs = getComputedStyle(el);
    const boxed = ['padding-top', 'padding-left', 'border-top-width', 'border-left-width'].some((p) => px(cs.getPropertyValue(p)) > 0);
    const kids = Array.from(el.children).filter(sized);
    if (boxed || kids.length !== 1) break;
    const a = el.getBoundingClientRect();
    const b = kids[0].getBoundingClientRect();
    if (Math.abs(a.width - b.width) > 1 || Math.abs(a.height - b.height) > 1) break;
    el = kids[0];
  }
  return Math.max(0, list.indexOf(el));
}

/** List of elements, the measured one (root by default) and its box model; draws the overlay when enabled. */
export function measure(index: number | null, hover: number | null, overlay: boolean): MeasureData {
  const list = measurableElements();
  const selected = index !== null && index < list.length ? index : defaultIndex(list);
  const elements: MeasureElement[] = list.map((el, i) => ({ index: i, label: label(el), depth: depthOf(el, list) }));
  const target = list[selected];
  if (overlay) drawOverlay(target, hover !== null && hover !== selected ? list[hover] : undefined);
  else clearOverlay();
  return { elements, selected, box: target ? measureBox(target) : null };
}

export function clearOverlay(): void {
  document.getElementById(OVERLAY_ID)?.remove();
}

function box(parent: HTMLElement, x: number, y: number, w: number, h: number, style: string): void {
  const el = document.createElement('div');
  el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${Math.max(0, w)}px;height:${Math.max(0, h)}px;${style}`;
  parent.appendChild(el);
}

function pill(parent: HTMLElement, x: number, y: number, text: string, color: string, anchor: 'center' | 'left' = 'center'): void {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText =
    `position:absolute;left:${x}px;top:${y}px;transform:translate(${anchor === 'center' ? '-50%' : '0'},-50%);` +
    `padding:2px 6px;border-radius:4px;background:${color};color:#fff;font:600 11px/14px system-ui,sans-serif;white-space:nowrap;` +
    'box-shadow:0 1px 2px rgb(0 0 0 / .2);';
  parent.appendChild(el);
}

const fmt = (n: number) => String(Math.round(n * 100) / 100);

/** Zeroheight-style overlay: outline and size, padding bands with values, children dashed and the gaps between them. */
function drawOverlay(target: Element | undefined, hovered: Element | undefined): void {
  clearOverlay();
  if (!target) return;
  const layer = document.createElement('div');
  layer.id = OVERLAY_ID;
  layer.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;z-index:2147483647;';
  document.body.appendChild(layer);
  const sx = scrollX;
  const sy = scrollY;
  const r = target.getBoundingClientRect();
  const x = r.left + sx;
  const y = r.top + sy;
  const m = measureBox(target);
  const [pt, pr, pb, pl] = m.padding;
  const [bt, br, bb, bl] = m.border;

  // Padding bands
  const inner = { x: x + bl, y: y + bt, w: r.width - bl - br, h: r.height - bt - bb };
  const band = `background:repeating-linear-gradient(45deg,${BLUE}33 0 4px,${BLUE}1a 4px 8px);`;
  if (pt) box(layer, inner.x, inner.y, inner.w, pt, band);
  if (pb) box(layer, inner.x, inner.y + inner.h - pb, inner.w, pb, band);
  if (pl) box(layer, inner.x, inner.y + pt, pl, inner.h - pt - pb, band);
  if (pr) box(layer, inner.x + inner.w - pr, inner.y + pt, pr, inner.h - pt - pb, band);

  // Children dashed; each gap is shaded and its value hangs from dashed guides outside the element,
  // below it in a row and to the right in a column (the component itself stays readable)
  const kids = Array.from(target.children).filter(sized).map((el) => el.getBoundingClientRect());
  for (const k of kids) box(layer, k.left + sx, k.top + sy, k.width, k.height, `outline:1px dashed ${BLUE};`);
  const row = m.display.includes('flex') ? !m.direction.startsWith('column') : kids.length > 1 && Math.abs(kids[1].top - kids[0].top) < 2;
  const guide = `border-left:1px dashed ${BLUE};`;
  let lane = 0;
  for (let i = 1; i < kids.length; i++) {
    const a = kids[i - 1];
    const b = kids[i];
    const gap = row ? b.left - a.right : b.top - a.bottom;
    if (gap < 1) continue;
    if (row) {
      const top = Math.max(a.top, b.top) + sy;
      const h = Math.max(4, Math.min(a.bottom, b.bottom) + sy - top);
      box(layer, a.right + sx, top, gap, h, `background:${PINK}40;`);
      const drop = y + r.height + 18 + (lane++ % 2) * 20;
      box(layer, a.right + sx, top + h, 0, drop - top - h, guide);
      box(layer, b.left + sx, top + h, 0, drop - top - h, guide);
      pill(layer, a.right + sx + gap / 2, drop, fmt(gap), PINK);
    } else {
      const left = Math.max(a.left, b.left) + sx;
      const w = Math.max(4, Math.min(a.right, b.right) + sx - left);
      box(layer, left, a.bottom + sy, w, gap, `background:${PINK}40;`);
      const out = x + r.width + 56 + (lane++ % 2) * 36;
      box(layer, left + w, a.bottom + sy, out - left - w, 0, `border-top:1px dashed ${BLUE};`);
      box(layer, left + w, b.top + sy, out - left - w, 0, `border-top:1px dashed ${BLUE};`);
      pill(layer, out, a.bottom + sy + gap / 2, fmt(gap), PINK, 'left');
    }
  }

  // Outline with corner handles, width above and height on the right
  box(layer, x, y, r.width, r.height, `outline:1px solid ${PINK};`);
  for (const [cx, cy] of [[x, y], [x + r.width, y], [x, y + r.height], [x + r.width, y + r.height]]) {
    box(layer, cx - 3, cy - 3, 6, 6, `border:1px solid ${PINK};border-radius:50%;background:#fff;`);
  }
  pill(layer, x + r.width / 2, y - 14, `${fmt(r.width)}px`, PINK);
  pill(layer, x + r.width + 8, y + r.height / 2, `${fmt(r.height)}px`, PINK, 'left');

  if (hovered) {
    const h = hovered.getBoundingClientRect();
    box(layer, h.left + sx, h.top + sy, h.width, h.height, `outline:2px solid ${BLUE};background:${BLUE}14;`);
    pill(layer, h.left + sx + h.width / 2, h.bottom + sy + 12, `${fmt(h.width)} × ${fmt(h.height)}`, BLUE);
  }
}
