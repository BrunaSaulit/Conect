import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import conniAcenando from '../assets/Conni_acenando.png';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { navigate, returnPage, setPlanFrom, setReturnPage } = useNavigation();

  // If returnPage is participant-classes, user came from "Explorar Oficinas" — force participante mode
  const isParticipantFlow = returnPage === 'participant-classes' || returnPage === 'participant-reservations';
  const [userType, setUserType] = useState<'participante' | 'empresa'>(isParticipantFlow ? 'participante' : 'participante');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [terms, setTerms] = useState(false);
  const [success, setSuccess] = useState(false);

  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [termsErr, setTermsErr] = useState('');
  const [generalErr, setGeneralErr] = useState('');

  const validateEmail = (v: string) => {
    if (!v) return 'Informe um e-mail válido.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Informe um e-mail válido.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralErr('');
    setEmailErr('');
    setPassErr('');
    setTermsErr('');

    const eErr = validateEmail(email);
    const pErr = password ? '' : 'Informe sua senha.';
    if (eErr) setEmailErr(eErr);
    if (pErr) setPassErr(pErr);
    if (!terms) { setTermsErr('Você deve aceitar os termos e condições para continuar.'); }
    if (eErr || pErr || !terms) return;

    const result = await login(email, password, userType);

    if (result.ok) {
      setSuccess(true);
      setTimeout(() => {
        if (userType === 'empresa') {
          navigate('publish');
        } else {
          navigate(returnPage || 'participant-classes');
        }
      }, 800);
    } else {
      switch (result.reason) {
        case 'not_registered':
          setEmailErr('E-mail não encontrado. Por favor, cadastre-se primeiro.');
          break;
        case 'wrong_password':
          setPassErr('Senha incorreta.');
          break;
        case 'not_paid':
          setGeneralErr('Você precisa concluir um plano e realizar o pagamento antes de fazer login.');
          break;
        case 'email_mismatch':
          setEmailErr('O e-mail informado não corresponde ao e-mail utilizado no pagamento. Use o mesmo e-mail do pagamento.');
          break;
        case 'wrong_type':
          setGeneralErr('Este e-mail está cadastrado como ' + (userType === 'empresa' ? 'participante' : 'empresa') + '. Selecione o tipo correto para fazer login.');
          break;
        default:
          setGeneralErr('Não foi possível entrar. Verifique suas credenciais e tente novamente.');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #E084FF 0%, #B800D1 50%, #FFB3E6 100%)' }}
    >
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl flex">

        {/* Left – Institutional */}
        <div
          className="hidden md:flex flex-col items-center justify-between p-10 relative overflow-hidden flex-1"
          style={{ background: 'linear-gradient(160deg, #B800D1 0%, #8A00A0 100%)' }}
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20" style={{ background: '#E084FF' }} />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15" style={{ background: '#5432FF' }} />

          <button onClick={() => navigate('landing')} className="self-start relative z-10">
            <Logo size="sm" variant="white" />
          </button>

          <div className="relative z-10 flex flex-col items-center">
            <img src={conniAcenando} alt="Conni acenando" className="w-72 object-contain drop-shadow-2xl" />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-black text-white mb-3">Bem-vindo de volta!</h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Continue explorando oficinas, descobrindo hobbies e criando novas conexões.
            </p>
          </div>
        </div>

        {/* Right – Form */}
        <div className="flex-1 bg-white flex flex-col justify-center px-8 py-10 md:px-12">
          <button
            onClick={() => navigate('landing')}
            className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-6 transition-colors md:hidden"
          >
            <ArrowLeft size={14} />
            Voltar
          </button>

          <h1 className="text-3xl font-black text-gray-900 mb-1 text-center">Entrar</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Acesse sua conta para continuar.</p>

          {isParticipantFlow && (
            <div className="bg-[#B800D1]/10 border border-[#B800D1]/20 rounded-xl p-3 text-[#B800D1] text-xs leading-relaxed mb-4">
              A funcionalidade "Explorar Oficinas" é exclusiva para participantes. Faça login com uma conta do tipo Participante para continuar.
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-full">
            {(['participante', 'empresa'] as const).map(t => (
              <button
                key={t}
                onClick={() => setUserType(t)}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
                  userType === t ? 'bg-[#B800D1] text-white shadow-md' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {success ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#22c55e" />
                  <polyline points="8,16 13,21 24,11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <p className="font-semibold text-gray-800">Login realizado com sucesso!</p>
              <p className="text-gray-400 text-sm">Redirecionando...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
                <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2.5 transition-colors focus-within:border-[#B800D1] ${emailErr ? 'border-red-400' : 'border-gray-200'}`}>
                  <Mail size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setEmailErr(''); }}
                    placeholder="Digite seu e-mail"
                    className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
                  />
                </div>
                {emailErr && <p className="text-red-500 text-xs mt-1">{emailErr}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
                <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2.5 transition-colors focus-within:border-[#B800D1] ${passErr ? 'border-red-400' : 'border-gray-200'}`}>
                  <Lock size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setPassErr(''); }}
                    placeholder="Digite sua senha"
                    className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passErr && <p className="text-red-500 text-xs mt-1">{passErr}</p>}
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-3.5 h-3.5 accent-[#B800D1]" />
                  <span className="text-gray-600">Manter-me conectado</span>
                </label>
                <button type="button" className="text-[#B800D1] hover:underline font-medium">
                  Esqueceu sua senha?
                </button>
              </div>

              {/* Terms – required */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={e => { setTerms(e.target.checked); setTermsErr(''); }}
                    className="w-3.5 h-3.5 accent-[#B800D1] mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-600">
                    Eu concordo com os <span className="text-[#B800D1] font-medium">termos e condições</span>
                  </span>
                </label>
                {termsErr && <p className="text-red-500 text-xs mt-1">{termsErr}</p>}
              </div>

              {generalErr && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs leading-relaxed">
                  {generalErr}
                  {generalErr.includes('pagamento') && (
                    <button
                      type="button"
                      onClick={() => { setPlanFrom('landing'); navigate('plans'); }}
                      className="block mt-1 text-[#B800D1] font-semibold hover:underline"
                    >
                      Escolher um plano →
                    </button>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-900 transition-all disabled:opacity-60 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <><Loader2 size={16} className="animate-spin" />Entrando...</>
                ) : 'Entrar'}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">ou continue com</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            Ainda não possui uma conta?{' '}
            <button onClick={() => navigate('register')} className="text-[#B800D1] font-bold hover:underline">
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
