interface NumberInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  prefix?: string
}

export default function NumberInput({ label, value, onChange, prefix }: NumberInputProps) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-300 mb-1">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={prefix ? 'pl-7' : ''}
        />
      </div>
    </div>
  )
}
