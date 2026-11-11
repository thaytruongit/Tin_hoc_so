'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Laptop, 
  Code2, 
  FileCheck2, 
  Award, 
  Monitor, 
  Users, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  UserCheck,
  Star,
  FileSpreadsheet,
  Lock,
  ChevronRight,
  ShieldCheck,
  School,
  Database,
  Cloud,
  Eye,
  Radio,
  Zap,
  Crown
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
    <div className="space-y-10 pb-16 edu-grid-bg min-h-screen">
      
      {/* ==================================================================== */}
      {/* 1. KHỐI TRUNG TÂM TỔNG CHỈ HUY: HỆ SINH THÁI TIN HỌC SỐ · THCS MÃO ĐIỀN */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center">
        
        {/* HỘP TIÊU ĐỀ ĐỈNH CHÓP THEO SƠ ĐỒ THẦY TRƯỜNG */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-md relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <School className="w-4 h-4 text-blue-600" />
            <span>Trường THCS Mão Điền · Thị Xã Thuận Thành · Bắc Ninh</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            HỆ SINH THÁI TIN HỌC SỐ · THCS MÃO ĐIỀN
          </h1>
          <p className="text-sm sm:text-base font-extrabold text-blue-700 mt-1.5 flex items-center justify-center gap-2">
            <School className="w-4 h-4 text-blue-600" />
            <span>(Giáo Viên Phụ Trách: Thầy Đỗ Mạnh Trường)</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto mt-2 leading-relaxed">
            Hệ thống dạy học số hóa môn Tin học theo chuẩn GDPT 2018. Phân định rõ 2 không gian sư phạm thực tế: <strong>Không Gian Học Tập Của Học Sinh</strong> và <strong>Bàn Quản Lý Của Giáo Viên</strong>.
          </p>
        </div>

        {/* ĐƯỜNG LIÊN KẾT PHÂN NHÁNH KIẾN TRÚC */}
        <div className="flex flex-col items-center my-4">
          <div className="w-0.5 h-6 bg-slate-400"></div>
          <div className="w-full max-w-2xl h-0.5 bg-slate-300 relative">
            <div className="absolute left-0 -bottom-2 w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-slate-400"></div>
            <div className="absolute right-0 -bottom-2 w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-slate-400"></div>
          </div>
        </div>

      </section>

      {/* ==================================================================== */}
      {/* 2. MA TRẬN 2 KHÔNG GIAN ĐỘC LẬP TỐI ƯU HOÀN TOÀN THEO SƠ ĐỒ THẦY TRƯỜNG */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* ================================================================ */}
          {/* NHÁNH 1: KHÔNG GIAN CỦA HỌC SINH (Học tập cặp đôi · Mật khẩu 123) */}
          {/* ================================================================ */}
          <div className="bg-white rounded-3xl border-2 border-blue-400 shadow-md p-6 sm:p-7 space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl pointer-events-none"></div>

            {/* HEADER NHÁNH HỌC SINH */}
            <div className="border-b border-blue-100 pb-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-sm">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      KHÔNG GIAN CỦA HỌC SINH
                    </h2>
                    <p className="text-xs font-bold text-blue-700">
                      (Học Tập Cặp Đôi · Mật Khẩu 123)
                    </p>
                  </div>
                </div>

                <Link
                  href="/login?role=student"
                  className="px-3.5 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold transition-all border border-blue-200 shrink-0"
                >
                  Đăng Nhập (123)
                </Link>
              </div>
            </div>

            {/* 4 MODULE CHỨC NĂNG HỌC SINH */}
            <div className="space-y-4">
              
              {/* 1. LỚP HỌC TIN HỌC */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 hover:border-blue-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Lớp Học Tin Học (<code className="text-blue-700 text-xs">/in-class</code>)
                    </h3>
                  </div>
                  <Link
                    href="/in-class"
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Vào lớp học</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 pl-8 list-disc font-medium">
                  <li><strong>Học tập cặp đôi:</strong> Phân vai Kỹ thuật viên & Thư ký luân phiên tại máy trạm.</li>
                  <li><strong>3 Hoạt động bài học:</strong> Khám phá kiến thức + Luyện tập 7 câu chuẩn Bộ + Nộp bài thực hành Drive.</li>
                </ul>
              </div>

              {/* 2. LUYỆN TẬP LẬP TRÌNH PYTHON */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 hover:border-emerald-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center">2</span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Luyện Tập Lập Trình Python (<code className="text-emerald-700 text-xs">/programming</code>)
                    </h3>
                  </div>
                  <Link
                    href="/programming"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>Viết mã</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 pl-8 list-disc font-medium">
                  <li><strong>Pyodide 3.12 WebAssembly:</strong> Thực thi Python trực tiếp trên trình duyệt, không cần cài đặt.</li>
                  <li><strong>Chấm Test Cases tự động:</strong> Kiểm tra tự động từng trường hợp kiểm thử, phản hồi tức thì.</li>
                </ul>
              </div>

              {/* 3. KIỂM TRA ĐỊNH KỲ */}
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 hover:border-rose-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-600 text-white text-xs font-black flex items-center justify-center">3</span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Kiểm Tra Định Kỳ (<code className="text-rose-700 text-xs">/exams</code>)
                    </h3>
                  </div>
                  <Link
                    href="/exams"
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                  >
                    <span>Làm bài thi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 pl-8 list-disc font-medium">
                  <li><strong>Đề kiểm tra định kỳ chuẩn Bộ:</strong> 8 Bộ đề Giữa kỳ & Cuối kỳ chuẩn Ma trận nhận thức Bộ GD&ĐT.</li>
                  <li><strong>Giám sát trung thực khi làm bài:</strong> Khóa phím tắt, cảnh báo chuyển tab để đảm bảo tính công bằng.</li>
                </ul>
              </div>

              {/* 4. HỒ SƠ & BẢNG VÀNG */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 hover:border-amber-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white text-xs font-black flex items-center justify-center">4</span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Hồ Sơ &amp; Điểm Thi Đua (<code className="text-amber-800 text-xs">/student</code>)
                    </h3>
                  </div>
                  <Link
                    href="/student"
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
                  >
                    <span>Xem hồ sơ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 pl-8 list-disc font-medium">
                  <li><strong>Theo dõi tiến độ học tập:</strong> Lưu lịch sử điểm số 29 tiết học SGK Kết nối tri thức.</li>
                  <li><strong>Điểm thi đua học tốt:</strong> Bảng vinh danh học sinh tích cực và chăm chỉ nhất trường.</li>
                </ul>
              </div>

            </div>

            {/* NÚT TRUY CẬP NHANH HỌC SINH */}
            <Link
              href="/in-class"
              className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Laptop className="w-4 h-4" />
              <span>VÀO LỚP HỌC TIN HỌC THỰC HÀNH</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ================================================================ */}
          {/* NHÁNH 2: BÀN QUẢN LÝ CỦA GIÁO VIÊN (Thầy Đỗ Mạnh Trường · Mã 666)  */}
          {/* ================================================================ */}
          <div className="bg-white rounded-3xl border-2 border-amber-400 shadow-md p-6 sm:p-7 space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl pointer-events-none"></div>

            {/* HEADER NHÁNH GIÁO VIÊN */}
            <div className="border-b border-amber-100 pb-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black shadow-sm">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      BÀN QUẢN LÝ CỦA GIÁO VIÊN
                    </h2>
                    <p className="text-xs font-bold text-amber-800">
                      (Thầy Đỗ Mạnh Trường · Mã 666)
                    </p>
                  </div>
                </div>

                <Link
                  href="/login?role=teacher"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all border border-amber-300 shrink-0"
                >
                  Mở Khóa (666)
                </Link>
              </div>
            </div>

            {/* 4 MODULE CHỨC TRÁCH GIÁO VIÊN */}
            <div className="space-y-4">
              
              {/* 1. QUẢN LÝ 24 MÁY TRẠM */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 hover:border-amber-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white text-xs font-black flex items-center justify-center">1</span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Quản Lý 24 Máy Trạm (<code className="text-amber-800 text-xs">/teacher</code>)
                    </h3>
                  </div>
                  <Link
                    href="/teacher"
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <span>Quản lý phòng</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 pl-8 list-disc font-medium">
                  <li><strong>Sơ đồ 24 máy trạm:</strong> Bố trí phòng máy chuẩn THCS Mão Điền (dãy ziczac 4-3-2-1 / 5-6-7-8...).</li>
                  <li><strong>Khen thưởng Sao Vàng, Khóa/Mở máy:</strong> Điều khiển đồng loạt hoặc can thiệp từng máy trạm tức thì.</li>
                  <li><strong>Trình chiếu bài mẫu xuất sắc:</strong> Chiếu sản phẩm của học sinh tiêu biểu lên màn hình lớp học.</li>
                </ul>
              </div>

              {/* 2. QUẢN TRỊ 670 HS */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 hover:border-blue-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">2</span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Quản Trị 670 HS (<code className="text-blue-700 text-xs">/admin</code>)
                    </h3>
                  </div>
                  <Link
                    href="/admin"
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Quản trị</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 pl-8 list-disc font-medium">
                  <li><strong>Danh bạ 4 khối 6, 7, 8, 9:</strong> Quản lý danh sách 669 học sinh của 15 lớp chính khóa THCS Mão Điền.</li>
                  <li><strong>1-Click Xuất Sổ Điểm Excel .xls:</strong> Xuất toàn bộ điểm số thực hành, trắc nghiệm chuẩn biểu mẫu.</li>
                </ul>
              </div>

              {/* 3. ĐIỀU PHỐI TIẾT DẠY & NGÂN HÀNG ĐỀ */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 hover:border-indigo-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center">3</span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Điều Phối Tiết Dạy &amp; Ngân Hàng Đề
                    </h3>
                  </div>
                  <Link
                    href="/teacher"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Ngân hàng đề</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 pl-8 list-disc font-medium">
                  <li><strong>Kích hoạt đợt thi:</strong> Mở hoặc đóng phòng kiểm tra trực tuyến có chống gian lận.</li>
                  <li><strong>Xem phổ điểm &amp; Phân tích nhận thức:</strong> Thống kê phổ điểm theo 3 mức độ (Biết - Hiểu - Vận dụng).</li>
                </ul>
              </div>

              {/* 4. CẤU HÌNH GOOGLE DRIVE THỰC HÀNH */}
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 hover:border-teal-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-teal-600 text-white text-xs font-black flex items-center justify-center">4</span>
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Cấu Hình Google Drive Thực Hành
                    </h3>
                  </div>
                  <Link
                    href="/teacher"
                    className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>Kết nối</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <ul className="text-xs text-slate-600 space-y-1 pl-8 list-disc font-medium">
                  <li><strong>Đồng bộ kho nộp bài phòng máy:</strong> Tự động đẩy file thực hành lên Google Drive của Thầy Trường.</li>
                  <li><strong>Google Apps Script Web App:</strong> Kiểm tra kết nối và bảo mật luồng tải dữ liệu trực tiếp.</li>
                </ul>
              </div>

            </div>

            {/* NÚT TRUY CẬP NHANH GIÁO VIÊN */}
            <Link
              href="/teacher"
              className="w-full py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>MỞ BÀN QUẢN LÝ TIẾT DẠY (THẦY TRƯỜNG - MÃ 666)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. BẢNG VÀNG VINH DANH HỌC TỐT MÔN TIN HỌC (TÍCH HỢP TỰ NHIÊN)        */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">BẢNG VÀNG THI ĐUA HỌC TỐT TIN HỌC SỐ</h3>
                <p className="text-xs text-slate-500">Tuyên dương học sinh có thành tích xuất sắc và tích cực nhất trường THCS Mão Điền</p>
              </div>
            </div>
            <Link
              href="/student"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Xem chi tiết xếp hạng toàn trường</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topStudents.map((st, idx) => (
              <div
                key={st.id}
                className={`p-5 rounded-2xl border text-center transition-all ${
                  idx === 0
                    ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-lg bg-white border shadow-xs">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                </div>
                <div className="font-bold text-slate-900 text-base">{st.fullName}</div>
                <div className="text-xs text-blue-700 font-semibold mt-0.5">Lớp {st.className} · Khối {st.className.charAt(0)}</div>
                <div className="mt-2 text-xs font-bold text-amber-800 bg-amber-100/70 inline-block px-2.5 py-1 rounded-full">
                  {st.totalXp.toLocaleString()} Điểm Tích Lũy
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER ĐỒNG BỘ */}
      <footer className="text-center pt-8 border-t border-slate-200 text-xs text-slate-500 max-w-7xl mx-auto px-4">
        <p className="font-bold text-slate-800">TRƯỜNG TRUNG HỌC CƠ SỞ MÃO ĐIỀN · BẮC NINH</p>
        <p className="text-slate-500 mt-1">Phụ trách chuyên môn &amp; Quản trị hệ thống: Thầy Đỗ Mạnh Trường (Mã 666)</p>
      </footer>
    </div>
  );
}
