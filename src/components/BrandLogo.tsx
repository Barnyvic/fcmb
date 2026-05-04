type BrandLogoProps = {
  size?: 'sm' | 'lg';
};

export function BrandLogo({ size = 'sm' }: BrandLogoProps) {
  return (
    <div className={`brand-logo brand-logo--${size}`} aria-label="FCMB">
      <span>FCMB</span>
      <i />
      <i />
    </div>
  );
}
