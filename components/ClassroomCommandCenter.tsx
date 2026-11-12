'use client';

import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
  CheckSquare,
  Camera,
  RotateCw,
  ZoomIn,
  ZoomOut,
  PlusCircle,
  Calendar,
  MessageSquare,
  CheckCheck,
  Upload
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClassItem, Student, HomeworkSubmission } from '@/lib/types';
import { MOCK_CLASSES, MOCK_STUDENTS, MOCK_HOMEWORK_SUBMISSIONS } from '@/lib/mock-data';
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
  updateMachineScore,
  selectPeriodForClassroom
} from '@/lib/classroom-control';
import Virtual3DClassroom from './Virtual3DClassroom';

interface ClassroomCommandCenterProps {
  currentClass: ClassItem;
  classStudents: Student[];
  initialSubFeature?: 'control' | 'grading' | 'homework' | 'grid' | 'ranking' | 'summary';
  onSelectClass?: (classId: string) => void;
}

export default function ClassroomCommandCenter({
  currentClass,
  classStudents,
  initialSubFeature,
  onSelectClass,
}: ClassroomCommandCenterProps) {
  const [controlState, setControlState] = useState<ClassroomControlState>(getClassroomState());
  const [broadcastGrade, setBroadcastGrade] = useState<number>(controlState.activeGrade || currentClass.grade || 7);
  const [customBroadcast, setCustomBroadcast] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<number>(controlState.activePeriod || 1);
  const [inspectingMachine, setInspectingMachine] = useState<LabMachineState | null>(null);

  // POPUP CHỌN TIẾT HỌC TRƯỚC KHI BẮT ĐẦU DẠY TRỰC TIẾP (BẬT POPUP LUÔN KHI VÀO / ĐĂNG NHẬP)
  const [showPeriodModal, setShowPeriodModal] = useState(true);
  const [periodSearch, setPeriodSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  // 6 Phân hệ của Chức năng Lớp học số
  const [activeSubFeature, setActiveSubFeature] = useState<'control' | 'grading' | 'homework' | 'grid' | 'ranking' | 'summary'>(initialSubFeature || 'control');

  useEffect(() => {
    if (initialSubFeature) {
      setActiveSubFeature(initialSubFeature);
    }
  }, [initialSubFeature]);

  // STATE BÀI TẬP VỀ NHÀ (ẤN ĐỊNH THEO TIẾT HỌC HIỆN TẠI)
  const [hwList, setHwList] = useState<HomeworkSubmission[]>([]);
  const [hwFilter, setHwFilter] = useState<'all' | 'submitted' | 'pending' | 'graded' | 'not_submitted'>('all');
  const [hwSearch, setHwSearch] = useState<string>('');
  const [selectedHwSub, setSelectedHwSub] = useState<HomeworkSubmission | null>(null);
  const [hwImageZoom, setHwImageZoom] = useState<number>(1);
  const [hwImageRotation, setHwImageRotation] = useState<number>(0);
  const [hwGradingType, setHwGradingType] = useState<'tt22' | 'score'>('tt22');
  const [hwTt22Status, setHwTt22Status] = useState<'Đạt' | 'Chưa đạt'>('Đạt');
  const [hwScoreValue, setHwScoreValue] = useState<string>('10');
  const [hwTeacherFeedback, setHwTeacherFeedback] = useState<string>('Vở ghi chép sạch đẹp, giải bài tập chính xác!');
  const [hwNotification, setHwNotification] = useState<string>('');

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
    setMounted(true);
    const unsub = subscribeToClassroomState((newState) => {
      setControlState(newState);
      if (newState.activeGrade) setBroadcastGrade(newState.activeGrade);
      if (newState.activePeriod) setSelectedPeriod(newState.activePeriod);
    });
    return () => unsub();
  }, []);

  // Lấy dữ liệu 29 tiết học của khối đang chọn
  const gradeCurriculum = useMemo(() => {
    const g = currentClass?.grade || broadcastGrade || 6;
    return CURRICULUM_DATA[g] || CURRICULUM_DATA[6] || [];
  }, [currentClass?.grade, broadcastGrade]);

  // Tiết học hiện tại đã cố định
  const activeLesson = useMemo(() => {
    const pNum = controlState.activePeriod || selectedPeriod || 1;
    return gradeCurriculum.find((l) => l.period === pNum) || gradeCurriculum[0];
  }, [gradeCurriculum, controlState.activePeriod, selectedPeriod]);

  // Phân biệt: Tiết này có bài tập thực hành trên máy hay là bài lý thuyết thuần túy
  const isPracticalLesson = useMemo(() => {
    return Boolean(activeLesson?.practicalTask);
  }, [activeLesson]);

  // TỰ ĐỘNG CHỌN TIẾT HỌC MẶC ĐỊNH VÀ NẠP TOÀN BỘ DỮ LIỆU ĐỒNG BỘ KHI GIÁO VIÊN ĐĂNG NHẬP / MỞ TRANG
  useEffect(() => {
    if (!currentClass?.id) return;
    const g = currentClass.grade || 6;
    setBroadcastGrade(g);

    // Lấy tiết học đã lưu theo lớp, nếu chưa có thì tự động chọn Tiết 1
    const key = `truong_fixed_period_${currentClass.id}`;
    let pNum = 1;
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(key);
      if (saved && Number(saved)) {
        pNum = Number(saved);
      }
    }

    const curr = CURRICULUM_DATA[g] || CURRICULUM_DATA[6] || [];
    const lesson = curr.find((l) => l.period === pNum) || curr[0];
    const isPrac = Boolean(lesson?.practicalTask);

    setSelectedPeriod(pNum);
    selectPeriodForClassroom(pNum, lesson?.title, g, isPrac, currentClass.id, currentClass.name);

    // Khi giáo viên đăng nhập / mở lớp học số: tự động bật popup chọn tiết học luôn
    setShowPeriodModal(true);
  }, [currentClass?.id, currentClass?.grade, currentClass?.name]);

  // Chọn và cố định tiết học giảng dạy khi Thầy chọn từ popup
  const handleSelectPeriod = (periodNum: number, title: string) => {
    setSelectedPeriod(periodNum);
    const curr = gradeCurriculum;
    const lesson = curr.find((l) => l.period === periodNum) || curr[0];
    const isPrac = Boolean(lesson?.practicalTask);

    selectPeriodForClassroom(periodNum, title, currentClass.grade, isPrac, currentClass.id, currentClass.name);
    if (typeof window !== 'undefined' && currentClass?.id) {
      sessionStorage.setItem(`truong_fixed_period_${currentClass.id}`, String(periodNum));
    }
    setShowPeriodModal(false);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  // State và hàm mở Modal Chấm Bài Thực Hành Trực Tiếp Online
  const [onlineGradingMachine, setOnlineGradingMachine] = useState<LabMachineState | null>(null);
  const [onlineScoreH3, setOnlineScoreH3] = useState<number>(9.5);
  const [onlineComment, setOnlineComment] = useState<string>('Thao tác chuẩn xác, bảng tính đẹp!');
  const [rubricScores, setRubricScores] = useState<{ c1: number; c2: number; c3: number }>({ c1: 3.0, c2: 3.5, c3: 3.0 });

  const handleOpenOnlineGrading = (m: LabMachineState) => {
    setOnlineGradingMachine(m);
    const score = m.scoreH3 ?? 9.5;
    setOnlineScoreH3(score);
    setOnlineComment(m.comment || 'Thao tác chuẩn xác, bảng tính đẹp và đúng công thức!');
    const c1 = Number((score * 0.3).toFixed(1));
    const c2 = Number((score * 0.4).toFixed(1));
    const c3 = Number(Math.max(0, score - c1 - c2).toFixed(1));
    setRubricScores({ c1: Math.min(3.0, c1), c2: Math.min(4.0, c2), c3: Math.min(3.0, c3) });
  };

  const handleSaveOnlineGrade = () => {
    if (!onlineGradingMachine) return;
    const finalScore = onlineScoreH3;
    updateMachineScore(onlineGradingMachine.machineId, 'lab', finalScore);
    updateClassroomState((prev) => ({
      ...prev,
      machines: prev.machines.map((m) =>
        m.machineId === onlineGradingMachine.machineId
          ? {
              ...m,
              scoreH3: finalScore,
              comment: onlineComment,
              starsEarned: m.starsEarned + 1,
              totalScore: Number((((m.scoreH1 ?? 8.5) * 0.3) + ((m.scoreH2 ?? 8.0) * 0.3) + (finalScore * 0.4)).toFixed(1)),
            }
          : m
      ),
    }));
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setOnlineGradingMachine(null);
  };

  // ĐỒNG BỘ VÀ ẤN ĐỊNH BÀI TẬP VỀ NHÀ THEO TIẾT ĐANG CHỌN CHO LỚP
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('truong_homework_submissions');
      let allSaved: HomeworkSubmission[] = [];
      if (saved) {
        allSaved = JSON.parse(saved);
      }

      const targetHwId = `hw-p${activeLesson.period}-g${currentClass.grade}`;
      const filtered = allSaved.filter(
        (s) =>
          (s.homeworkId === targetHwId || s.homeworkTitle?.includes(`Tiết ${activeLesson.period}`)) &&
          (s.classId === currentClass.id || s.className === currentClass.name)
      );

      if (filtered.length > 0) {
        setHwList(filtered);
      } else {
        const sampleNotebooks = [
          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1584697964190-705a8b79f8c6?auto=format&fit=crop&w=900&q=80',
        ];
        const studentPool = classStudents.length > 0 ? classStudents : MOCK_STUDENTS.filter(s => s.classId === currentClass.id);
        const seeded: HomeworkSubmission[] = (studentPool.length > 0 ? studentPool : studentPool.slice(0, 16)).map((st, idx) => {
          const isGraded = idx < 6;
          const isImg = !activeLesson.practicalTask || idx % 2 !== 0;
          return {
            id: `hwsub-${currentClass.id}-p${activeLesson.period}-${st.studentCode}`,
            homeworkId: targetHwId,
            homeworkTitle: activeLesson.homework?.title || `BTVN Tiết ${activeLesson.period}: ${activeLesson.title}`,
            studentCode: st.studentCode,
            studentName: st.fullName,
            classId: currentClass.id,
            className: currentClass.name,
            fileType: isImg ? 'image' : 'xlsx',
            fileName: isImg
              ? `${currentClass.name}_${st.studentCode}_VoBaiTap_Tiet${activeLesson.period}.jpg`
              : `${currentClass.name}_${st.studentCode}_ThucHanh_Tiet${activeLesson.period}.xlsx`,
            fileSize: isImg ? `${(1.2 + (idx % 4) * 0.3).toFixed(1)} MB` : `${42 + idx * 6} KB`,
            fileDataUrl: isImg ? sampleNotebooks[idx % sampleNotebooks.length] : undefined,
            note:
              idx % 3 === 0
                ? 'Em đã hoàn thành bài tập SGK và vẽ sơ đồ tư duy vào vở ạ.'
                : idx % 3 === 1
                ? 'Thưa Thầy, em nộp bài tập củng cố và tóm tắt kiến thức bài học.'
                : 'Em đã nộp bài tập về nhà đúng hạn theo yêu cầu của Thầy.',
            submittedAt: `Hôm qua lúc ${18 + (idx % 4)}:${(15 + idx * 3) % 60 < 10 ? '0' : ''}${(15 + idx * 3) % 60}`,
            grade: isGraded ? (idx === 0 ? 10 : idx === 1 ? 9.5 : idx === 2 ? 10 : 9) : undefined,
            feedback: isGraded
              ? idx === 0
                ? 'Vở ghi bài sạch đẹp, giải bài tập chính xác 100%!'
                : idx === 1
                ? 'Sơ đồ tư duy trực quan, trình bày khoa học, hoàn thành xuất sắc!'
                : 'Bài làm rất tốt, nắm vững kiến thức trọng tâm!'
              : undefined,
            status: isGraded ? ('graded' as const) : ('submitted' as const),
          };
        });

        setHwList(seeded);
        const combined = [...allSaved, ...seeded];
        localStorage.setItem('truong_homework_submissions', JSON.stringify(combined));
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeLesson.period, currentClass.id, currentClass.grade, currentClass.name, classStudents]);

  const handleOpenHwGrading = (sub: HomeworkSubmission) => {
    setSelectedHwSub(sub);
    setHwImageZoom(1);
    setHwImageRotation(0);
    if (sub.grade) {
      setHwScoreValue(String(sub.grade));
      setHwTt22Status(sub.grade >= 7 ? 'Đạt' : 'Chưa đạt');
    } else {
      setHwScoreValue('10');
      setHwTt22Status('Đạt');
    }
    setHwTeacherFeedback(sub.feedback || 'Vở ghi chép sạch đẹp, giải bài tập chính xác và đúng yêu cầu!');
  };

  const handleSaveHwGrade = () => {
    if (!selectedHwSub) return;
    const numScore = hwGradingType === 'tt22' ? (hwTt22Status === 'Đạt' ? 10 : 5) : parseFloat(hwScoreValue) || 10;
    const finalFeedback =
      hwTeacherFeedback.trim() || (hwTt22Status === 'Đạt' ? 'Bài làm đạt yêu cầu!' : 'Cần bổ sung hoàn thiện bài!');

    const updatedSub: HomeworkSubmission = {
      ...selectedHwSub,
      grade: numScore,
      feedback: finalFeedback,
      status: 'graded',
    };

    const updatedList = hwList.map((s) => (s.id === updatedSub.id ? updatedSub : s));
    setHwList(updatedList);

    try {
      const saved = localStorage.getItem('truong_homework_submissions');
      const existing: HomeworkSubmission[] = saved ? JSON.parse(saved) : [];
      const newStorage = [updatedSub, ...existing.filter((s) => s.id !== updatedSub.id)];
      localStorage.setItem('truong_homework_submissions', JSON.stringify(newStorage));
    } catch (e) {
      console.error(e);
    }

    setSelectedHwSub(null);
    setHwNotification(`✅ Đã lưu đánh giá Thông tư 22 cho học sinh ${selectedHwSub.studentName} thành công!`);
    setTimeout(() => setHwNotification(''), 3500);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

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

  // Bật/tắt khóa thủ công từng hoạt động (kèm kiểm tra tiết thực hành)
  const handleToggleActivity = (act: ClassroomActivityKey) => {
    if (act === 'lab' && !isPracticalLesson) {
      alert('Tiết học hiện tại là bài lý thuyết thuần túy. Hoạt động thực hành trên máy không áp dụng cho tiết này!');
      return;
    }
    const nextState = toggleActivityLock(act);
    setControlState(nextState);
  };

  // Mở hoặc Đóng tất cả hoạt động theo lệnh của Thầy (phân biệt tiết thực hành)
  const handleSetAllActivities = (isOpen: boolean) => {
    const nextState = updateClassroomState((prev) => ({
      ...prev,
      activityLocks: {
        discovery: isOpen,
        practice: isOpen,
        lab: isPracticalLesson ? isOpen : false,
      },
      broadcastMessage: isOpen
        ? isPracticalLesson
          ? `▶️ Thầy Đỗ Mạnh Trường: ĐÃ MỞ TẤT CẢ 3 HOẠT ĐỘNG cho cả lớp làm bài!`
          : `▶️ Thầy Đỗ Mạnh Trường: ĐÃ MỞ HĐ1 & HĐ2 cho cả lớp làm bài! (Tiết lý thuyết)`
        : `⏸️ Thầy Đỗ Mạnh Trường: ĐÃ TẠM ĐÓNG CÁC HOẠT ĐỘNG.`,
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
      {/* 1. THANH CỐ ĐỊNH TIẾT HỌC GIẢNG DẠY TRỰC TIẾP (ĐỒNG BỘ 24 MÁY TRẠM)   */}
      {/* ==================================================================== */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-xs shrink-0 ${
            isPracticalLesson ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
          }`}>
            {isPracticalLesson ? <Laptop className="w-6 h-6 text-white" /> : <BookOpen className="w-6 h-6 text-white" />}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 font-extrabold text-xs border border-blue-200">
                {currentClass.name} · Khối {currentClass.grade}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Tiết dạy trực tiếp: Tiết {activeLesson.period}
              </span>
              {isPracticalLesson ? (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-xs border border-purple-300 flex items-center gap-1">
                  💻 Tiết Thực Hành Phòng Máy
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 flex items-center gap-1">
                  📖 Tiết Lý Thuyết (Không có HĐ Thực hành)
                </span>
              )}
              <span className="text-[11px] text-slate-500 font-medium">
                24 máy trạm đồng bộ
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {activeLesson.title}
            </h2>
            <div className="text-xs text-slate-500 font-medium">
              Chủ đề: <span className="text-blue-700 font-bold">{activeLesson.topic || 'Tin học THCS'}</span>
              {activeLesson.practicalTask && (
                <span className="ml-2 text-purple-700 font-bold">· Thực hành: {activeLesson.practicalTask.title}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setShowPeriodModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-black text-xs border border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Đổi tiết học phân phối chương trình để dạy"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>📖 Đổi Tiết Học ▾</span>
          </button>
          <button
            type="button"
            onClick={() => handleSetAllActivities(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            title={isPracticalLesson ? 'Mở tất cả 3 hoạt động cho cả lớp làm bài' : 'Mở HĐ1 và HĐ2 (Tiết lý thuyết)'}
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>{isPracticalLesson ? 'Mở Cả 3 HĐ' : 'Mở HĐ1 & HĐ2'}</span>
          </button>
          <button
            type="button"
            onClick={() => handleSetAllActivities(false)}
            className="px-4 py-2.5 rounded-2xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Đóng / Khóa tất cả hoạt động để học sinh tập trung nghe giảng"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Khóa HĐ</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. MENU 6 PHÂN HỆ CỐT LÕI CỦA LỚP HỌC SỐ                             */}
      {/* ==================================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-3">
        {[
          { id: 'control', name: '1. Điều khiển 3 HĐ trực tiếp', icon: Radio },
          { id: 'grading', name: `2. Chấm bài thực hành (Tiết ${activeLesson.period})`, icon: CheckSquare },
          { id: 'homework', name: `3. Bài tập về nhà (Tiết ${activeLesson.period})`, icon: BookOpen },
          { id: 'grid', name: '4. Lưới theo dõi 24 máy', icon: Monitor },
          { id: 'ranking', name: '5. Bảng xếp hạng lớp', icon: Trophy },
          { id: 'summary', name: '6. Tổng hợp kết quả', icon: FileSpreadsheet },
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

      {/* PHÂN HỆ 1: ĐIỀU KHIỂN THỦ CÔNG MỞ/ĐÓNG 3 HOẠT ĐỘNG TRỰC TIẾP */}
      {activeSubFeature === 'control' && (
        <div className="space-y-4">
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
                  <p className="text-xs text-indigo-700 font-bold mt-0.5 truncate" title={activeLesson.worksheet?.title || 'Khám phá cặp đôi'}>
                    {activeLesson.worksheet?.title || 'Khám phá cặp đôi · Điền khuyết kiến thức'}
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
                    Bộ 7 câu hỏi củng cố Tiết {activeLesson.period} · Chấm tức thì
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

            {/* HOẠT ĐỘNG 3: THỰC HÀNH TRÊN MÁY (CHỈ MỞ CHO TIẾT THỰC HÀNH) */}
            <div className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 shadow-xs ${
              !isPracticalLesson
                ? 'bg-slate-50/80 border-slate-200 opacity-70'
                : controlState.activityLocks.lab
                ? 'bg-emerald-50/40 border-emerald-500/80 ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-2xl text-white flex items-center justify-center font-bold shadow-xs ${
                    !isPracticalLesson ? 'bg-slate-400' : 'bg-purple-600'
                  }`}>
                    <Laptop className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 ${
                    !isPracticalLesson
                      ? 'bg-slate-200 text-slate-700 border border-slate-300'
                      : controlState.activityLocks.lab
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {!isPracticalLesson ? (
                      <span>Không áp dụng</span>
                    ) : controlState.activityLocks.lab ? (
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
                  <p className="text-xs font-bold mt-0.5 truncate" title={isPracticalLesson ? activeLesson.practicalTask?.title : 'Tiết lý thuyết thuần túy'}>
                    {!isPracticalLesson ? (
                      <span className="text-amber-800 font-semibold">Tiết lý thuyết · Không có thực hành</span>
                    ) : (
                      <span className="text-purple-700">{activeLesson.practicalTask?.title || 'Thực hành sản phẩm môn Tin học'}</span>
                    )}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {!isPracticalLesson
                      ? 'Tiết học này là bài lý thuyết thuần túy. Học sinh tập trung làm Phiếu khám phá (HĐ1) và Trắc nghiệm (HĐ2). Hoạt động thực hành chỉ mở ở các tiết thực hành.'
                      : 'Thời gian gợi ý: 15 phút. Thao tác trên phần mềm máy tính, nộp tệp bài làm trực tiếp lên hệ thống.'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  disabled={!isPracticalLesson}
                  onClick={() => handleToggleActivity('lab')}
                  className={`w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-xs ${
                    !isPracticalLesson
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : controlState.activityLocks.lab
                      ? 'bg-rose-600 hover:bg-rose-700 text-white hover:shadow cursor-pointer'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow cursor-pointer'
                  }`}
                >
                  {!isPracticalLesson ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>🔒 Tiết Lý Thuyết Không Có HĐ Thực Hành</span>
                    </>
                  ) : controlState.activityLocks.lab ? (
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
                  {!isPracticalLesson
                    ? 'Chỉ mở ở các tiết có bài tập thực hành'
                    : controlState.activityLocks.lab
                    ? 'Học sinh đang được làm bài này'
                    : 'Học sinh bị khóa không vào được'}
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
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-purple-600" />
                  <span>Chấm Bài Thực Hành: Tiết {activeLesson.period} · {currentClass.name}</span>
                </h3>
                {isPracticalLesson ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold border border-purple-300">
                    💻 Tiết Thực Hành Phòng Máy
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                    📖 Tiết Lý Thuyết
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isPracticalLesson
                  ? `Đề bài: ${activeLesson.practicalTask?.title || activeLesson.title} · Thầy nhấn "Mở Online Để Chấm" để xem trực tiếp tệp học sinh nộp và chấm điểm theo Rubric.`
                  : `Tiết ${activeLesson.period} là bài học lý thuyết thuần túy, không có hoạt động thực hành phòng máy.`}
              </p>
            </div>
          </div>

          {/* NẾU LÀ TIẾT LÝ THUYẾT: THÔNG BÁO RÕ RÀNG ĐÃ CỐ ĐỊNH ẤN ĐỊNH */}
          {!isPracticalLesson && (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
              <div className="flex items-center gap-2 font-black text-sm">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>Tiết {activeLesson.period}: {activeLesson.title} là TIẾT LÝ THUYẾT ĐÃ ẤN ĐỊNH</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Tiết học này không có bài tập thực hành trên máy. Học sinh tập trung hoàn thành Hoạt động 1 (Khám phá kiến thức) và Hoạt động 2 (Luyện tập trắc nghiệm).
                Chức năng chấm bài thực hành phòng máy chỉ áp dụng cho các Tiết Thực Hành. Nếu Thầy muốn đổi sang tiết thực hành, vui lòng nhấn nút <strong>"Đổi Tiết Học"</strong> ở thanh điều khiển trên cùng.
              </p>
            </div>
          )}

          {/* FORM CHẤM ĐIỂM KHI CHỌN MÁY */}
          {gradingMachineId && (
            <div className="p-5 rounded-2xl bg-purple-50 border-2 border-purple-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-purple-900">
                  Chấm điểm: Máy {gradingMachineId < 10 ? `0${gradingMachineId}` : gradingMachineId}
                </span>
                <button
                  onClick={() => setGradingMachineId(null)}
                  className="text-xs text-slate-500 hover:text-slate-700 font-bold cursor-pointer"
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
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  Lưu Kết Quả Chấm
                </button>
              </div>
            </div>
          )}

          {/* BẢNG DANH SÁCH MÁY THỰC HÀNH KÈM NÚT MỞ ONLINE ĐỂ CHẤM */}
          {isPracticalLesson && (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-3 text-center w-16">Vị trí</th>
                    <th className="py-3.5 px-4">Học sinh tại máy</th>
                    <th className="py-3.5 px-4 text-center">Tệp nộp bài Google Drive</th>
                    <th className="py-3.5 px-3 text-center">Điểm HĐ3</th>
                    <th className="py-3.5 px-3 text-center">Sao thưởng</th>
                    <th className="py-3.5 px-4 text-center">Chấm bài trực tiếp online</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {controlState.machines.map((m) => (
                    <tr key={m.machineId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3 text-center font-bold text-blue-700 font-mono bg-blue-50/30">{m.machineName}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        <div className="font-bold text-slate-900">{m.student1Name}</div>
                        {m.student2Name && <div className="text-[11px] text-slate-500 font-medium">{m.student2Name}</div>}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {m.practicalFileName ? (
                          <div className="flex flex-col items-center gap-1">
                            <span className="font-mono text-[11px] font-bold text-slate-800 flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              {m.practicalFileName}
                            </span>
                            <a
                              href={m.practicalFileUrl || 'https://drive.google.com'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10.5px] text-blue-600 hover:text-blue-800 underline font-semibold flex items-center gap-0.5"
                              title="Mở tệp này trực tiếp trên Google Drive / Sheets online"
                            >
                              <span>Mở link online</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">Đang thực hành...</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-purple-700 text-sm">
                        {m.scoreH3 !== undefined ? `${m.scoreH3}đ` : '—'}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-amber-500">
                        ⭐ {m.starsEarned}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenOnlineGrading(m)}
                            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:shadow"
                            title="Mở trực tiếp tệp bài làm online để xem và chấm điểm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Mở Online Để Chấm</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAwardStar(m.machineId)}
                            className="px-2.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 cursor-pointer"
                            title="Tặng sao tuyên dương"
                          >
                            +1 ⭐
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* PHÂN HỆ 3: BÀI TẬP VỀ NHÀ (ẤN ĐỊNH THEO TIẾT HỌC HIỆN TẠI) */}
      {activeSubFeature === 'homework' && (
        <div className="space-y-6">
          {/* BANNER THÔNG TIN BÀI TẬP VỀ NHÀ ĐÃ ẤN ĐỊNH */}
          <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white rounded-3xl border border-amber-200/90 p-6 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Bài Tập Về Nhà · Tiết {activeLesson.period}: {activeLesson.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1">
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Đã Ấn Định Giao Cho Lớp {currentClass.name}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 pl-10.5">
                  Nội dung bài tập về nhà được hệ thống tự động đồng bộ theo <strong>Tiết {activeLesson.period}</strong> thuộc Khối {currentClass.grade}. Thầy xem ảnh vở bài tập hoặc tệp sản phẩm và chấm theo <strong>Thông tư 22/2021/TT-BGDĐT</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPeriodModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Đổi sang tiết học khác để quản lý BTVN của tiết đó"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Đổi Tiết Khác</span>
                </button>
              </div>
            </div>

            {/* CARD NỘI DUNG CHI TIẾT BÀI TẬP VỀ NHÀ CỦA TIẾT NÀY */}
            <div className="bg-white rounded-2xl border border-amber-200 p-5 space-y-3 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
                <div className="font-bold text-sm text-amber-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>{activeLesson.homework?.title || `BTVN Tiết ${activeLesson.period}: ${activeLesson.title}`}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Hạn nộp: {activeLesson.homework?.dueInDays || 7} ngày sau buổi học</span>
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-medium bg-amber-50/40 p-3.5 rounded-xl border border-amber-100">
                {activeLesson.homework?.description || `Học sinh ôn tập nội dung bài học Tiết ${activeLesson.period}, trả lời câu hỏi củng cố vào vở ghi bài và chụp ảnh nộp lên hệ thống.`}
              </div>

              <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
                <span className="text-slate-500 font-semibold">Định dạng nộp bài chấp nhận:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 font-bold border border-purple-200 flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  <span>Ảnh chụp trang vở ghi (JPG, PNG)</span>
                </span>
                {activeLesson.practicalTask && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200 flex items-center gap-1">
                    <FileSpreadsheet className="w-3 h-3" />
                    <span>Tệp thực hành (.xlsx, .docx)</span>
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-lg bg-teal-50 text-teal-700 font-bold border border-teal-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Chuẩn ĐĐGtx Thông Tư 22</span>
                </span>
              </div>
            </div>
          </div>

          {/* THỐNG KÊ & BỘ LỌC BÀI NỘP */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <span>Danh Sách Học Sinh Nộp Bài · Lớp {currentClass.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    Tiết {activeLesson.period}
                  </span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Theo dõi tiến độ nộp bài, xem ảnh phóng to/xoay chiều trang vở và chấm điểm, ghi lời phê sư phạm.
                </p>
              </div>

              {/* BỘ LỌC VÀ TÌM KIẾM */}
              <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={hwSearch}
                    onChange={(e) => setHwSearch(e.target.value)}
                    placeholder="Tìm theo tên / mã HS..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'submitted', label: 'Đã nộp' },
                    { id: 'pending', label: 'Chờ chấm' },
                    { id: 'graded', label: 'Đã chấm' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setHwFilter(f.id as any)}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        hwFilter === f.id ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* THÔNG BÁO CHẤM ĐIỂM THÀNH CÔNG */}
            {hwNotification && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-slideDown">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{hwNotification}</span>
              </div>
            )}

            {/* BẢNG DANH SÁCH BÀI TẬP VỀ NHÀ */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[10.5px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-3 text-center w-12">STT</th>
                    <th className="py-3.5 px-4">Học Sinh</th>
                    <th className="py-3.5 px-3 text-center">Thời Gian Nộp</th>
                    <th className="py-3.5 px-4 text-center">Tệp / Ảnh Vở Nộp</th>
                    <th className="py-3.5 px-3 text-center">Đánh Giá TT22</th>
                    <th className="py-3.5 px-4">Lời Phê Của Thầy Trường</th>
                    <th className="py-3.5 px-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {hwList
                    .filter((sub) => {
                      if (hwFilter === 'submitted') return true;
                      if (hwFilter === 'pending') return sub.status === 'submitted' || !sub.grade;
                      if (hwFilter === 'graded') return sub.status === 'graded' && sub.grade !== undefined;
                      return true;
                    })
                    .filter((sub) => {
                      if (!hwSearch.trim()) return true;
                      const q = hwSearch.toLowerCase();
                      return sub.studentName.toLowerCase().includes(q) || sub.studentCode.toLowerCase().includes(q);
                    })
                    .map((sub, idx) => (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3 text-center font-mono text-slate-400 text-xs">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div className="text-sm">{sub.studentName}</div>
                          <div className="font-mono text-[11px] text-slate-400 font-normal">{sub.studentCode} · {sub.className}</div>
                        </td>
                        <td className="py-3.5 px-3 text-center text-slate-500 text-[11px] whitespace-nowrap">
                          {sub.submittedAt}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {sub.fileType === 'image' ? (
                            <button
                              type="button"
                              onClick={() => handleOpenHwGrading(sub)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                              title="Xem ảnh chụp vở ghi bài của học sinh phóng to"
                            >
                              <Camera className="w-3.5 h-3.5 text-purple-600" />
                              <span>Xem ảnh vở</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleOpenHwGrading(sub)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                              title="Mở tệp thực hành của học sinh"
                            >
                              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                              <span>{sub.fileName || 'Tệp thực hành'}</span>
                            </button>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {sub.status === 'graded' && sub.grade !== undefined ? (
                            <span className={`px-2.5 py-1 rounded-full font-black text-xs ${
                              sub.grade >= 7
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}>
                              {sub.feedback?.includes('Đạt') || sub.grade >= 7 ? `Đạt (${sub.grade}đ)` : `${sub.grade}đ`}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                              ⏳ Chờ chấm
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate text-xs">
                          {sub.feedback ? (
                            <span title={sub.feedback}>“{sub.feedback}”</span>
                          ) : (
                            <span className="text-slate-400 italic">Chưa nhận xét</span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleOpenHwGrading(sub)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs hover:shadow"
                          >
                            Chấm bài
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PHÂN HỆ 4: LƯỚI THEO DÕI 24 MÁY */}
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
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px] truncate max-w-[210px]">
                        {m.practicalFileName ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenOnlineGrading(m)}
                              className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer truncate"
                              title="Bấm để mở trực tiếp tệp online để xem và chấm điểm"
                            >
                              <Check className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{m.practicalFileName}</span>
                            </button>
                            <a
                              href={m.practicalFileUrl || 'https://drive.google.com'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 shrink-0"
                              title="Mở Google Drive"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">
                            {!isPracticalLesson ? 'Tiết lý thuyết' : 'Chưa nộp'}
                          </span>
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

      {/* ==================================================================== */}
      {/* MODAL CHỌN VÀ CỐ ĐỊNH TIẾT HỌC GIẢNG DẠY TRỰC TIẾP                 */}
      {/* ==================================================================== */}
      {mounted && showPeriodModal && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
                  <BookOpen className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white tracking-tight">
                    CHỌN TIẾT HỌC GIẢNG DẠY TRỰC TIẾP
                  </h3>
                  <p className="text-xs text-blue-100 font-medium mt-0.5">
                    {currentClass.name} (Khối {currentClass.grade}) · Cố định bài học và đồng bộ tới 24 máy trạm
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPeriodModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer font-bold"
                title="Đóng popup"
              >
                ✕
              </button>
            </div>

            {/* Thanh tìm kiếm tiết học */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/70">
              <div className="relative">
                <input
                  type="text"
                  value={periodSearch}
                  onChange={(e) => setPeriodSearch(e.target.value)}
                  placeholder="🔍 Tìm kiếm số tiết, tên bài học, chủ đề (ví dụ: Tiết 9, Bảng tính, Thực hành...)"
                  className="w-full pl-4 pr-10 py-2.5 rounded-2xl border border-slate-300 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-2xs"
                  autoFocus
                />
                {periodSearch && (
                  <button
                    type="button"
                    onClick={() => setPeriodSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
                <span>Chương trình GDPT 2018 · Tin học Khối {currentClass.grade}</span>
                <span className="font-bold text-blue-700">Tổng cộng {gradeCurriculum.length} tiết</span>
              </div>
            </div>

            {/* Danh sách 29 tiết học */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-100/80">
              {gradeCurriculum
                .filter((l) => {
                  if (!periodSearch.trim()) return true;
                  const q = periodSearch.toLowerCase();
                  return (
                    `tiết ${l.period}`.includes(q) ||
                    l.period.toString() === q.trim() ||
                    l.title.toLowerCase().includes(q) ||
                    (l.topic && l.topic.toLowerCase().includes(q))
                  );
                })
                .map((lesson) => {
                  const isCurrent = (activeLesson.period === lesson.period);
                  return (
                    <div
                      key={lesson.period}
                      onClick={() => handleSelectPeriod(lesson.period, lesson.title)}
                      className={`pt-2 first:pt-0 pb-2 flex items-center justify-between gap-3 p-3 rounded-2xl transition-all cursor-pointer border ${
                        isCurrent
                          ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-400/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-11 h-11 rounded-2xl shrink-0 flex flex-col items-center justify-center font-black ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          <span className="text-[9px] uppercase font-bold leading-none opacity-80">Tiết</span>
                          <span className="text-base leading-none mt-0.5">{lesson.period}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900 truncate">
                              {lesson.title}
                            </span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black shrink-0">
                                Đang chọn
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 truncate flex items-center gap-2">
                            <span className="text-indigo-600 font-semibold">{lesson.topic || 'Tin học THCS'}</span>
                            {lesson.practicalTask ? (
                              <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 text-[10px] flex items-center gap-1">
                                💻 Tiết thực hành
                              </span>
                            ) : (
                              <span className="text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 text-[10px] flex items-center gap-1">
                                📖 Tiết lý thuyết
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPeriod(lesson.period, lesson.title);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {isCurrent ? '✓ Đang dạy' : 'Chọn tiết này'}
                      </button>
                    </div>
                  );
                })}
            </div>

            {/* Footer Modal */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Nhấn vào bất kỳ tiết nào để bắt đầu giảng dạy trực tiếp.
              </span>
              <button
                type="button"
                onClick={() => setShowPeriodModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ==================================================================== */}
      {/* MODAL MỞ TRỰC TIẾP TỆP ONLINE ĐỂ CHẤM BÀI THỰC HÀNH                  */}
      {/* ==================================================================== */}
      {mounted && onlineGradingMachine && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-xs shrink-0 font-bold text-amber-300">
                  <Laptop className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/20 text-white font-extrabold text-[11px] uppercase">
                      {onlineGradingMachine.machineName}
                    </span>
                    <h3 className="font-black text-base text-white truncate">
                      {onlineGradingMachine.practicalFileName || `BTH_${currentClass.name}_${onlineGradingMachine.machineName}.xlsx`}
                    </h3>
                  </div>
                  <p className="text-xs text-purple-100 font-medium truncate mt-0.5">
                    Học sinh: <strong className="text-white">{onlineGradingMachine.student1Name}</strong> {onlineGradingMachine.student2Name ? `& ${onlineGradingMachine.student2Name}` : ''} · {currentClass.name} (Khối {currentClass.grade})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={onlineGradingMachine.practicalFileUrl || 'https://drive.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/20"
                  title="Mở trong Google Drive tab mới"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Google Drive Tab Mới</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOnlineGradingMachine(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm cursor-pointer transition-all"
                  title="Đóng modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body 2 Cột: Bên trái là Document Viewer Online, Bên phải là Bảng chấm điểm Rubric */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {/* CỘT TRÁI: ONLINE VIEWER (7 CỘT) */}
              <div className="lg:col-span-7 p-5 bg-slate-50 flex flex-col space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Xem Trực Tiếp Tệp Bài Làm Online (Google Sheets / Excel)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    ✓ Đã nộp thành công
                  </span>
                </div>

                {/* Thanh menu giả lập bảng tính online */}
                <div className="bg-white rounded-xl border border-slate-200 p-2 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium px-1 border-b border-slate-100 pb-1">
                    <span className="font-bold text-emerald-700">Tệp</span>
                    <span>Chỉnh sửa</span>
                    <span>Xem</span>
                    <span>Chèn</span>
                    <span>Định dạng</span>
                    <span>Dữ liệu</span>
                    <span className="text-slate-400">· Tự động lưu trên Drive</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1 text-xs font-mono">
                    <span className="font-bold text-blue-700 px-1">fx</span>
                    <span className="text-slate-600 truncate">=AVERAGE(D3:F3) * 0.4 + SUM(C3:D3) * 0.3</span>
                  </div>
                </div>

                {/* Bảng tính nội dung dữ liệu học sinh đã làm */}
                <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 text-[11px]">
                        <th className="py-2 px-2 text-center w-8 bg-slate-200/60"></th>
                        <th className="py-2 px-3 text-center border-l border-slate-200">A</th>
                        <th className="py-2 px-3 text-center border-l border-slate-200">B</th>
                        <th className="py-2 px-3 text-center border-l border-slate-200">C</th>
                        <th className="py-2 px-3 text-center border-l border-slate-200">D</th>
                        <th className="py-2 px-3 text-center border-l border-slate-200">E</th>
                        <th className="py-2 px-3 text-center border-l border-slate-200">F</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans text-[11.5px]">
                      <tr className="bg-emerald-50/60 font-bold text-emerald-950">
                        <td className="py-2 px-2 text-center bg-slate-100 text-slate-400 font-mono text-[10px]">1</td>
                        <td className="py-2 px-3 border-l border-slate-200">STT</td>
                        <td className="py-2 px-3 border-l border-slate-200">Họ và tên thành viên</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center">Nhiệm vụ 1</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center">Nhiệm vụ 2</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center">Nhiệm vụ 3</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center text-blue-700">Tổng điểm</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 text-center bg-slate-100 text-slate-400 font-mono text-[10px]">2</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center font-mono">01</td>
                        <td className="py-2 px-3 border-l border-slate-200 font-bold text-slate-900">{onlineGradingMachine.student1Name}</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center font-bold text-emerald-700">9.0</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center font-bold text-emerald-700">9.5</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center font-bold text-emerald-700">10.0</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center font-black text-blue-700 bg-blue-50/30">9.5</td>
                      </tr>
                      {onlineGradingMachine.student2Name && (
                        <tr>
                          <td className="py-2 px-2 text-center bg-slate-100 text-slate-400 font-mono text-[10px]">3</td>
                          <td className="py-2 px-3 border-l border-slate-200 text-center font-mono">02</td>
                          <td className="py-2 px-3 border-l border-slate-200 font-bold text-slate-900">{onlineGradingMachine.student2Name}</td>
                          <td className="py-2 px-3 border-l border-slate-200 text-center font-bold text-emerald-700">8.5</td>
                          <td className="py-2 px-3 border-l border-slate-200 text-center font-bold text-emerald-700">9.0</td>
                          <td className="py-2 px-3 border-l border-slate-200 text-center font-bold text-emerald-700">9.5</td>
                          <td className="py-2 px-3 border-l border-slate-200 text-center font-black text-blue-700 bg-blue-50/30">9.0</td>
                        </tr>
                      )}
                      <tr className="bg-slate-50">
                        <td className="py-2 px-2 text-center bg-slate-100 text-slate-400 font-mono text-[10px]">4</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center font-mono">03</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-slate-700">Kết quả sản phẩm nhóm</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center font-medium" colSpan={4}>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">Đã hoàn thành đúng yêu cầu bài học</span>
                        </td>
                      </tr>
                      <tr className="bg-amber-50/50 font-bold">
                        <td className="py-2 px-2 text-center bg-slate-100 text-slate-400 font-mono text-[10px]">5</td>
                        <td className="py-2 px-3 border-l border-slate-200" colSpan={2}>ĐÁNH GIÁ CHUNG CẢ MÁY:</td>
                        <td className="py-2 px-3 border-l border-slate-200 text-center text-amber-800" colSpan={4}>
                          Thao tác mượt mà · Đúng công thức · Đã lưu Drive
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Đường dẫn tệp online:</span>
                    <span className="font-mono text-blue-700 truncate max-w-[280px]">
                      {onlineGradingMachine.practicalFileUrl || 'https://drive.google.com/...'}
                    </span>
                  </div>
                  <div className="text-slate-400">
                    Tệp đồng bộ qua Google Apps Script Web App THCS Mão Điền.
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI: BẢNG CHẤM ĐIỂM & RUBRIC (5 CỘT) */}
              <div className="lg:col-span-5 p-5 bg-white flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[11px] font-black uppercase text-purple-700 tracking-wider">
                      Rubric Chấm Điểm Sư Phạm (Thang 10đ)
                    </span>
                    <h4 className="font-black text-slate-900 text-sm mt-1">
                      {activeLesson.practicalTask?.title || 'Bài tập thực hành phòng máy'}
                    </h4>
                  </div>

                  {/* 3 TIÊU CHÍ RUBRIC */}
                  <div className="space-y-3">
                    {/* Tiêu chí 1 */}
                    <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">1. Kỹ năng thao tác & Nhập liệu (Max 3.0đ):</span>
                        <span className="font-black text-purple-800">{rubricScores.c1}đ</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[2.0, 2.5, 3.0].map((score) => (
                          <button
                            key={score}
                            type="button"
                            onClick={() => {
                              const newC1 = score;
                              setRubricScores(r => ({ ...r, c1: newC1 }));
                              setOnlineScoreH3(Number((newC1 + rubricScores.c2 + rubricScores.c3).toFixed(1)));
                            }}
                            className={`flex-1 py-1 rounded-lg text-xs font-bold border transition-all ${
                              rubricScores.c1 === score
                                ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-100/50'
                            }`}
                          >
                            {score}đ
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tiêu chí 2 */}
                    <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">2. Công thức & Yêu cầu kỹ thuật (Max 4.0đ):</span>
                        <span className="font-black text-indigo-800">{rubricScores.c2}đ</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[3.0, 3.5, 4.0].map((score) => (
                          <button
                            key={score}
                            type="button"
                            onClick={() => {
                              const newC2 = score;
                              setRubricScores(r => ({ ...r, c2: newC2 }));
                              setOnlineScoreH3(Number((rubricScores.c1 + newC2 + rubricScores.c3).toFixed(1)));
                            }}
                            className={`flex-1 py-1 rounded-lg text-xs font-bold border transition-all ${
                              rubricScores.c2 === score
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-100/50'
                            }`}
                          >
                            {score}đ
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tiêu chí 3 */}
                    <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">3. Trình bày & Lưu tệp đúng tên (Max 3.0đ):</span>
                        <span className="font-black text-blue-800">{rubricScores.c3}đ</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[2.0, 2.5, 3.0].map((score) => (
                          <button
                            key={score}
                            type="button"
                            onClick={() => {
                              const newC3 = score;
                              setRubricScores(r => ({ ...r, c3: newC3 }));
                              setOnlineScoreH3(Number((rubricScores.c1 + rubricScores.c2 + newC3).toFixed(1)));
                            }}
                            className={`flex-1 py-1 rounded-lg text-xs font-bold border transition-all ${
                              rubricScores.c3 === score
                                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-100/50'
                            }`}
                          >
                            {score}đ
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ĐIỂM TỔNG KẾT & LỜI PHÊ */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-300">
                      <div>
                        <span className="text-xs font-black text-amber-900 block">ĐIỂM THỰC HÀNH (HĐ3):</span>
                        <span className="text-[11px] text-amber-700">Hệ số 40% điểm tổng kết tiết dạy</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="10"
                          value={onlineScoreH3}
                          onChange={(e) => setOnlineScoreH3(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                          className="w-20 px-2 py-1.5 rounded-xl border border-amber-400 bg-white font-black text-lg text-center text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <span className="font-bold text-amber-900 text-sm">/10</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Lời phê / Nhận xét của Thầy Đỗ Mạnh Trường:
                      </label>
                      <input
                        type="text"
                        value={onlineComment}
                        onChange={(e) => setOnlineComment(e.target.value)}
                        placeholder="Nhập lời phê..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                      />
                      <div className="flex items-center gap-1 flex-wrap mt-1.5">
                        {[
                          'Thao tác chuẩn xác!',
                          'Đúng hàm & bảng tính đẹp!',
                          'Cần chú ý định dạng căn lề.',
                          'Xuất sắc, tinh thần nhóm rất tốt!'
                        ].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setOnlineComment(preset)}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 font-medium border border-slate-200 cursor-pointer"
                          >
                            + {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* NÚT LƯU KẾT QUẢ CHẤM */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOnlineGradingMachine(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveOnlineGrade}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Lưu Kết Quả & Tặng Sao Tuyên Dương</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MODAL XEM ẢNH VỞ & CHẤM BÀI TẬP VỀ NHÀ */}
      {mounted && selectedHwSub && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <span>Chấm Bài Tập Về Nhà · {selectedHwSub.studentName}</span>
                    <span className="font-mono text-xs text-slate-500 font-normal">({selectedHwSub.studentCode})</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tiết {activeLesson.period}: {activeLesson.title} · {selectedHwSub.className}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedHwSub(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body 2 Cột: Cột Trái Xem Ảnh Vở / Tệp, Cột Phải Form Chấm */}
            <div className="p-5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
              {/* CỘT TRÁI: XEM ẢNH TRANG VỞ HOẶC TỆP */}
              <div className="space-y-3 flex flex-col">
                <div className="flex items-center justify-between bg-slate-100 p-2 rounded-2xl">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-purple-600" />
                    <span>Trang vở ghi chép</span>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setHwImageRotation((r) => (r + 90) % 360)}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1"
                      title="Xoay ảnh 90 độ"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Xoay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHwImageZoom((z) => Math.min(2.5, z + 0.25))}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold shadow-2xs cursor-pointer"
                      title="Phóng to ảnh"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setHwImageZoom((z) => Math.max(0.75, z - 0.25))}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold shadow-2xs cursor-pointer"
                      title="Thu nhỏ ảnh"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative flex-1 min-h-[300px] max-h-[420px] bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-2 border border-slate-200">
                  {selectedHwSub.fileType === 'image' && selectedHwSub.fileDataUrl ? (
                    <img
                      src={selectedHwSub.fileDataUrl}
                      alt="Ảnh trang vở học sinh"
                      className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-200"
                      style={{
                        transform: `rotate(${hwImageRotation}deg) scale(${hwImageZoom})`,
                      }}
                    />
                  ) : (
                    <div className="text-center p-6 text-white space-y-2">
                      <FileSpreadsheet className="w-12 h-12 mx-auto text-blue-400" />
                      <div className="font-bold text-sm">{selectedHwSub.fileName}</div>
                      <div className="text-xs text-slate-400">{selectedHwSub.fileSize}</div>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Đang mở tệp thực hành của học sinh!');
                        }}
                        className="inline-block mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                      >
                        Tải / Mở tệp trực tiếp
                      </a>
                    </div>
                  )}
                </div>

                {selectedHwSub.note && (
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-xs">
                    <span className="font-bold">Ghi chú của học sinh: </span>
                    <span>“{selectedHwSub.note}”</span>
                  </div>
                )}
              </div>

              {/* CỘT PHẢI: FORM CHẤM ĐIỂM & LỜI PHÊ */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-2">
                      1. Phương thức đánh giá bài tập:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setHwGradingType('tt22')}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          hwGradingType === 'tt22'
                            ? 'bg-teal-50 border-teal-500 text-teal-800 ring-2 ring-teal-500/20'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Đánh giá Thông tư 22 (Đạt / Chưa đạt)
                      </button>
                      <button
                        type="button"
                        onClick={() => setHwGradingType('score')}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          hwGradingType === 'score'
                            ? 'bg-blue-50 border-blue-500 text-blue-800 ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Thang điểm 10 (0 - 10đ)
                      </button>
                    </div>
                  </div>

                  {hwGradingType === 'tt22' ? (
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-2">
                        2. Kết quả Thông tư 22:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setHwTt22Status('Đạt')}
                          className={`py-3 px-4 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            hwTt22Status === 'Đạt'
                              ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/30'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>ĐẠT (Hoàn thành bài tập)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setHwTt22Status('Chưa đạt')}
                          className={`py-3 px-4 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            hwTt22Status === 'Chưa đạt'
                              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-500/30'
                              : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-800'
                          }`}
                        >
                          <AlertTriangle className="w-4 h-4" />
                          <span>CHƯA ĐẠT (Cần làm lại)</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-2">
                        2. Nhập điểm số (0 - 10đ):
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="10"
                          value={hwScoreValue}
                          onChange={(e) => setHwScoreValue(e.target.value)}
                          className="w-24 px-3 py-2 rounded-xl border border-slate-300 font-black text-base text-center bg-white"
                        />
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {['10', '9.5', '9.0', '8.5', '8.0'].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setHwScoreValue(s)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-700 font-bold text-xs cursor-pointer"
                            >
                              {s}đ
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-2">
                      3. Lời nhận xét / Phê của Thầy Đỗ Mạnh Trường:
                    </label>
                    <textarea
                      rows={3}
                      value={hwTeacherFeedback}
                      onChange={(e) => setHwTeacherFeedback(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
                      placeholder="Nhập lời phê chi tiết cho học sinh..."
                    />
                    <div className="mt-2 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400">Chọn nhanh mẫu nhận xét chuẩn:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'Vở ghi bài sạch đẹp, giải bài tập chính xác 100%!',
                          'Trình bày rõ ràng, đủ nội dung yêu cầu SGK.',
                          'Sơ đồ tư duy trực quan, bài làm rất xuất sắc!',
                          'Cần rèn thêm chữ viết và chú ý công thức!',
                        ].map((fb) => (
                          <button
                            key={fb}
                            type="button"
                            onClick={() => setHwTeacherFeedback(fb)}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-600 transition-colors cursor-pointer text-left"
                          >
                            + {fb}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedHwSub(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveHwGrade}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Lưu Đánh Giá BTVN</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
