'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Users,
  FileText,
  ClipboardCheck,
  KeyRound,
  PlusCircle,
  Download,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Eye,
  Activity,
  Send,
  HelpCircle,
  UploadCloud,
  FileSpreadsheet,
  Check,
  MessageSquare,
  GraduationCap,
  Sparkles,
  BookOpen,
  Camera,
  Image as ImageIcon,
  ExternalLink,
  X,
  ShieldAlert,
  ArrowRight,
  Cloud,
  FolderCheck,
  RefreshCw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  ThumbsUp,
  Award,
  Sliders,
  CheckSquare,
  Radio,
  Trash2,
  Edit3,
  UserPlus,
  Star,
  Trophy,
  Share2,
  School
} from 'lucide-react';
import {
  MOCK_CLASSES,
  MOCK_STUDENTS,
  MOCK_EXAMS,
  MOCK_SUBMISSIONS,
  MOCK_HOMEWORK_SUBMISSIONS,
  MOCK_IN_CLASS_LESSONS
} from '@/lib/mock-data';
import { ClassItem, Student, PracticalSubmission, HomeworkSubmission, Exam } from '@/lib/types';
import { getCurrentUser, UserSession, isStudentDesignatedHSG, setStudentDesignatedHSG } from '@/lib/auth';
import { CURRICULUM_DATA } from '@/lib/curriculum-data';
import { getGasWebAppUrl, setGasWebAppUrl, testDriveOnlineConnection } from '@/lib/google-drive-service';
import ClassroomCommandCenter from '@/components/ClassroomCommandCenter';
import { fetchClassExamResultsFromCloud, CloudExamResult } from '@/lib/supabase-service';
import { exportStudentsToExcel } from '@/lib/export-excel';
import { selectClassForClassroom, getClassroomState } from '@/lib/classroom-control';

type TeacherTab = 'in-class' | 'class-roster' | 'exams' | 'homework';

function TeacherDashboardContent() {
  const searchParams = useSearchParams();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  // MẶC ĐỊNH KHỐI 6 (BỎ HOÀN TOÀN 'TẤT CẢ LỚP' THEO CHỈ ĐẠO CỦA THẦY TRƯỜNG)
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number>(6);
  const [selectedClassId, setSelectedClassId] = useState<string>('c-6a10'); // Lớp 6A10
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');

  // 4 CHỨC NĂNG QUẢN TRỊ CỐT LÕI
  const [activeTab, setActiveTab] = useState<TeacherTab>('in-class');

  // ĐỒNG BỘ QUERY PARAM URL (?tab=...)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'class-roster' || tabParam === 'roster') {
      setActiveTab('class-roster');
    } else if (tabParam === 'exams') {
      setActiveTab('exams');
    } else if (tabParam === 'homework') {
      setActiveTab('homework');
    } else if (tabParam === 'in-class' || tabParam === 'orchestration') {
      setActiveTab('in-class');
    }
  }, [searchParams]);

  // STATE LỚP VÀ HỌC SINH (HỖ TRỢ THÊM / SỬA / XOÁ)
  const [classList, setClassList] = useState<ClassItem[]>(MOCK_CLASSES);
  const [studentList, setStudentList] = useState<Student[]>(MOCK_STUDENTS);

  // MODAL QUẢN LÝ LỚP
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState<number>(6);
  const [editClassName, setEditClassName] = useState('');

  // MODAL QUẢN LÝ HỌC SINH
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentDob, setNewStudentDob] = useState('2012-05-15');

  // STATE QUẢN LÝ ĐỀ THI
  const [exams, setExams] = useState<Exam[]>(MOCK_EXAMS);
  const [showCreateExamModal, setShowCreateExamModal] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamGrade, setNewExamGrade] = useState<number>(6);
  const [newExamDuration, setNewExamDuration] = useState<number>(45);
  const [newExamType, setNewExamType] = useState<'thường xuyên' | 'giữa kỳ' | 'cuối kỳ'>('giữa kỳ');

  // STATE QUẢN LÝ BÀI TẬP VỀ NHÀ
  const [homeworkSubs, setHomeworkSubs] = useState<HomeworkSubmission[]>(MOCK_HOMEWORK_SUBMISSIONS);
  const [showAssignHwModal, setShowAssignHwModal] = useState(false);
  const [hwLessonNum, setHwLessonNum] = useState<number>(1);
  const [hwTitle, setHwTitle] = useState('Bài tập về nhà: Ôn tập kiến thức và thực hành');
  const [hwRequirement, setHwRequirement] = useState('Chụp ảnh vở ghi bài học hoặc gửi tệp tin sản phẩm thực hành');
  const [hwDueDate, setHwDueDate] = useState('2026-11-20 23:59');

  // STATE CHẤM BÀI TẬP VỀ NHÀ & XEM ẢNH VỞ
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageRotation, setImageRotation] = useState<number>(0);
  const [imageZoom, setImageZoom] = useState<number>(1);
  const [gradingHwId, setGradingHwId] = useState<string | null>(null);
  const [hwScore, setHwScore] = useState<string>('10');
  const [hwEvalType, setHwEvalType] = useState<'tt22' | 'score'>('tt22');
  const [hwTt22Result, setHwTt22Result] = useState<'Đạt' | 'Chưa đạt'>('Đạt');
  const [hwFeedback, setHwFeedback] = useState<string>('Bài làm rất tốt, trình bày sạch đẹp và đúng quy cách!');

  // STATE SUPABASE KẾT QUẢ THI
  const [examResultsList, setExamResultsList] = useState<CloudExamResult[]>([]);
  const [isLoadingExamResults, setIsLoadingExamResults] = useState<boolean>(false);

  // STATE GOOGLE DRIVE CONFIG
  const [gasUrlInput, setGasUrlInput] = useState<string>('');
  const [showDriveConfig, setShowDriveConfig] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<{ loading: boolean; result?: { success: boolean; message: string; version?: string } }>({ loading: false });

  // REFRESH HSG KHI CÓ SỰ KIỆN
  const [hsgVersion, setHsgVersion] = useState(0);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setGasUrlInput(getGasWebAppUrl());

    // Khởi tạo trạng thái lớp học số ban đầu đồng bộ với Lớp 6A10
    selectClassForClassroom('c-6a10', 'Lớp 6A10', 6);

    const onHsgUpdate = () => setHsgVersion(v => v + 1);
    window.addEventListener('truong_hsg_update', onHsgUpdate);
    return () => window.removeEventListener('truong_hsg_update', onHsgUpdate);
  }, []);

  // LỚP VÀ HỌC SINH HIỆN TẠI ĐƯỢC CHỌN
  const displayClasses = useMemo(() => {
    return classList.filter(c => c.grade === selectedGradeFilter);
  }, [classList, selectedGradeFilter]);

  const currentClass = useMemo(() => {
    const found = classList.find(c => c.id === selectedClassId);
    if (found) return found;
    return displayClasses[0] || classList[0];
  }, [classList, selectedClassId, displayClasses]);

  const classStudents = useMemo(() => {
    return studentList.filter(s => s.classId === currentClass.id);
  }, [studentList, currentClass.id]);

  const filteredStudents = useMemo(() => {
    return classStudents.filter(s =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.dob && s.dob.includes(searchTerm))
    );
  }, [classStudents, searchTerm]);

  // HÀM CHỌN LỚP VÀ ĐIỀU PHỐI ĐỒNG BỘ NGAY SANG LỚP HỌC SỐ
  const handleSelectClass = (cls: ClassItem) => {
    setSelectedClassId(cls.id);
    setSelectedGradeFilter(cls.grade);
    // Điều phối sang lớp học số của học sinh tương ứng
    selectClassForClassroom(cls.id, cls.name, cls.grade);
    setNotification(`⚡ Đã điều phối Lớp học số sang ${cls.name} (Khối ${cls.grade}). 24 máy trạm đã sẵn sàng!`);
    setTimeout(() => setNotification(''), 4000);
  };

  // KHI ĐỔI KHỐI: TỰ ĐỘNG CHỌN LỚP ĐẦU TIÊN CỦA KHỐI VÀ ĐIỀU PHỐI
  const handleSelectGrade = (grade: number) => {
    setSelectedGradeFilter(grade);
    const firstClass = classList.find(c => c.grade === grade);
    if (firstClass) {
      setSelectedClassId(firstClass.id);
      selectClassForClassroom(firstClass.id, firstClass.name, firstClass.grade);
      setNotification(`⚡ Đã chuyển sang Khối ${grade} · Lớp ${firstClass.name}`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // TỰ ĐỘNG TẢI KẾT QUẢ THI TỪ SUPABASE CLOUD KHI CHỌN LỚP
  useEffect(() => {
    if (currentClass?.name) {
      setIsLoadingExamResults(true);
      fetchClassExamResultsFromCloud(currentClass.name)
        .then(res => setExamResultsList(res))
        .catch(err => console.error(err))
        .finally(() => setIsLoadingExamResults(false));
    }
  }, [currentClass?.name]);

  // THAO TÁC KHÓA / MỞ ĐỀ THI
  const toggleLockExam = (examId: string) => {
    setExams(prev => prev.map(e => {
      if (e.id === examId) {
        const nextState = !e.isLocked;
        setNotification(`Đã ${nextState ? 'KHÓA' : 'MỞ'} đề kiểm tra: "${e.title}"`);
        setTimeout(() => setNotification(''), 3000);
        return { ...e, isLocked: nextState };
      }
      return e;
    }));
  };

  // THAO TÁC GIAO ĐỀ CHO LỚP ĐƯỢC CHỌN
  const handleAssignExamToClass = (exam: Exam) => {
    setNotification(`📋 Thầy Trường đã giao đề "${exam.title}" cho toàn thể ${currentClass.name}!`);
    setTimeout(() => setNotification(''), 4000);
  };

  // THAO TÁC TẠO ĐỀ KIỂM TRA MỚI
  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;
    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      grade: newExamGrade as any,
      title: newExamTitle.trim(),
      examType: newExamType,
      durationMin: newExamDuration,
      questionsCount: newExamDuration >= 45 ? 40 : 20,
      isLocked: false,
      questions: [],
    };
    setExams(prev => [newExam, ...prev]);
    setShowCreateExamModal(false);
    setNewExamTitle('');
    setNotification(`✅ Đã tạo thành công đề kiểm tra: "${newExam.title}" (Khối ${newExam.grade})`);
    setTimeout(() => setNotification(''), 4000);
  };

  // THAO TÁC GIAO BÀI TẬP VỀ NHÀ CHO LỚP
  const handleAssignHomework = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(`📚 Đã giao bài tập về nhà Tiết ${hwLessonNum} cho học sinh ${currentClass.name}! Hạn nộp: ${hwDueDate}`);
    setShowAssignHwModal(false);
    setTimeout(() => setNotification(''), 4500);
  };

  // THAO TÁC CHẤM BÀI TẬP VỀ NHÀ THEO TT22 / THANG 10
  const handleSaveGradeHomework = (subId: string) => {
    const finalFeedback = hwEvalType === 'tt22'
      ? `[Đánh giá TT22: ${hwTt22Result}] ${hwFeedback}`
      : hwFeedback;
    const numScore = hwEvalType === 'tt22' ? (hwTt22Result === 'Đạt' ? 10 : 5) : (parseFloat(hwScore) || 10);

    const updated = homeworkSubs.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          grade: numScore,
          feedback: finalFeedback,
          status: 'graded' as const
        };
      }
      return s;
    });
    setHomeworkSubs(updated);
    setGradingHwId(null);
    setNotification(hwEvalType === 'tt22'
      ? `✅ Đã lưu đánh giá Thông tư 22 (${hwTt22Result}) và phản hồi cho học sinh!`
      : `✅ Đã lưu điểm ${numScore}đ và lời phê bài tập về nhà thành công!`);
    setTimeout(() => setNotification(''), 3500);
  };

  // THAO TÁC CHỈ ĐỊNH / HỦY CHỈ ĐỊNH HỌC SINH GIỎI (HSG)
  const handleToggleHSG = (studentCode: string) => {
    const currentlyHSG = isStudentDesignatedHSG(studentCode);
    const nextHSG = !currentlyHSG;
    setStudentDesignatedHSG(studentCode, nextHSG);
    setNotification(nextHSG
      ? `⭐ Đã chỉ định học sinh ${studentCode} vào Đội tuyển HSG. Em đã được mở chức năng Lập Trình Python!`
      : `Đã hủy chỉ định HSG đối với học sinh ${studentCode}.`);
    setTimeout(() => setNotification(''), 4000);
  };

  // THAO TÁC RESET MẬT KHẨU VỀ 123
  const handleResetPassword = (st: Student) => {
    setNotification(`🔑 Đã đặt lại mật khẩu học sinh "${st.fullName}" (${st.studentCode}) về mặc định: 123`);
    setTimeout(() => setNotification(''), 4000);
  };

  // THAO TÁC THÊM HỌC SINH MỚI VÀO LỚP
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const cleanClassCode = currentClass.classCode || currentClass.name.replace('Lớp ', '');
    const nextIdx = classStudents.length + 1;
    const studentCode = `${cleanClassCode}${nextIdx.toString().padStart(2, '0')}`;

    const newSt: Student = {
      id: `st-custom-${Date.now()}`,
      classId: currentClass.id,
      className: currentClass.name,
      studentCode,
      fullName: newStudentName.trim(),
      dob: newStudentDob,
      password: '123',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${studentCode}`,
      totalXp: 100,
      level: 1,
      streakDays: 1,
      completedTasks: 0,
      averageGrade: 8.5,
      progressScore: 8.5,
      codeScore: 8.0,
      contributionScore: 8.0,
      badgesCount: 1
    };

    setStudentList(prev => [...prev, newSt]);
    // Cập nhật sĩ số lớp
    setClassList(prev => prev.map(c => c.id === currentClass.id ? { ...c, studentCount: c.studentCount + 1 } : c));
    setShowAddStudentModal(false);
    setNewStudentName('');
    setNotification(`✅ Đã thêm học sinh mới: ${newSt.fullName} (Mã HS: ${newSt.studentCode} · Mật khẩu: 123)`);
    setTimeout(() => setNotification(''), 4000);
  };

  // THAO TÁC SỬA HỌC SINH
  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !newStudentName.trim()) return;
    setStudentList(prev => prev.map(s => s.id === editingStudent.id ? { ...s, fullName: newStudentName.trim(), dob: newStudentDob } : s));
    setShowEditStudentModal(false);
    setEditingStudent(null);
    setNotification(`✅ Đã cập nhật thông tin học sinh: ${newStudentName.trim()}`);
    setTimeout(() => setNotification(''), 3000);
  };

  // THAO TÁC XOÁ HỌC SINH
  const handleDeleteStudent = (studentId: string, studentName: string) => {
    if (confirm(`Thầy có chắc chắn muốn xoá học sinh "${studentName}" khỏi lớp ${currentClass.name}?`)) {
      setStudentList(prev => prev.filter(s => s.id !== studentId));
      setClassList(prev => prev.map(c => c.id === currentClass.id ? { ...c, studentCount: Math.max(0, c.studentCount - 1) } : c));
      setNotification(`🗑️ Đã xoá học sinh "${studentName}" khỏi danh sách lớp.`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // THAO TÁC THÊM LỚP HỌC MỚI
  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    const formattedName = newClassName.trim().startsWith('Lớp') ? newClassName.trim() : `Lớp ${newClassName.trim()}`;
    const code = formattedName.replace('Lớp ', '').replace(/\s+/g, '');
    const newClass: ClassItem = {
      id: `c-custom-${Date.now()}`,
      grade: newClassGrade as any,
      name: formattedName,
      classCode: code,
      studentCount: 0,
    };
    setClassList(prev => [...prev, newClass]);
    setSelectedGradeFilter(newClassGrade);
    setSelectedClassId(newClass.id);
    setShowAddClassModal(false);
    setNewClassName('');
    setNotification(`✅ Đã thêm lớp mới: "${formattedName}" (Khối ${newClassGrade})`);
    setTimeout(() => setNotification(''), 4000);
  };

  // THAO TÁC SỬA TÊN LỚP
  const handleEditClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClassName.trim()) return;
    const formattedName = editClassName.trim().startsWith('Lớp') ? editClassName.trim() : `Lớp ${editClassName.trim()}`;
    setClassList(prev => prev.map(c => c.id === currentClass.id ? { ...c, name: formattedName } : c));
    setShowEditClassModal(false);
    setNotification(`✅ Đã đổi tên lớp thành: "${formattedName}"`);
    setTimeout(() => setNotification(''), 3000);
  };

  // THAO TÁC XOÁ LỚP
  const handleDeleteClass = (classId: string, className: string) => {
    if (confirm(`CẢNH BÁO: Thầy có chắc chắn muốn xoá ${className}? Tất cả học sinh thuộc lớp này sẽ bị gỡ bỏ.`)) {
      const remaining = classList.filter(c => c.id !== classId);
      setClassList(remaining);
      setStudentList(prev => prev.filter(s => s.classId !== classId));
      if (remaining.length > 0) {
        setSelectedClassId(remaining[0].id);
        setSelectedGradeFilter(remaining[0].grade);
        selectClassForClassroom(remaining[0].id, remaining[0].name, remaining[0].grade);
      }
      setNotification(`🗑️ Đã xoá ${className} thành công.`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // KIỂM TRA PHÂN QUYỀN RBAC NẾU HỌC SINH CỐ TÌNH TRUY CẬP
  if (currentUser && currentUser.role === 'student') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-lg border border-rose-200">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider">
            Phân quyền bảo mật (RBAC)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Truy Cập Bị Từ Chối — Quyền Giáo Viên
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            Kênh Giáo Viên dành riêng cho <strong>Thầy Đỗ Mạnh Trường</strong> để quản lý lớp học số, chấm bài và điều phối tiết dạy.<br />
            Tài khoản của em là <strong>{currentUser.studentName}</strong> ({currentUser.studentClass}) chỉ có quyền thao tác trên Không gian học sinh.
          </p>
        </div>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/in-class"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <span>Vào Lớp Học Số</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login?role=teacher"
            className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
          >
            Đăng nhập tài khoản Giáo viên
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* ==================================================================== */}
      {/* 1. BANNER CHÍNH THỨC CỦA THẦY ĐỖ MẠNH TRƯỜNG */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <School className="w-3.5 h-3.5 text-blue-200" />
            <span>THCS Mão Điền · Giáo Viên Phụ Trách: Thầy Đỗ Mạnh Trường</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Bàn Quản Lý &amp; Điều Phối Giáo Viên
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Quản trị tập trung <strong>Lớp học số</strong> · Đồng bộ 24 máy trạm · Quản lý học sinh · Bài kiểm tra &amp; Bài tập về nhà
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportStudentsToExcel(studentList, 'Danh_Sach_Toan_Truong_THCS_Mao_Dien.xls')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Tải Excel Toàn Trường ({studentList.length} HS)</span>
          </button>
          
          <button
            onClick={() => setShowDriveConfig(!showDriveConfig)}
            className="px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all flex items-center gap-2 border border-white/20"
            title="Cấu hình Google Drive kết nối nộp bài phòng máy"
          >
            <Cloud className="w-4 h-4 text-teal-300" />
            <span>Drive Thực Hành</span>
          </button>
        </div>
      </div>

      {/* CẤU HÌNH DRIVE COLLAPSIBLE */}
      {showDriveConfig && (
        <div className="bg-white rounded-3xl border border-teal-200 p-6 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Cloud className="w-5 h-5 text-teal-600" />
              <span>Cấu hình Google Apps Script Web App (Tự động lưu bài về Drive Thầy Trường)</span>
            </div>
            <button onClick={() => setShowDriveConfig(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Dán URL triển khai Web App từ Google Apps Script liên kết với thư mục Drive <code>H:\My Drive\Giảng dạy\2024-2025\ThucHanh</code>
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={gasUrlInput}
              onChange={(e) => setGasUrlInput(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
            <button
              onClick={() => {
                setGasWebAppUrl(gasUrlInput);
                setNotification('Đã lưu cấu hình Google Drive Web App URL thành công!');
                setTimeout(() => setNotification(''), 3000);
              }}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs shrink-0"
            >
              Lưu cấu hình
            </button>
          </div>
        </div>
      )}

      {/* THÔNG BÁO POPUP */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-sm animate-slideDown">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. CHỌN LỚP GIẢNG DẠY (HIỂN THỊ MẶC ĐỊNH KHỐI 6 - BỎ TẤT CẢ LỚP!) */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Chọn Lớp Giảng Dạy &amp; Điều Phối:
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
              Đang chọn: {currentClass.name}
            </span>
          </div>

          {/* BỘ LỌC KHỐI: CHỈ GỒM 6, 7, 8, 9 (BỎ HOÀN TOÀN 'TẤT CẢ LỚP'!) */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
            {[6, 7, 8, 9].map((g) => (
              <button
                key={g}
                onClick={() => handleSelectGrade(g)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedGradeFilter === g
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                Khối {g}
              </button>
            ))}
          </div>
        </div>

        {/* DANH SÁCH LỚP CỦA KHỐI ĐƯỢC CHỌN (1-CLICK ĐIỀU PHỐI) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {displayClasses.map((cls) => {
            const isSelected = selectedClassId === cls.id;
            return (
              <button
                key={cls.id}
                onClick={() => handleSelectClass(cls)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-500/30'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Khối {cls.grade}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {cls.classCode}
                  </span>
                </div>
                <h3 className={`font-black text-sm mt-1.5 ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                  {cls.name}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5 flex items-center justify-between">
                  <span>{cls.studentCount} học sinh</span>
                  {isSelected && <span className="text-[10px] font-bold text-blue-600">● Đang dạy</span>}
                </p>
              </button>
            );
          })}

          {/* NÚT THÊM LỚP MỚI */}
          <button
            onClick={() => {
              setNewClassGrade(selectedGradeFilter);
              setShowAddClassModal(true);
            }}
            className="p-3.5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-500 hover:text-blue-600 transition-all flex flex-col items-center justify-center gap-1 text-center font-bold text-xs"
          >
            <PlusCircle className="w-5 h-5 text-blue-500" />
            <span>Thêm lớp mới</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. BỐN TAB QUẢN TRỊ CỐT LÕI THEO YÊU CẦU CỦA THẦY TRƯỜNG */}
      {/* ==================================================================== */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-200 gap-2 sm:gap-4 text-xs sm:text-sm font-extrabold overflow-x-auto no-scrollbar">
          
          {/* TAB 1: LỚP HỌC SỐ */}
          <button
            onClick={() => setActiveTab('in-class')}
            className={`pb-3 px-3 flex items-center gap-2 whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'in-class'
                ? 'border-b-2 border-blue-600 text-blue-600 font-black'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Radio className={`w-4 h-4 ${activeTab === 'in-class' ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} />
            <span>1. Lớp Học Số (Điều Khiển &amp; Chấm Điểm)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">5 Phân Hệ</span>
          </button>

          {/* TAB 2: QUẢN LÝ LỚP & HỌC SINH */}
          <button
            onClick={() => setActiveTab('class-roster')}
            className={`pb-3 px-3 flex items-center gap-2 whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'class-roster'
                ? 'border-b-2 border-indigo-600 text-indigo-600 font-black'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2. Quản Lý Lớp &amp; Tài Khoản HS</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 text-[10px]">
              {classStudents.length} HS
            </span>
          </button>

          {/* TAB 3: QUẢN LÝ BÀI KIỂM TRA */}
          <button
            onClick={() => setActiveTab('exams')}
            className={`pb-3 px-3 flex items-center gap-2 whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'exams'
                ? 'border-b-2 border-purple-600 text-purple-600 font-black'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>3. Quản Lý Bài Kiểm Tra</span>
            <span className="px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
              {exams.filter(e => e.grade === selectedGradeFilter).length} Đề
            </span>
          </button>

          {/* TAB 4: BÀI TẬP VỀ NHÀ */}
          <button
            onClick={() => setActiveTab('homework')}
            className={`pb-3 px-3 flex items-center gap-2 whitespace-nowrap shrink-0 transition-all ${
              activeTab === 'homework'
                ? 'border-b-2 border-amber-600 text-amber-600 font-black'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>4. Bài Tập Về Nhà</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              Giao &amp; Chấm TT22
            </span>
          </button>
        </div>

        {/* ================================================================== */}
        {/* NỘI DUNG TAB 1: LỚP HỌC SỐ (TẬP TRUNG 5 PHÂN HỆ) */}
        {/* ================================================================== */}
        {activeTab === 'in-class' && (
          <ClassroomCommandCenter
            currentClass={currentClass}
            classStudents={classStudents}
            onSelectClass={(id) => {
              const cls = classList.find(c => c.id === id);
              if (cls) handleSelectClass(cls);
            }}
          />
        )}

        {/* ================================================================== */}
        {/* NỘI DUNG TAB 2: QUẢN LÝ LỚP HỌC & TÀI KHOẢN HỌC SINH */}
        {/* ================================================================== */}
        {activeTab === 'class-roster' && (
          <div className="space-y-6">
            
            {/* THẺ ĐIỀU HÀNH LỚP HIỆN TẠI */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xl text-slate-900">
                    {currentClass.name} — Khối {currentClass.grade}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold font-mono">
                    Mã: {currentClass.classCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Sĩ số: {classStudents.length} học sinh
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Mật khẩu mặc định: <strong>123</strong> · Cặp đôi kỹ thuật viên &amp; thư ký trên 24 máy trạm
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setEditClassName(currentClass.name);
                    setShowEditClassModal(true);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Sửa thông tin lớp</span>
                </button>

                <button
                  onClick={() => handleDeleteClass(currentClass.id, currentClass.name)}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Xoá lớp</span>
                </button>

                <button
                  onClick={() => {
                    setNewStudentName('');
                    setShowAddStudentModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Thêm học sinh</span>
                </button>

                <button
                  onClick={() => exportStudentsToExcel(classStudents, `Danh_Sach_${currentClass.name}_THCS_Mao_Dien.xls`)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Xuất Excel lớp</span>
                </button>
              </div>
            </div>

            {/* DANH SÁCH HỌC SINH CỦA LỚP */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm theo họ tên, mã HS hoặc ngày sinh..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Hiển thị: <strong>{filteredStudents.length}</strong> / {classStudents.length} học sinh
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3 text-center w-12">STT</th>
                      <th className="py-3 px-3">Mã Đăng Nhập</th>
                      <th className="py-3 px-4">Họ và Tên Học Sinh</th>
                      <th className="py-3 px-3 text-center">Ngày Sinh</th>
                      <th className="py-3 px-3 text-center">Mật Khẩu</th>
                      <th className="py-3 px-3 text-center">Điểm TB</th>
                      <th className="py-3 px-3 text-center">Đội Tuyển HSG</th>
                      <th className="py-3 px-3 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredStudents.map((st, idx) => {
                      const isHSG = isStudentDesignatedHSG(st.studentCode);

                      return (
                        <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                          <td className="py-3 px-3 font-mono font-bold text-blue-700">
                            <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                              {st.studentCode}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {st.fullName}
                          </td>
                          <td className="py-3 px-3 text-center text-slate-500 font-mono">
                            {st.dob || '—'}
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">
                            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                              {st.password || '123'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center font-black text-blue-600">
                            {st.averageGrade}/10
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleHSG(st.studentCode)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all flex items-center gap-1 mx-auto ${
                                isHSG
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                              }`}
                              title={isHSG ? 'Bấm để hủy chỉ định HSG' : 'Bấm để chỉ định vào Đội tuyển HSG (Mở Lập Trình Python)'}
                            >
                              <Star className={`w-3 h-3 ${isHSG ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                              <span>{isHSG ? '⭐ Đội tuyển HSG' : 'Học sinh đại trà'}</span>
                            </button>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleResetPassword(st)}
                                className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-200 transition-colors"
                                title="Đặt lại mật khẩu về 123"
                              >
                                Reset MK
                              </button>
                              <button
                                onClick={() => {
                                  setEditingStudent(st);
                                  setNewStudentName(st.fullName);
                                  setNewStudentDob(st.dob || '2012-05-15');
                                  setShowEditStudentModal(true);
                                }}
                                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
                                title="Sửa thông tin"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(st.id, st.fullName)}
                                className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                                title="Xoá học sinh"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* NỘI DUNG TAB 3: QUẢN LÝ BÀI KIỂM TRA (TẠO ĐỀ, GIAO ĐỀ, KHOÁ/MỞ ĐỀ) */}
        {/* ================================================================== */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-purple-600" />
                  <span>Ngân Hàng Đề Kiểm Tra Định Kỳ · Khối {selectedGradeFilter}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đề kiểm tra trắc nghiệm &amp; thực hành chuẩn ma trận và bản đặc tả Bộ GD&ĐT (CV 3456 / QĐ 3439)
                </p>
              </div>

              <button
                onClick={() => {
                  setNewExamTitle(`Kiểm tra Định kỳ Tin học ${selectedGradeFilter} - ${currentClass.name}`);
                  setNewExamGrade(selectedGradeFilter);
                  setShowCreateExamModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Tạo Đề Thi Mới</span>
              </button>
            </div>

            {/* DANH SÁCH CÁC ĐỀ THI CỦA KHỐI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams.filter(e => e.grade === selectedGradeFilter).map((exam) => (
                <div key={exam.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase">
                        Khối {exam.grade} · {exam.examType}
                      </span>
                      <button
                        onClick={() => toggleLockExam(exam.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black transition-all ${
                          exam.isLocked
                            ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                            : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        }`}
                      >
                        {exam.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        <span>{exam.isLocked ? 'Đang Khóa' : 'Đang Mở'}</span>
                      </button>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                      {exam.title}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {exam.durationMin} phút
                      </span>
                      <span>•</span>
                      <span>{exam.questionsCount} câu hỏi</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleAssignExamToClass(exam)}
                      className="flex-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Giao đề cho {currentClass.name}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* BẢNG ĐIỂM KIỂM TRA ĐÁM MÂY SUPABASE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>Kết Quả Kiểm Tra Trực Tuyến Từ Đám Mây · {currentClass.name}</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Dữ liệu được lưu trữ trực tiếp trên Supabase PostgreSQL ngay khi học sinh hoàn thành nộp bài
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsLoadingExamResults(true);
                    fetchClassExamResultsFromCloud(currentClass.name)
                      .then(res => setExamResultsList(res))
                      .finally(() => setIsLoadingExamResults(false));
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingExamResults ? 'animate-spin' : ''}`} />
                  <span>Cập nhật bảng điểm</span>
                </button>
              </div>

              {examResultsList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3 text-center w-12">STT</th>
                        <th className="py-3 px-3">Mã HS</th>
                        <th className="py-3 px-4">Họ và tên</th>
                        <th className="py-3 px-3 text-center">Điểm số</th>
                        <th className="py-3 px-3 text-center">Xếp loại</th>
                        <th className="py-3 px-3 text-right">Thời gian nộp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {examResultsList.map((r, idx) => (
                        <tr key={r.id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                          <td className="py-3 px-3 font-mono font-bold text-blue-700">{r.studentCode}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{r.studentName}</td>
                          <td className="py-3 px-3 text-center font-black text-amber-600 text-sm">
                            {r.score ?? 10}đ
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {r.score >= 9 ? 'Xuất sắc' : r.score >= 8 ? 'Giỏi' : r.score >= 6.5 ? 'Khá' : 'Đạt'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right text-slate-400 font-mono text-[11px]">
                            {r.submittedAt ? new Date(r.submittedAt).toLocaleTimeString('vi-VN') : 'Vừa xong'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  Chưa có bài thi trực tuyến nào được gửi về từ {currentClass.name}. Khi học sinh nộp bài thi, kết quả sẽ hiển thị tức thì tại đây!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* NỘI DUNG TAB 4: BÀI TẬP VỀ NHÀ (GIAO BTVN, XEM NỘP & CHẤM TT22) */}
        {/* ================================================================== */}
        {activeTab === 'homework' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <span>Quản Lý &amp; Giao Bài Tập Về Nhà · {currentClass.name}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Giao bài tập củng cố, xem ảnh chụp trang vở của học sinh phóng to và chấm bài theo chuẩn <strong>Thông tư 22/2021/TT-BGDĐT</strong>
                </p>
              </div>

              <button
                onClick={() => setShowAssignHwModal(true)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Giao Bài Tập Mới</span>
              </button>
            </div>

            {/* DANH SÁCH BÀI TẬP VỀ NHÀ HỌC SINH ĐÃ NỘP */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">
                  Danh sách bài nộp của học sinh ({homeworkSubs.length} bài đã nộp)
                </h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[10px] uppercase">
                    <tr>
                      <th className="py-3 px-4">Học Sinh</th>
                      <th className="py-3 px-3">Lớp</th>
                      <th className="py-3 px-4">Tiêu Đề Bài Tập</th>
                      <th className="py-3 px-4">Tệp / Ảnh Vở Nộp</th>
                      <th className="py-3 px-3 text-center">Đánh Giá TT22</th>
                      <th className="py-3 px-4">Lời Phê Của Thầy</th>
                      <th className="py-3 px-3 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {homeworkSubs.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <div>{sub.studentName}</div>
                          <div className="font-mono text-[11px] text-slate-400 font-normal">{sub.studentCode}</div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-700">{sub.className}</td>
                        <td className="py-3 px-4 text-slate-800 max-w-xs truncate" title={sub.homeworkTitle}>
                          {sub.homeworkTitle}
                        </td>
                        <td className="py-3 px-4">
                          {sub.fileType === 'image' ? (
                            <button
                              onClick={() => {
                                setPreviewImage(sub.fileDataUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80');
                                setImageRotation(0);
                                setImageZoom(1);
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 font-bold text-[11px] transition-colors"
                            >
                              <Camera className="w-3.5 h-3.5 text-purple-600" />
                              <span>Xem ảnh vở</span>
                            </button>
                          ) : (
                            <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5 text-blue-500" />
                              <span>{sub.fileName || 'Tệp thực hành'}</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {sub.status === 'graded' ? (
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              (sub.grade || 0) >= 7 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {sub.feedback?.includes('Đạt') ? 'Đạt' : `${sub.grade}đ`}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                              Chờ chấm
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate text-[11px]">
                          {sub.feedback || <span className="text-slate-400 italic">Chưa nhận xét</span>}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              setGradingHwId(sub.id);
                              setHwScore(sub.grade ? String(sub.grade) : '10');
                              setHwFeedback(sub.feedback || 'Bài làm rất tốt, trình bày sạch đẹp!');
                            }}
                            className="px-3 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs transition-colors"
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

      </div>

      {/* ==================================================================== */}
      {/* 4. CÁC MODAL TƯƠNG TÁC (THÊM LỚP, SỬA LỚP, THÊM HS, GIAO BTVN, TẠO ĐỀ, CHẤM BÀI, XEM ẢNH) */}
      {/* ==================================================================== */}

      {/* MODAL THÊM LỚP MỚI */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-900">Thêm Lớp Học Mới</h3>
              <button onClick={() => setShowAddClassModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddClass} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Khối Lớp</label>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 7, 8, 9].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setNewClassGrade(g)}
                      className={`py-2 rounded-xl border text-center font-bold ${
                        newClassGrade === g ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      Khối {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Tên Lớp (Ví dụ: 6A14 hoặc Lớp 6A14)</label>
                <input
                  type="text"
                  required
                  placeholder="Lớp 6A14"
                  value={newClassName}
                  onChange={e => setNewClassName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Tạo Lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SỬA TÊN LỚP */}
      {showEditClassModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-900">Sửa Tên Lớp Học</h3>
              <button onClick={() => setShowEditClassModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditClass} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Tên Lớp Mới</label>
                <input
                  type="text"
                  required
                  value={editClassName}
                  onChange={e => setEditClassName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditClassModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL THÊM HỌC SINH MỚI */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-lg text-slate-900">Thêm Học Sinh Mới</h3>
                <p className="text-xs text-slate-500">Lớp: {currentClass.name}</p>
              </div>
              <button onClick={() => setShowAddStudentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Họ và Tên Học Sinh</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Ngày Sinh</label>
                <input
                  type="date"
                  value={newStudentDob}
                  onChange={e => setNewStudentDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                Mã học sinh sẽ được tự động tạo theo cú pháp lớp (VD: <strong>{currentClass.classCode}{(classStudents.length + 1).toString().padStart(2, '0')}</strong>) và mật khẩu mặc định là <strong>123</strong>.
              </p>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Thêm Vào Lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SỬA HỌC SINH */}
      {showEditStudentModal && editingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-lg text-slate-900">Sửa Thông Tin Học Sinh</h3>
                <p className="text-xs text-slate-500 font-mono">{editingStudent.studentCode}</p>
              </div>
              <button onClick={() => setShowEditStudentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEditStudent} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Họ và Tên</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Ngày Sinh</label>
                <input
                  type="date"
                  value={newStudentDob}
                  onChange={e => setNewStudentDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditStudentModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Lưu Thông Tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TẠO ĐỀ KIỂM TRA MỚI */}
      {showCreateExamModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-900">Tạo Đề Kiểm Tra Mới</h3>
              <button onClick={() => setShowCreateExamModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateExam} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Tiêu Đề Đề Thi</label>
                <input
                  type="text"
                  required
                  value={newExamTitle}
                  onChange={e => setNewExamTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Khối Lớp</label>
                  <select
                    value={newExamGrade}
                    onChange={e => setNewExamGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    {[6, 7, 8, 9].map(g => (
                      <option key={g} value={g}>Khối {g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Loại Đề</label>
                  <select
                    value={newExamType}
                    onChange={e => setNewExamType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    <option value="thường xuyên">Thường xuyên (15 phút)</option>
                    <option value="giữa kỳ">Giữa học kỳ (45 phút)</option>
                    <option value="cuối kỳ">Cuối học kỳ (45 phút)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Thời Lượng (Phút)</label>
                <input
                  type="number"
                  min="5"
                  max="90"
                  value={newExamDuration}
                  onChange={e => setNewExamDuration(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateExamModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Tạo Đề Thi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL GIAO BÀI TẬP VỀ NHÀ */}
      {showAssignHwModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-lg text-slate-900">Giao Bài Tập Về Nhà Mới</h3>
                <p className="text-xs text-slate-500">Giao cho: {currentClass.name}</p>
              </div>
              <button onClick={() => setShowAssignHwModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAssignHomework} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Tiết Học (Theo SGK Kết Nối Tri Thức)</label>
                <select
                  value={hwLessonNum}
                  onChange={e => setHwLessonNum(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                >
                  {Array.from({ length: 29 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>Tiết {num}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Tiêu Đề Bài Tập</label>
                <input
                  type="text"
                  required
                  value={hwTitle}
                  onChange={e => setHwTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Yêu Cầu Nộp Bài</label>
                <textarea
                  rows={2}
                  value={hwRequirement}
                  onChange={e => setHwRequirement(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Hạn Nộp</label>
                <input
                  type="text"
                  value={hwDueDate}
                  onChange={e => setHwDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAssignHwModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  Giao Bài Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CHẤM BÀI TẬP VỀ NHÀ */}
      {gradingHwId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-900">Chấm Bài Tập Về Nhà</h3>
              <button onClick={() => setGradingHwId(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Hình Thức Đánh Giá</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHwEvalType('tt22')}
                    className={`py-2 rounded-xl border font-bold ${
                      hwEvalType === 'tt22' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    Chuẩn TT 22 (Đạt / Chưa đạt)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHwEvalType('score')}
                    className={`py-2 rounded-xl border font-bold ${
                      hwEvalType === 'score' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    Thang Điểm 10
                  </button>
                </div>
              </div>

              {hwEvalType === 'tt22' ? (
                <div>
                  <label className="block text-slate-700 mb-1">Kết Quả TT 22</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setHwTt22Result('Đạt')}
                      className={`py-2 rounded-xl border font-black ${
                        hwTt22Result === 'Đạt' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      Đạt (Đ)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHwTt22Result('Chưa đạt')}
                      className={`py-2 rounded-xl border font-black ${
                        hwTt22Result === 'Chưa đạt' ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      Chưa Đạt (CĐ)
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-slate-700 mb-1">Điểm Số (Thang 10)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={hwScore}
                    onChange={e => setHwScore(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 mb-1">Lời Nhận Xét / Lời Phê Sư Phạm</label>
                <textarea
                  rows={3}
                  value={hwFeedback}
                  onChange={e => setHwFeedback(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGradingHwId(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveGradeHomework(gradingHwId)}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  Lưu Đánh Giá
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL XEM ẢNH VỞ HỌC SINH PHÓNG TO & XOAY */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-600" />
                <h3 className="font-black text-base text-slate-900">Xem Ảnh Vở Bài Tập Học Sinh</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setImageRotation(r => (r + 90) % 360)}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700"
                  title="Xoay 90 độ"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setImageZoom(z => Math.max(0.6, z - 0.2))}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700"
                  title="Thu nhỏ"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setImageZoom(z => Math.min(2.5, z + 0.2))}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700"
                  title="Phóng to"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center bg-slate-100 rounded-2xl p-4 min-h-[350px]">
              <img
                src={previewImage}
                alt="Trang vở học sinh"
                style={{
                  transform: `rotate(${imageRotation}deg) scale(${imageZoom})`,
                  transition: 'transform 0.2s ease-out'
                }}
                className="max-h-[60vh] object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function TeacherDashboard() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-bold space-y-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Đang tải Bàn Quản Lý Giáo Viên · Thầy Đỗ Mạnh Trường...</p>
      </div>
    }>
      <TeacherDashboardContent />
    </Suspense>
  );
}
