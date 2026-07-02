import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalPreloader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Show for 1.8 seconds on initial load to ensure a premium entry feel
    const timer = setTimeout(() => {
      setShow(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient Premium Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo Icon */}
            <div className="w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br from-accent-cyan via-white/20 to-transparent p-[2px] shadow-[0_0_60px_rgba(6,182,212,0.2)]">
              <div className="w-full h-full bg-[#050B14] rounded-[22px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/10 to-transparent"></div>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-accent-cyan relative z-10">BC</span>
              </div>
            </div>
            
            {/* Text Logo */}
            <motion.h2 
              initial={{ opacity: 0, letterSpacing: '0em' }}
              animate={{ opacity: 1, letterSpacing: '0.1em' }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-extrabold text-white uppercase flex items-center gap-1"
            >
              Broker<span className="text-accent-cyan">Core</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-gray-500 text-xs mt-3 uppercase tracking-[0.3em]"
            >
              Initializing Workspace
            </motion.p>
            
            {/* Minimalist Progress Line */}
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 160 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 h-[2px] bg-white/10 rounded-full overflow-hidden relative"
            >
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-accent-cyan to-transparent rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalPreloader;
