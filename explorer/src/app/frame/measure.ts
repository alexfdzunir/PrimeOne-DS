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

/** Last measured and list-highlighted elements, kept so the pointer can redraw the overlay on its own. */
let lastTarget: Element | undefined;
let lastHovered: Element | undefined;
let pointerEl: Element | null = null;
let pointerFrame = 0;

/** List of elements, the measured one (root by default) and its box model; draws the overlay when enabled. */
export function measure(index: number | null, hover: number | null, overlay: boolean): MeasureData {
  const list = measurableElements();
  const selected = index !== null && index < list.length ? index : defaultIndex(list);
  const elements: MeasureElement[] = list.map((el, i) => ({ index: i, label: label(el), depth: depthOf(el, list) }));
  const target = list[selected];
  lastTarget = target;
  lastHovered = hover !== null && hover !== selected ? list[hover] : undefined;
  if (overlay) drawOverlay(target, lastHovered ?? pointerEl ?? undefined);
  else clearOverlay();
  return { elements, selected, box: target ? measureBox(target) : null };
}

/** Element under the pointer inside the component (an icon counts as a whole, not its paths). */
function pointed(event: PointerEvent): Element | null {
  let el = document.elementFromPoint(event.clientX, event.clientY);
  if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) el = el.ownerSVGElement ?? el;
  const story = document.querySelector('po-story');
  if (!el || !story || el === document.body || el === document.documentElement) return null;
  return story.contains(el) || !el.closest('po-root') ? el : null;
}

const onPointerMove = (event: PointerEvent) => {
  const el = pointed(event);
  if (el === pointerEl) return;
  pointerEl = el;
  cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => drawOverlay(lastTarget, lastHovered ?? pointerEl ?? undefined));
};
const onPointerLeave = () => {
  pointerEl = null;
  drawOverlay(lastTarget, lastHovered);
};

/** Figma-style hover: while measuring, any nested element under the pointer shows its size and its distances. */
export function trackPointer(enabled: boolean): void {
  document.removeEventListener('pointermove', onPointerMove);
  document.documentElement.removeEventListener('pointerleave', onPointerLeave);
  if (!enabled) {
    pointerEl = null;
    return;
  }
  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onPointerLeave);
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

  // Children dashed. Lanes outside the element (right in a column, below in a row): size of each child, then the
  // gaps between them, then the total as a dimension line, so the component itself stays readable
  // Through single-child wrappers (a list container and its <ul>) down to the level that holds the items
  let holder: Element = target;
  for (let only = Array.from(holder.children).filter(sized); only.length === 1 && only[0].children.length; only = Array.from(holder.children).filter(sized)) holder = only[0];
  const kids = Array.from(holder.children).filter(sized).map((el) => el.getBoundingClientRect());
  for (const k of kids) box(layer, k.left + sx, k.top + sy, k.width, k.height, `outline:1px dashed ${BLUE};`);
  const hs = getComputedStyle(holder);
  const row = hs.display.includes('flex') ? !hs.flexDirection.startsWith('column') : kids.length > 1 && Math.abs(kids[1].top - kids[0].top) < 2;
  const gaps = kids.slice(1).map((b, i) => ({ a: kids[i], b, gap: row ? b.left - kids[i].right : b.top - kids[i].bottom })).filter((g) => g.gap >= 1);
  const showKids = kids.length > 1 || (kids.length === 1 && (Math.abs(kids[0].width - r.width) > 1 || Math.abs(kids[0].height - r.height) > 1));
  const lanes = [showKids, gaps.length > 0];
  const laneAt = (n: number) => (row ? y + r.height + 14 + n * 24 : x + r.width + 12 + n * 44);
  const laneKids = laneAt(0);
  const laneGaps = laneAt(lanes[0] ? 1 : 0);
  const laneTotal = row ? y - 18 : laneAt(lanes.filter(Boolean).length);

  if (showKids) {
    for (const k of kids) {
      if (row) pill(layer, k.left + sx + k.width / 2, laneKids, fmt(k.width), BLUE);
      else pill(layer, laneKids, k.top + sy + k.height / 2, fmt(k.height), BLUE, 'left');
    }
  }
  for (const { a, b, gap } of gaps) {
    if (row) {
      const top = Math.max(a.top, b.top) + sy;
      const h = Math.max(4, Math.min(a.bottom, b.bottom) + sy - top);
      box(layer, a.right + sx, top, gap, h, `background:${PINK}40;`);
      box(layer, a.right + sx, top + h, 0, laneGaps - top - h, `border-left:1px dashed ${PINK};`);
      box(layer, b.left + sx, top + h, 0, laneGaps - top - h, `border-left:1px dashed ${PINK};`);
      pill(layer, a.right + sx + gap / 2, laneGaps, fmt(gap), PINK);
    } else {
      const left = Math.max(a.left, b.left) + sx;
      const w = Math.max(4, Math.min(a.right, b.right) + sx - left);
      box(layer, left, a.bottom + sy, w, gap, `background:${PINK}40;`);
      box(layer, left + w, a.bottom + sy, laneGaps - left - w, 0, `border-top:1px dashed ${PINK};`);
      box(layer, left + w, b.top + sy, laneGaps - left - w, 0, `border-top:1px dashed ${PINK};`);
      pill(layer, laneGaps, a.bottom + sy + gap / 2, fmt(gap), PINK, 'left');
    }
  }

  // Outline with corner handles; width and height as dimension lines with end ticks
  box(layer, x, y, r.width, r.height, `outline:1px solid ${PINK};`);
  for (const [cx, cy] of [[x, y], [x + r.width, y], [x, y + r.height], [x + r.width, y + r.height]]) {
    box(layer, cx - 3, cy - 3, 6, 6, `border:1px solid ${PINK};border-radius:50%;background:#fff;`);
  }
  const top = y - 14;
  box(layer, x, top, r.width, 0, `border-top:1px solid ${PINK};`);
  box(layer, x, top - 4, 0, 8, `border-left:1px solid ${PINK};`);
  box(layer, x + r.width, top - 4, 0, 8, `border-left:1px solid ${PINK};`);
  pill(layer, x + r.width / 2, top, `${fmt(r.width)}px`, PINK);
  const side = row ? x + r.width + 14 : laneTotal;
  box(layer, side, y, 0, r.height, `border-left:1px solid ${PINK};`);
  box(layer, side - 4, y, 8, 0, `border-top:1px solid ${PINK};`);
  box(layer, side - 4, y + r.height, 8, 0, `border-top:1px solid ${PINK};`);
  pill(layer, side, y + r.height / 2, `${fmt(r.height)}px`, PINK);

  if (hovered) drawHovered(layer, hovered, target, sx, sy);
}

/** Hovered element: outline, its size and, when it sits inside the measured element, the distance to each edge. */
function drawHovered(layer: HTMLElement, hovered: Element, target: Element, sx: number, sy: number): void {
  const h = hovered.getBoundingClientRect();
  const t = target.getBoundingClientRect();
  box(layer, h.left + sx, h.top + sy, h.width, h.height, `outline:2px solid ${BLUE};background:${BLUE}14;`);
  pill(layer, h.left + sx + h.width / 2, h.bottom + sy + 12, `${fmt(h.width)} × ${fmt(h.height)}`, BLUE);
  if (hovered === target || !target.contains(hovered)) return;
  const cx = h.left + sx + h.width / 2;
  const cy = h.top + sy + h.height / 2;
  const line = `background:${PINK};`;
  const distances: [number, () => void][] = [
    [h.top - t.top, () => { box(layer, cx, t.top + sy, 1, h.top - t.top, line); pill(layer, cx + 4, t.top + sy + (h.top - t.top) / 2, fmt(h.top - t.top), PINK, 'left'); }],
    [t.bottom - h.bottom, () => { box(layer, cx, h.bottom + sy, 1, t.bottom - h.bottom, line); pill(layer, cx + 4, h.bottom + sy + (t.bottom - h.bottom) / 2, fmt(t.bottom - h.bottom), PINK, 'left'); }],
    [h.left - t.left, () => { box(layer, t.left + sx, cy, h.left - t.left, 1, line); pill(layer, t.left + sx + (h.left - t.left) / 2, cy - 10, fmt(h.left - t.left), PINK); }],
    [t.right - h.right, () => { box(layer, h.right + sx, cy, t.right - h.right, 1, line); pill(layer, h.right + sx + (t.right - h.right) / 2, cy - 10, fmt(t.right - h.right), PINK); }],
  ];
  for (const [distance, draw] of distances) if (distance >= 1) draw();
}
