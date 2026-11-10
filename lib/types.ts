export type GradeLevel = 6 | 7 | 8 | 9;

export interface ClassItem {
  id: string;
  grade: GradeLevel;
  name: string;
  classCode: string;
  studentCount: number;
}

export interface Student {
  id: string;
  classId: string;
  className: string;
  studentCode: string; // Ví dụ: HS601, HS902
  fullName: string;
  password?: string;
  avatarUrl: string;
  totalXp: number;
  level: number;
  streakDays: number;
  badgesCount: number;
}

export interface Question {
  id: string;
  type: 'mcq' | 'boolean' | 'fill' | 'essay';
  content: string;
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation?: string;
  points: number;
}

export interface Worksheet {
  id: string;
  grade: GradeLevel;
  title: string;
  topic: string;
  periodNum: number;
  timeLimitMin: number;
  questions: Question[];
  xpReward: number;
  status: 'published' | 'draft' | 'closed';
}

export interface Exam {
  id: string;
  grade: GradeLevel;
  title: string;
  examType: 'thường xuyên' | 'giữa kỳ' | 'cuối kỳ';
  durationMin: number;
  questionsCount: number;
  questions: Question[];
  isLocked: boolean;
  accessCode?: string;
}

export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  xpBonus: number;
  earnedAt?: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  className: string;
  score: number;
  maxScore: number;
  durationSec: number;
  tabSwitches: number;
  submittedAt: string;
  xpEarned: number;
}
