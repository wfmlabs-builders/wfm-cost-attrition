export interface Inputs {
  workHours: number
  callsOffered: number
  tenureAHT: number // seconds
  shrinkage: number // 0-1
  occupancy: number // 0-1
  annualAttrition: number // 0-1
  trainingLengthWeeks: number
  trainingAttrition: number // 0-1
  speedToProficiencyMonths: number
  day1AHTMultiplier: number // e.g. 2.0 means 2x tenure AHT
  salary: number
  onboardingCost: number
}

export interface Results {
  baseFTE: number
  totalBudgetFTEs: number
  annualAttritionDisplay: number
  baseFTEBudget: number
  totalFTEBudget: number
  totalCostOfAttrition: number
  trainingCosts: number
  onboardingCosts: number
  speedToProficiencyCosts: number
  attritionCostPerReplacement: number
  trainingFTEs: number
  proficiencyFTEs: number
  fteToReplace: number
  fteToReplaceWithSTP: number
  newHiresWithAttrition: number
  learningCurve: { month: number; aht: number }[]
  attritionPctOfBudget: number
  // category percentages
  trainingPct: number
  onboardingPct: number
  stpPct: number
}

export function calculate(inputs: Inputs): Results {
  const {
    workHours,
    callsOffered,
    tenureAHT,
    shrinkage,
    occupancy,
    annualAttrition,
    trainingLengthWeeks,
    trainingAttrition,
    speedToProficiencyMonths,
    day1AHTMultiplier,
    salary,
    onboardingCost,
  } = inputs

  // Base FTE Required = Calls * AHT / 3600 / WorkHours / Occupancy / (1 - Shrinkage)
  const baseFTE =
    callsOffered > 0 && workHours > 0 && occupancy > 0 && shrinkage < 1
      ? (callsOffered * tenureAHT) / 3600 / workHours / occupancy / (1 - shrinkage)
      : 0

  // Proficiency curve: linear ramp from (1/day1AHTMultiplier) to 1.0 over speedToProfMonths
  const initialProficiency = Math.min(1 / day1AHTMultiplier, 1)
  const proficiencyStep =
    speedToProficiencyMonths > 0 ? (1 - initialProficiency) / speedToProficiencyMonths : 0

  const learningCurve: { month: number; aht: number }[] = []
  const proficiencies: number[] = []

  for (let month = 1; month <= 12; month++) {
    const prof = Math.min(initialProficiency + proficiencyStep * (month - 1), 1)
    proficiencies.push(prof)
    learningCurve.push({
      month,
      aht: prof > 0 ? tenureAHT / prof : tenureAHT * day1AHTMultiplier,
    })
  }

  // Average proficiency over the full 12-month period (matching Excel logic)
  // The STP months control how fast the ramp reaches 1.0, but the average
  // is always computed across all 12 months to represent annualized impact
  const avgProficiency =
    proficiencies.length > 0
      ? proficiencies.reduce((a, b) => a + b, 0) / proficiencies.length
      : 1

  // FTE to replace without speed to proficiency
  const fteToReplace = baseFTE * annualAttrition

  // FTE to replace with speed to proficiency (need more because new hires are less productive)
  const fteToReplaceWithSTP = avgProficiency > 0 ? fteToReplace / avgProficiency : fteToReplace

  // Proficiency cost in FTE terms
  const proficiencyFTEs = fteToReplaceWithSTP - fteToReplace

  // New hires needed accounting for training attrition
  const newHiresWithAttrition =
    trainingAttrition < 1 ? fteToReplaceWithSTP / (1 - trainingAttrition) : fteToReplaceWithSTP

  // Training FTEs (annualized) — accounts for ramp during training
  const trainingFTEs =
    (newHiresWithAttrition * trainingLengthWeeks) / 52 -
    ((newHiresWithAttrition - fteToReplaceWithSTP) * trainingLengthWeeks) / 2 / 52

  // Total budget FTEs
  const totalBudgetFTEs = baseFTE + trainingFTEs + proficiencyFTEs

  // Costs
  const trainingCosts = trainingFTEs * salary
  const onboardingCosts = onboardingCost * fteToReplace
  const speedToProficiencyCosts = proficiencyFTEs * salary

  const totalCostOfAttrition = trainingCosts + onboardingCosts + speedToProficiencyCosts

  const baseFTEBudget = baseFTE * salary
  const totalFTEBudget = baseFTEBudget + totalCostOfAttrition

  const attritionCostPerReplacement =
    fteToReplaceWithSTP > 0 ? totalCostOfAttrition / fteToReplaceWithSTP : 0

  const attritionPctOfBudget = totalFTEBudget > 0 ? totalCostOfAttrition / totalFTEBudget : 0

  // Category percentages
  const trainingPct = totalCostOfAttrition > 0 ? trainingCosts / totalCostOfAttrition : 0
  const onboardingPct = totalCostOfAttrition > 0 ? onboardingCosts / totalCostOfAttrition : 0
  const stpPct = totalCostOfAttrition > 0 ? speedToProficiencyCosts / totalCostOfAttrition : 0

  return {
    baseFTE,
    totalBudgetFTEs,
    annualAttritionDisplay: annualAttrition,
    baseFTEBudget,
    totalFTEBudget,
    totalCostOfAttrition,
    trainingCosts,
    onboardingCosts,
    speedToProficiencyCosts,
    attritionCostPerReplacement,
    trainingFTEs,
    proficiencyFTEs,
    fteToReplace,
    fteToReplaceWithSTP,
    newHiresWithAttrition,
    learningCurve,
    attritionPctOfBudget,
    trainingPct,
    onboardingPct,
    stpPct,
  }
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${Math.round(value).toLocaleString()}`
  }
  return `$${Math.round(value).toLocaleString()}`
}

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString()
}

export function formatDollars(value: number): string {
  return `$${Math.round(value).toLocaleString()}`
}
