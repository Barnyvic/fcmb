import { BriefcaseBusiness, GraduationCap, Home, LogOut, Network, Star, UserRound } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const navItems = [
  { label: 'Home', icon: Home },
  { label: 'Users', icon: UserRound, active: true },
  { label: 'Career Interest', icon: GraduationCap },
  { label: 'My Assessments', icon: Star },
  { label: 'Jobs and Vacancies', icon: BriefcaseBusiness },
  { label: 'Appraisal', icon: Network },
];

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Career Portal navigation">
      <div className="sidebar__brand">
        <BrandLogo />
        <strong>Career Portal</strong>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <a key={item.label} className={item.active ? 'is-active' : ''} href={item.active ? '/users' : '#'}>
              <Icon size={22} strokeWidth={1.8} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <a className="sidebar__sign-out" href="/register">
        <LogOut size={22} strokeWidth={1.8} />
        <span>Sign out</span>
      </a>
    </aside>
  );
}
