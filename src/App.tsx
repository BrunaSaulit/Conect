import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { ConniProvider } from './contexts/ConniContext';
import ConniAssistant from './components/ConniAssistant';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PlansPage from './pages/PlansPage';
import PaymentPage from './pages/PaymentPage';
import PublishPage from './pages/PublishPage';
import EmpresaDashboardPage from './pages/EmpresaDashboardPage';
import RecordedClassesPage from './pages/participant/RecordedClassesPage';
import LiveClassesPage from './pages/participant/LiveClassesPage';
import WorkshopReservationsPage from './pages/participant/WorkshopReservationsPage';
import ReservedWorkshopsPage from './pages/participant/ReservedWorkshopsPage';
import CalendarPage from './pages/participant/CalendarPage';
import SupportPage from './pages/participant/SupportPage';
import PaymentsHistoryPage from './pages/participant/PaymentsHistoryPage';

function AppRouter() {
  const { currentPage, navigate } = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const participantePages = [
      'participant-classes',
      'participant-live',
      'participant-reservations',
      'participant-reserved',
      'participant-calendar',
      'participant-support',
      'participant-payments',
    ];
    const empresaPages = ['publish', 'empresa-dashboard'];

    if (!user) {
      if (participantePages.includes(currentPage) || empresaPages.includes(currentPage)) {
        navigate('login');
      }
      return;
    }

    if (user.type === 'empresa' && participantePages.includes(currentPage)) {
      navigate('publish');
    }

    if (user.type === 'participante' && empresaPages.includes(currentPage)) {
      navigate('participant-classes');
    }
  }, [currentPage, user, navigate]);

  switch (currentPage) {
    case 'landing':
      return <LandingPage />;
    case 'login':
      return <LoginPage />;
    case 'register':
      return <RegisterPage />;
    case 'plans':
      return <PlansPage />;
    case 'payment':
      return <PaymentPage />;
    case 'publish':
      return user ? <PublishPage /> : <LoginPage />;
    case 'empresa-dashboard':
      return user?.type === 'empresa' ? <EmpresaDashboardPage /> : <LoginPage />;
    case 'participant-classes':
      return user?.type === 'participante' ? <RecordedClassesPage /> : <LoginPage />;
    case 'participant-live':
      return user?.type === 'participante' ? <LiveClassesPage /> : <LoginPage />;
    case 'participant-reservations':
      return user?.type === 'participante' ? <WorkshopReservationsPage /> : <LoginPage />;
    case 'participant-reserved':
      return user?.type === 'participante' ? <ReservedWorkshopsPage /> : <LoginPage />;
    case 'participant-calendar':
      return user?.type === 'participante' ? <CalendarPage /> : <LoginPage />;
    case 'participant-support':
      return user?.type === 'participante' ? <SupportPage /> : <LoginPage />;
    case 'participant-payments':
      return user?.type === 'participante' ? <PaymentsHistoryPage /> : <LoginPage />;
    default:
      return <LandingPage />;
  }
}

export default function App() {
  return (
    <NavigationProvider>
      <AuthProvider>
        <ConniProvider>
          <AppRouter />
          <ConniAssistant />
        </ConniProvider>
      </AuthProvider>
    </NavigationProvider>
  );
}
