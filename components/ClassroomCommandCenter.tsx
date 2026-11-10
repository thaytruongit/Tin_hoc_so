'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Lock, 
  Unlock, 
  Clock, 
  Volume2, 
  Send, 
  Sparkles, 
  Users, 
  Radio, 
  Play, 
  Pause, 
  RotateCcw, 
  Award, 
  Star, 
  Eye, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Monitor, 
  Layers, 
  BookOpen, 
  RefreshCw, 
  ArrowRight,
  Laptop,
  Check,
  X,
  FileText,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { ClassItem, Student } from '@/lib/types';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { CURRICULUM_DATA } from '@/lib/curriculum-data';
import { 
  ClassroomControlState, 
  LessonPhase, 
  LabMachineState, 
  HelpRequest,
  getClassroomState, 
  updateClassroomState, 
  resolveHelpRequest, 
  awardStarToMachine, 
  subscribeToClassroomState,
  createDefaultMachines 
} from '@/lib/classroom-control';

interface ClassroomCommandCenterProps {
  currentClass: ClassItem;
  classStudents: Student[];
  onSelectClass?: (classId: string) => void;
}

export default function ClassroomCommandCenter({
  currentClass,
  classStudents,
  onSelectClass,
}: ClassroomCommandCenterProps) {
  const [controlState, setControlState] = useState<ClassroomControlState>(getClassroomState());
  const [customBroadcast, setCustomBroadcast] = useState('');
  const [customLockReason, setCustomLockReason] = useState(
    'Thầy Trương đang giảng bài. Vui lòng dừng thao tác máy, chú ý lắng nghe và quan sát lên màn chiếu!'
  );
  const [selectedPeriod, setSelectedPeriod] = useState<number>(controlState.activePeriod || 1);
  const [inspectingMachine, setInspectingMachine] = useState<LabMachineState | null>(null);

  // Đăng ký nhận sự kiện điều khiển thời gian thực
  useEffect(() => {
    const unsub = subscribeToClassroomState((newState) => {
      setControlState(newState);
    });
    return () => unsub();
  }, []);

  // Lấy dữ liệu 29 tiết học của khối hiện tại
  const gradeCurriculum = useMemo(() => {
    return CURRICULUM_DATA[currentClass.grade] || CURRICULUM_DATA[6];
  }, [currentClass.grade]);

  // Tiết học hiện tại
  const activeLesson = useMemo(() => {
    return gradeCurriculum.find((l) => l.period === selectedPeriod) || gradeCurriculum[0];
  }, [gradeCurriculum, selectedPeriod]);

  // Đồng bộ thông tin tiết và lớp vào trạng thái điều khiển
  const handleSyncLessonToLab = () => {
    updateClassroomState((prev) => ({
      ...prev,
      activeGrade: currentClass.grade,
      activeClassId: currentClass.id,
      activeClassName: currentClass.name,
      activePeriod: selectedPeriod,
      lessonTitle: `Tiết ${activeLesson.period}: ${activeLesson.title}`,
      broadcastMessage: `🔔 Bắt đầu Tiết ${activeLesson.period}: ${activeLesson.title} · ${currentClass.name}`,
    }));
  };

  // 1. Khóa / Mở khóa toàn bộ phòng máy
  const handleToggleLock = () => {
    const nextLocked = !controlState.isScreenLocked;
    updateClassroomState((prev) => ({
      ...prev,
      isScreenLocked: nextLocked,
      lockReason: customLockReason,
      phase: nextLocked ? 'lecture_lock' : 'free',
      broadcastMessage: nextLocked
        ? '🛑 PHÒNG MÁY ĐÃ KHÓA: Vui lòng dừng gõ phím, tập trung nhìn lên màn chiếu!'
        : '🟢 PHÒNG MÁY ĐÃ MỞ KHÓA: Học sinh tiếp tục làm bài.',
    }));
  };

  // 2. Chuyển pha bài học sư phạm chuẩn
  const handleActivatePhase = (phase: LessonPhase, timerMins: number, reason: string) => {
    updateClassroomState((prev) => ({
      ...prev,
      phase,
      isScreenLocked: phase === 'lecture_lock' || phase === 'phase_1_warmup',
      lockReason: reason,
      timerTotalSeconds: timerMins * 60,
      timerRemainingSeconds: timerMins * 60,
      isTimerRunning: timerMins > 0,
      timerLabel: 
        phase === 'phase_2_pair' ? 'Thời gian Khám phá Cặp đôi' :
        phase === 'phase_3_practice' ? 'Thời gian Luyện tập 7 câu' :
        phase === 'phase_4_practical' ? 'Thời gian Thực hành máy' : 'Thời gian bài học',
      broadcastMessage: `🚀 Thầy Trương đã kích hoạt: ${reason}`,
    }));
  };

  // 3. Điều khiển Đồng hồ Timer
  const handleStartTimer = () => {
    updateClassroomState((prev) => ({ ...prev, isTimerRunning: true }));
  };

  const handlePauseTimer = () => {
    updateClassroomState((prev) => ({ ...prev, isTimerRunning: false }));
  };

  const handleResetTimer = (minutes: number = 10) => {
    updateClassroomState((prev) => ({
      ...prev,
      timerTotalSeconds: minutes * 60,
      timerRemainingSeconds: minutes * 60,
      isTimerRunning: false,
    }));
  };

  const handleAddMinutes = (extraMinutes: number) => {
    updateClassroomState((prev) => ({
      ...prev,
      timerRemainingSeconds: prev.timerRemainingSeconds + extraMinutes * 60,
      timerTotalSeconds: prev.timerTotalSeconds + extraMinutes * 60,
    }));
  };

  // Timer Tick Interval chạy từ máy Thầy
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (controlState.isTimerRunning && controlState.timerRemainingSeconds > 0) {
      interval = setInterval(() => {
        updateClassroomState((prev) => {
          if (prev.timerRemainingSeconds <= 1) {
            return {
              ...prev,
              timerRemainingSeconds: 0,
              isTimerRunning: false,
              broadcastMessage: '⏰ HẾT GIỜ LÀM BÀI! Vui lòng dừng tay quan sát lên Thầy.',
            };
          }
          return {
            ...prev,
            timerRemainingSeconds: prev.timerRemainingSeconds - 1,
          };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [controlState.isTimerRunning, controlState.timerRemainingSeconds]);

  // 4. Gửi thông báo chữ chạy Broadcast
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBroadcast.trim()) return;
    updateClassroomState((prev) => ({
      ...prev,
      broadcastMessage: customBroadcast.trim(),
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }));
    setCustomBroadcast('');
  };

  const handleClearBroadcast = () => {
    updateClassroomState((prev) => ({ ...prev, broadcastMessage: '' }));
  };

  // 5. Thu bài đồng loạt & Chốt điểm
  const handleForceSubmitAll = () => {
    if (confirm('Thầy có chắc chắn muốn THU BÀI ĐỒNG LOẠT? Toàn bộ 20 máy trạm sẽ được tự động chốt bài và khóa nộp.')) {
      updateClassroomState((prev) => ({
        ...prev,
        phase: 'phase_5_submit',
        isTimerRunning: false,
        broadcastMessage: '🛑 HẾT GIỜ! Thầy Trương đã thu bài đồng loạt toàn phòng máy!',
        machines: prev.machines.map((m) => ({
          ...m,
          status: 'submitted' as const,
          progress: 100,
        })),
      }));
    }
  };

  // 6. Chiếu bài mẫu xuất sắc (Spotlight)
  const handleSpotlight = (machine: LabMachineState) => {
    const isCurrentlySpotlight = controlState.phase === 'spotlight' && controlState.spotlightMachineId === machine.machineId;
    if (isCurrentlySpotlight) {
      // Hủy chiếu
      updateClassroomState((prev) => ({
        ...prev,
        phase: 'free',
        spotlightMachineId: undefined,
        spotlightStudentNames: undefined,
        spotlightTitle: undefined,
      }));
    } else {
      // Chiếu bài máy này
      updateClassroomState((prev) => ({
        ...prev,
        phase: 'spotlight',
        spotlightMachineId: machine.machineId,
        spotlightStudentNames: `${machine.student1Name} & ${machine.student2Name || 'Cộng sự'}`,
        spotlightTitle: `${machine.machineName} · ${machine.currentActivity}`,
        broadcastMessage: `🏆 Thầy Trương đang trình chiếu sản phẩm xuất sắc của ${machine.machineName} (${machine.student1Name})!`,
      }));
    }
  };

  // Định dạng đồng hồ mm:ss
  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Tạo ghép cặp từ danh sách học sinh của lớp đang chọn
  const labMachinesWithCurrentClass = useMemo(() => {
    return controlState.machines.map((m, idx) => {
      const s1 = classStudents[idx * 2];
      const s2 = classStudents[idx * 2 + 1];
      return {
        ...m,
        student1Name: s1 ? s1.fullName : m.student1Name,
        student1Code: s1 ? s1.studentCode : m.student1Code,
        student2Name: s2 ? s2.fullName : m.student2Name,
        student2Code: s2 ? s2.studentCode : m.student2Code,
      };
    });
  }, [controlState.machines, classStudents]);

  return (
    <div className="space-y-6">
      {/* ==================================================================== */}
      {/* 1. HEADER BAR: CHỌN TIẾT HỌC & ĐỒNG BỘ TRỰC TIẾP */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 rounded-3xl border border-indigo-900/60 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 shrink-0">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black tracking-tight">
                  TRUNG TÂM ĐIỀU KHIỂN PHÒNG MÁY TRỰC TIẾP
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>20 MÁY ONLINE</span>
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Quản lý tiến trình 45 phút sư phạm · Khóa màn hình tập trung · Điều phối cặp đôi & Đồng bộ tức thì
              </p>
            </div>
          </div>

          {/* Chọn Tiết đang giảng & Đồng bộ */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/15">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">Tiết đang dạy:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(parseInt(e.target.value, 10))}
                className="bg-slate-800 text-white font-bold text-xs px-2.5 py-1 rounded-xl border border-white/20 focus:outline-none"
              >
                {gradeCurriculum.map((c) => (
                  <option key={c.period} value={c.period}>
                    Tiết {c.period}: {c.title.length > 25 ? `${c.title.substring(0, 25)}...` : c.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSyncLessonToLab}
              className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition-all hover:scale-102"
              title="Phát lệnh đồng bộ tiết học xuống toàn bộ máy phòng thực hành"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Đồng bộ xuống phòng máy</span>
            </button>
          </div>
        </div>

        {/* Thông tin bài học đang điều khiển */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono font-bold text-[11px] border border-amber-500/30">
              Khối {currentClass.grade} · {currentClass.name}
            </span>
            <span className="font-bold text-white">
              Tiết {activeLesson.period}: {activeLesson.title}
            </span>
            <span className="text-slate-400 hidden sm:inline">
              ({activeLesson.isPractice ? 'Tiết Thực hành máy' : 'Tiết Lý thuyết & Khám phá'})
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-indigo-300">
            <span>Pha hiện tại: <strong>{controlState.phase}</strong></span>
            <span>·</span>
            <span>Màn hình: <strong className={controlState.isScreenLocked ? 'text-rose-400' : 'text-emerald-400'}>{controlState.isScreenLocked ? 'ĐANG KHÓA' : 'MỞ TỰ DO'}</strong></span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. BỘ LỆNH 1 CHẠM (MASTER CONTROLS): KHÓA MÁY, ĐỒNG HỒ, THU BÀI */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* NÚT KHÓA / MỞ KHÓA MÀN HÌNH */}
        <div className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-3 ${
          controlState.isScreenLocked 
            ? 'bg-rose-50/80 border-rose-400 text-rose-900 shadow-lg shadow-rose-500/10'
            : 'bg-emerald-50/80 border-emerald-400 text-emerald-900 shadow-lg shadow-emerald-500/10'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-2">
              {controlState.isScreenLocked ? <Lock className="w-4 h-4 text-rose-600" /> : <Unlock className="w-4 h-4 text-emerald-600" />}
              <span>Khóa màn hình phòng máy</span>
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
              controlState.isScreenLocked ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {controlState.isScreenLocked ? 'ĐANG KHÓA TẬP TRUNG' : 'ĐANG MỞ TỰ DO'}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {controlState.isScreenLocked
              ? 'Mọi máy tính học sinh đang bị khóa và hiển thị màn hình chú ý lên Thầy.'
              : 'Học sinh đang được phép thao tác phím chuột và làm bài.'}
          </p>

          <button
            onClick={handleToggleLock}
            className={`w-full py-3 rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all ${
              controlState.isScreenLocked
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
            }`}
          >
            {controlState.isScreenLocked ? (
              <>
                <Unlock className="w-4 h-4" />
                <span>MỞ KHÓA PHÒNG MÁY (CHO PHÉP THAO TÁC)</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>KHÓA TOÀN BỘ PHÒNG MÁY (TẬP TRUNG LÊN BẢNG)</span>
              </>
            )}
          </button>
        </div>

        {/* ĐỒNG HỒ ĐẾM NGƯỢC TIẾT HỌC (TIMER) */}
        <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Đồng hồ đếm ngược phòng máy</span>
            </span>
            <span className="text-[10px] font-bold text-amber-400 font-mono">
              {controlState.timerLabel}
            </span>
          </div>

          <div className="flex items-baseline justify-center gap-2 py-1">
            <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
              controlState.timerRemainingSeconds < 60 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
            }`}>
              {formatTimer(controlState.timerRemainingSeconds)}
            </span>
          </div>

          {/* Nút điều khiển Timer */}
          <div className="grid grid-cols-4 gap-1.5">
            {controlState.isTimerRunning ? (
              <button
                onClick={handlePauseTimer}
                className="py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1 col-span-2"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Tạm dừng</span>
              </button>
            ) : (
              <button
                onClick={handleStartTimer}
                className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 col-span-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Bắt đầu đếm</span>
              </button>
            )}

            <button
              onClick={() => handleAddMinutes(5)}
              className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              title="Cộng thêm 5 phút"
            >
              +5p
            </button>

            <button
              onClick={() => handleResetTimer(10)}
              className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center"
              title="Đặt lại 10 phút"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* THU BÀI ĐỒNG LOẠT & PHÁT THÔNG BÁO KHẨN */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>Phát thông báo & Thu bài</span>
            </span>
          </div>

          {/* Form thông báo nhanh */}
          <form onSubmit={handleSendBroadcast} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={customBroadcast}
                onChange={(e) => setCustomBroadcast(e.target.value)}
                placeholder="Nhập thông báo gửi xuống 20 máy..."
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {controlState.broadcastMessage && (
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
                <span className="truncate">📢 {controlState.broadcastMessage}</span>
                <button
                  type="button"
                  onClick={handleClearBroadcast}
                  className="text-slate-400 hover:text-rose-600 font-bold text-xs shrink-0"
                  title="Hủy thông báo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>

          {/* Nút Thu bài đồng loạt */}
          <button
            onClick={handleForceSubmitAll}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>THU BÀI ĐỒNG LOẠT TOÀN PHÒNG MÁY</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. ĐIỀU KHIỂN TIẾN TRÌNH 5 PHA SƯ PHẠM (45 PHÚT BÀI HỌC) */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>Tiến trình 5 Pha Sư phạm · 45 Phút Bài học</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bấm vào từng pha để đồng bộ mở khóa học liệu tương ứng trên toàn bộ 20 máy trạm
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
            Tiết {activeLesson.period} · {activeLesson.title}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* PHA 1: KHỞI ĐỘNG */}
          <button
            onClick={() => handleActivatePhase('phase_1_warmup', 5, 'Khởi động & Quan sát Slide bài giảng PowerPoint')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-2 group ${
              controlState.phase === 'phase_1_warmup'
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/20 scale-102'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">Pha 1 (5 phút)</span>
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold">Khởi động & Slide</h4>
            <p className="text-[11px] opacity-80 leading-snug">
              Khóa màn hình máy HS, Thầy chiếu Slide PowerPoint bài giảng.
            </p>
          </button>

          {/* PHA 2: KHÁM PHÁ CẶP ĐÔI */}
          <button
            onClick={() => handleActivatePhase('phase_2_pair', 12, 'Khám phá Cặp đôi: Phiếu học tập 2 HS/máy')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-2 group ${
              controlState.phase === 'phase_2_pair'
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/20 scale-102'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">Pha 2 (12 phút)</span>
              <Users className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold">Khám phá Cặp đôi</h4>
            <p className="text-[11px] opacity-80 leading-snug">
              Mở Phiếu điện tử 2 HS/máy (KTV & Thư ký), hẹn giờ đổi vai.
            </p>
          </button>

          {/* PHA 3: LUYỆN TẬP CỦNG CỐ */}
          <button
            onClick={() => handleActivatePhase('phase_3_practice', 10, 'Luyện tập củng cố: 7 câu chuẩn Bộ GD&ĐT')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-2 group ${
              controlState.phase === 'phase_3_practice'
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/20 scale-102'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">Pha 3 (10 phút)</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold">Luyện tập 7 câu</h4>
            <p className="text-[11px] opacity-80 leading-snug">
              Mở 7 câu phân hóa (3 Biết, 2 Hiểu, 2 Vận dụng) chuẩn Bộ.
            </p>
          </button>

          {/* PHA 4: THỰC HÀNH TRÊN MÁY */}
          <button
            onClick={() => handleActivatePhase('phase_4_practical', 15, 'Thực hành trên máy: Thao tác phần mềm + Rubric')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-2 group ${
              controlState.phase === 'phase_4_practical'
                ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20 ring-2 ring-purple-500/20 scale-102'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">Pha 4 (15 phút)</span>
              <Laptop className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold">Thực hành trên máy</h4>
            <p className="text-[11px] opacity-80 leading-snug">
              Mở bài thực hành, phân chia vai trò KTV & Thư ký nộp bài.
            </p>
          </button>

          {/* PHA 5: THU BÀI & ĐÁNH GIÁ */}
          <button
            onClick={() => handleActivatePhase('phase_5_submit', 3, 'Thu bài đồng loạt & Nhận xét cuối tiết')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-2 group ${
              controlState.phase === 'phase_5_submit'
                ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-500/20 ring-2 ring-rose-500/20 scale-102'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">Pha 5 (3 phút)</span>
              <Award className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold">Thu bài & Đánh giá</h4>
            <p className="text-[11px] opacity-80 leading-snug">
              Chốt kết quả, vinh danh cặp xuất sắc và giao BTVN.
            </p>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. SƠ ĐỒ PHÒNG MÁY TRỰC TIẾP (20 MÁY TRẠM THEO THỜI GIAN THỰC) */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-blue-600" />
              <span>Sơ đồ 20 Máy trạm Phòng thực hành · {currentClass.name}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Theo dõi trực tiếp cặp đôi ngồi chung máy, tiến độ câu hỏi, cảnh báo cần trợ giúp và khen thưởng tức thì
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Đang làm</span>
            </span>
            <span className="flex items-center gap-1 text-slate-600 ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Đã nộp</span>
            </span>
            <span className="flex items-center gap-1 text-rose-600 font-bold ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>Cần Thầy trợ giúp</span>
            </span>
          </div>
        </div>

        {/* Lưới 20 máy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {labMachinesWithCurrentClass.map((machine) => {
            const isSpotlighted = controlState.spotlightMachineId === machine.machineId;

            return (
              <div
                key={machine.machineId}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-2.5 relative ${
                  machine.status === 'need_help'
                    ? 'bg-rose-50/90 border-rose-400 ring-2 ring-rose-400/30 animate-pulse'
                    : isSpotlighted
                    ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                    : machine.status === 'submitted'
                    ? 'bg-purple-50/50 border-purple-200'
                    : 'bg-slate-50/70 border-slate-200 hover:border-blue-300'
                }`}
              >
                {/* Header Máy */}
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-xs text-slate-800 flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5 text-blue-600" />
                    <span>{machine.machineName}</span>
                  </span>

                  <div className="flex items-center gap-1">
                    {machine.starsEarned > 0 && (
                      <span className="flex items-center text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.2 rounded-md">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{machine.starsEarned}</span>
                      </span>
                    )}

                    <span className={`w-2 h-2 rounded-full ${
                      machine.status === 'need_help'
                        ? 'bg-rose-500 animate-ping'
                        : machine.status === 'submitted'
                        ? 'bg-purple-500'
                        : 'bg-emerald-500'
                    }`} />
                  </div>
                </div>

                {/* Tên cặp học sinh ngồi máy */}
                <div className="space-y-0.5 text-xs">
                  <div className="font-bold text-slate-900 truncate" title={machine.student1Name}>
                    👤 {machine.student1Name}
                  </div>
                  <div className="text-[11px] text-slate-600 truncate" title={machine.student2Name}>
                    👥 {machine.student2Name || '—'}
                  </div>
                </div>

                {/* Thanh tiến độ */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span>{machine.completedTasks}/{machine.totalTasks} câu</span>
                    <span className="font-bold text-blue-600">{machine.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        machine.status === 'need_help' ? 'bg-rose-500' :
                        machine.status === 'submitted' ? 'bg-purple-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${machine.progress}%` }}
                    />
                  </div>
                </div>

                {/* Nút thao tác nhanh trên máy */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-1">
                  <button
                    onClick={() => awardStarToMachine(machine.machineId)}
                    className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center gap-1 transition-colors"
                    title="Thưởng sao (+100 XP)"
                  >
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>+Sao</span>
                  </button>

                  <button
                    onClick={() => handleSpotlight(machine)}
                    className={`p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                      isSpotlighted
                        ? 'bg-amber-500 text-white'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                    }`}
                    title="Chiếu bài làm lên màn chiếu cả lớp"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>{isSpotlighted ? 'Hạ bài' : 'Chiếu'}</span>
                  </button>

                  <button
                    onClick={() => setInspectingMachine(machine)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold"
                    title="Xem chi tiết câu trả lời"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 5. KHU VỰC YÊU CẦU TRỢ GIÚP KHẨN CẤP TỪ HỌC SINH (HELP QUEUE) */}
      {/* ==================================================================== */}
      {controlState.helpRequests.length > 0 && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-rose-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              <span>Yêu cầu Thầy trợ giúp trực tiếp ({controlState.helpRequests.length} máy đang gọi)</span>
            </h3>
            <span className="text-xs text-rose-700 font-medium">
              Học sinh bấm nút gọi Thầy từ máy trạm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {controlState.helpRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-white border border-rose-200 shadow-xs flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-mono font-bold text-[11px]">
                      {req.machineName}
                    </span>
                    <span className="font-bold text-xs text-slate-900">{req.studentNames}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({req.timestamp})</span>
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    &quot;{req.message}&quot;
                  </p>
                </div>

                <button
                  onClick={() => resolveHelpRequest(req.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã hỗ trợ xong</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 6. MODAL XEM CHI TIẾT BÀI LÀM CỦA 1 MÁY (INSPECTOR) */}
      {/* ==================================================================== */}
      {inspectingMachine && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                <Monitor className="w-5 h-5 text-blue-600" />
                <span>Chi tiết bài làm · {inspectingMachine.machineName}</span>
              </div>
              <button onClick={() => setInspectingMachine(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span>Cặp học sinh:</span>
                <span className="font-bold text-slate-900">
                  {inspectingMachine.student1Name} & {inspectingMachine.student2Name || '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hoạt động đang làm:</span>
                <span className="font-bold text-blue-600">{inspectingMachine.currentActivity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tiến độ hoàn thành:</span>
                <span className="font-bold text-emerald-600">{inspectingMachine.completedTasks}/{inspectingMachine.totalTasks} câu ({inspectingMachine.progress}%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Số sao đã thưởng:</span>
                <span className="font-bold text-amber-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{inspectingMachine.starsEarned} sao</span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Câu trả lời phiếu học tập gần nhất:</span>
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-blue-900">Câu 1 (Khám phá): Thông tin là gì?</p>
                <p className="italic text-slate-600">
                  &quot;Trả lời: Thông tin là những hiểu biết của con người về thế giới xung quanh và về chính bản thân mình.&quot;
                </p>
                <span className="text-[10px] text-emerald-600 font-bold block">✓ Đúng chuẩn kiến thức SGK</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => awardStarToMachine(inspectingMachine.machineId)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1"
              >
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>Thưởng thêm Sao</span>
              </button>
              <button
                onClick={() => {
                  handleSpotlight(inspectingMachine);
                  setInspectingMachine(null);
                }}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Chiếu lên màn hình cả lớp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
