'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Laptop, 
  Code2, 
  Crown, 
  Trophy, 
  Radio, 
  Users, 
  Layers, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  Monitor, 
  Star, 
  Lock, 
  FileSpreadsheet, 
  Eye, 
  Award,
  ArrowRight,
  HelpCircle,
  FolderDown
} from 'lucide-react';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { MOCK_STUDENTS } from '@/lib/mock-data';

export default function HomePage() {
  const [user, setUser] = useState<UserSession>({ isLoggedIn: false, role: 'guest' });
  const [mounted, setMounted] = useState(false);
  const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.totalXp - a.totalXp).slice(0, 3);

  useEffect(() => {
    setMounted(true);
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="space-y-16 pb-20 cyber-grid-bg">
      {/* ==================================================================== */}
      {/* 1. HERO SECTION: KHÔNG GIAN ĐẤU TRƯỜNG HỌC TẬP TIN HỌC SỐ METAVERSE */}
      {/* ==================================================================== */}
      <section className="relative overflow-hidden pt-10 pb-16 border-b border-cyan-500/20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[360px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/25 to-pink-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Huy hiệu vũ trụ */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-black tracking-widest uppercase shadow-neon-cyan/40 animate-pulse">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>HỆ THỐNG GIÁO DỤC SỐ · THCS MÃO ĐIỀN · TỔNG CHỈ HUY: THẦY ĐỖ MẠNH TRƯỜNG</span>
          </div>

          {/* Tiêu đề Đấu trường */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight glow-text-cyan">
            ĐẤU TRƯỜNG HỌC TẬP{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              TIN HỌC SỐ METAVERSE
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Hệ sinh thái dạy học tương tác thông minh môn Tin học THCS (Khối 6, 7, 8, 9).
            Bố trí khoa học theo <strong className="text-cyan-300">đúng ngữ cảnh thực tế phòng máy</strong>:
            Học sinh tác chiến buồng lái kép 2 bạn/máy — Giáo viên điều hành đài chỉ huy 24 trạm thời gian thực.
          </p>

          {/* 2 CỔNG ĐĂNG NHẬP PHÂN QUYỀN RÕ RỆT CHO NGỮ CẢNH THỰC TẾ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto pt-4 text-left">
            
            {/* CỔNG 1: HỌC SINH */}
            <div className="p-6 rounded-3xl cyber-hud-card border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-neon-cyan/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-neon-cyan/40">
                  <Laptop className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-cyan-950 text-cyan-300 border border-cyan-400/40">
                  Mật khẩu: 123
                </span>
              </div>

              <h2 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                Cổng Phi Hành Đoàn Học Sinh
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Dành cho <strong>670 học sinh THCS Mão Điền</strong>. Tích chọn tên theo Lớp & Trạm máy (Máy 01-24), ghép cặp 2 bạn (Cơ trưởng & Cơ phó), làm bài và nộp sản phẩm trực tiếp.
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>3 Hoạt động lớp: Khám phá · Củng cố 7 câu · Nộp bài Drive</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Võ đài Python 3.12 WebAssembly & Đấu Boss thi cử</span>
                </div>
              </div>

              <Link
                href="/login"
                className="mt-5 w-full py-3 px-4 rounded-xl text-xs font-black text-white flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-neon-cyan/40"
              >
                <span>Vào Buồng Lái Học Sinh (Mật khẩu: 123)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* CỔNG 2: GIÁO VIÊN (THẦY ĐỖ MẠNH TRƯỜNG) */}
            <div className="p-6 rounded-3xl cyber-hud-card border border-amber-500/40 hover:border-amber-400 transition-all shadow-neon-gold/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-neon-gold/40">
                  <Crown className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-amber-950 text-amber-300 border border-amber-400/40">
                  Mật khẩu Thầy: 666
                </span>
              </div>

              <h2 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                Cổng Tổng Chỉ Huy Giáo Viên
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Đặc quyền dành riêng cho <strong>Thầy Đỗ Mạnh Trường</strong>. Nắm toàn quyền điều phối 24 trạm máy thời gian thực, Buff Sao Vàng, khóa/mở máy và 1-click xuất sổ điểm Excel.
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Sơ đồ Ziczac 24 máy: Buff Sao Vàng · Khóa trạm · Hologram</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Quản lý 670 học sinh 4 khối & Xuất bảng điểm Excel .xls</span>
                </div>
              </div>

              <Link
                href="/login?role=teacher"
                className="mt-5 w-full py-3 px-4 rounded-xl text-xs font-black text-slate-950 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition-all shadow-neon-gold/40"
              >
                <Radio className="w-4 h-4" />
                <span>Mở Đài Chỉ Huy GV (Mã: 666)</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. BỐ TRÍ THIẾT KẾ KHOA HỌC: HỌC SINH ĐƯỢC QUYỀN GÌ? GIÁO VIÊN GIỮ VAI TRÒ GÌ? */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            KHÔNG GIAN HỆ THỐNG PHÂN QUYỀN CHUẨN MỰC
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Mỗi đối tượng có không gian chức năng độc lập, bảo mật và hỗ trợ tối đa cho trải nghiệm học tập
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CỘT TRÁI: HỌC SINH ĐƯỢC QUYỀN GÌ? */}
          <div className="p-6 sm:p-8 rounded-3xl cyber-hud-card border border-cyan-500/30 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-cyan-500/20">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-neon-cyan/30">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">Không gian người học</span>
                <h3 className="text-xl font-black text-white">Học Sinh Được Quyền Gì?</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-2.5 font-bold text-sm text-cyan-300 mb-1">
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <span>1. Buồng Lái Kép & 3 Hoạt Động Lớp Học</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ngồi theo cặp (Cơ trưởng & Cơ phó), đổi vai thao tác. Hoàn thành 3 hoạt động trực tiếp trong tiết học: <em>Khám phá logic</em> ➔ <em>Thử thách 7 câu củng cố</em> ➔ <em>Nộp file thực hành về Google Drive của Thầy Trường</em>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center gap-2.5 font-bold text-sm text-purple-300 mb-1">
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span>2. Võ Đài Lập Trình Python WebAssembly</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Luyện code trực tiếp trên trình duyệt bằng Pyodide 3.12 (không cần cài đặt). Tự động chấm điểm Multi-Test Cases và tích điểm combo đòn đánh diệt Bug.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-colors">
                <div className="flex items-center gap-2.5 font-bold text-sm text-rose-300 mb-1">
                  <Crown className="w-4 h-4 text-rose-400" />
                  <span>3. Phòng Thi Đấu Boss Chống Gian Lận</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Làm các bài thi Giữa kỳ và Cuối kỳ. Hệ thống kích hoạt radar cảnh báo chuyển tab, khóa phím tắt và trả kết quả phổ điểm Ma trận nhận thức 3D tức thì.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-2.5 font-bold text-sm text-amber-300 mb-1">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>4. Hồ Sơ Cá Nhân & Bảng Vàng Danh Dự</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Theo dõi lịch sử học tập, số điểm XP tích lũy, bộ sưu tập Huy hiệu chiến binh và thứ hạng vinh danh trong Lớp và toàn trường THCS Mão Điền.
                </p>
              </div>
            </div>

            <Link
              href="/in-class"
              className="w-full py-3 rounded-xl text-xs font-black text-white text-center flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-neon-cyan/30"
            >
              <span>Trải Nghiệm Buồng Lái Lớp Học</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* CỘT PHẢI: GIÁO VIÊN GIỮ VAI TRÒ GÌ? */}
          <div className="p-6 sm:p-8 rounded-3xl cyber-hud-card border border-amber-500/30 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-amber-500/20">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-neon-gold/30">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Không gian sư phạm quản trị</span>
                <h3 className="text-xl font-black text-white">Giáo Viên Giữ Vai Trò Gì?</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-2.5 font-bold text-sm text-amber-300 mb-1">
                  <Monitor className="w-4 h-4 text-amber-400" />
                  <span>1. Giám Sát 24 Máy Trạm Thời Gian Thực</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Theo dõi trực quan trạng thái 24 máy trạm theo sơ đồ phòng máy thực tế (Hàng 1: 4-3-2-1; Hàng 2: 5-6-7-8...). Nắm bắt tiến độ từng cặp học sinh trong từng giây.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-yellow-500/40 transition-colors">
                <div className="flex items-center gap-2.5 font-bold text-sm text-yellow-300 mb-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>2. Buff Sao Vàng & Chiếu Hologram Bài Mẫu</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Khích lệ tinh thần học sinh bằng cách bấm Buff Sao Vàng trực tiếp xuống máy trạm. Chọn bài làm xuất sắc để chiếu phóng to lên màn hình máy chiếu cho cả lớp noi theo.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-colors">
                <div className="flex items-center gap-2.5 font-bold text-sm text-rose-300 mb-1">
                  <Lock className="w-4 h-4 text-rose-400" />
                  <span>3. Khóa / Mở Trạm Tập Trung & Cảnh Báo</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  1-Click khóa máy đồng loạt khi Thầy cần giảng bài lý thuyết trọng tâm hoặc nhắc nhở trật tự. Tiếp nhận tín hiệu cứu hộ SOS từ các máy trạm gặp sự cố kỹ thuật.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-colors">
                <div className="flex items-center gap-2.5 font-bold text-sm text-blue-300 mb-1">
                  <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                  <span>4. Quản Lý 670 Học Sinh & Xuất Sổ Điểm Excel</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quản lý danh bạ 670 học sinh 4 khối (6, 7, 8, 9). Tự động tổng hợp điểm Hoạt động 1, Hoạt động 2, Hoạt động 3 và 1-click xuất sổ điểm điện tử <code>.xls</code> chuẩn Bộ GD&ĐT.
                </p>
              </div>
            </div>

            <Link
              href="/teacher"
              className="w-full py-3 rounded-xl text-xs font-black text-slate-950 text-center flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition-all shadow-neon-gold/30"
            >
              <Radio className="w-4 h-4" />
              <span>Mở Đài Chỉ Huy Thầy Trường (Mã: 666)</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. BẢNG VÀNG VINH DANH HỌC SINH MÃO ĐIỀN */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl cyber-hud-card border border-amber-500/30 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <Trophy className="w-7 h-7 text-amber-400 animate-bounce" />
              <div>
                <h3 className="text-lg font-black text-white">BẢNG VÀNG VINH DANH CHIẾN BINH TIN HỌC SỐ</h3>
                <p className="text-xs text-amber-400/80 font-bold">Top học sinh có điểm thành tích XP cao nhất trường THCS Mão Điền</p>
              </div>
            </div>
            <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 self-start sm:self-center">
              Niên khóa 2024 - 2025
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topStudents.map((st, idx) => (
              <div
                key={st.id}
                className={`p-5 rounded-2xl border text-center transition-all ${
                  idx === 0
                    ? 'bg-amber-950/40 border-amber-400/60 shadow-neon-gold/30'
                    : idx === 1
                    ? 'bg-slate-900/60 border-slate-700'
                    : 'bg-slate-900/40 border-amber-900/40'
                }`}
              >
                <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl border shadow-md bg-slate-950 text-amber-300 border-amber-400">
                  {idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉'}
                </div>
                <div className="font-black text-white text-base truncate">{st.fullName}</div>
                <div className="text-xs text-cyan-300 font-bold mt-0.5">Lớp {st.className} · Khối {st.className.charAt(0)}</div>
                <div className="mt-3 text-sm font-black text-amber-400">{st.totalXp.toLocaleString()} XP</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. CƠ SỞ KHOA HỌC: QUY TRÌNH 6 BƯỚC SƯ PHẠM VÀNG (ID: #quy-trinh-6-buoc) */}
      {/* ==================================================================== */}
      <section id="quy-trinh-6-buoc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="border-b border-cyan-500/20 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-black uppercase border border-cyan-500/30 mb-2">
            Hồ sơ nghiên cứu khoa học sư phạm
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            QUY TRÌNH 6 BƯỚC SƯ PHẠM VÀNG ĐÃ ĐƯỢC CHUẨN Y
          </h2>
          <p className="text-xs text-slate-400">
            Nền tảng vận hành logic kết nối toàn bộ hệ sinh thái môn Tin học THCS Mão Điền — Thầy Đỗ Mạnh Trường
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
            <span className="font-black text-cyan-400">Bước 1: Căn Cước 670 Học Sinh</span>
            <p className="text-slate-300">Định danh mã học sinh, mật khẩu 123, tài khoản Tổng chỉ huy Thầy 666.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
            <span className="font-black text-teal-400">Bước 2: Buồng Lái Kép & Sơ Đồ 3D</span>
            <p className="text-slate-300">24 Trạm máy ziczac (4-3-2-1 / 5-6-7-8), phân vai Cơ trưởng & Cơ phó đổi vai.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
            <span className="font-black text-emerald-400">Bước 3: 3 Hoạt Động Lớp Học</span>
            <p className="text-slate-300">Khám phá logic đôi + Luyện tập 7 câu chuẩn Bộ + Nộp bài Drive thời gian thực.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
            <span className="font-black text-amber-400">Bước 4: Đài Chỉ Huy Thầy Trường</span>
            <p className="text-slate-300">Giám sát 24 máy, Buff Sao Vàng, khóa trạm, chiếu Hologram & xuất sổ Excel .xls.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
            <span className="font-black text-purple-400">Bước 5: Võ Đài Python WebAssembly</span>
            <p className="text-slate-300">Pyodide 3.12 chạy thuần browser, chấm Multi-Test Cases tự động, combo diệt Bug.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
            <span className="font-black text-rose-400">Bước 6: Đấu Boss Thi Cử Chống Gian Lận</span>
            <p className="text-slate-300">8 Đề thi Giữa/Cuối kỳ chuẩn Ma trận nhận thức Bộ GD&ĐT, Radar chống chuyển tab.</p>
          </div>
        </div>
      </section>

      {/* FOOTER BẢN QUYỀN CHÍNH THỨC */}
      <footer className="text-center pt-8 border-t border-cyan-500/10 text-xs text-slate-500">
        <p>© 2025 THCS Mão Điền · Hệ Thống Đấu Trường Học Tập Tin Học Số</p>
        <p className="text-slate-400 font-bold mt-1">Chủ nhiệm & Vận hành: Thầy Đỗ Mạnh Trường · THCS Mão Điền, Bắc Ninh</p>
      </footer>
    </div>
  );
}
