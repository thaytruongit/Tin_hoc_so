'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GraduationCap, UserCheck, KeyRound, User, Lock, AlertCircle, ArrowRight, Laptop } from 'lucide-react';
import { MOCK_STUDENTS } from '@/lib/mock-data';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student';

  const [role, setRole] = useState<'student' | 'teacher'>(initialRole);
  const [studentCode, setStudentCode] = useState('7A1101');
  const [password, setPassword] = useState('123');
  const [teacherEmail, setTeacherEmail] = useState('thaytruong@thcsmaodien.edu.vn');
  const [teacherPass, setTeacherPass] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const rawInput = studentCode.trim().toLowerCase();
      const stripped = rawInput.replace(/^hs/, '');

      const found = MOCK_STUDENTS.find(
        (s) => s.studentCode.toLowerCase() === rawInput || 
               s.studentCode.toLowerCase() === stripped ||
               `hs${s.studentCode.toLowerCase()}` === rawInput
      );

      if (found) {
        if (password.trim() === '123' || password.trim() === (found.password || '123')) {
          localStorage.setItem('truong_user_role', 'student');
          localStorage.setItem('truong_student_id', found.id);
          localStorage.setItem('truong_student_name', found.fullName);
          localStorage.setItem('truong_student_class', found.className);
          localStorage.setItem('truong_student_code', found.studentCode);
          const grade = parseInt(found.className.replace(/\D/g, '').charAt(0)) || 7;
          localStorage.setItem('truong_student_grade', String(grade));
          router.push('/student');
        } else {
          setError('Mật khẩu không chính xác. Mật khẩu chung của tất cả học sinh là 123.');
          setLoading(false);
        }
      } else {
        setError(`Không tìm thấy mã học sinh "${studentCode}". Vui lòng nhập đúng Tên lớp + Số thứ tự (Ví dụ: 7A1101, 8A1101, 6A1001) hoặc xem danh sách Thầy Trương đã phát.`);
        setLoading(false);
      }
    }, 500);
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (teacherPass === '123' || teacherPass === '123456' || teacherPass === 'thaytruong123') {
        localStorage.setItem('truong_user_role', 'teacher');
        router.push('/teacher');
      } else {
        setError('Mật khẩu giáo viên không chính xác (Thử: 123456)');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-2">
          <Laptop className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Đăng nhập hệ thống
        </h1>
        <p className="text-xs text-slate-500">
          Cổng học tập số Tin học · THCS Mão Điền (Năm học 2025 - 2026)
        </p>
      </div>

      {/* Role Toggle */}
      <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl gap-1">
        <button
          type="button"
          onClick={() => { setRole('student'); setError(''); }}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            role === 'student'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Học sinh (669 em)</span>
        </button>
        <button
          type="button"
          onClick={() => { setRole('teacher'); setError(''); }}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            role === 'teacher'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Thầy Trương IT</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Student Form (4A: Giáo viên cấp tài khoản) */}
      {role === 'student' ? (
        <form onSubmit={handleStudentLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mã học sinh (Tên lớp + STT)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                placeholder="Ví dụ: 7A1101, 8A1101, 6A1001..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 uppercase font-semibold text-slate-800"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Gợi ý tài khoản: <strong>7A1101</strong> (Lê Thị Bảo An), <strong>8A1101</strong> (Lê Hoài An), <strong>6A1001</strong> (Lê Thị Hoài An)
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mật khẩu học sinh
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu chung: 123"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-bold"
              />
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">
              Mật khẩu khởi tạo chung cho toàn trường: <strong>123</strong>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Đang xác thực...' : 'Vào bàn học'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        /* Teacher Form */
        <form onSubmit={handleTeacherLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tài khoản giáo viên / Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
                placeholder="thaytruong@thcsmaodien.edu.vn"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mật khẩu quản trị
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={teacherPass}
                onChange={(e) => setTeacherPass(e.target.value)}
                placeholder="Nhập 123456"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Đang đăng nhập...' : 'Vào kênh Quản trị GV'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="pt-4 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500">
          Học sinh quên mật khẩu hãy gặp trực tiếp <strong>Thầy Trương</strong> tại phòng Tin học để được cấp lại.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Đang tải biểu mẫu...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
