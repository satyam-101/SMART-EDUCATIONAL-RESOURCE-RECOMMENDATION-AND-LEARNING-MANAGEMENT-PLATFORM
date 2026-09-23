import { type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, id, ...rest }: Props) {
  const inputId = id ?? rest.name;
  return (
    <label htmlFor={inputId} className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-medium text-zinc-400">{label}</span>}
      <textarea
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 resize-y',
          className,
        )}
        {...rest}
      />
    </label>
  );
}
