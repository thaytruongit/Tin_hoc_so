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
  BookOpen
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
    <div className="space-y-12 pb-16 edu-grid-bg">
      {/* ==================================================================== */}
      {/* 1. HERO BANNER: NỀN SÁNG, HIỆN ĐẠI, KHOA HỌC, CHUẨN SƯ PHẠM */}
      {/* ==================================================================== */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Huy hiệu trường học */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold tracking-wide">
            <School className="w-4 h-4 text-blue-600" />
            <span>TRƯỜNG THCS MÃO ĐIỀN · THỊ XÃ THUẬN THÀNH · BẮC NINH</span>
          </div>

          {/* Tiêu đề chính */}
          <div className="space-y-3 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              HỆ SINH THÁI HỌC TẬP SỐ{' '}
              <span className="text-blue-600">
                MÔN TIN HỌC THCS
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
              Cổng học tập tương tác trực tiếp theo Chương trình GDPT 2018 (Khối 6, 7, 8, 9).
              Tích hợp phòng thực hành 24 máy trạm cặp đôi, luyện lập trình Python trực tuyến và kiểm tra đánh giá tự động.
            </p>
          </div>

          {/* Chỉ số tổng quan */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl sm:text-3xl font-black text-blue-600">670</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">Học Sinh 4 Khối</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl sm:text-3xl font-black text-teal-600">24 Máy</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">Phòng Thực Hành</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl sm:text-3xl font-black text-amber-600">29 Tiết</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">Tích Hợp NLS & AI</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">Chấm Tự Động</div>
            </div>
          </div>

          {/* 2 CỔNG ĐĂNG NHẬP THEO PHÂN QUYỀN THỰC TẾ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-6 text-left">
            
            {/* CỔNG 1: HỌC SINH */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-blue-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    Mật khẩu mặc định: 123
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Dành Cho Học Sinh Phòng Máy
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Đăng nhập theo Lớp và chọn Máy trạm (Máy 01 – Máy 24). Tác chiến theo cặp 2 bạn cùng máy, hoàn thành 3 hoạt động lớp và nộp bài trực tiếp về Google Drive.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Làm bài khám phá ghép thẻ logic & Củng cố 7 câu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Luyện viết mã Python 3.12 & Làm bài thi định kỳ</span>
                  </div>
                </div>
              </div>

              <Link
                href="/login"
                className="mt-6 w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Vào Phòng Thực Hành Học Sinh</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* CỔNG 2: GIÁO VIÊN */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                    Mật mã Quản trị: 666
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    Dành Cho Giáo Viên Phụ Trách
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Dành riêng cho <strong>Thầy Đỗ Mạnh Trường</strong>. Nắm quyền điều hành trực tiếp 24 trạm máy trong tiết dạy, tặng Sao khen thưởng, khóa máy và 1-click xuất sổ điểm Excel.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Giám sát tiến độ 24 máy theo sơ đồ thực tế Ziczac</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Quản lý danh sách 670 học sinh & Xuất file Excel .xls</span>
                  </div>
                </div>
              </div>

              <Link
                href="/login?role=teacher"
                className="mt-6 w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Mở Đài Quản Lý Tiết Dạy (Mã 666)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. BỐ TRÍ KHÔNG GIAN HỌC TẬP KHOA HỌC: HỌC SINH & GIÁO VIÊN */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            KHÔNG GIAN HỌC TẬP & QUẢN TRỊ SƯ PHẠM
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Phân định rõ ràng chức năng và nhiệm vụ, tạo môi trường học tập tập trung, sạch đẹp và văn minh
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* CỘT HỌC SINH */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Quyền Hạn Người Học</span>
                <h3 className="text-lg font-bold text-slate-900">Học Sinh Thực Hiện Các Hoạt Động Nào?</h3>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-800 mb-1">
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <span>1. Thực hành cặp đôi tại phòng máy (2 bạn/máy)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ngồi theo số máy được phân công, có nút đổi vai thao tác. Hoàn thành 3 hoạt động: <em>Khám phá bài học</em>, <em>Luyện tập 7 câu chuẩn Bộ</em>, và <em>Nộp file thực hành trực tiếp về thư mục Google Drive của Thầy Trường</em>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 mb-1">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  <span>2. Luyện lập trình Python trực tuyến</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chạy code Python trực tiếp trên trình duyệt bằng Pyodide WebAssembly (không cần cài phần mềm). Tự động chấm điểm theo từng Test Case chuẩn xác cho Khối 8, 9 và đội tuyển học sinh giỏi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-rose-800 mb-1">
                  <FileCheck2 className="w-4 h-4 text-rose-600" />
                  <span>3. Tham gia phòng kiểm tra định kỳ</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Làm bài thi Giữa kỳ và Cuối kỳ. Hệ thống kích hoạt radar cảnh báo chuyển tab, khóa phím tắt để đảm bảo tính công bằng và trả kết quả phổ điểm ngay sau khi nộp.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-800 mb-1">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>4. Theo dõi góc học tập & Bảng thành tích</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Xem điểm số từng tiết học, tích lũy điểm chuyên cần, nhận huy hiệu thi đua và phấn đấu vào Top học sinh tiêu biểu của lớp và toàn trường.
                </p>
              </div>
            </div>

            <Link
              href="/in-class"
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Xem Giao Diện Thực Hành Của Học Sinh</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* CỘT GIÁO VIÊN */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Trách Nhiệm & Quyền Hạn</span>
                <h3 className="text-lg font-bold text-slate-900">Giáo Viên Giữ Vai Trò Quản Trị Gì?</h3>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <Monitor className="w-4 h-4 text-amber-600" />
                  <span>1. Giám sát 24 máy trạm theo sơ đồ Ziczac thực tế</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Quan sát toàn bộ 24 máy trạm theo sơ đồ phòng máy (Hàng 1: 4-3-2-1; Hàng 2: 5-6-7-8...). Biết chính xác máy nào đang làm bài, máy nào đã nộp và máy nào cần trợ giúp.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <Star className="w-4 h-4 text-amber-600" />
                  <span>2. Khen thưởng Sao Vàng & Trình chiếu bài mẫu</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bấm tặng Sao Vàng khen thưởng kịp thời để khích lệ học sinh. Chọn sản phẩm thực hành xuất sắc để chiếu phóng to lên màn hình lớn cho cả lớp cùng học hỏi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>3. Khóa / Mở máy đồng loạt theo tiến trình tiết dạy</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  1-Click khóa màn hình máy học sinh khi Thầy cần hướng dẫn lý thuyết tập trung; mở máy khi đến giờ thực hành; tiếp nhận chuông báo SOS cần hỗ trợ kỹ thuật.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                  <span>4. Quản lý 670 học sinh & Xuất Sổ Điểm Excel .xls</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Quản lý danh sách học sinh 4 khối (6, 7, 8, 9). Tự động tổng hợp điểm Hoạt động 1, Hoạt động 2, Hoạt động 3 và 1-click xuất sổ điểm điện tử chuẩn quy định Bộ GD&ĐT.
                </p>
              </div>
            </div>

            <Link
              href="/teacher"
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Vào Bàn Quản Lý Giáo Viên (Thầy Trường)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. BẢNG VINH DANH HỌC TỐT MÔN TIN HỌC */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-center">
              Năm học 2024 - 2025
            </span>
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
                <div className="mt-2 text-xs font-bold text-amber-700 bg-amber-100/60 inline-block px-2.5 py-1 rounded-full">
                  {st.totalXp.toLocaleString()} Điểm Tích Lũy
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. QUY TRÌNH 6 BƯỚC SƯ PHẠM VÀNG (ID: #quy-trinh-6-buoc) */}
      {/* ==================================================================== */}
      <section id="quy-trinh-6-buoc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Quy Trình Nghiên Cứu Sư Phạm Chuẩn Y
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            6 BƯỚC TỔ CHỨC DẠY HỌC TIN HỌC HIỆN ĐẠI
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Quy trình chuẩn hóa giúp giáo viên và học sinh vận hành trơn tru từng tiết dạy tại phòng máy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-blue-600 block">Bước 1: Danh Sách & Căn Cước 670 HS</span>
            <p className="text-xs text-slate-600">Định danh mã học sinh, mật khẩu 123, tài khoản quản trị Thầy Trường 666.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-teal-600 block">Bước 2: Phòng Thực Hành 24 Máy Trạm</span>
            <p className="text-xs text-slate-600">Sơ đồ 24 máy ziczac (4-3-2-1 / 5-6-7-8), ghép cặp 2 học sinh cùng máy đổi vai.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-emerald-600 block">Bước 3: 3 Hoạt Động Trực Tiếp Trên Lớp</span>
            <p className="text-xs text-slate-600">Khám phá ghép thẻ logic + Luyện tập 7 câu chuẩn Bộ + Nộp bài Drive thời gian thực.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-amber-600 block">Bước 4: Đài Quản Lý Tiết Dạy Của Thầy</span>
            <p className="text-xs text-slate-600">Giám sát 24 trạm, khen thưởng Sao Vàng, khóa máy & 1-click xuất sổ điểm Excel.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-purple-600 block">Bước 5: Luyện Lập Trình Python Trực Tuyến</span>
            <p className="text-xs text-slate-600">Pyodide 3.12 WebAssembly chạy thuần trình duyệt, tự động chấm Multi-Test Cases.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <span className="text-xs font-bold text-rose-600 block">Bước 6: Phòng Thi Đánh Giá Định Kỳ</span>
            <p className="text-xs text-slate-600">8 Đề thi Giữa/Cuối kỳ chuẩn Ma trận nhận thức Bộ GD&ĐT, giám sát chống gian lận.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center pt-8 border-t border-slate-200 text-xs text-slate-500">
        <p className="font-semibold text-slate-700">TRƯỜNG TRUNG HỌC CƠ SỞ MÃO ĐIỀN · BẮC NINH</p>
        <p className="text-slate-500 mt-1">Phụ trách chuyên môn & Quản trị hệ thống: Thầy Đỗ Mạnh Trường</p>
      </footer>
    </div>
  );
}
