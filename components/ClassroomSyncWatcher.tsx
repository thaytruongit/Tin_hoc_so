'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Lock, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  Volume2, 
  Send, 
  X, 
  ArrowRight, 
  Award,
  Laptop,
  CheckCircle2,
  Users
} from 'lucide-react';
import { 
  ClassroomControlState, 
  getClassroomState, 
  subscribeToClassroomState,
  sendStudentHelpRequest 
} from '@/lib/classroom-control';
import { getCurrentUser, UserSession } from '@/lib/auth';

export default function ClassroomSyncWatcher() {
  const router = useRouter();
  const pathname = usePathname();
  
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [state, setState] = useState<ClassroomControlState>(getClassroomState());
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpMessage, setHelpMessage] = useState('');
  const [helpSent, setHelpSent] = useState(false);
  const [closedBroadcast, setClosedBroadcast] = useState<string>('');

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [pathname]);

  useEffect(() => {
    // Đăng ký nhận sự kiện điều khiển thời gian thực
    const unsubscribe = subscribeToClassroomState((newState) => {
      setState(newState);
    });

    return () => unsubscribe();
  }, []);

  // Nếu người dùng là Giáo viên hoặc đang ở trang giáo viên thì không bị khóa màn hình
  const isTeacher = currentUser?.role === 'teacher' || pathname.startsWith('/teacher');

  const handleSendHelp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpMessage.trim()) return;

    const studentNames = currentUser?.pairNames || currentUser?.studentName || 'Học sinh';
    const className = currentUser?.studentClass || state.activeClassName || 'Lớp học';
    
    // Tìm máy tương ứng hoặc mặc định Máy 01
    const machineId = 1;
    const machineName = 'Máy trạm HS';

    sendStudentHelpRequest(machineId, machineName, studentNames, className, helpMessage.trim());
    setHelpSent(true);
    setTimeout(() => {
      setHelpSent(false);
      setShowHelpModal(false);
      setHelpMessage('');
    }, 2000);
  };

  // Định dạng đồng hồ đếm ngược mm:ss
  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* ==================================================================== */}
      {/* 1. MÀN HÌNH KHÓA TẬP TRUNG (KHI THẦY TRƯƠNG KHÓA PHÒNG MÁY / GIẢNG BÀI) */}
      {/* ==================================================================== */}
      {!isTeacher && state.isScreenLocked && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 text-white animate-fadeIn select-none">
          <div className="max-w-2xl w-full text-center space-y-6 p-8 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 relative overflow-hidden">
            {/* Vạch chỉ báo điều khiển giáo viên */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 animate-pulse" />

            <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30 shadow-inner">
              <Lock className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/30">
                🛑 THẦY TRƯƠNG ĐANG ĐIỀU KHIỂN PHÒNG MÁY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                VUI LÒNG DỪNG THAO TÁC MÁY
              </h2>
              <p className="text-base text-amber-200/90 font-medium">
                Tập trung chú ý quan sát lên màn chiếu và lắng nghe Thầy hướng dẫn
              </p>
            </div>

            {/* Khung lý do / Thông điệp của Thầy */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-slate-300 text-sm italic max-w-xl mx-auto">
              &quot;{state.lockReason}&quot;
            </div>

            {/* Thông tin tiết học & Đồng hồ */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5 text-blue-300">
                <Laptop className="w-4 h-4" />
                <span>{state.activeClassName}</span>
              </span>
              <span>·</span>
              <span className="text-slate-300 font-bold">{state.lessonTitle}</span>
              
              {state.isTimerRunning && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 font-mono font-black text-sm border border-rose-500/30">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>{formatTimer(state.timerRemainingSeconds)}</span>
                  </span>
                </>
              )}
            </div>

            <p className="text-[11px] text-slate-500">
              Màn hình sẽ tự động mở khóa ngay khi Thầy Trương phát lệnh mở hoạt động tiếp theo.
            </p>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. THANH THÔNG BÁO KHẨN TỪ THẦY TRƯƠNG (BROADCAST MARQUEE BANNER) */}
      {/* ==================================================================== */}
      {!isTeacher && state.broadcastMessage && closedBroadcast !== state.broadcastMessage && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 text-white px-4 py-2.5 shadow-lg flex items-center justify-between gap-3 text-xs sm:text-sm font-bold animate-slideDown">
          <div className="flex items-center gap-2 max-w-5xl mx-auto">
            <Volume2 className="w-4 h-4 shrink-0 text-amber-200 animate-pulse" />
            <span>📢 <strong>Thầy Trương thông báo:</strong> {state.broadcastMessage}</span>
          </div>
          <button
            onClick={() => setClosedBroadcast(state.broadcastMessage)}
            className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white shrink-0"
            title="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. BANNER CHUYỂN PHA BÀI HỌC (QUICK JUMP TO ACTIVITY) */}
      {/* ==================================================================== */}
      {!isTeacher && !state.isScreenLocked && state.phase !== 'free' && state.phase !== 'lecture_lock' && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-20 z-40 max-w-md bg-white rounded-2xl border-2 border-blue-500 shadow-2xl p-4 text-slate-900 animate-slideUp">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
                  Tiến trình bài học trực tiếp
                </span>
                <h4 className="text-xs font-bold text-slate-900">
                  {state.phase === 'phase_1_warmup' && 'Pha 1: Khởi động & Quan sát Slide bài giảng'}
                  {state.phase === 'phase_2_pair' && 'Pha 2: Khám phá Cặp đôi (2 HS/máy)'}
                  {state.phase === 'phase_3_practice' && 'Pha 3: Luyện tập củng cố 7 câu chuẩn Bộ'}
                  {state.phase === 'phase_4_practical' && 'Pha 4: Thực hành trên máy tính'}
                  {state.phase === 'phase_5_submit' && '🛑 Hết giờ: Thu bài đồng loạt!'}
                  {state.phase === 'spotlight' && '🏆 Thầy đang chiếu bài làm học sinh xuất sắc!'}
                </h4>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-500">
              {state.activeClassName} · {state.lessonTitle}
            </span>
            {state.phase === 'phase_1_warmup' && (
              <button
                onClick={() => router.push(`/in-class?grade=${state.activeGrade}&period=${state.activePeriod}&tab=slide`)}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
              >
                <span>Xem Slide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {state.phase === 'phase_2_pair' && (
              <button
                onClick={() => router.push(`/in-class?grade=${state.activeGrade}&period=${state.activePeriod}&tab=worksheet`)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
              >
                <span>Vào Phiếu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {state.phase === 'phase_3_practice' && (
              <button
                onClick={() => router.push(`/in-class?grade=${state.activeGrade}&period=${state.activePeriod}&tab=reinforcement`)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
              >
                <span>Làm 7 câu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {state.phase === 'phase_4_practical' && (
              <button
                onClick={() => router.push(`/in-class?grade=${state.activeGrade}&period=${state.activePeriod}&tab=practice`)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
              >
                <span>Nhiệm vụ máy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. NÚT NỔI "GỌI THẦY TRỢ GIÚP 🙋‍♂️" DÀNH CHO HỌC SINH TẠI PHÒNG MÁY */}
      {/* ==================================================================== */}
      {!isTeacher && !state.isScreenLocked && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs shadow-xl shadow-rose-600/30 transition-all hover:scale-105"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Cần Thầy trợ giúp</span>
            <span>🙋‍♂️</span>
          </button>
        </div>
      )}

      {/* MODAL GỬI YÊU CẦU TRỢ GIÚP */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm">
                <HelpCircle className="w-5 h-5" />
                <span>Gửi tín hiệu trợ giúp lên bàn Thầy Trương</span>
              </div>
              <button onClick={() => setShowHelpModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {helpSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Đã gửi tín hiệu tới bàn Thầy! Thầy Trương sẽ đến bàn hỗ trợ em ngay.</span>
              </div>
            ) : (
              <form onSubmit={handleSendHelp} className="space-y-3">
                <p className="text-xs text-slate-600">
                  Em hoặc cặp đôi của mình đang gặp khó khăn ở phần nào? Hãy mô tả ngắn gọn để Thầy hỗ trợ kịp thời:
                </p>

                <textarea
                  required
                  rows={3}
                  value={helpMessage}
                  onChange={(e) => setHelpMessage(e.target.value)}
                  placeholder="Ví dụ: Thưa Thầy, câu 4 tụi em gõ hàm AVERAGE bị báo lỗi #NAME? ạ..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                />

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowHelpModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi tín hiệu 🙋‍♂️</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
