'use client';

// ============================================================================
// HỆ THỐNG ĐIỀU KHIỂN PHÒNG THỰC HÀNH TIN HỌC TRỰC TIẾP
// Giáo viên: Thầy Trương Thành Trường — THCS Mão Điền
// Điều khiển 3 hoạt động độc lập qua Supabase Realtime WebSocket (kèm LocalStorage fallback)
// ============================================================================

import { supabase } from '@/lib/supabase/client';

export type ClassroomActivityKey = 'discovery' | 'practice' | 'lab';

export interface HelpRequest {
  id: string;
  machineId: number;
  machineName: string;
  studentNames: string;
  className: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'resolved';
}

export interface LabMachineState {
  machineId: number;
  machineName: string; // "Máy 01", "Máy 02"...
  student1Name: string;
  student1Code: string;
  student2Name?: string;
  student2Code?: string;
  status: 'online' | 'working' | 'submitted' | 'need_help' | 'offline';
  progress: number; // 0 - 100%
  completedTasks: number;
  totalTasks: number;
  starsEarned: number;
  lastActive: string;
  currentActivity: string;
}

export interface ActivityLockState {
  discovery: boolean; // Hoạt động 1: Khám phá cặp đôi (true: Đang Mở / false: Đang Khóa)
  practice: boolean;  // Hoạt động 2: Luyện tập (true: Đang Mở / false: Đang Khóa)
  lab: boolean;       // Hoạt động 3: Thực hành trên máy (true: Đang Mở / false: Đang Khóa)
}

export interface ClassroomControlState {
  activeGrade: number; // 6, 7, 8, 9
  activeClassId: string; // vd: "c-6a10"
  activeClassName: string; // vd: "Lớp 6A10"
  activePeriod: number; // 1 -> 29
  lessonTitle: string;
  
  // Công tắc khóa / mở thủ công độc lập cho 3 hoạt động
  activityLocks: ActivityLockState;
  
  // Hoạt động đang được chọn tiêu điểm trên bàn Thầy (tùy chọn)
  currentActivity: ClassroomActivityKey;

  // Đồng hồ đếm ngược phòng máy (Countdown Timer)
  timerTotalSeconds: number;
  timerRemainingSeconds: number;
  isTimerRunning: boolean;
  timerLabel: string;
  
  // Thông báo nhanh từ Thầy Trương Thành Trường xuống các máy
  broadcastMessage: string;
  broadcastTime?: string;
  
  // Chiếu bài mẫu lên toàn bộ máy (Spotlight)
  spotlightMachineId?: number;
  spotlightStudentNames?: string;
  spotlightTitle?: string;
  spotlightContent?: string;
  
  // Danh sách yêu cầu trợ giúp từ học sinh
  helpRequests: HelpRequest[];
  
  // Danh sách trạng thái 20 bàn máy phòng thực hành
  machines: LabMachineState[];
  
  updatedAt: string;
}

const STORAGE_KEY = 'truong_classroom_control_state';
const CHANNEL_NAME = 'truong_classroom_control_channel';
const SUPABASE_ROOM_CHANNEL = 'room-tin-hoc-thcs-mao-dien';

// Dữ liệu khởi tạo 20 bàn máy phòng thực hành
export function createDefaultMachines(className: string = 'Lớp 6A10'): LabMachineState[] {
  const samplePairs = [
    { s1: 'Lê Thị Hoài An (6A1001)', s2: 'Nguyễn Hoài An (6A1002)' },
    { s1: 'Lê Thị Bảo An (7A1101)', s2: 'Lê Danh Tuấn Anh (7A1102)' },
    { s1: 'Nguyễn Thị Mai Anh (7A1103)', s2: 'Nguyễn Văn Việt Anh (7A1104)' },
    { s1: 'Nguyễn Đắc Gia Bảo (7A1105)', s2: 'Đinh Yến Chi (7A1106)' },
    { s1: 'Nguyễn Quỳnh Chi (7A1107)', s2: 'Nguyễn Quang Cường (7A1108)' },
    { s1: 'Nguyễn Thị Thùy Dung (7A1109)', s2: 'Vương Văn Đạo (7A1110)' },
    { s1: 'Nguyễn Hương Giang (7A1111)', s2: 'Nguyễn Mai Hoa (7A1112)' },
    { s1: 'Nguyễn Thị Huyền (7A1113)', s2: 'Lê Thị Thu Hương (7A1114)' },
    { s1: 'Nguyễn Đăng Nhật Khang (7A1115)', s2: 'Lê Đình Quốc Khánh (7A1116)' },
    { s1: 'Phan Minh Khang (7A1117)', s2: 'Nguyễn Bá Khánh (7A1118)' },
    { s1: 'Nguyễn Thị Mai Lan (7A1119)', s2: 'Lê Thị Duy Linh (7A1120)' },
    { s1: 'Nguyễn Thị Thanh Mai (7A1121)', s2: 'Nguyễn Huy Mạnh (7A1122)' },
    { s1: 'Lê Khả Gia Minh (7A1123)', s2: 'Nguyễn Đạt Minh (7A1124)' },
    { s1: 'Nguyễn Thị Thảo Nguyên (7A1125)', s2: 'Lê Thị Quỳnh Nhi (7A1126)' },
    { s1: 'Lê Danh Phúc (7A1127)', s2: 'Nguyễn Hữu Phúc (7A1128)' },
    { s1: 'Vương Trường Phúc (7A1129)', s2: 'Nguyễn Thị Phương Thảo (7A1130)' },
    { s1: 'Lê Danh Thắng (7A1131)', s2: 'Nguyễn Hữu Thiện (7A1132)' },
    { s1: 'Nguyễn Đức Thực (7A1133)', s2: 'Lô Thị Quỳnh Trang (7A1134)' },
    { s1: 'Nguyễn Phương Trang (7A1135)', s2: 'Nguyễn Duy Trí (7A1136)' },
    { s1: 'Nguyễn Văn Vượng (7A1137)', s2: 'Nguyễn Bảo Yến (7A1138)' },
  ];

  return Array.from({ length: 20 }, (_, idx) => {
    const pair = samplePairs[idx] || { s1: `Học sinh A${idx + 1}`, s2: `Học sinh B${idx + 1}` };
    const num = idx + 1;
    const name = `Máy ${num < 10 ? '0' : ''}${num}`;
    return {
      machineId: num,
      machineName: name,
      student1Name: pair.s1,
      student1Code: `M${num}-A`,
      student2Name: pair.s2,
      student2Code: `M${num}-B`,
      status: 'working',
      progress: Math.floor(40 + Math.random() * 55),
      completedTasks: Math.floor(2 + Math.random() * 5),
      totalTasks: 7,
      starsEarned: Math.floor(Math.random() * 3),
      lastActive: 'Vừa xong',
      currentActivity: 'Hoạt động: Khám phá cặp đôi',
    };
  });
}

// Trạng thái mặc định ban đầu
export function getDefaultClassroomState(): ClassroomControlState {
  return {
    activeGrade: 6,
    activeClassId: 'c-6a10',
    activeClassName: 'Lớp 6A10',
    activePeriod: 1,
    lessonTitle: 'Tiết 1: Thông tin và thu nhận thông tin (Chủ đề A)',
    activityLocks: {
      discovery: true, // Mặc định mở Hoạt động 1
      practice: true,  // Mặc định mở Hoạt động 2
      lab: true,       // Mặc định mở Hoạt động 3
    },
    currentActivity: 'discovery',
    timerTotalSeconds: 15 * 60,
    timerRemainingSeconds: 15 * 60,
    isTimerRunning: false,
    timerLabel: 'Thời gian làm bài',
    broadcastMessage: 'Chào mừng các em đến với phòng thực hành Tin học THCS Mão Điền!',
    broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    helpRequests: [],
    machines: createDefaultMachines('Lớp 6A10'),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Đọc trạng thái điều khiển hiện tại từ LocalStorage
 */
export function getClassroomState(): ClassroomControlState {
  if (typeof window === 'undefined') {
    return getDefaultClassroomState();
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = getDefaultClassroomState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    const parsed = JSON.parse(raw);
    // Đảm bảo có activityLocks hợp lệ
    if (!parsed.activityLocks) {
      parsed.activityLocks = { discovery: true, practice: true, lab: true };
    }
    return parsed;
  } catch (e) {
    console.error('Lỗi khi đọc trạng thái điều khiển phòng máy:', e);
    return getDefaultClassroomState();
  }
}

/**
 * Cập nhật trạng thái điều khiển và phát sóng tức thì qua Supabase Realtime + BroadcastChannel + LocalStorage
 */
export function updateClassroomState(
  updater: Partial<ClassroomControlState> | ((prev: ClassroomControlState) => ClassroomControlState)
): ClassroomControlState {
  if (typeof window === 'undefined') {
    return getDefaultClassroomState();
  }

  const current = getClassroomState();
  const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater, updatedAt: new Date().toISOString() };

  // 1. Lưu vào LocalStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

  // 2. Phát sóng qua Supabase Realtime WebSocket (Truyền thông tin qua mạng LAN / Internet tới máy học sinh)
  try {
    if (supabase) {
      const channel = supabase.channel(SUPABASE_ROOM_CHANNEL);
      channel.send({
        type: 'broadcast',
        event: 'STATE_UPDATED',
        payload: next,
      }).catch((err) => {
        console.warn('Supabase Realtime Broadcast thông báo lỗi:', err);
      });
    }
  } catch (err) {
    console.warn('Lỗi gửi qua Supabase Realtime:', err);
  }

  // 3. Phát sóng qua BroadcastChannel cho các tab cùng máy (fallback)
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.postMessage({ type: 'STATE_UPDATED', state: next });
      bc.close();
    }
  } catch (err) {
    // ignore
  }

  return next;
}

/**
 * Thầy Trương Thành Trường bật/tắt khóa thủ công một hoạt động
 */
export function toggleActivityLock(activity: ClassroomActivityKey): ClassroomControlState {
  return updateClassroomState((prev) => {
    const currentStatus = prev.activityLocks[activity];
    const newLocks = {
      ...prev.activityLocks,
      [activity]: !currentStatus,
    };
    const actName = 
      activity === 'discovery' ? 'Khám phá cặp đôi' :
      activity === 'practice' ? 'Luyện tập' : 'Thực hành trên máy';
    
    const statusText = !currentStatus ? 'ĐÃ MỞ' : 'ĐÃ TẠM KHÓA';
    return {
      ...prev,
      activityLocks: newLocks,
      broadcastMessage: `🔔 Thầy Trương Thành Trường thông báo: Hoạt động "${actName}" ${statusText}!`,
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
  });
}

/**
 * Học sinh gửi yêu cầu trợ giúp lên bàn Thầy
 */
export function sendStudentHelpRequest(
  machineId: number,
  machineName: string,
  studentNames: string,
  className: string,
  message: string
): void {
  const newReq: HelpRequest = {
    id: `help-${Date.now()}`,
    machineId,
    machineName,
    studentNames,
    className,
    message,
    timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    status: 'pending',
  };

  updateClassroomState((prev) => {
    const updatedMachines = prev.machines.map((m) =>
      m.machineId === machineId ? { ...m, status: 'need_help' as const } : m
    );

    return {
      ...prev,
      helpRequests: [newReq, ...prev.helpRequests.filter((r) => r.machineId !== machineId)],
      machines: updatedMachines,
    };
  });
}

/**
 * Thầy Trương Thành Trường đánh dấu đã giải quyết yêu cầu trợ giúp
 */
export function resolveHelpRequest(requestId: string): void {
  updateClassroomState((prev) => {
    const req = prev.helpRequests.find((r) => r.id === requestId);
    const updatedRequests = prev.helpRequests.filter((r) => r.id !== requestId);
    const updatedMachines = req
      ? prev.machines.map((m) => (m.machineId === req.machineId ? { ...m, status: 'working' as const } : m))
      : prev.machines;

    return {
      ...prev,
      helpRequests: updatedRequests,
      machines: updatedMachines,
    };
  });
}

/**
 * Thầy Trương Thành Trường tặng sao / điểm thưởng tức thì cho một máy
 */
export function awardStarToMachine(machineId: number): void {
  updateClassroomState((prev) => ({
    ...prev,
    machines: prev.machines.map((m) =>
      m.machineId === machineId ? { ...m, starsEarned: m.starsEarned + 1 } : m
    ),
  }));
}

/**
 * Hook/Listener để các máy học sinh lắng nghe lệnh của Thầy Trương Thành Trường theo thời gian thực (Supabase Realtime + Broadcast fallback)
 */
export function subscribeToClassroomState(callback: (state: ClassroomControlState) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  // 1. Đăng ký nhận sự kiện từ Supabase Realtime WebSocket (Kết nối toàn mạng LAN / Internet)
  let supabaseChannel: any = null;
  try {
    if (supabase) {
      supabaseChannel = supabase
        .channel(SUPABASE_ROOM_CHANNEL)
        .on('broadcast', { event: 'STATE_UPDATED' }, (payload: any) => {
          if (payload?.payload) {
            // Cập nhật lại LocalStorage của máy con
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.payload));
            callback(payload.payload);
          }
        })
        .subscribe();
    }
  } catch (err) {
    console.warn('Supabase Realtime subscription error:', err);
  }

  // 2. Lắng nghe BroadcastChannel (cho các tab cùng máy)
  let bc: BroadcastChannel | null = null;
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel(CHANNEL_NAME);
      bc.onmessage = (event) => {
        if (event.data?.type === 'STATE_UPDATED' && event.data.state) {
          callback(event.data.state);
        }
      };
    }
  } catch (e) {
    // ignore
  }

  // 3. Lắng nghe StorageEvent
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const state = JSON.parse(event.newValue);
        callback(state);
      } catch (err) {
        console.error(err);
      }
    }
  };
  window.addEventListener('storage', handleStorage);

  // Trả về hàm hủy đăng ký
  return () => {
    if (supabaseChannel && supabase) {
      supabase.removeChannel(supabaseChannel);
    }
    if (bc) {
      bc.close();
    }
    window.removeEventListener('storage', handleStorage);
  };
}
