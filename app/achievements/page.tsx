'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Star,
  Award,
  Users,
  Search,
  CheckCircle2,
  School,
  Sparkles,
  ArrowRight,
  Laptop,
  FileCheck2,
  Medal,
  Crown
} from 'lucide-react';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { Student } from '@/lib/types';

export default function AchievementsPage() {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  // Bộ lọc bảng xếp hạng
  const [filterScope, setFilterScope] = useState<'all' | 'grade' | 'class'>('all');
  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [selectedClassId, setSelectedClassId] = useState<string>('c-7a11');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    setCurrentUser(user);

    if (user.role === 'student') {
      if (user.studentGrade) setSelectedGrade(user.studentGrade);
      if (user.studentClass) {
        const matchCls = MOCK_CLASSES.find(c => c.name === user.studentClass || user.studentClass?.includes(c.name.replace('Lớp ', '')));
        if (matchCls) {
          setSelectedClassId(matchCls.id);
          setFilterScope('class');
        }
      }
    }
  }, []);

  const classesInGrade = useMemo(() => {
    return MOCK_CLASSES.filter(c => c.grade === selectedGrade);
  }, [selectedGrade]);

  const currentClass = useMemo(() => {
    return MOCK_CLASSES.find(c => c.id === selectedClassId) || classesInGrade[0] || MOCK_CLASSES[4];
  }, [selectedClassId, classesInGrade]);

  // Danh sách học sinh theo phạm vi lọc
  const rankedStudents = useMemo(() => {
    let list: Student[] = [...MOCK_STUDENTS];

    if (filterScope === 'class') {
      list = list.filter(s => s.classId === currentClass.id);
    } else if (filterScope === 'grade') {
      const classIdsInGrade = classesInGrade.map(c => c.id);
      list = list.filter(s => classIdsInGrade.includes(s.classId));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        s => s.fullName.toLowerCase().includes(q) || s.studentCode.toLowerCase().includes(q)
      );
    }

    // Sắp xếp theo điểm XP và số sao thưởng
    return list.sort((a, b) => b.totalXp - a.totalXp || b.averageGrade - a.averageGrade);
  }, [filterScope, currentClass, classesInGrade, searchQuery]);

  // Vị trí thứ hạng của học sinh đang đăng nhập
  const myRank = useMemo(() => {
    if (!currentUser?.studentCode) return null;
    const idx = rankedStudents.findIndex(s => s.studentCode === currentUser.studentCode);
    return idx >= 0 ? idx + 1 : null;
  }, [rankedStudents, currentUser]);

  const myStudentData = useMemo(() => {
    if (!currentUser?.studentCode) return null;
    return MOCK_STUDENTS.find(s => s.studentCode === currentUser.studentCode);
  }, [currentUser]);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-sm font-semibold">Đang tải bảng thành tích thi đua...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* HEADER BẢNG XẾP HẠNG & THÀNH TÍCH */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-purple-700" />
              <span>Bảng Vàng Thi Đua · THCS Mão Điền</span>
            </span>
            <span className="text-xs text-slate-500">
              Tổng kết: <strong className="text-slate-800">Thầy Đỗ Mạnh Trường</strong>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
              670 Học Sinh 4 Khối
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            THÀNH TÍCH HỌC TẬP &amp; BẢNG XẾP HẠNG
          </h1>

          <p className="text-xs sm:text-sm text-slate-600">
            Tuyên dương học sinh có điểm kinh nghiệm học tập (XP) cao nhất, nhận nhiều Sao Thưởng tại phòng máy và hoàn thành xuất sắc các bài tập định kỳ.
          </p>
        </div>

        {/* THẺ THÀNH TÍCH CÁ NHÂN CỦA EM */}
        {myStudentData && (
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs shrink-0 space-y-2 min-w-[240px]">
            <div className="flex items-center justify-between font-bold text-purple-950">
              <span>Học sinh: {myStudentData.fullName}</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white font-black text-[10px]">
                {myRank ? `Hạng ${myRank}` : 'Tham gia'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-purple-200">
              <div>
                <div className="text-base font-black text-purple-700">{myStudentData.totalXp}</div>
                <div className="text-[10px] text-slate-500 font-semibold">Điểm XP</div>
              </div>
              <div>
                <div className="text-base font-black text-amber-600 flex items-center justify-center gap-0.5">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{myStudentData.badgesCount || 4}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-semibold">Sao Thưởng</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TOP 3 HỌC SINH DẪN ĐẦU (PODIUM VINH DANH) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {rankedStudents.slice(0, 3).map((st, idx) => {
          const podiumColor =
            idx === 0
              ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-md ring-2 ring-amber-400/30'
              : idx === 1
              ? 'bg-slate-50 border-slate-300 text-slate-900'
              : 'bg-orange-50 border-orange-300 text-orange-950';

          const medalIcon =
            idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';

          return (
            <div
              key={st.studentCode}
              className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-3 ${podiumColor}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{medalIcon}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-current text-[11px] font-bold">
                  Top {idx + 1}
                </span>
              </div>

              <div>
                <div className="text-sm sm:text-base font-extrabold truncate">
                  {st.fullName}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Mã: {st.studentCode} · {st.className}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-current/10 text-xs font-bold">
                <span className="text-purple-700 font-black">{st.totalXp} XP</span>
                <span className="flex items-center gap-1 text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{st.badgesCount || 3} Sao</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* BỘ LỌC PHẠM VI XẾP HẠNG & TÌM KIẾM */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Chọn Phạm vi: Toàn trường / Theo Khối / Theo Lớp */}
          <div className="inline-flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {currentUser?.role !== 'student' && (
              <button
                type="button"
                onClick={() => setFilterScope('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterScope === 'all' ? 'bg-white text-purple-800 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Toàn Trường (670 HS)
              </button>
            )}
            <button
              type="button"
              onClick={() => setFilterScope('class')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterScope === 'class' ? 'bg-white text-purple-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Theo Lớp ({currentClass.name})
            </button>
            <button
              type="button"
              onClick={() => setFilterScope('grade')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterScope === 'grade' ? 'bg-white text-purple-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Toàn Khối ({selectedGrade})
            </button>
          </div>

          {/* Ô tìm kiếm */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm học sinh theo tên/mã..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Nút chọn Khối và Lớp nếu chọn phạm vi Khối / Lớp */}
        {filterScope !== 'all' && (
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 flex-wrap">
            {currentUser?.role === 'student' ? (
              <div className="text-xs font-bold text-slate-500">
                Xếp hạng thi đua: <strong className="text-purple-700">{currentClass.name} · Khối {selectedGrade}</strong>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-600">Khối:</span>
                  {[6, 7, 8, 9].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        setSelectedGrade(g);
                        const firstCls = MOCK_CLASSES.find(c => c.grade === g);
                        if (firstCls) setSelectedClassId(firstCls.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                        selectedGrade === g
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Khối {g}
                    </button>
                  ))}
                </div>

                {filterScope === 'class' && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                    <span className="text-xs font-bold text-slate-600 shrink-0">Lớp:</span>
                    {classesInGrade.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedClassId(c.id)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                          selectedClassId === c.id
                            ? 'bg-purple-50 border-purple-400 text-purple-900'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* BẢNG DANH SÁCH XẾP HẠNG CHI TIẾT */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200 uppercase text-[10px] tracking-wide">
                <th className="py-3 px-4 text-center w-16">Hạng</th>
                <th className="py-3 px-3 text-center w-24">Mã HS</th>
                <th className="py-3 px-4 min-w-[180px]">Họ và Tên Học Sinh</th>
                <th className="py-3 px-3 text-center w-24">Lớp</th>
                <th className="py-3 px-3 text-center w-24 text-purple-700">Điểm XP</th>
                <th className="py-3 px-3 text-center w-24 text-amber-600">Sao Thưởng ⭐</th>
                <th className="py-3 px-3 text-center w-24">ĐTB Học Tập</th>
                <th className="py-3 px-4 min-w-[150px]">Danh Hiệu Học Đường</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rankedStudents.map((st, idx) => {
                const rankNum = idx + 1;
                const isCurrent = currentUser?.studentCode === st.studentCode;

                return (
                  <tr
                    key={st.studentCode}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-amber-50/80 font-bold border-l-4 border-l-amber-500'
                        : idx < 3
                        ? 'bg-purple-50/30'
                        : idx % 2 === 0
                        ? 'bg-white hover:bg-slate-50/70'
                        : 'bg-slate-50/30 hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-4 text-center font-bold">
                      {rankNum === 1 ? (
                        <span className="text-base">🥇</span>
                      ) : rankNum === 2 ? (
                        <span className="text-base">🥈</span>
                      ) : rankNum === 3 ? (
                        <span className="text-base">🥉</span>
                      ) : (
                        <span className="text-slate-500 font-mono">{rankNum}</span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-600">
                      {st.studentCode}
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{st.fullName}</span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 font-black text-[9px] uppercase">
                            Em
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center text-slate-600 font-semibold">
                      {st.className}
                    </td>

                    <td className="py-3 px-3 text-center font-black text-purple-700 text-sm">
                      {st.totalXp}
                    </td>

                    <td className="py-3 px-3 text-center font-bold text-amber-600">
                      ⭐ {st.badgesCount || 3}
                    </td>

                    <td className="py-3 px-3 text-center font-black text-slate-800">
                      {st.averageGrade}
                    </td>

                    <td className="py-3 px-4 text-[11px] text-slate-600">
                      {st.totalXp > 800 ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          🌟 Kiện tướng số
                        </span>
                      ) : st.totalXp > 600 ? (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                          🚀 Chiến sĩ tích cực
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                          👍 Học sinh chăm chỉ
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center">
          Bảng xếp hạng cập nhật tự động sau mỗi tiết học thực hành và bài nộp tại phòng máy · THCS Mão Điền
        </div>
      </div>

    </div>
  );
}
