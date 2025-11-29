import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface SearchTipsProps {
  className?: string;
}

export function SearchTips({ className }: SearchTipsProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn('', className)}
      style={{
        fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
        color: '#979797',
        fontSize: '14px',
        lineHeight: '20px'
      }}
    >
      <h4 className="font-semibold mb-3" style={{ color: '#666' }}>
        {t('searchTips')}
      </h4>

      <ul className="space-y-3">
        <li>
          <span className="text-gray-600">&bull;</span>{' '}
          {t('tipQuotes')}
          <br />
          <span className="text-gray-400 text-sm">e.g. "without"</span>
        </li>

        <li>
          <span className="text-gray-600">&bull;</span>{' '}
          {t('tipWildcard')}
          <br />
          <span className="text-gray-400 text-sm">e.g. operat* or *ation</span>
        </li>
      </ul>
    </div>
  );
}
