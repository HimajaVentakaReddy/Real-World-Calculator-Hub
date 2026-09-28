import { useState } from 'react';
import { ArrowLeft, RotateCcw, Smartphone, Calendar, AlertCircle, CheckCircle2, Clock, Info, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface MobileRechargeCheckerProps {
  onBack: () => void;
}

type PlanKey = 'basic' | 'standard' | 'premium';

interface RechargePlanConfig {
  key: PlanKey;
  name: string;
  price: number;
  typicalValidity: number;
  description: string;
}

const RECHARGE_PLANS: RechargePlanConfig[] = [
  {
    key: 'basic',
    name: 'Basic Plan',
    price: 199,
    typicalValidity: 28,
    description: 'Unlimited local/STD calls + 1 GB/day data + 100 SMS/day',
  },
  {
    key: 'standard',
    name: 'Standard Plan',
    price: 299,
    typicalValidity: 28,
    description: 'Unlimited calls + 1.5 GB/day high-speed data + weekend rollover',
  },
  {
    key: 'premium',
    name: 'Premium Plan',
    price: 499,
    typicalValidity: 56,
    description: 'Unlimited 5G data + 2 GB/day 4G + OTT streaming subscription',
  },
];

interface RechargeResult {
  mobileNumber: string;
  planName: string;
  rechargeAmount: number;
  rechargeDateFormatted: string;
  validityDays: number;
  expiryDateFormatted: string;
  status: 'Active' | 'Expired';
  daysRemainingOrOverdue: number;
}

export function MobileRechargeChecker({ onBack }: MobileRechargeCheckerProps) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedPlanKey, setSelectedPlanKey] = useState<PlanKey | ''>('basic');
  const [rechargeDate, setRechargeDate] = useState('');
  const [validityDays, setValidityDays] = useState('28');

  const [result, setResult] = useState<RechargeResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatDateDisplay = (dateObj: Date): string => {
    return dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handlePlanSelect = (plan: RechargePlanConfig) => {
    setSelectedPlanKey(plan.key);
    if (!validityDays || validityDays === '28' || validityDays === '56' || validityDays === '84') {
      setValidityDays(plan.typicalValidity.toString());
    }
  };

  const handleCheckRecharge = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // 1. Validate empty mobile number
    const cleanedNumber = mobileNumber.trim();
    if (!cleanedNumber) {
      setErrorMessage('Please enter your 10-digit mobile number.');
      setResult(null);
      return;
    }

    // 2. Validate 10-digit numeric format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(cleanedNumber)) {
      setErrorMessage('Mobile number must be exactly 10 digits (numbers only, e.g., 9876543210).');
      setResult(null);
      return;
    }

    // 3. Validate plan selection
    if (!selectedPlanKey) {
      setErrorMessage('Please select a recharge plan.');
      setResult(null);
      return;
    }

    const planConfig = RECHARGE_PLANS.find((p) => p.key === selectedPlanKey);
    if (!planConfig) {
      setErrorMessage('Please select a valid recharge plan.');
      setResult(null);
      return;
    }

    // 4. Validate empty recharge date
    if (!rechargeDate.trim()) {
      setErrorMessage('Please select the recharge date.');
      setResult(null);
      return;
    }

    // 5. Validate date validity
    const parsedDate = new Date(rechargeDate);
    if (isNaN(parsedDate.getTime())) {
      setErrorMessage('Invalid recharge date. Please select a valid calendar date.');
      setResult(null);
      return;
    }

    // 6. Validate empty validity days
    if (!validityDays.trim()) {
      setErrorMessage('Please enter the validity period in days.');
      setResult(null);
      return;
    }

    // 7. Parse validity days
    const daysNum = parseFloat(validityDays);

    // 8. Validate non-numeric
    if (isNaN(daysNum)) {
      setErrorMessage('Validity period must be a valid number of days.');
      setResult(null);
      return;
    }

    // 9. Validate integer
    if (!Number.isInteger(daysNum)) {
      setErrorMessage('Validity period must be a whole integer number of days.');
      setResult(null);
      return;
    }

    // 10. Validate zero or negative validity
    if (daysNum <= 0) {
      setErrorMessage('Validity period must be greater than 0 days.');
      setResult(null);
      return;
    }

    // Calculation: Expiry Date = Recharge Date + Validity Period
    // Using date components to avoid timezone shift
    const [year, month, day] = rechargeDate.split('-').map(Number);
    const startDate = new Date(year, month - 1, day);
    const expiryDate = new Date(year, month - 1, day);
    expiryDate.setDate(expiryDate.getDate() + daysNum);

    // Normalize today's date to midnight for accurate day-level comparison
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Status Determination:
    // If current date is before or on the expiry date: Active
    // If current date is after the expiry date: Expired
    const isExpired = today.getTime() > expiryDate.getTime();
    const status: 'Active' | 'Expired' = isExpired ? 'Expired' : 'Active';

    // Calculate days remaining or days overdue
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setResult({
      mobileNumber: cleanedNumber,
      planName: planConfig.name,
      rechargeAmount: planConfig.price,
      rechargeDateFormatted: formatDateDisplay(startDate),
      validityDays: daysNum,
      expiryDateFormatted: formatDateDisplay(expiryDate),
      status,
      daysRemainingOrOverdue: Math.abs(diffDays),
    });
  };

  const handleReset = () => {
    setMobileNumber('');
    setSelectedPlanKey('basic');
    setRechargeDate('');
    setValidityDays('28');
    setResult(null);
    setErrorMessage(null);
  };

  // Helper for quick test samples
  const handleLoadSample = (sampleType: 'active' | 'expired') => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (sampleType === 'active') {
      // Recharge done 5 days ago with 28 days validity (Expires in 23 days)
      const pastDate = new Date(today);
      pastDate.setDate(pastDate.getDate() - 5);
      const yyyy = pastDate.getFullYear();
      const mm = String(pastDate.getMonth() + 1).padStart(2, '0');
      const dd = String(pastDate.getDate()).padStart(2, '0');
      const dateString = `${yyyy}-${mm}-${dd}`;

      setMobileNumber('9876543210');
      setSelectedPlanKey('standard');
      setRechargeDate(dateString);
      setValidityDays('28');
      setErrorMessage(null);

      const planConfig = RECHARGE_PLANS.find((p) => p.key === 'standard')!;
      const expiry = new Date(pastDate);
      expiry.setDate(expiry.getDate() + 28);
      const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      setResult({
        mobileNumber: '9876543210',
        planName: planConfig.name,
        rechargeAmount: planConfig.price,
        rechargeDateFormatted: formatDateDisplay(pastDate),
        validityDays: 28,
        expiryDateFormatted: formatDateDisplay(expiry),
        status: 'Active',
        daysRemainingOrOverdue: diffDays,
      });
    } else {
      // Recharge done 45 days ago with 28 days validity (Expired 17 days ago)
      const pastDate = new Date(today);
      pastDate.setDate(pastDate.getDate() - 45);
      const yyyy = pastDate.getFullYear();
      const mm = String(pastDate.getMonth() + 1).padStart(2, '0');
      const dd = String(pastDate.getDate()).padStart(2, '0');
      const dateString = `${yyyy}-${mm}-${dd}`;

      setMobileNumber('9123456780');
      setSelectedPlanKey('basic');
      setRechargeDate(dateString);
      setValidityDays('28');
      setErrorMessage(null);

      const planConfig = RECHARGE_PLANS.find((p) => p.key === 'basic')!;
      const expiry = new Date(pastDate);
      expiry.setDate(expiry.getDate() + 28);
      const diffDays = Math.ceil((today.getTime() - expiry.getTime()) / (1000 * 60 * 60 * 24));

      setResult({
        mobileNumber: '9123456780',
        planName: planConfig.name,
        rechargeAmount: planConfig.price,
        rechargeDateFormatted: formatDateDisplay(pastDate),
        validityDays: 28,
        expiryDateFormatted: formatDateDisplay(expiry),
        status: 'Expired',
        daysRemainingOrOverdue: diffDays,
      });
    }
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
          Module 6 of 10 · Utilities & Bills
        </span>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-3xl shrink-0">
            📱
          </div>
          <div>
            <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">
              Real-World Calculator
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Mobile Recharge Checker
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Verify prepaid mobile plan validity, compute exact expiry dates, and check live active/expired service status.
            </p>
          </div>
        </div>

        {/* Plan Selection Cards */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Select Recharge Plan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RECHARGE_PLANS.map((plan) => {
              const isSelected = selectedPlanKey === plan.key;
              return (
                <button
                  type="button"
                  key={plan.key}
                  onClick={() => handlePlanSelect(plan)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-violet-50/70 border-violet-500 ring-2 ring-violet-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Smartphone className={`w-4 h-4 ${isSelected ? 'text-violet-600' : 'text-slate-400'}`} />
                      {plan.name}
                    </span>
                    <span className="text-sm font-extrabold text-violet-700 font-mono">
                      ₹{plan.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {plan.description}
                  </p>
                  <div className="mt-2 text-[11px] font-semibold text-slate-600">
                    Standard Validity: {plan.typicalValidity} Days
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Test Samples */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Quick Test Samples:</span>
          <button
            type="button"
            onClick={() => handleLoadSample('active')}
            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Test Active Plan (₹299 · Standard)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('expired')}
            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Test Expired Plan (₹199 · Basic)</span>
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
        <form onSubmit={handleCheckRecharge} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Input 1: Mobile Number */}
            <div>
              <label htmlFor="mobileNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Mobile Number (10 Digits)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <input
                  id="mobileNumber"
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setMobileNumber(val);
                  }}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all font-mono"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                {mobileNumber.length}/10 digits entered
              </p>
            </div>

            {/* Input 2: Recharge Date */}
            <div>
              <label htmlFor="rechargeDate" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Recharge Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4 text-violet-600" />
                </div>
                <input
                  id="rechargeDate"
                  type="date"
                  value={rechargeDate}
                  onChange={(e) => setRechargeDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Date when recharge was processed</p>
            </div>

            {/* Input 3: Validity Period (Days) */}
            <div>
              <label htmlFor="validityDays" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                3. Validity Period (Days)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Clock className="w-4 h-4 text-violet-600" />
                </div>
                <input
                  id="validityDays"
                  type="number"
                  min="1"
                  step="1"
                  value={validityDays}
                  onChange={(e) => setValidityDays(e.target.value)}
                  placeholder="e.g. 28"
                  className="w-full pl-10 pr-14 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  Days
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Pack validity duration in days</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 active:bg-violet-800 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>Check Recharge</span>
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
                Prepaid Subscription Status
              </h2>
            </div>

            {/* Status Hero Card */}
            <div
              className={`p-6 rounded-2xl text-white shadow-md mb-6 ${
                result.status === 'Active'
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-700'
                  : 'bg-gradient-to-br from-rose-600 to-red-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
                  Plan Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs">
                  {result.status === 'Active' ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                      Active Plan
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-200" />
                      Plan Expired
                    </>
                  )}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 flex items-center gap-3">
                <span>{result.status}</span>
                <span className="text-lg font-medium opacity-90">
                  ({result.status === 'Active' ? `${result.daysRemainingOrOverdue} days remaining` : `Expired ${result.daysRemainingOrOverdue} days ago`})
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-white/90">
                <span>
                  Mobile: <strong className="text-white font-mono">+91 {result.mobileNumber}</strong>
                </span>
                <span>
                  Pack: <strong className="text-white">{result.planName}</strong> (₹{result.rechargeAmount})
                </span>
              </div>
            </div>

            {/* Parameter Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Mobile Number</span>
                <span className="text-base font-bold text-slate-900 font-mono block">
                  {result.mobileNumber}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Selected Plan</span>
                <span className="text-base font-bold text-slate-900 block truncate">
                  {result.planName}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Recharge Amount</span>
                <span className="text-base font-bold text-violet-700 font-mono tabular-nums">
                  ₹{result.rechargeAmount}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Validity Period</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {result.validityDays} Days
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Recharge Date</span>
                <span className="text-sm font-bold text-slate-900 block">
                  {result.rechargeDateFormatted}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Expiry Date</span>
                <span className="text-sm font-bold text-slate-900 block">
                  {result.expiryDateFormatted}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 col-span-2">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Current Service Status</span>
                <span className={`text-base font-extrabold flex items-center gap-1.5 ${result.status === 'Active' ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {result.status === 'Active' ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Active (Services Running)
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4" />
                      Expired (Immediate Recharge Recommended)
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Info className="w-4 h-4 text-violet-600" />
                <span>Expiry Calculation Formula:</span>
              </div>
              <p className="font-mono text-slate-700 pl-5">
                • Expiry Date = Recharge Date ({result.rechargeDateFormatted}) + Validity ({result.validityDays} days) = {result.expiryDateFormatted}
              </p>
              <p className="text-slate-700 pl-5">
                • Comparison: Current Date vs. Expiry Date $\rightarrow$ Status: <strong className={result.status === 'Active' ? 'text-emerald-700' : 'text-rose-600'}>{result.status}</strong>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All 10 Calculators</span>
        </button>
      </div>
    </div>
  );
}
