'use client';

import { useState } from 'react';
import { Trophy, Award, Flame, Zap, Sparkles, Filter } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_BADGES, MOCK_CLASSES } from '@/lib/mock-data';

export default function AchievementsPage() {
  const [selectedClass, setSelectedClass] = useState<string>('all');

  const filteredStudents = selectedClass === 'all'
    ? [...MOCK_STUDENTS].sort((a, b) => b.totalXp - a.totalXp)
    : [...MOCK_STUDENTS].filter(s => s.classId === selectedClass).sort((a, b) => b.totalXp - a.totalXp);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-amber-100 text-amber-600 mb-1">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Bảng Vàng Thi Đua & Huy Hiệu
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Tuyên dương những học sinh chăm chỉ, nỗ lực đạt kết quả cao trong các bài học và bài kiểm tra môn Tin học.
        </p>

        {/* Class Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setSelectedClass('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedClass === 'all'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Toàn trường
          </button>
          {MOCK_CLASSES.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedClass === cls.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cls.name}
            </button>
          ))}
        </div>
      </div>

      {/* LEADERBOARD TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            Bảng xếp hạng tổng điểm XP
          </h2>
          <span className="text-xs text-slate-500">Cập nhật thời gian thực</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredStudents.map((st, idx) => (
            <div
              key={st.id}
              className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                  idx === 0
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : idx === 1
                    ? 'bg-slate-300 text-slate-950'
                    : idx === 2
                    ? 'bg-amber-700 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  #{idx + 1}
                </div>
                <img
                  src={st.avatarUrl}
                  alt={st.fullName}
                  className="w-10 h-10 rounded-xl bg-slate-100 p-1"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{st.fullName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{st.className}</span>
                    <span>·</span>
                    <span>Mã: {st.studentCode}</span>
                    <span>·</span>
                    <span className="text-amber-600 font-semibold">{st.badgesCount} huy hiệu</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-extrabold text-amber-600">
                  {st.totalXp} XP
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                  Cấp {st.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BADGES SHOWCASE */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            Hệ thống huy hiệu học tập
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hoàn thành các thử thách học tập để mở khóa huy hiệu và nhận thưởng điểm kinh nghiệm XP
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BADGES.map((b) => (
            <div
              key={b.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4 hover:shadow-md transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${b.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                <Award className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900">{b.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{b.description}</p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <Sparkles className="w-3 h-3" />
                    +{b.xpBonus} XP
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
