import type { Project } from '../../types';

interface Props {
  project: Project;
  index: number;
}

export function ProjectCard({ project }: Props) {
  return (
    <div className="p-8 border-b" style={{ borderColor: 'var(--border)' }}>
      <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--serif)', fontWeight: 300 }}>{project.title}</h3>
      <p className="text-sm" style={{ color: 'var(--muted)' }}>{project.summary}</p>
    </div>
  );
}
