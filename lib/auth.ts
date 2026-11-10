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
      studentName: 'Thầy Trương',
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
