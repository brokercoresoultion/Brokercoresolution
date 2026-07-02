import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Target, ShieldCheck, Globe2, Clock, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const offers = [
  {
    title: 'Lightning-Fast Deployment',
    description: 'Go to market in weeks, not months. Our turnkey framework allows for rapid configuration, drastically reducing your time-to-market while ensuring institutional-grade stability.',
    icon: Zap,
    color: 'text-accent-cyan',
    image: '/features_metatrader_1782110668532.png'
  },
  {
    title: '99.99% Uptime & Zero Downtime Architecture',
    description: 'Hosted on premium, ultra-secure financial servers (Equinix NY4/LD4). Our load-balanced infrastructure ensures your trading ecosystem remains online during the most volatile market events.',
    icon: ShieldCheck,
    color: 'text-white',
    image: '/features_security_1782110744431.png'
  },
  {
    title: '24/7 Dedicated Technical Support',
    description: 'You are never alone. Our team of seasoned Forex technologists provides round-the-clock server monitoring, immediate troubleshooting, and dedicated account management.',
    icon: Clock,
    color: 'text-gray-300',
    image: '/features_support_1782110724141.png'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden transition-colors duration-500">
      {/* Background Glows */}
      <div className="absolute top-[30%] left-[-20%] w-[1000px] h-[1000px] bg-accent-cyan/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-20%] w-[800px] h-[800px] bg-white/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full text-xs font-semibold uppercase tracking-widest text-white mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            Competitive Edge
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight"
          >
            Why Elite Brokerages <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white italic font-light">Choose Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light"
          >
            In a market where milliseconds mean millions, you cannot afford subpar technology. Here is why the fastest-growing brokerages rely on our architecture.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group flex flex-col glass-panel-3d rounded-3xl p-8 hover:border-accent-cyan/50 hover:shadow-[0_0_50px_rgba(0,229,255,0.2)] transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:border-accent-cyan/40 transition-all duration-500">
                  <Icon size={28} className="text-gray-400 group-hover:text-accent-cyan transition-colors duration-500" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight leading-snug group-hover:text-accent-cyan transition-colors duration-300 relative z-10">
                  {offer.title}
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-8 flex-grow relative z-10">
                  {offer.description}
                </p>
                
                <Link to="/contact" className="mt-auto relative z-10 flex items-center justify-between border-t border-white/10 pt-4 cursor-pointer group/link">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 group-hover/link:text-white transition-colors duration-300">
                    Explore Details
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-accent-cyan group-hover/link:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300">
                    <ArrowRight size={14} className="text-white group-hover/link:text-black group-hover/link:translate-x-0.5 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
