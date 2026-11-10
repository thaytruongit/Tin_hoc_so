'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClipboardCheck, Clock, ShieldAlert, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MOCK_EXAMS } from '@/lib/mock-data';

export default function ExamsPage() {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');

  const filteredExams = selectedGrade === 'all'
    ? MOCK_EXAMS
    : MOCK_EXAMS.filter(e => e.grade === selectedGrade);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-100 text-indigo-600 mb-1">
          <ClipboardCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Phòng Kiểm Tra Trực Tuyến
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Kiểm tra thường xuyên & định kỳ môn Tin học THCS. Hệ thống tự động bấm giờ, giám sát chuyển tab và ghi nhận kết quả ngay khi hết giờ.
        </p>

        {/* Grade Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedGrade === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tất cả khối
          </button>
          {[6, 7, 8, 9].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedGrade === g
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Khối {g}
            </button>
          ))}
        </div>
      </div>

      {/* EXAMS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 uppercase">
                  Khối {exam.grade} · Kiểm tra {exam.examType}
                </span>
                <span className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Chống chuyển tab
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                {exam.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {exam.durationMin} phút
                </span>
                <span>{exam.questionsCount} câu trắc nghiệm</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                {exam.isLocked ? (
                  <span className="text-rose-600 font-bold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Đang khóa đề
                  </span>
                ) : (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Sẵn sàng làm bài
                  </span>
                )}
              </div>

              {exam.isLocked ? (
                <button
                  disabled
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed"
                >
                  Chờ GV mở
                </button>
              ) : (
                <Link
                  href={`/exams/${exam.id}`}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <span>Bắt đầu thi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
