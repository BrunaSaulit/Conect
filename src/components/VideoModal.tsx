import React, { useEffect } from 'react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  title: string;
  thumbnail: string;
  onClose: () => void;
}

export default function VideoModal({ title, thumbnail, onClose }: VideoModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
        >
          <X size={16} />
        </button>

        {/* Video area */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#B800D1] rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
              <Play size={28} className="text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white font-semibold text-lg">{title}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-900">
          <p className="text-gray-400 text-sm">
            Clique no botão play para assistir ao vídeo. Conteúdo disponível para membros ativos.
          </p>
        </div>
      </div>
    </div>
  );
}
