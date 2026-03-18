import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useAppDispatch } from '../../store';
import { setCursorVariant } from '../../store/slices/uiSlice';
import { SectionStrip } from './Hero';

function FocusInput({ type = 'text', placeholder, value, onChange, required, rows }: {
  type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; required?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const style: React.CSSProperties = {
    width: '100%',
    background: focused ? '#fff' : 'rgba(0,0,0,0.03)',
    border: `1px solid ${focused ? 'rgba(37,99,235,0.45)' : 'rgba(0,0,0,0.10)'}`,
    borderRadius: '12px',
    padding: '13px 16px',
    fontFamily: 'var(--sans)',
    fontSize: '13.5px',
    color: 'var(--fg)',
    outline: 'none',
    transition: 'all 0.2s',
    resize: rows ? 'none' : undefined,
  };
  return (
    <div style={{ position: 'relative' }}>
      {rows
        ? <textarea rows={rows} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} style={style} />
        : <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} style={style} />
      }
    </div>
  );
}

function MagneticSubmit({ status }: { status: string }) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 160, damping: 14 });
  const y = useSpring(rawY, { stiffness: 160, damping: 14 });

  const onMM = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left - r.width / 2) * 0.32);
    rawY.set((e.clientY - r.top - r.height / 2) * 0.32);
  };
  const onML = () => { rawX.set(0); rawY.set(0); dispatch(setCursorVariant('default')); };
  const sent = status === 'sent';

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={status === 'sending' || sent}
      onMouseMove={onMM}
      onMouseLeave={onML}
      onMouseEnter={() => dispatch(setCursorVariant('hover'))}
      style={{
        x, y,
        fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '12px',
        letterSpacing: '0.02em',
        color: sent ? 'var(--muted)' : '#fff',
        background: sent ? 'var(--bg-panel-2)' : 'var(--fg)',
        border: 'none', borderRadius: '100px', padding: '14px 36px',
        width: '100%', cursor: status === 'sending' || sent ? 'default' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        transition: 'opacity 0.15s',
      }}
      whileTap={{ scale: 0.97 }}
    >
      {sent ? '✓ Message Sent' : status === 'sending' ? 'Sending...' : (
        <>Send Message <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>→</motion.span></>
      )}
    </motion.button>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) setForm({ name: '', email: '', message: '' });
    } catch { setStatus('error'); }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: '80px 60px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Main contact panel — Augen gray card ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'var(--bg-panel)', borderRadius: '28px',
          padding: '56px 60px', display: 'grid',
          gridTemplateColumns: '200px 1fr', gap: '80px', alignItems: 'start',
          marginBottom: '12px',
        }}
      >
        {/* Left label col */}
        <div style={{ paddingTop: '6px' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--muted)', marginBottom: '2px' }}>05</p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 500, color: 'var(--fg)', marginBottom: '24px' }}>Get in Touch</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { label: 'Role',     value: 'Full-Stack Dev' },
              { label: 'Location', value: 'Bellevue, WA' },
              { label: 'Status',   value: 'Available Immediately' },
            ].map((item) => (
              <div key={item.label} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--muted)', marginBottom: '2px' }}>{item.label}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--fg)' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: headline + form */}
        <div>
          <div style={{ marginBottom: '36px' }}>
            <p style={{
              fontFamily: 'var(--sans)', fontWeight: 400,
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              lineHeight: 1.6, color: 'var(--fg)', letterSpacing: '-0.01em',
            }}>
              Have a project in mind? Let's talk engineering, design, or innovation.{' '}
              <span style={{ color: 'var(--accent)' }}>Available for new opportunities.</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Name</label>
                <FocusInput placeholder="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Email</label>
                <FocusInput type="email" placeholder="your@email.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Message</label>
              <FocusInput placeholder="Tell me about your project..." value={form.message} onChange={(v) => setForm({ ...form, message: v })} required rows={5} />
            </div>
            <div style={{ marginTop: '4px' }}>
              <MagneticSubmit status={status} />
            </div>
          </form>
        </div>
      </motion.div>

      {/* Footer bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderTop: '1px solid var(--border)', marginTop: '8px' }}
      >
        <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted)' }}>© 2026 Sierra Cheng</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['About', 'Experience', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >{l}</a>
          ))}
        </div>
      </motion.div>

      <div style={{ marginTop: 'auto' }}>
        <SectionStrip index="05" title="Contact" sub="Sierra Cheng" nextHref="#" nextLabel="Back to Top" inView={inView} delay={0.5} />
      </div>
    </section>
  );
}
