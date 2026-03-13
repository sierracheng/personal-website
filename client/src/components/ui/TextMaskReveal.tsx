import { motion } from 'framer-motion';

interface Props {
  lines: string[];
  inView: boolean;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  lineStyle?: React.CSSProperties;
  dimLast?: boolean;
}

export function TextMaskReveal({
  lines,
  inView,
  delay = 0,
  stagger = 0.1,
  style,
  lineStyle,
  dimLast = false,
}: Props) {
  return (
    <div style={style}>
      {lines.map((line, i) => {
        const isDim = dimLast && i === lines.length - 1;
        return (
          <div key={i} style={{ overflow: 'hidden', lineHeight: 'inherit' }}>
            <motion.span
              style={{
                display: 'block',
                opacity: isDim ? 0.38 : 1,
                ...lineStyle,
              }}
              initial={{ y: '108%', skewY: 2.5 }}
              animate={inView ? { y: '0%', skewY: 0 } : {}}
              transition={{
                duration: 0.88,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
