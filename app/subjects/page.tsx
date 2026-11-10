'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Download, 
  UploadCloud, 
  Play, 
  CheckCircle2, 
  FileSpreadsheet, 
  Video, 
  Sparkles, 
  Clock, 
  Filter, 
  ShieldCheck, 
  ArrowRight,
  FileCheck,
  AlertCircle,
  HelpCircle,
  Laptop,
  Check,
  Layers
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_PRACTICE_FILES, MOCK_VIDEOS, MOCK_SUBMISSIONS } from '@/lib/mock-data';
import { PracticeFile, VideoLecture, PracticalSubmission } from '@/lib/types';

export default function SubjectsPage() {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [activeSection, setActiveSection] = useState<'curriculum' | 'files' | 'submit' | 'videos'>('files');

  // State cho Form Nộp bài thực hành
  const [submitClassId, setSubmitClassId] = useState(MOCK_CLASSES[1].id); // Mặc định 7A1
  const [studentCode, setStudentCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('Tiết 6: Địa chỉ tương đối và tuyệt đối trong Excel');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<PracticalSubmission | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<PracticalSubmission[]>(MOCK_SUBMISSIONS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State cho Video đang phát
  const [currentVideo, setCurrentVideo] = useState<VideoLecture>(MOCK_VIDEOS[0]);

  // Lọc dữ liệu theo khối lớp
  const filteredFiles = selectedGrade === 'all' 
    ? MOCK_PRACTICE_FILES 
    : MOCK_PRACTICE_FILES.filter(f => f.grade === selectedGrade);

  const filteredVideos = selectedGrade === 'all'
    ? MOCK_VIDEOS
    : MOCK_VIDEOS.filter(v => v.grade === selectedGrade);

  // Xử lý nộp bài
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentCode.trim() || !selectedFile) {
      alert('Vui lòng điền đầy đủ Mã học sinh, Họ và tên, và chọn tệp bài làm!');
      return;
    }

    setIsSubmitting(true);
    const chosenClass = MOCK_CLASSES.find(c => c.id === submitClassId) || MOCK_CLASSES[0];
    const newSubmissionCode = `SUB-${new Date().getFullYear()}-${chosenClass.name.replace(/\s+/g, '')}-${Math.floor(100 + Math.random() * 900)}`;

    setTimeout(() => {
      const newSubmission: PracticalSubmission = {
        id: `sub-${Date.now()}`,
        submissionCode: newSubmissionCode,
        studentCode: studentCode.toUpperCase().trim(),
        studentName: studentName.trim(),
        classId: chosenClass.id,
        className: chosenClass.name,
        assignmentTitle: assignmentTitle,
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / 1024).toFixed(1)} KB`,
        submittedAt: 'Vừa xong',
        status: 'submitted',
      };

      // Lưu vào state và LocalStorage
      const updatedList = [newSubmission, ...recentSubmissions];
      setRecentSubmissions(updatedList);
      if (typeof window !== 'undefined') {
        localStorage.setItem('truong_practical_submissions', JSON.stringify(updatedList));
      }

      setSubmissionSuccess(newSubmission);
      setIsSubmitting(false);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 800);
  };

  const curriculumGrades = [
    {
      grade: 6,
      title: 'Tin học Khối 6 (CT GDPT 2018)',
      topics: [
        'Chủ đề A: Máy tính và cộng đồng (Thông tin và xử lý thông tin)',
        'Chủ đề B: Mạng máy tính và Internet',
        'Chủ đề C: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
        'Chủ đề D: Đạo đức, pháp luật và văn hóa số',
      ],
      color: 'border-blue-200 bg-blue-50/30',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      grade: 7,
      title: 'Tin học Khối 7 (Bảng tính điện tử Excel)',
      topics: [
        'Chủ đề E: Làm quen bảng tính, nhập dữ liệu và địa chỉ ô tính',
        'Các hàm cơ bản: SUM, AVERAGE, MAX, MIN, COUNT',
        'Hàm điều kiện: IF, SUMIF, COUNTIF đánh giá học lực',
        'Tạo biểu đồ trực quan hóa dữ liệu',
      ],
      color: 'border-emerald-200 bg-emerald-50/30',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      grade: 8,
      title: 'Tin học Khối 8 (Thuật toán & Địa chỉ tuyệt đối)',
      topics: [
        'Chủ đề E: Địa chỉ tương đối và tuyệt đối ($A$1) trong tính toán',
        'Chủ đề F: Tư duy máy tính và sơ đồ khối thuật toán',
        'Cấu trúc rẽ nhánh (if...else) và cấu trúc lặp (for/while)',
        'Lập trình trực quan và giải quyết bài toán thực tế',
      ],
      color: 'border-indigo-200 bg-indigo-50/30',
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      grade: 9,
      title: 'Tin học Khối 9 (An toàn mạng & Dịch vụ đám mây)',
      topics: [
        'Chủ đề B: Mạng máy tính diện rộng và lưu trữ đám mây',
        'Chủ đề D: Đạo đức và bản quyền phần mềm trong không gian số',
        'Chủ đề E: Phần mềm tạo bài trình chiếu đa phương tiện',
        'Chủ đề G: Hướng nghiệp số và các ngành công nghệ thông tin',
      ],
      color: 'border-rose-200 bg-rose-50/30',
      badgeColor: 'bg-rose-100 text-rose-800',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Học liệu số · THAYTRUONGIT-THCS MÃO ĐIỀN
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Kho Học Liệu & Cổng Thực Hành Tin Học
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Tải tệp Excel mẫu thực hành ngay tại phòng máy, nộp bài trực tuyến không cần USB, và xem video bài giảng hoạt hình sinh động trước giờ học.
          </p>
        </div>

        {/* 5 MENU PHỤ ĐIỀU HƯỚNG NHANH */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 mt-6 border-t border-white/10 relative z-10">
          <Link
            href="/in-class"
            className="p-3 rounded-2xl flex items-center gap-3 transition-all bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 border border-amber-300/40"
          >
            <Sparkles className="w-5 h-5 text-amber-100" />
            <div className="text-left">
              <span className="block text-[10px] uppercase tracking-wider text-amber-100 font-extrabold">Hoạt động 1</span>
              <span className="text-sm font-black">Củng Cố (7 Câu)</span>
            </div>
          </Link>
          <button
            onClick={() => setActiveSection('files')}
            className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
              activeSection === 'files'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-slate-300">Tải tệp</span>
              <span className="text-sm font-bold">Excel Thực Hành</span>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('submit')}
            className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
              activeSection === 'submit'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <UploadCloud className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-slate-300">Không cần USB</span>
              <span className="text-sm font-bold">Nộp Bài Online</span>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('videos')}
            className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
              activeSection === 'videos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Video className="w-5 h-5 text-rose-400" />
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-slate-300">Hoạt hình & AI</span>
              <span className="text-sm font-bold">Video Bài Giảng</span>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('curriculum')}
            className={`p-3 rounded-2xl flex items-center gap-3 transition-all ${
              activeSection === 'curriculum'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <BookOpen className="w-5 h-5 text-sky-400" />
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-slate-300">GDPT 2018</span>
              <span className="text-sm font-bold">Khung Môn Học</span>
            </div>
          </button>
        </div>
      </div>

      {/* THANH LỌC THEO KHỐI LỚP */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Lọc theo Khối lớp:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 6, 7, 8, 9] as const).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGrade === g
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {g === 'all' ? 'Tất cả các khối (6-9)' : `Khối ${g}`}
            </button>
          ))}
        </div>
      </div>

      {/* PHẦN 1: KHO TỆP EXCEL MẪU THỰC HÀNH */}
      {activeSection === 'files' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                <span>Số Hóa Tệp Thực Hành Excel (Tải về làm tại phòng máy)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Các tệp bài tập thực hành chính thức: Địa chỉ tương đối/tuyệt đối, hàm IF, SUMIF, COUNTIF. Học sinh bấm tải về làm trực tiếp.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {filteredFiles.length} tệp bài tập sẵn sàng
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="p-6 rounded-3xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {file.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {file.fileSize}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {file.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {file.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {file.topics.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <a
                    href={file.fileUrl}
                    download={file.fileName}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-emerald-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải tệp về máy (.xlsx)</span>
                  </a>

                  <button
                    onClick={() => {
                      setAssignmentTitle(file.title);
                      setActiveSection('submit');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Nộp bài</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Hướng dẫn làm bài tại phòng máy trường THCS Mão Điền:</p>
              <p className="mt-0.5 text-amber-800">
                1. Bấm nút <strong>Tải tệp về máy</strong> để tải file vào thư mục Downloads hoặc ổ đĩa <code>D:\HocSinh\[Lớp]</code>.
                <br />
                2. Mở file bằng Excel, hoàn thành công thức và lưu lại với tên: <code>[Lớp]_[MãHS]_[HọTên]</code>.
                <br />
                3. Chuyển sang mục <strong>Nộp Bài Online</strong> để gửi tệp trực tiếp lên hệ thống cho Thầy chấm.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PHẦN 2: CỔNG NỘP BÀI THỰC HÀNH TRỰC TUYẾN */}
      {activeSection === 'submit' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CỘT TRÁI: FORM NỘP BÀI */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
                  <UploadCloud className="w-3.5 h-3.5" />
                  Không cần USB · Tránh virus phòng máy
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Nộp Bài Thực Hành Trực Tuyến
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Hệ thống tự động phân loại tệp theo Lớp, Mã học sinh và Ngày nộp.
                </p>
              </div>

              {submissionSuccess && (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>NỘP BÀI THỰC HÀNH THÀNH CÔNG!</span>
                  </div>
                  <div className="text-xs space-y-1 bg-white p-3 rounded-xl border border-emerald-200 font-mono">
                    <p><strong>Mã biên lai:</strong> {submissionSuccess.submissionCode}</p>
                    <p><strong>Học sinh:</strong> {submissionSuccess.studentName} ({submissionSuccess.studentCode})</p>
                    <p><strong>Lớp:</strong> {submissionSuccess.className}</p>
                    <p><strong>Tệp bài làm:</strong> {submissionSuccess.fileName} ({submissionSuccess.fileSize})</p>
                    <p><strong>Thời gian:</strong> {submissionSuccess.submittedAt}</p>
                  </div>
                  <p className="text-xs text-emerald-800 font-medium">
                    Thầy Trương đã nhận được bài làm của em. Điểm số và nhận xét sẽ được cập nhật trong Kênh Giáo viên.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmitAssignment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* CHỌN LỚP */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Lớp học *</label>
                    <select
                      value={submitClassId}
                      onChange={(e) => setSubmitClassId(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {MOCK_CLASSES.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name} (Khối {cls.grade})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* CHỌN BÀI THỰC HÀNH */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Bài thực hành / Tiết học *</label>
                    <input
                      type="text"
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      placeholder="Ví dụ: Tiết 6 Địa chỉ tương đối và tuyệt đối"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* MÃ HỌC SINH */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Mã học sinh *</label>
                    <input
                      type="text"
                      value={studentCode}
                      onChange={(e) => setStudentCode(e.target.value)}
                      placeholder="Ví dụ: HS801, HS705..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono"
                      required
                    />
                  </div>

                  {/* HỌ VÀ TÊN */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Họ và tên học sinh *</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* KHU VỰC CHỌN TỆP */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-slate-700">Chọn tệp bài làm (.xlsx, .docx, .py, .cpp, .sb3) *</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/40 cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-2"
                  >
                    <UploadCloud className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {selectedFile ? selectedFile.name : 'Bấm vào đây để chọn tệp từ máy tính'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {selectedFile 
                          ? `Dung lượng: ${(selectedFile.size / 1024).toFixed(1)} KB` 
                          : 'Hỗ trợ tệp Excel, Word, Python, C++, Scratch (Tối đa 20MB)'}
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.docx,.pptx,.py,.cpp,.sb3,.zip,.rar"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Đang nộp bài lên máy chủ...</span>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Xác nhận Nộp Bài Thực Hành</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* CỘT PHẢI: LỊCH SỬ NỘP BÀI GẦN ĐÂY */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Nhật ký nộp bài gần đây</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Các bài nộp được máy chủ ghi nhận tức thì theo thời gian thực.
              </p>

              <div className="space-y-3">
                {recentSubmissions.slice(0, 5).map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 rounded-2xl border border-slate-100 bg-slate-50 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{sub.studentName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {sub.className}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate">
                      {sub.assignmentTitle}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                      <span className="font-mono text-emerald-700 truncate max-w-[130px]">{sub.fileName}</span>
                      <span>{sub.submittedAt}</span>
                    </div>
                    {sub.grade !== undefined && (
                      <div className="mt-1 flex items-center justify-between text-[11px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                        <span>Điểm: {sub.grade}/10</span>
                        <span>Đã chấm</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHẦN 3: VIDEO BÀI GIẢNG & HOẠT HÌNH HỌC LIỆU */}
      {activeSection === 'videos' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Video className="w-6 h-6 text-rose-600" />
                <span>Video Học Liệu & Hoạt Hình Sinh Động</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Video giới thiệu bài học, kỹ năng an toàn mạng và trí tuệ nhân tạo (AI) giúp học sinh xem trước hoặc ôn lại sau giờ học.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-800">
              {filteredVideos.length} bài giảng video
            </span>
          </div>

          {/* TRÌNH PHÁT VIDEO CHÍNH */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-3xl overflow-hidden bg-black shadow-xl border border-slate-800">
                <video
                  key={currentVideo.videoUrl}
                  controls
                  className="w-full aspect-video bg-black"
                >
                  <source src={currentVideo.videoUrl} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ phát video HTML5.
                </video>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800">
                    Khối {currentVideo.grade} · {currentVideo.duration}
                  </span>
                  <span className="text-xs text-slate-500">
                    Tác giả: <strong>{currentVideo.author}</strong>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {currentVideo.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentVideo.description}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Kiến thức trọng tâm cần ghi nhớ:</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {currentVideo.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* DANH SÁCH VIDEO LIÊN QUAN */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Danh sách bài giảng video:
              </h3>
              <div className="space-y-3">
                {filteredVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setCurrentVideo(vid)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                      currentVideo.id === vid.id
                        ? 'border-blue-500 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Play className="w-4 h-4 fill-white" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="font-bold text-blue-700">Khối {vid.grade}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{vid.duration}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {vid.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {vid.topic}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHẦN 4: KHUNG CHƯƠNG TRÌNH GDPT 2018 (KHỐI 6, 7, 8, 9) */}
      {activeSection === 'curriculum' && (
        <div className="space-y-6">
          <div className="text-left space-y-1">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span>Chương Trình Giáo Dục Phổ Thông 2018 Môn Tin Học</span>
            </h2>
            <p className="text-xs text-slate-500">
              Cấu trúc bài học theo phân phối chương trình chính thức trường THCS Mão Điền.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {curriculumGrades.map((item) => (
              <div
                key={item.grade}
                className={`p-8 rounded-3xl border ${item.color} bg-white shadow-xs space-y-6 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.badgeColor}`}>
                    Khối {item.grade}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
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
                    <span>Làm phiếu học tập</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/exams?grade=${item.grade}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Phòng kiểm tra</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
