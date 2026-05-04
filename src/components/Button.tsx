import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  fullWidth?: boolean;
};

export function Button({ children, className = '', fullWidth = false, ...props }: ButtonProps) {
  const classes = ['button', fullWidth ? 'button--full' : '', className].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
