import React, { useState } from 'react';
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, Monitor, Hand, Settings,
  Users, Plus, Play,
} from 'lucide-react';
import ParticipantLayout from '../../components/ParticipantLayout';

const participants = [
  { name: 'Marcos', image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=300' },
  { name: 'Ana', image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=300' },
  { name: 'Lucas', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=300' },
  { name: 'Sofia', image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=300' },
];

const otherClasses = [
  {
    name: 'Cerâmica Criativa',
    teacher: 'Maria Costa',
    time: '15:00',
    participants: 8,
    thumbnail: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?w=300',
  },
  {
    name: 'Fotografia Urbana',
    teacher: 'Pedro Alves',
    time: '16:30',
    participants: 12,
    thumbnail: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?w=300',
  },
  {
    name: 'Jardinagem',
    teacher: 'Laura Souza',
    time: '18:00',
    participants: 5,
    thumbnail: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?w=300',
  },
];

export default function LiveClassesPage() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [elapsed] = useState('12:34');

  return (
    <ParticipantLayout bgColor="rgba(224, 132, 255, 0.29)" footerAccentColor="#B800D1">
      {/* Videocall card */}
      <div
        className="rounded-2xl overflow-hidden shadow-xl mb-6"
        style={{ background: 'rgba(39, 14, 169, 0.74)', backdropFilter: 'blur(74px)' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
            <Users size={14} className="text-white/70" />
            <span className="text-white text-sm">{participants.length}</span>
          </div>
          <button className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-white/70 text-sm hover:bg-white/20 transition-colors">
            <Plus size={14} />
            Convide um participante
          </button>
          <div className="flex items-center gap-2 bg-red-500/80 rounded-full px-3 py-1">
            <span className="w-2 h-2 bg-red-200 rounded-full animate-pulse" />
            <span className="text-white text-sm">{elapsed}</span>
          </div>
        </div>

        {/* Participants grid */}
        <div className="grid grid-cols-2 gap-2 px-4 pb-2">
          {participants.map((p, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-video">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                {p.name}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 px-5 py-4">
          <button
            onClick={() => setMicOn(!micOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              micOn ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-red-500 text-white'
            }`}
          >
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          <button
            onClick={() => setCamOn(!camOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              camOn ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-red-500 text-white'
            }`}
          >
            {camOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
          <button className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg">
            <PhoneOff size={22} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors">
            <Monitor size={20} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Other available classes */}
      <h3 className="font-bold text-gray-700 mb-3">Outras aulas disponíveis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {otherClasses.map((cls, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-28">
              <img src={cls.thumbnail} alt={cls.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                <Play size={10} className="text-[#B800D1] ml-0.5" />
              </div>
              <p className="absolute bottom-2 left-3 text-white font-bold text-sm">{cls.name}</p>
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500">{cls.teacher} · {cls.time}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Users size={10} />{cls.participants} participantes
                </span>
                <button className="px-3 py-1 bg-[#5432FF] text-white text-xs font-semibold rounded-full hover:bg-[#B800D1] transition-colors">
                  Entrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ParticipantLayout>
  );
}
