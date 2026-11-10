'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  FileText, 
  ClipboardCheck, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  Zap,
  BookOpen,
  Laptop,
  Users,
  ChevronRight,
  Filter,
  Layers,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_EXAMS, MOCK_BADGES } from '@/lib/mock-data';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { CURRICULUM_DATA, CurriculumPeriod } from '@/lib/curriculum-data';
import CurriculumPeriodModal from '@/components/CurriculumPeriodModal';

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [currentStudent, setCurrentStudent] = useState(MOCK_STUDENTS[0]);
  const [selectedPeriod, setSelectedPeriod] = useState<CurriculumPeriod | null>(null);
  const [activeModalSection, setActiveModalSection] = useState<'worksheet' | 'reinforcement' | 'practice' | 'all'>('all');
  const [roadmapFilter, setRoadmapFilter] = useState<'all' | 'practice' | 'theory'>('all');
  const [worksheetDisplayCount, setWorksheetDisplayCount] = useState<number>(6);
  const [reinforceDisplayCount, setReinforceDisplayCount] = useState<number>(6);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    const studentId = localStorage.getItem('truong_student_id');
    if (studentId) {
      const found = MOCK_STUDENTS.find(s => s.id === studentId);
      if (found) setCurrentStudent(found);
    } else if (user.studentCode) {
      const found = MOCK_STUDENTS.find(s => s.studentCode === user.studentCode);
      if (found) setCurrentStudent(found);
    }
  }, []);

  // Xác định Khối lớp chính thức của học sinh
  const gradeNumber = currentUser?.studentGrade || parseInt(currentStudent.className.replace(/\D/g, '').charAt(0)) || 6;
  const gradeExams = MOCK_EXAMS.filter(e => e.grade === gradeNumber);

  // Danh mục 29 tiết học chuẩn cho Khối lớp của học sinh
  const gradePeriods = CURRICULUM_DATA[gradeNumber] || CURRICULUM_DATA[6] || [];
  const practicePeriods = gradePeriods.filter(p => p.isPractice && p.practicalTask);
  const theoryPeriods = gradePeriods.filter(p => !p.isPractice);

  // Lọc danh sách lộ trình theo bộ lọc
  const filteredRoadmap = gradePeriods.filter(p => {
    if (roadmapFilter === 'practice') return p.isPractice;
    if (roadmapFilter === 'theory') return !p.isPractice;
    return true;
  });

  // Tính % XP lên cấp tiếp theo
  const currentLevelXp = (currentStudent.level - 1) * 250;
  const nextLevelXp = currentStudent.level * 250;
  const progressPercent = Math.min(100, Math.round(((currentStudent.totalXp - currentLevelXp) / 250) * 100));

  // Tên hiển thị học sinh / cặp đôi
  const studentDisplayName = currentUser?.studentName || currentStudent.fullName;
  const studentDisplayClass = currentUser?.studentClass || currentStudent.className;
  const studentDisplayCode = currentUser?.studentCode || currentStudent.studentCode;

  const handleOpenPeriodModal = (period: CurriculumPeriod, section: 'worksheet' | 'reinforcement' | 'practice' | 'all') => {
    setSelectedPeriod(period);
    setActiveModalSection(section);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* STUDENT PROFILE CARD */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentStudent.avatarUrl}
              alt={studentDisplayName}
              className="w-20 h-20 rounded-2xl bg-white/10 p-1.5 border-2 border-white/20 shadow-md object-cover"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                  {studentDisplayCode}
                </span>
                <span className="text-xs text-blue-200 font-medium">
                  {studentDisplayClass} · Khối {gradeNumber}
                </span>
                {currentUser?.isPair && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>Cặp đôi: {currentUser.pairNames || `${studentDisplayName} & ${currentUser.partnerName}`}</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
                {studentDisplayName}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Flame className="w-4 h-4 fill-amber-300" />
                  Chuỗi {currentStudent.streakDays} ngày học
                </span>
                <span className="flex items-center gap-1 font-bold text-white">
                  <Award className="w-4 h-4 text-amber-300" />
                  {currentStudent.badgesCount} Huy hiệu
                </span>
                <span className="flex items-center gap-1 font-bold text-blue-200">
                  <BookOpen className="w-4 h-4 text-blue-300" />
                  29 Tiết Chuẩn GDPT 2018
                </span>
              </div>
            </div>
          </div>

          {/* XP & Level Box */}
          <div className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[240px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-100 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                Cấp độ {currentStudent.level}
              </span>
              <span className="text-xs font-bold text-amber-300">
                {currentStudent.totalXp} XP
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-blue-200 mt-1.5 text-right font-medium">
              Còn {nextLevelXp - currentStudent.totalXp} XP để lên Cấp {currentStudent.level + 1}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN COLUMN: 4 HOẠT ĐỘNG SƯ PHẠM CHUẨN */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* ================================================================= */}
          {/* HOẠT ĐỘNG 1: LỘ TRÌNH 29 TIẾT HỌC                                 */}
          {/* (Thay thế vị trí "Củng Cố Bài Học — 7 Câu Trắc Nghiệm Chuẩn Bộ")  */}
          {/* ================================================================= */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-indigo-900/60 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    Lộ trình chuẩn GDPT 2018
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    Khối {gradeNumber} · 29 Tiết Học Chính Thức
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1">
                  Lộ Trình Học Tập 29 Tiết Tin Học Khối {gradeNumber}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Chất liệu hữu cơ 100% SGK Kết nối tri thức · THCS Mão Điền. Bấm vào bất kỳ tiết học nào để mở cửa sổ học liệu chi tiết.
                </p>
              </div>

              <Link
                href={`/subjects?grade=${gradeNumber}&section=29periods`}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Kho học liệu 29 Tiết</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </Link>
            </div>

            {/* BỘ LỌC TIẾT HỌC */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                type="button"
                onClick={() => setRoadmapFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  roadmapFilter === 'all'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                Tất cả (29 tiết)
              </button>
              <button
                type="button"
                onClick={() => setRoadmapFilter('practice')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  roadmapFilter === 'practice'
                    ? 'bg-purple-500 text-white shadow-xs'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Chỉ tiết thực hành ({practicePeriods.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setRoadmapFilter('theory')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  roadmapFilter === 'theory'
                    ? 'bg-blue-500 text-white shadow-xs'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Tiết lý thuyết ({theoryPeriods.length})</span>
              </button>
            </div>

            {/* DANH SÁCH CUỘN 29 TIẾT HỌC */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {filteredRoadmap.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Tiết {p.period}
                      </span>
                      {p.isPractice ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                          <Laptop className="w-3 h-3 text-purple-400" />
                          Thực hành
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Lý thuyết
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {p.topic}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenPeriodModal(p, 'all')}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] transition-all flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>Xem học liệu Tiết {p.period}</span>
                    </button>
                    <Link
                      href={`/in-class?grade=${p.grade}&period=${p.period}`}
                      className="py-1.5 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition-all flex items-center gap-1"
                      title="Vào lớp trực tiếp"
                    >
                      <span>Vào lớp</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================================================================= */}
          {/* HOẠT ĐỘNG 2: PHIẾU HỌC TẬP (KHÁM PHÁ CẶP ĐÔI)                     */}
          {/* (Thay thế "Phiếu học tập trên lớp (1)")                           */}
          {/* ================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shadow-2xs border border-indigo-100">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                      2 HS / 1 Máy tính
                    </span>
                    <span className="text-xs font-bold text-slate-500">Khối {gradeNumber}</span>
                  </div>
                  <h2 className="font-extrabold text-lg text-slate-900 mt-0.5">
                    Phiếu Học Tập (Khám Phá Cặp Đôi)
                  </h2>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                +50 XP chia đều tài khoản
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Phân vai Kỹ thuật viên &amp; Thư ký: Tình huống đời sống, ngân hàng thẻ từ khóa SGK, điền khuyết và thảo luận cặp đôi. Bấm vào nút bên dưới để mở cửa sổ xem chi tiết.
            </p>

            <div className="space-y-3">
              {gradePeriods.slice(0, worksheetDisplayCount).map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50/60 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono">
                        Tiết {p.period}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{p.worksheet.title}</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Bài học: {p.title} ({p.topic})
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pt-0.5">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {p.worksheet.timeLimitMin || 15} phút
                      </span>
                      <span className="text-amber-600 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        +{p.worksheet.xpReward || 50} XP
                      </span>
                      {p.worksheet.wordBank && p.worksheet.wordBank.length > 0 && (
                        <span className="text-indigo-600 font-medium text-[11px]">
                          Từ khóa: {p.worksheet.wordBank.slice(0, 2).join(', ')}...
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleOpenPeriodModal(p, 'worksheet')}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition-all border border-slate-200"
                    >
                      Xem Phiếu
                    </button>
                    <Link
                      href={`/in-class?grade=${p.grade}&period=${p.period}&tab=worksheet`}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1 transition-all"
                    >
                      <span>Làm bài</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {worksheetDisplayCount < gradePeriods.length && (
              <button
                type="button"
                onClick={() => setWorksheetDisplayCount(prev => Math.min(gradePeriods.length, prev + 8))}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all text-center"
              >
                Xem thêm các phiếu học tập khác ({gradePeriods.length - worksheetDisplayCount} tiết còn lại) ↓
              </button>
            )}
          </div>

          {/* ================================================================= */}
          {/* HOẠT ĐỘNG 3: LUYỆN TẬP (7 CÂU CHUẨN BỘ)                            */}
          {/* ================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shadow-2xs border border-amber-200">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 uppercase tracking-wider">
                      Ngân hàng câu hỏi chuẩn Bộ
                    </span>
                    <span className="text-xs font-bold text-amber-800">Khối {gradeNumber}</span>
                  </div>
                  <h2 className="font-extrabold text-lg text-slate-900 mt-0.5">
                    Luyện Tập (7 câu chuẩn Bộ GD&amp;ĐT)
                  </h2>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                3 Biết · 2 Hiểu · 2 Vận dụng
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Trắc nghiệm khách quan tự động chấm điểm 10/10 tức thì và hiển thị lời giải thích chi tiết của Thầy Trương sau khi hoàn thành.
            </p>

            <div className="space-y-3">
              {gradePeriods.slice(0, reinforceDisplayCount).map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-amber-300 bg-slate-50/60 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                        Tiết {p.period}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{p.title}</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Chủ đề: {p.topic}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap pt-0.5">
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        7 câu ({p.reinforcement.matrix || '3 Biết - 2 Hiểu - 2 Vận dụng'})
                      </span>
                      <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Chấm điểm tức thì
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleOpenPeriodModal(p, 'reinforcement')}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 text-xs font-bold transition-all border border-slate-200"
                    >
                      Xem 7 câu
                    </button>
                    <Link
                      href={`/in-class?grade=${p.grade}&period=${p.period}&tab=reinforcement`}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1 transition-all"
                    >
                      <span>Vào luyện tập</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {reinforceDisplayCount < gradePeriods.length && (
              <button
                type="button"
                onClick={() => setReinforceDisplayCount(prev => Math.min(gradePeriods.length, prev + 8))}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all text-center"
              >
                Xem thêm các bài luyện tập khác ({gradePeriods.length - reinforceDisplayCount} tiết còn lại) ↓
              </button>
            )}
          </div>

          {/* ================================================================= */}
          {/* HOẠT ĐỘNG 4: BÀI TẬP THỰC HÀNH (CHỈ TIẾT TH)                       */}
          {/* ================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shadow-2xs border border-purple-200">
                  <Laptop className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 uppercase tracking-wider">
                      Phòng máy tính
                    </span>
                    <span className="text-xs font-bold text-purple-800">
                      {practicePeriods.length} Tiết Thực Hành Khối {gradeNumber}
                    </span>
                  </div>
                  <h2 className="font-extrabold text-lg text-slate-900 mt-0.5">
                    Bài Tập Thực Hành (Chỉ tiết TH)
                  </h2>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-900">
                Rubric thang điểm 10
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Chỉ dành riêng cho các tiết thực hành phần mềm. Học sinh tải tệp mẫu (.xlsx, .docx) và thực hiện quy trình 6 bước theo tiêu chí chấm điểm chuẩn.
            </p>

            <div className="space-y-3">
              {practicePeriods.map((p) => {
                const isExcel = p.practicalTask?.sampleFileName.endsWith('.xlsx');
                return (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 bg-purple-50/20 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono">
                          Tiết {p.period} (Thực hành)
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {p.practicalTask?.title || p.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Bài học: {p.title} ({p.topic})
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pt-0.5">
                        <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-700">
                          {p.practicalTask?.sampleFileName}
                        </span>
                        <span className="text-purple-700 font-semibold text-[11px]">
                          ⭐ Rubric: {p.practicalTask?.rubric.length} tiêu chí (10 điểm)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleOpenPeriodModal(p, 'practice')}
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-purple-800 text-slate-700 text-xs font-bold transition-all border border-slate-200"
                      >
                        Xem Đề &amp; Rubric
                      </button>
                      <Link
                        href={`/in-class?grade=${p.grade}&period=${p.period}&tab=practice`}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1 transition-all"
                      >
                        <span>Vào phòng TH</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================================================================= */}
          {/* HOẠT ĐỘNG 5: BÀI KIỂM TRA TRỰC TUYẾN ĐANG MỞ                      */}
          {/* ================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <ClipboardCheck className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-lg text-slate-900">
                  Bài kiểm tra trực tuyến ({gradeExams.length})
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {gradeExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 uppercase">
                        {exam.examType}
                      </span>
                      <span className="text-xs text-slate-500">{exam.questionsCount} câu hỏi</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{exam.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Thời gian: {exam.durationMin} phút
                      </span>
                      <span className="text-rose-600 font-medium">Bảo mật chống gian lận</span>
                    </div>
                  </div>

                  <Link
                    href={`/exams/${exam.id}`}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1 shrink-0"
                  >
                    <span>Vào phòng thi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR: HUY HIỆU & BẢNG XẾP HẠNG LỚP */}
        <div className="space-y-8">
          {/* BỘ SƯU TẬP HUY HIỆU */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Huy hiệu đạt được
              </h3>
              <Link href="/achievements" className="text-xs text-blue-600 font-bold hover:underline">
                Xem tất cả
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {MOCK_BADGES.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50 text-center flex flex-col items-center justify-center space-y-1.5"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${badge.color} text-white flex items-center justify-center shadow-xs`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{badge.name}</h4>
                  <span className="text-[10px] text-amber-600 font-bold">+{badge.xpBonus} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* BẢNG XẾP HẠNG LỚP */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" />
              Bảng thi đua {studentDisplayClass}
            </h3>

            <div className="space-y-2.5">
              {MOCK_STUDENTS.map((st, i) => (
                <div
                  key={st.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                    st.id === currentStudent.id
                      ? 'border-blue-400 bg-blue-50/50 font-bold text-blue-900'
                      : 'border-slate-100 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      i === 0 ? 'bg-amber-400 text-slate-950' : i === 1 ? 'bg-slate-300 text-slate-950' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {i + 1}
                    </span>
                    <span>{st.fullName}</span>
                  </div>
                  <span className="font-bold text-amber-600">{st.totalXp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* CỬA SỔ MODAL HỌC LIỆU GIỐNG HỆT TRONG ẢNH ĐÍNH KÈM                     */}
      {/* ===================================================================== */}
      <CurriculumPeriodModal
        period={selectedPeriod}
        onClose={() => setSelectedPeriod(null)}
        activeFocusSection={activeModalSection}
      />
    </div>
  );
}
