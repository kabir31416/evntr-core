import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "attendee" | "organizer" | "admin";
export interface AuthUser { id: string; name: string; email: string; role: Role; avatar?: string }

interface AuthCtx {
  user: AuthUser | null;
  login: (email: string, _password: string) => Promise<AuthUser>;
  register: (name: string, email: string, _password: string, role?: Role) => Promise<AuthUser>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "evntr:auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setUser(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);
  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    }
  };
  const login = async (email: string) => {
    const u: AuthUser = { id: "usr_" + email.split("@")[0], name: email.split("@")[0], email, role: "attendee" };
    persist(u); return u;
  };
  const register = async (name: string, email: string, _p: string, role: Role = "attendee") => {
    const u: AuthUser = { id: "usr_" + Math.random().toString(36).slice(2, 8), name, email, role };
    persist(u); return u;
  };
  const logout = () => persist(null);
  return <Ctx.Provider value={{ user, login, register, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be inside AuthProvider");
  return c;
}
