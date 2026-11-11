'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trophy, ArrowRight, Laptop, FileSpreadsheet, BookOpen, PlayCircle } from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/achievements');
  }, [router]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
        <Trophy className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
          Chuyển Hướng Tối Ưu Hệ Thống
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Đang chuyển hướng sang Thành Tích & Bảng Xếp Hạng...
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Chức năng hồ sơ học tập cũ đã được Thầy Đỗ Mạnh Trường tối ưu hóa tách thành <strong>Thành Tích & Bảng Xếp Hạng (/achievements)</strong> và <strong>Bảng Điểm Học Kỳ (/gradebook)</strong>.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link
          href="/achievements"
          className="px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-xs hover:bg-purple-700 transition-all flex items-center gap-1.5"
        >
          <Trophy className="w-4 h-4" />
          <span>Đến Thành Tích & Bảng Xếp Hạng</span>
        </Link>
        <Link
          href="/gradebook"
          className="px-4 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold shadow-xs hover:bg-teal-700 transition-all flex items-center gap-1.5"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Xem Bảng Điểm Học Kỳ</span>
        </Link>
      </div>
    </div>
  );
}
