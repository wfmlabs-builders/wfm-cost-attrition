import type { Results } from '../lib/calculations'
import { formatCurrency, formatNumber } from '../lib/calculations'

interface NarrativeProps {
  results: Results
  inputs: {
    trainingLengthWeeks: number
    speedToProficiencyMonths: number
    day1AHTMultiplier: number
  }
}

export default function Narrative({ results, inputs }: NarrativeProps) {
  const simpleCost =
    results.baseFTE *
    results.annualAttritionDisplay *
    (inputs.trainingLengthWeeks / 52) *
    (results.baseFTEBudget / results.baseFTE)
  const multiplier = simpleCost > 0 ? results.totalCostOfAttrition / simpleCost : 0

  return (
    <div className="bg-card border border-card-border rounded-lg p-5 mt-4">
      <h3 className="text-sm font-semibold text-brand-400 mb-3">The Hidden Cost Story</h3>
      <div className="text-sm text-gray-300 leading-relaxed space-y-3">
        <p>
          A simple calculation might suggest: with{' '}
          <strong className="text-white">{formatNumber(results.baseFTE)} agents</strong> and{' '}
          <strong className="text-white">
            {Math.round(results.annualAttritionDisplay * 100)}%
          </strong>{' '}
          turnover, training takes{' '}
          <strong className="text-white">{inputs.trainingLengthWeeks} weeks</strong>, so attrition
          costs roughly{' '}
          <strong className="text-white">{formatCurrency(simpleCost)}</strong>.
        </p>
        <p>
          Yet the true cost is{' '}
          <strong className="text-brand-400">{multiplier.toFixed(1)}x</strong> that — or{' '}
          <strong className="text-brand-400">
            {formatCurrency(results.totalCostOfAttrition)}
          </strong>
          . The difference comes from onboarding and speed to proficiency costs that most
          organizations overlook.
        </p>
        <p>
          Speed to proficiency alone adds{' '}
          <strong className="text-white">
            {formatCurrency(results.speedToProficiencyCosts)}
          </strong>{' '}
          — new hires take{' '}
          <strong className="text-white">{inputs.speedToProficiencyMonths} months</strong> to match
          tenured agents, starting at{' '}
          <strong className="text-white">{inputs.day1AHTMultiplier}x</strong> the handle time.
        </p>
        <p>
          Attrition costs represent{' '}
          <strong className="text-brand-400">
            {Math.round(results.attritionPctOfBudget * 100)}%
          </strong>{' '}
          of the total budget —{' '}
          <strong className="text-white">
            {formatCurrency(results.totalCostOfAttrition)}
          </strong>{' '}
          out of{' '}
          <strong className="text-white">{formatCurrency(results.totalFTEBudget)}</strong>.
        </p>
      </div>
    </div>
  )
}
