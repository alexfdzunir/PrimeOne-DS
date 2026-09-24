import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';
import { ControlsPanelComponent } from './controls/controls-panel.component';
import { ExplorerState } from './explorer-state';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home.component';
import { SectionComponent } from './pages/section.component';
import { SidebarComponent } from './sidebar/sidebar.component';

/**
 * Global navbar on top of three columns: catalogue, stage, controls. The side columns collapse, and on
 * narrow windows they become drawers over the stage. The stage shows the home, a section overview or the
 * live component; the controls only exist for a component.
 */
@Component({
  selector: 'po-root',
  imports: [NavbarComponent, SidebarComponent, CanvasComponent, ControlsPanelComponent, HomeComponent, SectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'po-shell',
    '[class.po-shell--catalog-closed]': '!state.catalogOpen()',
    '[class.po-shell--panel-closed]': '!panelShown()',
    '[class.po-shell--compact]': 'state.compact()',
    '(document:keydown.escape)': 'state.compact() && state.closeDrawers()',
  },
  template: `
    <po-navbar class="po-shell__navbar" />
    <div class="po-shell__side po-shell__side--catalog" [attr.inert]="state.catalogOpen() ? null : ''">
      <po-sidebar />
    </div>
    @switch (state.view().kind) {
      @case ('home') {
        <po-home class="po-shell__stage" />
      }
      @case ('section') {
        <po-section class="po-shell__stage" />
      }
      @default {
        <po-canvas class="po-shell__stage" />
      }
    }
    @if (state.compact() && (state.catalogOpen() || panelShown())) {
      <div class="po-shell__backdrop" aria-hidden="true" (click)="state.closeDrawers()"></div>
    }
    <div class="po-shell__side po-shell__side--panel" [attr.inert]="panelShown() ? null : ''">
      <po-controls-panel />
    </div>
  `,
})
export class AppComponent {
  protected readonly state = inject(ExplorerState);
  protected readonly panelShown = computed(() => this.state.panelOpen() && this.state.view().kind === 'component');
}
