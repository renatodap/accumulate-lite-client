export interface AccountInfo {
  url: string
  type: string
  tokenBalance?: string
  creditBalance?: number
  timestamp?: number
  proof?: ProofData
}

export interface ProofData {
  accountHash: string
  mainStateHash: string
  secondaryStateHash: string
  chainsHash: string
  pendingHash: string
  bptHash: string
  verified: boolean
  steps: ProofStep[]
  performance?: PerformanceMetrics
}

export interface ProofStep {
  level: number
  type: 'account' | 'bvn' | 'dn' | 'anchor'
  description: string
  hash: string
  timestamp?: number
  details?: Record<string, unknown>
}

export interface PerformanceMetrics {
  queryTime: number
  proofSize: number
  bandwidthUsed: number
  comparisonToFullNode: {
    storageReduction: number // percentage
    bandwidthReduction: number // percentage
    syncTimeReduction: number // percentage
  }
}

export interface QueryResult {
  account: AccountInfo
  proof: ProofData
  rawResponse?: unknown
  timestamp: number
}

export type ViewMode = 'normal' | 'developer'

export interface OfflineData {
  accounts: Map<string, QueryResult>
  lastUpdated: number
}