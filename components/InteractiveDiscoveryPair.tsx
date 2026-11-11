'use client';

import { useState, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Trophy,
  Check,
  X,
  Layers,
  ChevronDown
} from 'lucide-react';
import { CurriculumPeriod } from '@/lib/curriculum-data';

interface InteractiveDiscoveryPairProps {
  currentPeriod: CurriculumPeriod;
  student1Name: string;
  student2Name?: string;
  isLocked: boolean;
  onComplete: (score: number) => void;
}

export default function InteractiveDiscoveryPair({
  currentPeriod,
  student1Name,
  student2Name,
  isLocked,
  onComplete,
}: InteractiveDiscoveryPairProps) {
  const ws = currentPeriod.worksheet;
  const dragDrop = ws?.dragDrop;
  const fillBlanks = ws?.fillBlanks;
  const matchingPairs = ws?.matchingPairs;
  const wordBank = ws?.wordBank;

  // 1. Trạng thái Kéo thả phân loại (Drag & Drop)
  const [bucketAssignments, setBucketAssignments] = useState<Record<string, string>>({});

  // 2. Trạng thái Điền khuyết thả chọn (Dropdown Cloze)
  const [dropdownAnswers, setDropdownAnswers] = useState<Record<number, string>>({});

  // 3. Trạng thái Nối cặp (Matching Pairs)
  const [selectedMatchingLeft, setSelectedMatchingLeft] = useState<string | null>(null);
  const [matchingConnections, setMatchingConnections] = useState<Record<string, string>>({});

  // Trạng thái nộp bài & chấm điểm
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [resultScore, setResultScore] = useState<number>(0);
  const [feedbackList, setFeedbackList] = useState<string[]>([]);

  // Đổi vai trò Kỹ thuật viên ⇄ Thư ký
  const [currentRoleTurn, setCurrentRoleTurn] = useState<'A' | 'B'>('A');

  // Xử lý kéo thả: gán item vào bucket
  const handleAssignBucket = (itemText: string, bucketName: string) => {
    if (isSubmitted || isLocked) return;
    setBucketAssignments((prev) => ({
      ...prev,
      [itemText]: bucketName,
    }));
  };

  // Xử lý chọn đáp án dropdown
  const handleSelectDropdown = (idx: number, answer: string) => {
    if (isSubmitted || isLocked) return;
    setDropdownAnswers((prev) => ({
      ...prev,
      [idx]: answer,
    }));
  };

  // Xử lý nối cặp
  const handleSelectLeft = (leftItem: string) => {
    if (isSubmitted || isLocked) return;
    setSelectedMatchingLeft(leftItem);
  };

  const handleConnectRight = (rightItem: string) => {
    if (isSubmitted || isLocked || !selectedMatchingLeft) return;
    setMatchingConnections((prev) => ({
      ...prev,
      [selectedMatchingLeft]: rightItem,
    }));
    setSelectedMatchingLeft(null);
  };

  // Chấm điểm tự động chuẩn xác 100%
  const handleSubmitWorksheet = () => {
    let earnedPoints = 0;
    let totalItems = 0;
    const feedback: string[] = [];

    // Chấm phần 1: Drag & Drop
    if (dragDrop && dragDrop.items) {
      dragDrop.items.forEach((item) => {
        totalItems += 1;
        const userChoice = bucketAssignments[item.text];
        if (userChoice === item.bucket) {
          earnedPoints += 1;
        } else {
          feedback.push(`Phân loại: "${item.text}" thuộc về [${item.bucket}]`);
        }
      });
    }

    // Chấm phần 2: Fill blanks dropdown
    if (fillBlanks) {
      fillBlanks.forEach((item, idx) => {
        totalItems += 1;
        const userChoice = dropdownAnswers[idx];
        if (userChoice === item.correctAnswer) {
          earnedPoints += 1;
        } else {
          feedback.push(`Khái niệm câu ${idx + 1}: Đáp án chính xác là "${item.correctAnswer}"`);
        }
      });
    }

    // Chấm phần 3: Matching Pairs
    if (matchingPairs) {
      matchingPairs.forEach((pair) => {
        totalItems += 1;
        const userChoice = matchingConnections[pair.left];
        if (userChoice === pair.right) {
          earnedPoints += 1;
        } else {
          feedback.push(`Ghép cặp: [${pair.left}] tương ứng với [${pair.right}]`);
        }
      });
    }

    // Tính thang điểm 10 chuẩn
    const finalScore = totalItems > 0 ? Math.round((earnedPoints / totalItems) * 10 * 10) / 10 : 10;
    setResultScore(finalScore);
    setFeedbackList(feedback);
    setIsSubmitted(true);
    onComplete(finalScore);
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER CẶP ĐÔI & PHÂN VAI SƯ PHẠM */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white uppercase tracking-wider">
                Khối {currentPeriod.grade} · Tiết {currentPeriod.period}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-400 text-slate-950 font-black">
                Khám Phá Cặp Đôi (10 Phút)
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black">
                +{ws.xpReward || 50} XP Thưởng
              </span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-white mt-2">
              {ws.title || `Khám phá kiến thức Tiết ${currentPeriod.period}: ${currentPeriod.title}`}
            </h2>
            <p className="text-xs text-blue-100 font-medium mt-1">
              {currentPeriod.contentDesc}
            </p>
          </div>

          {/* Hộp phân chia vai trò 2 bạn */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shrink-0 text-xs space-y-2 shadow-sm">
            <div className="font-bold flex items-center justify-between gap-3 text-white">
              <span className="text-amber-300 font-bold">👥 Phân Vai Cặp Đôi:</span>
              <button
                type="button"
                onClick={() => setCurrentRoleTurn((prev) => (prev === 'A' ? 'B' : 'A'))}
                className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-[10px] flex items-center gap-1 transition-all"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Đổi vai trò</span>
              </button>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className={`p-1.5 rounded-xl flex items-center gap-2 ${
                currentRoleTurn === 'A' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-blue-100'
              }`}>
                <span>🖱️ Thành viên 1 (Thao tác máy):</span>
                <strong>{student1Name}</strong>
              </div>
              <div className={`p-1.5 rounded-xl flex items-center gap-2 ${
                currentRoleTurn === 'B' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-blue-100'
              }`}>
                <span>📖 Thành viên 2 (Đối soát SGK):</span>
                <strong>{student2Name || 'Chưa ghép bạn'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NHIỆM VỤ 1: KÉO - THẢ PHÂN LOẠI TRỰC QUAN */}
      {dragDrop && dragDrop.items && dragDrop.items.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Nhiệm vụ 1: Phân Loại Dữ Liệu & Khái Niệm Trực Quan</span>
            </h3>
            <span className="text-xs text-blue-600 font-bold">Chọn nhóm phù hợp</span>
          </div>

          <p className="text-xs text-slate-600 italic">
            👉 Đề bài: Thảo luận cùng bạn để xếp các thẻ khái niệm vào đúng 2 nhóm phân loại:
          </p>

          {/* 2 Giỏ chứa (Buckets) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Giỏ A */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border-2 border-blue-300 space-y-3 min-h-[140px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📂</span>
                  <span>{dragDrop.bucketA}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">
                  {Object.values(bucketAssignments).filter((b) => b === dragDrop.bucketA).length} mục
                </span>
              </div>

              {/* Danh sách các item đã gán vào Giỏ A */}
              <div className="flex flex-wrap gap-2">
                {dragDrop.items
                  .filter((item) => bucketAssignments[item.text] === dragDrop.bucketA)
                  .map((item) => (
                    <span
                      key={item.text}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 animate-fadeIn"
                    >
                      <span>{item.text}</span>
                      {!isSubmitted && (
                        <button
                          type="button"
                          onClick={() => handleAssignBucket(item.text, '')}
                          className="hover:text-amber-200 font-bold ml-1"
                        >
                          ✕
                        </button>
                      )}
                    </span>
                  ))}
              </div>

              <div className="text-[10px] text-blue-600 font-medium italic">
                Bấm vào thẻ bên dưới để nạp vào nhóm này
              </div>
            </div>

            {/* Giỏ B */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 space-y-3 min-h-[140px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📂</span>
                  <span>{dragDrop.bucketB}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                  {Object.values(bucketAssignments).filter((b) => b === dragDrop.bucketB).length} mục
                </span>
              </div>

              {/* Danh sách các item đã gán vào Giỏ B */}
              <div className="flex flex-wrap gap-2">
                {dragDrop.items
                  .filter((item) => bucketAssignments[item.text] === dragDrop.bucketB)
                  .map((item) => (
                    <span
                      key={item.text}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 animate-fadeIn"
                    >
                      <span>{item.text}</span>
                      {!isSubmitted && (
                        <button
                          type="button"
                          onClick={() => handleAssignBucket(item.text, '')}
                          className="hover:text-amber-200 font-bold ml-1"
                        >
                          ✕
                        </button>
                      )}
                    </span>
                  ))}
              </div>

              <div className="text-[10px] text-emerald-600 font-medium italic">
                Bấm vào thẻ bên dưới để nạp vào nhóm này
              </div>
            </div>
          </div>

          {/* Các thẻ chờ phân loại */}
          {!isSubmitted && (
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-700 mb-2">Các thẻ chờ xếp vào nhóm:</p>
              <div className="flex flex-wrap gap-2">
                {dragDrop.items
                  .filter((item) => !bucketAssignments[item.text])
                  .map((item) => (
                    <div
                      key={item.text}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-xs"
                    >
                      <span>{item.text}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleAssignBucket(item.text, dragDrop.bucketA)}
                          className="px-2 py-0.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 text-[10px] font-bold"
                          title={`Chuyển vào ${dragDrop.bucketA}`}
                        >
                          {dragDrop.bucketA.slice(0, 8)}...
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAssignBucket(item.text, dragDrop.bucketB)}
                          className="px-2 py-0.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold"
                          title={`Chuyển vào ${dragDrop.bucketB}`}
                        >
                          {dragDrop.bucketB.slice(0, 8)}...
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. NHIỆM VỤ 2: ĐIỀN KHUYẾT THẢ CHỌN THÔNG MINH (DROPDOWN CLOZE) */}
      {fillBlanks && fillBlanks.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>Nhiệm vụ 2: Hoàn Thiện Định Nghĩa Cốt Lõi SGK</span>
            </h3>
            <span className="text-xs text-indigo-600 font-bold">Chọn từ trong danh sách thả xuống</span>
          </div>

          <div className="space-y-3">
            {fillBlanks.map((fb, idx) => {
              const parts = fb.statement.split('[___]');
              const currentChoice = dropdownAnswers[idx] || '';

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed"
                >
                  <span className="font-bold text-blue-700 mr-1.5">{idx + 1}.</span>
                  <span>{parts[0]}</span>

                  <span className="inline-block mx-1">
                    <select
                      disabled={isSubmitted || isLocked}
                      value={currentChoice}
                      onChange={(e) => handleSelectDropdown(idx, e.target.value)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                        isSubmitted
                          ? currentChoice === fb.correctAnswer
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold'
                            : 'bg-rose-100 border-rose-400 text-rose-800 line-through'
                          : 'bg-white border-blue-400 text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    >
                      <option value="">-- Chọn từ khuyết --</option>
                      {(wordBank || [fb.correctAnswer, 'Khác', 'Không xác định']).map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </span>

                  <span>{parts[1] || ''}</span>

                  {isSubmitted && currentChoice !== fb.correctAnswer && (
                    <div className="mt-2 text-[11px] font-bold text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                      ✓ Đáp án đúng theo SGK: <strong>{fb.correctAnswer}</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. NHIỆM VỤ 3: GHÉP ĐÔI KHÁI NIỆM & HÌNH ẢNH (MATCHING PAIRS) */}
      {matchingPairs && matchingPairs.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Nhiệm vụ 3: Nối Cặp Khái Niệm Tương Ứng</span>
            </h3>
            <span className="text-xs text-purple-600 font-bold">Nhấp vế trái ➔ Nhấp vế phải</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cột Vế Trái */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-600">Vế trái (Thuật ngữ / Thao tác):</p>
              {matchingPairs.map((pair) => {
                const isSelected = selectedMatchingLeft === pair.left;
                const isConnected = Boolean(matchingConnections[pair.left]);

                return (
                  <button
                    key={pair.left}
                    type="button"
                    disabled={isSubmitted || isLocked}
                    onClick={() => handleSelectLeft(pair.left)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-100 border-purple-500 text-purple-900 ring-2 ring-purple-400/40 shadow-xs'
                        : isConnected
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    <span>{pair.left}</span>
                    {isConnected && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Cột Vế Phải */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-600">Vế phải (Ý nghĩa / Chức năng):</p>
              {matchingPairs.map((pair) => (
                <button
                  key={pair.right}
                  type="button"
                  disabled={isSubmitted || isLocked || !selectedMatchingLeft}
                  onClick={() => handleConnectRight(pair.right)}
                  className="w-full p-3 rounded-2xl border text-left text-xs text-slate-700 bg-slate-50 border-slate-200 hover:bg-purple-50 hover:border-purple-300 transition-all font-medium"
                >
                  <span>{pair.right}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. NÚT NỘP BÀI CẶP ĐÔI & BẢNG KẾT QUẢ CHẤM ĐIỂM */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {isSubmitted ? (
          <div className="flex items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-xl shadow-xs">
                ⭐
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Điểm Khám Phá Cặp Đôi:</span>
                  <span className="text-base text-emerald-700 font-extrabold">{resultScore} / 10 Điểm</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đã lưu kết quả của cặp đôi và báo cáo trực tiếp về màn hình của Thầy Đỗ Mạnh Trường!
                </p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã hoàn thành Khám phá</span>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              💡 <strong>Lưu ý:</strong> Hai bạn hãy cùng quan sát đối chiếu SGK và thống nhất các đáp án trước khi nhấn nộp bài.
            </div>

            <button
              type="button"
              disabled={isLocked}
              onClick={handleSubmitWorksheet}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Hai Bạn Thống Nhất - Nộp Bài Khám Phá (+50 XP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

