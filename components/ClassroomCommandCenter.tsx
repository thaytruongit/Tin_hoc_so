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
import Virtual3DClassroom from './Virtual3DClassroom';

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

  // Bật/tắt khóa thủ công từng hoạt động (kèm thời gian ấn định)
  const handleToggleActivity = (act: ClassroomActivityKey) => {
    const nextState = toggleActivityLock(act);
    setControlState(nextState);
  };

  // Đếm ngược thời gian ấn định của hoạt động hiện tại
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
            isTimeUp: true,
            broadcastMessage: '⏰ HẾT THỜI GIAN ẤN ĐỊNH! Máy đã tự động chốt bài và chấm điểm xong toàn bộ.',
            broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          };
          updateClassroomState(() => finished);
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

  // Giải quyết yêu cầu trợ giúp
  const handleResolveHelp = (id: string) => {
    const next = resolveHelpRequest(id);
    setControlState(next);
  };

  // Tuyên dương máy
  const handleAwardStar = (mId: number) => {
    const next = awardStarToMachine(mId);
    setControlState(next);
  };

  // Chiếu bài mẫu máy lên toàn phòng
  const handleSpotlightMachine = (m: LabMachineState) => {
    setInspectingMachine(m);
    updateClassroomState((prev) => ({
      ...prev,
      spotlightMachineId: m.machineId,
      broadcastMessage: `🌟 Thầy đang chiếu bài làm mẫu của ${m.machineName} (${m.student1Name}) lên màn hình chính!`,
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }));
  };

  const currentActName = useMemo(() => {
    switch (controlState.currentActivity) {
      case 'discovery': return 'Hoạt động 1: Khám phá cặp đôi';
      case 'practice': return 'Hoạt động 2: Luyện tập (7 câu)';
      case 'lab': return 'Hoạt động 3: Thực hành trên máy';
      default: return 'Hoạt động trên lớp';
    }
  }, [controlState.currentActivity]);

  return (
    <div className="space-y-6">
      {/* 1. BẢNG ĐIỀU HÀNH 3 CÔNG TẮC & ĐIỀU KHIỂN NHỊP TIẾT DẠY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KHỐI 1: BỘ 3 CÔNG TẮC KHÓA/MỞ THỦ CÔNG KÈM THỜI GIAN ẤN ĐỊNH */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>3 Hoạt Động Trực Tiếp (Ấn Định Giờ)</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
              Chấm Tự Động Khi Hết Giờ
            </span>
          </div>

          <div className="space-y-3">
            {/* HOẠT ĐỘNG 1: KHÁM PHÁ CẶP ĐÔI (10 phút) */}
            <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              controlState.activityLocks.discovery
                ? 'bg-indigo-50/60 border-indigo-200 text-indigo-950'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>1. Khám phá cặp đôi</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Thời gian: <strong>10 phút</strong> · Điền khuyết & tự động chấm
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleActivity('discovery')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 ${
                  controlState.activityLocks.discovery
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                }`}
              >
                {controlState.activityLocks.discovery ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Đang Mở</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Đang Khóa</span>
                  </>
                )}
              </button>
            </div>

            {/* HOẠT ĐỘNG 2: LUYỆN TẬP 7 CÂU (7 phút) */}
            <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              controlState.activityLocks.practice
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>2. Luyện tập (7 câu)</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Thời gian: <strong>7 phút</strong> · Trắc nghiệm thang 10 tức thì
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleActivity('practice')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 ${
                  controlState.activityLocks.practice
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                }`}
              >
                {controlState.activityLocks.practice ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Đang Mở</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Đang Khóa</span>
                  </>
                )}
              </button>
            </div>

            {/* HOẠT ĐỘNG 3: THỰC HÀNH TRÊN MÁY (15 phút) */}
            <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              controlState.activityLocks.lab
                ? 'bg-purple-50/60 border-purple-200 text-purple-950'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Laptop className="w-4 h-4 text-purple-600" />
                  <span>3. Thực hành trên máy</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Thời gian: <strong>15 phút</strong> · Nộp Google Drive + Rubric
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleActivity('lab')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 ${
                  controlState.activityLocks.lab
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                }`}
              >
                {controlState.activityLocks.lab ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Đang Mở</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Đang Khóa</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* KHỐI 2: CHỌN TIẾT HỌC 29 TIẾT & ĐỒNG BỘ */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Tiết Học Đang Giảng Dạy</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
              Khối {currentClass.grade} · {currentClass.name}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Chọn Tiết trong Phân phối chương trình:
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            >
              {gradeCurriculum.map((l) => (
                <option key={l.period} value={l.period}>
                  Tiết {l.period}: {l.title}
                </option>
              ))}
            </select>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div>Chủ đề: <strong>{activeLesson.theme || 'Tin học cơ bản'}</strong></div>
              <div>Bài tập: <strong>{activeLesson.practicalTask?.title || 'Bài tập thực hành tại lớp'}</strong></div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSyncLessonToLab}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Đồng Bộ Tiết Này Tới Toàn Phòng Máy</span>
          </button>
        </div>

        {/* KHỐI 3: PHÁT THÔNG BÁO TỨC THÌ TỚI HỌC SINH */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-600" />
              <span>Phát Thông Báo Tức Thì</span>
            </span>
            <span className="text-[10px] text-slate-400">Hiển thị tức thì trên màn hình học sinh</span>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-3">
            <textarea
              rows={3}
              value={customBroadcast}
              onChange={(e) => setCustomBroadcast(e.target.value)}
              placeholder="Nhập lời nhắc Thầy muốn gửi tới 24 máy (ví dụ: Các nhóm còn 3 phút để lưu tệp sản phẩm!)..."
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800 resize-none"
            />
            <button
              type="submit"
              disabled={!customBroadcast.trim()}
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi Thông Báo Tới Toàn Lớp</span>
            </button>
          </form>

          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 truncate">
            Tin gần nhất: <span className="font-bold text-slate-800">{controlState.broadcastMessage}</span>
          </div>
        </div>
      </div>

      {/* 2. KHÔNG GIAN PHÒNG HỌC 3D ISOMETRIC VỚI CÁCH ĐÁNH SỐ ZICZAC TỪ PHẢI QUA TRÁI */}
      <Virtual3DClassroom
        machines={controlState.machines}
        helpRequests={controlState.helpRequests}
        activeActivityName={currentActName}
        activePeriod={controlState.activePeriod}
        lessonTitle={controlState.lessonTitle}
        remainingSeconds={controlState.timerRemainingSeconds}
        activityDurationMinutes={controlState.activityDurations[controlState.currentActivity] || 10}
        isTimeUp={controlState.isTimeUp}
        onAwardStar={handleAwardStar}
        onSpotlight={handleSpotlightMachine}
        onResolveHelp={handleResolveHelp}
      />
    </div>
  );
}
