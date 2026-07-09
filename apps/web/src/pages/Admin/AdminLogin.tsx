import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Admin3DBackground from '@/components/Admin3DBackground';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle, Eye, EyeOff, ShieldCheck, QrCode } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { QRCodeSVG } from 'qrcode.react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [phase, setPhase] = useState<'login' | 'mfa-setup' | 'mfa-verify'>('login');
  const [mfaCode, setMfaCode] = useState('');
  const [totpUri, setTotpUri] = useState('');
  const [challengeId, setChallengeId] = useState('');
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    // Pre-fetch the MFA challenge as soon as the user enters the verify phase
    // This saves 2 sequential API calls (listFactors & challenge) during the actual button click!
    if (phase === 'mfa-verify') {
      const prepareChallenge = async () => {
        try {
          const { data: factors } = await supabase.auth.mfa.listFactors();
          const totpFactor = factors?.totp?.[0];
          if (totpFactor) {
            setFactorId(totpFactor.id);
            const { data: challengeData } = await supabase.auth.mfa.challenge({ factorId: totpFactor.id });
            if (challengeData) {
              setChallengeId(challengeData.id);
            }
          }
        } catch (e) {
          console.error("Failed to pre-fetch MFA challenge", e);
        }
      };
      prepareChallenge();
    }
  }, [phase]);
  const [factorId, setFactorId] = useState('');

  useEffect(() => {
    // Check if already logged in and handle MFA state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthUser(session.user);
        supabase.auth.mfa.getAuthenticatorAssuranceLevel().then(async ({ data: aal }) => {
          if (aal && aal.currentLevel === 'aal2') {
            navigate('/admin/dashboard');
          } else if (aal && aal.nextLevel === 'aal2' && aal.currentLevel === 'aal1') {
            setPhase('mfa-verify');
          } else if (aal && aal.nextLevel === 'aal1') {
            const { data: enrollData, error: enrollError } = await supabase.auth.mfa.enroll({
              factorType: 'totp',
              issuer: 'BrokerCoreAdmin',
            });
            if (!enrollError && enrollData) {
              setFactorId(enrollData.id);
              const userEmail = session.user?.email || '';
              const rawUri = enrollData.totp.uri;
              const secretMatch = rawUri.match(/[?&]secret=([^&]+)/);
              const secret = secretMatch ? secretMatch[1] : '';
              const cleanUri = `otpauth://totp/${encodeURIComponent('BrokerCoreAdmin:' + userEmail)}?secret=${secret}&issuer=BrokerCoreAdmin`;
              setTotpUri(cleanUri);
              setPhase('mfa-setup');
            }
          }
        });
      } else {
        // Not logged in. Check if they accessed via cheat code.
        if (!location.state?.secretAccess) {
          navigate('/', { replace: true });
        }
      }
    });
  }, [navigate, location]);

  const finalizeLogin = async (user: any) => {
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('id', user.id)
      .single();

    if (adminError || !adminData) {
      await supabase.auth.signOut();
      setError('You are not authorized as an admin.');
      setPhase('login');
      return;
    }

    localStorage.setItem('adminAuth', JSON.stringify({
      id: adminData.id,
      name: adminData.name || user.email,
      email: user.email,
      is_master: adminData.is_master || false,
      permissions: adminData.permissions || {
        dashboard: true,
        users: true,
        newsletter: true,
        settings: true,
        manage_admins: adminData.is_master || false
      }
    }));

    let browserDetails = 'Unknown Device';
    try {
      const ua = navigator.userAgent;
      let browser = 'Unknown Browser';
      if (ua.includes('Edge')) browser = 'Edge';
      else if (ua.includes('Chrome')) browser = 'Chrome';
      else if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';

      let os = 'Unknown OS';
      if (ua.includes('Windows')) os = 'Windows';
      else if (ua.includes('Mac')) os = 'Mac OS';
      else if (ua.includes('Linux')) os = 'Linux';
      else if (ua.includes('Android')) os = 'Android';
      else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

      browserDetails = `${browser} on ${os}`;
    } catch(e) {}

    try {
      supabase.from('admin_logs').insert({
        admin_id: adminData.id,
        admin_name: adminData.name || user.email,
        action: 'Admin Login',
        details: `Logged in via ${browserDetails}`
      }).then(({ error }) => {
        if (error) console.error('Failed to log login action', error);
      });
    } catch (e) {
      console.error('Failed to log login action', e);
    }

    navigate('/admin/dashboard');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let loginEmail = email.trim();

      if (!loginEmail.includes('@')) {
        const { data: adminUsers, error: findError } = await supabase
          .from('admins')
          .select('email')
          .ilike('name', loginEmail)
          .limit(1);

        if (findError || !adminUsers || adminUsers.length === 0) {
          setError('Invalid username or password');
          setIsLoading(false);
          return;
        }
        loginEmail = adminUsers[0].email;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (authError) {
        setError(authError.message || 'Invalid email or password');
        setIsLoading(false);
        return;
      }

      setAuthUser(data.user);

      if (data.session || data.user) {
        const { data: aalData, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aalError) throw aalError;

        if (aalData.nextLevel === 'aal2' && aalData.currentLevel === 'aal1') {
          setPhase('mfa-verify');
          setIsLoading(false);
          return;
        }

        if (aalData.nextLevel === 'aal1') {
          const { data: enrollData, error: enrollError } = await supabase.auth.mfa.enroll({
            factorType: 'totp',
            issuer: 'BrokerCoreAdmin',
          });
          if (enrollError) throw enrollError;
          
          setFactorId(enrollData.id);

          // Get the user's email directly from Supabase session (most reliable)
          const { data: userData } = await supabase.auth.getUser();
          const userEmail = userData?.user?.email || '';

          // Extract only the TOTP secret from the raw URI
          const rawUri = enrollData.totp.uri;
          const secretMatch = rawUri.match(/[?&]secret=([^&]+)/);
          const secret = secretMatch ? secretMatch[1] : '';

          // Build a perfectly clean URI: BrokerCoreAdmin:email — nothing else
          const cleanUri = `otpauth://totp/${encodeURIComponent('BrokerCoreAdmin:' + userEmail)}?secret=${secret}&issuer=BrokerCoreAdmin`;
          setTotpUri(cleanUri);

          setPhase('mfa-setup');
          setIsLoading(false);
          return;
        }
        
        await finalizeLogin(data.session.user);
      }
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMfaVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let currentFactorId = factorId;
      let currentChallengeId = challengeId;

      // If pre-fetch failed or didn't finish yet, do it now
      if (!currentChallengeId) {
        const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
        if (factorsError) throw factorsError;
        
        const totpFactor = factors.totp[0];
        if (!totpFactor) throw new Error('No TOTP factor found. Please contact support.');
        currentFactorId = totpFactor.id;

        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: currentFactorId });
        if (challengeError) throw challengeError;
        currentChallengeId = challengeData.id;
      }

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: currentFactorId,
        challengeId: currentChallengeId,
        code: mfaCode,
      });

      if (verifyError) throw verifyError;

      // Skip fetching session, we already saved authUser from handleLogin!
      await finalizeLogin(authUser);
      // Notice we do NOT set isLoading to false here, to ensure smooth transition to dashboard without flickering!
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
      setChallengeId(''); // Reset challenge so a new one can be generated if needed
      setIsLoading(false);
    } 
  };

  const handleMfaSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: mfaCode,
      });

      if (verifyError) throw verifyError;

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await finalizeLogin(session.user);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030610]">
      <Admin3DBackground />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white flex items-center justify-center gap-3">
          {phase === 'login' && 'Admin Portal'}
          {phase === 'mfa-setup' && <><QrCode className="w-8 h-8 text-cyan-400" /> Setup 2FA</>}
          {phase === 'mfa-verify' && <><ShieldCheck className="w-8 h-8 text-cyan-400" /> Enter 2FA Code</>}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {phase === 'login' && 'Sign in to access the dashboard'}
          {phase === 'mfa-setup' && 'Scan the QR code with your authenticator app'}
          {phase === 'mfa-verify' && 'Open your authenticator app to view your code'}
        </p>
      </div>

      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-[#111827] py-8 px-4 shadow-2xl shadow-cyan-500/10 sm:rounded-2xl sm:px-10 border border-gray-800">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {phase === 'login' && (
            <form className="space-y-6" onSubmit={handleLogin}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Username or Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm py-2.5 outline-none transition-all duration-300"
                    placeholder=""
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm py-2.5 outline-none transition-all duration-300"
                    placeholder=""
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-cyan-400 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-cyan-400 transition-colors" />
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-[#111827] transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </motion.button>
              </motion.div>
            </form>
          )}

          {phase === 'mfa-setup' && (
            <form className="space-y-6" onSubmit={handleMfaSetup}>
              <div className="flex justify-center bg-white p-4 rounded-xl">
                <QRCodeSVG value={totpUri} size={200} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter 6-digit code from your app
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                  className="block w-full text-center tracking-widest text-2xl bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm py-3 outline-none"
                  placeholder="000000"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || mfaCode.length !== 6}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify and Setup'}
                </button>
                <button
                  type="button"
                  onClick={() => setPhase('login')}
                  className="w-full mt-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {phase === 'mfa-verify' && (
            <form className="space-y-6" onSubmit={handleMfaVerify}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
                  Authentication Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                  className="block w-full text-center tracking-widest text-2xl bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm py-3 outline-none"
                  placeholder="000000"
                  autoFocus
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || mfaCode.length !== 6}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </button>
                <button
                  type="button"
                  onClick={() => setPhase('login')}
                  className="w-full mt-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
