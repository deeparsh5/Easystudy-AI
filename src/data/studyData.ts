
export type Source = 'd2l' | 'web' | 'file';

export type StudySet = {
  category: string;
  title: string;
  tags: string[];
  source: string;
};

export type CourseMaterial = {
  id: string;
  title: string;
  detail: string;
};

export const studySets: StudySet[] = [
  {
    category: 'DATABASE SYSTEMS · WEEK 6',
    title: 'Normalization (1NF–3NF)',
    tags: ['10 questions', '20 cards', 'Summary'],
    source: 'From D2L · studied today',
  },
  {
    category: 'WEB DEVELOPMENT · WEEK 4',
    title: 'HTTP methods & REST',
    tags: ['8 questions', '15 cards'],
    source: 'From web page · 2 days ago',
  },
  {
    category: 'PROJECT MANAGEMENT · WEEK 3',
    title: 'Scrum roles & ceremonies',
    tags: ['12 cards', 'Summary'],
    source: 'From PDF · last week',
  },
];

export const materials: CourseMaterial[] = [
  {
    id: 'week6-slides',
    title: 'Week 6 — Normalization lecture slides',
    detail: 'PDF · 34 pages',
  },
  {
    id: 'week6-labs',
    title: 'Week 6 — Lab notes',
    detail: 'D2L content page',
  },
  {
    id: 'week5-er',
    title: 'Week 5 — ER diagrams',
    detail: 'PPTX · 28 slides',
  },
  {
    id: 'week4-sql',
    title: 'Week 4 — SQL joins',
    detail: 'PDF · 22 pages',
  },
];

export const courses = [
  'Database Systems',
  'Web Development',
  'Project Management',
];
