import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';
import { ControlsPanelComponent } from './controls/controls-panel.component';
import { ExplorerState } from './explorer-state';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

/**
 * Global navbar on top of three columns: catalogue, live component, controls. The side columns collapse,
 * and on narrow windows they become drawers over the stage.
 */
@Component({
  selector: 'po-root',
  imports: [NavbarComponent, SidebarComponent, CanvasComponent, ControlsPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'po-shell',
    '[class.po-shell--catalog-closed]': '!state.catalogOpen()',
    '[class.po-shell--panel-closed]': '!state.panelOpen()',
    '[class.po-shell--compact]': 'state.compact()',
    '(document:keydown.escape)': 'state.compact() && state.closeDrawers()',
  },
  template: `
    <po-navbar class="po-shell__navbar" />
    <div class="po-shell__side po-shell__side--catalog" [attr.inert]="state.catalogOpen() ? null : ''">
      <po-sidebar />
    </div>
    <po-canvas class="po-shell__stage" />
    @if (state.compact() && (state.catalogOpen() || state.panelOpen())) {
      <div class="po-shell__backdrop" aria-hidden="true" (click)="state.closeDrawers()"></div>
    }
    <div class="po-shell__side po-shell__side--panel" [attr.inert]="state.panelOpen() ? null : ''">
      <po-controls-panel />
    </div>
  `,
})
export class AppComponent {
  protected readonly state = inject(ExplorerState);
}
