import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // 3D depth coordinate
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  alpha: number;
  hue: number;
  brightness: number;
  decay: number;
  originalX: number;
  originalY: number;
}

export const GoldSparksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Re-calculate sizes on window resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Spark generation parameters
    const particleCount = 120;
    const particles: Particle[] = [];

    const createParticle = (initRandom = false): Particle => {
      const x = Math.random() * width;
      const y = initRandom ? Math.random() * height : height + 20; // Float up from bottom or random initially
      const z = Math.random() * 2 + 0.1; // z factor for 3D depth (0.1 to 2.1)
      return {
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 0.7 + 0.3) / z, // float faster if closer (z is small)
        vz: (Math.random() - 0.5) * 0.01,
        radius: (Math.random() * 1.5 + 0.5) * (1 / z), // perspective sizing
        alpha: Math.random() * 0.6 + 0.2,
        hue: Math.random() * 10 + 36, // gold / amber range (around 36-46 hue)
        brightness: Math.random() * 20 + 50,
        decay: Math.random() * 0.001 + 0.0005,
        originalX: x,
        originalY: y,
      };
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Create a background gradient for depth
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a0a0a');
      bgGrad.addColorStop(1, '#020202');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render glowing paths / connections for tech vibe
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.02)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gravitate particles slightly towards mouse if active
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            const force = (220 - dist) / 220;
            // Magnetic gold pulse pull
            p.vx += (dx / dist) * force * 0.15;
            p.vy += (dy / dist) * force * 0.15;
          }
        }

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Limit z depth
        if (p.z < 0.1) p.z = 0.1;
        if (p.z > 3) p.z = 3;

        // Apply friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Sine wave drift
        p.x += Math.sin(p.y * 0.01 + p.z) * 0.15;

        // Decay alpha slowly
        p.alpha -= p.decay;

        // Perspective scaling
        const scale = 1 / p.z;
        const radius = p.radius * scale;

        // Re-generate if particle fades out or goes off screen
        if (p.alpha <= 0 || p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle(false);
          continue;
        }

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        
        // Glow gradient
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        glow.addColorStop(0, `rgba(212, 175, 55, ${p.alpha * 1.5})`);
        glow.addColorStop(0.3, `rgba(255, 215, 0, ${p.alpha * 0.6})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = glow;
        ctx.fill();

        // Core bright point
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();

        // Draw connections with nearby particles to simulate electricity circuit nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.06 * Math.min(p.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto bg-[#030303]"
      id="gold-sparks-canvas"
    />
  );
};
