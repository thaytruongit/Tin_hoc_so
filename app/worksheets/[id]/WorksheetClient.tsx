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
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_WORKSHEETS } from '@/lib/mock-data';

export default function WorksheetClient() {
  const params = useParams();
  const router = useRouter();
  const worksheet = MOCK_WORKSHEETS.find(w => w.id === params.id) || MOCK_WORKSHEETS[0];

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleTextChange = (questionId: string, text: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: text }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let earnedPoints = 0;
    let totalPoints = 0;

    worksheet.questions.forEach(q => {
      totalPoints += q.points;
      if (q.type === 'mcq' || q.type === 'boolean') {
        if (answers[q.id] === q.correctAnswer) {
          earnedPoints += q.points;
        }
      } else if (q.type === 'fill') {
        const studentAns = String(answers[q.id] || '').trim().toLowerCase();
        const correctAns = String(q.correctAnswer).trim().toLowerCase();
        if (studentAns === correctAns) {
          earnedPoints += q.points;
        }
      } else if (q.type === 'essay') {
        // Tự luận: tự động ghi nhận đạt nếu có câu trả lời đầy đủ, chuyển GV chấm chi tiết
        if (String(answers[q.id] || '').trim().length > 10) {
          earnedPoints += q.points;
        }
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
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            Pha: {worksheet.phase}
          </span>
          <span className="text-xs text-slate-500 font-medium">{worksheet.topic}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {worksheet.title}
        </h1>
        <p className="text-xs text-slate-500">
          Tích hợp đa dạng câu hỏi: <strong>Trắc nghiệm, Đúng/Sai, Điền khuyết và Tự luận</strong>. Nộp bài trực tiếp trong tiết học.
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
                {score >= 8 ? 'Xuất sắc! Em đã hoàn thành tốt phiếu học tập.' : 'Tốt lắm! Hãy xem lại các nhận xét và giải thích chi tiết.'}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Em đã được cộng <strong>+{Math.round((score / 10) * worksheet.xpReward)} XP</strong> vào hồ sơ thi đua.
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
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {q.type === 'mcq' ? 'Trắc nghiệm' : q.type === 'boolean' ? 'Đúng / Sai' : q.type === 'fill' ? 'Điền khuyết' : 'Tự luận'}
                  </span>
                  <span className="text-xs text-slate-400">({q.points} điểm)</span>
                </div>
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                {q.content}
              </p>

              {/* OPTIONS FOR MCQ & BOOLEAN */}
              {(q.type === 'mcq' || q.type === 'boolean') && (
                <div className="space-y-2.5 pt-2">
                  {q.options?.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctAnswer;
                    let optStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';

                    if (submitted) {
                      if (isCorrect) {
                        optStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        optStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                      }
                    } else if (isSelected) {
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
                        {submitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* INPUT FOR FILL-IN-THE-BLANK */}
              {q.type === 'fill' && (
                <div className="pt-2">
                  <input
                    type="text"
                    disabled={submitted}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    placeholder="Nhập từ hoặc cụm từ điền khuyết..."
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-800"
                  />
                  {submitted && (
                    <div className="mt-2 text-xs font-semibold text-slate-700">
                      Đáp án chính xác: <span className="text-emerald-600 font-bold">{q.correctAnswer}</span>
                    </div>
                  )}
                </div>
              )}

              {/* TEXTAREA FOR ESSAY */}
              {q.type === 'essay' && (
                <div className="pt-2 space-y-2">
                  <textarea
                    rows={4}
                    disabled={submitted}
                    value={answers[q.id] || ''}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    placeholder="Nhập phần trả lời tự luận của em vào đây..."
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 leading-relaxed"
                  />
                  {submitted && (
                    <p className="text-xs text-blue-600 font-medium">
                      * Câu trả lời tự luận đã được nộp cho Thầy Đỗ Mạnh Trường nhận xét và đánh giá.
                    </p>
                  )}
                </div>
              )}

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
            Nộp phiếu học tập trực tiếp trong tiết học
          </button>
        )}
      </form>
    </div>
  );
}
