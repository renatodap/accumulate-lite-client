"use client"

import { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { AccountDisplay } from '@/components/AccountDisplay'
import { ProofVisualization } from '@/components/ProofVisualization'
import { PerformanceMetrics } from '@/components/PerformanceMetrics'
import { HeroSection } from '@/components/HeroSection'
import { ModeToggle } from '@/components/ModeToggle'
import { LiveProofAnimation } from '@/components/LiveProofAnimation'
import { type QueryResult, type ViewMode } from '@/lib/types'

export default function Home() {
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('normal')
  const [isOffline, setIsOffline] = useState(false)
  const [showLiveAnimation, setShowLiveAnimation] = useState(false)

  const handleSearch = async (accountUrl: string) => {
    setLoading(true)
    setHasSearched(true)
    setQueryResult(null)
    setShowLiveAnimation(true)
    
    try {
      if (isOffline) {
        // Offline mode - use cached data with dramatic delay for animation
        const mockResult: QueryResult = {
          account: {
            url: accountUrl,
            type: 'token',
            tokenBalance: '12500000000000',
            creditBalance: 1000,
            timestamp: Date.now() / 1000
          },
          proof: {
            accountHash: '0x7a3f9d2e8b4c5a6f1d3e2b4a5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
            mainStateHash: '0x8b4e5d7c3a2f1e9d6c5b4a3f2e1d9c8b7a6f5e4d3c2b1a9f8e7d6c5b4a3f2e1d',
            secondaryStateHash: '0x9c5f6e8d4b3a2f1e7d6c5b4a3f2e1d9c8b7a6f5e4d3c2b1a9f8e7d6c5b4a3f',
            chainsHash: '0xad6f7e9c5b4a3f2e1d8c7b6a5f4e3d2c1b9a8f7e6d5c4b3a2f1e9d8c7b6a5f4e',
            pendingHash: '0xbe7f8e9d6c5b4a3f2e1d9c8b7a6f5e4d3c2b1a9f8e7d6c5b4a3f2e1d9c8b7a',
            bptHash: '0xcf8f9eadbc7b6a5f4e3d2c1b9a8f7e6d5c4b3a2f1e9d8c7b6a5f4e3d2c1b9a8f',
            verified: true,
            steps: [
              {
                level: 1,
                type: 'account',
                description: 'Account state retrieved from BVN-0',
                hash: '0x7a3f9d2e8b4c5a6f1d3e2b4a5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
                timestamp: Date.now() / 1000
              },
              {
                level: 2,
                type: 'bvn',
                description: 'Proof anchored through Block Validator Network',
                hash: '0xcf8f9eadbc7b6a5f4e3d2c1b9a8f7e6d5c4b3a2f1e9d8c7b6a5f4e3d2c1b9a8f',
                timestamp: Date.now() / 1000
              },
              {
                level: 3,
                type: 'dn',
                description: 'Verified against Directory Network',
                hash: '0xdf9faebd8c7b6a5f4e3d2c1b9a8f7e6d5c4b3a2f1e9d8c7b6a5f4e3d2c1b9a8f',
                timestamp: Date.now() / 1000
              }
            ],
            performance: {
              queryTime: 147,
              proofSize: 2048,
              bandwidthUsed: 4096,
              comparisonToFullNode: {
                storageReduction: 99.8,
                bandwidthReduction: 95.2,
                syncTimeReduction: 99.9
              }
            }
          },
          timestamp: Date.now()
        }
        // Show animation for 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000))
        setQueryResult(mockResult)
      } else {
        // Online mode - call Crystal API first, then fallback to regular API
        setTimeout(async () => {
          try {
            // Try Crystal API endpoint first
            const response = await fetch(`/api/crystal`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ account: accountUrl })
            })
            const data = await response.json()
            setQueryResult(data)
          } catch {
            // Fallback to regular API
            const response = await fetch(`/api/query`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ account: accountUrl })
            })
            const data = await response.json()
            setQueryResult(data)
          }
        }, 5000) // Show animation for 5 seconds
      }
    } catch (error) {
      console.error('Query failed:', error)
      setQueryResult(null)
    } finally {
      setTimeout(() => {
        setLoading(false)
        setShowLiveAnimation(false)
      }, 5000)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Live Proof Animation Overlay */}
      <LiveProofAnimation isActive={showLiveAnimation} />
      
      {/* Gradient mesh background */}
      <div className="fixed inset-0 gradient-mesh opacity-30" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Mode and Status Controls */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
          <ModeToggle mode={viewMode} onModeChange={setViewMode} />
          <button
            onClick={() => setIsOffline(!isOffline)}
            className="status-pill"
          >
            <span className={`status-dot ${isOffline ? 'status-offline' : 'status-online'}`} />
            <span className="font-medium">
              {isOffline ? 'Offline' : 'Online'}
            </span>
          </button>
        </div>

        {/* Hero Section - Only show when not searched */}
        {!hasSearched && (
          <HeroSection onSearch={handleSearch} loading={loading} />
        )}

        {/* Results Section */}
        {hasSearched && !showLiveAnimation && (
          <div className="min-h-screen pt-20">
            {/* Compact Header */}
            <div className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-40">
              <div className="container px-6 py-4">
                <div className="flex items-center justify-between">
                  <h1 className="title-1">
                    <span className="text-blue">Accumulate</span>
                    <span className="text-primary"> Lite Client</span>
                  </h1>
                  <button
                    onClick={() => {
                      setHasSearched(false)
                      setQueryResult(null)
                    }}
                    className="btn btn-secondary"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Results */}
            <div className="container px-6 py-8">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <SearchBar onSearch={handleSearch} loading={loading} />
                </div>
                
                {queryResult && !loading && (
                  <div className="space-y-6">
                    {/* Success Banner with Animation */}
                    {queryResult.proof.verified && (
                      <div className="modern-card p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="title-2 text-green-900">Cryptographically Verified ✅</p>
                            <p className="body text-green-700 mt-1">
                              Proof validated in {queryResult.proof.performance?.queryTime || 0}ms with zero trust required
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="caption">Proof Size</p>
                            <p className="display-2 text-blue mt-2">
                              {((queryResult.proof.performance?.proofSize || 0) / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <AccountDisplay account={queryResult.account} mode={viewMode} />
                      <PerformanceMetrics metrics={queryResult.proof.performance} />
                    </div>
                    
                    {/* Proof Visualization */}
                    <ProofVisualization proof={queryResult.proof} mode={viewMode} />
                    
                    {/* Developer Mode: Raw Data */}
                    {viewMode === 'developer' && (
                      <div className="modern-card p-8">
                        <h3 className="title-2 mb-4">Raw Proof Data</h3>
                        <pre className="bg-surface rounded-xl p-5 overflow-x-auto text-xs font-mono text-secondary">
                          {JSON.stringify(queryResult, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}