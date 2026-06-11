import { useState } from 'react';
import { Check, X, Home } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import ConniDinheiro from '../assets/Conni_dinheiro.png';
import { useNavigation } from '../contexts/NavigationContext';

type UserType = 'participante' | 'empresa';
type Tier = 'introdutorio' | 'basico' | 'popular';
type Billing = 'mensal' | 'anual';
type MonthlyPeriod = 'diaria' | 'mes1' | 'mes3' | 'mes6';
type Period = MonthlyPeriod | 'anual';

const participanteFeatures = {
  introdutorio: [
    { label: 'Acesso a aulas gravadas', included: true },
    { label: 'Acesso a aulas online ao vivo e em grupo', included: false },
    { label: 'Acesso ao mapa para atividades presenciais', included: false },
    { label: 'Acesso ao suporte', included: true },
  ],
  basico: [
    { label: 'Acesso a aulas gravadas', included: true },
    { label: 'Acesso a aulas online ao vivo e em grupo', included: true },
    { label: 'Acesso ao mapa para atividades presenciais', included: false },
    { label: 'Acesso ao suporte', included: false },
  ],
  popular: [
    { label: 'Acesso a aulas gravadas', included: true },
    { label: 'Acesso a aulas online ao vivo e em grupo', included: true },
    { label: 'Acesso ao mapa para atividades presenciais', included: true },
    { label: 'Acesso ao suporte', included: true },
  ],
};

const empresaFeatures = {
  introdutorio: [
    { label: 'Divulgar 1 atividade', included: true },
    { label: 'Divulgar até 2 atividades diferentes', included: false },
    { label: 'Divulgar até 3 atividades diferentes', included: false },
    { label: 'Acesso ao suporte', included: false },
  ],
  basico: [
    { label: 'Divulgar 1 atividade', included: true },
    { label: 'Divulgar até 2 atividades diferentes', included: true },
    { label: 'Divulgar até 3 atividades diferentes', included: false },
    { label: 'Acesso ao suporte', included: false },
  ],
  popular: [
    { label: 'Divulgar 1 atividade', included: true },
    { label: 'Divulgar até 2 atividades diferentes', included: true },
    { label: 'Divulgar até 3 atividades diferentes', included: true },
    { label: 'Acesso ao suporte', included: true },
  ],
};

const prices = {
  participante: {
    mensal: {
      introdutorio: { diaria: '5,90', mes1: '49,90', mes3: '39,90', mes6: '29,90' },
      basico: { diaria: '12,90', mes1: '39,90', mes3: '99,90', mes6: '169,90' },
      popular: { diaria: '9,90', mes1: '199,90', mes3: '169,90', mes6: '149,90' },
    },
    anual: { introdutorio: '149,90', basico: '189,90', popular: '199,90' },
  },
  empresa: {
    mensal: { diaria: '29,90', mes1: '19,90', mes3: '14,90', mes6: '149,90' },
    anual: { introdutorio: '199,90', basico: '149,90', popular: '299,90' },
  },
};

const mensalPeriodOptions: { key: MonthlyPeriod; label: string; unit: string }[] = [
  { key: 'diaria', label: 'Diária', unit: '/dia' },
  { key: 'mes1', label: '1 Mês', unit: '/mês' },
  { key: 'mes3', label: '3 Meses', unit: '/mês' },
  { key: 'mes6', label: '6 Meses', unit: '/mês' },
];

export default function PlansPage() {
  const { navigate, planFrom, previousPage, setSelectedPlan, setPendingUserType } = useNavigation();
  const [userType, setUserType] = useState<UserType>('participante');
  const [tier, setTier] = useState<Tier>('introdutorio');
  const [billing, setBilling] = useState<Billing>('mensal');
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);

  const features = userType === 'participante' ? participanteFeatures[tier] : empresaFeatures[tier];
  const mensalPrices = userType === 'participante'
    ? prices.participante.mensal[tier]
    : prices.empresa.mensal;

  const handleVoltar = () => {
    if (planFrom === 'sidebar' && previousPage) {
      navigate(previousPage);
    } else if (planFrom === 'landing') {
      navigate('landing');
    } else if (previousPage) {
      navigate(previousPage);
    } else {
      navigate('landing');
    }
  };

  const handleProximo = () => {
    if (!selectedPeriod) return;
    const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

    if (billing === 'anual') {
      const anualPrice = prices[userType].anual[tier];
      setSelectedPlan(`${tierLabel} – Anual – R$ ${anualPrice}`);
    } else {
      const period = selectedPeriod as Exclude<Period, 'anual'>;
      const periodLabels = userType === 'empresa'
        ? { diaria: 'Corporativo até 19 colaboradores', mes1: 'Corporativo de 19 a 50 colaboradores', mes3: 'Corporativo acima de 50 colaboradores', mes6: '6 Meses' }
        : { diaria: 'Diária', mes1: '1 Mês', mes3: '3 Meses', mes6: '6 Meses' };
      setSelectedPlan(`${tierLabel} – ${periodLabels[period as keyof typeof periodLabels]} – R$ ${mensalPrices[period]}`);
    }
    setPendingUserType(userType);
    navigate('payment');
  };

  const handleBillingChange = (newBilling: Billing) => {
    setBilling(newBilling);
    setSelectedPeriod(null);
  };

  const handleTierChange = (newTier: Tier) => {
    setTier(newTier);
    if (billing === 'anual') {
      setSelectedPeriod('anual');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <Logo size="sm" />
        <button onClick={() => navigate('landing')} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Home size={20} className="text-gray-600" />
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left: features – ~50% */}
        <div className="flex-1 px-8 md:px-12 py-10 max-w-2xl mx-auto w-full">
          {userType === 'empresa' ? (
            <div className="flex flex-col justify-center h-full items-center">
              <h1 className="text-4xl font-black text-gray-900 mb-6">Seu Plano, Sua escolha</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className={`text-sm font-medium ${billing === 'mensal' ? 'text-gray-900' : 'text-gray-400'}`}>
                  Preço mensal
                </span>
                <button
                  onClick={() => handleBillingChange(billing === 'mensal' ? 'anual' : 'mensal')}
                  className="relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none"
                  style={{ backgroundColor: billing === 'anual' ? '#B800D1' : '#f97316' }}
                >
                  <span
                    className="absolute h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                    style={{ transform: billing === 'anual' ? 'translateX(33px)' : 'translateX(4px)' }}
                  />
                </button>
                <span className={`text-sm font-medium ${billing === 'anual' ? 'text-gray-900' : 'text-gray-400'}`}>
                  Preço anual
                </span>
              </div>

              <div className="flex items-center justify-center w-full">
                <img
                  src={ConniDinheiro}
                  alt="Conni dinheiro"
                  className="w-1/2 md:w-1/2 lg:w-3/5 xl:w-2/3 max-w-[720px] object-contain"
                  style={{ maxHeight: '80vh' }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center h-full">
              <h1 className="text-4xl font-black text-gray-900 mb-8">Seu Plano, Sua escolha</h1>

              {/* Billing toggle */}
              <div className="flex items-center gap-4 mb-6">
                <span className={`text-sm font-medium ${billing === 'mensal' ? 'text-gray-900' : 'text-gray-400'}`}>
                  Preço mensal
                </span>
                <button
                  onClick={() => handleBillingChange(billing === 'mensal' ? 'anual' : 'mensal')}
                  className="relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none"
                  style={{ backgroundColor: billing === 'anual' ? '#B800D1' : '#f97316' }}
                >
                  <span
                    className="absolute h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                    style={{ transform: billing === 'anual' ? 'translateX(33px)' : 'translateX(4px)' }}
                  />
                </button>
                <span className={`text-sm font-medium ${billing === 'anual' ? 'text-gray-900' : 'text-gray-400'}`}>
                  Preço anual
                </span>
              </div>

              {/* Tier selector */}
              <div className="flex gap-2 mb-6">
                {(['introdutorio', 'popular'] as Tier[]).map(t => (
                  <button
                    key={t}
                    onClick={() => handleTierChange(t)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all capitalize ${
                      tier === t ? 'border-gray-800 bg-gray-900 text-white' : 'border-gray-300 text-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {/* Features */}
              <div className="flex flex-col gap-4 mb-8">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                    <span className={`text-sm font-medium ${f.included ? 'text-gray-800' : 'text-gray-400'}`}>{f.label}</span>
                    {f.included
                      ? <Check size={20} className="text-green-500 flex-shrink-0" />
                      : <X size={20} className="text-red-400 flex-shrink-0" />
                    }
                  </div>
                ))}
              </div>

              <button
                onClick={handleVoltar}
                className="self-start px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors"
              >
                Voltar
              </button>
            </div>
          )}
        </div>

        {/* Right: pricing — ~50%, orange background */}
        <div
          className="lg:w-1/2 flex flex-col py-10 px-8"
          style={{ background: 'linear-gradient(160deg, #f97316 0%, #ea580c 100%)' }}
        >
          {/* Type tabs */}
          <div className="flex gap-2 mb-8">
            {(['participante', 'empresa'] as UserType[]).map(t => (
              <button
                key={t}
                onClick={() => setUserType(t)}
                className={`flex-1 py-3 rounded-full text-sm font-bold transition-all capitalize ${
                  userType === t ? 'bg-black text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Price options */}
          <div className="flex flex-col gap-3 flex-1">
            {billing === 'mensal' ? (
              // Mensal: show all period options (with special labels for empresa)
              mensalPeriodOptions.map(({ key, label, unit }) => {
                if (userType === 'empresa') {
                  if (key === 'mes6') {
                    return (
                      <div
                        key={key}
                        className={`flex items-center justify-center px-5 py-6 rounded-2xl bg-white/25 text-white text-center`}
                      >
                        <span className="font-medium text-sm">Preços referentes ao plano mensal. Para outras opções, consulte-nos.</span>
                      </div>
                    );
                  }

                  const empresaLabels: Record<string, string> = {
                    diaria: 'Corporativo até 19 colaboradores',
                    mes1: 'Corporativo de 19 a 50 colaboradores',
                    mes3: 'Corporativo acima de 50 colaboradores',
                  };

                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPeriod(key)}
                      className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${
                        selectedPeriod === key
                          ? 'bg-white shadow-lg scale-[1.02]'
                          : 'bg-white/25 hover:bg-white/40'
                      }`}
                    >
                      <span className={`font-bold text-base ${selectedPeriod === key ? 'text-gray-800' : 'text-white'}`}>
                        {empresaLabels[key] || label}
                      </span>
                      <span className={`font-bold text-lg ${selectedPeriod === key ? 'text-gray-800' : 'text-white'}`}>
                        R$ {mensalPrices[key]}
                      </span>
                    </button>
                  );
                }

                // default participante rendering
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPeriod(key)}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${
                      selectedPeriod === key
                        ? 'bg-white shadow-lg scale-[1.02]'
                        : 'bg-white/25 hover:bg-white/40'
                    }`}
                  >
                    <span className={`font-bold text-base ${selectedPeriod === key ? 'text-gray-800' : 'text-white'}`}>
                      {label}
                    </span>
                    <span className={`font-bold text-lg ${selectedPeriod === key ? 'text-gray-800' : 'text-white'}`}>
                      R$ {mensalPrices[key]}{unit}
                    </span>
                  </button>
                );
              })
            ) : (
              // Anual: show only the single annual price for the selected tier
              <button
                onClick={() => setSelectedPeriod('anual')}
                className={`flex items-center justify-between px-5 py-6 rounded-2xl transition-all ${
                  selectedPeriod === 'anual'
                    ? 'bg-white shadow-lg scale-[1.02]'
                    : 'bg-white/25 hover:bg-white/40'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`font-bold text-lg ${selectedPeriod === 'anual' ? 'text-gray-800' : 'text-white'}`}>
                    Plano Anual
                  </span>
                  
                </div>
                <span className={`font-black text-2xl ${selectedPeriod === 'anual' ? 'text-gray-800' : 'text-white'}`}>
                  R$ {prices[userType].anual[tier]}/ano
                </span>
              </button>
            )}
          </div>

          {!selectedPeriod && (
            <p className="text-white/70 text-xs text-center mt-4">Selecione um plano para continuar</p>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleProximo}
              disabled={!selectedPeriod}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                selectedPeriod
                  ? 'bg-black text-white hover:bg-gray-900 hover:scale-105 cursor-pointer'
                  : 'bg-black/30 text-white/50 cursor-not-allowed'
              }`}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
