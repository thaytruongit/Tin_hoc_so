'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Clock, Sparkles, ArrowRight, Filter } from 'lucide-react';
import { MOCK_WORKSHEETS } from '@/lib/mock-data';

export default function WorksheetsPage() {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');

  const filteredWorksheets = selectedGrade === 'all'
    ? MOCK_WORKSHEETS
    : MOCK_WORKSHEETS.filter(w => w.grade === selectedGrade);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-blue-100 text-blue-600 mb-1">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Phiếu Học Tập Điện Tử
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Thực hành trực tuyến theo 4 pha bài học (Khởi động - Khám phá - Luyện tập - Vận dụng). Tự động chấm điểm và tích lũy XP.
        </p>

        {/* Grade Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedGrade === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
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
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Khối {g}
            </button>
          ))}
        </div>
      </div>

      {/* WORKSHEETS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWorksheets.map((ws) => (
          <div
            key={ws.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Tin học Khối {ws.grade} · Tiết {ws.periodNum}
                </span>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  +{ws.xpReward} XP
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                {ws.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {ws.topic}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Thời gian: {ws.timeLimitMin} phút ({ws.questions.length} câu hỏi)
              </span>
              <Link
                href={`/worksheets/${ws.id}`}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <span>Bắt đầu làm</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
