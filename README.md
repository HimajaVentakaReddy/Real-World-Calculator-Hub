# 🚀 Real-World Calculator Hub

[![React 19](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](LICENSE)

**Simple tools for everyday calculations and decisions.**

A clean, responsive, and beginner-friendly college mini project that brings together everyday real-world calculators and decision checkers into a single, cohesive web application. Designed for students, commuters, and daily consumers to solve authentic mathematical problems without complex spreadsheets.

---

## 📌 Features

- **🎯 Real-World Problem Focus**: Solves practical daily situations (fuel economics, utility bills, hotel lodging, and public bus ticketing).
- **📱 Fully Responsive**: Seamless, fluid user experience across mobile phones, tablets, laptops, and desktop monitors.
- **🛡️ Robust Input Validation**: Detects and handles empty inputs, negative numbers, division by zero, non-numeric values, and invalid categories with clear alerts.
- **⚡ Instant Real-Time Calculations**: Fast, client-side formula execution with zero lag or layout shift.
- **🔍 Search & Category Filtering**: Instant live search by keyword and category segment tabs to easily navigate modules.
- **💡 Educational & Modular Architecture**: Well-structured TypeScript code with dedicated component separation and zero spaghetti code.

---

## 🧮 Implemented Calculators & Checkers

### 1. 🚗 Fuel Cost Calculator
- **Inputs**: Distance Travelled (`km`), Vehicle Mileage (`km/litre`), Fuel Price (`₹ per litre`).
- **Formulas**:
  - $\text{Fuel Required (L)} = \frac{\text{Distance}}{\text{Mileage}}$
  - $\text{Total Fuel Cost (₹)} = \text{Fuel Required} \times \text{Fuel Price}$
  - $\text{Running Cost per km (₹)} = \frac{\text{Total Cost}}{\text{Distance}}$
- **Outputs**: Formatted total trip expense in ₹, fuel volume in litres, parameter breakdown, and quick test samples.

### 2. 💧 Water Bill Calculator
- **Inputs**: Customer Name, Water Usage (`Litres`).
- **Tiered Slab Tariff**:
  - Up to 5,000 litres $\rightarrow$ ₹2 per 1,000 litres
  - 5,001 to 10,000 litres $\rightarrow$ ₹3 per 1,000 litres
  - Above 10,000 litres $\rightarrow$ ₹5 per 1,000 litres
- **Formula**: $\text{Total Bill (₹)} = \left(\frac{\text{Usage in Litres}}{1,000}\right) \times \text{Applicable Slab Rate}$
- **Outputs**: Official consumer statement, applicable tariff tier, and total water utility bill in ₹.

### 3. 🏨 Hotel Room Bill Calculator
- **Inputs**: Customer Name, Number of Days, Room Category.
- **Room Packages**:
  - Standard Room: ₹1,500 / night
  - Deluxe Room: ₹2,500 / night
  - Suite Room: ₹4,000 / night
- **Formula**: $\text{Total Room Cost (₹)} = \text{Stay Duration (Days)} \times \text{Room Rate per Day}$
- **Outputs**: Guest booking summary, stay duration breakdown, rate per day, and total room cost in ₹.

### 4. 🚌 Bus Fare Calculator
- **Inputs**: Passenger Name, Distance Travelled (`km`), Passenger Category.
- **Concession Rates**:
  - Adult Commuter: ₹2.00 per km
  - Student Concession: ₹1.00 per km (50% student discount)
  - Senior Citizen: ₹1.50 per km (25% senior discount)
- **Formula**: $\text{Total Bus Fare (₹)} = \text{Distance (km)} \times \text{Rate per km}$
- **Outputs**: Itemized transit e-ticket, passenger category badge, rate per km, and total fare in ₹.

### 5. 📚 Library Fine Calculator
- **Inputs**: Student Name, Number of Late Days.
- **Fine Slabs**:
  - 0 days $\rightarrow$ No Fine (₹0)
  - 1–5 days $\rightarrow$ ₹2 per day
  - 6–10 days $\rightarrow$ ₹5 per day
  - More than 10 days $\rightarrow$ ₹10 per day
- **Formula**: $\text{Total Fine (₹)} = \text{Number of Late Days} \times \text{Applicable Rate per Day}$
- **Outputs**: Library fine receipt slip, on-time status or penalty badge, applicable rate per day, and total fine in ₹.

---

### 📋 Planned Modules (Roadmap Preview)

The remaining 5 modules are represented on the dashboard with specifications and formula previews:
6. 📱 **Mobile Recharge Checker** (Prepaid validity, daily data cost & allowance tracking)
7. 🛒 **Shopping Discount Calculator** (Percentage markdown, coupon savings, and sales tax)
8. 🌡️ **Temperature Alert Checker** (°C/°F conversion with extreme heat/frost advisories)
9. 🚦 **Traffic Fine Checker** (Statutory penalty fees and traffic violation lookup)
10. 🅿️ **Car Wash Bill Calculator** (Vehicle size pricing, wash tiers & detailing add-ons)

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **React 19** | Modern component-based user interface library |
| **TypeScript** | Static type safety and structured data interfaces |
| **Vite** | Next-generation frontend build tooling and local dev server |
| **Tailwind CSS v4** | Utility-first responsive styling and typography |
| **Lucide React** | Clean, accessible icon system |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0 or higher) and **npm** installed on your system.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Real-World-Calculator-Hub.git
   cd Real-World-Calculator-Hub
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or the port specified in terminal).

### Other Available Scripts

- **`npm run build`**: Compiles TypeScript and creates an optimized production bundle in `dist/`.
- **`npm run lint`**: Runs TypeScript compilation check (`tsc --noEmit`) to verify zero type errors.
- **`npm run preview`**: Locally previews the production build.

---

## 📁 Project Structure

```text
Real-World-Calculator-Hub/
├── index.html                     # HTML5 entry template with Plus Jakarta Sans typography
├── metadata.json                  # Application title and configuration metadata
├── package.json                   # Project dependencies and script declarations
├── tsconfig.json                  # TypeScript compiler settings
├── vite.config.ts                 # Vite configuration with Tailwind CSS plugin
├── .gitignore                     # Git ignore rules for node, build, logs & secrets
├── .env.example                   # Environment variable template (no sensitive keys)
├── README.md                      # Comprehensive project documentation
└── src/
    ├── main.tsx                   # React DOM application mount point
    ├── index.css                  # Global Tailwind CSS and typography styling
    ├── App.tsx                    # Root coordinator: layout, state routing & active views
    ├── types/
    │   └── calculator.ts          # TypeScript interfaces for modules and calculation schemas
    ├── data/
    │   └── calculatorsData.ts     # Metadata catalog for all 10 real-world calculation engines
    └── components/
        ├── Navbar.tsx             # Responsive header adhering to 3-zone top bar contract
        ├── Hero.tsx               # Homepage header with live search & category filter tabs
        ├── CalculatorCard.tsx     # Reusable card component for modules with status badges
        ├── CalculatorGrid.tsx     # Responsive grid layout with empty-search states
        ├── ModulePreviewModal.tsx # Interactive dialog for upcoming roadmap modules
        ├── AboutSection.tsx       # College mini project description & multi-step roadmap
        ├── Footer.tsx             # Clean footer with project branding and navigation
        └── calculators/
            ├── FuelCostCalculator.tsx   # 🚗 Fuel Cost Calculator (Active)
            ├── WaterBillCalculator.tsx  # 💧 Water Bill Calculator (Active)
            ├── HotelBillCalculator.tsx  # 🏨 Hotel Room Bill Calculator (Active)
            ├── BusFareCalculator.tsx    # 🚌 Bus Fare Calculator (Active)
            └── LibraryFineCalculator.tsx # 📚 Library Fine Calculator (Active)
```

---

## 🔮 Future Enhancements

- [ ] Implementation of remaining 5 calculation engines (Recharge, Discount, Temperature, Traffic, Car Wash).
- [ ] Calculation history log stored in local storage for quick review.
- [ ] Printable / PDF export for water utility bills and hotel booking invoices.
- [ ] Unit toggle switches (e.g. Kilometres vs. Miles, Litres vs. Gallons).
- [ ] Offline Progressive Web App (PWA) installation capability.

---

## 📄 License

This project is licensed under the Apache 2.0 License.
