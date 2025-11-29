import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FooterProps {
  variant?: 'simple' | 'full';
  className?: string;
}

export function Footer({ variant = 'simple', className }: FooterProps) {
  const isSimple = variant === 'simple';

  return (
    <footer
      className={cn(
        'w-full py-4 px-4',
        isSimple ? 'bg-transparent' : 'bg-lingxm-blue',
        className
      )}
    >
      <div className="container mx-auto">
        {isSimple ? (
          // Simple footer: right-aligned links
          <div className="flex justify-end">
            <nav className="flex gap-2">
              <Link
                to="/about"
                className="px-2 py-0.5 text-lg text-black hover:bg-black hover:text-white transition-all duration-500"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="px-2 py-0.5 text-lg text-black hover:bg-black hover:text-white transition-all duration-500"
              >
                Contact
              </Link>
              <Link
                to="/press"
                className="px-2 py-0.5 text-lg text-black hover:bg-black hover:text-white transition-all duration-500"
              >
                Press
              </Link>
            </nav>
          </div>
        ) : (
          // Full footer: logo + tagline + links
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-white font-semibold text-xl">
                Ling&lt;XM
              </Link>
              <span className="text-white/80 text-sm">
                Language learning 2.0
              </span>
            </div>
            <nav className="flex gap-2">
              <Link
                to="/about"
                className="px-2 py-0.5 text-sm text-white hover:bg-black transition-all duration-500"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="px-2 py-0.5 text-sm text-white hover:bg-black transition-all duration-500"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </footer>
  );
}
