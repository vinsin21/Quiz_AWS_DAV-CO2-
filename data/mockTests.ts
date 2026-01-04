
import { MockTest } from '../types';

const generateRange = (start: number, end: number) => 
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const mockTests: MockTest[] = [
  {
    id: 'exam-1',
    title: 'Practice Exam 1',
    description: '50 Mock Questions for AWS Associate Developer Certification Exam. (Questions 1-50)',
    questionIds: generateRange(1, 50),
    durationMinutes: 100,
  },
  {
    id: 'exam-2',
    title: 'Practice Exam 2',
    description: '50 Mock Questions for AWS Associate Developer Certification Exam. (Questions 51-100)',
    questionIds: generateRange(51, 100),
    durationMinutes: 100,
  },
  {
    id: 'exam-3',
    title: 'Practice Exam 3',
    description: '50 Mock Questions for AWS Associate Developer Certification Exam. (Questions 101-150)',
    questionIds: generateRange(101, 150),
    durationMinutes: 100,
  },
  {
    id: 'exam-4',
    title: 'Practice Exam 4',
    description: '50 Mock Questions for AWS Associate Developer Certification Exam. (Questions 151-200)',
    questionIds: generateRange(151, 200),
    durationMinutes: 100,
  },
  {
    id: 'exam-5',
    title: 'Practice Exam 5',
    description: '50 Mock Questions for AWS Associate Developer Certification Exam. (Questions 201-250)',
    questionIds: generateRange(201, 250),
    durationMinutes: 100,
  },
  {
    id: 'exam-6',
    title: 'Practice Exam 6',
    description: '50 Mock Questions for AWS Associate Developer Certification Exam. (Questions 251-300)',
    questionIds: generateRange(251, 300),
    durationMinutes: 100,
  },
  {
    id: 'exam-7',
    title: 'Practice Exam 7 (Comprehensive)',
    description: '87 Mock Questions for AWS Associate Developer Certification Exam.(Questions 301-387)',
    questionIds: generateRange(301, 387),
    durationMinutes: 175,
  }
];
