import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

interface LearningCurveChartProps {
  data: { month: number; aht: number }[]
  tenureAHT: number
}

export default function LearningCurveChart({ data, tenureAHT }: LearningCurveChartProps) {
  const chartData = {
    labels: data.map((d) => d.month.toString()),
    datasets: [
      {
        label: 'New Hire AHT',
        data: data.map((d) => Math.round(d.aht)),
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(255, 109, 0, 0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#22d3ee',
        pointBorderColor: '#1a2332',
        pointBorderWidth: 1,
        pointRadius: 3,
      },
      {
        label: 'Tenure AHT',
        data: data.map(() => tenureAHT),
        borderColor: '#00A3A1',
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
        borderWidth: 1.5,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a2332',
        borderColor: '#374151',
        borderWidth: 1,
        titleColor: '#f3f4f6',
        bodyColor: '#f3f4f6',
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) =>
            `${ctx.dataset.label}: ${Math.round(ctx.parsed.y ?? 0)}s`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Month', color: '#6b7280', font: { size: 10 } },
        ticks: { color: '#6b7280', font: { size: 9 } },
        grid: { color: 'rgba(55, 65, 81, 0.2)' },
      },
      y: {
        title: { display: false },
        ticks: { color: '#6b7280', font: { size: 9 } },
        grid: { color: 'rgba(55, 65, 81, 0.2)' },
      },
    },
  }

  const day1AHT = data[0]?.aht ?? 0
  const finalAHT = data[data.length - 1]?.aht ?? tenureAHT

  return (
    <div className="bg-card border border-card-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-200">Learning Curve</h3>
          <p className="text-[10px] text-gray-400">New hire AHT over time</p>
        </div>
        <div className="flex gap-3 text-[10px]">
          <span className="text-brand-400">
            Day 1: <strong>{Math.round(day1AHT)}s</strong>
          </span>
          <span className="text-teal-400">
            Tenure: <strong>{Math.round(finalAHT)}s</strong>
          </span>
        </div>
      </div>
      <div className="h-36">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}
