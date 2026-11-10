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
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_EXAMS } from '@/lib/mock-data';

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

  // Countdown timer
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  // Anti-cheat: Track tab switches / blur
  useEffect(() => {
    if (submitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => prev + 1);
        setShowWarning(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [submitted]);

  const handleSelect = (qId: string, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleAutoSubmit = () => {
    finishExam();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Em có chắc chắn muốn nộp bài thi ngay bây giờ?')) return;
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
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* EXAM ROOM HEADER WITH TIMER */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 uppercase">
            Phòng thi trực tuyến
          </span>
          <h2 className="font-bold text-sm sm:text-base text-slate-900 mt-1 line-clamp-1">
            {exam.title}
          </h2>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {/* Tab Switch Counter */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
            tabSwitches > 0 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'
          }`}>
            <ShieldAlert className="w-4 h-4" />
            <span>Rời tab: {tabSwitches}</span>
          </div>

          {/* Timer Clock */}
          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-black shadow-xs ${
            timeLeft < 180 ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-900 text-white'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {showWarning && !submitted && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-medium flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Cảnh báo giám thị:</strong> Em vừa rời khỏi màn hình bài thi. Hệ thống đã ghi nhận {tabSwitches} lần chuyển tab!
            </span>
          </div>
          <button
            onClick={() => setShowWarning(false)}
            className="text-xs font-bold text-amber-800 underline shrink-0"
          >
            Đã hiểu
          </button>
        </div>
      )}

      {/* SUBMISSION RESULT REPORT */}
      {submitted && (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Kết Quả Bài Kiểm Tra
          </h2>
          <div className="text-5xl font-black text-indigo-600">
            {score} <span className="text-2xl text-slate-400 font-normal">/ 10đ</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Số lần rời màn hình: <strong>{tabSwitches}</strong>. Kết quả và chi tiết các câu đã được tự động lưu trữ vào hồ sơ học sinh trên hệ thống.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/student"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm hover:bg-indigo-700"
            >
              Về trang học sinh
            </Link>
          </div>
        </div>
      )}

      {/* QUESTIONS */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {exam.questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                Câu {idx + 1}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{q.points} điểm</span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-900">
              {q.content}
            </p>

            <div className="space-y-2.5 pt-2">
              {q.options?.map((opt, optIdx) => {
                const isSelected = answers[q.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={submitted}
                    onClick={() => handleSelect(q.id, optIdx)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted && (
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all"
          >
            Nộp bài thi ngay
          </button>
        )}
      </form>
    </div>
  );
}
