import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useTilt(strength = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawY, { stiffness: 220, damping: 22 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    rawY.set(cx * strength * 1.3);
    rawX.set(-cy * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}
