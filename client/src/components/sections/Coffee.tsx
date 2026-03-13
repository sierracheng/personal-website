import { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
  useScroll,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';

// ── SVG doodles ───────────────────────────────────────────────────────────────

const MugSvg = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 50 58" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 20 L6 52 Q6 57 12 57 L38 57 Q44 57 44 52 L42 20 Z" />
    <path d="M8 20 Q26 24 42 20" />
    <path d="M42 28 Q53 28 53 37 Q53 46 42 46" />
    <path d="M17 12 Q19 7 17 3" />
    <path d="M25 10 Q27 5 25 1" />
    <path d="M33 12 Q35 7 33 3" />
  </svg>
);

const IcedGlassSvg = ({ size = 50 }: { size?: number }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 38 57" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4 L3 51 Q3 55 8 55 L30 55 Q35 55 35 51 L33 4 Z" />
    <line x1="5" y1="4" x2="33" y2="4" />
    <circle cx="12" cy="17" r="3.2" /><circle cx="23" cy="13" r="4" />
    <circle cx="16" cy="27" r="2.8" /><circle cx="26" cy="24" r="3.2" />
    <line x1="23" y1="4" x2="25" y2="-1" />
  </svg>
);

const CappuccinoSvg = ({ size = 55 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <circle cx="30" cy="30" r="27" /><circle cx="30" cy="30" r="20" /><circle cx="30" cy="30" r="14" />
    <path d="M30 16 Q36 23 30 30 Q24 23 30 16" />
    <path d="M30 16 Q36 23 30 30 Q24 23 30 16" transform="rotate(120 30 30)" />
    <path d="M30 16 Q36 23 30 30 Q24 23 30 16" transform="rotate(240 30 30)" />
  </svg>
);

const DonutSvg = ({ size = 55 }: { size?: number }) => (
  <svg width={size} height={size * 0.85} viewBox="0 0 62 52" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <ellipse cx="31" cy="28" rx="28" ry="22" /><ellipse cx="31" cy="28" rx="11" ry="9" />
    <path d="M7 24 Q12 14 22 17 Q32 20 38 13 Q46 8 54 17" strokeWidth="1.2" />
  </svg>
);

const CroissantSvg = ({ size = 62 }: { size?: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 38 Q4 20 18 11 Q30 3 36 8 Q42 3 54 11 Q68 20 62 38" />
    <path d="M21 38 Q19 24 26 15" /><path d="M36 38 Q36 20 36 10" /><path d="M51 38 Q53 24 46 15" />
    <path d="M10 38 Q36 45 62 38" />
  </svg>
);

const CoffeeBagSvg = ({ size = 45 }: { size?: number }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 42 54" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M8 18 L6 48 Q6 52 11 52 L31 52 Q36 52 36 48 L34 18 Z" />
    <path d="M8 18 Q21 14 34 18" /><path d="M13 11 L15 5 Q21 2 27 5 L29 11" />
    <path d="M15 30 Q21 25 27 30" /><path d="M17 36 Q21 32 25 36" strokeWidth="1.1" />
  </svg>
);

// ── Doodle config ─────────────────────────────────────────────────────────────

type DoodleConfig = {
  Component: ({ size }: { size?: number }) => React.ReactElement;
  size: number; top: number; left: number; rotation: number; opacity: number;
};

const DOODLES: DoodleConfig[] = [
  { Component: MugSvg,        size: 58, top: 4,  left: 2,  rotation: -15, opacity: 0.13 },
  { Component: IcedGlassSvg,  size: 48, top: 5,  left: 13, rotation: 8,   opacity: 0.11 },
  { Component: CappuccinoSvg, size: 64, top: 2,  left: 24, rotation: -3,  opacity: 0.12 },
  { Component: DonutSvg,      size: 52, top: 5,  left: 36, rotation: 14,  opacity: 0.10 },
  { Component: CoffeeBagSvg,  size: 44, top: 3,  left: 49, rotation: -9,  opacity: 0.13 },
  { Component: CroissantSvg,  size: 56, top: 6,  left: 62, rotation: 6,   opacity: 0.11 },
  { Component: MugSvg,        size: 46, top: 4,  left: 75, rotation: 20,  opacity: 0.12 },
  { Component: IcedGlassSvg,  size: 54, top: 3,  left: 87, rotation: -11, opacity: 0.11 },
  { Component: CappuccinoSvg, size: 46, top: 57, left: 0,  rotation: -13, opacity: 0.11 },
  { Component: DonutSvg,      size: 60, top: 55, left: 13, rotation: 18,  opacity: 0.12 },
  { Component: MugSvg,        size: 40, top: 60, left: 26, rotation: -5,  opacity: 0.10 },
  { Component: CoffeeBagSvg,  size: 54, top: 56, left: 38, rotation: 11,  opacity: 0.12 },
  { Component: CroissantSvg,  size: 50, top: 62, left: 51, rotation: -16, opacity: 0.10 },
  { Component: IcedGlassSvg,  size: 42, top: 57, left: 64, rotation: 7,   opacity: 0.11 },
  { Component: CappuccinoSvg, size: 52, top: 58, left: 76, rotation: -9,  opacity: 0.12 },
  { Component: DonutSvg,      size: 46, top: 54, left: 88, rotation: 15,  opacity: 0.10 },
];

// ── Scroll-linked doodle ──────────────────────────────────────────────────────

function DoodleItem({
  config,
  index,
  scrollProgress,
}: {
  config: DoodleConfig;
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  const dir = index % 2 === 0 ? 1 : -1;
  const rotate = useTransform(
    scrollProgress,
    [0, 1],
    [config.rotation, config.rotation + dir * 14],
  );
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${config.top}%`,
        left: `${config.left}%`,
        rotate,
        opacity: config.opacity,
        color: '#7a5035',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <config.Component size={config.size} />
    </motion.div>
  );
}

// ── Drinks ────────────────────────────────────────────────────────────────────

const DRINKS = [
  {
    id: 'cold-brew',
    url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=85',
    name: 'Cold Brew',
    quip: 'My production uptime depends on this',
    rotation: -6,
    depth: 0.75,
    scale: 1.0,
    ambient: false,
  },
  {
    id: 'iced-latte',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=85',
    name: 'Iced Caramel Latte',
    quip: 'Ships features, not feelings',
    rotation: 0,
    depth: 1.15,
    scale: 1.22,
    ambient: true,
  },
  {
    id: 'matcha',
    url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=85',
    name: 'Iced Matcha',
    quip: 'For when the PRs are existential',
    rotation: 5,
    depth: 0.6,
    scale: 1.0,
    ambient: false,
  },
];

function DrinkItem({
  drink,
  mouseX,
  mouseY,
  inView,
  index,
}: {
  drink: (typeof DRINKS)[0];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  inView: boolean;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const tx = useTransform(mouseX, [0, 1], [-20 * drink.depth, 20 * drink.depth]);
  const ty = useTransform(mouseY, [0, 1], [-10 * drink.depth, 10 * drink.depth]);
  const sx = useSpring(tx, { stiffness: 50, damping: 16 });
  const sy = useSpring(ty, { stiffness: 50, damping: 16 });

  const w = Math.round(185 * drink.scale);
  const h = Math.round(258 * drink.scale);

  return (
    <motion.div
      className="relative flex flex-col items-center flex-shrink-0"
      style={{ x: sx, y: sy, rotate: drink.rotation }}
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Ambient rotation on center card */}
      <motion.div
        animate={drink.ambient ? { rotate: [0, 1.5, 0, -1.5, 0] } : {}}
        transition={drink.ambient ? { duration: 7, repeat: Infinity, ease: 'easeInOut' } : {}}
      >
        {/* Card + lift on hover */}
        <motion.div
          whileHover={{ y: -16, scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.55) 0%, rgba(232,218,202,0.4) 100%)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: isHovered
              ? '0 28px 72px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.9)'
              : '0 10px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.7)',
            width: w,
            height: h,
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <img
            src={drink.url}
            alt={drink.name}
            width={w}
            height={h}
            loading="lazy"
            style={{
              width: w,
              height: h,
              objectFit: 'cover',
              display: 'block',
              mixBlendMode: 'multiply',
              filter: 'saturate(0.9) contrast(1.02)',
            }}
          />
        </motion.div>

        {/* Reflection */}
        <div
          style={{
            width: w,
            height: h * 0.35,
            marginTop: '2px',
            overflow: 'hidden',
            transform: 'scaleY(-1)',
            opacity: 0.12,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
            borderRadius: '4px',
            pointerEvents: 'none',
          }}
        >
          <img
            src={drink.url}
            alt=""
            width={w}
            height={h}
            loading="lazy"
            style={{ width: w, height: h, objectFit: 'cover', display: 'block', mixBlendMode: 'multiply' }}
          />
        </div>
      </motion.div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute text-center pointer-events-none"
            style={{ bottom: '-58px', width: '190px', left: '50%', translateX: '-50%' }}
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
          >
            <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '0.84rem', color: '#2a1a0e', marginBottom: '3px' }}>
              {drink.name}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontStyle: 'italic', color: '#7a5035', lineHeight: 1.4 }}>
              "{drink.quip}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function Coffee() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const onMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  };

  return (
    <section
      ref={sectionRef}
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', backgroundColor: '#f3ece5' }}
    >
      {/* Radial spotlight under drinks */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        height: '700px',
        background: 'radial-gradient(ellipse 55% 45% at 50% 72%, rgba(243,218,192,0.55) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div
        ref={containerRef}
        style={{ position: 'relative', height: '700px', zIndex: 2 }}
        onMouseMove={onMove}
        onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
      >
        {/* Scroll-linked doodles */}
        {DOODLES.map((d, i) => (
          <DoodleItem key={i} config={d} index={i} scrollProgress={scrollYProgress} />
        ))}

        {/* Section label + headline */}
        <div style={{
          position: 'absolute', top: '52px', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          zIndex: 10, pointerEvents: 'none',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginBottom: '16px' }}
          >
            <span style={{
              fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(90,48,18,0.55)', background: 'rgba(90,48,18,0.07)',
              border: '1px solid rgba(90,48,18,0.14)', padding: '5px 14px', borderRadius: '100px',
            }}>
              · A Confession
            </span>
          </motion.div>

          {/* Heading with letter-spacing animation */}
          <motion.h2
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 900,
              fontSize: 'clamp(2.6rem, 4.5vw, 4.2rem)',
              lineHeight: 1,
              color: '#2a1a0e',
            }}
            initial={{ opacity: 0, y: 18, letterSpacing: '-0.1em' }}
            animate={isInView ? { opacity: 1, y: 0, letterSpacing: '-0.04em' } : {}}
            transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            Runs on Coffee
          </motion.h2>
        </div>

        {/* Drinks */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: '96px',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          gap: '28px', zIndex: 20,
        }}>
          {DRINKS.map((drink, i) => (
            <DrinkItem key={drink.id} drink={drink} mouseX={mouseX} mouseY={mouseY} inView={isInView} index={i} />
          ))}
        </div>

        {/* Footer rule + caption */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '16px', pointerEvents: 'none', zIndex: 5,
        }}>
          <motion.div
            style={{ height: '1px', background: 'rgba(90,48,18,0.2)', transformOrigin: 'right' }}
            initial={{ scaleX: 0, width: 60 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 1.0 }}
          />
          <motion.p
            style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.26em', color: 'rgba(90,48,18,0.45)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            every good system needs a power source
          </motion.p>
          <motion.div
            style={{ height: '1px', background: 'rgba(90,48,18,0.2)', transformOrigin: 'left' }}
            initial={{ scaleX: 0, width: 60 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 1.0 }}
          />
        </div>
      </div>
    </section>
  );
}
