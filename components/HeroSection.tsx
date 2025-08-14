import { useState, useEffect } from 'react'
import { SearchBar } from './SearchBar'

interface HeroSectionProps {
  onSearch: (account: string) => void
  loading: boolean
}

export function HeroSection({ onSearch, loading }: HeroSectionProps) {
  const [currentMetric, setCurrentMetric] = useState(0)
  
  const metrics = [
    { value: '147', unit: 'ms', label: 'Verification' },
    { value: '2', unit: 'KB', label: 'Proof Size' },
    { value: '99.8', unit: '%', label: 'Less Storage' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container w-full">
          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="display-1 mb-6">
              <span className="text-blue">Accumulate</span>
              <span className="text-primary"> Lite Client</span>
            </h1>
            
            <p className="display-2 text-secondary mb-6">
              Blockchain verification reimagined
            </p>
            
            <p className="body max-w-2xl mx-auto">
              Complete cryptographic proof in milliseconds.
              No infrastructure. No compromise.
            </p>
          </div>

          {/* Animated Metrics - Beautiful Cards */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex gap-6">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`modern-card p-6 transition-all ${
                    index === currentMetric 
                      ? 'scale-110 border-blue-200' 
                      : 'scale-100 opacity-80'
                  }`}
                >
                  <div className="text-center">
                    <div className="display-2 text-blue number-display mb-2">
                      {metric.value}
                      <span className="title-2 text-secondary font-normal ml-1">{metric.unit}</span>
                    </div>
                    <p className="caption">
                      {metric.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-20">
            <SearchBar onSearch={onSearch} loading={loading} />
          </div>

          {/* Key Features - Stunning Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
            <div className="modern-card p-6 text-center">
              <div className="display-2 text-blue mb-3">Fast</div>
              <p className="body">Sub-second verification with complete cryptographic proof</p>
            </div>
            <div className="modern-card p-6 text-center">
              <div className="display-2 text-blue mb-3">Light</div>
              <p className="body">2KB proofs enable blockchain on any device</p>
            </div>
            <div className="modern-card p-6 text-center">
              <div className="display-2 text-blue mb-3">Secure</div>
              <p className="body">Full BPT verification without running a node</p>
            </div>
          </div>

          {/* Applications - Clean List */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center title-1 mb-8">
              Revolutionary Applications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="modern-card p-5 border hover:border-blue-200 transition-all">
                <h3 className="title-2 text-primary mb-2">Genialt KYA</h3>
                <p className="body">AI agents with verifiable blockchain identity</p>
              </div>
              <div className="modern-card p-5 border hover:border-blue-200 transition-all">
                <h3 className="title-2 text-primary mb-2">Edge Computing</h3>
                <p className="body">IoT verification without infrastructure</p>
              </div>
              <div className="modern-card p-5 border hover:border-blue-200 transition-all">
                <h3 className="title-2 text-primary mb-2">Cross-Chain</h3>
                <p className="body">Instant bridge validation and verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}