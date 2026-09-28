import { ArrowRight } from 'lucide-react';
import { CalculatorModule } from '../types/calculator';

interface CalculatorCardProps {
  module: CalculatorModule;
  onSelect: (module: CalculatorModule) => void;
}

export function CalculatorCard({ module, onSelect }: CalculatorCardProps) {
  return (
    <div className="flex flex-col justify-between bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 group">
      <div>
        {/* Top bar with emoji and category */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-105 group-hover:bg-blue-50 transition-transform">
            <span role="img" aria-label={module.title}>
              {module.emoji}
            </span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            <span>{module.category}</span>
          </div>
        </div>

        {/* Module Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {module.title}
        </h3>

        {/* One-line description */}
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {module.description}
        </p>

        {/* Planned parameters preview */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-400 font-medium mb-1.5">Expected Inputs:</div>
          <div className="flex flex-wrap gap-1.5">
            {module.plannedInputs.map((input, idx) => (
              <span
                key={idx}
                className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
              >
                {input}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button: Calculate / Check */}
      <div className="mt-6 pt-2">
        <button
          onClick={() => onSelect(module)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors cursor-pointer group/btn"
        >
          <span>{module.buttonText}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
