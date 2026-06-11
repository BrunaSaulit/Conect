import React, { useEffect, useRef, useState } from 'react';
import { X, Minimize2, Trash2 } from 'lucide-react';
import { useConni } from '../contexts/ConniContext';
import ConniImg from '../assets/Conni_acenando.png';
import { useNavigation } from '../contexts/NavigationContext';

export default function ConniChat() {
  const { isOpen, isMinimized, setIsMinimized, messages, isTyping, setIsOpen, sendMessage, addMessage, clearMessages } = useConni();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { currentPage } = useNavigation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // When chat opens, ensure Conni greets the user once
  useEffect(() => {
    if (!isOpen) return;
    const alreadyGreeted = messages.some(m => m.sender === 'conni' && /sou o conni/i.test(m.text));
    if (!alreadyGreeted) {
      addMessage('Oi, tudo bem? Eu sou o Conni, o chatbot do conect, em que posso ajudar?', 'conni');
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100%-48px)] bg-white rounded-2xl shadow-2xl flex flex-col" role="dialog" aria-label="Conni chat">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-t-2xl">
        <div className="flex items-center gap-3">
          <img src={ConniImg} alt="Conni" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-bold">Conni</div>
            <div className="text-xs">Online agora</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Limpar chat"
            className="p-2 rounded-full hover:bg-orange-600/30"
            onClick={() => clearMessages()}
          >
            <Trash2 size={16} />
          </button>
          <button aria-label="Minimizar" className="p-2 rounded-full hover:bg-orange-600/30" onClick={() => setIsMinimized(!isMinimized)}>
            <Minimize2 size={16} />
          </button>
          <button aria-label="Fechar" className="p-2 rounded-full hover:bg-orange-600/30" onClick={() => setIsOpen(false)}>
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="p-4 overflow-y-auto h-64 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-sm text-gray-500">Oi! 👋 Como posso ajudar?</div>
            )}

            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`${m.sender === 'user' ? 'bg-orange-500 text-white rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl' : 'bg-white border border-gray-200 text-gray-800 rounded-br-2xl rounded-tl-2xl rounded-tr-2xl'} px-4 py-2 max-w-[75%] text-sm whitespace-pre-wrap`}>
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-2">
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-br-2xl">Conni está digitando...</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white rounded-b-2xl border-t border-gray-100">
            <form
              onSubmit={async e => {
                e.preventDefault();
                if (!input.trim()) return;
                await sendMessage(input.trim(), currentPage || '');
                setInput('');
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Digite sua pergunta..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none text-sm"
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    (e.target as HTMLFormElement).dispatchEvent(new Event('submit', { cancelable: true }));
                  }
                }}
              />
              <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-full">Enviar</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
