import { Rocket, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'home' | 'calculators' | 'about') => void;
}

export function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                Real-World Calculator Hub
              </span>
              <span className="text-xs text-slate-500">
                Simple tools for everyday calculations and decisions
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-xs font-medium text-slate-600">
            <button
              onClick={() => onNavClick('home')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavClick('calculators')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Calculators
            </button>
            <button
              onClick={() => onNavClick('about')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              About Project
            </button>
          </nav>

          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>Built as a College Mini Project with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
