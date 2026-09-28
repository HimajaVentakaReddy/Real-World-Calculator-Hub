import { X, CheckCircle, Calculator, Sparkles } from 'lucide-react';
import { CalculatorModule } from '../types/calculator';

interface ModulePreviewModalProps {
  module: CalculatorModule | null;
  onClose: () => void;
}

export function ModulePreviewModal({ module, onClose }: ModulePreviewModalProps) {
  if (!module) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl">
            <span role="img" aria-label={module.title}>
              {module.emoji}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {module.category}
            </span>
            <h3 id="modal-title" className="text-xl font-bold text-slate-900">
              {module.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {module.description}
        </p>

        {/* Phase notification */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 mb-5">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Step 1: Interface & Architecture Complete
              </h4>
              <p className="mt-1 text-xs text-blue-800 leading-relaxed">
                The layout, navigation, and module catalog are ready. In Step 2, the interactive mathematical computation engine and result visualizers will be wired up.
              </p>
            </div>
          </div>
        </div>

        {/* Architecture details */}
        <div className="space-y-3.5 mb-6">
          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-1">
              Planned Formula / Logic:
            </span>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800">
              {module.keyFormula}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-700 block mb-1.5">
              Required User Inputs (Step 2):
            </span>
            <ul className="space-y-1">
              {module.plannedInputs.map((input, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{input}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
