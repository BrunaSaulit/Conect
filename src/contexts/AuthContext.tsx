import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  type: 'participante' | 'empresa';
  isAdmin?: boolean;
}

interface RegisteredUser {
  name: string;
  email: string;
  password: string;
  type: 'participante' | 'empresa';
  hasPaid: boolean;
}

interface PaidEmailRecord {
  email: string;
  type: 'participante' | 'empresa';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'participante' | 'empresa') => Promise<LoginResult>;
  register: (name: string, email: string, password: string, type: 'participante' | 'empresa') => Promise<RegisterResult>;
  logout: () => void;
  markPaid: (email: string, type?: 'participante' | 'empresa') => void;
  hasUserPaid: (email: string) => boolean;
  isUserRegistered: (email: string) => boolean;
  isPaidEmail: (email: string) => boolean;
  getPaidUserType: (email: string) => 'participante' | 'empresa' | null;
  isLoading: boolean;
  clearError: () => void;
}

export type LoginResult =
  | { ok: true }
  | { ok: false; reason: 'not_registered' | 'wrong_password' | 'not_paid' | 'terms_not_accepted' | 'email_mismatch' | 'wrong_type' };

export type RegisterResult =
  | { ok: true }
  | { ok: false; reason: 'email_exists' | 'email_not_paid' };

const ADMIN_EMAIL = 'conect@gmail.com';
const ADMIN_PASSWORD = '123456';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [paidEmails, setPaidEmails] = useState<PaidEmailRecord[]>([]);

  const login = async (
    email: string,
    password: string,
    type: 'participante' | 'empresa'
  ): Promise<LoginResult> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);

    // Admin bypass
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ name: 'Admin', email, type, isAdmin: true });
      return { ok: true };
    }

    const found = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { ok: false, reason: 'not_registered' };
    if (found.password !== password) return { ok: false, reason: 'wrong_password' };
    if (!found.hasPaid) return { ok: false, reason: 'not_paid' };

    // Verify email was used for payment
    const paidRecord = paidEmails.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (!paidRecord) return { ok: false, reason: 'not_paid' };

    // Verify login type matches registration type
    if (found.type !== type) return { ok: false, reason: 'wrong_type' };

    setUser({ name: found.name, email: found.email, type: found.type });
    return { ok: true };
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    type: 'participante' | 'empresa'
  ): Promise<RegisterResult> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setIsLoading(false);

    const exists = registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, reason: 'email_exists' };

    // Check if email has paid
    const paidRecord = paidEmails.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (!paidRecord) return { ok: false, reason: 'email_not_paid' };

    setRegisteredUsers(prev => [...prev, {
      name, email, password, type,
      hasPaid: true,
    }]);
    return { ok: true };
  };

  const markPaid = (email: string, type?: 'participante' | 'empresa') => {
    const lowerEmail = email.toLowerCase();
    setPaidEmails(prev => {
      if (prev.some(p => p.email.toLowerCase() === lowerEmail)) return prev;
      return [...prev, { email: lowerEmail, type: type || 'participante' }];
    });
    setRegisteredUsers(prev =>
      prev.map(u => u.email.toLowerCase() === lowerEmail ? { ...u, hasPaid: true } : u)
    );
  };

  const hasUserPaid = (email: string): boolean => {
    if (email === ADMIN_EMAIL) return true;
    return paidEmails.some(p => p.email.toLowerCase() === email.toLowerCase());
  };

  const isUserRegistered = (email: string): boolean => {
    if (email === ADMIN_EMAIL) return true;
    return registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
  };

  const isPaidEmail = (email: string): boolean => {
    if (email === ADMIN_EMAIL) return true;
    return paidEmails.some(p => p.email.toLowerCase() === email.toLowerCase());
  };

  const getPaidUserType = (email: string): 'participante' | 'empresa' | null => {
    if (email === ADMIN_EMAIL) return 'participante';
    return paidEmails.find(p => p.email.toLowerCase() === email.toLowerCase())?.type ?? null;
  };

  const logout = () => setUser(null);
  const clearError = () => {};

  return (
    <AuthContext.Provider value={{
      user, login, register, logout, markPaid,
      hasUserPaid, isUserRegistered, isPaidEmail, getPaidUserType,
      isLoading, clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
