import { useEffect } from 'react';
import { XIcon, SlidersHorizontalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  children,
}: MobileFilterDrawerProps) {
  const { t } = useTranslation();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-[300px] max-w-[85vw] bg-white z-50 shadow-xl',
          'transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontalIcon className="w-5 h-5 text-[#7b9dd2]" />
            <h2 className="font-semibold text-gray-800">{t('sidebar.filters')}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-56px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}

// Mobile filter button component
interface MobileFilterButtonProps {
  onClick: () => void;
  activeFiltersCount?: number;
  className?: string;
}

export function MobileFilterButton({
  onClick,
  activeFiltersCount = 0,
  className,
}: MobileFilterButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className={cn(
        'lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg',
        'bg-white border border-gray-200 shadow-sm',
        'hover:border-gray-300 transition-colors',
        className
      )}
    >
      <SlidersHorizontalIcon className="w-4 h-4 text-gray-600" />
      <span className="text-sm text-gray-700">{t('sidebar.filters')}</span>
      {activeFiltersCount > 0 && (
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#7b9dd2] text-white text-xs">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
}
