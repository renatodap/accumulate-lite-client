import { useEffect, useState } from 'react'

interface LiveProofAnimationProps {
  isActive: boolean
}

export function LiveProofAnimation({ isActive }: LiveProofAnimationProps) {
  const [stage, setStage] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (!isActive) {
      setStage(0)
      return
    }

    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 6)
    }, 800)

    return () => clearInterval(interval)
  }, [isActive])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }))
    setParticles(newParticles)
  }, [])

  const stages = [
    { label: 'Fetching Account', color: 'from-blue-500 to-cyan-500' },
    { label: 'Extracting Main State', color: 'from-purple-500 to-pink-500' },
    { label: 'Computing Secondary', color: 'from-green-500 to-emerald-500' },
    { label: 'Processing Chains', color: 'from-orange-500 to-red-500' },
    { label: 'Merging Components', color: 'from-indigo-500 to-purple-500' },
    { label: 'Proof Complete', color: 'from-green-400 to-green-600' }
  ]

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none bg-primary">
      {/* Particle Background */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Central Animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Rotating Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-white/10 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '7s', animationDirection: 'reverse' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-white/30 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          {/* Central Core */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className={`absolute inset-0 bg-gradient-to-r ${stages[stage].color} rounded-full blur-3xl opacity-30 animate-pulse`} />
            <div className="relative z-10 text-center">
              <div className="display-1 text-white mb-4 number-display">
                {Math.min((stage + 1) * 16.67, 100).toFixed(0)}%
              </div>
              <div className="caption text-white/80">
                {stages[stage].label}
              </div>
            </div>
          </div>

          {/* Data Streams */}
          {stage > 0 && stage < 5 && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-32 bg-gradient-to-t from-transparent via-white/50 to-transparent animate-pulse" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-32 bg-gradient-to-l from-transparent via-white/50 to-transparent animate-pulse" />
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 progress-bar bg-black/20">
        <div 
          className={`progress-fill bg-gradient-to-r ${stages[stage].color} transition-all duration-800`}
          style={{ width: `${(stage + 1) * 16.67}%` }}
        />
      </div>
    </div>
  )
}