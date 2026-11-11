'use client';

import { useState, useEffect } from 'react';
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

  // Giám sát gian lận: Đếm số lần chuyển tab hoặc ẩn trình duyệt
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

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* THANH ĐIỀU HƯỚNG PHÒNG THI VỚI ĐỒNG HỒ VÀ BẢO MẬT */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 uppercase">
            Phòng thi trực tuyến · Thầy Trương Thành Trường
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
              <strong>Cảnh báo giám thị phòng thi:</strong> Em vừa rời khỏi màn hình bài thi. Hệ thống đã ghi nhận <strong>{tabSwitches} lần</strong> vi phạm và báo cáo về bàn Thầy Trương Thành Trường!
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

      {/* BÁO CÁO KẾT QUẢ SAU KHI NỘP BÀI */}
      {submitted && (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-4 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Kết Quả Bài Kiểm Tra Trực Tuyến
          </h2>
          <div className="text-5xl font-black text-indigo-600">
            {score} <span className="text-2xl text-slate-400 font-normal">/ 10đ</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Số lần rời màn hình: <strong>{tabSwitches} lần</strong>. Điểm thi và toàn bộ dữ liệu làm bài đã được tự động lưu trữ an toàn vào cơ sở dữ liệu học sinh của Thầy Trương Thành Trường.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/student"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm hover:bg-indigo-700"
            >
              Về không gian học sinh
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
                    <span>Lời giải thích của Thầy Trương Thành Trường:</span>
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
