import { type ProofData, type ViewMode } from '@/lib/types'

interface ProofVisualizationProps {
  proof: ProofData
  mode: ViewMode
}

export function ProofVisualization({ proof, mode }: ProofVisualizationProps) {
  const components = [
    { name: 'Main State', hash: proof.mainStateHash, color: 'from-blue-400 to-blue-600' },
    { name: 'Secondary', hash: proof.secondaryStateHash, color: 'from-purple-400 to-purple-600' },
    { name: 'Chains', hash: proof.chainsHash, color: 'from-green-400 to-green-600' },
    { name: 'Pending', hash: proof.pendingHash, color: 'from-orange-400 to-orange-600' },
  ]

  const formatHash = (hash: string) => {
    if (!hash) return 'Empty'
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  if (mode === 'developer') {
    return (
      <div className="modern-card p-8">
        <h2 className="title-1 mb-8">Proof Structure (Developer)</h2>
        
        {/* BPT Formula */}
        <div className="bg-surface rounded-xl p-5 mb-8 font-mono text-sm">
          <div className="text-primary font-semibold mb-3">BPT Calculation Formula:</div>
          <div className="text-xs text-secondary leading-relaxed">
            BPT = MerkleHash(<br />
            &nbsp;&nbsp;SimpleHash(MainState),<br />
            &nbsp;&nbsp;MerkleHash(SecondaryState),<br />
            &nbsp;&nbsp;MerkleHash(Chains),<br />
            &nbsp;&nbsp;MerkleHash(Pending)<br />
            )
          </div>
        </div>

        {/* Component Hashes */}
        <div className="space-y-4 mb-8">
          {components.map((component, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 bg-surface rounded-lg border">
              <span className="font-medium text-primary">{component.name}:</span>
              <code className="text-xs text-secondary font-mono">
                {component.hash || '0x0000...0000'}
              </code>
            </div>
          ))}
        </div>

        {/* Final BPT */}
        <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-primary">Final BPT Hash:</span>
            <code className="font-mono text-blue font-bold">
              {formatHash(proof.bptHash)}
            </code>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modern-card p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="title-1">Cryptographic Proof Chain</h2>
        {proof.verified && (
          <span className="status-pill">
            <span className="status-dot status-online" />
            <span>Verified</span>
          </span>
        )}
      </div>

      {/* BPT Components - Beautiful Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {components.map((component, idx) => (
          <div key={idx} className="modern-card p-5 transition-all hover:shadow-lg">
            <div className="font-semibold text-primary mb-2">{component.name}</div>
            <code className="text-xs text-secondary font-mono">
              {formatHash(component.hash)}
            </code>
            <div className={`h-1 mt-3 rounded-full bg-gradient-to-r ${component.color}`} />
          </div>
        ))}
      </div>

      {/* Flow Indicator */}
      <div className="flex justify-center mb-8">
        <div className="text-2xl text-tertiary opacity-50">↓</div>
      </div>

      {/* Final BPT Hash - Highlighted */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
        <div className="text-center">
          <h3 className="title-2 mb-3">Final BPT Hash</h3>
          <code className="font-mono text-blue font-bold">
            {proof.bptHash}
          </code>
          <p className="body mt-3">
            Single hash proving complete account state
          </p>
        </div>
      </div>

      {/* Verification Path */}
      {proof.steps && proof.steps.length > 0 && (
        <div className="mt-8 pt-8 border-t">
          <h3 className="title-2 mb-6">Verification Path</h3>
          <div className="space-y-3">
            {proof.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-primary">{step.description}</p>
                  <code className="text-xs text-secondary font-mono">
                    {formatHash(step.hash)}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}