import { type ViewMode } from '@/lib/types'

interface ModeToggleProps {
  mode: ViewMode
  onModeChange: (mode: ViewMode) => void
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="mode-toggle">
      <button
        onClick={() => onModeChange('normal')}
        className={mode === 'normal' ? 'active' : ''}
      >
        Normal
      </button>
      <button
        onClick={() => onModeChange('developer')}
        className={mode === 'developer' ? 'active' : ''}
      >
        Developer
      </button>
    </div>
  )
}