import Link from 'next/link';
import { BookOpen, Code2, ArrowRight, FileText, CheckCircle2, Laptop } from 'lucide-react';

export default function SubjectsPage() {
  const grades = [
    {
      grade: 6,
      title: 'Tin học Khối 6 (CT GDPT 2018)',
      topics: [
        'Chủ đề A: Máy tính và cộng đồng (Thông tin và thu nhận thông tin, Xử lý thông tin)',
        'Chủ đề B: Mạng máy tính và Internet (Khái niệm mạng, Lợi ích Internet)',
        'Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin (Thư điện tử, Tìm kiếm web)',
        'Chủ đề D: Đạo đức, pháp luật và văn hóa trong môi trường số',
      ],
      color: 'border-blue-200 bg-blue-50/30',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      grade: 7,
      title: 'Tin học Khối 7 (Ứng dụng Tin học)',
      topics: [
        'Chủ đề E: Ứng dụng tin học (Bảng tính điện tử Microsoft Excel)',
        'Các kiểu dữ liệu, định dạng ô tính, công thức và địa chỉ ô',
        'Các hàm tính toán cơ bản: SUM, AVERAGE, MAX, MIN, COUNT',
        'Tạo biểu đồ trực quan hóa dữ liệu thống kê',
      ],
      color: 'border-emerald-200 bg-emerald-50/30',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      grade: 8,
      title: 'Tin học Khối 8 (Thuật toán & Lập trình)',
      topics: [
        'Chủ đề F: Giải quyết vấn đề với sự trợ giúp của máy tính',
        'Khái niệm thuật toán, sơ đồ khối, mã giả',
        'Cấu trúc rẽ nhánh (if...else) và cấu trúc lặp (for, while)',
        'Tư duy máy tính và lập trình trực quan',
      ],
      color: 'border-indigo-200 bg-indigo-50/30',
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      grade: 9,
      title: 'Tin học Khối 9 (Dịch vụ mạng & Hướng nghiệp số)',
      topics: [
        'Chủ đề B: Mạng máy tính nâng cao, bảo mật và đám mây (Cloud)',
        'Chủ đề D: Đạo đức số và bảo vệ quyền tác giả trên Internet',
        'Chủ đề E: Phần mềm tạo bài trình chiếu đa phương tiện',
        'Chủ đề G: Hướng nghiệp và các ngành nghề liên quan đến Tin học',
      ],
      color: 'border-rose-200 bg-rose-50/30',
      badgeColor: 'bg-rose-100 text-rose-800',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-blue-100 text-blue-600 mb-1">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Kho Học Liệu & Bài Giảng Môn Tin Học
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Nội dung kiến thức chuẩn chương trình Giáo dục phổ thông 2018 theo từng khối lớp và chuyên đề bồi dưỡng học sinh giỏi.
        </p>
      </div>

      {/* GRADES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {grades.map((item) => (
          <div
            key={item.grade}
            className={`p-8 rounded-3xl border ${item.color} bg-white shadow-xs space-y-6 flex flex-col justify-between`}
          >
            <div className="space-y-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.badgeColor}`}>
                Khối {item.grade}
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                {item.title}
              </h2>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {item.topics.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/worksheets?grade=${item.grade}`}
                className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Xem phiếu bài tập</span>
              </Link>
              <Link
                href={`/exams?grade=${item.grade}`}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span>Vào phòng thi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* HSG SECTION: C++ & PYTHON */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            <span>Góc Bồi Dưỡng Học Sinh Giỏi</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            Lập trình nâng cao: C++ & Python
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Dành cho đội tuyển HSG Tin học THCS Mão Điền. Luyện tập các thuật toán tìm kiếm, sắp xếp, quy hoạch động và cấu trúc dữ liệu cơ bản.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/worksheets?topic=cpp"
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            Bài tập C++ cơ bản
          </Link>
          <Link
            href="/worksheets?topic=python"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
          >
            Lập trình Python
          </Link>
        </div>
      </div>
    </div>
  );
}
