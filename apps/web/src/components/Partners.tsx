import React from 'react';
import { motion } from 'framer-motion';

// ─── Partner Logo Data ─────────────────────────────────────────────────────────
// Each partner has: name, category, and an SVG logo rendered inline for
// pixel-perfect monochrome → color transitions with no external image deps.
const PARTNERS = [
  {
    name: 'MetaQuotes',
    category: 'Platform',
    color: '#00AEEF',
    logo: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">MetaQuotes</text>
      </svg>
    ),
  },
  {
    name: 'Match-Prime',
    category: 'Liquidity',
    color: '#FF6B2B',
    logo: (
      <svg viewBox="0 0 110 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">Match-Prime</text>
      </svg>
    ),
  },
  {
    name: 'Centroid',
    category: 'Risk',
    color: '#7C3AED',
    logo: (
      <svg viewBox="0 0 90 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">Centroid</text>
      </svg>
    ),
  },
  {
    name: 'Tools for Brokers',
    category: 'Plugins',
    color: '#10B981',
    logo: (
      <svg viewBox="0 0 170 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">Tools for Brokers</text>
      </svg>
    ),
  },
  {
    name: 'Techysquad',
    category: 'CRM',
    color: '#F59E0B',
    logo: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">Techysquad</text>
      </svg>
    ),
  },
  {
    name: 'Acuity Trading',
    category: 'Analytics',
    color: '#3B82F6',
    logo: (
      <svg viewBox="0 0 155 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">Acuity Trading</text>
      </svg>
    ),
  },
  {
    name: 'B2Broker',
    category: 'Liquidity',
    color: '#EF4444',
    logo: (
      <svg viewBox="0 0 90 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">B2Broker</text>
      </svg>
    ),
  },
  {
    name: 'oneZero',
    category: 'Bridge',
    color: '#06B6D4',
    logo: (
      <svg viewBox="0 0 80 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">oneZero</text>
      </svg>
    ),
  },
  {
    name: 'Fintechee',
    category: 'Platform',
    color: '#8B5CF6',
    logo: (
      <svg viewBox="0 0 100 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">Fintechee</text>
      </svg>
    ),
  },
  {
    name: 'SumSub',
    category: 'KYC / AML',
    color: '#F97316',
    logo: (
      <svg viewBox="0 0 80 32" fill="currentColor" className="h-7 w-auto">
        <text x="0" y="24" fontSize="22" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">SumSub</text>
      </svg>
    ),
  },
];

// ─── Single Partner Card ───────────────────────────────────────────────────────
const PartnerCard = ({ partner }) => (
  <div className="group relative flex items-center gap-3 px-7 py-4 mx-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14] transition-all duration-400 cursor-default shrink-0 select-none">
    {/* Subtle glow on hover */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
      style={{ boxShadow: `0 0 20px ${partner.color}18` }}
    />

    {/* Logo — monochrome by default, brand color on hover */}
    <div
      className="text-white/30 group-hover:text-inherit transition-colors duration-400"
      style={{ '--tw-text-opacity': 1, color: 'inherit' }}
    >
      <span
        className="block transition-all duration-400"
        style={{ color: 'rgba(255,255,255,0.30)' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = partner.color; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.30)'; }}
      >
        {partner.logo}
      </span>
    </div>

    {/* Category pill */}
    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 group-hover:text-gray-400 transition-colors duration-300 ml-1 shrink-0">
      {partner.category}
    </span>
  </div>
);

// ─── Marquee Track ─────────────────────────────────────────────────────────────
// Duplicate the list to create a seamless infinite loop
const MarqueeRow = ({ items, direction = 'left', duration = 38 }) => {
  const doubled = [...items, ...items];
  const dirClass = direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left';

  return (
    <div className="relative overflow-hidden group/track">
      {/* Left + Right fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-transparent to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-transparent to-transparent" />

      <div
        className={`flex ${dirClass} group-hover/track:[animation-play-state:paused]`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {doubled.map((partner, i) => (
          <PartnerCard key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
};

// ─── Partners Section ──────────────────────────────────────────────────────────
const Partners = () => {
  const row1 = PARTNERS.slice(0, 5);
  const row2 = PARTNERS.slice(5);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-accent-cyan/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 px-6"
        >
          <p className="section-label mb-4">Ecosystem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Integrated with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">
              Industry Leaders
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Seamlessly connected with tier-1 technology providers,<br className="hidden md:block" />
            liquidity sources, and compliance infrastructure.
          </p>
        </motion.div>

        {/* Row 1 — scrolls left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <MarqueeRow items={row1} direction="left" duration={34} />
        </motion.div>

        {/* Row 2 — scrolls right (opposite direction) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <MarqueeRow items={row2} direction="right" duration={28} />
        </motion.div>

        {/* Trust footer note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 px-6"
        >
          <p className="text-[11px] text-gray-600 uppercase tracking-[0.25em] font-semibold">
            40+ Active Integrations · Enterprise SLA · 24/7 Technical Support
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Partners;
