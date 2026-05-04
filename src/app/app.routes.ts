import { Routes } from '@angular/router';
import { AppRoute } from '../enums/routes';
import { PortalPlaceholderPageComponent } from '../pages/portal-placeholder-page.component';
import { RegisterPageComponent } from '../pages/register-page.component';
import { UsersPageComponent } from '../pages/users-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AppRoute.Register.slice(1) },
  { path: AppRoute.Register.slice(1), component: RegisterPageComponent },
  { path: AppRoute.Home.slice(1), component: PortalPlaceholderPageComponent, data: { title: 'Home' } },
  { path: AppRoute.Users.slice(1), component: UsersPageComponent },
  { path: 'users/:userId', component: UsersPageComponent },
  { path: AppRoute.CareerInterest.slice(1), component: PortalPlaceholderPageComponent, data: { title: 'Career Interest' } },
  { path: AppRoute.Assessments.slice(1), component: PortalPlaceholderPageComponent, data: { title: 'My Assessments' } },
  { path: AppRoute.Jobs.slice(1), component: PortalPlaceholderPageComponent, data: { title: 'Jobs and Vacancies' } },
  { path: AppRoute.Appraisal.slice(1), component: PortalPlaceholderPageComponent, data: { title: 'Appraisal' } },
  { path: '**', redirectTo: AppRoute.Register.slice(1) },
];
