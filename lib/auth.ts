'use client';

export interface UserSession {
  isLoggedIn: boolean;
  role: 'student' | 'teacher' | 'guest';
  studentId?: string;
  studentCode?: string;
  studentName?: string;
  studentClass?: string;
  studentGrade?: number; // 6, 7, 8, 9
  // Thông tin ghép cặp (Mô hình 2 học sinh ngồi chung 1 máy phòng thực hành)
  isPair?: boolean;
  partnerId?: string;
  partnerCode?: string;
  partnerName?: string;
  pairNames?: string;
}

export function getCurrentUser(): UserSession {
  if (typeof window === 'undefined') {
    return { isLoggedIn: false, role: 'guest' };
  }

  const role = (localStorage.getItem('truong_user_role') as 'student' | 'teacher' | null) || 'guest';
  if (role === 'guest') {
    return { isLoggedIn: false, role: 'guest' };
  }

  if (role === 'teacher') {
    return {
      isLoggedIn: true,
      role: 'teacher',
      studentName: 'Thầy Đỗ Mạnh Trường',
    };
  }

  const studentId = localStorage.getItem('truong_student_id') || '';
  const studentCode = localStorage.getItem('truong_student_code') || '';
  const studentName = localStorage.getItem('truong_student_name') || 'Học sinh';
  const studentClass = localStorage.getItem('truong_student_class') || '';

  // Trích xuất Khối lớp từ tên lớp (vd: 'Lớp 7A11' -> 7, '6A10' -> 6)
  let studentGrade = 7;
  const gradeStored = localStorage.getItem('truong_student_grade');
  if (gradeStored) {
    studentGrade = parseInt(gradeStored, 10) || 7;
  } else if (studentClass) {
    const match = studentClass.match(/([6789])/);
    if (match) studentGrade = parseInt(match[1], 10);
  }

  const isPair = localStorage.getItem('truong_is_pair') === 'true';
  const partnerId = localStorage.getItem('truong_partner_id') || undefined;
  const partnerCode = localStorage.getItem('truong_partner_code') || undefined;
  const partnerName = localStorage.getItem('truong_partner_name') || undefined;
  const pairNames = localStorage.getItem('truong_pair_names') || undefined;

  return {
    isLoggedIn: true,
    role: 'student',
    studentId,
    studentCode,
    studentName,
    studentClass,
    studentGrade,
    isPair,
    partnerId,
    partnerCode,
    partnerName,
    pairNames: pairNames || (isPair && partnerName ? `${studentName} & ${partnerName}` : undefined),
  };
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('truong_user_role');
  localStorage.removeItem('truong_student_id');
  localStorage.removeItem('truong_student_code');
  localStorage.removeItem('truong_student_name');
  localStorage.removeItem('truong_student_class');
  localStorage.removeItem('truong_student_grade');
  localStorage.removeItem('truong_is_pair');
  localStorage.removeItem('truong_partner_id');
  localStorage.removeItem('truong_partner_code');
  localStorage.removeItem('truong_partner_name');
  localStorage.removeItem('truong_pair_names');
}

/**
 * Kiểm tra xem người dùng hiện tại có được phép thao tác trên học liệu của khối `grade` hay không.
 * - Giáo viên: Có quyền trên TẤT CẢ các khối (6, 7, 8, 9).
 * - Học sinh: CHỈ được phép thao tác trên khối của lớp mình (vd: HS 7A11 chỉ được thao tác Khối 7).
 */
export function canAccessGrade(grade: number): boolean {
  const user = getCurrentUser();
  if (user.role === 'teacher') return true;
  if (user.role === 'student') return user.studentGrade === grade;
  return true; // Khách có thể xem demo nhưng không nộp bài
}

/**
 * Kiểm tra quyền vào khu vực dành riêng cho Giáo viên
 */
export function canAccessTeacher(): boolean {
  const user = getCurrentUser();
  return user.role === 'teacher';
}

/**
 * Danh sách mã học sinh được Thầy Đỗ Mạnh Trường chỉ định vào đội tuyển Học sinh giỏi (HSG)
 */
export function getAdvancedStudentCodes(): string[] {
  const defaultHSGCodes = ['7A1101', '7A1102', '8A1101', '8A1102', '9A1301', '9A1302', '6A1001'];
  if (typeof window === 'undefined') return defaultHSGCodes;
  try {
    const stored = localStorage.getItem('truong_hsg_student_codes');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return defaultHSGCodes;
}

/**
 * Kiểm tra xem học sinh có được Thầy chỉ định vào nhóm HSG để mở chức năng Lập trình hay không
 */
export function isStudentDesignatedHSG(studentCode?: string): boolean {
  if (!studentCode) return false;
  const codes = getAdvancedStudentCodes();
  return codes.includes(studentCode);
}

/**
 * Thầy Đỗ Mạnh Trường chỉ định hoặc bỏ chỉ định học sinh vào nhóm HSG
 */
export function setStudentDesignatedHSG(studentCode: string, isHSG: boolean): void {
  if (typeof window === 'undefined') return;
  const codes = getAdvancedStudentCodes();
  const next = isHSG 
    ? Array.from(new Set([...codes, studentCode]))
    : codes.filter(c => c !== studentCode);
  localStorage.setItem('truong_hsg_student_codes', JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('truong_hsg_update', { detail: next }));
}
