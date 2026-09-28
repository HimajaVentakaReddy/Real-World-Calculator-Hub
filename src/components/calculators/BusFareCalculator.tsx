import { useState } from 'react';
import { ArrowLeft, RotateCcw, Calculator, Bus, User, Navigation, AlertCircle, CheckCircle2, Info, Ticket, GraduationCap, Users } from 'lucide-react';

interface BusFareCalculatorProps {
  onBack: () => void;
}

type PassengerTypeKey = 'adult' | 'student' | 'senior';

interface PassengerTypeConfig {
  key: PassengerTypeKey;
  label: string;
  ratePerKm: number;
  description: string;
}

const PASSENGER_TYPES: PassengerTypeConfig[] = [
  {
    key: 'adult',
    label: 'Adult',
    ratePerKm: 2.0,
    description: 'Standard commuter ticket at full regular fare',
  },
  {
    key: 'student',
    label: 'Student',
    ratePerKm: 1.0,
    description: 'Subsidized 50% concession for school & college students',
  },
  {
    key: 'senior',
    label: 'Senior Citizen',
    ratePerKm: 1.5,
    description: 'Special 25% discounted concession for citizens aged 60+',
  },
];

interface BusFareResult {
  passengerName: string;
  distanceKm: number;
  passengerTypeLabel: string;
  ratePerKm: number;
  totalFare: number;
}

export function BusFareCalculator({ onBack }: BusFareCalculatorProps) {
  const [passengerName, setPassengerName] = useState('');
  const [distance, setDistance] = useState('');
  const [selectedType, setSelectedType] = useState<PassengerTypeKey | ''>('adult');

  const [result, setResult] = useState<BusFareResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // 1. Validate passenger name
    if (!passengerName.trim()) {
      setErrorMessage('Please enter the passenger name.');
      setResult(null);
      return;
    }

    // 2. Validate passenger type
    if (!selectedType) {
      setErrorMessage('Please select a passenger category.');
      setResult(null);
      return;
    }

    // 3. Validate empty distance
    if (!distance.trim()) {
      setErrorMessage('Please enter the distance travelled in kilometres.');
      setResult(null);
      return;
    }

    // 4. Parse distance
    const distNum = parseFloat(distance);

    // 5. Validate non-numeric input
    if (isNaN(distNum)) {
      setErrorMessage('Distance must be a valid number.');
      setResult(null);
      return;
    }

    // 6. Validate negative distance
    if (distNum < 0) {
      setErrorMessage('Distance travelled cannot be negative.');
      setResult(null);
      return;
    }

    // 7. Validate zero distance
    if (distNum === 0) {
      setErrorMessage('Distance travelled must be greater than zero km.');
      setResult(null);
      return;
    }

    // Find passenger configuration
    const typeConfig = PASSENGER_TYPES.find((p) => p.key === selectedType);
    if (!typeConfig) {
      setErrorMessage('Please select a valid passenger type.');
      setResult(null);
      return;
    }

    // Calculation: Fare = Distance × Rate per km
    const total = distNum * typeConfig.ratePerKm;

    setResult({
      passengerName: passengerName.trim(),
      distanceKm: distNum,
      passengerTypeLabel: typeConfig.label,
      ratePerKm: typeConfig.ratePerKm,
      totalFare: total,
    });
  };

  const handleReset = () => {
    setPassengerName('');
    setDistance('');
    setSelectedType('adult');
    setResult(null);
    setErrorMessage(null);
  };

  const handleLoadSample = (name: string, dist: number, typeKey: PassengerTypeKey) => {
    setPassengerName(name);
    setDistance(dist.toString());
    setSelectedType(typeKey);
    setErrorMessage(null);

    const typeConfig = PASSENGER_TYPES.find((p) => p.key === typeKey)!;
    setResult({
      passengerName: name,
      distanceKm: dist,
      passengerTypeLabel: typeConfig.label,
      ratePerKm: typeConfig.ratePerKm,
      totalFare: dist * typeConfig.ratePerKm,
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
          Module 4 of 10 · Transport & Travel
        </span>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-3xl shrink-0">
            🚌
          </div>
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Real-World Calculator
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Bus Fare Calculator
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Estimate city or intercity transit ticket costs in Indian Rupees (₹) based on travel distance and passenger concession categories.
            </p>
          </div>
        </div>

        {/* Passenger Type Cards */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Select Passenger Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PASSENGER_TYPES.map((type) => {
              const isSelected = selectedType === type.key;
              return (
                <button
                  type="button"
                  key={type.key}
                  onClick={() => setSelectedType(type.key)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      {type.key === 'student' ? (
                        <GraduationCap className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                      ) : (
                        <Users className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                      )}
                      {type.label}
                    </span>
                    <span className="text-xs font-bold text-indigo-700 font-mono">
                      ₹{type.ratePerKm.toFixed(2)}/km
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {type.description}
                  </p>
                  <div className="mt-2 text-[11px] font-semibold text-slate-600">
                    Rate: ₹{type.ratePerKm.toFixed(2)} per km
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
            onClick={() => handleLoadSample('Aarav Mehta', 25, 'adult')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Aarav (25 km · Adult @ ₹2/km)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Meera Nair', 18, 'student')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Meera (18 km · Student @ ₹1/km)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Devraj Sen', 40, 'senior')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Devraj (40 km · Senior @ ₹1.50/km)
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
            {/* Input 1: Passenger Name */}
            <div>
              <label htmlFor="passengerName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Passenger Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="passengerName"
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="e.g. Rohini Sharma"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Full name of the commuter</p>
            </div>

            {/* Input 2: Distance Travelled */}
            <div>
              <label htmlFor="distance" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Distance Travelled (km)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Navigation className="w-4 h-4 text-indigo-600" />
                </div>
                <input
                  id="distance"
                  type="number"
                  step="any"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full pl-10 pr-14 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  km
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Route distance between boarding and destination</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Fare</span>
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
                Transit Fare Ticket Summary
              </h2>
            </div>

            {/* Prominent Total Bus Fare Highlight */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-md mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-indigo-100">
                  Total Bus Fare
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-xs">
                  <Ticket className="w-3 h-3" />
                  E-Ticket
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 font-mono tabular-nums">
                ₹{result.totalFare.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-indigo-100">
                <span>
                  Passenger: <strong className="text-white">{result.passengerName}</strong>
                </span>
                <span>
                  Category: <strong className="text-white">{result.passengerTypeLabel}</strong> (₹{result.ratePerKm.toFixed(2)}/km)
                </span>
              </div>
            </div>

            {/* Parameter Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Passenger</span>
                <span className="text-base font-bold text-slate-900 truncate block">
                  {result.passengerName}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Distance</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {result.distanceKm.toLocaleString()} km
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Category</span>
                <span className="text-base font-bold text-slate-900 block truncate">
                  {result.passengerTypeLabel}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Rate per km</span>
                <span className="text-base font-bold text-indigo-700 font-mono tabular-nums">
                  ₹{result.ratePerKm.toFixed(2)}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Total Fare</span>
                <span className="text-base font-bold text-emerald-700 font-mono tabular-nums">
                  ₹{result.totalFare.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>Fare Computation Formula:</span>
              </div>
              <p className="font-mono text-slate-700 pl-5">
                • Bus Fare = Distance × Rate per km = {result.distanceKm} km × ₹{result.ratePerKm.toFixed(2)} = ₹{result.totalFare.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All 10 Calculators</span>
        </button>
      </div>
    </div>
  );
}
