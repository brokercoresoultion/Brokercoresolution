import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TICKER_DATA = [
  { pair: 'EUR/USD', price: '1.0924', change: '+0.12%', isUp: true },
  { pair: 'GBP/USD', price: '1.2750', change: '-0.05%', isUp: false },
  { pair: 'USD/JPY', price: '148.30', change: '+0.25%', isUp: true },
  { pair: 'XAU/USD', price: '2,024.10', change: '+0.80%', isUp: true },
  { pair: 'BTC/USD', price: '64,230.00', change: '+2.40%', isUp: true },
  { pair: 'ETH/USD', price: '3,450.50', change: '-1.20%', isUp: false },
  { pair: 'US30', price: '39,100.00', change: '+0.15%', isUp: true },
  { pair: 'UK100', price: '7,680.20', change: '-0.30%', isUp: false },
];

const MarketTicker = () => {
  // Duplicate the array to create a seamless infinite loop
  const tickerItems = [...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA];

  return (
    <div className="w-full bg-[#0a0c12] border-b border-white/[0.05] overflow-hidden relative flex items-center h-10 z-50">
      {/* Left/Right Gradient Masks for smooth fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0c12] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0c12] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap items-center gap-8 px-4"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-xs font-mono">
            <span className="font-bold text-gray-300">{item.pair}</span>
            <span className="text-white">{item.price}</span>
            <div className={`flex items-center gap-1 ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
              {item.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{item.change}</span>
            </div>
            {/* Dot separator */}
            <span className="w-1 h-1 bg-white/20 rounded-full ml-4" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarketTicker;
