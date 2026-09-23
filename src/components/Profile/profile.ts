import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';

/**
 * User summary (Figma "Perfil"): avatar, name, profile link and optional expand action.
 */
@Component({
  selector: 'prime-one-profile',
  imports: [Avatar, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.po-profile--contrast]': 'contrast()' },
  template: `
    <p-avatar [image]="image()" [label]="image() ? undefined : initials()" size="large" shape="circle" />
    <div class="po-profile__text">
      <span class="po-profile__name">{{ name() }}</span>
      @if (linkLabel()) {
        <button type="button" class="po-profile__link" (click)="editProfile.emit()">{{ linkLabel() }}</button>
      }
    </div>
    @if (showToggle()) {
      <p-button
        [icon]="expanded() ? 'ph ph-caret-up' : 'ph ph-caret-down'"
        severity="secondary"
        text
        rounded
        [ariaLabel]="expanded() ? 'Contraer perfil' : 'Desplegar perfil'"
        [attr.aria-expanded]="expanded()"
        (onClick)="toggle.emit()"
      />
    }
  `,
  styles: `
    :host { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: var(--p-form-field-border-radius); }
    :host(.po-profile--contrast) { background: var(--p-content-hover-background); }
    p-avatar, p-button { flex: 0 0 auto; }
    .po-profile__text { display: flex; flex-direction: column; flex: 1; min-width: 0; }
    .po-profile__name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; color: var(--p-text-color); }
    .po-profile__link { padding: 0; border: 0; background: none; color: var(--p-primary-color); font: inherit; font-size: 0.875rem; text-align: start; cursor: pointer; }
    .po-profile__link:focus-visible { outline: 1px solid var(--p-focus-ring-color); outline-offset: 2px; }
  `,
})
export class PrimeOneProfile {
  readonly name = input.required<string>();
  readonly image = input<string>();
  readonly linkLabel = input('Editar perfil');
  readonly contrast = input(false);
  /** Chevron action (Figma "Icon Right"). */
  readonly showToggle = input(true);
  readonly expanded = input(false);

  readonly editProfile = output<void>();
  readonly toggle = output<void>();

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join(''),
  );
}
