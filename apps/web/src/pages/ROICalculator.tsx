import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Activity } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

export default function ROICalculator() {
  const [dailyLots, setDailyLots] = useState(1000);
  const [commissionPerLot, setCommissionPerLot] = useState(5);
  const [monthlyTechCost, setMonthlyTechCost] = useState(4000);

  // Calculations
  const tradingDaysPerMonth = 22;
  const monthlyVolume = dailyLots * tradingDaysPerMonth;
  const grossRevenue = monthlyVolume * commissionPerLot;
  const netProfit = grossRevenue - monthlyTechCost;
  const roiPercentage = monthlyTechCost > 0 ? ((netProfit / monthlyTechCost) * 100).toFixed(0) : 0;

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-12 relative overflow-hidden">
      <SEOHead 
        title="Forex Brokerage ROI Calculator | BrokerCore Solution"
        description="Calculate your potential Return on Investment (ROI) for running a Forex brokerage. Estimate revenues based on client volume and deposits."
        keywords="Forex Broker ROI, Forex Revenue Calculator, Forex Broker Profit Margin, Brokerage Income"
      />
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-cyan/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-bold tracking-widest text-white mb-6 uppercase flex items-center gap-2 mx-auto w-fit">
            <Calculator size={14} className="text-accent-cyan" />
            ROI Estimator
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-6 text-white">
            Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-blue-500">Brokerage Profit</span>
          </h1>
          <p className="text-lg text-gray-400">
            Interactive revenue projection based on your expected trading volume and technology overhead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Controls Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Activity className="text-accent-cyan" /> Configure Parameters
            </h2>

            <div className="space-y-10">
              {/* Daily Lots Slider */}
              <div>
                <div className="flex justify-between text-white mb-4">
                  <label className="font-medium">Expected Daily Volume (Lots)</label>
                  <span className="font-bold text-accent-cyan">{dailyLots.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="10000" 
                  step="50"
                  value={dailyLots}
                  onChange={(e) => setDailyLots(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-cyan"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>50</span>
                  <span>10,000+</span>
                </div>
              </div>

              {/* Commission Slider */}
              <div>
                <div className="flex justify-between text-white mb-4">
                  <label className="font-medium">Average Commission per Lot ($)</label>
                  <span className="font-bold text-accent-cyan">${commissionPerLot}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="1"
                  value={commissionPerLot}
                  onChange={(e) => setCommissionPerLot(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-cyan"
                />
              </div>

              {/* Tech Cost Slider */}
              <div>
                <div className="flex justify-between text-white mb-4">
                  <label className="font-medium">Monthly Technology Cost ($)</label>
                  <span className="font-bold text-red-400">${monthlyTechCost.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="15000" 
                  step="500"
                  value={monthlyTechCost}
                  onChange={(e) => setMonthlyTechCost(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-gradient-to-br from-accent-cyan/20 to-transparent border border-accent-cyan/30 p-8 rounded-3xl backdrop-blur-sm flex-1 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <TrendingUp size={100} className="text-accent-cyan" />
              </div>
              <p className="text-accent-cyan font-bold tracking-widest uppercase mb-2">Estimated Monthly Profit</p>
              <h3 className="text-5xl lg:text-7xl font-black text-white mb-4">
                ${netProfit.toLocaleString()}
              </h3>
              <p className="text-gray-400 text-sm">
                Based on 22 trading days/month. 
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                <div className="text-gray-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <DollarSign size={16} /> Gross Revenue
                </div>
                <div className="text-2xl font-bold text-white">
                  ${grossRevenue.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                <div className="text-gray-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <TrendingUp size={16} /> ROI
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {roiPercentage}%
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
