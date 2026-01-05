
import { MockTest } from '../types.ts';
import { questionsData } from './questions.ts';

const generateRange = (start: number, end: number) => 
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const getIdsByTopic = (topicName: string): number[] => {
  const search = topicName.toLowerCase();
  return questionsData
    .filter(q => q.topics?.some(t => t.toLowerCase() === search))
    .map(q => q.id);
};

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
  },
  // Specialized Topic Exams
  {
    id: 'topic-lambda',
    title: 'Lambda Practice Exam',
    description: 'Focused practice containing all available questions related to AWS Lambda functions and serverless compute.',
    questionIds: getIdsByTopic('lambda'),
    durationMinutes: Math.ceil(getIdsByTopic('lambda').length * 2),
    topic: 'lambda'
  },
  {
    id: 'topic-dynamodb',
    title: 'DynamoDB Practice Exam',
    description: 'Deep dive into NoSQL modeling, throughput, and performance questions specifically for Amazon DynamoDB.',
    questionIds: getIdsByTopic('dynamodb'),
    durationMinutes: Math.ceil(getIdsByTopic('dynamodb').length * 2),
    topic: 'dynamodb'
  },
  {
    id: 'topic-iam',
    title: 'IAM Practice Exam',
    description: 'Master AWS Identity and Access Management with a comprehensive set of security, roles, and policy questions.',
    questionIds: getIdsByTopic('iam'),
    durationMinutes: Math.ceil(getIdsByTopic('iam').length * 2),
    topic: 'iam'
  },
  {
    id: 'topic-s3',
    title: 'S3 Practice Exam',
    description: 'Complete coverage of Amazon Simple Storage Service (S3), including bucket policies, encryption, and lifecycle rules.',
    questionIds: getIdsByTopic('s3'),
    durationMinutes: Math.ceil(getIdsByTopic('s3').length * 2),
    topic: 's3'
  }
];