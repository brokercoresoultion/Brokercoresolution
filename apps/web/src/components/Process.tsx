import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  { id: '01', title: 'Market Research', description: 'Identifying your target audience and regulatory jurisdiction for optimal market entry.' },
  { id: '02', title: 'Company Incorporation', description: 'Complete legal registration and structuring of your business entity.' },
  { id: '03', title: 'Licensing & Compliance', description: 'Obtaining necessary permits and ensuring strict regulatory adherence.' },
  { id: '04', title: 'Platform Selection', description: 'Deploying robust, world-class trading platforms and infrastructure.' },
  { id: '05', title: 'Liquidity Setup', description: 'Partnering with tier-1 liquidity providers for deep, reliable market access.' },
  { id: '06', title: 'CRM Integration', description: 'Setting up advanced back-office systems for client management, KYC, and AML.' },
  { id: '07', title: 'Payment Systems', description: 'Configuring secure, global deposit and withdrawal methods for seamless transactions.' },
  { id: '08', title: 'Risk Management', description: 'Installing sophisticated RMS tools to monitor and mitigate operational risks.' },
  { id: '09', title: 'Marketing Strategy', description: 'Implementing high-conversion digital marketing funnels to attract your target audience.' },
  { id: '10', title: 'Go-Live & Support', description: 'Final system testing, comprehensive staff training, and official 24/7 launch.' }
];

const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 transition-colors duration-500 relative overflow-hidden" ref={containerRef}>
      {/* Dynamic Backgrounds */}
      <div className="absolute top-[10%] right-[0%] w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[0%] w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-widest text-accent-cyan mb-6"
          >
            Our Methodology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-4"
          >
            The Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue italic font-light">10-Step Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A proven, step-by-step framework designed to take your business from concept to a fully operational industry leader.
          </motion.p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 transform md:-translate-x-1/2"></div>
          {/* Animated fill line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-cyan to-accent-blue transform md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          ></motion.div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className="relative flex items-center md:justify-between flex-col md:flex-row w-full pl-12 md:pl-0">
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white dark:bg-[#09090b] border-2 border-black/20 dark:border-white/20 z-10"></div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.2 }}
                      className="absolute w-4 h-4 rounded-full bg-accent-cyan shadow-[0_0_15px_rgba(0,229,255,0.6)] z-20"
                    ></motion.div>
                  </div>

                  {/* Left Side Content (Empty for odd indices on md) */}
                  <div className={`w-full md:w-[45%] ${!isEven ? 'md:text-right md:order-1' : 'md:order-2'} hidden md:block`}></div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-full md:w-[45%] relative group ${isEven ? 'md:order-2' : 'md:order-1 md:text-right'}`}
                  >
                    <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 group-hover:border-accent-cyan/30 shadow-lg dark:shadow-none transition-colors duration-500 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                      
                      <div className="text-5xl font-[900] text-transparent bg-clip-text bg-gradient-to-b from-black/10 dark:from-white/10 to-transparent mb-2">
                        {step.id}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent-cyan transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
