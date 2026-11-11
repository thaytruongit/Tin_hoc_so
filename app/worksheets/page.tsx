'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Laptop, ArrowRight } from 'lucide-react';

export default function WorksheetsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/in-class?tab=worksheet');
  }, [router]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
        <Laptop className="w-8 h-8" />
      </div>
      <h1 className="text-xl font-bold text-slate-900">Đang chuyển tiếp tới Buồng Lái Lớp Học...</h1>
      <p className="text-xs text-slate-500">
        Phiếu học tập khám phá đã được tích hợp trực tiếp vào Không Gian Của Học Sinh.
      </p>
      <Link
        href="/in-class?tab=worksheet"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm"
      >
        <span>Vào Buồng Lái Lớp Học ngay</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
