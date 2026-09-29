import { useState } from 'react';
import { ArrowLeft, RotateCcw, Calculator, ShoppingBag, User, IndianRupee, AlertCircle, CheckCircle2, Info, Tag, Percent, Sparkles } from 'lucide-react';

interface ShoppingDiscountCalculatorProps {
  onBack: () => void;
}

interface DiscountResult {
  customerName: string;
  originalAmount: number;
  discountPercentage: number;
  discountAmount: number;
  finalAmount: number;
  tierLabel: string;
}

export function ShoppingDiscountCalculator({ onBack }: ShoppingDiscountCalculatorProps) {
  const [customerName, setCustomerName] = useState('');
  const [shoppingAmount, setShoppingAmount] = useState('');

  const [result, setResult] = useState<DiscountResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateDiscount = (name: string, amountNum: number): DiscountResult => {
    let discountPct = 0;
    let tier = 'Below ₹1,000 (No Discount)';

    if (amountNum < 1000) {
      discountPct = 0;
      tier = 'Below ₹1,000 (0% Discount)';
    } else if (amountNum >= 1000 && amountNum <= 2999) {
      discountPct = 5;
      tier = '₹1,000 to ₹2,999 (5% Discount)';
    } else if (amountNum >= 3000 && amountNum <= 4999) {
      discountPct = 10;
      tier = '₹3,000 to ₹4,999 (10% Discount)';
    } else {
      discountPct = 15;
      tier = '₹5,000 and above (15% Discount)';
    }

    const discountAmt = (amountNum * discountPct) / 100;
    const finalAmt = amountNum - discountAmt;

    return {
      customerName: name.trim(),
      originalAmount: amountNum,
      discountPercentage: discountPct,
      discountAmount: discountAmt,
      finalAmount: finalAmt,
      tierLabel: tier,
    };
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // 1. Validate customer name
    if (!customerName.trim()) {
      setErrorMessage('Please enter the customer name.');
      setResult(null);
      return;
    }

    // 2. Validate empty shopping amount
    if (!shoppingAmount.trim()) {
      setErrorMessage('Please enter the shopping amount in Indian Rupees (₹).');
      setResult(null);
      return;
    }

    // 3. Parse shopping amount
    const amountNum = parseFloat(shoppingAmount);

    // 4. Validate non-numeric input
    if (isNaN(amountNum)) {
      setErrorMessage('Shopping amount must be a valid number.');
      setResult(null);
      return;
    }

    // 5. Validate negative amount
    if (amountNum < 0) {
      setErrorMessage('Shopping amount cannot be negative.');
      setResult(null);
      return;
    }

    // 6. Validate zero amount
    if (amountNum === 0) {
      setErrorMessage('Shopping amount must be greater than ₹0.');
      setResult(null);
      return;
    }

    const calcResult = calculateDiscount(customerName, amountNum);
    setResult(calcResult);
  };

  const handleReset = () => {
    setCustomerName('');
    setShoppingAmount('');
    setResult(null);
    setErrorMessage(null);
  };

  const handleLoadSample = (sampleName: string, amount: number) => {
    setCustomerName(sampleName);
    setShoppingAmount(amount.toString());
    setErrorMessage(null);

    const calcResult = calculateDiscount(sampleName, amount);
    setResult(calcResult);
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
          Module 7 of 10 · Retail & Finance
        </span>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-3xl shrink-0">
            🛒
          </div>
          <div>
            <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
              Real-World Calculator
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Shopping Discount Calculator
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Compute retail bill savings and payable totals in Indian Rupees (₹) based on spending tiers and automated discount slabs.
            </p>
          </div>
        </div>

        {/* Discount Slabs Overview */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Tag className="w-4 h-4 text-rose-600" />
            <span>Store Discount Slabs:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">Below ₹1,000</span>
              <span className="text-slate-500 font-bold font-mono">No Discount (0%)</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">₹1,000 – ₹2,999</span>
              <span className="text-rose-600 font-bold font-mono">5% Discount</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">₹3,000 – ₹4,999</span>
              <span className="text-rose-600 font-bold font-mono">10% Discount</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">₹5,000 & Above</span>
              <span className="text-emerald-600 font-bold font-mono">15% Discount</span>
            </div>
          </div>
        </div>

        {/* Quick Test Samples */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Quick Test Samples:</span>
          <button
            type="button"
            onClick={() => handleLoadSample('Ananya Sharma', 750)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Ananya (₹750 · 0%)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Rahul Verma', 2000)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Rahul (₹2,000 · 5%)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Pooja Patel', 3500)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Pooja (₹3,500 · 10%)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Suresh Menon', 6000)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Suresh (₹6,000 · 15%)
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
                  placeholder="e.g. Diya Sen"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Shopper / account holder name</p>
            </div>

            {/* Input 2: Shopping Amount */}
            <div>
              <label htmlFor="shoppingAmount" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Shopping Amount (₹)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <IndianRupee className="w-4 h-4 text-rose-600" />
                </div>
                <input
                  id="shoppingAmount"
                  type="number"
                  step="any"
                  min="0"
                  value={shoppingAmount}
                  onChange={(e) => setShoppingAmount(e.target.value)}
                  placeholder="e.g. 3500"
                  className="w-full pl-10 pr-14 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  INR
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Total retail purchase cart value</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 active:bg-rose-800 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Discount</span>
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
                Discount & Billing Summary
              </h2>
            </div>

            {/* Final Amount Hero Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 text-white shadow-md mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-rose-100">
                  Final Payable Amount
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-xs">
                  {result.discountPercentage > 0 ? (
                    <>
                      <Sparkles className="w-3 h-3" />
                      Saved ₹{result.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </>
                  ) : (
                    <>
                      <Tag className="w-3 h-3" />
                      Regular Price
                    </>
                  )}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 font-mono tabular-nums">
                ₹{result.finalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-rose-100">
                <span>
                  Customer: <strong className="text-white">{result.customerName}</strong>
                </span>
                <span>
                  Applied: <strong className="text-white">{result.discountPercentage}% OFF</strong> ({result.tierLabel})
                </span>
              </div>
            </div>

            {/* Parameter Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Customer Name</span>
                <span className="text-base font-bold text-slate-900 truncate block">
                  {result.customerName}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Original Amount</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  ₹{result.originalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Discount Rate</span>
                <span className="text-base font-bold text-rose-600 font-mono tabular-nums">
                  {result.discountPercentage}%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Discount Saved</span>
                <span className="text-base font-bold text-emerald-700 font-mono tabular-nums">
                  ₹{result.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Final Amount</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  ₹{result.finalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Info className="w-4 h-4 text-rose-600" />
                <span>Calculation Formula:</span>
              </div>
              <p className="font-mono text-slate-700 pl-5">
                • Discount Amount = Original Amount (₹{result.originalAmount.toLocaleString()}) × {result.discountPercentage}% ÷ 100 = ₹{result.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
              <p className="font-mono text-slate-700 pl-5">
                • Final Payable Amount = Original Amount (₹{result.originalAmount.toLocaleString()}) − Discount Amount (₹{result.discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}) = ₹{result.finalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-rose-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All 10 Calculators</span>
        </button>
      </div>
    </div>
  );
}
