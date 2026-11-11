'use client';

import { useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  GraduationCap, 
  UserCheck, 
  KeyRound, 
  User, 
  Lock, 
  AlertCircle, 
  ArrowRight, 
  Laptop, 
  Users, 
  Search, 
  CheckCircle2, 
  RefreshCw, 
  Info,
  Calendar,
  Layers,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { Student, ClassItem } from '@/lib/types';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student';

  const [role, setRole] = useState<'student' | 'teacher'>(initialRole);
  
  // Lựa chọn Khối và Lớp theo hàng ngang
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [selectedClassId, setSelectedClassId] = useState<string>('c-6a10');
  
  // Tìm kiếm học sinh trong lớp
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Danh sách học sinh được tích chọn để ghép cặp (Tối đa 2 em cho 1 máy tính)
  const [selectedStudentCodes, setSelectedStudentCodes] = useState<string[]>([]);
  
  // Mật khẩu & thông báo lỗi
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Form giáo viên
  const [teacherEmail, setTeacherEmail] = useState('thaytruong@thcsmaodien.edu.vn');
  const [teacherPass, setTeacherPass] = useState('123456');

  // Lọc danh sách Lớp theo Khối đang chọn
  const classesInGrade = useMemo(() => {
    return MOCK_CLASSES.filter((c) => c.grade === selectedGrade);
  }, [selectedGrade]);

  // Cập nhật selectedClassId khi đổi Khối nếu lớp hiện tại không thuộc khối mới
  const handleSelectGrade = (grade: number) => {
    setSelectedGrade(grade);
    const classes = MOCK_CLASSES.filter((c) => c.grade === grade);
    if (classes.length > 0) {
      setSelectedClassId(classes[0].id);
    }
    setSelectedStudentCodes([]);
    setError('');
    setInfoMessage('');
  };

  const handleSelectClass = (clsId: string) => {
    setSelectedClassId(clsId);
    setSelectedStudentCodes([]);
    setError('');
    setInfoMessage('');
  };

  // Danh sách học sinh thuộc Lớp đang chọn
  const studentsInClass = useMemo(() => {
    let list = MOCK_STUDENTS.filter((s) => s.classId === selectedClassId);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) => s.fullName.toLowerCase().includes(q) || s.studentCode.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedClassId, searchQuery]);

  // Lấy chi tiết học sinh đã chọn
  const selectedStudents = useMemo(() => {
    return selectedStudentCodes
      .map((code) => MOCK_STUDENTS.find((s) => s.studentCode === code))
      .filter((s): s is Student => Boolean(s));
  }, [selectedStudentCodes]);

  // Xử lý bật/tắt tích chọn học sinh (Checkbox ghép cặp)
  const handleToggleStudent = (student: Student) => {
    setError('');
    setInfoMessage('');
    const code = student.studentCode;

    if (selectedStudentCodes.includes(code)) {
      // Bỏ chọn
      setSelectedStudentCodes(selectedStudentCodes.filter((c) => c !== code));
    } else {
      // Chọn mới
      if (selectedStudentCodes.length >= 2) {
        setInfoMessage('⚠️ Phòng máy quy định tối đa 2 bạn ngồi chung 1 máy. Hãy bỏ tích một bạn trước nếu muốn đổi bạn khác!');
        return;
      }
      setSelectedStudentCodes([...selectedStudentCodes, code]);
    }
  };

  // Đổi vai trò giữa 2 học sinh ghép cặp (Kỹ thuật viên ⇄ Thư ký)
  const handleSwapRoles = () => {
    if (selectedStudentCodes.length === 2) {
      setSelectedStudentCodes([selectedStudentCodes[1], selectedStudentCodes[0]]);
    }
  };

  // Xử lý Đăng nhập Học sinh (Cá nhân hoặc Cặp đôi)
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedStudents.length === 0) {
      setError('Vui lòng tích dấu chọn ít nhất 1 học sinh trong danh sách bên dưới để đăng nhập!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Kiểm tra mật khẩu (mặc định 123)
      if (password.trim() !== '123') {
        const customMatched = selectedStudents.some((s) => s.password && s.password === password.trim());
        if (!customMatched) {
          setError('Mật khẩu không chính xác. Mật khẩu khởi tạo chung cho toàn trường là: 123');
          setLoading(false);
          return;
        }
      }

      const primary = selectedStudents[0];
      const partner = selectedStudents[1];

      // Lưu thông tin phiên làm việc vào localStorage
      localStorage.setItem('truong_user_role', 'student');
      localStorage.setItem('truong_student_id', primary.id);
      localStorage.setItem('truong_student_code', primary.studentCode);
      localStorage.setItem('truong_student_name', primary.fullName);
      localStorage.setItem('truong_student_class', primary.className);
      localStorage.setItem('truong_student_grade', String(selectedGrade));

      if (partner) {
        // Chế độ Ghép cặp 2 học sinh cùng máy
        localStorage.setItem('truong_is_pair', 'true');
        localStorage.setItem('truong_partner_id', partner.id);
        localStorage.setItem('truong_partner_code', partner.studentCode);
        localStorage.setItem('truong_partner_name', partner.fullName);
        localStorage.setItem('truong_pair_names', `${primary.fullName} & ${partner.fullName}`);
      } else {
        // Đăng nhập cá nhân 1 mình
        localStorage.removeItem('truong_is_pair');
        localStorage.removeItem('truong_partner_id');
        localStorage.removeItem('truong_partner_code');
        localStorage.removeItem('truong_partner_name');
        localStorage.removeItem('truong_pair_names');
      }

      router.push('/student');
    }, 400);
  };

  // Xử lý Đăng nhập Giáo viên
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
    }, 400);
  };

  const currentClass = MOCK_CLASSES.find((c) => c.id === selectedClassId);

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-6 sm:p-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Laptop className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Đăng nhập Cổng Tin học Số
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 font-medium mt-0.5">
                Trường THCS Mão Điền · Năm học 2025 - 2026 · Thầy Trương Thành Trường
              </p>
            </div>
          </div>

          {/* Role Toggle Switcher */}
          <div className="inline-flex p-1 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); setInfoMessage(''); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'student'
                  ? 'bg-white text-blue-800 shadow-md'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Học sinh (669 em)</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole('teacher'); setError(''); setInfoMessage(''); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'teacher'
                  ? 'bg-white text-blue-800 shadow-md'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Thầy Trương Thành Trường</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Error / Info Alerts */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2.5">
            <Info className="w-5 h-5 shrink-0 text-amber-600" />
            <span>{infoMessage}</span>
          </div>
        )}

        {role === 'student' ? (
          <form onSubmit={handleStudentLogin} className="space-y-6">
            {/* ============================================================== */}
            {/* HÀNG 1: NÚT CHỌN CÁC KHỐI 6, 7, 8, 9 THEO HÀNG NGANG */}
            {/* ============================================================== */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Bước 1: Chọn Khối học</span>
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  Chương trình Tin học chuẩn 29 tiết
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[6, 7, 8, 9].map((grade) => {
                  const isActive = selectedGrade === grade;
                  const countGradeClasses = MOCK_CLASSES.filter((c) => c.grade === grade).length;
                  const totalStudentsInGrade = MOCK_CLASSES
                    .filter((c) => c.grade === grade)
                    .reduce((acc, c) => acc + c.studentCount, 0);

                  return (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => handleSelectGrade(grade)}
                      className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center group ${
                        isActive
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20 scale-[1.02]'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                        <span className="text-sm font-black">Khối {grade}</span>
                      </div>
                      <span className={`text-[10px] mt-1 font-semibold ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                        {countGradeClasses} lớp · {totalStudentsInGrade} học sinh
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ============================================================== */}
            {/* HÀNG 2: NÚT CHỌN CÁC LỚP THEO KHỐI THEO HÀNG NGANG */}
            {/* ============================================================== */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Bước 2: Chọn Lớp thuộc Khối {selectedGrade}</span>
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  {classesInGrade.length} lớp học
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {classesInGrade.map((cls) => {
                  const isActive = selectedClassId === cls.id;
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => handleSelectClass(cls.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-[1.02]'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span>{cls.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {cls.studentCount} HS
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ============================================================== */}
            {/* HÀNG 3: DANH SÁCH HỌC SINH (HỌ TÊN, NGÀY SINH, TÀI KHOẢN) */}
            {/* CÓ DẤU TÍCH ĐỂ CHỌN GHÉP CẶP (TỐI ĐA 2 HS / 1 MÁY) */}
            {/* ============================================================== */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              {/* Header của bảng: Search + Hướng dẫn ghép cặp */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                      Bước 3: Tích chọn học sinh · {currentClass?.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                      Sĩ số: {studentsInClass.length} em
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    💡 <strong>Mô hình ghép cặp phòng máy:</strong> Tích <strong>1 bạn</strong> để học cá nhân, hoặc tích <strong>2 bạn</strong> ngồi chung máy để đổi vai thao tác.
                  </p>
                </div>

                {/* Ô tìm kiếm nhanh */}
                <div className="relative w-full sm:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên hoặc mã HS..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                  />
                </div>
              </div>

              {/* Bảng danh sách cuộn */}
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-600 font-bold sticky top-0 z-10 backdrop-blur-xs">
                    <tr>
                      <th className="py-2.5 px-3 text-center w-16">Ghép cặp</th>
                      <th className="py-2.5 px-2 text-center w-12">STT</th>
                      <th className="py-2.5 px-3">Họ và tên</th>
                      <th className="py-2.5 px-3 hidden sm:table-cell">Ngày sinh</th>
                      <th className="py-2.5 px-3">Tài khoản (Mã HS)</th>
                      <th className="py-2.5 px-3 text-right">Vai trò máy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentsInClass.map((student, idx) => {
                      const isSelected = selectedStudentCodes.includes(student.studentCode);
                      const selectedIndex = selectedStudentCodes.indexOf(student.studentCode);

                      return (
                        <tr
                          key={student.id}
                          onClick={() => handleToggleStudent(student)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? selectedIndex === 0
                                ? 'bg-blue-50/80 hover:bg-blue-50'
                                : 'bg-emerald-50/80 hover:bg-emerald-50'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          {/* Checkbox ghép cặp */}
                          <td className="py-2 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleStudent(student)}
                              className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                          </td>

                          {/* STT */}
                          <td className="py-2 px-2 text-center text-slate-400 font-mono text-[11px]">
                            {idx + 1}
                          </td>

                          {/* Họ tên */}
                          <td className="py-2 px-3">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{student.fullName}</span>
                              {isSelected && (
                                <CheckCircle2 className={`w-3.5 h-3.5 ${
                                  selectedIndex === 0 ? 'text-blue-600' : 'text-emerald-600'
                                }`} />
                              )}
                            </div>
                          </td>

                          {/* Ngày sinh */}
                          <td className="py-2 px-3 text-slate-600 hidden sm:table-cell font-mono text-[11px]">
                            {student.dob || '—'}
                          </td>

                          {/* Tài khoản (Mã HS) */}
                          <td className="py-2 px-3">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono font-bold text-[11px] border border-slate-200">
                              {student.studentCode}
                            </span>
                          </td>

                          {/* Vai trò máy */}
                          <td className="py-2 px-3 text-right">
                            {isSelected ? (
                              selectedIndex === 0 ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold text-[10px]">
                                  👤 Kỹ thuật viên
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                                  👥 Thư ký
                                </span>
                              )
                            ) : (
                              <span className="text-[11px] text-slate-400">Chưa chọn</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {studentsInClass.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          Không tìm thấy học sinh nào phù hợp với từ khóa "{searchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ============================================================== */}
            {/* THẺ TỔNG HỢP CẶP ĐÔI & KHUNG NHẬP MẬT KHẨU ĐĂNG NHẬP */}
            {/* ============================================================== */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-blue-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Trạng thái máy tính phòng thực hành:</span>
                  </span>

                  {selectedStudents.length === 0 && (
                    <p className="text-xs text-slate-500 italic">
                      Chưa chọn học sinh nào. Hãy tích dấu chọn vào tên của bạn trong danh sách trên!
                    </p>
                  )}

                  {selectedStudents.length === 1 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-xl border border-blue-200">
                        👤 Đăng nhập cá nhân: <strong>{selectedStudents[0].fullName}</strong> ({selectedStudents[0].studentCode})
                      </span>
                      <span className="text-[11px] text-slate-500">
                        (Có thể tích thêm 1 bạn để cùng ngồi chung máy)
                      </span>
                    </div>
                  )}

                  {selectedStudents.length === 2 && (
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-bold text-blue-700 bg-blue-100/90 px-2.5 py-1 rounded-xl border border-blue-200">
                        👤 Kỹ thuật viên: <strong>{selectedStudents[0].fullName}</strong> ({selectedStudents[0].studentCode})
                      </span>
                      <span className="text-slate-400 font-bold">⇄</span>
                      <span className="font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-1 rounded-xl border border-emerald-200">
                        👥 Thư ký: <strong>{selectedStudents[1].fullName}</strong> ({selectedStudents[1].studentCode})
                      </span>
                    </div>
                  )}
                </div>

                {/* Nút đổi vai trò nếu chọn 2 bạn */}
                {selectedStudents.length === 2 && (
                  <button
                    type="button"
                    onClick={handleSwapRoles}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-300 bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold transition-all shadow-xs shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Đổi vai KTV ⇄ Thư ký</span>
                  </button>
                )}
              </div>

              {/* Ô mật khẩu & Nút Đăng nhập */}
              <div className="pt-3 border-t border-blue-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu (Khởi tạo: 123)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập 123"
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading || selectedStudents.length === 0}
                    className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                      selectedStudents.length === 0
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : selectedStudents.length === 2
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                    }`}
                  >
                    <span>
                      {loading
                        ? 'Đang xác thực thông tin...'
                        : selectedStudents.length === 2
                        ? `👥 Đăng nhập Cặp đôi (${selectedStudents[0].fullName} & ${selectedStudents[1].fullName})`
                        : selectedStudents.length === 1
                        ? `🚀 Đăng nhập (${selectedStudents[0].fullName})`
                        : 'Vui lòng tích chọn tên em ở bảng trên'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* ============================================================== */
          /* FORM DÀNH RIÊNG CHO GIÁO VIÊN (THẦY TRƯƠNG IT) */
          /* ============================================================== */
          <form onSubmit={handleTeacherLogin} className="space-y-4 max-w-md mx-auto py-4">
            <div className="text-center space-y-1 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Kênh Quản trị & Giảng dạy Giáo viên
              </h3>
              <p className="text-xs text-slate-500">
                Chấm điểm tự động theo TT22, quản lý 116 bài giảng và đồng bộ Google Drive
              </p>
            </div>

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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800"
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? 'Đang xác thực quản trị...' : 'Vào kênh Quản trị Thầy Trương Thành Trường'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Học sinh quên tài khoản hoặc cần hỗ trợ ghép cặp hãy liên hệ trực tiếp <strong>Thầy Trương Thành Trường</strong> tại phòng máy Tin học.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-slate-50/50">
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Đang tải biểu mẫu đăng nhập...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
