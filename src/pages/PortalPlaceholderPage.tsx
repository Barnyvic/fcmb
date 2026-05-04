import { HeaderProfile } from '../components/HeaderProfile';
import { PortalShell } from '../components/PortalShell';

type PortalPlaceholderPageProps = {
  title: string;
};

export function PortalPlaceholderPage({ title }: PortalPlaceholderPageProps) {
  return (
    <PortalShell>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="m-0 text-[clamp(42px,5vw,64px)] leading-none font-extrabold text-[#dfdfe2]">{title}</h1>
          <p className="mt-2 font-semibold text-[#74727a]">Career Portal</p>
        </div>
        <div className="max-[820px]:hidden">
          <HeaderProfile />
        </div>
      </div>

      <section className="mt-14 max-w-3xl rounded-md border border-[#efe3f2] bg-[#fbfbfc] p-8 max-[820px]:mt-8 max-[820px]:p-5">
        <h2 className="text-xl font-extrabold text-[#25232a]">{title}</h2>
        <p className="mt-3 text-[#74727a]">
          This section is wired into the portal navigation and ready for its page-specific content.
        </p>
      </section>
    </PortalShell>
  );
}
