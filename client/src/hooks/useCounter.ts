import { useEffect, useRef, useState } from 'react';

export function useCounter(target: number, suffix: string, inView: boolean): string {
  const [display, setDisplay] = useState('0' + suffix);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!inView || ranRef.current) return;
    ranRef.current = true;
    const dur = 1400;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(String(Math.round(eased * target)) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, suffix]);

  return display;
}
