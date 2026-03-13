import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Project, ProjectsState } from '../../types';

const projects: Project[] = [
  {
    id: 'sourceiq',
    title: 'SourceIQ',
    summary: 'B2B supply chain platform managing 100K+ global suppliers. Optimized data-heavy dashboards reducing loading times by 12%.',
    impact: '−12% Load Time · 100K+ Suppliers',
    stack: ['React', 'Redux Toolkit', 'Node.js'],
    color: '#e8f0fe',
    accent: '#0071e3',
  },
  {
    id: 'opusclip',
    title: 'OpusClip',
    summary: 'Frontend engineering for a high-traffic GenAI video clipping platform. SSR and prefetching implementation increased user retention by 5%.',
    impact: '+5% User Retention · GenAI Powered',
    stack: ['React', 'TypeScript', 'GenAI'],
    color: '#f3e8ff',
    accent: '#9333ea',
  },
  {
    id: 'sense',
    title: 'Sense',
    summary: 'Award-winning wearable and mobile ecosystem for mood monitoring with real-time data visualization and AI-driven mood reports.',
    impact: 'Award-Winning · Real-time AI',
    stack: ['UX Research', 'Figma', 'Mobile'],
    color: '#e8f8ee',
    accent: '#1a7f3c',
  },
  {
    id: 'tmobile',
    title: 'T-Mobile Healthcare',
    summary: 'Co-developed a B2C dashboard with WCAG accessibility and real-time patient data visualization for diverse demographics.',
    impact: 'WCAG AA · Real-time Data',
    stack: ['Next.js', 'Redux', 'Azure'],
    color: '#ffe8ed',
    accent: '#c0002d',
  },
];

const initialState: ProjectsState = {
  items: projects,
  selectedId: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    selectProject(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
  },
});

export const { selectProject } = projectsSlice.actions;
export default projectsSlice.reducer;
