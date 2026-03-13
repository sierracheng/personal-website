import { motion } from 'framer-motion';

const projects = [
  {
    id: 'sourceiq',
    number: 'No. 01',
    title: 'SourceIQ',
    category: 'Supply Chain Platform',
    description: 'B2B supply chain platform managing 100K+ global suppliers. Optimized data-heavy dashboards reducing loading times by 12%.',
    impact: '−12% Load Time · 100K+ Suppliers',
    stack: ['React', 'Redux Toolkit', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=70',
  },
  {
    id: 'opusclip',
    number: 'No. 02',
    title: 'OpusClip',
    category: 'GenAI Video Platform',
    description: 'Frontend engineering for a high-traffic GenAI video clipping platform. SSR and prefetching implementation increased user retention by 5%.',
    impact: '+5% User Retention · GenAI Powered',
    stack: ['React', 'TypeScript', 'GenAI'],
    image: 'https://images.unsplash.com/photo-1536240478700-b869ad10e2d5?w=800&q=70',
  },
  {
    id: 'sense',
    title: 'Sense',
    number: 'No. 03',
    category: 'Wearable Ecosystem',
    description: 'Award-winning wearable and mobile ecosystem for mood monitoring with real-time data visualization and AI-driven mood reports.',
    impact: 'Award-Winning · Real-time AI',
    stack: ['UX Research', 'Figma', 'Mobile'],
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b09d17?w=800&q=70',
  },
  {
    id: 'tmobile',
    number: 'No. 04',
    title: 'T-Mobile Healthcare',
    category: 'Healthcare Dashboard',
    description: 'Co-developed a B2C dashboard with WCAG accessibility and real-time patient data visualization for diverse demographics.',
    impact: 'WCAG AA · Real-time Data',
    stack: ['Next.js', 'Redux', 'Azure'],
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=70',
  },
];

export function Projects() {
  return (
    <section id="projects" style={{ position: 'relative', padding: '100px 44px 80px' }}>
      {/* Section header */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '48px' }}
      >
        04 — Selected Work
      </motion.p>

      {/* Project grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="glass"
            style={{ borderRadius: '32px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
          >
            {/* Image strip */}
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '130%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.6s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              {/* Gradient overlay fading into glass card */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(13,12,11,0.1) 0%, rgba(13,12,11,0.65) 100%)',
              }} />
              {/* Number badge */}
              <span style={{
                position: 'absolute', top: '18px', left: '20px',
                fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.15em', color: 'rgba(255,255,255,0.55)',
              }}>
                {project.number}
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: '28px 32px 32px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                {project.category}
              </p>
              <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '22px', color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {project.title}
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: 1.78, color: 'var(--muted)', maxWidth: '42ch' }}>
                {project.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {project.stack.map((t) => (
                    <span key={t} style={{
                      fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--muted)',
                      background: 'rgba(232,180,188,0.08)', border: '1px solid rgba(232,180,188,0.16)',
                      borderRadius: '100px', padding: '3px 11px',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {project.impact}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
