import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useInView } from 'framer-motion';

const projects = [
  {
    id: 'sourceiq',
    number: 'No. 01',
    title: 'SourceIQ',
    category: 'Supply Chain Platform',
    description: 'B2B supply chain platform managing 100K+ global suppliers. Optimized data-heavy dashboards reducing loading times by 12%.',
    impact: '−12% Load Time · 100K+ Suppliers',
    stack: ['React', 'Redux Toolkit', 'Node.js'],
    image: '/sourceiq.png',
    span: 3,
    imageH: 300,
    imagePosition: 'center 18%',
  },
  {
    id: 'opusclip',
    number: 'No. 02',
    title: 'OpusClip',
    category: 'GenAI Video Platform',
    description: 'Frontend engineering for a high-traffic GenAI video clipping platform. SSR and prefetching implementation increased user retention by 5%.',
    impact: '+5% User Retention · GenAI Powered',
    stack: ['React', 'TypeScript', 'GenAI'],
    image: '/opusclip.png',
    span: 2,
    imageH: 300,
    imagePosition: 'center top',
  },
  {
    id: 'treevah',
    number: 'No. 03',
    title: 'Treevah',
    category: 'Infrastructure & CI/CD',
    description: 'Led design of a file management application. Established scalable CI/CD pipelines with Jenkins and AWS for optimized content delivery.',
    impact: '−40% Deploy Time · AWS CI/CD',
    stack: ['React', 'TypeScript', 'AWS', 'Jenkins'],
    image: '/treevah.png',
    span: 2,
    imageH: 240,
    imagePosition: 'center top',
  },
  {
    id: 'tmobile',
    number: 'No. 04',
    title: 'T-Mobile Healthcare',
    category: 'Healthcare Dashboard',
    description: 'Co-developed a B2C dashboard with WCAG accessibility and real-time patient data visualization for diverse demographics.',
    impact: 'WCAG AA · 30+ Components',
    stack: ['Next.js', 'Redux', 'Azure'],
    image: '/tmobile.png',
    span: 3,
    imageH: 240,
    imagePosition: 'center top',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(cardRef, { once: true, margin: '-6%' });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rawY, { stiffness: 180, damping: 22 });

  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255,255,255,0.16) 0%, transparent 62%)`;

  const imgX = useTransform(rotateY, [-16, 16], [10, -10]);
  const imgY = useTransform(rotateX, [-12, 12], [10, -10]);

  const shadowX = useTransform(rotateY, [-16, 16], [16, -16]);
  const shadowY = useTransform(rotateX, [-12, 12], [-12, 12]);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.07)`;

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    rawY.set((x - 0.5) * 16);
    rawX.set(-(y - 0.5) * 12);
    spotX.set(x * 100);
    spotY.set(y * 100);
  };

  const onMouseLeave = () => {
    rawX.set(0); rawY.set(0);
    spotX.set(50); spotY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        gridColumn: `span ${project.span}`,
        rotateX, rotateY, boxShadow,
        transformPerspective: 1200,
        borderRadius: '28px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'default',
        background: 'var(--bg-panel)',
        border: 'none',
      }}
      initial={{ opacity: 0, y: 48, rotateX: 10, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Specular overlay */}
      <motion.div style={{
        position: 'absolute', inset: 0, borderRadius: '28px',
        background: spotlight, pointerEvents: 'none', zIndex: 3,
      }} />

      {/* Image strip */}
      <div style={{ height: project.imageH, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <motion.img
          src={project.image}
          alt={project.title}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '130%',
            objectFit: 'cover', objectPosition: project.imagePosition,
            display: 'block', x: imgX, y: imgY,
          }}
        />
        {/* Gradient scrim */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.50) 100%)',
          zIndex: 1,
        }} />
        {/* Number badge */}
        {/* <span style={{
          position: 'absolute', top: '18px', left: '20px', zIndex: 2,
          fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600,
          letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)',
        }}>
          {project.number}
        </span> */}
      </div>

      {/* Card content */}
      <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)',
        }}>
          {project.category}
        </p>
        <p style={{
          fontFamily: 'var(--display)', fontWeight: 700, fontSize: '20px',
          color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          {project.title}
        </p>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: 1.78,
          color: 'var(--muted)', maxWidth: '44ch',
        }}>
          {project.description}
        </p>

        <div style={{ marginTop: 'auto', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {project.stack.map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--accent)',
                background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.16)',
                borderRadius: '100px', padding: '3px 11px',
              }}>
                {t}
              </span>
            ))}
          </div>
          <span style={{
            fontFamily: 'var(--sans)', fontSize: '10px',
            color: 'var(--muted)', whiteSpace: 'nowrap',
          }}>
            {project.impact}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <section
      id="projects"
      ref={ref}
      style={{ position: 'relative', padding: '100px 60px 80px', overflow: 'hidden' }}
    >
      {/* ── Ghost text — THE QUEEN signature element ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '-2%',
          transform: 'translateY(-50%)',
          zIndex: 0,
          lineHeight: 0.88,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div className="ghost-text">SELECTED</div>
        <div className="ghost-text">WORK</div>
      </div>

      {/* ── Section label ── */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative', zIndex: 2,
          fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: 'var(--muted)', marginBottom: '48px',
        }}
      >
        04 — Selected Work
      </motion.p>

      {/* ── Asymmetric 5-col bento grid ── */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'auto auto',
          gap: '14px',
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
