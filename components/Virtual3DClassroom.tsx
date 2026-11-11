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

  // Top vinh danh chiến binh dẫn đầu phòng máy
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
    <div className="w-full cyber-hud-card rounded-3xl p-5 sm:p-7 border border-cyan-500/30 shadow-neon-cyan/20 relative overflow-hidden">
      {/* 1. THANH TRẠNG THÁI TRÊN CÙNG: ĐÀI CHỈ HUY & ĐỒNG HỒ TÁC CHIẾN */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/30 shadow-xs mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-neon-cyan/50 font-black text-lg border border-cyan-300/40">
            <Crown className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-400/40 glow-text-cyan">
                Thầy Đỗ Mạnh Trường · Tổng Chỉ Huy
              </span>
              <span className="text-xs font-extrabold text-purple-300">
                {lessonTitle}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-300 mt-0.5">
              Nhiệm vụ: <strong className="text-cyan-400">{activeActivityName}</strong> (Thời gian ấn định: {activityDurationMinutes} phút)
            </p>
          </div>
        </div>

        {/* Đồng hồ ấn định & trạng thái chốt */}
        <div className="flex items-center gap-3">
          {isTimeUp ? (
            <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-2 shadow-neon-mana/50 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hết giờ! Đã chốt điểm ({stats.completed}/{stats.active} trạm)</span>
            </div>
          ) : (
            <div className="px-4 py-2 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center gap-2 border border-slate-800 shadow-xs">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Đồng hồ:</span>
              <span className="text-cyan-400 font-black text-sm">{formatTimer(remainingSeconds)}</span>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-2 text-xs font-bold bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-cyan-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              {stats.active}/24 Trạm Online
            </span>
            {stats.pendingHelp > 0 && (
              <span className="text-rose-400 animate-bounce flex items-center gap-1">
                <span>🆘</span>
                <span>{stats.pendingHelp} SOS Cần Cứu Viện</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. KHÔNG GIAN BÀN GHẾ 3D PHÒNG MÁY & BẢNG VINH DANH GÓC PHẢI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* KHÔNG GIAN BÀN GHẾ 3D PHÒNG MÁY (9 CỘT) */}
        <div className="lg:col-span-9 bg-slate-950/90 p-5 sm:p-7 rounded-3xl border border-cyan-500/30 shadow-inner relative cyber-grid-bg">
          
          {/* Bục giảng Thầy giáo phía trên */}
          <div className="text-center mb-6">
            <div className="inline-block px-8 py-2 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-black text-xs tracking-wider shadow-neon-cyan/40 border border-cyan-300/40 uppercase">
              👑 ĐÀI CHỈ HUY TRUNG TÂM · THẦY ĐỖ MẠNH TRƯỜNG
            </div>
            <p className="text-[11px] text-cyan-300/80 font-bold mt-1.5">
              Phòng Máy THCS Mão Điền (Lưới tọa độ Ziczac từ phải qua trái: Hàng 1: [4-3-2-1] ➔ Hàng 2: [5-6-7-8]...)
            </p>
          </div>

          {/* Ma trận các hàng bàn ziczac */}
          <div className="space-y-6">
            {classroomRows.map((row) => (
              <div key={row.rowNum} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-black text-cyan-400/80 px-1">
                  <span>Hàng {row.rowNum}</span>
                  <span className="text-[10px] text-purple-300">Trạm máy: {row.machineIds.join(' ➔ ')}</span>
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
                            ? 'bg-rose-950/80 border-rose-500 shadow-neon-crimson/50 scale-105 animate-pulse'
                            : isOnline
                            ? machine.progress === 100
                              ? 'bg-emerald-950/80 border-emerald-400 shadow-neon-mana/40 hover:-translate-y-1'
                              : 'bg-slate-900/90 border-cyan-500/50 shadow-neon-cyan/20 hover:-translate-y-1 hover:border-cyan-300'
                            : 'bg-slate-950/50 border-dashed border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                        style={{
                          transform: 'perspective(600px) rotateX(4deg)',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {/* Header của thẻ bàn máy */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                            isOnline ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                          }`}>
                            <Laptop className="w-3 h-3" />
                            <span>M{mId < 10 ? `0${mId}` : mId}</span>
                          </span>

                          {/* Sao thi đua */}
                          <div className="flex items-center text-amber-400 text-[11px] font-black">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span className="ml-0.5">{machine.starsEarned || 0}</span>
                          </div>
                        </div>

                        {/* Tên 2 bạn học sinh ngồi cặp */}
                        <div className="min-h-[38px] flex flex-col justify-center my-1 text-left">
                          {isOnline ? (
                            <>
                              <div className="text-xs font-black text-white truncate group-hover:text-cyan-300">
                                1. {machine.student1Name}
                              </div>
                              {machine.student2Name ? (
                                <div className="text-[11px] font-bold text-slate-400 truncate">
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
                          <div className="bg-rose-500 text-white font-black text-[10px] py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 animate-bounce">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Cần Thầy Giúp!</span>
                          </div>
                        ) : isOnline ? (
                          <div className="space-y-1 mt-1">
                            <div className="flex items-center justify-between text-[10px] font-black">
                              <span className="text-slate-400">Tiến độ</span>
                              <span className={machine.progress === 100 ? 'text-emerald-400 font-extrabold' : 'text-cyan-300'}>
                                {machine.progress}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  machine.progress === 100
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                }`}
                                style={{ width: `${machine.progress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-600 text-center py-0.5">
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

        {/* CỘT PHẢI: BẢNG VINH DANH SERVER & KHUNG QUẢN TRỊ TRẠM MÁY (3 CỘT) */}
        <div className="lg:col-span-3 space-y-4">
          {/* BẢNG VINH DANH THI ĐUA */}
          <div className="cyber-hud-card rounded-3xl p-5 border border-amber-500/30 shadow-neon-gold/20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <span className="font-black text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5 glow-text-gold">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Chiến Binh Tiêu Biểu</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 font-bold border border-amber-500/40">
                Top Máy
              </span>
            </div>

            <div className="space-y-2.5">
              {leaderboard.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-4">
                  Chưa có trạm nào hoàn thành
                </p>
              ) : (
                leaderboard.map((item, idx) => (
                  <div
                    key={item.machineId}
                    className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                        idx === 0
                          ? 'bg-amber-400 text-slate-950 shadow-neon-gold/40'
                          : idx === 1
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-purple-600 text-white text-[10px]'
                      }`}>
                        {idx === 0 ? '👑' : idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-black text-white truncate">
                          {item.student1Name || `Máy ${item.machineId}`}
                        </div>
                        <div className="text-[10px] text-cyan-400 font-bold">
                          Máy {item.machineId} · {item.progress}% xong
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-black text-xs text-amber-400 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.starsEarned || 0}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* HỘP CHI TIẾT KHI THẦY NHẤP VÀO 1 MÁY BẤT KỲ */}
          {selectedMachine ? (
            <div className="cyber-hud-card rounded-3xl p-5 border border-cyan-500/40 shadow-neon-cyan/30 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="font-black text-xs text-cyan-300 flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <span>Chi tiết Máy {selectedMachine.machineId}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedMachine(null)}
                  className="text-slate-500 hover:text-white text-xs font-bold"
                >
                  ✕ Đóng
                </button>
              </div>

              <div className="text-xs space-y-1 text-slate-300">
                <div>
                  Học sinh 1: <strong className="text-cyan-300">{selectedMachine.student1Name || 'Chưa đăng nhập'}</strong>
                </div>
                {selectedMachine.student2Name && (
                  <div>
                    Học sinh 2: <strong className="text-purple-300">{selectedMachine.student2Name}</strong>
                  </div>
                )}
                <div className="text-slate-400">
                  Tiến độ: <strong className="text-white">{selectedMachine.progress}%</strong> ({selectedMachine.completedTasks}/{selectedMachine.totalTasks} câu)
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onAwardStar(selectedMachine.machineId)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-neon-gold/40 transition-all"
                >
                  <Star className="w-4 h-4 fill-slate-950" />
                  <span>Tặng +1 Sao Tuyên Dương</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSpotlight(selectedMachine)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-neon-cyan/40 transition-all border border-cyan-400/30"
                >
                  <Eye className="w-4 h-4" />
                  <span>Chiếu Hologram Máy Này</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-3xl cyber-hud-card border border-dashed border-slate-800 text-center">
              <Info className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
              <p className="text-xs text-cyan-300 font-bold">Đặc quyền của Tổng chỉ huy:</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Bấm vào bất kỳ trạm máy nào trên radar 3D để Buff Sao Thưởng hoặc Chiếu Hologram bài mẫu toàn phòng!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
