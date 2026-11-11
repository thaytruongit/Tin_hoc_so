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
  Printer
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
  broadcastLesson
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

        {/* KHỐI 2: ĐIỀU PHỐI TIẾT DẠY & PHÁT LỆNH TOÀN PHÒNG */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Điều Phối Bài Dạy Toàn Phòng</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
              Khối {broadcastGrade} · Tiết {selectedPeriod}
            </span>
          </div>

          <div className="space-y-3">
            {/* Bộ chọn Khối của Thầy */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                1. Chọn Khối Giảng Dạy:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[6, 7, 8, 9].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setBroadcastGrade(g);
                      setSelectedPeriod(1);
                    }}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      broadcastGrade === g
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Khối {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Bộ chọn Tiết trong 29 tiết */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                2. Chọn Tiết Phân Phối Chương Trình:
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                className="w-full p-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
              >
                {gradeCurriculum.map((l) => (
                  <option key={l.period} value={l.period}>
                    Tiết {l.period}: {l.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-0.5">
              <div className="truncate">Chủ đề: <strong className="text-blue-700">{activeLesson.topic || 'Tin học cơ bản'}</strong></div>
              <div className="truncate">Thực hành: <strong className="text-slate-800">{activeLesson.practicalTask?.title || 'Bài tập thực hành tại lớp'}</strong></div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSyncLessonToLab}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Phát Lệnh Tiết Này Cho 24 Máy Trạm</span>
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

      {/* THANH CHUYỂN ĐỔI CHẾ ĐỘ XEM: 3D ISOMETRIC ⇄ BẢNG TỔNG HỢP 24 MÁY */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Monitor className="w-4 h-4 text-blue-600" />
            <span>Chế độ giám sát:</span>
          </span>
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'both' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👁️ Xem Song Song Cả Hai
            </button>
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === '3d' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎨 Phòng Học 3D Isometric
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📊 Bảng Điểm 24 Máy &amp; Xuất Excel
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleCelebrateTopMachines}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-200" />
            <span>🎆 Vinh Danh Top 3 Nhóm</span>
          </button>
          <button
            type="button"
            onClick={handleExportScoreboardExcel}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất Sổ Điểm Excel (.xls)</span>
          </button>
        </div>
      </div>

      {/* 2. KHÔNG GIAN PHÒNG HỌC 3D ISOMETRIC VỚI CÁCH ĐÁNH SỐ ZICZAC TỪ PHẢI QUA TRÁI */}
      {viewMode !== 'table' && (
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
      )}

      {/* 3. BẢNG TỔNG HỢP KẾT QUẢ THỜI GIAN THỰC 24 MÁY & QUẢN TRỊ SỔ ĐIỂM */}
      {viewMode !== '3d' && (
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
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
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
              <p className="text-[11px] text-purple-700 font-medium">Đồng bộ tự động về ổ H:\Giảng dạy</p>
            </div>
          </div>

          {/* THANH TÌM KIẾM & BỘ LỌC XẾP LOẠI */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm nhanh theo số máy (Máy 01...) hoặc tên học sinh..."
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={rankFilter}
                onChange={(e) => setRankFilter(e.target.value)}
                className="p-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
              >
                <option value="all">Tất cả xếp loại ({controlState.machines.length})</option>
                <option value="xuat_sac">Xuất sắc (9.0 - 10đ)</option>
                <option value="gioi">Giỏi (8.0 - 8.9đ)</option>
                <option value="kha">Khá (6.5 - 7.9đ)</option>
                <option value="can_ho_tro">Cần hỗ trợ (&lt; 6.5đ)</option>
                <option value="has_file">Đã nộp bài thực hành</option>
              </select>
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
                  <th className="py-3.5 px-4 text-center">Tệp Drive &amp; Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {filteredMachines.map((m, idx) => {
                  const h1 = m.scoreH1 ?? 9.0;
                  const h2 = m.scoreH2 ?? 8.5;
                  const h3 = m.scoreH3 ?? 9.5;
                  const tot = m.totalScore ?? Number((h1 * 0.3 + h2 * 0.3 + h3 * 0.4).toFixed(1));

                  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                  let rankText = 'Xuất sắc';
                  if (tot < 5.0) {
                    badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
                    rankText = 'Cần cố gắng';
                  } else if (tot < 6.5) {
                    badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
                    rankText = 'Trung bình';
                  } else if (tot < 8.0) {
                    badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
                    rankText = 'Khá';
                  } else if (tot < 9.0) {
                    badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-200';
                    rankText = 'Giỏi';
                  }

                  return (
                    <tr key={m.machineId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 text-center text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-black text-xs border border-slate-200 shadow-2xs">
                          {m.machineName}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {m.student1Name}
                        {m.starsEarned > 0 && (
                          <span className="ml-1.5 text-amber-500 font-normal inline-flex items-center gap-0.5">
                            {'⭐'.repeat(Math.min(m.starsEarned, 3))}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-semibold">{m.student2Name || '—'}</td>
                      
                      {/* ĐIỂM HĐ1 */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                          {h1}
                        </span>
                      </td>

                      {/* ĐIỂM HĐ2 */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                          {h2}
                        </span>
                      </td>

                      {/* ĐIỂM HĐ3 */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-100">
                          {h3}
                        </span>
                      </td>

                      {/* ĐIỂM TỔNG KẾT */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-xs">
                          {tot}
                        </span>
                      </td>

                      {/* XẾP LOẠI */}
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                          {rankText}
                        </span>
                      </td>

                      {/* THAO TÁC TRÊN TỪNG MÁY */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          <button
                            type="button"
                            title="Tặng sao khen thưởng máy này"
                            onClick={() => handleAwardStar(m.machineId)}
                            className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-600 transition-colors"
                          >
                            <Star className="w-4 h-4 fill-amber-400" />
                          </button>
                          <button
                            type="button"
                            title="Chiếu bài làm mẫu của máy này lên bảng chính"
                            onClick={() => handleSpotlightMachine(m)}
                            className="p-1.5 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                          {m.practicalFileName && (
                            <span
                              title={`Tệp thực hành: ${m.practicalFileName} (Đã lưu Drive H:\\My Drive\\Giảng dạy)`}
                              className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center gap-1 border border-slate-200"
                            >
                              <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
                              <span className="max-w-[100px] truncate">{m.practicalFileName}</span>
                            </span>
                          )}
                        </div>
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
