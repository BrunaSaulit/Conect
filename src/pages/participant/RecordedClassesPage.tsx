import React, { useState } from 'react';
import { Play, Clock, User, Search, SlidersHorizontal, X } from 'lucide-react';
import ParticipantLayout from '../../components/ParticipantLayout';
import VideoModal from '../../components/VideoModal';

const videos = [
  {
    id: 1,
    title: 'Oficina de Violão',
    subtitle: '3 acordes para qualquer música',
    description: 'Aprenda os acordes fundamentais que te permitem tocar qualquer estilo musical.',
    duration: '4:32',
    teacher: 'João Silva',
    category: 'Música',
    thumbnail: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?w=400',
  },
  {
    id: 2,
    title: 'Oficina de Cerâmica',
    subtitle: 'O segredo do ponto do barro',
    description: 'Descubra a textura ideal do barro para criar peças perfeitas.',
    duration: '6:15',
    teacher: 'Maria Costa',
    category: 'Arte',
    thumbnail: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?w=400',
  },
  {
    id: 3,
    title: 'Teclado para iniciantes',
    subtitle: 'Primeiros passos no piano',
    description: 'Entenda a escala musical e comece a tocar suas primeiras melodias.',
    duration: '7:20',
    teacher: 'Carlos Mendes',
    category: 'Música',
    thumbnail: 'https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?w=400',
  },
  {
    id: 4,
    title: 'Pintura em aquarela',
    subtitle: 'Técnicas básicas de mistura',
    description: 'Aprenda como misturar cores para criar degradês e sombras naturais.',
    duration: '8:45',
    teacher: 'Ana Ferreira',
    category: 'Arte',
    thumbnail: 'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?w=400',
  },
  {
    id: 5,
    title: 'Fotografia urbana',
    subtitle: 'Capturando a cidade',
    description: 'Dicas de composição e iluminação natural para fotos incríveis.',
    duration: '5:55',
    teacher: 'Pedro Alves',
    category: 'Fotografia',
    thumbnail: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?w=400',
  },
  {
    id: 6,
    title: 'Jardinagem em vasos',
    subtitle: 'Horta em apartamento',
    description: 'Como cultivar ervas e vegetais em espaços pequenos com sucesso.',
    duration: '5:20',
    teacher: 'Laura Souza',
    category: 'Natureza',
    thumbnail: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?w=400',
  },
];

const filters = ['Todos', 'Música', 'Arte', 'Fotografia', 'Natureza', 'Esporte'];

export default function RecordedClassesPage() {
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[0] | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = videos.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'Todos' || v.category === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <ParticipantLayout bgColor="rgba(224, 132, 255, 0.15)" showHeaderSearch={false}>
      {/* Search bar - mobile */}
      <div className="flex items-center gap-2 mb-4 md:hidden">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-purple-200 shadow-sm">
          <Search size={16} className="text-[#B800D1]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquise oficinas"
            className="flex-1 outline-none text-sm text-purple-700 placeholder:text-purple-300"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2.5 rounded-xl bg-white border border-purple-200 shadow-sm"
        >
          <SlidersHorizontal size={16} className="text-[#B800D1]" />
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar pb-1">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === f
                ? 'bg-[#B800D1] text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#B800D1] hover:text-[#B800D1]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Desktop search */}
      <div className="hidden md:flex items-center gap-2 mb-5">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-purple-200 shadow-sm w-72">
          <Search size={16} className="text-[#B800D1]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquise oficinas"
            className="flex-1 outline-none text-sm text-purple-700 placeholder:text-purple-300"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Video cards */}
      <div className="flex flex-col gap-4">
        {filtered.map(video => (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4 p-4 cursor-pointer group"
            onClick={() => setActiveVideo(video)}
          >
            <div className="relative flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow">
                  <Play size={12} className="text-[#B800D1] ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-1 right-1 text-[10px] text-white bg-black/60 px-1 rounded">
                {video.duration}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#B800D1] uppercase tracking-wider">{video.category}</span>
              <h3 className="font-bold text-[#5432FF] text-base mt-0.5">{video.title}</h3>
              <p className="text-gray-500 text-sm">{video.subtitle}</p>
              <p className="text-gray-400 text-xs mt-1 line-clamp-1">{video.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><User size={10} />{video.teacher}</span>
                <span className="flex items-center gap-1"><Clock size={10} />{video.duration}</span>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center">
              <button className="w-11 h-11 bg-[#5432FF] rounded-full flex items-center justify-center shadow hover:bg-[#B800D1] transition-colors group-hover:scale-110 transition-transform">
                <Play size={16} className="text-white ml-0.5" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">Nenhum vídeo encontrado</p>
            <p className="text-sm mt-1">Tente outro termo de busca</p>
          </div>
        )}
      </div>

      {activeVideo && (
        <VideoModal
          title={activeVideo.subtitle}
          thumbnail={activeVideo.thumbnail}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </ParticipantLayout>
  );
}
