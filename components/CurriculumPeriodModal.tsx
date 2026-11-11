'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText as FileTextIcon, 
  Sparkles, 
  Laptop, 
  Download, 
  ArrowRight, 
  AlertCircle, 
  X as CloseIcon,
  Presentation,
  CheckCircle2,
  Users
} from 'lucide-react';
import { CurriculumPeriod } from '@/lib/curriculum-data';

interface CurriculumPeriodModalProps {
  period: CurriculumPeriod | null;
  onClose: () => void;
  activeFocusSection?: 'worksheet' | 'reinforcement' | 'practice' | 'all';
}

export default function CurriculumPeriodModal({
  period,
  onClose,
  activeFocusSection = 'all',
}: CurriculumPeriodModalProps) {
  if (!period) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black uppercase tracking-wider">
                TIẾT {period.period} - KHỐI {period.grade}
              </span>
              <span className="text-xs text-blue-200">{period.topic}</span>
            </div>
            <h3 className="text-lg font-bold mt-1 text-white">{period.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Đóng cửa sổ"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Mục tiêu & Năng lực số */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
            <span className="font-bold text-indigo-900 uppercase text-[11px]">🎯 Mục tiêu cần đạt &amp; Năng lực số / AI:</span>
            <p className="text-slate-700 leading-relaxed">{period.contentDesc}</p>
            <p className="font-semibold text-indigo-700 text-[11px] pt-1">Định hướng: {period.digitalCompetency}</p>
          </div>

          {/* 1. Phiếu học tập điện tử (Khám phá cặp đôi) */}
          <div className={`space-y-4 rounded-2xl transition-all ${activeFocusSection === 'worksheet' ? 'ring-2 ring-blue-400 p-2 bg-blue-50/20' : ''}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4 text-blue-600" />
                  <span>1. Phiếu học tập điện tử (Khám phá cặp đôi - 2 HS/máy)</span>
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">
                  Thời lượng: {period.worksheet.timeLimitMin || 15} phút · Thưởng: +{period.worksheet.xpReward || 50} XP chia đều tài khoản
                </span>
              </div>
              <Link
                href={`/in-class?grade=${period.grade}&period=${period.period}&tab=worksheet`}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all shrink-0"
              >
                <span>Làm Phiếu Cặp đôi trên lớp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bối cảnh khởi động SGK */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
              <span className="font-bold text-blue-900 text-xs">Tình huống khởi động &amp; khám phá SGK:</span>
              <p className="text-slate-700 text-xs leading-relaxed">{period.worksheet.phase1_khoi_dong || period.worksheet.phase2_kham_pha}</p>
            </div>

            {/* Ngân hàng từ khóa Word Bank */}
            {period.worksheet.wordBank && period.worksheet.wordBank.length > 0 && (
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 text-xs">Kho thẻ từ khóa bám sát SGK Kết nối tri thức:</span>
                <div className="flex flex-wrap gap-1.5">
                  {period.worksheet.wordBank.map((w, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Điền khuyết SGK */}
            {period.worksheet.fillBlanks && period.worksheet.fillBlanks.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-slate-700 text-xs">Nhiệm vụ điền khuyết kiến thức cốt lõi:</span>
                <div className="space-y-2">
                  {period.worksheet.fillBlanks.map((fb, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <p className="text-slate-800 font-medium"><strong>Câu {idx + 1}:</strong> {fb.statement}</p>
                      <p className="text-emerald-700 font-semibold text-[11px]">✓ Từ khóa cần điền: <span className="underline font-bold">{fb.correctAnswer}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nối cặp / Phân loại */}
            {period.worksheet.matchingPairs && period.worksheet.matchingPairs.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-slate-700 text-xs">Nối cặp khái niệm &amp; bản chất kỹ thuật:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {period.worksheet.matchingPairs.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs space-y-0.5">
                      <span className="font-bold text-indigo-900 block">● {m.left}</span>
                      <span className="text-slate-600 block text-[11px]">{m.right}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Thảo luận cặp đôi */}
            {(period.worksheet.discussionPrompt || period.worksheet.phase4_van_dung) && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-900">Thảo luận cặp đôi (Phân vai Kỹ thuật viên &amp; Thư ký):</span>
                <p className="text-slate-700 leading-relaxed">{period.worksheet.discussionPrompt || period.worksheet.phase4_van_dung}</p>
              </div>
            )}
          </div>

          {/* 2. Củng cố bài học 7 câu */}
          <div className={`space-y-3 rounded-2xl transition-all ${activeFocusSection === 'reinforcement' ? 'ring-2 ring-amber-400 p-2 bg-amber-50/20' : ''}`}>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>2. NGÂN HÀNG CỦNG CỐ BÀI HỌC ({period.reinforcement.matrix || '3 BIẾT - 2 HIỂU - 2 VẬN DỤNG'})</span>
              </h4>
              <Link
                href={`/in-class?grade=${period.grade}&period=${period.period}&tab=reinforcement`}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
              >
                <span>Làm bài 7 câu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {period.reinforcement.questions.map((q, qIdx) => (
                <div key={q.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Câu {qIdx + 1}: {q.question}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {q.level}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold">
                    ✓ Đáp án đúng: {q.options[q.correctIndex]}
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    💡 Lời giải của Thầy: {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Bài tập thực hành phòng máy & Rubric 10 điểm */}
          <div className={`space-y-3 rounded-2xl transition-all ${activeFocusSection === 'practice' ? 'ring-2 ring-purple-400 p-2 bg-purple-50/20' : ''}`}>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Laptop className="w-4 h-4 text-purple-600" />
                <span>3. BÀI TẬP THỰC HÀNH PHÒNG MÁY &amp; RUBRIC 10 ĐIỂM</span>
              </h4>
              {period.isPractice && period.practicalTask && (
                <Link
                  href={`/in-class?grade=${period.grade}&period=${period.period}&tab=practice`}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <span>Mở giao diện Thực hành máy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {period.isPractice && period.practicalTask ? (
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-900 font-extrabold text-[10px] uppercase">
                      Tiết thực hành chính thức
                    </span>
                    <p className="font-bold text-purple-950 text-sm mt-1">{period.practicalTask.title}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono bg-white px-2.5 py-1 rounded-lg border border-purple-200 text-purple-800 font-bold block shadow-2xs">
                      {period.practicalTask.sampleFileName}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-slate-800 text-xs">Quy trình 6 bước thực hành chuẩn:</span>
                  <div className="space-y-1 bg-white p-3 rounded-xl border border-purple-100">
                    {period.practicalTask.steps.map((st, sIdx) => (
                      <div key={sIdx} className="text-slate-700 text-xs flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-slate-800 text-xs">Rubric thang điểm 10 chuẩn sư phạm:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {period.practicalTask.rubric.map((rb, rIdx) => (
                      <div key={rIdx} className="p-2.5 rounded-xl bg-white border border-purple-100 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-purple-900 text-[11px]">{rb.criterion}</span>
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            {rb.maxPoints} điểm
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-tight">{rb.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-slate-600 text-xs space-y-1 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Tiết học Lý thuyết &amp; Khám phá kiến thức cốt lõi</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">
                    Toàn bộ thời lượng tiết học này dành cho hoạt động <strong>Phiếu học tập điện tử Khám phá cặp đôi (2 HS/máy)</strong> và <strong>Luyện tập củng cố 7 câu chuẩn Bộ GD&amp;ĐT</strong>. Không yêu cầu nộp sản phẩm thực hành phần mềm.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 4. Bài tập về nhà */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
            <span className="font-bold text-purple-900 uppercase text-[11px]">4. NHIỆM VỤ BÀI TẬP VỀ NHÀ:</span>
            <p className="text-slate-700 leading-relaxed">{period.homework.description}</p>
            <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
              <span className="text-[11px] text-slate-500">Định dạng nộp: Ảnh chụp vở (.jpg, .png), Excel (.xlsx), Word (.docx)</span>
              <Link
                href={`/in-class?grade=${period.grade}&period=${period.period}&tab=practice`}
                className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] shadow-xs"
              >
                Vào làm bài thực hành →
              </Link>
            </div>
          </div>

          {/* 5. Tệp bài giảng PowerPoint (.pptx) & Trực tuyến */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-900 uppercase text-[11px] flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-rose-600" />
                <span>5. TÀI LIỆU TỰ HỌC: BÀI GIẢNG POWERPOINT (.PPTX)</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200/60 text-rose-800">
                {period.slide?.slideCount || 20} trang
              </span>
            </div>
            <div className="text-xs text-slate-700">
              <span className="font-semibold text-slate-800">Tệp bài giảng:</span> {period.slide?.fileName}
            </div>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <Link
                href={`/in-class?grade=${period.grade}&period=${period.period}&tab=slide`}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-xs"
              >
                <span>Mở khung chiếu Slide trực tuyến</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => alert(`Đang chuẩn bị tải tệp bài giảng gốc (.pptx): ${period.slide?.fileName}`)}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-[11px] flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-rose-600" />
                <span>Tải tệp gốc (.pptx)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            THCS Mão Điền — Hệ sinh thái học tập số môn Tin học
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
