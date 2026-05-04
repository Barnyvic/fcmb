import { MapPin, QrCode, Send, Smartphone } from 'lucide-react';

const actions = [
  { label: 'Transfers', icon: Send },
  { label: 'Airtime Top-up', icon: Smartphone },
  { label: 'QR Scanner', icon: QrCode, badge: 'New' },
  { label: 'Locator', icon: MapPin },
];

export function BottomActions() {
  return (
    <nav className="bottom-actions" aria-label="Quick actions">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button key={action.label} className="bottom-actions__item" type="button">
            <span className="bottom-actions__icon">
              {action.badge && <span className="bottom-actions__badge">{action.badge}</span>}
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <span>{action.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
