import React, { useState } from 'react';
import { useConni } from '../contexts/ConniContext';
import ConniImg from '../assets/Conni_acenando.png';

export default function ConniButton() {
  const { isOpen, setIsOpen } = useConni();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      {showTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <div className="bg-white text-gray-900 px-3 py-2 rounded-full shadow-md transform transition-all duration-200 opacity-95">
            Fale com o Conni 👋
          </div>
        </div>
      )}

      <button
        aria-label="Abrir chat Conni"
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={() => {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 2000);
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-white shadow-lg overflow-hidden border-2 border-orange-400 flex items-center justify-center transition-transform hover:scale-110"
      >
        <img src={ConniImg} alt="Conni" className="w-full h-full object-cover" />
      </button>
    </>
  );
}
