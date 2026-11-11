'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Laptop, ArrowRight } from 'lucide-react';

export default function HomeworkRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/in-class?tab=practice');
  }, [router]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
        <Laptop className="w-8 h-8" />
      </div>
      <h1 className="text-xl font-bold text-slate-900">Đang chuyển tiếp tới Hoạt Động Thực Hành...</h1>
      <p className="text-xs text-slate-500">
        Hoạt động nộp bài thực hành và bài tập đã được tích hợp trực tiếp vào Buồng Lái Lớp Học.
      </p>
      <Link
        href="/in-class?tab=practice"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-sm"
      >
        <span>Vào Buồng Lái Thực Hành ngay</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
