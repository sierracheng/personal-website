import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useAppSelector } from '../../store';

export function CustomCursor() {
  const { cursorPosition, cursorVariant } = useAppSelector((s) => s.ui);

  const x = useSpring(0, { damping: 30, stiffness: 300 });
  const y = useSpring(0, { damping: 30, stiffness: 300 });
  const xRing = useSpring(0, { damping: 38, stiffness: 200 });
  const yRing = useSpring(0, { damping: 38, stiffness: 200 });

  useEffect(() => {
    x.set(cursorPosition.x);
    y.set(cursorPosition.y);
    xRing.set(cursorPosition.x);
    yRing.set(cursorPosition.y);
  }, [cursorPosition, x, y, xRing, yRing]);

  // Only render when hovering over an experience card
  if (cursorVariant !== 'hover') return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: 0, height: 0, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border"
        style={{ x: xRing, y: yRing, translateX: '-50%', translateY: '-50%' }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ width: 48, height: 48, borderColor: 'var(--accent)', opacity: 1 }}
        exit={{ width: 0, height: 0, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 250 }}
      />
    </>
  );
}
