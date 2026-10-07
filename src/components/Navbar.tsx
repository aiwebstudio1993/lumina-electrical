import React from 'react';
import { Shield, Hammer, Briefcase, Calendar, Phone, Activity } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'work' | 'services' | 'contact' | 'book';
  onNavigate: (page: 'home' | 'work' | 'services' | 'contact' | 'book') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Hammer },
    { id: 'services', label: 'Services', icon: Activity },
    { id: 'work', label: 'Our Work', icon: Briefcase },
    { id: 'contact', label: 'Contact & FAQs', icon: Phone },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-amber-500/10 px-6 py-4 flex items-center justify-between transition-all">
      {/* Brand logo */}
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-3 group text-left cursor-pointer"
        id="navbar-logo-btn"
      >
        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center relative shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:border-amber-500 transition-all">
          <Shield className="w-5 h-5 text-amber-500 group-hover:scale-105 transition-transform" />
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-black" />
        </div>
        <div>
          <h1 className="text-lg font-bold font-display tracking-wider text-white uppercase flex items-center gap-1.5 leading-none">
            JB <span className="text-amber-500">Electrics</span>
          </h1>
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block mt-1">
            Certified Gold Standard Code
          </span>
        </div>
      </button>

      {/* Navigation center links */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer relative py-1 ${
                isActive 
                  ? 'text-amber-400' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* CTA Button "Book Now" */}
      <button
        onClick={() => onNavigate('book')}
        className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all ${
          currentPage === 'book'
            ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
            : 'bg-zinc-900 border border-zinc-800 text-amber-400 hover:bg-amber-500 hover:text-black hover:border-transparent hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]'
        }`}
      >
        <Calendar className="w-3.5 h-3.5" />
        Book Now
      </button>
    </header>
  );
};
