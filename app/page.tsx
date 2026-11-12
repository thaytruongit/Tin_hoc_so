'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Laptop, 
  Users, 
  Search, 
  CheckCircle2, 
  RefreshCw, 
  Info, 
  Lock, 
  AlertCircle, 
  ArrowRight, 
  Monitor, 
  UserCheck, 
  KeyRound, 
  Eye, 
  EyeOff,
  School,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { Student } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  // 1. NỬA BÊN TRÁI: THÔNG TIN HỌC SINH CẦN ĐĂNG NHẬP
  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [selectedClassId, setSelectedClassId] = useState<string>('c-7a11');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudentCodes, setSelectedStudentCodes] = useState<string[]>(['7A1101']);

  // 2. NỬA BÊN PHẢI: TÀI KHOẢN ĐĂNG NHẬP & MẬT KHẨU
  const [assignedMachineId, setAssignedMachineId] = useState<number>(1);
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [adminPass, setAdminPass] = useState('666');
  const [showAdminPass, setShowAdminPass] = useState(false);

  // Trạng thái thông báo & loading
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('role') === 'teacher') {
          setRole('teacher');
        }
      } catch (e) {}
    }
  }, []);

  // Danh sách các Lớp thuộc Khối đang chọn
  const classesInGrade = useMemo(() => {
    return MOCK_CLASSES.filter((c) => c.grade === selectedGrade);
  }, [selectedGrade]);

  const handleSelectGrade = (grade: number) => {
    setSelectedGrade(grade);
    const classes = MOCK_CLASSES.filter((c) => c.grade === grade);
    if (classes.length > 0) {
      setSelectedClassId(classes[0].id);
      // Mặc định chọn học sinh đầu tiên của lớp mới
      const firstStudent = MOCK_STUDENTS.find(s => s.classId === classes[0].id);
      if (firstStudent) {
        setSelectedStudentCodes([firstStudent.studentCode]);
      } else {
        setSelectedStudentCodes([]);
      }
    }
    setError('');
    setInfoMessage('');
  };

  const handleSelectClass = (clsId: string) => {
    setSelectedClassId(clsId);
    const firstStudent = MOCK_STUDENTS.find(s => s.classId === clsId);
    if (firstStudent) {
      setSelectedStudentCodes([firstStudent.studentCode]);
    } else {
      setSelectedStudentCodes([]);
    }
    setError('');
    setInfoMessage('');
  };

  // Danh sách học sinh trong lớp đang chọn (kèm tìm kiếm nhanh)
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

  // Chi tiết học sinh đã được tích chọn
  const selectedStudents = useMemo(() => {
    return selectedStudentCodes
      .map((code) => MOCK_STUDENTS.find((s) => s.studentCode === code))
      .filter((s): s is Student => Boolean(s));
  }, [selectedStudentCodes]);

  // Xử lý bật/tắt chọn học sinh (Tối đa 2 bạn ghép cặp)
  const handleToggleStudent = (student: Student) => {
    setError('');
    setInfoMessage('');
    const code = student.studentCode;

    if (selectedStudentCodes.includes(code)) {
      if (selectedStudentCodes.length === 1) {
        setInfoMessage('Cần ít nhất 1 học sinh đăng nhập tại máy!');
        return;
      }
      setSelectedStudentCodes(selectedStudentCodes.filter((c) => c !== code));
    } else {
      if (selectedStudentCodes.length >= 2) {
        setInfoMessage('Phòng máy quy định tối đa 2 bạn ngồi cùng 1 máy trạm. Hãy bỏ chọn bạn trước nếu muốn thay đổi!');
        return;
      }
      setSelectedStudentCodes([...selectedStudentCodes, code]);
    }
  };

  // Đổi vai trò giữa 2 bạn tại máy
  const handleSwapRoles = () => {
    if (selectedStudentCodes.length === 2) {
      setSelectedStudentCodes([selectedStudentCodes[1], selectedStudentCodes[0]]);
    }
  };

  // Xử lý Đăng Nhập Học Sinh
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedStudents.length === 0) {
      setError('Vui lòng tích chọn tên học sinh ở nửa bên trái!');
      return;
    }

    if (password.trim() !== '123') {
      setError('Mật khẩu không chính xác! (Mật khẩu mặc định toàn trường: 123)');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const s1 = selectedStudents[0];
      const s2 = selectedStudents.length > 1 ? selectedStudents[1] : null;

      localStorage.setItem('truong_user_role', 'student');
      localStorage.setItem('truong_student_id', s1.id);
      localStorage.setItem('truong_student_code', s1.studentCode);
      localStorage.setItem('truong_student_name', s1.fullName);
      localStorage.setItem('truong_student_class', s1.className);
      localStorage.setItem('truong_student_grade', String(selectedGrade));
      localStorage.setItem('truong_machine_id', String(assignedMachineId));

      if (s2) {
        localStorage.setItem('truong_is_pair', 'true');
        localStorage.setItem('truong_partner_id', s2.id);
        localStorage.setItem('truong_partner_code', s2.studentCode);
        localStorage.setItem('truong_partner_name', s2.fullName);
        localStorage.setItem('truong_pair_names', `${s1.fullName} & ${s2.fullName}`);
      } else {
        localStorage.setItem('truong_is_pair', 'false');
        localStorage.removeItem('truong_partner_id');
        localStorage.removeItem('truong_partner_code');
        localStorage.removeItem('truong_partner_name');
        localStorage.removeItem('truong_pair_names');
      }

      router.push('/in-class');
    }, 250);
  };

  // Xử lý Đăng Nhập Giáo Viên (Admin pass: 666)
  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (adminPass.trim() !== '666') {
        setError('Mật khẩu quản trị không chính xác! (Mật mã Thầy Trường: 666)');
        setLoading(false);
        return;
      }

      localStorage.setItem('truong_user_role', 'teacher');
      localStorage.setItem('truong_teacher_name', 'Thầy Đỗ Mạnh Trường');
      sessionStorage.removeItem('truong_initial_flow_completed');
      sessionStorage.removeItem('truong_period_modal_dismissed');
      router.push('/teacher?tab=in-class');
    }, 250);
  };

  if (!mounted) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md w-full">
          <p className="text-sm font-semibold text-slate-500">Đang khởi tạo cổng đăng nhập THCS Mão Điền...</p>
        </div>
      </div>
    );
  }

  const currentSelectedClass = classesInGrade.find(c => c.id === selectedClassId) || classesInGrade[0];

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 edu-grid-bg">
      
      {/* KHỐI CHÍNH TOÀN MÀN HÌNH CHIA LÀM 2 NỬA */}
      <div className="w-full max-w-6xl bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden flex flex-col">
        
        {/* BANNER ĐỈNH SƯ PHẠM */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-xs">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                  CỔNG ĐĂNG NHẬP PHÒNG HỌC TIN HỌC SỐ
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  THCS MÃO ĐIỀN
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Giáo viên phụ trách: <strong className="text-slate-800">Thầy Đỗ Mạnh Trường</strong> · 670 Học sinh (Khối 6, 7, 8, 9)
              </p>
            </div>
          </div>

          {/* TAB CHUYỂN ĐỔI VAI TRÒ NHANH TRÊN HEADER */}
          <div className="inline-flex bg-slate-200/80 p-1 rounded-2xl border border-slate-300 shrink-0">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); setInfoMessage(''); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                role === 'student'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Học Sinh Thực Hành (123)</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole('teacher'); setError(''); setInfoMessage(''); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                role === 'teacher'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Giáo Viên (666)</span>
            </button>
          </div>
        </div>

        {/* THÔNG BÁO LỖI NẾU CÓ */}
        {error && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* ================================================================== */}
        {/* THÂN MÀN HÌNH CHIA LÀM 2 NỬA                                      */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* ================================================================ */}
          {/* NỬA BÊN TRÁI (7 CỘT): THÔNG TIN HỌC SINH CẦN ĐĂNG NHẬP           */}
          {/* ================================================================ */}
          <div className="lg:col-span-7 p-6 sm:p-7 space-y-5 bg-slate-50/50 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight">
                    Thông Tin Học Sinh Cần Đăng Nhập
                  </h2>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  {studentsInClass.length} Học sinh lớp {currentSelectedClass?.name}
                </span>
              </div>

              {/* BƯỚC 1: CHỌN KHỐI LỚP (6, 7, 8, 9) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  a) Chọn khối học:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 7, 8, 9].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleSelectGrade(g)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        selectedGrade === g
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Khối {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* BƯỚC 2: CHỌN LỚP HỌC */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  b) Chọn lớp học:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-32 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
                  {classesInGrade.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectClass(c.id)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all border text-left flex items-center justify-between ${
                        selectedClassId === c.id
                          ? 'bg-blue-50 border-blue-400 text-blue-800'
                          : 'bg-white border-transparent text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{c.studentCount} HS</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* BƯỚC 3: TÌM KIẾM & DANH SÁCH HỌC SINH TÍCH CHỌN */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    c) Tích chọn học sinh ngồi tại máy (1 hoặc 2 bạn):
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Đã chọn: <strong className="text-blue-700">{selectedStudents.length}/2 bạn</strong>
                  </span>
                </div>

                {/* Ô tìm kiếm tên */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Tìm nhanh tên học sinh lớp ${currentSelectedClass?.name}...`}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Danh sách học sinh */}
                <div className="max-h-52 overflow-y-auto border border-slate-200 rounded-xl p-2 bg-white space-y-1.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {studentsInClass.map((student, idx) => {
                      const isSelected = selectedStudentCodes.includes(student.studentCode);
                      const selIndex = selectedStudentCodes.indexOf(student.studentCode);

                      return (
                        <button
                          key={student.studentCode}
                          type="button"
                          onClick={() => handleToggleStudent(student)}
                          className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-2xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {isSelected ? (selIndex === 0 ? '1' : '2') : idx + 1}
                            </span>
                            <div className="truncate">
                              <div className="text-xs font-bold truncate">{student.fullName}</div>
                              <div className="text-[10px] text-slate-400">
                                Mã: {student.studentCode}
                              </div>
                            </div>
                          </div>

                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* THẺ TÓM TẮT HỌC SINH ĐÃ CHỌN Ở CUỐI NỬA TRÁI */}
            <div className="mt-4 p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold uppercase text-blue-700 tracking-wider">
                  Học Sinh Đăng Nhập Tại Máy:
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {selectedStudents.length === 0 ? (
                    <span className="text-slate-400 italic">Chưa chọn học sinh nào</span>
                  ) : selectedStudents.length === 1 ? (
                    <span>Bạn 1: <strong className="text-blue-700">{selectedStudents[0].fullName}</strong> ({selectedStudents[0].studentCode})</span>
                  ) : (
                    <span>
                      1. <strong className="text-blue-700">{selectedStudents[0].fullName}</strong> ⇄ 2. <strong className="text-indigo-700">{selectedStudents[1].fullName}</strong>
                    </span>
                  )}
                </div>
              </div>

              {selectedStudents.length === 2 && (
                <button
                  type="button"
                  onClick={handleSwapRoles}
                  className="px-2.5 py-1 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1 shrink-0"
                  title="Đổi vai trò giữa 2 bạn"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Đổi vai</span>
                </button>
              )}
            </div>

          </div>

          {/* ================================================================ */}
          {/* NỬA BÊN PHẢI (5 CỘT): TÀI KHOẢN ĐĂNG NHẬP, MẬT KHẨU               */}
          {/* ================================================================ */}
          <div className="lg:col-span-5 p-6 sm:p-7 space-y-6 bg-white flex flex-col justify-between">
            
            <div className="space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight">
                    Tài Khoản Đăng Nhập &amp; Mật Khẩu
                  </h2>
                </div>
                <span className="text-xs font-bold text-indigo-700">
                  {role === 'student' ? 'Học Sinh' : 'Thầy Trường'}
                </span>
              </div>

              {role === 'student' ? (
                /* FORM ĐĂNG NHẬP HỌC SINH */
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  
                  {/* Ô TÀI KHOẢN / MÃ HỌC SINH */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Tài khoản đăng nhập (Mã HS):
                    </label>
                    <div className="p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-800 flex items-center justify-between">
                      <div className="truncate">
                        {selectedStudents.length > 0 ? (
                          <span className="text-blue-700 font-mono">
                            {selectedStudents.map(s => s.studentCode).join(' / ')}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Vui lòng chọn học sinh ở nửa bên trái</span>
                        )}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-500 font-bold shrink-0">
                        {selectedStudents.length === 2 ? 'Cặp đôi' : 'Cá nhân'}
                      </span>
                    </div>
                  </div>

                  {/* CHỌN SỐ MÁY PHÒNG THỰC HÀNH */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Vị trí máy trạm phòng thực hành (1 ➔ 24):
                    </label>
                    <div className="relative">
                      <Monitor className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={assignedMachineId}
                        onChange={(e) => setAssignedMachineId(Number(e.target.value))}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-blue-700 bg-white focus:outline-none focus:border-blue-500"
                      >
                        {Array.from({ length: 24 }, (_, i) => i + 1).map((mNum) => (
                          <option key={mNum} value={mNum}>
                            Máy {mNum < 10 ? `0${mNum}` : mNum} · Phòng thực hành Tin học THCS Mão Điền
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Ô NHẬP MẬT KHẨU */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        Mật khẩu:
                      </label>
                      <span className="text-[11px] text-slate-400">
                        Mặc định toàn trường: <strong className="text-blue-600 font-bold">123</strong>
                      </span>
                    </div>

                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập 123"
                        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-blue-500"
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

                  {/* NÚT BẤM ĐĂNG NHẬP */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || selectedStudents.length === 0}
                      className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                        selectedStudents.length === 0
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:scale-[1.01]'
                      }`}
                    >
                      <Laptop className="w-4 h-4" />
                      <span>
                        {loading
                          ? 'Đang vào phòng học...'
                          : selectedStudents.length > 0
                          ? `Đăng Nhập Máy ${assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId} Vào Lớp Học`
                          : 'Vui lòng chọn học sinh ở nửa bên trái'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              ) : (
                /* FORM ĐĂNG NHẬP GIÁO VIÊN */
                <form onSubmit={handleTeacherLogin} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
                    <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mx-auto">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-extrabold text-slate-900">
                      Thầy Đỗ Mạnh Trường
                    </div>
                    <p className="text-[11px] text-amber-800 font-medium">
                      Giáo viên giảng dạy môn Tin học · Trường THCS Mão Điền
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Tài khoản giáo viên:
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Thầy Đỗ Mạnh Trường (Admin)"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-slate-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        Mật khẩu quản trị:
                      </label>
                      <span className="text-[11px] text-amber-700 font-bold">
                        Mật mã đặc quyền: 666
                      </span>
                    </div>

                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showAdminPass ? 'text' : 'password'}
                        value={adminPass}
                        onChange={(e) => setAdminPass(e.target.value)}
                        placeholder="Nhập 666"
                        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 bg-amber-50/30 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAdminPass(!showAdminPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{loading ? 'Đang mở bàn quản trị...' : 'Đăng Nhập Bàn Quản Lý Giáo Viên (Mã 666)'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* CHÚ THÍCH HỖ TRỢ DƯỚI CÙNG NỬA PHẢI */}
            <div className="text-[11px] text-slate-400 text-center pt-4 border-t border-slate-100">
              Hệ sinh thái Tin học số chuẩn GDPT 2018 · THCS Mão Điền, Thuận Thành, Bắc Ninh
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}