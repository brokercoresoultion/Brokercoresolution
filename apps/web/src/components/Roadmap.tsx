import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { step: '01', title: 'Discovery & Strategy', description: 'We begin with a deep dive into your business model, target jurisdictions, and risk management preferences. Our architects help you select the right platform, CRM, and liquidity setup.' },
  { step: '02', title: 'Customization & Integration', description: 'Our engineers get to work. We configure your MT4/MT5 white-label, deploy your customized CRM, integrate payment gateways, and establish FIX API liquidity bridges—all fully branded.' },
  { step: '03', title: 'Testing, Training & Launch', description: 'Before going live, we conduct rigorous stress-testing and latency optimization. We provide comprehensive training. Once signed off, your state-of-the-art brokerage is deployed.' }
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-28 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Your Brokerage, Live in <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">3 Steps</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Launching a complex financial institution has never been this streamlined. We handle the heavy lifting so you can focus on scaling your business.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-accent-cyan via-accent-cyan to-transparent hidden md:block"
          ></motion.div>
          
          <div className="space-y-12">
            {steps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''} group`}
                >
                  <div className="md:w-5/12"></div>
                  
                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="z-10 flex items-center justify-center w-12 h-12 bg-[#121620] border-2 border-accent-cyan rounded-full shrink-0 my-4 md:my-0 pulse-glow group-hover:bg-accent-cyan transition-all duration-300"
                  >
                    <span className="text-white font-bold text-sm group-hover:text-black transition-colors duration-300">{item.step}</span>
                  </motion.div>
                  
                  {/* Content Box */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotateX: isEven ? 5 : -5, rotateY: isEven ? -10 : 10, z: 50, boxShadow: "0px 15px 40px rgba(0, 229, 255, 0.15)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
                    className={`md:w-5/12 bg-gradient-to-br from-[#0f172a] to-[#0B0D17] border border-white/[0.08] p-8 rounded-2xl group-hover:border-accent-cyan/40 transition-colors duration-300 w-full text-center ${isEven ? 'md:text-left' : 'md:text-right'} relative overflow-hidden`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent-cyan/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Changed Font for Title and Description */}
                    <motion.h3 style={{ transform: "translateZ(30px)" }} className="text-xl font-mono font-bold tracking-tight text-white relative z-10 leading-snug group-hover:text-accent-cyan transition-colors duration-300 mb-3">
                      {item.title}
                    </motion.h3>
                    
                    <motion.p style={{ transform: "translateZ(20px)" }} className="text-sm text-gray-300 relative z-10 leading-relaxed font-sans tracking-wide">
                      {item.description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Roadmap;
