'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
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
  School,
  Save,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  MOCK_CLASSES,
  MOCK_STUDENTS,
  MOCK_EXAMS,
  MOCK_HOMEWORK_SUBMISSIONS,
  MOCK_IN_CLASS_LESSONS
} from '@/lib/mock-data';
import { ClassItem, Student, PracticalSubmission, HomeworkSubmission, Exam } from '@/lib/types';
import { getCurrentUser, UserSession, isStudentDesignatedHSG, setStudentDesignatedHSG } from '@/lib/auth';
import { CURRICULUM_DATA } from '@/lib/curriculum-data';
import { getGasWebAppUrl, setGasWebAppUrl } from '@/lib/google-drive-service';
import ClassroomCommandCenter from '@/components/ClassroomCommandCenter';
import { fetchClassExamResultsFromCloud, CloudExamResult } from '@/lib/supabase-service';
import { exportStudentsToExcel } from '@/lib/export-excel';
import {
  selectClassForClassroom,
  getClassroomState,
  subscribeToClassroomState,
  getSavedClasses,
  saveClasses
} from '@/lib/classroom-control';

export type TeacherTab = 'in-class' | 'class-roster' | 'exams' | 'homework' | 'gradebook';

export interface OfficialGradeRow {
  studentCode: string;
  fullName: string;
  className: string;
  tx1: number; // ĐĐGtx 1: Thực hành phòng máy
  tx2: number; // ĐĐGtx 2: Khám phá kiến thức
  tx3: number; // ĐĐGtx 3: Bài tập về nhà
  tx4: number; // ĐĐGtx 4: Kỹ năng số & AI
  gk: number;  // ĐĐGgk: Giữa kỳ (hệ số 2)
  ck: number;  // ĐĐGck: Cuối kỳ (hệ số 3)
  dtb: number; // Điểm trung bình học kỳ
  rank: 'Tốt' | 'Khá' | 'Đạt' | 'Chưa đạt';
  comment: string;
}

function TeacherDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  // ĐỒNG BỘ KHỐI & LỚP THEO TRẠNG THÁI HỆ THỐNG
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const cls = getClassroomState();
      if (cls.activeGrade) return cls.activeGrade;
    }
    return 7;
  });
  const [selectedClassId, setSelectedClassId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const cls = getClassroomState();
      if (cls.activeClassId) return cls.activeClassId;
    }
    return 'c-7a12';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');

  // 5 CHỨC NĂNG QUẢN TRỊ CHÍNH TÁCH RIÊNG HOÀN TOÀN
  const [activeTab, setActiveTab] = useState<TeacherTab>('in-class');
  const [initialSubFeature, setInitialSubFeature] = useState<'control' | 'grading' | 'homework' | 'grid' | 'ranking' | 'summary'>('control');

  // ĐỒNG BỘ QUERY PARAM URL (?tab=...&sub=...)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const subParam = searchParams.get('sub');
    if (tabParam === 'homework' || subParam === 'homework') {
      setActiveTab('in-class');
      setInitialSubFeature('homework');
    } else if (tabParam === 'class-roster' || tabParam === 'roster') {
      setActiveTab('class-roster');
    } else if (tabParam === 'exams') {
      setActiveTab('exams');
    } else if (tabParam === 'gradebook') {
      setActiveTab('gradebook');
    } else {
      setActiveTab('in-class');
      if (subParam) {
        setInitialSubFeature(subParam as any);
      }
    }
  }, [searchParams]);

  // LẮNG NGHE SỰ KIỆN CHUYỂN TAB TỪ THANH NAVBAR
  useEffect(() => {
    const handleTabSwitch = (e: any) => {
      if (e.detail) {
        const detailStr = String(e.detail);
        if (detailStr.includes('homework')) {
          setActiveTab('in-class');
          setInitialSubFeature('homework');
        } else if (detailStr.startsWith('in-class')) {
          setActiveTab('in-class');
          setInitialSubFeature('control');
        } else if (detailStr === 'class-roster') {
          setActiveTab('class-roster');
        } else if (detailStr === 'exams') {
          setActiveTab('exams');
        } else if (detailStr === 'gradebook') {
          setActiveTab('gradebook');
        }
      }
    };
    window.addEventListener('truong_tab_switch', handleTabSwitch);
    return () => window.removeEventListener('truong_tab_switch', handleTabSwitch);
  }, []);

  // HÀM CHUYỂN TAB ĐỒNG THỜI CẬP NHẬT URL
  const switchTab = (tab: TeacherTab) => {
    setActiveTab(tab);
    router.push(`/teacher?tab=${tab}`, { scroll: false });
  };

  // STATE DANH SÁCH LỚP VÀ HỌC SINH
  const [classList, setClassList] = useState<ClassItem[]>(getSavedClasses());
  const [studentList, setStudentList] = useState<Student[]>(MOCK_STUDENTS);

  // MODAL QUẢN LÝ LỚP HỌC
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

  // STATE ĐỀ THI & KIỂM TRA
  const [exams, setExams] = useState<Exam[]>(MOCK_EXAMS);
  const [showCreateExamModal, setShowCreateExamModal] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamGrade, setNewExamGrade] = useState<number>(6);
  const [newExamDuration, setNewExamDuration] = useState<number>(45);
  const [newExamType, setNewExamType] = useState<'thường xuyên' | 'giữa kỳ' | 'cuối kỳ'>('giữa kỳ');

  // STATE BÀI TẬP VỀ NHÀ
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

  // STATE KẾT QUẢ THI SUPABASE
  const [examResultsList, setExamResultsList] = useState<CloudExamResult[]>([]);
  const [isLoadingExamResults, setIsLoadingExamResults] = useState<boolean>(false);

  // STATE BẢNG ĐIỂM HỌC KỲ (GRADEBOOK)
  const [customGradebook, setCustomGradebook] = useState<Record<string, OfficialGradeRow>>({});
  const [editingStudentCode, setEditingStudentCode] = useState<string | null>(null);
  const [tempEditScores, setTempEditScores] = useState<Partial<OfficialGradeRow>>({});
  const [selectedSemester, setSelectedSemester] = useState<'hk1' | 'hk2' | 'year'>('hk1');

  // REFRESH HSG
  const [hsgVersion, setHsgVersion] = useState(0);

  useEffect(() => {
    setCurrentUser(getCurrentUser());

    // Đọc trạng thái lớp học số hiện tại từ LocalStorage nếu có
    const initialCls = getClassroomState();
    if (initialCls.activeClassId && initialCls.activeGrade) {
      setSelectedGradeFilter(initialCls.activeGrade);
      setSelectedClassId(initialCls.activeClassId);
    } else {
      selectClassForClassroom('c-6a10', 'Lớp 6A10', 6);
    }

    if (typeof window !== 'undefined') {
      try {
        const savedGb = localStorage.getItem('truong_official_gradebook');
        if (savedGb) {
          setCustomGradebook(JSON.parse(savedGb));
        }
      } catch (e) {}
    }

    const onHsgUpdate = () => setHsgVersion(v => v + 1);
    window.addEventListener('truong_hsg_update', onHsgUpdate);

    // Lắng nghe cập nhật lớp giảng dạy từ Navbar để đồng bộ tức thì toàn bộ 5 phân hệ
    const unsubClassroom = subscribeToClassroomState((newState) => {
      if (newState.activeClassId) {
        setSelectedClassId(newState.activeClassId);
      }
      if (newState.activeGrade) {
        setSelectedGradeFilter(newState.activeGrade);
      }
    });

    const handleClassesChange = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setClassList(e.detail);
      }
    };
    window.addEventListener('truong_classes_update', handleClassesChange);

    return () => {
      window.removeEventListener('truong_hsg_update', onHsgUpdate);
      unsubClassroom();
      window.removeEventListener('truong_classes_update', handleClassesChange);
    };
  }, []);

  // DANH SÁCH LỚP CỦA KHỐI ĐƯỢC CHỌN
  const displayClasses = useMemo(() => {
    return classList.filter(c => c.grade === selectedGradeFilter);
  }, [classList, selectedGradeFilter]);

  // DUY NHẤT 1 LỚP ĐƯỢC CHỌN CHO TOÀN BỘ CÔNG VIỆC CỦA GIÁO VIÊN VÀ HỌC SINH
  const currentClass = useMemo(() => {
    const found = classList.find(c => c.id === selectedClassId);
    if (found) return found;
    return displayClasses[0] || classList[0];
  }, [classList, selectedClassId, displayClasses]);

  // DANH SÁCH HỌC SINH CỦA ĐÚNG LỚP ĐƯỢC CHỌN
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

  // HÀM CHỌN LỚP: ĐIỀU PHỐI ĐỒNG BỘ NGAY SANG LỚP HỌC SỐ
  const handleSelectClass = (cls: ClassItem) => {
    setSelectedClassId(cls.id);
    setSelectedGradeFilter(cls.grade);
    selectClassForClassroom(cls.id, cls.name, cls.grade);
    setNotification(`⚡ Đã điều phối toàn bộ hệ thống sang ${cls.name} (Khối ${cls.grade}). 24 máy trạm và học liệu đã kích hoạt!`);
    setTimeout(() => setNotification(''), 4000);
  };

  // HÀM CHỌN KHỐI: TỰ ĐỘNG CHỌN LỚP ĐẦU TIÊN CỦA KHỐI VÀ ĐIỀU PHỐI
  const handleSelectGrade = (grade: number) => {
    setSelectedGradeFilter(grade);
    const firstClass = classList.find(c => c.grade === grade);
    if (firstClass) {
      setSelectedClassId(firstClass.id);
      selectClassForClassroom(firstClass.id, firstClass.name, firstClass.grade);
      setNotification(`⚡ Đã chọn Khối ${grade} · Lớp ${firstClass.name}`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // TẢI KẾT QUẢ THI TỪ SUPABASE KHI LỚP ĐƯỢC CHỌN THAY ĐỔI
  useEffect(() => {
    if (currentClass?.name) {
      setIsLoadingExamResults(true);
      fetchClassExamResultsFromCloud(currentClass.name)
        .then(res => setExamResultsList(res))
        .catch(err => console.error(err))
        .finally(() => setIsLoadingExamResults(false));
    }
  }, [currentClass?.name]);

  // TÍNH TOÁN BẢNG ĐIỂM HỌC KỲ CHO ĐÚNG LỚP ĐƯỢC CHỌN THEO TT22
  const gradebookRows: OfficialGradeRow[] = useMemo(() => {
    return classStudents.map((s, idx) => {
      if (customGradebook[s.studentCode]) {
        return customGradebook[s.studentCode];
      }

      const tx1 = Number((8.0 + (idx % 3) * 0.7).toFixed(1));
      const tx2 = Number((7.5 + ((idx * 2) % 4) * 0.6).toFixed(1));
      const tx3 = Number((8.5 + (idx % 2) * 1.0).toFixed(1));
      const tx4 = Number((8.0 + ((idx + 1) % 3) * 0.8).toFixed(1));
      const gk = Number((8.0 + (idx % 4) * 0.5).toFixed(1));
      const ck = Number((8.5 + ((idx + 2) % 3) * 0.6).toFixed(1));

      const sumTx = tx1 + tx2 + tx3 + tx4;
      const dtb = Number(((sumTx + 2 * gk + 3 * ck) / 9).toFixed(1));

      let rank: 'Tốt' | 'Khá' | 'Đạt' | 'Chưa đạt' = 'Tốt';
      let comment = 'Nắm vững kiến thức, kỹ năng thực hành xuất sắc!';
      if (dtb < 5.0) {
        rank = 'Chưa đạt';
        comment = 'Cần tăng cường rèn luyện thao tác máy tính tại phòng máy.';
      } else if (dtb < 6.5) {
        rank = 'Đạt';
        comment = 'Hoàn thành các yêu cầu cần đạt, cần tích cực làm BTVN.';
      } else if (dtb < 8.0) {
        rank = 'Khá';
        comment = 'Thao tác nhanh nhẹn, nắm chắc lý thuyết và bài tập thực hành.';
      } else {
        rank = 'Tốt';
        comment = 'Rất xuất sắc, tư duy logic tốt, tích cực hợp tác với bạn.';
      }

      return {
        studentCode: s.studentCode,
        fullName: s.fullName,
        className: currentClass.name,
        tx1,
        tx2,
        tx3,
        tx4,
        gk,
        ck,
        dtb,
        rank,
        comment,
      };
    });
  }, [classStudents, currentClass.name, customGradebook]);

  // THỐNG KÊ PHỔ ĐIỂM BẢNG ĐIỂM HỌC KỲ
  const gradeStats = useMemo(() => {
    const total = gradebookRows.length;
    if (total === 0) return { total: 0, tot: 0, kha: 0, dat: 0, chuaDat: 0, avgDtb: 0 };
    const tot = gradebookRows.filter(r => r.rank === 'Tốt').length;
    const kha = gradebookRows.filter(r => r.rank === 'Khá').length;
    const dat = gradebookRows.filter(r => r.rank === 'Đạt').length;
    const chuaDat = gradebookRows.filter(r => r.rank === 'Chưa đạt').length;
    const sumDtb = gradebookRows.reduce((acc, r) => acc + r.dtb, 0);
    return {
      total,
      tot,
      kha,
      dat,
      chuaDat,
      avgDtb: Number((sumDtb / total).toFixed(1)),
    };
  }, [gradebookRows]);

  // LƯU ĐIỂM CHỈNH SỬA VÀO BẢNG ĐIỂM HỌC KỲ
  const handleSaveGradeRow = (studentCode: string) => {
    const orig = gradebookRows.find(r => r.studentCode === studentCode);
    if (!orig) return;

    const tx1 = tempEditScores.tx1 !== undefined ? Number(tempEditScores.tx1) : orig.tx1;
    const tx2 = tempEditScores.tx2 !== undefined ? Number(tempEditScores.tx2) : orig.tx2;
    const tx3 = tempEditScores.tx3 !== undefined ? Number(tempEditScores.tx3) : orig.tx3;
    const tx4 = tempEditScores.tx4 !== undefined ? Number(tempEditScores.tx4) : orig.tx4;
    const gk = tempEditScores.gk !== undefined ? Number(tempEditScores.gk) : orig.gk;
    const ck = tempEditScores.ck !== undefined ? Number(tempEditScores.ck) : orig.ck;

    const sumTx = tx1 + tx2 + tx3 + tx4;
    const dtb = Number(((sumTx + 2 * gk + 3 * ck) / 9).toFixed(1));

    let rank: 'Tốt' | 'Khá' | 'Đạt' | 'Chưa đạt' = 'Tốt';
    if (dtb < 5.0) rank = 'Chưa đạt';
    else if (dtb < 6.5) rank = 'Đạt';
    else if (dtb < 8.0) rank = 'Khá';
    else rank = 'Tốt';

    const updatedRow: OfficialGradeRow = {
      ...orig,
      tx1,
      tx2,
      tx3,
      tx4,
      gk,
      ck,
      dtb,
      rank,
      comment: tempEditScores.comment !== undefined ? String(tempEditScores.comment) : orig.comment,
    };

    const nextBook = { ...customGradebook, [studentCode]: updatedRow };
    setCustomGradebook(nextBook);
    if (typeof window !== 'undefined') {
      localStorage.setItem('truong_official_gradebook', JSON.stringify(nextBook));
    }
    setEditingStudentCode(null);
    setTempEditScores({});
    setNotification(`✅ Đã lưu kết quả điểm học kỳ của học sinh ${orig.fullName} (${dtb}đ - ${rank})`);
    setTimeout(() => setNotification(''), 3500);
  };

  // KHÓA / MỞ ĐỀ KIỂM TRA
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

  // GIAO ĐỀ CHO LỚP ĐƯỢC CHỌN
  const handleAssignExamToClass = (exam: Exam) => {
    setNotification(`📋 Thầy Trường đã giao đề "${exam.title}" cho toàn thể ${currentClass.name}!`);
    setTimeout(() => setNotification(''), 4000);
  };

  // TẠO ĐỀ KIỂM TRA MỚI
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

  // GIAO BÀI TẬP VỀ NHÀ CHO LỚP
  const handleAssignHomework = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(`📚 Đã giao bài tập về nhà Tiết ${hwLessonNum} cho học sinh ${currentClass.name}! Hạn nộp: ${hwDueDate}`);
    setShowAssignHwModal(false);
    setTimeout(() => setNotification(''), 4500);
  };

  // CHẤM BÀI TẬP VỀ NHÀ THEO TT22 / THANG 10
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
      ? `✅ Đã lưu đánh giá Thông tư 22 (${hwTt22Result}) cho học sinh!`
      : `✅ Đã lưu điểm ${numScore}đ và lời phê bài tập về nhà thành công!`);
    setTimeout(() => setNotification(''), 3500);
  };

  // CHỈ ĐỊNH / HỦY CHỈ ĐỊNH HỌC SINH GIỎI (HSG)
  const handleToggleHSG = (studentCode: string) => {
    const currentlyHSG = isStudentDesignatedHSG(studentCode);
    const nextHSG = !currentlyHSG;
    setStudentDesignatedHSG(studentCode, nextHSG);
    setNotification(nextHSG
      ? `⭐ Đã chỉ định học sinh ${studentCode} vào Đội tuyển HSG. Em đã được mở chức năng Lập Trình Python!`
      : `Đã hủy chỉ định HSG đối với học sinh ${studentCode}.`);
    setTimeout(() => setNotification(''), 4000);
  };

  // ĐẶT LẠI MẬT KHẨU VỀ 123
  const handleResetPassword = (st: Student) => {
    setNotification(`🔑 Đã đặt lại mật khẩu học sinh "${st.fullName}" (${st.studentCode}) về mặc định: 123`);
    setTimeout(() => setNotification(''), 4000);
  };

  // THÊM HỌC SINH MỚI
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
    setClassList(prev => prev.map(c => c.id === currentClass.id ? { ...c, studentCount: c.studentCount + 1 } : c));
    setShowAddStudentModal(false);
    setNewStudentName('');
    setNotification(`✅ Đã thêm học sinh mới: ${newSt.fullName} (Mã HS: ${newSt.studentCode} · Mật khẩu: 123)`);
    setTimeout(() => setNotification(''), 4000);
  };

  // SỬA HỌC SINH
  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !newStudentName.trim()) return;
    setStudentList(prev => prev.map(s => s.id === editingStudent.id ? { ...s, fullName: newStudentName.trim(), dob: newStudentDob } : s));
    setShowEditStudentModal(false);
    setEditingStudent(null);
    setNotification(`✅ Đã cập nhật thông tin học sinh: ${newStudentName.trim()}`);
    setTimeout(() => setNotification(''), 3000);
  };

  // XOÁ HỌC SINH
  const handleDeleteStudent = (studentId: string, studentName: string) => {
    if (confirm(`Thầy có chắc chắn muốn xoá học sinh "${studentName}" khỏi lớp ${currentClass.name}?`)) {
      setStudentList(prev => prev.filter(s => s.id !== studentId));
      setClassList(prev => prev.map(c => c.id === currentClass.id ? { ...c, studentCount: Math.max(0, c.studentCount - 1) } : c));
      setNotification(`🗑️ Đã xoá học sinh "${studentName}" khỏi danh sách lớp.`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  // THÊM LỚP MỚI
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
    const updated = [...classList, newClass];
    setClassList(updated);
    saveClasses(updated);
    setSelectedGradeFilter(newClassGrade);
    setSelectedClassId(newClass.id);
    selectClassForClassroom(newClass.id, newClass.name, newClass.grade);
    setShowAddClassModal(false);
    setNewClassName('');
    setNotification(`✅ Đã thêm lớp mới: "${formattedName}" (Khối ${newClassGrade})`);
    setTimeout(() => setNotification(''), 4000);
  };

  // SỬA TÊN LỚP
  const handleEditClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClassName.trim()) return;
    const formattedName = editClassName.trim().startsWith('Lớp') ? editClassName.trim() : `Lớp ${editClassName.trim()}`;
    const updated = classList.map(c => c.id === currentClass.id ? { ...c, name: formattedName } : c);
    setClassList(updated);
    saveClasses(updated);
    setShowEditClassModal(false);
    setNotification(`✅ Đã đổi tên lớp thành: "${formattedName}"`);
    setTimeout(() => setNotification(''), 3000);
  };

  // XOÁ LỚP
  const handleDeleteClass = (classId: string, className: string) => {
    if (confirm(`CẢNH BÁO: Thầy có chắc chắn muốn xoá ${className}? Tất cả học sinh thuộc lớp này sẽ bị gỡ bỏ.`)) {
      const remaining = classList.filter(c => c.id !== classId);
      setClassList(remaining);
      saveClasses(remaining);
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

  // XUẤT SỔ ĐIỂM HỌC KỲ RA EXCEL
  const handleExportGradebookExcel = () => {
    const filename = `So_Diem_Hoc_Ky_${currentClass.name.replace(/\s+/g, '_')}_THCS_Mao_Dien.xls`;
    let tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
        <style>
          table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 11pt; }
          th { background-color: #2d7d6f; color: #ffffff; font-weight: bold; border: 1px solid #999999; text-align: center; padding: 6px; }
          td { border: 1px solid #cccccc; padding: 5px; }
          .center { text-align: center; }
          .number { text-align: right; }
          .title { font-size: 14pt; font-weight: bold; text-align: center; color: #1a365d; }
          .sub-title { font-size: 11pt; text-align: center; font-style: italic; color: #4a5568; }
        </style>
      </head>
      <body>
        <table>
          <tr><td colspan="12" class="title">SỔ ĐÁNH GIÁ ĐỊNH KỲ MÔN TIN HỌC (CHUẨN THÔNG TƯ 22)</td></tr>
          <tr><td colspan="12" class="sub-title">Trường THCS Mão Điền · Giáo viên phụ trách: Thầy Đỗ Mạnh Trường · ${currentClass.name} (Khối ${currentClass.grade})</td></tr>
          <tr><td colspan="12"></td></tr>
          <tr>
            <th>STT</th>
            <th>Mã Học Sinh</th>
            <th>Họ và Tên Học Sinh</th>
            <th>Lớp</th>
            <th>ĐĐGtx 1</th>
            <th>ĐĐGtx 2</th>
            <th>ĐĐGtx 3</th>
            <th>ĐĐGtx 4</th>
            <th>ĐĐGgk (x2)</th>
            <th>ĐĐGck (x3)</th>
            <th>ĐTB Học Kỳ</th>
            <th>Mức Đánh Giá</th>
          </tr>
    `;

    gradebookRows.forEach((r, idx) => {
      tableHtml += `
        <tr>
          <td class="center">${idx + 1}</td>
          <td class="center" style="mso-number-format:'\\@'; font-weight:bold;">${r.studentCode}</td>
          <td>${r.fullName}</td>
          <td class="center">${r.className}</td>
          <td class="number">${r.tx1}</td>
          <td class="number">${r.tx2}</td>
          <td class="number">${r.tx3}</td>
          <td class="number">${r.tx4}</td>
          <td class="number" style="font-weight:bold;">${r.gk}</td>
          <td class="number" style="font-weight:bold;">${r.ck}</td>
          <td class="number" style="font-weight:bold; color:#b45309;">${r.dtb}</td>
          <td class="center" style="font-weight:bold;">${r.rank}</td>
        </tr>
      `;
    });

    tableHtml += `</table></body></html>`;

    const blob = new Blob(['\ufeff' + tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setNotification(`📥 Đã xuất thành công Sổ điểm Excel của ${currentClass.name}!`);
    setTimeout(() => setNotification(''), 3000);
  };

  // KIỂM TRA PHÂN QUYỀN RBAC NẾU HỌC SINH VÀO NHẦM
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
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ==================================================================== */}
      {/* NỘI DUNG CHÍNH (TOÀN BỘ 5 PHÂN HỆ ĐỒNG BỘ THEO LỚP ĐƯỢC CHỌN TỪ NAVBAR) */}
      {/* ==================================================================== */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 space-y-4">

      {/* THÔNG BÁO HỆ THỐNG */}
      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-xs animate-slideDown">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* ================================================================== */}
      {/* NỘI DUNG CHỨC NĂNG THEO LỰA CHỌN TỪ THANH MENU NAVBAR             */}
      {/* ================================================================== */}
      {activeTab === 'in-class' && (
          <ClassroomCommandCenter
            currentClass={currentClass}
            classStudents={classStudents}
            initialSubFeature={initialSubFeature}
            onSelectClass={(id) => {
              const cls = classList.find(c => c.id === id);
              if (cls) handleSelectClass(cls);
            }}
          />
        )}

        {/* ================================================================== */}
        {/* TAB 2: QUẢN LÝ LỚP & HỌC SINH (CHỈ THỰC HIỆN TRÊN ĐÚNG 1 LỚP NÀY)   */}
        {/* ================================================================== */}
        {activeTab === 'class-roster' && (
          <div className="space-y-5">
            {/* THẺ ĐIỀU HÀNH LỚP HIỆN TẠI */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xl text-slate-900">
                    Danh Sách Học Sinh {currentClass.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold font-mono">
                    Mã: {currentClass.classCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Sĩ số: {classStudents.length} em
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Mật khẩu mặc định: <strong>123</strong> · Cặp đôi phân vai Kỹ thuật viên (🖱️) &amp; Thư ký (✍️)
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
                  <span>Sửa tên lớp</span>
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
                  <span>Xuất Excel</span>
                </button>
              </div>
            </div>

            {/* DANH SÁCH HỌC SINH CỦA LỚP */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
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
        {/* TAB 3: QUẢN LÝ BÀI KIỂM TRA (GIAO ĐỀ CHO ĐÚNG 1 LỚP NÀY)           */}
        {/* ================================================================== */}
        {activeTab === 'exams' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-purple-600" />
                  <span>Ngân Hàng Đề Kiểm Tra Định Kỳ · Khối {selectedGradeFilter}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đề kiểm tra trắc nghiệm &amp; thực hành chuẩn ma trận Bộ GD&ĐT (CV 3456 / QĐ 3439)
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
                <div key={exam.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
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

            {/* BẢNG ĐIỂM KIỂM TRA ĐÁM MÂY CỦA ĐÚNG 1 LỚP NÀY */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-black text-base text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>Kết Quả Kiểm Tra Trực Tuyến Từ Đám Mây · {currentClass.name}</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Dữ liệu được lưu trữ trực tiếp trên Supabase PostgreSQL ngay khi học sinh {currentClass.name} nộp bài thi
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
        {/* TAB 4: BÀI TẬP VỀ NHÀ (ĐÃ DI CHUYỂN VÀO LỚP HỌC SỐ & ẤN ĐỊNH THEO TIẾT) */}
        {/* ================================================================== */}
        {activeTab === 'homework' && (
          <ClassroomCommandCenter
            currentClass={currentClass}
            classStudents={classStudents}
            initialSubFeature="homework"
            onSelectClass={(id) => {
              const cls = classList.find(c => c.id === id);
              if (cls) handleSelectClass(cls);
            }}
          />
        )}

        {/* ================================================================== */}
        {/* TAB 5: BẢNG ĐIỂM HỌC KỲ (SỔ ĐIỂM ĐIỆN TỬ TT22 CỦA ĐÚNG 1 LỚP NÀY)   */}
        {/* ================================================================== */}
        {activeTab === 'gradebook' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xl text-slate-900">
                    Sổ Đánh Giá Học Kỳ · {currentClass.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                    Thông Tư 22/2021/TT-BGDĐT
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Đánh giá kết quả rèn luyện và học tập môn Tin học: <strong>ĐĐGtx (x1)</strong>, <strong>ĐĐGgk (x2)</strong>, <strong>ĐĐGck (x3)</strong>
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  {(['hk1', 'hk2', 'year'] as const).map(sem => (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        selectedSemester === sem ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {sem === 'hk1' ? 'Học kỳ I' : sem === 'hk2' ? 'Học kỳ II' : 'Cả năm'}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleExportGradebookExcel}
                  className="px-4 py-2 rounded-xl bg-[#2d7d6f] hover:bg-[#207264] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Xuất Sổ Điểm Excel</span>
                </button>
              </div>
            </div>

            {/* THỐNG KÊ PHỔ ĐIỂM LỚP */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-500 block">Sĩ số lớp</span>
                <span className="text-xl font-black text-slate-900">{gradeStats.total} em</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
                <span className="text-[11px] font-bold text-emerald-700 block">Mức Tốt</span>
                <span className="text-xl font-black text-emerald-900">{gradeStats.tot} em ({gradeStats.total ? Math.round((gradeStats.tot/gradeStats.total)*100) : 0}%)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 shadow-2xs">
                <span className="text-[11px] font-bold text-blue-700 block">Mức Khá</span>
                <span className="text-xl font-black text-blue-900">{gradeStats.kha} em ({gradeStats.total ? Math.round((gradeStats.kha/gradeStats.total)*100) : 0}%)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs">
                <span className="text-[11px] font-bold text-amber-700 block">Mức Đạt</span>
                <span className="text-xl font-black text-amber-900">{gradeStats.dat} em ({gradeStats.total ? Math.round((gradeStats.dat/gradeStats.total)*100) : 0}%)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 shadow-2xs">
                <span className="text-[11px] font-bold text-teal-700 block">ĐTB Chung</span>
                <span className="text-xl font-black text-teal-900">{gradeStats.avgDtb}/10</span>
              </div>
            </div>

            {/* BẢNG ĐIỂM CHÍNH THỨC CỦA LỚP */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-2 text-center w-10">STT</th>
                      <th className="py-3 px-3">Mã HS</th>
                      <th className="py-3 px-4">Họ và Tên Học Sinh</th>
                      <th className="py-3 px-2 text-center">TX1</th>
                      <th className="py-3 px-2 text-center">TX2</th>
                      <th className="py-3 px-2 text-center">TX3</th>
                      <th className="py-3 px-2 text-center">TX4</th>
                      <th className="py-3 px-2 text-center bg-indigo-50/50">GK (x2)</th>
                      <th className="py-3 px-2 text-center bg-purple-50/50">CK (x3)</th>
                      <th className="py-3 px-2 text-center bg-amber-50/70 font-black">ĐTB</th>
                      <th className="py-3 px-3 text-center">Xếp Loại</th>
                      <th className="py-3 px-3">Lời Nhận Xét</th>
                      <th className="py-3 px-2 text-right">Sửa Điểm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {gradebookRows.map((r, idx) => {
                      const isEditing = editingStudentCode === r.studentCode;

                      return (
                        <tr key={r.studentCode} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-2 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                          <td className="py-3 px-3 font-mono font-bold text-blue-700">{r.studentCode}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{r.fullName}</td>

                          {/* ĐIỂM TX1 */}
                          <td className="py-3 px-2 text-center">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                max="10"
                                defaultValue={r.tx1}
                                onChange={e => setTempEditScores(p => ({ ...p, tx1: parseFloat(e.target.value) }))}
                                className="w-12 text-center py-0.5 border rounded"
                              />
                            ) : (
                              <span>{r.tx1}</span>
                            )}
                          </td>

                          {/* ĐIỂM TX2 */}
                          <td className="py-3 px-2 text-center">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                max="10"
                                defaultValue={r.tx2}
                                onChange={e => setTempEditScores(p => ({ ...p, tx2: parseFloat(e.target.value) }))}
                                className="w-12 text-center py-0.5 border rounded"
                              />
                            ) : (
                              <span>{r.tx2}</span>
                            )}
                          </td>

                          {/* ĐIỂM TX3 */}
                          <td className="py-3 px-2 text-center">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                max="10"
                                defaultValue={r.tx3}
                                onChange={e => setTempEditScores(p => ({ ...p, tx3: parseFloat(e.target.value) }))}
                                className="w-12 text-center py-0.5 border rounded"
                              />
                            ) : (
                              <span>{r.tx3}</span>
                            )}
                          </td>

                          {/* ĐIỂM TX4 */}
                          <td className="py-3 px-2 text-center">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                max="10"
                                defaultValue={r.tx4}
                                onChange={e => setTempEditScores(p => ({ ...p, tx4: parseFloat(e.target.value) }))}
                                className="w-12 text-center py-0.5 border rounded"
                              />
                            ) : (
                              <span>{r.tx4}</span>
                            )}
                          </td>

                          {/* ĐIỂM GK */}
                          <td className="py-3 px-2 text-center font-bold text-indigo-700 bg-indigo-50/30">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                max="10"
                                defaultValue={r.gk}
                                onChange={e => setTempEditScores(p => ({ ...p, gk: parseFloat(e.target.value) }))}
                                className="w-12 text-center py-0.5 border border-indigo-300 rounded font-bold"
                              />
                            ) : (
                              <span>{r.gk}</span>
                            )}
                          </td>

                          {/* ĐIỂM CK */}
                          <td className="py-3 px-2 text-center font-bold text-purple-700 bg-purple-50/30">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                max="10"
                                defaultValue={r.ck}
                                onChange={e => setTempEditScores(p => ({ ...p, ck: parseFloat(e.target.value) }))}
                                className="w-12 text-center py-0.5 border border-purple-300 rounded font-bold"
                              />
                            ) : (
                              <span>{r.ck}</span>
                            )}
                          </td>

                          {/* ĐTB */}
                          <td className="py-3 px-2 text-center font-extrabold text-amber-700 bg-amber-50/50 text-sm">
                            {r.dtb}đ
                          </td>

                          {/* XẾP LOẠI */}
                          <td className="py-3 px-3 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              r.rank === 'Tốt' ? 'bg-emerald-100 text-emerald-800' :
                              r.rank === 'Khá' ? 'bg-blue-100 text-blue-800' :
                              r.rank === 'Đạt' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {r.rank}
                            </span>
                          </td>

                          {/* LỜI NHẬN XÉT */}
                          <td className="py-3 px-3 text-slate-600 max-w-xs truncate text-[11px]">
                            {isEditing ? (
                              <input
                                type="text"
                                defaultValue={r.comment}
                                onChange={e => setTempEditScores(p => ({ ...p, comment: e.target.value }))}
                                className="w-full px-2 py-0.5 border rounded text-xs"
                              />
                            ) : (
                              <span>{r.comment}</span>
                            )}
                          </td>

                          {/* THAO TÁC */}
                          <td className="py-3 px-2 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleSaveGradeRow(r.studentCode)}
                                  className="p-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                                  title="Lưu điểm"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => { setEditingStudentCode(null); setTempEditScores({}); }}
                                  className="p-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700"
                                  title="Hủy"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => { setEditingStudentCode(r.studentCode); setTempEditScores({}); }}
                                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                                title="Sửa điểm học sinh này"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            )}
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

      {/* ==================================================================== */}
      {/* 3. CÁC MODAL THAO TÁC                                               */}
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
                        newClassGrade === g ? 'bg-[#2d7d6f] text-white border-[#2d7d6f]' : 'bg-slate-50 text-slate-700'
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
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
                  className="px-5 py-2 rounded-xl bg-[#2d7d6f] hover:bg-[#207264] text-white font-bold"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
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
                  className="px-5 py-2 rounded-xl bg-[#2d7d6f] hover:bg-[#207264] text-white font-bold"
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
                Mã học sinh tự động sinh theo mẫu: <strong>{currentClass.classCode}{(classStudents.length + 1).toString().padStart(2, '0')}</strong> · Mật khẩu: <strong>123</strong>.
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
    </>
  );
}

export default function TeacherDashboard() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 font-bold space-y-3">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Đang tải Bàn Quản Lý Giáo Viên · Thầy Đỗ Mạnh Trường...</p>
      </div>
    }>
      <TeacherDashboardContent />
    </Suspense>
  );
}
