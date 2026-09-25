import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { TokenRecord } from '../model';

const COLOR = /^(#|rgba?\(|hsla?\(|oklch\(|color-mix\(|transparent$)/;

/** Design tokens of the component: Figma-style name, CSS variable and value (with a swatch for colours). */
@Component({
  selector: 'po-tokens-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="po-tokens__search">
      <i class="ph ph-magnifying-glass" aria-hidden="true"></i>
      <input
        #search
        type="search"
        placeholder="Filtrar tokens"
        aria-label="Filtrar tokens"
        [value]="query()"
        (input)="query.set(search.value)"
      />
      <span class="po-tokens__count">{{ filtered().length }} de {{ tokens().length }}</span>
    </div>
    <div class="po-tokens__scroll po-scroll" tabindex="0" aria-label="Tokens del componente">
      @if (filtered().length > 0) {
        <table>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            @for (token of filtered(); track token.cssVar) {
              <tr>
                <td>
                  <code class="po-tokens__name">{{ token.name }}</code>
                  <span class="po-tokens__var">{{ token.cssVar }}</span>
                </td>
                <td>
                  <span class="po-tokens__value">
                    @if (isColor(token.value)) {
                      <span class="po-tokens__swatch" [style.background]="token.value" aria-hidden="true"></span>
                    }
                    <code>{{ token.value }}</code>
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <p class="po-tokens__empty">{{ tokens().length ? 'Ningún token coincide con el filtro.' : 'El componente no usa tokens del DS.' }}</p>
      }
    </div>
  `,
  styles: `
    :host { display: flex; flex-direction: column; min-height: 0; background: var(--p-content-background); }
    .po-tokens__search {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-bottom: 1px solid var(--p-content-border-color);
      color: var(--p-text-muted-color);
    }
    .po-tokens__search input {
      flex: 1;
      min-width: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: var(--p-text-color);
      font: inherit;
      font-size: 0.8125rem;
    }
    .po-tokens__count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }
    .po-tokens__scroll { flex: 1 1 auto; min-height: 0; }
    .po-tokens__scroll:focus-visible { outline: 2px solid var(--p-focus-ring-color); outline-offset: -2px; }
    table { width: 100%; border-collapse: collapse; font-size: 0.8125rem; }
    th {
      position: sticky;
      top: 0;
      padding: 8px 16px;
      background: var(--po-surface-2);
      color: var(--p-text-muted-color);
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-align: start;
      text-transform: uppercase;
    }
    td { padding: 6px 16px; border-top: 1px solid var(--p-content-border-color); vertical-align: top; }
    code { font-family: var(--po-font-mono); font-size: 0.75rem; }
    .po-tokens__name { display: block; color: var(--p-text-color); }
    .po-tokens__var { color: var(--p-text-muted-color); font-family: var(--po-font-mono); font-size: 0.6875rem; }
    .po-tokens__value { display: inline-flex; align-items: center; gap: 8px; color: var(--p-text-color); word-break: break-all; }
    .po-tokens__swatch {
      flex: none;
      width: 14px;
      height: 14px;
      border-radius: 4px;
      box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.15);
    }
    .po-tokens__empty { margin: 0; padding: 16px; color: var(--p-text-muted-color); }
  `,
})
export class TokensViewComponent {
  readonly tokens = input.required<TokenRecord[]>();
  protected readonly query = signal('');
  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    return q ? this.tokens().filter((t) => t.name.includes(q) || t.cssVar.includes(q) || t.value.toLowerCase().includes(q)) : this.tokens();
  });

  protected isColor(value: string): boolean {
    return COLOR.test(value);
  }
}
