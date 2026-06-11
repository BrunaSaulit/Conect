import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Page =
  | 'landing'
  | 'login'
  | 'register'
  | 'participant-classes'
  | 'participant-live'
  | 'participant-reservations'
  | 'participant-reserved'
  | 'participant-calendar'
  | 'participant-support'
  | 'participant-payments'
  | 'plans'
  | 'payment'
  | 'payment-success'
  | 'payment-error'
  | 'publish'
  | 'empresa-dashboard';

interface PlanRecord {
  name: string;
  price: string;
  date: string;
}

interface NavigationContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
  returnPage: Page | null;
  setReturnPage: (page: Page | null) => void;
  previousPage: Page | null;
  planFrom: 'landing' | 'sidebar' | null;
  setPlanFrom: (from: 'landing' | 'sidebar' | null) => void;
  pendingEmail: string;
  setPendingEmail: (email: string) => void;
  pendingUserType: 'participante' | 'empresa' | null;
  setPendingUserType: (type: 'participante' | 'empresa' | null) => void;
  selectedPlan: string | null;
  setSelectedPlan: (plan: string | null) => void;
  planHistory: PlanRecord[];
  addPlanToHistory: (name: string, price: string) => void;
  currentPlan: PlanRecord | null;
  setCurrentPlanRecord: (plan: PlanRecord | null) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [previousPage, setPreviousPage] = useState<Page | null>(null);
  const [returnPage, setReturnPage] = useState<Page | null>(null);
  const [planFrom, setPlanFrom] = useState<'landing' | 'sidebar' | null>(null);
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingUserType, setPendingUserType] = useState<'participante' | 'empresa' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [planHistory, setPlanHistory] = useState<PlanRecord[]>([]);
  const [currentPlan, setCurrentPlanRecord] = useState<PlanRecord | null>(null);

  const navigate = (page: Page) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addPlanToHistory = (name: string, price: string) => {
    const record: PlanRecord = { name, price, date: new Date().toLocaleDateString('pt-BR') };
    setPlanHistory(prev => [...prev, record]);
    setCurrentPlanRecord(record);
  };

  return (
    <NavigationContext.Provider value={{
      currentPage, navigate,
      returnPage, setReturnPage,
      previousPage,
      planFrom, setPlanFrom,
      pendingEmail, setPendingEmail,
      pendingUserType, setPendingUserType,
      selectedPlan, setSelectedPlan,
      planHistory, addPlanToHistory,
      currentPlan, setCurrentPlanRecord,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
