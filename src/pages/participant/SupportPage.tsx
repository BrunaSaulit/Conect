import React, { useState } from 'react';
import { MessageCircle, Phone, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import ParticipantLayout from '../../components/ParticipantLayout';
import conniSuporteImg from '../../assets/Conni_suporte.png';

const faqs = [
  { q: 'Como cancelar uma reserva?', a: 'Vá em Encontros Presenciais > Oficinas Reservadas, encontre a oficina e clique em "Cancelar reserva". Confirme a ação para concluir o cancelamento.' },
  { q: 'Como participar de aulas ao vivo?', a: 'Acesse o menu lateral em "Aulas ao vivo". Você verá as aulas disponíveis no momento. Clique em "Entrar" para participar.' },
  { q: 'Como alterar meus dados?', a: 'Clique no seu nome no canto superior direito e acesse "Meu Perfil". Lá você pode editar seus dados pessoais.' },
  { q: 'Como faço para divulgar minha oficina?', a: 'Na landing page, clique em "Divulgar meu negócio" e preencha o formulário com os dados da sua oficina.' },
  { q: 'Há planos gratuitos disponíveis?', a: 'Sim! Oferecemos um plano introdutório gratuito para participantes que dá acesso a aulas gravadas.' },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <ParticipantLayout bgColor="rgba(224, 132, 255, 0.15)">
      <h2 className="text-2xl font-bold text-[#5432FF] mb-1">Central de ajuda</h2>
      <p className="text-[#5432FF]/70 text-sm mb-6">Entre em contato conosco</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: contact cards */}
        <div className="flex flex-col gap-4 lg:w-64">
          {/* WhatsApp */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <MessageCircle size={28} className="text-green-500" />
            </div>
            <h3 className="font-bold text-gray-800">WhatsApp</h3>
            <p className="text-gray-500 text-xs">Atendimento rápido via WhatsApp em horário comercial</p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors text-center"
            >
              Conversar
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
              <Phone size={28} className="text-blue-500" />
            </div>
            <h3 className="font-bold text-gray-800">Celular</h3>
            <p className="text-blue-600 font-semibold text-sm">(51) 99999-9999</p>
            <p className="text-gray-400 text-xs">Seg–Sex · 9h às 18h</p>
            <button className="w-full py-2.5 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors">
              Ligar
            </button>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center gap-3 text-center mb-4">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <HelpCircle size={28} className="text-[#B800D1]" />
              </div>
              <h3 className="font-bold text-gray-800">FAQ – Perguntas frequentes</h3>
            </div>
            <div className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xs font-medium text-gray-700 flex-1 pr-2">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp size={14} className="text-[#B800D1] flex-shrink-0" />
                      : <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-3 py-2.5 bg-white">
                      <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Conni mascot */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative rounded-3xl overflow-hidden" style={{ background: 'rgba(224, 132, 255, 0)' }}>
            <div className="absolute inset-0 rounded-3xl"  />
            <img
              src={conniSuporteImg}
              alt="Conni suporte"
              className="relative z-10 w-72 md:w-96 object-contain"
            />
          </div>
        </div>
      </div>
    </ParticipantLayout>
  );
}
