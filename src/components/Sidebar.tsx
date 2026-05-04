import { BriefcaseBusiness, GraduationCap, Home, LogOut, Network, Star, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../enums/routes';
import { cn } from '../utils/cn';
import { BrandLogo } from './BrandLogo';

const navItems = [
  { label: 'Home', icon: Home, to: AppRoute.Home },
  { label: 'Users', icon: UserRound, to: AppRoute.Users },
  { label: 'Career Interest', icon: GraduationCap, to: AppRoute.CareerInterest },
  { label: 'My Assessments', icon: Star, to: AppRoute.Assessments },
  { label: 'Jobs and Vacancies', icon: BriefcaseBusiness, to: AppRoute.Jobs },
  { label: 'Appraisal', icon: Network, to: AppRoute.Appraisal },
];

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export function Sidebar({ className, onNavigate }: SidebarProps) {
  return (
    <aside className={cn('flex min-h-full flex-col gap-18 bg-[#f7f7f7] py-5 pr-0 pl-7', className)} aria-label="Career Portal navigation">
      <div className="flex items-center gap-4">
        <BrandLogo />
        <strong className="text-[17px]">Career Portal</strong>
      </div>

      <nav className="grid gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'relative flex min-h-13 items-center gap-5 px-4 font-semibold text-[#707175] transition hover:text-fcmb-purple',
                  isActive && 'bg-[#efe3f2] text-fcmb-purple after:absolute after:top-0 after:right-0 after:h-full after:w-[5px] after:bg-fcmb-magenta',
                )
              }
            >
              <Icon size={22} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <NavLink className="mt-auto flex min-h-13 items-center gap-5 px-4 font-semibold text-fcmb-red" to={AppRoute.Register} onClick={onNavigate}>
        <LogOut size={22} strokeWidth={1.8} />
        <span>Sign out</span>
      </NavLink>
    </aside>
  );
}
