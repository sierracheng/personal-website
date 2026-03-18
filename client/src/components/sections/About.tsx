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
    <div>
      <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--fg)', marginBottom: '4px' }}>
        {count}
      </p>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 400, color: 'var(--muted)', letterSpacing: '0.01em' }}>
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
      style={{ position: 'relative', padding: '80px 60px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Intro panel — Augen gray rounded card ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'var(--bg-panel)',
          borderRadius: '28px',
          padding: '56px 60px',
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gap: '80px',
          alignItems: 'start',
          marginBottom: '12px',
        }}
      >
        {/* Left label col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '6px' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 400, color: 'var(--muted)', letterSpacing: '0.01em', marginBottom: '2px' }}>
            Introduction
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 500, color: 'var(--fg)' }}>
            Who's Sierra
          </p>
        </div>

        {/* Right content */}
        <div>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 400,
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            lineHeight: 1.65, color: 'var(--fg)',
            letterSpacing: '-0.01em', marginBottom: '12px',
          }}>
            Hi, I'm Sierra! I'm a Full-Stack Developer with an M.S. from the University of Washington,
            building systems that translate complex microservices into{' '}
            <span style={{ color: 'var(--accent)' }}>intuitive, high-impact interfaces.</span>
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: 1.78, color: 'var(--muted)', maxWidth: '54ch' }}>
            From 100K+ supplier supply chains to GenAI video platforms, specializing in performance, accessibility, and scalable enterprise systems.
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              marginTop: '20px',
              fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 400,
              color: 'var(--accent)', textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.70')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', border: '1px solid var(--accent)', fontSize: '10px' }}>→</span>
            {' '}Get in touch
          </a>
        </div>
      </motion.div>

      {/* ── Stats + Education row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'var(--bg-panel)', borderRadius: '24px', padding: '40px 48px', display: 'flex', gap: '48px' }}
        >
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 400, color: 'var(--muted)', marginBottom: '16px' }}>Education</p>
          <Stat value={100} suffix="K+" label="Suppliers scaled" inView={inView} delay={0.5} />
          <Stat value={5}   suffix="+"  label="Years experience" inView={inView} delay={0.6} />
          <Stat value={30}  suffix="+"  label="UI components built" inView={inView} delay={0.7} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'var(--bg-panel)', borderRadius: '24px', padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 400, color: 'var(--muted)', marginBottom: '16px' }}>Education</p>
          <div>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: '15px', color: 'var(--fg)', marginBottom: '4px' }}>
              M.S. Technology Innovation
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--muted)' }}>
              University of Washington · 2023–2025
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Skills panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: 'var(--bg-panel)', borderRadius: '24px', padding: '36px 48px', marginBottom: '48px' }}
      >
        <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 400, color: 'var(--muted)', marginBottom: '20px' }}>Tech stack</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SKILLS.map((skill, i) => (
            <motion.span
              key={skill}
              className="pill"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.32 + i * 0.03 }}
              whileHover={{ borderColor: 'rgba(37,99,235,0.40)', color: 'var(--accent)', scale: 1.04 }}
              style={{ cursor: 'default' }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div style={{ marginTop: 'auto' }}>
        <SectionStrip index="02" title="About" sub="System Architect" nextHref="#experience" nextLabel="Experience" inView={inView} delay={0.6} />
      </div>
    </section>
  );
}
