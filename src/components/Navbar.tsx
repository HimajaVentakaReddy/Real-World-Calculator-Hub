import { useState } from 'react';
import { Menu, X, Rocket, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'calculators' | 'about';
  setActiveTab: (tab: 'home' | 'calculators' | 'about') => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'calculators' | 'about') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'calculators') {
      const el = document.getElementById('modules-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'about') {
      const el = document.getElementById('about-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Real-World Calculator Hub
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-1 relative ${
                activeTab === 'home'
                  ? 'text-blue-600 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('calculators')}
              className={`transition-colors py-1 relative ${
                activeTab === 'calculators'
                  ? 'text-blue-600 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Calculators
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors py-1 relative ${
                activeTab === 'about'
                  ? 'text-blue-600 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('calculators')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>10 Real-World Modules</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in fade-in duration-150">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'home'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('calculators')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'calculators'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Calculators (10 Tools)
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'about'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            About Project
          </button>
        </div>
      )}
    </header>
  );
}
