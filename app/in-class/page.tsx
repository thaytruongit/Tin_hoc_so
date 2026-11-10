'use client';

import { useState, useEffect, Suspense } from 'react';
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
  Filter,
  CheckCheck,
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
  FolderOpen
} from 'lucide-react';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { CURRICULUM_DATA, CurriculumPeriod } from '@/lib/curriculum-data';
import { Lock, Unlock, ShieldAlert } from 'lucide-react';
import { CognitiveLevel } from '@/lib/types';

function InClassContent() {
  const searchParams = useSearchParams();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [selectedPeriodNum, setSelectedPeriodNum] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'worksheet' | 'reinforcement' | 'practice' | 'slide'>('worksheet');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isSlideFullscreen, setIsSlideFullscreen] = useState<boolean>(false);
  const [permissionNotice, setPermissionNotice] = useState<string>('');

  // Trạng thái Phiếu học tập Cặp đôi
  const [pairComputerNum, setPairComputerNum] = useState<string>('Máy 08 - Phòng Tin học 1');
  const [studentAName, setStudentAName] = useState<string>('Nguyễn Văn An');
  const [studentBName, setStudentBName] = useState<string>('Trần Thị Mai');
  const [currentRoleTurn, setCurrentRoleTurn] = useState<'A' | 'B'>('A'); // A: Bạn A cầm chuột, B: Bạn B cầm chuột
  const [worksheetAnswers, setWorksheetAnswers] = useState<Record<string, string>>({});
  const [worksheetSubmitted, setWorksheetSubmitted] = useState<boolean>(false);
  const [showRoleSwapModal, setShowRoleSwapModal] = useState<boolean>(false);

  // Trạng thái làm bài Luyện tập (7 câu trắc nghiệm)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Lấy dữ liệu 29 tiết của khối đang chọn
  const periodsOfGrade = CURRICULUM_DATA[selectedGrade] || [];
  const currentPeriod = periodsOfGrade.find(p => p.period === selectedPeriodNum) || periodsOfGrade[0];
  const currentQuestions = currentPeriod.reinforcement.questions;

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
      setPermissionNotice(`Tài khoản của em thuộc ${currentUser.studentClass || 'Khối ' + currentUser.studentGrade}. Theo quy định phân quyền, em chỉ được làm bài của Khối ${currentUser.studentGrade}!`);
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
    setCurrentRoleTurn('A');
  };

  const handleSelectPeriod = (periodNum: number) => {
    setSelectedPeriodNum(periodNum);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setWorksheetAnswers({});
    setWorksheetSubmitted(false);
    setCurrentRoleTurn('A');
    setCurrentSlideIndex(0);
  };

  // Xử lý Luyện tập 7 câu
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleGradeQuiz = () => {
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

    setIsSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // Xử lý Phiếu học tập Cặp đôi
  const handleSwapRole = () => {
    setCurrentRoleTurn(prev => (prev === 'A' ? 'B' : 'A'));
    setShowRoleSwapModal(true);
    setTimeout(() => setShowRoleSwapModal(false), 3000);
  };

  const handleSubmitWorksheet = () => {
    if (worksheetSubmitted) return;
    setWorksheetSubmitted(true);

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
          score: 10,
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
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Học Liệu Số 29 Tiết Chuẩn GDPT 2018 · THCS Mão Điền
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hoạt Động Trực Tiếp Trên Lớp
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Chất liệu hữu cơ 100% bám sát SGK Kết nối tri thức: <strong>Phiếu học tập cặp đôi</strong>, <strong>Luyện tập 7 câu chuẩn Bộ</strong> và <strong>Bài tập thực hành</strong> theo Rubric.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/subjects?grade=${selectedGrade}&period=${selectedPeriodNum}&section=29periods`}
            className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 text-xs font-bold transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Kho học liệu & Tệp Tiết {selectedPeriodNum}</span>
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

      {/* CẢNH BÁO PHÂN QUYỀN NẾU HỌC SINH CHỌN SAI KHỐI */}
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
            <span className="text-[11px] text-amber-700 font-bold">Đang chọn: Tiết {selectedPeriodNum} {currentPeriod.isPractice ? '(Thực hành)' : '(Lý thuyết)'}</span>
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

      {/* TABS 3 HOẠT ĐỘNG TRỰC TIẾP TRÊN LỚP */}
      <div className="flex border-b border-slate-200 gap-4 sm:gap-8 text-sm font-bold flex-wrap">
        <button
          onClick={() => setActiveTab('worksheet')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'worksheet'
              ? 'border-b-2 border-indigo-600 text-indigo-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-indigo-600" />
          <span>1. Phiếu học tập (Khám phá cặp đôi)</span>
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
          <span>2. Luyện tập (7 câu chuẩn Bộ)</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'practice'
              ? 'border-b-2 border-emerald-600 text-emerald-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
          <span>3. Bài tập thực hành {currentPeriod.isPractice ? '(Có bài thực hành)' : '(Chỉ tiết TH)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('slide')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'slide'
              ? 'border-b-2 border-rose-600 text-rose-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Presentation className="w-4 h-4 text-rose-500" />
          <span>4. Slide bài giảng PowerPoint ({currentPeriod.slide?.slideCount || 20} trang)</span>
        </button>
      </div>

      {/* ====================================================================== */}
      {/* HOẠT ĐỘNG 1: PHIẾU HỌC TẬP KHÁM PHÁ CẶP ĐÔI (2 HS/MÁY)                  */}
      {/* ====================================================================== */}
      {activeTab === 'worksheet' && (
        <div className="space-y-6">
          {/* HEADER PHIẾU CẶP ĐÔI */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Khối {currentPeriod.grade} · Tiết {currentPeriod.period}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Cặp đôi 2 học sinh / 1 máy tính
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    +{currentPeriod.worksheet.xpReward || 50} XP chia đều
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  {currentPeriod.worksheet.title}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Mục tiêu: {currentPeriod.contentDesc}
                </p>
              </div>

              {/* TRẠNG THÁI NỘP BÀI CẶP ĐÔI */}
              {worksheetSubmitted && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-3 text-emerald-800 animate-in fade-in shrink-0">
                  <Trophy className="w-8 h-8 text-amber-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-900">HOÀN THÀNH PHIẾU CẶP ĐÔI!</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">+50 XP đã cộng vào tài khoản {studentAName} &amp; {studentBName}</div>
                  </div>
                </div>
              )}
            </div>

            {/* KHUNG THÔNG TIN PHÂN VAI CẶP ĐÔI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Vị trí phòng máy:</span>
                <input
                  type="text"
                  value={pairComputerNum}
                  onChange={e => setPairComputerNum(e.target.value)}
                  disabled={worksheetSubmitted}
                  className="mt-1 w-full p-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-800"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Học sinh 1 (Bạn A):</span>
                  {currentRoleTurn === 'A' && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px]">Đang thao tác máy 🖱️</span>
                  )}
                </div>
                <input
                  type="text"
                  value={studentAName}
                  onChange={e => setStudentAName(e.target.value)}
                  disabled={worksheetSubmitted}
                  className="mt-1 w-full p-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-800"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Học sinh 2 (Bạn B):</span>
                  {currentRoleTurn === 'B' && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">Đang thao tác máy 🖱️</span>
                  )}
                </div>
                <input
                  type="text"
                  value={studentBName}
                  onChange={e => setStudentBName(e.target.value)}
                  disabled={worksheetSubmitted}
                  className="mt-1 w-full p-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-800"
                />
              </div>
            </div>

            {/* NÚT TÍN HIỆU ĐỔI VAI */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500">
                Lượt điều khiển: <strong>{currentRoleTurn === 'A' ? studentAName : studentBName}</strong> đang cầm chuột và bàn phím.
              </span>
              <button
                type="button"
                onClick={handleSwapRole}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>🔔 Tín hiệu Chuông Đổi Vai (Hoán đổi vị trí)</span>
              </button>
            </div>
          </div>

          {/* POPUP THÔNG BÁO ĐỔI VAI */}
          {showRoleSwapModal && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-900 text-xs font-bold flex items-center gap-3 animate-in bounce-in shadow-md">
              <Repeat className="w-6 h-6 text-amber-600 animate-spin" />
              <div>
                <div className="text-sm font-black">🔔 ĐÃ PHÁT TÍN HIỆU ĐỔI VAI!</div>
                <div>Hai bạn hãy hoán đổi vị trí chuột và bàn phím cho nhau để cùng đóng góp nhé!</div>
              </div>
            </div>
          )}

          {/* CHẶNG 1: THÁM TỬ TÌM KIẾM (TÌNH HUỐNG DẪN NHẬP & KHO TỪ) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-bold text-sm text-slate-900">
                Chặng 1: Thám tử Dữ liệu &amp; Tình huống khởi động ({currentRoleTurn === 'A' ? `${studentAName} thao tác` : `${studentBName} thao tác`})
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 space-y-2">
              <p className="font-bold text-blue-900">Tình huống khám phá tại trường THCS Mão Điền:</p>
              <p className="leading-relaxed">{currentPeriod.worksheet.phase1_khoi_dong}</p>
            </div>

            {/* NGÂN HÀNG TỪ KHÓA SGK */}
            {currentPeriod.worksheet.wordBank && currentPeriod.worksheet.wordBank.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700">Kho thẻ từ khóa bám sát SGK bài học:</span>
                <div className="flex flex-wrap gap-2">
                  {currentPeriod.worksheet.wordBank.map((w, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CHẶNG 2: ĐIỀN KHUYẾT & NỐI CẶP KIẾN THỨC CỐT LÕI */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-sm text-slate-900">
                Chặng 2: Nối Cặp Kiến Thức &amp; Điền Khuyết SGK ({currentRoleTurn === 'B' ? `${studentBName} thao tác` : `${studentAName} thao tác`})
              </h3>
            </div>

            {/* DANH SÁCH ĐIỀN KHUYẾT */}
            {currentPeriod.worksheet.fillBlanks && currentPeriod.worksheet.fillBlanks.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700">Điền từ thích hợp vào chỗ trống:</span>
                {currentPeriod.worksheet.fillBlanks.map((fb, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <p className="text-slate-800 leading-relaxed font-medium">
                      <strong>Câu {idx + 1}:</strong> {fb.statement}
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Gõ từ khóa còn thiếu..."
                        disabled={worksheetSubmitted}
                        value={worksheetAnswers[`fb_${idx}`] || ''}
                        onChange={e => setWorksheetAnswers(prev => ({ ...prev, [`fb_${idx}`]: e.target.value }))}
                        className="p-2.5 rounded-xl bg-white border border-slate-300 text-xs w-full max-w-sm font-semibold"
                      />
                      {worksheetSubmitted && (
                        <span className="text-emerald-700 font-bold">
                          Đáp án đúng: {fb.correctAnswer}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* DANH SÁCH NỐI CẶP */}
            {currentPeriod.worksheet.matchingPairs && currentPeriod.worksheet.matchingPairs.length > 0 && (
              <div className="space-y-3 pt-3">
                <span className="text-xs font-bold text-slate-700">Nối cặp khái niệm với giải thích tương ứng:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentPeriod.worksheet.matchingPairs.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-1.5 text-xs">
                      <div className="font-bold text-indigo-900 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-lg bg-indigo-200 text-indigo-800 text-[10px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{m.left}</span>
                      </div>
                      <p className="text-slate-600 pl-7 leading-relaxed">{m.right}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CHẶNG 3: ĐỒNG LÒNG TÁC CHIẾN & NỘP BÀI */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-sm text-slate-900">
                Chặng 3: Thảo Luận Cặp Đôi &amp; Đồng Lòng Nộp Bài (Cả hai bạn cùng phối hợp)
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <p className="font-bold text-slate-800">Câu hỏi thảo luận cặp đôi:</p>
              <p className="text-slate-600 leading-relaxed">
                {currentPeriod.worksheet.discussionPrompt || currentPeriod.worksheet.phase4_van_dung}
              </p>
              <textarea
                rows={3}
                placeholder="Hai bạn cùng bàn bạc và ghi lại kết luận chung của cặp đôi vào đây..."
                disabled={worksheetSubmitted}
                value={worksheetAnswers['discussion'] || ''}
                onChange={e => setWorksheetAnswers(prev => ({ ...prev, discussion: e.target.value }))}
                className="w-full p-3 rounded-2xl bg-white border border-slate-300 text-xs font-normal"
              />
            </div>

            {/* NÚT NỘP PHIẾU */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                {worksheetSubmitted 
                  ? '✅ Phiếu học tập đã được lưu vào hệ thống thành công!' 
                  : 'Cả hai bạn hãy kiểm tra lại bài làm trước khi bấm nộp nhé.'}
              </span>
              {!worksheetSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitWorksheet}
                  className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Xác nhận cả hai bạn đã đồng thuận &amp; Nộp bài (+50 XP)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setWorksheetSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  Chỉnh sửa lại phiếu
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* HOẠT ĐỘNG 2: LUYỆN TẬP (7 CÂU HỎI TRẮC NGHIỆM CHUẨN BỘ)                */}
      {/* ====================================================================== */}
      {activeTab === 'reinforcement' && (
        <div className="space-y-6">
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
                Luyện Tập: {currentPeriod.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Em hãy đọc kỹ câu hỏi, chọn phương án đúng nhất và nhấn nút <strong>Nộp bài</strong> ở cuối để xem điểm số &amp; lời giải thích của Thầy Trương.
              </p>
            </div>

            {/* BẢNG ĐIỂM SAU KHI NỘP BÀI */}
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
                  <div className="flex items-center gap-2 text-[11px] font-semibold">
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
                          disabled={isSubmitted}
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

                  {/* GIẢI THÍCH CHI TIẾT SAU KHI NỘP */}
                  {isSubmitted && (
                    <div className="mt-4 p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                      <p className="font-bold text-slate-800 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        <span>Lời giải thích của Thầy Trương:</span>
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
                  onClick={handleResetQuiz}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                >
                  Làm lại bài luyện tập
                </button>
              ) : (
                <button
                  onClick={handleGradeQuiz}
                  className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nộp bài &amp; Chấm điểm tức thì</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* HOẠT ĐỘNG 3: BÀI TẬP THỰC HÀNH TẠI LỚP (CHỈ DÀNH CHO TIẾT THỰC HÀNH)    */}
      {/* ====================================================================== */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {currentPeriod.isPractice && currentPeriod.practicalTask ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Khối {currentPeriod.grade} · Tiết thực hành trên máy
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2">
                    {currentPeriod.practicalTask.title}
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

              {/* TIÊU CHÍ ĐÁNH GIÁ RUBRIC (THANG 10 ĐIỂM) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Bảng tiêu chí chấm điểm thực hành (Rubric thang điểm 10):</span>
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

              {/* NÚT ĐIỀU HƯỚNG NỘP BÀI TRỰC TIẾP */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Học sinh làm xong nộp trực tiếp lên hệ thống, không dùng USB để bảo vệ máy tính trường.</span>
                </div>

                <Link
                  href="/subjects"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Chuyển sang Cổng Nộp Bài Phòng Máy</span>
                </Link>
              </div>
            </div>
          ) : (
            /* TIẾT LÝ THUYẾT - HIỂN THỊ THÔNG BÁO SƯ PHẠM RÕ RÀNG */
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Tiết {currentPeriod.period}: Tiết Học Lý Thuyết Nền Tảng &amp; Khám Phá
              </h3>
              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                Tiết học này là tiết lý thuyết, trọng tâm là hoạt động <strong>Phiếu học tập khám phá cặp đôi</strong> và <strong>Luyện tập 7 câu chuẩn Bộ</strong>. Bài tập thực hành thao tác phần mềm chuyên sâu chỉ dành cho các tiết thực hành riêng biệt.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('worksheet')}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs hover:bg-indigo-700 transition-all"
                >
                  Làm Phiếu học tập cặp đôi
                </button>
                <button
                  onClick={() => setActiveTab('reinforcement')}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-xs hover:bg-amber-600 transition-all"
                >
                  Làm Luyện tập (7 câu)
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
            {/* Header thông tin tệp Slide */}
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
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Drive: {currentPeriod.slide?.fileName || 'Bài giảng'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  {currentPeriod.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đường dẫn tệp gốc trên Google Drive của Thầy: <code>{currentPeriod.slide?.drivePath}</code>
                </p>
              </div>

              {/* CÁC NÚT TÁC VỤ: TẢI PPTX & XEM TOÀN MÀN HÌNH */}
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <a
                  href={`/slides/${currentPeriod.slide?.fileName}`}
                  download={currentPeriod.slide?.fileName || 'BaiGiang.pptx'}
                  onClick={(e) => {
                    // Thông báo tải về
                    alert(`Đang chuẩn bị tải tệp bài giảng gốc (.pptx): ${currentPeriod.slide?.fileName}\nTệp được đồng bộ từ Google Drive của Thầy Trương.`);
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
                  title="Chế độ toàn màn hình máy chiếu"
                >
                  {isSlideFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span>{isSlideFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
                </button>
              </div>
            </div>

            {/* TRÌNH PHÁT SLIDE TƯƠNG TÁC (PRESENTATION SLIDE VIEWER) */}
            <div className={`rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 text-white shadow-2xl transition-all ${
              isSlideFullscreen ? 'fixed inset-4 z-50 flex flex-col' : 'min-h-[460px] flex flex-col'
            }`}>
              {/* Thanh điều khiển trên đỉnh Slide */}
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

              {/* MÀN HÌNH NỘI DUNG SLIDE CHÍNH */}
              <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black">
                {/* Nền hiệu ứng trang trí */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Nội dung slide */}
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
                    Môn Tin học Lớp {currentPeriod.grade} · Trường THCS Mão Điền · Thầy Trương
                  </p>
                </div>

                {/* NÚT CHUYỂN SLIDE TRÁI / PHẢI */}
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

              {/* THANH THUMBNAIL / ĐIỀU HƯỚNG DƯỚI ĐÁY */}
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

            {/* Khung hướng dẫn tự học và xem ngoại tuyến */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-600">
                <FolderOpen className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  Học sinh có thể xem trực tuyến trên điện thoại/máy tính hoặc bấm nút <strong>Tải bài giảng về máy (.pptx)</strong> để mở bằng PowerPoint hoặc WPS Office khi không có mạng.
                </span>
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
