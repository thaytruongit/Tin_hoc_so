'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  FileText,
  Image as ImageIcon,
  Check,
  Send,
  Star,
  RotateCw,
  School,
  ArrowRight,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getCurrentUser, UserSession } from '@/lib/auth';
import { CURRICULUM_DATA, CurriculumPeriod } from '@/lib/curriculum-data';
import { HomeworkSubmission } from '@/lib/types';

export default function HomeworkPage() {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [selectedPeriodNum, setSelectedPeriodNum] = useState<number>(6);

  // Trạng thái nộp bài
  const [submissionType, setSubmissionType] = useState<'image' | 'file'>('image');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [studentNote, setStudentNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<HomeworkSubmission | null>(null);
  const [allSubmissions, setAllSubmissions] = useState<HomeworkSubmission[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    setCurrentUser(user);

    if (user.role === 'student' && user.studentGrade) {
      setSelectedGrade(user.studentGrade);
    }

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('truong_homework_submissions');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setAllSubmissions(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const periodsOfGrade = CURRICULUM_DATA[selectedGrade] || CURRICULUM_DATA[7] || [];
  const currentLesson: CurriculumPeriod = periodsOfGrade.find(p => p.period === selectedPeriodNum) || periodsOfGrade[0];
  const hw = currentLesson.homework;

  // Kiểm tra xem bài này học sinh đã nộp chưa
  const existingSub = allSubmissions.find(
    s => s.homeworkId === `hw-p${currentLesson.period}-g${selectedGrade}` &&
    (currentUser ? s.studentCode === currentUser.studentCode : true)
  );

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImageUrl(null);
    }
  };

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !previewImageUrl) {
      alert('Vui lòng chọn ảnh chụp vở ghi hoặc tệp bài làm để nộp!');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const stName = currentUser?.studentName || 'Học sinh';
      const stCode = currentUser?.studentCode || `HS${selectedGrade}01`;
      const stClass = currentUser?.studentClass || `Lớp ${selectedGrade}A11`;

      const newSub: HomeworkSubmission = {
        id: `hw-sub-${Date.now()}`,
        homeworkId: `hw-p${currentLesson.period}-g${selectedGrade}`,
        homeworkTitle: `BTVN Tiết ${currentLesson.period}: ${currentLesson.title}`,
        studentCode: stCode,
        studentName: stName,
        classId: `c-${selectedGrade}a11`,
        className: stClass,
        fileType: submissionType === 'image' ? 'image' : 'other',
        fileName: selectedFile ? selectedFile.name : `Anh_chup_vo_Tiet_${currentLesson.period}.jpg`,
        fileSize: selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : '1.2 MB',
        fileDataUrl: previewImageUrl || undefined,
        note: studentNote,
        submittedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN'),
        grade: 10,
        feedback: 'Thầy Đỗ Mạnh Trường đã nhận bài: Trình bày bài làm trong vở sạch đẹp, đầy đủ các mục yêu cầu!',
        status: 'graded',
      };

      const updated = [newSub, ...allSubmissions.filter(s => s.homeworkId !== newSub.homeworkId)];
      setAllSubmissions(updated);
      setSubmittedReceipt(newSub);
      setIsSubmitting(false);

      if (typeof window !== 'undefined') {
        localStorage.setItem('truong_homework_submissions', JSON.stringify(updated));
      }

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, 400);
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        <p className="text-sm font-semibold">Đang tải chuyên mục Bài tập về nhà...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* HEADER BÀI TẬP VỀ NHÀ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Bài Tập Về Nhà · Đánh Giá TT 22</span>
            </span>
            <span className="text-xs text-slate-500">
              Giáo viên chấm bài: <strong className="text-slate-800">Thầy Đỗ Mạnh Trường</strong>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
              Khối {selectedGrade}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            GỬI BÀI TẬP VỀ NHÀ MÔN TIN HỌC
          </h1>

          <p className="text-xs sm:text-sm text-slate-600">
            Học sinh hoàn thành bài làm vào vở hoặc trên máy tính, chụp ảnh vở ghi hoặc nộp tệp để Thầy Trường nhận xét và chấm điểm định kỳ.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 shrink-0 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-950">
            <School className="w-4 h-4 text-amber-600" />
            <span>Quy định nộp bài THCS Mão Điền</span>
          </div>
          <div>✓ Hỗ trợ ảnh chụp vở ghi rõ chữ, không mờ nhòe.</div>
          <div>✓ Hỗ trợ tệp văn bản .docx, bảng tính .xlsx, mã .py.</div>
        </div>
      </div>

      {/* CHỌN KHỐI VÀ TIẾT HỌC */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Khối:</span>
            {[6, 7, 8, 9].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setSelectedGrade(g);
                  setSelectedPeriodNum(1);
                  setSelectedFile(null);
                  setPreviewImageUrl(null);
                  setSubmittedReceipt(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedGrade === g
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Khối {g}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-slate-500">
            Đang xem: <strong className="text-amber-800">Tiết {currentLesson.period} - {currentLesson.title}</strong>
          </span>
        </div>

        {/* Danh sách 29 Tiết */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100 scrollbar-thin">
          {periodsOfGrade.map((p) => {
            const hasSub = allSubmissions.some(s => s.homeworkId === `hw-p${p.period}-g${selectedGrade}`);
            const isCur = selectedPeriodNum === p.period;

            return (
              <button
                key={p.period}
                type="button"
                onClick={() => {
                  setSelectedPeriodNum(p.period);
                  setSelectedFile(null);
                  setPreviewImageUrl(null);
                  setSubmittedReceipt(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border flex items-center gap-1 ${
                  isCur
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : hasSub
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>T.{p.period}</span>
                {hasSub && <span className="text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* CHI TIẾT NHIỆM VỤ BÀI TẬP & VÙNG NỘP BÀI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* CỘT TRÁI (5 CỘT): YÊU CẦU BÀI TẬP CỦA TIẾT NÀY */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">
              Yêu Cầu Bài Về Nhà · Tiết {currentLesson.period}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
              Hạn nộp: {hw?.dueInDays || 7} ngày
            </span>
          </div>

          <h3 className="text-base font-extrabold text-slate-900 leading-snug">
            {hw?.title || `Bài tập rèn luyện Tiết ${currentLesson.period}`}
          </h3>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
            {hw?.description || currentLesson.contentDesc || 'Học sinh đọc lại nội dung bài học trong SGK Kết nối tri thức và hoàn thành các câu hỏi bài tập củng cố vào vở ghi.'}
          </div>

          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="font-bold text-slate-800">Hình thức nộp bài được chấp nhận:</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-semibold text-[11px]">
                📸 Ảnh chụp vở ghi (.jpg, .png)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                📄 Tệp Word / Excel / PDF
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-semibold text-[11px]">
                🐍 Tệp Python .py
              </span>
            </div>
          </div>

          {/* KẾT QUẢ ĐÃ CHẤM TỪ THẦY TRƯỜNG NẾU ĐÃ NỘP */}
          {(existingSub || submittedReceipt) && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Trạng thái: ĐÃ NỘP VÀ ĐƯỢC THẦY CHẤM</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-black text-xs">
                  {existingSub?.grade || 10}/10 ĐIỂM
                </span>
              </div>
              <p className="text-slate-700 italic text-[11px]">
                "{existingSub?.feedback || submittedReceipt?.feedback}"
              </p>
              <div className="text-[10px] text-slate-500">
                Thời gian nộp: {existingSub?.submittedAt || submittedReceipt?.submittedAt}
              </div>
            </div>
          )}
        </div>

        {/* CỘT PHẢI (7 CỘT): FORM NỘP BÀI (ẢNH VỞ HOẶC FILE) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-amber-600" />
              <span>Nộp Sản Phẩm Bài Làm</span>
            </h3>

            {/* TAB CHUYỂN ĐỔI: ẢNH VỞ ⇄ TỆP ĐIỆN TỬ */}
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => { setSubmissionType('image'); setSelectedFile(null); setPreviewImageUrl(null); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  submissionType === 'image' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Chụp Ảnh Vở</span>
              </button>
              <button
                type="button"
                onClick={() => { setSubmissionType('file'); setSelectedFile(null); setPreviewImageUrl(null); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  submissionType === 'file' ? 'bg-white text-blue-800 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Nộp Tệp File</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitHomework} className="space-y-4">
            
            {submissionType === 'image' ? (
              /* VÙNG CHỤP / TẢI ẢNH CHỤP VỞ */
              <div className="space-y-3">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleSelectImage}
                />

                {previewImageUrl ? (
                  <div className="space-y-2">
                    <div className="relative border rounded-2xl overflow-hidden max-h-72 flex items-center justify-center bg-slate-900">
                      <img
                        src={previewImageUrl}
                        alt="Ảnh vở bài tập"
                        className="max-h-72 object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đã chọn ảnh chụp vở bài tập
                      </span>
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-800 underline font-semibold"
                      >
                        Chụp / Chọn lại ảnh khác
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-amber-300 bg-amber-50/40 hover:bg-amber-50/80 rounded-3xl p-8 text-center cursor-pointer transition-all space-y-2"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      Bấm vào đây để <span className="text-amber-700 underline">Chụp ảnh vở ghi</span> hoặc chọn ảnh từ máy
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Hãy chụp vuông góc trang vở dưới ánh sáng rõ để Thầy Trường đọc và chấm bài chính xác.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* VÙNG NỘP TỆP FILE */
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx,.xlsx,.py,.cpp,.pdf"
                  className="hidden"
                  onChange={handleSelectFile}
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-300 bg-blue-50/40 hover:bg-blue-50/80 rounded-3xl p-8 text-center cursor-pointer transition-all space-y-2"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {selectedFile ? (
                      <span className="text-emerald-700">Đã chọn tệp: <strong>{selectedFile.name}</strong></span>
                    ) : (
                      <span>Bấm vào đây để <span className="text-blue-700 underline">tải tệp bài làm lên</span></span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Chấp nhận tệp: Word (.docx), Excel (.xlsx), Python (.py), C++ (.cpp), PDF.
                  </p>
                </div>
              </div>
            )}

            {/* Ô NHẬP LỜI NHẮN CHO THẦY TRƯỜNG */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Lời nhắn gửi Thầy Đỗ Mạnh Trường (nếu có thắc mắc bài tập):
              </label>
              <textarea
                rows={2}
                value={studentNote}
                onChange={(e) => setStudentNote(e.target.value)}
                placeholder="Ví dụ: Thưa Thầy, câu số 3 phần bài tập em đã làm theo 2 cách trong vở ạ..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* NÚT BẤM NỘP BÀI */}
            <button
              type="submit"
              disabled={isSubmitting || (!selectedFile && !previewImageUrl)}
              className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Đang gửi bài tới Thầy Trường...' : `Nộp Bài Tập Về Nhà Tiết ${currentLesson.period}`}</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
