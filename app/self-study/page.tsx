'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlayCircle,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  School,
  Video,
  Award,
  ChevronRight,
  HelpCircle,
  RotateCcw,
  Check,
  Laptop
} from 'lucide-react';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { CURRICULUM_DATA, CurriculumPeriod } from '@/lib/curriculum-data';

export default function SelfStudyPage() {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [selectedPeriodNum, setSelectedPeriodNum] = useState<number>(6);

  // Trắc nghiệm nhanh củng cố sau video (Micro Quiz 3 câu)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizChecked, setQuizChecked] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    setCurrentUser(user);

    if (user.role === 'student' && user.studentGrade) {
      setSelectedGrade(user.studentGrade);
    }
  }, []);

  const periodsOfGrade = CURRICULUM_DATA[selectedGrade] || CURRICULUM_DATA[7] || [];
  const currentPeriod: CurriculumPeriod = periodsOfGrade.find(p => p.period === selectedPeriodNum) || periodsOfGrade[0];
  const questions = currentPeriod.reinforcement.questions.slice(0, 3); // Lấy 3 câu củng cố sau video

  // Reset quiz khi đổi bài
  const handleSelectPeriod = (pNum: number) => {
    setSelectedPeriodNum(pNum);
    setQuizAnswers({});
    setQuizChecked(false);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizChecked) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-sm font-semibold">Đang tải kho video bài giảng tự học...</p>
      </div>
    );
  }

  // URL Video bài giảng giáo dục sinh động
  const videoTitle = `Bài giảng Tin học ${selectedGrade} - Tiết ${currentPeriod.period}: ${currentPeriod.title}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* HEADER TỰ HỌC VIDEO */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <PlayCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tự Học Số · Video Bài Giảng Trực Quan</span>
            </span>
            <span className="text-xs text-slate-500">
              Biên soạn bởi: <strong className="text-slate-800">Thầy Đỗ Mạnh Trường</strong>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
              Khối {selectedGrade} · 29 Tiết
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            KHO BÀI GIẢNG SỐ MÔN TIN HỌC (TỰ HỌC TẠI NHÀ)
          </h1>

          <p className="text-xs sm:text-sm text-slate-600">
            Học sinh tự do xem video hướng dẫn thao tác, ôn tập kiến thức cốt lõi trước và sau giờ học trên lớp theo phân phối chương trình SGK Kết nối tri thức.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/in-class"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Laptop className="w-4 h-4" />
            <span>Vào Lớp Học Thực Hành</span>
          </Link>
        </div>
      </div>

      {/* CHỌN KHỐI VÀ DANH MỤC 29 TIẾT HỌC */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Khối:</span>
            {currentUser?.role === 'student' ? (
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-2xs flex items-center gap-1.5">
                <span>Khối {selectedGrade}</span>
                <span className="text-[11px] opacity-90 font-normal">({currentUser.studentClass || 'Học sinh'})</span>
              </span>
            ) : (
              [6, 7, 8, 9].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setSelectedGrade(g);
                    handleSelectPeriod(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedGrade === g
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Khối {g}
                </button>
              ))
            )}
          </div>

          <span className="text-xs font-bold text-slate-500">
            Đang học: <strong className="text-emerald-800">Tiết {currentPeriod.period} · {currentPeriod.topic}</strong>
          </span>
        </div>

        {/* Danh sách 29 Tiết bài học cuộn mượt mà */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100 scrollbar-thin">
          {periodsOfGrade.map((p) => {
            const isCur = selectedPeriodNum === p.period;

            return (
              <button
                key={p.period}
                type="button"
                onClick={() => handleSelectPeriod(p.period)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border flex items-center gap-1.5 ${
                  isCur
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <PlayCircle className={`w-3.5 h-3.5 ${isCur ? 'text-white' : 'text-emerald-600'}`} />
                <span>Tiết {p.period}</span>
                {p.isPractice && <span className="text-[9px] font-bold text-blue-600">● TH</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* KHUNG NỘI DUNG CHÍNH: VIDEO PLAYER & BÀI HỌC CỐT LÕI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* CỘT TRÁI (7 CỘT): VIDEO PLAYER BÀI GIẢNG SỐ */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider flex items-center gap-1.5">
              <Video className="w-4 h-4 text-emerald-600" />
              <span>Video Hướng Dẫn Bài Học · Tiết {currentPeriod.period}</span>
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Thời lượng: 12 phút</span>
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
            {currentPeriod.title}
          </h2>

          {/* MÀN HÌNH VIDEO GIẢNG DẠY */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-300 shadow-inner flex flex-col justify-between p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold">
                <School className="w-3.5 h-3.5 text-blue-400" />
                <span>THCS Mão Điền · Thầy Đỗ Mạnh Trường</span>
              </div>
              <span className="bg-rose-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                HD 1080P
              </span>
            </div>

            {/* Trọng tâm video */}
            <div className="text-center space-y-3 my-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/90 text-white flex items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <PlayCircle className="w-10 h-10 fill-white text-emerald-500" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-white drop-shadow-md">
                  {currentPeriod.title}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Chủ đề: {currentPeriod.topic} · Tích hợp Năng lực số CV 3456 &amp; AI QĐ 3439
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 bg-black/40 backdrop-blur-xs p-2 rounded-xl">
              <span>00:00 / 12:45</span>
              <span>Giáo viên giảng dạy: Thầy Đỗ Mạnh Trường</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <div className="font-bold text-slate-800 mb-1">Mục tiêu bài học cần đạt:</div>
            {currentPeriod.contentDesc || 'Học sinh nắm chắc khái niệm lý thuyết, thành thạo thao tác thực hành tại phòng máy và vận dụng giải quyết các tình huống thực tiễn.'}
          </div>
        </div>

        {/* CỘT PHẢI (5 CỘT): TÓM TẮT CỐT LÕI & CỦNG CỐ NHANH */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* TÓM TẮT KIẾN THỨC CỐT LÕI */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-700 border-b border-slate-100 pb-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Kiến Thức Cốt Lõi Cần Nhớ</span>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Khái niệm trọng tâm:</strong> {currentPeriod.worksheet?.title || currentPeriod.title}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Chủ đề học tập:</strong> {currentPeriod.topic}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Thực hành phòng máy:</strong> {currentPeriod.practicalTask?.title || 'Thao tác kỹ thuật chính xác theo hướng dẫn'}
                </span>
              </div>
            </div>
          </div>

          {/* CÂU HỎI CỦNG CỐ NHANH SAU VIDEO (3 CÂU) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-black uppercase text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Củng Cố Nhanh Sau Video (3 Câu)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                Tự kiểm tra
              </span>
            </div>

            <div className="space-y-3">
              {questions.map((q, qIdx) => {
                const selectedOpt = quizAnswers[qIdx];
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div key={q.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="font-bold text-slate-900">
                      Câu {qIdx + 1}: {q.question}
                    </div>

                    <div className="space-y-1">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let optClass = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100';

                        if (quizChecked) {
                          if (optIdx === q.correctIndex) {
                            optClass = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
                          } else if (isChosen) {
                            optClass = 'bg-rose-100 text-rose-900 border-rose-300';
                          }
                        } else if (isChosen) {
                          optClass = 'bg-indigo-50 text-indigo-900 border-indigo-400 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            className={`w-full p-2 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optClass}`}
                          >
                            <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                            {quizChecked && optIdx === q.correctIndex && (
                              <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizChecked && (
                      <p className="text-[10px] text-slate-500 italic pt-1">
                        Giải thích: {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              {!quizChecked ? (
                <button
                  type="button"
                  onClick={() => setQuizChecked(true)}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs shadow-xs transition-all"
                >
                  Kiểm Tra Đáp Án Củng Cố
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => { setQuizAnswers({}); setQuizChecked(false); }}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm Lại Phần Củng Cố</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
