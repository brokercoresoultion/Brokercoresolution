import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { LogOut, Activity, FileText, Settings, User as UserIcon, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/client/login');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('clientAuth');
    navigate('/client/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#0a0a0a] border-r border-[#262626] flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
              <Activity className="text-accent-cyan" size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">Client<span className="text-accent-cyan">Portal</span></span>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-medium">
              <Activity size={18} /> Overview
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <FileText size={18} /> Invoices & Quotes
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <UserIcon size={18} /> Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <Settings size={18} /> Settings
            </button>
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-[#262626]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-20 border-b border-[#262626] bg-[#0a0a0a]/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-bold">Welcome back, {user?.email?.split('@')[0] || 'Client'}</h2>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors relative">
              <Bell size={18} className="text-gray-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-cyan rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-accent-cyan/20 border border-accent-cyan flex items-center justify-center">
              <UserIcon size={18} className="text-accent-cyan" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/10 rounded-full blur-2xl group-hover:bg-accent-cyan/20 transition-all duration-500" />
              <h3 className="text-gray-400 font-medium mb-1 relative z-10">Active Projects</h3>
              <p className="text-4xl font-bold text-white relative z-10">1</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
              <h3 className="text-gray-400 font-medium mb-1 relative z-10">Unpaid Invoices</h3>
              <p className="text-4xl font-bold text-white relative z-10">$0.00</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
              <h3 className="text-gray-400 font-medium mb-1 relative z-10">Open Tickets</h3>
              <p className="text-4xl font-bold text-white relative z-10">0</p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
            <div className="text-center py-12 border border-dashed border-[#262626] rounded-xl">
              <Activity className="mx-auto text-gray-500 mb-4" size={32} />
              <p className="text-gray-400">No recent activity to display.</p>
              <button className="mt-4 px-6 py-2 bg-accent-cyan text-black font-bold rounded-lg hover:bg-[#00cce6] transition-colors">
                View Saved Quotes
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
