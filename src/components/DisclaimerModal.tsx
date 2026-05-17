interface DisclaimerModalProps {
  onAccept: () => void
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-card border border-card-border rounded-xl max-w-lg w-full shadow-2xl">
        {/* Header */}
        <div className="bg-brand-500/20 border-b border-brand-500/30 px-6 py-4 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center font-bold text-white text-lg">
              W
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Cost of Employee Turnover Calculator
              </h2>
              <p className="text-xs text-brand-300">WFM Labs</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-gray-200 leading-relaxed">
            The full cost implications of attrition are often underestimated. This dynamic calculator
            demonstrates how new hire <strong className="text-white">"speed to proficiency"</strong> and
            other onboarding costs can have a significant impact on the overall contact center budget.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            By clicking below, you acknowledge that WFM Labs is providing this tool for educational
            purposes only. The full impact of attrition on any organization may have many elements
            not captured here.
          </p>
        </div>

        {/* Action */}
        <div className="px-6 pb-5">
          <button
            onClick={onAccept}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
          >
            I Understand — Launch Calculator
          </button>
        </div>
      </div>
    </div>
  )
}
