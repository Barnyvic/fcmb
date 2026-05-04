import { MapPin, QrCode, Send, Smartphone } from 'lucide-react';

const actions = [
  { label: 'Transfers', icon: Send },
  { label: 'Airtime Top-up', icon: Smartphone },
  { label: 'QR Scanner', icon: QrCode, badge: 'New' },
  { label: 'Locator', icon: MapPin },
];

export function BottomActions() {
  return (
    <nav className="absolute inset-x-0 bottom-0 grid grid-cols-4 gap-1 bg-white px-2.5 pb-0.5 pt-2" aria-label="Quick actions">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button key={action.label} className="grid min-w-0 cursor-pointer justify-items-center gap-1 border-0 bg-transparent text-[13px] text-fcmb-purple max-[430px]:text-xs" type="button">
            <span className="relative inline-flex">
              {action.badge && <span className="absolute -right-[18px] -top-3 rounded-lg bg-[#ffe2a3] px-1.5 py-px text-[11px] text-[#9a6612]">{action.badge}</span>}
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <span className="max-w-full truncate">{action.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
