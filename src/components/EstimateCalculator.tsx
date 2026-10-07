import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface EstimateCalculatorProps {
  onSelectBooking: (serviceId: string, notes: string) => void;
}

export const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({ onSelectBooking }) => {
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [scope, setScope] = useState<string>('partial'); // partial, full, consumer-unit, ev-charger, smart-home
  const [size, setSize] = useState<number>(2); // e.g. number of bedrooms or commercial units

  // Interactive state multipliers
  const calculateEstimate = () => {
    let base = 150;
    let multiplier = 1.0;
    let label = "";
    let duration = "";
    let certs = [
      "BS 7671 Part P Electrical Safety Certificate",
      "NIC EIC Licensed Operator Registration",
      "6-Year Workmanship Warranty"
    ];

    if (propertyType === 'residential') {
      if (scope === 'partial') {
        base = 220;
        multiplier = size * 0.8;
        label = "Targeted Electrical Upgrades";
        duration = "4 - 8 Hours";
      } else if (scope === 'full') {
        base = 1200;
        multiplier = size * 1.1;
        label = "Complete Smart Rewiring";
        duration = "3 - 5 Days";
      } else if (scope === 'consumer-unit') {
        base = 550;
        multiplier = 1.0;
        label = "Premium Dual RCD Fuseboard Upgrade";
        duration = "1 Day (5-8 Hours)";
      } else if (scope === 'ev-charger') {
        base = 750;
        multiplier = 1.0;
        label = "EV Smart Charging Station Installation";
        duration = "3 - 5 Hours";
      } else {
        base = 800;
        multiplier = size * 0.9;
        label = "Whole-Home Intelligent Lighting & Smart Control";
        duration = "1 - 2 Days";
      }
    } else {
      // Commercial
      if (scope === 'partial') {
        base = 450;
        multiplier = size * 1.2;
        label = "Commercial Circuit Expansion / Testing";
        duration = "1 - 2 Days";
      } else if (scope === 'full') {
        base = 3500;
        multiplier = size * 1.4;
        label = "Full Commercial Refit & Distribution";
        duration = "2 - 3 Weeks";
        certs.push("Emergency Lighting Compliance Certification");
      } else if (scope === 'consumer-unit') {
        base = 1400;
        multiplier = 1.0;
        label = "Commercial Distribution Board Refit";
        duration = "1 - 2 Days";
      } else if (scope === 'ev-charger') {
        base = 1800;
        multiplier = size * 0.95;
        label = "Multi-Bay Commercial EV Charging";
        duration = "2 - 4 Days";
      } else {
        base = 2500;
        multiplier = size * 1.2;
        label = "Commercial Automation & Energy Saving Systems";
        duration = "1 Week";
      }
    }

    const priceMin = Math.round(base * multiplier);
    const priceMax = Math.round(priceMin * 1.25);

    return {
      priceMin,
      priceMax,
      label,
      duration,
      certs
    };
  };

  const { priceMin, priceMax, label, duration, certs } = calculateEstimate();

  const handleBookingTrigger = () => {
    const serviceMap: Record<string, string> = {
      'partial': 'Repairs / Additions',
      'full': 'Full Rewiring',
      'consumer-unit': 'Fuseboard Upgrade',
      'ev-charger': 'EV Charger Install',
      'smart-home': 'Smart Home Tech'
    };
    
    const notes = `Calculated Estimate: £${priceMin}-£${priceMax} for ${label}. Property details: ${propertyType === 'residential' ? 'Residential' : 'Commercial'} - Size factor ${size}. Estimated Duration: ${duration}.`;
    onSelectBooking(serviceMap[scope] || 'Standard Inspection', notes);
  };

  return (
    <div className="bg-[#0b0b0b] border border-amber-500/10 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="font-display text-xl text-white font-medium">Instant Precision Estimator</h3>
          <p className="text-xs text-zinc-500">Calculate budget estimates for professional compliance audits.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* INPUTS PANEL */}
        <div className="space-y-6">
          {/* PROPERTY TYPE */}
          <div>
            <label className="block text-xs font-mono font-medium uppercase text-zinc-400 tracking-wider mb-2.5">
              Sector Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPropertyType('residential')}
                className={`py-3 px-4 rounded-xl border font-semibold text-sm tracking-wide transition-all ${
                  propertyType === 'residential'
                    ? 'bg-amber-500 text-black border-transparent shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                Residential Home
              </button>
              <button
                type="button"
                onClick={() => setPropertyType('commercial')}
                className={`py-3 px-4 rounded-xl border font-semibold text-sm tracking-wide transition-all ${
                  propertyType === 'commercial'
                    ? 'bg-amber-500 text-black border-transparent shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                Commercial Complex
              </button>
            </div>
          </div>

          {/* SCOPE OF WORK */}
          <div>
            <label className="block text-xs font-mono font-medium uppercase text-zinc-400 tracking-wider mb-2.5">
              Service Scope
            </label>
            <div className="flex flex-col gap-2">
              {[
                { id: 'partial', title: 'Targeted Installations / Extensions', desc: 'Adding sockets, switches, decorative fixtures or small repairs.' },
                { id: 'full', title: 'Full Complete Property Rewire', desc: 'Stripping out legacy cords & updating complete infrastructure.' },
                { id: 'consumer-unit', title: 'Distribution / Fuse board Replacement', desc: 'Upgrading to BS 7671 certified Dual RCD boards.' },
                { id: 'ev-charger', title: 'EV Charging Station (Type 2)', desc: 'Fast, certified dynamic smart vehicle chargers.' },
                { id: 'smart-home', title: 'Intelligent Home Automation', desc: 'Integrated smart dimmers, video doorbells, & panels.' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setScope(item.id)}
                  className={`p-3.5 text-left rounded-xl border transition-all flex flex-col gap-1 ${
                    scope === item.id
                      ? 'bg-amber-950/25 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.05)]'
                      : 'bg-zinc-900/20 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40'
                  }`}
                >
                  <span className={`text-xs font-bold ${scope === item.id ? 'text-amber-400' : 'text-zinc-200'}`}>
                    {item.title}
                  </span>
                  <span className="text-[11px] text-zinc-500 leading-normal">
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* PROPERTY / COMPLEX SIZE */}
          <div>
            <div className="flex justify-between text-xs font-mono font-medium uppercase tracking-wider mb-2.5">
              <span className="text-zinc-400">
                {propertyType === 'residential' ? 'Property Bedrooms' : 'Commercial Zones / Bays'}
              </span>
              <span className="text-amber-400">{size} {propertyType === 'residential' ? 'Beds' : 'Zones'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full accent-amber-500 h-1 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-1">
              <span>{propertyType === 'residential' ? '1 Bed Flat' : '1 Zone Studio'}</span>
              <span>{propertyType === 'residential' ? '6 Bed Manor' : '6 Zone Hub'}</span>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="bg-[#0e0e0e] border border-amber-500/10 rounded-2xl p-6 lg:p-8 flex flex-col justify-between relative">
          <div className="absolute top-4 right-4 text-[10px] text-amber-500/40 font-mono tracking-widest border border-amber-500/20 px-2 py-0.5 rounded uppercase">
            LUM-EST
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Estimated Budget Range</span>
              <div className="text-4xl lg:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-sm flex items-baseline gap-1">
                £{priceMin} <span className="text-xl text-zinc-500 font-normal">-</span> £{priceMax}
              </div>
              <span className="text-[11px] text-zinc-400 font-sans block mt-1 leading-normal italic">
                *Approximate cost range for high-spec copper materials and accredited workmanship.
              </span>
            </div>

            <div className="border-t border-zinc-900 my-4" />

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Target Duration</span>
                <span className="text-sm text-white font-display flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  {duration}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">Full Certification Included</span>
                <ul className="space-y-2">
                  {certs.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-normal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-900">
            <button
              onClick={handleBookingTrigger}
              className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black py-4 px-6 rounded-xl font-bold tracking-wide text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              Secure This Estimate & Book Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-zinc-600 text-center mt-2 font-mono">
              Secures slot priority. Final confirmation after physical site survey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
