import { useAppDispatch } from '../../store';
import { setCursorVariant } from '../../store/slices/uiSlice';

interface Props {
  label: string;
  level?: 'expert' | 'advanced' | 'proficient';
}

export function SkillPill({ label }: Props) {
  const dispatch = useAppDispatch();
  return (
    <span
      className="text-sm"
      style={{ color: 'var(--fg)' }}
      onMouseEnter={() => dispatch(setCursorVariant('hover'))}
      onMouseLeave={() => dispatch(setCursorVariant('default'))}
    >
      {label}
    </span>
  );
}
