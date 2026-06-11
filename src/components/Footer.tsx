import React from 'react';
import Logo from './Logo';
import { Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  accentColor?: string;
}

export default function Footer({ accentColor = '#B800D1' }: FooterProps) {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Logo size="md" variant="white" />
            <p className="mt-3 text-gray-400 text-sm italic">"Conexões reais começam aqui"</p>
            <div
              className="mt-4 h-1 w-16 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </div>

          {/* Explorar */}
          <div>
            <h4 className="font-bold text-sm tracking-widest text-white mb-4">EXPLORAR</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Mapa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vídeos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categoria</a></li>
            </ul>
          </div>

          {/* Comunidade */}
          <div>
            <h4 className="font-bold text-sm tracking-widest text-white mb-4">COMUNIDADE</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Trabalhe conosco</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Criar Clube</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Diretrizes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-bold text-sm tracking-widest text-white mb-4">REDES SOCIAIS</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">© 2026 Conect. Todos os direitos reservados.</p>
          <div
            className="h-0.5 w-32 rounded-full hidden md:block"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>
    </footer>
  );
}
