import React, { Suspense, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Canvas } from '@react-three/fiber';
import DemoModal from '@/components/DemoModal';
import MarketTicker from '@/components/MarketTicker';
import { Helmet } from 'react-helmet-async';

const Global3DScene = React.lazy(() => import('@/components/Global3DScene'));

const Layout = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkDevice();
    setMounted(true);
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
      </Helmet>
      <div className="home-scroll-container min-h-screen bg-[#0B0B0B] text-white overflow-x-hidden flex flex-col relative">
        <div className="fixed inset-0 z-0 pointer-events-none">
          {(!mounted) ? (
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] bg-cyan-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-[-10%] right-[-20%] w-[70%] h-[70%] bg-white/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            </div>
          ) : (
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <Suspense fallback={null}>
                <Global3DScene />
              </Suspense>
            </Canvas>
          )}
        </div>
        
        <div className="relative z-10 w-full flex flex-col min-h-screen">
          <Header openDemoModal={() => setIsDemoModalOpen(true)} />
          <main className="flex-grow">
            <Outlet context={{ openDemoModal: () => setIsDemoModalOpen(true) }} />
          </main>
          <Footer />
          <Toaster />
          <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default Layout;