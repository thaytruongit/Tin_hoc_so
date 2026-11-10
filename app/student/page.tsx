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
  LogOut,
  Zap
} from 'lucide-react';
import { MOCK_STUDENTS, MOCK_WORKSHEETS, MOCK_EXAMS, MOCK_BADGES } from '@/lib/mock-data';

export default function StudentDashboard() {
  const [currentStudent, setCurrentStudent] = useState(MOCK_STUDENTS[0]);

  useEffect(() => {
    const studentId = localStorage.getItem('truong_student_id');
    if (studentId) {
      const found = MOCK_STUDENTS.find(s => s.id === studentId);
      if (found) setCurrentStudent(found);
    }
  }, []);

  const gradeNumber = parseInt(currentStudent.className.replace(/\D/g, '').charAt(0)) || 6;
  const gradeWorksheets = MOCK_WORKSHEETS.filter(w => w.grade === gradeNumber);
  const gradeExams = MOCK_EXAMS.filter(e => e.grade === gradeNumber);

  // Tính % XP lên cấp tiếp theo
  const currentLevelXp = (currentStudent.level - 1) * 250;
  const nextLevelXp = currentStudent.level * 250;
  const progressPercent = Math.min(100, Math.round(((currentStudent.totalXp - currentLevelXp) / 250) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* STUDENT PROFILE CARD */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentStudent.avatarUrl}
              alt={currentStudent.fullName}
              className="w-20 h-20 rounded-2xl bg-white/10 p-1.5 border-2 border-white/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                  {currentStudent.studentCode}
                </span>
                <span className="text-xs text-blue-200 font-medium">
                  {currentStudent.className}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
                {currentStudent.fullName}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Flame className="w-4 h-4 fill-amber-300" />
                  Chuỗi {currentStudent.streakDays} ngày học
                </span>
                <span className="flex items-center gap-1 font-bold text-white">
                  <Award className="w-4 h-4 text-amber-300" />
                  {currentStudent.badgesCount} Huy hiệu
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
        {/* MAIN TASKS (PHIẾU HỌC TẬP & ĐỀ KIỂM TRA) */}
        <div className="lg:col-span-2 space-y-8">
          {/* PHIẾU HỌC TẬP ĐƯỢC GIAO */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-lg text-slate-900">
                  Phiếu học tập trên lớp ({gradeWorksheets.length})
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Nhiệm vụ tuần này
              </span>
            </div>

            <div className="space-y-3">
              {gradeWorksheets.map((ws) => (
                <div
                  key={ws.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                        Tiết {ws.periodNum}
                      </span>
                      <span className="text-xs text-slate-500">{ws.topic}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{ws.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {ws.timeLimitMin} phút
                      </span>
                      <span className="text-amber-600 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        +{ws.xpReward} XP
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/worksheets/${ws.id}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1 shrink-0"
                  >
                    <span>Làm bài ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* ĐỀ KIỂM TRA ĐANG MỞ */}
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
              Bảng thi đua {currentStudent.className}
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
    </div>
  );
}
