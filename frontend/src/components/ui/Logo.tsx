import { useThemeContext } from '../../context/ThemeContext';

export function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  const { theme } = useThemeContext();
  const fill = theme === 'dark' ? '#7c3aed' : '#6d28d9';

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="2" y="2" width="36" height="36" rx="11" fill={fill} />
      <path d="M14 12.5a9 9 0 0 0 0 15" fill="none" stroke="white" strokeLinecap="round" strokeWidth="2.5" />
      <circle cx="26" cy="12.5" r="2.25" fill="white" />
      <circle cx="28" cy="21" r="4" fill="none" stroke="white" strokeWidth="2.2" />
    </svg>
  );
}
