import React, { useState } from 'react';
import { MapPin, Users, Check, BookmarkCheck, Navigation } from 'lucide-react';
import ParticipantLayout from '../../components/ParticipantLayout';
import { useNavigation } from '../../contexts/NavigationContext';

const workshops = [
  {
    id: 1,
    name: 'Workshop de Argila',
    address: 'Rua das Palmeiras, 142 · Vila Madalena',
    distance: '0.8 km',
    spots: '5/8',
    category: 'Artes',
    image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?w=200',
    date: '15 Jun · 14:00',
    mapX: 300,
    mapY: 200,
  },
  {
    id: 2,
    name: 'Grupo de Corrida Matinal',
    address: 'Parque Ibirapuera · Portão 3',
    distance: '2.1 km',
    spots: '12/15',
    category: 'Esportes',
    image: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?w=200',
    date: '16 Jun · 07:00',
    mapX: 140,
    mapY: 340,
  },
  {
    id: 3,
    name: 'Roda de Violão Acústico',
    address: 'Café da Esquina · Pinheiros',
    distance: '1.4 km',
    spots: '6/10',
    category: 'Música',
    image: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?w=200',
    date: '17 Jun · 19:00',
    mapX: 430,
    mapY: 130,
  },
  {
    id: 4,
    name: 'Mutirão de Horta Urbana',
    address: 'Praça Benedito Calixto',
    distance: '3.2 km',
    spots: '9/20',
    category: 'Natureza',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?w=200',
    date: '18 Jun · 09:00',
    mapX: 200,
    mapY: 400,
  },
];

const suggestions = [
  { title: 'Cerâmica', img: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?w=300', cat: 'CERÂMICA', workshopId: 1 },
  { title: 'Jardinagem', img: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?w=300', cat: 'JARDINAGEM', workshopId: 4 },
  { title: 'Corrida', img: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?w=300', cat: 'CORRIDA', workshopId: 2 },
  { title: 'Violão', img: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?w=300', cat: 'VIOLÃO', workshopId: 3 },
  { title: 'Escalada', img: 'https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg?w=300', cat: 'ESCALADA', workshopId: 2 },
];

const categories = ['Todos', 'Artes', 'Esportes', 'Música', 'Natureza'];

const markerColors: Record<number, string> = {
  1: '#B800D1',
  2: '#22c55e',
  3: '#f59e0b',
  4: '#ef4444',
};

function RealisticMap({ selectedId, onMarkerClick }: { selectedId: number | null; onMarkerClick: (id: number) => void }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative" style={{ background: '#f2efe9' }}>
      <svg viewBox="0 0 600 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ background: '#f2efe9' }}>
        {/* Park / green areas */}
        <rect x="20" y="240" width="100" height="100" rx="10" fill="#c8e6c9" />
        <rect x="440" y="60" width="120" height="80" rx="10" fill="#c8e6c9" />
        <ellipse cx="500" cy="400" rx="70" ry="45" fill="#bbdefb" opacity="0.5" />

        {/* Main roads */}
        <line x1="0" y1="250" x2="600" y2="250" stroke="#ffffff" strokeWidth="10" />
        <line x1="0" y1="248" x2="600" y2="248" stroke="#e0d8cc" strokeWidth="1" />
        <line x1="300" y1="0" x2="300" y2="500" stroke="#ffffff" strokeWidth="10" />
        <line x1="298" y1="0" x2="298" y2="500" stroke="#e0d8cc" strokeWidth="1" />

        {/* Secondary roads */}
        <line x1="140" y1="0" x2="140" y2="500" stroke="#ffffff" strokeWidth="6" />
        <line x1="460" y1="0" x2="460" y2="500" stroke="#ffffff" strokeWidth="6" />
        <line x1="0" y1="120" x2="600" y2="120" stroke="#ffffff" strokeWidth="6" />
        <line x1="0" y1="380" x2="600" y2="380" stroke="#ffffff" strokeWidth="6" />

        {/* Tertiary roads */}
        <line x1="70" y1="0" x2="70" y2="500" stroke="#ffffff" strokeWidth="3" />
        <line x1="220" y1="0" x2="220" y2="500" stroke="#ffffff" strokeWidth="3" />
        <line x1="380" y1="0" x2="380" y2="500" stroke="#ffffff" strokeWidth="3" />
        <line x1="540" y1="0" x2="540" y2="500" stroke="#ffffff" strokeWidth="3" />
        <line x1="0" y1="60" x2="600" y2="60" stroke="#ffffff" strokeWidth="3" />
        <line x1="0" y1="190" x2="600" y2="190" stroke="#ffffff" strokeWidth="3" />
        <line x1="0" y1="320" x2="600" y2="320" stroke="#ffffff" strokeWidth="3" />
        <line x1="0" y1="440" x2="600" y2="440" stroke="#ffffff" strokeWidth="3" />

        {/* Diagonal road */}
        <line x1="0" y1="500" x2="600" y2="0" stroke="#ffffff" strokeWidth="3" opacity="0.4" />

        {/* Road labels */}
        <text x="305" y="18" fontSize="7" fill="#999" fontFamily="sans-serif">Av. Principal</text>
        <text x="5" y="246" fontSize="7" fill="#999" fontFamily="sans-serif">Rua das Palmeiras</text>
        <text x="410" y="246" fontSize="7" fill="#999" fontFamily="sans-serif">Rua da Paz</text>
        <text x="145" y="18" fontSize="6" fill="#999" fontFamily="sans-serif">Rua Augusta</text>
        <text x="5" y="116" fontSize="6" fill="#999" fontFamily="sans-serif">Av. Paulista</text>

        {/* Building blocks - top-left */}
        <rect x="10" y="10" width="50" height="40" rx="4" fill="#ddd8d0" />
        <rect x="80" y="10" width="50" height="40" rx="4" fill="#d8d4cc" />
        <rect x="150" y="10" width="60" height="40" rx="4" fill="#e0dcd4" />
        <rect x="230" y="10" width="60" height="40" rx="4" fill="#ddd8d0" />
        <rect x="10" y="68" width="50" height="40" rx="4" fill="#d8d4cc" />
        <rect x="80" y="68" width="50" height="40" rx="4" fill="#ddd8d0" />
        <rect x="150" y="68" width="60" height="40" rx="4" fill="#ddd8d0" />

        {/* Building blocks - top-right */}
        <rect x="310" y="10" width="60" height="40" rx="4" fill="#ddd8d0" />
        <rect x="390" y="10" width="60" height="40" rx="4" fill="#d8d4cc" />
        <rect x="470" y="10" width="60" height="40" rx="4" fill="#e0dcd4" />
        <rect x="550" y="10" width="40" height="40" rx="4" fill="#ddd8d0" />
        <rect x="310" y="68" width="60" height="40" rx="4" fill="#d8d4cc" />
        <rect x="390" y="68" width="60" height="40" rx="4" fill="#ddd8d0" />

        {/* Building blocks - middle */}
        <rect x="10" y="130" width="50" height="50" rx="4" fill="#ddd8d0" />
        <rect x="80" y="130" width="50" height="50" rx="4" fill="#e0dcd4" />
        <rect x="150" y="130" width="60" height="50" rx="4" fill="#d8d4cc" />
        <rect x="230" y="130" width="60" height="50" rx="4" fill="#ddd8d0" />
        <rect x="310" y="130" width="60" height="50" rx="4" fill="#ddd8d0" />
        <rect x="390" y="130" width="60" height="50" rx="4" fill="#d8d4cc" />
        <rect x="470" y="150" width="60" height="30" rx="4" fill="#e0dcd4" />
        <rect x="550" y="130" width="40" height="50" rx="4" fill="#ddd8d0" />

        {/* Building blocks - bottom-left */}
        <rect x="10" y="260" width="50" height="50" rx="4" fill="#d8d4cc" />
        <rect x="80" y="260" width="50" height="50" rx="4" fill="#ddd8d0" />
        <rect x="150" y="260" width="60" height="50" rx="4" fill="#e0dcd4" />
        <rect x="230" y="260" width="60" height="50" rx="4" fill="#d8d4cc" />
        <rect x="10" y="330" width="50" height="40" rx="4" fill="#ddd8d0" />
        <rect x="80" y="330" width="50" height="40" rx="4" fill="#ddd8d0" />
        <rect x="150" y="330" width="60" height="40" rx="4" fill="#d8d4cc" />
        <rect x="230" y="330" width="60" height="40" rx="4" fill="#e0dcd4" />

        {/* Building blocks - bottom-right */}
        <rect x="310" y="260" width="60" height="50" rx="4" fill="#ddd8d0" />
        <rect x="390" y="260" width="60" height="50" rx="4" fill="#d8d4cc" />
        <rect x="470" y="260" width="60" height="50" rx="4" fill="#ddd8d0" />
        <rect x="550" y="260" width="40" height="50" rx="4" fill="#e0dcd4" />
        <rect x="310" y="330" width="60" height="40" rx="4" fill="#d8d4cc" />
        <rect x="390" y="330" width="60" height="40" rx="4" fill="#ddd8d0" />
        <rect x="470" y="330" width="60" height="40" rx="4" fill="#ddd8d0" />

        {/* Building blocks - far bottom */}
        <rect x="10" y="390" width="50" height="40" rx="4" fill="#d8d4cc" />
        <rect x="80" y="390" width="50" height="40" rx="4" fill="#e0dcd4" />
        <rect x="150" y="390" width="60" height="40" rx="4" fill="#ddd8d0" />
        <rect x="230" y="390" width="60" height="40" rx="4" fill="#d8d4cc" />
        <rect x="310" y="390" width="60" height="40" rx="4" fill="#ddd8d0" />
        <rect x="390" y="390" width="60" height="40" rx="4" fill="#e0dcd4" />
        <rect x="550" y="390" width="40" height="40" rx="4" fill="#d8d4cc" />

        <rect x="10" y="450" width="50" height="40" rx="4" fill="#ddd8d0" />
        <rect x="80" y="450" width="50" height="40" rx="4" fill="#ddd8d0" />
        <rect x="150" y="450" width="60" height="40" rx="4" fill="#d8d4cc" />
        <rect x="310" y="450" width="60" height="40" rx="4" fill="#d8d4cc" />
        <rect x="390" y="450" width="60" height="40" rx="4" fill="#ddd8d0" />
        <rect x="550" y="450" width="40" height="40" rx="4" fill="#ddd8d0" />

        {/* Markers */}
        {workshops.map(w => {
          const isSelected = selectedId === w.id;
          const color = isSelected ? '#B800D1' : markerColors[w.id];
          const r = isSelected ? 18 : 12;
          return (
            <g
              key={w.id}
              transform={`translate(${w.mapX}, ${w.mapY})`}
              className="cursor-pointer"
              onClick={() => onMarkerClick(w.id)}
            >
              {isSelected && (
                <circle r="28" fill={color} opacity="0.15" />
              )}
              <circle r={r} fill={color} stroke="white" strokeWidth={isSelected ? 3 : 2} style={{ filter: isSelected ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none' }} />
              <text y={isSelected ? 5 : 4} textAnchor="middle" fill="white" fontSize={isSelected ? 10 : 8} fontWeight="bold">
                {w.name.charAt(0)}
              </text>
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(570, 20)">
          <circle r="14" fill="white" stroke="#ccc" strokeWidth="1" />
          <text y="-2" textAnchor="middle" fontSize="7" fill="#666" fontWeight="bold">N</text>
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#ccc" strokeWidth="0.5" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#ccc" strokeWidth="0.5" />
        </g>
      </svg>

      {/* Attribution */}
      <div className="absolute bottom-1 right-2 text-gray-300 text-[9px]">© OpenStreetMap</div>
    </div>
  );
}

export default function WorkshopReservationsPage() {
  const { navigate } = useNavigation();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [maxDistance, setMaxDistance] = useState(5);
  const [maxParticipants, setMaxParticipants] = useState(20);
  const [reserved, setReserved] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const filtered = workshops.filter(w => activeCategory === 'Todos' || w.category === activeCategory);

  const handleReserve = (id: number) => {
    setConfirmId(id);
  };

  const confirmReserve = () => {
    if (confirmId) {
      setReserved(prev => [...prev, confirmId]);
      setConfirmId(null);
    }
  };

  const handleSelectWorkshop = (id: number) => {
    setSelectedId(prev => prev === id ? null : id);
  };

  const handleSuggestionClick = (workshopId: number) => {
    setSelectedId(workshopId);
  };

  return (
    <ParticipantLayout
      bgColor="rgba(216, 214, 136, 0.17)"
      headerSearchColor="#A19F62"
      headerTextColor="#1a1a1a"
      headerBellColor="#1a1a1a"
      headerBgColor="rgba(216, 214, 136, 0.3)"
      footerAccentColor="#D8D688"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left panel */}
        <div className="lg:w-80 flex-shrink-0 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#7A7A00]">Reservar oficinas</h2>
            <button
              onClick={() => navigate('participant-reserved')}
              className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-xl border border-[#A19F62]/40 text-xs font-semibold text-[#7A7A00] hover:bg-[#D8D688]/30 transition-colors"
            >
              <BookmarkCheck size={14} />
              Oficinas reservadas
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Categoria</h4>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeCategory === c
                      ? 'bg-[#B800D1] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Distância máxima · <span className="text-[#B800D1] normal-case">{maxDistance} km</span>
            </h4>
            <input
              type="range"
              min={1} max={20} value={maxDistance}
              onChange={e => setMaxDistance(+e.target.value)}
              className="w-full accent-[#B800D1] mb-4"
            />

            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Máx. participantes · <span className="text-[#B800D1] normal-case">{maxParticipants}</span>
            </h4>
            <input
              type="range"
              min={5} max={50} value={maxParticipants}
              onChange={e => setMaxParticipants(+e.target.value)}
              className="w-full accent-[#B800D1]"
            />

            <button className="mt-4 w-full py-2 bg-[#B800D1] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
              Aplicar filtros
            </button>
          </div>

          {/* Workshop list */}
          <div className="flex flex-col gap-2">
            {filtered.map(w => (
              <div
                key={w.id}
                onClick={() => handleSelectWorkshop(w.id)}
                className={`bg-white rounded-2xl p-3 shadow-sm cursor-pointer transition-all ${
                  selectedId === w.id ? 'ring-2 ring-[#B800D1] shadow-md' : 'hover:shadow-md'
                }`}
              >
                <div className="flex gap-3">
                  <img src={w.image} alt={w.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-gray-800 text-sm leading-tight">{w.name}</p>
                      <span className="text-xs text-gray-400 flex-shrink-0">{w.distance}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{w.address}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white" />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        {reserved.includes(w.id) ? (
                          <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                            <Check size={12} /> Reservado
                          </span>
                        ) : (
                          <button
                            onClick={e => { e.stopPropagation(); handleReserve(w.id); }}
                            className="px-3 py-1 bg-[#B800D1] text-white text-xs font-semibold rounded-full hover:opacity-90 transition-opacity"
                          >
                            Reservar
                          </button>
                        )}
                        <span className="text-xs text-gray-500 font-medium">{w.spots} VAGAS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 min-h-[480px] rounded-2xl overflow-hidden shadow-xl relative">
          <RealisticMap selectedId={selectedId} onMarkerClick={handleSelectWorkshop} />

          {/* Tooltip */}
          {selectedId && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-4 py-2.5 shadow-lg text-sm animate-fade-in border border-gray-100">
              <p className="font-bold text-gray-800">{workshops.find(w => w.id === selectedId)?.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-gray-500 text-xs">
                  <Navigation size={10} />
                  {workshops.find(w => w.id === selectedId)?.distance}
                </span>
                <span className="text-gray-500 text-xs">
                  {workshops.find(w => w.id === selectedId)?.spots} vagas
                </span>
                <span className="text-gray-400 text-xs">
                  {workshops.find(w => w.id === selectedId)?.date}
                </span>
              </div>
            </div>
          )}

          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 border border-gray-200">+</button>
            <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 border border-gray-200">−</button>
          </div>

          {selectedId && (
            <button
              onClick={() => reserved.includes(selectedId) ? undefined : handleReserve(selectedId)}
              className="absolute bottom-4 right-4 px-4 py-2 bg-[#B800D1] text-white rounded-xl shadow-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {reserved.includes(selectedId) ? 'Já reservado' : 'Reservar vaga'}
            </button>
          )}
        </div>
      </div>

      {/* Bottom cards - suggestions */}
      <h3 className="font-bold text-gray-700 mt-6 mb-3">Sugestões perto de você</h3>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {suggestions.map((item, i) => (
          <div
            key={i}
            onClick={() => handleSuggestionClick(item.workshopId)}
            className={`flex-shrink-0 w-40 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:-translate-y-1 transition-all relative ${
              selectedId === item.workshopId ? 'ring-2 ring-[#B800D1]' : ''
            }`}
          >
            <img src={item.img} alt={item.title} className="w-full h-24 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
              <MapPin size={10} className="text-[#B800D1]" />
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <span className="text-[9px] font-bold text-[#B800D1] bg-white/90 px-1 rounded">{item.cat}</span>
              <p className="text-white text-xs font-semibold mt-0.5 line-clamp-2">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm modal */}
      {confirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
          onClick={() => setConfirmId(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-bold text-gray-800 text-lg mb-2">Confirmar reserva?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Você está prestes a reservar uma vaga em{' '}
              <strong>{workshops.find(w => w.id === confirmId)?.name}</strong>.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmReserve}
                className="flex-1 py-2.5 rounded-xl bg-[#B800D1] text-white text-sm font-semibold hover:opacity-90"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </ParticipantLayout>
  );
}
