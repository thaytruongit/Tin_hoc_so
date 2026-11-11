import Link from 'next/link';
import { Laptop, Heart, Code2, ShieldCheck, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-900">
                TRUONG DIGITAL CLASSROOM
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Hệ sinh thái học tập số môn Tin học dành riêng cho học sinh Khối 6, 7, 8, 9 trường THCS Mão Điền. Tích hợp phiếu học tập trực tuyến, phòng kiểm tra chống gian lận và cơ chế thi đua học tốt.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Trường THCS Mão Điền - Phường Mão Điền, TX Thuận Thành, Bắc Ninh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>manhtruongdo1984@gmail.com - Thầy Đỗ Mạnh Trường</span>
              </div>
            </div>
          </div>

          {/* Column 2: Khối lớp */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Chương trình Tin học
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/subjects?grade=6" className="hover:text-blue-600 transition-colors">Tin học Khối 6 (CT 2018)</Link></li>
              <li><Link href="/subjects?grade=7" className="hover:text-blue-600 transition-colors">Tin học Khối 7 (Bảng tính Excel)</Link></li>
              <li><Link href="/subjects?grade=8" className="hover:text-blue-600 transition-colors">Tin học Khối 8 (Thuật toán & Lập trình)</Link></li>
              <li><Link href="/subjects?grade=9" className="hover:text-blue-600 transition-colors">Tin học Khối 9 (An toàn số & Mạng)</Link></li>
              <li><Link href="/programming" className="hover:text-blue-600 transition-colors">Luyện Lập Trình: Python / C++</Link></li>
            </ul>
          </div>

          {/* Column 3: Chức năng */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Tính năng chính
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/in-class" className="hover:text-blue-600 transition-colors">Hoạt động trên lớp</Link></li>
              <li><Link href="/worksheets" className="hover:text-blue-600 transition-colors">Phiếu học tập điện tử</Link></li>
              <li><Link href="/exams" className="hover:text-blue-600 transition-colors">Phòng kiểm tra trực tuyến</Link></li>
              <li><Link href="/achievements" className="hover:text-blue-600 transition-colors">Bảng vàng thi đua</Link></li>
              <li><Link href="/student" className="hover:text-blue-600 transition-colors">Không gian học sinh</Link></li>
              <li><Link href="/teacher" className="hover:text-blue-600 transition-colors">Kênh Giáo viên (Thầy Trường)</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Thầy Đỗ Mạnh Trường - THCS Mão Điền. Toàn quyền quản trị.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bảo mật phân quyền</span>
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Next.js + Supabase</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
