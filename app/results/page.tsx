'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';

export default function ResultsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/student');
  }, [router]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
        <Award className="w-8 h-8" />
      </div>
      <h1 className="text-xl font-bold text-slate-900">Đang chuyển tiếp tới Hồ Sơ &amp; Bảng Vàng...</h1>
      <p className="text-xs text-slate-500">
        Kết quả học tập, điểm số và huy hiệu đã được tích hợp tập trung tại Không Gian Học Sinh.
      </p>
      <Link
        href="/student"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-sm"
      >
        <span>Vào Hồ Sơ &amp; Bảng Vàng ngay</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
