'use client';

import { useState, useEffect } from 'react';
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
  Cloud
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

  // MENU HỌC SINH (HỌC TẬP CẶP ĐÔI · MẬT KHẨU 123)
  const STUDENT_MENUS = [
    {
      title: 'Lớp Học Tin Học',
      href: '/in-class',
      icon: Laptop,
      badge: '3 Hoạt động',
      badgeClass: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Lập Trình Python',
      href: '/programming',
      icon: Code2,
      badge: 'Python 3.12',
      badgeClass: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'Kiểm Tra Định Kỳ',
      href: '/exams',
      icon: FileCheck2,
      badge: 'Chuẩn Bộ GD&ĐT',
      badgeClass: 'bg-rose-100 text-rose-700',
    },
    {
      title: 'Hồ Sơ Học Tập',
      href: '/student',
      icon: Award,
      badge: 'Tiến độ 29 tiết',
      badgeClass: 'bg-amber-100 text-amber-700',
    },
  ];

  // MENU GIÁO VIÊN (THẦY ĐỖ MẠNH TRƯỜNG · MÃ 666)
  const TEACHER_MENUS = [
    {
      title: 'Quản Lý 24 Máy Trạm',
      href: '/teacher',
      icon: Monitor,
      badge: 'Sơ đồ phòng',
      badgeClass: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Quản Trị 670 Học Sinh',
      href: '/admin',
      icon: Users,
      badge: 'Sổ điểm Excel',
      badgeClass: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Kế Hoạch & Đề Thi',
      href: '/in-class',
      icon: Layers,
      badge: '29 Tiết chuẩn',
      badgeClass: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'Kho Bài Thực Hành',
      href: '/teacher',
      icon: Cloud,
      badge: 'Google Drive',
      badgeClass: 'bg-teal-100 text-teal-700',
    },
  ];

  // MENU KHÁCH (CHƯA ĐĂNG NHẬP)
  const GUEST_MENUS = [
    {
      title: 'Tổng Quan Hệ Thống',
      href: '/',
      icon: Home,
      badge: 'Sơ đồ',
      badgeClass: 'bg-slate-100 text-slate-700',
    },
    {
      title: 'Không Gian Học Sinh',
      href: '/login?role=student',
      icon: Laptop,
      badge: 'Mã 123',
      badgeClass: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Bàn Quản Lý Giáo Viên',
      href: '/login?role=teacher',
      icon: Monitor,
      badge: 'Mã 666',
      badgeClass: 'bg-amber-100 text-amber-700',
    },
  ];

  const activeMenus = !mounted || user.role === 'guest'
    ? GUEST_MENUS
    : user.role === 'teacher'
    ? TEACHER_MENUS
    : STUDENT_MENUS;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {activeMenus.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && !item.href.includes('#') && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.title}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* GÓC PHẢI: TRẠNG THÁI NGƯỜI DÙNG */}
          <div className="flex items-center gap-2 shrink-0">
            {!mounted || !user.isLoggedIn ? (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all hover:scale-[1.02]"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập Phòng Máy</span>
              </Link>
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
                      Lớp {user.studentClass || 'Mão Điền'}
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
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <div className="text-xs font-bold uppercase text-slate-400 px-2 pb-1 border-b border-slate-100">
            {user.role === 'teacher' ? 'Quản Trị Giáo Viên' : user.role === 'student' ? 'Học Sinh Phòng Máy' : 'Menu Điều Hướng'}
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
    </header>
  );
}
