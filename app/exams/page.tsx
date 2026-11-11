'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClipboardCheck, Clock, ShieldAlert, Lock, ArrowRight, CheckCircle2, Crown, Zap, ShieldCheck } from 'lucide-react';
import { MOCK_EXAMS } from '@/lib/mock-data';

export default function ExamsPage() {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');

  const filteredExams = selectedGrade === 'all'
    ? MOCK_EXAMS
    : MOCK_EXAMS.filter(e => e.grade === selectedGrade);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 cyber-grid-bg">
      {/* HEADER ĐẤU TRƯỜNG BOSS RAID */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-neon-crimson/40 mb-1">
          <Crown className="w-8 h-8 text-amber-300 animate-pulse" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight glow-text-cyan">
          Đấu Trường Kiểm Tra Boss Raid
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          8 Bộ đề kiểm tra định kỳ chuẩn Ma trận nhận thức Bộ GD&ĐT (Giữa kỳ &amp; Cuối kỳ Khối 6, 7, 8, 9). Giám sát gian lận chuyển tab đa tầng, phân tích năng lực tức thời — <strong className="text-cyan-300">Thầy Đỗ Mạnh Trường</strong>.
        </p>

        {/* Grade Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedGrade === 'all'
                ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-neon-crimson/40 border border-rose-400/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Tất cả 8 Boss
          </button>
          {[6, 7, 8, 9].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedGrade === g
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan/40 border border-cyan-400/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Boss Khối {g}
            </button>
          ))}
        </div>
      </div>

      {/* EXAMS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="p-6 rounded-3xl cyber-hud-card border border-rose-500/30 hover:border-rose-400 transition-all flex flex-col justify-between space-y-5 group hover:-translate-y-1 shadow-neon-crimson/10"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 uppercase tracking-wider">
                  Khối {exam.grade} · {exam.examType}
                </span>
                <span className="text-[11px] font-black text-rose-400 flex items-center gap-1 bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-500/30 animate-pulse">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Khiên chống gian lận
                </span>
              </div>
              <h3 className="font-black text-lg text-white group-hover:text-rose-300 transition-colors">
                {exam.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-bold text-cyan-300">
                  <Clock className="w-3.5 h-3.5" />
                  {exam.durationMin} phút
                </span>
                <span>•</span>
                <span className="font-bold text-purple-300">{exam.questionsCount} câu trắc nghiệm</span>
                <span>•</span>
                <span className="text-[11px] text-amber-400 font-bold">Ma trận: 4-3-2-1</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs">
                {exam.isLocked ? (
                  <span className="text-slate-500 font-bold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Đang khóa đề
                  </span>
                ) : (
                  <span className="text-emerald-400 font-black flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Sẵn sàng chiến đấu
                  </span>
                )}
              </div>

              {exam.isLocked ? (
                <button
                  disabled
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-600 text-xs font-bold border border-slate-800 cursor-not-allowed"
                >
                  Chờ Thầy Mở
                </button>
              ) : (
                <Link
                  href={`/exams/${exam.id}`}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-black shadow-neon-crimson/30 flex items-center gap-2 transition-all border border-rose-400/40 hover:scale-105"
                >
                  <span>⚔️ Vào Đánh Boss</span>
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
