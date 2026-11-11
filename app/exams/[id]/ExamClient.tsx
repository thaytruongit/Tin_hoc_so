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
  Sparkles,
  ShieldCheck,
  School
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
        setTabSwitches(prev => {
          const next = prev + 1;
          setShowWarning(true);
          return next;
        });
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'u', 's', 'p'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [submitted]);

  // Bật/tắt chế độ toàn màn hình
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const handleSelect = (qId: string, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answeredCount = Object.keys(answers).length;
    const totalQ = exam.questions.length;

    if (answeredCount < totalQ) {
      const confirmSubmit = window.confirm(
        `Em mới làm ${answeredCount}/${totalQ} câu. Em có chắc chắn muốn nộp bài thi ngay bây giờ không?`
      );
      if (!confirmSubmit) return;
    }

    finishExam();
  };

  const finishExam = () => {
    let totalScore = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        totalScore += q.points;
      }
    });

    const finalScore = Math.round(totalScore * 10) / 10;
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 edu-grid-bg">
      {/* THANH ĐIỀU HƯỚNG PHÒNG THI VỚI ĐỒNG HỒ VÀ BẢO MẬT (LIGHT THEME) */}
      <div className="sticky top-20 z-40 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
            Kiểm Tra Định Kỳ · Thầy Đỗ Mạnh Trường
          </span>
          <h2 className="font-bold text-sm sm:text-base text-slate-900 mt-1 line-clamp-1">
            {exam.title}
          </h2>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Nút bật toàn màn hình */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all hidden sm:flex items-center gap-1 border border-slate-200"
            title="Bật/Tắt chế độ thi toàn màn hình"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
          </button>

          {/* Đếm số lần chuyển tab */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
            tabSwitches > 0 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'
          }`}>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Rời tab: {tabSwitches}</span>
          </div>

          {/* Đồng hồ đếm ngược */}
          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold shadow-xs ${
            timeLeft < 180 ? 'bg-rose-600 text-white animate-pulse' : 'bg-blue-600 text-white'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* CẢNH BÁO GIÁM THỊ KHI RỜI MÀN HÌNH BÀI THI */}
      {showWarning && !submitted && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Cảnh báo giám thị phòng thi:</strong> Em vừa rời khỏi màn hình bài thi. Hệ thống đã ghi nhận <strong>{tabSwitches} lần</strong> vi phạm và gửi về bàn Thầy Đỗ Mạnh Trường!
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowWarning(false)}
            className="text-xs font-bold text-amber-800 underline shrink-0 hover:text-amber-950"
          >
            Đã hiểu
          </button>
        </div>
      )}

      {/* BÁO CÁO KẾT QUẢ TOÀN DIỆN SAU KHI NỘP BÀI */}
      {submitted && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <Trophy className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Báo Cáo Kết Quả Bài Kiểm Tra
            </h2>
            <div className="text-5xl font-extrabold text-blue-600">
              {score} <span className="text-2xl text-slate-400 font-normal">/ 10 điểm</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Điểm thi đã được đồng bộ tự động lên cơ sở dữ liệu học sinh của <strong>Thầy Đỗ Mạnh Trường</strong>.
            </p>
          </div>

          {/* PHÂN TÍCH MA TRẬN NHẬN THỨC THEO CHUẨN BỘ GD&ĐT */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Phân tích kết quả theo Ma trận nhận thức</span>
              </span>
              <span className="text-xs font-semibold text-blue-600">Chuẩn GDPT 2018</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Nhận biết */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="text-xs font-semibold text-slate-600">1. Nhận biết</span>
                <div className="text-lg font-bold text-slate-900">
                  {cognitiveBreakdown.nhanBiet.correct} / {cognitiveBreakdown.nhanBiet.total}
                  <span className="text-xs font-normal text-slate-500 ml-1">câu</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
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
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="text-xs font-semibold text-slate-600">2. Thông hiểu</span>
                <div className="text-lg font-bold text-slate-900">
                  {cognitiveBreakdown.thongHieu.correct} / {cognitiveBreakdown.thongHieu.total}
                  <span className="text-xs font-normal text-slate-500 ml-1">câu</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
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
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="text-xs font-semibold text-slate-600">3. Vận dụng</span>
                <div className="text-lg font-bold text-slate-900">
                  {cognitiveBreakdown.vanDung.correct} / {cognitiveBreakdown.vanDung.total}
                  <span className="text-xs font-normal text-slate-500 ml-1">câu</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
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
              <span className="text-slate-700">
                Nhật ký giám sát thi cử: <strong>{tabSwitches} lần</strong> rời khỏi màn hình bài thi.
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full font-bold text-xs ${
                tabSwitches === 0
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {tabSwitches === 0 ? 'Nghiêm túc, không vi phạm' : 'Có hiện tượng rời tab'}
            </span>
          </div>

          {/* LỜI NHẬN XÉT CỦA THẦY ĐỖ MẠNH TRƯỜNG */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-blue-800">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Lời nhận xét của Thầy Đỗ Mạnh Trường:</span>
            </span>
            <p className="leading-relaxed pl-5 text-slate-700">
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
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all"
            >
              Danh sách đề thi khác
            </Link>
            <Link
              href="/student"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              Về Góc Học Tập Của Tôi
            </Link>
          </div>
        </div>
      )}

      {/* DANH SÁCH CÂU HỎI THI */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {exam.questions.map((q, idx) => {
          const studentAnswer = answers[q.id];
          const isAnswered = studentAnswer !== undefined;
          const isCorrect = submitted && isAnswered && studentAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all space-y-4 ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/40'
                    : 'border-rose-300 bg-rose-50/40'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs flex items-center justify-center">
                  C{idx + 1}
                </span>
                <span className="text-xs text-slate-500 font-semibold">{q.points} điểm · {q.level || 'Nhận biết'}</span>
              </div>

              <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                {q.content}
              </p>

              <div className="space-y-2.5 pt-2">
                {q.options?.map((opt, optIdx) => {
                  const isSelected = studentAnswer === optIdx;
                  const isRealCorrect = q.correctAnswer === optIdx;

                  let optClass = 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100';

                  if (submitted) {
                    if (isRealCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected && !isRealCorrect) {
                      optClass = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                    }
                  } else if (isSelected) {
                    optClass = 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs';
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
                        <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-bold text-xs text-slate-700 flex items-center justify-center shrink-0">
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
                <div className="mt-3 p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-blue-800 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Lời giải thích của Thầy Đỗ Mạnh Trường:</span>
                  </span>
                  <p className="pl-5 leading-relaxed text-slate-600">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {!submitted && (
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>NỘP BÀI KIỂM TRA ĐỊNH KỲ</span>
          </button>
        )}
      </form>
    </div>
  );
}
