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
  EyeOff,
  Monitor
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { Student, ClassItem } from '@/lib/types';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'teacher' ? 'teacher' : 'student';

  const [role, setRole] = useState<'student' | 'teacher'>(initialRole);
  
  // 1. Lựa chọn Khối và Lớp (Dropdown / Thanh chọn)
  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [selectedClassId, setSelectedClassId] = useState<string>('c-7a11');
  
  // 2. Tìm kiếm học sinh trong danh sách
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // 3. Danh sách học sinh được tích chọn ghép cặp (Tối đa 2 em / máy)
  const [selectedStudentCodes, setSelectedStudentCodes] = useState<string[]>([]);
  
  // 4. Số máy ngồi phòng thực hành (1 -> 24 máy)
  const [assignedMachineId, setAssignedMachineId] = useState<number>(1);
  
  // Mật khẩu & trạng thái
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Form giáo viên quản trị (Admin pass: 666)
  const [adminPass, setAdminPass] = useState('666');

  // Lọc danh sách Lớp theo Khối đang chọn
  const classesInGrade = useMemo(() => {
    return MOCK_CLASSES.filter((c) => c.grade === selectedGrade);
  }, [selectedGrade]);

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

  // Xử lý bật/tắt tích chọn học sinh (Tối đa 2 em ghép cặp)
  const handleToggleStudent = (student: Student) => {
    setError('');
    setInfoMessage('');
    const code = student.studentCode;

    if (selectedStudentCodes.includes(code)) {
      setSelectedStudentCodes(selectedStudentCodes.filter((c) => c !== code));
    } else {
      if (selectedStudentCodes.length >= 2) {
        setInfoMessage('⚠️ Phòng máy quy định tối đa 2 bạn ngồi chung 1 máy. Hãy bỏ tích bạn trước nếu muốn chọn bạn khác!');
        return;
      }
      setSelectedStudentCodes([...selectedStudentCodes, code]);
    }
  };

  // Đổi vai trò giữa 2 bạn (Kỹ thuật viên ⇄ Thư ký)
  const handleSwapRoles = () => {
    if (selectedStudentCodes.length === 2) {
      setSelectedStudentCodes([selectedStudentCodes[1], selectedStudentCodes[0]]);
    }
  };

  // Xử lý Đăng nhập Học sinh
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedStudents.length === 0) {
      setError('Vui lòng tích dấu chọn ít nhất 1 học sinh trong danh sách lớp bên dưới!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Mật khẩu học sinh: 123
      if (password.trim() !== '123') {
        setError('Mật khẩu không chính xác. Mật khẩu mặc định của phòng máy là: 123');
        setLoading(false);
        return;
      }

      const currentClassObj = MOCK_CLASSES.find((c) => c.id === selectedClassId);
      const s1 = selectedStudents[0];
      const s2 = selectedStudents[1] || null;

      // Lưu phiên học sinh vào localStorage
      localStorage.setItem('truong_user_role', 'student');
      localStorage.setItem('truong_student_code', s1.studentCode);
      localStorage.setItem('truong_student_name', s1.fullName);
      localStorage.setItem('truong_student_class', currentClassObj?.name || s1.className);
      localStorage.setItem('truong_student_grade', String(selectedGrade));
      localStorage.setItem('truong_machine_id', String(assignedMachineId));

      if (s2) {
        localStorage.setItem('truong_pair_student_code', s2.studentCode);
        localStorage.setItem('truong_pair_student_name', s2.fullName);
        localStorage.setItem('truong_pair_mode', 'true');
      } else {
        localStorage.removeItem('truong_pair_student_code');
        localStorage.removeItem('truong_pair_student_name');
        localStorage.setItem('truong_pair_mode', 'false');
      }

      // Thông báo cho hệ thống điều khiển phòng máy
      try {
        const storedMachines = localStorage.getItem('truong_lab_machines');
        if (storedMachines) {
          const machines = JSON.parse(storedMachines);
          const target = machines.find((m: any) => m.machineId === assignedMachineId);
          if (target) {
            target.student1Name = s1.fullName;
            target.student2Name = s2 ? s2.fullName : '';
            target.status = 'active';
            localStorage.setItem('truong_lab_machines', JSON.stringify(machines));
          }
        }
      } catch (err) {}

      // Chuyển hướng vào trang học tập trực tiếp trên lớp
      router.push('/in-class');
    }, 400);
  };

  // Xử lý Đăng nhập Giáo viên (Admin pass: 666)
  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (adminPass.trim() !== '666') {
        setError('Mật khẩu quản trị không chính xác! (Mật khẩu Thầy: 666)');
        setLoading(false);
        return;
      }

      localStorage.setItem('truong_user_role', 'teacher');
      localStorage.setItem('truong_teacher_name', 'Thầy Trương Thành Trường');
      router.push('/teacher');
    }, 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
      {/* Header chuyển đổi Vai trò */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 p-6 text-white text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 shadow-inner">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            CỔNG HỌC TẬP TIN HỌC THCS MÃO ĐIỀN
          </h2>
          <p className="text-xs text-blue-100 font-medium mt-1">
            Hệ thống Dạy học 3 Hoạt động · Thầy Trương Thành Trường
          </p>

          {/* Tab chuyển đổi vai trò */}
          <div className="mt-4 flex bg-black/20 p-1 rounded-2xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                role === 'student' ? 'bg-white text-blue-700 shadow-md' : 'text-white/80 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Học sinh vào lớp</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole('teacher'); setError(''); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                role === 'teacher' ? 'bg-white text-slate-900 shadow-md' : 'text-white/80 hover:text-white'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Giáo viên (Admin: 666)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2.5">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{infoMessage}</span>
          </div>
        )}

        {role === 'student' ? (
          <form onSubmit={handleStudentLogin} className="space-y-6">
            {/* BƯỚC 1: CHỌN KHỐI LỚP & LỚP HỌC */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Chọn Khối & Lớp Học</span>
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  Sĩ số lớp: <strong className="text-blue-600">{studentsInClass.length} học sinh</strong>
                </span>
              </div>

              {/* Nút chọn Khối 6, 7, 8, 9 */}
              <div className="grid grid-cols-4 gap-2">
                {[6, 7, 8, 9].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleSelectGrade(g)}
                    className={`py-2.5 rounded-xl font-black text-xs transition-all border ${
                      selectedGrade === g
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Khối {g}
                  </button>
                ))}
              </div>

              {/* Nút chọn Lớp cụ thể trong khối */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {classesInGrade.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectClass(c.id)}
                    className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border text-left flex items-center justify-between ${
                      selectedClassId === c.id
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{c.studentCount} HS</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BƯỚC 2: TÍCH CHỌN GHÉP CẶP HỌC SINH & SỐ MÁY PHÒNG MÁY */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Tích chọn học sinh ghép cặp (Tối đa 2 bạn/máy)</span>
                </label>

                {/* Chọn số máy ngồi */}
                <div className="flex items-center gap-2 bg-indigo-50/80 px-3 py-1.5 rounded-xl border border-indigo-200 shrink-0">
                  <Monitor className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-900">Ngồi Máy số:</span>
                  <select
                    value={assignedMachineId}
                    onChange={(e) => setAssignedMachineId(Number(e.target.value))}
                    className="bg-white border border-indigo-300 rounded-lg px-2 py-0.5 text-xs font-black text-indigo-700 focus:outline-none"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 1).map((mNum) => (
                      <option key={mNum} value={mNum}>
                        Máy {mNum < 10 ? `0${mNum}` : mNum}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Khung hiển thị 2 học sinh đang được chọn */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                    M{assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId}
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 flex items-center gap-2">
                      <span>Vị trí máy: <strong>Máy {assignedMachineId}</strong></span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-200/80 text-blue-900 font-bold">
                        {selectedStudents.length === 2 ? 'Đủ Cặp 2 Bạn' : selectedStudents.length === 1 ? '1 Bạn ngồi' : 'Chưa tích chọn'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {selectedStudents.length === 0 ? (
                        <span className="italic text-slate-400">Hãy tích dấu vào tên em trong danh sách bên dưới</span>
                      ) : selectedStudents.length === 1 ? (
                        <span><strong>1. {selectedStudents[0].fullName}</strong> (Mã: {selectedStudents[0].studentCode})</span>
                      ) : (
                        <span>
                          <strong>1. {selectedStudents[0].fullName}</strong> ⇄ <strong>2. {selectedStudents[1].fullName}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {selectedStudents.length === 2 && (
                  <button
                    type="button"
                    onClick={handleSwapRoles}
                    className="px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 self-start sm:self-center"
                    title="Đổi vai trò giữa 2 bạn"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Đổi thứ tự</span>
                  </button>
                )}
              </div>

              {/* Ô tìm kiếm nhanh học sinh */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Tìm nhanh theo tên học sinh lớp ${classesInGrade.find((c) => c.id === selectedClassId)?.name || ''}...`}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                />
              </div>

              {/* Danh sách học sinh dạng thẻ tích chọn (Grid 2 cột) */}
              <div className="max-h-56 overflow-y-auto pr-1 border border-slate-200 rounded-2xl p-2 space-y-1 bg-white scrollbar-thin">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {studentsInClass.map((student, idx) => {
                    const isSelected = selectedStudentCodes.includes(student.studentCode);
                    const selIndex = selectedStudentCodes.indexOf(student.studentCode);

                    return (
                      <button
                        key={student.studentCode}
                        type="button"
                        onClick={() => handleToggleStudent(student)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold ring-1 ring-blue-500/30'
                            : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Số thứ tự hoặc thứ tự cặp */}
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {isSelected ? selIndex + 1 : idx + 1}
                          </span>
                          <div className="truncate">
                            <div className="text-xs truncate">{student.fullName}</div>
                            <div className="text-[10px] text-slate-400 font-normal">
                              Mã: {student.studentCode} · Ngày sinh: {student.dob}
                            </div>
                          </div>
                        </div>

                        {/* Hộp checkbox trực quan */}
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* BƯỚC 3: MẬT KHẨU PHÒNG MÁY & NÚT ĐĂNG NHẬP */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-72">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mật khẩu phòng máy (Mặc định: <strong>123</strong>)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập 123"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800"
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

              <div className="w-full sm:flex-1 pt-4 sm:pt-0">
                <button
                  type="submit"
                  disabled={loading || selectedStudents.length === 0}
                  className={`w-full py-3 rounded-xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                    selectedStudents.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25'
                  }`}
                >
                  <span>
                    {loading
                      ? 'Đang xác thực và vào vị trí máy...'
                      : selectedStudents.length === 2
                      ? `👥 Đăng nhập Cặp đôi vào Máy ${assignedMachineId} (${selectedStudents[0].fullName} & ${selectedStudents[1].fullName})`
                      : selectedStudents.length === 1
                      ? `🚀 Đăng nhập vào Máy ${assignedMachineId} (${selectedStudents[0].fullName})`
                      : 'Vui lòng tích chọn tên em ở danh sách trên'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* FORM DÀNH CHO GIÁO VIÊN (ADMIN MẬT KHẨU: 666) */
          <form onSubmit={handleTeacherLogin} className="space-y-4 max-w-md mx-auto py-6">
            <div className="text-center space-y-1 mb-6">
              <h3 className="text-lg font-black text-slate-900">
                Kênh Quản Trị Thầy Trương Thành Trường
              </h3>
              <p className="text-xs text-slate-500">
                Điều hành 3 hoạt động trực tiếp, phòng học 3D thời gian thực và quản lý điểm số
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mật khẩu Quản trị Admin
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="Nhập 666"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-black focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 tracking-widest text-slate-900"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Mật khẩu chuẩn Thầy đã ấn định: <strong>666</strong></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? 'Đang vào bảng điều khiển...' : 'Vào Bảng Chỉ Huy Phòng Học 3D (Admin)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
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
