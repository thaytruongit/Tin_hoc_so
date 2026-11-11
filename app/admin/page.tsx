'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Users, Database, Shield, KeyRound, Save, CheckCircle2, RefreshCw, ShieldAlert, ArrowRight, Crown } from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '@/lib/mock-data';
import { getCurrentUser, UserSession } from '@/lib/auth';

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [mounted, setMounted] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user.role === 'teacher') {
      setIsUnlocked(true);
    }
  }, []);

  const [siteTitle, setSiteTitle] = useState('THAYTRUONGIT-THCS MÃO ĐIỀN');
  const [xpPerCorrect, setXpPerCorrect] = useState(10);
  const [saved, setSaved] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim() === '666') {
      setIsUnlocked(true);
      setAuthError('');
      localStorage.setItem('truong_user_role', 'teacher');
      localStorage.setItem('truong_teacher_name', 'Thầy Đỗ Mạnh Trường');
    } else {
      setAuthError('Mật khẩu quản trị không chính xác! (Mật mã chuẩn y: 666)');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!mounted) return null;

  // ROUTE GUARD: BẢO VỆ PHÂN QUYỀN GIÁO VIÊN
  if (!isUnlocked && currentUser?.role === 'student') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shadow-lg">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-black uppercase">
            Bảo mật phân quyền (RBAC)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Truy Cập Bị Từ Chối — Khu Vực Quản Trị
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Khu vực này dành riêng cho <strong>Thầy Đỗ Mạnh Trường</strong> quản trị 670 học sinh và cấu hình điểm thi.<br />
            Tài khoản của em là <strong>{currentUser.studentName}</strong> (Lớp {currentUser.studentClass}) vui lòng quay lại buồng lái học tập!
          </p>
        </div>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/in-class"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Quay Về Buồng Lái Học Tập
          </Link>
        </div>
      </div>
    );
  }

  // NẾU LÀ KHÁCH CHƯA XÁC THỰC MẬT MÃ 666
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-neon-gold/40">
          <Crown className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white glow-text-gold">Xác Thực Quản Trị Viên</h1>
          <p className="text-xs text-slate-400 mt-1">Dành riêng cho Thầy Đỗ Mạnh Trường (Mã 666)</p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4 text-left">
          {authError && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-bold">
              {authError}
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1">Mật mã Quản trị đặc quyền</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Nhập 666"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-amber-500/50 bg-slate-900 text-amber-300 text-sm font-black focus:outline-none focus:border-amber-400 tracking-widest"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs shadow-neon-gold/40 transition-all flex items-center justify-center gap-2"
          >
            <span>Mở Khóa Bảng Quản Trị</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
            Khu vực quản trị hệ thống
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Quản Trị Người Dùng & Hệ Thống
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dành riêng cho Quản trị viên và Giáo viên phụ trách môn Tin học
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Hệ thống ổn định
          </span>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Đã lưu thành công cấu hình hệ thống!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SYSTEM CONFIGURATION */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-lg text-slate-900">Thiết lập chung</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Tên hệ thống cổng học tập số
              </label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Điểm XP thưởng cho mỗi câu trắc nghiệm đúng
                </label>
                <input
                  type="number"
                  value={xpPerCorrect}
                  onChange={(e) => setXpPerCorrect(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Năm học áp dụng
                </label>
                <input
                  type="text"
                  defaultValue="2025-2026"
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Lưu thay đổi</span>
            </button>
          </form>
        </div>

        {/* DATABASE & USERS STATUS */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              Cơ sở dữ liệu Supabase
            </h3>
            <p className="text-xs text-slate-500">
              Đã thiết kế 18 bảng theo bản đặc tả `TK.docx` (mục 8)
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Số lớp học:</span>
                <span className="font-bold text-slate-900">{MOCK_CLASSES.length} lớp</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Tài khoản học sinh:</span>
                <span className="font-bold text-slate-900">{MOCK_STUDENTS.length} tài khoản</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Bảo mật RLS:</span>
                <span className="font-bold text-emerald-600">Đã kích hoạt</span>
              </div>
            </div>

            <button
              onClick={() => alert('Đang sao lưu dự phòng toàn bộ cơ sở dữ liệu...')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
            >
              Sao lưu dữ liệu (Backup SQL)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
