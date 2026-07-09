import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const adminAuth = localStorage.getItem('adminAuth');

        if (session && adminAuth) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthorized(false);
      }
    };

    verifyAccess();
  }, []);

  // Show a premium loading state while checking the token
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-accent-cyan animate-spin" />
          <div className="text-sm font-mono text-accent-cyan tracking-widest animate-pulse">
            VERIFYING SECURE TOKEN...
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if unauthorized
  if (!isAuthorized) {
    return <Navigate to="/admin" replace />;
  }

  // Render the protected component if authorized
  return <>{children}</>;
}
