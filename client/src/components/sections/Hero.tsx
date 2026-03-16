import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PILLS = ['GenAI', 'Full-Stack', 'IoT Dashboards', 'Enterprise'];

// Real TypeScript — Sierra's actual work domain
const CODE_SNIPPET = `// SourceIQ — supplier matching pipeline
const buildMatchPipeline = async (
  suppliers: Supplier[],
  config: MatchConfig
): Promise<MatchResult[]> => {
  const verified = suppliers
    .filter(s => s.status === 'verified')
    .sort((a, b) => b.score - a.score);

  return Promise.all(
    verified.map(s => enrichWithAI(s, config))
  ).then(results => aggregate(results));
};

// OpusClip — SSR prefetch hook
export function usePrefetchClip(clipId: string) {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ['clip', clipId],
      queryFn: () => fetchClipMeta(clipId),
      staleTime: 60_000,
    });
  }, [clipId, queryClient]);
}

// T-Mobile — WCAG-compliant component
export const AccessibleMetric: React.FC<MetricProps> = ({
  value, label, trend,
}) => (
  <div role="figure" aria-label={\`\${label}: \${value}\`}>
    <span className="metric-value">{value}</span>
    <TrendIndicator
      direction={trend}
      aria-hidden="true"
    />
  </div>
);`;

export function Hero() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 64px 80px',
      }}
    >
      {/* ── Background code snippet ── */}
      {/* Positioning wrapper — keeps transform: translateY(-50%) intact */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          right: '60px',
          transform: 'translateY(-50%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <motion.pre
          initial={{ opacity: 0 }}
          animate={inView ? {
            opacity: 0.38,
            y: [0, -18, -6, -22, -10, 0],
            rotate: [0, 0.4, -0.3, 0.5, -0.2, 0],
          } : {}}
          transition={{
            opacity: { duration: 1.8, delay: 0.6 },
            y: { duration: 20, delay: 1.2, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 20, delay: 1.2, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", Menlo, monospace',
            fontSize: '12.5px',
            lineHeight: 1.8,
            color: 'var(--fg)',
            userSelect: 'none',
            whiteSpace: 'pre',
            maxWidth: '520px',
            letterSpacing: '0.01em',
          }}
        >
          {CODE_SNIPPET}
        </motion.pre>
      </div>

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '10px',
            fontWeight: 400,
            color: 'var(--muted)',
            letterSpacing: '0.02em',
            marginBottom: '20px',
          }}
        >
          sierra cheng · full-stack developer
        </motion.p>

        {/* Name — giant mixed typography */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.0, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 900,
                fontSize: 'clamp(5.5rem, 13vw, 14rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                color: 'var(--fg)',
                margin: 0,
              }}
            >
              Sierra
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.0, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'block',
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(5.2rem, 12.5vw, 13.4rem)',
                letterSpacing: '-0.01em',
                lineHeight: 0.88,
                color: 'var(--fg)',
              }}
            >
              Cheng.
            </motion.span>
          </div>
        </div>

        {/* Explore + pill tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.52 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}
        >
          <span style={{
            fontFamily: 'var(--sans)', fontSize: '11px',
            color: 'var(--muted)', marginRight: '4px',
          }}>
            Explore
          </span>
          {PILLS.map((p) => (
            <span key={p} className="pill">{p}</span>
          ))}
        </motion.div>

        {/* Sub-headline + CTAs row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.64 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}
        >
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.72,
            color: 'var(--muted)', maxWidth: '44ch',
          }}>
            Award-winning Full-Stack Developer. M.S. Technology Innovation, University of Washington.{' '}
            <span style={{ color: 'var(--accent)' }}>Building systems that improve people's experience.</span>
          </p>

          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <a
              href="#experience"
              style={{
                fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '12px',
                color: '#fff', background: 'var(--fg)',
                borderRadius: '100px', padding: '12px 28px',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              View Work
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '12px',
                color: 'var(--fg)', background: 'transparent',
                border: '1px solid var(--border-pill)',
                borderRadius: '100px', padding: '12px 28px',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-pill)')}
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.1 }}
        style={{
          position: 'absolute', bottom: '40px', left: '64px',
          zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px',
        }}
      >
        <motion.div
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '32px', height: '1px', background: 'rgba(0,0,0,0.20)', transformOrigin: 'left' }}
        />
        <span style={{
          fontFamily: 'var(--sans)', fontSize: '9px',
          color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

// ── SectionStrip ────────────────────────────────────────────────────
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
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid var(--border)', paddingTop: '18px', marginTop: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 400, color: 'var(--muted)' }}>{index}</span>
        <span style={{ width: '20px', height: '1px', background: 'var(--border)' }} />
        <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', fontWeight: 500, color: 'var(--fg)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{title}</span>
        {sub && (
          <>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--muted)' }} />
            <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted)' }}>{sub}</span>
          </>
        )}
      </div>
      <a
        href={nextHref}
        style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.15s' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
      >
        {nextLabel} →
      </a>
    </motion.div>
  );
}
