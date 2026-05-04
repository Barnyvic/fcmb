import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReqresService } from '../api/reqres.service';
import { AccountType } from '../enums/account';
import { AppRoute } from '../enums/routes';
import { BottomActionsComponent } from '../components/bottom-actions.component';
import { BrandLogoComponent } from '../components/brand-logo.component';
import { IconComponent } from '../components/icon.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [BottomActionsComponent, BrandLogoComponent, IconComponent, ReactiveFormsModule],
  template: `
    <main class="grid min-h-screen grid-cols-[minmax(520px,44.4%)_minmax(520px,1fr)] bg-white max-[820px]:flex max-[820px]:justify-center max-[820px]:bg-[linear-gradient(rgba(255,255,255,0.86),rgba(255,255,255,0.92)),url('/images/register-marble.jpeg')] max-[820px]:bg-cover max-[820px]:bg-center">
      <section class="min-h-screen bg-[url('/images/register-marble.jpeg')] bg-cover bg-center max-[820px]:hidden" aria-hidden="true"></section>

      <section class="relative flex h-[min(825px,100vh)] min-h-[720px] w-[380px] flex-col self-center justify-self-center border-2 border-[#8a97a7] bg-white shadow-[0_20px_48px_rgba(46,40,56,0.1)] max-[820px]:h-auto max-[820px]:min-h-screen max-[820px]:w-[min(100%,430px)] max-[820px]:border-0 max-[820px]:shadow-none" aria-label="Registration">
        <form class="flex flex-1 flex-col items-center px-1 pb-[84px]" [formGroup]="form" (ngSubmit)="submit()">
          <div class="-mt-0.5">
            <app-brand-logo size="lg" />
          </div>

          <div class="mt-[108px] grid w-[min(316px,calc(100%-48px))] grid-cols-2 rounded-full border-4 border-[#777976] bg-[#777976] p-1 max-[430px]:mt-[72px] max-[430px]:w-[calc(100%-42px)]" role="tablist" aria-label="Account type">
            <button
              type="button"
              class="h-[38px] min-w-0 rounded-full border-0 bg-transparent text-white"
              [class.bg-white]="accountType === accountTypes.Personal"
              [class.text-fcmb-purple]="accountType === accountTypes.Personal"
              (click)="accountType = accountTypes.Personal"
            >
              Personal
            </button>
            <button
              type="button"
              class="h-[38px] min-w-0 rounded-full border-0 bg-transparent text-white"
              [class.bg-white]="accountType === accountTypes.Business"
              [class.text-fcmb-purple]="accountType === accountTypes.Business"
              (click)="accountType = accountTypes.Business"
            >
              Business
            </button>
          </div>

          <div class="mt-[55px] grid w-full gap-5 px-1 max-[430px]:mt-[42px] max-[430px]:px-0">
            <label class="grid gap-1.5" for="name">
              <span class="relative flex min-h-14 items-center rounded-[5px] border border-[#b9bbc1] bg-white">
                <span class="inline-flex shrink-0 basis-12 justify-center text-[#aaaab0]">
                  <app-icon name="user" [size]="20" />
                </span>
                <input id="name" class="h-[54px] min-w-0 flex-1 border-0 bg-transparent text-[#25232a] outline-none placeholder:text-[#aaaab0]" formControlName="name" placeholder="Full Name" autocomplete="name" />
              </span>
              @if (showError('name')) {
                <span class="pl-1 text-[13px] text-fcmb-red">Enter your full name.</span>
              }
            </label>

            <label class="grid gap-1.5" for="job">
              <span class="relative flex min-h-14 items-center rounded-[5px] border border-[#b9bbc1] bg-white">
                <span class="inline-flex shrink-0 basis-12 justify-center text-[#aaaab0]">
                  <app-icon name="briefcase" [size]="20" />
                </span>
                <select id="job" class="h-[54px] min-w-0 flex-1 appearance-none border-0 bg-transparent pr-10 text-[#25232a] outline-none" formControlName="job">
                  <option value="" disabled>Job</option>
                  @for (job of jobOptions; track job.value) {
                    <option [value]="job.value">{{ job.label }}</option>
                  }
                </select>
                <app-icon class="pointer-events-none absolute right-4 text-[#aaaab0]" name="chevron-down" [size]="18" />
              </span>
              @if (showError('job')) {
                <span class="pl-1 text-[13px] text-fcmb-red">Select a job.</span>
              }
            </label>
          </div>

          @if (successMessage) {
            <p class="mt-3 w-full rounded-[5px] bg-[#e9f7ef] p-3 text-sm leading-[1.4] text-[#155d35]">{{ successMessage }}</p>
          }
          @if (submitError) {
            <p class="mt-3 w-full rounded-[5px] bg-[#fdecef] p-3 text-sm leading-[1.4] text-[#8b1624]">{{ submitError }}</p>
          }

          <button class="mt-[54px] inline-flex min-h-12 w-full items-center justify-center rounded-[5px] bg-gradient-to-r from-[#6c028b] to-fcmb-magenta px-6 text-white transition duration-150 hover:-translate-y-px hover:shadow-[0_14px_28px_rgba(145,18,145,0.22)] disabled:cursor-not-allowed disabled:opacity-55 max-[430px]:mt-[42px]" type="submit" [disabled]="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Proceed' }}
          </button>
        </form>

        <app-bottom-actions />
      </section>
    </main>
  `,
})
export class RegisterPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly reqresService = inject(ReqresService);
  private readonly router = inject(Router);

  protected readonly accountTypes = AccountType;
  protected accountType = AccountType.Personal;
  protected isSubmitting = false;
  protected successMessage = '';
  protected submitError = '';
  protected readonly jobOptions = [
    { label: 'Leader', value: 'leader' },
    { label: 'Product Designer', value: 'product designer' },
    { label: 'Frontend Engineer', value: 'frontend engineer' },
    { label: 'Business Analyst', value: 'business analyst' },
  ];

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    job: ['', Validators.required],
  });

  protected showError(controlName: 'name' | 'job'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.form.touched);
  }

  protected submit(): void {
    this.successMessage = '';
    this.submitError = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.reqresService.createUser(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.successMessage = `Created ${response.name} as ${response.job}. ID: ${response.id}`;
        window.setTimeout(() => void this.router.navigateByUrl(AppRoute.Users), 700);
      },
      error: (error: Error) => {
        this.submitError = error.message;
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
