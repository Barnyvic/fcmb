import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../utils/cn';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  fullWidth?: boolean;
};

export function Button({ children, className = '', fullWidth = false, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex min-h-12 items-center justify-center rounded-[5px] border-0 bg-gradient-to-r from-[#6c028b] to-fcmb-magenta px-6 text-white transition duration-150 hover:-translate-y-px hover:shadow-[0_14px_28px_rgba(145,18,145,0.22)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:shadow-none',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
