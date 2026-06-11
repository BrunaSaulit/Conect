import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Loader2, ArrowLeft, Check } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import conniAcenando from '../assets/Conni_acenando.png';

export default function RegisterPage() {
  const { register, isLoading, isPaidEmail, getPaidUserType } = useAuth();
  const { navigate, pendingEmail } = useNavigation();

  const [userType, setUserType] = useState<'participante' | 'empresa'>('participante');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(pendingEmail || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [confirmErr, setConfirmErr] = useState('');
  const [submitErr, setSubmitErr] = useState('');

  const validate = () => {
    let valid = true;
    if (!name.trim()) { setNameErr('Informe seu nome.'); valid = false; } else setNameErr('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr('Informe um e-mail válido.'); valid = false;
    } else setEmailErr('');
    if (password.length < 6) { setPassErr('A senha deve ter pelo menos 6 caracteres.'); valid = false; } else setPassErr('');
    if (password !== confirmPassword) { setConfirmErr('As senhas não coincidem.'); valid = false; } else setConfirmErr('');
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErr('');
    if (!validate()) return;

    // Verify email matches a paid email
    if (!isPaidEmail(email.trim())) {
      setEmailErr('Este e-mail não foi utilizado em nenhum pagamento. Use o mesmo e-mail informado no pagamento.');
      return;
    }

    // Verify user type matches payment type
    const paidType = getPaidUserType(email.trim());
    if (paidType && paidType !== userType) {
      setSubmitErr(`Este e-mail foi registrado no pagamento como "${paidType}". Selecione o tipo "${paidType}" para se cadastrar.`);
      return;
    }

    const result = await register(name.trim(), email.trim(), password, userType);
    if (result.ok) {
      setSuccess(true);
      setTimeout(() => navigate('login'), 1800);
    } else if (result.reason === 'email_not_paid') {
      setEmailErr('Este e-mail não foi utilizado em nenhum pagamento. Use o mesmo e-mail informado no pagamento.');
    } else {
      setEmailErr('Este e-mail já está cadastrado.');
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
            <img src={conniAcenando} alt="Conni" className="w-64 object-contain drop-shadow-2xl" />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-black text-white mb-3">Junte-se ao Conect!</h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Descubra oficinas, conecte-se com pessoas e explore novos hobbies perto de você.
            </p>
          </div>
        </div>

        {/* Right – Form */}
        <div className="flex-1 bg-white flex flex-col justify-center px-8 py-10 md:px-12">
          <button
            onClick={() => navigate('login')}
            className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Voltar para login
          </button>

          <h1 className="text-3xl font-black text-gray-900 mb-1 text-center">Criar conta</h1>
          <p className="text-gray-500 text-sm text-center mb-6">Preencha os dados para se cadastrar.</p>

          {/* Type tabs */}
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
                <Check size={32} className="text-green-500" />
              </div>
              <p className="font-semibold text-gray-800">Cadastro realizado com sucesso!</p>
              <p className="text-gray-400 text-sm text-center">Redirecionando para login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
                <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2.5 transition-colors focus-within:border-[#B800D1] ${nameErr ? 'border-red-400' : 'border-gray-200'}`}>
                  <User size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value); setNameErr(''); }}
                    placeholder="Digite seu nome"
                    className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
                  />
                </div>
                {nameErr && <p className="text-red-500 text-xs mt-1">{nameErr}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail <span className="text-red-500">*</span></label>
                <p className="text-gray-400 text-xs mb-1">Use o mesmo e-mail informado no pagamento.</p>
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
                    placeholder="Mínimo 6 caracteres"
                    className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passErr && <p className="text-red-500 text-xs mt-1">{passErr}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar Senha</label>
                <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2.5 transition-colors focus-within:border-[#B800D1] ${confirmErr ? 'border-red-400' : 'border-gray-200'}`}>
                  <Lock size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setConfirmErr(''); }}
                    placeholder="Repita sua senha"
                    className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirmErr && <p className="text-red-500 text-xs mt-1">{confirmErr}</p>}
              </div>

              {submitErr && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs">
                  {submitErr}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-900 transition-all disabled:opacity-60 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <><Loader2 size={16} className="animate-spin" />Criando conta...</>
                ) : 'Criar conta'}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-5">
            Já possui conta?{' '}
            <button onClick={() => navigate('login')} className="text-[#B800D1] font-bold hover:underline">
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
