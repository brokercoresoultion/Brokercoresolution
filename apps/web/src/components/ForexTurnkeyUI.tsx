import React, { useState } from 'react';
import { 
  Monitor, 
  Users, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Calculator
} from 'lucide-react';

// ==========================================
// 1. INTERACTIVE FEATURES GRID & TYPOGRAPHY
// ==========================================
const FeaturesGrid = () => {
  const features = [
    {
      id: 1,
      title: 'Trading Platforms',
      description: 'Offer your clients world-class trading terminals with optimized latency and advanced charting tools.',
      icon: <Monitor className="w-8 h-8 text-cyan-400" />
    },
    {
      id: 2,
      title: 'Advanced CRM',
      description: 'Manage leads, IBs, and clients seamlessly with our powerful, intuitive Customer Relationship Management system.',
      icon: <Users className="w-8 h-8 text-cyan-400" />
    },
    {
      id: 3,
      title: 'Deep Liquidity',
      description: 'Access Institutional liquidity pools with tight spreads and deep order books across multiple asset classes.',
      icon: <Activity className="w-8 h-8 text-cyan-400" />
    }
  ];

  return (
    <section className="pt-8 pb-4 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          {/* HIGH-CONTRAST TYPOGRAPHY: pure white for headings, slate-300 for body */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Launch and scale your Forex brokerage with our complete White Label & Turnkey Solution. MT4/MT5, CRM, Liquidity, Payment Gateway, KYC, Back Office & 24/7 Expert Support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:border-cyan-500/50 group cursor-pointer"
            >
              <div className="bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. INTERACTIVE BROKERAGE CALCULATOR
// ==========================================
const BrokerageCalculator = () => {
  const [volume, setVolume] = useState(1000);
  const [traders, setTraders] = useState(500);

  // Simple mock calculation logic
  const estimatedCost = 5000 + (volume * 0.5) + (traders * 2);
  const potentialSavings = estimatedCost * 0.3; // showing 30% savings compared to alternatives

  return (
    <section className="pt-4 pb-12 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-12 relative z-10">
            <div className="flex-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-cyan-400" /> Cost Calculator
                </h3>
                <p className="text-slate-400">Estimate your monthly operating costs instantly.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="volume-slider" className="text-slate-300 font-medium">Expected Monthly Volume (Lots)</label>
                    <span className="text-cyan-400 font-bold">{volume.toLocaleString()}</span>
                  </div>
                  <input 
                    id="volume-slider"
                    type="range" 
                    min="100" 
                    max="10000" 
                    step="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="traders-slider" className="text-slate-300 font-medium">Active Traders</label>
                    <span className="text-cyan-400 font-bold">{traders.toLocaleString()}</span>
                  </div>
                  <input 
                    id="traders-slider"
                    type="range" 
                    min="50" 
                    max="5000" 
                    step="50"
                    value={traders}
                    onChange={(e) => setTraders(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 bg-slate-900 rounded-2xl p-8 border border-slate-800 flex flex-col justify-center text-center">
              <p className="text-slate-400 mb-2 font-medium">Estimated Monthly Cost</p>
              <div className="text-4xl md:text-5xl font-black text-white mb-6">
                ${estimatedCost.toLocaleString()}
              </div>
              
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                <p className="text-cyan-400 font-medium flex items-center justify-center gap-2">
                  <span>Potential Savings:</span>
                  <span className="text-xl font-bold">${potentialSavings.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 4. PARTNER LOGOS (Grayscale to Color)
// ==========================================
const PartnerLogos = () => {
  const partners = [
    { name: 'MetaQuotes', domain: 'metaquotes' },
    { name: 'Match-Prime', domain: 'match-prime' },
    { name: 'Centroid', domain: 'centroid' },
    { name: 'Techysquad', domain: 'techysquad' },
    { name: 'B2Broker', domain: 'b2broker' }
  ];

  return (
    <section className="py-12 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-400 font-semibold mb-8 tracking-wider uppercase text-sm">
          Integrated with Industry Leaders
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="flex items-center justify-center h-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              {/* Using a placeholder SVG since we don't have the actual logo files */}
              <div className="text-2xl font-bold text-slate-200 tracking-tight flex items-center">
                <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-cyan-600 to-blue-500 mr-2 flex items-center justify-center text-xs">
                  {partner.name.charAt(0)}
                </div>
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 5. MOBILE STICKY CTA
// ==========================================
const MobileStickyCTA = () => {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden pointer-events-none">
      <button className="w-full pointer-events-auto bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold py-4 px-6 rounded-full shadow-[0_4px_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 animate-[pulse_2s_ease-in-out_infinite]">
        Request Demo <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// ==========================================
// MAIN EXPORT COMPONENT
// ==========================================
export default function ForexTurnkeyUI() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30">
      <FeaturesGrid />
      <BrokerageCalculator />
      <PartnerLogos />
    </div>
  );
}
