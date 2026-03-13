import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
      }}
    >
      {/* Glass card */}
      <motion.div
        className="glass"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 760,
          width: '100%',
          padding: '60px 64px 56px',
          borderRadius: '48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ marginBottom: '32px' }}
        >
          <span style={{
            fontFamily: 'var(--sans)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            background: 'rgba(232,180,188,0.12)',
            border: '1px solid rgba(232,180,188,0.25)',
            borderRadius: '100px',
            padding: '6px 16px',
          }}>
            Full-Stack Developer · M.S. University of Washington
          </span>
        </motion.div>

        {/* Name */}
        <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
          <motion.h1
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: 'var(--fg)',
              margin: 0,
            }}
          >
            Sierra Cheng
          </motion.h1>
        </div>

        {/* Tagline */}
        <div style={{ overflow: 'hidden', marginBottom: '28px' }}>
          <motion.p
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.4,
              color: 'var(--muted)',
            }}
          >
            Architecting high-performance digital systems through engineering precision.
          </motion.p>
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.58 }}
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '13.5px',
            lineHeight: 1.78,
            color: 'rgba(255,255,255,0.38)',
            maxWidth: '52ch',
            marginBottom: '44px',
          }}
        >
          Award-winning Full-Stack Developer specializing in GenAI, Real-time IoT Dashboards, and Scalable Enterprise Solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
        >
          <a
            href="#experience"
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0d0c0b',
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '100px',
              padding: '13px 32px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View Work <span style={{ fontSize: '14px' }}>→</span>
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 500,
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--fg)',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '100px',
              padding: '13px 32px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── SectionStrip (used by About, Experience, Contact) ─────────────
export function SectionStrip({
  index, title, sub, nextHref, nextLabel, inView, delay = 0,
}: {
  index: string; title: string; sub?: string;
  nextHref: string; nextLabel: string; inView: boolean; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border)',
        paddingTop: '18px',
        marginTop: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, color: 'var(--muted)', letterSpacing: '0.1em' }}>
          {index}
        </span>
        <span style={{ width: '24px', height: '1px', background: 'var(--border)' }} />
        <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: 500, color: 'var(--fg)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {title}
        </span>
        {sub && (
          <>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--muted)' }} />
            <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.04em' }}>{sub}</span>
          </>
        )}
      </div>
      <a
        href={nextHref}
        style={{ fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.06em', transition: 'color 0.15s' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
      >
        {nextLabel} <span style={{ fontSize: '14px' }}>→</span>
      </a>
    </motion.div>
  );
}
