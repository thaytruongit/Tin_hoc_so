'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ClipboardCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowLeft,
  Trophy,
  Award,
  Maximize2,
  Minimize2,
  Check,
  X,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_EXAMS } from '@/lib/mock-data';
import { getCurrentUser } from '@/lib/auth';
import { saveExamResultToCloud } from '@/lib/supabase-service';

export default function ExamClient() {
  const params = useParams();
  const router = useRouter();
  const exam = MOCK_EXAMS.find(e => e.id === params.id) || MOCK_EXAMS[0];

  const [timeLeft, setTimeLeft] = useState(exam.durationMin * 60);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Đếm ngược thời gian làm bài
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  // Giám sát gian lận: Đếm số lần chuyển tab, khóa chuột phải, chống sao chép
  useEffect(() => {
    if (submitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => prev + 1);
        setShowWarning(true);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    // Khóa chuột phải & phím tắt kiểm tra mã nguồn (F12, Ctrl+U, Ctrl+Shift+I)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [submitted]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSelect = (qId: string, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < exam.questions.length) {
      if (!confirm(`Em mới trả lời ${answeredCount}/${exam.questions.length} câu. Em có chắc chắn muốn nộp bài thi ngay không?`)) {
        return;
      }
    } else {
      if (!confirm('Em có chắc chắn muốn nộp bài thi ngay bây giờ?')) return;
    }
    finishExam();
  };

  const finishExam = () => {
    let earnedPoints = 0;
    let totalPoints = 0;

    exam.questions.forEach(q => {
      totalPoints += q.points;
      if (answers[q.id] === q.correctAnswer) {
        earnedPoints += q.points;
      }
    });

    const finalScore = Math.round((earnedPoints / totalPoints) * 10 * 10) / 10;
    setScore(finalScore);
    setSubmitted(true);

    if (finalScore >= 8) {
      confetti({ particleCount: 130, spread: 80, origin: { y: 0.5 } });
    }

    // Tự động lưu điểm chính thức lên Supabase Database Cloud & LocalStorage
    const user = getCurrentUser();
    saveExamResultToCloud({
      examId: exam.id,
      examTitle: exam.title,
      studentCode: user.studentCode || 'HS-TEST',
      studentName: user.studentName || 'Học sinh kiểm tra',
      className: user.studentClass || `Lớp ${exam.grade}A1`,
      grade: exam.grade,
      score: finalScore,
      tabSwitches: tabSwitches,
      answers: answers,
      submittedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
    }).catch(err => console.error('Lỗi lưu điểm thi:', err));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Phân tích ma trận nhận thức sau khi nộp bài
  const cognitiveBreakdown = useMemo(() => {
    let nbTotal = 0, nbCorrect = 0;
    let thTotal = 0, thCorrect = 0;
    let vdTotal = 0, vdCorrect = 0;

    exam.questions.forEach((q) => {
      const lvl = q.level || 'Nhận biết';
      const isRight = answers[q.id] === q.correctAnswer;

      if (lvl === 'Nhận biết') {
        nbTotal++;
        if (isRight) nbCorrect++;
      } else if (lvl === 'Thông hiểu') {
        thTotal++;
        if (isRight) thCorrect++;
      } else {
        vdTotal++;
        if (isRight) vdCorrect++;
      }
    });

    return {
      nhanBiet: { total: nbTotal, correct: nbCorrect },
      thongHieu: { total: thTotal, correct: thCorrect },
      vanDung: { total: vdTotal, correct: vdCorrect },
    };
  }, [exam.questions, answers]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* THANH ĐIỀU HƯỚNG PHÒNG THI VỚI ĐỒNG HỒ VÀ BẢO MẬT */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 uppercase">
            Phòng thi trực tuyến · Thầy Đỗ Mạnh Trường
          </span>
          <h2 className="font-bold text-sm sm:text-base text-slate-900 mt-1 line-clamp-1">
            {exam.title}
          </h2>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Nút bật toàn màn hình tập trung */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all hidden sm:flex items-center gap-1 border border-slate-200"
            title="Bật/Tắt chế độ thi toàn màn hình"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
          </button>

          {/* Đếm số lần chuyển tab (Giám sát chống gian lận) */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
            tabSwitches > 0 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'
          }`}>
            <ShieldAlert className="w-4 h-4" />
            <span>Rời tab: {tabSwitches}</span>
          </div>

          {/* Đồng hồ đếm ngược */}
          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-black shadow-xs ${
            timeLeft < 180 ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-900 text-white'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* CẢNH BÁO GIÁM THỊ KHI RỜI MÀN HÌNH BÀI THI */}
      {showWarning && !submitted && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium flex items-center justify-between gap-3 shadow-xs animate-in bounce-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Cảnh báo giám thị phòng thi:</strong> Em vừa rời khỏi màn hình bài thi. Hệ thống đã ghi nhận <strong>{tabSwitches} lần</strong> vi phạm và báo cáo về bàn Thầy Đỗ Mạnh Trường!
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowWarning(false)}
            className="text-xs font-bold text-amber-800 underline shrink-0"
          >
            Đã hiểu
          </button>
        </div>
      )}

      {/* BÁO CÁO KẾT QUẢ TOÀN DIỆN SAU KHI NỘP BÀI */}
      {submitted && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 animate-in fade-in">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Báo Cáo Kết Quả Bài Kiểm Tra Trực Tuyến
            </h2>
            <div className="text-5xl font-black text-indigo-600">
              {score} <span className="text-2xl text-slate-400 font-normal">/ 10đ</span>
            </div>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Điểm thi đã được đồng bộ tự động lên cơ sở dữ liệu học sinh của <strong>Thầy Đỗ Mạnh Trường</strong>.
            </p>
          </div>

          {/* KHỐI PHÂN TÍCH MA TRẬN NHẬN THỨC THEO CHUẨN BỘ GD&ĐT */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Phân tích kết quả theo ma trận nhận thức</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500">Chuẩn GDPT 2018</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Nhận biết */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="text-[11px] font-bold text-blue-800">1. Nhận biết</span>
                <div className="text-lg font-black text-blue-950">
                  {cognitiveBreakdown.nhanBiet.correct} / {cognitiveBreakdown.nhanBiet.total}
                  <span className="text-xs font-normal text-blue-700 ml-1">câu</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{
                      width: `${
                        cognitiveBreakdown.nhanBiet.total > 0
                          ? (cognitiveBreakdown.nhanBiet.correct / cognitiveBreakdown.nhanBiet.total) * 100
                          : 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Thông hiểu */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="text-[11px] font-bold text-emerald-800">2. Thông hiểu</span>
                <div className="text-lg font-black text-emerald-950">
                  {cognitiveBreakdown.thongHieu.correct} / {cognitiveBreakdown.thongHieu.total}
                  <span className="text-xs font-normal text-emerald-700 ml-1">câu</span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-1.5 rounded-full"
                    style={{
                      width: `${
                        cognitiveBreakdown.thongHieu.total > 0
                          ? (cognitiveBreakdown.thongHieu.correct / cognitiveBreakdown.thongHieu.total) * 100
                          : 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Vận dụng */}
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="text-[11px] font-bold text-purple-800">3. Vận dụng</span>
                <div className="text-lg font-black text-purple-950">
                  {cognitiveBreakdown.vanDung.correct} / {cognitiveBreakdown.vanDung.total}
                  <span className="text-xs font-normal text-purple-700 ml-1">câu</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-purple-600 h-1.5 rounded-full"
                    style={{
                      width: `${
                        cognitiveBreakdown.vanDung.total > 0
                          ? (cognitiveBreakdown.vanDung.correct / cognitiveBreakdown.vanDung.total) * 100
                          : 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BÁO CÁO GIÁM SÁT TRUNG THỰC */}
          <div className="p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-slate-50 border-slate-200">
            <div className="flex items-center gap-2">
              <ShieldAlert className={`w-5 h-5 ${tabSwitches > 0 ? 'text-amber-600' : 'text-emerald-600'}`} />
              <span>
                Nhật ký giám thị chống gian lận: <strong>{tabSwitches} lần</strong> rời khỏi màn hình bài thi.
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                tabSwitches === 0
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {tabSwitches === 0 ? '✅ Nghiêm túc, không vi phạm' : '⚠️ Có hiện tượng rời tab'}
            </span>
          </div>

          {/* LỜI NHẬN XÉT CỦA THẦY ĐỖ MẠNH TRƯỜNG */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Lời nhận xét của Thầy Đỗ Mạnh Trường:</span>
            </span>
            <p className="leading-relaxed pl-5">
              {score >= 9.0
                ? 'Xuất sắc! Em nắm rất vững kiến thức và tư duy phân tích rất nhanh. Tiếp tục phát huy nhé!'
                : score >= 7.0
                ? 'Bài làm tốt! Em chỉ cần rà soát thêm một số câu ở phần Vận dụng để đạt điểm tối đa.'
                : score >= 5.0
                ? 'Em đã đạt yêu cầu cơ bản. Hãy dành thêm thời gian ôn tập lại các bài học trong SGK và trao đổi thêm với Thầy nhé.'
                : 'Kết quả chưa đạt như mong đợi. Em cần liên hệ với Thầy để được hướng dẫn ôn tập lại các bài học trọng tâm.'}
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/exams"
              className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
            >
              Danh sách đề thi khác
            </Link>
            <Link
              href="/student"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              Về Không Gian Học Sinh
            </Link>
          </div>
        </div>
      )}

      {/* DANH SÁCH CÂU HỎI THI */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((q, idx) => {
          const studentAnswer = answers[q.id];
          const isAnswered = studentAnswer !== undefined;
          const isCorrect = submitted && isAnswered && studentAnswer === q.correctAnswer;
          const isWrong = submitted && isAnswered && studentAnswer !== q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all space-y-4 ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200/80 bg-white shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  Câu {idx + 1}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{q.points} điểm</span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                {q.content}
              </p>

              <div className="space-y-2.5 pt-2">
                {q.options?.map((opt, optIdx) => {
                  const isSelected = studentAnswer === optIdx;
                  const isRealCorrect = q.correctAnswer === optIdx;

                  let optClass = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';

                  if (submitted) {
                    if (isRealCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold ring-1 ring-emerald-500';
                    } else if (isSelected && !isRealCorrect) {
                      optClass = 'border-rose-500 bg-rose-100 text-rose-950 font-bold';
                    }
                  } else if (isSelected) {
                    optClass = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-1 ring-indigo-600';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-lg bg-white/80 border border-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {submitted && isRealCorrect && (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {submitted && isSelected && !isRealCorrect && (
                        <X className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* LỜI GIẢI THÍCH CHI TIẾT SAU KHI NỘP BÀI */}
              {submitted && q.explanation && (
                <div className="mt-3 p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Lời giải thích của Thầy Đỗ Mạnh Trường:</span>
                  </span>
                  <p className="pl-5 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {!submitted && (
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Nộp bài thi ngay</span>
          </button>
        )}
      </form>
    </div>
  );
}
