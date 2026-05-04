import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../enums/routes';
import { BrandLogoComponent } from './brand-logo.component';
import { IconComponent } from './icon.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-portal-shell',
  standalone: true,
  imports: [BrandLogoComponent, IconComponent, RouterLink, SidebarComponent],
  template: `
    <main class="grid min-h-screen grid-cols-[280px_minmax(0,1fr)] bg-white lg:p-8 max-[1180px]:grid-cols-[230px_minmax(0,1fr)] max-[1180px]:p-4 max-[820px]:block max-[820px]:p-0">
      <app-sidebar class="max-[820px]:hidden" />

      <section class="min-w-0 bg-white px-10 py-6 max-[1180px]:p-6 max-[820px]:p-4">
        <header class="mb-7 hidden items-center justify-between max-[820px]:flex">
          <a class="flex items-center gap-3" [routerLink]="routes.Users">
            <app-brand-logo />
            <strong>Career Portal</strong>
          </a>
          <button class="inline-flex min-h-11 w-11 items-center justify-center rounded-[5px] bg-gradient-to-r from-[#6c028b] to-fcmb-magenta px-0 text-white" type="button" aria-label="Open menu" (click)="isMenuOpen = true">
            <app-icon name="menu" [size]="18" />
          </button>
        </header>

        <ng-content />
      </section>

      @if (isMenuOpen) {
        <div class="fixed inset-0 z-50 hidden bg-black/35 max-[820px]:block" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div class="h-full w-[min(82vw,320px)] bg-[#f7f7f7] shadow-2xl">
            <div class="flex justify-end px-4 pt-4">
              <button class="inline-flex h-10 w-10 items-center justify-center rounded-full text-fcmb-purple" type="button" aria-label="Close menu" (click)="isMenuOpen = false">
                <app-icon name="close" [size]="22" />
              </button>
            </div>
            <app-sidebar class="block min-h-[calc(100%-56px)]" (navigate)="isMenuOpen = false" />
          </div>
        </div>
      }
    </main>
  `,
})
export class PortalShellComponent {
  protected readonly routes = AppRoute;
  protected isMenuOpen = false;
}
