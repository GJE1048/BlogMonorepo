import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({
  asChild,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' && 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent-soft)] hover:brightness-110',
        variant === 'outline' && 'border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-surface-2)] text-[var(--color-text)]',
        variant === 'ghost' && 'hover:bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:text-[var(--color-text)]',
        size === 'sm' && 'h-8 px-3 text-xs',
        size === 'md' && 'h-10 px-4 py-2 text-sm',
        size === 'lg' && 'h-12 px-8 text-base',
        className
      )}
      {...props}
    />
  );
}
