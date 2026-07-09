import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import WhatsAppButton from '@/components/WhatsAppButton';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { ReactLenis } from 'lenis/react';
import ProtectedRoute from '@/components/ProtectedRoute';

// Static imports for core pages
import Home from '@/pages/Home';

// Lazy loading for secondary/heavy pages
const Contact = React.lazy(() => import('@/pages/Contact'));
const BrokerSetupCalculator = React.lazy(() => import('@/pages/BrokerSetupCalculator'));
const AboutUs = React.lazy(() => import('@/pages/AboutUs'));
const ServiceDetail = React.lazy(() => import('@/pages/ServiceDetail'));

const Project = React.lazy(() => import('@/pages/Project'));
const Blog = React.lazy(() => import('@/pages/Blog'));
const BlogPost = React.lazy(() => import('@/pages/BlogPost'));
const PrivacyPolicy = React.lazy(() => import('@/pages/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('@/pages/TermsAndConditions'));
const RefundPolicy = React.lazy(() => import('@/pages/RefundPolicy'));
const AMLPolicy = React.lazy(() => import('@/pages/AMLPolicy'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const ROICalculator = React.lazy(() => import('@/pages/ROICalculator'));
const AdminLogin = React.lazy(() => import('@/pages/Admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('@/pages/Admin/AdminDashboard'));

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[10000] bg-[#020617] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 rounded-full animate-pulse" />
          <img src="/logo.png" alt="BrokerCore" className="relative w-24 h-24 bg-white p-2 rounded-2xl shadow-2xl shadow-cyan-500/20" />
        </div>
        <div className="text-3xl font-black tracking-widest text-white mb-2 uppercase">
          BrokerCore
        </div>
        <div className="text-cyan-400 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
          Enterprise Solutions
        </div>
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function MaintenanceMode() {
  return (
    <div className="min-h-screen bg-[#020617] relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Premium Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.15)]">
            <div className="w-12 h-12 border-[3px] border-accent-cyan border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 border border-accent-cyan/30 rounded-full animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold uppercase tracking-widest text-accent-cyan mb-6">
            <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></div>
            System Upgrade
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Elevating Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white italic font-light">Experience</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto font-light leading-relaxed">
            We're deploying enterprise-grade enhancements to our infrastructure. BrokerCore will be back online shortly with unprecedented performance.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 text-sm text-gray-600 font-medium tracking-widest uppercase"
        >
          Expected downtime: <span className="text-accent-cyan">Under 15 Minutes</span>
        </motion.div>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Secret Admin Login Shortcut (Type 'brokercore' or Ctrl+Shift+A)
  useEffect(() => {
    let keyBuffer = '';
    const secretWord = 'brokercore';

    const handleKeyDown = (e: KeyboardEvent) => {
      // If already on admin page, ignore the hotkey
      if (window.location.pathname.startsWith('/admin')) {
        return;
      }
      
      // Shortcut 1: Ctrl + Shift + A
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/admin', { state: { secretAccess: true } });
        return;
      }

      // Shortcut 2: Type 'admin'
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        keyBuffer += e.key.toLowerCase();
        if (keyBuffer.length > secretWord.length) {
          keyBuffer = keyBuffer.slice(-secretWord.length);
        }
        if (keyBuffer === secretWord) {
          navigate('/admin', { state: { secretAccess: true } });
          keyBuffer = '';
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  useEffect(() => {
    // Hide splash screen after 0.5 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 500);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    // Check maintenance mode, but allow access to admin paths
    const checkMaintenance = async () => {
      try {
        const { data } = await supabase.from('settings').select('value').eq('key', 'maintenance_mode').single();
        if (data && data.value === 'Enable' && !location.pathname.startsWith('/admin')) {
          setIsMaintenance(true);
        } else {
          setIsMaintenance(false);
        }
      } catch (err) {
        console.error('Error fetching maintenance mode:', err);
      }
    };
    checkMaintenance();
  }, [location.pathname]);

  if (isMaintenance) {
    return <MaintenanceMode />;
  }

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            {/* Admin Routes (Without Main Layout) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Public Routes (With Main Layout) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="calculator" element={<BrokerSetupCalculator />} />
              <Route path="brokerage-calculator" element={<BrokerSetupCalculator />} />
              <Route path="broker-setup-calculator" element={<BrokerSetupCalculator />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="project/:projectId" element={<Project />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="refund-policy" element={<RefundPolicy />} />
              <Route path="aml-policy" element={<AMLPolicy />} />
              <Route path="services/:serviceId" element={<ServiceDetail />} />
              <Route path="roi-calculator" element={<ROICalculator />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
      {!isAdminRoute && <WhatsAppButton />}
      <Analytics />
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          duration: 4000,
          style: {
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(6, 182, 212, 0.1)',
            borderRadius: '16px',
            padding: '16px 24px',
            fontSize: '15px',
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: '#06b6d4',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          }
        }} 
      />
    </ReactLenis>
  );
}

export default App;