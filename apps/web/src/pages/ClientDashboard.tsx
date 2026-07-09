import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Settings, User, Bell, ChevronRight, Activity, Wallet, ShieldAlert } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { motion } from 'framer-motion';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/client-portal');
        return;
      }
      setUser(session.user);
    };
    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/client-portal');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex pt-20">
      <SEOHead title="Client Dashboard | BrokerCore" />
      
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-[#070b14] hidden md:flex flex-col">
        <div className="p-6">
          <div className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-6">Main Menu</div>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'overview' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <LayoutDashboard size={18} />
              Overview
            </button>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
              <Wallet size={18} />
              Accounts
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
              <Activity size={18} />
              Trading Stats
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
              <ShieldAlert size={18} />
              Risk Management
            </a>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/10">
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === 'profile' ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <User size={18} />
              My Profile
            </button>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium">
              <Settings size={18} />
              Settings
            </a>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors font-medium">
              <LogOut size={18} />
              Sign Out
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-white/[0.02]">
          <h1 className="text-xl font-bold tracking-tight">Dashboard Overview</h1>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-cyan rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="w-10 h-10 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan font-bold border border-accent-cyan/30">
                {user.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-semibold text-gray-200 truncate max-w-[150px]">{user.user_metadata?.full_name || user.email}</p>
                <p className="text-gray-500 text-xs">{user.user_metadata?.company || 'Partner Account'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 max-w-6xl mx-auto">
          {activeTab === 'overview' && (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <h2 className="text-3xl font-black mb-2">Welcome Back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ', Partner'}!</h2>
                <p className="text-gray-400">Here is a high-level overview of your brokerage infrastructure.</p>
              </motion.div>

              {/* Under Construction Banner */}
              <div className="bg-gradient-to-r from-accent-cyan/10 to-transparent border border-accent-cyan/20 rounded-2xl p-6 md:p-8 relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 p-32 bg-accent-cyan/5 blur-[100px] rounded-full pointer-events-none" />
                <h3 className="text-xl font-bold text-accent-cyan mb-2">Modules Coming Soon</h3>
                <p className="text-gray-300 max-w-2xl leading-relaxed text-sm">
                  We are currently integrating live data feeds from your MT5/cTrader servers. The advanced CRM, IB Commission tracking, and real-time risk management modules will be available here shortly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat Card 1 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Active Accounts</div>
                  <div className="text-3xl font-black text-white blur-[4px] select-none hover:blur-none transition-all cursor-not-allowed">
                    1,204
                  </div>
                  <div className="text-xs text-accent-cyan mt-2 flex items-center gap-1">
                    <ChevronRight size={14} /> Syncing Data...
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Daily Volume (Lots)</div>
                  <div className="text-3xl font-black text-white blur-[4px] select-none hover:blur-none transition-all cursor-not-allowed">
                    5,430
                  </div>
                  <div className="text-xs text-accent-cyan mt-2 flex items-center gap-1">
                    <ChevronRight size={14} /> Syncing Data...
                  </div>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">System Status</div>
                  <div className="text-3xl font-black text-emerald-400 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    All servers operational
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'profile' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-black mb-8">My Profile</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl">
                <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-cyan/40 to-accent-cyan/10 flex items-center justify-center text-4xl text-accent-cyan font-bold border-2 border-accent-cyan/30">
                    {user.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{user.user_metadata?.full_name || 'Partner Account'}</h3>
                    <p className="text-gray-400 mt-1">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Full Name</label>
                    <p className="text-lg font-medium text-white bg-black/30 border border-white/5 rounded-xl px-4 py-3">
                      {user.user_metadata?.full_name || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Company Name</label>
                    <p className="text-lg font-medium text-white bg-black/30 border border-white/5 rounded-xl px-4 py-3">
                      {user.user_metadata?.company || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Registered Email</label>
                    <p className="text-lg font-medium text-white bg-black/30 border border-white/5 rounded-xl px-4 py-3">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
