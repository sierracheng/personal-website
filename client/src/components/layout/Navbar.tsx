import { motion, useScroll, useTransform } from 'framer-motion';

const NAV_LINKS = ['About', 'Experience', 'Contact'];
const SOCIAL = ['GitHub', 'LinkedIn'];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ['rgba(13,12,11,0)', 'rgba(13,12,11,0.72)']);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.nav
      style={{
        backgroundColor: bg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: useTransform(borderOpacity, (v) => `rgba(255,255,255,${v * 0.09})`),
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 44px',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 700,
          fontSize: '14px',
          color: 'var(--fg)',
          textDecoration: 'none',
          letterSpacing: '0.01em',
        }}
      >
        Sierra.
      </a>

      {/* Center links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '12px',
              fontWeight: 400,
              color: 'var(--muted)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {l}
          </a>
        ))}
      </div>

      {/* Right: social + availability */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {SOCIAL.map((s) => (
          <a
            key={s}
            href="#"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--muted)',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {s}
          </a>
        ))}
        {/* Availability dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ position: 'relative', display: 'inline-flex', width: '7px', height: '7px' }}>
            <motion.span
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#4ade80' }}
              animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', position: 'relative' }} />
          </span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.03em' }}>
            Available
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
