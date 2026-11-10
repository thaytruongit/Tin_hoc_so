'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  FileText, 
  ClipboardCheck, 
  KeyRound, 
  PlusCircle, 
  Download, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Search,
  Eye,
  Activity,
  Send,
  HelpCircle,
  UploadCloud,
  FileSpreadsheet,
  Check,
  MessageSquare
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS, MOCK_RECENT_RESULTS, MOCK_WORKSHEETS, MOCK_EXAMS, MOCK_SUBMISSIONS } from '@/lib/mock-data';
import { PracticalSubmission } from '@/lib/types';

export default function TeacherDashboard() {
  const [selectedClassId, setSelectedClassId] = useState(MOCK_CLASSES[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState(MOCK_EXAMS);
  const [notification, setNotification] = useState('');
  const [activeTab, setActiveTab] = useState<'roster' | 'live_monitor' | 'exams' | 'submissions'>('live_monitor');
  const [submissions, setSubmissions] = useState<PracticalSubmission[]>(MOCK_SUBMISSIONS);
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState<string>('9.5');
  const [gradeComment, setGradeComment] = useState<string>('Bài làm tốt, sử dụng công thức chính xác!');

  // Tải danh sách bài nộp từ localStorage nếu có
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('truong_practical_submissions');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSubmissions(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const currentClass = MOCK_CLASSES.find(c => c.id === selectedClassId) || MOCK_CLASSES[0];
  const classStudents = MOCK_STUDENTS.filter(s => s.classId === selectedClassId);

  const toggleLockExam = (examId: string) => {
    setExams(prev => prev.map(e => {
      if (e.id === examId) {
        const nextState = !e.isLocked;
        setNotification(`Đã ${nextState ? 'KHÓA' : 'MỞ'} phòng thi: ${e.title}`);
        setTimeout(() => setNotification(''), 3000);
        return { ...e, isLocked: nextState };
      }
      return e;
    }));
  };

  const handleAssignWorksheet = () => {
    setNotification(`Đã giao nhiệm vụ "Phiếu học tập Tiết 1 - Thông tin và dữ liệu" cho ${currentClass.name}! Học sinh có thể làm bài ngay.`);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleSaveGrade = (subId: string) => {
    const numScore = parseFloat(gradeScore) || 10;
    const updated = submissions.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          grade: numScore,
          feedback: gradeComment,
          status: 'graded' as const
        };
      }
      return s;
    });
    setSubmissions(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('truong_practical_submissions', JSON.stringify(updated));
    }
    setGradingSubId(null);
    setNotification('Đã lưu điểm và nhận xét bài thực hành thành công!');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* BANNER GIÁO VIÊN */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            THAYTRUONGIT-THCS MÃO ĐIỀN · Quản trị lớp học
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kênh Giáo Viên & Theo Dõi Trực Tiếp
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Giáo viên phụ trách: Thầy Trương IT · Môn Tin học Khối 6, 7, 8, 9
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAssignWorksheet}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Giao nhiệm vụ ngay</span>
          </button>
          <button
            onClick={() => alert('Đang xuất bảng điểm và báo cáo đánh giá năng lực ra Excel...')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* CHỌN LỚP */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Chọn lớp học:
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MOCK_CLASSES.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedClassId === cls.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Khối {cls.grade}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {cls.classCode}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 mt-1">{cls.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{cls.studentCount} học sinh</p>
            </button>
          ))}
        </div>
      </div>

      {/* TABS QUẢN TRỊ */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold flex-wrap">
        <button
          onClick={() => setActiveTab('live_monitor')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'live_monitor'
              ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-500" />
          <span>Theo dõi trực tiếp (Realtime)</span>
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'submissions'
              ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-amber-500" />
          <span>Quản lý Nộp bài thực hành ({submissions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('roster')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'roster'
              ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Danh sách học sinh ({currentClass.name})</span>
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'exams'
              ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Đóng / Mở đề thi</span>
        </button>
      </div>

      {/* TAB 1: THEO DÕI TRỰC TIẾP TRONG TIẾT HỌC */}
      {activeTab === 'live_monitor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  Tiến độ làm bài trực tiếp · {currentClass.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đang diễn ra tiết học: Tin học 6 - Bài 1: Thông tin và dữ liệu
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Đã nộp: 2/2 em
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {classStudents.map((st, i) => (
                <div key={st.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{st.fullName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Đã nộp bài (100%)
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>Mã HS: {st.studentCode}</span>
                    <span className="font-bold text-blue-600">Điểm: {i === 0 ? '9.5' : '8.8'}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PHÂN TÍCH CÂU HỎI HỌC SINH THƯỜNG SAI */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Câu hỏi nhiều học sinh sai
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Báo cáo tức thì giúp giáo viên giảng lại ngay trong tiết
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700">
                  <span>Câu số 3 (Bộ nhớ ngoài)</span>
                  <span>45% trả lời sai</span>
                </div>
                <p className="text-xs text-slate-600">
                  Học sinh nhầm lẫn giữa chức năng của ROM/RAM và Thiết bị lưu trữ ngoài.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                  <span>Câu số 1 (Vật mang tin)</span>
                  <span>20% trả lời sai</span>
                </div>
                <p className="text-xs text-slate-600">
                  Còn một số em chọn tiếng còi thay vì quyển sách giáo khoa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUẢN LÝ NỘP BÀI THỰC HÀNH PHÒNG MÁY */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
                <UploadCloud className="w-3.5 h-3.5" />
                Giải pháp số hóa phòng máy · Không lo virus USB
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Quản Lý Bài Thực Hành Đã Nộp ({currentClass.name})
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tự động gom bài theo lớp và thời gian. Giáo viên có thể tải tệp bài làm về máy hoặc chấm điểm trực tuyến.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('Đang xuất toàn bộ danh sách nộp bài và điểm số sang Excel...')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Xuất bảng điểm Excel</span>
              </button>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-xs text-blue-700 font-semibold block">Tổng bài nộp hệ thống</span>
              <span className="text-2xl font-extrabold text-blue-900 mt-1 block">{submissions.length}</span>
              <span className="text-[11px] text-blue-600 mt-0.5 block">Bao gồm Excel, Word, Python, C++</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs text-emerald-700 font-semibold block">Đã chấm điểm & nhận xét</span>
              <span className="text-2xl font-extrabold text-emerald-900 mt-1 block">
                {submissions.filter(s => s.status === 'graded').length}
              </span>
              <span className="text-[11px] text-emerald-600 mt-0.5 block">Đã gửi phản hồi đến học sinh</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs text-amber-700 font-semibold block">Đang chờ Thầy chấm</span>
              <span className="text-2xl font-extrabold text-amber-900 mt-1 block">
                {submissions.filter(s => s.status === 'submitted').length}
              </span>
              <span className="text-[11px] text-amber-600 mt-0.5 block">Ưu tiên chấm các bài mới nộp</span>
            </div>
          </div>

          {/* FORM CHẤM BÀI NHANH */}
          {gradingSubId && (
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Chấm điểm & Viết nhận xét bài thực hành:</span>
                </h4>
                <button
                  onClick={() => setGradingSubId(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Đóng lại
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Điểm (thang 10)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="10"
                    value={gradeScore}
                    onChange={(e) => setGradeScore(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Lời nhận xét của Thầy Trương</label>
                  <input
                    type="text"
                    value={gradeComment}
                    onChange={(e) => setGradeComment(e.target.value)}
                    placeholder="Nhập nhận xét..."
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => handleSaveGrade(gradingSubId)}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    Lưu kết quả
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BẢNG DANH SÁCH BÀI NỘP */}
          <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Mã nộp bài</th>
                    <th className="px-4 py-3">Học sinh & Lớp</th>
                    <th className="px-4 py-3">Nội dung bài thực hành</th>
                    <th className="px-4 py-3">Tệp bài làm</th>
                    <th className="px-4 py-3">Thời gian</th>
                    <th className="px-4 py-3">Kết quả</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold text-slate-700">
                        {sub.submissionCode}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{sub.studentName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {sub.studentCode} · <span className="font-bold text-blue-600">{sub.className}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-700 max-w-[200px] truncate">
                        {sub.assignmentTitle}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 w-fit">
                          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="truncate max-w-[140px]">{sub.fileName}</span>
                          <span className="text-[10px] text-slate-400">({sub.fileSize})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-[11px]">
                        {sub.submittedAt}
                      </td>
                      <td className="px-4 py-3">
                        {sub.status === 'graded' ? (
                          <div>
                            <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                              {sub.grade}/10 đ
                            </span>
                            {sub.feedback && (
                              <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[160px]" title={sub.feedback}>
                                {sub.feedback}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                            Chờ chấm
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => alert(`Đang tải tệp bài làm ${sub.fileName} của học sinh ${sub.studentName} về máy tính của Thầy...`)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Tải tệp bài làm về máy"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setGradingSubId(sub.id);
                              setGradeScore(sub.grade ? sub.grade.toString() : '9.5');
                              setGradeComment(sub.feedback || 'Bài làm tốt, sử dụng công thức chính xác!');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                          >
                            {sub.status === 'graded' ? 'Sửa điểm' : 'Chấm bài'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ROSTER & MẬT KHẨU (4A) */}
      {activeTab === 'roster' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Danh sách học sinh · {currentClass.name}
              </h3>
              <p className="text-xs text-slate-500">
                Tài khoản & mật khẩu học sinh do thầy cấp (Mô hình 4A)
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên hoặc mã HS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Mã HS</th>
                  <th className="py-3 px-3">Họ và tên</th>
                  <th className="py-3 px-3">Mật khẩu</th>
                  <th className="py-3 px-3">Điểm học tập</th>
                  <th className="py-3 px-3">Điểm XP thi đua</th>
                  <th className="py-3 px-3">Cấp độ</th>
                  <th className="py-3 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                        {st.studentCode}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900">{st.fullName}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">123</td>
                    <td className="py-3 px-3 font-black text-blue-600">{st.averageGrade}/10</td>
                    <td className="py-3 px-3 font-bold text-amber-600">{st.totalXp} XP</td>
                    <td className="py-3 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[10px]">
                        Cấp {st.level}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => alert(`Đặt lại mật khẩu cho học sinh ${st.fullName} thành "123"`)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px]"
                      >
                        Reset MK
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: QUẢN LÝ ĐỀ KIỂM TRA */}
      {activeTab === 'exams' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900">
              Quản lý đề kiểm tra theo khối
            </h3>
            <button
              onClick={() => alert('Chức năng Soạn đề thi mới theo ma trận chuẩn Bộ GD&ĐT')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              + Tạo đề mới
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map((exam) => (
              <div key={exam.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 uppercase">
                    Khối {exam.grade} · {exam.examType}
                  </span>
                  <button
                    onClick={() => toggleLockExam(exam.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      exam.isLocked
                        ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    }`}
                  >
                    {exam.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    <span>{exam.isLocked ? 'Đang Khóa đề' : 'Đang Mở đề'}</span>
                  </button>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{exam.title}</h4>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span>Thời gian: {exam.durationMin} phút</span>
                  <span>{exam.questionsCount} câu hỏi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
