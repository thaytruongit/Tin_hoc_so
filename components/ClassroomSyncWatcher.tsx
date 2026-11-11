'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Volume2, 
  HelpCircle, 
  Send, 
  X, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Eye,
  Layers,
  Lock,
  Unlock,
  Laptop,
  Users
} from 'lucide-react';
import { 
  ClassroomControlState, 
  getClassroomState, 
  getDefaultClassroomState,
  subscribeToClassroomState,
  sendStudentHelpRequest 
} from '@/lib/classroom-control';
import { getCurrentUser, UserSession } from '@/lib/auth';

export default function ClassroomSyncWatcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [state, setState] = useState<ClassroomControlState>(getDefaultClassroomState());
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpMessage, setHelpMessage] = useState('');
  const [helpSent, setHelpSent] = useState(false);
  const [closedBroadcast, setClosedBroadcast] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    setCurrentUser(getCurrentUser());
    setState(getClassroomState());
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;
    // Đăng ký nhận sự kiện điều khiển thời gian thực qua Supabase Realtime / Broadcast
    const unsubscribe = subscribeToClassroomState((newState) => {
      setState(newState);
    });

    return () => unsubscribe();
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  // Nếu người dùng chưa đăng nhập, hoặc đang ở trang chủ/login, hoặc là Giáo viên thì không hiện các thông báo phòng máy
  const isAuthPage = pathname === '/' || pathname === '/login' || pathname.startsWith('/login');
  const isTeacher = currentUser?.role === 'teacher' || pathname.startsWith('/teacher') || pathname.startsWith('/admin');
  
  if (!currentUser?.isLoggedIn || isTeacher || isAuthPage) {
    return null;
  }

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

  return (
    <>
      {/* ==================================================================== */}
      {/* 1. THANH THÔNG BÁO KHẨN TỪ THẦY ĐỖ MẠNH TRƯỜNG */}
      {/* ==================================================================== */}
      {!isTeacher && state.broadcastMessage && closedBroadcast !== state.broadcastMessage && (
        <div className="fixed top-16 sm:top-20 left-0 right-0 z-30 bg-gradient-to-r from-amber-600 via-indigo-600 to-blue-700 text-white px-4 py-2.5 shadow-md flex items-center justify-between gap-3 text-xs sm:text-sm font-bold border-b border-white/20 animate-slideDown">
          <div className="flex items-center gap-2 max-w-5xl mx-auto truncate">
            <Volume2 className="w-4 h-4 shrink-0 text-amber-200 animate-pulse" />
            <span className="truncate">📢 <strong>Thầy Đỗ Mạnh Trường:</strong> {state.broadcastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setClosedBroadcast(state.broadcastMessage)}
            className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white shrink-0"
            title="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. SPOTLIGHT: CHIẾU BÀI MẪU XUẤT SẮC CỦA BẠN LÊN MÀN HÌNH CẢ LỚP */}
      {/* ==================================================================== */}
      {!isTeacher && state.spotlightMachineId && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-md bg-white rounded-3xl border-2 border-amber-400 shadow-2xl p-5 animate-slideUp">
          <div className="flex items-start justify-between gap-2 border-b border-amber-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-2xl bg-amber-100 text-amber-600">
                <Sparkles className="w-4 h-4 animate-spin" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">
                  Chiếu Bài Làm Xuất Sắc
                </span>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {state.spotlightTitle || 'Sản phẩm tiêu biểu từ bạn học'}
                </h4>
              </div>
            </div>
          </div>

          <div className="mt-2.5 space-y-1 text-xs">
            <p className="font-semibold text-slate-800">
              Nhóm: <span className="text-indigo-600 font-bold">{state.spotlightStudentNames}</span>
            </p>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {state.spotlightContent}
            </p>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. NÚT NỔI "GỌI THẦY TRỢ GIÚP 🙋‍♂️" DÀNH CHO HỌC SINH TẠI PHÒNG MÁY */}
      {/* ==================================================================== */}
      {!isTeacher && (
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
                <span>Gửi tín hiệu trợ giúp lên bàn Thầy Đỗ Mạnh Trường</span>
              </div>
              <button 
                type="button"
                onClick={() => setShowHelpModal(false)} 
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {helpSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Đã gửi tín hiệu tới bàn Thầy! Thầy Đỗ Mạnh Trường sẽ đến bàn hỗ trợ em ngay.</span>
              </div>
            ) : (
              <form onSubmit={handleSendHelp} className="space-y-3">
                <p className="text-xs text-slate-600">
                  Em hoặc cặp đôi của mình đang gặp khó khăn ở phần nào? Hãy nhập ngắn gọn để Thầy tới bàn hướng dẫn:
                </p>

                <textarea
                  required
                  rows={3}
                  value={helpMessage}
                  onChange={(e) => setHelpMessage(e.target.value)}
                  placeholder="Ví dụ: Thưa Thầy, câu 4 tụi em gõ hàm AVERAGE bị báo lỗi #NAME? ạ..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 font-medium"
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
