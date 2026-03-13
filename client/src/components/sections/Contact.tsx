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
    background: focused ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused ? 'rgba(232,180,188,0.45)' : 'rgba(255,255,255,0.10)'}`,
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
      <motion.div
        style={{ position: 'absolute', bottom: 0, left: '8px', right: '8px', height: '2px', background: 'var(--accent)', borderRadius: '100px', originX: 0 }}
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 0.8 : 0 }}
        transition={{ duration: 0.22 }}
      />
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
        fontFamily: 'var(--display)',
        fontWeight: 700,
        fontSize: '12px',
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        color: sent ? 'var(--muted)' : '#0d0c0b',
        background: sent ? 'rgba(255,255,255,0.06)' : 'var(--accent)',
        border: 'none',
        borderRadius: '100px',
        padding: '14px 36px',
        width: '100%',
        cursor: status === 'sending' || sent ? 'default' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'opacity 0.15s',
      }}
      whileTap={{ scale: 0.97 }}
    >
      {sent ? '✓ Message Sent' : status === 'sending' ? 'Sending...' : (
        <>
          Send Message
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>→</motion.span>
        </>
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
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) setForm({ name: '', email: '', message: '' });
    } catch { setStatus('sent'); setForm({ name: '', email: '', message: '' }); }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ position: 'relative', padding: '100px 44px 80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '48px' }}
      >
        05 — Get in Touch
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start', marginBottom: '64px' }}>

        {/* Left — info glass tile */}
        <motion.div
          className="glass"
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', gap: '0' }}
        >
          {["Let's Build", 'Something Great'].map((line, i) => (
            <div key={line} style={{ overflow: 'hidden' }}>
              <motion.p
                initial={{ y: '108%', skewY: 2 }}
                animate={inView ? { y: '0%', skewY: 0 } : {}}
                transition={{ duration: 0.88, delay: 0.18 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--display)', fontWeight: 900,
                  fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                  letterSpacing: '-0.04em', lineHeight: 0.95,
                  color: i === 1 ? 'var(--muted)' : 'var(--fg)',
                }}
              >
                {line}
              </motion.p>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.82, color: 'var(--muted)', marginTop: '28px', maxWidth: '36ch' }}
          >
            Have a project in mind? Let's talk engineering, design, or innovation. Available for new opportunities in 2025.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '40px' }}>
            {[
              { label: 'Role',      value: 'Full-Stack Developer' },
              { label: 'Education', value: 'M.S. Technology Innovation, UW' },
              { label: 'Location',  value: 'Seattle, WA' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -18 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid var(--border)', padding: '14px 0' }}
              >
                <span style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', minWidth: '70px' }}>
                  {item.label}
                </span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: '13px', fontWeight: 400, color: 'var(--fg)' }}>
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — form glass tile */}
        <motion.div
          className="glass"
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: '48px 44px' }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '7px' }}>Name</label>
                <FocusInput placeholder="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '7px' }}>Email</label>
                <FocusInput type="email" placeholder="your@email.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: 'var(--sans)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '7px' }}>Message</label>
              <FocusInput placeholder="Tell me about your project..." value={form.message} onChange={(v) => setForm({ ...form, message: v })} required rows={6} />
            </div>
            <div style={{ marginTop: '4px' }}>
              <MagneticSubmit status={status} />
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '24px', marginBottom: '32px' }}
      >
        <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted)' }}>© 2025 Sierra Cheng</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['About', 'Experience', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >{l}</a>
          ))}
        </div>
      </motion.div>

      <div style={{ marginTop: 'auto' }}>
        <SectionStrip index="05" title="Contact" sub="Sierra Cheng" nextHref="#" nextLabel="Back to Top" inView={inView} delay={0.8} />
      </div>
    </section>
  );
}
