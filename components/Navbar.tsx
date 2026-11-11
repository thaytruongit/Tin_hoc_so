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
  const [isPair, setIsPair] = useState(false);
  const [pairNames, setPairNames] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('truong_user_role') as 'student' | 'teacher' | null;
    const name = localStorage.getItem('truong_student_name') || 'Thầy Đỗ Mạnh Trường';
    const pair = localStorage.getItem('truong_is_pair') === 'true';
    const pairDisplay = localStorage.getItem('truong_pair_names') || '';

    if (savedRole) {
      setRole(savedRole);
      setUserName(name);
      setIsPair(pair);
      setPairNames(pairDisplay);
    } else {
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
    setIsPair(false);
    setPairNames('');
    router.push('/');
  };

  // Cấu trúc Menu chuẩn hệ sinh thái học tập số môn Tin học
  const baseMenus = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/in-class', label: 'Hoạt động trên lớp', icon: Laptop, highlight: true },
    { href: '/subjects', label: 'Kho học liệu & Thực hành', icon: BookOpen },
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-cyan-500/20 shadow-lg shadow-cyan-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Cyber Game Hub */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-neon-cyan/50 group-hover:scale-105 group-hover:shadow-cyan-400 transition-all border border-cyan-300/40">
              <Laptop className="w-5 h-5 animate-pulse text-cyan-200" />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base text-white tracking-wider flex items-center gap-1.5 glow-text-cyan">
                <span>TIN HỌC SỐ</span>
                <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-[10px] text-cyan-300 font-extrabold uppercase">
                  Mão Điền
                </span>
              </span>
              <span className="text-[10px] text-cyan-400/80 block -mt-0.5 font-bold uppercase tracking-widest">
                Thầy Đỗ Mạnh Trường · Cyber Academy
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-neon-cyan/30'
                      : isHighlight
                      ? 'bg-purple-900/40 text-purple-200 border border-purple-500/40 hover:bg-purple-800/50 hover:text-white'
                      : 'text-slate-400 hover:text-cyan-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300 animate-pulse' : isHighlight ? 'text-purple-400' : ''}`} />
                  <span>{link.label}</span>
                  {isHighlight && (
                    <span className="px-1.5 py-0.2 rounded-full bg-purple-500 text-white text-[9px] font-black uppercase tracking-wider ml-0.5 animate-pulse">
                      HOT
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Nộp bài phòng máy & Auth Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/in-class"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-neon-purple/40 border border-purple-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              <span>Củng cố 7 câu</span>
            </Link>

            {role === 'guest' ? (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-neon-cyan/40 transition-all border border-cyan-400/30 hover:scale-105"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Vào Buồng Lái</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-xs font-bold text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-cyan-500/30 shadow-xs">
                  {role === 'teacher' ? '👑 Thầy Đỗ Mạnh Trường' : isPair ? `👥 ${pairNames || userName}` : `🎓 ${userName}`}
                </span>
                <button
                  onClick={handleLogout}
                  title="Thoát buồng lái"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 hover:border-rose-500/40 transition-colors"
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
