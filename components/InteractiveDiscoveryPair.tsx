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
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 rounded-3xl p-6 text-white shadow-neon-cyan/20 relative overflow-hidden border border-cyan-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/40 text-cyan-300 uppercase tracking-wider">
                Khối {currentPeriod.grade} · Tiết {currentPeriod.period}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black">
                Thử Thách Cặp Đôi (10 Phút)
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black">
                +{ws.xpReward || 50} XP Thưởng
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white mt-2 glow-text-cyan">
              {ws.title || `Khám phá kiến thức Tiết ${currentPeriod.period}: ${currentPeriod.title}`}
            </h2>
            <p className="text-xs text-slate-300 font-medium mt-1">
              {currentPeriod.contentDesc}
            </p>
          </div>

          {/* Hộp phân chia vai trò 2 bạn */}
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-cyan-500/30 shrink-0 text-xs space-y-2 shadow-xs">
            <div className="font-bold flex items-center justify-between gap-3 text-white">
              <span className="text-cyan-300 font-black">👥 Phân Vai Buồng Lái:</span>
              <button
                type="button"
                onClick={() => setCurrentRoleTurn((prev) => (prev === 'A' ? 'B' : 'A'))}
                className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-[10px] flex items-center gap-1 transition-all"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Đổi vai trò</span>
              </button>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className={`p-1.5 rounded-xl flex items-center gap-2 ${
                currentRoleTurn === 'A' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300'
              }`}>
                <span>🖱️ Cơ trưởng (Thao tác chuột):</span>
                <strong>{student1Name}</strong>
              </div>
              <div className={`p-1.5 rounded-xl flex items-center gap-2 ${
                currentRoleTurn === 'B' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300'
              }`}>
                <span>📖 Cơ phó (Đối soát SGK):</span>
                <strong>{student2Name || 'Chưa ghép bạn'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NHIỆM VỤ 1: KÉO - THẢ PHÂN LOẠI 3D (DRAG & DROP) */}
      {dragDrop && dragDrop.items && dragDrop.items.length > 0 && (
        <div className="cyber-hud-card rounded-3xl p-6 border border-cyan-500/30 shadow-neon-cyan/20 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
              <span className="glow-text-cyan">Nhiệm vụ 1: Phân Loại Dữ Liệu & Khái Niệm Trực Quan</span>
            </h3>
            <span className="text-xs text-cyan-400 font-bold">Kéo thả hoặc bấm chọn giỏ chứa</span>
          </div>

          <p className="text-xs text-slate-300 italic">
            👉 Đề bài: Thảo luận cùng bạn để xếp các thẻ khái niệm/tệp tin vào đúng 2 nhóm phân loại:
          </p>

          {/* 2 Giỏ chứa (Buckets) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Giỏ A */}
            <div className="p-4 rounded-2xl bg-cyan-950/50 border-2 border-cyan-400/50 space-y-3 min-h-[140px] flex flex-col justify-between shadow-neon-cyan/10">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📂</span>
                  <span>{dragDrop.bucketA}</span>
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-900/80 text-cyan-200 border border-cyan-400/40">
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
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs shadow-xs flex items-center gap-1.5 animate-fadeIn"
                    >
                      <span>{item.text}</span>
                      {!isSubmitted && (
                        <button
                          type="button"
                          onClick={() => handleAssignBucket(item.text, '')}
                          className="hover:text-rose-700 font-black"
                        >
                          ✕
                        </button>
                      )}
                    </span>
                  ))}
              </div>

              <div className="text-[10px] text-cyan-400/70 font-medium italic">
                Bấm vào thẻ bên dưới để nạp vào giỏ này
              </div>
            </div>

            {/* Giỏ B */}
            <div className="p-4 rounded-2xl bg-emerald-950/50 border-2 border-emerald-400/50 space-y-3 min-h-[140px] flex flex-col justify-between shadow-neon-mana/10">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📂</span>
                  <span>{dragDrop.bucketB}</span>
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-400/40">
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
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-xs flex items-center gap-1.5 animate-fadeIn"
                    >
                      <span>{item.text}</span>
                      {!isSubmitted && (
                        <button
                          type="button"
                          onClick={() => handleAssignBucket(item.text, '')}
                          className="hover:text-rose-700 font-black"
                        >
                          ✕
                        </button>
                      )}
                    </span>
                  ))}
              </div>

              <div className="text-[10px] text-emerald-400/70 font-medium italic">
                Bấm vào thẻ bên dưới để nạp vào giỏ này
              </div>
            </div>
          </div>

          {/* Các thẻ chờ phân loại */}
          {!isSubmitted && (
            <div className="pt-3 border-t border-slate-800">
              <p className="text-xs font-bold text-slate-300 mb-2">Các thẻ chờ xếp vào nhóm:</p>
              <div className="flex flex-wrap gap-2">
                {dragDrop.items
                  .filter((item) => !bucketAssignments[item.text])
                  .map((item) => (
                    <div
                      key={item.text}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 shadow-xs"
                    >
                      <span>{item.text}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleAssignBucket(item.text, dragDrop.bucketA)}
                          className="px-2 py-0.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-[10px] font-black"
                          title={`Chuyển vào ${dragDrop.bucketA}`}
                        >
                          {dragDrop.bucketA.slice(0, 8)}...
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAssignBucket(item.text, dragDrop.bucketB)}
                          className="px-2 py-0.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-[10px] font-black"
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
        <div className="cyber-hud-card rounded-3xl p-6 border border-blue-500/30 shadow-neon-cyan/20 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-black">2</span>
              <span className="glow-text-cyan">Nhiệm vụ 2: Hoàn Thiện Định Nghĩa Cốt Lõi SGK</span>
            </h3>
            <span className="text-xs text-blue-400 font-bold">Chọn từ trong danh sách thả xuống</span>
          </div>

          <div className="space-y-3">
            {fillBlanks.map((fb, idx) => {
              const parts = fb.statement.split('[___]');
              const currentChoice = dropdownAnswers[idx] || '';

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 leading-relaxed"
                >
                  <span className="font-bold text-cyan-400 mr-1.5">{idx + 1}.</span>
                  <span>{parts[0]}</span>

                  <span className="inline-block mx-1">
                    <select
                      disabled={isSubmitted || isLocked}
                      value={currentChoice}
                      onChange={(e) => handleSelectDropdown(idx, e.target.value)}
                      className={`px-3 py-1 rounded-xl text-xs font-black border transition-all ${
                        isSubmitted
                          ? currentChoice === fb.correctAnswer
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold'
                            : 'bg-rose-950 border-rose-500 text-rose-300 line-through'
                          : 'bg-slate-950 border-cyan-400 text-cyan-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/30'
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
                    <div className="mt-2 text-[11px] font-bold text-emerald-300 bg-emerald-950/70 p-2 rounded-xl border border-emerald-500/40">
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
        <div className="cyber-hud-card rounded-3xl p-6 border border-purple-500/30 shadow-neon-purple/20 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-black">3</span>
              <span className="glow-text-purple">Nhiệm vụ 3: Nối Cặp Khái Niệm Tương Ứng</span>
            </h3>
            <span className="text-xs text-purple-400 font-bold">Nhấp vế trái ➔ Nhấp vế phải</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cột Vế Trái */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400">Vế trái (Thuật ngữ / Thao tác):</p>
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
                        ? 'bg-purple-950/80 border-purple-400 text-purple-200 ring-2 ring-purple-400/40 shadow-neon-purple/30'
                        : isConnected
                        ? 'bg-slate-900 border-emerald-400/70 text-emerald-300'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-purple-500/50'
                    }`}
                  >
                    <span>{pair.left}</span>
                    {isConnected && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            {/* Cột Vế Phải */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400">Vế phải (Ý nghĩa / Chức năng):</p>
              {matchingPairs.map((pair) => (
                <button
                  key={pair.right}
                  type="button"
                  disabled={isSubmitted || isLocked || !selectedMatchingLeft}
                  onClick={() => handleConnectRight(pair.right)}
                  className="w-full p-3 rounded-2xl border text-left text-xs text-slate-300 bg-slate-950/80 border-slate-800 hover:bg-purple-950/50 hover:border-purple-400/50 transition-all font-medium"
                >
                  <span>{pair.right}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. NÚT NỘP BÀI CẶP ĐÔI & BẢNG KẾT QUẢ CHẤM ĐIỂM */}
      <div className="p-6 rounded-3xl cyber-hud-card border border-cyan-500/30 shadow-neon-cyan/20 flex flex-col md:flex-row items-center justify-between gap-4">
        {isSubmitted ? (
          <div className="flex items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/50 flex items-center justify-center font-black text-xl shadow-neon-mana/40">
                ⭐
              </div>
              <div>
                <div className="text-sm font-black text-white flex items-center gap-2">
                  <span>Điểm Khám Phá Cặp Đôi:</span>
                  <span className="text-base text-emerald-400 font-extrabold">{resultScore} / 10 Điểm</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Đã lưu kết quả của cặp đôi và báo cáo trực tiếp về màn hình của Thầy Đỗ Mạnh Trường!
                </p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-neon-mana/40">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã hoàn thành HĐ1</span>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              ⚠️ <strong>Lưu ý buồng lái:</strong> 2 phi công hãy cùng quan sát đối chiếu SGK và thống nhất các đáp án trước khi nhấn nộp bài.
            </div>

            <button
              type="button"
              disabled={isLocked}
              onClick={handleSubmitWorksheet}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs shadow-neon-cyan/40 transition-all flex items-center justify-center gap-2 border border-cyan-300/40 hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>2 Bạn Thống Nhất - Nộp Bài Khám Phá (+50 XP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

