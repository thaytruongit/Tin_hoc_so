'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Monitor,
  Zap,
  Shield,
  Crown
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { Student, ClassItem } from '@/lib/types';

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

  // Xử lý bật/tắt tích chọn học sinh (Tối đa 2 em ghép cặp)
  const handleToggleStudent = (student: Student) => {
    setError('');
    setInfoMessage('');
    const code = student.studentCode;

    if (selectedStudentCodes.includes(code)) {
      setSelectedStudentCodes(selectedStudentCodes.filter((c) => c !== code));
    } else {
      if (selectedStudentCodes.length >= 2) {
        setInfoMessage('⚠️ Phòng máy quy định buồng lái kép tối đa 2 bạn ngồi chung 1 máy. Hãy bỏ chọn bạn trước nếu muốn thay đổi!');
        return;
      }
      setSelectedStudentCodes([...selectedStudentCodes, code]);
    }
  };

  // Đổi vai trò giữa 2 bạn (Cơ trưởng ⇄ Cơ phó)
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
      setError('Vui lòng tích chọn ít nhất 1 học sinh để kích hoạt buồng lái!');
      return;
    }

    if (password.trim() !== '123') {
      setError('Mật khẩu buồng lái không chính xác! (Mật khẩu mặc định toàn trường: 123)');
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
      localStorage.setItem('truong_teacher_name', 'Thầy Đỗ Mạnh Trường');
      router.push('/teacher');
    }, 300);
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-4xl mx-auto cyber-hud-card rounded-3xl border border-cyan-500/40 p-12 text-center text-cyan-300">
        <Zap className="w-8 h-8 text-cyan-400 animate-pulse mx-auto mb-3" />
        <p className="text-sm font-bold">Đang khởi tạo Trạm Căn Cước 670 Học Sinh...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto cyber-hud-card rounded-3xl border border-cyan-500/40 shadow-neon-cyan/20 overflow-hidden">
      {/* Header chuyển đổi Vai trò Game */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 p-6 sm:p-8 text-white text-center relative overflow-hidden border-b border-cyan-500/30">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-cyan-500/20 border-2 border-cyan-400/50 rounded-2xl flex items-center justify-center mb-3 shadow-neon-cyan/50">
            <Zap className="w-8 h-8 text-cyan-300 animate-pulse" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-wider glow-text-cyan uppercase">
            Trạm Kích Hoạt Buồng Lái · THCS Mão Điền
          </h2>
          <p className="text-xs text-cyan-300/80 font-bold mt-1 uppercase tracking-widest">
            Hệ sinh thái học tập số · Thầy Đỗ Mạnh Trường
          </p>

          {/* Tab chuyển đổi vai trò */}
          <div className="mt-5 flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-700/80 backdrop-blur-md">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                role === 'student' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan/40 border border-cyan-300/40' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Phi Hành Đoàn (Học Sinh - 123)</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole('teacher'); setError(''); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                role === 'teacher' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-neon-gold/40 border border-amber-300/40' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>Tổng Chỉ Huy (Thầy Trường - 666)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 bg-slate-950/60">
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-bold flex items-center gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs font-medium flex items-center gap-2.5">
            <Info className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{infoMessage}</span>
          </div>
        )}

        {role === 'student' ? (
          <form onSubmit={handleStudentLogin} className="space-y-6">
            {/* BƯỚC 1: CHỌN GUILD KHỐI & LỚP */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[10px] font-black">1</span>
                  <span>Chọn Quân Đoàn Khối & Lớp Học</span>
                </label>
                <span className="text-[11px] font-bold text-slate-400">
                  Sĩ số: <strong className="text-cyan-400">{studentsInClass.length} Chiến binh</strong>
                </span>
              </div>

              {/* Nút chọn Khối 6, 7, 8, 9 */}
              <div className="grid grid-cols-4 gap-2">
                {[6, 7, 8, 9].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleSelectGrade(g)}
                    className={`py-2.5 rounded-2xl font-black text-xs transition-all border ${
                      selectedGrade === g
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-neon-cyan/40 scale-[1.02]'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
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
                    className={`py-2.5 px-3 rounded-2xl font-black text-xs transition-all border text-left flex items-center justify-between ${
                      selectedClassId === c.id
                        ? 'bg-purple-900/60 border-purple-400 text-purple-200 shadow-neon-purple/40 ring-1 ring-purple-400/50'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-slate-500">{c.studentCount} HS</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BƯỚC 2: TÍCH CHỌN PHI CÔNG GHÉP CẶP & VỊ TRÍ TRẠM MÁY (MÁY 01-24) */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[10px] font-black">2</span>
                  <span>Tác Chiến Buồng Lái Kép (Tối đa 2 Bạn/Máy)</span>
                </label>

                {/* Chọn số máy ngồi */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-2xl border border-cyan-500/40 shrink-0">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-black text-cyan-300">Trạm Máy:</span>
                  <select
                    value={assignedMachineId}
                    onChange={(e) => setAssignedMachineId(Number(e.target.value))}
                    className="bg-slate-950 border border-cyan-500/60 rounded-xl px-2.5 py-0.5 text-xs font-black text-cyan-300 focus:outline-none"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 1).map((mNum) => (
                      <option key={mNum} value={mNum}>
                        Máy {mNum < 10 ? `0${mNum}` : mNum}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Khung hiển thị 2 học sinh buồng lái */}
              <div className="p-4 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-neon-cyan/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-black text-sm shadow-neon-cyan/40 shrink-0 border border-cyan-300/40">
                    M{assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId}
                  </div>
                  <div>
                    <div className="text-xs font-black text-white flex items-center gap-2">
                      <span>Vị trí: <strong className="text-cyan-300">Trạm Máy {assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId}</strong></span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-extrabold uppercase">
                        {selectedStudents.length === 2 ? '👥 Đủ Cặp 2 Phi Công' : selectedStudents.length === 1 ? '👤 1 Phi Công' : '⚠️ Chưa chọn'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {selectedStudents.length === 0 ? (
                        <span className="italic text-slate-500">Tích chọn tên bạn từ danh sách bên dưới để ghép cặp buồng lái</span>
                      ) : selectedStudents.length === 1 ? (
                        <span>Cơ trưởng: <strong className="text-cyan-300">{selectedStudents[0].fullName}</strong> ({selectedStudents[0].studentCode})</span>
                      ) : (
                        <span>
                          Cơ trưởng: <strong className="text-cyan-300">{selectedStudents[0].fullName}</strong> ⇄ Cơ phó: <strong className="text-purple-300">{selectedStudents[1].fullName}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {selectedStudents.length === 2 && (
                  <button
                    type="button"
                    onClick={handleSwapRoles}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-purple-500/50 text-purple-300 hover:text-white hover:bg-purple-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 self-start sm:self-center"
                    title="Đổi vai trò Cơ trưởng ⇄ Cơ phó"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>Đổi vai trò</span>
                  </button>
                )}
              </div>

              {/* Ô tìm kiếm nhanh */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Tìm nhanh tên học sinh lớp ${classesInGrade.find((c) => c.id === selectedClassId)?.name || ''}...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-800 text-xs focus:outline-none focus:border-cyan-500 bg-slate-900/80 text-white placeholder-slate-500"
                />
              </div>

              {/* Danh sách học sinh phong cách thẻ bài Anh Hùng */}
              <div className="max-h-56 overflow-y-auto pr-1 border border-slate-800 rounded-2xl p-2 space-y-1 bg-slate-950/80 scrollbar-thin">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {studentsInClass.map((student, idx) => {
                    const isSelected = selectedStudentCodes.includes(student.studentCode);
                    const selIndex = selectedStudentCodes.indexOf(student.studentCode);

                    return (
                      <button
                        key={student.studentCode}
                        type="button"
                        onClick={() => handleToggleStudent(student)}
                        className={`p-2.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-cyan-950/70 border-cyan-400 text-cyan-200 shadow-neon-cyan/30'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                            isSelected ? 'bg-cyan-400 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {isSelected ? (selIndex === 0 ? 'P1' : 'P2') : idx + 1}
                          </span>
                          <div className="truncate">
                            <div className="text-xs font-bold text-white truncate">{student.fullName}</div>
                            <div className="text-[10px] text-slate-400">
                              Mã: {student.studentCode} · Cấp {student.level} ({student.totalXp} XP)
                            </div>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? 'bg-cyan-400 border-cyan-400 text-slate-950 font-black' : 'border-slate-700 bg-slate-900'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* BƯỚC 3: MẬT KHẨU PHI THUYỀN (123) & NÚT KÍCH HOẠT */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-72">
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Mật mã phi thuyền (Mặc định: <strong className="text-cyan-300">123</strong>)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập 123"
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-800 text-xs font-black tracking-widest focus:outline-none focus:border-cyan-500 bg-slate-900 text-cyan-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="w-full sm:flex-1 pt-2 sm:pt-0">
                <button
                  type="submit"
                  disabled={loading || selectedStudents.length === 0}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
                    selectedStudents.length === 0
                      ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-neon-cyan/40 border border-cyan-300/40 hover:scale-[1.02]'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>
                    {loading
                      ? 'Đang khởi động buồng lái...'
                      : selectedStudents.length === 2
                      ? `🚀 Kích Hoạt Máy ${assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId} (${selectedStudents[0].fullName} & ${selectedStudents[1].fullName})`
                      : selectedStudents.length === 1
                      ? `🚀 Kích Hoạt Máy ${assignedMachineId < 10 ? `0${assignedMachineId}` : assignedMachineId} (${selectedStudents[0].fullName})`
                      : 'Vui lòng tích chọn tên em ở bảng trên'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* FORM DÀNH CHO TỔNG CHỈ HUY THẦY TRƯỜNG (ADMIN PASS: 666) */
          <form onSubmit={handleTeacherLogin} className="space-y-4 max-w-md mx-auto py-6">
            <div className="text-center space-y-1 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 mx-auto shadow-neon-gold/40 mb-3">
                <Crown className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-white glow-text-gold">
                Đài Chỉ Huy Tổng · Thầy Đỗ Mạnh Trường
              </h3>
              <p className="text-xs text-slate-400">
                Toàn quyền điều khiển phòng máy 3D, Buff Sao Vàng và 1-click xuất sổ điểm Excel
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 mb-1.5">
                Mật mã Chỉ huy tối cao
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="Nhập 666"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-amber-500/40 text-sm font-black focus:outline-none focus:border-amber-400 tracking-widest text-amber-300 bg-slate-900"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Mật mã đặc quyền Thầy đã chuẩn y: <strong className="text-amber-400">666</strong></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs shadow-neon-gold/50 transition-all flex items-center justify-center gap-2 mt-4 border border-amber-300/50"
            >
              <Crown className="w-4 h-4" />
              <span>{loading ? 'Đang mở đài chỉ huy...' : 'Mở Đài Chỉ Huy Phòng Máy 3D (Admin)'}</span>
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 cyber-grid-bg">
      <LoginForm />
    </div>
  );
}
