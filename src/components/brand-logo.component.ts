import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      [ngClass]="containerClass"
      aria-label="FCMB"
    >
      <span [ngClass]="textClass">FCMB</span>
      <i [ngClass]="barClass"></i>
      <i [ngClass]="barClass"></i>
    </div>
  `,
})
export class BrandLogoComponent {
  @Input() size: 'sm' | 'lg' = 'sm';

  get containerClass(): string {
    const base = 'inline-flex flex-col justify-center rounded bg-fcmb-purple shadow-[0_10px_26px_rgba(95,22,133,0.16)]';
    return this.size === 'lg'
      ? `${base} h-[196px] w-[196px] p-[30px] max-[430px]:h-[150px] max-[430px]:w-[150px] max-[430px]:p-6`
      : `${base} h-[54px] w-[54px] p-2`;
  }

  get textClass(): string {
    return this.size === 'lg'
      ? 'font-extrabold leading-none text-white text-[46px] max-[430px]:text-[34px]'
      : 'font-extrabold leading-none text-white text-[15px]';
  }

  get barClass(): string {
    return this.size === 'lg'
      ? 'block rounded-sm bg-fcmb-gold mt-2.5 h-[15px] w-[126px] max-[430px]:mt-2 max-[430px]:h-3 max-[430px]:w-[94px]'
      : 'block rounded-sm bg-fcmb-gold mt-1 h-1.5 w-[34px]';
  }
}
