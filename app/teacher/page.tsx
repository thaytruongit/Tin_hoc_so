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
  MessageSquare,
  GraduationCap
} from 'lucide-react';
import { 
  Sparkles, 
  BookOpen, 
  Camera, 
  Image as ImageIcon, 
  ExternalLink, 
  X 
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS, MOCK_RECENT_RESULTS, MOCK_WORKSHEETS, MOCK_EXAMS, MOCK_SUBMISSIONS, MOCK_HOMEWORK_SUBMISSIONS, MOCK_IN_CLASS_LESSONS } from '@/lib/mock-data';
import { PracticalSubmission, HomeworkSubmission } from '@/lib/types';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { CURRICULUM_DATA } from '@/lib/curriculum-data';
import { ShieldAlert, ArrowRight, Cloud, FolderCheck, RefreshCw } from 'lucide-react';
import { getGasWebAppUrl, setGasWebAppUrl, testDriveOnlineConnection } from '@/lib/google-drive-service';


export default function TeacherDashboard() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | 'all'>('all');
  const [selectedClassId, setSelectedClassId] = useState(MOCK_CLASSES[4].id); // Mặc định 7A10
  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState(MOCK_EXAMS);
  const [notification, setNotification] = useState('');
  const [activeTab, setActiveTab] = useState<'roster' | 'live_monitor' | 'exams' | 'submissions' | 'homework' | 'reinforcement' | 'drive_config'>('roster');
  const [gasUrlInput, setGasUrlInput] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<{ loading: boolean; result?: { success: boolean; message: string; version?: string } }>({ loading: false });
  const [saveGasMsg, setSaveGasMsg] = useState<string>('');
  const [submissions, setSubmissions] = useState<PracticalSubmission[]>(MOCK_SUBMISSIONS);
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState<string>('9.5');
  const [gradeComment, setGradeComment] = useState<string>('Bài làm tốt, sử dụng công thức chính xác!');
  const [homeworkSubs, setHomeworkSubs] = useState<HomeworkSubmission[]>(MOCK_HOMEWORK_SUBMISSIONS);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [gradingHwId, setGradingHwId] = useState<string | null>(null);
  const [hwScore, setHwScore] = useState<string>('10');
  const [hwFeedback, setHwFeedback] = useState<string>('Bài làm rất tốt, trình bày sạch đẹp!');
  const [rfLessonId, setRfLessonId] = useState<string>(MOCK_IN_CLASS_LESSONS[1].id);
  const [rfResults, setRfResults] = useState<any[]>([]);

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

      const savedHw = localStorage.getItem('truong_homework_submissions');
      const savedRf = localStorage.getItem('truong_reinforcement_results');
      if (savedRf) {
        try {
          const parsedRf = JSON.parse(savedRf);
          if (Array.isArray(parsedRf)) {
            setRfResults(parsedRf);
          }
        } catch (e) {
          console.error(e);
        }
      }
      if (savedHw) {
        try {
          const parsedHw = JSON.parse(savedHw);
          if (Array.isArray(parsedHw) && parsedHw.length > 0) {
            setHomeworkSubs(parsedHw);
          }
        } catch (e) {
          console.error(e);
        }
      }
      setGasUrlInput(getGasWebAppUrl());
    }
  }, []);

  const displayClasses = selectedGradeFilter === 'all'
    ? MOCK_CLASSES
    : MOCK_CLASSES.filter(c => c.grade === selectedGradeFilter);

  const currentClass = MOCK_CLASSES.find(c => c.id === selectedClassId) || MOCK_CLASSES[0];
  const classStudents = MOCK_STUDENTS.filter(s => s.classId === selectedClassId);

  const filteredStudents = classStudents.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.dob && s.dob.includes(searchTerm))
  );

  
  const handleSaveGasUrl = () => {
    setGasWebAppUrl(gasUrlInput);
    setSaveGasMsg('Đã lưu cấu hình Google Apps Script Web App URL thành công!');
    setTimeout(() => setSaveGasMsg(''), 4000);
  };

  const handleTestDriveConnection = async () => {
    if (!gasUrlInput.trim()) {
      alert('Vui lòng nhập URL Google Apps Script Web App trước khi kiểm tra!');
      return;
    }
    setConnectionStatus({ loading: true });
    const res = await testDriveOnlineConnection(gasUrlInput.trim());
    setConnectionStatus({ loading: false, result: res });
  };

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
    setNotification(`Đã giao nhiệm vụ cho ${currentClass.name}! Học sinh có thể làm bài ngay.`);
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

  const handleGradeHomework = (subId: string) => {
    const numScore = parseFloat(hwScore) || 10;
    const updated = homeworkSubs.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          grade: numScore,
          feedback: hwFeedback,
          status: 'graded' as const
        };
      }
      return s;
    });
    setHomeworkSubs(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('truong_homework_submissions', JSON.stringify(updated));
    }
    setGradingHwId(null);
    setNotification(`Đã lưu điểm ${numScore}đ và gửi lời phê bài tập về nhà thành công!`);
    setTimeout(() => setNotification(''), 3000);
  };

  if (currentUser && currentUser.role === 'student') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-lg border border-rose-200">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider">
            Phân quyền bảo mật (RBAC)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Truy Cập Bị Từ Chối — Quyền Giáo Viên
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            Kênh Giáo Viên dành riêng cho <strong>Thầy Trương</strong> để quản trị điểm số và đề thi.<br />
            Tài khoản của em là <strong>{currentUser.studentName}</strong> ({currentUser.studentClass} - Khối {currentUser.studentGrade}) chỉ có quyền thực hiện học liệu của lớp mình.
          </p>
        </div>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/student"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <span>Về không gian học tập Khối {currentUser.studentGrade}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login?role=teacher"
            className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
          >
            Đăng nhập tài khoản Giáo viên
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* BANNER GIÁO VIÊN */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            THAYTRUONGIT-THCS MÃO ĐIỀN · Quản trị lớp học
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kênh Giáo Viên & Quản Trị Học Sinh
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tổng số: <strong>669 học sinh</strong> · <strong>15 lớp</strong> (Khối 6, 7, 8, 9) · Mật khẩu chung: <strong>123</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/teacher/downloads/Danh_Sach_Tai_Khoan_Hoc_Sinh_THCS_Mao_Dien.xlsx"
            download="Danh_Sach_Tai_Khoan_Hoc_Sinh_THCS_Mao_Dien.xlsx"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Tải Excel 669 tài khoản</span>
          </a>
          <button
            onClick={handleAssignWorksheet}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Giao bài ngay</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* BỘ LỌC VÀ CHỌN LỚP HỌC (15 LỚP) */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Chọn lớp giảng dạy (15 lớp THCS Mão Điền):</span>
          </h2>

          {/* Lọc nhanh theo Khối */}
          <div className="flex flex-wrap gap-1.5">
            {(['all', 6, 7, 8, 9] as const).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGradeFilter(g)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedGradeFilter === g
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {g === 'all' ? 'Tất cả (15 lớp)' : `Khối ${g}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {displayClasses.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedClassId === cls.id
                  ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">Khối {cls.grade}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  {cls.classCode}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mt-1">{cls.name}</h3>
              <p className="text-[11px] text-blue-600 font-medium mt-0.5">{cls.studentCount} học sinh</p>
            </button>
          ))}
        </div>
      </div>

      {/* TABS QUẢN TRỊ */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold flex-wrap">
        <button
          onClick={() => setActiveTab('roster')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'roster'
              ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Danh sách tài khoản ({currentClass.name} · {classStudents.length} HS)</span>
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
          <span>Bài thực hành phòng máy ({submissions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('reinforcement')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'reinforcement'
              ? 'border-b-2 border-amber-500 text-amber-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Ngân hàng Củng cố (7 câu)</span>
        </button>
        <button
          onClick={() => setActiveTab('homework')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'homework'
              ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Camera className="w-4 h-4 text-purple-600" />
          <span>Bài tập về nhà ({homeworkSubs.length})</span>
        </button>
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

      {/* TAB 1: ROSTER & CẤP TÀI KHOẢN (MÔ HÌNH 4A CHUẨN) */}
      {activeTab === 'roster' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Danh sách học sinh {currentClass.name}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {classStudents.length} em
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mã học sinh tự động sinh theo mẫu: <code>[TênLớp][STT]</code> (Ví dụ: <strong>{currentClass.name.replace('Lớp ', '')}01</strong>) · Mật khẩu: <strong>123</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm họ tên, mã HS hoặc ngày sinh..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <a
                href="/teacher/downloads/Danh_Sach_Tai_Khoan_Hoc_Sinh_THCS_Mao_Dien.xlsx"
                download="Danh_Sach_Tai_Khoan_Hoc_Sinh_THCS_Mao_Dien.xlsx"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all"
                title="Tải bảng tính Excel toàn trường"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Xuất Excel</span>
              </a>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center">STT</th>
                  <th className="py-3 px-3">Mã HS (Đăng nhập)</th>
                  <th className="py-3 px-3">Họ và tên</th>
                  <th className="py-3 px-3 text-center">Ngày sinh</th>
                  <th className="py-3 px-3 text-center">Mật khẩu</th>
                  <th className="py-3 px-3 text-center">Điểm học tập</th>
                  <th className="py-3 px-3 text-center">Điểm XP thi đua</th>
                  <th className="py-3 px-3 text-center">Cấp độ</th>
                  <th className="py-3 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st, idx) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 text-center font-mono text-slate-400 font-semibold">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                        {st.studentCode}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {st.fullName}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-500 font-mono">
                      {st.dob || '-'}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-600 bg-slate-50 rounded">
                      {st.password || '123'}
                    </td>
                    <td className="py-3 px-3 text-center font-black text-blue-600">
                      {st.averageGrade}/10
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-amber-600">
                      {st.totalXp} XP
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[10px]">
                        Cấp {st.level}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => alert(`Đặt lại mật khẩu cho học sinh ${st.fullName} thành "123"`)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] transition-colors"
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

      {/* TAB 3: THEO DÕI TRỰC TIẾP TRONG TIẾT HỌC */}
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
                  Đang diễn ra tiết học: Tin học - Thực hành Bảng tính Excel
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Sĩ số: {classStudents.length} học sinh
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-1">
              {classStudents.slice(0, 10).map((st, i) => (
                <div key={st.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{st.fullName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Đang làm bài
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>Mã HS: {st.studentCode}</span>
                    <span className="font-bold text-blue-600">Điểm TB: {st.averageGrade}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${80 + (i % 20)}%` }} />
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
                  <span>Câu số 3 (Địa chỉ tuyệt đối)</span>
                  <span>35% trả lời sai</span>
                </div>
                <p className="text-xs text-slate-600">
                  Học sinh quên nhấn phím F4 để thêm ký hiệu $ trước tên cột và chỉ số hàng.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                  <span>Câu số 2 (Cú pháp hàm IF)</span>
                  <span>18% trả lời sai</span>
                </div>
                <p className="text-xs text-slate-600">
                  Còn một số em quên dấu nháy kép quanh giá trị dạng chuỗi chữ (như &quot;Đạt&quot;).
                </p>
              </div>
            </div>
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
      {/* TAB 6: NGÂN HÀNG CÂU HỎI CỦNG CỐ 7 CÂU */}
      {activeTab === 'reinforcement' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Ngân hàng câu hỏi Củng cố bài học (Chuẩn ma trận Bộ GD&amp;ĐT)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Gồm đúng 7 câu hỏi trắc nghiệm chia chuẩn 3 mức độ nhận thức: <strong>3 câu Nhận biết · 2 câu Thông hiểu · 2 câu Vận dụng</strong>.
              </p>
            </div>
            <Link
              href="/in-class"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <span>Mở giao diện làm bài (Học sinh)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* CHỌN BÀI HỌC THEO KHỐI */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {MOCK_IN_CLASS_LESSONS.map((l) => (
              <button
                key={l.id}
                onClick={() => setRfLessonId(l.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  rfLessonId === l.id
                    ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-400/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Khối {l.grade}: {l.lessonTitle.split(':')[0]}
              </button>
            ))}
          </div>

          {/* CHI TIẾT 7 CÂU HỎI CỦA BÀI HỌC ĐANG CHỌN */}
          {(() => {
            const currentRf = MOCK_IN_CLASS_LESSONS.find(l => l.id === rfLessonId) || MOCK_IN_CLASS_LESSONS[0];
            return (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 uppercase">
                      Khối {currentRf.grade} · {currentRf.topic}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{currentRf.lessonTitle}</h4>
                  </div>
                  <div className="text-xs font-bold text-amber-800 bg-white px-3 py-1.5 rounded-xl border border-amber-300">
                    Ma trận: 3 Biết · 2 Hiểu · 2 Vận dụng
                  </div>
                </div>

                <div className="space-y-4">
                  {currentRf.reinforcementQuestions.map((q, qIdx) => (
                    <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                            {qIdx + 1}
                          </span>
                          <span className="font-bold text-xs text-slate-900">{q.question}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          q.level === 'Nhận biết' ? 'bg-blue-100 text-blue-800' :
                          q.level === 'Thông hiểu' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {q.level}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === q.correctIndex;
                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              <span className={`w-4 h-4 rounded text-[10px] flex items-center justify-center font-bold ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                              {isCorrect && <span className="text-[10px] text-emerald-700 ml-auto font-black">(Đáp án đúng)</span>}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 flex items-start gap-1.5">
                        <span className="font-bold text-slate-800 shrink-0">💡 Lời giải của Thầy:</span>
                        <span className="italic">{q.explanation}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DANH SÁCH HỌC SINH ĐÃ NỘP BÀI CỦNG CỐ TRỰC TIẾP */}
                {rfResults.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                      Kết quả học sinh nộp bài củng cố gần đây ({rfResults.length} lượt):
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-600 font-bold">
                          <tr>
                            <th className="py-2.5 px-3">Học sinh</th>
                            <th className="py-2.5 px-3">Lớp</th>
                            <th className="py-2.5 px-3">Bài củng cố</th>
                            <th className="py-2.5 px-3 text-center">Số câu đúng</th>
                            <th className="py-2.5 px-3 text-center">Điểm số</th>
                            <th className="py-2.5 px-3 text-right">Thời gian</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {rfResults.map((r, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50">
                              <td className="py-2.5 px-3 font-bold text-slate-900">{r.studentName}</td>
                              <td className="py-2.5 px-3 text-slate-600">{r.studentClass}</td>
                              <td className="py-2.5 px-3 text-slate-700">{r.lessonTitle}</td>
                              <td className="py-2.5 px-3 text-center font-semibold text-blue-600">{r.correctCount}/7 câu</td>
                              <td className="py-2.5 px-3 text-center">
                                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                  {r.score} đ
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-right text-slate-400">{r.submittedAt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 5: BÀI TẬP VỀ NHÀ (ẢNH CHỤP VỞ / EXCEL / WORD) */}
      {activeTab === 'homework' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-600" />
                <span>Chấm bài tập về nhà học sinh (Ảnh chụp vở, Excel, Word)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Xem trực tiếp ảnh chụp trang vở của học sinh phóng to và nhận xét, cho điểm thang 10.
              </p>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              Tổng số bài đã nộp: {homeworkSubs.length} bài
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Học sinh</th>
                  <th className="py-3 px-4">Lớp</th>
                  <th className="py-3 px-4">Bài tập</th>
                  <th className="py-3 px-4">Tệp nộp & Xem</th>
                  <th className="py-3 px-4">Ghi chú HS</th>
                  <th className="py-3 px-4">Thời gian</th>
                  <th className="py-3 px-4">Điểm số</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {homeworkSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{sub.studentName}</div>
                      <div className="font-mono text-[11px] text-slate-400 font-normal">{sub.studentCode}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{sub.className}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 max-w-xs truncate" title={sub.homeworkTitle}>
                      {sub.homeworkTitle}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {sub.fileType === 'image' && (
                          <button
                            onClick={() => setPreviewImage(sub.fileDataUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80')}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 font-semibold"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Xem ảnh vở</span>
                          </button>
                        )}
                        {sub.fileType === 'xlsx' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            <span>{sub.fileName}</span>
                          </span>
                        )}
                        {sub.fileType === 'docx' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                            <FileText className="w-3.5 h-3.5" />
                            <span>{sub.fileName}</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 italic max-w-[200px] truncate" title={sub.note || ''}>
                      {sub.note || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{sub.submittedAt}</td>
                    <td className="py-3.5 px-4">
                      {sub.status === 'graded' ? (
                        <span className="font-extrabold text-sm text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          {sub.grade} đ
                        </span>
                      ) : (
                        <span className="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                          Chờ chấm
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setGradingHwId(sub.id);
                          setHwScore(sub.grade ? String(sub.grade) : '10');
                          setHwFeedback(sub.feedback || 'Bài làm rất tốt, trình bày sạch đẹp!');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold border border-blue-200"
                      >
                        {sub.status === 'graded' ? 'Chấm lại' : 'Chấm điểm'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form chấm điểm bài tập về nhà */}
          {gradingHwId && (
            <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-blue-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>Chấm bài tập về nhà của học sinh</span>
                </h4>
                <button
                  onClick={() => setGradingHwId(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕ Đóng
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Điểm số (Thang điểm 10):</label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="10"
                    value={hwScore}
                    onChange={(e) => setHwScore(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lời phê / Nhận xét của Thầy Trương:</label>
                  <input
                    type="text"
                    value={hwFeedback}
                    onChange={(e) => setHwFeedback(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setGradingHwId(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs bg-white hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleGradeHomework(gradingHwId)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu điểm & Gửi lời phê cho học sinh</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL PHÓNG TO ẢNH CHỤP VỞ HỌC SINH */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-400" />
                <span>Xem ảnh chụp trang vở bài tập về nhà của học sinh</span>
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-slate-100 min-h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage}
                alt="Ảnh vở bài tập của học sinh"
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-md border border-slate-300"
              />
            </div>
            <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setPreviewImage(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
