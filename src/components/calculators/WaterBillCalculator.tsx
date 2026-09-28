import { useState } from 'react';
import { ArrowLeft, RotateCcw, Calculator, Droplets, User, AlertCircle, CheckCircle2, Info, Receipt } from 'lucide-react';

interface WaterBillCalculatorProps {
  onBack: () => void;
}

interface WaterBillResult {
  customerName: string;
  usageLitres: number;
  ratePer1000L: number;
  rateTierLabel: string;
  totalBill: number;
}

export function WaterBillCalculator({ onBack }: WaterBillCalculatorProps) {
  const [customerName, setCustomerName] = useState('');
  const [waterUsage, setWaterUsage] = useState('');

  const [result, setResult] = useState<WaterBillResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // 1. Validate customer name
    if (!customerName.trim()) {
      setErrorMessage('Please enter the customer name.');
      setResult(null);
      return;
    }

    // 2. Validate empty water usage
    if (!waterUsage.trim()) {
      setErrorMessage('Please enter the water usage in litres.');
      setResult(null);
      return;
    }

    // 3. Parse water usage
    const usageNum = parseFloat(waterUsage);

    // 4. Validate non-numeric input
    if (isNaN(usageNum)) {
      setErrorMessage('Water usage must be a valid number.');
      setResult(null);
      return;
    }

    // 5. Validate negative values
    if (usageNum < 0) {
      setErrorMessage('Water usage cannot be negative. Please enter a positive value.');
      setResult(null);
      return;
    }

    // 6. Validate zero usage
    if (usageNum === 0) {
      setErrorMessage('Water usage must be greater than zero litres.');
      setResult(null);
      return;
    }

    // Determine applicable rate based on the billing rules:
    // • Up to 5,000 litres → ₹2 per 1,000 litres
    // • 5,001 to 10,000 litres → ₹3 per 1,000 litres
    // • Above 10,000 litres → ₹5 per 1,000 litres
    let rate = 2;
    let tierLabel = 'Up to 5,000 L (Slab 1)';

    if (usageNum <= 5000) {
      rate = 2;
      tierLabel = 'Up to 5,000 L (Standard)';
    } else if (usageNum <= 10000) {
      rate = 3;
      tierLabel = '5,001 to 10,000 L (Moderate)';
    } else {
      rate = 5;
      tierLabel = 'Above 10,000 L (High Consumption)';
    }

    // Total Bill = (Usage in litres ÷ 1,000) × Applicable Rate
    const total = (usageNum / 1000) * rate;

    setResult({
      customerName: customerName.trim(),
      usageLitres: usageNum,
      ratePer1000L: rate,
      rateTierLabel: tierLabel,
      totalBill: total,
    });
  };

  const handleReset = () => {
    setCustomerName('');
    setWaterUsage('');
    setResult(null);
    setErrorMessage(null);
  };

  const handleLoadSample = (sampleName: string, sampleLitres: number) => {
    setCustomerName(sampleName);
    setWaterUsage(sampleLitres.toString());
    setErrorMessage(null);

    let rate = 2;
    let tierLabel = 'Up to 5,000 L (Standard)';
    if (sampleLitres <= 5000) {
      rate = 2;
      tierLabel = 'Up to 5,000 L (Standard)';
    } else if (sampleLitres <= 10000) {
      rate = 3;
      tierLabel = '5,001 to 10,000 L (Moderate)';
    } else {
      rate = 5;
      tierLabel = 'Above 10,000 L (High Consumption)';
    }

    setResult({
      customerName: sampleName,
      usageLitres: sampleLitres,
      ratePer1000L: rate,
      rateTierLabel: tierLabel,
      totalBill: (sampleLitres / 1000) * rate,
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
          Module 2 of 10 · Utilities & Bills
        </span>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-3xl shrink-0">
            💧
          </div>
          <div>
            <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">
              Real-World Calculator
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Water Bill Calculator
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Calculate domestic or commercial water utility bills in Indian Rupees (₹) based on consumption slabs and tiered volume rates.
            </p>
          </div>
        </div>

        {/* Tier Rate Rules Overview */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Info className="w-4 h-4 text-cyan-600" />
            <span>Official Billing Slab Rules:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">Tier 1: Up to 5,000 L</span>
              <span className="text-cyan-700 font-bold font-mono">₹2</span> per 1,000 litres
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">Tier 2: 5,001 to 10,000 L</span>
              <span className="text-cyan-700 font-bold font-mono">₹3</span> per 1,000 litres
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">Tier 3: Above 10,000 L</span>
              <span className="text-cyan-700 font-bold font-mono">₹5</span> per 1,000 litres
            </div>
          </div>
        </div>

        {/* Quick Test Samples */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Quick Test Samples:</span>
          <button
            type="button"
            onClick={() => handleLoadSample('Rahul Sharma', 4500)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Tier 1: Rahul (4,500 L)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Priya Patel', 8000)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Tier 2: Priya (8,000 L)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Ananya Verma', 16000)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Tier 3: Ananya (16,000 L)
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
            {/* Input 1: Customer Name */}
            <div>
              <label htmlFor="customerName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Customer Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Consumer account holder name</p>
            </div>

            {/* Input 2: Water Usage (Litres) */}
            <div>
              <label htmlFor="waterUsage" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Water Usage (Litres)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                </div>
                <input
                  id="waterUsage"
                  type="number"
                  step="any"
                  value={waterUsage}
                  onChange={(e) => setWaterUsage(e.target.value)}
                  placeholder="e.g. 8000"
                  className="w-full pl-10 pr-14 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  Litres
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Total volume consumed during billing cycle</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl text-sm font-semibold hover:bg-cyan-700 active:bg-cyan-800 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Bill</span>
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
                Water Bill Statement
              </h2>
            </div>

            {/* Prominent Total Bill Highlight */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-md mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-100">
                  Total Water Bill Amount
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-xs">
                  <Receipt className="w-3 h-3" />
                  Official Receipt
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 font-mono tabular-nums">
                ₹{result.totalBill.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-cyan-100">
                <span>
                  Billed to: <strong className="text-white">{result.customerName}</strong>
                </span>
                <span>
                  Applicable Rate: <strong className="text-white font-mono">₹{result.ratePer1000L} per 1,000 L</strong>
                </span>
              </div>
            </div>

            {/* Result Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Customer Name</span>
                <span className="text-base font-bold text-slate-900 truncate block">
                  {result.customerName}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Water Usage</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {result.usageLitres.toLocaleString()} Litres
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Applicable Rate</span>
                <span className="text-base font-bold text-cyan-700 font-mono tabular-nums">
                  ₹{result.ratePer1000L} / 1,000 L
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Total Water Bill</span>
                <span className="text-base font-bold text-emerald-700 font-mono tabular-nums">
                  ₹{result.totalBill.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Step-by-Step Calculation Explanation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Info className="w-4 h-4 text-cyan-600" />
                <span>Calculation Breakdown:</span>
              </div>
              <p className="text-slate-700 pl-5">
                • Tier Classification: <span className="font-semibold text-slate-900">{result.rateTierLabel}</span>
              </p>
              <p className="font-mono text-slate-700 pl-5">
                • Units (Thousands of Litres) = {result.usageLitres.toLocaleString()} ÷ 1,000 = {(result.usageLitres / 1000).toFixed(2)} units
              </p>
              <p className="font-mono text-slate-700 pl-5">
                • Water Bill = {(result.usageLitres / 1000).toFixed(2)} × ₹{result.ratePer1000L} = ₹{result.totalBill.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-cyan-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All 10 Calculators</span>
        </button>
      </div>
    </div>
  );
}
