import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const projects = [{
  id: 1,
  slug: 'social-media-app',
  title: 'MT5 Enterprise Trading Platform',
  description: 'Full white-label MT5 integration for retail and institutional brokers.',
  imgKey: "dark mode trading app on phone"
}, {
  id: 2,
  slug: 'fintech-dashboard',
  title: 'Advanced CRM & Partner Portal',
  description: 'Custom back-office dashboard featuring real-time IB tracking and automated KYC.',
  imgKey: "fintech app on phone next to keyboard"
}, {
  id: 3,
  slug: 'digital-marketing-agency-site',
  title: 'Liquidity Aggregation Bridge',
  description: 'Ultra-low latency price feed aggregation and order routing technology.',
  imgKey: "digital marketing agency website on phone"
}];
const Portfolio = () => {
  const navigate = useNavigate();
  const handleProjectClick = (slug: string) => {
    navigate(`/project/${slug}`);
  };
  return <section id="portfolio" className="py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-end gap-8 mb-20">
          <div className="w-full lg:w-1/2">
            <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs font-bold tracking-widest text-white mb-6 uppercase">
              Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-[800] text-white leading-tight uppercase tracking-[0.15em]">
              <span className="block">Explore our</span>
              <span className="block text-gradient-coral">Technology Solutions</span>
            </h2>
          </div>
          <div className="w-full lg:w-1/3">
            <p className="text-lg text-[#A0A0A0]">
              Discover our suite of premium technology solutions, from robust trading platforms to institutional-grade liquidity and CRM integrations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-[#ffffff15] bg-[#121212]" onClick={() => handleProjectClick('social-media-app')}>
            <img className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" loading="lazy" alt="A dark-themed social media application interface shown on a smartphone" src="/images/dark_social_trading.png" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent"></div>
            
            <div className="absolute inset-4 top-auto rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">MT5 Enterprise Trading Platform</h3>
                </div>
                <div className="bg-white hover:bg-gray-200 p-3 rounded-full transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-[#ffffff15] bg-[#121212]" onClick={() => handleProjectClick('fintech-dashboard')}>
            <img className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" loading="lazy" alt="A fintech application dashboard with payment details, displayed on a smartphone next to a keyboard" src="/images/fintech_dashboard.png" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent"></div>
            
            <div className="absolute inset-4 top-auto rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Advanced CRM & Partner Portal</h3>
                </div>
                <div className="bg-white hover:bg-gray-200 p-3 rounded-full transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-[#ffffff15] bg-[#121212]" onClick={() => handleProjectClick('digital-marketing-agency-site')}>
            <img className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out" loading="lazy" alt="A digital marketing agency website homepage, shown on a smartphone with a sleek, modern design" src="/images/analytics_dashboard.png" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent"></div>
            
            <div className="absolute inset-4 top-auto rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Liquidity Aggregation Bridge</h3>
                </div>
                <div className="bg-white hover:bg-gray-200 p-3 rounded-full transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Portfolio;