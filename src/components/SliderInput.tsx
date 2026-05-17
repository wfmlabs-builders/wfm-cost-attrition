interface SliderInputProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  format?: 'percent' | 'number' | 'currency' | 'multiplier'
  suffix?: string
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = 'number',
  suffix = '',
}: SliderInputProps) {
  const displayValue = () => {
    switch (format) {
      case 'percent':
        return `${Math.round(value * 100)}%`
      case 'currency':
        return `$${value.toLocaleString()}`
      case 'multiplier':
        return `${value}x`
      default:
        return `${value}${suffix}`
    }
  }

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs font-medium text-gray-300">{label}</label>
        <span className="text-xs font-semibold text-brand-400">{displayValue()}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
        <span>
          {format === 'percent'
            ? `${Math.round(min * 100)}%`
            : format === 'currency'
              ? `$${min.toLocaleString()}`
              : min}
        </span>
        <span>
          {format === 'percent'
            ? `${Math.round(max * 100)}%`
            : format === 'currency'
              ? `$${max.toLocaleString()}`
              : max}
        </span>
      </div>
    </div>
  )
}
