import { useState, useMemo } from 'react'
import { calculate, formatDollars, formatNumber, type Inputs } from './lib/calculations'
import SliderInput from './components/SliderInput'
import NumberInput from './components/NumberInput'
import ResultCard from './components/ResultCard'
import LearningCurveChart from './components/LearningCurveChart'
import { CategoryPie } from './components/PieCharts'
import BudgetImpactBar from './components/BudgetImpactBar'
import CostMultiplier from './components/CostMultiplier'
import Narrative from './components/Narrative'
import DisclaimerModal from './components/DisclaimerModal'

const DEFAULT_INPUTS: Inputs = {
  workHours: 2080,
  callsOffered: 12_000_000,
  tenureAHT: 520,
  shrinkage: 0.35,
  occupancy: 0.85,
  annualAttrition: 0.5,
  trainingLengthWeeks: 8,
  trainingAttrition: 0.4,
  speedToProficiencyMonths: 6,
  day1AHTMultiplier: 2.0,
  salary: 50_000,
  onboardingCost: 3_500,
}

function App() {
  const [accepted, setAccepted] = useState(false)
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS)

  const update = <K extends keyof Inputs>(key: K, value: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const results = useMemo(() => calculate(inputs), [inputs])

  if (!accepted) {
    return <DisclaimerModal onAccept={() => setAccepted(true)} />
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-card-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-brand-500 flex items-center justify-center font-bold text-sm text-white">
              W
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">
                Cost of Attrition Calculator
              </h1>
              <p className="text-[10px] text-gray-400">WFM Labs</p>
            </div>
          </div>
          <a
            href="https://wfmlabs.com"
            className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
          >
            wfmlabs.com
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Inputs */}
          <div className="lg:col-span-4 space-y-4">
            {/* Annual Workload */}
            <div className="bg-card border border-card-border rounded-lg overflow-hidden">
              <div className="bg-brand-500/20 border-b border-brand-500/30 px-4 py-2">
                <h2 className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Annual Workload
                </h2>
              </div>
              <div className="p-4">
                <NumberInput
                  label="Work Hours"
                  value={inputs.workHours}
                  onChange={(v) => update('workHours', v)}
                />
                <NumberInput
                  label="Calls Offered"
                  value={inputs.callsOffered}
                  onChange={(v) => update('callsOffered', v)}
                />
                <SliderInput
                  label="Tenure AHT (seconds)"
                  value={inputs.tenureAHT}
                  min={120}
                  max={1200}
                  step={10}
                  onChange={(v) => update('tenureAHT', v)}
                />
                <SliderInput
                  label="Shrinkage"
                  value={inputs.shrinkage}
                  min={0.1}
                  max={0.7}
                  step={0.01}
                  onChange={(v) => update('shrinkage', v)}
                  format="percent"
                />
                <SliderInput
                  label="Occupancy"
                  value={inputs.occupancy}
                  min={0.5}
                  max={1.0}
                  step={0.01}
                  onChange={(v) => update('occupancy', v)}
                  format="percent"
                />
              </div>
            </div>

            {/* Turnover */}
            <div className="bg-card border border-card-border rounded-lg overflow-hidden">
              <div className="bg-brand-500/20 border-b border-brand-500/30 px-4 py-2">
                <h2 className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Turnover
                </h2>
              </div>
              <div className="p-4">
                <SliderInput
                  label="Annual Attrition"
                  value={inputs.annualAttrition}
                  min={0}
                  max={1.5}
                  step={0.01}
                  onChange={(v) => update('annualAttrition', v)}
                  format="percent"
                />
                <SliderInput
                  label="Training Length (Weeks)"
                  value={inputs.trainingLengthWeeks}
                  min={0}
                  max={24}
                  step={1}
                  onChange={(v) => update('trainingLengthWeeks', v)}
                />
                <SliderInput
                  label="Training Attrition"
                  value={inputs.trainingAttrition}
                  min={0}
                  max={1.0}
                  step={0.01}
                  onChange={(v) => update('trainingAttrition', v)}
                  format="percent"
                />
                <SliderInput
                  label="Speed to Proficiency (months)"
                  value={inputs.speedToProficiencyMonths}
                  min={1}
                  max={18}
                  step={1}
                  onChange={(v) => update('speedToProficiencyMonths', v)}
                />
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-gray-300">
                      Day 1 AHT (e.g. 2x)
                    </label>
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    step={0.1}
                    value={inputs.day1AHTMultiplier}
                    onChange={(e) => update('day1AHTMultiplier', parseFloat(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>

            {/* New Hire Costs */}
            <div className="bg-card border border-card-border rounded-lg overflow-hidden">
              <div className="bg-brand-500/20 border-b border-brand-500/30 px-4 py-2">
                <h2 className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  New Hire Costs
                </h2>
              </div>
              <div className="p-4">
                <NumberInput
                  label="Salary"
                  value={inputs.salary}
                  onChange={(v) => update('salary', v)}
                  prefix="$"
                />
                <NumberInput
                  label="Onboarding*"
                  value={inputs.onboardingCost}
                  onChange={(v) => update('onboardingCost', v)}
                  prefix="$"
                />
                <p className="text-[9px] text-gray-500 mt-1">
                  *Onboarding costs per agent for expenses associated with new hires: HR,
                  recruiting, IT. Do not include training costs.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div className="lg:col-span-8 space-y-4">
            {/* Row 1: Core metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ResultCard
                label="Base FTE Required"
                sublabel="without attrition"
                value={formatNumber(results.baseFTE)}
                icon="👥"
              />
              <ResultCard
                label="Total Budget FTEs"
                sublabel="w/ attrition"
                value={formatNumber(results.totalBudgetFTEs)}
                icon="👥"
              />
              <ResultCard
                label="Annual Attrition"
                value={`${Math.round(results.annualAttritionDisplay * 100)}%`}
                icon="📊"
              />
            </div>

            {/* Row 2: Budget numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ResultCard
                label="Base FTE Budget"
                sublabel="without attrition"
                value={formatDollars(results.baseFTEBudget)}
              />
              <ResultCard
                label="Total FTE Budget"
                sublabel="with attrition"
                value={formatDollars(results.totalFTEBudget)}
              />
              <ResultCard
                label="Total Cost of Attrition"
                value={formatDollars(results.totalCostOfAttrition)}
                accent
              />
            </div>

            {/* Row 3: THE HERO — Budget Impact Bar */}
            <BudgetImpactBar
              baseBudget={results.baseFTEBudget}
              trainingCosts={results.trainingCosts}
              onboardingCosts={results.onboardingCosts}
              stpCosts={results.speedToProficiencyCosts}
              attritionPct={results.attritionPctOfBudget}
            />

            {/* Row 4: Multiplier + Category breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CostMultiplier
                baseFTE={results.baseFTE}
                attritionRate={results.annualAttritionDisplay}
                trainingWeeks={inputs.trainingLengthWeeks}
                salary={inputs.salary}
                actualCost={results.totalCostOfAttrition}
              />
              <CategoryPie
                trainingPct={results.trainingPct}
                onboardingPct={results.onboardingPct}
                stpPct={results.stpPct}
                trainingCost={results.trainingCosts}
                onboardingCost={results.onboardingCosts}
                stpCost={results.speedToProficiencyCosts}
              />
            </div>

            {/* Row 5: Per-replacement cost + key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ResultCard
                label="Cost Per Replacement"
                sublabel="All-in per agent"
                value={formatDollars(results.attritionCostPerReplacement)}
                accent
              />
              <ResultCard
                label="Agents Replaced"
                sublabel="Annual turnover"
                value={formatNumber(results.fteToReplace)}
              />
              <ResultCard
                label="New Hires Needed"
                sublabel="Incl. training attrition"
                value={formatNumber(results.newHiresWithAttrition)}
              />
              <ResultCard
                label="Training FTEs"
                sublabel="Annualized"
                value={formatNumber(results.trainingFTEs)}
              />
            </div>

            {/* Row 6: Learning Curve (compact) */}
            <LearningCurveChart
              data={results.learningCurve}
              tenureAHT={inputs.tenureAHT}
            />

            {/* Narrative */}
            <Narrative results={results} inputs={inputs} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-card-border text-center">
          <p className="text-[10px] text-gray-500 max-w-2xl mx-auto">
            WFM Labs calculators are for demonstration purposes only. Capacity planning and
            establishing budgets have many additional considerations which must be accounted for to
            generate a resilient budget. For questions, join the{' '}
            <a href="https://wfmlabs.com" className="text-brand-400 hover:text-brand-300">
              WFM Labs Community
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App
