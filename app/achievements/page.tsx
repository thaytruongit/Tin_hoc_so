'use client';

import { useState } from 'react';
import { Trophy, Award, Flame, Zap, Sparkles, TrendingUp, Code2, Users, CheckCircle2 } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_BADGES, MOCK_CLASSES } from '@/lib/mock-data';

export default function AchievementsPage() {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [criteria, setCriteria] = useState<'grade' | 'streak' | 'progress' | 'tasks' | 'code' | 'contribution'>('grade');

  // Lọc theo lớp
  let list = selectedClass === 'all'
    ? [...MOCK_STUDENTS]
    : [...MOCK_STUDENTS].filter(s => s.classId === selectedClass);

  // Sắp xếp theo 6 tiêu chí chuẩn theo mục 4 tệp TK.docx
  list.sort((a, b) => {
    if (criteria === 'grade') return b.averageGrade - a.averageGrade;
    if (criteria === 'streak') return b.streakDays - a.streakDays;
    if (criteria === 'progress') return b.progressScore - a.progressScore;
    if (criteria === 'tasks') return b.completedTasks - a.completedTasks;
    if (criteria === 'code') return b.codeScore - a.codeScore;
    if (criteria === 'contribution') return b.contributionScore - a.contributionScore;
    return b.totalXp - a.totalXp;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-amber-100 text-amber-600 mb-1">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Bảng Vàng Thi Đua & Hệ Thống Huy Hiệu
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Ghi nhận toàn diện nhiều khía cạnh của học sinh: không chỉ chạy theo điểm số mà đánh giá cả sự chăm chỉ, tiến bộ và tinh thần đồng đội.
        </p>

        {/* Lọc theo lớp */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setSelectedClass('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedClass === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Toàn trường
          </button>
          {MOCK_CLASSES.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedClass === cls.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {cls.name}
            </button>
          ))}
        </div>
      </div>

      {/* 6 TIÊU CHÍ BẢNG XẾP HẠNG CHUẨN MỤC 4 TỆP TK.DOCX */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
          {[
            { id: 'grade', label: 'Top Điểm Học Tập', icon: Award },
            { id: 'streak', label: 'Top Chăm Chỉ (Chuỗi)', icon: Flame },
            { id: 'progress', label: 'Top Tiến Bộ', icon: TrendingUp },
            { id: 'tasks', label: 'Top Hoàn Thành Nhiệm Vụ', icon: CheckCircle2 },
            { id: 'code', label: 'Top Lập Trình', icon: Code2 },
            { id: 'contribution', label: 'Top Đóng Góp Cho Lớp', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = criteria === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCriteria(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* BẢNG XẾP HẠNG CHI TIẾT */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {list.map((st, idx) => (
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
                      <span className="text-amber-600 font-semibold">{st.totalXp} XP</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {criteria === 'grade' && (
                    <div className="text-base font-extrabold text-blue-600">{st.averageGrade} / 10đ</div>
                  )}
                  {criteria === 'streak' && (
                    <div className="text-base font-extrabold text-orange-600 flex items-center gap-1">
                      <Flame className="w-4 h-4 fill-orange-500" />
                      {st.streakDays} ngày
                    </div>
                  )}
                  {criteria === 'progress' && (
                    <div className="text-base font-extrabold text-emerald-600">+{st.progressScore}% tiến bộ</div>
                  )}
                  {criteria === 'tasks' && (
                    <div className="text-base font-extrabold text-indigo-600">{st.completedTasks} nhiệm vụ</div>
                  )}
                  {criteria === 'code' && (
                    <div className="text-base font-extrabold text-purple-600">{st.codeScore} điểm code</div>
                  )}
                  {criteria === 'contribution' && (
                    <div className="text-base font-extrabold text-blue-600">{st.contributionScore} điểm nhóm</div>
                  )}
                  <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold mt-0.5">
                    Cấp {st.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 HUY HIỆU THEO TỆP TK.DOCX */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            4 Huy Hiệu Học Tập (Thiết kế theo TK.docx)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ghi nhận thành tích, sự chăm chỉ, sáng tạo và tinh thần đồng đội
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_BADGES.map((b) => (
            <div
              key={b.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${b.color} text-white flex items-center justify-center shadow-md`}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                    {b.category}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">{b.name}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{b.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <Sparkles className="w-3 h-3" />
                  +{b.xpBonus} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
