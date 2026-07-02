import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Globe, ChevronDown,
  Briefcase, FileCheck, Server, Zap, CreditCard,
  LayoutDashboard, ShieldAlert, Monitor, PuzzleIcon,
  TrendingUp, GraduationCap, ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/ThemeToggle';

// ─── Language Data ─────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'EN', label: 'English', flag: 'EN', dir: 'ltr' },
  { code: 'AR', label: 'العربية', flag: 'AR', dir: 'ltr' },
  { code: 'ES', label: 'Español', flag: 'ES', dir: 'ltr' },
  { code: 'FR', label: 'Français', flag: 'FR', dir: 'ltr' },
  { code: 'ZH', label: '中文', flag: 'ZH', dir: 'ltr' },
];

// ─── Mega-Menu Data ────────────────────────────────────────────────────────────
const MEGA_MENU = [
  {
    column: 'Broker Setup',
    accent: 'from-accent-cyan/20 to-transparent',
    dot: 'bg-accent-cyan',
    items: [
      { icon: Briefcase, label: 'Business Consulting', desc: 'End-to-end brokerage strategy & advisory', href: '/services/business-consulting' },
      { icon: FileCheck, label: 'Licensing & Regulations', desc: 'Multi-jurisdiction regulatory frameworks', href: '/services/licensing-regulations' },
      { icon: Server, label: 'Hosting Server Support', desc: 'Ultra-low latency co-location infrastructure', href: '/services/hosting-server-support' },
      { icon: Zap, label: 'Liquidity Provider', desc: 'Tier-1 deep order-book connections', href: '/services/liquidity-provider' },
      { icon: CreditCard, label: 'Gateway Solutions', desc: 'Multi-currency payment processing', href: '/services/gateway-solutions' },
    ],
  },
  {
    column: 'Tech Solutions',
    accent: 'from-white/20 to-transparent',
    dot: 'bg-white',
    items: [
      { icon: LayoutDashboard, label: 'CRM Software', desc: 'Intelligent client lifecycle management', href: '/services/crm-software' },
      { icon: ShieldAlert, label: 'Risk Management Software', desc: 'Real-time exposure & drawdown control', href: '/services/risk-management-software' },
      { icon: Monitor, label: 'Trading Platforms', desc: 'MT5, cTrader & custom white-label builds', href: '/services/trading-platforms' },
      { icon: PuzzleIcon, label: 'Plugin Solutions', desc: 'Proprietary performance-enhancing plugins', href: '/services/plugin-solutions' },
    ],
  },
  {
    column: 'Growth Support',
    accent: 'from-emerald-500/20 to-transparent',
    dot: 'bg-emerald-400',
    items: [
      { icon: TrendingUp, label: 'Digital Growth Solutions', desc: 'Data-driven acquisition & retention funnels', href: '/services/digital-growth-solutions' },
      { icon: GraduationCap, label: 'Technical Training', desc: 'Platform, compliance & operations training', href: '/services/technical-training' },
    ],
  },
];


// ─── Mega Menu Component ───────────────────────────────────────────────────────
const MegaMenu = ({ isOpen }: { isOpen: boolean }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-full left-0 mt-3 w-[860px] z-[100] rounded-2xl border border-white/10 bg-[#07090e] shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Top glow hairline */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

        <div className="grid grid-cols-3 divide-x divide-white/[0.06] p-6 gap-0">
          {MEGA_MENU.map((col, ci) => (
            <div key={col.column} className={`${ci > 0 ? 'pl-6' : ''} ${ci < MEGA_MENU.length - 1 ? 'pr-6' : ''}`}>
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                <span className={`w-1.5 h-1.5 rounded-full ${col.dot} shrink-0`} />
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{col.column}</p>
              </div>

              {/* Items */}
              <div className="space-y-0.5">
                {col.items.map((item, ii) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: ci * 0.05 + ii * 0.04, duration: 0.25 }}
                    >
                      <Link
                        to={item.href}
                        className="group flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08]"
                      >
                        {/* Icon bubble */}
                        <div className="relative w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden transition-all duration-500 group-hover:border-accent-cyan/40 group-hover:bg-accent-cyan/[0.05] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.15)_inset]">
                          {/* Animated flare */}
                          <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                          <Icon size={18} strokeWidth={1.5} className="text-gray-400 group-hover:text-accent-cyan group-hover:scale-110 transition-all duration-300 relative z-10" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-200 leading-tight">
                              {item.label}
                            </p>
                            <ArrowUpRight
                              size={11}
                              className="text-gray-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent-cyan transition-all duration-200"
                            />
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5 leading-snug group-hover:text-gray-400 transition-colors duration-200">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="border-t border-white/10 px-6 py-4 bg-white/[0.03] flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">Not sure where to start?</p>
            <p className="text-[11px] text-gray-600">Our experts will design a solution around your exact needs.</p>
          </div>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs font-bold uppercase tracking-widest hover:bg-accent-cyan/20 hover:border-accent-cyan/50 transition-all duration-200 group"
          >
            Book a Call
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Bottom glow */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Main Header ───────────────────────────────────────────────────────────────
const Header = ({ openDemoModal }: { openDemoModal?: () => void }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const navLinks = [];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Delay-tuned hover — prevents accidental flicker
  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    const [path, id] = href.split('#');
    if (path === '/' && id) {
      navigate(path);
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
      navigate(href);
    }
    if (isOpen) setIsOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isOpen) setIsOpen(false);
  };

  const handleCTA = () => {
    if (openDemoModal) {
      openDemoModal();
    } else {
      navigate('/contact');
    }
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[9990] pointer-events-none">
        <motion.header
          className={`pointer-events-auto transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] w-full ${isScrolled
            ? 'bg-[#09090b]/90 backdrop-blur-2xl border-b border-white/10 shadow-lg py-3'
            : 'bg-transparent py-5'
            }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex justify-between items-center w-full gap-4">

            {/* Logo */}
            <Link to="/" onClick={handleHomeClick} className="text-lg md:text-xl font-[800] text-white tracking-wide flex items-center shrink-0 gap-3">
              <img src="/logo.png" alt="BrokerCore Solution" className="h-10 sm:h-12 w-auto bg-white p-1 rounded-xl" />
              <span translate="no" className="notranslate text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white hidden md:block">BROKERCORESOLUTION</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-7 shrink-0">
              <Link to="/" onClick={handleHomeClick} className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-wider text-[13px] xl:text-sm">
                Home
              </Link>
              
              {/* Services with MegaMenu */}
              <div 
                onMouseEnter={handleMegaEnter} 
                onMouseLeave={handleMegaLeave}
                className="py-6 -my-6 flex items-center relative"
              >
                <button className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-wider text-[13px] xl:text-sm flex items-center gap-1">
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-300 ${megaOpen ? 'rotate-180 text-accent-cyan' : ''}`} />
                </button>
                <MegaMenu isOpen={megaOpen} />
              </div>

              {/* Company Dropdown */}
              <div className="relative group py-6 -my-6 flex items-center">
                <button className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-wider text-[13px] xl:text-sm flex items-center gap-1">
                  Company
                  <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-[calc(100%-12px)] left-0 mt-0 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-xl border border-white/10 bg-[#0a0c12]/95 backdrop-blur-2xl shadow-xl overflow-hidden py-2 translate-y-2 group-hover:translate-y-0">
                  <Link to="/about-us" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">About Us</Link>
                  <Link to="/contact" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Contact Us</Link>
                </div>
              </div>

              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-wider text-[13px] xl:text-sm">
                Blog
              </Link>
              <Link to="/brokerage-calculator" className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-wider text-[13px] xl:text-sm">
                Brokerage Calculator
              </Link>
            </nav>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                className="bg-accent-cyan text-[#0f172a] hover:bg-[#00cce6] group rounded-full font-bold px-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                onClick={handleCTA}
              >
                {t('nav.requestDemo')}
                <ArrowRight className="ml-2 h-4 w-4 text-[#0f172a] transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white p-1">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[9999] lg:hidden overflow-y-auto pointer-events-auto"
          >
            {/* 3D Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-accent-cyan/[0.2] rounded-full blur-[80px]" />
              <div className="absolute bottom-[-10%] left-[-20%] w-[300px] h-[300px] bg-white/[0.2] rounded-full blur-[80px]" />
              <motion.div
                animate={{ y: [0, -30, 0], rotate: [0, 90, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[5%] w-40 h-40 border border-white/5 rounded-full"
              />
              <motion.div
                animate={{ y: [0, 40, 0], rotate: [0, -90, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[20%] right-[5%] w-64 h-64 border border-accent-cyan/10 rounded-full"
              />
            </div>

            <div className="container mx-auto px-6 flex flex-col min-h-full relative z-10">

              {/* Mobile Header Row */}
              <div className="flex justify-between items-center h-20 shrink-0">
                <Link to="/" onClick={handleHomeClick} className="text-2xl font-bold text-white tracking-wider flex items-center gap-3">
                  <img src="/logo.png" alt="BrokerCore Solution" className="h-10 w-auto bg-white p-1 rounded-xl" />
                  <span translate="no" className="notranslate text-accent-cyan hidden sm:block">BROKERCORESOLUTION</span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="text-white p-1"><X size={28} /></button>
              </div>

              {/* Mobile Nav */}
              <nav className="flex-grow flex flex-col justify-center items-center gap-6 py-8">

                <motion.a
                  href="/"
                  onClick={handleHomeClick}
                  className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  {'HOME'}
                </motion.a>

                {/* Mobile Services Accordion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="w-full max-w-xs"
                >
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="w-full flex items-center justify-center gap-3 text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest text-center"
                  >
                    {t('nav.services')}
                    <ChevronDown size={20} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-accent-cyan' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 space-y-4 pl-3 border-l border-white/10">
                          {MEGA_MENU.map((col) => (
                            <div key={col.column}>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{col.column}</p>
                              </div>
                              {col.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.label}
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 py-2 group"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent-cyan/30 group-hover:bg-accent-cyan/10 transition-all duration-300">
                                      <Icon size={14} className="text-gray-500 group-hover:text-accent-cyan group-hover:scale-110 transition-all duration-300" />
                                    </div>
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">{item.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.38 }}
                  className="flex flex-col items-center gap-3 w-full max-w-xs"
                >
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] border-b border-white/5 pb-2 w-full text-center">{t('nav.company')}</span>
                  <Link to="/about-us" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest text-center">{t('nav.about')}</Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest text-center">{t('nav.contact')}</Link>
                  <a href="/#faq" onClick={handleSmoothScroll} className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest text-center">{t('nav.faq')}</a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.46 }}
                  className="flex flex-col items-center gap-4"
                >
                  <Link to="/blog" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest text-center">{t('nav.blog')}</Link>
                  <Link to="/brokerage-calculator" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest text-center">{t('nav.calculator')}</Link>
                </motion.div>


              </nav>

              {/* Mobile CTA */}
              <div className="py-8 shrink-0">
                <Button
                  className="bg-white text-black hover:bg-gray-200 group w-full text-lg py-6 rounded-full font-bold uppercase tracking-widest"
                  onClick={handleCTA}
                >
                  {t('nav.getStarted')}
                  <ArrowRight className="ml-2 h-4 w-4 text-black transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;