import { useState } from 'react';
import { ArrowLeft, RotateCcw, Calculator, BookOpen, User, Calendar, AlertCircle, CheckCircle2, Info, Receipt, Sparkles } from 'lucide-react';

interface LibraryFineCalculatorProps {
  onBack: () => void;
}

interface LibraryFineResult {
  studentName: string;
  lateDays: number;
  ratePerDay: number;
  tierLabel: string;
  totalFine: number;
  isOnTime: boolean;
}

export function LibraryFineCalculator({ onBack }: LibraryFineCalculatorProps) {
  const [studentName, setStudentName] = useState('');
  const [lateDays, setLateDays] = useState('');

  const [result, setResult] = useState<LibraryFineResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // 1. Validate student name
    if (!studentName.trim()) {
      setErrorMessage('Please enter the student name.');
      setResult(null);
      return;
    }

    // 2. Validate empty late days
    if (!lateDays.trim()) {
      setErrorMessage('Please enter the number of late days.');
      setResult(null);
      return;
    }

    // 3. Parse late days
    const daysNum = parseFloat(lateDays);

    // 4. Validate non-numeric input
    if (isNaN(daysNum)) {
      setErrorMessage('Number of late days must be a valid number.');
      setResult(null);
      return;
    }

    // 5. Validate whole number
    if (!Number.isInteger(daysNum)) {
      setErrorMessage('Number of late days must be a whole number (integer).');
      setResult(null);
      return;
    }

    // 6. Validate negative values
    if (daysNum < 0) {
      setErrorMessage('Late days cannot be negative. Please enter 0 or a positive number.');
      setResult(null);
      return;
    }

    // Fine rules:
    // • 0 days → No Fine
    // • 1–5 days → ₹2 per day
    // • 6–10 days → ₹5 per day
    // • More than 10 days → ₹10 per day
    let rate = 0;
    let tier = 'On-time Return (No Fine)';
    let total = 0;
    let onTime = false;

    if (daysNum === 0) {
      rate = 0;
      tier = '0 Days (On-Time Return)';
      total = 0;
      onTime = true;
    } else if (daysNum >= 1 && daysNum <= 5) {
      rate = 2;
      tier = '1–5 Days (Standard Delay)';
      total = daysNum * 2;
    } else if (daysNum >= 6 && daysNum <= 10) {
      rate = 5;
      tier = '6–10 Days (Moderate Delay)';
      total = daysNum * 5;
    } else {
      rate = 10;
      tier = 'More than 10 Days (Extended Delay)';
      total = daysNum * 10;
    }

    setResult({
      studentName: studentName.trim(),
      lateDays: daysNum,
      ratePerDay: rate,
      tierLabel: tier,
      totalFine: total,
      isOnTime: onTime,
    });
  };

  const handleReset = () => {
    setStudentName('');
    setLateDays('');
    setResult(null);
    setErrorMessage(null);
  };

  const handleLoadSample = (sampleName: string, days: number) => {
    setStudentName(sampleName);
    setLateDays(days.toString());
    setErrorMessage(null);

    let rate = 0;
    let tier = '0 Days (On-Time Return)';
    let total = 0;
    let onTime = false;

    if (days === 0) {
      rate = 0;
      tier = '0 Days (On-Time Return)';
      total = 0;
      onTime = true;
    } else if (days <= 5) {
      rate = 2;
      tier = '1–5 Days (Standard Delay)';
      total = days * 2;
    } else if (days <= 10) {
      rate = 5;
      tier = '6–10 Days (Moderate Delay)';
      total = days * 5;
    } else {
      rate = 10;
      tier = 'More than 10 Days (Extended Delay)';
      total = days * 10;
    }

    setResult({
      studentName: sampleName,
      lateDays: days,
      ratePerDay: rate,
      tierLabel: tier,
      totalFine: total,
      isOnTime: onTime,
    });
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Back to Home Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-medium text-slate-500">
          Module 5 of 10 · College & Daily
        </span>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl shrink-0">
            📚
          </div>
          <div>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Real-World Calculator
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Library Fine Calculator
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Determine late book return penalties in Indian Rupees (₹) based on overdue days and college library fine tier rules.
            </p>
          </div>
        </div>

        {/* Fine Rules Overview */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Official Library Fine Slabs:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">0 Days</span>
              <span className="text-emerald-700 font-bold font-mono">No Fine (₹0)</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">1–5 Days</span>
              <span className="text-emerald-700 font-bold font-mono">₹2 / day</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">6–10 Days</span>
              <span className="text-emerald-700 font-bold font-mono">₹5 / day</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">&gt; 10 Days</span>
              <span className="text-rose-600 font-bold font-mono">₹10 / day</span>
            </div>
          </div>
        </div>

        {/* Quick Test Samples */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Quick Test Samples:</span>
          <button
            type="button"
            onClick={() => handleLoadSample('Rohan Das', 0)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Rohan (0 Days · ₹0)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Kavya Iyer', 4)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Kavya (4 Days @ ₹2/day)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Arjun Rao', 8)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Arjun (8 Days @ ₹5/day)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Tanvi Joshi', 14)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Tanvi (14 Days @ ₹10/day)
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Invalid Input
              </h4>
              <p className="text-xs sm:text-sm mt-0.5 text-amber-700 leading-relaxed">
                {errorMessage}
              </p>
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleCalculate} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Input 1: Student Name */}
            <div>
              <label htmlFor="studentName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Student Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Sahil Reddy"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Borrower / cardholder student name</p>
            </div>

            {/* Input 2: Number of Late Days */}
            <div>
              <label htmlFor="lateDays" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Number of Late Days
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                </div>
                <input
                  id="lateDays"
                  type="number"
                  min="0"
                  step="1"
                  value={lateDays}
                  onChange={(e) => setLateDays(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full pl-10 pr-14 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  Days
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Days past the official due date (0 for on-time)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Fine</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-700 border border-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </form>

        {/* Calculation Result Card */}
        {result && (
          <div className="mt-8 pt-8 border-t border-slate-200 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Library Fine Slip
              </h2>
            </div>

            {/* Prominent Fine Highlight */}
            <div
              className={`p-6 rounded-2xl text-white shadow-md mb-6 ${
                result.isOnTime
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-700'
                  : result.totalFine > 50
                  ? 'bg-gradient-to-br from-rose-600 to-red-700'
                  : 'bg-gradient-to-br from-emerald-600 to-green-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-100">
                  {result.isOnTime ? 'Status: On-Time Return' : 'Total Fine Amount'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-xs">
                  {result.isOnTime ? (
                    <>
                      <Sparkles className="w-3 h-3" />
                      No Penalty
                    </>
                  ) : (
                    <>
                      <Receipt className="w-3 h-3" />
                      Fine Receipt
                    </>
                  )}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 font-mono tabular-nums">
                ₹{result.totalFine.toFixed(2)}
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-emerald-100">
                <span>
                  Student: <strong className="text-white">{result.studentName}</strong>
                </span>
                <span>
                  Applicable Rate: <strong className="text-white font-mono">{result.isOnTime ? 'No Fine' : `₹${result.ratePerDay} per day`}</strong>
                </span>
              </div>
            </div>

            {/* Parameter Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Student Name</span>
                <span className="text-base font-bold text-slate-900 truncate block">
                  {result.studentName}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Late Days</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {result.lateDays} {result.lateDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Applicable Rate</span>
                <span className="text-base font-bold text-emerald-700 font-mono tabular-nums">
                  {result.isOnTime ? 'No Fine' : `₹${result.ratePerDay} / day`}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Total Fine</span>
                <span className={`text-base font-bold font-mono tabular-nums ${result.isOnTime ? 'text-emerald-700' : 'text-slate-900'}`}>
                  ₹{result.totalFine.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Calculation Breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Info className="w-4 h-4 text-emerald-600" />
                <span>Fine Calculation Breakdown:</span>
              </div>
              <p className="text-slate-700 pl-5">
                • Rule Tier Applied: <span className="font-semibold text-slate-900">{result.tierLabel}</span>
              </p>
              {result.isOnTime ? (
                <p className="font-mono text-emerald-700 pl-5">
                  • 0 late days: The book was returned on time. Zero penalty incurred!
                </p>
              ) : (
                <p className="font-mono text-slate-700 pl-5">
                  • Total Fine = Late Days × Rate per Day = {result.lateDays} days × ₹{result.ratePerDay} = ₹{result.totalFine.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All 10 Calculators</span>
        </button>
      </div>
    </div>
  );
}
