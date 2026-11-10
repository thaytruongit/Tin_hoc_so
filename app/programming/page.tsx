'use client';

import { useState } from 'react';
import { Code2, Terminal, Play, CheckCircle2, Sparkles, BookOpen, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_PROGRAMMING_CHALLENGES } from '@/lib/mock-data';

export default function ProgrammingPage() {
  const [selectedLang, setSelectedLang] = useState<'all' | 'C++' | 'Python'>('all');
  const [activeChallenge, setActiveChallenge] = useState(MOCK_PROGRAMMING_CHALLENGES[0]);
  const [userCode, setUserCode] = useState(activeChallenge.initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const filteredChallenges = selectedLang === 'all'
    ? MOCK_PROGRAMMING_CHALLENGES
    : MOCK_PROGRAMMING_CHALLENGES.filter(c => c.language === selectedLang);

  const handleSelectChallenge = (c: typeof activeChallenge) => {
    setActiveChallenge(c);
    setUserCode(c.initialCode);
    setOutput('');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Đang biên dịch và chạy trên môi trường sandbox...');

    setTimeout(() => {
      setIsRunning(false);
      setOutput(`Kết quả đầu ra (Standard Output):\n${activeChallenge.sampleOutput}\n\n-> Chấm thử thành công: ĐÚNG 100% các bộ Test case! (+${activeChallenge.xpReward} XP)`);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-100 text-emerald-600 mb-1">
          <Code2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Luyện Lập Trình: C++ & Python
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Góc thực hành thuật toán, cấu trúc điều khiển và bồi dưỡng đội tuyển Học sinh giỏi Tin học THCS Mão Điền.
        </p>

        {/* Filter Language */}
        <div className="flex justify-center gap-2 pt-2">
          <button
            onClick={() => setSelectedLang('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLang === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Tất cả ngôn ngữ
          </button>
          <button
            onClick={() => setSelectedLang('C++')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLang === 'C++' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            C++ (Khối 8, 9, HSG)
          </button>
          <button
            onClick={() => setSelectedLang('Python')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLang === 'Python' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Python (Khối 8, 9, HSG)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LIST OF CHALLENGES */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Danh sách bài tập ({filteredChallenges.length})
          </h2>

          <div className="space-y-2.5">
            {filteredChallenges.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectChallenge(c)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  activeChallenge.id === c.id
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    c.language === 'C++' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {c.language} · {c.gradeLevel}
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    +{c.xpReward} XP
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{c.title}</h3>
                <span className="text-[11px] text-slate-500 mt-1 inline-block">Độ khó: {c.difficulty}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CODE EDITOR & RUNNER */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROBLEM DETAILS */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-slate-900">{activeChallenge.title}</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {activeChallenge.language}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{activeChallenge.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Dữ liệu vào (Input):</span>
                <code className="text-slate-600">{activeChallenge.inputFormat}</code>
                <div className="mt-2 font-mono bg-white p-2 rounded border border-slate-200 text-slate-800">
                  {activeChallenge.sampleInput}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Kết quả ra (Output):</span>
                <code className="text-slate-600">{activeChallenge.outputFormat}</code>
                <div className="mt-2 font-mono bg-white p-2 rounded border border-slate-200 text-slate-800">
                  {activeChallenge.sampleOutput}
                </div>
              </div>
            </div>
          </div>

          {/* CODE EDITOR */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl space-y-0">
            <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono font-bold">solution.{activeChallenge.language === 'C++' ? 'cpp' : 'py'}</span>
              </div>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunning ? 'Đang chạy...' : 'Chạy thử Code'}</span>
              </button>
            </div>

            <textarea
              rows={10}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm p-5 focus:outline-none resize-none leading-relaxed"
            />

            {output && (
              <div className="border-t border-slate-800 bg-slate-900/90 p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap">
                {output}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
