// ============================================================================
// HỆ THỐNG HỌC LIỆU 29 TIẾT HỌC CHO 4 KHỐI LỚP 6, 7, 8, 9 (116 TIẾT CHUẨN)
// Chuẩn chương trình GDPT 2018 môn Tin học - THCS Mão Điền
// Tích hợp Năng lực số (CV 3456) & Năng lực Trí tuệ nhân tạo AI (QĐ 3439)
// Chất liệu hữu cơ 100% bám sát SGK Kết nối tri thức với cuộc sống
// Mỗi tiết học gồm đủ 4 thành phần sư phạm:
// 1. Hoạt động trên lớp: Phiếu học tập điện tử Khám phá cặp đôi (2 HS/máy, đổi vai)
// 2. Hoạt động trên lớp: Luyện tập (đúng 7 câu hỏi phân hóa 3 Biết - 2 Hiểu - 2 Vận dụng)
// 3. Hoạt động trên lớp: Bài tập thực hành (chỉ dành riêng cho tiết thực hành, rubric 10đ)
// 4. Hoạt động ở nhà: Bài tập về nhà (hỗ trợ nộp ảnh chụp vở ghi, docx, xlsx)
// ============================================================================

import { CognitiveLevel } from './types';
import rawData from './curriculum_116_data.json';

export interface DragDropItem {
  text: string;
  bucket: string;
  explanation?: string;
}

export interface FillBlankItem {
  statement: string;
  correctAnswer: string;
  filledSentence: string;
}

export interface MatchingPairItem {
  left: string;
  right: string;
}

export interface CurriculumPeriod {
  id: string;
  grade: number;
  period: number;
  title: string;
  topic: string;
  isPractice: boolean;
  contentDesc: string;
  digitalCompetency: string; // Năng lực số CV 3456 / AI 3439
  slide?: {
    fileName: string;
    drivePath: string;
    folder: string;
    slideCount: number;
    slides: string[];
    downloadUrl?: string;
    embedUrl?: string;
  };
  worksheet: {
    title: string;
    phase1_khoi_dong: string;
    phase2_kham_pha: string;
    phase3_luyen_tap: string;
    phase4_van_dung: string;
    xpReward: number;
    timeLimitMin: number;
    wordBank?: string[];
    dragDrop?: {
      bucketA: string;
      bucketB: string;
      items: DragDropItem[];
    };
    fillBlanks?: FillBlankItem[];
    matchingPairs?: MatchingPairItem[];
    discussionPrompt?: string;
  };
  reinforcement: {
    questionsCount: 7;
    matrix: string; // "3 Biết - 2 Hiểu - 2 Vận dụng"
    questions: {
      id: string;
      level: CognitiveLevel;
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }[];
  };
  practicalTask?: {
    title: string;
    sampleFileName: string;
    sampleFileUrl: string;
    steps: string[];
    rubric: { criterion: string; maxPoints: number; note: string }[];
  };
  homework: {
    title: string;
    description: string;
    acceptedFormats: ('image' | 'xlsx' | 'docx')[];
    dueInDays: number;
  };
}

export const CURRICULUM_DATA: Record<number, CurriculumPeriod[]> = rawData as unknown as Record<number, CurriculumPeriod[]>;
