import { Link, useSearchParams } from 'react-router-dom'
import { FlameIcon, BookOpenIcon, BookmarkIcon, TargetIcon } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface StatsBarProps {
  currentStreak: number
  wordsLearned: number
  bookmarkedCount: number
  todayProgress: number
  dailyGoal: number
}

export function StatsBar({
  currentStreak,
  wordsLearned,
  bookmarkedCount,
  todayProgress,
  dailyGoal,
}: StatsBarProps) {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const toLang = searchParams.get('to') || 'de'
  const progressPercent = Math.min(100, (todayProgress / dailyGoal) * 100)

  const linkClass = 'flex items-center gap-2 hover:bg-lingxm-blue/10 px-2 py-1 rounded-md transition-colors cursor-pointer'

  return (
    <div
      className="bg-gradient-to-r from-lingxm-blue/5 to-lingxm-blue/10 border border-lingxm-blue/20 rounded-lg px-4 py-3 mb-6"
      style={{
        fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
      }}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Streak */}
        <div className="flex items-center gap-2">
          <FlameIcon
            className={`w-5 h-5 ${currentStreak > 0 ? 'text-orange-500' : 'text-gray-400'}`}
          />
          <span className="text-sm font-medium">
            {t('dayStreak', { count: currentStreak })}
          </span>
        </div>

        {/* Words Learned - clickable */}
        <Link to={`/learned?to=${toLang}`} className={linkClass}>
          <BookOpenIcon className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium">
            {t('wordsLearned', { count: wordsLearned })}
          </span>
        </Link>

        {/* Bookmarked - clickable */}
        <Link to={`/bookmarks?to=${toLang}`} className={linkClass}>
          <BookmarkIcon className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">
            {t('bookmarked', { count: bookmarkedCount })}
          </span>
        </Link>

        {/* Today's Progress */}
        <div className="flex items-center gap-3">
          <TargetIcon className="w-5 h-5 text-lingxm-blue" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {t('todayProgress', { count: todayProgress, goal: dailyGoal })}
            </span>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-lingxm-blue rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
