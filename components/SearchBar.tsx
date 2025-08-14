import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

interface SearchBarProps {
  onSearch: (account: string) => void
  loading: boolean
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative transition-all">
        <div className="relative modern-card p-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter account URL (e.g., acc://RenatoDAP.acme)"
            className="input-field pl-12 pr-32"
            disabled={loading}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {loading ? (
              <Loader2 className="w-5 h-5 text-blue animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-tertiary" />
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="body">
          Quick access: {' '}
          <span 
            className="text-blue font-medium cursor-pointer hover:opacity-75 transition-all" 
            onClick={() => setInput('acc://RenatoDAP.acme')}
          >
            RenatoDAP.acme
          </span>
          {' • '}
          <span 
            className="text-blue font-medium cursor-pointer hover:opacity-75 transition-all" 
            onClick={() => setInput('acc://DefiDevs.acme')}
          >
            DefiDevs.acme
          </span>
        </p>
      </div>
    </form>
  )
}