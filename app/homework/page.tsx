'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, 
  UploadCloud, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  AlertCircle, 
  Eye, 
  Trash2, 
  Sparkles,
  BookOpen,
  Send,
  MessageSquare,
  Award
} from 'lucide-react';
import { MOCK_HOMEWORK_ASSIGNMENTS, MOCK_HOMEWORK_SUBMISSIONS, MOCK_CLASSES } from '@/lib/mock-data';
import { HomeworkAssignment, HomeworkSubmission } from '@/lib/types';

export default function HomeworkPage() {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedHwId, setSelectedHwId] = useState<string>(MOCK_HOMEWORK_ASSIGNMENTS[0].id);

  // Form states
  const [classId, setClassId] = useState<string>(MOCK_CLASSES[5].id); // Mặc định 7A11
  const [studentCode, setStudentCode] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  
  // File upload & image preview
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'xlsx' | 'docx' | 'other'>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<HomeworkSubmission | null>(null);
  const [submissionsList, setSubmissionsList] = useState<HomeworkSubmission[]>(MOCK_HOMEWORK_SUBMISSIONS);

  // Tự điền thông tin nếu đã đăng nhập
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem('truong_student_code') || '';
      const savedName = localStorage.getItem('truong_student_name') || '';
      const savedClass = localStorage.getItem('truong_student_class') || '';
      if (savedCode) setStudentCode(savedCode);
      if (savedName) setStudentName(savedName);
      if (savedClass) {
        const found = MOCK_CLASSES.find(c => c.name === savedClass);
        if (found) setClassId(found.id);
      }

      // Tải danh sách đã nộp từ LocalStorage
      const savedSubs = localStorage.getItem('truong_homework_submissions');
      if (savedSubs) {
        try {
          const parsed = JSON.parse(savedSubs);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSubmissionsList(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const filteredHw = selectedGrade === 'all'
    ? MOCK_HOMEWORK_ASSIGNMENTS
    : MOCK_HOMEWORK_ASSIGNMENTS.filter(h => h.grade === selectedGrade);

  const currentHw = MOCK_HOMEWORK_ASSIGNMENTS.find(h => h.id === selectedHwId) || MOCK_HOMEWORK_ASSIGNMENTS[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Detect type
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (['jpg', 'jpeg', 'png', 'webp', 'bmp'].includes(ext || '')) {
        setFileType('image');
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (['xlsx', 'xls'].includes(ext || '')) {
        setFileType('xlsx');
        setImagePreviewUrl(null);
      } else if (['docx', 'doc'].includes(ext || '')) {
        setFileType('docx');
        setImagePreviewUrl(null);
      } else {
        setFileType('other');
        setImagePreviewUrl(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentCode.trim() || !studentName.trim() || !selectedFile) {
      alert('Vui lòng nhập Mã học sinh, Họ tên và chọn tệp bài làm hoặc ảnh chụp vở!');
      return;
    }

    setIsSubmitting(true);
    const chosenClass = MOCK_CLASSES.find(c => c.id === classId) || MOCK_CLASSES[0];

    setTimeout(() => {
      const newSub: HomeworkSubmission = {
        id: `hwsub-${Date.now()}`,
        homeworkId: currentHw.id,
        homeworkTitle: currentHw.title,
        studentCode: studentCode.trim().toUpperCase(),
        studentName: studentName.trim(),
        classId: chosenClass.id,
        className: chosenClass.name,
        fileType: fileType,
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / 1024).toFixed(1)} KB`,
        fileDataUrl: imagePreviewUrl || undefined,
        note: note.trim(),
        submittedAt: 'Vừa xong',
        status: 'submitted',
      };

      const updated = [newSub, ...submissionsList];
      setSubmissionsList(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('truong_homework_submissions', JSON.stringify(updated));
      }

      setSubmissionSuccess(newSub);
      setIsSubmitting(false);
      handleRemoveFile();
      setNote('');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Home className="w-3.5 h-3.5 text-blue-400" />
            Nhiệm vụ tự học tại nhà · THCS Mão Điền
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Cổng Nộp & Quản Lý Bài Tập Về Nhà
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Học sinh nộp bài linh hoạt: <strong>Chụp ảnh trang vở ghi</strong> bằng điện thoại, nộp tệp <strong>Excel (.xlsx)</strong> hoặc tệp <strong>Word (.docx)</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold border border-white/15">
            Mật khẩu nộp bài: 123
          </span>
        </div>
      </div>

      {/* BỘ LỌC THEO KHỐI LỚP */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Lọc bài tập về nhà theo khối:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 6, 7, 8, 9] as const).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGrade === g
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {g === 'all' ? 'Tất cả các khối' : `Khối ${g}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI & GIỮA: FORM NỘP BÀI TẬP VỀ NHÀ */}
        <div className="lg:col-span-2 space-y-6">
          {/* CHỌN BÀI TẬP CẦN NỘP */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Chọn bài tập về nhà cần nộp:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredHw.map((hw) => (
                <button
                  key={hw.id}
                  onClick={() => setSelectedHwId(hw.id)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedHwId === hw.id
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      Khối {hw.grade} · Tuần {hw.week}
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {hw.deadline}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-2">
                    {hw.title}
                  </h3>
                </button>
              ))}
            </div>
          </div>

          {/* CHI TIẾT YÊU CẦU BÀI TẬP */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Yêu cầu bài tập về nhà
              </span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                +{currentHw.xpReward} XP Thưởng
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              {currentHw.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {currentHw.description}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 block uppercase">
                Hướng dẫn làm bài và định dạng nộp:
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {currentHw.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FORM NỘP BÀI (ẢNH / EXCEL / WORD) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-600" />
                <span>Khu Vực Tải Lên Bài Tập Về Nhà</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Hệ thống hỗ trợ nộp ảnh chụp vở trực tiếp từ điện thoại hoặc tải tệp Excel, Word từ máy tính.
              </p>
            </div>

            {submissionSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>NỘP BÀI TẬP VỀ NHÀ THÀNH CÔNG!</span>
                </div>
                <div className="text-xs font-mono bg-white p-2.5 rounded-xl border border-emerald-200 space-y-0.5">
                  <p><strong>Học sinh:</strong> {submissionSuccess.studentName} ({submissionSuccess.studentCode}) - {submissionSuccess.className}</p>
                  <p><strong>Bài tập:</strong> {submissionSuccess.homeworkTitle}</p>
                  <p><strong>Tệp bài làm:</strong> {submissionSuccess.fileName} ({submissionSuccess.fileSize})</p>
                  <p><strong>Thời gian:</strong> {submissionSuccess.submittedAt}</p>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Thầy Trương sẽ kiểm tra và nhận xét bài của em trước buổi học tới.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmitHomework} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* LỚP */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Lớp học *</label>
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  >
                    {MOCK_CLASSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MÃ HỌC SINH */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mã học sinh *</label>
                  <input
                    type="text"
                    value={studentCode}
                    onChange={(e) => setStudentCode(e.target.value)}
                    placeholder="Ví dụ: 7A1101"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 uppercase font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* HỌ VÀ TÊN */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Họ và tên học sinh *</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Ví dụ: Lê Thị Bảo An"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* CHỌN LOẠI VÀ TẢI TỆP */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Chọn tệp hoặc ảnh chụp vở bài làm *</span>
                  <span className="text-[11px] text-slate-400 font-normal">Hỗ trợ .jpg, .png, .xlsx, .docx (Tối đa 25MB)</span>
                </label>

                {!selectedFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 rounded-3xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/30 cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-3"
                  >
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Bấm vào đây để chọn ảnh chụp vở hoặc tệp bài làm
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Chụp ảnh rõ chữ, đủ ánh sáng; hoặc đính kèm tệp bài làm từ máy tính
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {fileType === 'image' && <ImageIcon className="w-5 h-5 text-rose-600" />}
                        {fileType === 'xlsx' && <FileSpreadsheet className="w-5 h-5 text-emerald-600" />}
                        {fileType === 'docx' && <FileText className="w-5 h-5 text-blue-600" />}
                        {fileType === 'other' && <UploadCloud className="w-5 h-5 text-slate-600" />}

                        <div>
                          <span className="text-xs font-bold text-slate-900 block truncate max-w-[240px]">
                            {selectedFile.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {(selectedFile.size / 1024).toFixed(1)} KB · Loại: {fileType.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hủy chọn tệp"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* KHUNG XEM TRƯỚC ẢNH CHỤP VỞ (PREVIEW) */}
                    {imagePreviewUrl && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          Xem trước ảnh chụp trang vở (Kiểm tra độ nét):
                        </span>
                        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-black/5 max-h-60 flex items-center justify-center p-2">
                          <img
                            src={imagePreviewUrl}
                            alt="Ảnh chụp vở bài tập"
                            className="max-h-56 object-contain rounded-xl shadow-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.xlsx,.xls,.docx,.doc,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* LỜI NHẮN CHO THẦY */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Lời nhắn / Câu hỏi gửi Thầy Trương (nếu có):
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Thưa Thầy, bài 2 em chưa hiểu rõ cách lồng 3 hàm IF, Thầy giảng lại giúp em với ạ..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Đang tải bài tập lên máy chủ...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi Bài Tập Về Nhà Cho Thầy Trương</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* CỘT PHẢI: BÀI TẬP VỀ NHÀ ĐÃ NỘP & NHẬN XÉT CỦA THẦY */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Bài tập về nhà đã nộp ({submissionsList.length})</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Nhận xét và điểm số của Thầy Trương sau khi chấm bài.
            </p>

            <div className="space-y-3">
              {submissionsList.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{sub.studentName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {sub.className}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 font-medium truncate">
                    {sub.homeworkTitle}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1.5">
                    <span className="font-mono text-emerald-700 truncate max-w-[130px] flex items-center gap-1">
                      {sub.fileType === 'image' && <ImageIcon className="w-3 h-3 text-rose-500" />}
                      {sub.fileType === 'xlsx' && <FileSpreadsheet className="w-3 h-3 text-emerald-500" />}
                      {sub.fileType === 'docx' && <FileText className="w-3 h-3 text-blue-500" />}
                      {sub.fileName}
                    </span>
                    <span>{sub.submittedAt}</span>
                  </div>

                  {sub.note && (
                    <p className="text-[11px] text-slate-500 italic bg-white p-2 rounded-xl border border-slate-100">
                      &quot;{sub.note}&quot;
                    </p>
                  )}

                  {sub.status === 'graded' ? (
                    <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-950 space-y-1">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span>Điểm: {sub.grade}/10</span>
                        <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">Đã chấm</span>
                      </div>
                      {sub.feedback && (
                        <p className="text-[11px] text-emerald-900 font-medium leading-relaxed">
                          <strong>Thầy nhận xét:</strong> {sub.feedback}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Đã nhận bài · Chờ Thầy chấm
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
