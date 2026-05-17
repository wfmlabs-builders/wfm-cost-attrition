import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { formatDollars } from '../lib/calculations'

ChartJS.register(ArcElement, Tooltip, Legend)

interface CategoryPieProps {
  trainingPct: number
  onboardingPct: number
  stpPct: number
  trainingCost: number
  onboardingCost: number
  stpCost: number
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a2332',
      borderColor: '#374151',
      borderWidth: 1,
      titleColor: '#f3f4f6',
      bodyColor: '#f3f4f6',
      callbacks: {
        label: (ctx: { label?: string; parsed: number }) =>
          `${ctx.label}: ${ctx.parsed}%`,
      },
    },
  },
}

export function CategoryPie({
  trainingPct,
  onboardingPct,
  stpPct,
  trainingCost,
  onboardingCost,
  stpCost,
}: CategoryPieProps) {
  const data = {
    labels: ['Training', 'Onboarding', 'Speed to Proficiency'],
    datasets: [
      {
        data: [
          Math.round(trainingPct * 100),
          Math.round(onboardingPct * 100),
          Math.round(stpPct * 100),
        ],
        backgroundColor: ['#22d3ee', '#00A3A1', '#374151'],
        borderColor: ['#CC5700', '#008381', '#1f2937'],
        borderWidth: 2,
      },
    ],
  }

  const items = [
    {
      label: 'Training',
      pct: Math.round(trainingPct * 100),
      cost: trainingCost,
      color: 'bg-brand-500',
    },
    {
      label: 'Onboarding',
      pct: Math.round(onboardingPct * 100),
      cost: onboardingCost,
      color: 'bg-teal-500',
    },
    {
      label: 'Speed to Prof.',
      pct: Math.round(stpPct * 100),
      cost: stpCost,
      color: 'bg-gray-600',
    },
  ]

  return (
    <div className="bg-card border border-card-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-200">Attrition Cost Breakdown</h3>
      <p className="text-[10px] text-gray-400 mb-3">Where your attrition dollars go</p>
      <div className="flex items-center gap-4">
        <div className="w-36 h-36 shrink-0">
          <Doughnut data={data} options={doughnutOptions} />
        </div>
        <div className="flex-1 space-y-2.5">
          {items.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-sm ${item.color} shrink-0`} />
                  <span className="text-xs text-gray-300">{item.label}</span>
                </div>
                <span className="text-xs font-bold text-gray-200">{item.pct}%</span>
              </div>
              <div className="ml-4 text-[10px] text-gray-500">{formatDollars(item.cost)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
