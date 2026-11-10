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
  BookMarked
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_WORKSHEETS, MOCK_EXAMS, MOCK_CLASSES } from '@/lib/mock-data';

export default function HomePage() {
  const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.totalXp - a.totalXp).slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chương trình GDPT 2018 · THCS Mão Điền</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Hệ Sinh Thái Học Tập Số{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Tin Học THCS
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Website giảng dạy, giao phiếu học tập tương tác, tổ chức kiểm tra tự động chấm điểm và thi đua tích lũy huy hiệu cho học sinh Khối 6, 7, 8, 9.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/login?role=student"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 hover:shadow-lg transition-all"
              >
                <span>Học sinh vào lớp học</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/teacher"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all"
              >
                <span>Không gian Giáo viên</span>
              </Link>
            </div>

            {/* Stats Badge */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-2xl font-bold text-blue-600">{MOCK_CLASSES.length} Lớp</div>
                <div className="text-xs text-slate-500 font-medium">Khối 6, 7, 8, 9</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-2xl font-bold text-indigo-600">165+</div>
                <div className="text-xs text-slate-500 font-medium">Học sinh tham gia</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-2xl font-bold text-emerald-600">100%</div>
                <div className="text-xs text-slate-500 font-medium">Tự động chấm điểm</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-2xl font-bold text-amber-500">Gamification</div>
                <div className="text-xs text-slate-500 font-medium">XP & Huy hiệu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 KHỐI LỚP TIN HỌC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Chương trình Tin học các khối lớp
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Phân phối chương trình chuẩn GDPT 2018 tích hợp phiếu học tập và bài thực hành máy tính
            </p>
          </div>
          <Link
            href="/subjects"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>Xem toàn bộ tài liệu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              grade: 6,
              title: 'Tin học Khối 6',
              desc: 'Thông tin và dữ liệu, Mạng máy tính, Internet, An toàn thông tin số.',
              color: 'from-blue-500 to-cyan-500',
              badge: 'Chủ đề A - D',
            },
            {
              grade: 7,
              title: 'Tin học Khối 7',
              desc: 'Phần mềm bảng tính điện tử Excel, công thức tính toán và xử lý số liệu.',
              color: 'from-emerald-500 to-teal-500',
              badge: 'Chủ đề E: Ứng dụng',
            },
            {
              grade: 8,
              title: 'Tin học Khối 8',
              desc: 'Thuật toán, cấu trúc rẽ nhánh, lặp và bước đầu làm quen với lập trình.',
              color: 'from-indigo-500 to-purple-500',
              badge: 'Chủ đề F: Lập trình',
            },
            {
              grade: 9,
              title: 'Tin học Khối 9',
              desc: 'Dịch vụ đám mây, mạng xã hội an toàn và ứng dụng đa phương tiện.',
              color: 'from-rose-500 to-orange-500',
              badge: 'Hướng nghiệp số',
            },
          ].map((item) => (
            <div
              key={item.grade}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white font-black text-xl mb-4 group-hover:scale-105 transition-transform`}>
                  {item.grade}
                </div>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  {item.badge}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <Link
                  href={`/worksheets?grade=${item.grade}`}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600"
                >
                  Phiếu bài tập
                </Link>
                <Link
                  href={`/exams?grade=${item.grade}`}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Vào thi →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES (PHIẾU HỌC TẬP & PHÒNG KIỂM TRA CHỐNG GIAN LẬN) */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Phục vụ trực tiếp từng tiết học trên lớp
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Giáo viên giao nhiệm vụ trong 30 giây, học sinh làm bài trên máy tính hoặc điện thoại, dữ liệu tự động đồng bộ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Phiếu học tập điện tử 4 Pha
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tương ứng 4 pha giảng dạy (Khởi động - Khám phá - Luyện tập - Vận dụng). Tự động chấm và giải thích ngay khi nộp bài.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Trắc nghiệm đa phương án & Đúng/Sai</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cộng điểm kinh nghiệm XP tức thì</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Kiểm tra có bấm giờ & Chống gian lận
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Đồng hồ đếm ngược, theo dõi số lần học sinh chuyển tab hoặc mở ứng dụng khác khi làm bài để đảm bảo tính khách quan.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Đếm lượt thoát màn hình thi</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Khóa đề/mở đề linh hoạt theo tiết</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Gamification & Bảng vàng vinh danh
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tạo động lực học tập với cơ chế lên cấp (Level), chuỗi ngày học liên tục (Streak) và hệ thống huy hiệu cá nhân sinh động.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Xếp hạng theo từng lớp học</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Vinh danh học sinh tiến bộ nhất</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TOP LEADERBOARD PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Flame className="w-4 h-4" />
                  <span>Bảng vàng tích lũy điểm kinh nghiệm (XP)</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Top học sinh dẫn đầu tuần này
                </h3>
              </div>
              <Link
                href="/achievements"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all"
              >
                Xem toàn bộ bảng vàng →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {topStudents.map((st, idx) => (
                <div
                  key={st.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xs flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                    idx === 0 ? 'bg-amber-400 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : 'bg-amber-700 text-white'
                  }`}>
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{st.fullName}</h4>
                    <p className="text-xs text-slate-400">{st.className} · Mã: {st.studentCode}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-amber-400">{st.totalXp} XP</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">Cấp {st.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
