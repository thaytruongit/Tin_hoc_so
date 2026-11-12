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
  Maximize2,
  Download,
  FileSpreadsheet,
  Trophy,
  Search,
  Filter,
  ExternalLink,
  Printer,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
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
  createDefaultMachines,
  broadcastLesson,
  setLiveBroadcast,
  updateMachineScore
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
  const [broadcastGrade, setBroadcastGrade] = useState<number>(controlState.activeGrade || currentClass.grade || 7);
  const [customBroadcast, setCustomBroadcast] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<number>(controlState.activePeriod || 6);
  const [inspectingMachine, setInspectingMachine] = useState<LabMachineState | null>(null);

  // 5 Phân hệ của Chức năng Lớp học số
  const [activeSubFeature, setActiveSubFeature] = useState<'control' | 'grading' | 'grid' | 'ranking' | 'summary'>('control');

  // Trạng thái chấm bài thực hành
  const [gradingMachineId, setGradingMachineId] = useState<number | null>(null);
  const [tempMachineScore, setTempMachineScore] = useState<string>('9.5');
  const [tempMachineComment, setTempMachineComment] = useState<string>('Thực hành tốt, đúng yêu cầu kỹ thuật!');

  // Bộ lọc & Chế độ xem của Bảng Tổng Hợp 24 Máy
  const [viewMode, setViewMode] = useState<'both' | '3d' | 'table'>('both');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [rankFilter, setRankFilter] = useState<string>('all');

  // Đăng ký nhận sự kiện điều khiển thời gian thực
  useEffect(() => {
    const unsub = subscribeToClassroomState((newState) => {
      setControlState(newState);
      if (newState.activeGrade) setBroadcastGrade(newState.activeGrade);
      if (newState.activePeriod) setSelectedPeriod(newState.activePeriod);
    });
    return () => unsub();
  }, []);

  // Lấy dữ liệu 29 tiết học của khối đang chọn phát lệnh
  const gradeCurriculum = useMemo(() => {
    return CURRICULUM_DATA[broadcastGrade] || CURRICULUM_DATA[7] || [];
  }, [broadcastGrade]);

  // Tiết học hiện tại
  const activeLesson = useMemo(() => {
    return gradeCurriculum.find((l) => l.period === selectedPeriod) || gradeCurriculum[0];
  }, [gradeCurriculum, selectedPeriod]);

  // Đồng bộ thông tin tiết và lớp vào trạng thái điều khiển
  const handleSyncLessonToLab = () => {
    broadcastLesson(
      broadcastGrade,
      selectedPeriod,
      `Tiết ${activeLesson.period}: ${activeLesson.title}`,
      currentClass.name
    );
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  // Bật/tắt khóa thủ công từng hoạt động (kèm thời gian ấn định)
  const handleToggleActivity = (act: ClassroomActivityKey) => {
    const nextState = toggleActivityLock(act);
    setControlState(nextState);
  };

  // Mở hoặc Đóng tất cả 3 hoạt động cùng lúc theo lệnh của Thầy
  const handleSetAllActivities = (isOpen: boolean) => {
    const nextState = updateClassroomState((prev) => ({
      ...prev,
      activityLocks: {
        discovery: isOpen,
        practice: isOpen,
        lab: isOpen,
      },
      broadcastMessage: isOpen
        ? `▶️ Thầy Đỗ Mạnh Trường: ĐÃ MỞ TẤT CẢ 3 HOẠT ĐỘNG cho cả lớp làm bài!`
        : `⏸️ Thầy Đỗ Mạnh Trường: ĐÃ TẠM ĐÓNG TẤT CẢ 3 HOẠT ĐỘNG.`,
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }));
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

  // Thống kê phân loại 24 máy phòng máy
  const stats = useMemo(() => {
    const list = controlState.machines;
    const total = list.length || 24;
    let sumScore = 0;
    let countXuatSac = 0;
    let countGioi = 0;
    let countKha = 0;
    let countCanHoTro = 0;
    let countSubmittedFile = 0;

    list.forEach((m) => {
      const tot = m.totalScore ?? 8.5;
      sumScore += tot;
      if (tot >= 9.0) countXuatSac++;
      else if (tot >= 8.0) countGioi++;
      else if (tot >= 6.5) countKha++;
      else countCanHoTro++;

      if (m.practicalFileName) countSubmittedFile++;
    });

    const avg = Number((sumScore / total).toFixed(1));
    return {
      total,
      avg,
      countXuatSac,
      countGioi,
      countKha,
      countCanHoTro,
      countSubmittedFile,
    };
  }, [controlState.machines]);

  // Lọc danh sách máy theo từ khóa & xếp loại
  const filteredMachines = useMemo(() => {
    return controlState.machines.filter((m) => {
      const matchSearch =
        !searchKeyword.trim() ||
        m.machineName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        m.student1Name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (m.student2Name && m.student2Name.toLowerCase().includes(searchKeyword.toLowerCase()));

      if (!matchSearch) return false;

      const tot = m.totalScore ?? 8.5;
      if (rankFilter === 'xuat_sac') return tot >= 9.0;
      if (rankFilter === 'gioi') return tot >= 8.0 && tot < 9.0;
      if (rankFilter === 'kha') return tot >= 6.5 && tot < 8.0;
      if (rankFilter === 'can_ho_tro') return tot < 6.5;
      if (rankFilter === 'has_file') return Boolean(m.practicalFileName);

      return true;
    });
  }, [controlState.machines, searchKeyword, rankFilter]);

  // Vinh danh Top 3 máy xuất sắc
  const handleCelebrateTopMachines = () => {
    const sorted = [...controlState.machines].sort((a, b) => (b.totalScore ?? 0) - (a.totalScore ?? 0));
    const top3 = sorted.slice(0, 3);
    const topStr = top3
      .map((m) => `${m.machineName} (${m.student1Name}${m.student2Name ? ' & ' + m.student2Name : ''}: ${m.totalScore}đ)`)
      .join(' · ');

    confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });

    updateClassroomState((prev) => ({
      ...prev,
      broadcastMessage: `🎉 Nhiệt liệt tuyên dương TOP 3 NHÓM XUẤT SẮC NHẤT: ${topStr}!`,
      broadcastTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }));
  };

  // Xuất Bảng Điểm Ra File Excel (.xls) có format chuẩn Bộ GD&ĐT
  const handleExportScoreboardExcel = () => {
    const className = currentClass.name || 'Lớp 7A11';
    const periodNum = activeLesson.period || selectedPeriod;
    const lessonTitle = activeLesson.title || 'Bài tập thực hành Tin học';
    const nowStr = new Date().toLocaleString('vi-VN');

    const rowsHtml = controlState.machines
      .map((m, idx) => {
        const h1 = m.scoreH1 ?? 9.0;
        const h2 = m.scoreH2 ?? 8.5;
        const h3 = m.scoreH3 ?? 9.5;
        const tot = m.totalScore ?? Number((h1 * 0.3 + h2 * 0.3 + h3 * 0.4).toFixed(1));
        let rank = 'Xuất sắc';
        if (tot < 5.0) rank = 'Cần cố gắng';
        else if (tot < 6.5) rank = 'Trung bình';
        else if (tot < 8.0) rank = 'Khá';
        else if (tot < 9.0) rank = 'Giỏi';

        return `
        <tr>
          <td style="text-align:center; padding: 6px; border: 1px solid #999;">${idx + 1}</td>
          <td style="text-align:center; font-weight: bold; padding: 6px; border: 1px solid #999; background-color: #f1f5f9;">${m.machineName}</td>
          <td style="padding: 6px; border: 1px solid #999;">${m.student1Name}</td>
          <td style="padding: 6px; border: 1px solid #999;">${m.student2Name || '—'}</td>
          <td style="text-align:center; font-weight: bold; color: #1e40af; padding: 6px; border: 1px solid #999;">${h1}</td>
          <td style="text-align:center; font-weight: bold; color: #047857; padding: 6px; border: 1px solid #999;">${h2}</td>
          <td style="text-align:center; font-weight: bold; color: #6d28d9; padding: 6px; border: 1px solid #999;">${h3}</td>
          <td style="text-align:center; font-weight: bold; font-size: 13px; color: #b45309; padding: 6px; border: 1px solid #999; background-color: #fef3c7;">${tot}</td>
          <td style="text-align:center; font-weight: bold; padding: 6px; border: 1px solid #999;">${rank}</td>
          <td style="padding: 6px; border: 1px solid #999;">${m.practicalFileName || 'Đã nộp Google Drive'}</td>
        </tr>
      `;
      })
      .join('');

    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Bang_Diem_Tiet_Hoc</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; width: 100%; font-family: 'Times New Roman', serif; font-size: 12pt; }
          th { background-color: #1e3a8a; color: #ffffff; font-weight: bold; padding: 8px; text-align: center; border: 1px solid #000; }
        </style>
      </head>
      <body>
        <div style="font-family: 'Times New Roman', serif; margin-bottom: 16px;">
          <h4 style="margin: 0; text-transform: uppercase;">UBND PHƯỜNG MÃO ĐIỀN — TRƯỜNG THCS MÃO ĐIỀN</h4>
          <h2 style="margin: 4px 0; color: #1e3a8a; text-transform: uppercase;">BẢNG ĐIỂM TỔNG HỢP TIẾT DẠY TIN HỌC TRỰC TIẾP TRÊN LỚP</h2>
          <p style="margin: 2px 0;"><strong>Giáo viên giảng dạy:</strong> Thầy Đỗ Mạnh Trường</p>
          <p style="margin: 2px 0;"><strong>Lớp:</strong> ${className} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Tiết ${periodNum}:</strong> ${lessonTitle}</p>
          <p style="margin: 2px 0;"><strong>Thời gian xuất:</strong> ${nowStr}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Số Máy</th>
              <th>Học Sinh 1 (Kỹ thuật viên)</th>
              <th>Học Sinh 2 (Thư ký)</th>
              <th>Điểm HĐ1 (Khám phá)</th>
              <th>Điểm HĐ2 (Luyện tập)</th>
              <th>Điểm HĐ3 (Thực hành)</th>
              <th>Điểm Tiết Học</th>
              <th>Xếp Loại</th>
              <th>Tệp Bài Làm (Google Drive)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const cleanClassName = className.replace(/[^a-zA-Z0-9]/g, '_');
    link.href = url;
    link.download = `Bang_Diem_TinHoc_${cleanClassName}_Tiet${periodNum < 10 ? '0' : ''}${periodNum}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* ==================================================================== */}
      {/* 1. THANH ĐIỀU PHỐI PHÁT TRỰC TIẾP LỚP HỌC SỐ (LIVE BROADCAST)        */}
      {/* ==================================================================== */}
      <div className={`p-5 rounded-3xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm ${
        controlState.isLive
          ? 'bg-rose-50/90 border-rose-300 text-rose-950'
          : 'bg-slate-50 border-slate-300 text-slate-800'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`w-3 h-3 rounded-full ${controlState.isLive ? 'bg-rose-600 animate-ping' : 'bg-slate-400'}`}></span>
            <span className="text-xs font-black uppercase tracking-wider">
              {controlState.isLive ? '🔴 ĐANG PHÁT TRỰC TIẾP BÀI DẠY' : '⏸️ ĐANG TẠM DỪNG (HỌC SINH THẤY BẢNG TRẮNG)'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white font-bold text-xs border border-slate-200 text-blue-700">
              {currentClass.name}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Tiết {activeLesson.period}: {activeLesson.title}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            {controlState.isLive
              ? `Tất cả 24 máy trạm của ${currentClass.name} đang hiển thị 3 hoạt động bài học và nộp bài thời gian thực.`
              : `Học sinh đang dừng ở màn hình Bảng Trắng kèm thông báo của Thầy Trường để ổn định chỗ ngồi và kiểm tra thiết bị.`
            }
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              const nextLive = !controlState.isLive;
              setLiveBroadcast(nextLive, currentClass.name);
              setControlState(prev => ({ ...prev, isLive: nextLive }));
              if (nextLive) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
              controlState.isLive
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-500/20'
            }`}
          >
            <Radio className="w-4 h-4 text-white animate-pulse" />
            <span>{controlState.isLive ? 'Dừng phát (Hiện Bảng Trắng)' : '🔴 Phát trực tiếp bài dạy ngay'}</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. MENU 5 PHÂN HỆ CỐT LÕI CỦA LỚP HỌC SỐ                            */}
      {/* ==================================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-3">
        {[
          { id: 'control', name: '1. Điều khiển 3 hoạt động trực tiếp', icon: Radio },
          { id: 'grading', name: '2. Chấm bài thực hành', icon: CheckSquare },
          { id: 'grid', name: '3. Lưới theo dõi 24 máy', icon: Monitor },
          { id: 'ranking', name: '4. Bảng xếp hạng lớp', icon: Trophy },
          { id: 'summary', name: '5. Tổng hợp kết quả', icon: FileSpreadsheet },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubFeature === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubFeature(tab.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* PHÂN HỆ 1: ĐIỀU KHIỂN THỦ CÔNG MỞ/ĐÓNG 3 HOẠT ĐỘNG TRỰC TIẾP KHI PHÁT LIVE */}
      {activeSubFeature === 'control' && (
        <div className="space-y-4">
          {/* THANH ĐIỀU KHIỂN TRẠNG THÁI VÀ NÚT THAO TÁC NHANH */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${controlState.isLive ? 'bg-rose-600 animate-ping' : 'bg-slate-400'}`} />
                <h3 className="font-black text-slate-900 text-sm sm:text-base tracking-tight">
                  {controlState.isLive
                    ? '🔴 Đang Phát Trực Tiếp · Điều Khiển Thủ Công Mở / Đóng Từng Hoạt Động'
                    : '⏸️ Tiết Học Đang Tạm Dừng · Bật "Phát Trực Tiếp" Để Cho Học Sinh Vào Học'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {controlState.isLive
                  ? `24 máy trạm của ${currentClass.name} sẽ tự động cập nhật ngay khi Thầy bấm Mở hoặc Đóng từng hoạt động.`
                  : `Học sinh đang dừng ở màn hình Bảng Trắng. Thầy có thể cấu hình sẵn trạng thái hoạt động bên dưới.`}
              </p>
            </div>

            {/* CẶP NÚT THAO TÁC NHANH: MỞ TẤT CẢ / ĐÓNG TẤT CẢ */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleSetAllActivities(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                title="Mở tất cả 3 hoạt động cho cả lớp làm bài"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Mở Tất Cả (3 HĐ)</span>
              </button>
              <button
                type="button"
                onClick={() => handleSetAllActivities(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                title="Đóng / Khóa tất cả hoạt động để học sinh tập trung nghe giảng"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Đóng Tất Cả</span>
              </button>
            </div>
          </div>

          {/* 3 THẺ HOẠT ĐỘNG: ĐẶT THỦ CÔNG MỞ / ĐÓNG CHO TỪNG HOẠT ĐỘNG */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* HOẠT ĐỘNG 1: KHÁM PHÁ CẶP ĐÔI */}
            <div className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 shadow-xs ${
              controlState.activityLocks.discovery
                ? 'bg-emerald-50/40 border-emerald-500/80 ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 ${
                    controlState.activityLocks.discovery
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {controlState.activityLocks.discovery ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Đang Mở</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Đang Đóng</span>
                      </>
                    )}
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    1. Khám Phá Kiến Thức
                  </h4>
                  <p className="text-xs text-indigo-700 font-bold mt-0.5">
                    Khám phá cặp đôi · Điền khuyết kiến thức
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Thời gian gợi ý: <strong>10 phút</strong>. Hai học sinh ngồi cùng máy phối hợp hoàn thành bài và chấm tự động.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => handleToggleActivity('discovery')}
                  className={`w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    controlState.activityLocks.discovery
                      ? 'bg-rose-600 hover:bg-rose-700 text-white hover:shadow'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow'
                  }`}
                >
                  {controlState.activityLocks.discovery ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Đóng / Khóa Hoạt Động 1</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Mở Hoạt Động 1 Cho Cả Lớp</span>
                    </>
                  )}
                </button>
                <div className="text-[10.5px] text-center text-slate-400 font-medium">
                  {controlState.activityLocks.discovery ? 'Học sinh đang được làm bài này' : 'Học sinh bị khóa không vào được'}
                </div>
              </div>
            </div>

            {/* HOẠT ĐỘNG 2: LUYỆN TẬP 7 CÂU */}
            <div className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 shadow-xs ${
              controlState.activityLocks.practice
                ? 'bg-emerald-50/40 border-emerald-500/80 ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 ${
                    controlState.activityLocks.practice
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {controlState.activityLocks.practice ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Đang Mở</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Đang Đóng</span>
                      </>
                    )}
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    2. Luyện Tập Trắc Nghiệm
                  </h4>
                  <p className="text-xs text-emerald-700 font-bold mt-0.5">
                    Bộ 7 câu hỏi củng cố · Chấm tức thì
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Thời gian gợi ý: <strong>7 phút</strong>. Học sinh làm trắc nghiệm thang điểm 10, nhận phản hồi kết quả ngay.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => handleToggleActivity('practice')}
                  className={`w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    controlState.activityLocks.practice
                      ? 'bg-rose-600 hover:bg-rose-700 text-white hover:shadow'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow'
                  }`}
                >
                  {controlState.activityLocks.practice ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Đóng / Khóa Hoạt Động 2</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Mở Hoạt Động 2 Cho Cả Lớp</span>
                    </>
                  )}
                </button>
                <div className="text-[10.5px] text-center text-slate-400 font-medium">
                  {controlState.activityLocks.practice ? 'Học sinh đang được làm bài này' : 'Học sinh bị khóa không vào được'}
                </div>
              </div>
            </div>

            {/* HOẠT ĐỘNG 3: THỰC HÀNH TRÊN MÁY */}
            <div className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 shadow-xs ${
              controlState.activityLocks.lab
                ? 'bg-emerald-50/40 border-emerald-500/80 ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 ${
                    controlState.activityLocks.lab
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {controlState.activityLocks.lab ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Đang Mở</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Đang Đóng</span>
                      </>
                    )}
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    3. Thực Hành Trên Máy
                  </h4>
                  <p className="text-xs text-purple-700 font-bold mt-0.5">
                    Thực hành sản phẩm · Nộp Google Drive &amp; Rubric
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Thời gian gợi ý: <strong>15 phút</strong>. Thao tác trên phần mềm máy tính, nộp tệp bài làm trực tiếp lên hệ thống.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => handleToggleActivity('lab')}
                  className={`w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    controlState.activityLocks.lab
                      ? 'bg-rose-600 hover:bg-rose-700 text-white hover:shadow'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow'
                  }`}
                >
                  {controlState.activityLocks.lab ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Đóng / Khóa Hoạt Động 3</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Mở Hoạt Động 3 Cho Cả Lớp</span>
                    </>
                  )}
                </button>
                <div className="text-[10.5px] text-center text-slate-400 font-medium">
                  {controlState.activityLocks.lab ? 'Học sinh đang được làm bài này' : 'Học sinh bị khóa không vào được'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHÂN HỆ 2: CHẤM BÀI THỰC HÀNH */}
      {activeSubFeature === 'grading' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-purple-600" />
                <span>Chấm Bài Thực Hành Phòng Máy · {currentClass.name}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Chấm điểm bài thực hành Hoạt động 3 cho 24 máy trạm, ghi nhận xét và tặng sao tuyên dương học sinh.
              </p>
            </div>
          </div>

          {/* FORM CHẤM ĐIỂM KHI CHỌN MÁY */}
          {gradingMachineId && (
            <div className="p-5 rounded-2xl bg-purple-50 border-2 border-purple-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-purple-900">
                  Chấm điểm: Máy {gradingMachineId < 10 ? `0${gradingMachineId}` : gradingMachineId}
                </span>
                <button
                  onClick={() => setGradingMachineId(null)}
                  className="text-xs text-slate-500 hover:text-slate-700 font-bold"
                >
                  Đóng form
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Điểm Thực Hành (0 - 10đ):</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="10"
                    value={tempMachineScore}
                    onChange={(e) => setTempMachineScore(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-purple-300 font-bold text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lời phê / Nhận xét của Thầy Trường:</label>
                  <input
                    type="text"
                    value={tempMachineComment}
                    onChange={(e) => setTempMachineComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-purple-300 text-xs bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const num = parseFloat(tempMachineScore) || 10;
                    updateMachineScore(gradingMachineId, 'lab', num);
                    setGradingMachineId(null);
                    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all"
                >
                  Lưu Kết Quả Chấm
                </button>
              </div>
            </div>
          )}

          {/* BẢNG DANH SÁCH MÁY THỰC HÀNH */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center">Vị trí</th>
                  <th className="py-3 px-4">Học sinh tại máy</th>
                  <th className="py-3 px-3 text-center">Tệp nộp Drive</th>
                  <th className="py-3 px-3 text-center">Điểm HĐ3</th>
                  <th className="py-3 px-3 text-center">Sao thưởng</th>
                  <th className="py-3 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {controlState.machines.map((m) => (
                  <tr key={m.machineId} className="hover:bg-slate-50">
                    <td className="py-3 px-3 text-center font-bold text-blue-700">{m.machineName}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {m.student1Name} {m.student2Name ? `& ${m.student2Name}` : ''}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-500 font-mono text-[11px]">
                      {m.practicalFileName || 'Đang thực hành...'}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-purple-700">
                      {m.scoreH3 !== undefined ? `${m.scoreH3}/10đ` : '—'}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-amber-500">
                      ⭐ {m.starsEarned}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAwardStar(m.machineId)}
                          className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-200"
                        >
                          +1 ⭐
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setGradingMachineId(m.machineId);
                            setTempMachineScore(String(m.scoreH3 || 9.5));
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px]"
                        >
                          Chấm điểm
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PHÂN HỆ 3: LƯỚI THEO DÕI 24 MÁY */}
      {activeSubFeature === 'grid' && (
        <div className="space-y-4">
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
      )}

      {/* PHÂN HỆ 4: BẢNG XẾP HẠNG LỚP */}
      {activeSubFeature === 'ranking' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Bảng Xếp Hạng Thi Đua Tiết Học · {currentClass.name}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Xếp hạng thi đua theo tổng kết 3 hoạt động trực tiếp (HĐ1: 30%, HĐ2: 30%, HĐ3: 40%) và sao thưởng.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCelebrateTopMachines}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs shadow-xs hover:from-amber-600 hover:to-amber-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-200" />
              <span>🎆 Vinh Danh Top 3 Nhóm</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 text-center">Hạng</th>
                  <th className="py-3 px-3">Vị trí máy</th>
                  <th className="py-3 px-4">Học sinh ghép cặp</th>
                  <th className="py-3 px-3 text-center">HĐ1</th>
                  <th className="py-3 px-3 text-center">HĐ2</th>
                  <th className="py-3 px-3 text-center">HĐ3</th>
                  <th className="py-3 px-3 text-center">Tổng điểm</th>
                  <th className="py-3 px-3 text-center">Sao ⭐</th>
                  <th className="py-3 px-3 text-center">Danh hiệu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {[...controlState.machines]
                  .sort((a, b) => (b.totalScore ?? 0) - (a.totalScore ?? 0))
                  .map((m, idx) => (
                    <tr key={m.machineId} className="hover:bg-slate-50">
                      <td className="py-3 px-3 text-center font-bold">
                        {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : idx + 1}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-blue-700">{m.machineName}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {m.student1Name} {m.student2Name ? `& ${m.student2Name}` : ''}
                      </td>
                      <td className="py-3 px-3 text-center text-blue-700">{m.scoreH1 || 9}</td>
                      <td className="py-3 px-3 text-center text-emerald-700">{m.scoreH2 || 8.5}</td>
                      <td className="py-3 px-3 text-center text-purple-700">{m.scoreH3 || 9.5}</td>
                      <td className="py-3 px-3 text-center font-extrabold text-amber-700 bg-amber-50">
                        {m.totalScore || 9.0}đ
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-amber-500">
                        ⭐ {m.starsEarned}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          idx < 3 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {idx < 3 ? 'Nhóm Tiêu Biểu' : 'Đạt Chuẩn'}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PHÂN HỆ 5: TỔNG HỢP KẾT QUẢ */}
      {activeSubFeature === 'summary' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
          {/* HEADER BẢNG ĐIỂM */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                  Bảng Điều Hành Tiết Dạy · {currentClass.name}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Tiết {activeLesson.period}: {activeLesson.title}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>Bảng Tổng Hợp Kết Quả 24 Máy Phòng Thực Hành</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Giáo viên phụ trách: <strong>Thầy Đỗ Mạnh Trường</strong> · Dữ liệu tự động cập nhật thời gian thực khi hết giờ ấn định.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleExportScoreboardExcel}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Xuất File Sổ Điểm Excel (.xls)</span>
              </button>
            </div>
          </div>

          {/* 4 THẺ THỐNG KÊ NHANH TÌNH HÌNH TIẾT HỌC */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sĩ số phòng máy</span>
              <div className="text-2xl font-black text-slate-900">24 / 24 <span className="text-xs font-medium text-slate-500">Máy</span></div>
              <p className="text-[11px] text-slate-500">48 học sinh ghép cặp đầy đủ</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Điểm Trung Bình Lớp</span>
              <div className="text-2xl font-black text-blue-900">{stats.avg} <span className="text-xs font-medium text-blue-600">/ 10đ</span></div>
              <p className="text-[11px] text-blue-700 font-medium">HĐ1 (30%) + HĐ2 (30%) + HĐ3 (40%)</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Phân loại học lực</span>
              <div className="text-2xl font-black text-emerald-900">
                {stats.countXuatSac + stats.countGioi} <span className="text-xs font-medium text-emerald-700">Khá/Giỏi</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">
                {stats.countXuatSac} Xuất sắc · {stats.countGioi} Giỏi · {stats.countKha} Khá
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1">
              <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Tệp Nộp Google Drive</span>
              <div className="text-2xl font-black text-purple-900">{stats.countSubmittedFile} / 24 <span className="text-xs font-medium text-purple-600">Đã nộp</span></div>
              <p className="text-[11px] text-purple-700 font-medium">Đồng bộ tự động về Google Drive của Thầy Trường</p>
            </div>
          </div>

          {/* BẢNG MATRIX 24 MÁY CHI TIẾT */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-3 text-center w-12">STT</th>
                  <th className="py-3.5 px-3 text-center w-24">Vị trí máy</th>
                  <th className="py-3.5 px-4">Bạn A (Kỹ thuật viên 🖱️)</th>
                  <th className="py-3.5 px-4">Bạn B (Thư ký ✍️)</th>
                  <th className="py-3.5 px-3 text-center">HĐ1: Khám phá</th>
                  <th className="py-3.5 px-3 text-center">HĐ2: Luyện tập</th>
                  <th className="py-3.5 px-3 text-center">HĐ3: Thực hành</th>
                  <th className="py-3.5 px-3 text-center">Tổng kết</th>
                  <th className="py-3.5 px-3 text-center">Xếp loại</th>
                  <th className="py-3.5 px-4">Tệp nộp Drive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredMachines.map((m, idx) => {
                  const h1 = m.scoreH1 ?? 9.0;
                  const h2 = m.scoreH2 ?? 8.5;
                  const h3 = m.scoreH3 ?? 9.5;
                  const tot = m.totalScore ?? Number((h1 * 0.3 + h2 * 0.3 + h3 * 0.4).toFixed(1));
                  let rank = 'Xuất sắc';
                  let rankColor = 'bg-amber-100 text-amber-800';
                  if (tot < 5.0) { rank = 'Cần cố gắng'; rankColor = 'bg-rose-100 text-rose-800'; }
                  else if (tot < 6.5) { rank = 'Trung bình'; rankColor = 'bg-slate-100 text-slate-800'; }
                  else if (tot < 8.0) { rank = 'Khá'; rankColor = 'bg-blue-100 text-blue-800'; }
                  else if (tot < 9.0) { rank = 'Giỏi'; rankColor = 'bg-emerald-100 text-emerald-800'; }

                  return (
                    <tr key={m.machineId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-700 bg-blue-50/40">{m.machineName}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{m.student1Name}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">{m.student2Name || '—'}</td>
                      <td className="py-3.5 px-3 text-center font-bold text-blue-700">{h1}</td>
                      <td className="py-3.5 px-3 text-center font-bold text-emerald-700">{h2}</td>
                      <td className="py-3.5 px-3 text-center font-bold text-purple-700">{h3}</td>
                      <td className="py-3.5 px-3 text-center font-extrabold text-amber-700 bg-amber-50/60">{tot}đ</td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${rankColor}`}>
                          {rank}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px] truncate max-w-[180px]">
                        {m.practicalFileName ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span className="truncate">{m.practicalFileName}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Chưa nộp</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
