import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Globe, ChevronDown, Lock,
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
  { code: 'EN', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'AR', label: 'العربية', flag: '🇦🇪', dir: 'ltr' },
  { code: 'ES', label: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'FR', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ZH', label: '中文', flag: '🇨🇳', dir: 'ltr' },
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
      { icon: Server, label: 'Hosting Server Support', desc: 'optimized latency co-location infrastructure', href: '/services/hosting-server-support' },
      { icon: Zap, label: 'Liquidity Provider', desc: 'Institutional deep order-book connections', href: '/services/liquidity-provider' },
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

// ─── Language Selector ─────────────────────────────────────────────────────────
const LanguageSelector = ({ mobile = false }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(LANGUAGES[0]);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !(ref.current as any).contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (lang: any) => {
    setActive(lang);
    setIsOpen(false);
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.code.toLowerCase();
    i18n.changeLanguage(lang.code.toLowerCase());
    
    // Programmatically trigger Google Translate
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      let targetCode = lang.code.toLowerCase();
      if (lang.code === 'ZH') targetCode = 'zh-CN';
      (selectElement as HTMLSelectElement).value = targetCode;
      selectElement.dispatchEvent(new Event('change'));
    }
  };

  if (mobile) {
    return (
      <div className="w-full">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">{t('nav.language')}</p>
        <div className="grid grid-cols-5 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${active.code === lang.code
                ? 'bg-accent-cyan/20 border border-accent-cyan/50'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${active.code === lang.code ? 'text-accent-cyan' : 'text-gray-400'}`}>
                {lang.code}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all duration-300 text-sm font-semibold uppercase tracking-widest group ${isOpen ? 'bg-accent-cyan/10 border-accent-cyan/40 text-accent-cyan' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white'
          }`}
      >
        <Globe size={14} className={`transition-colors ${isOpen ? 'text-accent-cyan' : 'text-gray-400 group-hover:text-white'}`} />
        <span>{active.code}</span>
        <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-cyan' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-2 w-52 z-50 rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-2 border-b border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold">Select Language</p>
            </div>
            <div className="p-2">
              {LANGUAGES.map((lang, i) => {
                const isActive = active.code === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleSelect(lang)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-accent-cyan/15 text-accent-cyan' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span className="text-xl w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-semibold leading-none ${isActive ? 'text-accent-cyan' : ''}`}>{lang.label}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest">{lang.code}</p>
                    </div>
                    {isActive && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />}
                  </motion.button>
                );
              })}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Mega Menu Component ───────────────────────────────────────────────────────
const MegaMenu = ({ isOpen }: { isOpen: boolean }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-full left-0 mt-8 w-[860px] z-[100] rounded-2xl border border-white/10 bg-[#07090e] shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden"
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
  const [clickCount, setClickCount] = useState(0);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    const href = e.currentTarget.getAttribute('href') || '';
    const [path, id] = href.split('#');
    if (path === '/' && id) {
      navigate(path);
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
      navigate(href);
    }
    if (isOpen) setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;

    if (isMobile) {
      const newCount = clickCount + 1;
      
      if (newCount >= 5) {
        setClickCount(0);
        navigate('/admin');
        if (isOpen) setIsOpen(false);
        return;
      }
      
      setClickCount(newCount);

      if (clickTimeout.current) clearTimeout(clickTimeout.current);
      clickTimeout.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);

      // On mobile, only navigate to home on the first click to allow fast multi-clicking
      if (newCount > 1) {
        return;
      }
    }

    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-full ${isScrolled
            ? 'bg-[#09090b]/90 backdrop-blur-2xl border-b border-white/10 shadow-lg py-3'
            : 'bg-transparent py-5'
            }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex justify-between items-center w-full gap-4">

            {/* Logo */}
            <Link to="/" onClick={handleLogoClick} className="text-lg md:text-xl font-[800] text-white tracking-wide flex items-center shrink-0 gap-3" style={{ touchAction: 'manipulation' }}>
              <img src="/logo.png" alt="BrokerCore Solution" className="h-10 sm:h-12 w-auto bg-white p-1 rounded-xl" width="48" height="48" loading="eager" fetchPriority="high" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white hidden md:block">BROKERCORESOLUTION</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-7 shrink-0 relative">
              <Link to="/" onClick={handleHomeClick} className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-wider text-[13px] xl:text-sm">
                Home
              </Link>
              
              {/* Services with MegaMenu */}
              <div 
                onMouseEnter={handleMegaEnter} 
                onMouseLeave={handleMegaLeave}
                className="py-6 -my-6 flex items-center"
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

              {/* Tools Dropdown */}
              <div className="relative group py-6 -my-6 flex items-center">
                <button className="text-gray-300 hover:text-white transition-colors relative group font-semibold uppercase tracking-wider text-[13px] xl:text-sm flex items-center gap-1">
                  Tools
                  <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute top-[calc(100%-12px)] left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-xl border border-white/10 bg-[#0a0c12]/95 backdrop-blur-2xl shadow-xl overflow-hidden py-2 translate-y-2 group-hover:translate-y-0">
                  <Link to="/brokerage-calculator" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Brokerage Calculator</Link>
                  <Link to="/roi-calculator" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">ROI Calculator</Link>
                </div>
              </div>
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
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-1"
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* ── Mobile Fullscreen Menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] lg:hidden overflow-y-auto pointer-events-auto flex flex-col"
            style={{ background: 'linear-gradient(160deg,#070b12 0%,#0b111f 60%,#060e16 100%)' }}
          >
            {/* ── Rich animated background ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">

              {/* Aurora color sweep */}
              <motion.div
                animate={{ x: ['-30%', '30%', '-30%'], opacity: [0.18, 0.32, 0.18] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-32 left-0 w-full h-80 rounded-full blur-[100px]"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, #00e5ff 0%, #6366f1 50%, transparent 80%)' }}
              />
              <motion.div
                animate={{ x: ['20%', '-20%', '20%'], opacity: [0.12, 0.22, 0.12] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-24 left-0 w-full h-64 rounded-full blur-[90px]"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, #6366f1 0%, #00e5ff 60%, transparent 80%)' }}
              />

              {/* Dot-grid mesh */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #00e5ff 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Scanning beam */}
              <motion.div
                animate={{ y: ['-10%', '110%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                className="absolute left-0 w-full h-px"
                style={{ background: 'linear-gradient(90deg, transparent 0%, #00e5ff44 40%, #00e5ffaa 50%, #00e5ff44 60%, transparent 100%)' }}
              />

              {/* Floating particles */}
              {[
                { w: 3, h: 3, top: '12%', left: '8%',  delay: 0,   dur: 6  },
                { w: 2, h: 2, top: '28%', left: '88%', delay: 1.5, dur: 8  },
                { w: 4, h: 4, top: '55%', left: '15%', delay: 0.8, dur: 7  },
                { w: 2, h: 2, top: '70%', left: '75%', delay: 2.5, dur: 9  },
                { w: 3, h: 3, top: '42%', left: '50%', delay: 1,   dur: 5  },
                { w: 2, h: 2, top: '85%', left: '35%', delay: 3,   dur: 10 },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
                  transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                  className="absolute rounded-full bg-accent-cyan"
                  style={{ width: p.w, height: p.h, top: p.top, left: p.left }}
                />
              ))}

              {/* Pulsing glow orbs */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[18%] right-[-15%] w-64 h-64 rounded-full blur-[70px]"
                style={{ background: '#00e5ff' }}
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.07, 0.16, 0.07] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute bottom-[20%] left-[-18%] w-56 h-56 rounded-full blur-[70px]"
                style={{ background: '#6366f1' }}
              />
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.05, 0.13, 0.05] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                className="absolute top-[55%] right-[10%] w-40 h-40 rounded-full blur-[60px]"
                style={{ background: '#00e5ff' }}
              />

              {/* Rotating orbit rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute top-[30%] right-4 w-44 h-44 rounded-full border border-accent-cyan/[0.08]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-[22%] left-2 w-28 h-28 rounded-full border border-white/[0.05]"
              />
            </div>

            {/* ── Top bar ── */}
            <div className="relative z-10 flex justify-between items-center px-5 py-5 border-b border-white/[0.07] shrink-0">
              <Link to="/" onClick={handleHomeClick} className="flex items-center gap-4 group">

                {/* ── Dynamic Animated Logo Container ── */}
                <motion.div 
                  className="relative shrink-0 w-[62px] h-[62px]"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Rotating Conic Gradient (On-brand colors) */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-[3px] rounded-2xl"
                    style={{
                      background: 'conic-gradient(from 0deg, #00e5ff, transparent, #0f172a, transparent, #00e5ff)',
                    }}
                  />
                  
                  {/* Dark inset for sharp contrast */}
                  <div className="absolute inset-[1px] bg-[#0f172a] rounded-[15px]" />
                  
                  {/* Clean white logo container */}
                  <div className="absolute inset-[3px] z-20 rounded-[13px] bg-white overflow-hidden flex items-center justify-center p-1.5 shadow-[inset_0_0_15px_rgba(0,229,255,0.2)]">
                    {/* Shimmer sweep effect */}
                    <motion.div
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
                      className="absolute inset-0 z-10 w-1/2 skew-x-12"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }}
                    />
                    
                    <img
                      src="/logo.png"
                      alt="BrokerCore"
                      className="w-full h-full object-contain relative z-0"
                      style={{
                        imageRendering: 'crisp-edges',
                        WebkitFontSmoothing: 'antialiased',
                        filter: 'contrast(1.05) saturate(1.1)',
                      }}
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </motion.div>

                {/* ── Brand Name ── */}
                <div className="flex flex-col leading-none">
                  {/* Top label */}
                  <span className="text-[9px] font-black tracking-[0.38em] uppercase text-gray-500 mb-0.5">
                    EST. 2020
                  </span>

                  {/* Main name */}
                  <div className="flex items-baseline gap-[3px]">
                    <span
                      className="text-[22px] font-black tracking-tight leading-none"
                      style={{
                        background: 'linear-gradient(135deg,#ffffff 0%,#cbd5e1 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Broker
                    </span>
                    <span
                      className="text-[22px] font-black tracking-tight leading-none"
                      style={{
                        background: 'linear-gradient(135deg,#00e5ff 0%,#67e8f9 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Core
                    </span>
                  </div>

                  {/* Glowing underline + tagline */}
                  <div className="relative mt-1">
                    <motion.div
                      animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-0.5 left-0 h-px w-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)' }}
                    />
                    <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-gray-500">
                      Solution
                    </span>
                  </div>
                </div>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Nav Items ── */}
            <nav className="relative z-10 flex-1 flex flex-col px-5 pt-6 pb-4 gap-1 overflow-y-auto">

              {/* HOME */}
              <motion.a
                href="/"
                onClick={handleHomeClick}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.08, ease: [0.22,1,0.36,1] }}
                className="group flex items-center justify-between px-4 py-3.5 rounded-2xl text-white font-bold text-[17px] tracking-[0.06em] uppercase hover:bg-white/[0.04] transition-all duration-200"
              >
                Home
                <ArrowUpRight size={15} className="text-gray-600 group-hover:text-accent-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </motion.a>

              {/* SERVICES accordion */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.14, ease: [0.22,1,0.36,1] }}
              >
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-[17px] tracking-[0.06em] uppercase transition-all duration-200 ${
                    mobileServicesOpen
                      ? 'bg-accent-cyan/10 text-accent-cyan'
                      : 'text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Services
                  <motion.div animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={16} className={mobileServicesOpen ? 'text-accent-cyan' : 'text-gray-500'} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 mb-2 mx-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                        {MEGA_MENU.map((col, ci) => (
                          <div key={col.column} className={ci > 0 ? 'border-t border-white/[0.06]' : ''}>
                            {/* Category header */}
                            <div className="flex items-center gap-2 px-4 pt-3 pb-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${col.dot}`} />
                              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-500">{col.column}</p>
                            </div>
                            {/* Items */}
                            <div className="px-2 pb-2 space-y-0.5">
                              {col.items.map((item, ii) => {
                                const Icon = item.icon;
                                return (
                                  <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: ii * 0.04 + ci * 0.06, duration: 0.25 }}
                                  >
                                    <Link
                                      to={item.href}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl group hover:bg-white/[0.05] transition-all duration-200"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-accent-cyan/30 group-hover:bg-accent-cyan/10 transition-all duration-250">
                                        <Icon size={14} className="text-gray-500 group-hover:text-accent-cyan transition-colors duration-200" />
                                      </div>
                                      <span className="text-[14px] font-semibold text-gray-300 group-hover:text-white transition-colors duration-200 leading-tight">{item.label}</span>
                                      <ArrowUpRight size={12} className="ml-auto text-gray-700 opacity-0 group-hover:opacity-100 group-hover:text-accent-cyan transition-all duration-200" />
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Divider */}
              <div className="my-1 h-px bg-white/[0.06] mx-4" />

              {/* COMPANY SECTION LABEL */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                className="px-4 pt-1 pb-0.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gray-600"
              >
                {t('nav.company')}
              </motion.p>

              {[
                { label: t('nav.about'), to: '/about-us', delay: 0.32 },
                { label: t('nav.contact'), to: '/contact', delay: 0.36 },
              ].map(({ label, to, delay }) => (
                <motion.div key={label} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay, ease: [0.22,1,0.36,1] }}>
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between px-4 py-3.5 rounded-2xl text-white font-bold text-[17px] tracking-[0.06em] uppercase hover:bg-white/[0.04] transition-all duration-200"
                  >
                    {label}
                    <ArrowUpRight size={15} className="text-gray-600 group-hover:text-accent-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="my-1 h-px bg-white/[0.06] mx-4" />

              {[
                { label: t('nav.faq'), href: '/#faq', isAnchor: true, delay: 0.40 },
                { label: t('nav.blog'), to: '/blog', delay: 0.44 },
                { label: t('nav.calculator'), to: '/brokerage-calculator', delay: 0.48 },
                { label: 'ROI Calculator', to: '/roi-calculator', delay: 0.50 },
              ].map(({ label, to, href, isAnchor, delay }) => (
                <motion.div key={label} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay, ease: [0.22,1,0.36,1] }}>
                  {isAnchor ? (
                    <a
                      href={href}
                      onClick={handleSmoothScroll}
                      className="group flex items-center justify-between px-4 py-3.5 rounded-2xl text-white font-bold text-[17px] tracking-[0.06em] uppercase hover:bg-white/[0.04] transition-all duration-200"
                    >
                      {label}
                      <ArrowUpRight size={15} className="text-gray-600 group-hover:text-accent-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </a>
                  ) : (
                    <Link
                      to={to || ''}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between px-4 py-3.5 rounded-2xl text-white font-bold text-[17px] tracking-[0.06em] uppercase hover:bg-white/[0.04] transition-all duration-200"
                    >
                      {label}
                      <ArrowUpRight size={15} className="text-gray-600 group-hover:text-accent-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </Link>
                  )}
                </motion.div>
              ))}
              {/* ADMIN PANEL (Mobile Only) */}
              <div className="my-1 h-px bg-white/[0.06] mx-4" />
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.51, ease: [0.22,1,0.36,1] }}>
                <Link
                  to="/admin"
                  state={{ secretAccess: true }}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between px-4 py-3.5 rounded-2xl text-accent-cyan font-bold text-[17px] tracking-[0.06em] uppercase hover:bg-white/[0.04] transition-all duration-200"
                >
                  Admin Panel
                  <Lock size={15} className="text-accent-cyan opacity-80 group-hover:opacity-100 transition-all duration-200" />
                </Link>
              </motion.div>
            </nav>

            {/* ── Bottom CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.52 }}
              className="relative z-10 px-5 py-5 border-t border-white/[0.06] shrink-0"
            >
              <button
                onClick={handleCTA}
                className="relative w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-extrabold text-[15px] tracking-[0.08em] uppercase overflow-hidden group"
                style={{ background: 'linear-gradient(135deg,#00e5ff 0%,#006e7f 100%)' }}
              >
                {/* Shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative text-[#05111a]">{t('nav.getStarted')}</span>
                <ArrowRight size={16} className="relative text-[#05111a] group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;