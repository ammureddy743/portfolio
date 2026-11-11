export interface Project {
  id: string;
  category: 'web' | 'mobile' | 'fullstack';
  badge: string;
  tag: string;
  title: string;
  description: string;
  technologies: string[];
  metrics: { label: string; val: string }[];
  highlights: string[];
  buttonText: string;
}

export interface TaskItem {
  id: number;
  text: string;
  tag: 'frontend' | 'mobile' | 'servicenow';
  completed: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
