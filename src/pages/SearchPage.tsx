import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { LanguageCode, Word, WordDetail } from '@/types';
import { Header, Footer } from '@/components/layout';
import {
  SearchInput,
  ResultsList,
  SearchTips,
  StatsBar,
  WordDetailModal,
  FilterSidebar,
  MobileFilterDrawer,
  MobileFilterButton,
} from '@/components/features';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useTranslation } from '@/hooks/useTranslation';
import { useProgress } from '@/hooks/useProgress';
import { useFilters } from '@/hooks/useFilters';
import { useApp } from '@/contexts/AppContext';
import { languages } from '@/lib/languages';
import { getWordDetailsAsync } from '@/lib/wordDetails';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    siteLanguage,
    nativeLanguage,
    targetLanguage,
    setNativeLanguage,
    setTargetLanguage,
  } = useApp();

  // Get languages from URL params or context
  const fromLang = (searchParams.get('from') || nativeLanguage) as LanguageCode;
  const toLang = (searchParams.get('to') || targetLanguage) as LanguageCode;

  // Track previous language to detect changes
  const prevLangRef = useRef(toLang);

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Word[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Settings state
  const [showTranslations, setShowTranslations] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  // Clear results when language changes
  useEffect(() => {
    if (prevLangRef.current !== toLang) {
      setResults([]);
      setHasSearched(false);
      setSearchQuery('');
      prevLangRef.current = toLang;
    }
  }, [toLang]);

  // Modal state
  const [selectedWord, setSelectedWord] = useState<WordDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load vocabulary for target language
  const {
    isLoading,
    error,
    advancedSearch,
    totalWords,
    languageName,
    filterStats,
    wordsWithExamples,
  } = useVocabulary(toLang);

  // Progress tracking
  const {
    currentStreak,
    dailyGoal,
    todayProgress,
    wordsLearned,
    bookmarkedCount,
    learnedWordIds,
    bookmarkedWordIds,
    addLearnedWord,
    removeLearnedWord,
    addBookmark,
    removeBookmark,
    isWordLearned,
    isWordBookmarked,
    setDailyGoal,
  } = useProgress(toLang);

  // Filters
  const {
    filters,
    pendingFilters,
    updatePendingFilters,
    applyFilters,
    resetFilters,
    hasChanges,
    activeFiltersCount,
  } = useFilters();

  // Convert arrays to Sets for efficient lookup
  const learnedWordIdsSet = useMemo(() => new Set(learnedWordIds), [learnedWordIds]);
  const bookmarkedWordIdsSet = useMemo(() => new Set(bookmarkedWordIds), [bookmarkedWordIds]);

  // Search handler with filters
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const searchResults = advancedSearch(searchQuery, filters, {
      learnedWordIds: learnedWordIdsSet,
      bookmarkedWordIds: bookmarkedWordIdsSet,
      wordsWithExamples,
    });
    setResults(searchResults);
    setHasSearched(true);
  };

  // Re-search when filters are applied
  useEffect(() => {
    if (hasSearched && searchQuery.trim()) {
      const searchResults = advancedSearch(searchQuery, filters, {
        learnedWordIds: learnedWordIdsSet,
        bookmarkedWordIds: bookmarkedWordIdsSet,
        wordsWithExamples,
      });
      setResults(searchResults);
    }
  }, [filters, hasSearched, searchQuery, advancedSearch, learnedWordIdsSet, bookmarkedWordIdsSet, wordsWithExamples]);

  // Handle result click - open modal with word details
  const handleResultClick = async (id: number) => {
    const word = results.find((w) => w.id === id);
    if (word) {
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

  // Language handlers
  const handleNativeLanguageChange = (lang: LanguageCode) => {
    setNativeLanguage(lang);
    navigate(`/search?from=${lang}&to=${toLang}`);
  };

  const handleTargetLanguageChange = (lang: LanguageCode) => {
    setTargetLanguage(lang);
    navigate(`/search?from=${fromLang}&to=${lang}`);
  };

  const handleSwapLanguages = () => {
    setNativeLanguage(toLang);
    setTargetLanguage(fromLang);
    navigate(`/search?from=${toLang}&to=${fromLang}`);
  };

  // Convert Word[] to ResultsList format
  const resultsForDisplay = results.map((word) => ({
    id: word.id,
    sentence: `${word.word} (rank #${word.rank}, frequency: ${word.frequency.toLocaleString()})`,
    highlightWord: word.word,
  }));

  // Sidebar content (shared between desktop and mobile)
  const sidebarContent = (
    <FilterSidebar
      filters={filters}
      pendingFilters={pendingFilters}
      onFilterChange={updatePendingFilters}
      onApplyFilters={() => {
        applyFilters();
        setIsMobileDrawerOpen(false);
      }}
      onResetFilters={resetFilters}
      hasChanges={hasChanges}
      bookmarkedCount={bookmarkedCount}
      learnedCount={wordsLearned}
      withExamplesCount={wordsWithExamples.size}
      totalWords={totalWords}
      nativeLanguage={fromLang}
      targetLanguage={toLang}
      onNativeLanguageChange={handleNativeLanguageChange}
      onTargetLanguageChange={handleTargetLanguageChange}
      onSwapLanguages={handleSwapLanguages}
      streak={currentStreak}
      wordsLearned={wordsLearned}
      todayProgress={todayProgress}
      dailyGoal={dailyGoal}
      showTranslations={showTranslations}
      onShowTranslationsChange={setShowTranslations}
      autoPlayAudio={autoPlayAudio}
      onAutoPlayAudioChange={setAutoPlayAudio}
      onDailyGoalChange={setDailyGoal}
    />
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - blue variant */}
      <Header variant="blue" showFlagSelector />

      {/* Main layout with sidebar */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">{sidebarContent}</div>

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
        >
          {sidebarContent}
        </MobileFilterDrawer>

        {/* Main content */}
        <main className="flex-1 py-8 px-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Mobile filter button */}
            <div className="lg:hidden mb-4">
              <MobileFilterButton
                onClick={() => setIsMobileDrawerOpen(true)}
                activeFiltersCount={activeFiltersCount}
              />
            </div>

            {/* Language indicator */}
            <div
              className="mb-6 flex items-center gap-2"
              style={{
                fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
                fontSize: '14px',
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

            {/* Stats Bar - hide on desktop (shown in sidebar) */}
            <div className="lg:hidden">
              <StatsBar
                currentStreak={currentStreak}
                wordsLearned={wordsLearned}
                bookmarkedCount={bookmarkedCount}
                todayProgress={todayProgress}
                dailyGoal={dailyGoal}
              />
            </div>

            {/* Loading/Error states */}
            {isLoading && (
              <div className="mb-6 text-gray-500">{t('loading')}</div>
            )}

            {error && (
              <div className="mb-6 text-red-500">Error: {error}</div>
            )}

            {/* Search input */}
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder={`${t('searchPlaceholder')} ${languageName || ''}...`}
              targetLanguage={toLang}
              className="mb-6"
            />

            {/* Results */}
            {hasSearched ? (
              <>
                <div
                  className="mb-4 text-gray-600"
                  style={{
                    fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
                    fontSize: '14px',
                  }}
                >
                  {results.length > 0
                    ? t('foundWords', { count: results.length, query: searchQuery })
                    : t('noResults', { query: searchQuery })}
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 text-[#7b9dd2]">
                      ({activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active)
                    </span>
                  )}
                </div>
                <ResultsList
                  results={resultsForDisplay}
                  onResultClick={handleResultClick}
                  title={results.length > 0 ? t('results') : undefined}
                  targetLanguage={toLang}
                />
              </>
            ) : (
              <div className="flex gap-8">
                <div className="flex-1">
                  <div
                    className="text-gray-500 italic"
                    style={{
                      fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
                      fontSize: '16px',
                    }}
                  >
                    {t('enterPhrase')}
                  </div>
                </div>

                {/* Search Tips - only show when no search */}
                <div className="hidden lg:block w-[280px] pl-6 border-l border-gray-200">
                  <SearchTips />

                  {/* Quick stats */}
                  {!isLoading && (
                    <div
                      className="mt-8 p-4 bg-gray-50 rounded-lg"
                      style={{
                        fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
                        fontSize: '13px',
                      }}
                    >
                      <h4 className="font-semibold mb-2 text-gray-700">
                        {t('vocabularyStats')}
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>
                          {t('totalWords')}: {totalWords.toLocaleString()}
                        </li>
                        {filterStats?.difficultyDistribution && (
                          <>
                            <li>
                              {t('difficulty')} 1:{' '}
                              {filterStats.difficultyDistribution[1]?.toLocaleString() || 0}
                            </li>
                            <li>
                              {t('difficulty')} 2:{' '}
                              {filterStats.difficultyDistribution[2]?.toLocaleString() || 0}
                            </li>
                            <li>
                              {t('difficulty')} 3:{' '}
                              {filterStats.difficultyDistribution[3]?.toLocaleString() || 0}
                            </li>
                            <li>
                              {t('difficulty')} 4:{' '}
                              {filterStats.difficultyDistribution[4]?.toLocaleString() || 0}
                            </li>
                            <li>
                              {t('difficulty')} 5:{' '}
                              {filterStats.difficultyDistribution[5]?.toLocaleString() || 0}
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

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
