// @ts-nocheck
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import Admin3DBackground from '@/components/Admin3DBackground';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Settings, Mail, Activity, ArrowUpRight, BarChart as BarChartIcon, FileText, Eye, EyeOff, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { apiClient } from '@/lib/apiClient';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [editingSubscriber, setEditingSubscriber] = useState<any>(null);
  const [maintenanceMode, setMaintenanceMode] = useState('Disable');
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('adminBlogs');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [blogForm, setBlogForm] = useState({ title: '', content: '', coverImage: '', authorName: '', category: '', tags: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', onConfirm: null });
  const [logs, setLogs] = useState<any[]>([]);

  const logAction = async (action: string, details: string) => {
    try {
      const adminAuth = localStorage.getItem('adminAuth');
      if (!adminAuth) return;
      const admin = JSON.parse(adminAuth);
      
      await supabase.from('admin_logs').insert({
        admin_id: admin.id,
        admin_name: admin.name,
        action,
        details
      });
      
      const { data } = await supabase.from('admin_logs').select('*').order('created_at', { ascending: false }).limit(100);
      if (data) setLogs(data);
    } catch (e) {
      console.error('Failed to log action', e);
    }
  };

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/admin');
          return;
        }

        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth) {
          setCurrentAdmin(JSON.parse(adminAuth));
        } else {
          navigate('/admin');
          return;
        }

        const { data: admins } = await supabase.from('admins').select('*');
        if (admins) {
          setAdminUsers(admins);
          if (adminAuth) {
            const parsedAuth = JSON.parse(adminAuth);
            const freshMe = admins.find((a: any) => a.id === parsedAuth.id || a._id === parsedAuth.id);
            if (freshMe) {
              const updatedAuth = {
                ...parsedAuth,
                permissions: freshMe.permissions || {},
                is_master: freshMe.is_master || false
              };
              setCurrentAdmin(updatedAuth);
              localStorage.setItem('adminAuth', JSON.stringify(updatedAuth));
            }
          }
        }

        // Fetch Leads from Supabase
        const { data: dbLeads, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!leadsError && dbLeads) {
          setLeads(dbLeads);
        } else {
          setLeads([]);
        }
        
        // Fetch Subscribers from Supabase
        const { data: dbSubscribers, error: subsError } = await supabase
          .from('subscribers')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!subsError && dbSubscribers) {
          setSubscribers(dbSubscribers);
        } else {
          setSubscribers([]);
        }
        
        // Fetch Blogs from Supabase
        const { data: dbBlogs, error: blogsError } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!blogsError && dbBlogs) {
          setBlogs(dbBlogs);
        } else {
          setBlogs([]);
        }

        // Fetch settings
        const { data: settingsData } = await supabase.from('settings').select('*').eq('key', 'maintenance_mode').single();
        if (settingsData) {
          setMaintenanceMode(settingsData.value);
        }

        // Fetch logs
        const { data: dbLogs } = await supabase.from('admin_logs').select('*').order('created_at', { ascending: false }).limit(100);
        if (dbLogs) setLogs(dbLogs);

      } catch (err) {
        console.error("Dashboard initialization error:", err);
        navigate('/admin');
      }
    };

    initDashboard();
  }, [navigate]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        try {
          supabase.auth.signOut();
          localStorage.removeItem('adminAuth');
          toast.error('Session expired due to inactivity');
          navigate('/admin');
        } catch (e) {}
      }, 15 * 60 * 1000); // 15 minutes
    };
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(e => document.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(e => document.removeEventListener(e, resetTimer));
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('adminAuth');
    } catch (e) {}
    navigate('/admin');
  };

  const handleStatusChange = async (leadId: any, newStatus: any) => {
    const updatedLeads = leads.map((lead: any) => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    
    try {
      await supabase.from('leads').update({ status: newStatus }).eq('id', leadId);
      toast.success('Status updated');
      await logAction('Updated Lead Status', `Lead ID: ${leadId}, New Status: ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleSaveSettings = async () => {
    try {
      await supabase.from('settings').upsert({ key: 'maintenance_mode', value: maintenanceMode });
      toast.success('Settings saved successfully!');
      await logAction('Updated Settings', `Maintenance Mode: ${maintenanceMode}`);
    } catch (err) {
      toast.error('Failed to save settings');
    }
  };

  const getStatusColor = (status: any) => {
    switch(status) {
      case 'New': return 'bg-gray-300/10 text-blue-400 border-gray-300/20';
      case 'Connected': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'In Progress': return 'bg-white/10 text-white border-white/20';
      case 'Closed (Won)': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Closed (Lost)': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const [editingLead, setEditingLead] = useState<any>(null);

  // Missing state and handler stubs to satisfy IDE and prevent runtime reference errors
  const [viewingQuote, setViewingQuote] = useState<any>(null);
  const [adminForm, setAdminForm] = useState<any>({});
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState<any>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showLeadsList, setShowLeadsList] = useState(false);
  const [showEmailsList, setShowEmailsList] = useState(false);

  const exportLeadsToCSV = () => {
    if (!leads || leads.length === 0) return;
    
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Interest', 'Status', 'Message'];
    const csvRows = [headers.join(',')];
    
    leads.forEach((lead: any) => {
      const values = [
        `"${(lead.created_at || '').replace(/"/g, '""')}"`,
        `"${(lead.name || '').replace(/"/g, '""')}"`,
        `"${(lead.email || '').replace(/"/g, '""')}"`,
        `"${(lead.phone || '').replace(/"/g, '""')}"`,
        `"${(lead.interest || '').replace(/"/g, '""')}"`,
        `"${(lead.status || '').replace(/"/g, '""')}"`,
        `"${(lead.message || '').replace(/"/g, '""')}"`,
      ];
      csvRows.push(values.join(','));
    });
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `broker-core-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleEditChange = (field: any, value: any) => {
    setEditingLead((prev: any) => ({ ...prev, [field]: value }));
  };

  const deleteLead = async (eOrId?: any) => {
    let targetId;
    if (eOrId && typeof eOrId !== 'object') {
      targetId = eOrId;
    } else {
      targetId = editingLead?.id;
    }
    if (!targetId) return;
    
    setConfirmDialog({
      isOpen: true,
      message: "Are you sure you want to delete this lead?",
      onConfirm: async () => {
        try {
          await supabase.from('leads').delete().eq('id', targetId);
          const updatedLeads = leads.filter((lead: any) => String(lead.id) !== String(targetId));
          setLeads(updatedLeads);
          if (editingLead && String(editingLead.id) === String(targetId)) setEditingLead(null);
          toast.success('Lead deleted successfully!');
          await logAction('Deleted Lead', `Lead ID: ${targetId}`);
        } catch (e) {
          console.error('Failed to delete from supabase:', e);
          toast.error('Failed to delete lead');
        }
      }
    });
  };

  const saveEditedLead = async () => {
    if (!editingLead) return;
    const updatedLeads = leads.map((lead: any) => 
      lead.id === editingLead.id ? editingLead : lead
    );
    setLeads(updatedLeads);
    
    try {
      const { id, created_at, ...updateData } = editingLead;
      await supabase.from('leads').update(updateData).eq('id', editingLead.id);
      toast.success('Lead updated successfully!');
      
      const leadId = editingLead.id;
      setEditingLead(null);
      
      await logAction('Updated Lead Details', `Lead ID: ${leadId}`);
    } catch (err) {
      toast.error('Failed to update lead');
    }
  };

  const deleteSubscriber = async (id: any) => {
    setConfirmDialog({
      isOpen: true,
      message: "Are you sure you want to delete this subscriber?",
      onConfirm: async () => {
        try {
          await supabase.from('subscribers').delete().eq('id', id);
          const updatedSubscribers = subscribers.filter((sub: any) => sub.id !== id);
          setSubscribers(updatedSubscribers);
          toast.success('Subscriber deleted successfully!');
          await logAction('Deleted Subscriber', `Subscriber ID: ${id}`);
        } catch (e) {
          console.error('Failed to delete from supabase:', e);
          toast.error('Failed to delete subscriber');
        }
      }
    });
  };

  const handleEditSubscriber = (id: any) => {};
  const openAdminModal = (admin: any = null) => {
    if (admin) {
      setAdminForm({
        name: admin.name || '',
        email: admin.email || '',
        password: '',
        permissions: admin.permissions || {},
        is_master: admin.is_master || false
      });
      setEditingAdminId(admin.id || admin._id);
    } else {
      setAdminForm({
        name: '',
        email: '',
        password: '',
        permissions: { dashboard: true, users: true, newsletter: true, settings: true, manage_admins: false },
        is_master: false
      });
      setEditingAdminId(null);
    }
    setShowAdminModal(true);
  };
  
  const handleDeleteAdmin = async (id: any) => {
    setConfirmDialog({
      isOpen: true,
      message: "Are you sure you want to delete this admin?",
      onConfirm: async () => {
        try {
          await supabase.from('admins').delete().eq('id', id);
          setAdminUsers(adminUsers.filter((a: any) => a.id !== id && a._id !== id));
          toast.success('Admin deleted successfully!');
          await logAction('Deleted Admin', `Admin ID: ${id}`);
        } catch (e) {
          toast.error('Failed to delete admin');
        }
      }
    });
  };

  const handleSaveAdmin = async (e: any) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email) {
      toast.error('Name and email are required');
      return;
    }
    if (!editingAdminId && !adminForm.password) {
      toast.error('Password is required for new admins');
      return;
    }
    
    if (adminForm.password) {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      if (!strongPasswordRegex.test(adminForm.password)) {
        toast.error('Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.');
        return;
      }
    }

    try {
      if (editingAdminId) {
        // Only attempt to change auth credentials if password is provided or email changed
        const currentAdminData = adminUsers.find(a => a.id === editingAdminId || a._id === editingAdminId);
        
        const { error: updateError } = await supabase
          .from('admins')
          .update({
            name: adminForm.name,
            email: adminForm.email,
            permissions: adminForm.permissions || {},
            is_master: adminForm.is_master || false
          })
          .eq('id', editingAdminId);
          
        if (updateError) throw updateError;

        if (adminForm.password || (currentAdminData && currentAdminData.email !== adminForm.email)) {
          const { error: rpcError } = await supabase.rpc('update_admin_credentials', {
            target_admin_id: editingAdminId,
            new_email: adminForm.email,
            new_password: adminForm.password || null
          });
          if (rpcError) {
            console.error(rpcError);
            toast.error('Failed to update login credentials. Ensure you have master privileges.');
            return;
          }
        }

        toast.success('Admin updated successfully!');
      } else {
        // Create secondary client to avoid replacing current session
        const tempSupabase = createClient(
          import.meta.env.VITE_SUPABASE_URL as string,
          import.meta.env.VITE_SUPABASE_ANON_KEY as string,
          { auth: { persistSession: false, autoRefreshToken: false } }
        );
        
        const { data: authData, error: authError } = await tempSupabase.auth.signUp({
          email: adminForm.email,
          password: adminForm.password,
        });
        
        if (authError) throw authError;
        
        const newUserId = authData.user?.id;
        if (!newUserId) throw new Error('Could not create auth user. Ensure signups are enabled.');
        
        const { error: insertError } = await supabase
          .from('admins')
          .insert({
            id: newUserId,
            name: adminForm.name,
            email: adminForm.email,
            permissions: adminForm.permissions || {},
            is_master: adminForm.is_master || false
          });
          
        if (insertError) throw insertError;
        
        toast.success('New admin created successfully!');
      }
      
      const isUpdate = !!editingAdminId;
      const targetEmail = adminForm.email;
      
      setShowAdminModal(false);
      setAdminForm({ name: '', email: '', password: '', permissions: {} });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setEditingAdminId(null);
      
      const { data: admins } = await supabase.from('admins').select('*');
      if (admins) setAdminUsers(admins);
      
      await logAction(isUpdate ? 'Updated Admin' : 'Created Admin', `Admin: ${targetEmail}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to save admin');
    }
  };
  const handleEmailBroadcast = () => {};
  const handleSaveBlog = async (e: any) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      toast.error("Please fill in the title and content.");
      return;
    }

    const isNew = !editingBlog;
    const insertData = {
      title: blogForm.title,
      slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      content: blogForm.content,
      cover_image: blogForm.coverImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
      author_name: blogForm.authorName || 'Admin',
      category: blogForm.category || 'General',
      created_at: isNew ? new Date().toISOString() : editingBlog.created_at
    };

    try {
      if (isNew) {
        const { data, error } = await supabase.from('blogs').insert(insertData).select();
        if (error) throw error;
        setBlogs([data[0], ...blogs]);
      } else {
        const { data, error } = await supabase.from('blogs').update(insertData).eq('id', editingBlog.id).select();
        if (error) throw error;
        setBlogs(blogs.map((b: any) => String(b.id) === String(editingBlog.id) ? data[0] : b));
      }

      const blogTitle = blogForm.title;
      setEditingBlog(null);
      setBlogForm({ title: '', content: '', coverImage: '', authorName: '', category: '', tags: '' });
      toast.success(isNew ? 'Blog post created successfully!' : 'Blog post updated successfully!');
      
      await logAction(isNew ? 'Created Blog' : 'Updated Blog', `Title: ${blogTitle}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save blog post to database.');
      console.error(err);
    }
  };
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogForm({ ...blogForm, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteBlog = async (id: any) => {
    setConfirmDialog({
      isOpen: true,
      message: "Are you sure you want to delete this blog post?",
      onConfirm: async () => {
        try {
          await supabase.from('blogs').delete().eq('id', id);
          const updatedBlogs = blogs.filter((b: any) => b.id !== id);
          setBlogs(updatedBlogs);
          toast.success('Blog deleted successfully!');
          await logAction('Deleted Blog', `Blog ID: ${id}`);
        } catch (e) {
          console.error('Failed to delete from supabase:', e);
          toast.error('Failed to delete blog.');
        }
      }
    });
  };

  const handleClearLogs = async () => {
    setConfirmDialog({
      isOpen: true,
      message: "Are you sure you want to delete ALL activity logs? This action cannot be undone.",
      onConfirm: async () => {
        try {
          // Fetch all IDs first to safely delete them without filter syntax errors
          const { data, error: fetchError } = await supabase.from('admin_logs').select('id');
          if (fetchError) throw fetchError;
          
          if (data && data.length > 0) {
            const ids = data.map((log: any) => log.id);
            const { error: deleteError } = await supabase.from('admin_logs').delete().in('id', ids);
            if (deleteError) throw deleteError;
          }
          
          setLogs([]);
          toast.success('All logs cleared successfully!');
          await logAction('Cleared All Logs', 'Admin cleared all activity logs');
        } catch (e: any) {
          console.error('Failed to clear logs:', e);
          toast.error(`Failed: ${e.message || 'Unknown error'}`);
        }
      }
    });
  };

  const SIDEBAR_TABS = [
    { id: 'dashboard', label: 'Dashboard', mobileLabel: 'Dashboard', icon: LayoutDashboard, show: currentAdmin?.permissions?.dashboard !== false },
    { id: 'users', label: 'Leads & Inquiries', mobileLabel: 'Leads', icon: Users, show: currentAdmin?.permissions?.users !== false },
    { id: 'calculator_quotes', label: 'Quotes', mobileLabel: 'Quotes', icon: Calculator, show: currentAdmin?.permissions?.quotes !== false },
    { id: 'newsletter', label: 'Newsletter', mobileLabel: 'Newsletter', icon: Mail, show: !!currentAdmin?.permissions?.newsletter },
    { id: 'logs', label: 'Activity Logs', mobileLabel: 'Logs', icon: Activity, show: !!currentAdmin?.is_master || !!currentAdmin?.permissions?.logs },
    { id: 'settings', label: 'Settings', mobileLabel: 'Settings', icon: Settings, show: !!currentAdmin?.permissions?.settings },
    { id: 'blogs', label: 'Blogs', mobileLabel: 'Blogs', icon: FileText, show: currentAdmin?.permissions?.blogs !== false },
    { id: 'manage_admins', label: 'Manage Admins', mobileLabel: 'Admins', icon: LogOut, show: true }
  ];

  useEffect(() => {
    if (currentAdmin) {
      const activeTabConfig = SIDEBAR_TABS.find(t => t.id === activeTab);
      if (activeTabConfig && !activeTabConfig.show) {
        const firstAvailable = SIDEBAR_TABS.find(t => t.show);
        if (firstAvailable) {
          setActiveTab(firstAvailable.id);
        }
      }
    }
  }, [currentAdmin, activeTab]);

  const renderContent = () => {
    const activeTabConfig = SIDEBAR_TABS.find(t => t.id === activeTab);
    if (activeTabConfig && !activeTabConfig.show) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">You do not have permission to view this section.</p>
        </div>
      );
    }


    if (activeTab === 'users') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Leads & Inquiries</h1>
            <button onClick={exportLeadsToCSV} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-sm font-medium transition-colors">
              Export CSV
            </button>
          </div>



          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {leads.filter(l => l.interest !== 'Brokerage Quote').map(lead => (
                <div key={lead.id} className="bg-black/20 border border-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="overflow-hidden pr-2">
                      <div className="text-white font-medium truncate">{lead.name}</div>
                      <div className="text-gray-400 text-sm truncate">{lead.email}</div>
                      <div className="text-gray-500 text-xs">{lead.phone}</div>
                    </div>
                    <div className="text-gray-500 text-[10px] whitespace-nowrap">{lead.created_at ? new Date(lead.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : lead.date}</div>
                  </div>
                  <div>
                    <div className="text-cyan-400 text-sm font-medium">{lead.interest}</div>
                    {lead.message && <div className="text-gray-400 text-xs mt-1 italic line-clamp-2">"{lead.message}"</div>}
                  </div>
                  <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
                    <select 
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-medium border appearance-none cursor-pointer outline-none ${getStatusColor(lead.status)}`}
                    >
                      <option value="New" className="bg-[#111827] text-white">New</option>
                      <option value="Connected" className="bg-[#111827] text-white">Connected</option>
                      <option value="In Progress" className="bg-[#111827] text-white">In Progress</option>
                      <option value="Closed (Won)" className="bg-[#111827] text-white">Closed (Won)</option>
                      <option value="Closed (Lost)" className="bg-[#111827] text-white">Closed (Lost)</option>
                    </select>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingLead(lead)}
                        className="text-cyan-400 hover:text-cyan-400 text-xs font-medium px-3 py-1.5 border border-cyan-400/30 hover:border-cyan-400 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Name</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Email / Phone</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Interest / Message</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.filter(l => l.interest !== 'Brokerage Quote').map((lead: any) => (
                    <tr key={lead.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{lead.name}</td>
                      <td className="py-4 px-4">
                        <div className="text-gray-300">{lead.email}</div>
                        <div className="text-gray-500 text-sm">{lead.phone}</div>
                      </td>
                      <td className="py-4 px-4 text-cyan-400">
                        {lead.interest}
                        {lead.message && <div className="text-gray-400 text-xs mt-1 truncate max-w-xs" title={lead.message}>"{lead.message}"</div>}
                      </td>
                      <td className="py-4 px-4">
                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border appearance-none cursor-pointer outline-none ${getStatusColor(lead.status)}`}
                        >
                          <option value="New" className="bg-[#111827] text-white">New</option>
                          <option value="Connected" className="bg-[#111827] text-white">Connected</option>
                          <option value="In Progress" className="bg-[#111827] text-white">In Progress</option>
                          <option value="Closed (Won)" className="bg-[#111827] text-white">Closed (Won)</option>
                          <option value="Closed (Lost)" className="bg-[#111827] text-white">Closed (Lost)</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-gray-500 whitespace-nowrap">{lead.created_at ? new Date(lead.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : lead.date}</td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => setEditingLead(lead)}
                          className="text-cyan-400 hover:text-cyan-400 text-sm font-medium px-3 py-1.5 border border-cyan-400/30 hover:border-cyan-400 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'newsletter') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Newsletter Subscribers</h1>
            <div className="text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-lg">
              Total: {subscribers.length}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            {/* Mobile View */}
            <div className="md:hidden space-y-3">
              {subscribers.length > 0 ? (
                subscribers.map((sub) => (
                  <div key={sub.id} className="bg-black/20 border border-gray-800 rounded-lg p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="text-white font-medium truncate pr-4 text-sm">{sub.email}</div>
                      <div className="text-gray-500 text-xs whitespace-nowrap">{sub.date || (sub.created_at ? new Date(sub.created_at).toLocaleDateString() : '')}</div>
                    </div>
                    <div className="flex gap-4 border-t border-gray-800/50 pt-3">
                      <button onClick={() => setEditingSubscriber(sub)} className="text-cyan-400 text-xs font-medium hover:text-cyan-300">Edit</button>
                      <button onClick={() => deleteSubscriber(sub.id)} className="text-red-400 text-xs font-medium hover:text-red-300">Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">No newsletter subscribers yet.</div>
              )}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Email Address</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Date Subscribed</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.length > 0 ? (
                    subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">{sub.email}</td>
                        <td className="py-4 px-4 text-gray-500">{sub.date || (sub.created_at ? new Date(sub.created_at).toLocaleDateString() : '')}</td>
                        <td className="py-4 px-4 text-right">
                          <button onClick={() => setEditingSubscriber(sub)} className="text-cyan-400 hover:text-cyan-300 mr-4 font-medium text-sm">Edit</button>
                          <button onClick={() => deleteSubscriber(sub.id)} className="text-red-400 hover:text-red-300 font-medium text-sm">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-8 text-center text-gray-500">No newsletter subscribers yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {editingSubscriber && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Edit Subscriber</h3>
                <form onSubmit={handleEditSubscriber}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={editingSubscriber.email}
                      onChange={(e) => setEditingSubscriber({ ...editingSubscriber, email: e.target.value })}
                      className="w-full bg-black/50 border border-gray-700 text-white rounded-lg px-4 py-2 focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setEditingSubscriber(null)} className="px-4 py-2 bg-gray-800 text-gray-300 hover:text-white rounded-lg">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-medium">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      );
    }

    if (activeTab === 'calculator_quotes') {
      const quotes = leads.filter(l => l.interest === 'Brokerage Quote');
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Calculator Quotes</h1>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Name</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Email / Phone</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{quote.name}</td>
                      <td className="py-4 px-4">
                        <div className="text-gray-300">{quote.email}</div>
                        <div className="text-gray-500 text-sm">{quote.phone}</div>
                      </td>
                      <td className="py-4 px-4">
                        <select 
                          value={quote.status}
                          onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border appearance-none cursor-pointer outline-none ${getStatusColor(quote.status)}`}
                        >
                          <option value="New" className="bg-[#111827] text-white">New</option>
                          <option value="Connected" className="bg-[#111827] text-white">Connected</option>
                          <option value="In Progress" className="bg-[#111827] text-white">In Progress</option>
                          <option value="Closed (Won)" className="bg-[#111827] text-white">Closed (Won)</option>
                          <option value="Closed (Lost)" className="bg-[#111827] text-white">Closed (Lost)</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-gray-500">{quote.created_at ? new Date(quote.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : quote.date}</td>
                      <td className="py-4 px-4 text-right">
                        <button onClick={() => setViewingQuote(quote)} className="text-cyan-400 hover:text-cyan-300 font-medium text-sm border border-cyan-400/30 px-3 py-1.5 rounded-lg">View Quote</button>
                        <button onClick={() => deleteLead(quote.id)} className="text-red-500 hover:text-red-400 font-medium text-sm border border-red-500/30 hover:border-red-400 px-3 py-1.5 rounded-lg ml-2 transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {quotes.length === 0 && <tr><td colSpan="5" className="py-8 text-center text-gray-500">No quotes received yet.</td></tr>}
                </tbody>
              </table>
            </div>
            
            <div className="md:hidden space-y-4">
               {quotes.map(quote => (
                 <div key={quote.id} className="bg-black/20 border border-gray-800 rounded-lg p-4 space-y-3">
                   <div className="text-white font-medium">{quote.name}</div>
                   <div className="text-gray-400 text-sm">{quote.email}</div>
                   <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
                     <select value={quote.status} onChange={(e) => handleStatusChange(quote.id, e.target.value)} className={`px-2 py-1.5 rounded-lg text-xs font-medium border appearance-none cursor-pointer outline-none ${getStatusColor(quote.status)}`}>
                        <option value="New" className="bg-[#111827] text-white">New</option>
                        <option value="Connected" className="bg-[#111827] text-white">Connected</option>
                        <option value="In Progress" className="bg-[#111827] text-white">In Progress</option>
                        <option value="Closed (Won)" className="bg-[#111827] text-white">Closed (Won)</option>
                        <option value="Closed (Lost)" className="bg-[#111827] text-white">Closed (Lost)</option>
                     </select>
                     <div className="flex gap-2">
                       <button onClick={() => setViewingQuote(quote)} className="text-cyan-400 text-xs font-medium px-3 py-1.5 border border-cyan-400/30 rounded-lg">View</button>
                       <button onClick={() => deleteLead(quote.id)} className="text-red-500 text-xs font-medium px-3 py-1.5 border border-red-500/30 rounded-lg">Delete</button>
                     </div>
                   </div>
                 </div>
               ))}
               {quotes.length === 0 && <div className="text-center text-gray-500 py-4">No quotes received yet.</div>}
            </div>
          </div>

          {viewingQuote && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
                   <h3 className="text-xl font-bold text-white">Quote for {viewingQuote.name}</h3>
                   <button onClick={() => setViewingQuote(null)} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    <div className="text-sm leading-relaxed bg-black/40 p-6 rounded-xl border border-white/5 shadow-inner">
                      {viewingQuote.interest === 'Brokerage Quote' ? (
                        viewingQuote.message.split('\n').map((line: string, i: number) => {
                          const t = line.trim();
                          if (!t) return <div key={i} className="h-3"></div>;
                          if (t.endsWith('Summary') || t === 'Cost Breakdown' || t === 'Additional Notes:') {
                            return <h4 key={i} className="text-cyan-400 font-bold text-xl mt-6 mb-4 border-b border-gray-800 pb-2 flex items-center gap-2">
                              {t}
                            </h4>;
                          }
                          if (t.startsWith('-')) {
                            return (
                              <div key={i} className="flex items-start gap-3 mb-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyan-400/30 transition-colors">
                                <span className="text-cyan-400 mt-0.5">•</span>
                                <span className="text-gray-200 font-medium leading-relaxed">{t.substring(1).trim()}</span>
                              </div>
                            );
                          }
                          if (t.includes(': $')) {
                            const [label, val] = t.split(': $');
                            return (
                              <div key={i} className="flex justify-between items-center py-3 border-b border-gray-800/50 hover:bg-white/5 px-3 rounded-lg transition-colors">
                                <span className="text-gray-400 font-medium">{label}</span>
                                <span className="text-white font-bold tracking-wider text-base bg-white/10 px-3 py-1 rounded-md border border-white/10">${val}</span>
                              </div>
                            );
                          }
                          return <p key={i} className="text-gray-300 my-1 font-medium">{t}</p>;
                        })
                      ) : (
                        <div className="whitespace-pre-wrap text-gray-300">{viewingQuote.message}</div>
                      )}
                    </div>
                  </div>
                <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end">
                   <button onClick={() => setViewingQuote(null)} className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium transition-colors hover:bg-gray-700">Close</button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      );
    }

    if (activeTab === 'settings') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-white mb-6">Platform Settings</h1>
          <div className="max-w-2xl">

            {/* System Preferences */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">System Preferences</h2>
              <form className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Email Notifications</label>
                    <p className="text-xs text-gray-500">Receive alerts for new leads.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-400"></div>
                  </label>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Maintenance Mode</label>
                  <select 
                    value={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.value)}
                    className="w-full bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-400 focus:border-cyan-400 p-2.5 outline-none cursor-pointer"
                  >
                    <option value="Disable">Disabled (Live)</option>
                    <option value="Enable">Enabled (Offline)</option>
                  </select>
                </div>
              </form>
            </div>
            
            <div className="col-span-1 lg:col-span-2 flex justify-end">
              <button type="button" onClick={handleSaveSettings} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-semibold transition-colors shadow-lg">
                Save All Settings
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'logs') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="w-7 h-7 text-cyan-400" />
              Activity Logs
            </h1>
            <div className="flex gap-3">
              <button 
                onClick={async () => {
                  const { data } = await supabase.from('admin_logs').select('*').order('created_at', { ascending: false }).limit(100);
                  if (data) setLogs(data);
                  toast.success('Logs refreshed');
                }} 
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors border border-gray-700"
              >
                Refresh Logs
              </button>
              <button 
                onClick={handleClearLogs}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors border border-red-500/20"
              >
                Clear All Logs
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-800 bg-black/40">
                    <th className="py-4 px-6 text-gray-400 font-medium">Time</th>
                    <th className="py-4 px-6 text-gray-400 font-medium">Admin</th>
                    <th className="py-4 px-6 text-gray-400 font-medium">Action</th>
                    <th className="py-4 px-6 text-gray-400 font-medium">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 text-gray-400 text-sm">{new Date(log.created_at).toLocaleString()}</td>
                      <td className="py-4 px-6 text-white font-medium">{log.admin_name}</td>
                      <td className="py-4 px-6 text-cyan-400 font-medium">
                        <span className="bg-cyan-400/10 text-cyan-400 py-1 px-3 rounded-full text-xs border border-cyan-400/20">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-300 text-sm">{log.details}</td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-500">
                        No activity logs found. Actions performed by admins will appear here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'manage_admins') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Manage Admins</h1>
            {currentAdmin?.is_master && (
              <button onClick={() => openAdminModal(null)} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-sm font-medium transition-colors">
                + Create New Admin
              </button>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {adminUsers.map((admin: any) => (
                <div key={admin.id} className="bg-black/20 border border-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="overflow-hidden pr-2">
                      <div className="text-white font-medium truncate">
                        {admin.name} {admin.is_master && <span className="text-cyan-400 text-xs ml-1">(Master)</span>}
                      </div>
                      <div className="text-gray-400 text-sm truncate">{admin.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(admin.permissions).map(key => admin.permissions[key] && (
                      <span key={key} className="px-2 py-1 bg-white/10 text-white border border-white/20 rounded-md text-[10px] uppercase font-bold tracking-wider">
                        {key.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-gray-800 flex justify-end gap-2">
                    {currentAdmin?.is_master && (
                      <>
                        <button onClick={() => openAdminModal(admin)} className="text-cyan-400 hover:text-cyan-400 text-xs font-medium px-3 py-1.5 border border-cyan-400/30 hover:border-cyan-400 rounded-lg transition-colors">Edit</button>
                        {((admin.id || admin._id) !== (currentAdmin?.id || currentAdmin?._id)) && (
                          <button onClick={() => handleDeleteAdmin(admin._id || admin.id)} className="text-red-500 hover:text-red-400 text-xs font-medium px-3 py-1.5 border border-red-500/30 hover:border-red-400 rounded-lg transition-colors">Delete</button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Name / Email</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Permissions</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((admin: any) => (
                    <tr key={admin.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">
                          {admin.name} {admin.is_master && <span className="text-cyan-400 text-xs ml-1">(Master)</span>}
                        </div>
                        <div className="text-gray-500 text-sm">{admin.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-2">
                          {Object.keys(admin.permissions).map(key => admin.permissions[key] && (
                            <span key={key} className="px-2 py-1 bg-white/10 text-white border border-white/20 rounded-md text-[10px] uppercase font-bold tracking-wider">
                              {key.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {currentAdmin?.is_master && (
                          <>
                            <button onClick={() => openAdminModal(admin)} className="text-cyan-400 hover:text-cyan-400 text-sm font-medium px-3 py-1.5 border border-cyan-400/30 hover:border-cyan-400 rounded-lg transition-colors mr-2">
                              Edit
                            </button>
                            {((admin.id || admin._id) !== (currentAdmin?.id || currentAdmin?._id)) && (
                              <button onClick={() => handleDeleteAdmin(admin._id || admin.id)} className="text-red-500 hover:text-red-400 text-sm font-medium px-3 py-1.5 border border-red-500/30 hover:border-red-400 rounded-lg transition-colors">
                                Delete
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showAdminModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-white mb-6">{editingAdminId ? 'Edit Admin' : 'Create New Admin'}</h2>
                <form onSubmit={handleSaveAdmin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input type="text" required value={adminForm.name} onChange={e => setAdminForm({...adminForm, name: e.target.value})} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input type="email" required value={adminForm.email} onChange={e => setAdminForm({...adminForm, email: e.target.value})} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{editingAdminId ? 'New Password (leave blank to keep current)' : 'Password'}</label>
                    <div className="relative">
                      <input type={showAdminPassword ? "text" : "password"} required={!editingAdminId} value={adminForm.password} onChange={e => setAdminForm({...adminForm, password: e.target.value})} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-cyan-400" />
                      <button type="button" onClick={() => setShowAdminPassword(!showAdminPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300">
                        {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-800">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Permissions</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: 'dashboard', label: 'Dashboard' },
                        { key: 'users', label: 'Leads & Inquiries' },
                        { key: 'quotes', label: 'Quotes' },
                        { key: 'newsletter', label: 'Newsletter' },
                        { key: 'logs', label: 'Activity Logs' },
                        { key: 'settings', label: 'Settings' },
                        { key: 'blogs', label: 'Blog' }
                      ].map(({ key, label }) => {
                        const isEditingSelf = editingAdminId && (String(editingAdminId) === String(currentAdmin?.id) || String(editingAdminId) === String(currentAdmin?._id));
                        return (
                          <label key={key} className={`flex items-center gap-2 ${isEditingSelf ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                            <input 
                              type="checkbox" 
                              disabled={isEditingSelf}
                              checked={adminForm.permissions[key] || false} 
                              onChange={e => setAdminForm({...adminForm, permissions: {...adminForm.permissions, [key]: e.target.checked}})} 
                              className={`rounded border-gray-700 bg-gray-800 text-cyan-400 focus:ring-cyan-400 ${isEditingSelf ? 'cursor-not-allowed' : ''}`} 
                            />
                            <span className="text-sm text-gray-400">{label}</span>
                          </label>
                        );
                      })}
                    </div>
                    {currentAdmin?.is_master && (
                      <div className="mt-4 pt-4 border-t border-gray-800/50">
                        {(() => {
                          const isEditingSelf = editingAdminId && (String(editingAdminId) === String(currentAdmin?.id) || String(editingAdminId) === String(currentAdmin?._id));
                          return (
                            <label className={`flex items-center gap-2 bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20 ${isEditingSelf ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                              <input 
                                type="checkbox" 
                                disabled={isEditingSelf}
                                checked={adminForm.is_master || false} 
                                onChange={e => {
                                  const isMaster = e.target.checked;
                                  if (isMaster) {
                                    setAdminForm({
                                      ...adminForm,
                                      is_master: true,
                                      permissions: {
                                        ...adminForm.permissions,
                                        dashboard: true,
                                        users: true,
                                        quotes: true,
                                        newsletter: true,
                                        logs: true,
                                        settings: true,
                                        blogs: true
                                      }
                                    });
                                  } else {
                                    setAdminForm({...adminForm, is_master: false});
                                  }
                                }}
                                className={`rounded border-gray-700 bg-gray-800 text-cyan-400 focus:ring-cyan-400 ${isEditingSelf ? 'cursor-not-allowed' : ''}`} 
                              />
                              <span className="text-sm text-cyan-400 font-bold tracking-wide">Grant Master Admin Role</span>
                            </label>
                          );
                        })()}
                        <p className="text-xs text-gray-500 mt-2 ml-1">Master admins can edit other master admins and assign master roles.</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-3 mt-8">
                    <button type="button" onClick={() => setShowAdminModal(false)} className="px-6 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg font-medium transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-medium transition-colors">Save Admin</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      );
    }

    if (activeTab === 'dashboard') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
        <h1 className="text-2xl font-bold text-white mb-6">Overview Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">Total Leads (This Month)</div>
                <div className="text-3xl font-bold text-white">{leads.length}</div>
              </div>
              <div className="relative">
                <div 
                  className="p-2 bg-cyan-400/10 rounded-lg cursor-pointer hover:bg-cyan-400/20 transition-colors"
                  onClick={() => setShowLeadsList(!showLeadsList)}
                  title="View Lead Names"
                >
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                {showLeadsList && (
                  <div className="absolute right-0 mt-2 w-56 bg-black/20 border border-white/10 backdrop-blur-sm rounded-lg shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-700 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Recent Leads
                    </div>
                    {leads.length > 0 ? leads.map(lead => (
                      <div 
                        key={lead.id} 
                        className="px-4 py-3 text-white text-sm hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-colors border-b border-gray-700/50 last:border-0" 
                        onClick={() => { setShowLeadsList(false); setActiveTab('users'); }}
                      >
                        <span className="truncate mr-2 font-medium">{lead.name}</span>
                        <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">{lead.status}</span>
                      </div>
                    )) : (
                      <div className="px-4 py-3 text-gray-500 text-sm text-center">No leads available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="text-green-400 text-sm mt-4 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> New leads arriving
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">Unread Messages</div>
                <div className="text-3xl font-bold text-white">{leads.length}</div>
              </div>
              <div className="relative">
                <div 
                  className="p-2 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => setShowEmailsList(!showEmailsList)}
                  title="View Lead Emails"
                >
                  <Mail className="w-5 h-5 text-white" />
                </div>
                {showEmailsList && (
                  <div className="absolute right-0 mt-2 w-64 bg-black/20 border border-white/10 backdrop-blur-sm rounded-lg shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-700 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Recent Emails
                    </div>
                    {leads.length > 0 ? leads.map(lead => (
                      <div 
                        key={lead.id} 
                        className="px-4 py-3 text-white text-sm hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-colors border-b border-gray-700/50 last:border-0" 
                        onClick={() => { setShowEmailsList(false); setActiveTab('users'); }}
                      >
                        <span className="truncate mr-2 text-gray-200 font-medium">{lead.email}</span>
                      </div>
                    )) : (
                      <div className="px-4 py-3 text-gray-500 text-sm text-center">No emails available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="text-red-400 text-sm mt-4 flex items-center gap-1">
              Requires attention
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">Conversion Rate</div>
                <div className="text-3xl font-bold text-white">
                  {leads.length > 0 
                    ? ((leads.filter(l => l.status === 'Closed (Won)').length / leads.length) * 100).toFixed(1) + '%' 
                    : '0%'}
                </div>
              </div>
              <div className="p-2 bg-gray-300/10 rounded-lg"><Activity className="w-5 h-5 text-blue-400" /></div>
            </div>
            <div className="text-green-400 text-sm mt-4 flex items-center gap-1">
              Based on Closed (Won) leads
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">New Leads</div>
                <div className="text-3xl font-bold text-white">
                  {leads.filter(l => l.status === 'New').length}
                </div>
              </div>
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
              </div>
            </div>
            <div className="text-cyan-400/80 text-sm mt-4">
              Awaiting your response
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Leads by Status</h3>
            <div className="h-[300px]">
              {leads.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'New', count: leads.filter(l => l.status === 'New').length },
                      { name: 'Connected', count: leads.filter(l => l.status === 'Connected').length },
                      { name: 'In Progress', count: leads.filter(l => l.status === 'In Progress').length },
                      { name: 'Won', count: leads.filter(l => l.status === 'Closed (Won)').length },
                      { name: 'Lost', count: leads.filter(l => l.status === 'Closed (Lost)').length },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF" 
                      interval={0}
                      tick={{ fontSize: 11, fill: '#9CA3AF' }}
                      tickMargin={10}
                    />
                    <YAxis stroke="#9CA3AF" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} 
                      cursor={{ fill: '#374151', opacity: 0.4 }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#06b6d4" 
                      radius={[4, 4, 0, 0]} 
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500 font-medium border border-dashed border-gray-800 rounded-xl">
                  No lead data available yet
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Lead Interests</h3>
            <div className="h-[300px]">
              {(() => {
                const interestCounts = leads.reduce((acc, lead) => {
                  const interest = lead.interest || 'Other';
                  acc[interest] = (acc[interest] || 0) + 1;
                  return acc;
                }, {});

                const pieData = Object.keys(interestCounts).map(key => ({
                  name: key.length > 20 ? key.substring(0, 20) + '...' : key,
                  value: interestCounts[key]
                })).sort((a, b) => b.value - a.value).slice(0, 6); // Top 6 interests

                return pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#06b6d4', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'][index % 5]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500 font-medium border border-dashed border-gray-800 rounded-xl">
                    No matching interests data
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Leads over time line chart */}
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Leads Over Time (Last 7 Days)</h3>
            <div className="h-[300px]">
              {(() => {
                // Group leads by date (last 7 days)
                const last7Days = Array.from({ length: 7 }).map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (6 - i));
                  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                });
                
                const timeData = last7Days.map(dateStr => {
                  const count = leads.filter(l => {
                    if (l.created_at) {
                      return new Date(l.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === dateStr;
                    }
                    if (l.date) {
                      return l.date.includes(dateStr) || new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === dateStr;
                    }
                    return false;
                  }).length;
                  return { date: dateStr, count };
                });

                return leads.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timeData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF" 
                        tick={{ fontSize: 11, fill: '#9CA3AF' }}
                        tickMargin={10}
                      />
                      <YAxis stroke="#9CA3AF" tick={{ fontSize: 12, fill: '#9CA3AF' }} allowDecimals={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#06b6d4" 
                        strokeWidth={3}
                        dot={{ fill: '#06b6d4', r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                        isAnimationActive={true}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500 font-medium border border-dashed border-gray-800 rounded-xl">
                    No timeline data available
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Recent Contact Requests</h3>
            <div className="space-y-4">
              {leads.slice(0, 3).map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-bold uppercase">
                      {lead.name ? lead.name.charAt(0) : '?'}
                    </div>
                    <div>
                      <div className="text-white font-medium">{lead.name}</div>
                      <div className="text-cyan-400 text-sm">Requested: {lead.interest}</div>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">{lead.date}</div>
                </div>
              ))}
              {leads.length === 0 && (
                <div className="text-gray-500 text-sm text-center py-4">No recent requests</div>
              )}
            </div>
            <button onClick={() => setActiveTab('users')} className="w-full mt-4 py-2 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-sm font-medium">
              View All Leads
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleEmailBroadcast} className="flex flex-col items-center justify-center p-6 bg-gray-800/30 border border-gray-800 hover:border-cyan-400/50 hover:bg-cyan-400/5 rounded-xl transition-all group">
                <Mail className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 mb-3" />
                <span className="text-gray-300 font-medium text-sm text-center">Compose Email Broadcast</span>
              </button>
              <button onClick={() => setActiveTab('settings')} className="flex flex-col items-center justify-center p-6 bg-gray-800/30 border border-gray-800 hover:border-white/50 hover:bg-white/5 rounded-xl transition-all group">
                <Settings className="w-8 h-8 text-gray-400 group-hover:text-white mb-3" />
                <span className="text-gray-300 font-medium text-sm text-center">Update Contact Info</span>
              </button>
              <button onClick={() => window.open('/', '_blank')} className="flex flex-col items-center justify-center p-6 bg-gray-800/30 border border-gray-800 hover:border-gray-300/50 hover:bg-gray-300/5 rounded-xl transition-all group">
                <LayoutDashboard className="w-8 h-8 text-gray-400 group-hover:text-blue-400 mb-3" />
                <span className="text-gray-300 font-medium text-sm text-center">View Live Site</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
    }

    if (activeTab === 'blogs') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Manage Blogs</h1>
            <div className="flex gap-3">
              <button onClick={() => window.open('/', '_blank')} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4" /> Visit Website
              </button>
              <button onClick={() => { setEditingBlog(false); setBlogForm({ title: '', content: '', coverImage: '', authorName: '', category: '', tags: '' }); }} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-sm font-medium transition-colors">
                + Create New Blog
              </button>
            </div>
          </div>

          {editingBlog !== null && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-bold text-white mb-6">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h2>
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <input type="text" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Author Name</label>
                  <input type="text" value={blogForm.authorName || ''} onChange={e => setBlogForm({...blogForm, authorName: e.target.value})} placeholder="e.g. David Chen" className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                  <input type="text" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} placeholder="e.g. Market Analysis" className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
                  <input type="text" value={blogForm.tags} onChange={e => setBlogForm({...blogForm, tags: e.target.value})} placeholder="e.g. Forex, Trading, Platform" className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image</label>
                  <input type="file" accept="image/*" onChange={handleUploadImage} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400" />
                  {blogForm.coverImage && <img src={blogForm.coverImage} alt="Cover" className="mt-2 h-32 object-cover rounded-lg" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Content (Rich Text)</label>
                  <div className="bg-white rounded-lg text-black mb-12 pb-12">
                    <ReactQuill 
                      theme="snow" 
                      value={blogForm.content} 
                      onChange={(content) => setBlogForm({...blogForm, content})} 
                      style={{ height: '300px' }}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button type="button" onClick={() => setEditingBlog(null)} className="px-6 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-medium transition-colors">Save Blog</button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {blogs.length > 0 ? blogs.map((blog: any) => (
                <div key={blog.id} className="bg-black/20 border border-gray-800 rounded-lg p-4 space-y-3">
                  <div className="text-white font-medium truncate">{blog.title}</div>
                  <div className="text-gray-500 text-xs">{blog.date}</div>
                  <div className="pt-3 border-t border-gray-800 flex justify-end gap-2">
                    <button onClick={() => { setEditingBlog(blog); setBlogForm({ ...blog, authorName: blog.author_name, category: blog.category || '', tags: blog.tags ? (Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags) : '' }); }} className="text-cyan-400 hover:text-cyan-400 text-xs font-medium px-3 py-1.5 border border-cyan-400/30 hover:border-cyan-400 rounded-lg transition-colors">Edit</button>
                    <button onClick={() => handleDeleteBlog(blog.id)} className="text-red-500 hover:text-red-400 text-xs font-medium px-3 py-1.5 border border-red-500/30 hover:border-red-400 rounded-lg transition-colors">Delete</button>
                  </div>
                </div>
              )) : (
                <div className="py-8 text-center text-gray-500">No blogs created yet.</div>
              )}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Title</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Date</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length > 0 ? blogs.map((blog: any) => (
                    <tr key={blog.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{blog.title}</td>
                      <td className="py-4 px-4 text-gray-500 text-right">{blog.date}</td>
                      <td className="py-4 px-4 text-right">
                        <button onClick={() => { setEditingBlog(blog); setBlogForm({ ...blog, authorName: blog.author_name, category: blog.category || '', tags: blog.tags ? (Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags) : '' }); }} className="text-cyan-400 hover:text-cyan-400 text-sm font-medium px-3 py-1.5 border border-cyan-400/30 hover:border-cyan-400 rounded-lg transition-colors mr-2">Edit</button>
                        <button onClick={() => handleDeleteBlog(blog.id)} className="text-red-500 hover:text-red-400 text-sm font-medium px-3 py-1.5 border border-red-500/30 hover:border-red-400 rounded-lg transition-colors">Delete</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="3" className="py-8 text-center text-gray-500">No blogs created yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      );
    }
    
    return <div className="p-8 text-center text-gray-500">Please select an option from the menu.</div>;
  };



  return (
    <div className="relative min-h-screen flex overflow-hidden bg-[#020617]">
      <Admin3DBackground />
      <div className="relative z-10 flex w-full">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <h2 
            onClick={() => { setActiveTab('dashboard'); navigate('/admin/dashboard'); }}
            className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="BrokerCore Solution" className="h-10 w-auto bg-white p-1 rounded-xl" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-gray-300">Admin Panel</span>
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {SIDEBAR_TABS.filter(tab => tab.show).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-cyan-400/10 text-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 bg-black/20 rounded-lg border border-gray-800/50">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold text-lg border border-cyan-500/30 shrink-0">
              {currentAdmin?.name ? currentAdmin.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-white font-medium text-sm truncate">{currentAdmin?.name || 'Loading...'}</div>
              <div className="text-cyan-500 text-xs font-semibold tracking-wide uppercase mt-0.5 truncate">{currentAdmin?.is_master ? 'Master Admin' : 'Admin'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-white/5 backdrop-blur-xl border-b border-white/10 p-4 flex justify-between items-center z-20">
          <h2 
            onClick={() => { setActiveTab('dashboard'); navigate('/admin/dashboard'); }}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="BrokerCore Solution" className="h-8 w-auto bg-white p-1 rounded-lg" />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-gray-300">Admin Panel</span>
          </h2>
          <button onClick={handleLogout} className="text-red-400 p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-8">
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0f1c]/95 backdrop-blur-xl border-t border-white/10 z-50 px-4 py-3 flex overflow-x-auto gap-6 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {SIDEBAR_TABS.filter(tab => tab.show).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 flex-shrink-0 transition-colors ${
                  activeTab === tab.id ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.mobileLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {confirmDialog.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
              <h3 className="text-xl font-bold text-white mb-2">Confirm Action</h3>
              <p className="text-gray-400 mb-6">{confirmDialog.message}</p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setConfirmDialog({ isOpen: false, message: '', onConfirm: null })}
                  className="px-4 py-2 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (confirmDialog.onConfirm) {
                      // @ts-ignore
                      confirmDialog.onConfirm();
                    }
                    setConfirmDialog({ isOpen: false, message: '', onConfirm: null });
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg font-medium transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {editingLead && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">Edit Lead</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  value={editingLead.name || ''} 
                  onChange={e => handleEditChange('name', e.target.value)}
                  className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input 
                  type="email" 
                  value={editingLead.email || ''} 
                  onChange={e => handleEditChange('email', e.target.value)}
                  className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                <input 
                  type="text" 
                  value={editingLead.phone || ''} 
                  onChange={e => handleEditChange('phone', e.target.value)}
                  className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Interest</label>
                <input 
                  type="text" 
                  value={editingLead.interest || ''} 
                  onChange={e => handleEditChange('interest', e.target.value)}
                  className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea 
                  value={editingLead.message || ''} 
                  onChange={e => handleEditChange('message', e.target.value)}
                  rows={3}
                  className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={() => deleteLead(editingLead.id)}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg font-medium transition-colors border border-red-500/20"
              >
                Delete Lead
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => setEditingLead(null)}
                  className="px-6 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveEditedLead}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
