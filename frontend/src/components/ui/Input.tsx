import { type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ label, hint, className, id, ...rest }: Props) {
  const inputId = id ?? rest.name;
  return (
    <label htmlFor={inputId} className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-medium text-zinc-400">{label}</span>}
      <input
        id={inputId}
        className={cn(
          'h-11 w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-3.5 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-violet-400/70 focus:bg-white/[0.08] focus:ring-4 focus:ring-violet-500/10',
          className,
        )}
        {...rest}
      />
      {hint && <span className="text-[11px] text-zinc-500">{hint}</span>}
    </label>
  );
}
