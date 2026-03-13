import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionStrip } from './Hero';
import { useCounter } from '../../hooks/useCounter';

const SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'SQL',
  'React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS',
  'Node.js', 'Express.js', 'GraphQL', 'MongoDB',
  'AWS', 'Azure', 'Figma', 'Playwright',
];

function Stat({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean; delay: number }) {
  const count = useCounter(value, suffix, inView);
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: '2.4rem', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--accent)', marginBottom: '6px' }}>
        {count}
      </p>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        {label}
      </p>
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="about"
      ref={ref}
      style={{ position: 'relative', padding: '100px 44px 80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '40px' }}
      >
        02 — The Architect Behind the System
      </motion.p>

      {/* Bento grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto auto',
        gap: '12px',
        marginBottom: '48px',
      }}>

        {/* Bio tile — spans 2 cols × 1 row */}
        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ gridColumn: '1 / 3', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div>
            {['Architect.', 'Engineer.', 'Builder.'].map((word, i) => (
              <div key={word} style={{ overflow: 'hidden' }}>
                <motion.span
                  initial={{ y: '105%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--display)',
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.96,
                    color: i === 2 ? 'var(--muted)' : 'var(--fg)',
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '46ch' }}>
            Full-Stack Developer with an M.S. in Technology Innovation from the University of Washington. I translate complex backend microservices into intuitive, high-impact interfaces — from 100K+ supplier supply chains to GenAI video platforms.
          </p>
        </motion.div>

        {/* Stats tile — spans 1 col */}
        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ gridColumn: '3 / 4', padding: '36px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: '28px' }}
        >
          <Stat value={100} suffix="K+" label="Suppliers Scaled" inView={inView} delay={0.6} />
          <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />
          <Stat value={5}   suffix="+"  label="Years Exp."       inView={inView} delay={0.7} />
          <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />
          <Stat value={30}  suffix="+"  label="UI Components"    inView={inView} delay={0.8} />
        </motion.div>

        {/* Education tile — spans 1 col */}
        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ gridColumn: '4 / 5', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <span style={{
            fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600,
            letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--accent)',
            background: 'rgba(232,180,188,0.10)', border: '1px solid rgba(232,180,188,0.20)',
            borderRadius: '100px', padding: '4px 12px', alignSelf: 'flex-start',
          }}>
            Education
          </span>
          <div>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '15px', color: 'var(--fg)', marginBottom: '6px' }}>
              M.S. Technology Innovation
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--muted)' }}>
              University of Washington
            </p>
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>
            Seattle, WA · 2023–2025
          </p>
        </motion.div>

        {/* Skills row — 16 small tiles across 4 cols × 2 rows */}
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill}
            className="glass-sm"
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.035 }}
            whileHover={{
              background: 'rgba(232,180,188,0.12)',
              borderColor: 'rgba(232,180,188,0.28)',
              scale: 1.04,
              transition: { duration: 0.15 },
            }}
            style={{
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'default',
            }}
          >
            <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: 500, color: 'var(--muted)', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
              {skill}
            </span>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <SectionStrip index="02" title="About" sub="System Architect" nextHref="#experience" nextLabel="Experience" inView={inView} delay={0.9} />
      </div>
    </section>
  );
}
