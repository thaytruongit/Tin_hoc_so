'use client';

// ============================================================================
// DỊCH VỤ KẾT NỐI DỮ LIỆU THẬT SUPABASE POSTGRESQL (CLOUD DATABASE SERVICE)
// Giáo viên: Thầy Trương Thành Trường — THCS Mão Điền
// Lưu trữ tập trung điểm thi, kết quả phiếu cặp đôi và bài nộp thực hành
// Hỗ trợ chế độ chạy kép (Hybrid): Có Supabase thì lưu Cloud, offline thì lưu Local
// ============================================================================

import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { PracticalSubmission, HomeworkSubmission } from '@/lib/types';

export interface CloudExamResult {
  id?: string;
  examId: string;
  examTitle: string;
  studentCode: string;
  studentName: string;
  className: string;
  grade: number;
  score: number;
  tabSwitches: number;
  durationSec?: number;
  answers: Record<string, any>;
  submittedAt: string;
}

export interface CloudWorksheetResult {
  id?: string;
  periodId: string;
  periodTitle: string;
  computerNumber: string;
  studentAName: string;
  studentBName: string;
  className: string;
  grade: number;
  score: number;
  xpEarned: number;
  answers?: Record<string, any>;
  submittedAt: string;
}

/**
 * 1. Lưu kết quả thi trắc nghiệm trực tuyến lên Supabase Cloud
 */
export async function saveExamResultToCloud(result: CloudExamResult): Promise<{ success: boolean; id?: string }> {
  // Luôn lưu bản sao vào LocalStorage máy học sinh để an toàn
  if (typeof window !== 'undefined') {
    try {
      const key = 'truong_exam_results_history';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([result, ...existing]));
    } catch (e) {
      console.warn('Lỗi ghi LocalStorage:', e);
    }
  }

  // Nếu có Supabase: Ghi thẳng vào cơ sở dữ liệu PostgreSQL
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('practice_quiz_results')
        .insert([
          {
            period_id: result.examId,
            student_code: result.studentCode,
            student_name: result.studentName,
            class_name: result.className,
            score: result.score,
            correct_count: Math.round((result.score / 10) * Object.keys(result.answers || {}).length),
            total_questions: Object.keys(result.answers || {}).length || 10,
            answers_json: {
              examTitle: result.examTitle,
              grade: result.grade,
              tabSwitches: result.tabSwitches,
              answers: result.answers,
              submittedAt: result.submittedAt,
            },
          },
        ])
        .select();

      if (error) {
        console.warn('Supabase insert exam result error:', error);
        return { success: false };
      }
      return { success: true, id: data?.[0]?.id };
    } catch (err) {
      console.error('Lỗi khi gửi kết quả thi lên Supabase:', err);
      return { success: false };
    }
  }

  return { success: true };
}

/**
 * 2. Lưu kết quả Phiếu học tập Cặp đôi lên Supabase Cloud
 */
export async function saveWorksheetResultToCloud(result: CloudWorksheetResult): Promise<{ success: boolean; id?: string }> {
  // Bản sao cục bộ
  if (typeof window !== 'undefined') {
    try {
      const key = 'truong_worksheet_submissions';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([result, ...existing]));
    } catch (e) {
      console.warn('Lỗi ghi LocalStorage:', e);
    }
  }

  // Supabase PostgreSQL
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('worksheet_pair_submissions')
        .insert([
          {
            period_id: result.periodId,
            computer_number: result.computerNumber,
            student_a_name: result.studentAName,
            student_b_name: result.studentBName,
            class_name: result.className,
            grade: result.grade,
            score: result.score,
            xp_earned: result.xpEarned,
            submission_data: result.answers || {},
          },
        ])
        .select();

      if (error) {
        console.warn('Supabase insert worksheet result error:', error);
        return { success: false };
      }
      return { success: true, id: data?.[0]?.id };
    } catch (err) {
      console.error('Lỗi khi gửi kết quả phiếu lên Supabase:', err);
      return { success: false };
    }
  }

  return { success: true };
}

/**
 * 3. Lưu kết quả nộp bài thực hành lên Supabase Cloud
 */
export async function savePracticalSubmissionToCloud(sub: PracticalSubmission): Promise<{ success: boolean }> {
  if (typeof window !== 'undefined') {
    try {
      const key = 'truong_practical_submissions';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([sub, ...existing]));
    } catch (e) {
      console.warn('Lỗi ghi LocalStorage:', e);
    }
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('practical_submissions')
        .insert([
          {
            period_id: sub.assignmentTitle,
            student_code: sub.studentCode,
            student_name: sub.studentName,
            class_name: sub.className,
            grade: parseInt(sub.className.replace(/\D/g, '').charAt(0) || '6', 10),
            file_url: sub.fileName,
            file_name: sub.fileName,
            file_extension: sub.fileName.split('.').pop() || 'dat',
            final_score: sub.score || 10,
            teacher_comment: sub.teacherFeedback || '',
          },
        ]);

      if (error) {
        console.warn('Supabase insert practical submission error:', error);
        return { success: false };
      }
      return { success: true };
    } catch (err) {
      console.error('Lỗi Supabase practical submission:', err);
      return { success: false };
    }
  }

  return { success: true };
}

/**
 * 4. Thầy Trương Thành Trường tải danh sách kết quả thi của một Lớp từ Supabase Cloud
 */
export async function fetchClassExamResultsFromCloud(className: string): Promise<CloudExamResult[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('practice_quiz_results')
        .select('*')
        .eq('class_name', className)
        .order('submitted_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          examId: item.period_id,
          examTitle: item.answers_json?.examTitle || `Kiểm tra ${item.period_id}`,
          studentCode: item.student_code,
          studentName: item.student_name,
          className: item.class_name,
          grade: item.answers_json?.grade || 6,
          score: Number(item.score),
          tabSwitches: item.answers_json?.tabSwitches || 0,
          answers: item.answers_json?.answers || {},
          submittedAt: item.submitted_at || 'Vừa xong',
        }));
      }
    } catch (err) {
      console.warn('Lỗi đọc điểm thi từ Supabase:', err);
    }
  }

  // Fallback đọc từ LocalStorage
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('truong_exam_results_history');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter((r: CloudExamResult) => !className || r.className === className);
        }
      }
    } catch (e) {
      // ignore
    }
  }

  return [];
}

