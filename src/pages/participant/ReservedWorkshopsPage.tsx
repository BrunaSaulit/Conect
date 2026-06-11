import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, X } from 'lucide-react';
import ParticipantLayout from '../../components/ParticipantLayout';

const reservedWorkshops = [
  {
    id: 1,
    name: 'Aula de cerâmica',
    image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?w=300',
    date: '15 Jun 2026',
    time: '14:00 – 16:00',
    address: 'Rua das Palmeiras, 142',
    status: 'Confirmado',
    distance: '0.8 km',
  },
  {
    id: 2,
    name: 'Aula de Jardinagem',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?w=300',
    date: '16 Jun 2026',
    time: '09:00 – 11:00',
    address: 'Praça Benedito Calixto',
    status: 'Confirmado',
    distance: '3.2 km',
  },
  {
    id: 3,
    name: 'Aula de Violão',
    image: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?w=300',
    date: '17 Jun 2026',
    time: '19:00 – 21:00',
    address: 'Café da Esquina · Pinheiros',
    status: 'Pendente',
    distance: '1.4 km',
  },
  {
    id: 4,
    name: 'Aula de Escalagem',
    image: 'https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg?w=300',
    date: '20 Jun 2026',
    time: '10:00 – 12:00',
    address: 'Centro de Escalada Vertical',
    status: 'Confirmado',
    distance: '4.5 km',
  },
  {
    id: 5,
    name: 'Grupo de corrida',
    image: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?w=300',
    date: '22 Jun 2026',
    time: '07:00 – 08:30',
    address: 'Parque Ibirapuera',
    status: 'Confirmado',
    distance: '2.1 km',
  },
];

export default function ReservedWorkshopsPage() {
  const [workshops, setWorkshops] = useState(reservedWorkshops);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const confirmCancel = () => {
    if (cancelId) {
      setWorkshops(prev => prev.filter(w => w.id !== cancelId));
      setCancelId(null);
    }
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
      <h2 className="text-2xl font-bold text-[#7A7A00] mb-4">Oficinas reservadas</h2>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Cards grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {workshops.map(w => (
            <div
              key={w.id}
              onClick={() => setSelectedId(w.id === selectedId ? null : w.id)}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer transition-all hover:shadow-md ${
                selectedId === w.id ? 'ring-2 ring-[#B800D1]' : ''
              }`}
            >
              <div className="relative h-32">
                <img src={w.image} alt={w.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 right-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    w.status === 'Confirmado' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-gray-800'
                  }`}>
                    {w.status}
                  </span>
                </div>
              </div>

              <div className="p-3">
                <p className="font-bold text-[#7A7A00] text-sm">{w.name}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Clock size={10} />
                  <span>{w.date} · {w.time}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                  <MapPin size={10} />
                  <span className="line-clamp-1">{w.address}</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs px-2 py-0.5 bg-[#D8D688]/30 rounded-full text-[#7A7A00] font-medium border border-[#A19F62]/30">
                    Oficina reservada
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); setCancelId(w.id); }}
                    className="text-xs text-red-400 hover:text-red-600 hover:underline font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ))}

          {workshops.length === 0 && (
            <div className="col-span-2 text-center py-16 text-gray-400">
              <CheckCircle size={48} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">Nenhuma oficina reservada</p>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="lg:w-96 rounded-2xl overflow-hidden shadow-xl relative bg-[#e8e0d0] min-h-80">
          <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="#e8e0d0" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#fff" strokeWidth="8" />
            <line x1="120" y1="0" x2="120" y2="400" stroke="#fff" strokeWidth="6" />
            <line x1="280" y1="0" x2="280" y2="400" stroke="#fff" strokeWidth="6" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="#fff" strokeWidth="4" />
            <line x1="0" y1="300" x2="400" y2="300" stroke="#fff" strokeWidth="4" />
            <rect x="15" y="15" width="80" height="65" rx="5" fill="#c8c0b0" />
            <rect x="140" y="15" width="110" height="65" rx="5" fill="#d0c8b8" />
            <rect x="295" y="15" width="90" height="65" rx="5" fill="#c8c0b0" />
            <rect x="15" y="115" width="80" height="65" rx="5" fill="#d4ccbc" />
            <rect x="140" y="115" width="120" height="65" rx="5" fill="#c8c0b0" />
            <rect x="295" y="115" width="90" height="65" rx="5" fill="#d0c8b8" />
            <rect x="15" y="215" width="80" height="65" rx="5" fill="#c8c0b0" />
            <rect x="140" y="215" width="110" height="65" rx="5" fill="#d4ccbc" />
            <rect x="295" y="215" width="90" height="65" rx="5" fill="#c8c0b0" />
            <rect x="195" y="120" width="60" height="50" rx="6" fill="#b8d4a0" />
            {/* Markers for each workshop */}
            <circle cx="200" cy="200" r="16" fill="#B800D1" stroke="white" strokeWidth="3" />
            <text x="200" y="206" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">O</text>
            <circle cx="100" cy="290" r="12" fill="#5432FF" stroke="white" strokeWidth="2" />
            <circle cx="340" cy="150" r="12" fill="#22c55e" stroke="white" strokeWidth="2" />
          </svg>

          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white rounded-xl px-3 py-1.5 shadow-lg text-xs">
            <p className="font-bold text-gray-800">Workshop de Argila</p>
            <p className="text-gray-500">0,8 km · 5/8 vagas</p>
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center font-bold text-gray-700">+</button>
            <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center font-bold text-gray-700">−</button>
          </div>
        </div>
      </div>

      {/* Cancel confirm */}
      {cancelId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
          onClick={() => setCancelId(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-gray-800 text-lg">Cancelar reserva?</h3>
              <button onClick={() => setCancelId(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Tem certeza que deseja cancelar sua reserva em{' '}
              <strong>{workshops.find(w => w.id === cancelId)?.name}</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50"
              >
                Manter
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
              >
                Cancelar reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </ParticipantLayout>
  );
}
