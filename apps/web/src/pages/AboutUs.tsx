import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import OptimizedImage from '../components/OptimizedImage';
import { Building2, Target, ShieldCheck, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen text-white pt-32 pb-12 relative overflow-hidden">
      <SEOHead 
        title="About Us | BrokerCoreSolution"
        description="Learn about our mission to help businesses streamline operations and accelerate growth with expert technology consulting."
      />

      {/* Ambient Lights */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 mb-32">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-semibold uppercase tracking-widest text-white mb-8">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              Our Story
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-none">
              Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white italic font-light">Brokerage</span> Infrastructure
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              At BROKERCORESOLUTION, we specialize in providing elite technology consulting, infrastructure solutions, and business advisory services to financial institutions, brokerage firms, and corporate clients worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Block Asymmetric */}
      <section className="relative z-10 mb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 relative group"
            >
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=80" 
                alt="Corporate Office" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="text-3xl font-bold text-white mb-2">Global Presence</h3>
                <p className="text-gray-300 font-light text-lg">Operating from the heart of Dubai's Business Bay.</p>
              </div>
            </motion.div>
            
            <div className="lg:col-span-5 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass p-10 rounded-[2rem] border border-white/5"
              >
                <Building2 className="w-12 h-12 text-accent-cyan mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Streamlined Operations</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  Our mission is to help businesses scale by implementing robust technology solutions. We cut through the noise to deliver systems that work perfectly from day one.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass p-10 rounded-[2rem] border border-white/5"
              >
                <Target className="w-12 h-12 text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Accelerated Growth</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  From CRM implementation to liquidity advisory, we provide the entire ecosystem required to build sustainable and highly profitable brokerages.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission (Bento Style) */}
      <section className="mb-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-12 md:p-16 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Our Vision</h3>
                <h4 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-8">
                  To become the undisputed <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent-cyan">trusted partner</span> for global financial infrastructure.
                </h4>
                <p className="text-gray-400 font-light text-lg leading-relaxed">
                  We envision a landscape where starting and scaling a brokerage is frictionless, powered by innovative infrastructure, operational excellence, and our deep industry expertise.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-12 md:p-16 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[80px] -mr-32 -mb-32 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-accent-cyan uppercase tracking-widest mb-4">Our Mission</h3>
                <h4 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-8">
                  To deliver reliable technology solutions that drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">long-term success.</span>
                </h4>
                <p className="text-gray-400 font-light text-lg leading-relaxed">
                  We provide operational expertise and strategic consulting that help institutions improve efficiency, strengthen their technological backbone, and maintain strict regulatory compliance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal Statement */}
      <section className="relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 border border-white/10 rounded-[2rem] bg-white/[0.02] relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
            <ShieldCheck className="w-16 h-16 text-gray-500 shrink-0" />
            <div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">Corporate Statement</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                BROKERCORESOLUTION is a technology consulting and business services company. We do not operate a brokerage, provide trading services, offer investment advice, manage client funds, or provide financial products. All services are provided exclusively to businesses, licensed institutions, and corporate clients.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
