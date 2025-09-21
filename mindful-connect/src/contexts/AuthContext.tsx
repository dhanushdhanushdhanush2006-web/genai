'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, signInAsGuest, signInWithGoogle, logOut, isDemoMode } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInAsGuest: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      // In demo mode, just set loading to false
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSignInAsGuest = async () => {
    try {
      if (isDemoMode) {
        const demoUser = {
          uid: 'demo-guest-' + Date.now(),
          isAnonymous: true,
          displayName: null,
          email: null,
          photoURL: null,
        } as User;
        setUser(demoUser);
        return;
      }
      await signInAsGuest();
    } catch (error) {
      console.error('Error signing in as guest:', error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      if (isDemoMode) {
        const demoUser = {
          uid: 'demo-google-' + Date.now(),
          isAnonymous: false,
          displayName: 'Demo User',
          email: 'demo@example.com',
          photoURL: null,
        } as User;
        setUser(demoUser);
        return;
      }
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleLogout = async () => {
    try {
      if (isDemoMode) {
        setUser(null);
        return;
      }
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isGuest = user?.isAnonymous || false;

  const value = {
    user,
    loading,
    signInAsGuest: handleSignInAsGuest,
    signInWithGoogle: handleSignInWithGoogle,
    logout: handleLogout,
    isGuest,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
