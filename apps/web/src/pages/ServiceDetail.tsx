import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  ArrowLeft, ArrowRight, CheckCircle2, ChevronRight,
  Zap, BarChart3, Shield, Globe, TrendingUp,
} from 'lucide-react';
import { SERVICES_DATA, SERVICES_LIST } from '@/data/servicesData';

// ── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

// ── Accent colour maps ──────────────────────────────────────────────────────
const ACCENT = {
  cyan: {
    glow:   'from-accent-cyan/20 via-accent-cyan/5 to-transparent',
    border: 'border-accent-cyan/30',
    text:   'text-accent-cyan',
    badge:  'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    dot:    'bg-accent-cyan',
    metric: 'from-accent-cyan to-white',
    tag:    'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan',
  },
  purple: {
    glow:   'from-accent-cyan/20 via-accent-cyan/5 to-transparent',
    border: 'border-accent-cyan/30',
    text:   'text-accent-cyan',
    badge:  'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    dot:    'bg-accent-cyan',
    metric: 'from-accent-cyan to-white',
    tag:    'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan',
  },
};

// ── Sub-components ──────────────────────────────────────────────────────────
const OverviewParagraph = ({ text, index }) => (
  <motion.p
    custom={index}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    className="text-gray-300 leading-8 text-[15px] md:text-base"
  >
    {text}
  </motion.p>
);

const SpecItem = ({ text, index, accent }) => (
  <motion.li
    custom={index}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-30px' }}
    className={`flex items-start gap-3 p-4 rounded-xl border bg-white/3 ${ACCENT[accent].border} hover:bg-white/6 transition-colors duration-200`}
  >
    <CheckCircle2 size={16} className={`${ACCENT[accent].text} mt-0.5 shrink-0`} />
    <span className="text-gray-300 text-sm leading-relaxed">{text}</span>
  </motion.li>
);

// ── Main Page ────────────────────────────────────────────────────────────────
const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = SERVICES_DATA[serviceId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-400 mb-8">The service module you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-cyan text-black font-semibold text-sm hover:bg-accent-cyan/90 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const a = ACCENT[service.accent] || ACCENT.cyan;

  // Prev / Next services for navigation
  const allIds = SERVICES_LIST.map((s) => s.id);
  const currentIdx = allIds.indexOf(serviceId);
  const prevService = currentIdx > 0 ? SERVICES_LIST[currentIdx - 1] : null;
  const nextService = currentIdx < allIds.length - 1 ? SERVICES_LIST[currentIdx + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen text-white overflow-x-hidden"
    >
      <Helmet>
        <title>{service.title} — BROKERCORESOLUTION Institutional Solutions</title>
        <meta
          name="description"
          content={`${service.subtitle} — ${service.overview[0].slice(0, 155)}...`}
        />
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background radial glow */}
        <div
          className={`absolute inset-0 bg-gradient-radial ${a.glow} pointer-events-none`}
          style={{ backgroundPosition: '60% 40%' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            className="flex items-center gap-2 text-xs text-gray-500 mb-8 uppercase tracking-widest font-semibold"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/#services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className={a.text}>{service.title}</span>
          </motion.div>

          <div className="max-w-5xl">
            {/* Module tag */}
            <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border ${a.tag} mb-6`}>
                <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
                {service.heroTag}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp} custom={2} initial="hidden" animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-4 tracking-tight"
            >
              {service.title}
            </motion.h1>

            <motion.p
              variants={fadeUp} custom={3} initial="hidden" animate="visible"
              className="text-lg text-gray-400 font-medium mb-10"
            >
              {service.subtitle}
            </motion.p>

            {/* Core Metric */}
            <motion.div
              variants={fadeUp} custom={4} initial="hidden" animate="visible"
              className={`inline-flex flex-col gap-0.5 px-6 py-4 rounded-2xl border ${a.border} bg-white/5 backdrop-blur-sm`}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                {service.metric.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-black bg-gradient-to-r ${a.metric} bg-clip-text text-transparent`}>
                  {service.metric.value}
                </span>
                <span className="text-sm text-gray-400 font-semibold">{service.metric.unit}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ────────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-10"
            >
              <div className={`w-8 h-px bg-accent-cyan`} />
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                Deep Technical Overview
              </span>
            </motion.div>

            <div className="grid md:grid-cols-[1fr_400px] gap-12 items-start">
              {/* Paragraphs */}
              <div className="space-y-6">
                {service.overview.map((para, i) => (
                  <OverviewParagraph key={i} text={para} index={i} />
                ))}
              </div>

              {/* Sidebar stat cards */}
              <div className="space-y-4">
                {[
                  { icon: Zap,         label: 'Execution',    value: 'Sub-millisecond infrastructure' },
                  { icon: Shield,      label: 'Compliance',   value: 'Multi-jurisdiction regulatory' },
                  { icon: BarChart3,   label: 'Scalability',  value: 'Enterprise-grade capacity' },
                  { icon: Globe,       label: 'Coverage',     value: 'Global operational reach' },
                  { icon: TrendingUp,  label: 'ROI Focus',    value: 'Measurable broker P&L uplift' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${a.border} bg-white/3 hover:bg-white/6 transition-colors`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-accent-cyan/10`}>
                        <Icon size={16} className={a.text} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{item.label}</p>
                        <p className="text-sm text-white font-medium">{item.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECS ───────────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,215,0,0.04) 0%, transparent 70%)'
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className={`w-8 h-px bg-accent-cyan`} />
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                Feature & Technology Specifications
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-12"
            >
              Complete Technical{' '}
              <span className={`bg-gradient-to-r ${a.metric} bg-clip-text text-transparent`}>
                Capability Stack
              </span>
            </motion.h2>

            <ul className="grid md:grid-cols-2 gap-3">
              {service.specs.map((spec, i) => (
                <SpecItem key={i} text={spec} index={i} accent={service.accent} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── BUSINESS VALUE ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className={`w-8 h-px bg-accent-cyan`} />
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                Strategic Business Value
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              className={`relative p-8 md:p-12 rounded-3xl border ${a.border} bg-white/3 overflow-hidden`}
            >
              {/* Corner accent */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-20 pointer-events-none`}
                style={{
                  background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)'
                }}
              />
              <p className="text-gray-200 leading-8 text-base md:text-lg font-light relative z-10">
                {service.businessValue}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp} custom={0} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Deploy{' '}
              <span className={`bg-gradient-to-r ${a.metric} bg-clip-text text-transparent`}>
                {service.title}?
              </span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Speak with a BROKERCORESOLUTION institutional solutions architect. No generic pitch decks —
              a structured technical consultation mapped to your brokerage's specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 bg-accent-cyan text-black hover:bg-accent-cyan/90`}
              >
                Request a Consultation <ArrowRight size={16} />
              </Link>
              <Link
                to="/brokerage-calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
              >
                Cost Estimator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PREV / NEXT NAVIGATION ──────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-white/5 mb-12" />
            <div className="flex items-stretch justify-between gap-4">
              {prevService ? (
                <Link
                  to={`/services/${prevService.id}`}
                  className="flex-1 group flex items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all duration-200"
                >
                  <ArrowLeft size={18} className="text-gray-500 group-hover:text-white transition-colors shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Previous</p>
                    <p className="text-sm font-semibold text-white">{prevService.title}</p>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              {nextService ? (
                <Link
                  to={`/services/${nextService.id}`}
                  className="flex-1 group flex items-center justify-end gap-4 p-6 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all duration-200 text-right"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Next</p>
                    <p className="text-sm font-semibold text-white">{nextService.title}</p>
                  </div>
                  <ArrowRight size={18} className="text-gray-500 group-hover:text-white transition-colors shrink-0" />
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServiceDetail;
