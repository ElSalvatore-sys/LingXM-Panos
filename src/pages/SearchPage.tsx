import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { LanguageCode, Word, WordDetail } from '@/types';
import { Header, Footer } from '@/components/layout';
import {
  SearchInput,
  DifficultyFilter,
  ResultsList,
  SearchTips,
  StatsBar,
  WordDetailModal,
} from '@/components/features';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useTranslation } from '@/hooks/useTranslation';
import { useProgress } from '@/hooks/useProgress';
import { useApp } from '@/contexts/AppContext';
import { languages } from '@/lib/languages';
import { getWordDetailsAsync } from '@/lib/wordDetails';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { siteLanguage } = useApp();

  // Get languages from URL params
  const fromLang = (searchParams.get('from') || 'el') as LanguageCode;
  const toLang = (searchParams.get('to') || 'de') as LanguageCode;

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState(5); // Show all difficulty levels by default
  const [contentLength, setContentLength] = useState(5);
  const [results, setResults] = useState<Word[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Modal state
  const [selectedWord, setSelectedWord] = useState<WordDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load vocabulary for target language
  const { isLoading, error, searchWords, totalWords, languageName } =
    useVocabulary(toLang);

  // Progress tracking
  const {
    currentStreak,
    dailyGoal,
    todayProgress,
    wordsLearned,
    bookmarkedCount,
    addLearnedWord,
    removeLearnedWord,
    addBookmark,
    removeBookmark,
    isWordLearned,
    isWordBookmarked,
  } = useProgress(toLang);

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

  // Handle result click - open modal with word details
  const handleResultClick = async (id: number) => {
    const word = results.find((w) => w.id === id);
    if (word) {
      // Open modal immediately with basic data, then load async data
      setIsModalOpen(true);
      const wordDetails = await getWordDetailsAsync(word, toLang);
      setSelectedWord(wordDetails);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWord(null);
  };

  // Handle bookmark toggle
  const handleToggleBookmark = (wordId: number) => {
    const currentlyBookmarked = isWordBookmarked(wordId);
    if (currentlyBookmarked) {
      removeBookmark(wordId);
    } else {
      addBookmark(wordId);
    }
  };

  // Handle learned toggle
  const handleToggleLearned = (wordId: number) => {
    const currentlyLearned = isWordLearned(wordId);
    if (currentlyLearned) {
      removeLearnedWord(wordId);
    } else {
      addLearnedWord(wordId);
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
            <span className="text-gray-600">{t('learning')}:</span>
            <img
              src={languages[toLang]?.flag}
              alt={languageName}
              className="w-6 h-auto rounded-sm"
            />
            <strong>{languageName || toLang.toUpperCase()}</strong>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-gray-600">{t('from')}:</span>
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
                  {totalWords.toLocaleString()} {t('wordsAvailable')}
                </span>
              </>
            )}
          </div>

          {/* Stats Bar */}
          <StatsBar
            currentStreak={currentStreak}
            wordsLearned={wordsLearned}
            bookmarkedCount={bookmarkedCount}
            todayProgress={todayProgress}
            dailyGoal={dailyGoal}
          />

          {/* Loading/Error states */}
          {isLoading && (
            <div className="mb-6 text-gray-500">
              {t('loading')}
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
                placeholder={`${t('searchPlaceholder')} ${languageName || ''}...`}
                targetLanguage={toLang}
                className="mb-6"
              />

              {/* Filters */}
              <div className="mb-8 space-y-3">
                <DifficultyFilter
                  label={t('maxDifficulty')}
                  value={difficulty}
                  onChange={setDifficulty}
                />
                <DifficultyFilter
                  label={t('contentLength')}
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
                      ? t('foundWords', { count: results.length, query: searchQuery })
                      : t('noResults', { query: searchQuery })}
                  </div>
                  <ResultsList
                    results={resultsForDisplay}
                    onResultClick={handleResultClick}
                    title={results.length > 0 ? t('results') : undefined}
                    targetLanguage={toLang}
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
                  {t('enterPhrase')}
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
                    {t('vocabularyStats')}
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>{t('totalWords')}: {totalWords.toLocaleString()}</li>
                    <li>{t('difficulty')} 1: ~{Math.round(totalWords * 0.2).toLocaleString()}</li>
                    <li>{t('difficulty')} 2: ~{Math.round(totalWords * 0.2).toLocaleString()}</li>
                    <li>{t('difficulty')} 3: ~{Math.round(totalWords * 0.2).toLocaleString()}</li>
                    <li>{t('difficulty')} 4: ~{Math.round(totalWords * 0.2).toLocaleString()}</li>
                    <li>{t('difficulty')} 5: ~{Math.round(totalWords * 0.2).toLocaleString()}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - full variant */}
      <Footer variant="full" />

      {/* Word Detail Modal */}
      <WordDetailModal
        word={selectedWord}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        targetLanguage={toLang}
        nativeLanguage={siteLanguage}
        isBookmarked={selectedWord ? isWordBookmarked(selectedWord.id) : false}
        isLearned={selectedWord ? isWordLearned(selectedWord.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onToggleLearned={handleToggleLearned}
      />
    </div>
  );
}
