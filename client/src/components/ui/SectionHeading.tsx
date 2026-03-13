interface Props {
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <div className="mb-12">
      <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--muted)' }}>
        {label}
      </p>
      <h2
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: 300,
          fontSize: '3rem',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
