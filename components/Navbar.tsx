'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Laptop,
  Code2,
  Crown,
  Trophy,
  Radio,
  Users,
  Layers,
  LogIn,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  Home,
  Monitor
} from 'lucide-react';
import { getCurrentUser, UserSession } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserSession>({ isLoggedIn: false, role: 'guest' });
  const [machineNum, setMachineNum] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    setUser(currentUser);
    const mId = localStorage.getItem('truong_machine_id');
    if (mId) setMachineNum(mId);
  }, [pathname]);

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

  // =========================================================================
  // BỐ TRÍ MENU THEO ĐÚNG NGỮ CẢNH THỰC TẾ & PHÂN QUYỀN KHOA HỌC
  // =========================================================================

  // 1. MENU DÀNH CHO HỌC SINH (Chiến Binh Số THCS Mão Điền)
  const STUDENT_MENUS = [
    {
      title: 'Buồng Lái Lớp Học',
      href: '/in-class',
      icon: Laptop,
      badge: '3 Hoạt Động',
      color: 'from-cyan-500 to-teal-500',
    },
    {
      title: 'Võ Đài Python',
      href: '/programming',
      icon: Code2,
      badge: 'Chấm tự động',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Đấu Boss Thi Cử',
      href: '/exams',
      icon: Crown,
      badge: 'Chống gian lận',
      color: 'from-rose-500 to-red-500',
    },
    {
      title: 'Hồ Sơ & Thành Tích',
      href: '/student',
      icon: Trophy,
      badge: 'Bảng Vàng XP',
      color: 'from-amber-500 to-yellow-500',
    },
  ];

  // 2. MENU DÀNH CHO GIÁO VIÊN (Thầy Đỗ Mạnh Trường - Tổng Chỉ Huy Admin)
  const TEACHER_MENUS = [
    {
      title: 'Đài Chỉ Huy 24 Trạm',
      href: '/teacher',
      icon: Radio,
      badge: 'Realtime',
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Quản Trị 670 HS',
      href: '/admin',
      icon: Users,
      badge: '4 Khối',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Điều Phối Tiết Dạy',
      href: '/in-class',
      icon: Layers,
      badge: '29 Tiết GDPT',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      title: 'Võ Đài Lập Trình',
      href: '/programming',
      icon: Code2,
      badge: 'Multi-test',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Ngân Hàng Đề Thi',
      href: '/exams',
      icon: Crown,
      badge: '8 Đề Boss',
      color: 'from-rose-500 to-red-500',
    },
  ];

  // 3. MENU DÀNH CHO KHÁCH (Chưa Đăng Nhập)
  const GUEST_MENUS = [
    {
      title: 'Trang Chủ',
      href: '/',
      icon: Home,
      badge: 'Metaverse',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Quy Trình 6 Bước',
      href: '/#quy-trinh-6-buoc',
      icon: Layers,
      badge: 'Chuẩn Bộ',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      title: 'Võ Đài Python Demo',
      href: '/programming',
      icon: Code2,
      badge: 'Wasm 3.12',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Đấu Boss Thi Cử',
      href: '/exams',
      icon: Crown,
      badge: '8 Bộ Đề',
      color: 'from-rose-500 to-red-500',
    },
  ];

  // Xác định mảng Menu dựa trên Vai trò người dùng thực tế
  const activeMenus = !mounted || user.role === 'guest'
    ? GUEST_MENUS
    : user.role === 'teacher'
    ? TEACHER_MENUS
    : STUDENT_MENUS;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/95 border-b border-cyan-500/25 shadow-2xl shadow-cyan-950/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* LOGO CHÍNH THỨC */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-neon-cyan/50 group-hover:scale-105 transition-all border border-cyan-300/50">
              <Laptop className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-base text-white tracking-wider glow-text-cyan">
                  TIN HỌC SỐ
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-[9px] sm:text-[10px] text-cyan-300 font-extrabold uppercase">
                  MÃO ĐIỀN
                </span>
              </div>
              <span className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-wider block">
                {user.role === 'teacher' ? 'ĐÀI TỔNG CHỈ HUY · THẦY TRƯỜNG' : 'THẦY ĐỖ MẠNH TRƯỜNG'}
              </span>
            </div>
          </Link>

          {/* THANH ĐIỀU HƯỚNG THEO NGỮ CẢNH VAI TRÒ */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {activeMenus.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && !item.href.includes('#') && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-all relative border ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-neon-cyan/40 scale-105'
                      : 'text-slate-300 hover:text-white bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300 animate-pulse' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.title}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-black uppercase text-white bg-gradient-to-r ${item.color}`}>
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* GÓC PHẢI: KHU VỰC ĐỊNH DANH PHÂN QUYỀN */}
          <div className="flex items-center gap-2 shrink-0">
            {!mounted || !user.isLoggedIn ? (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-neon-cyan/40 transition-all border border-cyan-300/40 hover:scale-105"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Vào Buồng Lái</span>
              </Link>
            ) : user.role === 'teacher' ? (
              /* GIAO DIỆN TỔNG CHỈ HUY THẦY TRƯỜNG */
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs shadow-neon-gold/20">
                  <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
                  <div className="text-left">
                    <span className="block font-black text-amber-300 text-xs leading-none">Thầy Đỗ Mạnh Trường</span>
                    <span className="text-[9px] font-bold text-amber-400/80 uppercase">Tổng Chỉ Huy (Admin)</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Đăng xuất khỏi hệ thống"
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* GIAO DIỆN PHI HÀNH ĐOÀN HỌC SINH (BUỒNG LÁI KÉP) */
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs shadow-neon-cyan/20">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center font-black text-[10px] text-cyan-300">
                    {machineNum ? `M${machineNum.padStart(2, '0')}` : 'HS'}
                  </div>
                  <div className="text-left max-w-[140px] truncate">
                    <span className="block font-black text-cyan-200 text-xs leading-none truncate">
                      {user.pairNames || user.studentName}
                    </span>
                    <span className="text-[9px] font-bold text-cyan-400/80 uppercase">
                      Lớp {user.studentClass || 'Mão Điền'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Đăng xuất khỏi buồng lái"
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* NÚT MỞ MOBILE MENU */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cyan-500/20 bg-slate-950/98 px-4 py-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="text-[11px] font-black uppercase text-cyan-400 tracking-wider px-2 pb-1 border-b border-cyan-500/20 flex items-center justify-between">
            <span>
              {user.role === 'teacher' ? 'Bàn Chỉ Huy Giáo Viên' : user.role === 'student' ? 'Buồng Lái Học Sinh' : 'Hệ Sinh Thái Tin Học Số'}
            </span>
            <span className="text-[10px] text-slate-400">THCS Mão Điền</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {activeMenus.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-sm text-white">{item.title}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase text-white bg-gradient-to-r ${item.color}`}>
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
