import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, ServerCrash } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.15)] relative">
              <ServerCrash className="text-accent-cyan" size={48} />
              <motion.div 
                animate={{ opacity: [0.2, 1, 0.2] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-accent-cyan/20 blur-xl rounded-3xl -z-10"
              />
            </div>
          </div>
          
          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4 tracking-tighter">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Connection Lost
          </h2>
          
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
            The page you are looking for has been moved, deleted, or never existed in our infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild 
              className="w-full sm:w-auto bg-accent-cyan text-black hover:bg-[#00cce6] font-bold px-8 py-6 rounded-full group uppercase tracking-widest transition-all hover:scale-105"
            >
              <Link to="/">
                <Home className="mr-2" size={18} />
                Return to Dashboard
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 font-bold px-8 py-6 rounded-full group uppercase tracking-widest transition-all"
            >
              <button onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
                Go Back
              </button>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
