-- ============================================================================
-- DỰ ÁN: THAYTRUONGIT-THCS MÃO ĐIỀN
-- Hệ sinh thái giáo dục số & Cổng học tập môn Tin học THCS (Khối 6, 7, 8, 9)
-- BẢN ĐẶC TẢ CƠ SỞ DỮ LIỆU ĐẦY ĐỦ 18 BẢNG THEO TỆP THIẾT KẾ TK.DOCX (MỤC 8)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. BẢNG USERS (Tài khoản)
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      TEXT NOT NULL UNIQUE,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
  password_hash TEXT NOT NULL DEFAULT '123456',
  avatar_url    TEXT DEFAULT '/images/avatar_default.png',
  phone         TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. BẢNG CLASSES (Danh sách lớp)
CREATE TABLE IF NOT EXISTS public.classes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade       INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  name        TEXT NOT NULL,            -- 6A1, 7A1, 8A1, 9A1
  class_code  TEXT NOT NULL UNIQUE,     -- 6A1-2026
  school_year TEXT NOT NULL DEFAULT '2025-2026',
  teacher_id  UUID REFERENCES public.users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. BẢNG STUDENTS (Hồ sơ học sinh)
CREATE TABLE IF NOT EXISTS public.students (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  student_code  TEXT NOT NULL UNIQUE,   -- HS601, HS901
  full_name     TEXT NOT NULL,
  gender        TEXT DEFAULT 'Nam',
  birthday      DATE,
  total_xp      INT NOT NULL DEFAULT 0,
  level         INT NOT NULL DEFAULT 1,
  streak_days   INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. BẢNG CLASS_MEMBERS (Học sinh thuộc lớp)
CREATE TABLE IF NOT EXISTS public.class_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id    UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id  UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(class_id, student_id)
);

-- 5. BẢNG SUBJECTS (Môn học)
CREATE TABLE IF NOT EXISTS public.subjects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT NOT NULL UNIQUE,     -- TIN6, TIN7, TIN8, TIN9, PROG_CPP, PROG_PY
  name        TEXT NOT NULL,
  grade       INT CHECK (grade IN (6, 7, 8, 9)),
  description TEXT DEFAULT ''
);

-- 6. BẢNG LESSONS (Bài học)
CREATE TABLE IF NOT EXISTS public.lessons (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id  UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  grade       INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  period_num  INT NOT NULL,             -- Tiết phân phối chương trình: Tiết 1, 2...
  title       TEXT NOT NULL,            -- Bài 1: Thông tin và dữ liệu
  topic       TEXT NOT NULL,            -- Chủ đề A, B, C, D, E, F
  content_md  TEXT DEFAULT '',
  video_url   TEXT DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. BẢNG QUESTIONS (Ngân hàng câu hỏi)
CREATE TABLE IF NOT EXISTS public.questions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id    UUID REFERENCES public.subjects(id),
  grade         INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  topic         TEXT NOT NULL,
  level         TEXT NOT NULL DEFAULT 'Nhận biết' CHECK (level IN ('Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao')),
  q_type        TEXT NOT NULL DEFAULT 'mcq' CHECK (q_type IN ('mcq', 'boolean', 'fill', 'essay', 'drag_drop')),
  content       TEXT NOT NULL,
  explanation   TEXT DEFAULT '',
  points        NUMERIC(4,2) NOT NULL DEFAULT 1.0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. BẢNG QUESTION_OPTIONS (Các phương án trả lời)
CREATE TABLE IF NOT EXISTS public.question_options (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id   UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  option_key    TEXT NOT NULL,          -- A, B, C, D hoặc 1, 2
  option_text   TEXT NOT NULL,
  is_correct    BOOLEAN NOT NULL DEFAULT FALSE,
  order_num     INT NOT NULL DEFAULT 1
);

-- 9. BẢNG WORKSHEETS (Phiếu học tập điện tử 4 pha)
CREATE TABLE IF NOT EXISTS public.worksheets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id   UUID REFERENCES public.lessons(id),
  grade       INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  title       TEXT NOT NULL,
  phase       TEXT NOT NULL DEFAULT 'Luyện tập' CHECK (phase IN ('Khởi động', 'Khám phá', 'Luyện tập', 'Vận dụng')),
  time_limit  INT NOT NULL DEFAULT 15,
  xp_reward   INT NOT NULL DEFAULT 30,
  status      TEXT NOT NULL DEFAULT 'published',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. BẢNG ASSIGNMENTS (Nhiệm vụ được giao)
CREATE TABLE IF NOT EXISTS public.assignments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id      UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  item_type     TEXT NOT NULL CHECK (item_type IN ('worksheet', 'exam', 'practice')),
  item_id       UUID NOT NULL,
  due_date      TIMESTAMPTZ,
  is_locked     BOOLEAN NOT NULL DEFAULT FALSE,
  assigned_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. BẢNG EXAMS (Đề kiểm tra)
CREATE TABLE IF NOT EXISTS public.exams (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade             INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  exam_type         TEXT NOT NULL DEFAULT 'thường xuyên' CHECK (exam_type IN ('thường xuyên', 'giữa kỳ', 'cuối kỳ')),
  title             TEXT NOT NULL,
  duration_minutes  INT NOT NULL DEFAULT 45,
  is_locked         BOOLEAN NOT NULL DEFAULT FALSE,
  questions_json    JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. BẢNG EXAM_ATTEMPTS (Lượt làm bài)
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id         UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  student_id      UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  start_time      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submit_time     TIMESTAMPTZ,
  tab_switches    INT NOT NULL DEFAULT 0,
  duration_sec    INT NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'graded'))
);

-- 13. BẢNG ANSWERS (Câu trả lời chi tiết của học sinh)
CREATE TABLE IF NOT EXISTS public.answers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id    UUID NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
  question_id   UUID NOT NULL REFERENCES public.questions(id),
  answer_text   TEXT NOT NULL,
  is_correct    BOOLEAN,
  earned_points NUMERIC(4,2) DEFAULT 0
);

-- 14. BẢNG GRADES (Điểm số chính thức)
CREATE TABLE IF NOT EXISTS public.grades (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  item_type     TEXT NOT NULL CHECK (item_type IN ('worksheet', 'exam')),
  item_id       UUID NOT NULL,
  score         NUMERIC(4,2) NOT NULL DEFAULT 0,
  max_score     NUMERIC(4,2) NOT NULL DEFAULT 10,
  teacher_note  TEXT DEFAULT '',
  graded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. BẢNG BADGES (Danh sách huy hiệu)
CREATE TABLE IF NOT EXISTS public.badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT NOT NULL UNIQUE,     -- EXCELLENT, HARD_WORK, CREATIVE, TEAM_PLAYER
  name        TEXT NOT NULL,            -- Huy hiệu xuất sắc, Chiến binh chăm chỉ, Nhà sáng tạo, Đồng đội tích cực
  category    TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name   TEXT NOT NULL,
  xp_bonus    INT NOT NULL DEFAULT 50
);

-- 16. BẢNG STUDENT_BADGES (Huy hiệu học sinh đã đạt)
CREATE TABLE IF NOT EXISTS public.student_badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  badge_id    UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, badge_id)
);

-- 17. BẢNG XP_TRANSACTIONS (Lịch sử điểm kinh nghiệm - Lưu riêng với điểm thi)
CREATE TABLE IF NOT EXISTS public.xp_transactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  amount      INT NOT NULL,
  reason      TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. BẢNG NOTIFICATIONS (Thông báo)
CREATE TABLE IF NOT EXISTS public.notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES public.users(id),
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- DỮ LIỆU KHỞI TẠO 4 HUY HIỆU THEO TỆP TK.DOCX
INSERT INTO public.badges (code, name, category, description, icon_name, xp_bonus) VALUES
('EXCELLENT', 'Huy hiệu Xuất Sắc', 'Học tập', 'Đạt kết quả xuất sắc (từ 9.0 đến 10.0) trong các bài kiểm tra Tin học', 'Trophy', 100),
('HARD_WORK', 'Chiến Binh Chăm Chỉ', 'Thi đua', 'Hoàn thành nhiệm vụ phiếu học tập liên tục đúng hạn và đầy đủ', 'Flame', 70),
('CREATIVE', 'Nhà Sáng Tạo', 'Năng lực', 'Có sản phẩm bài tập hoặc thuật toán/cách giải sáng tạo độc đáo', 'Lightbulb', 80),
('TEAM_PLAYER', 'Đồng Đội Tích Cực', 'Tập thể', 'Tích cực tham gia và hỗ trợ hoạt động nhóm trong giờ thực hành máy tính', 'Users', 60)
ON CONFLICT (code) DO NOTHING;


-- DỮ LIỆU KHỞI TẠO 15 LỚP HỌC TRƯỜNG THCS MÃO ĐIỀN
INSERT INTO public.classes (name, grade, academic_year) VALUES
('Lớp 6A10', 6, '2025-2026'),
('Lớp 6A11', 6, '2025-2026'),
('Lớp 6A12', 6, '2025-2026'),
('Lớp 6A13', 6, '2025-2026'),
('Lớp 7A10', 7, '2025-2026'),
('Lớp 7A11', 7, '2025-2026'),
('Lớp 7A12', 7, '2025-2026'),
('Lớp 7A13', 7, '2025-2026'),
('Lớp 8A11', 8, '2025-2026'),
('Lớp 8A12', 8, '2025-2026'),
('Lớp 8A13', 8, '2025-2026'),
('Lớp 9A13', 9, '2025-2026'),
('Lớp 9A14', 9, '2025-2026'),
('Lớp 9A15', 9, '2025-2026'),
('Lớp 9A16', 9, '2025-2026')
ON CONFLICT (name) DO NOTHING;


-- ============================================================================
-- 19. NGÂN HÀNG CÂU HỎI CỦNG CỐ BÀI HỌC (THEO CHUẨN MA TRẬN BỘ GD&ĐT)
-- Phục vụ hoạt động kết thúc tiết học trực tiếp: 7 câu hỏi phân hóa
-- (3 câu Nhận biết, 2 câu Thông hiểu, 2 câu Vận dụng)
-- ============================================================================

-- Bảng 19.1: Danh mục bài học có hoạt động củng cố
CREATE TABLE IF NOT EXISTS public.reinforcement_lessons (
  id            TEXT PRIMARY KEY,       -- vd: rf-k6-tiet10, rf-k7-tiet12, rf-k8-tiet6, rf-k9-tiet8
  grade         INT NOT NULL CHECK (grade IN (6, 7, 8, 9)),
  period_num    INT NOT NULL,           -- Tiết theo PPCT
  lesson_title  TEXT NOT NULL,          -- Tiêu đề bài học
  topic         TEXT NOT NULL,          -- Chủ đề GDPT 2018
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bảng 19.2: Ngân hàng 7 câu hỏi củng cố cho từng bài
CREATE TABLE IF NOT EXISTS public.reinforcement_questions (
  id              TEXT PRIMARY KEY,     -- vd: rq-k7-01, rq-k7-02...
  lesson_id       TEXT NOT NULL REFERENCES public.reinforcement_lessons(id) ON DELETE CASCADE,
  question_index  INT NOT NULL CHECK (question_index BETWEEN 1 AND 7),
  cognitive_level TEXT NOT NULL CHECK (cognitive_level IN ('Nhận biết', 'Thông hiểu', 'Vận dụng')),
  question_text   TEXT NOT NULL,
  options_json    JSONB NOT NULL,       -- Mảng 4 phương án ['A', 'B', 'C', 'D']
  correct_index   INT NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
  explanation     TEXT NOT NULL,        -- Lời giải thích chi tiết của Giáo viên
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bảng 19.3: Kết quả làm bài củng cố trực tiếp trên lớp của học sinh
CREATE TABLE IF NOT EXISTS public.reinforcement_results (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id       TEXT NOT NULL REFERENCES public.reinforcement_lessons(id) ON DELETE CASCADE,
  student_code    TEXT NOT NULL,
  student_name    TEXT NOT NULL,
  class_name      TEXT NOT NULL,
  score           NUMERIC(4,2) NOT NULL, -- Thang điểm 10
  correct_count   INT NOT NULL DEFAULT 0, -- Số câu đúng trên 7
  total_questions INT NOT NULL DEFAULT 7,
  answers_json    JSONB NOT NULL DEFAULT '{}'::jsonb,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- KHỞI TẠO DỮ LIỆU MẪU CHO 4 KHỐI LỚP (MỖI BÀI ĐỦ 7 CÂU: 3 BIẾT, 2 HIỂU, 2 VẬN DỤNG)
INSERT INTO public.reinforcement_lessons (id, grade, period_num, lesson_title, topic) VALUES
('rf-k6-tiet10', 6, 10, 'Tiết 10: Sơ đồ tư duy và phần mềm tạo sơ đồ tư duy', 'Chủ đề E: Ứng dụng tin học'),
('rf-k7-tiet12', 7, 12, 'Tiết 12: Sử dụng các hàm điều kiện IF, SUMIF, COUNTIF trong Excel', 'Chủ đề E: Ứng dụng tin học (Bảng tính điện tử)'),
('rf-k8-tiet6',  8, 6,  'Tiết 6: Địa chỉ tương đối, tuyệt đối và hỗn hợp trong bảng tính', 'Chủ đề E: Ứng dụng tin học (Bảng tính nâng cao)'),
('rf-k9-tiet8',  9, 8,  'Tiết 8: Trí tuệ nhân tạo (AI) và ứng dụng an toàn trong đời sống số', 'Chủ đề D: Đạo đức, pháp luật và văn hóa trong môi trường số')
ON CONFLICT (id) DO NOTHING;

-- Dữ liệu 7 câu hỏi Khối 7 (Tiết 12)
INSERT INTO public.reinforcement_questions (id, lesson_id, question_index, cognitive_level, question_text, options_json, correct_index, explanation) VALUES
('rq-701-1', 'rf-k7-tiet12', 1, 'Nhận biết', 'Ký tự nào bắt buộc phải gõ đầu tiên khi bắt đầu nhập một công thức hoặc hàm trong Excel?', '["Dấu cộng (+)", "Dấu bằng (=)", "Dấu hai chấm (:)", "Dấu thăng (#)"]'::jsonb, 1, 'Mọi công thức và hàm tính toán trong bảng tính Excel đều phải bắt đầu bằng dấu bằng (=).'),
('rq-701-2', 'rf-k7-tiet12', 2, 'Nhận biết', 'Cú pháp chuẩn của hàm điều kiện IF trong Excel là gì?', '["=IF(value_if_true, value_if_false, logical_test)", "=IF(logical_test, [value_if_true], [value_if_false])", "=IF(condition = true, result)", "=IF(range, criteria)"]'::jsonb, 1, 'Cú pháp hàm IF gồm 3 đối số: điều kiện kiểm tra (logical_test), giá trị khi đúng, giá trị khi sai.'),
('rq-701-3', 'rf-k7-tiet12', 3, 'Nhận biết', 'Hàm nào sau đây dùng để đếm số ô thỏa mãn một điều kiện cho trước trong bảng tính?', '["SUMIF", "COUNTIF", "COUNTA", "AVERAGEIF"]'::jsonb, 1, 'Hàm COUNTIF dùng để đếm các ô theo một tiêu chí (Criteria) định trước.'),
('rq-701-4', 'rf-k7-tiet12', 4, 'Thông hiểu', 'Cho công thức =IF(C5>=8, "Giỏi", IF(C5>=6.5, "Khá", "Đạt")). Nếu ô C5 có giá trị là 7.0 thì kết quả trả về là gì?', '["Giỏi", "Khá", "Đạt", "Báo lỗi cú pháp"]'::jsonb, 1, 'Vì 7.0 không >= 8 nên điều kiện 1 sai, hàm chuyển sang xét điều kiện 2: 7.0 >= 6.5 là Đúng -> Trả về "Khá".'),
('rq-701-5', 'rf-k7-tiet12', 5, 'Thông hiểu', 'Trong công thức =SUMIF(B2:B20, "Nam", E2:E20), vùng nào chứa các giá trị số thực sự được cộng tổng?', '["B2:B20", "E2:E20", "Cả hai vùng", "Chỉ các ô có chữ Nam"]'::jsonb, 1, 'Đối số thứ 3 (E2:E20) là sum_range, tức vùng thực sự được tính tổng các giá trị số khi thỏa điều kiện cột B là "Nam".'),
('rq-701-6', 'rf-k7-tiet12', 6, 'Vận dụng', 'Cần tính tổng số tiền tài trợ của các nhà hảo tâm đóng góp trên 500,000 VNĐ ở cột số tiền (C2:C50), công thức nào đúng?', '["=SUMIF(C2:C50, >500000)", "=SUMIF(C2:C50, ">500000")", "=COUNTIF(C2:C50, ">500000")", "=SUM(C2:C50 > 500000)"]'::jsonb, 1, 'Trong hàm SUMIF/COUNTIF, điều kiện có phép so sánh bắt buộc phải đặt trong cặp dấu ngoặc kép: ">500000".'),
('rq-701-7', 'rf-k7-tiet12', 7, 'Vận dụng', 'Để đếm số bạn học sinh nữ sinh sau năm 2011 trong danh sách lớp, cần kết hợp sử dụng hàm nào tối ưu nhất?', '["Hàm COUNT kết hợp hàm IF", "Hàm COUNTIFS với nhiều điều kiện đồng thời", "Hàm SUMIF lồng nhau", "Chỉ cần hàm COUNTIF đơn giản"]'::jsonb, 1, 'Khi cần đếm thỏa mãn đồng thời từ 2 điều kiện trở lên (Giới tính="Nữ" VÀ Năm sinh>2011), hàm COUNTIFS là lựa chọn chuẩn xác nhất.')
ON CONFLICT (id) DO NOTHING;
