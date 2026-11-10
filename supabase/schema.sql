-- ============================================================================
-- TRUONG DIGITAL CLASSROOM - HỆ SINH THÁI GIÁO DỤC SỐ MÔN TIN HỌC THCS (6-7-8-9)
-- Kiến trúc: Next.js + Supabase (PostgreSQL)
-- Cấu hình: 1A (Tin 6-9) - 2A (Lớp trực tiếp) - 3A (Next+Supabase) - 4A (Tài khoản GV cấp) - 5C (LMS + Gamification)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. BẢNG LỚP HỌC (classes)
CREATE TABLE IF NOT EXISTS public.classes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade       INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  name        TEXT NOT NULL,            -- Ví dụ: 6A1, 7A2, 8A1, 9A3
  class_code  TEXT NOT NULL UNIQUE,     -- Mã tham gia nhanh, ví dụ: 6A1-2026
  school_year TEXT NOT NULL DEFAULT '2025-2026',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. BẢNG HỌC SINH (students) - Đăng nhập bằng Mã HS + Mật khẩu do GV cấp (4A)
CREATE TABLE IF NOT EXISTS public.students (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id      UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_code  TEXT NOT NULL UNIQUE,   -- Ví dụ: HS6001, HS9023
  full_name     TEXT NOT NULL,
  gender        TEXT DEFAULT 'Nam',
  birthday      DATE,
  password_hash TEXT NOT NULL DEFAULT '123456', -- Mật khẩu mặc định hoặc hash
  avatar_url    TEXT DEFAULT '/images/avatars/student_default.png',
  total_xp      INT NOT NULL DEFAULT 0,
  level         INT NOT NULL DEFAULT 1,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_class ON public.students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_code ON public.students(student_code);

-- 3. BẢNG BÀI HỌC THEO KHỐI LỚP (lessons)
CREATE TABLE IF NOT EXISTS public.lessons (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade       INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  semester    INT NOT NULL DEFAULT 1 CHECK (semester IN (1, 2)),
  period_num  INT NOT NULL,             -- Tiết phân phối chương trình: 1, 2, 3...
  title       TEXT NOT NULL,            -- Tiêu đề bài học
  topic       TEXT NOT NULL DEFAULT '', -- Chủ đề (A, B, C, D, E, F theo CT 2018)
  description TEXT DEFAULT '',
  content_md  TEXT DEFAULT '',
  video_url   TEXT DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lessons_grade ON public.lessons(grade, semester, period_num);

-- 4. BẢNG PHIẾU HỌC TẬP ĐIỆN TỬ (worksheets)
CREATE TABLE IF NOT EXISTS public.worksheets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id   UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  grade       INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  phase       TEXT NOT NULL DEFAULT 'Luyện tập', -- Khởi động, Khám phá, Luyện tập, Vận dụng
  time_limit  INT NOT NULL DEFAULT 15,           -- Phút làm bài
  questions   JSONB NOT NULL DEFAULT '[]'::jsonb, -- Danh sách câu hỏi
  status      TEXT NOT NULL DEFAULT 'published', -- draft, published, closed
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. BẢNG KẾT QUẢ PHIẾU HỌC TẬP (worksheet_submissions)
CREATE TABLE IF NOT EXISTS public.worksheet_submissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worksheet_id  UUID NOT NULL REFERENCES public.worksheets(id) ON DELETE CASCADE,
  student_id    UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  answers       JSONB NOT NULL DEFAULT '{}'::jsonb,
  score         NUMERIC(4,2) NOT NULL DEFAULT 0,
  max_score     NUMERIC(4,2) NOT NULL DEFAULT 10,
  xp_earned     INT NOT NULL DEFAULT 0,
  teacher_note  TEXT DEFAULT '',
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (worksheet_id, student_id)
);

-- 6. BẢNG NGÂN HÀNG ĐỀ KIỂM TRA (exams)
CREATE TABLE IF NOT EXISTS public.exams (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade             INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  exam_type         TEXT NOT NULL DEFAULT 'regular', -- regular (thường xuyên), midterm (giữa kỳ), final (cuối kỳ)
  title             TEXT NOT NULL,
  duration_minutes  INT NOT NULL DEFAULT 45,
  is_published      BOOLEAN NOT NULL DEFAULT FALSE,
  is_locked         BOOLEAN NOT NULL DEFAULT FALSE,
  access_code       TEXT DEFAULT '',                 -- Mã đề thi bí mật nếu cần
  questions         JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. BẢNG KẾT QUẢ BÀI THI (exam_attempts)
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id         UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  student_id      UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  answers         JSONB NOT NULL DEFAULT '{}'::jsonb,
  score_mcq       NUMERIC(4,2) NOT NULL DEFAULT 0,
  score_essay     NUMERIC(4,2) NOT NULL DEFAULT 0,
  total_score     NUMERIC(4,2) NOT NULL DEFAULT 0,
  tab_switches    INT NOT NULL DEFAULT 0,            -- Đếm số lần rời khỏi màn hình làm bài
  duration_sec    INT NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'completed', -- completed, reviewed
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exam_attempts_student ON public.exam_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_exam ON public.exam_attempts(exam_id);

-- 8. BẢNG HUY HIỆU GAMIFICATION (badges)
CREATE TABLE IF NOT EXISTS public.badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT NOT NULL UNIQUE,      -- Ví dụ: EXCELLENT_TEST, STREAK_3, CODE_MASTER
  name        TEXT NOT NULL,             -- Ví dụ: Chiến Binh Điểm 10
  description TEXT NOT NULL,
  icon_name   TEXT NOT NULL DEFAULT 'trophy',
  color       TEXT NOT NULL DEFAULT 'amber',
  xp_bonus    INT NOT NULL DEFAULT 50
);

-- 9. BẢNG HUY HIỆU CỦA HỌC SINH (student_badges)
CREATE TABLE IF NOT EXISTS public.student_badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  badge_id    UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, badge_id)
);

-- 10. BẢNG LỊCH SỬ ĐIỂM KINH NGHIỆM XP (xp_history)
CREATE TABLE IF NOT EXISTS public.xp_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  amount      INT NOT NULL,
  reason      TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_xp_history_student ON public.xp_history(student_id);

-- ----------------------------------------------------------------------------
-- DỮ LIỆU KHỞI TẠO MẪU (SEED DATA)
-- ----------------------------------------------------------------------------

-- Huy hiệu mặc định
INSERT INTO public.badges (code, name, description, icon_name, color, xp_bonus) VALUES
('PERFECT_10', 'Chiến Binh Điểm 10', 'Đạt điểm 10 tuyệt đối trong bài kiểm tra Tin học', 'award', 'amber', 100),
('HARD_WORK', 'Chăm Chỉ Cần Cù', 'Hoàn thành 5 phiếu học tập liên tiếp đúng hạn', 'flame', 'orange', 50),
('SPEEDY', 'Thần Tốc Trả Lời', 'Hoàn thành bài trắc nghiệm dưới 5 phút với độ chính xác > 90%', 'zap', 'yellow', 60),
('CODE_PRO', 'Lập Trình Viên Trẻ', 'Hoàn thành xuất sắc bài thực hành lập trình', 'code', 'emerald', 80),
('TEAM_HERO', 'Đồng Đội Xuất Sắc', 'Hỗ trợ nhóm hoàn thành xuất sắc nhiệm vụ học tập', 'users', 'blue', 70)
ON CONFLICT (code) DO NOTHING;
