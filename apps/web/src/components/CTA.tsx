import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/contact');
  };

  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-6"
          >
            Ready to Launch?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight uppercase tracking-widest break-words"
          >
            Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">Brokerage</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed px-4 md:px-0"
          >
            Let's engineer your trading infrastructure together. We're here to transform your vision into an institutional-grade brokerage that drives results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="px-4 md:px-0 flex justify-center"
          >
            <Button
              onClick={handleCTAClick}
              size="lg"
              className="bg-white hover:bg-gray-100 text-black font-bold px-6 py-6 md:px-12 md:py-7 text-sm md:text-base rounded-full group uppercase tracking-widest transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] w-full md:w-auto flex items-center justify-center whitespace-normal text-center h-auto"
            >
              Get a Free Consultation
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;