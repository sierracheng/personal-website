import { motion, useScroll, useTransform } from 'framer-motion';

const NAV_LINKS = ['About', 'Experience', 'Projects', 'Contact'];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 60], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.92)']);
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <motion.nav
      style={{
        backgroundColor: bg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid',
        borderColor: useTransform(borderOpacity, (v) => `rgba(0,0,0,${v * 0.07})`),
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 48px',
      }}
    >
      {/* Logo */}
      <a href="#" style={{
        fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '13px',
        color: 'var(--fg)', textDecoration: 'none', letterSpacing: '0.01em',
      }}>
        Sierra Cheng
      </a>

      {/* Center nav links */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        background: 'rgba(0,0,0,0.04)', borderRadius: '100px',
        padding: '6px 8px',
      }}>
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 400,
              color: 'var(--muted)', textDecoration: 'none',
              padding: '5px 14px', borderRadius: '100px',
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--fg)';
              e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {l}
          </a>
        ))}
      </div>

      {/* Right: availability */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ position: 'relative', display: 'inline-flex', width: '6px', height: '6px' }}>
          <motion.span
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e' }}
            animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', position: 'relative' }} />
        </span>
        <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted)' }}>
          Available
        </span>
      </div>
    </motion.nav>
  );
}
