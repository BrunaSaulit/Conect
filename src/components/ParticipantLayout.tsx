import React, { ReactNode } from 'react';
import ParticipantHeader from './ParticipantHeader';
import SideMenu from './SideMenu';
import Footer from './Footer';

interface ParticipantLayoutProps {
  children: ReactNode;
  bgColor?: string;
  headerSearchColor?: string;
  headerTextColor?: string;
  headerBellColor?: string;
  headerBgColor?: string;
  footerAccentColor?: string;
  showHeaderSearch?: boolean;
}

export default function ParticipantLayout({
  children,
  bgColor = '#F0E4FF',
  headerSearchColor = '#B800D1',
  headerTextColor = '#1a1a1a',
  headerBellColor = '#1a1a1a',
  headerBgColor = 'white',
  footerAccentColor = '#B800D1',
  showHeaderSearch = true,
}: ParticipantLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: bgColor }}>
      <ParticipantHeader
        searchColor={headerSearchColor}
        textColor={headerTextColor}
        bellColor={headerBellColor}
        bgColor={headerBgColor}
        showSearch={showHeaderSearch}
      />
      <div className="flex flex-1 gap-4 p-4 max-w-full overflow-hidden">
        <div className="flex-shrink-0 h-fit sticky top-20">
          <SideMenu />
        </div>
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
      <Footer accentColor={footerAccentColor} />
    </div>
  );
}
