import React, { useState, useRef, useEffect } from 'react';
import { Sliders, CheckCircle, AlertTriangle } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col gap-4">
      <div 
        ref={containerRef}
        className="relative w-full h-[450px] rounded-xl overflow-hidden select-none border border-amber-500/20 shadow-2xl bg-zinc-950 cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        id="before-after-slider-container"
      >
        {/* BEFORE IMAGE / SECTION (Right Side Layer) */}
        <div className="absolute inset-0 w-full h-full bg-[#111] flex flex-col justify-center items-center p-8 text-center">
          <div className="absolute inset-0 bg-radial-gradient from-red-950/10 to-transparent pointer-events-none" />
          
          {/* Mock Messy Grid System */}
          <div className="absolute inset-0 opacity-15 flex flex-wrap gap-2 p-4 overflow-hidden pointer-events-none">
            {Array.from({ length: 60 }).map((_, i) => (
              <div 
                key={i} 
                className="h-1.5 bg-red-500/80 rounded" 
                style={{ 
                  width: `${Math.random() * 80 + 30}px`,
                  transform: `rotate(${Math.random() * 30 - 15}deg) translateY(${Math.random() * 20}px)`,
                }} 
              />
            ))}
          </div>

          <div className="z-10 max-w-md bg-black/60 backdrop-blur-md p-6 rounded-lg border border-red-900/30">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/40 text-red-400 border border-red-900/40 rounded-full text-xs font-mono mb-3 uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" /> Hazardous Legacy System
            </div>
            <h4 className="text-xl font-bold font-display text-zinc-300 mb-2">Unregulated Fire Hazard</h4>
            <p className="text-sm text-zinc-400">
              Corroded fuse board, overloaded circuit terminals, unlabelled copper, and tangled wiring. A severe shock risk with no RCD safety breakers.
            </p>
          </div>
        </div>

        {/* AFTER IMAGE / SECTION (Left Side Layer - Scaled by sliderPosition) */}
        <div 
          className="absolute inset-0 h-full overflow-hidden transition-shadow"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Inner container must keep the full width to avoid squishing content */}
          <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] flex flex-col justify-center items-center p-8 text-center" style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}>
            <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 to-transparent pointer-events-none" />
            
            {/* Mock Perfectly Clean Gold Conduit System */}
            <div className="absolute inset-0 opacity-20 flex flex-col justify-around p-8 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center w-full">
                  <div className="h-0.5 bg-gradient-to-r from-amber-500/50 to-amber-300/20 w-3/4 rounded shadow-[0_0_8px_#f59e0b]" />
                  <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
                </div>
              ))}
            </div>

            <div className="z-10 max-w-md bg-black/85 backdrop-blur-md p-6 rounded-lg border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/40 text-amber-400 border border-amber-500/40 rounded-full text-xs font-mono mb-3 uppercase tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Certified Premium Hub
              </div>
              <h4 className="text-xl font-bold font-display text-white mb-2">JB Precision Upgrade</h4>
              <p className="text-sm text-zinc-400">
                Sleek modern metallic distribution board. Integrated surge protection (SPD), RCBO safety switches, perfectly braided labeled copper conduit channels, and active status display.
              </p>
            </div>
          </div>
        </div>

        {/* SLIDER DIVIDER BAR */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 cursor-ew-resize z-20 shadow-[0_0_15px_#f59e0b]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Drag Handle Indicator */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-amber-500 flex items-center justify-center shadow-lg text-amber-500 hover:text-white hover:bg-amber-500 transition-colors">
            <Sliders className="w-4 h-4" />
          </div>
          
          {/* Glowing node labels */}
          <span className="absolute top-4 right-3 px-2 py-0.5 bg-black/80 text-amber-400 border border-amber-500/30 text-[9px] font-mono rounded select-none pointer-events-none tracking-widest uppercase">
            AFTER
          </span>
          <span className="absolute top-4 left-3 px-2 py-0.5 bg-black/80 text-red-400 border border-red-500/30 text-[9px] font-mono rounded select-none pointer-events-none tracking-widest uppercase transform -translate-x-full">
            BEFORE
          </span>
        </div>
      </div>
      
      <div className="flex justify-between text-xs font-mono text-zinc-500 px-1">
        <span>◀ Drag left to reveal raw hazard</span>
        <span>Drag right to inspect perfection ▶</span>
      </div>
    </div>
  );
};
