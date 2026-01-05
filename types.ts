
export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answers: number[]; // Indices of correct options (0-based)
  multiple_correct: boolean;
  topics?: string[];
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  questionIds: number[];
  durationMinutes: number;
  topic?: string; // Optional field to categorize the test by AWS service
}

export interface UserQuizSession {
  testId: string;
  currentQuestionIndex: number;
  answers: Record<number, number[]>; // questionId -> selectedIndices
  completed: boolean;
}
