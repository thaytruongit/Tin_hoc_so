'use client';

import { useState } from 'react';
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
  Filter
} from 'lucide-react';
import { MOCK_IN_CLASS_LESSONS, MOCK_CLASSES } from '@/lib/mock-data';
import { InClassLesson, ReinforcementQuestion, CognitiveLevel } from '@/lib/types';

export default function InClassPage() {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(MOCK_IN_CLASS_LESSONS[0].id);
  const [activeTab, setActiveTab] = useState<'reinforcement' | 'practice'>('reinforcement');

  // Trạng thái làm bài Củng cố
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentLesson = MOCK_IN_CLASS_LESSONS.find(l => l.id === selectedLessonId) || MOCK_IN_CLASS_LESSONS[0];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleGradeQuiz = () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < currentLesson.reinforcementQuestions.length) {
      if (!confirm(`Em mới trả lời ${answeredCount}/${currentLesson.reinforcementQuestions.length} câu. Em có chắc chắn muốn nộp bài củng cố ngay không?`)) {
        return;
      }
    }
    setIsSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // Tính điểm
  const correctCount = currentLesson.reinforcementQuestions.filter(
    q => selectedAnswers[q.id] === q.correctIndex
  ).length;
  const score = Math.round((correctCount / currentLesson.reinforcementQuestions.length) * 10 * 10) / 10;

  const getLevelBadge = (level: CognitiveLevel) => {
    switch (level) {
      case 'Nhận biết':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">1. Nhận biết</span>;
      case 'Thông hiểu':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">2. Thông hiểu</span>;
      case 'Vận dụng':
        return <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">3. Vận dụng</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Monitor className="w-3.5 h-3.5 text-blue-400" />
            Giờ học trực tiếp · THCS Mão Điền
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hoạt Động Trực Tiếp Trong Tiết Học
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Dành riêng cho giờ học lý thuyết & thực hành tại phòng máy: Củng cố 7 câu hỏi phân hóa và thực hành theo Rubric.
          </p>
        </div>
      </div>

      {/* CHỌN BÀI HỌC / TIẾT HỌC */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Chọn tiết học đang diễn ra:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {MOCK_IN_CLASS_LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => {
                setSelectedLessonId(lesson.id);
                handleResetQuiz();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLessonId === lesson.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Khối {lesson.grade}: {lesson.lessonTitle.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* TABS CHỨC NĂNG */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('reinforcement')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'reinforcement'
              ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>1. Củng cố bài học (7 câu trắc nghiệm Biết - Hiểu - Vận dụng)</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`pb-3 flex items-center gap-2 transition-all ${
            activeTab === 'practice'
              ? 'border-b-2 border-blue-600 text-blue-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
          <span>2. Bài tập thực hành tại lớp (Tiêu chí Rubric phòng máy)</span>
        </button>
      </div>

      {/* CHỨC NĂNG 1: CỦNG CỐ BÀI HỌC (7 CÂU HỎI TRẮC NGHIỆM) */}
      {activeTab === 'reinforcement' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Khối {currentLesson.grade} · {currentLesson.topic}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">
                {currentLesson.lessonTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Gồm 7 câu hỏi phân hóa chuẩn ma trận Bộ GD&ĐT: 3 câu Nhận biết, 2 câu Thông hiểu, 2 câu Vận dụng.
              </p>
            </div>

            {/* BẢNG ĐIỂM SAU KHI NỘP BÀI */}
            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-300 flex items-center gap-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                  {score}
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-900">
                    KẾT QUẢ CỦNG CỐ: {correctCount}/7 CÂU ĐÚNG
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {score >= 8 ? '🎉 Xuất sắc! Em đã nắm rất vững bài học hôm nay.' : score >= 5 ? '👍 Khá tốt! Em hãy đọc lại giải thích các câu làm sai nhé.' : '⚠️ Cần cố gắng! Em hãy ôn lại lý thuyết cùng Thầy.'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DANH SÁCH 7 CÂU HỎI TRẮC NGHIỆM */}
          <div className="space-y-5">
            {currentLesson.reinforcementQuestions.map((q, qIndex) => {
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
                      <p className="text-slate-600 pl-5">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* THANH ĐIỀU KHIỂN NỘP BÀI */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Đã hoàn thành: <strong>{Object.keys(selectedAnswers).length}/7 câu</strong>
            </div>

            <div className="flex items-center gap-3">
              {isSubmitted ? (
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                >
                  Làm lại bài củng cố
                </button>
              ) : (
                <button
                  onClick={handleGradeQuiz}
                  className="px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nộp bài & Chấm điểm tức thì</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHỨC NĂNG 2: BÀI TẬP THỰC HÀNH TẠI LỚP (RUBRIC PHÒNG MÁY) */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Khối {currentLesson.grade} · Tiết thực hành
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  {currentLesson.practicalTask.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {currentLesson.practicalTask.description}
                </p>
              </div>

              {/* NÚT TẢI TỆP MẪU THỰC HÀNH */}
              <a
                href={currentLesson.practicalTask.sampleFileUrl}
                download={currentLesson.practicalTask.sampleFileName}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Tải tệp mẫu (.xlsx)</span>
              </a>
            </div>

            {/* CÁC BƯỚC THỰC HIỆN BÀI THỰC HÀNH */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Quy trình thực hiện tại phòng máy (6 bước):</span>
              </h3>

              <div className="space-y-2.5">
                {currentLesson.practicalTask.steps.map((step, sIdx) => (
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
                    {currentLesson.practicalTask.rubric.map((r, rIdx) => (
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
        </div>
      )}
    </div>
  );
}
