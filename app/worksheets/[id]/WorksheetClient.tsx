'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowLeft, 
  RotateCcw, 
  Award,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_WORKSHEETS } from '@/lib/mock-data';

export default function WorksheetClient() {
  const params = useParams();
  const router = useRouter();
  const worksheet = MOCK_WORKSHEETS.find(w => w.id === params.id) || MOCK_WORKSHEETS[0];

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let earnedPoints = 0;
    let totalPoints = 0;

    worksheet.questions.forEach(q => {
      totalPoints += q.points;
      if (answers[q.id] === q.correctAnswer) {
        earnedPoints += q.points;
      }
    });

    const calculatedScore = Math.round((earnedPoints / totalPoints) * 10 * 10) / 10;
    setScore(calculatedScore);
    setSubmitted(true);

    if (calculatedScore >= 8) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Link
          href="/worksheets"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách phiếu</span>
        </Link>
        <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          <Sparkles className="w-3.5 h-3.5" />
          Phần thưởng: +{worksheet.xpReward} XP
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
            Tin học {worksheet.grade} · Tiết {worksheet.periodNum}
          </span>
          <span className="text-xs text-slate-500 font-medium">{worksheet.topic}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {worksheet.title}
        </h1>
        <p className="text-xs text-slate-500">
          Hãy đọc kỹ từng câu hỏi và chọn đáp án đúng nhất. Kết quả và giải thích chi tiết sẽ hiện ngay sau khi nộp bài.
        </p>
      </div>

      {/* RESULT BANNER */}
      {submitted && (
        <div className={`p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 ${
          score >= 8
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
            : 'bg-blue-50 border-blue-200 text-blue-950'
        }`}>
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl text-white ${
              score >= 8 ? 'bg-emerald-600' : 'bg-blue-600'
            }`}>
              {score}đ
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {score >= 8 ? 'Xuất sắc! Em đã hoàn thành xuất sắc phiếu bài tập.' : 'Tốt lắm! Hãy xem lại các câu chưa đúng bên dưới.'}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Em đã được cộng <strong>+{Math.round((score / 10) * worksheet.xpReward)} XP</strong> vào hồ sơ học tập.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setScore(0);
            }}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại phiếu</span>
          </button>
        </div>
      )}

      {/* QUESTIONS LIST */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {worksheet.questions.map((q, idx) => {
          const isSelected = (optIdx: number) => answers[q.id] === optIdx;
          const isCorrect = (optIdx: number) => optIdx === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    ({q.points} điểm)
                  </span>
                </div>
                {submitted && (
                  <div>
                    {answers[q.id] === q.correctAnswer ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Chưa đúng
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                {q.content}
              </p>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {q.options?.map((opt, optIdx) => {
                  let optStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';

                  if (submitted) {
                    if (isCorrect(optIdx)) {
                      optStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold';
                    } else if (isSelected(optIdx)) {
                      optStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                    }
                  } else if (isSelected(optIdx)) {
                    optStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-600';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && isCorrect(optIdx) && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation when submitted */}
              {submitted && q.explanation && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2 mt-3">
                  <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Giải thích của giáo viên: </strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {!submitted && (
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
          >
            Nộp phiếu học tập & Chấm điểm ngay
          </button>
        )}
      </form>
    </div>
  );
}
