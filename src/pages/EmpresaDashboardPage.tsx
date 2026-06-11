import React, { useState } from 'react';
import { Users, MapPin, Calendar, ArrowLeft, LayoutDashboard, LogOut, Home } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';

interface Oficina {
  id: number;
  nome: string;
  data: string;
  local: string;
  inscritos: number;
  vagas: number;
  categoria: string;
}

const oficinasMock: Oficina[] = [
  { id: 1, nome: 'Workshop de Ceramica', data: '15/06/2026', local: 'Rua das Palmeiras, 142 - Vila Madalena', inscritos: 5, vagas: 8, categoria: 'Ceramica' },
  { id: 2, nome: 'Aula de Pintura em Tela', data: '18/06/2026', local: 'Atelie Cores - Pinheiros', inscritos: 3, vagas: 10, categoria: 'Pintura' },
  { id: 3, nome: 'Roda de Violao para Iniciantes', data: '20/06/2026', local: 'Cafe da Esquina - Pinheiros', inscritos: 8, vagas: 12, categoria: 'Musica' },
];

export default function EmpresaDashboardPage() {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const [oficinas] = useState<Oficina[]>(oficinasMock);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#4ECDC4' }}>
      <header className="flex items-center justify-between px-6 py-4">
        <Logo size="sm" variant="white" />
        <div className="flex items-center gap-3">
          <button
            onClick={() => { logout(); navigate('landing'); }}
            className="p-2 rounded-full bg-white/20 hover:bg-red-500/30 transition-colors"
            title="Logout"
          >
            <LogOut size={20} className="text-white" />
          </button>
          <button
            onClick={() => navigate('landing')}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            title="Inicio"
          >
            <Home size={20} className="text-white" />
          </button>
          <button
            onClick={() => navigate('publish')}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={16} />
            Divulgar
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full px-6 py-4 flex-1">
        {/* Header card */}
        <div className="bg-white/20 rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
              <LayoutDashboard size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Painel da Empresa</h1>
              <p className="text-white/70 text-sm">{user?.name || 'Empresa'}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-white">{oficinas.length}</p>
            <p className="text-white/70 text-xs mt-1">Oficinas publicadas</p>
          </div>
          <div className="bg-white/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-white">{oficinas.reduce((s, o) => s + o.inscritos, 0)}</p>
            <p className="text-white/70 text-xs mt-1">Total inscritos</p>
          </div>
          <div className="bg-white/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-white">{oficinas.reduce((s, o) => s + o.vagas - o.inscritos, 0)}</p>
            <p className="text-white/70 text-xs mt-1">Vagas disponiveis</p>
          </div>
        </div>

        {/* Oficinas list */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Oficinas publicadas</h2>

          {oficinas.length > 0 ? (
            <div className="flex flex-col gap-3">
              {oficinas.map(oficina => (
                <div
                  key={oficina.id}
                  className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold text-[#003E3A] bg-white/90 px-2 py-0.5 rounded-full">
                          {oficina.categoria}
                        </span>
                      </div>
                      <p className="font-bold text-white text-sm">{oficina.nome}</p>
                      <div className="flex flex-col gap-1 mt-2">
                        <span className="flex items-center gap-1 text-white/60 text-xs">
                          <Calendar size={10} /> {oficina.data}
                        </span>
                        <span className="flex items-center gap-1 text-white/60 text-xs">
                          <MapPin size={10} /> {oficina.local}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-white/80 text-xs mb-1">
                        <Users size={12} />
                        <span className="font-bold text-white text-sm">{oficina.inscritos}</span>
                        <span className="text-white/50">/{oficina.vagas}</span>
                      </div>
                      <span className="text-xs text-white/50">inscritos</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/60 rounded-full transition-all"
                        style={{ width: `${(oficina.inscritos / oficina.vagas) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/60 text-sm">Nenhuma oficina publicada ainda.</p>
              <button
                onClick={() => navigate('publish')}
                className="mt-4 px-4 py-2 bg-white text-[#003E3A] rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
              >
                Publicar primeira oficina
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer accentColor="#4ECDC4" />
    </div>
  );
}
