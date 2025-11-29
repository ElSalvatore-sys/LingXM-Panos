import { Link } from 'react-router-dom';
import logoDark from '@/assets/icons/logo.png';
import logoLight from '@/assets/icons/logoHeader.png';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  const logoSrc = variant === 'dark' ? logoDark : logoLight;

  return (
    <Link to="/" className={cn('block w-[198px]', className)}>
      <img
        src={logoSrc}
        alt="LingXM - Language Learning 2.0"
        className="w-full h-auto"
      />
    </Link>
  );
}

// Fallback text-based logo if images aren't available
export function LogoText({ variant = 'dark', className }: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <Link
      to="/"
      className={cn(
        'flex items-baseline font-sans text-2xl font-normal',
        isDark ? 'text-lingxm-blue' : 'text-white',
        className
      )}
    >
      <span>Ling</span>
      <span className="text-lg">&lt;</span>
      <span className="font-semibold">XM</span>
      <sup
        className={cn(
          'text-xs ml-1 px-1 py-0.5 rounded',
          isDark ? 'bg-lingxm-blue text-white' : 'bg-white text-lingxm-blue'
        )}
      >
        alpha
      </sup>
    </Link>
  );
}
