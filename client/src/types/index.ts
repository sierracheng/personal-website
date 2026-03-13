export interface Project {
  id: string;
  title: string;
  summary: string;
  impact: string;
  stack: string[];
  color: string;
  accent: string;
}

export interface UIState {
  cursorPosition: { x: number; y: number };
  cursorVariant: 'default' | 'hover' | 'text';
  activeModal: string | null;
  isNavVisible: boolean;
}

export interface ProjectsState {
  items: Project[];
  selectedId: string | null;
}
