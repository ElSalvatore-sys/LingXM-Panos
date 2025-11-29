import { cn } from '@/lib/utils';

interface SearchTipsProps {
  className?: string;
}

export function SearchTips({ className }: SearchTipsProps) {
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
        Search Tips
      </h4>

      <ul className="space-y-3">
        <li>
          <span className="text-gray-600">&bull;</span>{' '}
          use <code className="bg-gray-100 px-1 rounded">" "</code> to note oscillations
          <br />
          <span className="text-gray-400 text-sm">e.g. "without"</span>
        </li>

        <li>
          <span className="text-gray-600">&bull;</span>{' '}
          use <code className="bg-gray-100 px-1 rounded">*</code> before OR after a word to denote wildcards
          <br />
          <span className="text-gray-400 text-sm">e.g. operat* or *ation</span>
        </li>
      </ul>
    </div>
  );
}
