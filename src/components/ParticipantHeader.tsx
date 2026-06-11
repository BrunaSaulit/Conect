import React, { useState } from 'react';
import Logo from './Logo';
import { Bell, Search, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';

interface ParticipantHeaderProps {
  searchColor?: string;
  textColor?: string;
  bellColor?: string;
  bgColor?: string;
  showSearch?: boolean;
}

export default function ParticipantHeader({
  searchColor = '#B800D1',
  textColor = '#1a1a1a',
  bellColor = '#1a1a1a',
  bgColor = 'transparent',
  showSearch = true,
}: ParticipantHeaderProps) {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [notifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-6 py-3"
      style={{ backgroundColor: bgColor, borderBottom: '1px solid rgba(0,0,0,0.06)' }}
    >
      {/* Logo */}
      <button onClick={() => navigate('participant-classes')}>
        <Logo size="sm" />
      </button>

      {/* Search bar */}
      {showSearch && (
        <div className="hidden md:flex flex-1 mx-6 max-w-md items-center gap-2">
          <div
            className="flex items-center gap-2 flex-1 px-4 py-2 rounded-full border"
            style={{ borderColor: searchColor + '40', backgroundColor: 'white' }}
          >
            <Search size={16} style={{ color: searchColor }} />
            <input
              type="text"
              placeholder="Pesquisar oficinas"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: searchColor }}
            />
          </div>
          <button
            className="p-2.5 rounded-xl border"
            style={{ borderColor: searchColor + '40', backgroundColor: 'white' }}
          >
            <SlidersHorizontal size={16} style={{ color: searchColor }} />
          </button>
        </div>
      )}

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1"
          >
            <Bell size={22} style={{ color: bellColor }} />
            {notifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {notifications}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-8 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-fade-in">
              <h4 className="font-semibold text-sm text-gray-800 mb-3">Notificações</h4>
              {[
                { text: 'Nova aula de Cerâmica disponível!', time: '2min' },
                { text: 'Sua reserva foi confirmada.', time: '1h' },
                { text: 'Workshop de Violão começa amanhã.', time: '3h' },
              ].map((n, i) => (
                <div key={i} className="py-2 border-b border-gray-50 last:border-0">
                  <p className="text-xs text-gray-700">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time} atrás</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-sm" style={{ color: textColor }}>
          <span className="font-normal">Olá, </span>
          <span className="font-bold">{user?.name || 'Usuário'}</span>
        </div>
      </div>
    </header>
  );
}
