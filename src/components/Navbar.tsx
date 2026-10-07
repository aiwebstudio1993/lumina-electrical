import React, { useState } from 'react';
import { Lightbulb, Menu, X } from 'lucide-react';

type Page = 'home' | 'work' | 'services' | 'contact' | 'book';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Work' },
  { id: 'contact', label: 'Contact & FAQs' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [open, setOpen] = useState(false);

  const go = (page: Page) => {
    setOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050403]/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <button onClick={() => go('home')} className="flex items-center gap-3 text-left cursor-pointer" id="navbar-logo-btn">
          <span className="w-9 h-9 rounded-full border border-amber-200/30 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-amber-200" />
          </span>
          <span>
            <span className="block font-display text-2xl leading-none text-white font-medium">
              Lumina <span className="text-amber-200 italic">Electrical</span>
            </span>
            <span className="block text-[9px] tracking-[0.3em] uppercase text-zinc-500 mt-1">Electrical Contractors</span>
          </span>
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`text-sm tracking-wide transition-colors cursor-pointer relative py-1 ${
                  active ? 'text-amber-200' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                {active && <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-amber-200/70" />}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go('book')}
            className={`hidden sm:inline-flex px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all cursor-pointer ${
              currentPage === 'book'
                ? 'bg-[#f3e6cf] text-black'
                : 'border border-amber-200/40 text-amber-100 hover:bg-[#f3e6cf] hover:text-black'
            }`}
          >
            Book a Survey
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 text-zinc-300 hover:text-white cursor-pointer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-white/5 bg-[#050403] px-6 pb-6 pt-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`block w-full text-left py-3 font-display text-2xl border-b border-white/5 cursor-pointer ${
                currentPage === item.id ? 'text-amber-200' : 'text-zinc-200'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go('book')}
            className="mt-5 w-full bg-[#f3e6cf] text-black py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer"
          >
            Book a Free Survey
          </button>
        </nav>
      )}
    </header>
  );
};
