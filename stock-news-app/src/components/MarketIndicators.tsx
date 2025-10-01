'use client'

import { useEffect, useState } from 'react'

interface Indicator {
  indicator_type: string
  value: number
  change_value: number
  change_percent: number
  recorded_at: string
}

const INDICATOR_NAMES: Record<string, string> = {
  GSPC: 'S&P 500',
  IXIC: 'NASDAQ',
  DJI: 'Dow Jones',
  VIX: 'VIX',
}

export default function MarketIndicators() {
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchIndicators() {
      try {
        const response = await fetch('/api/market-indicators')
        if (!response.ok) throw new Error('Failed to fetch indicators')
        const data = await response.json()
        setIndicators(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchIndicators()
    const interval = setInterval(fetchIndicators, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {indicators.map((indicator) => {
        const isPositive = indicator.change_value >= 0
        return (
          <div
            key={indicator.indicator_type}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {INDICATOR_NAMES[indicator.indicator_type] || indicator.indicator_type}
            </h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {indicator.value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p
              className={`text-sm font-medium ${
                isPositive
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {isPositive ? '↑' : '↓'} {Math.abs(indicator.change_value).toFixed(2)} (
              {Math.abs(indicator.change_percent).toFixed(2)}%)
            </p>
          </div>
        )
      })}
    </div>
  )
}
