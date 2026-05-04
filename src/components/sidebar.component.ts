import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppRoute } from '../enums/routes';
import { BrandLogoComponent } from './brand-logo.component';
import { IconComponent, IconName } from './icon.component';

type NavItem = {
  label: string;
  icon: IconName;
  to: AppRoute;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BrandLogoComponent, IconComponent, RouterLink, RouterLinkActive],
  template: `
    <aside class="flex min-h-full flex-col gap-18 bg-[#f7f7f7] py-5 pr-0 pl-7" aria-label="Career Portal navigation">
      <div class="flex items-center gap-4">
        <app-brand-logo />
        <strong class="text-[17px]">Career Portal</strong>
      </div>

      <nav class="grid gap-4">
        @for (item of navItems; track item.label) {
          <a
            class="relative flex min-h-13 items-center gap-5 px-4 font-semibold text-[#707175] transition hover:text-fcmb-purple"
            routerLinkActive="bg-[#efe3f2] text-fcmb-purple after:absolute after:top-0 after:right-0 after:h-full after:w-[5px] after:bg-fcmb-magenta"
            [routerLink]="item.to"
            (click)="navigate.emit()"
          >
            <app-icon [name]="item.icon" [size]="22" />
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>

      <a class="mt-auto flex min-h-13 items-center gap-5 px-4 font-semibold text-fcmb-red" [routerLink]="routes.Register" (click)="navigate.emit()">
        <app-icon name="logout" [size]="22" />
        <span>Sign out</span>
      </a>
    </aside>
  `,
})
export class SidebarComponent {
  @Output() navigate = new EventEmitter<void>();

  protected readonly routes = AppRoute;
  protected readonly navItems: NavItem[] = [
    { label: 'Home', icon: 'home', to: AppRoute.Home },
    { label: 'Users', icon: 'user', to: AppRoute.Users },
    { label: 'Career Interest', icon: 'graduation', to: AppRoute.CareerInterest },
    { label: 'My Assessments', icon: 'star', to: AppRoute.Assessments },
    { label: 'Jobs and Vacancies', icon: 'briefcase', to: AppRoute.Jobs },
    { label: 'Appraisal', icon: 'appraisal', to: AppRoute.Appraisal },
  ];
}
