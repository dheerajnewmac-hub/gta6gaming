"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface User {
  email: string;
  gamerTag: string;
  id?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loginUser: (email: string, id?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loginUser: () => {},
  logout: async () => {},
});

const STORAGE_KEY = "vicecloud_gamer_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1. Initial check from Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        const email = session.user.email;
        const gamerTag = `Gamer_${email.split("@")[0] || "8821"}`;
        setUser({ email, gamerTag, id: session.user.id });
      } else {
        // Fallback to localStorage
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            setUser(JSON.parse(stored));
          }
        } catch {
          // Ignore
        }
      }
    });

    // 2. Listen to active Supabase auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        const email = session.user.email;
        const gamerTag = `Gamer_${email.split("@")[0] || "8821"}`;
        const u = { email, gamerTag, id: session.user.id };
        setUser(u);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        } catch {
          // Ignore
        }
      } else if (!session) {
        setUser(null);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginUser = (email: string, id?: string) => {
    const gamerTag = `Gamer_${email.split("@")[0] || "8821"}`;
    const newUser: User = { email, gamerTag, id };
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // Ignore
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, loginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
