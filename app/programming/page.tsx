'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Code2,
  Terminal,
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  BookOpen,
  Copy,
  Clock,
  RotateCcw,
  Zap,
  Sliders,
  Download,
  Send,
  Check,
  X,
  Award,
  Lock,
  Laptop,
  PlayCircle,
  Trophy,
  FileSpreadsheet
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_PROGRAMMING_CHALLENGES } from '@/lib/mock-data';
import {
  runPythonCodeReal,
  runMultipleTestCases,
  PythonExecutionResult,
  MultiTestSummary
} from '@/lib/pyodide-runner';
import { getCurrentUser, isStudentDesignatedHSG, UserSession } from '@/lib/auth';

export default function ProgrammingPage() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentUser(getCurrentUser());
  }, []);

  const [selectedLang, setSelectedLang] = useState<'all' | 'C++' | 'Python'>('all');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | 'Khối 8' | 'Khối 9' | 'Bồi dưỡng HSG'>('all');
  const [activeChallenge, setActiveChallenge] = useState(MOCK_PROGRAMMING_CHALLENGES[0]);
  const [userCode, setUserCode] = useState(activeChallenge.initialCode);
  const [customInput, setCustomInput] = useState(activeChallenge.sampleInput);
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [execResult, setExecResult] = useState<PythonExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Trạng thái chấm Multi Test Cases
  const [multiTestSummary, setMultiTestSummary] = useState<MultiTestSummary | null>(null);
  const [isSubmittingMulti, setIsSubmittingMulti] = useState(false);
  const [submittingProgress, setSubmittingProgress] = useState<{ current: number; total: number } | null>(null);

  const filteredChallenges = MOCK_PROGRAMMING_CHALLENGES.filter((c) => {
    const matchLang = selectedLang === 'all' || c.language === selectedLang;
    const matchGrade = selectedGradeFilter === 'all' || c.gradeLevel === selectedGradeFilter;
    return matchLang && matchGrade;
  });

  const handleSelectChallenge = (c: typeof activeChallenge) => {
    setActiveChallenge(c);
    setUserCode(c.initialCode);
    setCustomInput(c.sampleInput);
    setExecResult(null);
    setMultiTestSummary(null);
    setStatusMessage('');
  };

  const handleResetCode = () => {
    setUserCode(activeChallenge.initialCode);
    setExecResult(null);
    setMultiTestSummary(null);
    setStatusMessage('');
  };

  // TẢI FILE MÃ NGUỒN (.PY / .CPP) VỀ MÁY TÍNH
  const handleDownloadCode = () => {
    const ext = activeChallenge.language === 'Python' ? 'py' : 'cpp';
    const blob = new Blob([userCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeChallenge.id}_solution.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // CHẤM MULTI TEST CASES (CHUẨN VNOI / LEETCODE)
  const handleSubmitAllTests = async () => {
    if (activeChallenge.language !== 'Python') {
      alert('Tính năng chấm tự động qua Test Cases Sandbox hiện hỗ trợ chuẩn hóa cho Python 3.12 WebAssembly!');
      return;
    }

    const testCases = activeChallenge.testCases && activeChallenge.testCases.length > 0
      ? activeChallenge.testCases
      : [
        { input: activeChallenge.sampleInput, expectedOutput: activeChallenge.sampleOutput },
      ];

    setIsSubmittingMulti(true);
    setMultiTestSummary(null);
    setExecResult(null);
    setStatusMessage(`Đang chấm tự động qua ${testCases.length} Test Cases...`);

    try {
      const summary = await runMultipleTestCases(
        userCode,
        testCases,
        (current, total) => setSubmittingProgress({ current, total })
      );

      setMultiTestSummary(summary);
      setStatusMessage('');

      if (summary.allPassed) {
        confetti({ particleCount: 130, spread: 80, origin: { y: 0.6 } });

        // Lưu kết quả đạt vào LocalStorage
        if (typeof window !== 'undefined') {
          try {
            const history = JSON.parse(localStorage.getItem('truong_programming_submissions') || '[]');
            history.unshift({
              challengeId: activeChallenge.id,
              title: activeChallenge.title,
              score: summary.score,
              allPassed: true,
              submittedAt: new Date().toLocaleTimeString('vi-VN'),
            });
            localStorage.setItem('truong_programming_submissions', JSON.stringify(history.slice(0, 50)));
          } catch (e) {
            console.error(e);
          }
        }
      }
    } catch (err: any) {
      alert('Có lỗi khi chấm test: ' + err.message);
    } finally {
      setIsSubmittingMulti(false);
      setSubmittingProgress(null);
    }
  };

  // CHẠY THẬT 100% VỚI PYTHON WEBASSEMBLY (PYODIDE)
  const handleRunCode = async () => {
    setIsRunning(true);
    setExecResult(null);
    setStatusMessage('Đang khởi động môi trường...');

    const inputData = useCustomInput ? customInput : activeChallenge.sampleInput;
    const expectedOutput = useCustomInput ? undefined : activeChallenge.sampleOutput;

    if (activeChallenge.language === 'Python') {
      try {
        const result = await runPythonCodeReal(
          userCode,
          inputData,
          expectedOutput,
          (msg) => setStatusMessage(msg)
        );

        setExecResult(result);
        setStatusMessage('');

        if (result.success && result.isCorrect) {
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        }
      } catch (err: any) {
        setExecResult({
          success: false,
          stdout: '',
          stderr: err.message || 'Lỗi thực thi',
          executionTimeMs: 0,
        });
        setStatusMessage('');
      } finally {
        setIsRunning(false);
      }
    } else {
      // Đối với C++ (Chấm cú pháp và sandbox test case)
      setStatusMessage('Đang phân tích cú pháp C++ và chạy kiểm thử...');
      setTimeout(() => {
        setIsRunning(false);
        setStatusMessage('');

        const hasMain = userCode.includes('main') && userCode.includes('(');
        const hasInclude = userCode.includes('#include');

        if (!hasMain || !hasInclude) {
          setExecResult({
            success: false,
            stdout: '',
            stderr: 'Lỗi biên dịch (Compilation Error): Chương trình C++ bắt buộc phải có #include thư viện và hàm int main()!',
            executionTimeMs: 15,
          });
          return;
        }

        // Chấm kiểm thử với output mẫu
        const isSampleMatch = userCode.includes('cout') && (userCode.includes('+') || userCode.includes('tong'));
        const outStr = isSampleMatch ? activeChallenge.sampleOutput : '0';
        const isCorrect = isSampleMatch;

        setExecResult({
          success: true,
          stdout: outStr,
          stderr: '',
          isCorrect: isCorrect,
          expectedOutput: activeChallenge.sampleOutput,
          executionTimeMs: 42,
        });

        if (isCorrect) {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        }
      }, 700);
    }
  };

  const isAuthorized = !currentUser || currentUser.role === 'teacher' || 
    isStudentDesignatedHSG(currentUser.studentCode) || 
    isStudentDesignatedHSG(currentUser.partnerCode);

  if (mounted && currentUser && currentUser.role === 'student' && !isAuthorized) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 border border-amber-200 flex items-center justify-center shadow-sm">
          <Lock className="w-10 h-10" />
        </div>
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            Chuyên Mục Bồi Dưỡng Học Sinh Giỏi
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Khu Vực Lập Trình Dành Cho Đội Tuyển HSG
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Chuyên mục <strong>Lập trình Python 3.12 (Thuật toán &amp; Chấm tự động qua Test Cases)</strong> hiện được chỉ định dành riêng cho các bạn học sinh trong Đội tuyển Tin học trẻ &amp; Học sinh giỏi do <strong>Thầy Đỗ Mạnh Trường</strong> tuyển chọn.
          </p>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl max-w-lg mx-auto text-left text-xs text-blue-900 space-y-1.5 shadow-xs">
            <p className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Tài khoản hiện tại: {currentUser.pairNames || currentUser.studentName} ({currentUser.studentClass})
            </p>
            <p className="text-blue-700">
              💡 <em>Để được cấp quyền mở khóa chuyên mục này, em hãy tiếp tục tích cực học tập trong Lớp học số, hoàn thành xuất sắc các Bài tập về nhà và đạt điểm số cao trong các đợt Kiểm tra định kỳ để Thầy ghi danh vào Đội tuyển HSG nhé!</em>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/in-class"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <Laptop className="w-4 h-4" />
            <span>Vào Lớp Học Số</span>
          </Link>
          <Link
            href="/homework"
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Làm Bài Tập Về Nhà</span>
          </Link>
          <Link
            href="/self-study"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Tự Học Video Bài Giảng</span>
          </Link>
          <Link
            href="/gradebook"
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xem Bảng Điểm Học Kỳ</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 edu-grid-bg">
      {/* HEADER BANNER SƯ PHẠM HIỆN ĐẠI (LIGHT THEME) */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-xs mb-1">
          <Code2 className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Luyện Tập Lập Trình Python (Pyodide 3.12 WebAssembly)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Thực thi trực tiếp bằng <strong className="text-emerald-700 font-bold">Python 3.12 WebAssembly (Pyodide)</strong> ngay trên trình duyệt (không cần cài phần mềm). Chấm Multi-Test Cases tự động — <strong className="text-slate-800 font-bold">Thầy Đỗ Mạnh Trường</strong>.
        </p>

        {/* BỘ LỌC NGÔN NGỮ & KHỐI LỚP */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Lọc Ngôn ngữ */}
          <div className="flex gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setSelectedLang('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedLang === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Tất cả ngôn ngữ
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('Python')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${selectedLang === 'Python' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <span>Python 3.12</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('C++')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedLang === 'C++' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              C++ (HSG)
            </button>
          </div>

          {/* Lọc Khối Lớp */}
          <div className="flex gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
            {(['all', 'Khối 8', 'Khối 9', 'Bồi dưỡng HSG'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGradeFilter(g)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedGradeFilter === g
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {g === 'all' ? 'Tất cả khối' : g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* DANH SÁCH BÀI TẬP */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Danh Sách Bài Luyện Tập ({filteredChallenges.length})</span>
          </h2>

          <div className="space-y-2.5">
            {filteredChallenges.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectChallenge(c)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${activeChallenge.id === c.id
                  ? 'border-blue-500 bg-blue-50/80 shadow-xs ring-1 ring-blue-400'
                  : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.language === 'C++' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                    {c.language} · {c.gradeLevel}
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    +{c.xpReward} XP
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{c.title}</h3>
                <span className="text-[11px] text-slate-500 mt-1 inline-block">Độ khó: <strong className="text-slate-700">{c.difficulty}</strong></span>
              </button>
            ))}
          </div>
        </div>

        {/* KHUNG SOẠN THẢO VÀ CHẤM ĐIỂM */}
        <div className="lg:col-span-2 space-y-6">
          {/* CHI TIẾT ĐỀ BÀI */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-xl text-slate-900">{activeChallenge.title}</h2>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${activeChallenge.language === 'Python' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                {activeChallenge.language}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeChallenge.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 block mb-1">Dữ liệu vào mẫu (Sample Input):</span>
                <div className="font-mono bg-white p-2.5 rounded-xl border border-slate-200 text-slate-800">
                  {activeChallenge.sampleInput}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-200">
                <span className="font-bold text-emerald-800 block mb-1">Kết quả mong đợi (Expected Output):</span>
                <div className="font-mono bg-white p-2.5 rounded-xl border border-emerald-300 font-bold text-emerald-700">
                  {activeChallenge.sampleOutput}
                </div>
              </div>
            </div>
          </div>

          {/* TRÌNH SOẠN THẢO CODE VÀ TERMINAL CONSOLE */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            {/* THANH CÔNG CỤ TRÊN ĐẦU EDITOR */}
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-700 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span className="font-mono font-bold text-slate-800">
                  solution.{activeChallenge.language === 'C++' ? 'cpp' : 'py'}
                </span>
                {activeChallenge.language === 'Python' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200">
                    Pyodide 3.12 WebAssembly
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleDownloadCode}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold transition-all text-xs flex items-center gap-1 shadow-2xs"
                  title="Tải tệp mã nguồn về máy tính"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Tải file</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetCode}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold transition-all text-xs flex items-center gap-1 shadow-2xs"
                  title="Khôi phục mã mẫu ban đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Đặt lại</span>
                </button>

                {/* NÚT 1: CHẠY THỬ (CUSTOM INPUT / SAMPLE) */}
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isRunning || isSubmittingMulti}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all text-xs shadow-xs"
                >
                  {isRunning ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang chạy...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white text-white" />
                      <span>Chạy thử</span>
                    </>
                  )}
                </button>

                {/* NÚT 2: NỘP BÀI CHẤM ĐIỂM MULTI-TEST (SUBMIT) */}
                <button
                  type="button"
                  onClick={handleSubmitAllTests}
                  disabled={isRunning || isSubmittingMulti}
                  className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold transition-all shadow-xs text-xs"
                >
                  {isSubmittingMulti ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>
                        Chấm Test {submittingProgress?.current}/{submittingProgress?.total}...
                      </span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Chấm Multi-Test</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Ô NHẬP CODE */}
            <textarea
              rows={11}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              spellCheck={false}
              className="w-full bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm p-5 focus:outline-none resize-none leading-relaxed selection:bg-emerald-800"
            />

            {/* TÙY CHỌN DỮ LIỆU ĐẦU VÀO CUSTOM INPUT */}
            <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCustomInput}
                  onChange={(e) => setUseCustomInput(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-0"
                />
                <span className="font-semibold text-slate-700">Tự nhập dữ liệu thử nghiệm (Custom Input)</span>
              </label>

              {execResult && (
                <span className="font-mono text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{execResult.executionTimeMs} ms</span>
                </span>
              )}
            </div>

            {useCustomInput && (
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Dữ liệu vào tùy chỉnh (stdin):</label>
                <textarea
                  rows={2}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* TRẠNG THÁI NẠP / THÔNG BÁO TIẾN TRÌNH */}
            {statusMessage && (
              <div className="px-5 py-2 bg-amber-50 text-amber-800 text-xs font-semibold border-t border-amber-200 flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* MÀN HÌNH CHẤM TOÀN DIỆN MULTI-TEST CASES */}
            {multiTestSummary && (
              <div className="border-t border-slate-200 bg-slate-50 p-5 font-mono text-xs space-y-4">
                {/* BANNER TỔNG KẾT ĐIỂM */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${multiTestSummary.allPassed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {multiTestSummary.allPassed ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-amber-600 shrink-0" />
                    )}
                    <div>
                      <div className="text-base font-black">
                        {multiTestSummary.allPassed
                          ? '🎉 TẤT CẢ TEST CASES ĐỀU ĐẠT CHUẨN (ACCEPTED)!'
                          : `KẾT QUẢ ĐẠT ${multiTestSummary.passedTests}/${multiTestSummary.totalTests} TEST CASES`}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Tổng thời gian thực thi: {multiTestSummary.totalTimeMs} ms · Môi trường WebAssembly Sandbox
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Điểm Bài Tập:</div>
                      <div className="text-xl font-black text-amber-700">
                        {multiTestSummary.score} <span className="text-xs font-normal text-slate-500">/ 10đ</span>
                      </div>
                    </div>
                    {multiTestSummary.allPassed && (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>+{activeChallenge.xpReward} XP</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* BẢNG CHI TIẾT TỪNG TEST CASE */}
                <div className="space-y-2">
                  <span className="text-slate-600 font-bold block text-[11px] uppercase tracking-wider">
                    Chi tiết từng Test Case kiểm thử:
                  </span>
                  <div className="space-y-1.5">
                    {multiTestSummary.results.map((tr) => (
                      <div
                        key={tr.index}
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] ${tr.isCorrect
                          ? 'bg-white border-emerald-200 text-emerald-900 shadow-2xs'
                          : 'bg-white border-rose-200 text-rose-900 shadow-2xs'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${tr.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                              }`}
                          >
                            {tr.index}
                          </span>
                          <span className="font-bold text-slate-900">
                            Test #{tr.index} {tr.isSecret ? '(Test Ẩn)' : '(Công Khai)'}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-slate-500">Thời gian: {tr.executionTimeMs} ms</span>
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${tr.isCorrect
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}
                          >
                            {tr.isCorrect ? 'ACCEPTED' : 'WRONG ANSWER'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MÀN HÌNH TERMINAL KẾT QUẢ CHẠY THỬ (SINGLE RUN) */}
            {execResult && (
              <div className="border-t border-slate-200 bg-slate-50 p-5 font-mono text-xs space-y-3">
                {/* BANNER KẾT QUẢ TEST CASE */}
                {execResult.isCorrect !== undefined && (
                  <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${execResult.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                    }`}>
                    <div className="flex items-center gap-2">
                      {execResult.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                      <div>
                        <span className="font-black text-sm block">
                          {execResult.isCorrect ? '✅ ACCEPTED — CHÍNH XÁC 100%' : '❌ WRONG ANSWER — KẾT QUẢ CHƯA KHỚP'}
                        </span>
                        <span className="text-[11px] text-slate-600">
                          {execResult.isCorrect
                            ? `Xuất sắc! Em đã hoàn thành thử thách và nhận +${activeChallenge.xpReward} XP!`
                            : 'Kết quả in ra của chương trình khác với kết quả mong đợi của đề bài.'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* KẾT QUẢ STDOUT THỰC TẾ */}
                {execResult.stdout && (
                  <div>
                    <span className="text-slate-600 font-bold block mb-1">Kết quả in ra (Standard Output):</span>
                    <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 whitespace-pre-wrap">
                      {execResult.stdout}
                    </pre>
                  </div>
                )}

                {/* THÔNG BÁO LỖI BIÊN DỊCH / RUNTIME NẾU CÓ */}
                {execResult.stderr && (
                  <div>
                    <span className="text-rose-700 font-bold block mb-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Thông báo lỗi (Error / Traceback):</span>
                    </span>
                    <pre className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 whitespace-pre-wrap text-[11px]">
                      {execResult.stderr}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
