
export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answers: number[]; // Indices of correct options (0-based)
  multiple_correct: boolean;
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  questionIds: number[];
  durationMinutes: number;
}

export interface UserQuizSession {
  testId: string;
  currentQuestionIndex: number;
  answers: Record<number, number[]>; // questionId -> selectedIndices
  completed: boolean;
}
