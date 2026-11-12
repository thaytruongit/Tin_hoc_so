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
    isLive: true, // Tiết học dạy trực tiếp kết nối 24 máy trạm
    activeGrade: 6,
    activeClassId: 'c-6a10',
    activeClassName: 'Lớp 6A10',
    activePeriod: 1,
    lessonTitle: 'Tiết 1: Thông tin và dữ liệu',
    activityLocks: {
      discovery: true,
      practice: true,
      lab: true,
    },
    activityDurations: {
      discovery: 10, // 10 phút
      practice: 7,   // 7 phút
      lab: 15,       // 15 phút
    },
    currentActivity: 'discovery',
    timerRemainingSeconds: 600,
    isTimerRunning: true,
    isTimeUp: false,
    spotlightMachineId: null,
    broadcastMessage: '🔔 Chào mừng các em đến với Tiết học Tin học · Thầy Đỗ Mạnh Trường!',
    broadcastTime: '08:00',
    machines: createMachinesForClass('c-6a10', 'Lớp 6A10'),
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

export function updateClassroomState(
  updater: (prev: ClassroomControlState) => ClassroomControlState
): ClassroomControlState {
  const current = getClassroomState();
  const next = updater(current);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('truong_classroom_update', { detail: next }));
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

export function toggleActivityLock(activity: ClassroomActivityKey): ClassroomControlState {
  return updateClassroomState((prev) => {
    const currentStatus = prev.activityLocks[activity];
    const newStatus = !currentStatus;
    const durMinutes = prev.activityDurations[activity] || 10;

    return {
      ...prev,
      currentActivity: activity,
      timerRemainingSeconds: durMinutes * 60,
      isTimerRunning: newStatus,
      isTimeUp: false,
      activityLocks: {
        ...prev.activityLocks,
        [activity]: newStatus,
      },
      broadcastMessage: newStatus
        ? `▶️ Thầy đã MỞ ${activity === 'discovery' ? 'Hoạt động 1: Khám phá cặp đôi' : activity === 'practice' ? 'Hoạt động 2: Luyện tập (7 câu)' : 'Hoạt động 3: Thực hành trên máy'} (Thời gian ấn định: ${durMinutes} phút).`
        : `⏸️ Thầy đã TẠM KHÓA ${activity === 'discovery' ? 'Hoạt động 1: Khám phá cặp đôi' : activity === 'practice' ? 'Hoạt động 2: Luyện tập (7 câu)' : 'Hoạt động 3: Thực hành trên máy'}.`,
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
 * Khi bật (isLive = true): Học sinh vào thẳng 3 hoạt động trực tiếp
 * Khi tắt (isLive = false): Học sinh nhìn thấy Bảng Trắng kèm thông báo chờ lệnh
 */
export function setLiveBroadcast(isLive: boolean, className?: string): ClassroomControlState {
  return updateClassroomState((prev) => ({
    ...prev,
    isLive,
    broadcastMessage: isLive
      ? `🔴 Thầy Đỗ Mạnh Trường: ĐANG PHÁT TRỰC TIẾP bài dạy cho ${className || prev.activeClassName}! Các em hãy vào học nhé.`
      : `⏸️ Thầy Đỗ Mạnh Trường: Đã tạm dừng phát trực tiếp (Màn hình máy trạm chuyển về Bảng trắng thông báo).`,
    broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  }));
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

  const handleLocalUpdate = (e: Event) => {
    const customEvent = e as CustomEvent<ClassroomControlState>;
    if (customEvent && customEvent.detail) {
      callback(customEvent.detail);
    }
  };

  window.addEventListener('truong_classroom_update', handleLocalUpdate);

  // Chỉ kết nối Supabase channel nếu được cấu hình thực sự, tránh lỗi WebSocket fail trên mock domain
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
