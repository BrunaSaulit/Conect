import React from 'react';
import { CreditCard, Clock, CheckCircle } from 'lucide-react';
import ParticipantLayout from '../../components/ParticipantLayout';
import { useNavigation } from '../../contexts/NavigationContext';

export default function PaymentsHistoryPage() {
  const { currentPlan, planHistory } = useNavigation();

  return (
    <ParticipantLayout
      bgColor="rgba(216, 214, 136, 0.17)"
      headerSearchColor="#A19F62"
      headerTextColor="#1a1a1a"
      headerBellColor="#1a1a1a"
      headerBgColor="rgba(216, 214, 136, 0.3)"
      footerAccentColor="#D8D688"
    >
      <h2 className="text-2xl font-bold text-[#7A7A00] mb-6">Pagamentos</h2>

      {/* Current plan */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#B800D1]/10 rounded-full flex items-center justify-center">
            <CreditCard size={20} className="text-[#B800D1]" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Plano atual</h3>
        </div>

        {currentPlan ? (
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
            <div>
              <p className="font-bold text-gray-800">{currentPlan.name}</p>
              <p className="text-sm text-gray-500">{currentPlan.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600 text-lg">{currentPlan.price}</p>
              <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <CheckCircle size={12} /> Ativo
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Nenhum plano ativo no momento.</p>
          </div>
        )}
      </div>

      {/* Plan history */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#A19F62]/10 rounded-full flex items-center justify-center">
            <Clock size={20} className="text-[#A19F62]" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Histórico de planos</h3>
        </div>

        {planHistory.length > 0 ? (
          <div className="flex flex-col gap-2">
            {planHistory.map((plan, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  i === planHistory.length - 1
                    ? 'bg-green-50 border-green-100'
                    : 'bg-gray-50 border-gray-100'
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{plan.name}</p>
                  <p className="text-xs text-gray-400">{plan.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-700 text-sm">{plan.price}</p>
                  {i === planHistory.length - 1 ? (
                    <span className="text-xs text-green-600 font-medium">Atual</span>
                  ) : (
                    <span className="text-xs text-gray-400">Expirado</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Nenhum histórico de planos disponível.</p>
          </div>
        )}
      </div>
    </ParticipantLayout>
  );
}
