import { formatCurrency } from '../lib/calculations'

interface CostMultiplierProps {
  baseFTE: number
  attritionRate: number
  trainingWeeks: number
  salary: number
  actualCost: number
}

export default function CostMultiplier({
  baseFTE,
  attritionRate,
  trainingWeeks,
  salary,
  actualCost,
}: CostMultiplierProps) {
  const naiveCost = baseFTE * attritionRate * (trainingWeeks / 52) * salary
  const multiplier = naiveCost > 0 ? actualCost / naiveCost : 0

  return (
    <div className="bg-card border border-brand-500/30 rounded-lg p-5 relative overflow-hidden">
      {/* Decorative background ring */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-[6px] border-brand-500/10" />
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full border-[4px] border-brand-500/15" />

      <div className="relative">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1">
          The Hidden Multiplier
        </p>
        <p className="text-xs text-gray-300 mb-4">
          A simple calculation estimates attrition costs at{' '}
          <span className="text-gray-100 font-medium">{formatCurrency(naiveCost)}</span>.
          The true cost is:
        </p>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-5xl font-bold text-brand-400">{multiplier.toFixed(1)}x</span>
          <span className="text-sm text-gray-400">higher</span>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] text-gray-500">Simple estimate</div>
            <div className="text-sm font-semibold text-gray-400 line-through">
              {formatCurrency(naiveCost)}
            </div>
          </div>
          <div className="text-gray-600">→</div>
          <div>
            <div className="text-[10px] text-brand-400">Actual cost</div>
            <div className="text-sm font-bold text-brand-400">{formatCurrency(actualCost)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
