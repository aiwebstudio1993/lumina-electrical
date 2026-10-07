import React from 'react';

// A dimly lit room with a single glowing pendant bulb.
// Built in code (no video file) so it loads instantly on every device.
// Motion: slow sway, a gentle filament flicker and drifting dust in the light.

const DUST = [
  [-150, 40, 0, 11], [-90, 140, 2.5, 14], [-40, -20, 5, 12], [20, 180, 1, 16],
  [70, 60, 3.5, 13], [130, 120, 6, 15], [170, 10, 1.8, 12], [-120, 220, 4.2, 17],
  [100, 230, 7, 14], [-60, 90, 8.5, 13], [40, -50, 9.5, 15], [150, 200, 2, 18],
];

export function HeroScene() {
  return (
    <div className="lumina-scene absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dark wall with a warm pool of light */}
      <div className="absolute inset-0 bg-[#050403]" />
      <div className="lumina-pool absolute inset-0" />

      {/* Floor fading into shadow */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Pendant: cord + bulb, swaying gently from the ceiling */}
      <div className="lumina-pendant absolute top-0">
        <div className="lumina-cord" />
        <div className="relative">
          <div className="lumina-halo" />
          <svg viewBox="0 0 100 170" className="lumina-bulb relative" role="presentation">
            <defs>
              <linearGradient id="lumBrass" x1="0" x2="1">
                <stop offset="0" stopColor="#5a4326" />
                <stop offset="0.5" stopColor="#b08a52" />
                <stop offset="1" stopColor="#4a361e" />
              </linearGradient>
              <radialGradient id="lumCore" cx="50%" cy="55%" r="50%">
                <stop offset="0" stopColor="#fff4dc" stopOpacity="0.95" />
                <stop offset="0.45" stopColor="#ffc277" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ff9a3c" stopOpacity="0" />
              </radialGradient>
              <filter id="lumGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Brass lamp holder */}
            <rect x="37" y="0" width="26" height="24" rx="3" fill="url(#lumBrass)" />
            <line x1="37" y1="8" x2="63" y2="8" stroke="#2c2012" strokeWidth="1" />
            <line x1="37" y1="15" x2="63" y2="15" stroke="#2c2012" strokeWidth="1" />

            {/* Glass */}
            <path
              d="M39 24 C39 42 15 54 15 94 C15 130 32 162 50 162 C68 162 85 130 85 94 C85 54 61 42 61 24 Z"
              fill="rgba(255,226,180,0.10)"
              stroke="rgba(255,232,196,0.35)"
              strokeWidth="1"
            />
            <ellipse cx="50" cy="102" rx="30" ry="40" fill="url(#lumCore)" />

            {/* Support wires and glowing filament */}
            <g stroke="#e9c48c" strokeWidth="0.8" opacity="0.7">
              <line x1="46" y1="24" x2="43" y2="86" />
              <line x1="54" y1="24" x2="57" y2="86" />
            </g>
            <path
              d="M43 86 L45 76 L47 86 L49 76 L51 86 L53 76 L55 86 L57 76"
              fill="none"
              stroke="#fff6e0"
              strokeWidth="1.6"
              strokeLinejoin="round"
              filter="url(#lumGlow)"
            />
            {/* Glass highlight */}
            <path d="M27 82 C27 64 34 54 40 48" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Dust drifting through the light */}
      {DUST.map(([x, y, delay, dur], i) => (
        <span
          key={i}
          className="lumina-dust"
          style={{
            left: `calc(var(--bx) + ${x}px)`,
            top: `calc(var(--by) + ${y}px)`,
            animationDelay: `${delay}s`,
            animationDuration: `${dur}s`,
          }}
        />
      ))}

      {/* Vignette so the edges of the room fall into darkness */}
      <div className="lumina-vignette absolute inset-0" />
    </div>
  );
}
