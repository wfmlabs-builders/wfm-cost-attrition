import { formatDollars } from '../lib/calculations'

interface BudgetImpactBarProps {
  baseBudget: number
  trainingCosts: number
  onboardingCosts: number
  stpCosts: number
  attritionPct: number
}

export default function BudgetImpactBar({
  baseBudget,
  trainingCosts,
  onboardingCosts,
  stpCosts,
  attritionPct,
}: BudgetImpactBarProps) {
  const total = baseBudget + trainingCosts + onboardingCosts + stpCosts
  const basePct = total > 0 ? (baseBudget / total) * 100 : 100
  const trainPct = total > 0 ? (trainingCosts / total) * 100 : 0
  const onbPct = total > 0 ? (onboardingCosts / total) * 100 : 0
  const stpPctVal = total > 0 ? (stpCosts / total) * 100 : 0

  return (
    <div className="bg-card border border-card-border rounded-lg p-5">
      {/* Hero stat */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-200">Budget Impact</h3>
          <p className="text-[10px] text-gray-400">How attrition consumes your total budget</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-brand-400">{Math.round(attritionPct * 100)}%</div>
          <div className="text-[10px] text-gray-400">of budget is attrition</div>
        </div>
      </div>

      {/* Stacked bar */}
      <div className="relative h-10 rounded-lg overflow-hidden flex">
        <div
          className="bg-gray-600 flex items-center justify-center transition-all duration-500"
          style={{ width: `${basePct}%` }}
        >
          <span className="text-[10px] font-semibold text-gray-200 truncate px-1">
            Base {Math.round(basePct)}%
          </span>
        </div>
        <div
          className="bg-brand-500 flex items-center justify-center transition-all duration-500"
          style={{ width: `${trainPct}%` }}
        >
          {trainPct > 5 && (
            <span className="text-[10px] font-semibold text-white truncate px-1">
              {Math.round(trainPct)}%
            </span>
          )}
        </div>
        <div
          className="bg-teal-500 flex items-center justify-center transition-all duration-500"
          style={{ width: `${onbPct}%` }}
        >
          {onbPct > 4 && (
            <span className="text-[10px] font-semibold text-white truncate px-1">
              {Math.round(onbPct)}%
            </span>
          )}
        </div>
        <div
          className="bg-brand-700 flex items-center justify-center transition-all duration-500"
          style={{ width: `${stpPctVal}%` }}
        >
          {stpPctVal > 4 && (
            <span className="text-[10px] font-semibold text-white truncate px-1">
              {Math.round(stpPctVal)}%
            </span>
          )}
        </div>
      </div>

      {/* Legend with values */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="flex items-start gap-2">
          <span className="w-3 h-3 rounded-sm bg-gray-600 mt-0.5 shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400">Base FTE</div>
            <div className="text-xs font-semibold text-gray-200">{formatDollars(baseBudget)}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="w-3 h-3 rounded-sm bg-brand-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400">Training</div>
            <div className="text-xs font-semibold text-gray-200">{formatDollars(trainingCosts)}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="w-3 h-3 rounded-sm bg-teal-500 mt-0.5 shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400">Onboarding</div>
            <div className="text-xs font-semibold text-gray-200">{formatDollars(onboardingCosts)}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="w-3 h-3 rounded-sm bg-brand-700 mt-0.5 shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400">Speed to Prof.</div>
            <div className="text-xs font-semibold text-gray-200">{formatDollars(stpCosts)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
