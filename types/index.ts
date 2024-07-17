export interface Question {
  question: string;
  answer: string;
  image_url?: string;
  flipped?: boolean;
}

export interface Step {
  title: string;
  subtitle?: string;
  type: 'flip' | 'match' | 'quiz',
  questions: Question[];
  completed?: boolean;
}

export interface Quiz {
  id: string;
  name: string;
  description?: string;
  steps: Step[];
}
