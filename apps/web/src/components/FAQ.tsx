import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is a Forex Brokerage Turnkey Solution?',
    answer: 'A Forex Brokerage Turnkey Solution is a complete, pre-configured software and infrastructure package that allows an entity to launch a retail Forex brokerage instantly. BrokerCore Solution provides this by combining a white-label trading platform (MT5 or cTrader), a specialized Forex CRM, Tier-1 liquidity aggregation, and integrated payment gateways into a single deployable ecosystem.',
  },
  {
    question: 'How does a White-Label Forex CRM integrate with MT5?',
    answer: 'A White-Label Forex CRM integrates with the MetaTrader 5 (MT5) server via the MT5 Manager API. This connection allows real-time synchronization of client trading accounts, automated deposit and withdrawal processing, multi-tier Introducing Broker (IB) rebate calculations, and KYC/AML compliance tracking directly from the CRM dashboard to the MT5 trading terminal.',
  },
  {
    question: 'What is a Forex Liquidity Bridge?',
    answer: 'A Forex Liquidity Bridge is middleware software that connects a retail trading platform (such as MT5 or cTrader) directly to institutional Tier-1 liquidity providers or prime brokers. BrokerCore Solution utilizes FIX API protocols to route client orders to the market in sub-milliseconds, ensuring ultra-low latency execution and deep market depth.',
  },
  {
    question: 'How long does it take to deploy the MT5 White Label platform?',
    answer: 'A standard MT5 White Label environment can be fully deployed, branded, and configured within 2 to 4 weeks. This includes the setup of manager terminals, administrative controls, and connection to your selected liquidity providers.',
  },
  {
    question: 'Do you provide CRM and Payment Gateway integrations?',
    answer: 'Yes. We integrate the industry-leading Techysquad CRM, customized to your brand, which features automated KYC/AML onboarding, multi-tier IB management, and pre-integrated crypto and fiat payment gateways for seamless deposits and withdrawals.',
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" className="py-28 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Got Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Everything you need to know about starting your brokerage.
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ease-in-out ${
                  isActive
                    ? 'border-accent-cyan/40 bg-gradient-to-b from-accent-cyan/[0.05] to-transparent shadow-lg shadow-accent-cyan/5'
                    : 'border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent hover:border-white/20 hover:from-white/[0.05]'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                  onClick={() => setActiveIndex(isActive ? -1 : index)}
                >
                  <span className={`text-base font-semibold transition-colors duration-300 pr-4 leading-snug ${isActive ? 'text-accent-cyan' : 'text-white group-hover:text-accent-cyan/80'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    isActive
                      ? 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/50 rotate-180 shadow-[0_0_15px_rgba(0,255,255,0.3)]'
                      : 'bg-white/5 text-gray-400 border-white/10 group-hover:border-white/30 group-hover:text-white rotate-0'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed text-sm border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default FAQ;
