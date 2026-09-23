import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Line } from './tokens';

/** Highlighted code with line numbers. Tokens are rendered as text, never as HTML. */
@Component({
  selector: 'po-code-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pre class="po-code-view__scroll po-scroll" tabindex="0" [attr.aria-label]="label()"><code class="po-code-view__lines">@for (line of lines(); track $index) {<span class="po-code-view__line"><span class="po-code-view__ln" aria-hidden="true">{{ $index + 1 }}</span><span class="po-code-view__src">@for (token of line; track $index) {<span [class]="'tk tk-' + token.kind">{{ token.text }}</span>}</span></span>}</code></pre>
  `,
  styles: `
    :host {
      --po-code-bg: var(--p-content-background);
      --po-code-ln: #848eae;
      --tk-punct: #5a6481;
      --tk-tag: #0a4ec2;
      --tk-attr: #a21caf;
      --tk-binding: #6d28d9;
      --tk-string: #15803d;
      --tk-expr: #9a3412;
      --tk-keyword: #be123c;
      --tk-text: #181c26;
      --tk-entity: #0e7490;
      --tk-comment: #6b7280;
      display: flex;
      min-height: 0;
      background: var(--po-code-bg);
    }

    :host-context(html.po-dark) {
      --po-code-bg: var(--p-surface-950);
      --po-code-ln: #71717a;
      --tk-punct: #a1a1aa;
      --tk-tag: #6ea0f7;
      --tk-attr: #f0abfc;
      --tk-binding: #c4b5fd;
      --tk-string: #86efac;
      --tk-expr: #fdba74;
      --tk-keyword: #fda4af;
      --tk-text: #e4e4e7;
      --tk-entity: #67e8f9;
      --tk-comment: #a1a1aa;
    }

    .po-code-view__scroll {
      flex: 1 1 auto;
      min-width: 0;
      margin: 0;
      padding: 12px 0 16px;
      overflow: auto;
      font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 13px;
      line-height: 1.6;
      tab-size: 2;
      color: var(--tk-text);
    }

    .po-code-view__scroll:focus-visible {
      outline: 2px solid var(--p-focus-ring-color);
      outline-offset: -2px;
    }

    .po-code-view__lines {
      display: block;
      min-width: max-content;
      font: inherit;
    }

    .po-code-view__line {
      display: flex;
      min-height: 1.6em;
    }

    .po-code-view__ln {
      position: sticky;
      left: 0;
      flex: 0 0 auto;
      width: 3.25em;
      padding-right: 1em;
      background: var(--po-code-bg);
      color: var(--po-code-ln);
      text-align: right;
      user-select: none;
    }

    .po-code-view__src {
      flex: 1 0 auto;
      padding-right: 24px;
      white-space: pre;
    }

    .tk-punct { color: var(--tk-punct); }
    .tk-tag { color: var(--tk-tag); }
    .tk-attr { color: var(--tk-attr); }
    .tk-binding { color: var(--tk-binding); }
    .tk-string { color: var(--tk-string); }
    .tk-expr { color: var(--tk-expr); }
    .tk-keyword { color: var(--tk-keyword); font-weight: 600; }
    .tk-text { color: var(--tk-text); }
    .tk-entity { color: var(--tk-entity); }
    .tk-comment { color: var(--tk-comment); font-style: italic; }
  `,
})
export class CodeViewComponent {
  readonly lines = input.required<Line[]>();
  readonly label = input('Código');
}
