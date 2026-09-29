import { useState } from 'react';
import { ArrowLeft, RotateCcw, Thermometer, MapPin, AlertCircle, CheckCircle2, Info, Snowflake, Sun, AlertTriangle, Flame } from 'lucide-react';

interface TemperatureAlertCheckerProps {
  onBack: () => void;
}

type TemperatureCategory = 'Low Temperature' | 'Normal Temperature' | 'High Temperature' | 'Very High Temperature';

interface TemperatureResult {
  locationName: string;
  temperature: number;
  category: TemperatureCategory;
  alertMessage: string;
  fahrenheit: number;
}

export function TemperatureAlertChecker({ onBack }: TemperatureAlertCheckerProps) {
  const [locationName, setLocationName] = useState('');
  const [temperature, setTemperature] = useState('');

  const [result, setResult] = useState<TemperatureResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const evaluateTemperature = (location: string, tempNum: number): TemperatureResult => {
    let category: TemperatureCategory;
    let alertMessage: string;

    if (tempNum < 20) {
      category = 'Low Temperature';
      alertMessage = 'Temperature is low.';
    } else if (tempNum <= 30) {
      category = 'Normal Temperature';
      alertMessage = 'Temperature is normal.';
    } else if (tempNum <= 40) {
      category = 'High Temperature';
      alertMessage = 'Warning: Temperature is high.';
    } else {
      category = 'Very High Temperature';
      alertMessage = 'Alert: Temperature is very high.';
    }

    const fahrenheit = (tempNum * 9) / 5 + 32;

    return {
      locationName: location.trim(),
      temperature: tempNum,
      category,
      alertMessage,
      fahrenheit,
    };
  };

  const handleCheckTemperature = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // 1. Validate location name
    if (!locationName.trim()) {
      setErrorMessage('Please enter the location name.');
      setResult(null);
      return;
    }

    // 2. Validate empty temperature
    if (!temperature.trim()) {
      setErrorMessage('Please enter the temperature value in °C.');
      setResult(null);
      return;
    }

    // 3. Parse temperature
    const tempNum = parseFloat(temperature);

    // 4. Validate non-numeric input
    if (isNaN(tempNum)) {
      setErrorMessage('Temperature must be a valid numeric value.');
      setResult(null);
      return;
    }

    const evalResult = evaluateTemperature(locationName, tempNum);
    setResult(evalResult);
  };

  const handleReset = () => {
    setLocationName('');
    setTemperature('');
    setResult(null);
    setErrorMessage(null);
  };

  const handleLoadSample = (sampleLocation: string, sampleTemp: number) => {
    setLocationName(sampleLocation);
    setTemperature(sampleTemp.toString());
    setErrorMessage(null);

    const evalResult = evaluateTemperature(sampleLocation, sampleTemp);
    setResult(evalResult);
  };

  // Helper for status colors and icons
  const getCategoryTheme = (category: TemperatureCategory) => {
    switch (category) {
      case 'Low Temperature':
        return {
          bannerBg: 'bg-gradient-to-br from-cyan-600 to-blue-700',
          badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-800',
          icon: Snowflake,
          textColor: 'text-cyan-700',
        };
      case 'Normal Temperature':
        return {
          bannerBg: 'bg-gradient-to-br from-emerald-600 to-teal-700',
          badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: Sun,
          textColor: 'text-emerald-700',
        };
      case 'High Temperature':
        return {
          bannerBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
          badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: AlertTriangle,
          textColor: 'text-amber-700',
        };
      case 'Very High Temperature':
        return {
          bannerBg: 'bg-gradient-to-br from-rose-600 to-red-700',
          badgeBg: 'bg-rose-50 border-rose-200 text-rose-800',
          icon: Flame,
          textColor: 'text-rose-700',
        };
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
          Module 8 of 10 · Science & Weather
        </span>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl shrink-0">
            🌡️
          </div>
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
              Real-World Calculator
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Temperature Alert Checker
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Monitor regional weather readings in Celsius (°C) and generate instant climate threshold advisories.
            </p>
          </div>
        </div>

        {/* Temperature Thresholds Overview */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Thermometer className="w-4 h-4 text-amber-600" />
            <span>Temperature Classification Ranges:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">Below 20°C</span>
              <span className="text-cyan-700 font-bold">Low Temperature</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">20°C to 30°C</span>
              <span className="text-emerald-700 font-bold">Normal Temperature</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">31°C to 40°C</span>
              <span className="text-amber-700 font-bold">High Temperature</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-900 block">Above 40°C</span>
              <span className="text-rose-700 font-bold">Very High Temperature</span>
            </div>
          </div>
        </div>

        {/* Quick Test Samples */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Quick Test Samples:</span>
          <button
            type="button"
            onClick={() => handleLoadSample('Manali', 12)}
            className="px-2.5 py-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 rounded-lg transition-colors cursor-pointer"
          >
            Manali (12°C · Low)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Bengaluru', 25)}
            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            Bengaluru (25°C · Normal)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Hyderabad', 35)}
            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg transition-colors cursor-pointer"
          >
            Hyderabad (35°C · High)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Nagpur', 43)}
            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-lg transition-colors cursor-pointer"
          >
            Nagpur (43°C · Very High)
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
        <form onSubmit={handleCheckTemperature} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Input 1: Location Name */}
            <div>
              <label htmlFor="locationName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Location Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  id="locationName"
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. Shimla or Chennai"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">City, town, or regional weather station</p>
            </div>

            {/* Input 2: Temperature (°C) */}
            <div>
              <label htmlFor="temperature" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Temperature (°C)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Thermometer className="w-4 h-4 text-amber-600" />
                </div>
                <input
                  id="temperature"
                  type="number"
                  step="any"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="e.g. 25 (negative values allowed)"
                  className="w-full pl-10 pr-14 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  °C
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Accepts positive and negative Celsius temperatures</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 active:bg-amber-800 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              <Thermometer className="w-4 h-4" />
              <span>Check Temperature</span>
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
        {result && (() => {
          const theme = getCategoryTheme(result.category);
          const IconComp = theme.icon;

          return (
            <div className="mt-8 pt-8 border-t border-slate-200 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  Temperature Advisory Report
                </h2>
              </div>

              {/* Status Hero Banner */}
              <div className={`p-6 rounded-2xl ${theme.bannerBg} text-white shadow-md mb-6`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
                    Climate Status · {result.locationName}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs">
                    <IconComp className="w-3.5 h-3.5" />
                    {result.category}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 flex items-baseline gap-3">
                  <span className="font-mono">{result.temperature}°C</span>
                  <span className="text-lg font-normal text-white/80 font-mono">
                    ({result.fahrenheit.toFixed(1)}°F)
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-white/20 text-sm font-semibold text-white flex items-center gap-2">
                  <span>{result.alertMessage}</span>
                </div>
              </div>

              {/* Parameter Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-medium text-slate-500 uppercase block">Location</span>
                  <span className="text-base font-bold text-slate-900 truncate block">
                    {result.locationName}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-medium text-slate-500 uppercase block">Entered Temp</span>
                  <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    {result.temperature}°C
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-medium text-slate-500 uppercase block">Category</span>
                  <span className={`text-sm font-bold block truncate ${theme.textColor}`}>
                    {result.category}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-medium text-slate-500 uppercase block">Advisory</span>
                  <span className="text-xs font-semibold text-slate-800 block truncate">
                    {result.alertMessage}
                  </span>
                </div>
              </div>

              {/* Rules and Explanation */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Threshold Breakdown & Evaluation:</span>
                </div>
                <p className="text-slate-700 pl-5">
                  • Evaluated reading: <strong className="font-mono">{result.temperature}°C</strong> for <strong className="text-slate-900">{result.locationName}</strong>
                </p>
                <p className="text-slate-700 pl-5">
                  • Applicable category: <strong className={theme.textColor}>{result.category}</strong>
                </p>
                <p className="text-slate-700 pl-5">
                  • System Message: &ldquo;<strong className="text-slate-900">{result.alertMessage}</strong>&rdquo;
                </p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All 10 Calculators</span>
        </button>
      </div>
    </div>
  );
}
