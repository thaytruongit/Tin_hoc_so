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

          {/* Column 2: Không gian học sinh */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Không Gian Học Sinh (123)
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/in-class" className="hover:text-blue-600 transition-colors">1. Buồng Lái Lớp Học (3 HĐ)</Link></li>
              <li><Link href="/programming" className="hover:text-blue-600 transition-colors">2. Võ Đài Python (Wasm 3.12)</Link></li>
              <li><Link href="/exams" className="hover:text-blue-600 transition-colors">3. Đấu Boss Thi Cử (Chống lận)</Link></li>
              <li><Link href="/student" className="hover:text-blue-600 transition-colors">4. Hồ Sơ &amp; Bảng Vàng (XP)</Link></li>
            </ul>
          </div>

          {/* Column 3: Đài chỉ huy giáo viên */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Đài Chỉ Huy Giáo Viên (666)
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/teacher" className="hover:text-blue-600 transition-colors">1. Đài Chỉ Huy 24 Trạm (Ziczac)</Link></li>
              <li><Link href="/admin" className="hover:text-blue-600 transition-colors">2. Quản Trị 670 HS (Xuất Excel)</Link></li>
              <li><Link href="/in-class" className="hover:text-blue-600 transition-colors">3. Điều Phối Tiết Dạy &amp; Đề Thi</Link></li>
              <li><Link href="/teacher" className="hover:text-blue-600 transition-colors">4. Cấu Hình Google Drive Thực Hành</Link></li>
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
