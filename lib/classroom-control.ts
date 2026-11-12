import { createClient } from '@supabase/supabase-js';
import { MOCK_STUDENTS, MOCK_CLASSES } from '@/lib/mock-data';
import { ClassItem } from '@/lib/types';

// Cấu hình môi trường kết nối Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-tin-hoc-thcs-mao-dien.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key-thay-truong-it';

export const supabase = createClient(supabaseUrl, supabaseKey);

// 3 Hoạt động trực tiếp cốt lõi
export type ClassroomActivityKey = 'discovery' | 'practice' | 'lab';

export interface HelpRequest {
  id: string;
  machineId: number;
  machineName: string;
  studentName: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'resolved';
}

export interface LabMachineState {
  machineId: number;
  machineName: string;
  student1Name: string;
  student1Code?: string;
  student2Name?: string;
  student2Code?: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  starsEarned: number;
  status: 'active' | 'idle' | 'submitted';
  hasHelpRequest?: boolean;
  scoreH1?: number; // Điểm Hoạt động 1: Khám phá cặp đôi (/10)
  scoreH2?: number; // Điểm Hoạt động 2: Luyện tập 7 câu (/10)
  scoreH3?: number; // Điểm Hoạt động 3: Thực hành (/10)
  totalScore?: number; // Điểm trung bình / tổng kết tiết dạy (/10)
  comment?: string; // Lời phê / nhận xét của Thầy Đỗ Mạnh Trường
  practicalFileName?: string;
  practicalFileUrl?: string;
}

export interface ClassroomControlState {
  isLive: boolean; // Trạng thái phát trực tiếp bài dạy của Thầy Trường (true: 3 hoạt động, false: bảng trắng chờ)
  activeGrade: number;
  activeClassId: string;
  activeClassName: string;
  activePeriod: number;
  lessonTitle: string;
  activityLocks: {
    discovery: boolean;
    practice: boolean;
    lab: boolean;
  };
  activityDurations: {
    discovery: number; // Phút ấn định
    practice: number;
    lab: number;
  };
  currentActivity: ClassroomActivityKey;
  timerRemainingSeconds: number;
  timerDurationSeconds?: number; // Tổng thời lượng lần chạy timer hiện tại (giây)
  timerEndTimestamp?: number;    // Mốc thời gian kết thúc (Date.now() + ms) để đồng bộ thời gian tuyệt đối giữa Thầy và 24 máy học sinh
  isTimerRunning: boolean;
  isTimeUp: boolean;
  spotlightMachineId?: number | null;
  spotlightTitle?: string;
  spotlightStudentNames?: string;
  spotlightContent?: string;
  broadcastMessage: string;
  broadcastTime: string;
  machines: LabMachineState[];
  helpRequests: HelpRequest[];
}

const STORAGE_KEY = 'truong_classroom_control_state';
const CHANNEL_NAME = 'room-tin-hoc-thcs-mao-dien';

/**
 * Tạo danh sách 24 máy trạm chuẩn lấy đúng học sinh của lớp được chọn
 */
export function createMachinesForClass(classId: string = 'c-6a10', className: string = 'Lớp 6A10'): LabMachineState[] {
  const students = MOCK_STUDENTS.filter((s) => s.classId === classId);

  return Array.from({ length: 24 }, (_, idx) => {
    const s1 = students[idx * 2];
    const s2 = students[idx * 2 + 1];
    const num = idx + 1;
    const name = `Máy ${num < 10 ? '0' : ''}${num}`;

    const s1Name = s1 ? s1.fullName : `Chờ kết nối...`;
    const s1Code = s1 ? s1.studentCode : '';
    const s2Name = s2 ? s2.fullName : '';
    const s2Code = s2 ? s2.studentCode : '';

    const h1 = s1 ? Number((8 + (idx % 3) * 0.8).toFixed(1)) : 0;
    const h2 = s1 ? Number((7 + ((idx * 2) % 4) * 0.8).toFixed(1)) : 0;
    const h3 = s1 ? Number((8.5 + (idx % 2) * 1.5).toFixed(1)) : 0;
    const tot = s1 ? Number((h1 * 0.3 + h2 * 0.3 + h3 * 0.4).toFixed(1)) : 0;

    return {
      machineId: num,
      machineName: name,
      student1Name: s1Name,
      student1Code: s1Code,
      student2Name: s2Name,
      student2Code: s2Code,
      progress: s1 ? 60 + ((num * 7) % 40) : 0,
      completedTasks: s1 ? 5 + (num % 3) : 0,
      totalTasks: 7,
      starsEarned: s1 ? 1 + (num % 3) : 0,
      status: s1 ? 'submitted' : 'idle',
      hasHelpRequest: idx === 2 || idx === 10,
      scoreH1: h1,
      scoreH2: h2,
      scoreH3: h3,
      totalScore: tot,
      practicalFileName: s1 ? `BTH_${className.replace(/\s+/g, '')}_May${num < 10 ? '0' : ''}${num}.xlsx` : undefined,
      practicalFileUrl: s1 ? `https://docs.google.com/spreadsheets/d/sample-truongit-${className.replace(/\s+/g, '')}-May${num < 10 ? '0' : ''}${num}/edit` : undefined,
    };
  });
}

export function createDefaultMachines(className: string = 'Lớp 6A10'): LabMachineState[] {
  return createMachinesForClass('c-6a10', className);
}

export function getDefaultClassroomState(): ClassroomControlState {
  return {
    isLive: false, // Mặc định chưa phát trực tiếp: Học sinh thấy Bảng Trắng cho tới khi có phản hồi tiết học từ Thầy
    activeGrade: 7,
    activeClassId: 'c-7a12',
    activeClassName: 'Lớp 7A12',
    activePeriod: 0, // Chưa có tiết nào được chọn ban đầu -> Trang dữ liệu trắng
    lessonTitle: '',
    activityLocks: {
      discovery: false,
      practice: false,
      lab: false,
    },
    activityDurations: {
      discovery: 10, // 10 phút
      practice: 7,   // 7 phút
      lab: 15,       // 15 phút
    },
    currentActivity: 'discovery',
    timerRemainingSeconds: 600,
    isTimerRunning: false,
    isTimeUp: false,
    spotlightMachineId: null,
    broadcastMessage: '⏳ Đang chờ Thầy Đỗ Mạnh Trường chọn tiết học và phát trực tiếp bài dạy...',
    broadcastTime: '--:--',
    machines: createMachinesForClass('c-7a12', 'Lớp 7A12'),
    helpRequests: [],
  };
}

export function getClassroomState(): ClassroomControlState {
  const def = getDefaultClassroomState();
  if (typeof window === 'undefined') {
    return def;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
      return def;
    }
    const parsed = JSON.parse(raw);
    return {
      ...def,
      ...parsed,
      activityLocks: {
        discovery: true,
        practice: true,
        lab: true,
        ...(parsed?.activityLocks || {}),
      },
      activityDurations: {
        discovery: 10,
        practice: 7,
        lab: 15,
        ...(parsed?.activityDurations || {}),
      },
      machines: Array.isArray(parsed?.machines) && parsed.machines.length === 24 
        ? parsed.machines 
        : def.machines,
    };
  } catch (err) {
    return def;
  }
}

// KÊNH ĐỒNG BỘ ĐÁM MÂY XUYÊN TRÌNH DUYỆT & XUYÊN THIẾT BỊ (ĐẢM BẢO 100% HOẠT ĐỘNG TẠI VN)
const CLOUD_SYNC_TOPIC = 'thay_truong_mao_dien_classroom_sync_666';
const CLOUD_SYNC_URL = 'https://ntfy.sh';

export function updateClassroomState(
  updater: (prev: ClassroomControlState) => ClassroomControlState
): ClassroomControlState {
  const current = getClassroomState();
  const next = updater(current);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('truong_classroom_update', { detail: next }));
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel('truong_classroom_sync');
        bc.postMessage(next);
        bc.close();
      }

      // ĐẨY LÊN ĐÁM MÂY XUYÊN MỌI TRÌNH DUYỆT (CHROME ⇄ EDGE ⇄ 24 MÁY TRẠM) DƯỚI 4KB
      const compactSync = {
        topic: CLOUD_SYNC_TOPIC,
        title: 'CLASSROOM_STATE_UPDATE',
        message: JSON.stringify({
          isLive: next.isLive,
          activePeriod: next.activePeriod,
          activeGrade: next.activeGrade,
          activeClassId: next.activeClassId,
          activeClassName: next.activeClassName,
          lessonTitle: next.lessonTitle,
          activityLocks: next.activityLocks,
          activityDurations: next.activityDurations,
          currentActivity: next.currentActivity,
          timerRemainingSeconds: next.timerRemainingSeconds,
          timerDurationSeconds: next.timerDurationSeconds,
          timerEndTimestamp: next.timerEndTimestamp,
          isTimerRunning: next.isTimerRunning,
          isTimeUp: next.isTimeUp,
          broadcastMessage: next.broadcastMessage,
          broadcastTime: next.broadcastTime,
          updatedAt: Date.now(),
        }),
      };

      fetch(CLOUD_SYNC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compactSync),
      }).catch(() => {});
    } catch (e) {}
  }

  // Chỉ phát tín hiệu Realtime khi có URL Supabase thật
  const isRealSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock-tin-hoc')
  );

  if (isRealSupabase) {
    try {
      const channel = supabase.channel(CHANNEL_NAME);
      channel.send({
        type: 'broadcast',
        event: 'state_change',
        payload: next,
      });
    } catch (err) {}
  }

  return next;
}

/**
 * Ấn định thời gian (phút) cho từng hoạt động theo điều phối của Giáo viên
 */
export function setActivityDuration(activity: ClassroomActivityKey, minutes: number): ClassroomControlState {
  const safeMinutes = Math.max(1, Math.min(120, Math.round(minutes)));
  return updateClassroomState((prev) => ({
    ...prev,
    activityDurations: {
      ...prev.activityDurations,
      [activity]: safeMinutes,
    },
    broadcastMessage: `⏱️ Thầy Đỗ Mạnh Trường: Đã ấn định thời gian cho ${
      activity === 'discovery' ? 'Hoạt động 1 (Khám phá)' : activity === 'practice' ? 'Hoạt động 2 (Luyện tập)' : 'Hoạt động 3 (Thực hành)'
    } là ${safeMinutes} phút.`,
    broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  }));
}

/**
 * Tự động thoát Lớp học số thì tự động KHÓA TOÀN BỘ các hoạt động
 * Chuyển toàn bộ 24 máy học sinh về màn hình Bảng Trắng và dừng đếm giờ an toàn
 */
export function exitClassroomAndLockAll(): ClassroomControlState {
  return updateClassroomState((prev) => ({
    ...prev,
    isLive: false,
    activityLocks: {
      discovery: false,
      practice: false,
      lab: false,
    },
    isTimerRunning: false,
    isTimeUp: false,
    timerRemainingSeconds: 0,
    timerDurationSeconds: 0,
    timerEndTimestamp: 0,
    broadcastMessage: '🛑 Thầy Đỗ Mạnh Trường đã kết thúc tiết học và thoát lớp học số. Toàn bộ hoạt động đã được khóa lại.',
    broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  }));
}

export function toggleActivityLock(activity: ClassroomActivityKey): ClassroomControlState {
  return updateClassroomState((prev) => {
    const currentStatus = prev.activityLocks[activity];
    const newStatus = !currentStatus;
    const durMinutes = prev.activityDurations[activity] || 10;
    const durSeconds = durMinutes * 60;
    const endTimestamp = newStatus ? Date.now() + durSeconds * 1000 : 0;
    const willBeAnyUnlocked = newStatus || Object.entries(prev.activityLocks).some(([k, v]) => k !== activity && v);

    return {
      ...prev,
      isLive: willBeAnyUnlocked ? true : prev.isLive, // Mở hoạt động thì tự động bật phát trực tiếp
      activePeriod: prev.activePeriod && prev.activePeriod > 0 ? prev.activePeriod : 1,
      currentActivity: activity,
      timerRemainingSeconds: newStatus ? durSeconds : prev.timerRemainingSeconds,
      timerDurationSeconds: newStatus ? durSeconds : prev.timerDurationSeconds,
      timerEndTimestamp: endTimestamp,
      isTimerRunning: newStatus,
      isTimeUp: false,
      activityLocks: {
        ...prev.activityLocks,
        [activity]: newStatus,
      },
      broadcastMessage: newStatus
        ? `▶️ Thầy Đỗ Mạnh Trường: ĐÃ MỞ ${activity === 'discovery' ? 'Hoạt động 1 (Khám phá)' : activity === 'practice' ? 'Hoạt động 2 (Luyện tập)' : 'Hoạt động 3 (Thực hành)'}! Thời gian ấn định: ${durMinutes} phút. Đồng hồ đã kích hoạt chạy trên 24 máy trạm!`
        : `⏸️ Thầy Đỗ Mạnh Trường: ĐÃ TẠM KHÓA ${activity === 'discovery' ? 'Hoạt động 1' : activity === 'practice' ? 'Hoạt động 2' : 'Hoạt động 3'}.`,
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
  });
}

export function awardStarToMachine(machineId: number): ClassroomControlState {
  return updateClassroomState((prev) => {
    const updated = prev.machines.map((m) => {
      if (m.machineId === machineId) {
        return { ...m, starsEarned: m.starsEarned + 1 };
      }
      return m;
    });

    const targetMachine = updated.find((m) => m.machineId === machineId);
    return {
      ...prev,
      machines: updated,
      broadcastMessage: `⭐ Thầy Đỗ Mạnh Trường tặng 1 SAO THƯỞNG tuyên dương ${targetMachine?.machineName} (${targetMachine?.student1Name})!`,
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
  });
}

export function resolveHelpRequest(requestId: string): ClassroomControlState {
  return updateClassroomState((prev) => ({
    ...prev,
    helpRequests: prev.helpRequests.map((req) =>
      req.id === requestId ? { ...req, status: 'resolved' as const } : req
    ),
  }));
}

export function sendStudentHelpRequest(
  machineId: number,
  machineName: string,
  studentName: string,
  className: string,
  message: string
): ClassroomControlState {
  const newHelp: HelpRequest = {
    id: `help-${Date.now()}`,
    machineId,
    machineName,
    studentName,
    message,
    createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    status: 'pending',
  };

  return updateClassroomState((prev) => ({
    ...prev,
    helpRequests: [newHelp, ...prev.helpRequests],
    broadcastMessage: `🆘 [Trợ giúp] ${machineName} (${studentName} - ${className}): "${message}"`,
    broadcastTime: newHelp.createdAt,
  }));
}

/**
 * Giáo viên phát lệnh chuyển tiết học cho toàn bộ 24 máy trạm
 */
export function broadcastLesson(
  grade: number,
  period: number,
  lessonTitle: string,
  className?: string
): ClassroomControlState {
  return updateClassroomState((prev) => ({
    ...prev,
    activeGrade: grade,
    activePeriod: period,
    lessonTitle: lessonTitle,
    activeClassName: className || prev.activeClassName || `Khối ${grade}`,
    activityLocks: {
      discovery: true,
      practice: true,
      lab: true,
    },
    broadcastMessage: `📢 Thầy Đỗ Mạnh Trường: Bắt đầu Khối ${grade} · ${lessonTitle}. Chúc các em học tập hiệu quả!`,
    broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  }));
}

/**
 * Cập nhật điểm và tiến độ của học sinh tại máy trạm
 */
export function updateMachineScore(
  machineId: number,
  activity: ClassroomActivityKey,
  score: number,
  practicalFileName?: string
): ClassroomControlState {
  return updateClassroomState((prev) => {
    const updated = prev.machines.map((m) => {
      if (m.machineId === machineId) {
        const nextScoreH1 = activity === 'discovery' ? score : (m.scoreH1 || 0);
        const nextScoreH2 = activity === 'practice' ? score : (m.scoreH2 || 0);
        const nextScoreH3 = activity === 'lab' ? score : (m.scoreH3 || 0);
        
        let completed = 0;
        if (nextScoreH1 > 0) completed += 1;
        if (nextScoreH2 > 0) completed += 1;
        if (nextScoreH3 > 0) completed += 1;

        const progress = Math.round((completed / 3) * 100);
        const tot = Number(((nextScoreH1 * 0.3) + (nextScoreH2 * 0.3) + (nextScoreH3 * 0.4)).toFixed(1));

        return {
          ...m,
          scoreH1: nextScoreH1,
          scoreH2: nextScoreH2,
          scoreH3: nextScoreH3,
          totalScore: tot,
          completedTasks: completed,
          progress: Math.max(m.progress, progress),
          status: completed === 3 ? ('submitted' as const) : ('active' as const),
          practicalFileName: practicalFileName || m.practicalFileName,
        };
      }
      return m;
    });

    return {
      ...prev,
      machines: updated,
    };
  });
}

/**
 * Bật / Tắt phát trực tiếp bài dạy của Thầy Trường
 * Khi bật (isLive = true): TỰ ĐỘNG MỞ KHÓA CẢ 3 HOẠT ĐỘNG TRỰC TIẾP và chuyển học sinh vào bài học
 * Khi tắt (isLive = false): Học sinh nhìn thấy Bảng Trắng kèm thông báo chờ lệnh
 */
export function setLiveBroadcast(isLive: boolean, className?: string): ClassroomControlState {
  return updateClassroomState((prev) => {
    const act = prev.currentActivity || 'discovery';
    const durMinutes = prev.activityDurations[act] || 10;
    const durSeconds = durMinutes * 60;
    const endTimestamp = isLive ? Date.now() + durSeconds * 1000 : 0;

    return {
      ...prev,
      isLive,
      // KHI PHÁT LIVE: TỰ ĐỘNG MỞ KHÓA TẤT CẢ 3 HOẠT ĐỘNG TRỰC TIẾP
      activityLocks: isLive
        ? {
            discovery: true,
            practice: true,
            lab: true,
          }
        : prev.activityLocks,
      isTimerRunning: isLive,
      isTimeUp: false,
      timerRemainingSeconds: isLive ? durSeconds : prev.timerRemainingSeconds,
      timerDurationSeconds: isLive ? durSeconds : prev.timerDurationSeconds,
      timerEndTimestamp: endTimestamp,
      currentActivity: act,
      broadcastMessage: isLive
        ? `🔴 Thầy Đỗ Mạnh Trường: ĐANG PHÁT TRỰC TIẾP bài dạy cho ${className || prev.activeClassName}! Thời gian ấn định: ${durMinutes} phút. Mời các em vào học ngay.`
        : `⏸️ Thầy Đỗ Mạnh Trường: Đã tạm dừng phát trực tiếp (Màn hình máy trạm chuyển về Bảng trắng thông báo).`,
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
  });
}

/**
 * Thầy chọn lớp giảng dạy: tự động cập nhật đúng danh sách học sinh của lớp vào 24 máy trạm
 * và điều phối sang lớp học số tương ứng
 */
export function selectClassForClassroom(classId: string, className: string, grade: number): ClassroomControlState {
  const newMachines = createMachinesForClass(classId, className);
  return updateClassroomState((prev) => ({
    ...prev,
    activeClassId: classId,
    activeClassName: className,
    activeGrade: grade,
    machines: newMachines,
    broadcastMessage: `📢 Thầy Đỗ Mạnh Trường: Đã chuyển điều phối phòng máy sang ${className} (Khối ${grade}).`,
    broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  }));
}

/**
 * Thầy chọn và cố định Tiết học giảng dạy trực tiếp:
 * Tự động cập nhật activePeriod, lessonTitle và phát lệnh đồng bộ cho 24 máy trạm của học sinh
 * Tự động đồng bộ phân biệt tiết thực hành hay lý thuyết
 */
export function selectPeriodForClassroom(
  period: number,
  lessonTitle?: string,
  grade?: number,
  isPractical?: boolean,
  classId?: string,
  className?: string
): ClassroomControlState {
  return updateClassroomState((prev) => {
    const actGrade = grade || prev.activeGrade || 6;
    const actClassId = classId || prev.activeClassId || 'c-6a10';
    const actClassName = className || prev.activeClassName || 'Lớp 6A10';

    // Đảm bảo 24 máy trạm luôn có danh sách học sinh của lớp đang làm việc
    let machines = prev.machines;
    if (!machines || machines.length === 0 || prev.activeClassId !== actClassId) {
      machines = createMachinesForClass(actClassId, actClassName);
    }

    // Cập nhật trạng thái thực hành theo tính chất tiết học
    const updatedMachines = machines.map((m, idx) => {
      const num = m.machineId;
      const cleanName = actClassName.replace(/\s+/g, '');
      const h1 = m.scoreH1 ?? Number((8.0 + (idx % 3) * 0.8).toFixed(1));
      const h2 = m.scoreH2 ?? Number((7.5 + ((idx * 2) % 4) * 0.7).toFixed(1));

      if (isPractical === false) {
        // Tiết lý thuyết: không có nộp bài thực hành, điểm tổng kết là trung bình H1 & H2
        return {
          ...m,
          scoreH1: h1,
          scoreH2: h2,
          scoreH3: undefined,
          practicalFileName: undefined,
          practicalFileUrl: undefined,
          totalScore: Number(((h1 + h2) / 2).toFixed(1)),
        };
      } else if (isPractical === true) {
        // Tiết thực hành: có tệp thực hành và link online để Thầy chấm trực tiếp
        const h3 = m.scoreH3 ?? Number((8.5 + (idx % 2) * 1.5).toFixed(1));
        return {
          ...m,
          scoreH1: h1,
          scoreH2: h2,
          scoreH3: h3,
          practicalFileName: `BTH_Tiet${period}_${cleanName}_May${num < 10 ? '0' : ''}${num}.xlsx`,
          practicalFileUrl: `https://docs.google.com/spreadsheets/d/sample-truongit-${cleanName}-tiet${period}-may${num}/edit`,
          totalScore: Number((h1 * 0.3 + h2 * 0.3 + h3 * 0.4).toFixed(1)),
        };
      }
      return m;
    });

    return {
      ...prev,
      isLive: true, // Tự động kích hoạt phát trực tiếp để học sinh vào học đúng tiết này
      activePeriod: period,
      activeGrade: actGrade,
      activeClassId: actClassId,
      activeClassName: actClassName,
      lessonTitle: lessonTitle || `Tiết ${period}`,
      machines: updatedMachines,
      broadcastMessage: `📖 Thầy Đỗ Mạnh Trường: Tiết học trực tiếp hôm nay là Tiết ${period}: ${lessonTitle || `Bài học số ${period}`}.`,
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
  });
}

export function subscribeToClassroomState(callback: (state: ClassroomControlState) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  // 1. Lắng nghe cập nhật trong cùng một Tab
  const handleLocalUpdate = (e: Event) => {
    const customEvent = e as CustomEvent<ClassroomControlState>;
    if (customEvent && customEvent.detail) {
      callback(customEvent.detail);
    }
  };

  // 2. Lắng nghe cập nhật giữa các Tab cùng trình duyệt qua storage event
  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        callback(parsed);
      } catch (err) {}
    }
  };

  window.addEventListener('truong_classroom_update', handleLocalUpdate);
  window.addEventListener('storage', handleStorageEvent);

  // 3. Lắng nghe cập nhật tức thì (0ms) giữa các Tab qua BroadcastChannel
  let bc: BroadcastChannel | null = null;
  if ('BroadcastChannel' in window) {
    try {
      bc = new BroadcastChannel('truong_classroom_sync');
      bc.onmessage = (event) => {
        if (event.data) {
          callback(event.data);
        }
      };
    } catch (err) {}
  }

  // 4. KÊNH ĐỒNG BỘ ĐÁM MÂY XUYÊN TRÌNH DUYỆT (CHROME ⇄ EDGE ⇄ CỐC CỐC ⇄ 24 MÁY TRẠM)
  let lastSyncedTimestamp = 0;

  const syncFromCloud = () => {
    fetch(`https://ntfy.sh/${CLOUD_SYNC_TOPIC}/json?poll=1&_t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => res.text())
      .then((text) => {
        if (!text) return;
        const lines = text.trim().split('\n').filter(Boolean);
        for (let i = lines.length - 1; i >= 0; i--) {
          try {
            const parsed = JSON.parse(lines[i]);
            if (parsed && parsed.message) {
              let cloud: any = null;
              if (typeof parsed.message === 'string' && parsed.message.startsWith('{')) {
                cloud = JSON.parse(parsed.message);
              }
              if (cloud && typeof cloud.isLive === 'boolean') {
                const current = getClassroomState();
                const isStateChanged =
                  cloud.isLive !== current.isLive ||
                  cloud.activePeriod !== current.activePeriod ||
                  cloud.activeGrade !== current.activeGrade ||
                  cloud.activeClassId !== current.activeClassId ||
                  cloud.isTimerRunning !== current.isTimerRunning ||
                  cloud.timerEndTimestamp !== current.timerEndTimestamp ||
                  (cloud.activityLocks && JSON.stringify(cloud.activityLocks) !== JSON.stringify(current.activityLocks)) ||
                  (cloud.activityDurations && JSON.stringify(cloud.activityDurations) !== JSON.stringify(current.activityDurations)) ||
                  (cloud.updatedAt && cloud.updatedAt > lastSyncedTimestamp);

                if (isStateChanged) {
                  lastSyncedTimestamp = cloud.updatedAt || Date.now();
                  const cloudLocks = cloud.activityLocks || (cloud.isLive ? { discovery: true, practice: true, lab: true } : current.activityLocks);
                  const mergedState: ClassroomControlState = {
                    ...current,
                    isLive: Boolean(cloud.isLive),
                    activeGrade: cloud.activeGrade || current.activeGrade,
                    activeClassId: cloud.activeClassId || current.activeClassId,
                    activeClassName: cloud.activeClassName || current.activeClassName,
                    activePeriod: cloud.activePeriod || current.activePeriod,
                    lessonTitle: cloud.lessonTitle || current.lessonTitle,
                    activityLocks: cloudLocks,
                    activityDurations: cloud.activityDurations || current.activityDurations,
                    currentActivity: cloud.currentActivity || current.currentActivity,
                    timerRemainingSeconds: typeof cloud.timerRemainingSeconds === 'number' ? cloud.timerRemainingSeconds : current.timerRemainingSeconds,
                    timerDurationSeconds: typeof cloud.timerDurationSeconds === 'number' ? cloud.timerDurationSeconds : current.timerDurationSeconds,
                    timerEndTimestamp: typeof cloud.timerEndTimestamp === 'number' ? cloud.timerEndTimestamp : current.timerEndTimestamp,
                    isTimerRunning: typeof cloud.isTimerRunning === 'boolean' ? cloud.isTimerRunning : current.isTimerRunning,
                    isTimeUp: typeof cloud.isTimeUp === 'boolean' ? cloud.isTimeUp : current.isTimeUp,
                    broadcastMessage: cloud.broadcastMessage || current.broadcastMessage,
                    broadcastTime: cloud.broadcastTime || current.broadcastTime,
                  };
                  try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedState));
                  } catch (e) {}
                  callback(mergedState);
                }
                break;
              }
            }
          } catch (e) {}
        }
      })
      .catch(() => {});
  };

  syncFromCloud();
  const pollIntervalId = setInterval(syncFromCloud, 1200);

  // Kênh SSE nhận tức thì khi Thầy thao tác
  let es: EventSource | null = null;
  if ('EventSource' in window) {
    try {
      es = new EventSource(`https://ntfy.sh/${CLOUD_SYNC_TOPIC}/sse`);
      es.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed && parsed.message && typeof parsed.message === 'string' && parsed.message.startsWith('{')) {
            const cloud = JSON.parse(parsed.message);
            if (cloud && typeof cloud.isLive === 'boolean') {
              const current = getClassroomState();
              const cloudLocks = cloud.activityLocks || (cloud.isLive ? { discovery: true, practice: true, lab: true } : current.activityLocks);
              const mergedState: ClassroomControlState = {
                ...current,
                isLive: Boolean(cloud.isLive),
                activeGrade: cloud.activeGrade || current.activeGrade,
                activeClassId: cloud.activeClassId || current.activeClassId,
                activeClassName: cloud.activeClassName || current.activeClassName,
                activePeriod: cloud.activePeriod || current.activePeriod,
                lessonTitle: cloud.lessonTitle || current.lessonTitle,
                activityLocks: cloudLocks,
                activityDurations: cloud.activityDurations || current.activityDurations,
                currentActivity: cloud.currentActivity || current.currentActivity,
                timerRemainingSeconds: typeof cloud.timerRemainingSeconds === 'number' ? cloud.timerRemainingSeconds : current.timerRemainingSeconds,
                timerDurationSeconds: typeof cloud.timerDurationSeconds === 'number' ? cloud.timerDurationSeconds : current.timerDurationSeconds,
                timerEndTimestamp: typeof cloud.timerEndTimestamp === 'number' ? cloud.timerEndTimestamp : current.timerEndTimestamp,
                isTimerRunning: typeof cloud.isTimerRunning === 'boolean' ? cloud.isTimerRunning : current.isTimerRunning,
                isTimeUp: typeof cloud.isTimeUp === 'boolean' ? cloud.isTimeUp : current.isTimeUp,
                broadcastMessage: cloud.broadcastMessage || current.broadcastMessage,
                broadcastTime: cloud.broadcastTime || current.broadcastTime,
              };
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedState));
              } catch (e) {}
              callback(mergedState);
            }
          }
        } catch (err) {}
      };
    } catch (e) {}
  }

  // 5. KÊNH SUPABASE REALTIME (NẾU CÓ DỰ ÁN THẬT)
  let channel: ReturnType<typeof supabase.channel> | null = null;
  const isRealSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock-tin-hoc')
  );

  if (isRealSupabase) {
    try {
      channel = supabase
        .channel(CHANNEL_NAME)
        .on('broadcast', { event: 'state_change' }, ({ payload }) => {
          if (payload) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
            callback(payload as ClassroomControlState);
          }
        })
        .subscribe();
    } catch (e) {
      console.warn('Realtime channel unavailable:', e);
    }
  }

  return () => {
    window.removeEventListener('truong_classroom_update', handleLocalUpdate);
    window.removeEventListener('storage', handleStorageEvent);
    if (bc) {
      try {
        bc.close();
      } catch (e) {}
    }
    if (es) {
      try {
        es.close();
      } catch (e) {}
    }
    clearInterval(pollIntervalId);
    if (channel) {
      try {
        supabase.removeChannel(channel);
      } catch (e) {}
    }
  };
}

const CLASSES_STORAGE_KEY = 'truong_custom_classes';

/**
 * Lấy danh sách lớp học hiện hành (kết hợp MOCK_CLASSES và lớp thầy tạo thêm)
 */
export function getSavedClasses(): ClassItem[] {
  if (typeof window === 'undefined') return MOCK_CLASSES;
  try {
    const raw = localStorage.getItem(CLASSES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return MOCK_CLASSES;
}

/**
 * Lưu danh sách lớp học và thông báo cho toàn hệ thống
 */
export function saveClasses(classes: ClassItem[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CLASSES_STORAGE_KEY, JSON.stringify(classes));
      window.dispatchEvent(new CustomEvent('truong_classes_update', { detail: classes }));
    } catch (e) {}
  }
}
