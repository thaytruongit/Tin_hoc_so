'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  FileText, 
  ClipboardCheck, 
  Code2, 
  Trophy, 
  BarChart3, 
  UserCheck, 
  Settings, 
  LogIn, 
  LogOut,
  Laptop,
  UploadCloud,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'teacher' | 'guest'>('guest');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('truong_user_role') as 'student' | 'teacher' | null;
    const name = localStorage.getItem('truong_student_name') || 'Thầy Trương';
    if (savedRole) {
      setRole(savedRole);
      setUserName(name);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('truong_user_role');
    localStorage.removeItem('truong_student_id');
    localStorage.removeItem('truong_student_name');
    localStorage.removeItem('truong_student_class');
    setRole('guest');
    router.push('/');
  };

  // Cấu trúc Menu chuẩn hệ sinh thái học tập số môn Tin học
  const baseMenus = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/in-class', label: 'Củng cố (7 câu)', icon: Sparkles, highlight: true },
    { href: '/subjects', label: 'Học liệu & Bài giảng', icon: BookOpen },
    { href: '/homework', label: 'Bài tập về nhà', icon: UploadCloud },
    { href: '/worksheets', label: 'Phiếu học tập', icon: FileText },
    { href: '/exams', label: 'Kiểm tra', icon: ClipboardCheck },
    { href: '/programming', label: 'Luyện code', icon: Code2 },
    { href: '/achievements', label: 'Thành tích', icon: Trophy },
    { href: '/results', label: 'Kết quả', icon: BarChart3 },
  ];

  // Chỉ hiển thị Giáo viên & Quản trị cho tài khoản GV/Admin (Học sinh không nhìn thấy)
  const teacherMenus = [
    { href: '/teacher', label: 'Giáo viên', icon: UserCheck },
    { href: '/admin', label: 'Quản trị', icon: Settings },
  ];

  const displayMenus = role === 'teacher' ? [...baseMenus, ...teacherMenus] : baseMenus;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo chuẩn tên dự án theo TK.docx */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight block">
                THAYTRUONGIT<span className="text-blue-600">-THCS MÃO ĐIỀN</span>
              </span>
              <span className="text-[10px] text-slate-500 block -mt-1 font-semibold uppercase tracking-wider">
                Hệ sinh thái học tập số môn Tin học
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {displayMenus.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const isHighlight = Boolean('highlight' in link && (link as { highlight?: boolean }).highlight);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold shadow-2xs'
                      : isHighlight
                      ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isHighlight ? 'text-amber-600' : ''}`} />
                  <span>{link.label}</span>
                  {isHighlight && (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider ml-0.5">
                      HOT
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Nộp bài phòng máy & Auth Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/in-class"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Củng cố 7 câu</span>
            </Link>

            {role === 'guest' ? (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Đăng nhập</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  {role === 'teacher' ? '👨‍🏫 Thầy Trương' : `🎓 ${userName}`}
                </span>
                <button
                  onClick={handleLogout}
                  title="Đăng xuất"
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
