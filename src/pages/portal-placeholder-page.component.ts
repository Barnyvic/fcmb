import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderProfileComponent } from '../components/header-profile.component';
import { PortalShellComponent } from '../components/portal-shell.component';

@Component({
  selector: 'app-portal-placeholder-page',
  standalone: true,
  imports: [HeaderProfileComponent, PortalShellComponent],
  template: `
    <app-portal-shell>
      <div class="flex items-start justify-between gap-6">
        <div>
          <h1 class="m-0 text-[clamp(42px,5vw,64px)] leading-none font-extrabold text-[#dfdfe2]">{{ title }}</h1>
          <p class="mt-2 font-semibold text-[#74727a]">Career Portal</p>
        </div>
        <div class="max-[820px]:hidden">
          <app-header-profile />
        </div>
      </div>

      <section class="mt-14 max-w-3xl rounded-md border border-[#efe3f2] bg-[#fbfbfc] p-8 max-[820px]:mt-8 max-[820px]:p-5">
        <h2 class="text-xl font-extrabold text-[#25232a]">{{ title }}</h2>
        <p class="mt-3 text-[#74727a]">This section is wired into the portal navigation and ready for its page-specific content.</p>
      </section>
    </app-portal-shell>
  `,
})
export class PortalPlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly title = this.route.snapshot.data['title'] ?? 'Career Portal';
}
