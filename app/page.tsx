import Link from 'next/link';
import { 
  Laptop, 
  Sparkles, 
  FileText, 
  ClipboardCheck, 
  Trophy, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  ShieldAlert,
  Flame,
  BookMarked,
  UploadCloud,
  Code2,
  Sword,
  Crown,
  Zap,
  Radio,
  Gamepad2,
  ChevronRight,
  Star
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_WORKSHEETS, MOCK_EXAMS, MOCK_CLASSES } from '@/lib/mock-data';

export default function HomePage() {
  const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.totalXp - a.totalXp).slice(0, 3);

  return (
    <div className="space-y-16 pb-20 cyber-grid-bg">
      {/* ==================================================================== */}
      {/* 1. HERO SECTION: CHIẾN HẠM KHÔNG GIAN TRI THỨC SỐ (CYBER METAVERSE) */}
      {/* ==================================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-cyan-500/20">
        {/* Vầng hào quang Cyberpunk Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/25 to-pink-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Huy hiệu vũ trụ */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-black tracking-widest uppercase shadow-neon-cyan/40 animate-pulse">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Chương trình GDPT 2018 · THCS Mão Điền · Thầy Đỗ Mạnh Trường</span>
            </div>

            {/* Tiêu đề Game Hóa */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight glow-text-cyan">
              ĐẤU TRƯỜNG CÔNG NGHỆ{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                TIN HỌC SỐ
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Biến từng tiết học Tin học thành <strong className="text-cyan-300">Cuộc phiêu lưu đa người chơi thời gian thực</strong>. Tác chiến cặp đôi buồng lái 24 trạm máy, hạ gục quái vật Bug tại Võ đài Python, chinh phục 8 Ải Boss thi cử chuẩn Ma trận Bộ GD&ĐT!
            </p>

            {/* 4 CỔNG DỊCH CHUYỂN NHANH (QUICK WARP PORTALS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-left">
              {/* Cổng 1: Buồng lái phòng máy */}
              <Link
                href="/in-class"
                className="group p-5 rounded-3xl cyber-hud-card border border-cyan-500/30 hover:border-cyan-400 transition-all hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-neon-cyan/40 group-hover:scale-110 transition-transform">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    24 Trạm Máy
                  </span>
                </div>
                <h3 className="font-black text-white text-base group-hover:text-cyan-300 transition-colors">
                  Buồng Lái Phòng Máy
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Tác chiến cặp đôi (Cơ trưởng & Cơ phó), làm bài củng cố 7 câu và nộp thực hành về Drive.
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Vào buồng lái ngay</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>

              {/* Cổng 2: Võ đài Python Pyodide */}
              <Link
                href="/programming"
                className="group p-5 rounded-3xl cyber-hud-card border border-purple-500/30 hover:border-purple-400 transition-all hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-neon-purple/40 group-hover:scale-110 transition-transform">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40">
                    Python 3.12
                  </span>
                </div>
                <h3 className="font-black text-white text-base group-hover:text-purple-300 transition-colors">
                  Võ Đài Lập Trình
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Pyodide WebAssembly chấm Multi-Test Cases tự động, tích lũy điểm combo cho Khối 8, 9 & HSG.
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>Chiến đấu ngay</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>

              {/* Cổng 3: Đấu Boss Thi Cử */}
              <Link
                href="/exams"
                className="group p-5 rounded-3xl cyber-hud-card border border-rose-500/30 hover:border-rose-400 transition-all hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-rose-300 shadow-neon-crimson/40 group-hover:scale-110 transition-transform">
                    <Crown className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40">
                    8 Đề Boss
                  </span>
                </div>
                <h3 className="font-black text-white text-base group-hover:text-rose-300 transition-colors">
                  Đấu Boss Thi Cử
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Thi Giữa kỳ & Cuối kỳ chống gian lận đa tầng, phân tích Ma trận nhận thức tức thời.
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-rose-400 group-hover:translate-x-1 transition-transform">
                  <span>Vào trận đánh Boss</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>

              {/* Cổng 4: Đài Chỉ Huy Thầy Trường */}
              <Link
                href="/teacher"
                className="group p-5 rounded-3xl cyber-hud-card border border-amber-500/30 hover:border-amber-400 transition-all hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-neon-gold/40 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40">
                    Thầy Trường (666)
                  </span>
                </div>
                <h3 className="font-black text-white text-base group-hover:text-amber-300 transition-colors">
                  Đài Chỉ Huy Tổng
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Buff Sao Vàng Hologram, điều khiển khóa/mở trạm máy và 1-click xuất sổ điểm Excel chuẩn Bộ.
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Mở phòng chỉ huy</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

            {/* Chỉ số Game Server (Stats HUD) */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl cyber-hud-card border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 glow-text-cyan">{MOCK_CLASSES.length} Guild</div>
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Khối 6, 7, 8, 9</div>
              </div>
              <div className="p-4 rounded-2xl cyber-hud-card border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-purple-400 glow-text-purple">669 Chiến Binh</div>
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">THCS Mão Điền</div>
              </div>
              <div className="p-4 rounded-2xl cyber-hud-card border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">24 Cyber Pods</div>
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Buồng Lái Kép</div>
              </div>
              <div className="p-4 rounded-2xl cyber-hud-card border border-slate-800">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 glow-text-gold">116 Ải Nhiệm Vụ</div>
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">CV 3456 & AI 3439</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. HỆ THỐNG 4 GUILD KHÔNG GIAN (4 KHỐI LỚP 6, 7, 8, 9) */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-400 uppercase tracking-widest mb-1">
              <Gamepad2 className="w-4 h-4" />
              <span>Hải Trình 4 Quân Đoàn Mão Điền</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Chương trình Tin học GDPT 2018 theo 4 Khối
            </h2>
          </div>
          <Link
            href="/subjects"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 transition-all"
          >
            <span>Mở Kho Tàng Học Liệu Số</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              grade: 6,
              title: 'Guild Khối 6',
              sub: 'Tân Binh Số',
              desc: 'Thông tin và dữ liệu, Mạng máy tính, Internet, An toàn số, Sơ đồ tư duy.',
              color: 'from-blue-600 via-cyan-500 to-teal-400',
              borderColor: 'border-cyan-500/40 hover:border-cyan-400',
              badge: 'Chủ đề A - E',
            },
            {
              grade: 7,
              title: 'Guild Khối 7',
              sub: 'Dũng Sĩ Bảng Tính',
              desc: 'Bảng tính điện tử Excel, công thức và các hàm logic SUMIF, COUNTIF, IF.',
              color: 'from-emerald-600 via-teal-500 to-cyan-400',
              borderColor: 'border-emerald-500/40 hover:border-emerald-400',
              badge: 'Chủ đề E: Ứng dụng',
            },
            {
              grade: 8,
              title: 'Guild Khối 8',
              sub: 'Hiệp Sĩ Thuật Toán',
              desc: 'Địa chỉ tương đối & tuyệt đối, cấu trúc rẽ nhánh, lập trình thuật toán Python cơ bản.',
              color: 'from-purple-600 via-indigo-500 to-blue-400',
              borderColor: 'border-purple-500/40 hover:border-purple-400',
              badge: 'Chủ đề E - F',
            },
            {
              grade: 9,
              title: 'Guild Khối 9',
              sub: 'Bậc Thầy AI & Đám Mây',
              desc: 'Trí tuệ nhân tạo (AI), điện toán đám mây, an toàn số và định hướng nghề nghiệp số.',
              color: 'from-rose-600 via-pink-500 to-amber-400',
              borderColor: 'border-rose-500/40 hover:border-rose-400',
              badge: 'Chủ đề D & Hướng nghiệp',
            },
          ].map((item) => (
            <div
              key={item.grade}
              className={`rounded-3xl cyber-hud-card p-6 border ${item.borderColor} transition-all flex flex-col justify-between group hover:-translate-y-1.5`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white font-black text-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg border border-white/20`}>
                  {item.grade}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">
                    {item.badge}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                    {item.sub}
                  </span>
                </div>
                <h3 className="font-black text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-800 mt-6 space-y-2">
                <Link
                  href="/in-class"
                  className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white text-xs font-black flex items-center justify-between shadow-neon-cyan/30 transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                    Tác chiến 7 câu (Khối {item.grade})
                  </span>
                  <span>→</span>
                </Link>
                <div className="flex items-center justify-between text-xs font-bold pt-1 px-1">
                  <Link
                    href={`/worksheets?grade=${item.grade}`}
                    className="text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    Phiếu học tập
                  </Link>
                  <Link
                    href={`/exams?grade=${item.grade}`}
                    className="text-cyan-400 hover:text-cyan-200 flex items-center gap-0.5"
                  >
                    <span>Đấu Boss</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. BẢNG PHONG THẦN: TOP 3 CHIẾN BINH XP DẪN ĐẦU TOÀN TRƯỜNG */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl cyber-hud-card border border-amber-500/30 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-amber-500/20 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-widest mb-1 glow-text-gold">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Bảng Phong Thần Server THCS Mão Điền</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Top Phi Hành Gia Xuất Sắc Dẫn Đầu Điểm XP
              </h2>
            </div>
            <Link
              href="/achievements"
              className="text-xs font-black text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-500/30 hover:border-amber-400 transition-all shadow-neon-gold/20"
            >
              <span>Xem Toàn Bộ Bảng Vàng</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topStudents.map((st, idx) => {
              const borderStyles = [
                'border-amber-400/80 bg-gradient-to-b from-amber-950/40 to-slate-950 shadow-neon-gold/30',
                'border-cyan-400/70 bg-gradient-to-b from-cyan-950/40 to-slate-950 shadow-neon-cyan/30',
                'border-purple-400/70 bg-gradient-to-b from-purple-950/40 to-slate-950 shadow-neon-purple/30',
              ][idx] || 'border-slate-800';

              const medalIcons = ['👑 Hạng 1 (Quán Quân)', '🥈 Hạng 2 (Á Quân)', '🥉 Hạng 3 (Hạng Ba)'][idx];

              return (
                <div
                  key={st.id}
                  className={`p-6 rounded-3xl border ${borderStyles} relative overflow-hidden flex items-center gap-4 transition-all hover:scale-[1.02]`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-amber-400/60 p-1 shrink-0 relative">
                    <img
                      src={st.avatarUrl}
                      alt={st.fullName}
                      className="w-full h-full rounded-xl object-cover"
                    />
                    <span className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] shadow-sm">
                      Lvl {st.level}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black uppercase text-amber-400 block mb-0.5">
                      {medalIcons}
                    </span>
                    <h4 className="font-black text-white text-sm truncate">{st.fullName}</h4>
                    <p className="text-xs text-slate-400 font-bold">{st.className}</p>

                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="font-extrabold text-amber-400 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{st.totalXp} XP</span>
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="font-bold text-rose-400 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        <span>{st.streakDays} ngày</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. CAM KẾT SƯ PHẠM 6 BƯỚC ĐÃ CHUẨN Y BỞI THẦY ĐỖ MẠNH TRƯỜNG */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl cyber-hud-card border border-cyan-500/20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Quy Trình 6 Bước Đã Chuẩn Y</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Kiến Trúc Đào Tạo Số Chuyên Biệt Môn Tin Học THCS Mão Điền
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Hệ thống vận hành độc lập tĩnh trên GitHub Pages, đảm bảo an toàn tuyệt đối, tương thích 100% giáo trình Kết nối tri thức và tối ưu hóa trải nghiệm tương tác trực tiếp giữa Thầy Đỗ Mạnh Trường và các em học sinh.
          </p>
        </div>
      </section>
    </div>
  );
}
