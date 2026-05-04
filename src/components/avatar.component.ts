import { Component, Input } from '@angular/core';

const fallbackAvatar = '/images/avatar-fallback.png';

@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `
    <img
      [class]="'shrink-0 rounded-full object-cover ' + className"
      [src]="currentSrc"
      [alt]="alt"
      loading="lazy"
      (error)="useFallback()"
    />
  `,
})
export class AvatarComponent {
  @Input() src = fallbackAvatar;
  @Input({ required: true }) alt = '';
  @Input() className = '';

  get currentSrc(): string {
    return this.src || fallbackAvatar;
  }

  useFallback(): void {
    this.src = fallbackAvatar;
  }
}
