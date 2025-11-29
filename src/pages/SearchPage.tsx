import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { LanguageCode, Word } from '@/types';
import { Header, Footer } from '@/components/layout';
import {
  SearchInput,
  DifficultyFilter,
  ResultsList,
  SearchTips
} from '@/components/features';
import { useVocabulary } from '@/hooks/useVocabulary';
import { languages } from '@/lib/languages';

export function SearchPage() {
  const [searchParams] = useSearchParams();

  // Get languages from URL params
  const fromLang = (searchParams.get('from') || 'el') as LanguageCode;
  const toLang = (searchParams.get('to') || 'de') as LanguageCode;

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState(5); // Show all difficulty levels by default
  const [contentLength, setContentLength] = useState(5);
  const [results, setResults] = useState<Word[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Load vocabulary for target language
  const { words, isLoading, error, searchWords, totalWords, languageName } =
    useVocabulary(toLang);

  // Search handler
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const searchResults = searchWords(searchQuery, difficulty);
    setResults(searchResults);
    setHasSearched(true);
  };

  // Re-search when difficulty changes (if already searched)
  useEffect(() => {
    if (hasSearched && searchQuery.trim()) {
      const searchResults = searchWords(searchQuery, difficulty);
      setResults(searchResults);
    }
  }, [difficulty, hasSearched, searchQuery, searchWords]);

  // Handle result click
  const handleResultClick = (id: number) => {
    const word = results.find((w) => w.id === id);
    if (word) {
      console.log('Selected word:', word);
      // TODO: Open word detail modal
    }
  };

  // Convert Word[] to ResultsList format
  const resultsForDisplay = results.map((word) => ({
    id: word.id,
    sentence: `${word.word} (rank #${word.rank}, frequency: ${word.frequency.toLocaleString()})`,
    highlightWord: word.word
  }));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - blue variant */}
      <Header variant="blue" showFlagSelector />

      {/* Main content */}
      <main className="flex-1 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Language indicator */}
          <div
            className="mb-6 flex items-center gap-2"
            style={{
              fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
              fontSize: '14px'
            }}
          >
            <span className="text-gray-600">Learning:</span>
            <img
              src={languages[toLang]?.flag}
              alt={languageName}
              className="w-6 h-auto rounded-sm"
            />
            <strong>{languageName || toLang.toUpperCase()}</strong>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-gray-600">from:</span>
            <img
              src={languages[fromLang]?.flag}
              alt={languages[fromLang]?.name}
              className="w-6 h-auto rounded-sm"
            />
            <strong>{languages[fromLang]?.name}</strong>
            {!isLoading && (
              <>
                <span className="text-gray-400 mx-2">|</span>
                <span className="text-gray-500">
                  {totalWords.toLocaleString()} words available
                </span>
              </>
            )}
          </div>

          {/* Loading/Error states */}
          {isLoading && (
            <div className="mb-6 text-gray-500">
              Loading vocabulary...
            </div>
          )}

          {error && (
            <div className="mb-6 text-red-500">
              Error: {error}
            </div>
          )}

          <div className="flex gap-8">
            {/* Left side - Search and Results */}
            <div className="flex-1" style={{ maxWidth: '70%' }}>
              {/* Search input */}
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder={`Search ${languageName || 'words'}...`}
                className="mb-6"
              />

              {/* Filters */}
              <div className="mb-8 space-y-3">
                <DifficultyFilter
                  label="Max Difficulty"
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
              {hasSearched ? (
                <>
                  <div
                    className="mb-4 text-gray-600"
                    style={{
                      fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
                      fontSize: '14px'
                    }}
                  >
                    {results.length > 0
                      ? `Found ${results.length} word${results.length !== 1 ? 's' : ''} starting with "${searchQuery}"`
                      : `No words found starting with "${searchQuery}"`}
                  </div>
                  <ResultsList
                    results={resultsForDisplay}
                    onResultClick={handleResultClick}
                    title={results.length > 0 ? 'Results:' : undefined}
                  />
                </>
              ) : (
                <div
                  className="text-gray-500 italic"
                  style={{
                    fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
                    fontSize: '16px'
                  }}
                >
                  Type a word and press Enter or click the search icon to find
                  matching vocabulary.
                </div>
              )}
            </div>

            {/* Right sidebar - Search Tips */}
            <div className="w-[30%] pl-6 border-l border-gray-200">
              <SearchTips />

              {/* Quick stats */}
              {!isLoading && (
                <div
                  className="mt-8 p-4 bg-gray-50 rounded-lg"
                  style={{
                    fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
                    fontSize: '13px'
                  }}
                >
                  <h4 className="font-semibold mb-2 text-gray-700">
                    Vocabulary Stats
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>Total words: {totalWords.toLocaleString()}</li>
                    <li>Difficulty 1: ~{Math.round(totalWords * 0.2).toLocaleString()} words</li>
                    <li>Difficulty 2: ~{Math.round(totalWords * 0.2).toLocaleString()} words</li>
                    <li>Difficulty 3: ~{Math.round(totalWords * 0.2).toLocaleString()} words</li>
                    <li>Difficulty 4: ~{Math.round(totalWords * 0.2).toLocaleString()} words</li>
                    <li>Difficulty 5: ~{Math.round(totalWords * 0.2).toLocaleString()} words</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - full variant */}
      <Footer variant="full" />
    </div>
  );
}
