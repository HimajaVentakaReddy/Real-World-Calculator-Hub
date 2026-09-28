import { useState } from 'react';
import { ArrowLeft, RotateCcw, Calculator, Hotel, User, CalendarDays, AlertCircle, CheckCircle2, Info, Receipt, BedDouble } from 'lucide-react';

interface HotelBillCalculatorProps {
  onBack: () => void;
}

type RoomTypeKey = 'standard' | 'deluxe' | 'suite';

interface RoomTypeConfig {
  key: RoomTypeKey;
  label: string;
  ratePerDay: number;
  description: string;
}

const ROOM_TYPES: RoomTypeConfig[] = [
  {
    key: 'standard',
    label: 'Standard Room',
    ratePerDay: 1500,
    description: 'Comfortable single/double bed, essential amenities & Wi-Fi',
  },
  {
    key: 'deluxe',
    label: 'Deluxe Room',
    ratePerDay: 2500,
    description: 'Spacious room, king-size bed, balcony view & complimentary breakfast',
  },
  {
    key: 'suite',
    label: 'Suite Room',
    ratePerDay: 4000,
    description: 'Luxury multi-room suite, lounge area, premium bar & 24/7 concierge',
  },
];

interface HotelBillResult {
  customerName: string;
  roomTypeLabel: string;
  numberOfDays: number;
  ratePerDay: number;
  totalRoomCost: number;
}

export function HotelBillCalculator({ onBack }: HotelBillCalculatorProps) {
  const [customerName, setCustomerName] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeKey | ''>('standard');

  const [result, setResult] = useState<HotelBillResult | null>(null);
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

    // 2. Validate room type selection
    if (!selectedRoomType) {
      setErrorMessage('Please select a valid room type.');
      setResult(null);
      return;
    }

    // 3. Validate empty number of days
    if (!numberOfDays.trim()) {
      setErrorMessage('Please enter the number of days of stay.');
      setResult(null);
      return;
    }

    // 4. Parse days
    const daysNum = parseFloat(numberOfDays);

    // 5. Validate non-numeric input
    if (isNaN(daysNum)) {
      setErrorMessage('Number of days must be a valid number.');
      setResult(null);
      return;
    }

    // 6. Validate integer/whole days
    if (!Number.isInteger(daysNum)) {
      setErrorMessage('Number of days must be a whole integer number.');
      setResult(null);
      return;
    }

    // 7. Validate negative days
    if (daysNum < 0) {
      setErrorMessage('Number of days cannot be negative.');
      setResult(null);
      return;
    }

    // 8. Validate zero days
    if (daysNum === 0) {
      setErrorMessage('Number of days must be at least 1 day.');
      setResult(null);
      return;
    }

    // Find selected room configuration
    const roomConfig = ROOM_TYPES.find((r) => r.key === selectedRoomType);
    if (!roomConfig) {
      setErrorMessage('Please select a valid room type from the list.');
      setResult(null);
      return;
    }

    // Calculation: Room Cost = Number of Days × Room Rate
    const total = daysNum * roomConfig.ratePerDay;

    setResult({
      customerName: customerName.trim(),
      roomTypeLabel: roomConfig.label,
      numberOfDays: daysNum,
      ratePerDay: roomConfig.ratePerDay,
      totalRoomCost: total,
    });
  };

  const handleReset = () => {
    setCustomerName('');
    setNumberOfDays('');
    setSelectedRoomType('standard');
    setResult(null);
    setErrorMessage(null);
  };

  const handleLoadSample = (sampleName: string, days: number, roomKey: RoomTypeKey) => {
    setCustomerName(sampleName);
    setNumberOfDays(days.toString());
    setSelectedRoomType(roomKey);
    setErrorMessage(null);

    const roomConfig = ROOM_TYPES.find((r) => r.key === roomKey)!;
    setResult({
      customerName: sampleName,
      roomTypeLabel: roomConfig.label,
      numberOfDays: days,
      ratePerDay: roomConfig.ratePerDay,
      totalRoomCost: days * roomConfig.ratePerDay,
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
          Module 3 of 10 · Transport & Travel
        </span>
      </div>

      {/* Main Container Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl shrink-0">
            🏨
          </div>
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
              Real-World Calculator
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Hotel Room Bill Calculator
            </h1>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              Calculate total hotel accommodation charges in Indian Rupees (₹) based on stay duration and chosen room package.
            </p>
          </div>
        </div>

        {/* Room Tariff Cards */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Select Room Package
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ROOM_TYPES.map((room) => {
              const isSelected = selectedRoomType === room.key;
              return (
                <button
                  type="button"
                  key={room.key}
                  onClick={() => setSelectedRoomType(room.key)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <BedDouble className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
                      {room.label}
                    </span>
                    <span className="text-xs font-bold text-amber-700 font-mono">
                      ₹{room.ratePerDay.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {room.description}
                  </p>
                  <div className="mt-2 text-[11px] font-semibold text-slate-600">
                    ₹{room.ratePerDay.toLocaleString()} / night
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
            onClick={() => handleLoadSample('Amit Verma', 3, 'standard')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Amit (3 Days · Standard)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Sneha Reddy', 4, 'deluxe')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Sneha (4 Days · Deluxe)
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('Vikram Singhania', 5, 'suite')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Vikram (5 Days · Suite)
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
                  placeholder="e.g. Aditya Roy"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Guest or primary reservation holder</p>
            </div>

            {/* Input 2: Number of Days */}
            <div>
              <label htmlFor="numberOfDays" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Number of Days (Stay Duration)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <CalendarDays className="w-4 h-4 text-amber-600" />
                </div>
                <input
                  id="numberOfDays"
                  type="number"
                  min="1"
                  step="1"
                  value={numberOfDays}
                  onChange={(e) => setNumberOfDays(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full pl-10 pr-14 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-medium text-slate-400">
                  Days
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Total nights / days booked at hotel</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 active:bg-amber-800 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
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
                Hotel Room Invoice Summary
              </h2>
            </div>

            {/* Prominent Total Room Cost Highlight */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-md mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-100">
                  Total Room Cost
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-xs">
                  <Receipt className="w-3 h-3" />
                  Booking Invoice
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 font-mono tabular-nums">
                ₹{result.totalRoomCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-amber-100">
                <span>
                  Guest: <strong className="text-white">{result.customerName}</strong>
                </span>
                <span>
                  Package: <strong className="text-white">{result.roomTypeLabel}</strong> ({result.numberOfDays} {result.numberOfDays === 1 ? 'day' : 'days'})
                </span>
              </div>
            </div>

            {/* Parameter Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Customer</span>
                <span className="text-base font-bold text-slate-900 truncate block">
                  {result.customerName}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Room Type</span>
                <span className="text-base font-bold text-slate-900 block truncate">
                  {result.roomTypeLabel}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Stay Duration</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {result.numberOfDays} {result.numberOfDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Rate per Day</span>
                <span className="text-base font-bold text-amber-700 font-mono tabular-nums">
                  ₹{result.ratePerDay.toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 uppercase block">Total Cost</span>
                <span className="text-base font-bold text-emerald-700 font-mono tabular-nums">
                  ₹{result.totalRoomCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Info className="w-4 h-4 text-amber-600" />
                <span>Billing Formula:</span>
              </div>
              <p className="font-mono text-slate-700 pl-5">
                • Room Cost = Number of Days × Room Rate = {result.numberOfDays} × ₹{result.ratePerDay.toLocaleString()} = ₹{result.totalRoomCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )}
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
