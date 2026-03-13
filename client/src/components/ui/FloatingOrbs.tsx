import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_SLOW   = { stiffness: 28,  damping: 18 };
const SPRING_MED    = { stiffness: 50,  damping: 22 };
const SPRING_FAST   = { stiffness: 80,  damping: 26 };

export function FloatingOrbs() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Three layers at different parallax depths
  const x1 = useSpring(useMotionValue(0), SPRING_SLOW);
  const y1 = useSpring(useMotionValue(0), SPRING_SLOW);
  const x2 = useSpring(useMotionValue(0), SPRING_MED);
  const y2 = useSpring(useMotionValue(0), SPRING_MED);
  const x3 = useSpring(useMotionValue(0), SPRING_FAST);
  const y3 = useSpring(useMotionValue(0), SPRING_FAST);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const cx = e.clientX - window.innerWidth  / 2;
      const cy = e.clientY - window.innerHeight / 2;
      mouseX.set(cx);
      mouseY.set(cy);
      x1.set(cx * 0.04);
      y1.set(cy * 0.04);
      x2.set(cx * 0.07);
      y2.set(cy * 0.07);
      x3.set(cx * 0.12);
      y3.set(cy * 0.12);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY, x1, y1, x2, y2, x3, y3]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Large pink orb — top-left */}
      <motion.div
        style={{ x: x1, y: y1, position: 'absolute', top: '10%', left: '8%', width: 320, height: 320, borderRadius: '50%', opacity: 0.55 }}
        className="orb-pink"
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Silver orb — bottom-center */}
      <motion.div
        style={{ x: x2, y: y2, position: 'absolute', bottom: '12%', left: '44%', width: 90, height: 90, borderRadius: '50%', opacity: 0.75 }}
        className="orb-silver"
        animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Deep pink orb — bottom-right */}
      <motion.div
        style={{ x: x3, y: y3, position: 'absolute', bottom: '20%', right: '12%', width: 110, height: 110, borderRadius: '50%', opacity: 0.50 }}
        className="orb-deep"
        animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Small accent pink — upper-right */}
      <motion.div
        style={{ x: x2, y: y2, position: 'absolute', top: '28%', right: '18%', width: 55, height: 55, borderRadius: '50%', opacity: 0.40 }}
        className="orb-pink"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}
