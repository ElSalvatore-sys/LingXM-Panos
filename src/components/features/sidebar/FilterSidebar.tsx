import {
  SlidersHorizontalIcon,
  TypeIcon,
  TextCursorIcon,
  HashIcon,
  ZapIcon,
  GlobeIcon,
  BookOpenIcon,
  TrendingUpIcon,
  SettingsIcon,
} from 'lucide-react';
import type { LanguageCode, SearchFilters } from '@/types';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import {
  DifficultyFilterSidebar,
  PartOfSpeechFilter,
  GenderFilter,
  RangeSlider,
  QuickFilters,
} from '../filters';
import {
  LanguageSwitcher,
  LearningModeToggle,
  ProgressSummary,
  SettingsPanel,
  PremiumTeaser,
  type LearningMode,
} from './index';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface PartOfSpeechOption {
  value: string;
  label: string;
  count: number;
}

interface GenderOption {
  value: 'm' | 'f' | 'n';
  label: string;
  count: number;
}

interface FilterSidebarProps {
  // Filter state
  filters: SearchFilters;
  pendingFilters: SearchFilters;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  hasChanges: boolean;

  // Filter options
  partOfSpeechOptions: PartOfSpeechOption[];
  genderOptions: GenderOption[];
  wordLengthRange: { min: number; max: number };
  frequencyRange: { min: number; max: number };

  // Progress counts
  bookmarkedCount: number;
  learnedCount: number;
  withExamplesCount: number;

  // Language settings
  nativeLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  onNativeLanguageChange: (lang: LanguageCode) => void;
  onTargetLanguageChange: (lang: LanguageCode) => void;
  onSwapLanguages: () => void;

  // Learning mode
  learningMode: LearningMode;
  onLearningModeChange: (mode: LearningMode) => void;

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

  // Show gender filter (only for German)
  showGenderFilter?: boolean;

  className?: string;
}

export function FilterSidebar({
  filters: _filters, // Used for comparison logic, pendingFilters shown to user
  pendingFilters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  hasChanges,
  partOfSpeechOptions,
  genderOptions,
  wordLengthRange,
  frequencyRange,
  bookmarkedCount,
  learnedCount,
  withExamplesCount,
  nativeLanguage,
  targetLanguage,
  onNativeLanguageChange,
  onTargetLanguageChange,
  onSwapLanguages,
  learningMode,
  onLearningModeChange,
  streak,
  wordsLearned,
  todayProgress,
  dailyGoal,
  showTranslations,
  onShowTranslationsChange,
  autoPlayAudio,
  onAutoPlayAudioChange,
  onDailyGoalChange,
  showGenderFilter = false,
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

        {/* Learning Mode */}
        <CollapsibleSection
          title={t('sidebar.learningMode')}
          icon={<BookOpenIcon className="w-4 h-4" />}
          defaultOpen={true}
        >
          <LearningModeToggle
            mode={learningMode}
            onChange={onLearningModeChange}
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

        {/* Difficulty Filter */}
        <CollapsibleSection
          title={t('difficulty')}
          icon={<SlidersHorizontalIcon className="w-4 h-4" />}
          defaultOpen={true}
          badge={pendingFilters.difficulty.length < 5 ? pendingFilters.difficulty.length : undefined}
        >
          <DifficultyFilterSidebar
            selected={pendingFilters.difficulty}
            onChange={(levels) => onFilterChange({ difficulty: levels })}
          />
        </CollapsibleSection>

        {/* Part of Speech */}
        <CollapsibleSection
          title={t('sidebar.partOfSpeech')}
          icon={<TypeIcon className="w-4 h-4" />}
          defaultOpen={false}
          badge={pendingFilters.partOfSpeech.length > 0 ? pendingFilters.partOfSpeech.length : undefined}
        >
          <PartOfSpeechFilter
            options={partOfSpeechOptions}
            selected={pendingFilters.partOfSpeech}
            onChange={(values) => onFilterChange({ partOfSpeech: values })}
          />
        </CollapsibleSection>

        {/* Gender (only for German) */}
        {showGenderFilter && (
          <CollapsibleSection
            title={t('sidebar.gender')}
            icon={<TextCursorIcon className="w-4 h-4" />}
            defaultOpen={false}
            badge={pendingFilters.gender.length > 0 ? pendingFilters.gender.length : undefined}
          >
            <GenderFilter
              options={genderOptions}
              selected={pendingFilters.gender}
              onChange={(values) => onFilterChange({ gender: values })}
            />
          </CollapsibleSection>
        )}

        {/* Word Length */}
        <CollapsibleSection
          title={t('sidebar.wordLength')}
          icon={<TextCursorIcon className="w-4 h-4" />}
          defaultOpen={false}
        >
          <RangeSlider
            min={wordLengthRange.min}
            max={wordLengthRange.max}
            minValue={pendingFilters.wordLengthMin}
            maxValue={pendingFilters.wordLengthMax}
            onChange={(min, max) =>
              onFilterChange({ wordLengthMin: min, wordLengthMax: max })
            }
            formatLabel={(v) => `${v} chars`}
          />
        </CollapsibleSection>

        {/* Frequency */}
        <CollapsibleSection
          title={t('sidebar.frequencyRank')}
          icon={<HashIcon className="w-4 h-4" />}
          defaultOpen={false}
        >
          <RangeSlider
            min={frequencyRange.min}
            max={frequencyRange.max}
            minValue={pendingFilters.frequencyMin}
            maxValue={pendingFilters.frequencyMax}
            onChange={(min, max) =>
              onFilterChange({ frequencyMin: min, frequencyMax: max })
            }
            step={100}
            formatLabel={(v) => `#${v.toLocaleString()}`}
          />
        </CollapsibleSection>

        {/* Quick Filters */}
        <CollapsibleSection
          title={t('sidebar.quickFilters')}
          icon={<ZapIcon className="w-4 h-4" />}
          defaultOpen={false}
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

        {/* Divider */}
        <div className="h-2 bg-gray-50" />

        {/* Settings */}
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

        {/* Premium Teaser */}
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
