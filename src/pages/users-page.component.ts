import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ReqresService } from '../api/reqres.service';
import { HeaderProfileComponent } from '../components/header-profile.component';
import { PortalShellComponent } from '../components/portal-shell.component';
import { UserCardComponent } from '../components/user-card.component';
import { UserDetailComponent } from '../components/user-detail.component';
import { ReqresUser } from '../types/reqres';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [HeaderProfileComponent, PortalShellComponent, UserCardComponent, UserDetailComponent],
  template: `
    <app-portal-shell>
      <div class="flex items-start justify-between gap-6">
        <div>
          <h1 class="m-0 text-[clamp(42px,5vw,64px)] leading-none font-extrabold text-[#dfdfe2]">Users</h1>
          <p class="mt-2 font-semibold text-[#74727a]">Page {{ pageMeta().page }} of {{ pageMeta().totalPages }}</p>
        </div>
        <div class="max-[820px]:hidden">
          <app-header-profile [user]="activeUser()" />
        </div>
      </div>

      @if (error()) {
        <p class="mt-5 w-full rounded-[5px] bg-[#fdecef] p-3 text-sm leading-[1.4] text-[#8b1624]">{{ error() }}</p>
      }

      <div class="mt-14 grid grid-cols-[minmax(420px,1fr)_minmax(310px,0.66fr)] items-start gap-12 max-[1180px]:grid-cols-1 max-[820px]:mt-7 max-[820px]:gap-7">
        <section class="grid max-h-[calc(100vh-210px)] gap-5 overflow-auto pr-2 max-[820px]:max-h-none max-[820px]:overflow-visible max-[820px]:pr-0" aria-label="Users list">
          @if (isListLoading()) {
            @for (item of loadingCards; track item) {
              <div class="min-h-[150px] animate-pulse rounded bg-slate-100 max-[820px]:min-h-[124px]"></div>
            }
          } @else {
            @for (user of users(); track user.id) {
              <app-user-card [user]="user" [isSelected]="activeUser().id === user.id" (select)="selectUser($event)" />
            }
          }
        </section>

        <app-user-detail [user]="activeUser()" [isLoading]="isDetailLoading()" />
      </div>
    </app-portal-shell>
  `,
})
export class UsersPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly users = signal<ReqresUser[]>([]);
  protected readonly selectedUser = signal<ReqresUser | undefined>(undefined);
  protected readonly pageMeta = signal({ page: 2, totalPages: 2 });
  protected readonly isListLoading = signal(true);
  protected readonly isDetailLoading = signal(false);
  protected readonly error = signal('');
  protected readonly loadingCards = Array.from({ length: 6 }, (_, index) => index);
  protected readonly activeUser = computed(() => this.selectedUser() ?? this.users()[0]);

  constructor(
    private readonly reqresService: ReqresService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const userId = Number(params.get('userId'));

      if (userId) {
        this.loadUserDetail(userId);
      }
    });
  }

  protected selectUser(user: ReqresUser): void {
    this.selectedUser.set(user);
    void this.router.navigate(['/users', user.id]);
  }

  private loadUsers(): void {
    this.isListLoading.set(true);
    this.error.set('');

    this.reqresService.getUsers(2).subscribe({
      next: (response) => {
        this.users.set(response.data);
        this.pageMeta.set({ page: response.page, totalPages: response.total_pages });

        if (!this.route.snapshot.paramMap.get('userId')) {
          this.selectedUser.set(response.data[0]);
        }
      },
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isListLoading.set(false),
    });
  }

  private loadUserDetail(userId: number): void {
    this.isDetailLoading.set(true);
    this.error.set('');

    this.reqresService.getUser(userId).subscribe({
      next: (response) => this.selectedUser.set(response.data),
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isDetailLoading.set(false),
    });
  }
}
