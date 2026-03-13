import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return { ref, isInView };
}
