import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, X } from 'lucide-react';
import ParticipantLayout from '../../components/ParticipantLayout';

type ViewMode = 'mes' | 'semana' | 'dia';

interface CalEvent {
  id: number;
  name: string;
  time: string;
  date: string; // YYYY-MM-DD
  color: string;
}

const initialEvents: CalEvent[] = [
  { id: 1, name: 'Aula de Violão', time: '15:00 - 16:00', date: '2026-06-02', color: 'bg-purple-200 text-purple-800' },
  { id: 2, name: 'Corrida', time: '7:00 - 8:00', date: '2026-06-10', color: 'bg-pink-200 text-pink-800' },
  { id: 3, name: 'Aula de Cerâmica', time: '17:00 - 18:00', date: '2026-06-23', color: 'bg-blue-200 text-blue-800' },
];

const DAYS_HEADER = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const [view, setView] = useState<ViewMode>('mes');
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5); // June
  const [events, setEvents] = useState<CalEvent[]>(initialEvents);
  const [addModal, setAddModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [dragEventId, setDragEventId] = useState<number | null>(null);
  const [removeId, setRemoveId] = useState<number | null>(null);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const addEvent = () => {
    if (!newEventName || !newEventDate) return;
    const padMonth = String(month + 1).padStart(2, '0');
    const day = newEventDate.padStart(2, '0');
    setEvents(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newEventName,
        time: newEventTime || '10:00 - 11:00',
        date: `${year}-${padMonth}-${day}`,
        color: ['bg-purple-200 text-purple-800', 'bg-pink-200 text-pink-800', 'bg-blue-200 text-blue-800', 'bg-green-200 text-green-800'][Math.floor(Math.random() * 4)],
      },
    ]);
    setNewEventName('');
    setNewEventTime('');
    setNewEventDate('');
    setAddModal(false);
  };

  const confirmRemove = () => {
    if (removeId) {
      setEvents(prev => prev.filter(e => e.id !== removeId));
      setRemoveId(null);
      setRemoveModal(false);
    }
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const padMonth = String(month + 1).padStart(2, '0');

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${padMonth}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const handleDrop = (e: React.DragEvent, day: number) => {
    e.preventDefault();
    if (dragEventId === null) return;
    const dateStr = `${year}-${padMonth}-${String(day).padStart(2, '0')}`;
    setEvents(prev => prev.map(ev => ev.id === dragEventId ? { ...ev, date: dateStr } : ev));
    setDragEventId(null);
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
      <h2 className="text-2xl font-bold text-[#7A7A00] mb-4">Calendário de Oficinas</h2>

      {/* View mode buttons */}
      <div className="flex gap-2 mb-4">
        {(['mes', 'semana', 'dia'] as ViewMode[]).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all capitalize ${
              view === v
                ? 'bg-[#7A7A00] text-white border-[#7A7A00]'
                : 'bg-white text-gray-600 border-gray-300 hover:border-[#7A7A00]'
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Calendar navigation + actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-1 rounded hover:bg-black/10">
            <ChevronLeft size={18} className="text-[#7A7A00]" />
          </button>
          <h3 className="font-bold text-[#7A7A00]">
            {MONTHS[month]} de {year}
          </h3>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-black/10">
            <ChevronRight size={18} className="text-[#7A7A00]" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setAddModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-xl text-sm font-medium hover:border-[#B800D1] hover:text-[#B800D1] transition-colors"
          >
            <Plus size={14} />
            Adicionar
          </button>
          <button
            onClick={() => setRemoveModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-xl text-sm font-medium hover:border-red-400 hover:text-red-500 transition-colors"
          >
            <Minus size={14} />
            Remover
          </button>
        </div>
      </div>

      {/* Month calendar */}
      {view === 'mes' && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Days header */}
          <div className="grid grid-cols-7">
            {DAYS_HEADER.map(d => (
              <div key={d} className="py-2 text-center text-xs font-bold text-gray-500 border-b border-gray-100">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {/* Empty leading cells */}
            {[...Array(firstDay)].map((_, i) => (
              <div key={`empty-${i}`} className="border-r border-b border-gray-100 h-24 p-1 bg-gray-50/50">
                <span className="text-gray-300 text-xs">
                  {getDaysInMonth(year, month - 1) - firstDay + i + 1}
                </span>
              </div>
            ))}

            {/* Day cells */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const isToday = year === 2026 && month === 5 && day === 10;
              return (
                <div
                  key={day}
                  className="border-r border-b border-gray-100 h-24 p-1 hover:bg-gray-50 transition-colors"
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => handleDrop(e, day)}
                >
                  <span className={`text-xs font-medium inline-block w-5 h-5 flex items-center justify-center rounded-full ${
                    isToday ? 'bg-[#B800D1] text-white' : 'text-gray-700'
                  }`}>
                    {day}
                  </span>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    {dayEvents.map(ev => (
                      <div
                        key={ev.id}
                        draggable
                        onDragStart={() => setDragEventId(ev.id)}
                        className={`${ev.color} text-[9px] px-1 py-0.5 rounded font-medium cursor-grab active:cursor-grabbing truncate`}
                      >
                        {ev.name}
                        <div className="opacity-70 truncate">{ev.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Trailing cells */}
            {[...Array(42 - firstDay - daysInMonth)].map((_, i) => (
              <div key={`trail-${i}`} className="border-r border-b border-gray-100 h-24 p-1 bg-gray-50/50">
                <span className="text-gray-300 text-xs">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Week view */}
      {view === 'semana' && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-4">
          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => {
              const day = 8 + i; // starting from 8th
              const dayEvents = getEventsForDay(day);
              return (
                <div key={i} className="flex flex-col gap-1">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">{DAYS_HEADER[i]}</p>
                    <p className={`text-sm font-bold ${i === 2 ? 'text-[#B800D1]' : 'text-gray-700'}`}>{day}</p>
                  </div>
                  <div className="flex flex-col gap-1 min-h-32">
                    {dayEvents.map(ev => (
                      <div key={ev.id} className={`${ev.color} text-xs p-1 rounded font-medium`}>
                        <p className="truncate">{ev.name}</p>
                        <p className="opacity-70 text-[10px]">{ev.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day view */}
      {view === 'dia' && (
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="font-bold text-gray-800 mb-4">10 de Junho de 2026</h3>
          {['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(hour => {
            const dayEvs = getEventsForDay(10).filter(e => e.time.startsWith(hour.substring(0, 2)));
            return (
              <div key={hour} className="flex gap-3 border-t border-gray-100 py-2 min-h-[48px]">
                <span className="text-xs text-gray-400 w-12 flex-shrink-0 pt-1">{hour}</span>
                <div className="flex-1">
                  {dayEvs.map(ev => (
                    <div key={ev.id} className={`${ev.color} rounded-lg px-2 py-1 text-xs font-medium`}>
                      {ev.name} · {ev.time}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add event modal */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in" onClick={() => setAddModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Adicionar Oficina</h3>
              <button onClick={() => setAddModal(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nome da oficina"
                value={newEventName}
                onChange={e => setNewEventName(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B800D1]"
              />
              <input
                type="text"
                placeholder="Horário (ex: 15:00 - 16:00)"
                value={newEventTime}
                onChange={e => setNewEventTime(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B800D1]"
              />
              <input
                type="number"
                placeholder={`Dia do mês (1-${daysInMonth})`}
                min={1} max={daysInMonth}
                value={newEventDate}
                onChange={e => setNewEventDate(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#B800D1]"
              />
              <p className="text-xs text-gray-400">Arraste o evento para mover no calendário.</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setAddModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Cancelar</button>
              <button onClick={addEvent} className="flex-1 py-2.5 rounded-xl bg-[#B800D1] text-white text-sm font-semibold">Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {/* Remove event modal */}
      {removeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in" onClick={() => setRemoveModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Remover Evento</h3>
              <button onClick={() => setRemoveModal(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            {events.length === 0 ? (
              <p className="text-gray-400 text-sm">Nenhum evento para remover.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {events.map(ev => (
                  <div key={ev.id} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 hover:bg-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{ev.name}</p>
                      <p className="text-xs text-gray-400">{ev.date} · {ev.time}</p>
                    </div>
                    <button
                      onClick={() => { setRemoveId(ev.id); confirmRemove(); }}
                      className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-red-200"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setRemoveModal(false)} className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">Fechar</button>
          </div>
        </div>
      )}
    </ParticipantLayout>
  );
}
