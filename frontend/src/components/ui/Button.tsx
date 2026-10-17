import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

const variants = {
  primary:
    'bg-violet-600 text-white shadow-md hover:bg-violet-500 active:scale-[.98]',
  secondary: 'border border-white/10 bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]',
  ghost: 'text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100',
  outline: 'border border-violet-400/40 text-violet-200 hover:bg-violet-500/10',
};
const sizes = {
  sm: 'h-7 px-2.5 text-xs rounded-lg',
  md: 'h-9 px-4 text-sm rounded-xl',
  lg: 'h-11 px-5 text-sm rounded-xl',
  icon: 'h-10 w-10 rounded-xl',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
  loadingText?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  loading = false,
  loadingText,
  className,
  disabled,
  children,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-zuno-950 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin text-current shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {leadingIcon}
          {children}
          {trailingIcon}
        </>
      )}
    </button>
  );
}
