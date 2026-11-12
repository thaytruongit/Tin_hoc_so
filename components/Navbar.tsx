'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Laptop,
  Code2,
  FileCheck2,
  GraduationCap,
  Users,
  Layers,
  LogIn,
  LogOut,
  Menu,
  X,
  UserCheck,
  Home,
  Monitor,
  Award,
  Cloud,
  School,
  BookOpen,
  PlayCircle,
  Trophy,
  FileSpreadsheet,
  ChevronDown,
  Check,
  PlusCircle
} from 'lucide-react';
import { getCurrentUser, UserSession, isStudentDesignatedHSG } from '@/lib/auth';
import { ClassItem } from '@/lib/types';
import {
  getClassroomState,
  selectClassForClassroom,
  subscribeToClassroomState,
  getSavedClasses,
  saveClasses
} from '@/lib/classroom-control';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserSession>({ isLoggedIn: false, role: 'guest' });
  const [machineNum, setMachineNum] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTabQuery, setCurrentTabQuery] = useState<string>('');

  // TRẠNG THÁI LỚP HỌC ĐANG LÀM VIỆC CỦA THẦY TRƯỜNG & POPUP CHỌN LỚP
  const [activeClassName, setActiveClassName] = useState<string>('Lớp 6A10');
  const [activeClassId, setActiveClassId] = useState<string>('c-6a10');
  const [activeGrade, setActiveGrade] = useState<number>(6);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [selectedModalGrade, setSelectedModalGrade] = useState<number>(6);
  const [availableClasses, setAvailableClasses] = useState<ClassItem[]>([]);
  const [showAddClassInline, setShowAddClassInline] = useState(false);
  const [newClassNameInput, setNewClassNameInput] = useState('');

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    setUser(currentUser);
    const mId = localStorage.getItem('truong_machine_id');
    if (mId) setMachineNum(mId);

    // Đọc trạng thái lớp học số hiện hành
    const clsState = getClassroomState();
    if (clsState.activeClassName) setActiveClassName(clsState.activeClassName);
    if (clsState.activeClassId) setActiveClassId(clsState.activeClassId);
    if (clsState.activeGrade) {
      setActiveGrade(clsState.activeGrade);
      setSelectedModalGrade(clsState.activeGrade);
    }
    setAvailableClasses(getSavedClasses());

    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const t = sp.get('tab') || 'in-class';
      const s = sp.get('sub');
      setCurrentTabQuery(s ? `${t}&sub=${s}` : t);
    }

    // Đăng ký đồng bộ real-time khi lớp thay đổi từ bất kỳ đâu
    const unsubClassroom = subscribeToClassroomState((st) => {
      if (st.activeClassName) setActiveClassName(st.activeClassName);
      if (st.activeClassId) setActiveClassId(st.activeClassId);
      if (st.activeGrade) {
        setActiveGrade(st.activeGrade);
        setSelectedModalGrade(st.activeGrade);
      }
    });

    const handleClassesChange = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setAvailableClasses(e.detail);
      }
    };
    window.addEventListener('truong_classes_update', handleClassesChange);

    return () => {
      unsubClassroom();
      window.removeEventListener('truong_classes_update', handleClassesChange);
    };
  }, [pathname]);

  // Đóng Modal khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isClassModalOpen) {
        setIsClassModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isClassModalOpen]);

  const handleLogout = () => {
    localStorage.removeItem('truong_user_role');
    localStorage.removeItem('truong_student_id');
    localStorage.removeItem('truong_student_code');
    localStorage.removeItem('truong_student_name');
    localStorage.removeItem('truong_student_class');
    localStorage.removeItem('truong_student_grade');
    localStorage.removeItem('truong_machine_id');
    localStorage.removeItem('truong_is_pair');
    localStorage.removeItem('truong_partner_id');
    localStorage.removeItem('truong_partner_code');
    localStorage.removeItem('truong_partner_name');
    localStorage.removeItem('truong_pair_names');
    setUser({ isLoggedIn: false, role: 'guest' });
    setMachineNum('');
    router.push('/');
  };

  // KIỂM TRA HỌC SINH CÓ ĐƯỢC THẦY CHỈ ĐỊNH ĐỘI TUYỂN HSG ĐỂ MỞ LẬP TRÌNH KHÔNG
  const isHSG = Boolean(
    user.role === 'teacher' ||
    (user.studentCode && isStudentDesignatedHSG(user.studentCode)) ||
    (user.partnerCode && isStudentDesignatedHSG(user.partnerCode))
  );

  // 1. MENU HỌC SINH (CHỈ GỒM CÁC CHỨC NĂNG THẦY TRƯỜNG CHỈ ĐỊNH)
  const studentMenus: { title: string; href: string; icon: any; badge?: string; badgeClass?: string }[] = [
    {
      title: 'Lớp Học Số',
      href: '/in-class',
      icon: Laptop,
    },
    {
      title: 'Bài Tập Về Nhà',
      href: '/homework',
      icon: BookOpen,
    },
    {
      title: 'Tự Học (Video)',
      href: '/self-study',
      icon: PlayCircle,
    },
    {
      title: 'Bài Kiểm Tra',
      href: '/exams',
      icon: FileCheck2,
    },
    {
      title: 'Bảng Xếp Hạng',
      href: '/achievements',
      icon: Trophy,
    },
    {
      title: 'Bảng Điểm Học Kỳ',
      href: '/gradebook',
      icon: FileSpreadsheet,
    },
  ];

  // Chỉ hiển thị Lập Trình Python nếu học sinh được Thầy chỉ định là Học sinh giỏi
  if (isHSG) {
    studentMenus.push({
      title: 'Lập Trình HSG',
      href: '/programming',
      icon: Code2,
    });
  }

  // 2. MENU GIÁO VIÊN (THẦY ĐỖ MẠNH TRƯỜNG · MÃ 666) - 5 CHỨC NĂNG CỐT LÕI (ĐÃ RÚT GỌN BỎ TỪ QUẢN LÝ)
  const TEACHER_MENUS: { title: string; href: string; icon: any; badge?: string; badgeClass?: string }[] = [
    {
      title: 'Lớp Học Số',
      href: '/teacher?tab=in-class',
      icon: Monitor,
    },
    {
      title: 'Lớp & Học Sinh',
      href: '/teacher?tab=class-roster',
      icon: Users,
    },
    {
      title: 'Bài Kiểm Tra',
      href: '/teacher?tab=exams',
      icon: FileCheck2,
    },
    {
      title: 'Bài Tập Về Nhà',
      href: '/teacher?tab=in-class&sub=homework',
      icon: BookOpen,
    },
    {
      title: 'Bảng Điểm Học Kỳ',
      href: '/teacher?tab=gradebook',
      icon: FileSpreadsheet,
    },
  ];

  // MENU KHÁCH (CHƯA ĐĂNG NHẬP: KHÔNG HIỂN THỊ MENU RƯỜM RÀ TRÊN HEADER)
  const GUEST_MENUS: any[] = [];

  const activeMenus = !mounted || user.role === 'guest'
    ? GUEST_MENUS
    : user.role === 'teacher'
    ? TEACHER_MENUS
    : studentMenus;

  const rawClassName = user.studentClass || 'Mão Điền';
  const cleanClassName = rawClassName.startsWith('Lớp') ? rawClassName : `Lớp ${rawClassName}`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* LOGO CHÍNH THỨC SƯ PHẠM */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  TIN HỌC SỐ
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[10px] text-blue-700 font-bold uppercase">
                  Mão Điền
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium block">
                {user.role === 'teacher' ? 'Quản Lý Tiết Dạy · Thầy Đỗ Mạnh Trường' : 'THCS Mão Điền · Thầy Đỗ Mạnh Trường'}
              </span>
            </div>
          </Link>

          {/* ================================================================= */}
          {/* VỊ TRÍ ĐÁNH DẤU MÀU VÀNG: TÊN LỚP HIỆN THỜI ĐANG LÀM VIỆC         */}
          {/* Nhấn vào đây sẽ mở popup giữa màn hình chọn Khối & Lớp            */}
          {/* ================================================================= */}
          {(user.role === 'teacher' || pathname.startsWith('/teacher')) && (
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedModalGrade(activeGrade || 6);
                  setShowAddClassInline(false);
                  setIsClassModalOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-teal-50 hover:bg-teal-100/90 border-2 border-teal-600 text-teal-950 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all group shrink-0 cursor-pointer"
                title="Nhấn vào đây để chọn Khối & Lớp làm việc"
              >
                <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <School className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-teal-950 text-xs sm:text-[13px] tracking-tight whitespace-nowrap">
                      {activeClassName || 'Lớp 6A10'}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  </div>
                  <span className="text-[9.5px] text-teal-700 font-semibold hidden md:inline whitespace-nowrap">
                    Đang làm việc · Đổi lớp ▾
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-teal-700 group-hover:translate-y-0.5 transition-transform shrink-0" />
              </button>
            </div>
          )}

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap overflow-x-auto no-scrollbar py-1">
            {activeMenus.map((item) => {
              const Icon = item.icon;
              const isTeacherLinkActive = user.role === 'teacher' && pathname === '/teacher' && (
                (item.href === '/teacher?tab=in-class' && (!currentTabQuery || currentTabQuery === 'in-class')) ||
                (item.href.includes('sub=homework') && currentTabQuery?.includes('sub=homework')) ||
                (!item.href.includes('sub=homework') && item.href.includes('tab=') && currentTabQuery && item.href.endsWith(`tab=${currentTabQuery}`))
              );
              const isActive = isTeacherLinkActive || (user.role !== 'teacher' && (
                pathname === item.href || (item.href !== '/' && !item.href.includes('#') && !item.href.includes('?') && pathname.startsWith(item.href))
              ));

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => {
                    if (user.role === 'teacher' && item.href.includes('tab=')) {
                      const tabPart = item.href.split('/teacher?tab=')[1] || item.href.split('tab=')[1] || '';
                      setCurrentTabQuery(tabPart);
                      window.dispatchEvent(new CustomEvent('truong_tab_switch', { detail: tabPart }));
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="whitespace-nowrap">{item.title}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : item.badgeClass || 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* GÓC PHẢI: TRẠNG THÁI NGƯỜI DÙNG */}
          <div className="flex items-center gap-2 shrink-0">
            {!mounted || !user.isLoggedIn ? (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-bold">
                <School className="w-4 h-4 text-blue-600" />
                <span>Phòng Thực Hành 24 Máy · 670 HS</span>
              </div>
            ) : user.role === 'teacher' ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  <div className="text-left">
                    <span className="block font-bold text-slate-800 text-xs leading-none">Thầy Đỗ Mạnh Trường</span>
                    <span className="text-[10px] text-amber-700 font-semibold">Giáo Viên Phụ Trách</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Đăng xuất khỏi hệ thống"
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                    {machineNum ? `M${machineNum.padStart(2, '0')}` : 'HS'}
                  </div>
                  <div className="text-left max-w-[150px] truncate">
                    <span className="block font-bold text-slate-900 text-xs truncate">
                      {user.pairNames || user.studentName}
                    </span>
                    <span className="text-[10px] text-blue-700 font-medium">
                      {cleanClassName}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Đăng xuất"
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="text-xs font-bold uppercase text-slate-400 px-2 pb-1 border-b border-slate-100">
            {user.role === 'teacher' ? 'Quản Trị Giáo Viên' : user.role === 'student' ? 'Học Sinh Phòng Máy' : 'Menu Điều Hướng'}
          </div>

          {/* NÚT CHỌN LỚP TRÊN MOBILE CHO GIÁO VIÊN */}
          {(user.role === 'teacher' || pathname.startsWith('/teacher')) && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setSelectedModalGrade(activeGrade || 6);
                setShowAddClassInline(false);
                setIsClassModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-teal-50 border-2 border-teal-600 text-teal-950 font-bold text-sm shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  <School className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold">{activeClassName}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-[11px] text-teal-700 font-semibold block">Khối {activeGrade} · 24 máy trạm đồng bộ</span>
                </div>
              </div>
              <span className="text-xs text-teal-700 font-black px-2.5 py-1 rounded-lg bg-teal-100/80">Đổi lớp ▾</span>
            </button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {activeMenus.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (user.role === 'teacher' && item.href.includes('tab=')) {
                      const tabPart = item.href.split('/teacher?tab=')[1] || item.href.split('tab=')[1] || '';
                      setCurrentTabQuery(tabPart);
                      window.dispatchEvent(new CustomEvent('truong_tab_switch', { detail: tabPart }));
                    }
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold">{item.title}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* POPUP MODAL CHÍNH GIỮA MÀN HÌNH (CENTER MODAL DÙNG CREATEPORTAL)     */}
      {/* Gắn trực tiếp vào document.body để hiển thị toàn bộ, không bị che     */}
      {/* ==================================================================== */}
      </header>

      {mounted && isClassModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
          onClick={() => setIsClassModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl border-2 border-teal-600 shadow-2xl p-4 sm:p-6 w-full max-w-lg space-y-3.5 my-auto max-h-[calc(100vh-2rem)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight">
                    Chọn Khối &amp; Lớp Giảng Dạy
                  </h3>
                  <p className="text-xs text-teal-700 font-bold flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Đang làm việc: <span className="underline font-black">{activeClassName}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsClassModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Đóng bảng chọn lớp (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bố cục 2 cột: Cột trái Khối, Cột phải Lớp */}
            <div className="grid grid-cols-12 gap-3 items-start overflow-y-auto">
              {/* CỘT TRÁI: KHỐI (6, 7, 8, 9) */}
              <div className="col-span-4 space-y-1.5">
                <span className="font-extrabold text-slate-400 text-[10px] uppercase tracking-wider block">
                  1. Khối lớp
                </span>
                <div className="flex flex-col gap-1.5">
                  {[6, 7, 8, 9].map((g) => {
                    const isGradeActive = selectedModalGrade === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSelectedModalGrade(g)}
                        className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-black transition-all text-center flex items-center justify-between cursor-pointer ${
                          isGradeActive
                            ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-700'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <span>Khối {g}</span>
                        {isGradeActive && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CỘT PHẢI: DANH SÁCH LỚP CỦA KHỐI ĐÓ (XẾP THEO HÀNG DỌC) */}
              <div className="col-span-8 space-y-1.5">
                <span className="font-extrabold text-slate-400 text-[10px] uppercase tracking-wider block">
                  2. Lớp giảng dạy (Khối {selectedModalGrade})
                </span>

                <div className="flex flex-col gap-1.5 max-h-[220px] sm:max-h-[250px] overflow-y-auto pr-1">
                  {availableClasses
                    .filter((c) => c.grade === selectedModalGrade)
                    .map((cls) => {
                      const isSelected = activeClassId === cls.id;
                      return (
                        <button
                          key={cls.id}
                          type="button"
                          onClick={() => {
                            selectClassForClassroom(cls.id, cls.name, cls.grade);
                            setActiveClassId(cls.id);
                            setActiveClassName(cls.name);
                            setActiveGrade(cls.grade);
                            setIsClassModalOpen(false);
                          }}
                          className={`p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'border-2 border-teal-600 bg-teal-50/90 text-teal-950 font-black shadow-xs ring-1 ring-teal-500'
                              : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm">{cls.name}</span>
                            {isSelected && (
                              <span className="px-1.5 py-0.5 rounded-md bg-teal-600 text-white text-[9px] font-bold">
                                ✓ Đang chọn
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 font-semibold shrink-0">
                            {cls.studentCount} HS
                          </span>
                        </button>
                      );
                    })}

                  {/* NÚT THÊM LỚP Ở CUỐI CÙNG DANH SÁCH LỚP */}
                  {!showAddClassInline ? (
                    <button
                      type="button"
                      onClick={() => setShowAddClassInline(true)}
                      className="w-full py-2 px-3 rounded-xl border border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/40 text-teal-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all mt-1 cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+ Thêm lớp mới (Khối {selectedModalGrade})</span>
                    </button>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newClassNameInput.trim()) return;
                        const formatted = newClassNameInput.trim().startsWith('Lớp')
                          ? newClassNameInput.trim()
                          : `Lớp ${newClassNameInput.trim()}`;
                        const code = formatted.replace('Lớp ', '').replace(/\s+/g, '');
                        const newCls: ClassItem = {
                          id: `c-custom-${Date.now()}`,
                          grade: selectedModalGrade as any,
                          name: formatted,
                          classCode: code,
                          studentCount: 0,
                        };
                        const updated = [...availableClasses, newCls];
                        setAvailableClasses(updated);
                        saveClasses(updated);
                        selectClassForClassroom(newCls.id, newCls.name, newCls.grade);
                        setActiveClassId(newCls.id);
                        setActiveClassName(newCls.name);
                        setActiveGrade(newCls.grade);
                        setNewClassNameInput('');
                        setShowAddClassInline(false);
                        setIsClassModalOpen(false);
                      }}
                      className="p-2.5 bg-slate-50 border border-teal-200 rounded-xl space-y-2 mt-1"
                    >
                      <div className="text-[11px] font-bold text-slate-700">Tên lớp mới (Khối {selectedModalGrade}):</div>
                      <input
                        type="text"
                        placeholder={`vd: ${selectedModalGrade}A14`}
                        value={newClassNameInput}
                        onChange={(e) => setNewClassNameInput(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:border-teal-600 bg-white"
                        autoFocus
                      />
                      <div className="flex items-center gap-1.5">
                        <button
                          type="submit"
                          className="px-3 py-1 rounded-lg bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 cursor-pointer"
                        >
                          Tạo &amp; Chọn ngay
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddClassInline(false)}
                          className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300 cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* THÔNG BÁO ĐỒNG BỘ TOÀN HỆ THỐNG */}
            <div className="p-3 rounded-2xl bg-teal-50/80 border border-teal-200 text-teal-900 text-xs leading-relaxed shrink-0">
              <div className="font-extrabold flex items-center gap-1.5 text-teal-950">
                <span>🎯 Đồng bộ toàn diện:</span>
                <span className="underline font-black">{activeClassName}</span>
              </div>
              <p className="text-[11px] text-teal-800 mt-1">
                Khi Thầy chọn lớp tại đây, tất cả 5 phân hệ (Lớp học số 24 máy trạm, Quản lý lớp &amp; học sinh, Bài kiểm tra, Bài tập về nhà, Bảng điểm học kỳ) sẽ tự động làm việc trên đúng lớp này.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
