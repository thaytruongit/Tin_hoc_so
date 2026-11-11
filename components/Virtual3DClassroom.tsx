'use client';

import { useState, useMemo } from 'react';
import {
  Users,
  Star,
  Eye,
  AlertTriangle,
  Monitor,
  Laptop,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Trophy,
  Flame,
  Award,
  Maximize2,
  RefreshCw,
  Info,
  Crown,
  Zap,
  Radio,
  Shield
} from 'lucide-react';
import { LabMachineState, HelpRequest } from '@/lib/classroom-control';

interface Virtual3DClassroomProps {
  machines: LabMachineState[];
  helpRequests: HelpRequest[];
  activeActivityName: string;
  activePeriod: number;
  lessonTitle: string;
  remainingSeconds: number;
  activityDurationMinutes: number;
  isTimeUp: boolean;
  onAwardStar: (machineId: number) => void;
  onSpotlight: (machine: LabMachineState) => void;
  onResolveHelp: (requestId: string) => void;
}

export default function Virtual3DClassroom({
  machines,
  helpRequests,
  activeActivityName,
  activePeriod,
  lessonTitle,
  remainingSeconds,
  activityDurationMinutes,
  isTimeUp,
  onAwardStar,
  onSpotlight,
  onResolveHelp,
}: Virtual3DClassroomProps) {
  const [selectedMachine, setSelectedMachine] = useState<LabMachineState | null>(null);

  // Tạo map tra cứu máy nhanh
  const machineMap = useMemo(() => {
    const map = new Map<number, LabMachineState>();
    machines.forEach((m) => map.set(m.machineId, m));
    return map;
  }, [machines]);

  // Quy chuẩn đánh số máy ziczac phòng thực hành từ phải qua trái theo chuẩn y của Thầy:
  // Hàng 1: 4, 3, 2, 1
  // Hàng 2: 5, 6, 7, 8
  // Hàng 3: 12, 11, 10, 9
  // Hàng 4: 13, 14, 15, 16
  // Hàng 5: 20, 19, 18, 17
  // Hàng 6: 21, 22, 23, 24
  const classroomRows = useMemo(() => {
    return [
      { rowNum: 1, machineIds: [4, 3, 2, 1] },
      { rowNum: 2, machineIds: [5, 6, 7, 8] },
      { rowNum: 3, machineIds: [12, 11, 10, 9] },
      { rowNum: 4, machineIds: [13, 14, 15, 16] },
      { rowNum: 5, machineIds: [20, 19, 18, 17] },
      { rowNum: 6, machineIds: [21, 22, 23, 24] },
    ];
  }, []);

  // Top vinh danh học sinh dẫn đầu phòng máy
  const leaderboard = useMemo(() => {
    return [...machines]
      .filter((m) => m.student1Name || m.starsEarned > 0 || m.progress > 0)
      .sort((a, b) => b.starsEarned - a.starsEarned || b.progress - a.progress)
      .slice(0, 4);
  }, [machines]);

  // Thống kê radar tổng quan
  const stats = useMemo(() => {
    const active = machines.filter((m) => m.student1Name).length;
    const completed = machines.filter((m) => m.progress === 100).length;
    const pendingHelp = helpRequests.filter((h) => h.status === 'pending').length;
    return { active, completed, pendingHelp, total: machines.length };
  }, [machines, helpRequests]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm relative overflow-hidden">
      {/* 1. THANH TRẠNG THÁI TRÊN CÙNG: ĐIỀU HÀNH PHÒNG MÁY & ĐỒNG HỒ */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-sm font-black text-lg border border-blue-200">
            <Crown className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Thầy Đỗ Mạnh Trường · Giáo viên phụ trách
              </span>
              <span className="text-xs font-bold text-indigo-700">
                {lessonTitle}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-600 mt-0.5">
              Nhiệm vụ: <strong className="text-blue-700">{activeActivityName}</strong> (Thời gian ấn định: {activityDurationMinutes} phút)
            </p>
          </div>
        </div>

        {/* Đồng hồ ấn định & trạng thái chốt */}
        <div className="flex items-center gap-3">
          {isTimeUp ? (
            <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-xs animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hết giờ! Đã chốt điểm ({stats.completed}/{stats.active} máy)</span>
            </div>
          ) : (
            <div className="px-4 py-2 rounded-xl bg-white text-slate-800 font-mono font-bold text-xs flex items-center gap-2 border border-slate-200 shadow-xs">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Thời gian còn:</span>
              <span className="text-blue-700 font-black text-sm">{formatTimer(remainingSeconds)}</span>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-2 text-xs font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-blue-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              {stats.active}/24 Máy Đang Học
            </span>
            {stats.pendingHelp > 0 && (
              <span className="text-rose-600 animate-bounce flex items-center gap-1 font-bold">
                <span>🆘</span>
                <span>{stats.pendingHelp} Máy cần hỗ trợ</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. KHÔNG GIAN BÀN GHẾ PHÒNG MÁY & BẢNG THI ĐUA GÓC PHẢI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* KHÔNG GIAN BÀN GHẾ PHÒNG MÁY (9 CỘT) */}
        <div className="lg:col-span-9 bg-slate-50/70 p-5 sm:p-7 rounded-3xl border border-slate-200 relative">
          
          {/* Bục giảng Thầy giáo phía trên */}
          <div className="text-center mb-6">
            <div className="inline-block px-8 py-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs tracking-wider shadow-sm uppercase">
              BÀN GIẢNG VIÊN TRUNG TÂM · THẦY ĐỖ MẠNH TRƯỜNG
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-1.5">
              Sơ đồ bố trí 24 máy trạm Ziczac từ phải qua trái: Hàng 1: [4-3-2-1] ➔ Hàng 2: [5-6-7-8]...
            </p>
          </div>

          {/* Ma trận các hàng bàn ziczac */}
          <div className="space-y-6">
            {classroomRows.map((row) => (
              <div key={row.rowNum} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 px-1">
                  <span>Hàng {row.rowNum}</span>
                  <span className="text-[10px] text-slate-500">Máy: {row.machineIds.join(' ➔ ')}</span>
                </div>

                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  {row.machineIds.map((mId) => {
                    const machine = machineMap.get(mId) || {
                      machineId: mId,
                      machineName: `Máy ${mId < 10 ? `0${mId}` : mId}`,
                      student1Name: '',
                      student2Name: '',
                      progress: 0,
                      completedTasks: 0,
                      totalTasks: 7,
                      starsEarned: 0,
                      status: 'idle',
                      hasHelpRequest: false
                    };

                    const hasHelp = helpRequests.some(
                      (r) => r.machineId === mId && r.status === 'pending'
                    );

                    const isOnline = Boolean(machine.student1Name);

                    return (
                      <div
                        key={mId}
                        onClick={() => setSelectedMachine(machine)}
                        className={`cursor-pointer transition-all duration-200 rounded-2xl p-2.5 sm:p-3 relative group flex flex-col justify-between border-2 ${
                          hasHelp
                            ? 'bg-rose-50 border-rose-400 shadow-md scale-105 animate-pulse'
                            : isOnline
                            ? machine.progress === 100
                              ? 'bg-emerald-50/80 border-emerald-400 shadow-xs hover:-translate-y-1'
                              : 'bg-white border-blue-400 shadow-xs hover:-translate-y-1 hover:border-blue-600'
                            : 'bg-white border-dashed border-slate-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        {/* Header của thẻ bàn máy */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                            isOnline ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            <Laptop className="w-3 h-3" />
                            <span>M{mId < 10 ? `0${mId}` : mId}</span>
                          </span>

                          {/* Sao thi đua */}
                          <div className="flex items-center text-amber-500 text-[11px] font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span className="ml-0.5">{machine.starsEarned || 0}</span>
                          </div>
                        </div>

                        {/* Tên 2 bạn học sinh ngồi cặp */}
                        <div className="min-h-[38px] flex flex-col justify-center my-1 text-left">
                          {isOnline ? (
                            <>
                              <div className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-700">
                                1. {machine.student1Name}
                              </div>
                              {machine.student2Name ? (
                                <div className="text-[11px] font-semibold text-slate-600 truncate">
                                  2. {machine.student2Name}
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-500 italic">
                                  (Ngồi 1 bạn)
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-[11px] text-slate-500 italic text-center py-1">
                              Trạm chờ kết nối
                            </div>
                          )}
                        </div>

                        {/* Thanh tiến độ hoặc cảnh báo SOS */}
                        {hasHelp ? (
                          <div className="bg-rose-600 text-white font-bold text-[10px] py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 animate-bounce">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Cần Thầy Giúp!</span>
                          </div>
                        ) : isOnline ? (
                          <div className="space-y-1 mt-1">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="text-slate-500">Tiến độ</span>
                              <span className={machine.progress === 100 ? 'text-emerald-700 font-extrabold' : 'text-blue-700'}>
                                {machine.progress}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  machine.progress === 100
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                                }`}
                                style={{ width: `${machine.progress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-500 text-center py-0.5">
                            Trống
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: BẢNG VINH DANH THI ĐUA & CHI TIẾT MÁY (3 CỘT) */}
        <div className="lg:col-span-3 space-y-4">
          {/* BẢNG VINH DANH THI ĐUA */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
              <span className="font-bold text-xs text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Máy Trạm Tiêu Biểu</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                Dẫn đầu
              </span>
            </div>

            <div className="space-y-2.5">
              {leaderboard.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-4">
                  Chưa có máy nào hoàn thành
                </p>
              ) : (
                leaderboard.map((item, idx) => (
                  <div
                    key={item.machineId}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        idx === 0
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : idx === 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-purple-600 text-white text-[10px]'
                      }`}>
                        {idx === 0 ? '★' : idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {item.student1Name || `Máy ${item.machineId}`}
                        </div>
                        <div className="text-[10px] text-blue-600 font-medium">
                          Máy {item.machineId} · {item.progress}% hoàn thành
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-xs text-amber-600 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{item.starsEarned || 0}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* HỘP CHI TIẾT KHI THẦY NHẤP VÀO 1 MÁY BẤT KỲ */}
          {selectedMachine ? (
            <div className="bg-white rounded-3xl p-5 border border-blue-200 shadow-sm space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="font-bold text-xs text-blue-700 flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <span>Chi tiết Máy {selectedMachine.machineId}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedMachine(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕ Đóng
                </button>
              </div>

              <div className="text-xs space-y-1 text-slate-700">
                <div>
                  Học sinh 1: <strong className="text-blue-700">{selectedMachine.student1Name || 'Chưa đăng nhập'}</strong>
                </div>
                {selectedMachine.student2Name && (
                  <div>
                    Học sinh 2: <strong className="text-purple-700">{selectedMachine.student2Name}</strong>
                  </div>
                )}
                <div className="text-slate-600">
                  Tiến độ: <strong className="text-slate-900">{selectedMachine.progress}%</strong> ({selectedMachine.completedTasks}/{selectedMachine.totalTasks} câu)
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onAwardStar(selectedMachine.machineId)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                >
                  <Star className="w-4 h-4 fill-white" />
                  <span>Tuyên Dương +1 Sao ⭐</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSpotlight(selectedMachine)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Chiếu Bài Mẫu Của Máy Này</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-3xl bg-slate-50 border border-dashed border-slate-300 text-center">
              <Info className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
              <p className="text-xs text-slate-700 font-bold">Thao tác của Thầy Đỗ Mạnh Trường:</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Bấm vào bất kỳ máy trạm nào trên sơ đồ để Tặng Sao Khen Thưởng hoặc Chiếu Bài Mẫu toàn phòng học!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
