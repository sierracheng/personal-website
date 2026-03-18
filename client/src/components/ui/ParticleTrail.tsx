import { useRef, useEffect } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  size: number;
  color: string;
}

const COLORS = ['232,180,188', '212,120,156', '200,198,195']; // blush, rose, silver

export function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const count = Math.random() > 0.45 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x:     e.clientX + (Math.random() - 0.5) * 10,
          y:     e.clientY + (Math.random() - 0.5) * 10,
          vx:    (Math.random() - 0.5) * 0.7,
          vy:    -(Math.random() * 1.4 + 0.4),
          life:  1,
          size:  Math.random() * 2.2 + 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles.current) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy -= 0.018; // accelerate upward slightly
        p.vx *= 0.98;
        p.life -= 0.022;

        const alpha = Math.max(0, p.life) * 0.65;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${alpha})`;
        ctx.fill();
      }

      // Prune dead particles
      particles.current = particles.current.filter(p => p.life > 0);

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
