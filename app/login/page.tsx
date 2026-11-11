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
  School
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { Student } from '@/lib/types';

function LoginForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  
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
  
  // 1. Lựa chọn Khối và Lớp
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

  // Xử lý tích chọn học sinh (Tối đa 2 em / máy)
  const handleToggleStudent = (student: Student) => {
    setError('');
    setInfoMessage('');
    const code = student.studentCode;

    if (selectedStudentCodes.includes(code)) {
      setSelectedStudentCodes(selectedStudentCodes.filter((c) => c !== code));
    } else {
      if (selectedStudentCodes.length >= 2) {
        setInfoMessage('Phòng máy quy định học tập cặp đôi tối đa 2 bạn ngồi chung 1 máy. Hãy bỏ chọn bạn trước nếu muốn thay đổi!');
        return;
      }
      setSelectedStudentCodes([...selectedStudentCodes, code]);
    }
  };

  // Đổi vai trò giữa 2 bạn
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
      setError('Vui lòng tích chọn tên học sinh ngồi tại máy!');
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
    }, 300);
  };

  // Xử lý Đăng nhập Giáo viên
  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (adminPass.trim() !== '666') {
        setError('Mật khẩu quản trị không chính xác! (Mật mã Thầy: 666)');
        setLoading(false);
        return;
      }

      localStorage.setItem('truong_user_role', 'teacher');
      localStorage.setItem('truong_teacher_name', 'Thầy Đỗ Mạnh Trường');
      router.push('/teacher');
    }, 300);
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 shadow-sm">
        <p className="text-sm font-semibold">Đang tải danh sách lớp học THCS Mão Điền...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
      
      {/* HEADER NỀN SÁNG TRANG NHÃ */}
      <div className="bg-slate-50 border-b border-slate-200 p-6 sm:p-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-3">
          <School className="w-4 h-4 text-blue-600" />
          <span>Trường THCS Mão Điền · Thầy Đỗ Mạnh Trường</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          CỔNG ĐĂNG NHẬP PHÒNG HỌC TIN HỌC
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Hệ sinh thái học tập số và thực hành trực tiếp tại phòng máy
        </p>

        {/* TAB CHUYỂN ĐỔI VAI TRÒ */}
        <div className="mt-6 inline-flex bg-slate-200/70 p-1 rounded-2xl border border-slate-300">
          <button
            type="button"
            onClick={() => { setRole('student'); setError(''); }}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              role === 'student'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Học Sinh Thực Hành (123)</span>
          </button>
          <button
            type="button"
            onClick={() => { setRole('teacher'); setError(''); }}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              role === 'teacher'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Giáo Viên Phụ Trách (666)</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2.5">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{infoMessage}</span>
          </div>
        )}

        {role === 'student' ? (
          <form onSubmit={handleStudentLogin} className="space-y-6">
            
            {/* BƯỚC 1: CHỌN KHỐI & LỚP */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                  <span>Chọn Khối và Lớp Học</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">
                  Sĩ số: <strong className="text-blue-600 font-bold">{studentsInClass.length} học sinh</strong>
                </span>
              </div>

              {/* Nút chọn khối */}
              <div className="grid grid-cols-4 gap-2">
                {[6, 7, 8, 9].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleSelectGrade(g)}
                    className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                      selectedGrade === g
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Khối {g}
                  </button>
                ))}
              </div>

              {/* Nút chọn lớp */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {classesInGrade.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectClass(c.id)}
                    className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border text-left flex items-center justify-between ${
                      selectedClassId === c.id
                        ? 'bg-blue-50 border-blue-400 text-blue-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{c.studentCount} HS</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BƯỚC 2: CHỌN MÁY VÀ HỌC SINH CÙNG MÁY */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                  <span>Chọn Vị Trí Máy & Tích Chọn 2 Bạn Cùng Máy</span>
                </label>

                {/* Chọn số máy */}
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-700">Máy Thực Hành:</span>
                  <select
                    value={assignedMachineId}
                    onChange={(e) => setAssignedMachineId(Number(e.target.value))}
                    className="bg-white border border-slate-300 rounded-lg px-2 py-0.5 text-xs font-bold text-blue-700 focus:outline-none"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 1).map((mNum) => (
                      <option key={mNum} value={mNum}>
                        Máy {mNum < 10 ? `0${mNum}` : mNum}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Thông tin máy và cặp đôi */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    M{assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span>Vị trí: <strong>Máy {assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId}</strong></span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-blue-200 text-blue-700 font-bold">
                        {selectedStudents.length === 2 ? 'Đủ 2 bạn' : selectedStudents.length === 1 ? '1 bạn' : 'Chưa chọn'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {selectedStudents.length === 0 ? (
                        <span className="italic text-slate-400">Tích chọn tên các em ở bảng danh sách bên dưới</span>
                      ) : selectedStudents.length === 1 ? (
                        <span>Học sinh: <strong className="text-blue-700">{selectedStudents[0].fullName}</strong> ({selectedStudents[0].studentCode})</span>
                      ) : (
                        <span>
                          Bạn 1: <strong className="text-blue-700">{selectedStudents[0].fullName}</strong> ⇄ Bạn 2: <strong className="text-indigo-700">{selectedStudents[1].fullName}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {selectedStudents.length === 2 && (
                  <button
                    type="button"
                    onClick={handleSwapRoles}
                    className="px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
                    title="Đổi vai trò giữa 2 bạn"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Đổi vai</span>
                  </button>
                )}
              </div>

              {/* Ô tìm kiếm tên học sinh */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Tìm nhanh tên học sinh lớp ${classesInGrade.find((c) => c.id === selectedClassId)?.name || ''}...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 bg-slate-50/50 text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Danh sách học sinh */}
              <div className="max-h-56 overflow-y-auto pr-1 border border-slate-200 rounded-xl p-2 bg-slate-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                            ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {isSelected ? (selIndex === 0 ? '1' : '2') : idx + 1}
                          </span>
                          <div className="truncate">
                            <div className="text-xs font-bold truncate">{student.fullName}</div>
                            <div className="text-[10px] text-slate-400">
                              Mã: {student.studentCode} · {student.totalXp} điểm
                            </div>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
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

            {/* BƯỚC 3: MẬT KHẨU & NÚT VÀO HỌC */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-64">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Mật khẩu (Mặc định: <strong className="text-blue-600">123</strong>)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123"
                    className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 bg-white"
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

              <div className="w-full sm:flex-1 pt-2 sm:pt-0">
                <button
                  type="submit"
                  disabled={loading || selectedStudents.length === 0}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 ${
                    selectedStudents.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  }`}
                >
                  <Laptop className="w-4 h-4" />
                  <span>
                    {loading
                      ? 'Đang kết nối vào phòng máy...'
                      : selectedStudents.length === 2
                      ? `Bắt Đầu Thực Hành Máy ${assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId} (${selectedStudents[0].fullName} & ${selectedStudents[1].fullName})`
                      : selectedStudents.length === 1
                      ? `Bắt Đầu Thực Hành Máy ${assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId} (${selectedStudents[0].fullName})`
                      : 'Vui lòng tích chọn tên học sinh ở trên'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </form>
        ) : (
          /* FORM DÀNH CHO GIÁO VIÊN (MẬT KHẨU: 666) */
          <form onSubmit={handleTeacherLogin} className="space-y-4 max-w-md mx-auto py-6">
            <div className="text-center space-y-1 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 font-bold">
                <UserCheck className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Bàn Quản Lý Giáo Viên · Thầy Đỗ Mạnh Trường
              </h2>
              <p className="text-xs text-slate-500">
                Toàn quyền điều hành tiết học, khen thưởng Sao Vàng và 1-click xuất sổ điểm Excel
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mật mã quản trị viên
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="Nhập 666"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-300 text-sm font-bold focus:outline-none focus:border-amber-500 text-amber-800 bg-amber-50/30"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Mật mã đặc quyền: <strong className="text-amber-700">666</strong></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <UserCheck className="w-4 h-4" />
              <span>{loading ? 'Đang mở bàn điều hành...' : 'Mở Bàn Quản Trị Giáo Viên (Mã 666)'}</span>
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 edu-grid-bg">
      <LoginForm />
    </div>
  );
}
