'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users,
  Compass,
  Layers,
  Radio,
  Code2,
  Crown,
  LogIn,
  LogOut,
  Laptop,
  Menu,
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher' | 'guest'>('guest');
  const [userName, setUserName] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedRole = localStorage.getItem('truong_user_role') as 'student' | 'teacher' | null;
      const name = localStorage.getItem('truong_student_name') || (savedRole === 'teacher' ? 'Thầy Đỗ Mạnh Trường' : '');

      if (savedRole) {
        setRole(savedRole);
        setUserName(name || (savedRole === 'teacher' ? 'Thầy Đỗ Mạnh Trường' : 'Học sinh'));
      } else {
        setRole('guest');
        setUserName('');
      }
    } catch (e) {
      setRole('guest');
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('truong_user_role');
    localStorage.removeItem('truong_student_id');
    localStorage.removeItem('truong_student_code');
    localStorage.removeItem('truong_student_name');
    localStorage.removeItem('truong_student_class');
    localStorage.removeItem('truong_student_grade');
    localStorage.removeItem('truong_is_pair');
    localStorage.removeItem('truong_partner_id');
    localStorage.removeItem('truong_partner_code');
    localStorage.removeItem('truong_partner_name');
    localStorage.removeItem('truong_pair_names');
    setRole('guest');
    setUserName('');
    router.push('/');
  };

  // 6 BƯỚC SƯ PHẠM VÀNG CHUẨN Y BỞI THẦY ĐỖ MẠNH TRƯỜNG - DUY NHẤT 6 NÚT
  const STEPS_NAV = [
    {
      step: 'B1',
      title: '670 Học Sinh',
      href: '/login',
      icon: Users,
      badge: '670 HS',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      step: 'B2',
      title: 'Buồng Lái 3D',
      href: '/in-class?tab=radar',
      icon: Compass,
      badge: '24 Trạm',
      color: 'from-cyan-500 to-teal-500',
    },
    {
      step: 'B3',
      title: '3 HĐ Trên Lớp',
      href: '/in-class',
      icon: Layers,
      badge: '3 Hoạt động',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      step: 'B4',
      title: 'Đài Chỉ Huy GV',
      href: '/teacher',
      icon: Radio,
      badge: 'Thầy Trường',
      color: 'from-amber-500 to-orange-500',
    },
    {
      step: 'B5',
      title: 'Võ Đài Python',
      href: '/programming',
      icon: Code2,
      badge: 'Pyodide 3.12',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      step: 'B6',
      title: 'Đấu Boss Thi Cử',
      href: '/exams',
      icon: Crown,
      badge: '8 Đề Boss',
      color: 'from-rose-500 to-red-500',
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/95 border-b border-cyan-500/25 shadow-2xl shadow-cyan-950/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* LOGO GAME METAVERSE: THẦY ĐỖ MẠNH TRƯỜNG */}
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
                THẦY ĐỖ MẠNH TRƯỜNG
              </span>
            </div>
          </Link>

          {/* THANH ĐIỀU HƯỚNG DUY NHẤT 6 BƯỚC TRÊN DESKTOP */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {STEPS_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && !item.href.includes('?'));

              return (
                <Link
                  key={item.step}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs font-black transition-all relative border ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-neon-cyan/40 scale-105'
                      : 'text-slate-300 hover:text-white bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/80'
                  }`}
                >
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase text-white bg-gradient-to-r ${item.color}`}>
                    {item.step}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300 animate-pulse' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* GÓC PHẢI: USER STATUS HOẶC NÚT ĐĂNG NHẬP */}
          <div className="flex items-center gap-2 shrink-0">
            {!mounted || role === 'guest' ? (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-neon-cyan/40 transition-all border border-cyan-300/40 hover:scale-105"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Vào Buồng Lái</span>
                <span className="sm:hidden">Đăng nhập</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="font-bold text-cyan-300 max-w-[120px] truncate">
                    {userName || (role === 'teacher' ? 'Thầy Trường' : 'Học sinh')}
                  </span>
                  {role === 'teacher' && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  title="Đăng xuất khỏi hệ thống"
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-900/80 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Nút mở Menu Mobile */}
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

      {/* MOBILE MENU: 6 BƯỚC DÀNH CHO ĐIỆN THOẠI HOẶC MÀN HÌNH NHỎ */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cyan-500/20 bg-slate-950/98 px-4 py-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="text-[11px] font-black uppercase text-cyan-400 tracking-wider px-2 pb-1 border-b border-cyan-500/20">
            6 Bước Sư Phạm Vàng · Chuẩn Y Bởi Thầy Trường
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {STEPS_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.step}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-black uppercase text-white bg-gradient-to-r ${item.color}`}>
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-sm text-white">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">{item.badge}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
