import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import {
  SearchInput,
  DifficultyFilter,
  ResultsList,
  SearchTips
} from '@/components/features';

// Mock results data for testing
const mockResults = [
  {
    id: 1,
    sentence: 'Der schnelle braune Fuchs springt über den faulen Hund.',
    highlightWord: 'Fuchs'
  },
  {
    id: 2,
    sentence: 'Ich möchte heute Abend ins Kino gehen.',
    highlightWord: 'Kino'
  },
  {
    id: 3,
    sentence: 'Die Bibliothek ist jeden Tag von neun bis fünf geöffnet.',
    highlightWord: 'Bibliothek'
  },
  {
    id: 4,
    sentence: 'Können Sie mir bitte den Weg zum Bahnhof zeigen?',
    highlightWord: 'Bahnhof'
  },
  {
    id: 5,
    sentence: 'Das Wetter ist heute wirklich sehr schön.',
    highlightWord: 'Wetter'
  },
  {
    id: 6,
    sentence: 'Meine Schwester arbeitet als Ärztin im Krankenhaus.',
    highlightWord: 'Krankenhaus'
  },
  {
    id: 7,
    sentence: 'Wir haben gestern einen interessanten Film gesehen.',
    highlightWord: 'Film'
  },
  {
    id: 8,
    sentence: 'Die Kinder spielen gerne im Park.',
    highlightWord: 'Park'
  }
];

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const fromLang = searchParams.get('from') || 'el';
  const toLang = searchParams.get('to') || 'de';

  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [contentLength, setContentLength] = useState(2);
  const [results, setResults] = useState(mockResults);

  const handleSearch = () => {
    // For now, just filter mock results based on query
    if (searchQuery.trim()) {
      const filtered = mockResults.filter((r) =>
        r.sentence.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered.length > 0 ? filtered : mockResults);
    } else {
      setResults(mockResults);
    }
  };

  const handleResultClick = (id: number) => {
    // TODO: Open word detail modal
    console.log('Clicked result:', id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - blue variant */}
      <Header variant="blue" showFlagSelector />

      {/* Main content */}
      <main className="flex-1 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Language indicator */}
          <div
            className="mb-6 text-gray-600"
            style={{
              fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
              fontSize: '14px'
            }}
          >
            Learning: <strong>{toLang.toUpperCase()}</strong> from{' '}
            <strong>{fromLang.toUpperCase()}</strong>
          </div>

          <div className="flex gap-8">
            {/* Left side - Search and Results */}
            <div className="flex-1" style={{ maxWidth: '70%' }}>
              {/* Search input */}
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                className="mb-6"
              />

              {/* Filters */}
              <div className="mb-8 space-y-3">
                <DifficultyFilter
                  label="Difficulty"
                  value={difficulty}
                  onChange={setDifficulty}
                />
                <DifficultyFilter
                  label="Content Length"
                  value={contentLength}
                  onChange={setContentLength}
                />
              </div>

              {/* Results */}
              <ResultsList
                results={results}
                onResultClick={handleResultClick}
              />
            </div>

            {/* Right sidebar - Search Tips */}
            <div className="w-[30%] pl-6 border-l border-gray-200">
              <SearchTips />
            </div>
          </div>
        </div>
      </main>

      {/* Footer - full variant */}
      <Footer variant="full" />
    </div>
  );
}
