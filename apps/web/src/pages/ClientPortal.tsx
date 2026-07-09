import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight, ShieldCheck, User, Building2 } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function ClientPortal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [resetStep, setResetStep] = useState<'initial' | 'otp' | 'new-password'>('initial');
  const [otpType, setOtpType] = useState<'recovery' | 'signup'>('recovery');
  const [otpCode, setOtpCode] = useState('');
  const [newPass, setNewPass] = useState('');

  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error(error.message || 'Invalid credentials');
          setIsLoading(false);
          return;
        }

        if (data.session) {
          // Check if this user is actually an admin
          const { data: adminData } = await supabase
            .from('admins')
            .select('id')
            .eq('id', data.user.id)
            .single();

          if (adminData || data.user.user_metadata?.role === 'admin') {
            toast.success('Admin Account Detected. Please complete 2FA.');
            navigate('/admin');
            return;
          }

          toast.success('Login successful!');
          navigate('/client/dashboard');
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              company: companyName,
              role: 'client'
            }
          }
        });

        if (error) {
          toast.error(error.message || 'Signup failed');
          setIsLoading(false);
          return;
        }

        if (data.session) {
          toast.success('Account created successfully!');
          navigate('/client/dashboard');
        } else {
          toast.success('Account created! Enter the confirmation code sent to your email.');
          setOtpType('signup');
          setResetStep('otp');
          setIsLoading(false);
        }
      }
    } catch (err: any) {
      toast.error('An error occurred during authentication');
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address first.');
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) throw error;
      toast.success('OTP sent to your email!');
      setOtpType('recovery');
      setResetStep('otp');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send OTP email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: otpType
      });
      if (error) throw error;
      
      if (otpType === 'signup') {
        toast.success('Email verified successfully!');
        navigate('/client/dashboard');
      } else {
        if (data.session) {
          setResetStep('new-password');
          toast.success('OTP verified! Enter your new password.');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPass
      });
      if (error) throw error;
      toast.success('Password updated successfully! You can now login.');
      setResetStep('initial');
      setPassword('');
      setOtpCode('');
      setNewPass('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/client/dashboard`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || 'Error connecting to Google');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 pt-32 pb-20 relative overflow-hidden">
      <SEOHead title="Client Portal Login | BrokerCore Solution" />

      {/* Abstract Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent-cyan/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md relative z-10 shadow-2xl">
        
        {/* Left Side: Branding / Info */}
        <div className="p-8 md:p-12 hidden md:flex flex-col justify-between bg-gradient-to-br from-black/60 to-black/20 border-r border-white/10">
          <div>
            <Link to="/">
              <img src="/logo.png" alt="BrokerCore" className="h-10 w-auto bg-white p-1 rounded-xl mb-12" />
            </Link>
            <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-4">
              Partner Portal <br/> <span className="text-accent-cyan">Access</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Manage your white-label trading infrastructure, monitor IB commissions, and oversee client accounts from a single unified dashboard.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <ShieldCheck className="text-accent-cyan" size={18} />
                End-to-End Encryption
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Lock className="text-accent-cyan" size={18} />
                Multi-Factor Authentication Required
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-widest font-bold mt-12">
            BrokerCore Enterprise Infrastructure
          </div>
        </div>

        {/* Right Side: Login/Signup/Reset Form */}
        <div className="p-6 md:p-10 lg:px-12 lg:py-8 flex flex-col justify-center relative bg-[#0a0f1c]/50 min-h-[400px]">

          {resetStep === 'otp' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold text-white mb-1">
                {otpType === 'signup' ? 'Verify Email' : 'Enter OTP'}
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                We sent a 6-digit {otpType === 'signup' ? 'verification' : 'recovery'} code to <span className="text-white font-medium">{email}</span>.
              </p>
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">6-Digit Code</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-accent-cyan transition-colors text-sm tracking-widest font-mono"
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || otpCode.length < 6}
                  className="w-full bg-accent-cyan text-black font-bold uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 mt-4 text-sm"
                >
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setResetStep('initial')}
                  className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors mt-4"
                >
                  Cancel Recovery
                </button>
              </form>
            </div>
          )}

          {resetStep === 'new-password' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold text-white mb-1">Set New Password</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Enter your new password below.
              </p>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-accent-cyan transition-colors text-sm"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || newPass.length < 6}
                  className="w-full bg-accent-cyan text-black font-bold uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 mt-4 text-sm"
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}

          {resetStep === 'initial' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <h3 className="text-2xl font-bold text-white mb-1">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                {isLogin 
                  ? 'Please enter your credentials to access your portal.'
                  : 'Sign up to get access to the partner portal.'}
              </p>

              <form onSubmit={handleAuth} className="space-y-3.5">
                {!isLogin && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-accent-cyan transition-colors text-sm"
                          placeholder="John Doe"
                          required={!isLogin}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-accent-cyan transition-colors text-sm"
                          placeholder="Acme Brokerage"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Business Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-accent-cyan transition-colors text-sm"
                        placeholder="admin@yourbrokerage.com"
                        required
                      />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                    {isLogin && <a href="#" onClick={handleResetPassword} className="text-[11px] text-accent-cyan hover:underline">Forgot?</a>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-accent-cyan transition-colors text-sm"
                        placeholder="••••••••"
                        required
                      />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent-cyan text-black font-bold uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 mt-4 text-sm"
                >
                  {isLoading ? 'Processing...' : (isLogin ? 'Secure Login' : 'Sign Up')}
                  {!isLoading && <ChevronRight size={18} />}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <button 
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="w-full bg-transparent border border-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-colors text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                  Continue with Google
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
