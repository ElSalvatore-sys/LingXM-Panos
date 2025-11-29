import { cn } from '@/lib/utils';

interface ResultItem {
  id: number;
  sentence: string;
  highlightWord?: string;
}

interface ResultsListProps {
  results: ResultItem[];
  onResultClick: (id: number) => void;
  title?: string;
  className?: string;
}

export function ResultsList({
  results,
  onResultClick,
  title = 'Open Results at...',
  className
}: ResultsListProps) {
  // Helper to highlight a word in the sentence
  const highlightText = (sentence: string, word?: string) => {
    if (!word) return sentence;

    const regex = new RegExp(`(${word})`, 'gi');
    const parts = sentence.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === word.toLowerCase() ? (
        <strong key={index} className="text-lingxm-blue">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={cn('', className)}
      style={{
        fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif"
      }}
    >
      {/* Header */}
      {title && (
        <h3
          className="text-black mb-4"
          style={{ fontSize: '16px', fontWeight: 600 }}
        >
          {title}
        </h3>
      )}

      {/* Results list */}
      <ul className="space-y-5">
        {results.map((result) => (
          <li key={result.id}>
            <button
              onClick={() => onResultClick(result.id)}
              className="flex items-start gap-2 text-left hover:text-lingxm-blue transition-colors w-full"
              style={{
                fontSize: '18px',
                lineHeight: '24px'
              }}
            >
              <span className="text-gray-500 flex-shrink-0">&gt;</span>
              <span>{highlightText(result.sentence, result.highlightWord)}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Empty state */}
      {results.length === 0 && (
        <p className="text-gray-500 italic" style={{ fontSize: '16px' }}>
          No results found. Try a different search term.
        </p>
      )}
    </div>
  );
}
