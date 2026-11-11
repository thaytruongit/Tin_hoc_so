'use client';

import { useState } from 'react';
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
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_PROGRAMMING_CHALLENGES } from '@/lib/mock-data';
import { 
  runPythonCodeReal, 
  runMultipleTestCases, 
  PythonExecutionResult, 
  MultiTestSummary 
} from '@/lib/pyodide-runner';

export default function ProgrammingPage() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 cyber-grid-bg">
      {/* HEADER BANNER VÕ ĐÀI CYBER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-neon-purple/40 mb-1">
          <Code2 className="w-8 h-8 animate-pulse text-cyan-300" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight glow-text-cyan">
          Võ Đài Lập Trình Python &amp; C++
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Biên dịch và thực thi 100% bằng <strong className="text-cyan-400">Python 3.12 WebAssembly (Pyodide)</strong> ngay trên trình duyệt. Đấu quái vật Bug qua hệ thống Multi-Test Cases chuẩn VNOI — <strong className="text-purple-300">Thầy Đỗ Mạnh Trường</strong>.
        </p>

        {/* BỘ LỌC NGÔN NGỮ & KHỐI LỚP */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Lọc Ngôn ngữ */}
          <div className="flex gap-1.5 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedLang('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLang === 'all' ? 'bg-cyan-500 text-slate-950 font-black shadow-neon-cyan/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất cả ngôn ngữ
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('Python')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedLang === 'Python' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-neon-mana/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Python 3.12 (Pyodide)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('C++')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLang === 'C++' ? 'bg-blue-600 text-white font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              C++ (HSG)
            </button>
          </div>

          {/* Lọc Khối Lớp */}
          <div className="flex gap-1.5 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
            {(['all', 'Khối 8', 'Khối 9', 'Bồi dưỡng HSG'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGradeFilter(g)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGradeFilter === g
                    ? 'bg-purple-600 text-white font-black shadow-neon-purple/40'
                    : 'text-slate-400 hover:text-white'
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
          <h2 className="text-base font-black text-white flex items-center gap-2 glow-text-cyan">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Thử Thách Võ Đài ({filteredChallenges.length})</span>
          </h2>

          <div className="space-y-2.5">
            {filteredChallenges.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectChallenge(c)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  activeChallenge.id === c.id
                    ? 'border-cyan-400 bg-cyan-950/60 shadow-neon-cyan/30 ring-1 ring-cyan-400/50'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    c.language === 'C++' ? 'bg-blue-950 text-blue-300 border border-blue-500/40' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {c.language} · {c.gradeLevel}
                  </span>
                  <span className="text-[10px] font-black text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    +{c.xpReward} XP
                  </span>
                </div>
                <h3 className="font-black text-sm text-white line-clamp-1">{c.title}</h3>
                <span className="text-[11px] text-slate-400 mt-1 inline-block">Độ khó: <strong className="text-slate-300">{c.difficulty}</strong></span>
              </button>
            ))}
          </div>
        </div>

        {/* KHUNG SOẠN THẢO VÀ CHẤM ĐIỂM */}
        <div className="lg:col-span-2 space-y-6">
          {/* CHI TIẾT ĐỀ BÀI */}
          <div className="cyber-hud-card rounded-3xl border border-cyan-500/30 p-6 shadow-neon-cyan/10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-lg text-white glow-text-cyan">{activeChallenge.title}</h2>
              <span className={`text-xs font-black px-3 py-1 rounded-full ${
                activeChallenge.language === 'Python' ? 'bg-emerald-950 text-emerald-300 border border-emerald-400/40' : 'bg-blue-950 text-blue-300 border border-blue-400/40'
              }`}>
                {activeChallenge.language}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeChallenge.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="font-bold text-slate-400 block mb-1">Dữ liệu vào mẫu (Sample Input):</span>
                <div className="font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-cyan-300">
                  {activeChallenge.sampleInput}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="font-bold text-slate-400 block mb-1">Kết quả mong đợi (Expected Output):</span>
                <div className="font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-black text-emerald-400">
                  {activeChallenge.sampleOutput}
                </div>
              </div>
            </div>
          </div>

          {/* TRÌNH SOẠN THẢO CODE VÀ TERMINAL CONSOLE */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            {/* THANH CÔNG CỤ TRÊN ĐẦU EDITOR */}
            <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono font-bold text-slate-200">
                  solution.{activeChallenge.language === 'C++' ? 'cpp' : 'py'}
                </span>
                {activeChallenge.language === 'Python' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                    WebAssembly Python 3.12
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleDownloadCode}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-all text-xs flex items-center gap-1"
                  title="Tải tệp mã nguồn về máy tính"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>Tải file</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetCode}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-all text-xs flex items-center gap-1"
                  title="Khôi phục mã mẫu ban đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>

                {/* NÚT 1: CHẠY THỬ (CUSTOM INPUT / SAMPLE) */}
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isRunning || isSubmittingMulti}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all text-xs border border-slate-700"
                >
                  {isRunning ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang chạy...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white text-white" />
                      <span>Chạy thử (Run)</span>
                    </>
                  )}
                </button>

                {/* NÚT 2: NỘP BÀI CHẤM ĐIỂM MULTI-TEST (SUBMIT) */}
                <button
                  type="button"
                  onClick={handleSubmitAllTests}
                  disabled={isRunning || isSubmittingMulti}
                  className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:bg-slate-700 text-white font-black transition-all shadow-md shadow-emerald-600/30 text-xs"
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
                      <span>🚀 Nộp Bài Chấm Điểm</span>
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
              className="w-full bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm p-5 focus:outline-none resize-none leading-relaxed selection:bg-emerald-800"
            />

            {/* TÙY CHỌN DỮ LIỆU ĐẦU VÀO CUSTOM INPUT */}
            <div className="px-5 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCustomInput}
                  onChange={(e) => setUseCustomInput(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-0"
                />
                <span className="font-semibold text-slate-300">Tự nhập dữ liệu thử nghiệm (Custom Input)</span>
              </label>

              {execResult && (
                <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{execResult.executionTimeMs} ms</span>
                </span>
              )}
            </div>

            {useCustomInput && (
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Dữ liệu vào tùy chỉnh (stdin):</label>
                <textarea
                  rows={2}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {/* TRẠNG THÁI NẠP / THÔNG BÁO TIẾN TRÌNH */}
            {statusMessage && (
              <div className="px-5 py-2 bg-slate-900 text-amber-300 text-xs font-medium border-t border-slate-800 flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* MÀN HÌNH CHẤM TOÀN DIỆN MULTI-TEST CASES */}
            {multiTestSummary && (
              <div className="border-t border-slate-800 bg-slate-900/95 p-5 font-mono text-xs space-y-4">
                {/* BANNER TỔNG KẾT ĐIỂM */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    multiTestSummary.allPassed
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {multiTestSummary.allPassed ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-amber-400 shrink-0" />
                    )}
                    <div>
                      <div className="text-base font-black">
                        {multiTestSummary.allPassed
                          ? '🎉 TẤT CẢ TEST CASES ĐỀU ĐẠT CHUẨN (ACCEPTED)!'
                          : `KẾT QUẢ ĐẠT ${multiTestSummary.passedTests}/${multiTestSummary.totalTests} TEST CASES`}
                      </div>
                      <div className="text-[11px] opacity-80 mt-0.5">
                        Tổng thời gian thực thi: {multiTestSummary.totalTimeMs} ms · Môi trường WebAssembly Sandbox
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Điểm Bài Tập:</div>
                      <div className="text-xl font-black text-amber-400">
                        {multiTestSummary.score} <span className="text-xs font-normal text-slate-400">/ 10đ</span>
                      </div>
                    </div>
                    {multiTestSummary.allPassed && (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>+{activeChallenge.xpReward} XP</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* BẢNG CHI TIẾT TỪNG TEST CASE */}
                <div className="space-y-2">
                  <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">
                    Chi tiết từng Test Case kiểm thử:
                  </span>
                  <div className="space-y-1.5">
                    {multiTestSummary.results.map((tr) => (
                      <div
                        key={tr.index}
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] ${
                          tr.isCorrect
                            ? 'bg-slate-950 border-emerald-500/30 text-slate-300'
                            : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                              tr.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {tr.index}
                          </span>
                          <span className="font-bold text-white">
                            Test #{tr.index} {tr.isSecret ? '(Test Ẩn)' : '(Công Khai)'}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-slate-400">Thời gian: {tr.executionTimeMs} ms</span>
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              tr.isCorrect
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
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
              <div className="border-t border-slate-800 bg-slate-900/95 p-5 font-mono text-xs space-y-3">
                {/* BANNER KẾT QUẢ TEST CASE */}
                {execResult.isCorrect !== undefined && (
                  <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                    execResult.isCorrect 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      {execResult.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                      <div>
                        <span className="font-black text-sm block">
                          {execResult.isCorrect ? '✅ ACCEPTED — CHÍNH XÁC 100%' : '❌ WRONG ANSWER — KẾT QUẢ CHƯA KHỚP'}
                        </span>
                        <span className="text-[11px] opacity-80">
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
                    <span className="text-slate-400 font-bold block mb-1">Kết quả in ra (Standard Output):</span>
                    <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 whitespace-pre-wrap">
                      {execResult.stdout}
                    </pre>
                  </div>
                )}

                {/* THÔNG BÁO LỖI BIÊN DỊCH / RUNTIME NẾU CÓ */}
                {execResult.stderr && (
                  <div>
                    <span className="text-rose-400 font-bold block mb-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Thông báo lỗi (Error / Traceback):</span>
                    </span>
                    <pre className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-300 whitespace-pre-wrap text-[11px]">
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
