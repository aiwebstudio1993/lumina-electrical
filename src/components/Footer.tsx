import React from 'react';
import { Shield, Phone, Mail, MapPin, Award, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'work' | 'services' | 'contact' | 'book') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#030303] border-t border-zinc-900 pt-16 pb-8 px-6 lg:px-12 relative overflow-hidden shrink-0 z-10">
      {/* Glow node */}
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-md font-display text-white font-medium">
              Lumina <span className="text-amber-500">Electrical</span>
            </h3>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed font-sans">
            Sleek electrical installations, full home rewires, smart home integrations, and priority 24/7 emergency response. Serving residential and commercial clients with gold-standard workmanship.
          </p>
          <div className="flex items-center gap-2 pt-2 text-[10px] text-zinc-600 font-mono">
            <Award className="w-3.5 h-3.5 text-amber-500/70" />
            <span>NICEIC APPROVED CONTRACTOR</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">
            Explore
          </h4>
          <ul className="space-y-2.5 text-xs text-zinc-500">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Home Base
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Services & Rates
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('work')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Our Work Portfolio
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Contact & FAQs
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('book')} className="hover:text-amber-400 transition-colors cursor-pointer font-bold text-amber-500">
                Book Slot Priority
              </button>
            </li>
          </ul>
        </div>

        {/* Credentials / Accreditations */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">
            Safety Badges
          </h4>
          <ul className="space-y-3">
            {[
              "BS 7671 Part P Compliant",
              "City & Guilds Level 3 Tech",
              "NIC EIC Licensed Operator",
              "RECC Registered Installer"
            ].map((cred, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{cred}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info coordinates */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">
            Headquarters
          </h4>
          <ul className="space-y-3.5 text-xs text-zinc-400">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-500" />
              <span className="font-mono">0121 496 0284</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-500" />
              <span className="font-mono">hello@lumina-electrical-staffs.co.uk</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Unit 3, Mercia Court, Tamworth, Staffordshire B79
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-zinc-600 gap-4">
        <div>
          &copy; 2026 Lumina Electrical. All rights reserved.
        </div>
        <div className="flex gap-4">
          <span className="hover:text-amber-400 cursor-pointer">PRIVACY POLICY</span>
          <span>//</span>
          <span className="hover:text-amber-400 cursor-pointer">TERMS OF SERVICE</span>
        </div>
      </div>
    </footer>
  );
};
