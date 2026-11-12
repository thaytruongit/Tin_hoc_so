'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileCheck2, Clock, ShieldAlert, Lock, ArrowRight, CheckCircle2, ShieldCheck, School } from 'lucide-react';
import { MOCK_EXAMS } from '@/lib/mock-data';
import { getCurrentUser, UserSession } from '@/lib/auth';

export default function ExamsPage() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user.role === 'student' && user.studentGrade) {
      setSelectedGrade(user.studentGrade);
    }
  }, []);

  const filteredExams = selectedGrade === 'all'
    ? MOCK_EXAMS
    : MOCK_EXAMS.filter(e => e.grade === selectedGrade);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 edu-grid-bg">
      {/* HEADER BANNER SƯ PHẠM (LIGHT THEME) */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-xs mb-1">
          <FileCheck2 className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Kiểm Tra Đánh Giá Định Kỳ (Chuẩn Ma Trận Bộ GD&amp;ĐT)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          8 Bộ đề kiểm tra định kỳ có bảo mật chuẩn Ma trận nhận thức Bộ GD&amp;ĐT (Khối 6, 7, 8, 9). Giám sát làm bài trung thực &amp; chống chuyển tab — <strong className="text-slate-800 font-bold">Thầy Đỗ Mạnh Trường</strong>.
        </p>

        {/* BỘ LỌC KHỐI LỚP */}
        {currentUser?.role === 'student' ? (
          <div className="pt-2">
            <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs inline-flex items-center gap-2">
              <span>Đề kiểm tra định kỳ Khối {selectedGrade}</span>
              <span className="opacity-90 font-normal">({currentUser.studentClass || 'Học sinh'})</span>
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedGrade === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Tất cả 8 Bộ đề
            </button>
            {[6, 7, 8, 9].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedGrade === g
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Khối {g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DANH SÁCH BỘ ĐỀ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between space-y-5 shadow-xs hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
                  Khối {exam.grade} · {exam.examType}
                </span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Giám sát chống gian lận
                </span>
              </div>
              <h2 className="font-bold text-lg text-slate-900">
                {exam.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {exam.durationMin} phút
                </span>
                <span>•</span>
                <span className="font-semibold text-slate-700">{exam.questionsCount} câu trắc nghiệm</span>
                <span>•</span>
                <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Ma trận 4-3-2-1</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs">
                {exam.isLocked ? (
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Đang khóa đề
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đã mở làm bài
                  </span>
                )}
              </div>

              {exam.isLocked ? (
                <button
                  disabled
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed"
                >
                  Chờ Thầy Mở
                </button>
              ) : (
                <Link
                  href={`/exams/${exam.id}`}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2 transition-colors"
                >
                  <span>Bắt Đầu Làm Bài</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
