import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const newLead = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Company: ${formData.company}`,
        interest: 'Demo Request',
        status: 'New'
      };

      const { error } = await supabase.from('leads').insert(newLead);
      if (error) throw error;

      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err) {
      console.error("Error submitting demo request:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', company: '', phone: '' });
      setErrors({});
    }, 300); // wait for exit animation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
              className="w-full max-w-md bg-[#0f172a] border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden pointer-events-auto relative"
            >
              {/* Decorative top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50" />
              
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                    <p className="text-gray-400">Our team will contact you shortly to schedule your personalized strategy call.</p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-2">Book a Demo</h3>
                    <p className="text-sm text-gray-400 mb-8">See how BrokerCore Solution can scale your brokerage globally.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className={`w-full bg-black/20 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:bg-accent-cyan/5 transition-all`}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Work Email"
                          className={`w-full bg-black/20 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:bg-accent-cyan/5 transition-all`}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company"
                            className={`w-full bg-black/20 border ${errors.company ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:bg-accent-cyan/5 transition-all`}
                          />
                          {errors.company && <p className="text-red-400 text-xs mt-1 ml-1">{errors.company}</p>}
                        </div>
                        <div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className={`w-full bg-black/20 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:bg-accent-cyan/5 transition-all`}
                          />
                          {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-accent-cyan text-[#0f172a] hover:bg-[#00cce6] font-bold py-6 rounded-xl mt-4 relative overflow-hidden group"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-2 border-[#0f172a]/30 border-t-[#0f172a] rounded-full animate-spin" />
                        ) : (
                          <span className="flex items-center">
                            Submit Request
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
