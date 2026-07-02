import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Activity, CheckCircle2 } from 'lucide-react';

// Generates a perfectly smooth curved path for the chart
const smoothPath = "M 0 90 C 40 90, 60 60, 100 65 C 140 70, 160 30, 200 45 C 240 60, 260 20, 300 25 C 340 30, 360 10, 400 15";
const fillPath = `${smoothPath} L 400 120 L 0 120 Z`;

const TradingDashboardUI = () => {
  const [profit, setProfit] = useState(14502.50);
  const [orders, setOrders] = useState([]);
  const [bars, setBars] = useState(Array.from({ length: 20 }, () => Math.random() * 40 + 10));

  // Pulse volume bars
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(h => {
        const change = (Math.random() * 20) - 10;
        let newH = h + change;
        if(newH < 5) newH = 5;
        if(newH > 50) newH = 50;
        return newH;
      }));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  // Profit & Order updates
  useEffect(() => {
    const profitInterval = setInterval(() => {
      setProfit(prev => prev + (Math.random() * 12 - 2));
    }, 1500);

    const orderInterval = setInterval(() => {
      const pairs = ['EUR/USD', 'BTC/USD', 'XAU/USD', 'GBP/JPY', 'ETH/USD'];
      const actions = ['BUY', 'SELL', 'EXEC'];
      const newOrder = {
        id: Date.now(),
        pair: pairs[Math.floor(Math.random() * pairs.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        amount: (Math.random() * 5 + 0.1).toFixed(2),
      };
      setOrders(prev => [newOrder, ...prev].slice(0, 3));
    }, 2500);

    return () => {
      clearInterval(profitInterval);
      clearInterval(orderInterval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg aspect-square rounded-[2rem] overflow-hidden shadow-2xl group border border-white/[0.08] glass-panel-3d">
      
      {/* High-Tech Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        <motion.div 
          className="w-full h-[200%] bg-gradient-to-b from-transparent via-[#00E5FF]/10 to-transparent absolute top-0"
          animate={{ y: ['-100%', '0%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-accent-cyan/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full h-full flex flex-col p-7 backdrop-blur-xl bg-white/[0.01]">
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-blue-600/20 border border-accent-cyan/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.25)] relative overflow-hidden">
              <Activity className="text-accent-cyan w-6 h-6 relative z-10" />
              <motion.div 
                className="absolute inset-0 bg-accent-cyan/30 z-0"
                animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <p className="text-[10px] text-accent-cyan font-mono uppercase tracking-[0.3em] font-bold">Trading Core</p>
              <p className="text-sm text-white font-semibold tracking-wide">Live Execution</p>
            </div>
          </div>
          
          <div className="bg-[#0f172a] border border-green-500/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Active</span>
          </div>
        </div>

        {/* Live Balance / Profit */}
        <div className="mb-6 relative">
          <p className="text-gray-400 text-xs mb-2 font-medium tracking-wide">Unrealized P&L (USD)</p>
          <div className="flex items-end gap-4">
            <motion.h3 
              key={Math.floor(profit / 50)} 
              initial={{ scale: 1.05, filter: 'blur(4px)', color: '#00E5FF' }}
              animate={{ scale: 1, filter: 'blur(0px)', color: '#ffffff' }}
              transition={{ duration: 0.3 }}
              className="text-5xl font-[900] font-mono tracking-tighter drop-shadow-lg"
            >
              ${profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.h3>
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-1 text-green-400 text-sm font-bold bg-green-500/15 border border-green-500/20 px-3 py-1.5 rounded-lg mb-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
            >
              <TrendingUp size={16} /> +3.8%
            </motion.div>
          </div>
        </div>

        {/* Ultra Cool Chart Area */}
        <div className="relative w-full flex-grow flex items-end mt-4 rounded-xl overflow-hidden border border-white/5 bg-black/20 backdrop-blur-md">
          
          {/* Volume Bars (Background) */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-2 opacity-30 h-16 pointer-events-none">
            {bars.map((height, i) => (
              <motion.div 
                key={i}
                className="w-3 bg-gradient-to-t from-accent-cyan/80 to-transparent rounded-t-sm"
                animate={{ height: `${height}px` }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              />
            ))}
          </div>

          <svg viewBox="0 0 400 120" className="w-full h-32 overflow-visible relative z-10">
            <defs>
              <linearGradient id="chartGradientSolid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#00E5FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
            </defs>
            
            {/* Soft gradient fill */}
            <path d={fillPath} fill="url(#chartGradientSolid)" />
            
            {/* The main solid line */}
            <path
              d={smoothPath}
              fill="none"
              stroke="rgba(0, 229, 255, 0.2)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* The glowing shooting star line */}
            <motion.path
              d={smoothPath}
              fill="none"
              stroke="url(#lineGlow)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 1 }}
              animate={{ pathLength: 0.3, pathOffset: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              style={{ filter: "drop-shadow(0 0 10px #00E5FF)" }}
            />
          </svg>
          
          {/* Scanning Laser Line */}
          <motion.div 
            className="absolute top-0 bottom-0 w-[1px] bg-white/50 shadow-[0_0_15px_#fff] z-20 pointer-events-none"
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full blur-[2px]" />
          </motion.div>
        </div>

        {/* Floating Order Feed */}
        <div className="absolute bottom-6 right-5 flex flex-col gap-2.5 w-44 z-30 pointer-events-none">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: 50, scale: 0.8, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, y: -20, filter: 'blur(5px)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-cyan" />
                <div className="flex flex-col pl-2">
                  <span className={`text-[9px] font-black tracking-widest ${order.action === 'SELL' ? 'text-rose-400' : 'text-accent-cyan'}`}>
                    {order.action} {order.amount}
                  </span>
                  <span className="text-[13px] text-white font-bold">{order.pair}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-gray-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default TradingDashboardUI;
