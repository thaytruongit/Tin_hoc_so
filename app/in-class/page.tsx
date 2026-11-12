'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Laptop,
  Users,
  CheckCircle2,
  HelpCircle,
  Download,
  UploadCloud,
  Sparkles,
  Clock,
  Lock,
  Unlock,
  ArrowRight,
  AlertCircle,
  X,
  FileText,
  RefreshCw,
  Trophy,
  Send,
  Star,
  Check,
  Layers,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  School,
  Play,
  RotateCcw,
  CheckSquare,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { CURRICULUM_DATA, CurriculumPeriod } from '@/lib/curriculum-data';
import {
  ClassroomControlState,
  getClassroomState,
  getDefaultClassroomState,
  subscribeToClassroomState,
  updateMachineScore,
  sendStudentHelpRequest,
  setLiveBroadcast
} from '@/lib/classroom-control';
import { uploadPracticalToDriveOnline } from '@/lib/google-drive-service';
import { PracticalSubmission, CognitiveLevel } from '@/lib/types';
import InteractiveDiscoveryPair from '@/components/InteractiveDiscoveryPair';

export default function InClassPage() {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [controlState, setControlState] = useState<ClassroomControlState>(getDefaultClassroomState());

  // Thông tin máy trạm học sinh
  const [machineId, setMachineId] = useState<number>(1);
  const [student1Name, setStudent1Name] = useState<string>('Nguyễn Văn An');
  const [student2Name, setStudent2Name] = useState<string>('Trần Thị Mai');
  const [currentRoleTurn, setCurrentRoleTurn] = useState<'tech' | 'scribe'>('tech'); // tech: Kỹ thuật viên (chuột/phím), scribe: Thư ký

  // Trạng thái modal popup minigame cho 3 hoạt động
  const [activePopup, setActivePopup] = useState<'none' | 'discovery' | 'practice' | 'lab'>('none');
  const [lockedNoticeMessage, setLockedNoticeMessage] = useState<string | null>(null);

  // Trạng thái modal hỏi Thầy
  const [showHelpDialog, setShowHelpDialog] = useState<boolean>(false);
  const [helpQuestion, setHelpQuestion] = useState<string>('');
  const [helpSentSuccess, setHelpSentSuccess] = useState<boolean>(false);

  // Điểm đã hoàn thành tại máy trạm
  const [scoreH1, setScoreH1] = useState<number | null>(null);
  const [scoreH2, setScoreH2] = useState<number | null>(null);
  const [scoreH3, setScoreH3] = useState<number | null>(null);

  // --------------------------------------------------------------------------
  // MINIGAME 2: LUYỆN TẬP 7 CÂU TRẮC NGHIỆM CHUẨN BỘ
  // --------------------------------------------------------------------------
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCorrectCount, setQuizCorrectCount] = useState<number>(0);

  // --------------------------------------------------------------------------
  // MINIGAME 3: THỰC HÀNH TRÊN MÁY & NỘP BÀI GOOGLE DRIVE
  // --------------------------------------------------------------------------
  const [labFile, setLabFile] = useState<File | null>(null);
  const [isUploadingLab, setIsUploadingLab] = useState<boolean>(false);
  const [labSubmissionReceipt, setLabSubmissionReceipt] = useState<PracticalSubmission | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trạng thái Bảng Trắng khi chưa phát trực tiếp
  const [testClickCount, setTestClickCount] = useState<number>(0);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  // Đăng ký nhận sự kiện điều khiển thời gian thực từ Thầy Đỗ Mạnh Trường
  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    setCurrentUser(user);

    const initialControl = getClassroomState();
    setControlState(initialControl);

    // Lấy thông tin máy trạm và học sinh đã lưu lúc đăng nhập
    if (typeof window !== 'undefined') {
      try {
        const storedMachine = localStorage.getItem('truong_machine_id');
        if (storedMachine) {
          const mNum = parseInt(storedMachine, 10);
          if (mNum >= 1 && mNum <= 24) setMachineId(mNum);
        }

        if (user.studentName) setStudent1Name(user.studentName);
        if (user.partnerName) setStudent2Name(user.partnerName);

        // Khôi phục điểm đã lưu của máy này nếu có
        const currentMachineState = initialControl.machines.find(m => m.machineId === (storedMachine ? parseInt(storedMachine, 10) : 1));
        if (currentMachineState) {
          if (currentMachineState.scoreH1) setScoreH1(currentMachineState.scoreH1);
          if (currentMachineState.scoreH2) setScoreH2(currentMachineState.scoreH2);
          if (currentMachineState.scoreH3) setScoreH3(currentMachineState.scoreH3);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const unsub = subscribeToClassroomState((newState) => {
      setControlState(newState);
      // Cập nhật lại điểm từ giáo viên nếu có thay đổi
      if (typeof window !== 'undefined') {
        const storedMachine = localStorage.getItem('truong_machine_id');
        const mId = storedMachine ? parseInt(storedMachine, 10) : 1;
        const targetM = newState.machines.find(m => m.machineId === mId);
        if (targetM) {
          if (targetM.scoreH1 !== undefined) setScoreH1(targetM.scoreH1);
          if (targetM.scoreH2 !== undefined) setScoreH2(targetM.scoreH2);
          if (targetM.scoreH3 !== undefined) setScoreH3(targetM.scoreH3);
        }
      }
    });

    return () => unsub();
  }, []);

  // LẤY DỮ LIỆU BÀI HỌC THEO LỆNH PHÁT TỪ GIÁO VIÊN
  const activeGrade = controlState.activeGrade || 7;
  const activePeriodNum = controlState.activePeriod || 6;
  const periodsOfGrade = CURRICULUM_DATA[activeGrade] || CURRICULUM_DATA[7] || [];
  const currentPeriod: CurriculumPeriod = useMemo(() => {
    return periodsOfGrade.find(p => p.period === activePeriodNum) || periodsOfGrade[0];
  }, [periodsOfGrade, activePeriodNum]);

  const currentQuestions = currentPeriod.reinforcement.questions;
  const activeMachine = controlState.machines.find(m => m.machineId === machineId);

  // Đổi vai trò giữa 2 bạn tại máy
  const handleSwapRoles = () => {
    const nextRole = currentRoleTurn === 'tech' ? 'scribe' : 'tech';
    setCurrentRoleTurn(nextRole);
    // Hoán đổi tên hiển thị để phân vai chính xác
    setStudent1Name(student2Name);
    setStudent2Name(student1Name);
  };

  // Mở Popup Minigame có kiểm tra quyền từ Thầy
  const handleOpenActivity = (act: 'discovery' | 'practice' | 'lab') => {
    if (act === 'discovery') {
      if (!controlState.activityLocks.discovery) {
        setLockedNoticeMessage('Hoạt động 1: Khám phá kiến thức hiện đang tạm khóa. Thầy Đỗ Mạnh Trường đang hướng dẫn trên máy chiếu. Em hãy chú ý lắng nghe nhé!');
        return;
      }
      setActivePopup('discovery');
    } else if (act === 'practice') {
      if (!controlState.activityLocks.practice) {
        setLockedNoticeMessage('Hoạt động 2: Luyện tập 7 câu hiện đang tạm khóa. Hoạt động sẽ mở ngay khi Thầy phát lệnh làm bài trắc nghiệm!');
        return;
      }
      setActivePopup('practice');
    } else if (act === 'lab') {
      if (!currentPeriod.practicalTask) {
        setLockedNoticeMessage('Tiết học hôm nay là bài học lý thuyết thuần túy. Hoạt động thực hành trên phần mềm không áp dụng cho tiết này. Các em hãy tập trung hoàn thành Hoạt động 1 và Hoạt động 2 nhé!');
        return;
      }
      if (!controlState.activityLocks.lab) {
        setLockedNoticeMessage('Hoạt động 3: Thực hành trên máy hiện đang tạm khóa. Em hãy chờ hiệu lệnh bắt đầu thực hành từ Thầy Đỗ Mạnh Trường!');
        return;
      }
      setActivePopup('lab');
    }
  };

  // Gửi yêu cầu trợ giúp lên bàn Thầy
  const handleSendHelp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpQuestion.trim()) return;

    const studentNames = student2Name ? `${student1Name} & ${student2Name}` : student1Name;
    const className = currentUser?.studentClass || controlState.activeClassName || `Lớp ${activeGrade}A`;
    const mName = `Máy ${machineId < 10 ? `0${machineId}` : machineId}`;

    sendStudentHelpRequest(machineId, mName, studentNames, className, helpQuestion.trim());
    setHelpSentSuccess(true);
    setTimeout(() => {
      setHelpSentSuccess(false);
      setShowHelpDialog(false);
      setHelpQuestion('');
    }, 2000);
  };

  // --------------------------------------------------------------------------
  // HOÀN THÀNH HĐ1: KHÁM PHÁ CẶP ĐÔI
  // --------------------------------------------------------------------------
  const handleCompleteDiscovery = (score: number) => {
    setScoreH1(score);
    updateMachineScore(machineId, 'discovery', score);
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setActivePopup('none');
    }, 1500);
  };

  // --------------------------------------------------------------------------
  // XỬ LÝ HĐ2: MINIGAME 7 CÂU TRẮC NGHIỆM
  // --------------------------------------------------------------------------
  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    const answeredCount = Object.keys(quizAnswers).length;
    if (answeredCount < currentQuestions.length) {
      if (!confirm(`Em mới trả lời ${answeredCount}/${currentQuestions.length} câu. Em có chắc chắn muốn nộp bài ngay không?`)) {
        return;
      }
    }

    const correct = currentQuestions.filter(q => quizAnswers[q.id] === q.correctIndex).length;
    const finalScore = Math.round((correct / currentQuestions.length) * 10 * 10) / 10;

    setQuizCorrectCount(correct);
    setQuizScore(finalScore);
    setQuizSubmitted(true);
    setScoreH2(finalScore);

    updateMachineScore(machineId, 'practice', finalScore);

    if (finalScore >= 8) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  // --------------------------------------------------------------------------
  // XỬ LÝ HĐ3: MINIGAME THỰC HÀNH & NỘP DRIVE
  // --------------------------------------------------------------------------
  const handleUploadLab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labFile) {
      alert('Vui lòng chọn tệp sản phẩm thực hành (.xlsx, .docx, .py, .cpp, .pdf...) để nộp!');
      return;
    }

    setIsUploadingLab(true);
    const chosenClass = currentUser?.studentClass || controlState.activeClassName || `Lớp ${activeGrade}A`;
    const stCode = currentUser?.studentCode || `HS${machineId < 10 ? `0${machineId}` : machineId}`;
    const stNames = student2Name ? `${student1Name} & ${student2Name}` : student1Name;
    const taskName = currentPeriod.practicalTask?.title || `Thực hành Tiết ${currentPeriod.period}`;

    try {
      const driveRes = await uploadPracticalToDriveOnline({
        file: labFile,
        grade: activeGrade,
        period: currentPeriod.period,
        className: chosenClass,
        studentId: stCode,
        studentName: stNames,
        taskTitle: taskName,
      });

      const submissionCode = `THCSMD-${activeGrade}-${currentPeriod.period < 10 ? '0' : ''}${currentPeriod.period}-M${machineId < 10 ? '0' : ''}${machineId}-${Math.floor(100 + Math.random() * 900)}`;

      const newReceipt: PracticalSubmission = {
        id: `prac-${Date.now()}`,
        submissionCode: submissionCode,
        studentCode: stCode,
        studentName: stNames,
        classId: `c-${activeGrade}a`,
        className: chosenClass,
        assignmentTitle: taskName,
        fileName: labFile.name,
        fileSize: `${(labFile.size / 1024).toFixed(1)} KB`,
        submittedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        status: 'graded',
        score: 10,
        teacherFeedback: driveRes.status === 'ok'
          ? `Đã nhận sản phẩm thành công lên Google Drive của Thầy Đỗ Mạnh Trường (${driveRes.folderPath}). Thao tác đúng quy trình kỹ thuật!`
          : 'Đã lưu biên nhận bài thực hành vào hệ thống phòng máy!',
      };

      setLabSubmissionReceipt(newReceipt);
      setScoreH3(10);
      updateMachineScore(machineId, 'lab', 10, labFile.name);
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
      alert('Có lỗi khi nộp bài. Vui lòng thử lại!');
    } finally {
      setIsUploadingLab(false);
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-sm font-semibold">Đang kết nối phòng thực hành Tin học THCS Mão Điền...</p>
      </div>
    );
  }

  // ==========================================================================
  // KHI GIÁO VIÊN CHƯA PHÁT TRỰC TIẾP: HIỂN THỊ BẢNG TRẮNG KÈM THÔNG BÁO CỦA THẦY
  // ==========================================================================
  if (!controlState.isLive) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* BANNER THÔNG BÁO DÀNH CHO GIÁO VIÊN NẾU LÀ THẦY TRƯỜNG ĐANG TRUY CẬP */}
        {currentUser?.role === 'teacher' && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm font-bold text-amber-900 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <span>Thầy Đỗ Mạnh Trường đang ở chế độ xem trước Bảng Trắng của Học Sinh (Chưa phát trực tiếp).</span>
            </div>
            <button
              onClick={() => {
                setLiveBroadcast(true, controlState.activeClassName);
                setControlState(prev => ({ ...prev, isLive: true }));
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              <Radio className="w-4 h-4 text-white animate-pulse" />
              <span>Phát trực tiếp bài dạy ngay</span>
            </button>
          </div>
        )}

        {/* KHUNG BẢNG TRẮNG ĐIỆN TỬ PHÒNG THỰC HÀNH (VIRTUAL WHITEBOARD) */}
        <div className="bg-white rounded-3xl border-8 sm:border-12 border-slate-300 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[580px]">
          
          {/* MÓC TREO BẢNG & ĐINH ỐC 4 GÓC */}
          <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-slate-400 border border-slate-500 shadow-inner"></div>
          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-slate-400 border border-slate-500 shadow-inner"></div>
          <div className="absolute bottom-8 left-2 w-3 h-3 rounded-full bg-slate-400 border border-slate-500 shadow-inner"></div>
          <div className="absolute bottom-8 right-2 w-3 h-3 rounded-full bg-slate-400 border border-slate-500 shadow-inner"></div>

          {/* NỘI DUNG TRÊN MẶT BẢNG TRẮNG */}
          <div className="p-6 sm:p-10 space-y-6 relative z-10">
            
            {/* TIÊU ĐỀ ĐẦU BẢNG */}
            <div className="text-center space-y-2 border-b-2 border-dashed border-slate-200 pb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                <School className="w-4 h-4 text-blue-600" />
                <span>TRƯỜNG THCS MÃO ĐIỀN · PHÒNG THỰC HÀNH TIN HỌC SỐ</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                BẢNG TIN TIẾT DẠY SỐ
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Giáo viên phụ trách bộ môn: <strong className="text-slate-800">Thầy Đỗ Mạnh Trường</strong>
              </p>
            </div>

            {/* TRẠNG THÁI CHỜ PHÁT TRỰC TIẾP */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 text-xs sm:text-sm font-bold shadow-xs animate-pulse">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>⏳ ĐANG CHỜ TÍN HIỆU PHÁT TRỰC TIẾP TỪ THẦY ĐỖ MẠNH TRƯỜNG...</span>
              </div>
            </div>

            {/* THÔNG TIN VỊ TRÍ MÁY & CẶP ĐÔI TẠI MÁY */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Vị trí máy trạm</span>
                <span className="text-base font-extrabold text-blue-700 font-mono">
                  💻 Máy {machineId < 10 ? `0${machineId}` : machineId}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Lớp học</span>
                <span className="text-base font-extrabold text-slate-800">
                  {currentUser?.studentClass || controlState.activeClassName || 'Lớp 6A10'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 block uppercase">Học sinh tại máy</span>
                <span className="text-xs font-bold text-slate-800 truncate block">
                  {student1Name} {student2Name ? `& ${student2Name}` : ''}
                </span>
              </div>
            </div>

            {/* KHUNG THÔNG BÁO CHÍNH THỨC SƯ PHẠM */}
            <div className="max-w-3xl mx-auto bg-blue-50/70 border-2 border-blue-200 rounded-2xl p-5 sm:p-6 text-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm sm:text-base">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <span>HƯỚNG DẪN CHUẨN BỊ ĐẦU GIỜ TỪ THẦY TRƯỜNG</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  Thầy Đỗ Mạnh Trường chưa phát lệnh bắt đầu bài dạy trực tiếp cho lớp của em. Trong thời gian chuẩn bị, các em vui lòng:
                </p>
                <ol className="list-decimal pl-5 space-y-1 font-medium text-slate-800">
                  <li><strong>Ổn định vị trí:</strong> Ngồi đúng số máy được phân công, giữ gìn trật tự và vệ sinh chung.</li>
                  <li><strong>Chuẩn bị đồ dùng:</strong> Mở sẵn sách giáo khoa Tin học và vở ghi bài trên bàn.</li>
                  <li><strong>Kiểm tra thiết bị:</strong> Thử rê chuột và gõ phím bên dưới để chắc chắn máy trạm hoạt động bình thường.</li>
                  <li><strong>Sẵn sàng học tập:</strong> Khi Thầy Trường bấm <em>&quot;Phát trực tiếp bài dạy&quot;</em> từ Bàn quản lý, màn hình máy trạm sẽ tự động chuyển ngay sang 3 Hoạt động lớp học số mà không cần thao tác gì thêm!</li>
                </ol>
              </div>
            </div>

            {/* CÔNG CỤ TEST THIẾT BỊ TẠI CHỖ & NỘI QUY */}
            <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setTestClickCount(c => c + 1)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🖱️ Test Chuột (Đã click: {testClickCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowRulesModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>📜 5 Điều Nội Quy Phòng Máy</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowHelpDialog(true)}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-rose-600" />
                <span>Báo Cáo Máy Hỏng / Cần Thầy Giúp</span>
              </button>
            </div>
          </div>

          {/* KHAY ĐỰNG BÚT LÔNG VÀ KHĂN LAU Ở ĐÁY BẢNG TRẮNG */}
          <div className="bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 border-t-2 border-slate-400 py-2.5 px-6 flex items-center justify-center gap-6 shadow-inner">
            <div className="flex items-center gap-3">
              {/* Bút lông xanh */}
              <div className="w-16 h-3 rounded-full bg-blue-600 shadow-sm border border-blue-700" title="Bút lông xanh viết bảng"></div>
              {/* Bút lông đỏ */}
              <div className="w-16 h-3 rounded-full bg-rose-600 shadow-sm border border-rose-700" title="Bút lông đỏ viết bảng"></div>
              {/* Bút lông đen */}
              <div className="w-16 h-3 rounded-full bg-slate-900 shadow-sm border border-slate-950" title="Bút lông đen viết bảng"></div>
              {/* Khăn lau bảng */}
              <div className="w-14 h-4 rounded-md bg-amber-700 shadow-sm border border-amber-800 text-[8px] text-white flex items-center justify-center font-bold" title="Khăn lau bảng">
                LAU BẢNG
              </div>
            </div>
          </div>
        </div>

        {/* MODAL 5 ĐIỀU NỘI QUY PHÒNG MÁY THCS MÃO ĐIỀN */}
        {showRulesModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <School className="w-5 h-5 text-blue-600" />
                  <span>Nội Quy Phòng Thực Hành Tin Học THCS Mão Điền</span>
                </h3>
                <button
                  onClick={() => setShowRulesModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 space-y-2.5">
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                  <strong>Điều 1:</strong> Vào phòng máy đúng giờ, ngồi đúng vị trí máy trạm đã được phân công.
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                  <strong>Điều 2:</strong> Giữ gìn vệ sinh, không mang đồ ăn, nước uống vào phòng thực hành.
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                  <strong>Điều 3:</strong> Sử dụng máy tính đúng mục đích học tập theo hướng dẫn của Thầy Đỗ Mạnh Trường.
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                  <strong>Điều 4:</strong> Không tự ý thay đổi cài đặt hệ thống, tháo lắp linh kiện chuột, bàn phím, dây nguồn.
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                  <strong>Điều 5:</strong> Hết giờ học, lưu bài nộp lên Google Drive, tắt máy và xếp gọn ghế ngồi ngăn nắp.
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setShowRulesModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all"
                >
                  Đã hiểu và thực hiện
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQ = currentQuestions[currentQuestionIndex] || currentQuestions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ==================================================================== */}
      {/* 1. KHÔNG GIAN HỌC TẬP THỰC HÀNH: BẢNG ĐIỀU PHỐI TỪ THẦY TRƯỜNG       */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        
        {/* THANH ĐIỀU HƯỚNG SƯ PHẠM TRÊN CÙNG */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <School className="w-3.5 h-3.5 text-blue-600" />
                <span>Khối {activeGrade} · Tiết {currentPeriod.period}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                💻 Máy {machineId < 10 ? `0${machineId}` : machineId}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Giáo viên chỉ đạo: <strong className="text-slate-900">Thầy Đỗ Mạnh Trường</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentPeriod.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600">
              Chủ đề: <strong className="text-blue-700">{currentPeriod.topic}</strong> · {currentPeriod.digitalCompetency || 'Tích hợp Năng lực số CV 3456 & AI 3439'}
            </p>
          </div>

          {/* KHU VỰC CẶP ĐÔI HỌC SINH TẠI MÁY & ĐỔI VAI TRÒ */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shrink-0">
            <div className="space-y-0.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Học tập cặp đôi tại máy:
              </div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-bold text-[10px]">
                  {currentRoleTurn === 'tech' ? 'Kỹ thuật viên 🖱️' : 'Thư ký 📝'}
                </span>
                <span className="text-blue-800">{student1Name}</span>
                {student2Name && (
                  <>
                    <span className="text-slate-400">⇄</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold text-[10px]">
                      {currentRoleTurn === 'tech' ? 'Thư ký 📝' : 'Kỹ thuật viên 🖱️'}
                    </span>
                    <span className="text-indigo-800">{student2Name}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 sm:pt-0">
              {student2Name && (
                <button
                  type="button"
                  onClick={handleSwapRoles}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors shrink-0"
                  title="Đổi vai trò giữa 2 bạn: Kỹ thuật viên (chuột/phím) ⇄ Thư ký (ghi chép/đối chiếu)"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                  <span>Đổi vai</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowHelpDialog(true)}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs flex items-center gap-1 transition-colors shrink-0"
                title="Gửi tín hiệu cần trợ giúp lên bàn Thầy Trường"
              >
                <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Cần Thầy giúp</span>
              </button>
            </div>
          </div>
        </div>

        {/* THÔNG BÁO TỨC THÌ TỪ THẦY GIÁO */}
        {controlState.broadcastMessage && (
          <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
              <span className="truncate">📢 <strong>Thầy Đỗ Mạnh Trường nhắc nhở:</strong> {controlState.broadcastMessage}</span>
            </div>
            {activeMachine && activeMachine.starsEarned > 0 && (
              <div className="flex items-center gap-1 text-amber-600 font-bold shrink-0 bg-white px-2.5 py-1 rounded-xl border border-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>Được Thầy tặng {activeMachine.starsEarned} Sao tuyên dương!</span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ==================================================================== */}
      {/* 2. 3 THẺ HOẠT ĐỘNG LỚN (3 ACTIVITY HERO CARDS)                       */}
      {/* ==================================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>3 Hoạt Động Bài Học Trên Lớp</span>
            </h2>
            <p className="text-xs text-slate-500">
              Học sinh bấm vào từng hoạt động để mở giao diện Popup Minigame tương tác bắt mắt
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span>Tiến độ máy:</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-extrabold">
              {([scoreH1, scoreH2, scoreH3].filter(s => s !== null && s > 0).length)}/3 Hoàn Thành
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1: KHÁM PHÁ KIẾN THỨC CẶP ĐÔI */}
          <div className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-5 bg-white ${
            controlState.activityLocks.discovery
              ? 'border-blue-300 shadow-md hover:border-blue-500 hover:shadow-lg'
              : 'border-slate-200 bg-slate-50/70 opacity-80'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  {controlState.activityLocks.discovery ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                      <Unlock className="w-3 h-3" /> Đã Mở
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Tạm Khóa
                    </span>
                  )}
                  <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-bold">
                    ⏱️ 10 phút
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Hoạt Động 1</span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5 line-clamp-1">
                  Khám Phá Kiến Thức Cặp Đôi
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Minigame kéo thả phân loại, ghép nối khái niệm và điền khuyết thuật ngữ trọng tâm của bài.
                </p>
              </div>

              {/* Trạng thái điểm */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Kết quả HĐ 1:</span>
                {scoreH1 !== null ? (
                  <span className="text-xs font-black text-blue-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{scoreH1}/10 Điểm</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-400">Chưa hoàn thành</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenActivity('discovery')}
              className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all ${
                controlState.activityLocks.discovery
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{scoreH1 !== null ? 'Làm Lại Minigame Khám Phá' : 'Vào Minigame Khám Phá (HĐ 1)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 2: LUYỆN TẬP 7 CÂU CHUẨN BỘ */}
          <div className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-5 bg-white ${
            controlState.activityLocks.practice
              ? 'border-indigo-300 shadow-md hover:border-indigo-500 hover:shadow-lg'
              : 'border-slate-200 bg-slate-50/70 opacity-80'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  {controlState.activityLocks.practice ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                      <Unlock className="w-3 h-3" /> Đã Mở
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Tạm Khóa
                    </span>
                  )}
                  <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-bold">
                    ⏱️ 7 phút
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Hoạt Động 2</span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5 line-clamp-1">
                  Luyện Tập 7 Câu Chuẩn Bộ GD&ĐT
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Minigame trắc nghiệm 7 câu chuẩn ma trận (3 Biết - 2 Hiểu - 2 Vận dụng), tính điểm và đẩy điểm về Thầy.
                </p>
              </div>

              {/* Trạng thái điểm */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Kết quả HĐ 2:</span>
                {scoreH2 !== null ? (
                  <span className="text-xs font-black text-indigo-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{scoreH2}/10 Điểm</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-400">Chưa hoàn thành</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenActivity('practice')}
              className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all ${
                controlState.activityLocks.practice
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{scoreH2 !== null ? 'Làm Lại Minigame 7 Câu' : 'Vào Minigame 7 Câu (HĐ 2)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 3: THỰC HÀNH TRÊN MÁY & NỘP GOOGLE DRIVE (CHỈ MỞ CHO TIẾT THỰC HÀNH) */}
          <div className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-5 ${
            !currentPeriod.practicalTask
              ? 'border-slate-200 bg-slate-50/80 opacity-70'
              : controlState.activityLocks.lab
              ? 'border-amber-300 shadow-md hover:border-amber-500 hover:shadow-lg bg-white'
              : 'border-slate-200 bg-slate-50/70 opacity-80'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                  !currentPeriod.practicalTask ? 'bg-slate-200 text-slate-500' : 'bg-amber-100 text-amber-700'
                }`}>
                  <Laptop className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  {!currentPeriod.practicalTask ? (
                    <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">
                      📖 Tiết Lý Thuyết
                    </span>
                  ) : controlState.activityLocks.lab ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                      <Unlock className="w-3 h-3" /> Đã Mở
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Tạm Khóa
                    </span>
                  )}
                  {currentPeriod.practicalTask && (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-bold">
                      ⏱️ 15 phút
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">Hoạt Động 3</span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5 line-clamp-1">
                  {!currentPeriod.practicalTask ? 'Thực Hành Máy (Không áp dụng)' : 'Thực Hành Máy & Nộp Bài Drive'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {!currentPeriod.practicalTask
                    ? 'Tiết học này là bài học lý thuyết. Các em tập trung phối hợp làm Phiếu khám phá (HĐ1) và Trắc nghiệm (HĐ2).'
                    : (currentPeriod.practicalTask.title || 'Tải file dữ liệu mẫu, thực hành thao tác trên máy và nộp file thẳng vào Google Drive của Thầy Đỗ Mạnh Trường.')}
                </p>
              </div>

              {/* Trạng thái điểm */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Trạng thái:</span>
                {!currentPeriod.practicalTask ? (
                  <span className="text-xs font-bold text-slate-400">Không có bài thực hành</span>
                ) : scoreH3 !== null ? (
                  <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đã Nộp (10/10)</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-400">Chưa nộp tệp</span>
                )}
              </div>
            </div>

            <button
              type="button"
              disabled={!currentPeriod.practicalTask}
              onClick={() => handleOpenActivity('lab')}
              className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all ${
                !currentPeriod.practicalTask
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : controlState.activityLocks.lab
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 cursor-pointer'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300 cursor-pointer'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>
                {!currentPeriod.practicalTask
                  ? '🔒 Tiết Lý Thuyết Không Có Thực Hành'
                  : scoreH3 !== null
                  ? 'Xem Biên Lai / Nộp Lại'
                  : 'Mở Trạm Thực Hành (HĐ 3)'}
              </span>
              {currentPeriod.practicalTask && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL THÔNG BÁO SƯ PHẠM KHI HOẠT ĐỘNG ĐANG KHÓA                      */}
      {/* ==================================================================== */}
      {lockedNoticeMessage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Hoạt Động Đang Tạm Khóa
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lockedNoticeMessage}
            </p>
            <button
              type="button"
              onClick={() => setLockedNoticeMessage(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
            >
              Em Đã Hiểu, Sẽ Chú Ý Lắng Nghe Thầy
            </button>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL GỬI TÍN HIỆU CẦN THẦY TRỢ GIÚP                                */}
      {/* ==================================================================== */}
      {showHelpDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm">
                <HelpCircle className="w-5 h-5" />
                <span>Gửi Tín Hiệu Cần Thầy Trợ Giúp</span>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpDialog(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {helpSentSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Đã gửi tín hiệu tới bàn Thầy! Thầy Đỗ Mạnh Trường sẽ đến hỗ trợ cặp đôi của em ngay.</span>
              </div>
            ) : (
              <form onSubmit={handleSendHelp} className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Máy {machineId < 10 ? `0${machineId}` : machineId} ({student1Name}{student2Name ? ` & ${student2Name}` : ''}) đang gặp khó khăn ở chỗ nào? Hãy mô tả ngắn gọn để Thầy tới bàn hướng dẫn:
                </p>

                <textarea
                  required
                  rows={3}
                  value={helpQuestion}
                  onChange={(e) => setHelpQuestion(e.target.value)}
                  placeholder="Ví dụ: Thưa Thầy, câu lệnh lặp hoặc công thức tính tổng đang báo lỗi cú pháp ạ..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-rose-500"
                />

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowHelpDialog(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi Lên Bàn Thầy</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* POPUP MINIGAME 1: KHÁM PHÁ KIẾN THỨC CẶP ĐÔI (MODAL TOÀN MÀN HÌNH) */}
      {/* ==================================================================== */}
      {activePopup === 'discovery' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Header Popup */}
            <div className="p-4 sm:p-5 bg-blue-50 border-b border-blue-200 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-blue-700 tracking-wider">
                    Minigame Khám Phá Kiến Thức · Tiết {currentPeriod.period}
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-1">
                    {currentPeriod.worksheet.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {student2Name && (
                  <button
                    type="button"
                    onClick={handleSwapRoles}
                    className="px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-blue-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Đổi vai:</span>
                    <span>{student1Name} ⇄ {student2Name}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActivePopup('none')}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white"
                  title="Đóng Minigame"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thân Minigame (Canvas tương tác) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
              <InteractiveDiscoveryPair
                currentPeriod={currentPeriod}
                student1Name={student1Name}
                student2Name={student2Name}
                isLocked={!controlState.activityLocks.discovery}
                onComplete={handleCompleteDiscovery}
              />
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* POPUP MINIGAME 2: LUYỆN TẬP 7 CÂU CHUẨN BỘ GD&ĐT                    */}
      {/* ==================================================================== */}
      {activePopup === 'practice' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Header Popup Minigame 2 */}
            <div className="p-4 sm:p-5 bg-indigo-50 border-b border-indigo-200 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-indigo-700 tracking-wider">
                    Minigame Thử Thách 7 Câu Chuẩn Bộ GD&ĐT · Tiết {currentPeriod.period}
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Ma trận nhận thức: 3 Biết · 2 Hiểu · 2 Vận dụng
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActivePopup('none')}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white"
                title="Đóng Minigame"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thân Minigame 2 */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">

              {!quizSubmitted ? (
                <>
                  {/* THANH ĐIỀU HƯỚNG 7 CÂU STEPPER */}
                  <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-600">
                      Tiến độ: <strong className="text-indigo-600">{Object.keys(quizAnswers).length}/7 câu</strong>
                    </span>

                    <div className="flex items-center gap-1.5">
                      {currentQuestions.map((q, idx) => {
                        const isAns = quizAnswers[q.id] !== undefined;
                        const isCur = currentQuestionIndex === idx;

                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => setCurrentQuestionIndex(idx)}
                            className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                              isCur
                                ? 'bg-indigo-600 text-white shadow-xs scale-110'
                                : isAns
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* THẺ CÂU HỎI HIỆN TẠI */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-indigo-700 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200">
                        Câu {currentQuestionIndex + 1} / 7
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        currentQ.level === 'Nhận biết'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : currentQ.level === 'Thông hiểu'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        Cấp độ: {currentQ.level}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                      {currentQ.question}
                    </h4>

                    {/* 4 PHƯƠNG ÁN A, B, C, D */}
                    <div className="space-y-2.5 pt-2">
                      {currentQ.options.map((opt, optIdx) => {
                        const isSelected = quizAnswers[currentQ.id] === optIdx;
                        const labelChar = String.fromCharCode(65 + optIdx);

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectQuizOption(currentQ.id, optIdx)}
                            className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                              isSelected
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-950 font-bold shadow-2xs'
                                : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                          >
                            <span className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-300'
                            }`}>
                              {labelChar}
                            </span>
                            <span className="text-xs sm:text-sm">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* NÚT CHUYỂN CÂU VÀ NỘP BÀI */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Câu Trước</span>
                    </button>

                    {currentQuestionIndex < currentQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Câu Tiếp Theo</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Check className="w-4 h-4" />
                        <span>Nộp Bài & Chấm Điểm H2</span>
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* MÀN HÌNH KẾT QUẢ MINIGAME 2 */
                <div className="space-y-6 text-center py-4">
                  <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto text-2xl font-black">
                    <Trophy className="w-10 h-10 text-amber-500" />
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Chúc Mừng Cặp Đôi Đã Hoàn Thành Thử Thách!
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Kết quả của Máy {machineId < 10 ? `0${machineId}` : machineId} đã được tự động đẩy về Bàn Giám Sát của Thầy Đỗ Mạnh Trường.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 max-w-sm mx-auto flex items-center justify-around">
                    <div>
                      <div className="text-2xl font-black text-indigo-700">{quizCorrectCount}/7</div>
                      <div className="text-[11px] font-bold text-slate-500">Số Câu Đúng</div>
                    </div>
                    <div className="w-px h-10 bg-indigo-200" />
                    <div>
                      <div className="text-2xl font-black text-emerald-700">{quizScore}/10</div>
                      <div className="text-[11px] font-bold text-slate-500">Điểm Hoạt Động 2</div>
                    </div>
                  </div>

                  {/* Chi tiết từng câu */}
                  <div className="space-y-3 text-left max-h-60 overflow-y-auto pr-1">
                    {currentQuestions.map((q, idx) => {
                      const isCorrect = quizAnswers[q.id] === q.correctIndex;
                      return (
                        <div key={q.id} className="p-3.5 rounded-xl border border-slate-200 text-xs space-y-1 bg-white">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-slate-800">Câu {idx + 1}: {q.question}</span>
                            <span className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                              {isCorrect ? '✓ Đúng' : '✗ Sai'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            <strong>Đáp án đúng:</strong> {q.options[q.correctIndex]}
                          </p>
                          <p className="text-[10px] text-indigo-700 italic">
                            Giải thích: {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetQuiz}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Làm Lại Thử Thách</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePopup('none')}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                    >
                      Xác Nhận & Quay Lại Lớp Học
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* POPUP MINIGAME 3: THỰC HÀNH MÁY & NỘP DRIVE (MODAL TOÀN MÀN HÌNH)    */}
      {/* ==================================================================== */}
      {activePopup === 'lab' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Header Popup Minigame 3 */}
            <div className="p-4 sm:p-5 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">
                    Trạm Thực Hành Trên Máy & Nộp Bài Google Drive · Tiết {currentPeriod.period}
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {currentPeriod.practicalTask?.title || 'Bài tập thực hành tại phòng máy'}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActivePopup('none')}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white"
                title="Đóng Trạm Thực Hành"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thân Trạm Thực Hành */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">

              {/* BƯỚC 1: NHIỆM VỤ & TẢI FILE MẪU */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">1</span>
                    <span>Nhiệm Vụ Thao Tác Kỹ Thuật:</span>
                  </h4>

                  {currentPeriod.practicalTask?.sampleFileName && (
                    <button
                      type="button"
                      onClick={() => alert(`Đã kích hoạt tải tệp mẫu ${currentPeriod.practicalTask?.sampleFileName} về máy trạm!`)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải Tệp Dữ Liệu Mẫu</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 pl-7">
                  {(currentPeriod.practicalTask?.steps || [
                    'Khởi động phần mềm chuyên dụng trên máy trạm.',
                    'Thực hiện theo các yêu cầu của bài tập trong SGK.',
                    'Lưu tệp đúng định dạng tên quy định: BTH_TietXX_MayXX.'
                  ]).map((st, idx) => (
                    <div key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-amber-600 font-bold shrink-0">●</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BƯỚC 2: KHU VỰC KÉO THẢ NỘP FILE */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                  <span>Nộp Tệp Sản Phẩm Lên Google Drive Thầy Trường:</span>
                </h4>

                <form onSubmit={handleUploadLab} className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
                      labFile
                        ? 'bg-emerald-50/60 border-emerald-400'
                        : 'bg-slate-50/60 border-slate-300 hover:border-amber-500 hover:bg-amber-50/30'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setLabFile(e.target.files[0]);
                        }
                      }}
                    />

                    {labFile ? (
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold text-emerald-900">
                          Đã chọn tệp: <strong className="text-emerald-700">{labFile.name}</strong>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Dung lượng: {(labFile.size / 1024).toFixed(1)} KB · Bấm để đổi tệp khác
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold text-slate-800">
                          Kéo &amp; thả tệp bài làm vào đây hoặc <span className="text-amber-700 underline">bấm để duyệt tệp</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Chấp nhận: .xlsx, .docx, .py, .cpp, .pdf (Dung lượng tối đa 25MB)
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!labFile || isUploadingLab}
                    className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{isUploadingLab ? 'Đang tải lên Google Drive của Thầy Đỗ Mạnh Trường...' : 'Nộp Bài Vào Google Drive (Nhận Điểm H3: 10/10)'}</span>
                  </button>
                </form>
              </div>

              {/* BIÊN LAI NỘP BÀI ĐIỆN TỬ */}
              {labSubmissionReceipt && (
                <div className="p-5 rounded-3xl bg-emerald-50/70 border-2 border-emerald-400 text-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <School className="w-5 h-5 text-emerald-700" />
                      <span className="text-xs font-black uppercase text-emerald-900 tracking-wider">
                        Biên Lai Điện Tử Xác Nhận Nộp Bài · THCS Mão Điền
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                      Đã Duyệt 10/10
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Mã biên lai: <strong className="text-emerald-900">{labSubmissionReceipt.submissionCode}</strong></div>
                    <div>Thời gian nộp: <strong className="text-emerald-900">{labSubmissionReceipt.submittedAt}</strong></div>
                    <div>Học sinh: <strong className="text-slate-900">{labSubmissionReceipt.studentName}</strong></div>
                    <div>Tên tệp đã lưu: <strong className="text-emerald-800">{labSubmissionReceipt.fileName}</strong></div>
                  </div>

                  <p className="text-[11px] text-emerald-800 italic pt-1 border-t border-emerald-100">
                    {labSubmissionReceipt.teacherFeedback}
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}