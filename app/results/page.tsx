'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Award, CheckCircle2, Clock, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { MOCK_RECENT_RESULTS, MOCK_STUDENTS } from '@/lib/mock-data';

export default function ResultsPage() {
  const [selectedStudent, setSelectedStudent] = useState(MOCK_STUDENTS[0]);

  // Bộ 5 năng lực số chuẩn theo CT GDPT 2018 & CV 3456 / QĐ 3439
  const competencies = [
    { name: 'NL1: Sử dụng và quản lý thiết bị số (Phần cứng, HĐH)', score: 92, grade: 'Xuất sắc' },
    { name: 'NL2: Ứng dụng tin học trong học tập (Văn bản, Bảng tính)', score: 95, grade: 'Xuất sắc' },
    { name: 'NL3: Tư duy giải quyết vấn đề với máy tính (Thuật toán, Lập trình)', score: 85, grade: 'Tốt' },
    { name: 'NL4: Ứng xử an toàn, văn hóa trong môi trường số', score: 98, grade: 'Xuất sắc' },
    { name: 'NL5: Năng lực Trí tuệ nhân tạo (AI) cơ bản (QĐ 3439)', score: 88, grade: 'Tốt' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-blue-100 text-blue-600 mb-1">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Kết Quả Học Tập & Đánh Giá Năng Lực
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Theo dõi điểm số chính thức, tiến trình phát triển và đánh giá năng lực số môn Tin học chuẩn CT GDPT 2018.
        </p>

        {/* Switch Student selector */}
        <div className="pt-2 flex justify-center items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Xem học sinh:</span>
          <select
            value={selectedStudent.id}
            onChange={(e) => {
              const st = MOCK_STUDENTS.find(s => s.id === e.target.value);
              if (st) setSelectedStudent(st);
            }}
            className="text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {MOCK_STUDENTS.map(s => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.className} - {s.studentCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* OVERVIEW STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500">Điểm trung bình chính thức</span>
          <div className="text-3xl font-extrabold text-blue-600">{selectedStudent.averageGrade} / 10</div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Xếp loại: Giỏi / Xuất sắc
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500">Nhiệm vụ hoàn thành</span>
          <div className="text-3xl font-extrabold text-indigo-600">{selectedStudent.completedTasks} bài</div>
          <span className="text-[11px] text-slate-500">Đạt 100% chỉ tiêu tuần</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500">Điểm kinh nghiệm thi đua</span>
          <div className="text-3xl font-extrabold text-amber-500">{selectedStudent.totalXp} XP</div>
          <span className="text-[11px] text-amber-600 font-bold">Cấp độ {selectedStudent.level}</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500">Kỷ luật thi & làm bài</span>
          <div className="text-3xl font-extrabold text-emerald-600">100%</div>
          <span className="text-[11px] text-emerald-600 font-medium">Chấp hành nghiêm túc</span>
        </div>
      </div>

      {/* DETAILED RESULTS TABLE & COMPETENCIES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* GRADES HISTORY TABLE */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Lịch sử làm bài & Bảng điểm chi tiết
            </h2>
            <button
              onClick={() => alert('Đang tải phiếu kết quả học tập PDF...')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>In bảng điểm</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Tên bài kiểm tra / Phiếu</th>
                  <th className="py-3 px-3">Thời gian</th>
                  <th className="py-3 px-3">Rời màn hình</th>
                  <th className="py-3 px-3">Điểm số</th>
                  <th className="py-3 px-3">Thưởng XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_RECENT_RESULTS.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-slate-900">
                      {res.examTitle}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500">{res.submittedAt}</td>
                    <td className="py-3.5 px-3">
                      <span className={res.tabSwitches === 0 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                        {res.tabSwitches === 0 ? '0 lần' : `${res.tabSwitches} lần`}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-black text-blue-600 text-sm">
                      {res.score} / {res.maxScore}đ
                    </td>
                    <td className="py-3.5 px-3 font-bold text-amber-600">
                      +{res.xpEarned} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* COMPETENCIES EVALUATION RADAR / BARS */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              Đánh giá Năng lực số
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Khung năng lực số (CV 3456) & AI (QĐ 3439)
            </p>
          </div>

          <div className="space-y-4">
            {competencies.map((c, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 line-clamp-1">{c.name}</span>
                  <span className="font-bold text-blue-600 shrink-0 ml-2">{c.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-blue-900 block">Nhận xét của Thầy Đỗ Mạnh Trường:</span>
            <p>Học sinh có khả năng tiếp thu bài nhanh, kỹ năng thực hành máy tính và làm bài kiểm tra rất xuất sắc. Cần phát huy ở phần giải thuật toán nâng cao.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
