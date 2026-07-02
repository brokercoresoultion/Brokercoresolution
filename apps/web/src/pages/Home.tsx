import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '@/components/Hero';
import FeaturesTab from '@/components/FeaturesTab';
import Features from '@/components/Features';
import ForexBrokerRoadmap from '@/components/ForexBrokerRoadmap';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import CTA from '@/components/CTA';
import SectionAnimator from '@/components/SectionAnimator';
import SEOHead from '@/components/SEOHead';

const Home = () => {
  const { openDemoModal } = useOutletContext();

  return (
    <div className="w-full">
      <SEOHead 
        title="BrokerCore IT Solutions | Premium Forex Brokerage Setup"
        description="Start your Forex brokerage today with our Turnkey solutions, CRM, and MT4/MT5 integrations."
      />

      <Hero openDemoModal={openDemoModal} />
      <SectionAnimator><FeaturesTab /></SectionAnimator>
      <SectionAnimator><Features /></SectionAnimator>
      <ForexBrokerRoadmap />
      <SectionAnimator><Testimonials /></SectionAnimator>
      <SectionAnimator><Partners /></SectionAnimator>
      <SectionAnimator><CTA /></SectionAnimator>
    </div>
  );
};

export default Home;