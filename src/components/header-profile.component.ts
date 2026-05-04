import { Component, Input } from '@angular/core';
import { ReqresUser } from '../types/reqres';
import { getFullName, getInitials } from '../utils/user';
import { AvatarComponent } from './avatar.component';

@Component({
  selector: 'app-header-profile',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="flex min-h-[62px] max-w-[300px] items-center rounded-full bg-[#faeafd] py-2 pr-5 pl-2.5" aria-label="Active profile">
      @if (user) {
        <app-avatar [src]="user.avatar" [alt]="fullName(user)" className="mr-2 h-12 w-12" />
      } @else {
        <span class="mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-fcmb-purple text-white">{{ initials }}</span>
      }
      <b class="mr-1 rounded bg-[#ff533d] px-1.5 py-1 text-[13px] text-white">Jummie</b>
      <span class="min-w-0 truncate">{{ user ? fullName(user) : 'Kelvin Olanrewaju' }}</span>
    </div>
  `,
})
export class HeaderProfileComponent {
  @Input() user?: ReqresUser;

  protected readonly initials = 'FC';
  protected readonly fullName = getFullName;
  protected readonly userInitials = getInitials;
}
