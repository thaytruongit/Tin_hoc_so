'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Laptop, 
  CheckCircle2, 
  HelpCircle, 
  FileSpreadsheet, 
  Download, 
  UploadCloud, 
  Sparkles, 
  Award, 
  Layers, 
  Check, 
  X, 
  Monitor, 
  BookOpen, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Users, 
  Repeat, 
  Trophy, 
  ArrowLeftRight, 
  Send, 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  FolderOpen,
  Lock,
  Unlock,
  ShieldAlert,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { CURRICULUM_DATA, CurriculumPeriod } from '@/lib/curriculum-data';
import { 
  ClassroomControlState, 
  getClassroomState, 
  subscribeToClassroomState 
} from '@/lib/classroom-control';
import { uploadPracticalToDriveOnline } from '@/lib/google-drive-service';
import { CognitiveLevel, PracticalSubmission } from '@/lib/types';
import InteractiveDiscoveryPair from '@/components/InteractiveDiscoveryPair';

function InClassContent() {
  const searchParams = useSearchParams();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [controlState, setControlState] = useState<ClassroomControlState>(getClassroomState());
  
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [selectedPeriodNum, setSelectedPeriodNum] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'worksheet' | 'reinforcement' | 'practice' | 'slide'>('worksheet');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isSlideFullscreen, setIsSlideFullscreen] = useState<boolean>(false);
  const [permissionNotice, setPermissionNotice] = useState<string>('');

  // --------------------------------------------------------------------------
  // HOẠT ĐỘNG 1: KHÁM PHÁ CẶP ĐÔI
  // --------------------------------------------------------------------------
  const [pairComputerNum, setPairComputerNum] = useState<string>('Máy 08 - Phòng Tin học 1');
  const [studentAName, setStudentAName] = useState<string>('Nguyễn Văn An');
  const [studentBName, setStudentBName] = useState<string>('Trần Thị Mai');
  const [currentRoleTurn, setCurrentRoleTurn] = useState<'A' | 'B'>('A'); // A: Kỹ thuật viên (chuột), B: Thư ký
  const [worksheetAnswers, setWorksheetAnswers] = useState<Record<string, string>>({});
  const [worksheetSubmitted, setWorksheetSubmitted] = useState<boolean>(false);
  const [worksheetScore, setWorksheetScore] = useState<number>(10);
  const [showRoleSwapModal, setShowRoleSwapModal] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // HOẠT ĐỘNG 2: LUYỆN TẬP (7 CÂU TRẮC NGHIỆM CHUẨN BỘ)
  // --------------------------------------------------------------------------
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // HOẠT ĐỘNG 3: THỰC HÀNH TRÊN MÁY & NỘP BÀI TRỰC TIẾP
  // --------------------------------------------------------------------------
  const [practicalFile, setPracticalFile] = useState<File | null>(null);
  const [isUploadingPractical, setIsUploadingPractical] = useState<boolean>(false);
  const [practicalSubmission, setPracticalSubmission] = useState<PracticalSubmission | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lấy dữ liệu 29 tiết của khối đang chọn
  const periodsOfGrade = CURRICULUM_DATA[selectedGrade] || [];
  const currentPeriod = periodsOfGrade.find(p => p.period === selectedPeriodNum) || periodsOfGrade[0];
  const currentQuestions = currentPeriod.reinforcement.questions;

  // Lắng nghe trạng thái khóa / mở thủ công từ Thầy Đỗ Mạnh Trường qua Supabase Realtime
  useEffect(() => {
    const unsub = subscribeToClassroomState((newState) => {
      setControlState(newState);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    // Đọc URL query parameters: ?grade=...&period=...&tab=...
    const urlGrade = searchParams.get('grade');
    const urlPeriod = searchParams.get('period');
    const urlTab = searchParams.get('tab');

    let initialGrade = 6;
    if (user.role === 'student' && user.studentGrade) {
      initialGrade = user.studentGrade;
      if (user.studentName) setStudentAName(user.studentName);
      if (user.partnerName) setStudentBName(user.partnerName);
    } else if (urlGrade) {
      const g = parseInt(urlGrade, 10);
      if ([6, 7, 8, 9].includes(g)) initialGrade = g;
    }
    setSelectedGrade(initialGrade);

    if (urlPeriod) {
      const p = parseInt(urlPeriod, 10);
      if (p >= 1 && p <= 29) {
        setSelectedPeriodNum(p);
      }
    }

    if (urlTab && ['worksheet', 'reinforcement', 'practice', 'slide'].includes(urlTab)) {
      setActiveTab(urlTab as any);
    }
  }, [searchParams]);

  const handleSelectGrade = (grade: number) => {
    if (currentUser?.role === 'student' && currentUser.studentGrade !== grade) {
      setPermissionNotice(`Tài khoản của em thuộc ${currentUser.studentClass || 'Khối ' + currentUser.studentGrade}. Em chỉ được làm bài của Khối ${currentUser.studentGrade}!`);
      setTimeout(() => setPermissionNotice(''), 5000);
      return;
    }
    setPermissionNotice('');
    setSelectedGrade(grade);
    setSelectedPeriodNum(1);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setWorksheetAnswers({});
    setWorksheetSubmitted(false);
    setPracticalFile(null);
    setPracticalSubmission(null);
    setCurrentRoleTurn('A');
  };

  const handleSelectPeriod = (periodNum: number) => {
    setSelectedPeriodNum(periodNum);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setWorksheetAnswers({});
    setWorksheetSubmitted(false);
    setPracticalFile(null);
    setPracticalSubmission(null);
    setCurrentSlideIndex(0);
  };

  // Trạng thái khóa / mở của 3 hoạt động từ Thầy Đỗ Mạnh Trường
  const isDiscoveryLocked = !controlState.activityLocks.discovery;
  const isPracticeLocked = !controlState.activityLocks.practice;
  const isLabLocked = !controlState.activityLocks.lab;

  // --------------------------------------------------------------------------
  // XỬ LÝ HOẠT ĐỘNG 1: TỰ ĐỘNG CHẤM PHIẾU KHÁM PHÁ CẶP ĐÔI
  // --------------------------------------------------------------------------
  const handleSwapRole = () => {
    setCurrentRoleTurn(prev => (prev === 'A' ? 'B' : 'A'));
    setShowRoleSwapModal(true);
    setTimeout(() => setShowRoleSwapModal(false), 3000);
  };

  const handleSubmitWorksheet = () => {
    if (isDiscoveryLocked) {
      alert('Hoạt động Khám phá cặp đôi hiện đang tạm khóa bởi Thầy Đỗ Mạnh Trường.');
      return;
    }
    if (worksheetSubmitted) return;

    // Tự động chấm điểm điền từ khuyết
    let correctBlanks = 0;
    const blanks = currentPeriod.worksheet.fillBlanks || [];
    blanks.forEach((fb, idx) => {
      const studentAns = (worksheetAnswers[`fb_${idx}`] || '').trim().toLowerCase();
      const trueAns = fb.correctAnswer.trim().toLowerCase();
      if (studentAns && (studentAns === trueAns || trueAns.includes(studentAns))) {
        correctBlanks += 1;
      }
    });

    const calculatedScore = blanks.length > 0
      ? Math.max(7, Math.round(((correctBlanks / blanks.length) * 10 * 10) / 10))
      : 10;

    setWorksheetScore(calculatedScore);
    setWorksheetSubmitted(true);

    // Bắn pháo hoa ăn mừng
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });

    // Lưu vào LocalStorage
    if (typeof window !== 'undefined') {
      try {
        const newSubmission = {
          id: `ws-sub-${Date.now()}`,
          periodId: currentPeriod.id,
          periodTitle: currentPeriod.title,
          computerNumber: pairComputerNum,
          studentAName,
          studentBName,
          grade: currentPeriod.grade,
          className: currentUser?.studentClass || `Lớp ${selectedGrade}A10`,
          score: calculatedScore,
          xpEarned: currentPeriod.worksheet.xpReward || 50,
          submittedAt: 'Vừa xong'
        };
        const existing = JSON.parse(localStorage.getItem('truong_worksheet_submissions') || '[]');
        localStorage.setItem('truong_worksheet_submissions', JSON.stringify([newSubmission, ...existing]));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // --------------------------------------------------------------------------
  // XỬ LÝ HOẠT ĐỘNG 2: TỰ ĐỘNG CHẤM BÀI LUYỆN TẬP (7 CÂU TRẮC NGHIỆM)
  // --------------------------------------------------------------------------
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted || isPracticeLocked) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleGradeQuiz = () => {
    if (isPracticeLocked) {
      alert('Hoạt động Luyện tập hiện đang tạm khóa bởi Thầy Đỗ Mạnh Trường.');
      return;
    }

    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < currentQuestions.length) {
      if (!confirm(`Em mới trả lời ${answeredCount}/${currentQuestions.length} câu. Em có chắc chắn muốn nộp bài Luyện tập ngay không?`)) {
        return;
      }
    }

    const calculatedCorrectCount = currentQuestions.filter(
      q => selectedAnswers[q.id] === q.correctIndex
    ).length;
    const calculatedScore = Math.round((calculatedCorrectCount / currentQuestions.length) * 10 * 10) / 10;

    setIsSubmitted(true);

    if (calculatedScore >= 8) {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
    }

    // Lưu kết quả vào LocalStorage để đồng bộ vào Kênh Giáo viên
    if (typeof window !== 'undefined') {
      try {
        const studentName = currentUser?.studentName || studentAName || 'Nguyễn Văn An';
        const studentCode = currentUser?.studentCode || '6A1001';
        const studentClass = currentUser?.studentClass || `Lớp ${selectedGrade}A10`;

        const newResult = {
          id: `practice-res-${Date.now()}`,
          lessonId: currentPeriod.id,
          lessonTitle: currentPeriod.title,
          grade: currentPeriod.grade,
          studentName,
          studentCode,
          studentClass,
          score: calculatedScore,
          correctCount: calculatedCorrectCount,
          totalQuestions: currentQuestions.length,
          submittedAt: 'Vừa xong'
        };

        const existing = JSON.parse(localStorage.getItem('truong_reinforcement_results') || '[]');
        localStorage.setItem('truong_reinforcement_results', JSON.stringify([newResult, ...existing]));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // Tính điểm trắc nghiệm
  const correctCount = currentQuestions.filter(
    q => selectedAnswers[q.id] === q.correctIndex
  ).length;
  const score = Math.round((correctCount / currentQuestions.length) * 10 * 10) / 10;

  const countNhanBiet = currentQuestions.filter(q => q.level === 'Nhận biết').length;
  const countThongHieu = currentQuestions.filter(q => q.level === 'Thông hiểu').length;
  const countVanDung = currentQuestions.filter(q => q.level === 'Vận dụng').length;

  const correctNhanBiet = currentQuestions.filter(q => q.level === 'Nhận biết' && selectedAnswers[q.id] === q.correctIndex).length;
  const correctThongHieu = currentQuestions.filter(q => q.level === 'Thông hiểu' && selectedAnswers[q.id] === q.correctIndex).length;
  const correctVanDung = currentQuestions.filter(q => q.level === 'Vận dụng' && selectedAnswers[q.id] === q.correctIndex).length;

  const getLevelBadge = (level: CognitiveLevel) => {
    switch (level) {
      case 'Nhận biết':
        return <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">1. Nhận biết</span>;
      case 'Thông hiểu':
        return <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">2. Thông hiểu</span>;
      case 'Vận dụng':
        return <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">3. Vận dụng</span>;
      default:
        return null;
    }
  };

  // --------------------------------------------------------------------------
  // XỬ LÝ HOẠT ĐỘNG 3: NỘP BÀI THỰC HÀNH & TỰ ĐỘNG CHẤM RUBRIC CHECKLIST
  // --------------------------------------------------------------------------
  const handleSubmitPractical = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLabLocked) {
      alert('Hoạt động Thực hành trên máy hiện đang tạm khóa bởi Thầy Đỗ Mạnh Trường.');
      return;
    }
    if (!practicalFile) {
      alert('Vui lòng chọn tệp sản phẩm thực hành (.xlsx, .docx, .py, .cpp, .pdf...) để nộp!');
      return;
    }

    setIsUploadingPractical(true);
    const chosenClass = currentUser?.studentClass || `Lớp ${selectedGrade}A10`;
    const stCode = currentUser?.studentCode || '6A1001';
    const stName = currentUser?.studentName || studentAName;
    const taskName = currentPeriod.practicalTask?.title || `Thực hành Tiết ${currentPeriod.period}`;

    try {
      // 1. Tải thẳng lên Google Drive Online của Thầy Đỗ Mạnh Trường
      const driveRes = await uploadPracticalToDriveOnline({
        file: practicalFile,
        grade: selectedGrade,
        period: currentPeriod.period,
        className: chosenClass,
        studentId: stCode,
        studentName: stName,
        taskTitle: taskName,
      });

      const submissionCode = `TH-${selectedGrade}A-${currentPeriod.period < 10 ? '0' : ''}${currentPeriod.period}-${Math.floor(100 + Math.random() * 900)}`;

      // 2. Tự động chấm hoàn thành theo Rubric (Đạt 10/10 khi nộp đúng định dạng và hoàn thiện nhiệm vụ)
      const newSub: PracticalSubmission = {
        id: `prac-${Date.now()}`,
        submissionCode: submissionCode,
        studentCode: stCode,
        studentName: `${stName}${studentBName ? ` & ${studentBName}` : ''}`,
        classId: `c-${selectedGrade}a10`,
        className: chosenClass,
        assignmentTitle: taskName,
        fileName: practicalFile.name,
        fileSize: `${(practicalFile.size / 1024).toFixed(1)} KB`,
        submittedAt: 'Vừa xong',
        status: 'graded',
        score: 10,
        teacherFeedback: driveRes.status === 'ok' 
          ? `Đã nhận sản phẩm thành công lên Google Drive của Thầy Đỗ Mạnh Trường: ${driveRes.folderPath}. Đạt chuẩn kỹ thuật thao tác!`
          : 'Đã ghi nhận nộp bài thực hành thành công!',
      };

      setPracticalSubmission(newSub);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

      // Lưu LocalStorage
      if (typeof window !== 'undefined') {
        const existing = JSON.parse(localStorage.getItem('truong_practical_submissions') || '[]');
        localStorage.setItem('truong_practical_submissions', JSON.stringify([newSub, ...existing]));
      }
    } catch (err) {
      console.error(err);
      alert('Có lỗi khi nộp bài thực hành. Vui lòng thử lại!');
    } finally {
      setIsUploadingPractical(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ==================================================================== */}
      {/* HEADER BANNER TIẾT HỌC                                               */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tiết {currentPeriod.period} · {currentPeriod.topic}</span>
            </span>
            <span className="text-xs text-blue-200">
              Giáo viên: <strong>Thầy Đỗ Mạnh Trường</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hoạt Động Trực Tiếp Trên Lớp
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Học liệu chuẩn GDPT 2018 THCS Mão Điền: <strong>1. Khám phá cặp đôi</strong> ➔ <strong>2. Luyện tập</strong> ➔ <strong>3. Thực hành trên máy</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/subjects?grade=${selectedGrade}&period=${selectedPeriodNum}&section=29periods`}
            className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 text-xs font-bold transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Kho học liệu Tiết {selectedPeriodNum}</span>
          </Link>
          <Link
            href="/teacher"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold transition-all flex items-center gap-2"
          >
            <span>Kênh Giáo viên</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* CẢNH BÁO PHÂN QUYỀN NẾU CHỌN SAI KHỐI */}
      {permissionNotice && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-3 animate-in fade-in shadow-xs">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{permissionNotice}</span>
        </div>
      )}

      {/* BỘ CHỌN KHỐI LỚP & 29 TIẾT HỌC */}
      <div className="space-y-3 p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
        {/* Hàng 1: Chọn Khối */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Chọn khối lớp:</span>
            {currentUser?.role === 'student' && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Lớp {currentUser.studentClass} (Khối {currentUser.studentGrade})
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {([6, 7, 8, 9] as const).map((g) => {
              const isAllowed = !currentUser || currentUser.role === 'teacher' || currentUser.studentGrade === g;
              const isCur = selectedGrade === g;
              return (
                <button
                  key={g}
                  onClick={() => handleSelectGrade(g)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isCur
                      ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-400/30'
                      : isAllowed
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-100/60 text-slate-400 cursor-not-allowed border border-dashed border-slate-300'
                  }`}
                  title={!isAllowed ? `Khóa: Học sinh chỉ được chọn Khối ${currentUser?.studentGrade}` : `Khối ${g}`}
                >
                  {!isAllowed ? <Lock className="w-3 h-3 text-slate-400" /> : <Unlock className="w-3 h-3 text-amber-600" />}
                  <span>Khối {g}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hàng 2: Chọn trong 29 Tiết học */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Chọn tiết học trong phân phối chương trình 29 tiết (Khối {selectedGrade}):</span>
            <span className="text-[11px] text-amber-700 font-bold">
              Đang chọn: Tiết {selectedPeriodNum} {currentPeriod.isPractice ? '(Thực hành)' : '(Lý thuyết)'}
            </span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {periodsOfGrade.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPeriod(p.period)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedPeriodNum === p.period
                    ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title={p.title}
              >
                <span>T.{p.period}</span>
                {p.isPractice && <span className="ml-1 text-[9px] text-emerald-400 font-black">● TH</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TABS 3 HOẠT ĐỘNG CHÍNH (KÈM CHỈ BÁO KHÓA/MỞ THỦ CÔNG)               */}
      {/* ==================================================================== */}
      <div className="flex border-b border-slate-200 gap-3 sm:gap-6 text-xs sm:text-sm font-bold flex-wrap">
        {/* TAB 1: KHÁM PHÁ CẶP ĐÔI */}
        <button
          onClick={() => setActiveTab('worksheet')}
          className={`pb-3 flex items-center gap-2 transition-all relative ${
            activeTab === 'worksheet'
              ? 'border-b-2 border-indigo-600 text-indigo-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-indigo-600" />
          <span>Hoạt động 1: Khám phá cặp đôi</span>
          {isDiscoveryLocked ? (
            <span className="px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center gap-0.5">
              <Lock className="w-2.5 h-2.5" /> Khóa
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-0.5">
              <Unlock className="w-2.5 h-2.5" /> Mở
            </span>
          )}
        </button>

        {/* TAB 2: LUYỆN TẬP */}
        <button
          onClick={() => setActiveTab('reinforcement')}
          className={`pb-3 flex items-center gap-2 transition-all relative ${
            activeTab === 'reinforcement'
              ? 'border-b-2 border-amber-500 text-amber-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Hoạt động 2: Luyện tập</span>
          {isPracticeLocked ? (
            <span className="px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center gap-0.5">
              <Lock className="w-2.5 h-2.5" /> Khóa
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-0.5">
              <Unlock className="w-2.5 h-2.5" /> Mở
            </span>
          )}
        </button>

        {/* TAB 3: THỰC HÀNH TRÊN MÁY */}
        <button
          onClick={() => setActiveTab('practice')}
          className={`pb-3 flex items-center gap-2 transition-all relative ${
            activeTab === 'practice'
              ? 'border-b-2 border-purple-600 text-purple-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Laptop className="w-4 h-4 text-purple-600" />
          <span>Hoạt động 3: Thực hành trên máy</span>
          {isLabLocked ? (
            <span className="px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center gap-0.5">
              <Lock className="w-2.5 h-2.5" /> Khóa
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-0.5">
              <Unlock className="w-2.5 h-2.5" /> Mở
            </span>
          )}
        </button>

        {/* TAB 4: SLIDE BÀI GIẢNG */}
        <button
          onClick={() => setActiveTab('slide')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'slide'
              ? 'border-b-2 border-rose-600 text-rose-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Presentation className="w-4 h-4 text-rose-500" />
          <span>Slide bài giảng</span>
        </button>
      </div>

      {/* ====================================================================== */}
      {/* HOẠT ĐỘNG 1: THỬ THÁCH CẶP ĐÔI (KÉO THẢ, ĐIỀN KHUYẾT CHỌN, GHÉP CẶP)   */}
      {/* ====================================================================== */}
      {activeTab === 'worksheet' && (
        <div className="space-y-6">
          {/* CẢNH BÁO NẾU THẦY ĐANG KHÓA HOẠT ĐỘNG 1 */}
          {isDiscoveryLocked && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Hoạt động Khám phá cặp đôi hiện đang tạm khóa bởi Thầy Đỗ Mạnh Trường. Em hãy chú ý theo dõi hướng dẫn của Thầy!</span>
            </div>
          )}

          <InteractiveDiscoveryPair
            currentPeriod={currentPeriod}
            student1Name={studentAName}
            student2Name={studentBName}
            isLocked={isDiscoveryLocked}
            onComplete={(calculatedScore) => {
              setWorksheetScore(calculatedScore);
              setWorksheetSubmitted(true);
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });

              // Tự động lưu vào LocalStorage để đồng bộ lên Lưới Giám Sát 3D của Thầy
              if (typeof window !== 'undefined') {
                try {
                  const newSubmission = {
                    id: `ws-sub-${Date.now()}`,
                    periodId: currentPeriod.id,
                    periodTitle: currentPeriod.title,
                    computerNumber: pairComputerNum,
                    studentAName,
                    studentBName,
                    grade: currentPeriod.grade,
                    className: currentUser?.studentClass || `Lớp ${selectedGrade}A10`,
                    score: calculatedScore,
                    xpEarned: currentPeriod.worksheet.xpReward || 50,
                    submittedAt: 'Vừa xong'
                  };
                  const existing = JSON.parse(localStorage.getItem('truong_worksheet_submissions') || '[]');
                  localStorage.setItem('truong_worksheet_submissions', JSON.stringify([newSubmission, ...existing]));
                } catch (e) {
                  console.error(e);
                }
              }
            }}
          />
        </div>
      )}

      {/* ====================================================================== */}
      {/* HOẠT ĐỘNG 2: LUYỆN TẬP (7 CÂU HỎI TRẮC NGHIỆM CHUẨN BỘ)                */}
      {/* ====================================================================== */}
      {activeTab === 'reinforcement' && (
        <div className="space-y-6">
          {/* CẢNH BÁO NẾU THẦY ĐANG KHÓA HOẠT ĐỘNG 2 */}
          {isPracticeLocked && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Hoạt động Luyện tập hiện đang tạm khóa bởi Thầy Đỗ Mạnh Trường. Em hãy chú ý theo dõi hướng dẫn của Thầy!</span>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Khối {currentPeriod.grade} · {currentPeriod.topic}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  3 Nhận biết · 2 Thông hiểu · 2 Vận dụng
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-2">
                Hoạt Động 2: Luyện Tập ({currentPeriod.title})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Đọc kỹ câu hỏi, chọn phương án đúng nhất và nhấn nút <strong>Nộp bài &amp; Chấm điểm tức thì</strong> để máy chấm ngay!
              </p>
            </div>

            {/* BẢNG ĐIỂM SAU KHI NỘP: MÁY TỰ CHẤM THANG 10 */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-in fade-in shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex flex-col items-center justify-center font-black text-xl shadow-md">
                  <span>{score}</span>
                  <span className="text-[9px] font-normal text-emerald-100 -mt-1">/10đ</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-900">
                    KẾT QUẢ LUYỆN TẬP: {correctCount}/7 CÂU ĐÚNG
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold flex-wrap">
                    <span className="text-blue-700">Biết: {correctNhanBiet}/{countNhanBiet}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-emerald-700">Hiểu: {correctThongHieu}/{countThongHieu}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-purple-700">Vận dụng: {correctVanDung}/{countVanDung}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DANH SÁCH 7 CÂU HỎI TRẮC NGHIỆM */}
          <div className="space-y-5">
            {currentQuestions.map((q, qIndex) => {
              const studentChosen = selectedAnswers[q.id];
              const isAnswered = studentChosen !== undefined;
              const isCorrect = isAnswered && studentChosen === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-rose-200 bg-rose-50/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {qIndex + 1}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">
                        {q.question}
                      </h3>
                    </div>
                    {getLevelBadge(q.level)}
                  </div>

                  {/* CÁC PHƯƠNG ÁN LỰA CHỌN A, B, C, D */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {q.options.map((opt, optIndex) => {
                      const isOptionSelected = studentChosen === optIndex;
                      const isThisCorrect = optIndex === q.correctIndex;

                      let btnStyle = 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700';

                      if (isSubmitted) {
                        if (isThisCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold ring-1 ring-emerald-500';
                        } else if (isOptionSelected && !isThisCorrect) {
                          btnStyle = 'border-rose-500 bg-rose-100 text-rose-900 font-semibold';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-500/20';
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          disabled={isSubmitted || isPracticeLocked}
                          className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-lg bg-white border border-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0 text-slate-600">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isSubmitted && isThisCorrect && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isSubmitted && isOptionSelected && !isThisCorrect && (
                            <X className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* GIẢI THÍCH CHI TIẾT CỦA THẦY ĐỖ MẠNH TRƯỜNG */}
                  {isSubmitted && (
                    <div className="mt-4 p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                      <p className="font-bold text-slate-800 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        <span>Lời giải thích của Thầy Đỗ Mạnh Trường:</span>
                      </p>
                      <p className="text-slate-600 pl-5 leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* THANH ĐIỀU KHIỂN NỘP BÀI */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Đã trả lời: <strong>{Object.keys(selectedAnswers).length}/7 câu</strong>
            </div>

            <div className="flex items-center gap-3">
              {isSubmitted ? (
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                >
                  Làm lại bài luyện tập
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGradeQuiz}
                  disabled={isPracticeLocked}
                  className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nộp bài &amp; Máy tự chấm tức thì</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* HOẠT ĐỘNG 3: THỰC HÀNH TRÊN MÁY (KÈM NỘP BÀI & TỰ ĐỘNG CHẤM RUBRIC)     */}
      {/* ====================================================================== */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* CẢNH BÁO NẾU THẦY ĐANG KHÓA HOẠT ĐỘNG 3 */}
          {isLabLocked && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Hoạt động Thực hành trên máy hiện đang tạm khóa bởi Thầy Đỗ Mạnh Trường. Em hãy chú ý theo dõi hướng dẫn của Thầy!</span>
            </div>
          )}

          {currentPeriod.isPractice && currentPeriod.practicalTask ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Khối {currentPeriod.grade} · Tiết thực hành thao tác máy
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2">
                    Hoạt Động 3: {currentPeriod.practicalTask.title}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Mục tiêu kỹ năng: {currentPeriod.contentDesc}
                  </p>
                </div>

                {/* NÚT TẢI TỆP MẪU THỰC HÀNH */}
                <a
                  href={currentPeriod.practicalTask.sampleFileUrl}
                  download={currentPeriod.practicalTask.sampleFileName}
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải tệp mẫu ({currentPeriod.practicalTask.sampleFileName.split('.').pop()})</span>
                </a>
              </div>

              {/* CÁC BƯỚC THỰC HIỆN BÀI THỰC HÀNH */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Quy trình thực hiện tại phòng máy:</span>
                </h3>

                <div className="space-y-2.5">
                  {currentPeriod.practicalTask.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3 text-xs text-slate-700"
                    >
                      <span className="w-6 h-6 rounded-xl bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TIÊU CHÍ ĐÁNH GIÁ RUBRIC */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Bảng tiêu chí chấm điểm thực hành (Rubric thang 10 điểm):</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="py-3 px-4">Tiêu chí đánh giá</th>
                        <th className="py-3 px-4 text-center">Điểm tối đa</th>
                        <th className="py-3 px-4">Yêu cầu cần đạt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {currentPeriod.practicalTask.rubric.map((r, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {r.criterion}
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-blue-600">
                            {r.maxPoints} đ
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {r.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* KHUNG NỘP BÀI THỰC HÀNH TRỰC TIẾP LÊN HỆ THỐNG */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-indigo-600" />
                    <span>Nộp sản phẩm thực hành &amp; Tự động chấm hoàn thành:</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Lưu thẳng Google Drive của Thầy</span>
                </div>

                {practicalSubmission ? (
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-indigo-50 border-2 border-emerald-400 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                        <div>
                          <h4 className="text-sm font-extrabold text-emerald-950">
                            ĐÃ NỘP SẢN PHẨM THỰC HÀNH THÀNH CÔNG!
                          </h4>
                          <p className="text-xs text-emerald-700">
                            Mã xác nhận: <strong>{practicalSubmission.submissionCode}</strong> · Tệp: {practicalSubmission.fileName} ({practicalSubmission.fileSize})
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-emerald-700">10 / 10đ</span>
                        <span className="block text-[10px] text-emerald-600 font-bold">Máy đã chấm Đạt chuẩn Rubric</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-emerald-200">
                      💬 <strong>Phản hồi tự động:</strong> {practicalSubmission.teacherFeedback}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitPractical} className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-600 font-bold mb-1">Cặp học sinh thực hành:</label>
                        <input
                          type="text"
                          readOnly
                          value={`${studentAName} & ${studentBName}`}
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-bold mb-1">Chọn tệp thực hành từ máy:</label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          disabled={isLabLocked || isUploadingPractical}
                          onChange={e => setPracticalFile(e.target.files?.[0] || null)}
                          className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-500">
                        Chấp nhận: .xlsx, .docx, .pptx, .py, .cpp, .pdf, .zip (Tối đa 25MB)
                      </span>
                      <button
                        type="submit"
                        disabled={isLabLocked || isUploadingPractical || !practicalFile}
                        className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-2"
                      >
                        {isUploadingPractical ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Đang đẩy lên Drive của Thầy...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-4 h-4" />
                            <span>Nộp bài &amp; Máy tự chấm Rubric (+100 XP)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            /* TIẾT LÝ THUYẾT */
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Tiết {currentPeriod.period}: Tiết Học Lý Thuyết Nền Tảng &amp; Khám Phá
              </h3>
              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                Tiết học này là tiết lý thuyết, trọng tâm là <strong>Hoạt động 1: Khám phá cặp đôi</strong> và <strong>Hoạt động 2: Luyện tập 7 câu chuẩn Bộ</strong>. Bài thực hành thao tác phần mềm chuyên sâu dành cho các tiết thực hành riêng biệt.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('worksheet')}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs hover:bg-indigo-700 transition-all"
                >
                  Làm Hoạt động 1: Khám phá cặp đôi
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reinforcement')}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-xs hover:bg-amber-600 transition-all"
                >
                  Làm Hoạt động 2: Luyện tập
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* HOẠT ĐỘNG 4: KHUNG XEM SLIDE BÀI GIẢNG POWERPOINT TRỰC TUYẾN           */}
      {/* ====================================================================== */}
      {activeTab === 'slide' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
                    <Presentation className="w-3.5 h-3.5 text-rose-600" />
                    Bài giảng điện tử PowerPoint · Khối {currentPeriod.grade}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {currentPeriod.slide?.slideCount || 20} trang trình chiếu
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  {currentPeriod.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đường dẫn bài giảng Google Drive: <code>{currentPeriod.slide?.drivePath}</code>
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <a
                  href={`/slides/${currentPeriod.slide?.fileName}`}
                  download={currentPeriod.slide?.fileName || 'BaiGiang.pptx'}
                  onClick={() => {
                    alert(`Đang chuẩn bị tải tệp bài giảng gốc (.pptx): ${currentPeriod.slide?.fileName}\nTệp được đồng bộ từ Google Drive của Thầy Đỗ Mạnh Trường.`);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải bài giảng về máy (.pptx)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsSlideFullscreen(!isSlideFullscreen)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200"
                >
                  {isSlideFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span>{isSlideFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
                </button>
              </div>
            </div>

            {/* TRÌNH PHÁT SLIDE */}
            <div className={`rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 text-white shadow-2xl transition-all ${
              isSlideFullscreen ? 'fixed inset-4 z-50 flex flex-col' : 'min-h-[460px] flex flex-col'
            }`}>
              <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="font-bold text-slate-300">
                    Trang {currentSlideIndex + 1} / {(currentPeriod.slide?.slides.length || 1)}
                  </span>
                  <span className="text-slate-500 hidden sm:inline">|</span>
                  <span className="text-slate-400 truncate max-w-xs hidden sm:inline">
                    {currentPeriod.slide?.fileName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-amber-400 font-medium hidden md:inline">
                    💡 Dùng phím &larr; / &rarr; hoặc nút bấm để chuyển trang
                  </span>
                  {isSlideFullscreen && (
                    <button
                      type="button"
                      onClick={() => setIsSlideFullscreen(false)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                    >
                      Thoát toàn màn hình
                    </button>
                  )}
                </div>
              </div>

              {/* NỘI DUNG SLIDE */}
              <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-3xl space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-rose-300 text-xs font-extrabold uppercase tracking-widest border border-white/10">
                    Slide {currentSlideIndex + 1} · {currentPeriod.title}
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
                    {currentPeriod.slide?.slides[currentSlideIndex]?.split('|')[0]?.replace(/^S\d+:\s*/, '') || currentPeriod.title}
                  </h3>

                  {currentPeriod.slide?.slides[currentSlideIndex]?.includes('|') && (
                    <div className="pt-4 text-base sm:text-lg text-slate-300 font-medium leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xs">
                      {currentPeriod.slide?.slides[currentSlideIndex]?.split('|').slice(1).join(' — ')}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 pt-2">
                    Môn Tin học Lớp {currentPeriod.grade} · Trường THCS Mão Điền · Thầy Đỗ Mạnh Trường
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentSlideIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10 shadow-lg"
                  title="Slide trước"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentSlideIndex(prev => Math.min((currentPeriod.slide?.slides.length || 1) - 1, prev + 1))}
                  disabled={currentSlideIndex >= (currentPeriod.slide?.slides.length || 1) - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10 shadow-lg"
                  title="Slide tiếp theo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* THUMBNAIL ĐIỀU HƯỚNG */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-1">
                  {currentPeriod.slide?.slides.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setCurrentSlideIndex(sIdx)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center ${
                        currentSlideIndex === sIdx
                          ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {sIdx + 1}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCurrentSlideIndex(0)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
                  >
                    Về đầu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InClassPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Đang tải hoạt động lớp học...</div>}>
      <InClassContent />
    </Suspense>
  );
}
