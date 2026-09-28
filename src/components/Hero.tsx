import { Search, GraduationCap, ArrowDown } from 'lucide-react';
import { CalculatorCategory } from '../types/calculator';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CalculatorCategory;
  setSelectedCategory: (cat: CalculatorCategory) => void;
  totalCount: number;
}

const CATEGORIES: CalculatorCategory[] = [
  'All',
  'Transport & Travel',
  'Utilities & Bills',
  'Finance & Shopping',
  'Safety & Weather',
  'College & Daily',
];

export function Hero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  totalCount,
}: HeroProps) {
  const scrollToGrid = () => {
    const el = document.getElementById('modules-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* College Mini Project Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>College Mini Project · Phase 1: Core Architecture</span>
          </div>

          {/* Prompt Required Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            🚀 Real-World Calculator Hub
          </h1>

          {/* Prompt Required Subtitle */}
          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Simple tools for everyday calculations and decisions.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Designed for everyday tasks—from splitting travel fuel and decoding utility bills to tracking campus library fines and shopping discounts.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators (e.g. fuel, water, recharge, hotel)..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-2 py-1 text-xs text-slate-500 hover:text-slate-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-200/60 rounded-xl max-w-2xl mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick jump anchor button */}
          <div className="mt-6">
            <button
              onClick={scrollToGrid}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span>Explore all {totalCount} modules below</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
