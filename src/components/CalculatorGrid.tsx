import { CalculatorModule } from '../types/calculator';
import { CalculatorCard } from './CalculatorCard';
import { SearchX, LayoutGrid } from 'lucide-react';

interface CalculatorGridProps {
  modules: CalculatorModule[];
  onSelectModule: (module: CalculatorModule) => void;
  onResetFilter: () => void;
  isFiltered: boolean;
}

export function CalculatorGrid({
  modules,
  onSelectModule,
  onResetFilter,
  isFiltered,
}: CalculatorGridProps) {
  return (
    <section id="modules-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Everyday Calculators & Checkers
            </h2>
            <p className="text-xs text-slate-500">
              Explore the 10 real-world calculation engines built for practical daily decisions
            </p>
          </div>
        </div>

        <div className="text-xs font-medium text-slate-500 flex items-center gap-3">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{modules.length}</strong> modules
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilter}
              className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Cards */}
      {modules.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <CalculatorCard key={mod.id} module={mod} onSelect={onSelectModule} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <SearchX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No matching calculators found</h3>
          <p className="mt-1 text-xs text-slate-500">
            Try adjusting your search keywords or choosing another category filter.
          </p>
          <div className="mt-5">
            <button
              onClick={onResetFilter}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
            >
              View All 10 Modules
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
