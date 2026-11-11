'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Users,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  School,
  UserCheck,
  Award,
  Filter,
  Save,
  Edit3,
  Sparkles,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { Student } from '@/lib/types';
import { getClassroomState } from '@/lib/classroom-control';

export interface OfficialGradeRow {
  studentCode: string;
  fullName: string;
  className: string;
  tx1: number; // ĐĐGtx 1: Thực hành phòng máy
  tx2: number; // ĐĐGtx 2: Khám phá kiến thức
  tx3: number; // ĐĐGtx 3: Bài tập về nhà
  tx4: number; // ĐĐGtx 4: Kỹ năng số & AI
  gk: number;  // ĐĐGgk: Giữa kỳ (hệ số 2)
  ck: number;  // ĐĐGck: Cuối kỳ (hệ số 3)
  dtb: number; // Điểm trung bình học kỳ
  rank: 'Tốt' | 'Khá' | 'Đạt' | 'Chưa đạt';
  comment: string;
}

export default function GradebookPage() {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  // Bộ chọn lớp và kỳ học
  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [selectedClassId, setSelectedClassId] = useState<string>('c-7a11');
  const [selectedSemester, setSelectedSemester] = useState<'hk1' | 'hk2' | 'year'>('hk1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Chế độ chỉnh sửa điểm của Giáo viên
  const [editingStudentCode, setEditingStudentCode] = useState<string | null>(null);
  const [tempEditScores, setTempEditScores] = useState<Partial<OfficialGradeRow>>({});
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string>('');

  // Dữ liệu sổ điểm lưu trữ
  const [customGradebook, setCustomGradebook] = useState<Record<string, OfficialGradeRow>>({});

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    setCurrentUser(user);

    if (user.role === 'student' && user.studentClass) {
      // Tự động chọn đúng lớp của học sinh
      const matchCls = MOCK_CLASSES.find(c => c.name === user.studentClass || user.studentClass?.includes(c.name.replace('Lớp ', '')));
      if (matchCls) {
        setSelectedGrade(matchCls.grade);
        setSelectedClassId(matchCls.id);
      }
    } else if (user.role === 'teacher') {
      const clsState = getClassroomState();
      if (clsState.activeClassId && clsState.activeGrade) {
        setSelectedGrade(clsState.activeGrade);
        setSelectedClassId(clsState.activeClassId);
      }
    }

    // Tải dữ liệu điểm đã chỉnh sửa từ giáo viên nếu có
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('truong_official_gradebook');
        if (saved) {
          setCustomGradebook(JSON.parse(saved));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const isTeacher = currentUser?.role === 'teacher';

  const classesInGrade = useMemo(() => {
    return MOCK_CLASSES.filter(c => c.grade === selectedGrade);
  }, [selectedGrade]);

  const currentClass = useMemo(() => {
    return MOCK_CLASSES.find(c => c.id === selectedClassId) || classesInGrade[0] || MOCK_CLASSES[4];
  }, [selectedClassId, classesInGrade]);

  // Tạo danh sách điểm chuẩn TT22 cho lớp đang chọn
  const gradebookRows: OfficialGradeRow[] = useMemo(() => {
    const students = MOCK_STUDENTS.filter(s => s.classId === currentClass.id);

    return students.map((s, idx) => {
      // Nếu giáo viên đã chỉnh sửa điểm thì lấy điểm tùy chỉnh
      if (customGradebook[s.studentCode]) {
        return customGradebook[s.studentCode];
      }

      // Điểm sinh động giả lập chuẩn hóa theo năng lực học sinh
      const baseSeed = (s.totalXp % 30) / 10;
      const tx1 = Number((8.0 + (idx % 3) * 0.7).toFixed(1));
      const tx2 = Number((7.5 + ((idx * 2) % 4) * 0.6).toFixed(1));
      const tx3 = Number((8.5 + (idx % 2) * 1.0).toFixed(1));
      const tx4 = Number((8.0 + ((idx + 1) % 3) * 0.8).toFixed(1));
      const gk = Number((8.0 + (idx % 4) * 0.5).toFixed(1));
      const ck = Number((8.5 + ((idx + 2) % 3) * 0.6).toFixed(1));

      // Công thức tính ĐTBmhk theo TT22: (TĐĐGtx + 2*ĐĐGgk + 3*ĐĐGck) / (Số ĐĐGtx + 5)
      const sumTx = tx1 + tx2 + tx3 + tx4;
      const dtb = Number(((sumTx + 2 * gk + 3 * ck) / 9).toFixed(1));

      let rank: 'Tốt' | 'Khá' | 'Đạt' | 'Chưa đạt' = 'Tốt';
      let comment = 'Nắm vững kiến thức, kỹ năng thực hành tốt!';
      if (dtb < 5.0) {
        rank = 'Chưa đạt';
        comment = 'Cần tăng cường rèn luyện thao tác máy tính tại phòng máy.';
      } else if (dtb < 6.5) {
        rank = 'Đạt';
        comment = 'Hoàn thành các yêu cầu cần đạt, cần chăm chỉ làm BTVN hơn.';
      } else if (dtb < 8.0) {
        rank = 'Khá';
        comment = 'Thao tác nhanh nhẹn, nắm chắc lý thuyết và bài tập thực hành.';
      } else {
        rank = 'Tốt';
        comment = 'Rất xuất sắc, có tư duy logic thuật ngữ sắc bén, tích cực hỗ trợ bạn.';
      }

      return {
        studentCode: s.studentCode,
        fullName: s.fullName,
        className: currentClass.name,
        tx1,
        tx2,
        tx3,
        tx4,
        gk,
        ck,
        dtb,
        rank,
        comment,
      };
    });
  }, [currentClass, customGradebook]);

  // Lọc tìm kiếm theo tên hoặc mã HS
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return gradebookRows;
    const q = searchQuery.toLowerCase().trim();
    return gradebookRows.filter(
      r => r.fullName.toLowerCase().includes(q) || r.studentCode.toLowerCase().includes(q)
    );
  }, [gradebookRows, searchQuery]);

  // Thống kê chất lượng lớp
  const stats = useMemo(() => {
    const total = gradebookRows.length;
    if (total === 0) return { total: 0, tot: 0, kha: 0, dat: 0, chuaDat: 0, avgDtb: 0 };

    const tot = gradebookRows.filter(r => r.rank === 'Tốt').length;
    const kha = gradebookRows.filter(r => r.rank === 'Khá').length;
    const dat = gradebookRows.filter(r => r.rank === 'Đạt').length;
    const chuaDat = gradebookRows.filter(r => r.rank === 'Chưa đạt').length;
    const sumDtb = gradebookRows.reduce((acc, r) => acc + r.dtb, 0);
    const avgDtb = Number((sumDtb / total).toFixed(1));

    return { total, tot, kha, dat, chuaDat, avgDtb };
  }, [gradebookRows]);

  // Giáo viên bắt đầu sửa điểm
  const handleStartEdit = (row: OfficialGradeRow) => {
    if (!isTeacher) return;
    setEditingStudentCode(row.studentCode);
    setTempEditScores({ ...row });
  };

  // Giáo viên lưu điểm vừa sửa
  const handleSaveEdit = (code: string) => {
    if (!editingStudentCode || !tempEditScores) return;

    const tx1 = Number(tempEditScores.tx1 ?? 8);
    const tx2 = Number(tempEditScores.tx2 ?? 8);
    const tx3 = Number(tempEditScores.tx3 ?? 8);
    const tx4 = Number(tempEditScores.tx4 ?? 8);
    const gk = Number(tempEditScores.gk ?? 8);
    const ck = Number(tempEditScores.ck ?? 8);

    const sumTx = tx1 + tx2 + tx3 + tx4;
    const dtb = Number(((sumTx + 2 * gk + 3 * ck) / 9).toFixed(1));

    let rank: 'Tốt' | 'Khá' | 'Đạt' | 'Chưa đạt' = 'Tốt';
    if (dtb < 5.0) rank = 'Chưa đạt';
    else if (dtb < 6.5) rank = 'Đạt';
    else if (dtb < 8.0) rank = 'Khá';

    const updatedRow: OfficialGradeRow = {
      ...(tempEditScores as OfficialGradeRow),
      studentCode: code,
      tx1,
      tx2,
      tx3,
      tx4,
      gk,
      ck,
      dtb,
      rank,
    };

    const nextCustom = { ...customGradebook, [code]: updatedRow };
    setCustomGradebook(nextCustom);
    setEditingStudentCode(null);

    if (typeof window !== 'undefined') {
      localStorage.setItem('truong_official_gradebook', JSON.stringify(nextCustom));
    }

    setSaveSuccessNotice(`Đã nạp và lưu điểm thành công cho học sinh ${updatedRow.fullName}!`);
    setTimeout(() => setSaveSuccessNotice(''), 4000);
  };

  // 1-Click Xuất Sổ Điểm Excel (.xls) chuẩn UTF-8
  const handleExportExcel = () => {
    const nowStr = new Date().toLocaleString('vi-VN');
    const tableRows = gradebookRows
      .map(
        (r, idx) => `
      <tr>
        <td style="text-align:center; padding: 6px; border: 1px solid #000;">${idx + 1}</td>
        <td style="text-align:center; font-weight:bold; padding: 6px; border: 1px solid #000;">${r.studentCode}</td>
        <td style="padding: 6px; border: 1px solid #000; font-weight:bold;">${r.fullName}</td>
        <td style="text-align:center; padding: 6px; border: 1px solid #000;">${r.tx1}</td>
        <td style="text-align:center; padding: 6px; border: 1px solid #000;">${r.tx2}</td>
        <td style="text-align:center; padding: 6px; border: 1px solid #000;">${r.tx3}</td>
        <td style="text-align:center; padding: 6px; border: 1px solid #000;">${r.tx4}</td>
        <td style="text-align:center; font-weight:bold; color: #1e40af; padding: 6px; border: 1px solid #000;">${r.gk}</td>
        <td style="text-align:center; font-weight:bold; color: #b45309; padding: 6px; border: 1px solid #000;">${r.ck}</td>
        <td style="text-align:center; font-weight:bold; font-size:12pt; background-color:#fef3c7; color:#92400e; padding: 6px; border: 1px solid #000;">${r.dtb}</td>
        <td style="text-align:center; font-weight:bold; padding: 6px; border: 1px solid #000;">${r.rank}</td>
        <td style="padding: 6px; border: 1px solid #000;">${r.comment}</td>
      </tr>
    `
      )
      .join('');

    const template = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
          table { border-collapse: collapse; width: 100%; font-family: 'Times New Roman', serif; font-size: 11pt; }
          th { background-color: #1e3a8a; color: #ffffff; font-weight: bold; padding: 8px; text-align: center; border: 1px solid #000; }
        </style>
      </head>
      <body>
        <div style="font-family: 'Times New Roman', serif; margin-bottom: 16px;">
          <h4 style="margin: 0; text-transform: uppercase;">UBND PHƯỜNG MÃO ĐIỀN — TRƯỜNG THCS MÃO ĐIỀN</h4>
          <h2 style="margin: 4px 0; color: #1e3a8a; text-transform: uppercase;">BẢNG ĐIỂM HỌC KỲ MÔN TIN HỌC (CHUẨN THÔNG TƯ 22)</h2>
          <p style="margin: 2px 0;"><strong>Lớp:</strong> ${currentClass.name} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Giáo viên phụ trách:</strong> Thầy Đỗ Mạnh Trường</p>
          <p style="margin: 2px 0;"><strong>Học kỳ:</strong> ${selectedSemester === 'hk1' ? 'Học kỳ I' : selectedSemester === 'hk2' ? 'Học kỳ II' : 'Cả năm'} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Thời gian xuất:</strong> ${nowStr}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã HS</th>
              <th>Họ và Tên</th>
              <th>ĐĐGtx 1</th>
              <th>ĐĐGtx 2</th>
              <th>ĐĐGtx 3</th>
              <th>ĐĐGtx 4</th>
              <th>ĐĐGgk (x2)</th>
              <th>ĐĐGck (x3)</th>
              <th>ĐTBmhk</th>
              <th>Mức ĐG</th>
              <th>Nhận Xét Của Thầy Trường</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([template], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bang_Diem_TinHoc_${currentClass.name.replace(/\s+/g, '_')}_${selectedSemester.toUpperCase()}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-sm font-semibold">Đang tải bảng điểm học kỳ THCS Mão Điền...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* HEADER BẢNG ĐIỂM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-700" />
              <span>Sổ Điểm Điện Tử · Chuẩn Thông Tư 22</span>
            </span>
            <span className="text-xs text-slate-500">
              Phê duyệt bởi: <strong className="text-slate-800">Thầy Đỗ Mạnh Trường</strong>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
              {currentClass.name}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            BẢNG ĐIỂM HỌC KỲ MÔN TIN HỌC THEO LỚP
          </h1>

          <p className="text-xs sm:text-sm text-slate-600">
            Dữ liệu điểm chính thức được nạp và quản lý trực tiếp từ Giáo viên môn Tin học. Điểm tổng kết tự động tính theo công thức chuẩn Bộ GD&amp;ĐT.
          </p>
        </div>

        {/* THAO TÁC XUẤT EXCEL & CHẾ ĐỘ GIÁO VIÊN */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Excel .xls</span>
          </button>

          {isTeacher && (
            <div className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>Chế độ nạp điểm Giáo viên</span>
            </div>
          )}
        </div>
      </div>

      {/* THÔNG BÁO LƯU THÀNH CÔNG */}
      {saveSuccessNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* THẺ THỐNG KÊ CHẤT LƯỢNG LỚP */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
          <div className="text-xl font-black text-slate-900">{stats.total}</div>
          <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">Sĩ Số Lớp</div>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
          <div className="text-xl font-black text-emerald-700">{stats.tot} ({stats.total > 0 ? Math.round((stats.tot/stats.total)*100) : 0}%)</div>
          <div className="text-[11px] font-bold text-emerald-800 uppercase mt-0.5">Mức Tốt (≥ 8.0)</div>
        </div>
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
          <div className="text-xl font-black text-blue-700">{stats.kha} ({stats.total > 0 ? Math.round((stats.kha/stats.total)*100) : 0}%)</div>
          <div className="text-[11px] font-bold text-blue-800 uppercase mt-0.5">Mức Khá (6.5 - 7.9)</div>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <div className="text-xl font-black text-amber-700">{stats.dat} ({stats.total > 0 ? Math.round((stats.dat/stats.total)*100) : 0}%)</div>
          <div className="text-[11px] font-bold text-amber-800 uppercase mt-0.5">Mức Đạt (5.0 - 6.4)</div>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center col-span-2 sm:col-span-1">
          <div className="text-xl font-black text-indigo-700">{stats.avgDtb}</div>
          <div className="text-[11px] font-bold text-indigo-800 uppercase mt-0.5">ĐTB Toàn Lớp</div>
        </div>
      </div>

      {/* BỘ LỌC KHỐI, LỚP VÀ TÌM KIẾM */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Chọn Khối */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-600 mr-1">Khối:</span>
            {[6, 7, 8, 9].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setSelectedGrade(g);
                  const firstCls = MOCK_CLASSES.find(c => c.grade === g);
                  if (firstCls) setSelectedClassId(firstCls.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedGrade === g
                    ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Khối {g}
              </button>
            ))}
          </div>

          {/* Chọn Kỳ học */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedSemester('hk1')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSemester === 'hk1' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Học Kỳ I
            </button>
            <button
              type="button"
              onClick={() => setSelectedSemester('hk2')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSemester === 'hk2' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Học Kỳ II
            </button>
            <button
              type="button"
              onClick={() => setSelectedSemester('year')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSemester === 'year' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Cả Năm
            </button>
          </div>
        </div>

        {/* Danh sách lớp thuộc Khối */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-bold text-slate-600 shrink-0 mr-1">Lớp:</span>
            {classesInGrade.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedClassId(c.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                  selectedClassId === c.id
                    ? 'bg-teal-50 border-teal-400 text-teal-900 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Ô tìm kiếm học sinh */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhanh học sinh theo tên/mã..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* BẢNG ĐIỂM CHUẨN THÔNG TƯ 22 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200 uppercase text-[10px] tracking-wide">
                <th className="py-3 px-3 text-center w-12">STT</th>
                <th className="py-3 px-3 text-center w-24">Mã HS</th>
                <th className="py-3 px-4 min-w-[170px]">Họ và Tên Học Sinh</th>
                <th className="py-3 px-2 text-center w-16" title="Đánh giá thường xuyên 1 (Thực hành phòng máy)">ĐĐGtx 1</th>
                <th className="py-3 px-2 text-center w-16" title="Đánh giá thường xuyên 2 (Khám phá bài học)">ĐĐGtx 2</th>
                <th className="py-3 px-2 text-center w-16" title="Đánh giá thường xuyên 3 (Bài tập về nhà)">ĐĐGtx 3</th>
                <th className="py-3 px-2 text-center w-16" title="Đánh giá thường xuyên 4 (Năng lực số & AI)">ĐĐGtx 4</th>
                <th className="py-3 px-2 text-center w-16 text-blue-700" title="Đánh giá giữa kỳ (Hệ số 2)">ĐĐGgk (x2)</th>
                <th className="py-3 px-2 text-center w-16 text-amber-700" title="Đánh giá cuối kỳ (Hệ số 3)">ĐĐGck (x3)</th>
                <th className="py-3 px-3 text-center w-20 text-teal-800 bg-teal-50/70" title="Điểm trung bình môn học kỳ">ĐTBmhk</th>
                <th className="py-3 px-3 text-center w-24">Mức ĐG</th>
                <th className="py-3 px-4 min-w-[200px]">Nhận Xét Sư Phạm (Thầy Trường)</th>
                {isTeacher && <th className="py-3 px-2 text-center w-16">Thao tác</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row, idx) => {
                const isCurrentStudent = currentUser?.studentCode === row.studentCode;
                const isEditing = editingStudentCode === row.studentCode;

                return (
                  <tr
                    key={row.studentCode}
                    className={`transition-colors ${
                      isCurrentStudent
                        ? 'bg-amber-50/70 font-bold border-l-4 border-l-amber-500'
                        : idx % 2 === 0
                        ? 'bg-white hover:bg-slate-50/70'
                        : 'bg-slate-50/40 hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3 text-center text-slate-500 font-medium">
                      {idx + 1}
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">
                      {row.studentCode}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{row.fullName}</span>
                        {isCurrentStudent && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-400 text-amber-950 font-black text-[9px] uppercase">
                            Em
                          </span>
                        )}
                      </div>
                    </td>

                    {/* CÁC CỘT ĐIỂM (HỖ TRỢ GIÁO VIÊN SỬA KHI CLICK CHẾ ĐỘ EDIT) */}
                    {isEditing ? (
                      <>
                        <td className="py-1 px-1 text-center">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={tempEditScores.tx1 ?? ''}
                            onChange={(e) => setTempEditScores(p => ({ ...p, tx1: parseFloat(e.target.value) }))}
                            className="w-14 p-1 text-center border rounded bg-white font-bold"
                          />
                        </td>
                        <td className="py-1 px-1 text-center">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={tempEditScores.tx2 ?? ''}
                            onChange={(e) => setTempEditScores(p => ({ ...p, tx2: parseFloat(e.target.value) }))}
                            className="w-14 p-1 text-center border rounded bg-white font-bold"
                          />
                        </td>
                        <td className="py-1 px-1 text-center">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={tempEditScores.tx3 ?? ''}
                            onChange={(e) => setTempEditScores(p => ({ ...p, tx3: parseFloat(e.target.value) }))}
                            className="w-14 p-1 text-center border rounded bg-white font-bold"
                          />
                        </td>
                        <td className="py-1 px-1 text-center">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={tempEditScores.tx4 ?? ''}
                            onChange={(e) => setTempEditScores(p => ({ ...p, tx4: parseFloat(e.target.value) }))}
                            className="w-14 p-1 text-center border rounded bg-white font-bold"
                          />
                        </td>
                        <td className="py-1 px-1 text-center">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={tempEditScores.gk ?? ''}
                            onChange={(e) => setTempEditScores(p => ({ ...p, gk: parseFloat(e.target.value) }))}
                            className="w-14 p-1 text-center border rounded bg-blue-50 text-blue-800 font-bold"
                          />
                        </td>
                        <td className="py-1 px-1 text-center">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="10"
                            value={tempEditScores.ck ?? ''}
                            onChange={(e) => setTempEditScores(p => ({ ...p, ck: parseFloat(e.target.value) }))}
                            className="w-14 p-1 text-center border rounded bg-amber-50 text-amber-800 font-bold"
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-2 text-center text-slate-700 font-semibold">{row.tx1}</td>
                        <td className="py-3 px-2 text-center text-slate-700 font-semibold">{row.tx2}</td>
                        <td className="py-3 px-2 text-center text-slate-700 font-semibold">{row.tx3}</td>
                        <td className="py-3 px-2 text-center text-slate-700 font-semibold">{row.tx4}</td>
                        <td className="py-3 px-2 text-center text-blue-700 font-bold">{row.gk}</td>
                        <td className="py-3 px-2 text-center text-amber-700 font-bold">{row.ck}</td>
                      </>
                    )}

                    {/* ĐIỂM TRUNG BÌNH HỌC KỲ */}
                    <td className="py-3 px-3 text-center bg-teal-50/60 font-black text-teal-900 text-sm">
                      {row.dtb}
                    </td>

                    {/* MỨC ĐÁNH GIÁ */}
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        row.rank === 'Tốt'
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.rank === 'Khá'
                          ? 'bg-blue-100 text-blue-800'
                          : row.rank === 'Đạt'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {row.rank}
                      </span>
                    </td>

                    {/* NHẬN XÉT CỦA THẦY TRƯỜNG */}
                    <td className="py-3 px-4 text-slate-600 text-[11px] italic">
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempEditScores.comment ?? ''}
                          onChange={(e) => setTempEditScores(p => ({ ...p, comment: e.target.value }))}
                          className="w-full p-1 border rounded bg-white text-xs"
                        />
                      ) : (
                        row.comment
                      )}
                    </td>

                    {/* NÚT THAO TÁC SỬA / LƯU (DÀNH CHO GIÁO VIÊN) */}
                    {isTeacher && (
                      <td className="py-3 px-2 text-center">
                        {isEditing ? (
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(row.studentCode)}
                            className="p-1.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                            title="Lưu điểm này"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleStartEdit(row)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                            title="Sửa điểm học sinh này"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CHÂN BẢNG ĐIỂM CÓ DẤU MỘC ĐIỆN TỬ */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <School className="w-4 h-4 text-teal-600" />
            <span>Trường THCS Mão Điền · Giáo viên bộ môn Tin học: <strong>Thầy Đỗ Mạnh Trường</strong></span>
          </div>
          <div className="text-[11px] italic">
            * Điểm số có giá trị pháp lý học đường chính thức theo quy định Thông tư 22/2021/TT-BGDĐT.
          </div>
        </div>

      </div>

    </div>
  );
}
