import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

export interface BottomSheetAction {
  icon: string;
  label: string;
  id?: string;
}

/**
 * Mobile bottom sheet on top of p-drawer: handle, title, actions, search, projected content and buttons.
 */
@Component({
  selector: 'prime-one-bottomsheet',
  imports: [Button, Drawer, IconField, InputIcon, InputText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-drawer [(visible)]="visible" position="bottom" [showCloseIcon]="false" [style]="{ height: height() }" styleClass="po-bottomsheet">
      <ng-template #header>
        <div class="po-bottomsheet__header">
          @if (showHandle()) {
            <span class="po-bottomsheet__handle" aria-hidden="true"></span>
          }
          <div class="po-bottomsheet__title-row">
            <h2 class="po-bottomsheet__title">{{ heading() }}</h2>
            @for (item of actions(); track item.id ?? item.label) {
              <p-button [icon]="item.icon" text rounded [ariaLabel]="item.label" (onClick)="actionClick.emit(item)" />
            }
            @if (showClose()) {
              <p-button icon="ph ph-x" text rounded ariaLabel="Cerrar" (onClick)="visible.set(false)" />
            }
          </div>
          @if (showSearch()) {
            <div class="po-bottomsheet__search">
              <p-iconfield iconPosition="right">
                <input pInputText type="search" [placeholder]="searchPlaceholder()" [attr.aria-label]="searchPlaceholder()" (input)="onSearch($event)" />
                <p-inputicon class="ph ph-magnifying-glass" />
              </p-iconfield>
              <p-button [label]="cancelLabel()" link (onClick)="cancel.emit()" />
            </div>
          }
        </div>
      </ng-template>

      <ng-content />

      <ng-template #footer>
        @if (primaryLabel() || secondaryLabel()) {
          <div class="po-bottomsheet__buttons">
            @if (primaryLabel()) {
              <p-button [label]="primaryLabel()" [fluid]="true" (onClick)="primary.emit()" />
            }
            @if (secondaryLabel()) {
              <p-button [label]="secondaryLabel()" variant="outlined" [fluid]="true" (onClick)="secondary.emit()" />
            }
          </div>
        }
      </ng-template>
    </p-drawer>
  `,
  styles: `
    .po-bottomsheet__header { display: flex; flex-direction: column; gap: 1rem; width: 100%; }
    .po-bottomsheet__handle { align-self: center; width: 3rem; height: 0.25rem; border-radius: 999px; background: var(--p-text-color); }
    .po-bottomsheet__title-row { display: flex; align-items: center; gap: 0.25rem; }
    .po-bottomsheet__title { flex: 1; margin: 0; font-size: 1rem; font-weight: 600; }
    .po-bottomsheet__search { display: flex; align-items: center; gap: 0.5rem; }
    .po-bottomsheet__search p-iconfield { flex: 1; }
    .po-bottomsheet__search input { width: 100%; }
    .po-bottomsheet__buttons { display: flex; flex-direction: column; gap: 0.5rem; width: 100%; }
  `,
})
export class PrimeOneBottomSheet {
  readonly visible = model(false);
  readonly heading = input('');
  readonly height = input('auto');
  readonly showHandle = input(true);
  readonly showClose = input(true);
  readonly actions = input<BottomSheetAction[]>([]);
  readonly showSearch = input(false);
  readonly searchPlaceholder = input('Buscar');
  readonly cancelLabel = input('Cancelar');
  readonly primaryLabel = input<string>();
  readonly secondaryLabel = input<string>();

  readonly actionClick = output<BottomSheetAction>();
  readonly search = output<string>();
  readonly cancel = output<void>();
  readonly primary = output<void>();
  readonly secondary = output<void>();

  protected onSearch(event: Event): void {
    this.search.emit((event.target as HTMLInputElement).value);
  }
}
