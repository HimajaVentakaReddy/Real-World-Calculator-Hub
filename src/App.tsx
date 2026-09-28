/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CalculatorGrid } from './components/CalculatorGrid';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ModulePreviewModal } from './components/ModulePreviewModal';
import { CALCULATOR_MODULES } from './data/calculatorsData';
import { CalculatorCategory, CalculatorModule } from './types/calculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'calculators' | 'about'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory>('All');
  const [selectedModule, setSelectedModule] = useState<CalculatorModule | null>(null);

  // Filter modules based on category and search query
  const filteredModules = useMemo(() => {
    return CALCULATOR_MODULES.filter((mod) => {
      const matchesCategory =
        selectedCategory === 'All' || mod.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        mod.title.toLowerCase().includes(query) ||
        mod.description.toLowerCase().includes(query) ||
        mod.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const handleNavClick = (tab: 'home' | 'calculators' | 'about') => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'calculators') {
      const el = document.getElementById('modules-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'about') {
      const el = document.getElementById('about-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={handleNavClick} />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {/* Modern Homepage Hero with Title, Subtitle, Search and Filter */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalCount={CALCULATOR_MODULES.length}
        />

        {/* 10 Real-World Calculator Cards Grid */}
        <CalculatorGrid
          modules={filteredModules}
          onSelectModule={(mod) => setSelectedModule(mod)}
          onResetFilter={handleResetFilters}
          isFiltered={selectedCategory !== 'All' || searchQuery.trim().length > 0}
        />

        {/* Project About & Roadmap Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Modal Dialog for Step 1 previews */}
      <ModulePreviewModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />
    </div>
  );
}
