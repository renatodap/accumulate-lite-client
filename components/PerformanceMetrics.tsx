import { type PerformanceMetrics as Metrics } from '@/lib/types'

interface PerformanceMetricsProps {
  metrics?: Metrics
  animated?: boolean
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  if (!metrics) return null

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return (
    <div className="modern-card p-8">
      <h2 className="title-1 mb-8">Performance Metrics</h2>

      {/* Main Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="display-2 text-blue number-display">{metrics.queryTime}</div>
          <p className="caption mt-2">Milliseconds</p>
        </div>
        <div className="text-center">
          <div className="display-2 text-primary number-display">
            {formatBytes(metrics.proofSize).split(' ')[0]}
          </div>
          <p className="caption mt-2">
            {formatBytes(metrics.proofSize).split(' ')[1]} Proof
          </p>
        </div>
        <div className="text-center">
          <div className="display-2 text-primary number-display">
            {formatBytes(metrics.bandwidthUsed).split(' ')[0]}
          </div>
          <p className="caption mt-2">
            {formatBytes(metrics.bandwidthUsed).split(' ')[1]} Used
          </p>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="pt-8 border-t">
        <h3 className="title-2 mb-6">Advantage vs Full Node</h3>
        
        <div className="space-y-4">
          {/* Storage */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-medium text-primary">Storage Reduction</span>
              <span className="font-bold text-green number-display">
                {metrics.comparisonToFullNode.storageReduction.toFixed(1)}%
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${metrics.comparisonToFullNode.storageReduction}%`, background: 'linear-gradient(90deg, #00D46A, #00A050)' }}
              />
            </div>
          </div>

          {/* Bandwidth */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-medium text-primary">Bandwidth Savings</span>
              <span className="font-bold text-blue number-display">
                {metrics.comparisonToFullNode.bandwidthReduction.toFixed(1)}%
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${metrics.comparisonToFullNode.bandwidthReduction}%` }}
              />
            </div>
          </div>

          {/* Sync Time */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-medium text-primary">Sync Speed Improvement</span>
              <span className="font-bold text-blue number-display">
                {metrics.comparisonToFullNode.syncTimeReduction.toFixed(1)}%
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${metrics.comparisonToFullNode.syncTimeReduction}%`, background: 'linear-gradient(90deg, #7C3AED, #A855F7)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}