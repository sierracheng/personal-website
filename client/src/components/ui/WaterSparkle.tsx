import { useRef, useEffect } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface AmbientSparkle {
  x: number; y: number;
  driftX: number; driftY: number;
  dvx: number; dvy: number;
  baseSize: number;
  phase: number;
  speed: number;
  color: string;
  brightness: number;
  layer: 0 | 1 | 2;
}

interface TransientSparkle {
  x: number; y: number;
  size: number; life: number; color: string;
}

interface Ripple {
  x: number; y: number;
  radius: number; maxRadius: number; life: number;
}

interface CausticThread {
  yFrac: number;
  xOffset: number;
  speed: number;
  length: number;
  alpha: number;
  thickness: number;
  wobble: number;
  wobbleSpeed: number;
  wobblePhase: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const SPARKLE_COLORS = [
  '255,220,120',  // warm gold
  '255,235,160',  // pale gold
  '255,255,240',  // warm white
  '255,200,180',  // pale blush
  '220,240,255',  // ice blue
];

const AMBIENT_COUNT = 72;

// size, alpha, drift, mouse-parallax multipliers per depth layer
const LAYER = [
  { sz: 0.6,  al: 0.55, dr: 0.5,  mp: 0.15 }, // far
  { sz: 1.0,  al: 1.0,  dr: 1.0,  mp: 0.45 }, // mid
  { sz: 1.5,  al: 1.3,  dr: 1.6,  mp: 0.9  }, // near
];

// ── Component ──────────────────────────────────────────────────────────────────

export function WaterSparkle() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const ambientRef   = useRef<AmbientSparkle[]>([]);
  const transientRef = useRef<TransientSparkle[]>([]);
  const ripplesRef   = useRef<Ripple[]>([]);
  const causticRef   = useRef<CausticThread[]>([]);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const rafRef       = useRef<number | undefined>(undefined);
  const tRef         = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    // ── Init helpers ──────────────────────────────────────────────────────────

    const initSparkles = () => {
      ambientRef.current = Array.from({ length: AMBIENT_COUNT }, () => {
        const layer = Math.floor(Math.random() * 3) as 0 | 1 | 2;
        return {
          x:         Math.random() * canvas.width,
          y:         Math.random() * canvas.height,
          driftX:    0, driftY: 0,
          dvx:       (Math.random() - 0.5) * 0.014,
          dvy:       (Math.random() - 0.5) * 0.008,
          baseSize:  Math.random() * 1.6 + 0.5,
          phase:     Math.random() * Math.PI * 2,
          speed:     Math.random() * 0.5 + 0.25,
          color:     SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
          brightness: 0,
          layer,
        };
      });
    };

    const initCaustics = () => {
      causticRef.current = Array.from({ length: 6 }, (_, i) => ({
        yFrac:        0.08 + i * 0.15 + Math.random() * 0.05,
        xOffset:      Math.random() * canvas.width,
        speed:        (Math.random() * 0.45 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
        length:       Math.random() * 200 + 120,
        alpha:        Math.random() * 0.045 + 0.018,
        thickness:    Math.random() * 8 + 4,
        wobble:       Math.random() * 14 + 4,
        wobbleSpeed:  Math.random() * 0.38 + 0.14,
        wobblePhase:  Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initSparkles();
      initCaustics();
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Events ────────────────────────────────────────────────────────────────

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const count = Math.random() > 0.5 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        transientRef.current.push({
          x:     e.clientX + (Math.random() - 0.5) * 20,
          y:     e.clientY + (Math.random() - 0.5) * 20,
          size:  Math.random() * 2.4 + 1.0,
          life:  1,
          color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        });
      }
    };

    const onClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX, y: e.clientY,
        radius: 0,
        maxRadius: 180 + Math.random() * 60,
        life: 1,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // ── Draw helpers ──────────────────────────────────────────────────────────

    const drawStar = (
      x: number, y: number, r: number,
      alpha: number, color: string,
      glintRays: boolean,
    ) => {
      ctx.save();
      ctx.translate(x, y);

      // Soft glow halo
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 4.2);
      grd.addColorStop(0, `rgba(${color},${alpha * 0.42})`);
      grd.addColorStop(1, `rgba(${color},0)`);
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(0, 0, r * 4.2, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Cross arms
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `rgba(${color},1)`;
      ctx.lineWidth   = r * 0.48;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.moveTo(-r * 2.3, 0); ctx.lineTo(r * 2.3, 0);
      ctx.moveTo(0, -r * 2.3); ctx.lineTo(0, r * 2.3);
      ctx.stroke();

      // 8-ray glint when very bright
      if (glintRays) {
        ctx.lineWidth   = r * 0.22;
        ctx.strokeStyle = `rgba(${color},${alpha * 0.45})`;
        const rayLen = r * 5.5;
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          const cos = Math.cos(a), sin = Math.sin(a);
          ctx.beginPath();
          ctx.moveTo(cos * r * 2.3, sin * r * 2.3);
          ctx.lineTo(cos * (r * 2.3 + rayLen), sin * (r * 2.3 + rayLen));
          ctx.stroke();
        }
      }

      // Bright center dot
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,1)`;
      ctx.fill();

      ctx.restore();
    };

    const drawColorWash = (t: number) => {
      const blobs = [
        { rx: Math.sin(t * 0.05) * 0.20 + 0.65,      ry: Math.cos(t * 0.04) * 0.15 + 0.50, r: 0.42, c: '232,180,188', a: 0.055 },
        { rx: Math.sin(t * 0.07 + 1.0) * 0.28 + 0.30, ry: Math.cos(t * 0.05 + 2.0) * 0.20 + 0.40, r: 0.38, c: '255,200,120', a: 0.045 },
        { rx: Math.sin(t * 0.04 + 3.0) * 0.24 + 0.20, ry: Math.cos(t * 0.06 + 1.0) * 0.20 + 0.62, r: 0.32, c: '120,200,190', a: 0.040 },
      ];
      for (const b of blobs) {
        const bx = b.rx * canvas.width;
        const by = b.ry * canvas.height;
        const br = b.r * Math.max(canvas.width, canvas.height);
        const g  = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        g.addColorStop(0, `rgba(${b.c},${b.a})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const drawCaustics = (t: number) => {
      for (const th of causticRef.current) {
        th.xOffset += th.speed;
        if (th.speed > 0 && th.xOffset > canvas.width  + th.length) th.xOffset = -th.length;
        if (th.speed < 0 && th.xOffset < -th.length)                 th.xOffset = canvas.width + th.length;

        const y = th.yFrac * canvas.height
          + Math.sin(t * th.wobbleSpeed + th.wobblePhase) * th.wobble;
        const x0 = th.xOffset;
        const x1 = th.xOffset + th.length;

        const grad = ctx.createLinearGradient(x0, y, x1, y);
        grad.addColorStop(0,    `rgba(255,240,180,0)`);
        grad.addColorStop(0.25, `rgba(255,240,180,${th.alpha})`);
        grad.addColorStop(0.75, `rgba(255,240,180,${th.alpha})`);
        grad.addColorStop(1,    `rgba(255,240,180,0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, y - th.thickness / 2, canvas.width, th.thickness);
      }
    };

    const drawRipples = () => {
      for (const rp of ripplesRef.current) {
        rp.radius += (rp.maxRadius - rp.radius) * 0.044;
        rp.life   -= 0.017;
        const alpha = Math.max(0, rp.life) * 0.5;
        if (alpha <= 0) continue;

        ctx.save();
        // Outer ring
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,235,160,${alpha})`;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
        // Inner ring
        if (rp.radius > 18) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,235,160,${alpha * 0.42})`;
          ctx.lineWidth   = 1;
          ctx.stroke();
        }
        ctx.restore();
      }
      ripplesRef.current = ripplesRef.current.filter(rp => rp.life > 0);
    };

    // ── Main loop ─────────────────────────────────────────────────────────────

    const animate = () => {
      tRef.current += 0.016;
      const t  = tRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1 · Color wash
      drawColorWash(t);

      // 2 · Caustic threads
      drawCaustics(t);

      // 3 · Ambient sparkles
      for (const sp of ambientRef.current) {
        const cfg = LAYER[sp.layer];

        // Brownian drift
        sp.dvx += (Math.random() - 0.5) * 0.0012;
        sp.dvy += (Math.random() - 0.5) * 0.0007;
        sp.dvx *= 0.994;
        sp.dvy *= 0.994;
        sp.driftX += sp.dvx * cfg.dr;
        sp.driftY += sp.dvy * cfg.dr;
        if (Math.abs(sp.driftX) > 18) sp.dvx *= -0.5;
        if (Math.abs(sp.driftY) > 10) sp.dvy *= -0.5;

        // Layer parallax offset (mouse)
        const px = mx === -9999 ? 0 : (mx / canvas.width  - 0.5) * -12 * cfg.mp;
        const py = my === -9999 ? 0 : (my / canvas.height - 0.5) * -8  * cfg.mp;

        const drawX = sp.x + sp.driftX + px;
        const drawY = sp.y + sp.driftY + py;

        // Proximity brightness
        const dx   = drawX - mx;
        const dy   = drawY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const target = dist < 120 ? (1 - dist / 120) * 0.9 : 0;
        sp.brightness += (target - sp.brightness) * 0.1;

        const pulse    = (Math.sin(t * sp.speed + sp.phase) + 1) / 2;
        const baseA    = 0.10 + pulse * 0.28;
        const alpha    = Math.min(1, (baseA + sp.brightness * 0.75) * cfg.al);
        const size     = sp.baseSize * cfg.sz * (1 + pulse * 0.4 + sp.brightness * 1.2);

        drawStar(drawX, drawY, size, alpha, sp.color, alpha > 0.68);
      }

      // 4 · Click ripples
      drawRipples();

      // 5 · Cursor-trail transient sparkles
      for (const sp of transientRef.current) {
        sp.life -= 0.032;
        const alpha = Math.max(0, sp.life) * 0.88;
        drawStar(sp.x, sp.y, sp.size * Math.max(0.1, sp.life), alpha, sp.color, false);
      }
      transientRef.current = transientRef.current.filter(sp => sp.life > 0);

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    />
  );
}
