import React, { useState } from 'react';
import { Home, ArrowLeft, ChevronRight, Check, LayoutDashboard, LogOut } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';

type Step = 1 | 2 | 3 | 4;

const categories = ['Cerâmica', 'Jardinagem', 'Pintura', 'Culinária', 'Música', 'Dança', 'Costura', 'Outros'];

export default function PublishPage() {
  const { navigate } = useNavigation();
  const { logout } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const stepLabels = [
    'Me fale sobre o seu negócio',
    'Categoria e Descrição da Oficina',
    'Data, Endereço e Contato',
  ];

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <Logo size="sm" />
          <button onClick={() => navigate('landing')} className="p-2 rounded-full hover:bg-gray-100">
            <Home size={20} className="text-gray-600" />
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Oficina publicada!</h2>
            <p className="text-gray-500 mb-6">Sua oficina foi enviada para análise e em breve estará disponível.</p>
            <button
              onClick={() => navigate('empresa-dashboard')}
              className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-colors"
            >
              Ver painel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#4ECDC4' }}>
      <header className="flex items-center justify-between px-6 py-4">
        <Logo size="sm" variant="white" />
        <div className="flex items-center gap-2">
          <button onClick={() => { logout(); navigate('landing'); }} className="p-2 rounded-full bg-white/20 hover:bg-red-500/30 transition-colors" title="Logout">
            <LogOut size={20} className="text-white" />
          </button>
          <button onClick={() => navigate('landing')} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <Home size={20} className="text-white" />
          </button>
        </div>
      </header>

      {/* Hero banner */}
      <div className="max-w-4xl mx-auto w-full px-6 py-4">
        <div className="bg-white/20 rounded-3xl p-6 flex items-center gap-6 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-black text-white leading-tight">
              Divulgue seu negócio oferecendo uma{' '}
              <span className="text-[#003E3A]">oficina.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('empresa-dashboard')}
              className="flex items-center gap-2 px-4 py-2 bg-white/30 rounded-xl text-white text-sm font-semibold hover:bg-white/40 transition-colors"
            >
              <LayoutDashboard size={16} />
              Painel
            </button>
            <button
              onClick={() => navigate('landing')}
              className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center text-white hover:bg-white/40 transition-colors flex-shrink-0"
            >
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>

        {/* Form card */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Steps sidebar */}
          <div className="md:w-56 rounded-2xl p-5" style={{ background: 'rgba(0,80,74,0.5)', backdropFilter: 'blur(20px)' }}>
            {stepLabels.map((label, i) => {
              const s = (i + 1) as Step;
              return (
                <div key={i} className={`flex items-center gap-3 mb-6 last:mb-0 cursor-pointer`} onClick={() => s < step && setStep(s)}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 ${
                    s < step ? 'bg-green-400 text-white' : s === step ? 'bg-white text-[#003E3A]' : 'bg-white/20 text-white/50'
                  }`}>
                    {s < step ? <Check size={14} /> : s}
                  </div>
                  <p className={`text-sm font-medium leading-tight ${s === step ? 'text-white font-bold' : 'text-white/60'}`}>
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Step content */}
          <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            {step === 1 && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <h3 className="text-white font-bold text-lg mb-2">Sobre o seu negócio</h3>
                <div>
                  <label className="text-white/80 text-xs mb-1 block">Nome do negócio</label>
                  <input
                    type="text"
                    placeholder="Digite o nome do seu negócio"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none focus:border-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-xs mb-1 block">Seu nome</label>
                  <input
                    type="text"
                    placeholder="Digite o seu nome"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none focus:border-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-xs mb-1 block">Título da Oficina</label>
                  <input
                    type="text"
                    placeholder="Digite o título da oficina"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none focus:border-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-xs mb-1 block">Fale sobre o seu negócio</label>
                  <textarea
                    placeholder="Com o que você trabalha? Qual é o seu objetivo?"
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none focus:border-white text-sm resize-none"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <h3 className="text-white font-bold text-lg mb-2">Categoria e Descrição</h3>
                <div>
                  <label className="text-white/80 text-xs mb-2 block">Categoria</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selectedCategories.includes(cat)
                            ? 'bg-white text-[#003E3A] border-white font-bold'
                            : 'bg-transparent border-white/40 text-white hover:border-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/80 text-xs mb-1 block">Descrição</label>
                  <textarea
                    placeholder="O que os participantes vão aprender? O que precisam levar?"
                    rows={5}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none focus:border-white text-sm resize-none"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <h3 className="text-white font-bold text-lg mb-2">Data, Endereço e Contato</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-white/80 text-xs mb-1 block">Data</label>
                    <input type="text" placeholder="dd/mm/aaaa" className="w-full px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                  </div>
                  <div>
                    <label className="text-white/80 text-xs mb-1 block">Horário</label>
                    <input type="text" placeholder="00:00" className="w-full px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                  </div>
                  <div>
                    <label className="text-white/80 text-xs mb-1 block">Vagas</label>
                    <input type="number" placeholder="ex: 5" className="w-full px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                  </div>
                </div>

                <div>
                  <label className="text-white/80 text-xs mb-2 block">Endereço</label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <input type="text" placeholder="Estado" className="px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                    <input type="text" placeholder="Bairro" className="px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                    <input type="text" placeholder="CEP" className="px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="Cidade" className="px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                    <input type="text" placeholder="Rua" className="px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                    <input type="text" placeholder="Nº" className="px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                  </div>
                </div>

                <div>
                  <label className="text-white/80 text-xs mb-2 block">Meio de Contato</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="email" placeholder="E-mail" className="px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                    <input type="tel" placeholder="(51) 99999-9999" className="px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                    <input type="text" placeholder="WhatsApp" className="px-2 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/40 outline-none text-xs" />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
                  <input type="checkbox" className="accent-white w-3.5 h-3.5" />
                  Confirmo que esta oficina será gratuita para todos os participantes
                </label>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  onClick={() => setStep((step - 1) as Step)}
                  className="px-4 py-2 bg-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  Anterior
                </button>
              )}
              <div className="ml-auto">
                {step < 3 ? (
                  <button
                    onClick={() => setStep((step + 1) as Step)}
                    className="px-5 py-2 bg-white text-[#003E3A] rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors flex items-center gap-1"
                  >
                    Próximo
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmitted(true)}
                    className="px-5 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-900 transition-colors flex items-center gap-1"
                  >
                    Publicar oficina
                    <Check size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer accentColor="#4ECDC4" />
    </div>
  );
}
