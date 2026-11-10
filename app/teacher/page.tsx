'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  FileText, 
  ClipboardCheck, 
  KeyRound, 
  PlusCircle, 
  Download, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Search,
  Eye
} from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS, MOCK_RECENT_RESULTS, MOCK_WORKSHEETS, MOCK_EXAMS } from '@/lib/mock-data';

export default function TeacherDashboard() {
  const [selectedClassId, setSelectedClassId] = useState(MOCK_CLASSES[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState(MOCK_EXAMS);
  const [notification, setNotification] = useState('');

  const currentClass = MOCK_CLASSES.find(c => c.id === selectedClassId) || MOCK_CLASSES[0];
  const classStudents = MOCK_STUDENTS.filter(s => s.classId === selectedClassId);

  const toggleLockExam = (examId: string) => {
    setExams(prev => prev.map(e => {
      if (e.id === examId) {
        const nextState = !e.isLocked;
        setNotification(`Đã ${nextState ? 'KHÓA' : 'MỞ'} đề thi: ${e.title}`);
        setTimeout(() => setNotification(''), 3000);
        return { ...e, isLocked: nextState };
      }
      return e;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* BANNER GIÁO VIÊN */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            Quản trị giảng dạy Tin học THCS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kênh Giáo Viên · Thầy Trương IT
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Trường THCS Mão Điền · Quản lý các lớp 6A1, 7A1, 8A1, 9A1
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/worksheets"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo phiếu bài tập mới</span>
          </Link>
          <button
            onClick={() => {
              alert('Đang xuất danh sách học sinh và điểm số ra tệp Excel...');
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Xuất báo cáo Excel</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* TỔNG QUAN LỚP & CHỌN LỚP */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Chọn lớp giảng dạy:
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MOCK_CLASSES.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedClassId === cls.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Khối {cls.grade}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {cls.classCode}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 mt-1">{cls.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{cls.studentCount} học sinh</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* DANH SÁCH HỌC SINH & CẤP TÀI KHOẢN (4A) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Danh sách học sinh · {currentClass.name}
              </h3>
              <p className="text-xs text-slate-500">
                Tài khoản & mật khẩu học sinh do thầy cấp (Mô hình 4A)
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên hoặc mã HS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Mã HS</th>
                  <th className="py-3 px-3">Họ và tên</th>
                  <th className="py-3 px-3">Mật khẩu</th>
                  <th className="py-3 px-3">Điểm XP</th>
                  <th className="py-3 px-3">Cấp độ</th>
                  <th className="py-3 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                        {st.studentCode}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900">{st.fullName}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">123</td>
                    <td className="py-3 px-3 font-bold text-amber-600">{st.totalXp} XP</td>
                    <td className="py-3 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[10px]">
                        Cấp {st.level}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => alert(`Đặt lại mật khẩu cho học sinh ${st.fullName} thành "123"`)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px]"
                      >
                        Reset MK
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QUẢN LÝ ĐỀ THI & KHÓA/MỞ ĐỀ THEO TIẾT */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-indigo-600" />
              Khóa / Mở phòng kiểm tra
            </h3>
            <p className="text-xs text-slate-500">
              Kiểm soát quyền làm bài theo tiết học phòng máy
            </p>

            <div className="space-y-3">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 uppercase">
                      Khối {exam.grade} · {exam.examType}
                    </span>
                    <button
                      onClick={() => toggleLockExam(exam.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        exam.isLocked
                          ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {exam.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                      <span>{exam.isLocked ? 'Đang Khóa' : 'Đang Mở'}</span>
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{exam.title}</h4>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Thời gian: {exam.durationMin}p</span>
                    <span>{exam.questionsCount} câu hỏi</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KẾT QUẢ NỘP BÀI GẦN ĐÂY */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              Nộp bài thời gian thực
            </h3>

            <div className="space-y-2.5">
              {MOCK_RECENT_RESULTS.map((res) => (
                <div
                  key={res.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{res.studentName} ({res.className})</span>
                    <span className="text-emerald-600">{res.score}/10đ</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{res.examTitle}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>{res.submittedAt}</span>
                    <span className={res.tabSwitches > 0 ? 'text-amber-600 font-semibold' : 'text-emerald-600'}>
                      {res.tabSwitches > 0 ? `Chuyển tab ${res.tabSwitches} lần` : 'Chấp hành nghiêm túc'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
