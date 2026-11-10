'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Laptop, 
  BookOpen, 
  FileText, 
  ClipboardCheck, 
  Award, 
  UserCheck, 
  GraduationCap, 
  LogIn
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Trang chủ', icon: Laptop },
    { href: '/subjects', label: 'Môn học (6-9)', icon: BookOpen },
    { href: '/worksheets', label: 'Phiếu học tập', icon: FileText },
    { href: '/exams', label: 'Kiểm tra', icon: ClipboardCheck },
    { href: '/achievements', label: 'Bảng vàng & XP', icon: Award },
    { href: '/student', label: 'Học sinh', icon: GraduationCap },
    { href: '/teacher', label: 'Giáo viên', icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight block">
                TRUONG <span className="text-blue-600">CLASSROOM</span>
              </span>
              <span className="text-xs text-slate-500 block -mt-1 font-medium">
                Tin học THCS Mão Điền
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action / Auth Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all hover:shadow"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
