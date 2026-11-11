import Link from 'next/link';
import { 
  Users, 
  Compass, 
  Layers, 
  Radio, 
  Code2, 
  Crown, 
  Zap, 
  Sparkles, 
  Trophy, 
  ChevronRight, 
  ShieldCheck, 
  Laptop,
  CheckCircle2,
  FolderDown,
  Cpu,
  Flame,
  Award
} from 'lucide-react';
import { MOCK_STUDENTS } from '@/lib/mock-data';

export default function HomePage() {
  const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.totalXp - a.totalXp).slice(0, 3);

  // 6 CỔNG CHIẾN DỊCH SƯ PHẠM VÀNG - CHUẨN Y BỞI THẦY ĐỖ MẠNH TRƯỜNG
  const CAMPAIGN_STEPS = [
    {
      step: 'BƯỚC 1',
      title: 'Căn Cước 670 Học Sinh',
      subtitle: 'Xác thực định danh học tập số',
      desc: 'Hệ thống định danh 670 học sinh THCS Mão Điền (Khối 6, 7, 8, 9). Đăng nhập bằng Mã học sinh, mật khẩu mặc định 123, tài khoản Tổng chỉ huy Thầy Đỗ Mạnh Trường (Mã 666).',
      href: '/login',
      icon: Users,
      badge: '670 Học Sinh',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      borderGlow: 'hover:border-cyan-400 hover:shadow-cyan-500/30',
      actionText: 'Kích hoạt Căn cước',
      features: ['Mã HS riêng biệt', 'Mật khẩu mặc định 123', 'Admin Thầy Trường (666)'],
    },
    {
      step: 'BƯỚC 2',
      title: 'Buồng Lái Kép & Sơ Đồ 3D',
      subtitle: '24 Máy trạm tác chiến thời gian thực',
      desc: 'Mô phỏng 3D buồng lái đôi 24 trạm máy theo sơ đồ Ziczac chuẩn phòng thực hành (Hàng 1: 4-3-2-1; Hàng 2: 5-6-7-8...). Phân vai Cơ trưởng & Cơ phó tương tác đổi vai.',
      href: '/in-class?tab=radar',
      icon: Compass,
      badge: '24 Máy Trạm',
      color: 'from-cyan-500 via-teal-500 to-emerald-500',
      borderGlow: 'hover:border-teal-400 hover:shadow-teal-500/30',
      actionText: 'Vào Buồng Lái 3D',
      features: ['2 HS/máy (Cơ trưởng - Cơ phó)', 'Sơ đồ Ziczac 4 hàng 24 máy', 'Đổi vai tương tác tức thời'],
    },
    {
      step: 'BƯỚC 3',
      title: '3 Hoạt Động Trên Lớp',
      subtitle: 'Quy trình sư phạm 29 tiết tích hợp NLS & AI',
      desc: 'Bộ 3 hoạt động trực tiếp tại phòng máy: 1. Khám phá logic đôi kéo-thả; 2. Thử thách củng cố 7 câu chuẩn Bộ GD&ĐT; 3. Nộp bài thực hành Google Drive của Thầy Trường.',
      href: '/in-class',
      icon: Layers,
      badge: '3 Hoạt Động',
      color: 'from-teal-500 via-emerald-500 to-green-500',
      borderGlow: 'hover:border-emerald-400 hover:shadow-emerald-500/30',
      actionText: 'Vào 3 Hoạt Động Lớp',
      features: ['Khám phá ghép thẻ logic đôi', 'Củng cố 7 câu chuẩn Bộ', 'Nộp bài Drive tự động'],
    },
    {
      step: 'BƯỚC 4',
      title: 'Đài Chỉ Huy Thầy Trường',
      subtitle: 'Quản trị điều phối 24 trạm thời gian thực',
      desc: 'Trung tâm chỉ huy dành riêng cho Thầy Đỗ Mạnh Trường: Giám sát 24 trạm máy theo sơ đồ thực tế, Buff Sao Vàng khích lệ, Khóa/Mở máy tập trung, Chiếu Hologram bài mẫu & Xuất Excel 1-click.',
      href: '/teacher',
      icon: Radio,
      badge: 'Tổng Chỉ Huy',
      color: 'from-amber-500 via-orange-500 to-yellow-500',
      borderGlow: 'hover:border-amber-400 hover:shadow-amber-500/30',
      actionText: 'Mở Đài Chỉ Huy GV',
      features: ['Buff Sao Vàng trực tiếp', 'Khóa trạm & Chiếu bài mẫu', 'Xuất Sổ Điểm Excel .xls'],
    },
    {
      step: 'BƯỚC 5',
      title: 'Võ Đài Python WebAssembly',
      subtitle: 'Pyodide 3.12 chấm Multi-Test Cases',
      desc: 'Võ đài lập trình chạy trực tiếp mã nguồn Python trên trình duyệt không cần cài đặt. Hệ thống chấm Multi-Test Cases tự động cho 12 bài toán SGK và đội tuyển HSG, hiệu ứng combo đòn đánh.',
      href: '/programming',
      icon: Code2,
      badge: 'Python 3.12',
      color: 'from-purple-500 via-indigo-500 to-blue-500',
      borderGlow: 'hover:border-purple-400 hover:shadow-purple-500/30',
      actionText: 'Vào Võ Đài Python',
      features: ['Pyodide Wasm thuần client', 'Chấm Multi-Test Cases tự động', 'Hạ gục Boss Bug & Tích Combo'],
    },
    {
      step: 'BƯỚC 6',
      title: 'Đấu Boss Thi Cử Định Kỳ',
      subtitle: '8 Đề thi chuẩn Ma trận nhận thức Bộ GD&ĐT',
      desc: 'Hệ thống phòng thi trực tuyến chống gian lận đa tầng: Radar cảnh báo chuyển tab, khóa phím tắt, phân tích Ma trận nhận thức 3D (Biết - Hiểu - Vận dụng) và chấm điểm tự động.',
      href: '/exams',
      icon: Crown,
      badge: '8 Đề Boss',
      color: 'from-rose-500 via-red-500 to-pink-500',
      borderGlow: 'hover:border-rose-400 hover:shadow-rose-500/30',
      actionText: 'Vào Phòng Đấu Boss',
      features: ['8 Đề Giữa/Cuối kỳ khối 6-9', 'Radar chống chuyển tab', 'Biểu đồ Ma trận nhận thức 3D'],
    },
  ];

  return (
    <div className="space-y-16 pb-20 cyber-grid-bg">
      {/* ==================================================================== */}
      {/* HERO SECTION: CHIẾN HẠM METAVERSE TIN HỌC SỐ - THẦY ĐỖ MẠNH TRƯỜNG */}
      {/* ==================================================================== */}
      <section className="relative overflow-hidden pt-10 pb-16 border-b border-cyan-500/20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/25 to-pink-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Huy hiệu vũ trụ */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-black tracking-widest uppercase shadow-neon-cyan/40 animate-pulse">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>QUY TRÌNH 6 BƯỚC SƯ PHẠM VÀNG · THCS MÃO ĐIỀN · THẦY ĐỖ MẠNH TRƯỜNG</span>
          </div>

          {/* Tiêu đề Game Hóa */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight glow-text-cyan">
            ĐẤU TRƯỜNG HỌC TẬP{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              TIN HỌC SỐ METAVERSE
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Hệ sinh thái học tập tương tác số môn Tin học (Khối 6, 7, 8, 9) dành riêng cho học sinh trường THCS Mão Điền.
            Được cấu trúc chặt chẽ theo <strong className="text-cyan-300 font-extrabold">ĐÚNG 6 BƯỚC SƯ PHẠM VÀNG</strong> chuẩn y bởi <strong className="text-white font-extrabold">Thầy Đỗ Mạnh Trường</strong>.
          </p>

          {/* THỐNG KÊ CHIẾN LƯỢC NHANH */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4">
            <div className="p-3.5 rounded-2xl cyber-hud-card border border-cyan-500/30 text-center">
              <div className="text-2xl font-black text-cyan-300 glow-text-cyan">670</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Học Sinh Mão Điền</div>
            </div>
            <div className="p-3.5 rounded-2xl cyber-hud-card border border-teal-500/30 text-center">
              <div className="text-2xl font-black text-teal-300">24 Trạm</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Buồng Lái Kép 3D</div>
            </div>
            <div className="p-3.5 rounded-2xl cyber-hud-card border border-purple-500/30 text-center">
              <div className="text-2xl font-black text-purple-300">29 Tiết</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tích Hợp NLS & AI</div>
            </div>
            <div className="p-3.5 rounded-2xl cyber-hud-card border border-rose-500/30 text-center">
              <div className="text-2xl font-black text-rose-300">100%</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Chấm Điểm Tự Động</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6 CỔNG CHIẾN DỊCH DUY NHẤT (B1 ĐẾN B6) - TRỰC DIỆN, SINH ĐỘNG NHƯ GAME */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
                <span>BẢN ĐỒ CHIẾN DỊCH 6 BƯỚC</span>
                <span className="text-cyan-400 font-mono text-sm px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40">
                  QUY TRÌNH CHUẨN Y
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Người học lần lượt chinh phục 6 bước sư phạm từ xác thực danh tính đến đọ sức Boss thi cử
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-500/30">
              Tổng Chỉ Huy: Thầy Đỗ Mạnh Trường
            </span>
          </div>
        </div>

        {/* LƯỚI 6 THẺ CARD LỚN ĐẠI DIỆN 6 BƯỚC */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMPAIGN_STEPS.map((stepItem) => {
            const Icon = stepItem.icon;
            return (
              <div
                key={stepItem.step}
                className={`p-6 rounded-3xl cyber-hud-card border border-slate-800 transition-all duration-300 ${stepItem.borderGlow} hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Góc trang trí vệt sáng Cyber */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

                <div>
                  {/* Header thẻ: Bước & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase text-white bg-gradient-to-r ${stepItem.color} shadow-md`}>
                      {stepItem.step}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                      {stepItem.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-neon-cyan/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-lg group-hover:text-cyan-300 transition-colors">
                        {stepItem.title}
                      </h3>
                      <p className="text-xs text-cyan-400/80 font-bold">{stepItem.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {stepItem.desc}
                  </p>

                  {/* Danh sách tính năng cốt lõi */}
                  <div className="space-y-1.5 mb-6 pt-2 border-t border-slate-800/80">
                    {stepItem.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nút hành động trực tiếp */}
                <Link
                  href={stepItem.href}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-black text-white text-center flex items-center justify-center gap-2 transition-all bg-gradient-to-r ${stepItem.color} shadow-neon-cyan/30 hover:opacity-95 hover:scale-[1.02]`}
                >
                  <span>{stepItem.actionText}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* BẢNG VINH DANH CHIẾN BINH XP & THẦY GIÁO TỔNG CHỈ HUY */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* BẢNG VÀNG TOP 3 HỌC SINH MÃO ĐIỀN */}
          <div className="lg:col-span-2 p-6 rounded-3xl cyber-hud-card border border-amber-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
                <div>
                  <h3 className="text-base font-black text-white">BẢNG VÀNG DANH DỰ TIN HỌC SỐ</h3>
                  <p className="text-xs text-amber-400/80 font-bold">Top chiến binh xuất sắc nhất trường THCS Mão Điền</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300">
                Mùa giải 2024-2025
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {topStudents.map((st, idx) => (
                <div
                  key={st.id}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    idx === 0
                      ? 'bg-amber-950/40 border-amber-400/60 shadow-neon-gold/30'
                      : idx === 1
                      ? 'bg-slate-900/60 border-slate-700'
                      : 'bg-slate-900/40 border-amber-900/40'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-black text-base border shadow-md bg-slate-950 text-amber-300 border-amber-400">
                    {idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <div className="font-black text-white text-sm truncate">{st.fullName}</div>
                  <div className="text-[11px] text-cyan-300 font-bold">Lớp {st.className}</div>
                  <div className="mt-2 text-xs font-black text-amber-400">{st.totalXp.toLocaleString()} XP</div>
                </div>
              ))}
            </div>
          </div>

          {/* PROFILE TỔNG CHỈ HUY: THẦY ĐỖ MẠNH TRƯỜNG */}
          <div className="p-6 rounded-3xl cyber-hud-card border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-neon-cyan/40">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">Tổng Chỉ Huy Trưởng</div>
                  <h3 className="text-base font-black text-white">Thầy Đỗ Mạnh Trường</h3>
                  <p className="text-xs text-slate-400">Giáo viên Tin học THCS Mão Điền</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Chủ nhiệm hệ sinh thái giáo dục số 6 bước. Quản lý trực tiếp 670 học sinh, vận hành buồng lái 24 máy trạm và đài chỉ huy thời gian thực.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-cyan-500/20">
              <Link
                href="/teacher"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-white text-center flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all shadow-neon-gold/30"
              >
                <Radio className="w-4 h-4" />
                <span>Truy Cập Đài Chỉ Huy (Mã 666)</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER BẢN QUYỀN CHÍNH THỨC */}
      <footer className="text-center pt-8 border-t border-cyan-500/10 text-xs text-slate-500">
        <p>© 2025 THCS Mão Điền · Hệ Thống Đấu Trường Học Tập Tin Học Số</p>
        <p className="text-slate-400 font-bold mt-1">Thiết kế & Vận hành: Thầy Đỗ Mạnh Trường · Quy trình 6 Bước Sư Phạm Vàng</p>
      </footer>
    </div>
  );
}
