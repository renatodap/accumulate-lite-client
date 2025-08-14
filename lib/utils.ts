import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatHash(hash: string, length: number = 8): string {
  if (!hash) return ''
  return `${hash.slice(0, length)}...${hash.slice(-length)}`
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString()
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}