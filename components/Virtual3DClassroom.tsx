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
  Info
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

  // Quy chuẩn đánh số máy ziczac phòng thực hành từ phải qua trái theo yêu cầu của Thầy:
  // Hàng 1 (Dãy 1): 4, 3, 2, 1
  // Hàng 2 (Dãy 1): 5, 6, 7, 8
  // Hàng 3 (Dãy 1): 12, 11, 10, 9
  // Hàng 4 (Dãy 1): 13, 14, 15, 16
  // Hàng 5 (Dãy 1): 20, 19, 18, 17
  // Hàng 6 (Dãy 1): 21, 22, 23, 24
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

  // Top vinh danh học sinh tích cực nhất
  const leaderboard = useMemo(() => {
    return [...machines]
      .filter((m) => m.student1Name || m.starsEarned > 0 || m.progress > 0)
      .sort((a, b) => b.starsEarned - a.starsEarned || b.progress - a.progress)
      .slice(0, 4);
  }, [machines]);

  // Thống kê tổng quan phòng máy
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
    <div className="w-full bg-gradient-to-b from-amber-50 via-amber-100/40 to-slate-100 rounded-3xl p-4 sm:p-6 border border-amber-200/80 shadow-lg relative overflow-hidden">
      {/* 1. THANH TRẠNG THÁI TRÊN CÙNG: BỤC GIẢNG & THỜI GIAN ẤN ĐỊNH */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-amber-300 shadow-xs mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20 font-black text-lg">
            👩‍🏫
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Thầy Đỗ Mạnh Trường Đang Giảng Dạy
              </span>
              <span className="text-xs font-extrabold text-indigo-700">
                {lessonTitle}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-600 mt-0.5">
              Hoạt động hiện tại: <strong className="text-slate-900">{activeActivityName}</strong> (Thời gian ấn định: {activityDurationMinutes} phút)
            </p>
          </div>
        </div>

        {/* Đồng hồ ấn định & trạng thái chốt */}
        <div className="flex items-center gap-3">
          {isTimeUp ? (
            <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-2 shadow-md animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hết giờ! Đã chốt điểm tự động ({stats.completed}/{stats.active} máy)</span>
            </div>
          ) : (
            <div className="px-4 py-2 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-xs">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Thời gian còn:</span>
              <span className="text-amber-400 font-black text-sm">{formatTimer(remainingSeconds)}</span>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-2 text-xs font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-emerald-600">🟢 {stats.active} Máy online</span>
            {stats.pendingHelp > 0 && (
              <span className="text-rose-600 animate-bounce">🙋‍♂️ {stats.pendingHelp} Cần Thầy giúp</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. KHÔNG GIAN PHÒNG HỌC 3D & BẢNG VINH DANH GÓC PHẢI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* KHÔNG GIAN BÀN GHẾ 3D PHÒNG MÁY (9 CỘT) */}
        <div className="lg:col-span-9 bg-gradient-to-b from-[#fbf4ea] to-[#f4e4cf] p-5 sm:p-7 rounded-3xl border-2 border-[#e6cca8] shadow-inner relative">
          
          {/* Bục giảng Thầy giáo phía trên */}
          <div className="text-center mb-6">
            <div className="inline-block px-8 py-2 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white font-black text-xs tracking-wider shadow-md border-b-4 border-amber-950 uppercase">
              🖥️ BỤC GIẢNG & MÀN HÌNH CHÍNH CỦA THẦY TRƯỜNG
            </div>
            <p className="text-[11px] text-amber-800/80 font-bold mt-1">
              Phòng Máy THCS Mão Điền (Đánh số ziczac từ phải qua trái: Hàng 1: [4-3-2-1], Hàng 2: [5-6-7-8]...)
            </p>
          </div>

          {/* Ma trận các hàng bàn ziczac */}
          <div className="space-y-6">
            {classroomRows.map((row) => (
              <div key={row.rowNum} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-900/60 px-1">
                  <span>Hàng {row.rowNum}</span>
                  <span className="text-[10px] text-amber-700">Mã máy: {row.machineIds.join(' ➔ ')}</span>
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
                            ? 'bg-amber-100 border-amber-500 shadow-lg shadow-amber-500/30 scale-105 animate-pulse'
                            : isOnline
                            ? machine.progress === 100
                              ? 'bg-emerald-50/90 border-emerald-400 shadow-md hover:-translate-y-1'
                              : 'bg-white/95 border-indigo-300 shadow-md hover:-translate-y-1 hover:border-indigo-500'
                            : 'bg-amber-50/40 border-dashed border-amber-300 opacity-60 hover:opacity-100'
                        }`}
                        style={{
                          transform: 'perspective(600px) rotateX(4deg)',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {/* Header của thẻ bàn máy */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                            isOnline ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            <Laptop className="w-3 h-3" />
                            <span>M{mId < 10 ? `0${mId}` : mId}</span>
                          </span>

                          {/* Sao thi đua */}
                          <div className="flex items-center text-amber-500 text-[11px] font-black">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{machine.starsEarned || 0}</span>
                          </div>
                        </div>

                        {/* Mô phỏng 2 Học sinh ngồi học theo cặp */}
                        <div className="my-1.5 flex items-center justify-center gap-2">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs shadow-xs transition-all ${
                            isOnline ? 'bg-blue-100 border-blue-400 text-blue-800' : 'bg-slate-100 border-slate-300 text-slate-400'
                          }`} title={machine.student1Name || 'Trống'}>
                            🧑‍💻
                          </div>
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs shadow-xs transition-all ${
                            machine.student2Name ? 'bg-indigo-100 border-indigo-400 text-indigo-800' : 'bg-slate-100 border-dashed border-slate-300 text-slate-300'
                          }`} title={machine.student2Name || 'Chưa ghép bạn'}>
                            {machine.student2Name ? '🧑‍💻' : '+'}
                          </div>
                        </div>

                        {/* Tên cặp học sinh */}
                        <div className="text-center min-h-[32px] flex flex-col justify-center">
                          {isOnline ? (
                            <>
                              <div className="text-[11px] font-black text-slate-900 truncate" title={machine.student1Name}>
                                {machine.student1Name}
                              </div>
                              {machine.student2Name && (
                                <div className="text-[10px] font-bold text-slate-600 truncate" title={machine.student2Name}>
                                  + {machine.student2Name}
                                </div>
                              )}
                            </>
                          ) : (
                            <span className="text-[10px] text-amber-900/40 italic font-medium">Bàn trống</span>
                          )}
                        </div>

                        {/* Thanh tiến độ & trạng thái nộp bài */}
                        {isOnline && (
                          <div className="mt-2 space-y-0.5">
                            <div className="flex items-center justify-between text-[9px] font-bold">
                              <span className="text-slate-500">{machine.completedTasks || 0}/{machine.totalTasks || 7}</span>
                              <span className="text-indigo-600">{machine.progress || 0}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
                                style={{ width: `${machine.progress || 0}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Nhãn báo cần giúp đỡ */}
                        {hasHelp && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                            <HelpCircle className="w-3 h-3" />
                            <span>Cần Thầy!</span>
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

        {/* BẢNG VINH DANH & HÀNH ĐỘNG NHANH CỦA THẦY GÓC PHẢI (3 CỘT) */}
        <div className="lg:col-span-3 space-y-4">
          {/* BẢNG VINH DANH TIẾT HỌC (GIỐNG ẢNH THẦY GỬI) */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-amber-200 shadow-md">
            <div className="flex items-center gap-2 border-b border-amber-100 pb-3 mb-3">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                🌟 Bảng Tuyên Dương Tiết Học
              </h3>
            </div>

            <div className="space-y-3">
              {leaderboard.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4">
                  Chưa có nhóm nào hoàn thành bài tập
                </p>
              ) : (
                leaderboard.map((item, idx) => (
                  <div
                    key={item.machineId}
                    className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                        idx === 0
                          ? 'bg-amber-400 text-amber-950 shadow-xs'
                          : idx === 1
                          ? 'bg-slate-300 text-slate-800'
                          : 'bg-amber-700 text-white text-[10px]'
                      }`}>
                        {idx === 0 ? '👑' : idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-black text-slate-900 truncate">
                          {item.student1Name || `Máy ${item.machineId}`}
                        </div>
                        <div className="text-[10px] text-amber-700 font-bold">
                          Máy {item.machineId} · {item.progress}% xong
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-black text-xs text-amber-600 shrink-0">
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
            <div className="bg-white rounded-3xl p-5 border border-indigo-200 shadow-md space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="font-black text-xs text-indigo-900 flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-indigo-600" />
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

              <div className="text-xs space-y-1">
                <div className="text-slate-700">
                  Học sinh 1: <strong>{selectedMachine.student1Name || 'Chưa đăng nhập'}</strong>
                </div>
                {selectedMachine.student2Name && (
                  <div className="text-slate-700">
                    Học sinh 2: <strong>{selectedMachine.student2Name}</strong>
                  </div>
                )}
                <div className="text-slate-500">
                  Tiến độ: <strong>{selectedMachine.progress}%</strong> ({selectedMachine.completedTasks}/{selectedMachine.totalTasks} câu)
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onAwardStar(selectedMachine.machineId)}
                  className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                >
                  <Star className="w-4 h-4 fill-amber-950" />
                  <span>Tặng +1 Sao Tuyên Dương</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSpotlight(selectedMachine)}
                  className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Chiếu Bài Mẫu Máy Này</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-3xl bg-amber-50/50 border border-dashed border-amber-300 text-center">
              <Info className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
              <p className="text-xs text-amber-900 font-bold">Mẹo Sư Phạm của Thầy:</p>
              <p className="text-[11px] text-amber-800/80 mt-1">
                Nhấp vào từng bàn máy để tặng Sao thi đua hoặc chiếu bài làm mẫu lên toàn bộ phòng máy!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
