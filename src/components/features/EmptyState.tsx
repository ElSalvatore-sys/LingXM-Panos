import { BookmarkIcon, BookOpenIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

type EmptyStateType = 'bookmarks' | 'learned' | 'search'

interface EmptyStateProps {
  type: EmptyStateType
  message: string
  actionLabel?: string
  actionLink?: string
}

const iconMap: Record<EmptyStateType, React.ReactNode> = {
  bookmarks: <BookmarkIcon className="w-16 h-16 text-gray-300" />,
  learned: <BookOpenIcon className="w-16 h-16 text-gray-300" />,
  search: <SearchIcon className="w-16 h-16 text-gray-300" />,
}

export function EmptyState({ type, message, actionLabel, actionLink }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6 opacity-50">
        {iconMap[type]}
      </div>
      <p
        className="text-gray-500 text-center max-w-md mb-6"
        style={{
          fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
          fontSize: '16px',
        }}
      >
        {message}
      </p>
      {actionLabel && actionLink && (
        <Button asChild variant="default" className="bg-lingxm-blue hover:bg-lingxm-blue/90">
          <Link to={actionLink}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  )
}
