import { useState } from 'react';
import { ArrowLeft, RotateCcw, Calculator, Fuel, Gauge, IndianRupee, AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface FuelCostCalculatorProps {
  onBack: () => void;
}

interface CalculationResult {
  distance: number;
  mileage: number;
  fuelPrice: number;
  fuelRequired: number;
  totalCost: number;
  costPerKm: number;
}

export function FuelCostCalculator({ onBack }: FuelCostCalculatorProps) {
  // Input form state
  const [distance, setDistance] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');

  // Result and error state
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Calculation handler with validation
  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // 1. Check for empty inputs
    if (!distance.trim() || !mileage.trim() || !fuelPrice.trim()) {
      setErrorMessage('Please fill in all three fields: Distance, Mileage, and Fuel Price.');
      setResult(null);
      return;
    }

    // 2. Parse numbers
    const distNum = parseFloat(distance);
    const mileageNum = parseFloat(mileage);
    const priceNum = parseFloat(fuelPrice);

    // 3. Check for non-numeric input
    if (isNaN(distNum) || isNaN(mileageNum) || isNaN(priceNum)) {
      setErrorMessage('Please enter valid numeric values only.');
      setResult(null);
      return;
    }

    // 4. Check for negative values
    if (distNum < 0 || mileageNum < 0 || priceNum < 0) {
      setErrorMessage('Values cannot be negative. Please enter positive numbers.');
      setResult(null);
      return;
    }

    // 5. Check for zero values
    if (distNum === 0) {
      setErrorMessage('Distance travelled must be greater than zero.');
      setResult(null);
      return;
    }

    if (mileageNum === 0) {
      setErrorMessage('Mileage cannot be zero (division by zero is not possible).');
      setResult(null);
      return;
    }

    if (priceNum === 0) {
      setErrorMessage('Fuel price must be greater than zero.');
      setResult(null);
      return;
    }

    // Calculation formulas
    // Fuel Required = Distance ÷ Mileage
    const fuelRequired = distNum / mileageNum;

    // Fuel Cost = Fuel Required × Fuel Price
    const totalCost = fuelRequired * priceNum;
    const costPerKm = totalCost / distNum;

    setResult({
      distance: distNum,
      mileage: mileageNum,
      fuelPrice: priceNum,
      fuelRequired: fuelRequired,
      totalCost: totalCost,
      costPerKm: costPerKm,
    });
  };

  // Reset handler to clear inputs and results
  const handleReset = () => {
    setDistance('');
    setMileage('');
    setFuelPrice('');
    setResult(null);
    setErrorMessage(null);
  };

  // Quick preset sample for easy testing
  const handleLoadSample = (sampleDist: number, sampleMileage: number, samplePrice: number) => {
    setDistance(sampleDist.toString());
    setMileage(sampleMileage.toString());
    setFuelPrice(samplePrice.toString());
    setErrorMessage(null);
    
    const fuelReq = sampleDist / sampleMileage;
    const total = fuelReq * samplePrice;
    setResult({
      distance: sampleDist,
      mileage: sampleMileage,
      fuelPrice: samplePrice,
      fuelRequired: fuelReq,
      totalCost: total,
      costPerKm: total / sampleDist,
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
          Module 1 of 10 · Transport & Travel
        </span>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl shrink-0">
            🚗
          </div>
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Real-World Calculator
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Fuel Cost Calculator
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Estimate your journey's fuel requirement and calculate total travel cost in Indian Rupees (₹) based on distance, vehicle mileage, and fuel price.
            </p>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Quick Test Samples:</span>
          <button
            type="button"
            onClick={() => handleLoadSample(120, 15, 102.5)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            City Car (120 km @ 15 km/L)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample(350, 45, 96.7)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Motorcycle Trip (350 km @ 45 km/L)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample(600, 12, 105.0)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Highway SUV (600 km @ 12 km/L)
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Input 1: Distance */}
            <div>
              <label htmlFor="distance" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Distance Travelled (km)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Gauge className="w-4 h-4" />
                </div>
                <input
                  id="distance"
                  type="number"
                  step="any"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="e.g. 250"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  km
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Total one-way or round trip distance</p>
            </div>

            {/* Input 2: Mileage */}
            <div>
              <label htmlFor="mileage" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Vehicle Mileage (km/L)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Fuel className="w-4 h-4" />
                </div>
                <input
                  id="mileage"
                  type="number"
                  step="any"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  placeholder="e.g. 18"
                  className="w-full pl-10 pr-14 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  km/L
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Kilometres per litre of fuel</p>
            </div>

            {/* Input 3: Fuel Price */}
            <div>
              <label htmlFor="fuelPrice" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                3. Fuel Price (₹ / Litre)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <input
                  id="fuelPrice"
                  type="number"
                  step="any"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                  placeholder="e.g. 102.50"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  ₹/L
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Current petrol or diesel rate</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Fuel Cost</span>
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
                Calculation Summary
              </h2>
            </div>

            {/* Prominent Total Fuel Cost Highlight */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md mb-6">
              <div className="text-xs uppercase tracking-wider font-semibold text-blue-100">
                Total Fuel Cost
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 font-mono tabular-nums">
                ₹{result.totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-blue-100">
                <span>
                  Fuel Required: <strong className="text-white font-mono">{result.fuelRequired.toFixed(2)} Litres</strong>
                </span>
                <span>
                  Running Cost: <strong className="text-white font-mono">₹{result.costPerKm.toFixed(2)} / km</strong>
                </span>
              </div>
            </div>

            {/* Parameter Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Distance</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {result.distance.toLocaleString()} km
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Mileage</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {result.mileage} km/L
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Fuel Price</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  ₹{result.fuelPrice.toFixed(2)} / L
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Fuel Needed</span>
                <span className="text-base font-bold text-blue-600 font-mono tabular-nums">
                  {result.fuelRequired.toFixed(2)} L
                </span>
              </div>
            </div>

            {/* Formula Explanation (Student / Academic Context) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Info className="w-4 h-4 text-blue-600" />
                <span>Calculation Formulae Applied:</span>
              </div>
              <p className="font-mono text-slate-700 pl-5">
                • Fuel Required = Distance ÷ Mileage = {result.distance} ÷ {result.mileage} = {result.fuelRequired.toFixed(3)} Litres
              </p>
              <p className="font-mono text-slate-700 pl-5">
                • Total Fuel Cost = Fuel Required × Price = {result.fuelRequired.toFixed(3)} × ₹{result.fuelPrice.toFixed(2)} = ₹{result.totalCost.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All 10 Calculators</span>
        </button>
      </div>
    </div>
  );
}
