import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found | BrokerCore Solution';
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-cyan/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none">
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            System Route <span className="text-accent-cyan">Not Found</span>
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto font-light leading-relaxed">
            The infrastructure endpoint you requested does not exist or has been relocated. Please verify the URL or return to the main dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <button className="flex items-center gap-2 px-8 py-4 bg-accent-cyan text-black font-bold uppercase tracking-widest text-sm rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300">
                <Home size={18} />
                Return Home
              </button>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
