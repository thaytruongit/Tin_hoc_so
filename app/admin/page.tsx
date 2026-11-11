'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Settings, 
  Users, 
  Database, 
  Shield, 
  KeyRound, 
  Save, 
  CheckCircle2, 
  RefreshCw, 
  ShieldAlert, 
  ArrowRight, 
  Crown,
  Download,
  Search,
  FileSpreadsheet,
  GraduationCap,
  Sparkles,
  School,
  Lock,
  Unlock,
  UserCheck,
  Star,
  Code2
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { getCurrentUser, UserSession, getAdvancedStudentCodes, setStudentDesignatedHSG } from '@/lib/auth';
import { exportStudentsToExcel } from '@/lib/export-excel';
import { getAssetUrl } from '@/lib/asset-path';

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [mounted, setMounted] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Bộ lọc danh bạ học sinh
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [resetPassNotice, setResetPassNotice] = useState<string>('');
  const [hsgCodes, setHsgCodes] = useState<string[]>([]);
  const [onlyHSGFilter, setOnlyHSGFilter] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user.role === 'teacher') {
      setIsUnlocked(true);
    }
    setHsgCodes(getAdvancedStudentCodes());
  }, []);

  const handleToggleHSG = (studentCode: string, studentName: string) => {
    const isCurrentlyHSG = hsgCodes.includes(studentCode);
    setStudentDesignatedHSG(studentCode, !isCurrentlyHSG);
    const updated = getAdvancedStudentCodes();
    setHsgCodes(updated);
    setResetPassNotice(
      !isCurrentlyHSG
        ? `⭐ Thầy đã tuyển chọn em ${studentName} (${studentCode}) vào Đội tuyển HSG (Mở quyền Lập trình Python 3.12)`
        : `Đã rút em ${studentName} (${studentCode}) khỏi Đội tuyển HSG`
    );
    setTimeout(() => setResetPassNotice(''), 4000);
  };

  const [siteTitle, setSiteTitle] = useState('HỆ SINH THÁI TIN HỌC SỐ · THCS MÃO ĐIỀN');
  const [xpPerCorrect, setXpPerCorrect] = useState(10);
  const [saved, setSaved] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim() === '666') {
      setIsUnlocked(true);
      setAuthError('');
      localStorage.setItem('truong_user_role', 'teacher');
      localStorage.setItem('truong_teacher_name', 'Thầy Đỗ Mạnh Trường');
    } else {
      setAuthError('Mật khẩu quản trị không chính xác! (Mật mã chuẩn y: 666)');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetPassword = (studentName: string) => {
    setResetPassNotice(`Đã đặt lại mật khẩu cho ${studentName} về mặc định: 123`);
    setTimeout(() => setResetPassNotice(''), 3500);
  };

  // Danh sách học sinh lọc theo Khối, Lớp, Tìm kiếm
  const filteredStudents = useMemo(() => {
    let list = [...MOCK_STUDENTS];
    if (selectedGrade !== 'all') {
      list = list.filter(s => {
        const cls = MOCK_CLASSES.find(c => c.id === s.classId);
        return cls?.grade === selectedGrade;
      });
    }
    if (selectedClassId !== 'all') {
      list = list.filter(s => s.classId === selectedClassId);
    }
    if (onlyHSGFilter) {
      list = list.filter(s => hsgCodes.includes(s.studentCode));
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(s => 
        s.fullName.toLowerCase().includes(q) ||
        s.studentCode.toLowerCase().includes(q) ||
        (s.dob && s.dob.includes(q))
      );
    }
    return list;
  }, [selectedGrade, selectedClassId, onlyHSGFilter, hsgCodes, searchTerm]);

  // Danh sách lớp theo Khối đang chọn
  const classesForFilter = useMemo(() => {
    if (selectedGrade === 'all') return MOCK_CLASSES;
    return MOCK_CLASSES.filter(c => c.grade === selectedGrade);
  }, [selectedGrade]);

  if (!mounted) return null;

  // ROUTE GUARD: BẢO VỆ PHÂN QUYỀN GIÁO VIÊN
  if (!isUnlocked && currentUser?.role === 'student') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center shadow-sm">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase">
            Bảo mật phân quyền (RBAC)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Truy Cập Bị Từ Chối — Khu Vực Quản Trị
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Khu vực này dành riêng cho <strong>Thầy Đỗ Mạnh Trường</strong> quản trị 670 học sinh và cấu hình hệ thống.<br />
            Tài khoản của em là <strong>{currentUser.studentName}</strong> (Lớp {currentUser.studentClass}) vui lòng quay lại không gian học tập!
          </p>
        </div>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/in-class"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            Quay Về Không Gian Học Tập
          </Link>
        </div>
      </div>
    );
  }

  // NẾU LÀ KHÁCH CHƯA XÁC THỰC MẬT MÃ 666
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm">
          <Crown className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Xác Thực Quản Trị Viên</h1>
          <p className="text-xs text-slate-600 mt-1">Dành riêng cho Thầy Đỗ Mạnh Trường (Mã 666)</p>
        </div>

        <form onSubmit={handleUnlock} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-left">
          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {authError}
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mật mã Quản trị đặc quyền</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Nhập 666"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-slate-900 text-sm font-bold focus:outline-none focus:border-blue-500 tracking-widest"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Mở Khóa Bảng Quản Trị</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER BANNER SƯ PHẠM */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
            Bàn Quản Lý Giáo Viên · Mã 666
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Quản Trị 670 Học Sinh &amp; Hệ Thống
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Tổng số: <strong>669 học sinh</strong> · <strong>15 lớp</strong> (Khối 6, 7, 8, 9) · Mật khẩu đồng bộ: <strong>123</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportStudentsToExcel(filteredStudents, 'So_Diem_Tin_Hoc_669_Hoc_Sinh_Mao_Dien.xls')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>1-Click Xuất Sổ Điểm Excel .xls</span>
          </button>
          <Link
            href="/teacher"
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-amber-300" />
            <span>Quản Lý 24 Máy Trạm</span>
          </Link>
        </div>
      </div>

      {resetPassNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{resetPassNotice}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 1. KHỐI DANH BẠ 670 HỌC SINH 4 KHỐI THCS MÃO ĐIỀN */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Danh Bạ 4 Khối 6, 7, 8, 9 — THCS Mão Điền</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hiển thị {filteredStudents.length} học sinh phù hợp bộ lọc
            </p>
          </div>

          {/* THANH TÌM KIẾM NHANH */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo Tên, Mã HS, Ngày sinh..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        {/* BỘ LỌC KHỐI & LỚP */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600 mr-1">Khối:</span>
          {(['all', 6, 7, 8, 9] as const).map((g) => (
            <button
              key={g}
              onClick={() => {
                setSelectedGrade(g);
                setSelectedClassId('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGrade === g
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {g === 'all' ? 'Tất cả 4 khối' : `Khối ${g}`}
            </button>
          ))}

          <span className="text-xs font-bold text-slate-600 ml-4 mr-1">Lớp:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="all">Tất cả lớp ({classesForFilter.length} lớp)</option>
            {classesForFilter.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.studentCount} HS)
              </option>
            ))}
          </select>

          {/* NÚT LỌC NHANH ĐỘI TUYỂN HSG */}
          <button
            type="button"
            onClick={() => setOnlyHSGFilter(!onlyHSGFilter)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 sm:ml-auto ${
              onlyHSGFilter
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-900 border border-slate-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyHSGFilter ? 'fill-white text-white' : 'text-amber-500'}`} />
            <span>Chỉ xem Đội tuyển HSG ({hsgCodes.length} em)</span>
          </button>
        </div>

        {/* BẢNG DANH SÁCH HỌC SINH */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Mã HS</th>
                <th className="p-3.5">Họ và Tên</th>
                <th className="p-3.5">Lớp</th>
                <th className="p-3.5">Ngày Sinh</th>
                <th className="p-3.5">Điểm TB</th>
                <th className="p-3.5">XP Tích Lũy</th>
                <th className="p-3.5 text-center">Đội Tuyển HSG</th>
                <th className="p-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.slice(0, 50).map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-blue-700">{st.studentCode}</td>
                  <td className="p-3.5 font-bold text-slate-900">{st.fullName}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[11px]">
                      {st.className}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500">{st.dob || '2012'}</td>
                  <td className="p-3.5 font-bold text-emerald-700">{st.averageGrade} / 10đ</td>
                  <td className="p-3.5 font-bold text-amber-600">{st.totalXp} XP</td>
                  <td className="p-3.5 text-center">
                    {hsgCodes.includes(st.studentCode) ? (
                      <button
                        onClick={() => handleToggleHSG(st.studentCode, st.fullName)}
                        title="Click để rút khỏi Đội tuyển HSG"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[11px] hover:bg-rose-100 hover:text-rose-800 hover:border-rose-300 transition-all cursor-pointer shadow-2xs"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>Đội tuyển HSG</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleHSG(st.studentCode, st.fullName)}
                        title="Click để tuyển chọn vào Đội tuyển HSG (Mở quyền Lập trình)"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold text-[11px] hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all cursor-pointer"
                      >
                        <Code2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>+ Chỉ định HSG</span>
                      </button>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleResetPassword(st.fullName)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-600 text-[11px] font-bold transition-all border border-slate-200"
                    >
                      Đặt lại pass 123
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length > 50 && (
          <p className="text-xs text-slate-500 text-center font-medium italic">
            Đang hiển thị 50 / {filteredStudents.length} học sinh. Dùng bộ lọc hoặc tải tệp Excel để xem trọn vẹn 669 tài khoản.
          </p>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 2. CẤU HÌNH HỆ THỐNG & KẾT NỐI DATABASE                                */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* THIẾT LẬP CHUNG */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-lg text-slate-900">Thiết Lập Hệ Sinh Thái Tin Học Số</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Tên hệ thống cổng học tập số
              </label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Điểm XP thưởng cho mỗi câu trắc nghiệm đúng
                </label>
                <input
                  type="number"
                  value={xpPerCorrect}
                  onChange={(e) => setXpPerCorrect(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Năm học áp dụng
                </label>
                <input
                  type="text"
                  defaultValue="2024-2025"
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Cấu Hình Hệ Thống</span>
            </button>
          </form>
        </div>

        {/* THÔNG TIN DATABASE & ĐẶC TẢ */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              Cơ Sở Dữ Liệu Supabase
            </h3>
            <p className="text-xs text-slate-500">
              Đồng bộ dữ liệu thời gian thực giữa 24 máy trạm và máy giáo viên
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Số lớp học:</span>
                <span className="font-bold text-slate-900">{MOCK_CLASSES.length} lớp chính khóa</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Tài khoản học sinh:</span>
                <span className="font-bold text-slate-900">{MOCK_STUDENTS.length} tài khoản</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Bảo mật phân quyền (RBAC):</span>
                <span className="font-bold text-emerald-600">Hoạt động</span>
              </div>
            </div>

            <button
              onClick={() => exportStudentsToExcel(MOCK_STUDENTS, 'Danh_Sach_669_Hoc_Sinh_THCS_Mao_Dien.xls')}
              className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Tải file Excel 669 tài khoản</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
