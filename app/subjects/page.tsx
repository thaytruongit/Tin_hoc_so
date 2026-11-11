'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Layers, ArrowRight } from 'lucide-react';

export default function SubjectsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/in-class');
  }, [router]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
        <Layers className="w-8 h-8" />
      </div>
      <h1 className="text-xl font-bold text-slate-900">Đang chuyển tiếp tới Buồng Lái Lớp Học...</h1>
      <p className="text-xs text-slate-500">
        Toàn bộ 29 tiết học SGK Kết nối tri thức đã được tích hợp trực tiếp vào Buồng Lái Lớp Học.
      </p>
      <Link
        href="/in-class"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm"
      >
        <span>Vào Buồng Lái Lớp Học ngay</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
