import { BookOpen, Layers, CheckCircle2, Cpu } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about-section" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Project Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              About Real-World Calculator Hub
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              A beginner-friendly college mini project developed to consolidate multiple real-world everyday calculation problems into a unified, responsive web application.
            </p>
          </div>

          {/* Three Feature Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Everyday Practicality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rather than theoretical formulas, each module addresses authentic situations: splitting fuel for a road trip, calculating library fines, checking traffic penalties, and sizing water bills.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Modular Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Constructed with clean TypeScript interfaces and isolated component states, allowing any student or developer to add new modules with zero friction.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Modern Web Stack</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Built with React 19, Vite, Tailwind CSS, and Lucide icons, ensuring instantaneous responsiveness across both mobile smartphones and widescreen desktop monitors.
              </p>
            </div>
          </div>

          {/* Project Phasing Roadmap */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Project Development Roadmap
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Step 1: Application Structure & Homepage (Current Step)
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Established responsive homepage, top navigation bar, 10 module preview cards, search filters, and modular data models.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-slate-400 text-slate-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Step 2: Interactive Computational Logic (Upcoming)
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Will implement interactive input forms, validation, real-time formula computation, and structured result summaries for all 10 tools.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 text-slate-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Step 3: History & Export Tools (Future)
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Optional features like calculation history, quick printable receipts/summaries, and unit switches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
