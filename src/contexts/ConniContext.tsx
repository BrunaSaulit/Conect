import React, { createContext, useContext, useCallback, useState } from 'react';

export type ChatMessage = {
  id: string;
  sender: 'user' | 'conni';
  text: string;
  timestamp: number;
};

type ConniContextType = {
  isOpen: boolean;
  isMinimized: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  setIsOpen: (open: boolean) => void;
  setIsMinimized: (min: boolean) => void;
  addMessage: (text: string, sender: 'user' | 'conni') => void;
  clearMessages: () => void;
  sendMessage: (text: string, currentPage: string) => Promise<void>;
};

const ConniContext = createContext<ConniContextType | undefined>(undefined);

export const ConniProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((text: string, sender: 'user' | 'conni') => {
    const msg: ChatMessage = { id: `m_${Date.now()}`, sender, text, timestamp: Date.now() };
    setMessages(prev => [...prev, msg]);
  }, []);

  const clearMessages = useCallback(() => setMessages([]), []);

  const generateResponse = (userText: string, currentPage: string) => {
    const lower = userText.toLowerCase();
    // exact short greeting 'oi' should return the full introduction
    if (/^oi[!?.]?$/i.test(lower.trim())) {
      return 'Oi, tudo bem? Eu sou o Conni, em que posso ajudar?';
    }

    if (/(olá|ola|oi conni|e aí|e ai)/i.test(lower)) {
      return 'Oi! 😊 Posso te ajudar com isso. O que você gostaria de saber?';
    }

    if (/como.*(você|voce|cê|tu|ele|ela|Oi conni tudo bem como voce esta)?.*(está|esta)/i.test(lower)) {
      return 'Estou bem, em que posso ajudar?';
    }

    if (/plano|preço|valor|quanto custa|planos?/i.test(lower)) {
      if (/plans|plan|plano/.test(currentPage)) {
        return 'Estamos na tela de planos. Posso te explicar os diferentes planos e preços. Quer que eu mostre as opções?';
      }
      return 'Temos planos para participantes e empresas. Deseja mais detalhes sobre algum plano específico?';
    }

    if (/pagamento|pagar|cartão|boleto/i.test(lower)) {
      return 'Na página de pagamento você pode concluir a compra com cartão. Se quiser, posso te guiar pelo processo.';
    }

    if (/calendário|calendar|reserva|reservar|oficina|workshop/i.test(lower)) {
      return 'No calendário você pode ver eventos e fazer reservas. Posso te orientar a reservar uma oficina.';
    }

    if (/aula ao vivo|aula gravada|aulas?/i.test(lower)) {
      return 'Para aulas ao vivo, entre na aba de Aulas ao Vivo e clique em "Entrar". Aulas gravadas ficam na seção de Gravadas.';
    }

    if (/suporte|ajuda|problema/i.test(lower)) {
      return 'Se precisar de suporte, posso te orientar a abrir um chamado ou mostrar o contato de atendimento.';
    }

    // Default
    return 'Ainda não tenho essa informação específica, mas posso encaminhar sua dúvida ao suporte. Deseja isso?';
  };

  const sendMessage = useCallback(async (text: string, currentPage: string) => {
    addMessage(text, 'user');
    setIsTyping(true);

    const delay = Math.floor(Math.random() * 1000) + 500; // 500-1500ms
    await new Promise(res => setTimeout(res, delay));

    const response = generateResponse(text, currentPage);
    addMessage(response, 'conni');
    setIsTyping(false);
  }, [addMessage]);

  return (
    <ConniContext.Provider value={{ isOpen, isMinimized, messages, isTyping, setIsOpen, setIsMinimized, addMessage, clearMessages, sendMessage }}>
      {children}
    </ConniContext.Provider>
  );
};

export function useConni() {
  const ctx = useContext(ConniContext);
  if (!ctx) throw new Error('useConni must be used within ConniProvider');
  return ctx;
}
