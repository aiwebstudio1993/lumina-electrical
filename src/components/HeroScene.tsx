import React from 'react';

// Hero background: a moody photo of a glowing Edison bulb, with a gentle
// flicker on the bulb's glow. Positioned so the bulb stays visible on phones
// and sits to the right of the headline on larger screens.
export function HeroScene() {
  return (
    <div className="lum-photo-layer absolute inset-0 overflow-hidden pointer-events-none bg-black" aria-hidden="true">
      <div className="lum-frame">
        <img
          src="/images/hero-bulb.jpg"
          alt=""
          className="lum-photo object-cover"
          fetchPriority="high"
        />
        <div className="lum-glow" />
      </div>

      {/* Darken the left side so the headline reads clearly */}
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      {/* Fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030303] to-transparent" />
    </div>
  );
}
