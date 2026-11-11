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
import { ShieldAlert, ArrowRight, Cloud, FolderCheck, RefreshCw, RotateCw, ZoomIn, ZoomOut, ThumbsUp, Award, Sliders, CheckSquare, Radio } from 'lucide-react';
import { getGasWebAppUrl, setGasWebAppUrl, testDriveOnlineConnection } from '@/lib/google-drive-service';
import ClassroomCommandCenter from '@/components/ClassroomCommandCenter';
import { fetchClassExamResultsFromCloud, CloudExamResult } from '@/lib/supabase-service';
import { exportStudentsToExcel } from '@/lib/export-excel';


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
  const [activeTab, setActiveTab] = useState<'orchestration' | 'roster' | 'exams' | 'submissions' | 'homework' | 'reinforcement' | 'drive_config'>('orchestration');
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
  // Trạng thái chấm Rubric Thực hành 3 tiêu chí
  const [rubricC1, setRubricC1] = useState<number>(5.0); // Kỹ thuật thao tác (tối đa 5đ)
  const [rubricC2, setRubricC2] = useState<number>(3.0); // Hoàn thiện sản phẩm (tối đa 3đ)
  const [rubricC3, setRubricC3] = useState<number>(2.0); // Thẩm mỹ & Sáng tạo (tối đa 2đ)
  // Trạng thái chấm BTVN theo TT22
  const [hwEvalType, setHwEvalType] = useState<'score' | 'tt22'>('score');
  const [hwTt22Result, setHwTt22Result] = useState<'Đạt' | 'Chưa đạt'>('Đạt');
  // Trạng thái xoay và phóng to ảnh chụp vở
  const [imageRotation, setImageRotation] = useState<number>(0);
  const [imageZoom, setImageZoom] = useState<number>(1);
  const [rfLessonId, setRfLessonId] = useState<string>(MOCK_IN_CLASS_LESSONS[1].id);
  const [rfResults, setRfResults] = useState<any[]>([]);
  const [examResultsList, setExamResultsList] = useState<CloudExamResult[]>([]);
  const [isLoadingExamResults, setIsLoadingExamResults] = useState<boolean>(false);

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

  // Tự động tải điểm thi từ Supabase Cloud khi đổi Lớp
  useEffect(() => {
    if (currentClass?.name) {
      setIsLoadingExamResults(true);
      fetchClassExamResultsFromCloud(currentClass.name)
        .then(res => setExamResultsList(res))
        .catch(err => console.error(err))
        .finally(() => setIsLoadingExamResults(false));
    }
  }, [currentClass?.name]);

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
    let badgeReward = '';
    if (numScore >= 9.0) badgeReward = ' • Tặng Huy hiệu Xuất Sắc (EXCELLENT) +100 XP';
    else if (numScore >= 7.0) badgeReward = ' • Tặng Huy hiệu Chăm Chỉ (HARD_WORK) +50 XP';

    const updated = submissions.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          grade: numScore,
          feedback: gradeComment + (badgeReward ? ` [Thầy Đỗ Mạnh Trường khen:${badgeReward}]` : ''),
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
    setNotification(`Đã lưu kết quả thực hành: ${numScore}đ theo Rubric${badgeReward}!`);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleGradeHomework = (subId: string) => {
    const finalFeedback = hwEvalType === 'tt22' 
      ? `[Đánh giá TT22: ${hwTt22Result}] ${hwFeedback}`
      : hwFeedback;
    const numScore = hwEvalType === 'tt22' ? (hwTt22Result === 'Đạt' ? 10 : 5) : (parseFloat(hwScore) || 10);

    const updated = homeworkSubs.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          grade: numScore,
          feedback: finalFeedback,
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
    setNotification(hwEvalType === 'tt22' 
      ? `Đã lưu đánh giá Thông tư 22: ${hwTt22Result} cho học sinh!`
      : `Đã lưu điểm ${numScore}đ và gửi lời phê bài tập về nhà thành công!`);
    setTimeout(() => setNotification(''), 3500);
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
            Kênh Giáo Viên dành riêng cho <strong>Thầy Đỗ Mạnh Trường</strong> để quản trị điểm số và đề thi.<br />
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
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
            THAYTRUONGIT-THCS MÃO ĐIỀN · Quản trị lớp học
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kênh Giáo Viên & Quản Trị Học Sinh
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Tổng số: <strong>669 học sinh</strong> · <strong>15 lớp</strong> (Khối 6, 7, 8, 9) · Mật khẩu chung: <strong>123</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportStudentsToExcel(MOCK_STUDENTS, 'Danh_Sach_669_Hoc_Sinh_THCS_Mao_Dien.xls')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Tải Excel 669 tài khoản</span>
          </button>
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

      {/* TABS QUẢN TRỊ THEO ĐÚNG 4 CHỨC NĂNG CỦA GIÁO VIÊN */}
      <div className="flex border-b border-slate-200 gap-4 sm:gap-6 text-xs sm:text-sm font-bold flex-wrap">
        <button
          onClick={() => setActiveTab('orchestration')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'orchestration'
              ? 'border-b-2 border-rose-600 text-rose-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
          <span>1. Đài Chỉ Huy 24 Trạm (Ziczac)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase">LIVE</span>
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
          <span>2. Quản Trị 670 HS &amp; Xuất Excel</span>
        </button>

        <button
          onClick={() => setActiveTab('exams')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'exams'
              ? 'border-b-2 border-indigo-600 text-indigo-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>3. Điều Phối Tiết Dạy &amp; Ngân Hàng Đề</span>
        </button>

        <button
          onClick={() => setActiveTab('drive_config')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'drive_config'
              ? 'border-b-2 border-teal-600 text-teal-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Cloud className="w-4 h-4 text-teal-600" />
          <span>4. Cấu Hình Google Drive Thực Hành</span>
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'submissions'
              ? 'border-b-2 border-amber-600 text-amber-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-amber-500" />
          <span>Bài Thực Hành ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('homework')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'homework'
              ? 'border-b-2 border-purple-600 text-purple-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Camera className="w-4 h-4 text-purple-600" />
          <span>Bài Tập Về Nhà ({homeworkSubs.length})</span>
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

              <button
                onClick={() => exportStudentsToExcel(classStudents, `Danh_Sach_${currentClass.name}_THCS_Mao_Dien.xls`)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
                title="Tải bảng tính Excel danh sách lớp này"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Xuất Excel</span>
              </button>
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
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
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

          {/* FORM CHẤM BÀI THEO RUBRIC 3 TIÊU CHÍ CHUẨN SƯ PHẠM */}
          {gradingSubId && (
            <div className="p-6 rounded-3xl bg-indigo-50/90 border-2 border-indigo-300 space-y-5 animate-in fade-in shadow-md">
              <div className="flex items-center justify-between border-b border-indigo-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-indigo-700" />
                  <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wider">
                    Quy trình chấm Rubric 3 tiêu chí · Thang điểm 10
                  </h4>
                </div>
                <button
                  onClick={() => setGradingSubId(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1 rounded-lg bg-white border border-slate-200"
                >
                  Đóng lại
                </button>
              </div>

              {/* 3 TIÊU CHÍ RUBRIC */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tiêu chí 1: Kỹ thuật thao tác */}
                <div className="p-4 rounded-2xl bg-white border border-indigo-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">1. Kỹ thuật &amp; Quy trình</span>
                    <span className="font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">{rubricC1.toFixed(1)} / 5.0đ</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={rubricC1}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setRubricC1(v);
                      setGradeScore((v + rubricC2 + rubricC3).toFixed(1));
                    }}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">Thao tác phần mềm chuẩn xác, đúng các bước</span>
                </div>

                {/* Tiêu chí 2: Hoàn thiện sản phẩm */}
                <div className="p-4 rounded-2xl bg-white border border-indigo-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">2. Hoàn thiện sản phẩm</span>
                    <span className="font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">{rubricC2.toFixed(1)} / 3.0đ</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.5"
                    value={rubricC2}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setRubricC2(v);
                      setGradeScore((rubricC1 + v + rubricC3).toFixed(1));
                    }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">Tệp nộp đúng định dạng, đủ nội dung yêu cầu</span>
                </div>

                {/* Tiêu chí 3: Thẩm mỹ & Sáng tạo */}
                <div className="p-4 rounded-2xl bg-white border border-indigo-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">3. Thẩm mỹ &amp; Sáng tạo</span>
                    <span className="font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">{rubricC3.toFixed(1)} / 2.0đ</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.5"
                    value={rubricC3}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setRubricC3(v);
                      setGradeScore((rubricC1 + rubricC2 + v).toFixed(1));
                    }}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">Bố cục khoa học, tư duy thuật toán tối ưu</span>
                </div>
              </div>

              {/* MẪU NHẬN XÉT NHANH (1 CHẠM) */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Mẫu nhận xét nhanh của Thầy (Nhấp để chọn):</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Thao tác chuẩn xác, đúng quy trình!',
                    'Công thức tính toán rất tối ưu!',
                    'Cần chú ý định dạng bảng biểu sạch đẹp hơn.',
                    'Hoàn thành xuất sắc toàn bộ yêu cầu!',
                    'Ý tưởng sáng tạo, bố cục rõ ràng.'
                  ].map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setGradeComment(preset)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-[11px] font-semibold transition-all shadow-2xs"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ô NHẬP NHẬN XÉT VÀ LƯU ĐIỂM */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-indigo-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-12 rounded-xl bg-indigo-700 text-white flex flex-col items-center justify-center font-black shadow-xs">
                    <span className="text-lg leading-none">{gradeScore}</span>
                    <span className="text-[9px] text-indigo-200">/10đ</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {parseFloat(gradeScore) >= 9.0 ? (
                      <span className="text-amber-700 font-bold flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Thưởng Huy Hiệu Xuất Sắc</span>
                    ) : parseFloat(gradeScore) >= 7.0 ? (
                      <span className="text-blue-700 font-bold">Thưởng Huy Hiệu Chăm Chỉ</span>
                    ) : (
                      <span className="text-slate-500">Cần rèn luyện thêm</span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={gradeComment}
                    onChange={(e) => setGradeComment(e.target.value)}
                    placeholder="Lời nhận xét sư phạm của Thầy..."
                    className="w-full p-2.5 text-xs rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
                  />
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => handleSaveGrade(gradingSubId)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Lưu kết quả ({gradeScore}đ)</span>
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

      {/* TAB 1: TRUNG TÂM ĐIỀU KHIỂN PHÒNG MÁY TRỰC TIẾP (COMMAND CENTER) */}
      {activeTab === 'orchestration' && (
        <ClassroomCommandCenter
          currentClass={currentClass}
          classStudents={classStudents}
          onSelectClass={setSelectedClassId}
        />
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

          {/* BẢNG ĐIỂM THI TRỰC TUYẾN THỜI GIAN THỰC TỪ SUPABASE */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-indigo-600" />
                  <span>Bảng Điểm Kiểm Tra Trực Tuyến · {currentClass.name}</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Đồng bộ tự động từ Supabase PostgreSQL khi học sinh nộp bài thi
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsLoadingExamResults(true);
                  fetchClassExamResultsFromCloud(currentClass.name)
                    .then(res => setExamResultsList(res))
                    .finally(() => setIsLoadingExamResults(false));
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingExamResults ? 'animate-spin' : ''}`} />
                <span>Cập nhật bảng điểm</span>
              </button>
            </div>

            {examResultsList.length > 0 ? (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="py-3 px-4">Học sinh</th>
                      <th className="py-3 px-4">Bài thi</th>
                      <th className="py-3 px-4 text-center">Điểm số</th>
                      <th className="py-3 px-4 text-center">Rời màn hình</th>
                      <th className="py-3 px-4">Thời gian nộp</th>
                      <th className="py-3 px-4 text-center">Xếp loại</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {examResultsList.map((res, rIdx) => (
                      <tr key={res.id || rIdx} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{res.studentName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{res.studentCode}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-medium">{res.examTitle}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-xl font-black text-xs ${
                            res.score >= 8 ? 'bg-emerald-100 text-emerald-800' :
                            res.score >= 5 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {res.score} / 10đ
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-slate-600">
                          {res.tabSwitches > 0 ? (
                            <span className="text-rose-600">{res.tabSwitches} lần</span>
                          ) : (
                            <span className="text-emerald-600">0 lần</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{res.submittedAt}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="font-bold text-[11px] text-slate-700">
                            {res.score >= 8 ? 'Giỏi' : res.score >= 6.5 ? 'Khá' : res.score >= 5 ? 'Đạt' : 'Chưa đạt'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs text-slate-500 space-y-1">
                <p className="font-bold text-slate-700">Chưa có kết quả kiểm tra nào của {currentClass.name}</p>
                <p>Khi học sinh nộp bài thi tại phòng máy, kết quả và số lần chuyển tab sẽ xuất hiện tại đây.</p>
              </div>
            )}
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lời phê / Nhận xét của Thầy Đỗ Mạnh Trường:</label>
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

      {/* TAB: CẤU HÌNH GOOGLE DRIVE THỰC HÀNH */}
      {activeTab === 'drive_config' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold border border-teal-200">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Cấu Hình Google Drive Thực Hành Phòng Máy
              </h3>
              <p className="text-xs text-slate-500">
                Đồng bộ trực tiếp tệp nộp bài (.xlsx, .docx, .py, .cpp) của 24 máy trạm về Google Drive của Thầy Đỗ Mạnh Trường
              </p>
            </div>
          </div>

          {saveGasMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveGasMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Google Apps Script Web App URL:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={gasUrlInput}
                    onChange={(e) => setGasUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:border-teal-600"
                  />
                  <button
                    onClick={handleSaveGasUrl}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
                  >
                    Lưu URL
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  URL triển khai từ Google Apps Script với quyền truy cập Anyone (bất kỳ ai có đường link).
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleTestDriveConnection}
                  disabled={connectionStatus.loading}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 border border-slate-200"
                >
                  <RefreshCw className={`w-4 h-4 ${connectionStatus.loading ? 'animate-spin text-teal-600' : 'text-slate-600'}`} />
                  <span>{connectionStatus.loading ? 'Đang kiểm tra kết nối...' : 'Kiểm tra kết nối Google Drive'}</span>
                </button>

                {connectionStatus.result && (
                  <div className={`mt-3 p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                    connectionStatus.result.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    {connectionStatus.result.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{connectionStatus.result.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* HỘP HƯỚNG DẪN CẤU TRÚC THƯ MỤC DRIVE */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <FolderCheck className="w-4 h-4 text-teal-600" />
                <span>Quy chuẩn thư mục tự động:</span>
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Khi học sinh nộp bài từ bất kỳ máy nào trong 24 trạm, hệ thống sẽ tự động tạo cấu trúc thư mục trên Google Drive của Thầy Trường:
              </p>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-[10px] text-slate-700 space-y-1">
                <div>📁 THCS_Mao_Dien_Tin_Hoc/</div>
                <div className="pl-3">📁 Khoi_7/</div>
                <div className="pl-6">📁 Tiet_08_Thuc_Hanh_Excel/</div>
                <div className="pl-9 text-teal-700">📄 7A10_May08_An_Mai.xlsx</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SOI BÀI TRỰC QUAN (VISUAL VIEWER: ZOOM + XOAY 90° CHUẨN SƯ PHẠM) */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="font-bold text-sm flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-400" />
                <span>Trình soi bài trực quan · Soi ảnh chụp vở ghi của học sinh</span>
              </div>

              {/* BỘ CÔNG CỤ SOI ẢNH: XOAY + PHÓNG TO / THU NHỎ */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setImageRotation((prev) => (prev + 90) % 360)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
                  title="Xoay 90 độ chiều kim đồng hồ"
                >
                  <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Xoay {imageRotation}°</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImageZoom((prev) => Math.min(prev + 0.25, 2.5))}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-all"
                  title="Phóng to ảnh"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                  <span>+</span>
                </button>

                <span className="text-xs font-mono text-slate-400 px-1">
                  {Math.round(imageZoom * 100)}%
                </span>

                <button
                  type="button"
                  onClick={() => setImageZoom((prev) => Math.max(prev - 0.25, 0.5))}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-all"
                  title="Thu nhỏ ảnh"
                >
                  <ZoomOut className="w-3.5 h-3.5 text-blue-400" />
                  <span>-</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setImageRotation(0); setImageZoom(1); }}
                  className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700"
                  title="Khôi phục kích thước gốc"
                >
                  Gốc
                </button>

                <button
                  onClick={() => { setPreviewImage(null); setImageRotation(0); setImageZoom(1); }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-auto flex items-center justify-center bg-slate-100 min-h-[420px] max-h-[70vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage}
                alt="Ảnh vở bài tập của học sinh"
                style={{
                  transform: `rotate(${imageRotation}deg) scale(${imageZoom})`,
                  transition: 'transform 0.2s ease-in-out'
                }}
                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-lg border border-slate-300"
              />
            </div>

            <div className="p-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Thầy có thể bấm nút Xoay nếu ảnh chụp bị ngược hoặc Phóng to để đọc nét chữ viết tay của học sinh.
              </span>
              <button
                onClick={() => { setPreviewImage(null); setImageRotation(0); setImageZoom(1); }}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
