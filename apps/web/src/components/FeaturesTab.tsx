import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Users, LineChart, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = [
  {
    id: 'trading-platforms',
    icon: Monitor,
    title: 'Trading Platforms',
    description: 'Launch instantly with the world’s most trusted trading platforms. Our MT4 and MT5 white-label solutions include fully customized branding, advanced charting tools, and seamless server configuration designed for high-frequency trading.',
    benefits: ['Zero-latency execution', 'Custom brand integration', 'Mobile & Web ready'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'crm-software',
    icon: Users,
    title: 'Advanced CRM',
    description: 'Manage your entire brokerage from a single pane of glass. Featuring multi-tier IB management, automated rebate calculations, intelligent lead routing, and deep analytics dashboards to optimize your conversion rates.',
    benefits: ['Multi-tier IB system', 'Automated KYC flows', 'Real-time analytics'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'liquidity-provider',
    icon: LineChart,
    title: 'Deep Liquidity',
    description: 'Connect to Tier-1 liquidity pools with ultra-low latency. We deploy advanced FIX API bridges and aggregators that ensure deep market depth, tighter spreads, and minimal slippage for your most demanding institutional clients.',
    benefits: ['Tier-1 Bank Feeds', 'FIX API Integration', 'Sub-millisecond routing'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e391452?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'gateway-solutions',
    icon: Shield,
    title: 'KYC & Payments',
    description: 'Frictionless onboarding meets ironclad security. We integrate global crypto and fiat payment gateways alongside automated, AI-driven KYC/AML verification modules to keep your operations compliant and seamless.',
    benefits: ['Global Fiat & Crypto', 'AI KYC Verification', 'Anti-fraud modules'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop'
  }
];

const FeaturesTab = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">Solutions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Everything you need to launch, manage, and scale a world-class Forex brokerage under one unified ecosystem.
          </motion.p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Tabs Navigation */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide snap-x">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab.id === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left min-w-[240px] snap-start relative overflow-hidden ${
                    isActive 
                      ? 'bg-accent-cyan/10 border border-accent-cyan/30 shadow-[0_0_30px_rgba(0,229,255,0.1)]' 
                      : 'bg-[#0f172a]/40 border border-white/5 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 w-1 h-full bg-accent-cyan rounded-l-2xl"
                    />
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-accent-cyan text-[#0f172a]' : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg transition-colors ${isActive ? 'text-accent-cyan' : 'text-gray-200'}`}>
                      {tab.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="w-full lg:w-2/3 h-full min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#0f172a]/40 border border-white/[0.05] rounded-3xl p-8 lg:p-12 backdrop-blur-xl h-full shadow-2xl relative overflow-hidden"
              >
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none" />
                
                {/* Text Content */}
                <div className="relative z-10 flex flex-col justify-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-6">
                    <activeTab.icon size={32} className="text-accent-cyan" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6 leading-tight">{activeTab.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">{activeTab.description}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {activeTab.benefits.map((benefit, i) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        key={i} 
                        className="flex items-center gap-3 text-gray-300 font-medium"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent-cyan shrink-0" />
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>

                  <Link to={`/services/${activeTab.id}`} className="flex items-center gap-2 text-accent-cyan font-bold tracking-widest uppercase text-sm group w-fit hover:text-white transition-colors">
                    Explore Feature
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Visual Content */}
                <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-transparent z-10 mix-blend-overlay" />
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={activeTab.image} 
                    alt={activeTab.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Glass overlay border */}
                  <div className="absolute inset-0 border border-white/20 rounded-2xl z-20 pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesTab;
