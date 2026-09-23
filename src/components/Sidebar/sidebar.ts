import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { Button } from 'primeng/button';
import { PrimeOneProfile } from '../Profile/profile';

export interface SidebarItem {
  label: string;
  /** Phosphor class, e.g. `ph ph-house`. */
  icon?: string;
  id?: string;
  active?: boolean;
}

export interface SidebarSection {
  /** Main sections use larger items (Figma "sidebar-menu items"). */
  primary?: boolean;
  items: SidebarItem[];
}

export interface SidebarUser {
  name: string;
  image?: string;
}

/**
 * Application side navigation with profile, grouped sections, collapse and logout.
 */
@Component({
  selector: 'prime-one-sidebar',
  imports: [Button, PrimeOneProfile],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'navigation',
    '[class.po-sidebar--collapsed]': 'collapsed()',
    '[class.po-sidebar--mobile]': 'mobile()',
  },
  template: `
    @if (!mobile()) {
      <div class="po-sidebar__head">
        @if (!collapsed() && logo()) {
          <img class="po-sidebar__logo" [src]="logo()" [alt]="logoAlt()" />
        }
        <p-button
          [icon]="collapsed() ? 'ph ph-caret-double-right' : 'ph ph-caret-double-left'"
          severity="secondary"
          text
          rounded
          [ariaLabel]="collapsed() ? 'Expandir menú' : 'Contraer menú'"
          [attr.aria-expanded]="!collapsed()"
          (onClick)="collapsed.set(!collapsed())"
        />
      </div>
    }
    @if (user(); as profile) {
      @if (!collapsed()) {
        <prime-one-profile [name]="profile.name" [image]="profile.image" (editProfile)="profileClick.emit()" (toggle)="profileClick.emit()" />
      }
    }
    @for (section of sections(); track $index) {
      <ul class="po-sidebar__section" [class.po-sidebar__section--primary]="section.primary">
        @for (item of section.items; track item.id ?? item.label) {
          <li>
            <button
              type="button"
              class="po-sidebar__item"
              [class.po-sidebar__item--active]="item.active"
              [attr.aria-current]="item.active ? 'page' : null"
              [attr.title]="collapsed() ? item.label : null"
              (click)="itemClick.emit(item)"
            >
              @if (item.icon) {
                <i [class]="item.icon" aria-hidden="true"></i>
              }
              <span class="po-sidebar__label">{{ item.label }}</span>
            </button>
          </li>
        }
      </ul>
    }
    @if (showLogout() && !collapsed()) {
      <div class="po-sidebar__footer">
        @if (mobile()) {
          <button type="button" class="po-sidebar__item" (click)="logout.emit()">
            <i class="ph ph-sign-out" aria-hidden="true"></i>
            <span class="po-sidebar__label">{{ logoutLabel() }}</span>
          </button>
        } @else {
          <p-button [label]="logoutLabel()" (onClick)="logout.emit()" />
        }
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 20rem;
      padding: 1rem 0.75rem;
      background: var(--p-content-hover-background);
      color: var(--p-text-color);
      overflow-y: auto;
    }
    :host(.po-sidebar--collapsed) { width: 5.5rem; align-items: center; }
    :host(.po-sidebar--mobile) { width: 100%; border-radius: min(16px, calc(var(--p-content-border-radius) * 2)); }
    .po-sidebar__head { display: flex; align-items: center; justify-content: space-between; padding-inline: 0.25rem; }
    .po-sidebar__head p-button { flex: 0 0 auto; }
    :host(.po-sidebar--collapsed) .po-sidebar__head { justify-content: center; }
    .po-sidebar__logo { height: 1.75rem; }
    .po-sidebar__section { display: flex; flex-direction: column; gap: 0.25rem; margin: 0; padding: 0 0 0.75rem; list-style: none; border-bottom: 1px solid var(--p-content-border-color); }
    .po-sidebar__section:last-of-type { border-bottom: 0; }
    .po-sidebar__item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 0;
      border-radius: var(--p-navigation-item-border-radius);
      background: none;
      color: var(--p-text-muted-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }
    .po-sidebar__section--primary .po-sidebar__item { color: var(--p-text-color); font-size: 1rem; }
    .po-sidebar__item i { flex: 0 0 auto; font-size: 1.25rem; }
    .po-sidebar__item:hover { background: var(--p-content-background); }
    .po-sidebar__item--active { background: var(--p-highlight-background); color: var(--p-highlight-color); }
    .po-sidebar__item:focus-visible { outline: 1px solid var(--p-focus-ring-color); outline-offset: -1px; }
    :host(.po-sidebar--collapsed) .po-sidebar__item { flex-direction: column; gap: 0.25rem; padding: 0.5rem; font-size: 0.75rem; }
    .po-sidebar__footer { margin-top: auto; padding-inline: 0.75rem; }
  `,
})
export class PrimeOneSidebar {
  readonly sections = input<SidebarSection[]>([]);
  readonly user = input<SidebarUser>();
  readonly logo = input<string>();
  readonly logoAlt = input('Logotipo');
  readonly collapsed = model(false);
  readonly mobile = input(false);
  readonly showLogout = input(true);
  readonly logoutLabel = input('Cerrar sesión');

  readonly itemClick = output<SidebarItem>();
  readonly profileClick = output<void>();
  readonly logout = output<void>();
}
