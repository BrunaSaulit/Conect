import React, { useState } from 'react';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import { Menu, X } from 'lucide-react';

export default function LandingHeader() {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEntrar = () => {
    if (user) {
      navigate('participant-classes');
    } else {
      navigate('login');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 focus:outline-none"
        >
          <Logo size="sm" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Vídeos', id: 'videos' },
            { label: 'Explorar', id: 'explorar' },
            { label: 'Como funciona', id: 'como-funciona' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm font-medium text-gray-600 hover:text-[#B800D1] transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={handleEntrar}
            className="hidden md:flex px-5 py-2 rounded-full border-2 border-[#B800D1] text-[#B800D1] text-sm font-semibold hover:bg-[#B800D1] hover:text-white transition-all duration-200"
          >
            {user ? `Olá, ${user.name}` : 'Entrar'}
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen
              ? <X size={22} className="text-gray-800" />
              : <Menu size={22} className="text-gray-800" />
            }
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {[
            { label: 'Vídeos', id: 'videos' },
            { label: 'Explorar', id: 'explorar' },
            { label: 'Como funciona', id: 'como-funciona' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-gray-700 font-medium hover:text-[#B800D1] transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleEntrar}
            className="px-5 py-2 rounded-full bg-[#B800D1] text-white text-sm font-semibold"
          >
            {user ? `Olá, ${user.name}` : 'Entrar'}
          </button>
        </div>
      )}
    </header>
  );
}
