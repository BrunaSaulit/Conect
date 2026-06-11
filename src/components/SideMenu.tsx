import React, { useState } from 'react';
import {
  Home,
  PlaySquare,
  Monitor,
  Users,
  CreditCard,
  List,
  HeadphonesIcon,
  LogOut,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Megaphone,
} from 'lucide-react';
import { useNavigation, Page } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';

function ParticipanteMenu({ collapsed, presenciaisOpen, setPresenciaisOpen }: {
  collapsed: boolean;
  presenciaisOpen: boolean;
  setPresenciaisOpen: (v: boolean) => void;
}) {
  const { currentPage, navigate, setPlanFrom } = useNavigation();

  const isActive = (pages: Page[]) => pages.includes(currentPage);

  const MenuItem = ({
    icon,
    label,
    pages,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    pages?: Page[];
    onClick?: () => void;
  }) => {
    const active = pages ? isActive(pages) : false;
    return (
      <button
        onClick={onClick || (() => pages && navigate(pages[0]))}
        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-150 group ${
          active
            ? 'bg-white/20 text-white font-semibold'
            : 'text-white/70 hover:bg-white/15 hover:text-white'
        }`}
      >
        <span className="flex-shrink-0 opacity-80 group-hover:opacity-100">{icon}</span>
        {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
      </button>
    );
  };

  return (
    <>
      <MenuItem icon={<PlaySquare size={18} />} label="Aulas gravadas" pages={['participant-classes']} />
      <MenuItem icon={<Monitor size={18} />} label="Aulas ao vivo" pages={['participant-live']} />

      <button
        onClick={() => !collapsed && setPresenciaisOpen(!presenciaisOpen)}
        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-150 ${
          isActive(['participant-reservations', 'participant-reserved', 'participant-calendar'])
            ? 'bg-white/20 text-white font-semibold'
            : 'text-white/70 hover:bg-white/15 hover:text-white'
        }`}
      >
        <Users size={18} className="flex-shrink-0 opacity-80" />
        {!collapsed && (
          <>
            <span className="text-sm font-medium flex-1 text-left">Encontros presenciais</span>
            {presenciaisOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </>
        )}
      </button>

      {presenciaisOpen && !collapsed && (
        <div className="flex flex-col gap-0.5 ml-2">
          {[
            { label: 'Reserva de Oficinas', page: 'participant-reservations' as Page },
            { label: 'Oficinas Reservadas', page: 'participant-reserved' as Page },
            { label: 'Calendario', page: 'participant-calendar' as Page },
          ].map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`flex items-center gap-2 pl-8 pr-3 py-2 rounded-xl text-sm transition-all ${
                currentPage === page
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <MenuItem
        icon={<CreditCard size={18} />}
        label="Pagamentos"
        pages={['participant-payments']}
        onClick={() => navigate('participant-payments')}
      />
      <MenuItem
        icon={<List size={18} />}
        label="Alterar plano"
        pages={['plans']}
        onClick={() => { setPlanFrom('sidebar'); navigate('plans'); }}
      />
    </>
  );
}

function EmpresaMenu({ collapsed }: { collapsed: boolean }) {
  const { currentPage, navigate, setPlanFrom } = useNavigation();

  const isActive = (pages: Page[]) => pages.includes(currentPage);

  const MenuItem = ({
    icon,
    label,
    pages,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    pages?: Page[];
    onClick?: () => void;
  }) => {
    const active = pages ? isActive(pages) : false;
    return (
      <button
        onClick={onClick || (() => pages && navigate(pages[0]))}
        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-150 group ${
          active
            ? 'bg-white/20 text-white font-semibold'
            : 'text-white/70 hover:bg-white/15 hover:text-white'
        }`}
      >
        <span className="flex-shrink-0 opacity-80 group-hover:opacity-100">{icon}</span>
        {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
      </button>
    );
  };

  return (
    <>
      <MenuItem
        icon={<Megaphone size={18} />}
        label="Divulgar oficina"
        pages={['publish']}
        onClick={() => navigate('publish')}
      />
      <MenuItem
        icon={<LayoutDashboard size={18} />}
        label="Painel"
        pages={['empresa-dashboard']}
        onClick={() => navigate('empresa-dashboard')}
      />
      <MenuItem
        icon={<List size={18} />}
        label="Alterar plano"
        pages={['plans']}
        onClick={() => { setPlanFrom('sidebar'); navigate('plans'); }}
      />
    </>
  );
}

export default function SideMenu() {
  const { currentPage, navigate } = useNavigation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [presenciaisOpen, setPresenciaisOpen] = useState(false);

  const isEmpresa = user?.type === 'empresa';
  const isSupportActive = currentPage === 'participant-support';

  return (
    <aside
      className={`flex flex-col h-full transition-all duration-300 rounded-2xl relative ${collapsed ? 'w-16' : 'w-56'}`}
      style={{ background: 'rgba(84, 50, 255, 0.85)', backdropFilter: 'blur(34px)' }}
    >
      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
      >
        {collapsed
          ? <PanelLeftOpen size={12} className="text-[#5432FF]" />
          : <PanelLeftClose size={12} className="text-[#5432FF]" />
        }
      </button>

      <nav className="flex flex-col gap-1 p-3 flex-1">
        {/* Inicio — always navigates to landing, never highlighted as active */}
        <button
          onClick={() => navigate('landing')}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/15 hover:text-white transition-all duration-150 group"
        >
          <Home size={18} className="flex-shrink-0 opacity-80 group-hover:opacity-100" />
          {!collapsed && <span className="text-sm font-medium">Inicio</span>}
        </button>

        {isEmpresa ? (
          <EmpresaMenu collapsed={collapsed} />
        ) : (
          <ParticipanteMenu collapsed={collapsed} presenciaisOpen={presenciaisOpen} setPresenciaisOpen={setPresenciaisOpen} />
        )}
      </nav>

      <div className="flex flex-col gap-1 p-3 border-t border-white/10">
        {!isEmpresa && (
          <button
            onClick={() => navigate('participant-support')}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-150 ${
              isSupportActive
                ? 'bg-white/20 text-white font-semibold'
                : 'text-white/70 hover:bg-white/15 hover:text-white'
            }`}
          >
            <HeadphonesIcon size={18} className="flex-shrink-0 opacity-80" />
            {!collapsed && <span className="text-sm font-medium">Suporte</span>}
          </button>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all duration-150"
        >
          <LogOut size={18} className="flex-shrink-0 opacity-80" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
