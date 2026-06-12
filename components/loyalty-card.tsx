'use client'

import { useEffect, useState } from 'react'
import { Award, Gift } from 'lucide-react'

interface LoyaltyData {
  points: number
  tier: string
}

const tierColors = {
  bronze: 'bg-amber-100 text-amber-800',
  silver: 'bg-slate-100 text-slate-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800',
}

const tierThresholds = {
  bronze: { min: 0, max: 999 },
  silver: { min: 1000, max: 4999 },
  gold: { min: 5000, max: 9999 },
  platinum: { min: 10000, max: Infinity },
}

export function LoyaltyCard() {
  const [loyalty, setLoyalty] = useState<LoyaltyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLoyalty = async () => {
      try {
        const response = await fetch('/api/loyalty')
        if (response.ok) {
          const data = await response.json()
          setLoyalty(data)
        }
      } catch (error) {
        console.error('Error fetching loyalty:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLoyalty()
  }, [])

  if (isLoading || !loyalty) {
    return null
  }

  const tierColor = tierColors[loyalty.tier as keyof typeof tierColors] || tierColors.bronze
  const nextThreshold = Object.entries(tierThresholds).find(
    ([, range]) => loyalty.points < range.max
  )

  return (
    <div className={`rounded-lg p-6 ${tierColor}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award size={24} />
          <div>
            <p className="text-sm opacity-75">Loyalty Tier</p>
            <p className="text-xl font-bold capitalize">{loyalty.tier}</p>
          </div>
        </div>
        <Gift size={24} />
      </div>

      <div className="mb-4">
        <p className="text-sm opacity-75 mb-1">Points Balance</p>
        <p className="text-3xl font-bold">{loyalty.points.toLocaleString()}</p>
      </div>

      {nextThreshold && (
        <div>
          <p className="text-sm opacity-75 mb-2">Progress to next tier</p>
          <div className="bg-white/30 rounded-full h-2">
            <div
              className="bg-white/70 h-full rounded-full transition-all"
              style={{ width: `${Math.min((loyalty.points / nextThreshold[1].range.max) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs opacity-75 mt-1">
            {nextThreshold[1].range.max - loyalty.points} points to {nextThreshold[0]}
          </p>
        </div>
      )}
    </div>
  )
}
