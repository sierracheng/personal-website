import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { SectionStrip } from './Hero';
import { useCounter } from '../../hooks/useCounter';

const experiences = [
  {
    id: 'sourceiq',
    number: '01',
    role: 'Full-Stack Intern',
    company: 'SourceIQ',
    period: '2024',
    focus: 'B2B Supply Chain & Scaling',
    description: 'Built a supply chain platform for 100K+ global suppliers. Developed RESTful APIs for complex authentication and matching microservices.',
    metric: { value: 100, suffix: 'K+', label: 'Suppliers' },
    stack: ['React', 'Redux', 'Node.js', 'MongoDB'],
  },
  {
    id: 'opusclip',
    number: '02',
    role: 'Full-Stack Intern',
    company: 'Opus Clip',
    period: '2024',
    focus: 'GenAI & High Traffic',
    description: 'Engineered the frontend for a high-traffic GenAI video platform. Implemented SSR skeleton and prefetching, increasing user retention by 5%.',
    metric: { value: 5, suffix: '%', label: 'Retention ↑' },
    stack: ['React', 'TypeScript', 'GenAI', 'Figma'],
  },
  {
    id: 'microsoft',
    number: '03',
    role: 'Full-Stack Developer',
    company: 'Microsoft & UW',
    period: '2023',
    focus: 'IoT & Real-time Visualization',
    description: 'Designed a monitoring dashboard for agricultural IoT metrics with end-to-end task management and high availability on Azure cloud.',
    metric: { value: 99, suffix: '.9%', label: 'Uptime SLA' },
    stack: ['React', 'Azure', 'IoT'],
  },
  {
    id: 'treevah',
    number: '04',
    role: 'Full-Stack Intern',
    company: 'Treevah',
    period: '2023',
    focus: 'Infrastructure & CI/CD',
    description: 'Led the design of a file management application. Established scalable CI/CD pipelines with Jenkins and AWS for optimized content delivery.',
    metric: { value: 40, suffix: '%', label: 'Deploy Time ↓' },
    stack: ['React', 'TypeScript', 'AWS', 'Jenkins'],
  },
  {
    id: 'tmobile',
    number: '05',
    role: 'Full-Stack Developer',
    company: 'T-Mobile & UW',
    period: '2022',
    focus: 'Accessibility & UI Libraries',
    description: 'Co-developed a healthcare dashboard with 30+ WCAG-compliant UI components for diverse patient demographics.',
    metric: { value: 30, suffix: '+', label: 'Components' },
    stack: ['Next.js', 'Redux', 'Azure'],
  },
];

function ExpCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const metric = useCounter(exp.metric.value, exp.metric.suffix, inView);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 200, damping: 24 });
  const rotateY = useSpring(rawY, { stiffness: 200, damping: 24 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawY.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rawX.set(-((e.clientY - r.top) / r.height - 0.5) * 5);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="glass"
      style={{
        rotateX, rotateY,
        transformPerspective: 1000,
        borderRadius: '28px',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', minHeight: '200px' }}>
        {/* Left */}
        <div style={{ padding: '28px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--muted)' }}>
                {exp.number}
              </span>
              <span style={{
                fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, color: 'var(--muted)',
                background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)',
                padding: '2px 9px', borderRadius: '100px',
              }}>
                {exp.period}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '15px', color: 'var(--fg)', letterSpacing: '0.01em' }}>
              {exp.company}
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: '3rem', letterSpacing: '-0.05em', lineHeight: 1, color: 'var(--accent)', marginBottom: '4px' }}>
              {metric}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {exp.metric.label}
            </p>
          </div>
        </div>

        {/* Right */}
        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>
              {exp.role}
            </p>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '13px', color: 'var(--fg)', marginBottom: '12px', letterSpacing: '0.01em' }}>
              {exp.focus}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: 1.78, color: 'var(--muted)', maxWidth: '46ch' }}>
              {exp.description}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '16px' }}>
            {exp.stack.map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.07, y: -1 }}
                style={{
                  fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 400,
                  color: 'var(--muted)',
                  background: 'rgba(232,180,188,0.08)',
                  border: '1px solid rgba(232,180,188,0.16)',
                  borderRadius: '100px', padding: '3px 11px', cursor: 'default',
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' });

  return (
    <section
      id="experience"
      ref={ref}
      style={{ position: 'relative', padding: '100px 44px 80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '48px' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px' }}
          >
            03 — Professional Experience
          </motion.p>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '40px' }}>
            <div>
              {['Professional', 'Experience'].map((line, i) => (
                <div key={line} style={{ overflow: 'hidden' }}>
                  <motion.p
                    initial={{ y: '108%', skewY: 2 }}
                    animate={headerInView ? { y: '0%', skewY: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: 'var(--display)', fontWeight: 900,
                      fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
                      letterSpacing: '-0.04em', lineHeight: 0.95,
                      color: i === 1 ? 'var(--muted)' : 'var(--fg)',
                    }}
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ fontFamily: 'var(--sans)', fontStyle: 'italic', fontSize: '13px', color: 'var(--muted)', paddingBottom: '8px', whiteSpace: 'nowrap' }}
            >
              2022 — 2025
            </motion.p>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
          {experiences.map((exp, i) => <ExpCard key={exp.id} exp={exp} index={i} />)}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <SectionStrip index="03" title="Experience" sub="2022 – 2025" nextHref="#contact" nextLabel="Get in Touch" inView={inView} delay={0.5} />
        </div>
      </div>
    </section>
  );
}
