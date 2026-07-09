import React, { Suspense } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '@/components/Hero';
import SectionAnimator from '@/components/SectionAnimator';
import SEOHead from '@/components/SEOHead';

// Lazy load below-the-fold heavy components
const ForexTurnkeyUI = React.lazy(() => import('@/components/ForexTurnkeyUI'));
const FeaturesTab = React.lazy(() => import('@/components/FeaturesTab'));
const Features = React.lazy(() => import('@/components/Features'));
const ForexBrokerRoadmap = React.lazy(() => import('@/components/ForexBrokerRoadmap'));
const Testimonials = React.lazy(() => import('@/components/Testimonials'));
const Partners = React.lazy(() => import('@/components/Partners'));
const CTA = React.lazy(() => import('@/components/CTA'));


const Home = () => {
  const { openDemoModal } = useOutletContext<{ openDemoModal: () => void }>();

  return (
    <div className="w-full">
      <SEOHead 
        title="BrokerCoreSolution | Premier Forex Turnkey & White Label Provider"
        description="Launch and scale your Forex brokerage with our complete White Label & Turnkey Solution. MT4/MT5, CRM, Liquidity, Payment Gateway, KYC, Back Office & 24/7 Expert Support."
        keywords="Forex Broker Turnkey, MT5 White Label, Forex CRM, Forex Liquidity, Broker Setup, Start a Forex Broker"
      />

      <Hero openDemoModal={openDemoModal} />
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin"></div></div>}>
        <ForexTurnkeyUI />
        <SectionAnimator><FeaturesTab /></SectionAnimator>
        <SectionAnimator><Features /></SectionAnimator>
        <ForexBrokerRoadmap />
        <SectionAnimator><Testimonials /></SectionAnimator>
        <SectionAnimator><Partners /></SectionAnimator>
        <SectionAnimator><CTA /></SectionAnimator>
      </Suspense>
    </div>
  );
};

export default Home;