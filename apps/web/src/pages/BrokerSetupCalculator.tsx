import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { sendEmailNotification } from '@/lib/sendEmailNotification';
import { Check, ChevronRight, ChevronLeft, RefreshCw, Copy, CheckCircle2 } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';
import SEOHead from '@/components/SEOHead';

const complianceOptions = {
  regulated: [
    { id: 'fsc', name: 'FSC Mauritius', time: '5-6 Months', totalCost: 37500, renewal: 26000 },
    { id: 'misa', name: 'MISA Comoros', time: '1-2 Months', totalCost: 33000, renewal: 27000 },
    { id: 'cysec', name: 'CySEC Cyprus', time: '7-8 Months', totalCost: 57000, renewal: 52000 },
    { id: 'fsa', name: 'FSA Seychelles', time: '2-3 Months', totalCost: 26000, renewal: 20000 },
    { id: 'labuan', name: 'Labuan FSA', time: '4-5 Months', totalCost: 29000, renewal: 20000 },
    { id: 'vfsc', name: 'VFSC Vanuatu', time: '4-5 Months', totalCost: 35000, renewal: 8000 },
  ],
  nonRegulated: [
    { id: 'stlucia', name: 'Saint Lucia', time: '2-3 Weeks', totalCost: 5000, renewal: 2500 },
    { id: 'svg', name: 'Saint Vincent Grenadines', time: '2-3 Weeks', totalCost: 4000, renewal: 2000 },
    { id: 'mauritius_auth', name: 'Mauritius (Authorize Company)', time: '2-3 Months', totalCost: 9000, renewal: 4000 },
    { id: 'bvi', name: 'British Virgin Islands (BVI)', time: '2-3 Weeks', totalCost: 4500, renewal: 2200 },
    { id: 'anguilla', name: 'Anguilla', time: '1-2 Months', totalCost: 7500, renewal: 3500 },
    { id: 'wales', name: 'Wales (United Kingdom)', time: '1-2 Weeks', totalCost: 500, renewal: 100 },
  ]
};

const steps = [
  {
    id: 1,
    title: 'Compliance',
    type: 'compliance',
    // handled specifically via complianceOptions
  },
  {
    id: 2,
    title: 'Logo + Favicon Design',
    type: 'single',
    options: [
      { id: 'logo_std', name: 'Standard Logo', time: '15 Days', oneTime: 500 },
      { id: 'logo_prem', name: 'Premium Logo', time: '20 Days', oneTime: 1000 },
    ]
  },
  {
    id: 3,
    title: 'Website Development',
    type: 'single',
    options: [
      { id: 'web_basic', name: 'Basic Website', time: '8-10 Days', pages: 'Up to 8', totalCost: 1000 },
      { id: 'web_std', name: 'Standard Website', time: '20-30 Days', pages: 'Up to 15', totalCost: 2000 },
      { id: 'web_prem', name: 'Premium Website', time: '30-45 Days', pages: 'Up to 30', totalCost: 4500 },
    ]
  },
  {
    id: 4,
    title: 'Hosting Server',
    type: 'multi',
    options: [
      { id: 'host_pri', name: 'Primary Server', time: '8-10 Days', monthly: 500 },
      { id: 'host_bak', name: 'Backup Server', time: '8-10 Days', monthly: 400 },
      { id: 'host_acc', name: 'Access Server', time: '12-15 Days', monthly: 400 },
      { id: 'host_vps', name: 'Fast VPS', time: '10-12 Days', monthly: 200 },
    ]
  },
  {
    id: 5,
    title: 'Trading Platform',
    type: 'single',
    options: [
      { id: 'plat_mt5', name: 'Meta Trader 5 (MT5)', time: '1-2 Months', monthly: 10000 },
      { id: 'plat_ct', name: 'C Trader', time: '1-2 Months', monthly: 8000 },
      { id: 'plat_sirix', name: 'Sirix', time: '12-15 Days', oneTime: 3500, monthly: 4500 },
      { id: 'plat_match', name: 'Match Trader', time: '1-2 Months', oneTime: 5000, monthly: 5000 },
      { id: 'plat_vertex', name: 'Vertex Fx', time: '12-15 Days', oneTime: 2500, monthly: 3500 },
      { id: 'plat_arc', name: 'Arc Trader', time: '12-15 Days', oneTime: 4000, monthly: 2500 },
    ]
  },
  {
    id: 6,
    title: 'CRM + Mobile App',
    type: 'single',
    options: [
      { id: 'crm_basic', name: 'Basic Plan', time: '15-20 Days', monthly: 1000 },
      { id: 'crm_std', name: 'Standard Plan', time: '25-30 Days', oneTime: 500, monthly: 1500 },
      { id: 'crm_cust', name: 'Customized Plan', time: '1-2 Months', oneTime: 1000, monthly: 2000 },
    ]
  },
  {
    id: 7,
    title: 'Gateway & Bridge',
    type: 'single',
    options: [
      { id: 'gb_mt5', name: 'MT5 Gateway', time: '12-15 Days', monthly: 1250 },
      { id: 'gb_std', name: 'Standard Bridge', time: '12-15 Days', oneTime: 1000, monthly: 1500 },
      { id: 'gb_prem', name: 'Premium Bridge', time: '22-25 Days', oneTime: 1500, monthly: 2000 },
    ]
  },
  {
    id: 8,
    title: 'Liquidity Provider',
    type: 'single',
    options: [
      { id: 'lp_t1', name: 'Primary Liquidity Provider (Tier 1)', time: '20-25 Days', deposit: 20000, monthly: 1500 },
      { id: 'lp_t2', name: 'Secondary Liquidity Provider (Tier 2)', time: '12-15 Days', deposit: 5000, monthly: 1000 },
      { id: 'lp_live', name: 'Live Feed', time: '5-7 Days', monthly: 1000 },
    ]
  },
  {
    id: 9,
    title: 'Plugins',
    type: 'multi',
    options: [
      { id: 'plug_tc', name: 'Trade Copier', time: '5-7 Days', monthly: 800 },
      { id: 'plug_pamm', name: 'PAMM', time: '8-10 Days', monthly: 1200 },
      { id: 'plug_social', name: 'Social Trading', time: '8-10 Days', monthly: 1500 },
      { id: 'plug_cm', name: 'Credit Management', time: '5-7 Days', monthly: 800 },
      { id: 'plug_swap', name: 'Swap-Free/Changer', time: '5-7 Days', monthly: 800 },
      { id: 'plug_risk', name: 'Risk Management', time: '10-12 Days', oneTime: 800, monthly: 1500 },
    ]
  },
  {
    id: 10,
    title: 'Digital Marketing',
    type: 'multi',
    options: [
      { id: 'dm_seo', name: 'Search Engine Optimization (SEO)', time: '30-45 Days', monthly: 1000 },
      { id: 'dm_ppc', name: 'Paid Search Marketing (PPC)', time: '7-10 Days', oneTime: 500, monthly: 1000 },
      { id: 'dm_smm', name: 'Social Media Marketing', time: '10-15 Days', oneTime: 1000, monthly: 1200 },
      { id: 'dm_pm', name: 'Performance Marketing', time: '10-15 Days', oneTime: 1500, monthly: 1500 },
      { id: 'dm_cm', name: 'Content Marketing', time: '10-15 Days', oneTime: 1500, monthly: 1000 },
      { id: 'dm_em', name: 'Email Marketing', time: '10-15 Days', oneTime: 300, monthly: 500 },
    ]
  }
];

const defaultState = {
  isRegulated: false,
  selections: {} as Record<number, string[]>
};

const BrokerSetupCalculator = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRegulated, setIsRegulated] = useState(defaultState.isRegulated);
  const [selections, setSelections] = useState(defaultState.selections);
  
  // Summary Form State
  const [showSummary, setShowSummary] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate quote text
    const active = getActiveOptionsList();
    let quoteText = "Brokerage Quote Summary\n\n";
    steps.forEach(step => {
      const stepOptions = active.filter(opt => opt.stepId === step.id);
      if (stepOptions.length > 0) {
        quoteText += `${step.title}\n`;
        stepOptions.forEach(opt => {
          quoteText += `- ${opt.name} `;
          const costs = [];
          if (opt.oneTime) costs.push(`One-Time: $${opt.oneTime}`);
          if (opt.totalCost) costs.push(`One-Time: $${opt.totalCost}`);
          if (opt.deposit) costs.push(`Deposit: $${opt.deposit}`);
          if (opt.monthly) costs.push(`Monthly: $${opt.monthly}`);
          if (opt.renewal) costs.push(`Renewal: $${opt.renewal}`);
          quoteText += `(${costs.join(' / ')})\n`;
        });
        quoteText += "\n";
      }
    });

    const t = calculateTotals();
    quoteText += "Cost Breakdown\n";
    quoteText += `One-Time: $${t.oneTime.toLocaleString()}\n`;
    quoteText += `Monthly: $${t.monthly.toLocaleString()}\n`;
    quoteText += `Annualized Monthly: $${t.annualizedMonthly.toLocaleString()}\n`;
    quoteText += `Compliance Renewal: $${t.renewal.toLocaleString()}\n`;
    quoteText += `Year 1 Total: $${t.year1Total.toLocaleString()}\n`;
    
    if (formData.message) {
       quoteText += `\nAdditional Requirements: ${formData.message}`;
    }

    try {
      const newLead = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: quoteText,
        interest: 'Brokerage Quote',
        status: 'New'
      };

      // Fire and forget to make the UI feel instant
      supabase.from('leads').insert(newLead).then(({ error }) => {
        if (error) {
          console.error("Error submitting quote:", error);
        } else {
          sendEmailNotification(newLead);
        }
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error generating quote:", error);
      setIsSubmitting(false);
      setIsSuccess(true); 
    }
  };

  const copySummaryToClipboard = () => {
    const active = getActiveOptionsList();
    let text = "Brokerage Quote Summary\\n\\n";
    
    // Group by steps
    steps.forEach(step => {
      const stepOptions = active.filter(opt => opt.stepId === step.id);
      if (stepOptions.length > 0) {
        text += `${step.title}\\n`;
        stepOptions.forEach(opt => {
          text += `- ${opt.name} `;
          const costs = [];
          if (opt.oneTime) costs.push(`One-Time: $${opt.oneTime}`);
          if (opt.totalCost) costs.push(`One-Time: $${opt.totalCost}`);
          if (opt.deposit) costs.push(`Deposit: $${opt.deposit}`);
          if (opt.monthly) costs.push(`Monthly: $${opt.monthly}`);
          if (opt.renewal) costs.push(`Renewal: $${opt.renewal}`);
          text += `(${costs.join(' / ')})\\n`;
        });
        text += "\\n";
      }
    });

    const totals = calculateTotals();
    text += "Cost Breakdown\\n";
    text += `One-Time: $${totals.oneTime.toLocaleString()}\\n`;
    text += `Monthly: $${totals.monthly.toLocaleString()}\\n`;
    text += `Annualized Monthly: $${totals.annualizedMonthly.toLocaleString()}\\n`;
    text += `Compliance Renewal: $${totals.renewal.toLocaleString()}\\n`;
    text += `Year 1 Total: $${totals.year1Total.toLocaleString()}\\n`;

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setIsRegulated(defaultState.isRegulated);
    setSelections(defaultState.selections);
    setCurrentStepIndex(0);
  };

  const toggleSelection = (stepId: number, optionId: string, type: string) => {
    setSelections(prev => {
      const stepSelections = prev[stepId] || [];
      if (type === 'single' || type === 'compliance') {
        if (stepSelections.includes(optionId)) {
          return { ...prev, [stepId]: [] };
        }
        return { ...prev, [stepId]: [optionId] };
      } else {
        if (stepSelections.includes(optionId)) {
          return { ...prev, [stepId]: stepSelections.filter((id: string) => id !== optionId) };
        } else {
          return { ...prev, [stepId]: [...stepSelections, optionId] };
        }
      }
    });
  };

  const getActiveOptionsList = () => {
    const active: any[] = [];
    // Compliance
    const compOptions = isRegulated ? complianceOptions.regulated : complianceOptions.nonRegulated;
    const compSel = selections[1] || [];
    compSel.forEach((id: string) => {
      const opt = compOptions.find(o => o.id === id);
      if (opt) active.push({ ...opt, stepId: 1 });
    });

    // Other steps
    for (let i = 1; i < steps.length; i++) {
      const step = steps[i];
      const sel = selections[step.id] || [];
      sel.forEach((id: string) => {
        const opt = step.options?.find(o => o.id === id);
        if (opt) active.push({ ...opt, stepId: step.id });
      });
    }
    return active;
  };

  const calculateTotals = () => {
    let oneTime = 0;
    let monthly = 0;
    let renewal = 0;

    const activeOptions = getActiveOptionsList();

    activeOptions.forEach(opt => {
      if (opt.stepId === 1) {
        oneTime += opt.totalCost || 0;
        renewal += opt.renewal || 0;
      } else {
        oneTime += opt.oneTime || opt.totalCost || opt.deposit || 0;
        monthly += opt.monthly || 0;
      }
    });

    const annualizedMonthly = monthly * 12;
    const year1Total = oneTime + annualizedMonthly + renewal;

    return { oneTime, monthly, annualizedMonthly, renewal, year1Total };
  };

  const totals = calculateTotals();
  const currentStep = steps[currentStepIndex];

  return (
    <div className="min-h-screen text-white pt-20 pb-12 px-3 sm:px-6">
      <SEOHead
        title="Forex Broker Setup Cost Calculator | BrokerCore Solution"
        description="Estimate the exact cost of starting your own Forex brokerage. Calculate expenses for MT5 White Label, licensing, CRM, and liquidity setup."
        keywords="Forex Broker Cost, Start Forex Broker Price, White Label Cost Calculator, Forex Business Investment"
      />
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 px-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider mb-3 leading-tight">
            {showSummary ? 'Contact & Summary' : <span>Brokerage Startup Cost <span className="text-accent-cyan">Estimator</span></span>}
          </h1>
          {!showSummary && <p className="text-gray-400 text-sm sm:text-lg">Calculate your exact technology, liquidity, and platform costs to launch your brokerage.</p>}
        </div>

        {showSummary ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column: Contact Form */}
              <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <form onSubmit={handleFormSubmit} className="space-y-4" aria-label="Contact information form">
                  <div>
                    <label htmlFor="calc-name" className="block text-sm font-medium text-gray-300 mb-1">Name <span className="text-red-400" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
                    <input
                      id="calc-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 outline-none border border-[#262626] focus:border-accent-cyan transition-colors"
                      placeholder="Your full name"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="calc-email" className="block text-sm font-medium text-gray-300 mb-1">Email <span className="text-red-400" aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
                    <input
                      id="calc-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 outline-none border border-[#262626] focus:border-accent-cyan transition-colors"
                      placeholder="you@company.com"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="calc-phone" className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-[#262626] bg-[#1A1A1A] text-gray-300 text-sm" aria-hidden="true">
                        🇮🇳 +91
                      </span>
                      <input
                        id="calc-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="flex-1 bg-[#1A1A1A] text-white rounded-r-lg px-4 py-3 outline-none border border-[#262626] border-l-0 focus:border-accent-cyan transition-colors"
                        placeholder="Phone number"
                        aria-label="Phone number with India +91 country code"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="calc-message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea
                      id="calc-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 outline-none border border-[#262626] focus:border-accent-cyan transition-colors"
                      placeholder="Any specific requirements..."
                    />
                  </div>
                  
                  <div className="pt-2">
                    {isSuccess ? (
                      <div className="text-green-500 font-medium text-center bg-green-500/10 py-3 rounded-lg flex items-center justify-center gap-2">
                        <CheckCircle2 size={18} />
                        Saved successfully! We'll contact you shortly.
                      </div>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-accent-cyan hover:bg-black text-black hover:text-white font-bold py-3 rounded-lg border border-transparent hover:border-accent-cyan transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Configuration'}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Column: Quote Summary */}
              <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-6 md:p-8 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Your Quote Summary</h2>
                  <button 
                    onClick={copySummaryToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#262626] border border-[#333] rounded-md text-sm text-gray-300 transition-colors"
                  >
                    {isCopied ? <Check size={14} className="text-green-400"/> : <Copy size={14} />} 
                    {isCopied ? 'Copied!' : 'Copy Summary'}
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
                  {steps.map(step => {
                    const stepOptions = getActiveOptionsList().filter(opt => opt.stepId === step.id);
                    if (stepOptions.length === 0) return null;
                    return (
                      <div key={step.id}>
                        <h3 className="text-accent-cyan font-medium mb-2 text-sm">{step.title}</h3>
                        <div className="space-y-2">
                          {stepOptions.map(opt => (
                            <div key={opt.id} className="flex justify-between items-start text-sm border-b border-[#1A1A1A] pb-2 last:border-0">
                              <span className="text-gray-300">- {opt.name}</span>
                              <span className="text-gray-300 text-right whitespace-nowrap ml-4">
                                {opt.oneTime !== undefined && `One-Time: $${opt.oneTime.toLocaleString()}`}
                                {opt.totalCost !== undefined && `One-Time: $${opt.totalCost.toLocaleString()}`}
                                {opt.deposit !== undefined && `Deposit: $${opt.deposit.toLocaleString()}`}
                                {opt.oneTime !== undefined && opt.monthly !== undefined && ' / '}
                                {opt.totalCost !== undefined && opt.monthly !== undefined && ' / '}
                                {opt.deposit !== undefined && opt.monthly !== undefined && ' / '}
                                {opt.monthly !== undefined && `Monthly: $${opt.monthly.toLocaleString()}`}
                                {opt.renewal !== undefined && `Renewal: $${opt.renewal.toLocaleString()}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Breakdown Bar */}
            <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl p-4 sm:p-6 mb-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3">Cost Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
                <div className="bg-[#1A1A1A] p-3 sm:p-4 rounded-xl">
                  <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">One-Time</p>
                  <p className="text-base sm:text-xl font-bold text-white">${totals.oneTime.toLocaleString()}</p>
                </div>
                <div className="bg-[#1A1A1A] p-3 sm:p-4 rounded-xl">
                  <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Monthly</p>
                  <p className="text-base sm:text-xl font-bold text-white">${totals.monthly.toLocaleString()}</p>
                </div>
                <div className="bg-[#1A1A1A] p-3 sm:p-4 rounded-xl">
                  <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Annualized</p>
                  <p className="text-base sm:text-xl font-bold text-white">${totals.annualizedMonthly.toLocaleString()}</p>
                </div>
                <div className="bg-[#1A1A1A] p-3 sm:p-4 rounded-xl">
                  <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Renewal</p>
                  <p className="text-base sm:text-xl font-bold text-white">${totals.renewal.toLocaleString()}</p>
                </div>
                <div className="bg-accent-cyan p-3 sm:p-4 rounded-xl flex flex-col justify-center col-span-2 sm:col-span-1">
                  <p className="text-[10px] sm:text-xs text-black/70 uppercase tracking-wider mb-1 font-bold">Year 1 Total</p>
                  <p className="text-xl sm:text-2xl font-bold text-black">${totals.year1Total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Navigation back */}
            <div>
              <button 
                onClick={() => setShowSummary(false)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#1A1A1A] hover:bg-[#262626] border border-[#333] transition-colors"
              >
                Previous
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          
          {/* Main Calculator Area */}
          <div className="flex-grow flex flex-col min-w-0">
            
            {/* Step Indicators */}
            <div className="relative pb-3 mb-4">
              <div className="flex overflow-x-auto hide-scrollbar gap-1.5 sm:gap-2 relative z-10 pb-1">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`flex-shrink-0 transition-all duration-300 ${
                      idx === currentStepIndex 
                      ? 'bg-accent-cyan text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold' 
                      : 'bg-transparent border border-white/20 text-gray-400 hover:bg-white/5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold'
                    }`}
                  >
                    <span className="sm:hidden">{step.id}</span>
                    <span className="hidden sm:inline">{step.id}. {step.title}</span>
                  </button>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-0" />
              <div 
                className="absolute bottom-0 left-0 h-[1px] bg-accent-cyan z-10 transition-all duration-300" 
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }} 
              />
            </div>

            {/* Current Step Content */}
            <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex-grow">
              <div className="flex justify-between items-center mb-5 sm:mb-8">
                <h2 className="text-lg sm:text-2xl font-bold text-white uppercase tracking-wide">{currentStep.title}</h2>
                <span className="text-xs sm:text-sm text-gray-300 font-medium shrink-0 ml-2" aria-label={`Step ${currentStep.id} of 10`}>Step {currentStep.id}/10</span>
              </div>

              {currentStep.type === 'compliance' && (
                <div className="mb-8 flex items-center justify-center gap-4 p-2 bg-white/5 rounded-full w-fit mx-auto border border-white/10">
                  <button 
                    onClick={() => { setIsRegulated(false); setSelections(prev => ({...prev, 1: []})) }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!isRegulated ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    Non-Regulated
                  </button>
                  <button 
                    onClick={() => { setIsRegulated(true); setSelections(prev => ({...prev, 1: []})) }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isRegulated ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    Regulated
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {currentStep.type === 'compliance' ? (
                   (isRegulated ? complianceOptions.regulated : complianceOptions.nonRegulated).map(opt => {
                     const isSelected = (selections[currentStep.id] || []).includes(opt.id);
                     return (
                       <div 
                         key={opt.id} 
                         onClick={() => toggleSelection(currentStep.id, opt.id, currentStep.type)}
                         className={`relative cursor-pointer p-4 sm:p-6 rounded-2xl transition-all duration-300 ${isSelected ? 'border-[1.5px] border-accent-cyan bg-black' : 'border border-[#262626] bg-[#0A0A0A] hover:border-white/30'}`}
                       >
                         {isSelected && <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-accent-cyan"><Check size={16} /></div>}
                         <h3 className="text-sm sm:text-lg font-bold text-white mb-2 pr-6">{opt.name}</h3>
                         <div className="text-xs sm:text-sm text-gray-400 space-y-1">
                           <p>Setup Time: <span className="text-white">{opt.time}</span></p>
                           <p>Total Cost: <span className="text-white">${opt.totalCost.toLocaleString()}</span></p>
                           <p>Renewal Cost: <span className="text-white">${opt.renewal.toLocaleString()}</span></p>
                         </div>
                       </div>
                     )
                   })
                ) : (
                  (currentStep.options as any[])?.map((opt: any) => {
                    const isSelected = (selections[currentStep.id] || []).includes(opt.id);
                    return (
                       <div 
                         key={opt.id} 
                         onClick={() => toggleSelection(currentStep.id, opt.id, currentStep.type)}
                         className={`relative cursor-pointer p-4 sm:p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between ${isSelected ? 'border-[1.5px] border-accent-cyan bg-black' : 'border border-[#262626] bg-[#0A0A0A] hover:border-white/30'}`}
                       >
                         {isSelected && <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-accent-cyan"><Check size={16} /></div>}
                         <div>
                           <h3 className="text-sm sm:text-lg font-bold text-white mb-2 sm:mb-4 pr-6 leading-snug">{opt.name}</h3>
                         </div>
                         <div className="text-xs sm:text-sm text-gray-400 space-y-1.5 mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-[#262626]">
                           {opt.time && <p className="flex justify-between gap-2"><span>Time:</span> <span className="text-white font-medium text-right">{opt.time}</span></p>}
                           {opt.pages && <p className="flex justify-between gap-2"><span>Pages:</span> <span className="text-white font-medium">{opt.pages}</span></p>}
                           {(opt.oneTime !== undefined || opt.totalCost !== undefined || opt.deposit !== undefined) && (
                             <p className="flex justify-between gap-2">
                               <span>{opt.deposit !== undefined ? 'Deposit:' : 'One-Time:'}</span> 
                               <span className="text-white font-medium">${(opt.oneTime || opt.totalCost || opt.deposit).toLocaleString()}</span>
                             </p>
                           )}
                           {opt.monthly !== undefined && (
                             <p className="flex justify-between gap-2">
                               <span>Monthly:</span> 
                               <span className="text-white font-medium">${opt.monthly.toLocaleString()}</span>
                             </p>
                           )}
                         </div>
                       </div>
                    )
                  })
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-[#262626] gap-2">
                <button 
                  onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                >
                  <ChevronLeft size={16} /> <span className="hidden sm:inline">Previous</span><span className="sm:hidden">Prev</span>
                </button>
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <button 
                    onClick={() => {
                      setSelections(prev => ({ ...prev, [currentStep.id]: [] }));
                      if (currentStepIndex === steps.length - 1) {
                        setShowSummary(true);
                      } else {
                        setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Skip
                  </button>
                  <button 
                    onClick={() => {
                      if (currentStepIndex === steps.length - 1) {
                        setShowSummary(true);
                      } else {
                        setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
                      }
                    }}
                    className="flex items-center gap-1 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-black bg-white hover:bg-gray-200 transition-colors"
                  >
                    <span className="sm:hidden">{currentStepIndex === steps.length - 1 ? 'Review' : 'Next'}</span>
                    <span className="hidden sm:inline">{currentStepIndex === steps.length - 1 ? 'Review Summary' : `Next: ${steps[currentStepIndex + 1].title}`}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar Summary — shown at bottom on mobile, right side on desktop */}
          <div className="w-full lg:w-80 flex-shrink-0 order-last lg:order-none">
            <div className="lg:sticky lg:top-28 bg-[#0A0A0A] border border-[#262626] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                 <h3 className="text-base sm:text-xl font-bold text-white uppercase tracking-wider">Summary</h3>
                 <button onClick={handleReset} className="text-gray-300 hover:text-white transition-colors" title="Reset Calculator" aria-label="Reset calculator">
                    <RefreshCw size={18} />
                 </button>
              </div>

              {/* On mobile show as horizontal totals strip */}
              <div className="grid grid-cols-2 sm:block gap-3 mb-4 sm:mb-8">
                <div className="sm:hidden bg-[#1A1A1A] p-3 rounded-xl">
                  <p className="text-[10px] text-gray-300 uppercase tracking-wider mb-0.5">Year 1 Total</p>
                  <p className="text-lg font-extrabold text-accent-cyan">${totals.year1Total.toLocaleString()}</p>
                </div>
                <div className="sm:hidden bg-[#1A1A1A] p-3 rounded-xl">
                  <p className="text-[10px] text-gray-300 uppercase tracking-wider mb-0.5">Monthly</p>
                  <p className="text-lg font-extrabold text-white">${totals.monthly.toLocaleString()}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-300 font-medium mb-1 uppercase tracking-widest">Year 1 Total</p>
                  <p className="text-4xl font-[800] text-accent-cyan">${totals.year1Total.toLocaleString()}</p>
                </div>
              </div>

              <div className="hidden sm:block space-y-4 pt-6 border-t border-[#262626]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">One-Time Cost</span>
                  <span className="text-white font-bold">${totals.oneTime.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Monthly Cost</span>
                  <span className="text-white font-bold">${totals.monthly.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Annualized Monthly</span>
                  <span className="text-white font-bold">${totals.annualizedMonthly.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Compliance Renewal</span>
                  <span className="text-white font-bold">${totals.renewal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowSummary(true)}
                className="w-full mt-4 sm:mt-8 py-3 sm:py-4 bg-accent-cyan hover:bg-black text-black hover:text-white border hover:border-accent-cyan rounded-full font-bold uppercase tracking-widest transition-all duration-300 text-sm sm:text-base">
                Submit Configuration
              </button>
            </div>
          </div>

        </div>
        )}
      </div>
    </div>
  );
};

export default BrokerSetupCalculator;
