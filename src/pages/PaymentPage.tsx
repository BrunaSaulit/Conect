import React, { useState } from 'react';
import { CreditCard, Smartphone, CheckCircle, XCircle, Loader2, ArrowLeft, Mail } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import ConniCartao from '../assets/Conni_cartão.png';

type PaymentMethod = 'credit' | 'debit' | 'pix' | 'paypal' | 'other' | null;
type PaymentStep = 'method' | 'details' | 'processing' | 'success' | 'error';

const STEPS = ['Forma de pagamento', 'Detalhes do pagamento', 'Confirmação'];

function StepBar({ step }: { step: PaymentStep }) {
  const idx = step === 'method' ? 0 : step === 'details' || step === 'processing' ? 1 : 2;
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <Logo size="sm" />
      <div className="flex items-center gap-2 md:gap-6">
        {STEPS.map((label, i) => (
          <React.Fragment key={i}>
            <span className={`text-xs md:text-sm font-medium transition-colors ${
              i === idx ? 'text-[#f97316] font-bold' : i < idx ? 'text-gray-400 line-through' : 'text-gray-300'
            }`}>
              {label}
            </span>
            {i < 2 && <span className="text-gray-200 text-sm hidden md:block">—</span>}
          </React.Fragment>
        ))}
      </div>
    </header>
  );
}

export default function PaymentPage() {
  const { navigate, pendingEmail, setPendingEmail, selectedPlan, setPlanFrom, addPlanToHistory, pendingUserType } = useNavigation();
  const { markPaid } = useAuth();

  const [step, setStep] = useState<PaymentStep>('method');
  const [method, setMethod] = useState<PaymentMethod>(null);

  // Email field for payment
  const [paymentEmail, setPaymentEmail] = useState(pendingEmail || '');

  // Card fields
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  // Pix fields
  const [pixKey, setPixKey] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (v: string) => {
    return v.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').substring(0, 4);
    if (digits.length > 2) return digits.substring(0, 2) + '/' + digits.substring(2);
    return digits;
  };

  const validateEmail = (v: string) => {
    if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Informe um e-mail válido.';
    return '';
  };

  const validateCard = () => {
    const errs: Record<string, string> = {};
    const emailValidation = validateEmail(paymentEmail);
    if (emailValidation) errs.paymentEmail = emailValidation;
    if (!cardName.trim()) errs.cardName = 'Nome obrigatório';
    if (cardNumber.replace(/\s/g, '').length < 16) errs.cardNumber = 'Número inválido';
    if (cardExpiry.length < 5) errs.cardExpiry = 'Data inválida';
    if (cardCvv.length < 3) errs.cardCvv = 'CVV inválido';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePix = () => {
    const errs: Record<string, string> = {};
    const emailValidation = validateEmail(paymentEmail);
    if (emailValidation) errs.paymentEmail = emailValidation;
    if (!pixKey.trim()) errs.pixKey = 'Chave Pix obrigatória';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateOther = () => {
    const errs: Record<string, string> = {};
    const emailValidation = validateEmail(paymentEmail);
    if (emailValidation) errs.paymentEmail = emailValidation;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePay = () => {
    if (method === 'credit' || method === 'debit') {
      if (!validateCard()) return;
    } else if (method === 'pix') {
      if (!validatePix()) return;
    } else {
      if (!validateOther()) return;
    }

    setPendingEmail(paymentEmail.trim());

    setStep('processing');
    setTimeout(() => {
      const success = !cardNumber.startsWith('0');
      if (success) {
        markPaid(paymentEmail.trim(), pendingUserType || undefined);
        if (selectedPlan) {
          const parts = selectedPlan.split(' – ');
          addPlanToHistory(parts[0] || selectedPlan, parts[2] || '');
        }
        setStep('success');
      } else {
        setStep('error');
      }
    }, 2000);
  };

  const methodOptions = [
    { id: 'credit' as PaymentMethod, label: 'Cartão de Crédito', icon: <CreditCard size={22} /> },
    { id: 'debit' as PaymentMethod, label: 'Cartão de Débito', icon: <CreditCard size={22} /> },
    { id: 'pix' as PaymentMethod, label: 'Pix', icon: <Smartphone size={22} /> },
    {
      id: 'paypal' as PaymentMethod, label: 'PayPal', icon: (
        <span className="font-black text-blue-600 text-sm italic">PayPal</span>
      )
    },
    { id: 'other' as PaymentMethod, label: 'Outros', icon: <span className="text-lg font-bold text-gray-500">+</span> },
  ];

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <StepBar step="success" />
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col justify-center p-10">
            <h2 className="text-3xl font-black text-gray-800 mb-2">
              {method === 'credit' || method === 'debit' ? 'Débito/Crédito' : method === 'pix' ? 'Pix' : 'PayPal'}
            </h2>
            <p className="text-gray-500 text-sm">E-mail: <strong>{paymentEmail}</strong></p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-10 rounded-bl-[80px] animate-fade-in" style={{ background: '#22c55e' }}>
            <h3 className="text-2xl font-black text-white mb-6">Pagamento bem sucedido!</h3>
            <CheckCircle size={80} className="text-white mb-6" strokeWidth={1.5} />
            <p className="text-white/90 text-center font-medium leading-relaxed max-w-xs">
              Obrigado por utilizar o nosso serviço! Cadastre-se usando o e-mail <strong>{paymentEmail}</strong> para acessar o sistema.
            </p>
            <button
              onClick={() => { setPlanFrom(null); navigate('register'); }}
              className="mt-8 px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-colors"
            >
              Cadastrar
            </button>
          </div>
        </div>
        <Footer accentColor="#22c55e" />
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <StepBar step="error" />
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col justify-center p-10">
            <h2 className="text-3xl font-black text-gray-800 mb-2">
              {method === 'credit' || method === 'debit' ? 'Débito/Crédito' : method === 'pix' ? 'Pix' : 'PayPal'}
            </h2>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-10 rounded-bl-[80px] animate-fade-in" style={{ background: '#ef4444' }}>
            <h3 className="text-2xl font-black text-white mb-6">Ops... Ocorreu um erro no pagamento</h3>
            <XCircle size={80} className="text-white mb-6" strokeWidth={1.5} />
            <p className="text-white/90 text-center font-medium leading-relaxed max-w-xs">
              Verifique seu cartão, seus dados cadastrais e tente novamente.
            </p>
            <button
              onClick={() => { setStep('details'); setErrors({}); }}
              className="mt-8 px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
        <Footer accentColor="#ef4444" />
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <StepBar step="processing" />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 size={48} className="animate-spin text-[#B800D1]" />
          <p className="font-semibold text-gray-700">Processando pagamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StepBar step={step} />

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        {step === 'method' && (
          <div className="animate-fade-in lg:flex lg:items-start lg:gap-10">
            <div className="flex-1 lg:max-w-xl">
              <h2 className="text-3xl font-black text-[#f97316] mb-2">Selecione um método de pagamento</h2>
              {selectedPlan && (
                <p className="text-gray-500 text-sm mb-6">Plano selecionado: <strong>{selectedPlan}</strong></p>
              )}

              <div className="flex flex-col gap-3 max-w-md">
              {methodOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setMethod(opt.id)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all font-medium ${
                    method === opt.id
                      ? 'border-[#f97316] bg-orange-50 text-gray-800'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <span className="text-gray-500">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => navigate('plans')}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft size={16} />
                Voltar
              </button>
              <button
                onClick={() => method && setStep('details')}
                disabled={!method}
                className="px-8 py-3 bg-[#f97316] text-white rounded-full font-bold hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-1/2 items-center justify-center rounded-3xl overflow-hidden bg-white p-6 shadow-lg mt-10 lg:mt-16">
            <img src={ConniCartao} alt="Conni cartão" className="w-full max-w-lg object-contain" />
          </div>
        </div>
        )}

        {step === 'details' && (
          <div className="animate-fade-in max-w-md">
            <h2 className="text-3xl font-black text-[#f97316] mb-6 capitalize">
              {method === 'credit' ? 'Crédito' : method === 'debit' ? 'Débito' : method === 'pix' ? 'Pix' : method === 'paypal' ? 'PayPal' : 'Outros'}
            </h2>

            {/* Email field — always shown */}
            <div className="mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  E-mail para acesso <span className="text-red-500">*</span>
                </label>
                <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2.5 transition-colors focus-within:border-[#f97316] ${errors.paymentEmail ? 'border-red-400' : 'border-gray-200'}`}>
                  <Mail size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="email"
                    value={paymentEmail}
                    onChange={e => { setPaymentEmail(e.target.value); setErrors(p => ({...p, paymentEmail: ''})); }}
                    placeholder="Este e-mail será usado para cadastro e login"
                    className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
                  />
                </div>
                {errors.paymentEmail && <p className="text-red-500 text-xs mt-1">{errors.paymentEmail}</p>}
                <p className="text-gray-400 text-xs mt-1">Use este e-mail para se cadastrar e fazer login após o pagamento.</p>
              </div>
            </div>

            {(method === 'credit' || method === 'debit') && (
              <div className="flex flex-col gap-4">
                {method === 'credit' && (
                  <div className="flex gap-2 mb-2">
                    {['Débito', 'Crédito'].map(t => (
                      <button key={t} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${t === 'Crédito' ? 'bg-[#f97316] text-white' : 'bg-gray-100 text-gray-600'}`}>{t}</button>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome no cartão</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={e => { setCardName(e.target.value); setErrors(p => ({...p, cardName: ''})); }}
                    placeholder="Nome completo"
                    className={`w-full border-2 rounded-xl px-3 py-2.5 outline-none text-sm focus:border-[#f97316] ${errors.cardName ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Número do cartão</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => { setCardNumber(formatCardNumber(e.target.value)); setErrors(p => ({...p, cardNumber: ''})); }}
                    placeholder="0000 0000 0000 0000"
                    className={`w-full border-2 rounded-xl px-3 py-2.5 outline-none text-sm font-mono focus:border-[#f97316] ${errors.cardNumber ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Data de validade</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => { setCardExpiry(formatExpiry(e.target.value)); setErrors(p => ({...p, cardExpiry: ''})); }}
                      placeholder="MM/AA"
                      className={`w-full border-2 rounded-xl px-3 py-2.5 outline-none text-sm focus:border-[#f97316] ${errors.cardExpiry ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={e => { setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4)); setErrors(p => ({...p, cardCvv: ''})); }}
                      placeholder="123"
                      className={`w-full border-2 rounded-xl px-3 py-2.5 outline-none text-sm focus:border-[#f97316] ${errors.cardCvv ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input type="checkbox" checked={saveCard} onChange={e => setSaveCard(e.target.checked)} className="accent-[#f97316]" />
                  Salvar cartão
                </label>
              </div>
            )}

            {method === 'pix' && (
              <div className="flex flex-col gap-4">
                <div className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-dashed border-gray-200">
                  <div className="w-32 h-32 bg-gray-200 rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <span className="text-gray-400 text-xs font-mono">QR Code</span>
                  </div>
                  <p className="text-sm text-gray-500">Escaneie o QR Code ou use a chave Pix abaixo</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Chave Pix</label>
                  <input
                    type="text"
                    value={pixKey}
                    onChange={e => { setPixKey(e.target.value); setErrors(p => ({...p, pixKey: ''})); }}
                    placeholder="CPF, e-mail, telefone ou chave aleatória"
                    className={`w-full border-2 rounded-xl px-3 py-2.5 outline-none text-sm focus:border-[#f97316] ${errors.pixKey ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {errors.pixKey && <p className="text-red-500 text-xs mt-1">{errors.pixKey}</p>}
                </div>
              </div>
            )}

            {method === 'paypal' && (
              <div className="flex flex-col gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                  <span className="font-black text-blue-600 text-2xl italic">PayPal</span>
                  <p className="text-sm text-blue-600/70 mt-2">Você será redirecionado para o PayPal para concluir o pagamento.</p>
                </div>
              </div>
            )}

            {method === 'other' && (
              <div className="flex flex-col gap-4">
                <p className="text-gray-500 text-sm">Selecione outra forma de pagamento:</p>
                {['Boleto Bancário', 'Transferência Bancária', 'Vale Presente'].map(opt => (
                  <button key={opt} className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:border-[#f97316] hover:text-[#f97316] transition-colors text-sm font-medium">
                    + {opt}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep('method')}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft size={16} />
                Voltar
              </button>
              <button
                onClick={handlePay}
                className="flex-1 py-3 bg-[#f97316] text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
              >
                Pagar Agora
              </button>
            </div>
            <button
              onClick={() => navigate('plans')}
              className="w-full mt-2 py-3 border-2 border-gray-200 text-gray-600 rounded-full font-medium hover:border-gray-400 transition-colors text-sm"
            >
              Cancelar Pagamento
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
