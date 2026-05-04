import { Component, Input } from '@angular/core';
import { ReqresUser } from '../types/reqres';
import { getFullName } from '../utils/user';
import { AvatarComponent } from './avatar.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    @if (isLoading) {
      <section class="grid justify-items-center gap-10 pt-24 max-[1180px]:pt-6 max-[820px]:pb-8" aria-label="Selected user">
        <div class="h-[194px] w-[194px] animate-pulse rounded-full bg-slate-100"></div>
        <div class="h-6 w-full max-w-80 animate-pulse rounded bg-slate-100"></div>
        <div class="h-6 w-full max-w-80 animate-pulse rounded bg-slate-100"></div>
        <div class="h-13 w-full max-w-[380px] animate-pulse rounded bg-slate-100"></div>
      </section>
    } @else if (!user) {
      <section class="grid justify-items-center gap-10 pt-24 text-[#74727a] max-[1180px]:pt-6 max-[820px]:pb-8" aria-label="Selected user">
        <p>Select a user to view their details.</p>
      </section>
    } @else {
      <section class="grid justify-items-center gap-10 pt-24 max-[1180px]:pt-6 max-[820px]:pb-8" [attr.aria-label]="fullName(user) + ' details'">
        <app-avatar className="h-[min(194px,54vw)] w-[min(194px,54vw)]" [src]="user.avatar" [alt]="fullName(user)" />
        <dl class="grid w-full max-w-[380px] gap-5">
          <div class="grid grid-cols-[104px_minmax(0,1fr)] gap-4">
            <dt class="font-extrabold">Email:</dt>
            <dd class="m-0 min-w-0 break-words">{{ user.email }}</dd>
          </div>
          <div class="grid grid-cols-[104px_minmax(0,1fr)] gap-4">
            <dt class="font-extrabold">First Name:</dt>
            <dd class="m-0 min-w-0 break-words">{{ user.first_name }}</dd>
          </div>
          <div class="grid grid-cols-[104px_minmax(0,1fr)] gap-4">
            <dt class="font-extrabold">Last Name:</dt>
            <dd class="m-0 min-w-0 break-words">{{ user.last_name }}</dd>
          </div>
        </dl>
        <button class="inline-flex min-h-12 w-full max-w-[380px] items-center justify-center rounded-[5px] bg-gradient-to-r from-[#6c028b] to-fcmb-magenta px-6 text-white transition duration-150 hover:-translate-y-px hover:shadow-[0_14px_28px_rgba(145,18,145,0.22)]" type="button">
          Proceed
        </button>
      </section>
    }
  `,
})
export class UserDetailComponent {
  @Input() user?: ReqresUser;
  @Input() isLoading = false;

  protected readonly fullName = getFullName;
}
