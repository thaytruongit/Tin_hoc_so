'use client';

// ============================================================================
// HỆ THỐNG ĐIỀU KHIỂN LỚP HỌC TRỰC TIẾP (CLASSROOM ORCHESTRATION & CONTROL)
// Dành cho Thầy Trương IT điều khiển phòng thực hành Tin học THCS Mão Điền
// Đồng bộ 2 chiều tức thì giữa Máy Giáo viên và Máy Học sinh (Broadcast Channel + LocalStorage)
// ============================================================================

export type LessonPhase = 
  | 'free'              // Thao tác tự do / Chưa bắt đầu
  | 'lecture_lock'      // Khóa màn hình phòng máy: Tập trung nghe Thầy giảng
  | 'phase_1_warmup'    // Pha 1: Khởi động & Giới thiệu bài (Slide PowerPoint)
  | 'phase_2_pair'      // Pha 2: Khám phá Cặp đôi (Phiếu học tập điện tử 2 HS/máy)
  | 'phase_3_practice'  // Pha 3: Luyện tập củng cố (7 câu phân hóa chuẩn Bộ)
  | 'phase_4_practical' // Pha 4: Thực hành trên máy (KTV & Thư ký)
  | 'phase_5_submit'    // Pha 5: Thu bài đồng loạt & Khóa nộp bài
  | 'spotlight';        // Chiếu bài làm học sinh xuất sắc lên toàn bộ máy

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
  completedTasks: number; // ví dụ 5/7 câu
  totalTasks: number;
  starsEarned: number;
  lastActive: string;
  currentActivity: string;
}

export interface ClassroomControlState {
  activeGrade: number; // 6, 7, 8, 9
  activeClassId: string; // vd: "c-6a10"
  activeClassName: string; // vd: "Lớp 6A10"
  activePeriod: number; // 1 -> 29
  lessonTitle: string;
  
  // Trạng thái điều khiển tổng thể
  phase: LessonPhase;
  isScreenLocked: boolean;
  lockReason: string;
  
  // Đồng hồ đếm ngược phòng máy (Countdown Timer)
  timerTotalSeconds: number;
  timerRemainingSeconds: number;
  isTimerRunning: boolean;
  timerLabel: string;
  
  // Thông báo khẩn từ Thầy xuống các máy (Broadcast marquee)
  broadcastMessage: string;
  broadcastTime?: string;
  
  // Chiếu bài mẫu lên toàn bộ máy (Spotlight)
  spotlightMachineId?: number;
  spotlightStudentNames?: string;
  spotlightTitle?: string;
  spotlightContent?: string;
  
  // Danh sách yêu cầu trợ giúp từ học sinh
  helpRequests: HelpRequest[];
  
  // Danh sách trạng thái 20 bàn máy
  machines: LabMachineState[];
  
  updatedAt: string;
}

const STORAGE_KEY = 'truong_classroom_control_state';
const CHANNEL_NAME = 'truong_classroom_control_channel';

// Dữ liệu khởi tạo 20 bàn máy phòng thực hành
export function createDefaultMachines(className: string = 'Lớp 6A10'): LabMachineState[] {
  const samplePairs = [
    { s1: 'Lê Thị Hoài An (6A1001)', s2: 'Nguyễn Đức Bình (6A1002)' },
    { s1: 'Trần Văn Chiến (6A1003)', s2: 'Phạm Thị Dung (6A1004)' },
    { s1: 'Vũ Hải Đăng (6A1005)', s2: 'Hoàng Minh Đức (6A1006)' },
    { s1: 'Đặng Thùy Dương (6A1007)', s2: 'Bùi Thanh Giang (6A1008)' },
    { s1: 'Lý Quốc Hưng (6A1009)', s2: 'Dương Gia Huy (6A1010)' },
    { s1: 'Ngô Khánh Huyền (6A1011)', s2: 'Đỗ Tuấn Khang (6A1012)' },
    { s1: 'Lê Mai Linh (6A1013)', s2: 'Nguyễn Văn Nam (6A1014)' },
    { s1: 'Phan Thảo Nguyên (6A1015)', s2: 'Trịnh Phương Oanh (6A1016)' },
    { s1: 'Võ Minh Quân (6A1017)', s2: 'Đinh Hoàng Sơn (6A1018)' },
    { s1: 'Tạ Minh Tâm (6A1019)', s2: 'Hà Thị Thu (6A1020)' },
    { s1: 'Nguyễn Tiến Dũng (6A1021)', s2: 'Đỗ Thảo Vy (6A1022)' },
    { s1: 'Lương Bảo Anh (6A1023)', s2: 'Phạm Quốc Cường (6A1024)' },
    { s1: 'Hoàng Thùy Chi (6A1025)', s2: 'Trần Đại Nghĩa (6A1026)' },
    { s1: 'Nguyễn Nhật Minh (6A1027)', s2: 'Lê Thu Trang (6A1028)' },
    { s1: 'Vũ Đức Thành (6A1029)', s2: 'Trịnh Kim Ngân (6A1030)' },
    { s1: 'Bùi Gia Khiêm (6A1031)', s2: 'Đặng Thảo My (6A1032)' },
    { s1: 'Phạm Minh Tuấn (6A1033)', s2: 'Võ Thị Yến (6A1034)' },
    { s1: 'Đinh Văn Quý (6A1035)', s2: 'Ngô Phương Ly (6A1036)' },
    { s1: 'Lý Thị Lan (6A1037)', s2: 'Trần Hải Long (6A1038)' },
    { s1: 'Nguyễn Văn Phúc (6A1039)', s2: 'Phạm Mai Phương (6A1040)' },
  ];

  return Array.from({ length: 20 }, (_, idx) => {
    const pair = samplePairs[idx] || { s1: `Học sinh A${idx + 1}`, s2: `Học sinh B${idx + 1}` };
    const s1Parts = pair.s1.split(' (');
    const s2Parts = pair.s2.split(' (');

    return {
      machineId: idx + 1,
      machineName: `Máy ${idx + 1 < 10 ? '0' : ''}${idx + 1}`,
      student1Name: s1Parts[0],
      student1Code: s1Parts[1]?.replace(')', '') || '',
      student2Name: s2Parts[0],
      student2Code: s2Parts[1]?.replace(')', '') || '',
      status: idx === 3 ? 'need_help' : idx % 3 === 0 ? 'submitted' : 'working',
      progress: Math.min(100, 30 + (idx * 4)),
      completedTasks: Math.min(7, 2 + (idx % 6)),
      totalTasks: 7,
      starsEarned: (idx % 3) + 1,
      lastActive: 'Vừa xong',
      currentActivity: idx % 2 === 0 ? 'Phiếu khám phá cặp đôi' : 'Luyện tập 7 câu',
    };
  });
}

// Khởi tạo trạng thái lớp học mặc định
export function getDefaultClassroomState(): ClassroomControlState {
  return {
    activeGrade: 6,
    activeClassId: 'c-6a10',
    activeClassName: 'Lớp 6A10',
    activePeriod: 1,
    lessonTitle: 'Tiết 1: Thông tin và dữ liệu (Tin học 6)',
    phase: 'free',
    isScreenLocked: false,
    lockReason: 'Thầy Trương đang điều khiển lớp học. Vui lòng tập trung nhìn lên màn chiếu của Thầy!',
    timerTotalSeconds: 600, // 10 phút
    timerRemainingSeconds: 600,
    isTimerRunning: false,
    timerLabel: 'Thời gian làm bài',
    broadcastMessage: '',
    helpRequests: [
      {
        id: 'help-01',
        machineId: 4,
        machineName: 'Máy 04',
        studentNames: 'Phạm Thị Dung & Vũ Hải Đăng',
        className: 'Lớp 6A10',
        message: 'Thưa Thầy, câu 3 phân biệt thông tin và vật mang tin tụi em chưa thống nhất được ạ!',
        timestamp: '14:20',
        status: 'pending',
      }
    ],
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
    return JSON.parse(raw);
  } catch (e) {
    console.error('Lỗi khi đọc trạng thái điều khiển phòng máy:', e);
    return getDefaultClassroomState();
  }
}

/**
 * Cập nhật trạng thái điều khiển và phát sóng tức thì xuống toàn bộ máy học sinh
 */
export function updateClassroomState(updater: Partial<ClassroomControlState> | ((prev: ClassroomControlState) => ClassroomControlState)): ClassroomControlState {
  if (typeof window === 'undefined') {
    return getDefaultClassroomState();
  }

  const current = getClassroomState();
  const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater, updatedAt: new Date().toISOString() };

  // Lưu vào LocalStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

  // Phát sóng qua BroadcastChannel cho tất cả các tab và cửa sổ mở cùng origin
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'STATE_UPDATED', state: next });
      channel.close();
    }
  } catch (err) {
    console.warn('BroadcastChannel không khả dụng, đã dùng StorageEvent fallback:', err);
  }

  return next;
}

/**
 * Học sinh gửi yêu cầu trợ giúp lên bàn Thầy
 */
export function sendStudentHelpRequest(machineId: number, machineName: string, studentNames: string, className: string, message: string): void {
  updateClassroomState((prev) => {
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

    // Đổi trạng thái máy sang need_help
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
 * Thầy Trương đánh dấu đã giải quyết yêu cầu trợ giúp
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
 * Thầy Trương tặng sao / cộng điểm thưởng tức thì cho một máy
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
 * Hook/Listener để các trang học sinh lắng nghe lệnh của Thầy theo thời gian thực
 */
export function subscribeToClassroomState(callback: (state: ClassroomControlState) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  // 1. Lắng nghe BroadcastChannel
  let channel: BroadcastChannel | null = null;
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data?.type === 'STATE_UPDATED' && event.data.state) {
          callback(event.data.state);
        }
      };
    }
  } catch (e) {
    console.warn('Lỗi khởi tạo BroadcastChannel:', e);
  }

  // 2. Lắng nghe StorageEvent (khi tab khác cập nhật localStorage)
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
    if (channel) {
      channel.close();
    }
    window.removeEventListener('storage', handleStorage);
  };
}
