import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClassroomSyncWatcher from "@/components/ClassroomSyncWatcher";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRUONG DIGITAL CLASSROOM - Hệ sinh thái học tập số môn Tin học",
  description: "Cổng học tập số, phiếu học tập tương tác, kiểm tra trực tuyến và thi đua Gamification môn Tin học THCS (Khối 6, 7, 8, 9) - Thầy Trương IT",
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
