import { Component, Input } from '@angular/core';

export type IconName =
  | 'airtime'
  | 'appraisal'
  | 'briefcase'
  | 'chevron-down'
  | 'close'
  | 'graduation'
  | 'home'
  | 'locator'
  | 'logout'
  | 'menu'
  | 'qr'
  | 'send'
  | 'star'
  | 'user';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (name) {
        @case ('home') {
          <path d="m3 10.5 9-7 9 7" />
          <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
        }
        @case ('user') {
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        }
        @case ('graduation') {
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c3 2 9 2 12 0v-5" />
        }
        @case ('star') {
          <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2l-5-4.9 6.9-1L12 2Z" />
        }
        @case ('briefcase') {
          <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M3 12h18" />
          <path d="M9 12v2h6v-2" />
        }
        @case ('appraisal') {
          <path d="M12 3v4" />
          <path d="M6 11h12" />
          <path d="M6 21v-4" />
          <path d="M18 21v-4" />
          <path d="M12 21v-8" />
          <rect x="9" y="7" width="6" height="6" rx="1" />
          <rect x="3" y="17" width="6" height="4" rx="1" />
          <rect x="15" y="17" width="6" height="4" rx="1" />
        }
        @case ('logout') {
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        }
        @case ('send') {
          <path d="m22 2-7 20-4-9-9-4 20-7Z" />
          <path d="M22 2 11 13" />
        }
        @case ('airtime') {
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        }
        @case ('qr') {
          <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3z" />
          <path d="M15 15h2v2h-2zM19 15h2v6h-4v-2h2zM13 19h2v2h-2zM13 13h2v2h-2z" />
        }
        @case ('locator') {
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        }
        @case ('chevron-down') {
          <path d="m6 9 6 6 6-6" />
        }
        @case ('menu') {
          <path d="M4 6h16M4 12h16M4 18h16" />
        }
        @case ('close') {
          <path d="M18 6 6 18M6 6l12 12" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 22;
}
