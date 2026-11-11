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
  Check
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
              Website giảng dạy, giao phiếu học tập tương tác, củng cố 7 câu hỏi phân hóa, tổ chức kiểm tra tự động chấm điểm và thi đua tích lũy huy hiệu cho học sinh Khối 6, 7, 8, 9.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/in-class"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-white bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/25 hover:shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Củng cố bài học (7 câu)</span>
              </Link>
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

            {/* CỦNG CỐ BÀI HỌC BANNER NỔI BẬT */}
            <div className="pt-4 text-left">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 transform hover:scale-[1.01] transition-transform">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    Hoạt động 1 trực tiếp trên lớp
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    Củng Cố Bài Học — 7 Câu Trắc Nghiệm Tự Động Chấm Điểm
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90">
                    Phân hóa chuẩn Bộ GD&ĐT: <strong>3 câu Nhận biết · 2 câu Thông hiểu · 2 câu Vận dụng</strong>. Làm bài trên máy tính, nhận điểm tức thì và xem lời giải thích chi tiết của Thầy Đỗ Mạnh Trường!
                  </p>
                </div>
                <Link
                  href="/in-class"
                  className="px-6 py-3.5 rounded-2xl bg-white text-amber-700 hover:bg-amber-50 font-black text-sm shadow-lg shrink-0 flex items-center gap-2 group"
                >
                  <span>Bắt đầu làm bài ngay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Stats Badge */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-2xl font-bold text-blue-600">{MOCK_CLASSES.length} Lớp</div>
                <div className="text-xs text-slate-500 font-medium">Khối 6, 7, 8, 9</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-2xl font-bold text-indigo-600">669 HS</div>
                <div className="text-xs text-slate-500 font-medium">THCS Mão Điền</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-2xl font-bold text-emerald-600">7 Câu</div>
                <div className="text-xs text-slate-500 font-medium">Biết - Hiểu - Vận dụng</div>
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
              Phân phối chương trình chuẩn GDPT 2018 tích hợp phiếu học tập, bài thực hành và củng cố 7 câu hỏi
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
              desc: 'Sơ đồ tư duy, Thông tin và dữ liệu, Mạng máy tính, Internet, An toàn số.',
              color: 'from-blue-500 to-cyan-500',
              badge: 'Chủ đề A - E',
            },
            {
              grade: 7,
              title: 'Tin học Khối 7',
              desc: 'Phần mềm bảng tính Excel, các hàm điều kiện IF, SUMIF, COUNTIF.',
              color: 'from-emerald-500 to-teal-500',
              badge: 'Chủ đề E: Ứng dụng',
            },
            {
              grade: 8,
              title: 'Tin học Khối 8',
              desc: 'Địa chỉ tương đối/tuyệt đối trong Excel, thuật toán và cấu trúc điều khiển.',
              color: 'from-indigo-500 to-purple-500',
              badge: 'Chủ đề E - F',
            },
            {
              grade: 9,
              title: 'Tin học Khối 9',
              desc: 'Trí tuệ nhân tạo (AI), dịch vụ đám mây, an toàn thông tin và đa phương tiện.',
              color: 'from-rose-500 to-orange-500',
              badge: 'Chủ đề D & Hướng nghiệp',
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

              <div className="pt-4 border-t border-slate-100 mt-6 space-y-2">
                <Link
                  href="/in-class"
                  className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Củng cố 7 câu (Khối {item.grade})
                  </span>
                  <span>→</span>
                </Link>
                <div className="flex items-center justify-between text-xs font-semibold pt-1">
                  <Link
                    href={`/worksheets?grade=${item.grade}`}
                    className="text-slate-600 hover:text-blue-600"
                  >
                    Phiếu học tập
                  </Link>
                  <Link
                    href={`/exams?grade=${item.grade}`}
                    className="text-blue-600 hover:underline"
                  >
                    Đề kiểm tra →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES */}
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
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-900">1. Củng cố bài học (7 câu)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Đúng chuẩn 3 mức độ nhận thức theo quy định Bộ GD&ĐT: 3 câu Nhận biết, 2 câu Thông hiểu, 2 câu Vận dụng. Chấm điểm tức thì và hiển thị lời giải chi tiết.
              </p>
              <Link
                href="/in-class"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 pt-2"
              >
                <span>Vào làm bài củng cố ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-900">2. Phiếu học tập Khám phá cặp đôi</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thiết kế bám sát bài giảng trên lớp cho cặp đôi 2 học sinh cùng máy (Kỹ thuật viên &amp; Thư ký), máy tự động chấm điểm và tích lũy XP.
              </p>
              <Link
                href="/worksheets"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 pt-2"
              >
                <span>Xem danh sách phiếu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-900">3. Phòng thi kiểm tra định kỳ</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hệ thống đề kiểm tra thường xuyên và giữa kỳ chuẩn ma trận. Tự động xáo trộn câu hỏi, chống gian lận và khóa đề linh hoạt theo giờ học.
              </p>
              <Link
                href="/exams"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-2"
              >
                <span>Vào phòng kiểm tra</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BẢNG VÀNG THI ĐUA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4" />
              <span>Thi đua học tập</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Bảng vàng thành tích THCS Mão Điền
            </h2>
          </div>
          <Link
            href="/achievements"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>Xem bảng xếp hạng đầy đủ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topStudents.map((st, idx) => (
            <div
              key={st.id}
              className={`p-6 rounded-3xl border bg-white shadow-xs relative overflow-hidden flex items-center gap-4 ${
                idx === 0 ? 'border-amber-300 ring-2 ring-amber-400/20' : 'border-slate-200'
              }`}
            >
              <div className="text-2xl font-black text-slate-300 w-8 text-center shrink-0">
                #{idx + 1}
              </div>
              <img
                src={st.avatarUrl}
                alt={st.fullName}
                className="w-14 h-14 rounded-2xl bg-slate-100 p-1 border border-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 text-sm truncate">{st.fullName}</h4>
                <p className="text-xs text-slate-500 font-medium">{st.className}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs">
                  <span className="font-bold text-amber-600">{st.totalXp} XP</span>
                  <span className="text-slate-400">·</span>
                  <span className="font-medium text-slate-600">Cấp {st.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
