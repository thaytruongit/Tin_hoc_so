import { createClient } from '@supabase/supabase-js';

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
  practicalFileName?: string;
  practicalFileUrl?: string;
}

export interface ClassroomControlState {
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

export function createDefaultMachines(className: string = 'Lớp 7A11'): LabMachineState[] {
  const samplePairs = [
    { s1: 'Lê Thị Bảo An', s2: 'Lê Danh Tuấn Anh' },
    { s1: 'Nguyễn Thị Mai Anh', s2: 'Nguyễn Văn Việt Anh' },
    { s1: 'Nguyễn Đắc Gia Bảo', s2: 'Đinh Yến Chi' },
    { s1: 'Nguyễn Quỳnh Chi', s2: 'Nguyễn Quang Cường' },
    { s1: 'Nguyễn Thị Thùy Dung', s2: 'Vương Văn Đạo' },
    { s1: 'Nguyễn Hương Giang', s2: 'Nguyễn Mai Hoa' },
    { s1: 'Nguyễn Thị Huyền', s2: 'Lê Thị Thu Hương' },
    { s1: 'Nguyễn Đăng Nhật Khang', s2: 'Lê Đình Quốc Khánh' },
    { s1: 'Phan Minh Khang', s2: 'Nguyễn Bá Khánh' },
    { s1: 'Nguyễn Thị Mai Lan', s2: 'Lê Thị Duy Linh' },
    { s1: 'Nguyễn Thị Thanh Mai', s2: 'Nguyễn Huy Mạnh' },
    { s1: 'Lê Khả Gia Minh', s2: 'Nguyễn Đạt Minh' },
    { s1: 'Nguyễn Thị Thảo Nguyên', s2: 'Lê Thị Quỳnh Nhi' },
    { s1: 'Lê Danh Phúc', s2: 'Nguyễn Hữu Phúc' },
    { s1: 'Vương Trường Phúc', s2: 'Nguyễn Thị Phương Thảo' },
    { s1: 'Lê Danh Thắng', s2: 'Nguyễn Hữu Thiện' },
    { s1: 'Nguyễn Đức Thực', s2: 'Lô Thị Quỳnh Trang' },
    { s1: 'Nguyễn Phương Trang', s2: 'Nguyễn Duy Trí' },
    { s1: 'Nguyễn Văn Vượng', s2: 'Nguyễn Bảo Yến' },
    { s1: 'Nguyễn Thị Diệu Linh', s2: '' },
    { s1: 'Nguyễn Quốc An', s2: 'Nguyễn Thành Việt Anh' },
    { s1: 'Vũ Đức Anh', s2: 'Vương Huy Bảo' },
    { s1: 'Nguyễn Hữu Bắc', s2: 'Nguyễn Văn Bình' },
    { s1: 'Nguyễn Quốc Chung', s2: 'Nguyễn Bá Công' },
  ];

  return Array.from({ length: 24 }, (_, idx) => {
    const pair = samplePairs[idx] || { s1: `Học sinh A${idx + 1}`, s2: `Học sinh B${idx + 1}` };
    const num = idx + 1;
    const name = `Máy ${num < 10 ? '0' : ''}${num}`;
    const h1 = Number((8 + (idx % 3) * 0.8).toFixed(1));
    const h2 = Number((7 + ((idx * 2) % 4) * 0.8).toFixed(1));
    const h3 = Number((8.5 + (idx % 2) * 1.5).toFixed(1));
    const tot = Number((h1 * 0.3 + h2 * 0.3 + h3 * 0.4).toFixed(1));

    return {
      machineId: num,
      machineName: name,
      student1Name: pair.s1,
      student1Code: `HS${num}A`,
      student2Name: pair.s2,
      student2Code: pair.s2 ? `HS${num}B` : '',
      progress: 60 + ((num * 7) % 40),
      completedTasks: 5 + (num % 3),
      totalTasks: 7,
      starsEarned: 1 + (num % 3),
      status: 'submitted',
      hasHelpRequest: idx === 2 || idx === 10,
      scoreH1: h1,
      scoreH2: h2,
      scoreH3: h3,
      totalScore: tot,
      practicalFileName: `BTH_Tiet06_May${num < 10 ? '0' : ''}${num}.xlsx`,
      practicalFileUrl: `H:\\My Drive\\Giảng dạy\\NOP_BAI_THUC_HANH\\KHOI_7\\Tiet_06\\BTH_Tiet06_May${num < 10 ? '0' : ''}${num}.xlsx`,
    };
  });
}

export function getDefaultClassroomState(): ClassroomControlState {
  return {
    activeGrade: 7,
    activeClassId: 'c-7a11',
    activeClassName: 'Lớp 7A11',
    activePeriod: 6,
    lessonTitle: 'Tiết 6: Thực hành định dạng bảng tính và sử dụng hàm',
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
    machines: createDefaultMachines('Lớp 7A11'),
    helpRequests: [
      {
        id: 'help-1',
        machineId: 3,
        machineName: 'Máy 03',
        studentName: 'Nguyễn Đắc Gia Bảo & Đinh Yến Chi',
        message: 'Thầy ơi công thức tính tổng SUMIF của máy em đang báo lỗi #NAME ạ!',
        createdAt: '08:15',
        status: 'pending',
      },
    ],
  };
}

export function getClassroomState(): ClassroomControlState {
  if (typeof window === 'undefined') {
    return getDefaultClassroomState();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const def = getDefaultClassroomState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
      return def;
    }
    return JSON.parse(raw);
  } catch (err) {
    return getDefaultClassroomState();
  }
}

export function updateClassroomState(
  updater: (prev: ClassroomControlState) => ClassroomControlState
): ClassroomControlState {
  const current = getClassroomState();
  const next = updater(current);

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('truong_classroom_update', { detail: next }));
  }

  // Phát tín hiệu Realtime qua Supabase Broadcast
  try {
    const channel = supabase.channel(CHANNEL_NAME);
    channel.send({
      type: 'broadcast',
      event: 'state_change',
      payload: next,
    });
  } catch (err) {}

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
