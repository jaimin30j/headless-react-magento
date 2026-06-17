const STEPS = ['Contact', 'Shipping', 'Payment']

export default function StepIndicator({ current }) {
    return (
        <div className="flex items-center justify-center mb-10">
            {STEPS.map((label, i) => {
                const done = i < current
                const active = i === current
                return (
                    <div key={label} className="flex items-center">
                        <div className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center
                              text-sm font-semibold transition-colors
                              ${done ? 'bg-blue-500 text-white'
                                    : active ? 'bg-gray-900 text-white'
                                        : 'bg-gray-100 text-gray-400'}`}>
                                {done ? '✓' : i + 1}
                            </div>
                            <span className={`text-xs font-medium ${active ? 'text-gray-900' : 'text-gray-400'}`}>
                                {label}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div className={`w-16 h-px mx-2 mb-4 transition-colors
                              ${done ? 'bg-blue-500' : 'bg-gray-200'}`} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}