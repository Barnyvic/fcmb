import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReqresUser } from '../types/reqres';
import { getFullName } from '../utils/user';
import { AvatarComponent } from './avatar.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <button
      class="grid min-h-[150px] w-full grid-cols-[128px_1px_minmax(0,1fr)] items-center rounded-[3px] border border-transparent bg-[#fbfbfc] px-6 py-[18px] text-left text-[#25232a] transition duration-150 hover:-translate-y-px hover:border-[#efe3f2] hover:shadow-[0_14px_30px_rgba(40,35,48,0.08)] max-[820px]:min-h-[124px] max-[820px]:grid-cols-[76px_minmax(0,1fr)] max-[820px]:p-4"
      [class.border-[#efe3f2]]="isSelected"
      [class.shadow-[0_14px_30px_rgba(40,35,48,0.08)]]="isSelected"
      type="button"
      (click)="select.emit(user)"
    >
      <app-avatar [src]="user.avatar" [alt]="fullName(user)" className="h-[104px] w-[104px] max-[820px]:h-16 max-[820px]:w-16" />
      <span class="h-[94px] w-px bg-[#dddde2] max-[820px]:hidden"></span>
      <span class="grid min-w-0 gap-3.5 pl-6 max-[820px]:gap-2 max-[820px]:pl-3">
        <span class="grid grid-cols-[112px_minmax(0,1fr)] gap-2 max-[820px]:grid-cols-[minmax(88px,0.45fr)_minmax(0,1fr)] max-[820px]:text-sm">
          <strong class="font-extrabold">Email:</strong>
          <span class="break-words">{{ user.email }}</span>
        </span>
        <span class="grid grid-cols-[112px_minmax(0,1fr)] gap-2 max-[820px]:grid-cols-[minmax(88px,0.45fr)_minmax(0,1fr)] max-[820px]:text-sm">
          <strong class="font-extrabold">First Name:</strong>
          <span class="break-words">{{ user.first_name }}</span>
        </span>
        <span class="grid grid-cols-[112px_minmax(0,1fr)] gap-2 max-[820px]:grid-cols-[minmax(88px,0.45fr)_minmax(0,1fr)] max-[820px]:text-sm">
          <strong class="font-extrabold">Last Name:</strong>
          <span class="break-words">{{ user.last_name }}</span>
        </span>
      </span>
    </button>
  `,
})
export class UserCardComponent {
  @Input({ required: true }) user!: ReqresUser;
  @Input() isSelected = false;
  @Output() select = new EventEmitter<ReqresUser>();

  protected readonly fullName = getFullName;
}
