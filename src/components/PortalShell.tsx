import { Menu, X } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../enums/routes';
import { BrandLogo } from './BrandLogo';
import { Button } from './Button';
import { Sidebar } from './Sidebar';

export function PortalShell({ children }: PropsWithChildren) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="grid min-h-screen grid-cols-[280px_minmax(0,1fr)] bg-white lg:p-8 max-[1180px]:grid-cols-[230px_minmax(0,1fr)] max-[1180px]:p-4 max-[820px]:block max-[820px]:p-0">
      <Sidebar className="max-[820px]:hidden" />

      <section className="min-w-0 bg-white px-10 py-6 max-[1180px]:p-6 max-[820px]:p-4">
        <header className="mb-7 hidden items-center justify-between max-[820px]:flex">
          <Link className="flex items-center gap-3" to={AppRoute.Users}>
            <BrandLogo />
            <strong>Career Portal</strong>
          </Link>
          <Button className="min-h-11 w-11 px-0" type="button" aria-label="Open menu" onClick={() => setIsMenuOpen(true)}>
            <Menu size={18} />
          </Button>
        </header>

        {children}
      </section>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 hidden bg-black/35 max-[820px]:block" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="h-full w-[min(82vw,320px)] bg-[#f7f7f7] shadow-2xl">
            <div className="flex justify-end px-4 pt-4">
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fcmb-purple" type="button" aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <Sidebar className="min-h-[calc(100%-56px)]" onNavigate={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
