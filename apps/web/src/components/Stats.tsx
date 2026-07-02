import React from 'react';
import { useInView, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ to, suffix }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        
        const isDecimal = to % 1 !== 0;
        const increment = isDecimal ? to / steps : Math.ceil(to / steps);

        let currentCount = 0;
        const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= to) {
                setCount(to);
                clearInterval(timer);
            } else {
                setCount(isDecimal ? parseFloat(currentCount.toFixed(1)) : Math.ceil(currentCount));
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isInView, to]);

    return (
      <span ref={ref} className={`${isInView ? 'glow-text transition-all duration-1000' : ''}`}>
        {count}{suffix}
      </span>
    );
}

const defaultStats = [
    {
      value: 15,
      suffix: '+',
      label: 'Years Experience',
      description: 'Decades of combined expertise in financial technology and brokerage setup.',
    },
    {
      value: 200,
      suffix: '+',
      label: 'Brokerages Launched',
      description: 'Successfully deployed infrastructure for brokers across 40+ countries.',
    },
    {
      value: 50,
      suffix: 'B+',
      label: 'Monthly Volume',
      description: 'Processing massive trading volumes seamlessly through our deep liquidity pools.',
    },
    {
      value: 99.9,
      suffix: '%',
      label: 'Server Uptime',
      description: 'Enterprise-grade reliability with co-located servers in LD4 and NY4.',
    },
];

const Stats = ({ customStats }) => {
  const stats = customStats || defaultStats;
  const isProjectPage = !!customStats;

  return (
    <section id="stats-section" className="py-24 transition-colors duration-500 relative overflow-hidden border-t border-black/5 dark:border-white/5">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      
      <div className="container mx-auto px-6 relative z-10">
        {!isProjectPage && (
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
            <div className="max-w-2xl">
               <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full text-xs font-semibold uppercase tracking-widest text-accent-cyan mb-6"
              >
                By the Numbers
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white italic font-light">Impact</span>
              </h2>
            </div>
            <div className="lg:max-w-md">
              <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed border-l-2 border-accent-cyan/30 pl-6">
                Tangible results backed by robust technology. We build high-performance brokerage environments designed to scale globally.
              </p>
            </div>
          </div>
        )}
        
        {isProjectPage && (
            <div className="text-center mb-24">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white italic font-light">Impact</span>
                </h2>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 blur-xl"></div>
              
              <div className="relative">
                <div className="text-5xl lg:text-6xl xl:text-7xl font-[900] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-600 to-gray-400 dark:from-white dark:via-white/80 dark:to-white/20 mb-4 drop-shadow-2xl">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-wide">{stat.label}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;