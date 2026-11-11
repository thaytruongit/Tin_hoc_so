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
  studentCode: string; // Ví dụ: 7A1101, 6A1005
  fullName: string;
  dob?: string;
  password?: string;
  avatarUrl: string;
  totalXp: number;
  level: number;
  streakDays: number;
  completedTasks: number;
  averageGrade: number; // Điểm học tập chính thức
  progressScore: number; // Điểm tiến bộ
  codeScore: number;     // Điểm lập trình
  contributionScore: number; // Điểm đóng góp
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
  phase: 'Khởi động' | 'Khám phá' | 'Luyện tập' | 'Vận dụng';
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
  code: 'EXCELLENT' | 'HARD_WORK' | 'CREATIVE' | 'TEAM_PLAYER';
  name: string;
  description: string;
  category: string;
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
  isEssayReviewed?: boolean;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isSecret?: boolean;
}

export interface ProgrammingChallenge {
  id: string;
  language: 'C++' | 'Python';
  title: string;
  gradeLevel: 'Khối 8' | 'Khối 9' | 'Bồi dưỡng HSG';
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  initialCode: string;
  xpReward: number;
  testCases?: TestCase[];
}

export interface PracticeFile {
  id: string;
  title: string;
  grade: GradeLevel;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  description: string;
  topics: string[];
  badge: string;
}

export interface VideoLecture {
  id: string;
  title: string;
  grade: GradeLevel;
  videoUrl: string;
  duration: string;
  topic: string;
  description: string;
  keyTakeaways: string[];
  author: string;
}

export interface PracticalSubmission {
  id: string;
  submissionCode: string;
  studentId?: string;
  studentCode: string;
  studentName: string;
  classId: string;
  className: string;
  assignmentTitle: string;
  fileName: string;
  fileSize: string;
  submittedAt: string;
  fileDataUrl?: string;
  grade?: number;
  score?: number;
  feedback?: string;
  teacherFeedback?: string;
  status: 'submitted' | 'graded';
}

export type CognitiveLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng';

export interface ReinforcementQuestion {
  id: string;
  level: CognitiveLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  stats?: { A: number; B: number; C: number; D: number };
}

export interface InClassLesson {
  id: string;
  grade: GradeLevel;
  lessonTitle: string;
  topic: string;
  period: number;
  reinforcementQuestions: ReinforcementQuestion[];
  practicalTask: {
    title: string;
    description: string;
    steps: string[];
    sampleFileName: string;
    sampleFileUrl: string;
    rubric: { criterion: string; maxPoints: number; note: string }[];
  };
}

export interface HomeworkAssignment {
  id: string;
  grade: GradeLevel;
  title: string;
  week: number;
  deadline: string;
  description: string;
  requirements: string[];
  acceptedTypes: ('image' | 'xlsx' | 'docx')[];
  sampleAttachmentUrl?: string;
  xpReward: number;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  homeworkTitle: string;
  studentId?: string;
  studentCode: string;
  studentName: string;
  classId: string;
  className: string;
  fileType: 'image' | 'xlsx' | 'docx' | 'other';
  fileName: string;
  fileSize: string;
  fileDataUrl?: string;
  note?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded';
}
