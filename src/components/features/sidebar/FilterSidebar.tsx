import {
  ListIcon,
  ZapIcon,
  GlobeIcon,
  TrendingUpIcon,
  SettingsIcon,
  BookOpenIcon,
} from 'lucide-react';
import type { LanguageCode, SearchFilters } from '@/types';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import { WordRangeFilter, QuickFilters } from '../filters';
import {
  LanguageSwitcher,
  ProgressSummary,
  SettingsPanel,
  PremiumTeaser,
  PremiumPackages,
} from './index';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface FilterSidebarProps {
  // Filter state
  filters: SearchFilters;
  pendingFilters: SearchFilters;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  hasChanges: boolean;

  // Progress counts
  bookmarkedCount: number;
  learnedCount: number;
  withExamplesCount: number;
  totalWords: number;

  // Language settings
  nativeLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  onNativeLanguageChange: (lang: LanguageCode) => void;
  onTargetLanguageChange: (lang: LanguageCode) => void;
  onSwapLanguages: () => void;

  // Progress stats
  streak: number;
  wordsLearned: number;
  todayProgress: number;
  dailyGoal: number;

  // Settings
  showTranslations: boolean;
  onShowTranslationsChange: (show: boolean) => void;
  autoPlayAudio: boolean;
  onAutoPlayAudioChange: (autoPlay: boolean) => void;
  onDailyGoalChange: (goal: number) => void;

  className?: string;
}

export function FilterSidebar({
  filters: _filters,
  pendingFilters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  hasChanges,
  bookmarkedCount,
  learnedCount,
  withExamplesCount,
  totalWords,
  nativeLanguage,
  targetLanguage,
  onNativeLanguageChange,
  onTargetLanguageChange,
  onSwapLanguages,
  streak,
  wordsLearned,
  todayProgress,
  dailyGoal,
  showTranslations,
  onShowTranslationsChange,
  autoPlayAudio,
  onAutoPlayAudioChange,
  onDailyGoalChange,
  className,
}: FilterSidebarProps) {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'w-[260px] bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden',
        className
      )}
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Language Switcher */}
        <CollapsibleSection
          title={t('sidebar.languages')}
          icon={<GlobeIcon className="w-4 h-4" />}
          defaultOpen={true}
        >
          <LanguageSwitcher
            nativeLanguage={nativeLanguage}
            targetLanguage={targetLanguage}
            onNativeChange={onNativeLanguageChange}
            onTargetChange={onTargetLanguageChange}
            onSwap={onSwapLanguages}
          />
        </CollapsibleSection>

        {/* Progress Summary */}
        <CollapsibleSection
          title={t('sidebar.progress')}
          icon={<TrendingUpIcon className="w-4 h-4" />}
          defaultOpen={true}
        >
          <ProgressSummary
            streak={streak}
            wordsLearned={wordsLearned}
            bookmarkedCount={bookmarkedCount}
            todayProgress={todayProgress}
            dailyGoal={dailyGoal}
          />
        </CollapsibleSection>

        {/* Divider */}
        <div className="h-2 bg-gray-50" />

        {/* Word Range Filter */}
        <CollapsibleSection
          title={t('sidebar.wordRange')}
          icon={<ListIcon className="w-4 h-4" />}
          defaultOpen={true}
          badge={pendingFilters.wordLimit !== 1000 && pendingFilters.wordLimit !== Infinity ? 1 : undefined}
        >
          <WordRangeFilter
            value={pendingFilters.wordLimit}
            onChange={(limit) => onFilterChange({ wordLimit: limit })}
            totalWords={totalWords}
          />
        </CollapsibleSection>

        {/* Quick Filters */}
        <CollapsibleSection
          title={t('sidebar.quickFilters')}
          icon={<ZapIcon className="w-4 h-4" />}
          defaultOpen={true}
        >
          <QuickFilters
            hasExamples={pendingFilters.hasExamples}
            bookmarkedOnly={pendingFilters.bookmarkedOnly}
            notLearnedOnly={pendingFilters.notLearnedOnly}
            onHasExamplesChange={(value) => onFilterChange({ hasExamples: value })}
            onBookmarkedOnlyChange={(value) => onFilterChange({ bookmarkedOnly: value })}
            onNotLearnedOnlyChange={(value) => onFilterChange({ notLearnedOnly: value })}
            bookmarkedCount={bookmarkedCount}
            learnedCount={learnedCount}
            withExamplesCount={withExamplesCount}
          />
        </CollapsibleSection>

        {/* Specialized Vocabulary / Premium Packages */}
        <CollapsibleSection
          title={t('sidebar.specializedVocabulary')}
          icon={<BookOpenIcon className="w-4 h-4" />}
          defaultOpen={false}
        >
          <PremiumPackages />
        </CollapsibleSection>

        {/* Divider */}
        <div className="h-2 bg-gray-50" />

        {/* Settings - at bottom */}
        <CollapsibleSection
          title={t('sidebar.settings')}
          icon={<SettingsIcon className="w-4 h-4" />}
          defaultOpen={false}
        >
          <SettingsPanel
            dailyGoal={dailyGoal}
            onDailyGoalChange={onDailyGoalChange}
            showTranslations={showTranslations}
            onShowTranslationsChange={onShowTranslationsChange}
            autoPlayAudio={autoPlayAudio}
            onAutoPlayAudioChange={onAutoPlayAudioChange}
          />
        </CollapsibleSection>

        {/* Premium Teaser - at very bottom */}
        <div className="p-4">
          <PremiumTeaser />
        </div>
      </div>

      {/* Apply Filters Button (sticky footer) */}
      {hasChanges && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <button
              onClick={onResetFilters}
              className="flex-1 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {t('sidebar.reset')}
            </button>
            <button
              onClick={onApplyFilters}
              className={cn(
                'flex-1 py-2 rounded-lg text-sm font-medium',
                'bg-[#7b9dd2] text-white hover:bg-[#6a8cc1]',
                'transition-colors shadow-sm'
              )}
            >
              {t('sidebar.applyFilters')}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
