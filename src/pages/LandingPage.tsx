import React, { useState, useRef } from 'react';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';
import VideoModal from '../components/VideoModal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import {
  ChevronLeft, ChevronRight, Play, MapPin, Users,
  Music, Palette, Dumbbell, Leaf, ChefHat, Wine,
  Bike, PersonStanding, Waves, Scissors, Mountain, Camera,
} from 'lucide-react';
import conniImg from '../assets/Conni_fotografo.png';

const categories = [
  { icon: <Music size={28} />, label: 'Violão' },
  { icon: <Palette size={28} />, label: 'Pintura' },
  { icon: <PersonStanding size={28} />, label: 'Dança' },
  { icon: <Leaf size={28} />, label: 'Jardinagem' },
  { icon: <ChefHat size={28} />, label: 'Culinária' },
  { icon: <Wine size={28} />, label: 'Cerâmica' },
  { icon: <Dumbbell size={28} />, label: 'Corrida' },
  { icon: <Bike size={28} />, label: 'Ciclismo' },
  { icon: <Waves size={28} />, label: 'Natação' },
  { icon: <Scissors size={28} />, label: 'Artesanato' },
  { icon: <Mountain size={28} />, label: 'Escalada' },
  { icon: <Camera size={28} />, label: 'Fotografia' },
];

const tutorialVideos = [
  { id: 1, category: 'MÚSICA', title: '3 acordes para qualquer música', duration: '4:32', thumbnail: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?w=400' },
  { id: 2, category: 'CERÂMICA', title: 'O segredo do ponto do barro', duration: '6:15', thumbnail: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?w=400' },
  { id: 3, category: 'ESCALADA', title: 'Como não cansar os braços', duration: '3:48', thumbnail: 'https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg?w=400' },
  { id: 4, category: 'JARDINAGEM', title: 'Horta em apartamento pequeno', duration: '5:20', thumbnail: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?w=400' },
  { id: 5, category: 'CORRIDA', title: 'Técnica de respiração para correr', duration: '4:05', thumbnail: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?w=400' },
];

const nearbyActivities = [
  { name: 'Corrida', distance: '1.2 km', spots: '8 vagas', image: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?w=300' },
  { name: 'Cerâmica', distance: '2.3 km', spots: '5 vagas', image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?w=300' },
  { name: 'Violão', distance: '0.8 km', spots: '3 vagas', image: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?w=300' },
  { name: 'Natação', distance: '3.1 km', spots: '12 vagas', image: 'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?w=300' },
];

function RealisticMap() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl h-72 relative" style={{ background: '#f2efe9' }}>
      <svg viewBox="0 0 900 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ background: '#f2efe9' }}>
        {/* Water/park areas */}
        <rect x="340" y="80" width="160" height="100" rx="12" fill="#c8e6c9" />
        <ellipse cx="700" cy="220" rx="80" ry="50" fill="#bbdefb" opacity="0.6" />
        <rect x="50" y="200" width="120" height="80" rx="8" fill="#c8e6c9" opacity="0.8" />

        {/* Main roads (arterial) */}
        <line x1="0" y1="150" x2="900" y2="150" stroke="#ffffff" strokeWidth="10" />
        <line x1="0" y1="148" x2="900" y2="148" stroke="#e8e0d0" strokeWidth="1" />
        <line x1="450" y1="0" x2="450" y2="300" stroke="#ffffff" strokeWidth="10" />
        <line x1="448" y1="0" x2="448" y2="300" stroke="#e8e0d0" strokeWidth="1" />

        {/* Secondary roads */}
        <line x1="200" y1="0" x2="200" y2="300" stroke="#ffffff" strokeWidth="6" />
        <line x1="680" y1="0" x2="680" y2="300" stroke="#ffffff" strokeWidth="6" />
        <line x1="0" y1="60" x2="900" y2="60" stroke="#ffffff" strokeWidth="5" />
        <line x1="0" y1="240" x2="900" y2="240" stroke="#ffffff" strokeWidth="5" />
        <line x1="340" y1="0" x2="340" y2="300" stroke="#ffffff" strokeWidth="4" />

        {/* Tertiary roads */}
        <line x1="100" y1="0" x2="100" y2="300" stroke="#ffffff" strokeWidth="3" />
        <line x1="560" y1="0" x2="560" y2="300" stroke="#ffffff" strokeWidth="3" />
        <line x1="790" y1="0" x2="790" y2="300" stroke="#ffffff" strokeWidth="3" />
        <line x1="0" y1="105" x2="900" y2="105" stroke="#ffffff" strokeWidth="3" />
        <line x1="0" y1="195" x2="900" y2="195" stroke="#ffffff" strokeWidth="3" />

        {/* Diagonal road */}
        <line x1="0" y1="300" x2="900" y2="0" stroke="#ffffff" strokeWidth="4" opacity="0.5" />

        {/* Road labels */}
        <text x="465" y="25" fontSize="8" fill="#888" fontFamily="sans-serif">Av. Principal</text>
        <text x="10" y="145" fontSize="8" fill="#888" fontFamily="sans-serif">Rua das Palmeiras</text>
        <text x="700" y="145" fontSize="8" fill="#888" fontFamily="sans-serif">Rua da Paz</text>

        {/* Buildings blocks */}
        <rect x="15" y="15" width="70" height="38" rx="4" fill="#ddd8d0" />
        <rect x="95" y="15" width="90" height="38" rx="4" fill="#d8d4cc" />
        <rect x="15" y="70" width="55" height="28" rx="4" fill="#e0dcd4" />
        <rect x="80" y="70" width="105" height="28" rx="4" fill="#ddd8d0" />
        <rect x="215" y="15" width="115" height="38" rx="4" fill="#d8d4cc" />
        <rect x="215" y="70" width="115" height="28" rx="4" fill="#e0dcd4" />
        <rect x="355" y="15" width="80" height="58" rx="4" fill="#ddd8d0" />
        <rect x="465" y="15" width="75" height="38" rx="4" fill="#d8d4cc" />
        <rect x="575" y="15" width="90" height="38" rx="4" fill="#ddd8d0" />
        <rect x="575" y="70" width="90" height="28" rx="4" fill="#d8d4cc" />
        <rect x="695" y="15" width="80" height="38" rx="4" fill="#e0dcd4" />
        <rect x="695" y="70" width="80" height="28" rx="4" fill="#ddd8d0" />
        <rect x="805" y="15" width="80" height="80" rx="4" fill="#d8d4cc" />
        <rect x="15" y="160" width="70" height="28" rx="4" fill="#ddd8d0" />
        <rect x="95" y="160" width="90" height="28" rx="4" fill="#e0dcd4" />
        <rect x="215" y="160" width="115" height="28" rx="4" fill="#d8d4cc" />
        <rect x="15" y="250" width="120" height="45" rx="4" fill="#ddd8d0" />
        <rect x="215" y="250" width="115" height="45" rx="4" fill="#d8d4cc" />
        <rect x="465" y="160" width="75" height="28" rx="4" fill="#ddd8d0" />
        <rect x="575" y="160" width="90" height="28" rx="4" fill="#d8d4cc" />
        <rect x="695" y="160" width="80" height="28" rx="4" fill="#e0dcd4" />
        <rect x="805" y="160" width="80" height="28" rx="4" fill="#ddd8d0" />
        <rect x="465" y="250" width="75" height="45" rx="4" fill="#d8d4cc" />
        <rect x="695" y="260" width="80" height="35" rx="4" fill="#ddd8d0" />
        <rect x="805" y="250" width="80" height="45" rx="4" fill="#d8d4cc" />

        {/* Activity markers */}
        <g transform="translate(450, 150)">
          <circle r="18" fill="#B800D1" stroke="white" strokeWidth="3" />
          <text y="5" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">●</text>
        </g>
        <g transform="translate(200, 105)">
          <circle r="13" fill="#5432FF" stroke="white" strokeWidth="2.5" />
          <text y="4" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">●</text>
        </g>
        <g transform="translate(680, 60)">
          <circle r="13" fill="#22c55e" stroke="white" strokeWidth="2.5" />
          <text y="4" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">●</text>
        </g>
        <g transform="translate(340, 240)">
          <circle r="13" fill="#f59e0b" stroke="white" strokeWidth="2.5" />
          <text y="4" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">●</text>
        </g>

        {/* Compass */}
        <g transform="translate(860, 20)">
          <circle r="14" fill="white" stroke="#ccc" strokeWidth="1" />
          <text y="-2" textAnchor="middle" fontSize="7" fill="#666" fontWeight="bold">N</text>
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#ccc" strokeWidth="0.5" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#ccc" strokeWidth="0.5" />
        </g>
      </svg>

      {/* Tooltip */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white rounded-xl px-3 py-1.5 shadow-lg text-xs border border-gray-100">
        <p className="font-bold text-gray-800">Workshop de Argila</p>
        <p className="text-gray-500">2,3 km · 12 vagas disponíveis</p>
      </div>

      {/* Map controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-1">
        <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 border border-gray-200">+</button>
        <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 border border-gray-200">−</button>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-1 right-2 text-gray-300 text-[9px]">© OpenStreetMap</div>
    </div>
  );
}

export default function LandingPage() {
  const { user, logout } = useAuth();
  const { navigate, setPlanFrom, setReturnPage } = useNavigation();
  const [activeVideo, setActiveVideo] = useState<(typeof tutorialVideos)[0] | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleExplorar = () => {
    if (!user) {
      setReturnPage('participant-classes');
      navigate('login');
    } else if (user.type === 'participante') {
      navigate('participant-classes');
    } else {
      // Empresa user — logout and redirect to login with message
      logout();
      setReturnPage('participant-classes');
      navigate('login');
    }
  };

  const handleDivulgar = () => {
    if (!user) {
      setReturnPage('publish');
      navigate('login');
    } else if (user.type === 'empresa') {
      navigate('publish');
    } else {
      navigate('publish');
    }
  };

  const handlePlans = () => {
    setPlanFrom('landing');
    navigate('plans');
  };

  const scrollCarousel = (dir: number) => {
    carouselRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-hidden">
      <LandingHeader />

      {/* HERO */}
      <section
        id="hero"
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ef05f7 0%, #530755 60%, #000 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between gap-8 pt-16">
          <div className="flex-1 animate-slide-in-left">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-white">
              DESCUBRA SEU<br />Hobbie
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-md">
              Conecte-se a pessoas através de oficinas, hobbies e atividades presenciais próximas de você.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleExplorar}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-purple-300 hover:scale-105 transition-all duration-200 shadow-xl"
              >
                <MapPin size={18} />
                Explorar oficinas
              </button>
              <button
                onClick={handleDivulgar}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-purple-300 hover:scale-105 transition-all duration-200 shadow-xl"
              >
                <Users size={18} />
                Divulgar meu negócio
              </button>
            </div>

          </div>

          <div className="hidden md:flex flex-shrink-0 animate-slide-in-right">
            <img src={conniImg} alt="Conni mascote" className="w-72 lg:w-96 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Categorias</h2>
            <p className="text-gray-500">Descubra oficinas para explorar novos hobbies.</p>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollCarousel(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>

            <div ref={carouselRef} className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-2">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer w-24"
                >
                  <div className="text-[#B800D1]">{cat.icon}</div>
                  <span className="text-xs font-semibold text-gray-700 text-center">{cat.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollCarousel(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* TUTORIAIS CURTOS */}
      <section
        id="videos"
        className="py-16"
        style={{ background: 'rgba(224, 132, 255, 0.5)', backdropFilter: 'blur(50px)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">Tutoriais Curtos</h2>
              <p className="text-gray-600">Experimente novos hobbies através de vídeos rápidos.</p>
            </div>
            <button className="text-sm font-semibold text-[#B800D1] hover:underline hidden md:block">VER TODOS</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              className="md:col-span-1 lg:col-span-1 row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setActiveVideo(tutorialVideos[1])}
            >
              <img src={tutorialVideos[1].thumbnail} alt={tutorialVideos[1].title} className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={20} className="text-[#B800D1] ml-1" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold text-[#B800D1] bg-white/90 px-2 py-0.5 rounded-full">{tutorialVideos[1].category}</span>
                <p className="text-white font-bold mt-1 text-lg">{tutorialVideos[1].title}</p>
                <p className="text-white/70 text-xs mt-0.5">{tutorialVideos[1].duration}</p>
              </div>
            </div>

            {tutorialVideos.filter((_, i) => i !== 1).map(video => (
              <div
                key={video.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition-shadow"
                onClick={() => setActiveVideo(video)}
              >
                <img src={video.thumbnail} alt={video.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={14} className="text-[#B800D1] ml-0.5" />
                </div>
                <div className="absolute bottom-2 left-3 right-3">
                  <span className="text-[9px] font-bold text-[#B800D1] bg-white/90 px-1.5 py-0.5 rounded-full">{video.category}</span>
                  <p className="text-white font-semibold text-xs mt-0.5 line-clamp-1">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERTO DE VOCÊ */}
      <section id="explorar" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-black mb-1">Perto de você</h2>
            <p className="text-gray-600">Atividades presenciais acontecendo no seu bairro</p>
          </div>

          <RealisticMap />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {nearbyActivities.map((act, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div className="relative h-32">
                  <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white font-bold text-sm">{act.name}</p>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <MapPin size={10} /><span>{act.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <Users size={10} /><span>{act.spots}</span>
                  </div>
                  <button
                    onClick={handleExplorar}
                    className="w-full py-1.5 text-xs font-semibold bg-[#B800D1] text-white rounded-full hover:opacity-90 transition-opacity"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section
        id="como-funciona"
        className="py-16"
        style={{ background: 'rgba(224, 132, 255, 0.5)', backdropFilter: 'blur(50px)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Como funciona</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-3xl p-8 shadow-xl text-white animate-slide-up" style={{ background: 'rgba(84, 50, 255, 0.66)', backdropFilter: 'blur(34px)' }}>
              <div className="text-7xl font-black mb-4 opacity-20">1</div>
              <h3 className="text-xl font-bold mb-3">Escolha seu hobby</h3>
              <p className="text-white/80 text-sm leading-relaxed">Navegue por categorias e descubra vídeos curtos para se inspirar.</p>
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><circle cx="17.5" cy="17.5" r="3.5" /><line x1="21" y1="21" x2="19.5" y2="19.5" /></svg>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-8 shadow-xl text-white animate-slide-up" style={{ background: 'rgba(224, 132, 255, 0.5)', backdropFilter: 'blur(50px)', animationDelay: '0.1s' }}>
              <div className="text-7xl font-black mb-4 opacity-20 text-gray-800">2</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Filtre no mapa</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Ajuste distância e tamanho do grupo para achar atividades que combinam com você.</p>
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-8 shadow-xl text-white animate-slide-up" style={{ background: 'rgba(255, 132, 224, 0.47)', backdropFilter: 'blur(47px)', animationDelay: '0.2s' }}>
              <div className="text-7xl font-black mb-4 opacity-20 text-gray-800">3</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Apareça e pratique</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Confirme presença, conheça pessoas reais e mergulhe no que você ama.</p>
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handlePlans}
              className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Clique aqui e escolha o melhor plano para você
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {activeVideo && (
        <VideoModal
          title={activeVideo.title}
          thumbnail={activeVideo.thumbnail}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
