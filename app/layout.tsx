import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClassroomSyncWatcher from "@/components/ClassroomSyncWatcher";
import "./globals.css";

export const metadata: Metadata = {
  title: "HỆ SINH THÁI TIN HỌC SỐ · THCS MÃO ĐIỀN - Thầy Đỗ Mạnh Trường",
  description: "Hệ sinh thái học tập số môn Tin học THCS Mão Điền (Khối 6, 7, 8, 9) chuẩn GDPT 2018. Phân quyền Không gian học sinh (123) & Bàn quản lý giáo viên (666) - Thầy Đỗ Mạnh Trường",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <ClassroomSyncWatcher />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
