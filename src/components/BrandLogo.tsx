import { cn } from '../utils/cn';

type BrandLogoProps = {
  size?: 'sm' | 'lg';
};

export function BrandLogo({ size = 'sm' }: BrandLogoProps) {
  return (
    <div
      className={cn(
        'inline-flex flex-col justify-center rounded bg-fcmb-purple shadow-[0_10px_26px_rgba(95,22,133,0.16)]',
        size === 'lg' ? 'h-[196px] w-[196px] p-[30px] max-[430px]:h-[150px] max-[430px]:w-[150px] max-[430px]:p-6' : 'h-[54px] w-[54px] p-2',
      )}
      aria-label="FCMB"
    >
      <span className={cn('font-extrabold leading-none text-white', size === 'lg' ? 'text-[46px] max-[430px]:text-[34px]' : 'text-[15px]')}>FCMB</span>
      <i
        className={cn(
          'mt-1 block rounded-sm bg-fcmb-gold',
          size === 'lg' ? 'mt-2.5 h-[15px] w-[126px] max-[430px]:mt-2 max-[430px]:h-3 max-[430px]:w-[94px]' : 'h-1.5 w-[34px]',
        )}
      />
      <i
        className={cn(
          'mt-1 block rounded-sm bg-fcmb-gold',
          size === 'lg' ? 'mt-2.5 h-[15px] w-[126px] max-[430px]:mt-2 max-[430px]:h-3 max-[430px]:w-[94px]' : 'h-1.5 w-[34px]',
        )}
      />
    </div>
  );
}
