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
  Award,
  RefreshCw,
  Info,
  Radio,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
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

  // Map tra cứu máy nhanh
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

  const handleQuickAwardStar = (e: React.MouseEvent, machineId: number) => {
    e.stopPropagation();
    onAwardStar(machineId);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm relative overflow-hidden">
      
      {/* ==================================================================== */}
      {/* 1. THANH TRẠNG THÁI TRÊN CÙNG: ĐIỀU HÀNH PHÒNG MÁY & ĐỒNG HỒ        */}
      {/* ==================================================================== */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs font-black text-lg">
            <Monitor className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Thầy Đỗ Mạnh Trường · Giáo viên phụ trách
              </span>
              <span className="text-xs font-bold text-slate-800">
                {lessonTitle}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-600 mt-0.5 flex items-center gap-2">
              <span>Đang mở: <strong className="text-blue-700">{activeActivityName}</strong></span>
              <span>· Ấn định: <strong>{activityDurationMinutes} phút</strong></span>
            </p>
          </div>
        </div>

        {/* Đồng hồ ấn định & trạng thái chốt */}
        <div className="flex items-center gap-3">
          {isTimeUp ? (
            <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hết giờ! Đã chốt điểm ({stats.completed}/{stats.active} máy)</span>
            </div>
          ) : (
            <div className="px-4 py-2 rounded-xl bg-white text-slate-800 font-mono font-bold text-xs flex items-center gap-2 border border-slate-200 shadow-2xs">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Thời gian còn:</span>
              <span className="text-blue-700 font-black text-sm">{formatTimer(remainingSeconds)}</span>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-3 text-xs font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-blue-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              {stats.active}/24 Máy Đang Kết Nối
            </span>
            {stats.pendingHelp > 0 && (
              <span className="text-rose-600 flex items-center gap-1 font-bold animate-bounce">
                <span>🆘</span>
                <span>{stats.pendingHelp} Máy Cần Giúp</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. KHÔNG GIAN BÀN GHẾ PHÒNG MÁY & BẢNG THI ĐUA GÓC PHẢI             */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* KHÔNG GIAN BÀN GHẾ PHÒNG MÁY (9 CỘT) */}
        <div className="lg:col-span-9 bg-slate-50/70 p-5 sm:p-7 rounded-3xl border border-slate-200 relative">
          
          {/* Bục giảng Thầy giáo phía trên */}
          <div className="text-center mb-6">
            <div className="inline-block px-8 py-2 rounded-2xl bg-slate-900 text-white font-bold text-xs tracking-wider shadow-xs uppercase">
              BÀN GIẢNG VIÊN TRUNG TÂM · THẦY ĐỖ MẠNH TRƯỜNG
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-1.5">
              Sơ đồ 24 máy trạm Ziczac từ phải qua trái: Hàng 1: [4-3-2-1] ➔ Hàng 2: [5-6-7-8]... (Chuyển động sinh động)
            </p>
          </div>

          {/* Ma trận các hàng bàn ziczac */}
          <div className="space-y-6">
            {classroomRows.map((row) => (
              <div key={row.rowNum} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 px-1">
                  <span>Hàng {row.rowNum}</span>
                  <span className="text-[10px] text-slate-400">Máy: {row.machineIds.join(' ➔ ')}</span>
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
                      totalTasks: 3,
                      starsEarned: 0,
                      status: 'idle',
                      hasHelpRequest: false
                    };

                    const pendingHelpReq = helpRequests.find(
                      (r) => r.machineId === mId && r.status === 'pending'
                    );
                    const hasHelp = Boolean(pendingHelpReq);
                    const isOnline = Boolean(machine.student1Name);

                    // Xác định hoạt động học sinh đang làm
                    let activityLabel = 'Rảnh rỗi';
                    let activityBadgeClass = 'bg-slate-100 text-slate-500';
                    if (machine.completedTasks === 3 || machine.progress === 100) {
                      activityLabel = '✓ Hoàn thành 3 HĐ';
                      activityBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                    } else if (machine.scoreH2 && machine.scoreH2 > 0) {
                      activityLabel = 'HĐ3: Thực hành Drive';
                      activityBadgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
                    } else if (machine.scoreH1 && machine.scoreH1 > 0) {
                      activityLabel = 'HĐ2: Luyện tập 7 câu';
                      activityBadgeClass = 'bg-indigo-100 text-indigo-800 border-indigo-300';
                    } else if (isOnline) {
                      activityLabel = 'HĐ1: Khám phá cặp';
                      activityBadgeClass = 'bg-blue-100 text-blue-800 border-blue-300';
                    }

                    return (
                      <div
                        key={mId}
                        onClick={() => setSelectedMachine(machine)}
                        className={`cursor-pointer transition-all duration-300 rounded-2xl p-3 relative group flex flex-col justify-between border-2 ${
                          hasHelp
                            ? 'bg-rose-50 border-rose-500 shadow-md alert-shake-gentle help-pulse-ring'
                            : isOnline
                            ? machine.progress === 100
                              ? 'bg-emerald-50/90 border-emerald-400 shadow-2xs hover:-translate-y-1'
                              : 'bg-white border-blue-300 shadow-2xs hover:-translate-y-1 hover:border-blue-600 hover:shadow-md'
                            : 'bg-white border-dashed border-slate-300 opacity-60 hover:opacity-100'
                        }`}
                      >
                        {/* Header của thẻ bàn máy */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                              isOnline ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                            }`}>
                              <Laptop className="w-3 h-3" />
                              <span>M{mId < 10 ? `0${mId}` : mId}</span>
                            </span>

                            {/* Xung nhịp kết nối trực tuyến (Motion Ripple) */}
                            {isOnline && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 radar-live-pulse" title="Trực tuyến" />
                            )}
                          </div>

                          {/* Sao thi đua */}
                          <button
                            type="button"
                            onClick={(e) => handleQuickAwardStar(e, mId)}
                            className="flex items-center text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-1.5 py-0.5 rounded-md border border-amber-200 text-[11px] font-bold transition-all"
                            title="Tặng sao thưởng tức thì cho máy này"
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            <span className="ml-1">{machine.starsEarned || 0}</span>
                          </button>
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
                                <div className="text-[10px] text-slate-400 italic">
                                  (Ngồi 1 bạn)
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-[11px] text-slate-400 italic text-center py-1">
                              Trạm trống
                            </div>
                          )}
                        </div>

                        {/* HUY HIỆU HOẠT ĐỘNG SỐNG (DYNAMIC ACTIVITY BADGE) */}
                        <div className="my-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border block truncate text-center ${activityBadgeClass}`}>
                            {activityLabel}
                          </span>
                        </div>

                        {/* THANH TIẾN ĐỘ HOẠT HỌA CHUYỂN ĐỘNG (ANIMATED FLOWING PROGRESS) */}
                        <div className="space-y-1 mt-1">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                            <span>Tiến độ:</span>
                            <span className={machine.progress === 100 ? 'text-emerald-700' : 'text-blue-700'}>
                              {machine.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                machine.progress === 100
                                  ? 'bg-emerald-500'
                                  : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 animated-flowing-bar'
                              }`}
                              style={{ width: `${machine.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* CẢNH BÁO CẦN TRỢ GIÚP (NẾU CÓ) */}
                        {hasHelp && (
                          <div className="mt-2 pt-1.5 border-t border-rose-200 flex items-center justify-between gap-1 text-[10px] text-rose-700 font-bold">
                            <span className="truncate">Cần trợ giúp!</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (pendingHelpReq) onResolveHelp(pendingHelpReq.id);
                              }}
                              className="px-1.5 py-0.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-[9px] font-bold shrink-0"
                            >
                              Đã giúp
                            </button>
                          </div>
                        )}

                        {/* NÚT THAO TÁC NHANH TRÊN MÁY */}
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSpotlight(machine);
                            }}
                            className="text-[10px] text-indigo-700 hover:text-indigo-900 font-semibold flex items-center gap-0.5"
                            title="Chiếu bài mẫu của máy này lên bảng tin cả lớp"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Chiếu bài</span>
                          </button>

                          <span className="text-[10px] font-bold text-slate-600">
                            {machine.totalScore ? `${machine.totalScore}đ` : '—'}
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* CỘT PHẢI: BẢNG VINH DANH & YÊU CẦU TRỢ GIÚP (3 CỘT) */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* BẢNG VINH DANH THI ĐUA */}
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-700">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Vinh Danh Nhóm Xuất Sắc</span>
            </div>

            <div className="space-y-2">
              {leaderboard.map((m, idx) => (
                <div
                  key={m.machineId}
                  className="p-2.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] shrink-0 ${
                      idx === 0 ? 'bg-amber-400 text-amber-950' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">{m.machineName}</div>
                      <div className="text-[10px] text-slate-500 truncate">{m.student1Name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-600 font-bold text-xs shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{m.starsEarned}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DANH SÁCH YÊU CẦU TRỢ GIÚP TỪ HỌC SINH */}
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-700">
                <HelpCircle className="w-4 h-4 text-rose-600" />
                <span>Yêu Cầu Trợ Giúp ({stats.pendingHelp})</span>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {helpRequests.filter(h => h.status === 'pending').length === 0 ? (
                <div className="text-center py-4 text-slate-400 text-xs italic">
                  Chưa có máy trạm nào yêu cầu trợ giúp
                </div>
              ) : (
                helpRequests
                  .filter(h => h.status === 'pending')
                  .map((req) => (
                    <div
                      key={req.id}
                      className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between font-bold text-rose-900">
                        <span>{req.machineName} ({req.studentName})</span>
                        <span className="text-[10px] text-slate-400 font-normal">{req.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed italic">
                        "{req.message}"
                      </p>
                      <button
                        type="button"
                        onClick={() => onResolveHelp(req.id)}
                        className="w-full py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] transition-colors"
                      >
                        ✓ Thầy Đã Hướng Dẫn Xong
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* MODAL CHI TIẾT KHI THẦY CLICK VÀO 1 MÁY TRẠM                        */}
      {/* ==================================================================== */}
      {selectedMachine && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-blue-600" />
                <span className="text-base font-extrabold text-slate-900">
                  Chi Tiết {selectedMachine.machineName}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMachine(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
                <div className="font-bold text-slate-800">
                  Học sinh 1 (Kỹ thuật viên): <strong className="text-blue-700">{selectedMachine.student1Name || 'Trống'}</strong>
                </div>
                {selectedMachine.student2Name && (
                  <div className="font-bold text-slate-800">
                    Học sinh 2 (Thư ký): <strong className="text-indigo-700">{selectedMachine.student2Name}</strong>
                  </div>
                )}
              </div>

              {/* Bảng điểm 3 hoạt động */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold">HĐ1 (Khám phá)</div>
                  <div className="text-sm font-black text-blue-700">{selectedMachine.scoreH1 ?? '—'}/10</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold">HĐ2 (Luyện tập)</div>
                  <div className="text-sm font-black text-indigo-700">{selectedMachine.scoreH2 ?? '—'}/10</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold">HĐ3 (Thực hành)</div>
                  <div className="text-sm font-black text-amber-700">{selectedMachine.scoreH3 ?? '—'}/10</div>
                </div>
              </div>

              {selectedMachine.practicalFileName && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center justify-between">
                  <span>Tệp nộp Google Drive: <strong>{selectedMachine.practicalFileName}</strong></span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              )}
            </div>

            {/* Thao tác của Thầy */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onAwardStar(selectedMachine.machineId);
                  setSelectedMachine((prev) => prev ? { ...prev, starsEarned: prev.starsEarned + 1 } : null);
                  confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Tặng Sao Thưởng ⭐</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSpotlight(selectedMachine);
                  setSelectedMachine(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Eye className="w-4 h-4" />
                <span>Chiếu Bài Mẫu</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}