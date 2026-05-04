import { Component } from '@angular/core';
import { IconComponent, IconName } from './icon.component';

type BottomAction = {
  label: string;
  icon: IconName;
  badge?: string;
};

@Component({
  selector: 'app-bottom-actions',
  standalone: true,
  imports: [IconComponent],
  template: `
    <nav class="absolute inset-x-0 bottom-0 grid grid-cols-4 gap-1 bg-white px-2.5 pb-0.5 pt-2" aria-label="Quick actions">
      @for (action of actions; track action.label) {
        <button class="grid min-w-0 cursor-pointer justify-items-center gap-1 border-0 bg-transparent text-[13px] text-fcmb-purple max-[430px]:text-xs" type="button">
          <span class="relative inline-flex">
            @if (action.badge) {
              <span class="absolute -right-[18px] -top-3 rounded-lg bg-[#ffe2a3] px-1.5 py-px text-[11px] text-[#9a6612]">{{ action.badge }}</span>
            }
            <app-icon [name]="action.icon" [size]="22" />
          </span>
          <span class="max-w-full truncate">{{ action.label }}</span>
        </button>
      }
    </nav>
  `,
})
export class BottomActionsComponent {
  protected readonly actions: BottomAction[] = [
    { label: 'Transfers', icon: 'send' },
    { label: 'Airtime Top-up', icon: 'airtime' },
    { label: 'QR Scanner', icon: 'qr', badge: 'New' },
    { label: 'Locator', icon: 'locator' },
  ];
}
