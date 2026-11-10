# 🚀 TRUONG DIGITAL CLASSROOM

**Hệ sinh thái giáo dục số & Cổng học tập môn Tin học THCS (Khối 6, 7, 8, 9)**  
*Dành riêng cho giáo viên & học sinh trường THCS Mão Điền — Thầy Trương IT.*

---

## 📌 1. Cấu hình & Định hướng chiến lược
Dự án được xây dựng theo mô hình **GitHub First** và chốt phương án cấu hình tối ưu:
* **1A (Phạm vi):** Chuyên sâu môn Tin học Khối 6, 7, 8, 9 theo Chương trình GDPT 2018.
* **2A (Đối tượng):** Giáo viên và học sinh các lớp trực tiếp giảng dạy (6A1, 7A1, 8A1, 9A1...).
* **3A (Kiến trúc kỹ thuật):** Ứng dụng độc lập chuẩn hiện đại **Next.js (App Router, React, Tailwind CSS) + Supabase (PostgreSQL, Auth, RLS)**.
* **4A (Đăng nhập học sinh):** Giáo viên cấp Mã học sinh + Mật khẩu riêng cho từng học sinh THCS (tránh phụ thuộc tài khoản Google).
* **5C (Ưu tiên triển khai):** Triển khai đồng bộ cả **Phiếu học tập điện tử + Phòng thi trực tuyến chấm điểm tự động + Gamification (XP, Cấp độ, Huy hiệu, Bảng vàng)**.

---

## 🌟 2. Các phân hệ chính
1. **Cổng môn học (Subjects):** Học liệu chuẩn 4 khối 6, 7, 8, 9 (Chủ đề A đến F) & góc bồi dưỡng HSG C++/Python.
2. **Phiếu học tập tương tác (Worksheets):** Tương ứng 4 pha giảng dạy (Khởi động, Khám phá, Luyện tập, Vận dụng) với phản hồi giải thích ngay.
3. **Phòng kiểm tra trực tuyến (Exams):** Đếm ngược thời gian, đếm số lần chuyển tab (chống gian lận), tự động chấm điểm và bảo mật đáp án server-side.
4. **Không gian học sinh (Student Dashboard):** Theo dõi tiến trình lên cấp, chuỗi ngày học liên tục (Streak), bộ sưu tập huy hiệu và thứ hạng lớp.
5. **Kênh quản trị giáo viên (Teacher Dashboard):** Quản lý danh sách lớp, cấp/đổi mật khẩu học sinh, khóa/mở đề thi theo tiết học và xuất báo cáo Excel.
6. **Bảng vàng thi đua (Achievements):** Tuyên dương học sinh có điểm kinh nghiệm (XP) dẫn đầu.

---

## 🛠️ 3. Công nghệ sử dụng
* **Frontend:** Next.js 14, React 18, Tailwind CSS, Lucide Icons, Canvas Confetti.
* **Backend / Database:** Supabase PostgreSQL (`supabase/schema.sql`), Supabase Auth, Row-Level Security (RLS).
* **Quản lý mã nguồn & Triển khai:** GitHub + Vercel CI/CD.

---

## 🚀 4. Cài đặt và Chạy thử cục bộ

### Bước 1: Cài đặt thư viện
```bash
npm install
```

### Bước 2: Chạy môi trường phát triển
```bash
npm run dev
```
Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

### Bước 3: Build kiểm tra
```bash
npm run build
```

---

## 🗄️ 5. Cấu hình Cơ sở dữ liệu Supabase (Tùy chọn)
1. Tạo một dự án mới trên [Supabase](https://supabase.com).
2. Vào mục **SQL Editor**, dán toàn bộ nội dung file `supabase/schema.sql` và nhấn **Run**.
3. Điền thông tin vào file `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 👤 6. Tài khoản mẫu thử nghiệm
* **Học sinh:**
  * Khối 6: Mã `HS601` — Mật khẩu: `123` (Nguyễn Văn An - Lớp 6A1)
  * Khối 7: Mã `HS701` — Mật khẩu: `123` (Lê Hoàng Dũng - Lớp 7A1)
  * Khối 8: Mã `HS801` — Mật khẩu: `123` (Phạm Thu Trang - Lớp 8A1)
  * Khối 9: Mã `HS901` — Mật khẩu: `123` (Đỗ Tuấn Kiệt - Lớp 9A1)
* **Giáo viên:**
  * Email: `thaytruong@thcsmaodien.edu.vn` — Mật khẩu: `123456`

---

© 2026 Thầy Trương IT · THCS Mão Điền.
