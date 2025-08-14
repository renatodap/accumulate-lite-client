import { type AccountInfo, type ViewMode } from '@/lib/types'

interface AccountDisplayProps {
  account: AccountInfo
  mode: ViewMode
}

export function AccountDisplay({ account, mode }: AccountDisplayProps) {
  return (
    <div className="modern-card p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="title-1">Account Details</h2>
        <span className="status-pill">
          {account.type}
        </span>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="caption">URL</label>
          <p className="font-mono text-primary mt-1 break-all">{account.url}</p>
        </div>
        
        {account.tokenBalance && (
          <div>
            <label className="caption">Balance</label>
            <div className="mt-2">
              <span className="display-2 text-blue number-display">
                {(parseInt(account.tokenBalance) / 1e8).toLocaleString()}
              </span>
              <span className="body ml-2">ACME</span>
            </div>
          </div>
        )}
        
        {account.creditBalance !== undefined && (
          <div>
            <label className="caption">Credits</label>
            <p className="title-1 text-primary mt-1 number-display">
              {account.creditBalance.toLocaleString()}
            </p>
          </div>
        )}
        
        {mode === 'developer' && account.timestamp && (
          <div>
            <label className="caption">Timestamp</label>
            <p className="font-mono text-secondary mt-1">
              {new Date(account.timestamp * 1000).toISOString()}
            </p>
          </div>
        )}
      </div>

      {account.proof?.verified && (
        <div className="mt-8 pt-6 border-t">
          <div className="flex items-center gap-3">
            <span className="status-dot status-online" />
            <span className="font-semibold text-green">
              Cryptographically Verified
            </span>
          </div>
        </div>
      )}
    </div>
  )
}