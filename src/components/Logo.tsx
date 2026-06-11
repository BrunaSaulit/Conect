import React from 'react';
import logoConect from '../assets/logo.png';
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' };

  return (
    <div className={`flex items-center gap-1.5 font-black ${sizes[size]}`}>
      <img
              src={logoConect}
              alt="logo conect"
              className="relative z-10 w-32 md:w-40 object-contain"
            />
    </div>
  );
}
