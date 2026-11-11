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
  ClassroomActivityKey,
  LabMachineState,
  HelpRequest,
  getClassroomState,
  updateClassroomState,
  toggleActivityLock,
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

  // Bật/tắt khóa thủ công từng hoạt động
  const handleToggleActivity = (act: ClassroomActivityKey) => {
    const nextState = toggleActivityLock(act);
    setControlState(nextState);
  };

  // Điều khiển Đồng hồ Timer
  const handleStartTimer = () => {
    updateClassroomState((prev) => ({ ...prev, isTimerRunning: true }));
  };

  const handlePauseTimer = () => {
    updateClassroomState((prev) => ({ ...prev, isTimerRunning: false }));
  };

  const handleResetTimer = (minutes: number) => {
    updateClassroomState((prev) => ({
      ...prev,
      timerTotalSeconds: minutes * 60,
      timerRemainingSeconds: minutes * 60,
      isTimerRunning: false,
    }));
  };

  const handleAddMinutes = (mins: number) => {
    updateClassroomState((prev) => ({
      ...prev,
      timerRemainingSeconds: Math.max(0, prev.timerRemainingSeconds + mins * 60),
    }));
  };

  // Đếm ngược mỗi giây nếu timer đang chạy
  useEffect(() => {
    if (!controlState.isTimerRunning) return;
    const interval = setInterval(() => {
      setControlState((prev) => {
        if (prev.timerRemainingSeconds <= 1) {
          clearInterval(interval);
          const finished = {
            ...prev,
            timerRemainingSeconds: 0,
            isTimerRunning: false,
            broadcastMessage: '⏰ HẾT THỜI GIAN LÀM BÀI! Các nhóm chuẩn bị báo cáo sản phẩm.',
            broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          };
          updateClassroomState(finished);
          return finished;
        }
        return { ...prev, timerRemainingSeconds: prev.timerRemainingSeconds - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [controlState.isTimerRunning]);

  // Phát thông báo khẩn
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
    updateClassroomState((prev) => ({
      ...prev,
      broadcastMessage: '',
      broadcastTime: undefined,
    }));
  };

  // Xử lý Spotlight (Chiếu bài mẫu)
  const handleSpotlightMachine = (machine: LabMachineState) => {
    updateClassroomState((prev) => ({
      ...prev,
      spotlightMachineId: machine.machineId,
      spotlightStudentNames: `${machine.student1Name} & ${machine.student2Name || ''}`,
      spotlightTitle: `Sản phẩm mẫu xuất sắc từ ${machine.machineName}`,
      spotlightContent: `Bài làm nổi bật trong ${machine.currentActivity} đạt tiến độ ${machine.progress}% và ${machine.starsEarned + 1} sao thi đua!`,
      broadcastMessage: `🌟 CHIẾU BÀI MẪU: Cả lớp cùng quan sát bài làm của ${machine.machineName} (${machine.student1Name})!`,
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }));
  };

  const handleClearSpotlight = () => {
    updateClassroomState((prev) => ({
      ...prev,
      spotlightMachineId: undefined,
      spotlightStudentNames: undefined,
      spotlightTitle: undefined,
      spotlightContent: undefined,
    }));
  };

  // Định dạng mm:ss
  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Thống kê nhanh phòng máy
  const onlineCount = controlState.machines.filter((m) => m.status !== 'offline').length;
  const helpCount = controlState.helpRequests.filter((r) => r.status === 'pending').length;
  const avgProgress = Math.round(
    controlState.machines.reduce((acc, m) => acc + m.progress, 0) / (controlState.machines.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* ==================================================================== */}
      {/* 1. THANH CHỈ HUY TIẾT HỌC & ĐỒNG BỘ PHÒNG MÁY (HEADER) */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-indigo-900/50 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Supabase Realtime Live · 20 Máy trạm</span>
              </span>
              <span className="text-xs text-indigo-300 font-medium">
                Giáo viên: <strong>Thầy Trương Thành Trường</strong>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <Laptop className="w-7 h-7 text-indigo-400" />
              <span>Trung Tâm Điều Khiển Phòng Máy Tin Học</span>
            </h2>
          </div>

          {/* Chọn Lớp & Tiết học */}
          <div className="flex flex-wrap items-center gap-2.5 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-indigo-200 font-bold">Lớp:</span>
              <select
                value={currentClass.id}
                onChange={(e) => onSelectClass && onSelectClass(e.target.value)}
                className="bg-slate-900 text-white font-bold text-xs rounded-xl px-2.5 py-1.5 border border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.studentCount} HS)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-indigo-200 font-bold">Tiết:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                className="bg-slate-900 text-white font-bold text-xs rounded-xl px-2.5 py-1.5 border border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 max-w-[170px] truncate"
              >
                {gradeCurriculum.map((p) => (
                  <option key={p.period} value={p.period}>
                    Tiết {p.period}: {p.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSyncLessonToLab}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1"
              title="Đồng bộ tiết học này xuống toàn bộ 20 máy trạm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đồng bộ tiết</span>
            </button>
          </div>
        </div>

        {/* Thống kê nhanh 4 chỉ số */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/10 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block font-medium">Máy đang kết nối</span>
            <span className="text-lg font-black text-emerald-400">{onlineCount} / 20 bàn máy</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block font-medium">Tiến độ bài học TB</span>
            <span className="text-lg font-black text-blue-400">{avgProgress}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block font-medium">Yêu cầu Thầy trợ giúp</span>
            <span className={`text-lg font-black ${helpCount > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`}>
              {helpCount} máy cần hỗ trợ
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block font-medium">Học sinh đang thực hành</span>
            <span className="text-lg font-black text-purple-400">{classStudents.length} học sinh</span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. BỘ ĐIỀU KHIỂN KHÓA/MỞ 3 HOẠT ĐỘNG THỦ CÔNG & ĐỒNG HỒ ĐẾM NGƯỢC */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* KHỐI 1: BỘ 3 CÔNG TẮC KHÓA/MỞ THỦ CÔNG (TRỌNG TÂM THEO Ý THẦY) */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Khóa / Mở 3 Hoạt Động Thủ Công</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400">Tự động chấm điểm độc lập</span>
          </div>

          <div className="space-y-3">
            {/* HOẠT ĐỘNG 1: KHÁM PHÁ CẶP ĐÔI */}
            <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${controlState.activityLocks.discovery
              ? 'bg-indigo-50/60 border-indigo-200 text-indigo-950'
              : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>1. Khám phá cặp đôi</span>
                </div>
                <p className="text-[11px] text-slate-500">Phiếu điện tử (KTV & Thư ký) · Tự chấm ngay</p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleActivity('discovery')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 ${controlState.activityLocks.discovery
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                  }`}
              >
                {controlState.activityLocks.discovery ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>ĐANG MỞ</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>ĐÃ KHÓA</span>
                  </>
                )}
              </button>
            </div>

            {/* HOẠT ĐỘNG 2: LUYỆN TẬP */}
            <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${controlState.activityLocks.practice
              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
              : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>2. Luyện tập củng cố</span>
                </div>
                <p className="text-[11px] text-slate-500">7 câu chuẩn Bộ · Máy tự chấm thang 10 & cộng XP</p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleActivity('practice')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 ${controlState.activityLocks.practice
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                  }`}
              >
                {controlState.activityLocks.practice ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>ĐANG MỞ</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>ĐÃ KHÓA</span>
                  </>
                )}
              </button>
            </div>

            {/* HOẠT ĐỘNG 3: THỰC HÀNH TRÊN MÁY */}
            <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${controlState.activityLocks.lab
              ? 'bg-purple-50/60 border-purple-200 text-purple-950'
              : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Laptop className="w-4 h-4 text-purple-600" />
                  <span>3. Thực hành trên máy</span>
                </div>
                <p className="text-[11px] text-slate-500">Thao tác phần mềm · Nộp file & Tự chấm checklist</p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleActivity('lab')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 ${controlState.activityLocks.lab
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                  }`}
              >
                {controlState.activityLocks.lab ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>ĐANG MỞ</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>ĐÃ KHÓA</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* KHỐI 2: ĐỒNG HỒ ĐẾM NGƯỢC TIẾT HỌC (TIMER) */}
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
            <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${controlState.timerRemainingSeconds < 60 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
              }`}>
              {formatTimer(controlState.timerRemainingSeconds)}
            </span>
          </div>

          {/* Nút điều khiển Timer */}
          <div className="grid grid-cols-4 gap-1.5">
            {controlState.isTimerRunning ? (
              <button
                type="button"
                onClick={handlePauseTimer}
                className="py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1 col-span-2"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Tạm dừng</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartTimer}
                className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 col-span-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Bắt đầu đếm</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => handleAddMinutes(5)}
              className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              title="Cộng thêm 5 phút"
            >
              +5p
            </button>

            <button
              type="button"
              onClick={() => handleResetTimer(10)}
              className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center"
              title="Đặt lại 10 phút"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* KHỐI 3: PHÁT THÔNG BÁO NHANH TỪ THẦY XUỐNG 20 MÁY */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>Phát Thông Báo Nhanh Tới Máy HS</span>
            </span>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={customBroadcast}
                onChange={(e) => setCustomBroadcast(e.target.value)}
                placeholder="Nhập lời dặn gửi xuống 20 máy..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-medium"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi</span>
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

          {/* Chiếu bài mẫu Spotlight nếu có */}
          {controlState.spotlightMachineId && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between gap-2">
              <div className="truncate">
                <span className="font-bold">🌟 Đang chiếu bài: </span>
                <span>{controlState.spotlightStudentNames}</span>
              </div>
              <button
                type="button"
                onClick={handleClearSpotlight}
                className="text-[11px] font-bold text-amber-900 underline shrink-0"
              >
                Dừng chiếu
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. DANH SÁCH HỌC SINH CẦN THẦY TRỢ GIÚP (HELP DESK) */}
      {/* ==================================================================== */}
      {controlState.helpRequests.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600 animate-bounce" />
              <h4 className="text-sm font-black text-amber-950 uppercase">
                Yêu cầu trợ giúp từ học sinh ({controlState.helpRequests.length} máy)
              </h4>
            </div>
            <span className="text-xs text-amber-800 font-medium">Bấm Đã hỗ trợ xong khi Thầy tới bàn máy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {controlState.helpRequests.map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="text-indigo-600">{req.machineName} ({req.className})</span>
                    <span className="text-slate-400 font-mono text-[10px]">{req.timestamp}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-900 mt-1">{req.studentNames}</div>
                  <p className="text-xs text-slate-600 mt-1 italic">&ldquo;{req.message}&rdquo;</p>
                </div>

                <button
                  type="button"
                  onClick={() => resolveHelpRequest(req.id)}
                  className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã tới bàn hỗ trợ xong</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. SƠ ĐỒ PHÒNG MÁY TRỰC TIẾP (20 MÁY TRẠM THEO THỜI GIAN THỰC) */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-indigo-600" />
              <span>Sơ Đồ 20 Bàn Máy Phòng Thực Hành Tin Học</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mô hình 2 học sinh / 1 máy (Kỹ thuật viên ⇄ Thư ký). Nhấp vào từng máy để cộng sao hoặc chiếu bài mẫu.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Đang làm bài
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" /> Cần trợ giúp
            </span>
          </div>
        </div>

        {/* Lưới 20 máy trạm */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {controlState.machines.map((machine) => {
            const hasHelp = controlState.helpRequests.some(
              (r) => r.machineId === machine.machineId && r.status === 'pending'
            );

            return (
              <div
                key={machine.machineId}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2.5 relative group ${hasHelp
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/30'
                  : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-indigo-300 hover:shadow-md'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{machine.machineName}</span>
                  </span>

                  {/* Số sao thi đua */}
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{machine.starsEarned}</span>
                  </div>
                </div>

                {/* Tên cặp học sinh */}
                <div className="space-y-0.5 text-[11px] leading-tight">
                  <div className="font-bold text-slate-900 truncate" title={machine.student1Name}>
                    1. {machine.student1Name}
                  </div>
                  <div className="text-slate-600 truncate" title={machine.student2Name}>
                    2. {machine.student2Name || 'Chưa ghép bạn'}
                  </div>
                </div>

                {/* Thanh tiến độ */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span>{machine.completedTasks}/{machine.totalTasks} câu</span>
                    <span className="font-bold text-indigo-600">{machine.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all"
                      style={{ width: `${machine.progress}%` }}
                    />
                  </div>
                </div>

                {/* Nút hành động nhanh của Thầy */}
                <div className="flex items-center gap-1 pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => awardStarToMachine(machine.machineId)}
                    className="flex-1 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center justify-center gap-0.5 transition-all"
                    title="Tặng 1 sao thưởng cho máy này"
                  >
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>+1 Sao</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSpotlightMachine(machine)}
                    className="py-1 px-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-[10px] font-bold flex items-center justify-center"
                    title="Chiếu bài mẫu của máy này lên toàn phòng máy"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
