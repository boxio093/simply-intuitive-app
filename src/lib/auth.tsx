import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  business: string;
};

type AuthContextValue = {
  user: MockUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, business: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "austech.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: MockUser | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value: AuthContextValue = {
    user,
    loading,
    signIn: async (email) => {
      await new Promise((r) => setTimeout(r, 350));
      persist({
        id: crypto.randomUUID(),
        name: email.split("@")[0] || "Founder",
        email,
        business: "My Business",
      });
    },
    signUp: async (name, email, _pw, business) => {
      await new Promise((r) => setTimeout(r, 450));
      persist({ id: crypto.randomUUID(), name, email, business });
    },
    signOut: () => persist(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
