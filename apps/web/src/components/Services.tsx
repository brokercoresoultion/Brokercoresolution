import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Users, LineChart, Shield, Server, Briefcase, ArrowUpRight } from 'lucide-react';
import Service3DElement from './Service3DElement';

const servicesData = [
  { type: 'platform', icon: Monitor, title: 'White-Label Trading Platforms', desc: 'Launch instantly with the world’s most trusted trading platforms. Our MT4 and MT5 white-label solutions include fully customized branding, advanced charting tools, and seamless server configuration.', span: 'lg:col-span-2 md:col-span-2', bgStyle: 'bg-[#0f172a]/60 backdrop-blur-2xl border border-white/[0.05] hover:border-accent-cyan/40 hover:bg-[#0f172a]/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]' },
  { type: 'crm', icon: Users, title: 'Advanced Forex CRM & Back Office', desc: 'Manage your entire brokerage from a single pane of glass. Featuring multi-tier IB management, automated rebate calculations, intelligent lead routing, and deep analytics dashboards.', span: 'lg:col-span-1 md:col-span-1', bgStyle: 'bg-gradient-to-br from-accent-cyan/5 to-[#0f172a]/60 backdrop-blur-2xl border border-accent-cyan/20 hover:border-accent-cyan/60 hover:bg-[#0f172a]/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]' },
  { type: 'liquidity', icon: LineChart, title: 'Liquidity Provider Integration & Bridges', desc: 'Connect to Tier-1 liquidity pools with ultra-low latency. We deploy advanced FIX API bridges and aggregators that ensure deep market depth, tighter spreads, and minimal slippage.', span: 'lg:col-span-1 md:col-span-1', bgStyle: 'bg-[#0f172a]/60 backdrop-blur-2xl border border-white/[0.05] hover:border-accent-cyan/40 hover:bg-[#0f172a]/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]' },
  { type: 'compliance', icon: Shield, title: 'Payment Gateway & KYC/AML Compliance', desc: 'Frictionless onboarding meets ironclad security. We integrate global crypto and fiat payment gateways alongside automated, AI-driven KYC/AML verification modules.', span: 'lg:col-span-2 md:col-span-2', bgStyle: 'bg-[#0f172a]/60 backdrop-blur-2xl border border-white/[0.05] hover:border-accent-cyan/40 hover:bg-[#0f172a]/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="py-24 transition-colors duration-500 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-accent-cyan/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full text-xs font-semibold uppercase tracking-widest text-accent-cyan mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></div>
              Turnkey Solutions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight"
            >
              Enterprise-Grade Infrastructure <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-500 dark:to-gray-200 italic font-light">At Your Fingertips</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md pb-2"
          >
            We don't just build brokerages; we engineer high-performance trading ecosystems. Discover our core product suite designed for zero latency and maximum operational efficiency.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            // Fix span for item 4 since we use 3 columns
            let spanClass = service.span;
            if (index === 4) spanClass = 'lg:col-span-1 md:col-span-1';

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group p-8 md:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden flex flex-col justify-between ${spanClass} ${service.bgStyle}`}
              >
                {/* 3D Background Element */}
                <Service3DElement type={service.type} isHovered={hoveredIndex === index} />

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white backdrop-blur-md group-hover:scale-110 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-500">
                    <Icon size={24} className="group-hover:text-accent-cyan transition-colors" />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 group-hover:bg-black/5 dark:group-hover:bg-white/5 text-gray-900 dark:text-white">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-accent-cyan transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-sm md:text-base">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;