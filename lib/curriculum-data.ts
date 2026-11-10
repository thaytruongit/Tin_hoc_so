// ============================================================================
// HỆ THỐNG HỌC LIỆU 29 TIẾT HỌC CHO 4 KHỐI LỚP 6, 7, 8, 9
// Chuẩn chương trình GDPT 2018 môn Tin học - THCS Mão Điền
// Tích hợp Năng lực số (CV 3456) & Năng lực Trí tuệ nhân tạo AI (QĐ 3439)
// Mỗi tiết học gồm đủ 4 thành phần:
// 1. Phiếu học tập điện tử 4 pha (Khởi động, Khám phá, Luyện tập, Vận dụng)
// 2. Củng cố bài học 7 câu trắc nghiệm chuẩn Bộ (3 Biết, 2 Hiểu, 2 Vận dụng)
// 3. Bài tập thực hành tại lớp (quy trình 6 bước + Rubric chấm điểm 10)
// 4. Bài tập về nhà (hỗ trợ nộp ảnh chụp vở, docx, xlsx)
// ============================================================================

import { CognitiveLevel } from './types';

export interface CurriculumPeriod {
  id: string;
  grade: number;
  period: number;
  title: string;
  topic: string;
  isPractice: boolean;
  contentDesc: string;
  digitalCompetency: string; // Năng lực số CV 3456 / AI 3439
  worksheet: {
    title: string;
    phase1_khoi_dong: string;
    phase2_kham_pha: string;
    phase3_luyen_tap: string;
    phase4_van_dung: string;
    xpReward: number;
    timeLimitMin: number;
  };
  reinforcement: {
    questionsCount: 7;
    matrix: string; // "3 Biết - 2 Hiểu - 2 Vận dụng"
    questions: {
      id: string;
      level: CognitiveLevel;
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }[];
  };
  practicalTask?: {
    title: string;
    sampleFileName: string;
    sampleFileUrl: string;
    steps: string[];
    rubric: { criterion: string; maxPoints: number; note: string }[];
  };
  homework: {
    title: string;
    description: string;
    acceptedFormats: ('image' | 'xlsx' | 'docx')[];
    dueInDays: number;
  };
}

export const CURRICULUM_DATA: Record<number, CurriculumPeriod[]> = {
  6: [
    {
      id: "k6-p01",
      grade: 6,
      period: 1,
      title: "Bài 1: Thông tin và dữ liệu",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "Mục 1. Thông tin và dữ liệu; Mục 2. Tầm quan trọng của thông tin",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 1: Bài 1: Thông tin và dữ liệu",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 1: Thông tin và dữ liệu.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-1-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 1: Thông tin và dữ liệu, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 1: Thông tin và dữ liệu theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-1-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 1: Thông tin và dữ liệu?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-1-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 1: Thông tin và dữ liệu là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-1-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 1: Thông tin và dữ liệu lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-1-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 1: Thông tin và dữ liệu?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-1-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 1: Thông tin và dữ liệu trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-1-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 1: Thông tin và dữ liệu, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 1: Bài 1: Thông tin và dữ liệu",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p02",
      grade: 6,
      period: 2,
      title: "Bài 2: Xử lí thông tin (mục 1)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "Mục 1. Xử lí thông tin",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 2: Bài 2: Xử lí thông tin (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 2: Xử lí thông tin (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-2-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 2: Xử lí thông tin (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 2: Xử lí thông tin (mục 1) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-2-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 2: Xử lí thông tin (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-2-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 2: Xử lí thông tin (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-2-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 2: Xử lí thông tin (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-2-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 2: Xử lí thông tin (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-2-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 2: Xử lí thông tin (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-2-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 2: Xử lí thông tin (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 2: Bài 2: Xử lí thông tin (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p03",
      grade: 6,
      period: 3,
      title: "Bài 2: Xử lí thông tin (mục 2)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "Mục 2. Xử lí thông tin trong máy tính",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 3: Bài 2: Xử lí thông tin (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 2: Xử lí thông tin (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-3-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 2: Xử lí thông tin (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 2: Xử lí thông tin (mục 2) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-3-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 2: Xử lí thông tin (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-3-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 2: Xử lí thông tin (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-3-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 2: Xử lí thông tin (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-3-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 2: Xử lí thông tin (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-3-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 2: Xử lí thông tin (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-3-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 2: Xử lí thông tin (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 3: Bài 2: Xử lí thông tin (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p04",
      grade: 6,
      period: 4,
      title: "Bài 3: Thông tin trong máy tính (mục 1)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "Mục 1. Biểu diễn thông tin trong máy tính",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 4: Bài 3: Thông tin trong máy tính (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 3: Thông tin trong máy tính (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-4-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 3: Thông tin trong máy tính (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 3: Thông tin trong máy tính (mục 1) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-4-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 3: Thông tin trong máy tính (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-4-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 3: Thông tin trong máy tính (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-4-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 3: Thông tin trong máy tính (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-4-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 3: Thông tin trong máy tính (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-4-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 3: Thông tin trong máy tính (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-4-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 3: Thông tin trong máy tính (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 4: Bài 3: Thông tin trong máy tính (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p05",
      grade: 6,
      period: 5,
      title: "Bài 3: Thông tin trong máy tính (mục 2)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "Mục 2. Đơn vị đo thông tin",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 5: Bài 3: Thông tin trong máy tính (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 3: Thông tin trong máy tính (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-5-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 3: Thông tin trong máy tính (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 3: Thông tin trong máy tính (mục 2) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-5-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 3: Thông tin trong máy tính (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-5-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 3: Thông tin trong máy tính (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-5-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 3: Thông tin trong máy tính (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-5-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 3: Thông tin trong máy tính (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-5-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 3: Thông tin trong máy tính (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-5-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 3: Thông tin trong máy tính (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 5: Bài 3: Thông tin trong máy tính (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p06",
      grade: 6,
      period: 6,
      title: "Bài 4: Mạng máy tính",
      topic: "Chủ đề 2. Mạng máy tính và Internet",
      isPractice: false,
      contentDesc: "Mục 1. Mạng máy tính là gì?",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 6: Bài 4: Mạng máy tính",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 4: Mạng máy tính.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-6-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 4: Mạng máy tính, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 4: Mạng máy tính theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-6-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 4: Mạng máy tính?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-6-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 4: Mạng máy tính là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-6-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 4: Mạng máy tính lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-6-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 4: Mạng máy tính?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-6-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 4: Mạng máy tính trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-6-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 4: Mạng máy tính, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 6: Bài 4: Mạng máy tính",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p07",
      grade: 6,
      period: 7,
      title: "Bài 4: Mạng máy tính",
      topic: "Chủ đề 2. Mạng máy tính và Internet",
      isPractice: false,
      contentDesc: "Mục 2. Các thành phần của mạng máy tính",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 7: Bài 4: Mạng máy tính",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 4: Mạng máy tính.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-7-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 4: Mạng máy tính, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 4: Mạng máy tính theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-7-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 4: Mạng máy tính?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-7-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 4: Mạng máy tính là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-7-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 4: Mạng máy tính lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-7-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 4: Mạng máy tính?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-7-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 4: Mạng máy tính trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-7-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 4: Mạng máy tính, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 7: Bài 4: Mạng máy tính",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p08",
      grade: 6,
      period: 8,
      title: "Bài 5: Internet (mục 1, 2)",
      topic: "Chủ đề 2. Mạng máy tính và Internet",
      isPractice: false,
      contentDesc: "Mục 1. Internet; Mục 2. Đặc điểm của Internet",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 8: Bài 5: Internet (mục 1, 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 5: Internet (mục 1, 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-8-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 5: Internet (mục 1, 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 5: Internet (mục 1, 2) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-8-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 5: Internet (mục 1, 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-8-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 5: Internet (mục 1, 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-8-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 5: Internet (mục 1, 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-8-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 5: Internet (mục 1, 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-8-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 5: Internet (mục 1, 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-8-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 5: Internet (mục 1, 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 8: Bài 5: Internet (mục 1, 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p09",
      grade: 6,
      period: 9,
      title: "Bài 5: Internet (mục 3)",
      topic: "Chủ đề 2. Mạng máy tính và Internet",
      isPractice: false,
      contentDesc: "Mục 3. Một số lợi ích của Internet",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 9: Bài 5: Internet (mục 3)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 5: Internet (mục 3).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-9-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 5: Internet (mục 3), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 5: Internet (mục 3) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-9-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 5: Internet (mục 3)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-9-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 5: Internet (mục 3) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-9-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 5: Internet (mục 3) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-9-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 5: Internet (mục 3)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-9-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 5: Internet (mục 3) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-9-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 5: Internet (mục 3), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 9: Bài 5: Internet (mục 3)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p10",
      grade: 6,
      period: 10,
      title: "Bài 6: Mạng thông tin toàn cầu (mục 1, 2)",
      topic: "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: false,
      contentDesc: "Mục 1. Tổ chức thông tin trên Internet; Mục 2. Trình duyệt",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 10: Bài 6: Mạng thông tin toàn cầu (mục 1, 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 6: Mạng thông tin toàn cầu (mục 1, 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-10-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 6: Mạng thông tin toàn cầu (mục 1, 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 6: Mạng thông tin toàn cầu (mục 1, 2) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-10-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 6: Mạng thông tin toàn cầu (mục 1, 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-10-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 6: Mạng thông tin toàn cầu (mục 1, 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-10-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 6: Mạng thông tin toàn cầu (mục 1, 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-10-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 6: Mạng thông tin toàn cầu (mục 1, 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-10-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 6: Mạng thông tin toàn cầu (mục 1, 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-10-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 6: Mạng thông tin toàn cầu (mục 1, 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 10: Bài 6: Mạng thông tin toàn cầu (mục 1, 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p11",
      grade: 6,
      period: 11,
      title: "Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành)",
      topic: "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: true,
      contentDesc: "Mục 3. Thực hành: Khai thác thông tin trên trang web",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 11: Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-11-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-11-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-11-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-11-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-11-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-11-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-11-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 11: Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành)",
        sampleFileName: "BTTH_K6_Tiet11.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet11) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 11: Bài 6: Mạng thông tin toàn cầu (mục 3 - thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p12",
      grade: 6,
      period: 12,
      title: "Bài 7: Tìm kiếm thông tin trên Internet (mục 1)",
      topic: "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: false,
      contentDesc: "Mục 1. Tìm kiếm thông tin trên Internet",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 12: Bài 7: Tìm kiếm thông tin trên Internet (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 7: Tìm kiếm thông tin trên Internet (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-12-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 7: Tìm kiếm thông tin trên Internet (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 7: Tìm kiếm thông tin trên Internet (mục 1) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-12-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 7: Tìm kiếm thông tin trên Internet (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-12-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 7: Tìm kiếm thông tin trên Internet (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-12-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 7: Tìm kiếm thông tin trên Internet (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-12-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 7: Tìm kiếm thông tin trên Internet (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-12-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 7: Tìm kiếm thông tin trên Internet (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-12-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 7: Tìm kiếm thông tin trên Internet (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 12: Bài 7: Tìm kiếm thông tin trên Internet (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p13",
      grade: 6,
      period: 13,
      title: "Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành)",
      topic: "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: true,
      contentDesc: "Mục 2. Thực hành: Tìm kiếm và khai thác thông tin trên Internet",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 13: Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-13-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành) theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-13-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-13-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-13-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-13-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-13-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-13-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 13: Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành)",
        sampleFileName: "BTTH_K6_Tiet13.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet13) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 13: Bài 7: Tìm kiếm thông tin trên Internet (mục 2 - thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p14",
      grade: 6,
      period: 14,
      title: "Bài 8: Thư điện tử",
      topic: "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: false,
      contentDesc: "Mục 1. Thư điện tử. Tài khoản thư điện tử; Mục 2. Ưu và nhược điểm của dịch vụ thư điện tử",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 14: Bài 8: Thư điện tử",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 8: Thư điện tử.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-14-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 8: Thư điện tử, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 8: Thư điện tử theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-14-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 8: Thư điện tử?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-14-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 8: Thư điện tử là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-14-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 8: Thư điện tử lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-14-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 8: Thư điện tử?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-14-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 8: Thư điện tử trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-14-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 8: Thư điện tử, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 14: Bài 8: Thư điện tử",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p15",
      grade: 6,
      period: 15,
      title: "Bài 8: Thư điện tử",
      topic: "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: true,
      contentDesc: "Mục 3. Thực hành: Đăng kí tài khoản, đăng nhập, đăng xuất và gửi thư điện tử",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 15: Bài 8: Thư điện tử",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 8: Thư điện tử.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-15-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 8: Thư điện tử, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 8: Thư điện tử theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-15-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 8: Thư điện tử?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-15-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 8: Thư điện tử là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-15-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 8: Thư điện tử lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-15-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 8: Thư điện tử?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-15-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 8: Thư điện tử trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-15-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 8: Thư điện tử, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 15: Bài 8: Thư điện tử",
        sampleFileName: "BTTH_K6_Tiet15.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet15) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 15: Bài 8: Thư điện tử",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p16",
      grade: 6,
      period: 16,
      title: "Bài 9: An toàn thông tin trên Internet",
      topic: "Chủ đề 4. Đạo đức, pháp luật và văn hoá trong môi trường số",
      isPractice: false,
      contentDesc: "Mục 1. Tác hại và nguy cơ khi sử dụng Internet; Mục 2. Quy tắc an toàn",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 16: Bài 9: An toàn thông tin trên Internet",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 9: An toàn thông tin trên Internet.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-16-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 9: An toàn thông tin trên Internet, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 9: An toàn thông tin trên Internet theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-16-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 9: An toàn thông tin trên Internet?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-16-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 9: An toàn thông tin trên Internet là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-16-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 9: An toàn thông tin trên Internet lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-16-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 9: An toàn thông tin trên Internet?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-16-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 9: An toàn thông tin trên Internet trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-16-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 9: An toàn thông tin trên Internet, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 16: Bài 9: An toàn thông tin trên Internet",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p17",
      grade: 6,
      period: 17,
      title: "Bài 9: An toàn thông tin trên Internet",
      topic: "Chủ đề 4. Đạo đức, pháp luật và văn hoá trong môi trường số",
      isPractice: false,
      contentDesc: "Mục 3. An toàn thông tin (bảo vệ thông tin cá nhân và chia sẻ an toàn)",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 17: Bài 9: An toàn thông tin trên Internet",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 9: An toàn thông tin trên Internet.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-17-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 9: An toàn thông tin trên Internet, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 9: An toàn thông tin trên Internet theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-17-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 9: An toàn thông tin trên Internet?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-17-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 9: An toàn thông tin trên Internet là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-17-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 9: An toàn thông tin trên Internet lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-17-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 9: An toàn thông tin trên Internet?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-17-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 9: An toàn thông tin trên Internet trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-17-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 9: An toàn thông tin trên Internet, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 17: Bài 9: An toàn thông tin trên Internet",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p18",
      grade: 6,
      period: 18,
      title: "Bài 10: Sơ đồ tư duy",
      topic: "Chủ đề 5. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "Mục 1. Sơ đồ tư duy; Mục 2. Cách tạo sơ đồ tư duy",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 18: Bài 10: Sơ đồ tư duy",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 10: Sơ đồ tư duy.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-18-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 10: Sơ đồ tư duy, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 10: Sơ đồ tư duy theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-18-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 10: Sơ đồ tư duy?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-18-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 10: Sơ đồ tư duy là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-18-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 10: Sơ đồ tư duy lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-18-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 10: Sơ đồ tư duy?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-18-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 10: Sơ đồ tư duy trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-18-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 10: Sơ đồ tư duy, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 18: Bài 10: Sơ đồ tư duy",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p19",
      grade: 6,
      period: 19,
      title: "Bài 10: Sơ đồ tư duy",
      topic: "Chủ đề 5. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "Mục 3. Thực hành: Tạo sơ đồ tư duy bằng phần mềm máy tính",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 19: Bài 10: Sơ đồ tư duy",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 10: Sơ đồ tư duy.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-19-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 10: Sơ đồ tư duy, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 10: Sơ đồ tư duy theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-19-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 10: Sơ đồ tư duy?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-19-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 10: Sơ đồ tư duy là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-19-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 10: Sơ đồ tư duy lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-19-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 10: Sơ đồ tư duy?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-19-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 10: Sơ đồ tư duy trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-19-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 10: Sơ đồ tư duy, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 19: Bài 10: Sơ đồ tư duy",
        sampleFileName: "BTTH_K6_Tiet19.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet19) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 19: Bài 10: Sơ đồ tư duy",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p20",
      grade: 6,
      period: 20,
      title: "Bài 11: Định dạng văn bản",
      topic: "Chủ đề 5. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "Mục 1. Phần mềm soạn thảo; Mục 2. Định dạng văn bản và in; Mục 3. Thực hành",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 20: Bài 11: Định dạng văn bản",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 11: Định dạng văn bản.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-20-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 11: Định dạng văn bản, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 11: Định dạng văn bản theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-20-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 11: Định dạng văn bản?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-20-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 11: Định dạng văn bản là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-20-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 11: Định dạng văn bản lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-20-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 11: Định dạng văn bản?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-20-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 11: Định dạng văn bản trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-20-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 11: Định dạng văn bản, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 20: Bài 11: Định dạng văn bản",
        sampleFileName: "BTTH_K6_Tiet20.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet20) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 20: Bài 11: Định dạng văn bản",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p21",
      grade: 6,
      period: 21,
      title: "Bài 12: Trình bày thông tin ở dạng bảng",
      topic: "Chủ đề 5. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "Mục 1. Trình bày dạng bảng; Mục 2. Tạo bảng; Mục 3. Định dạng bảng",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 21: Bài 12: Trình bày thông tin ở dạng bảng",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 12: Trình bày thông tin ở dạng bảng.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-21-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 12: Trình bày thông tin ở dạng bảng, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 12: Trình bày thông tin ở dạng bảng theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-21-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 12: Trình bày thông tin ở dạng bảng?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-21-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 12: Trình bày thông tin ở dạng bảng là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-21-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 12: Trình bày thông tin ở dạng bảng lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-21-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 12: Trình bày thông tin ở dạng bảng?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-21-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 12: Trình bày thông tin ở dạng bảng trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-21-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 12: Trình bày thông tin ở dạng bảng, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 21: Bài 12: Trình bày thông tin ở dạng bảng",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p22",
      grade: 6,
      period: 22,
      title: "Bài 12: Trình bày thông tin ở dạng bảng",
      topic: "Chủ đề 5. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "Mục 4. Thực hành: Tạo bảng",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 22: Bài 12: Trình bày thông tin ở dạng bảng",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 12: Trình bày thông tin ở dạng bảng.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-22-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 12: Trình bày thông tin ở dạng bảng, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 12: Trình bày thông tin ở dạng bảng theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-22-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 12: Trình bày thông tin ở dạng bảng?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-22-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 12: Trình bày thông tin ở dạng bảng là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-22-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 12: Trình bày thông tin ở dạng bảng lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-22-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 12: Trình bày thông tin ở dạng bảng?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-22-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 12: Trình bày thông tin ở dạng bảng trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-22-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 12: Trình bày thông tin ở dạng bảng, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 22: Bài 12: Trình bày thông tin ở dạng bảng",
        sampleFileName: "BTTH_K6_Tiet22.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet22) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 22: Bài 12: Trình bày thông tin ở dạng bảng",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p23",
      grade: 6,
      period: 23,
      title: "Bài 13: Thực hành: Tìm kiếm và thay thế",
      topic: "Chủ đề 5. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "Mục 1. Tại sao phải tìm kiếm và thay thế?; Mục 2. Sử dụng công cụ",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 23: Bài 13: Thực hành: Tìm kiếm và thay thế",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 13: Thực hành: Tìm kiếm và thay thế.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-23-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 13: Thực hành: Tìm kiếm và thay thế, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 13: Thực hành: Tìm kiếm và thay thế theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-23-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 13: Thực hành: Tìm kiếm và thay thế?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-23-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 13: Thực hành: Tìm kiếm và thay thế là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-23-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 13: Thực hành: Tìm kiếm và thay thế lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-23-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 13: Thực hành: Tìm kiếm và thay thế?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-23-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 13: Thực hành: Tìm kiếm và thay thế trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-23-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 13: Thực hành: Tìm kiếm và thay thế, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 23: Bài 13: Thực hành: Tìm kiếm và thay thế",
        sampleFileName: "BTTH_K6_Tiet23.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet23) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 23: Bài 13: Thực hành: Tìm kiếm và thay thế",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p24",
      grade: 6,
      period: 24,
      title: "Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm",
      topic: "Chủ đề 5. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "Mục Nhiệm vụ và Hướng dẫn (Tập hợp, bổ sung nội dung, tạo trang bìa, hoàn thiện)",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 24: Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-24-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-24-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-24-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-24-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-24-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-24-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-24-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 24: Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm",
        sampleFileName: "BTTH_K6_Tiet24.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet24) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 24: Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p25",
      grade: 6,
      period: 25,
      title: "Bài 15: Thuật toán",
      topic: "Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "Mục 1. Thuật toán; Mục 2. Mô tả thuật toán",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 25: Bài 15: Thuật toán",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 15: Thuật toán.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-25-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 15: Thuật toán, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 15: Thuật toán theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-25-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 15: Thuật toán?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-25-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 15: Thuật toán là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-25-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 15: Thuật toán lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-25-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 15: Thuật toán?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-25-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 15: Thuật toán trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-25-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 15: Thuật toán, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 25: Bài 15: Thuật toán",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p26",
      grade: 6,
      period: 26,
      title: "Bài 16: Các cấu trúc điều khiển",
      topic: "Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "Mục 1. Cấu trúc tuần tự, cấu trúc rẽ nhánh",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 26: Bài 16: Các cấu trúc điều khiển",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 16: Các cấu trúc điều khiển.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-26-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 16: Các cấu trúc điều khiển, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 16: Các cấu trúc điều khiển theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-26-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 16: Các cấu trúc điều khiển?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-26-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 16: Các cấu trúc điều khiển là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-26-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 16: Các cấu trúc điều khiển lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-26-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 16: Các cấu trúc điều khiển?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-26-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 16: Các cấu trúc điều khiển trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-26-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 16: Các cấu trúc điều khiển, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 26: Bài 16: Các cấu trúc điều khiển",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p27",
      grade: 6,
      period: 27,
      title: "Bài 16: Các cấu trúc điều khiển",
      topic: "Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "Mục 2. Cấu trúc lặp",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 27: Bài 16: Các cấu trúc điều khiển",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 16: Các cấu trúc điều khiển.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-27-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 16: Các cấu trúc điều khiển, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 16: Các cấu trúc điều khiển theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-27-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 16: Các cấu trúc điều khiển?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-27-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 16: Các cấu trúc điều khiển là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-27-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 16: Các cấu trúc điều khiển lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-27-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 16: Các cấu trúc điều khiển?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-27-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 16: Các cấu trúc điều khiển trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-27-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 16: Các cấu trúc điều khiển, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 27: Bài 16: Các cấu trúc điều khiển",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p28",
      grade: 6,
      period: 28,
      title: "Bài 17: Chương trình máy tính",
      topic: "Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "Mục 1. Chương trình máy tính",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 28: Bài 17: Chương trình máy tính",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 17: Chương trình máy tính.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-28-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 17: Chương trình máy tính, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 17: Chương trình máy tính theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-28-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 17: Chương trình máy tính?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-28-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 17: Chương trình máy tính là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-28-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 17: Chương trình máy tính lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-28-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 17: Chương trình máy tính?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-28-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 17: Chương trình máy tính trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-28-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 17: Chương trình máy tính, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 28: Bài 17: Chương trình máy tính",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k6-p29",
      grade: 6,
      period: 29,
      title: "Bài 17: Chương trình máy tính",
      topic: "Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: true,
      contentDesc: "Mục 2. Thực hành: Tạo chương trình máy tính",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 29: Bài 17: Chương trình máy tính",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 17: Chương trình máy tính.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-6-29-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 17: Chương trình máy tính, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 17: Chương trình máy tính theo chuẩn chương trình Tin học 6."
          },
          {
                    "id": "rq-6-29-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 17: Chương trình máy tính?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-6-29-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 17: Chương trình máy tính là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-6-29-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 17: Chương trình máy tính lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-6-29-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 17: Chương trình máy tính?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-6-29-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 17: Chương trình máy tính trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-6-29-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 17: Chương trình máy tính, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 29: Bài 17: Chương trình máy tính",
        sampleFileName: "BTTH_K6_Tiet29.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet29) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 29: Bài 17: Chương trình máy tính",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
  ],
  7: [
    {
      id: "k7-p01",
      grade: 7,
      period: 1,
      title: "Bài 1. Thiết bị vào ra (mục 1)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "1. Thiết bị vào – ra",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 1: Bài 1. Thiết bị vào ra (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 1. Thiết bị vào ra (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-1-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 1. Thiết bị vào ra (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 1. Thiết bị vào ra (mục 1) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-1-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 1. Thiết bị vào ra (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-1-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 1. Thiết bị vào ra (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-1-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 1. Thiết bị vào ra (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-1-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 1. Thiết bị vào ra (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-1-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 1. Thiết bị vào ra (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-1-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 1. Thiết bị vào ra (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 1: Bài 1. Thiết bị vào ra (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p02",
      grade: 7,
      period: 2,
      title: "Bài 1. Thiết bị vào ra (mục 2)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "2. An toàn thiết bị",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 2: Bài 1. Thiết bị vào ra (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 1. Thiết bị vào ra (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-2-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 1. Thiết bị vào ra (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 1. Thiết bị vào ra (mục 2) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-2-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 1. Thiết bị vào ra (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-2-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 1. Thiết bị vào ra (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-2-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 1. Thiết bị vào ra (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-2-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 1. Thiết bị vào ra (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-2-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 1. Thiết bị vào ra (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-2-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 1. Thiết bị vào ra (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 2: Bài 1. Thiết bị vào ra (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p03",
      grade: 7,
      period: 3,
      title: "Bài 2. Phần mềm máy tính (mục 1)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "1. Hệ điều hành",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 3: Bài 2. Phần mềm máy tính (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 2. Phần mềm máy tính (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-3-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 2. Phần mềm máy tính (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 2. Phần mềm máy tính (mục 1) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-3-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 2. Phần mềm máy tính (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-3-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 2. Phần mềm máy tính (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-3-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 2. Phần mềm máy tính (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-3-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 2. Phần mềm máy tính (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-3-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 2. Phần mềm máy tính (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-3-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 2. Phần mềm máy tính (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 3: Bài 2. Phần mềm máy tính (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p04",
      grade: 7,
      period: 4,
      title: "Bài 2. Phần mềm máy tính (mục 2)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "2. Phần mềm ứng dụng",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 4: Bài 2. Phần mềm máy tính (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 2. Phần mềm máy tính (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-4-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 2. Phần mềm máy tính (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 2. Phần mềm máy tính (mục 2) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-4-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 2. Phần mềm máy tính (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-4-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 2. Phần mềm máy tính (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-4-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 2. Phần mềm máy tính (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-4-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 2. Phần mềm máy tính (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-4-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 2. Phần mềm máy tính (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-4-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 2. Phần mềm máy tính (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 4: Bài 2. Phần mềm máy tính (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p05",
      grade: 7,
      period: 5,
      title: "Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "1. Tên tệp và thư mục; 2. Các biện pháp bảo vệ dữ liệu",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 5: Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-5-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-5-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-5-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-5-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-5-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-5-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-5-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 5: Bài 3. Quản lý dữ liệu trong máy tính (mục 1, 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p06",
      grade: 7,
      period: 6,
      title: "Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: true,
      contentDesc: "3. Thực hành: Quản lý dữ liệu trong máy tính",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 6: Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-6-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-6-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-6-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-6-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-6-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-6-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-6-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 6: Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành)",
        sampleFileName: "BTTH_K7_Tiet6.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet6) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 6: Bài 3. Quản lý dữ liệu trong máy tính (mục 3 – Thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p07",
      grade: 7,
      period: 7,
      title: "Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1)",
      topic: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: false,
      contentDesc: "1. Mạng xã hội – Kênh trao đổi thông tin phổ biến trên Internet",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 7: Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-7-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-7-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-7-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-7-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-7-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-7-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-7-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 7: Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p08",
      grade: 7,
      period: 8,
      title: "Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành)",
      topic: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: true,
      contentDesc: "2. Thực hành: Sử dụng mạng xã hội",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 8: Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-8-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-8-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-8-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-8-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-8-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-8-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-8-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 8: Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành)",
        sampleFileName: "BTTH_K7_Tiet8.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet8) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 8: Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet (mục 2 – Thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p09",
      grade: 7,
      period: 9,
      title: "Bài 5. Ứng xử trên mạng (mục 1, 2)",
      topic: "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số",
      isPractice: false,
      contentDesc: "1. Giao tiếp, ứng xử có văn hoá qua mạng; 2. Làm gì khi gặp thông tin xấu?",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 9: Bài 5. Ứng xử trên mạng (mục 1, 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 5. Ứng xử trên mạng (mục 1, 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-9-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 5. Ứng xử trên mạng (mục 1, 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 5. Ứng xử trên mạng (mục 1, 2) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-9-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 5. Ứng xử trên mạng (mục 1, 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-9-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 5. Ứng xử trên mạng (mục 1, 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-9-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 5. Ứng xử trên mạng (mục 1, 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-9-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 5. Ứng xử trên mạng (mục 1, 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-9-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 5. Ứng xử trên mạng (mục 1, 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-9-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 5. Ứng xử trên mạng (mục 1, 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 9: Bài 5. Ứng xử trên mạng (mục 1, 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p10",
      grade: 7,
      period: 10,
      title: "Bài 5. Ứng xử trên mạng (mục 3)",
      topic: "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số",
      isPractice: false,
      contentDesc: "3. Tác hại và cách phòng tránh bệnh nghiện Internet",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 10: Bài 5. Ứng xử trên mạng (mục 3)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 5. Ứng xử trên mạng (mục 3).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-10-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 5. Ứng xử trên mạng (mục 3), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 5. Ứng xử trên mạng (mục 3) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-10-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 5. Ứng xử trên mạng (mục 3)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-10-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 5. Ứng xử trên mạng (mục 3) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-10-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 5. Ứng xử trên mạng (mục 3) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-10-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 5. Ứng xử trên mạng (mục 3)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-10-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 5. Ứng xử trên mạng (mục 3) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-10-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 5. Ứng xử trên mạng (mục 3), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 10: Bài 5. Ứng xử trên mạng (mục 3)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p11",
      grade: 7,
      period: 11,
      title: "Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Giao diện bảng tính; 2. Nhập, chỉnh sửa và định dạng dữ liệu",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 11: Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-11-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-11-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-11-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-11-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-11-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-11-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-11-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 11: Bài 6. Làm quen với phần mềm bảng tính (mục 1, 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p12",
      grade: 7,
      period: 12,
      title: "Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "3. Thực hành: Nhập thông tin khảo sát dự án Trường học xanh",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 12: Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-12-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-12-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-12-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-12-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-12-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-12-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-12-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 12: Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành)",
        sampleFileName: "BTTH_K7_Tiet12.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet12) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 12: Bài 6. Làm quen với phần mềm bảng tính (mục 3 – Thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p13",
      grade: 7,
      period: 13,
      title: "Bài 7. Tính toán tự động trên bảng tính (mục 1, 2)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Kiểu dữ liệu; 2. Công thức trong bảng tính",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 13: Bài 7. Tính toán tự động trên bảng tính (mục 1, 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 7. Tính toán tự động trên bảng tính (mục 1, 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-13-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 7. Tính toán tự động trên bảng tính (mục 1, 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 7. Tính toán tự động trên bảng tính (mục 1, 2) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-13-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 7. Tính toán tự động trên bảng tính (mục 1, 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-13-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 7. Tính toán tự động trên bảng tính (mục 1, 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-13-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 7. Tính toán tự động trên bảng tính (mục 1, 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-13-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 7. Tính toán tự động trên bảng tính (mục 1, 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-13-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 7. Tính toán tự động trên bảng tính (mục 1, 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-13-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 7. Tính toán tự động trên bảng tính (mục 1, 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 13: Bài 7. Tính toán tự động trên bảng tính (mục 1, 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p14",
      grade: 7,
      period: 14,
      title: "Bài 7. Tính toán tự động trên bảng tính (mục 3)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "3. Sao chép ô tính chứa công thức",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 14: Bài 7. Tính toán tự động trên bảng tính (mục 3)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 7. Tính toán tự động trên bảng tính (mục 3).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-14-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 7. Tính toán tự động trên bảng tính (mục 3), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 7. Tính toán tự động trên bảng tính (mục 3) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-14-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 7. Tính toán tự động trên bảng tính (mục 3)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-14-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 7. Tính toán tự động trên bảng tính (mục 3) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-14-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 7. Tính toán tự động trên bảng tính (mục 3) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-14-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 7. Tính toán tự động trên bảng tính (mục 3)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-14-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 7. Tính toán tự động trên bảng tính (mục 3) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-14-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 7. Tính toán tự động trên bảng tính (mục 3), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 14: Bài 7. Tính toán tự động trên bảng tính (mục 3)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p15",
      grade: 7,
      period: 15,
      title: "Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "4. Thực hành: Nhập thông tin dự kiến số lượng cây trồng",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 15: Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-15-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-15-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-15-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-15-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-15-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-15-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-15-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 15: Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành)",
        sampleFileName: "BTTH_K7_Tiet15.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet15) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 15: Bài 7. Tính toán tự động trên bảng tính (mục 4 – Thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p16",
      grade: 7,
      period: 16,
      title: "Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Hàm trong bảng tính; 2. Một số hàm tính toán đơn giản",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 16: Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-16-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-16-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-16-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-16-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-16-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-16-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-16-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 16: Bài 8. Công cụ hỗ trợ tính toán (mục 1, 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p17",
      grade: 7,
      period: 17,
      title: "Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "3. Thực hành: Tính toán trên dữ liệu trồng cây thực tế",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 17: Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-17-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-17-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-17-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-17-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-17-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-17-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-17-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 17: Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành)",
        sampleFileName: "BTTH_K7_Tiet17.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet17) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 17: Bài 8. Công cụ hỗ trợ tính toán (mục 3 – Thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p18",
      grade: 7,
      period: 18,
      title: "Bài 9. Trình bày bảng tính (mục 1, 2, 3)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Định dạng dữ liệu số; 2. Trình bày bảng tính; 3. Tính chất của hàm",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 18: Bài 9. Trình bày bảng tính (mục 1, 2, 3)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 9. Trình bày bảng tính (mục 1, 2, 3).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-18-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 9. Trình bày bảng tính (mục 1, 2, 3), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 9. Trình bày bảng tính (mục 1, 2, 3) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-18-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 9. Trình bày bảng tính (mục 1, 2, 3)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-18-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 9. Trình bày bảng tính (mục 1, 2, 3) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-18-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 9. Trình bày bảng tính (mục 1, 2, 3) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-18-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 9. Trình bày bảng tính (mục 1, 2, 3)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-18-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 9. Trình bày bảng tính (mục 1, 2, 3) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-18-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 9. Trình bày bảng tính (mục 1, 2, 3), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 18: Bài 9. Trình bày bảng tính (mục 1, 2, 3)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p19",
      grade: 7,
      period: 19,
      title: "Bài 9. Trình bày bảng tính (mục 4 – Thực hành)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "4. Thực hành: Hoàn thiện dữ liệu dự án Trường học xanh",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 19: Bài 9. Trình bày bảng tính (mục 4 – Thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 9. Trình bày bảng tính (mục 4 – Thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-19-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 9. Trình bày bảng tính (mục 4 – Thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 9. Trình bày bảng tính (mục 4 – Thực hành) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-19-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 9. Trình bày bảng tính (mục 4 – Thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-19-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 9. Trình bày bảng tính (mục 4 – Thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-19-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 9. Trình bày bảng tính (mục 4 – Thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-19-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 9. Trình bày bảng tính (mục 4 – Thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-19-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 9. Trình bày bảng tính (mục 4 – Thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-19-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 9. Trình bày bảng tính (mục 4 – Thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 19: Bài 9. Trình bày bảng tính (mục 4 – Thực hành)",
        sampleFileName: "BTTH_K7_Tiet19.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet19) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 19: Bài 9. Trình bày bảng tính (mục 4 – Thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p20",
      grade: 7,
      period: 20,
      title: "Bài 10. Hoàn thiện bảng tính",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "1. Thao tác trang tính; 2. In dữ liệu; 3. Thực hành trình bày hoàn chỉnh",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 20: Bài 10. Hoàn thiện bảng tính",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 10. Hoàn thiện bảng tính.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-20-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 10. Hoàn thiện bảng tính, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 10. Hoàn thiện bảng tính theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-20-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 10. Hoàn thiện bảng tính?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-20-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 10. Hoàn thiện bảng tính là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-20-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 10. Hoàn thiện bảng tính lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-20-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 10. Hoàn thiện bảng tính?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-20-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 10. Hoàn thiện bảng tính trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-20-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 10. Hoàn thiện bảng tính, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 20: Bài 10. Hoàn thiện bảng tính",
        sampleFileName: "BTTH_K7_Tiet20.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet20) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 20: Bài 10. Hoàn thiện bảng tính",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p21",
      grade: 7,
      period: 21,
      title: "Bài 11. Tạo bài trình chiếu (mục 1, 2, 3)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Chức năng phần mềm trình chiếu; 2. Tiêu đề; 3. Cấu trúc phân cấp",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 21: Bài 11. Tạo bài trình chiếu (mục 1, 2, 3)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 11. Tạo bài trình chiếu (mục 1, 2, 3).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-21-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 11. Tạo bài trình chiếu (mục 1, 2, 3), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 11. Tạo bài trình chiếu (mục 1, 2, 3) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-21-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 11. Tạo bài trình chiếu (mục 1, 2, 3)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-21-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 11. Tạo bài trình chiếu (mục 1, 2, 3) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-21-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 11. Tạo bài trình chiếu (mục 1, 2, 3) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-21-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 11. Tạo bài trình chiếu (mục 1, 2, 3)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-21-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 11. Tạo bài trình chiếu (mục 1, 2, 3) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-21-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 11. Tạo bài trình chiếu (mục 1, 2, 3), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 21: Bài 11. Tạo bài trình chiếu (mục 1, 2, 3)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p22",
      grade: 7,
      period: 22,
      title: "Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "4. Thực hành: Tạo bài trình chiếu có tiêu đề, cấu trúc phân cấp",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 22: Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-22-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-22-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-22-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-22-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-22-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-22-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-22-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 22: Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành)",
        sampleFileName: "BTTH_K7_Tiet22.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet22) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 22: Bài 11. Tạo bài trình chiếu (mục 4 – Thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p23",
      grade: 7,
      period: 23,
      title: "Bài 12. Định dạng đối tượng trên trang chiếu",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "1. Ảnh minh họa; 2. Định dạng văn bản; 3. Thực hành sao chép, chèn ảnh, định dạng",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 23: Bài 12. Định dạng đối tượng trên trang chiếu",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 12. Định dạng đối tượng trên trang chiếu.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-23-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 12. Định dạng đối tượng trên trang chiếu, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 12. Định dạng đối tượng trên trang chiếu theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-23-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 12. Định dạng đối tượng trên trang chiếu?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-23-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 12. Định dạng đối tượng trên trang chiếu là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-23-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 12. Định dạng đối tượng trên trang chiếu lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-23-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 12. Định dạng đối tượng trên trang chiếu?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-23-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 12. Định dạng đối tượng trên trang chiếu trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-23-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 12. Định dạng đối tượng trên trang chiếu, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 23: Bài 12. Định dạng đối tượng trên trang chiếu",
        sampleFileName: "BTTH_K7_Tiet23.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet23) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 23: Bài 12. Định dạng đối tượng trên trang chiếu",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p24",
      grade: 7,
      period: 24,
      title: "Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "1. Hiệu ứng động; 2. Thực hành tổng hợp: Hoàn thiện bài trình chiếu",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 24: Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-24-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-24-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-24-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-24-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-24-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-24-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-24-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 24: Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu",
        sampleFileName: "BTTH_K7_Tiet24.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet24) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 24: Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p25",
      grade: 7,
      period: 25,
      title: "Bài 14. Thuật toán tìm kiếm tuần tự",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "1. Thuật toán tìm kiếm tuần tự; Mô tả thuật toán tìm kiếm tuần tự",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 25: Bài 14. Thuật toán tìm kiếm tuần tự",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 14. Thuật toán tìm kiếm tuần tự.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-25-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 14. Thuật toán tìm kiếm tuần tự, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 14. Thuật toán tìm kiếm tuần tự theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-25-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 14. Thuật toán tìm kiếm tuần tự?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-25-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 14. Thuật toán tìm kiếm tuần tự là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-25-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 14. Thuật toán tìm kiếm tuần tự lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-25-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 14. Thuật toán tìm kiếm tuần tự?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-25-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 14. Thuật toán tìm kiếm tuần tự trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-25-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 14. Thuật toán tìm kiếm tuần tự, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 25: Bài 14. Thuật toán tìm kiếm tuần tự",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p26",
      grade: 7,
      period: 26,
      title: "Bài 15. Thuật toán tìm kiếm nhị phân (mục 1)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "1. Thuật toán tìm kiếm nhị phân",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 26: Bài 15. Thuật toán tìm kiếm nhị phân (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 15. Thuật toán tìm kiếm nhị phân (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-26-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 15. Thuật toán tìm kiếm nhị phân (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 15. Thuật toán tìm kiếm nhị phân (mục 1) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-26-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 15. Thuật toán tìm kiếm nhị phân (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-26-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 15. Thuật toán tìm kiếm nhị phân (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-26-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 15. Thuật toán tìm kiếm nhị phân (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-26-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 15. Thuật toán tìm kiếm nhị phân (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-26-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 15. Thuật toán tìm kiếm nhị phân (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-26-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 15. Thuật toán tìm kiếm nhị phân (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 26: Bài 15. Thuật toán tìm kiếm nhị phân (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p27",
      grade: 7,
      period: 27,
      title: "Bài 15. Thuật toán tìm kiếm nhị phân (mục 2)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "2. Sắp xếp và tìm kiếm",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 27: Bài 15. Thuật toán tìm kiếm nhị phân (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 15. Thuật toán tìm kiếm nhị phân (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-27-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 15. Thuật toán tìm kiếm nhị phân (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 15. Thuật toán tìm kiếm nhị phân (mục 2) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-27-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 15. Thuật toán tìm kiếm nhị phân (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-27-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 15. Thuật toán tìm kiếm nhị phân (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-27-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 15. Thuật toán tìm kiếm nhị phân (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-27-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 15. Thuật toán tìm kiếm nhị phân (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-27-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 15. Thuật toán tìm kiếm nhị phân (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-27-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 15. Thuật toán tìm kiếm nhị phân (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 27: Bài 15. Thuật toán tìm kiếm nhị phân (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p28",
      grade: 7,
      period: 28,
      title: "Bài 16. Thuật toán sắp xếp (mục 1)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "1. Thuật toán sắp xếp nổi bọt",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 28: Bài 16. Thuật toán sắp xếp (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 16. Thuật toán sắp xếp (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-28-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 16. Thuật toán sắp xếp (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 16. Thuật toán sắp xếp (mục 1) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-28-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 16. Thuật toán sắp xếp (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-28-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 16. Thuật toán sắp xếp (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-28-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 16. Thuật toán sắp xếp (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-28-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 16. Thuật toán sắp xếp (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-28-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 16. Thuật toán sắp xếp (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-28-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 16. Thuật toán sắp xếp (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 28: Bài 16. Thuật toán sắp xếp (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k7-p29",
      grade: 7,
      period: 29,
      title: "Bài 16. Thuật toán sắp xếp (mục 2, 3)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "2. Thuật toán sắp xếp chọn; 3. Chia bài toán thành bài toán nhỏ hơn",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 29: Bài 16. Thuật toán sắp xếp (mục 2, 3)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 16. Thuật toán sắp xếp (mục 2, 3).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-7-29-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 16. Thuật toán sắp xếp (mục 2, 3), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 16. Thuật toán sắp xếp (mục 2, 3) theo chuẩn chương trình Tin học 7."
          },
          {
                    "id": "rq-7-29-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 16. Thuật toán sắp xếp (mục 2, 3)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-7-29-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 16. Thuật toán sắp xếp (mục 2, 3) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-7-29-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 16. Thuật toán sắp xếp (mục 2, 3) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-7-29-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 16. Thuật toán sắp xếp (mục 2, 3)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-7-29-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 16. Thuật toán sắp xếp (mục 2, 3) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-7-29-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 16. Thuật toán sắp xếp (mục 2, 3), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 29: Bài 16. Thuật toán sắp xếp (mục 2, 3)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
  ],
  8: [
    {
      id: "k8-p01",
      grade: 8,
      period: 1,
      title: "Bài 1. Lược sử công cụ tính toán (Tiết 1)",
      topic: "Chủ đề 1: Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "1. Máy tính cơ học 2. Máy tính điện tử",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 1: Bài 1. Lược sử công cụ tính toán (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 1. Lược sử công cụ tính toán (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-1-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 1. Lược sử công cụ tính toán (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 1. Lược sử công cụ tính toán (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-1-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 1. Lược sử công cụ tính toán (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-1-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 1. Lược sử công cụ tính toán (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-1-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 1. Lược sử công cụ tính toán (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-1-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 1. Lược sử công cụ tính toán (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-1-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 1. Lược sử công cụ tính toán (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-1-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 1. Lược sử công cụ tính toán (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 1: Bài 1. Lược sử công cụ tính toán (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p02",
      grade: 8,
      period: 2,
      title: "Bài 1. Lược sử công cụ tính toán (Tiết 2)",
      topic: "Chủ đề 1: Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "3. Máy tính thay đổi thế giới như thế nào?",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 2: Bài 1. Lược sử công cụ tính toán (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 1. Lược sử công cụ tính toán (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-2-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 1. Lược sử công cụ tính toán (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 1. Lược sử công cụ tính toán (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-2-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 1. Lược sử công cụ tính toán (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-2-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 1. Lược sử công cụ tính toán (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-2-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 1. Lược sử công cụ tính toán (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-2-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 1. Lược sử công cụ tính toán (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-2-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 1. Lược sử công cụ tính toán (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-2-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 1. Lược sử công cụ tính toán (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 2: Bài 1. Lược sử công cụ tính toán (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p03",
      grade: 8,
      period: 3,
      title: "Bài 2. Thông tin trong môi trường số",
      topic: "Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: false,
      contentDesc: "1. Thông tin trong môi trường số 2. Thông tin đáng tin cậy",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 3: Bài 2. Thông tin trong môi trường số",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 2. Thông tin trong môi trường số.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-3-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 2. Thông tin trong môi trường số, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 2. Thông tin trong môi trường số theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-3-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 2. Thông tin trong môi trường số?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-3-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 2. Thông tin trong môi trường số là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-3-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 2. Thông tin trong môi trường số lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-3-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 2. Thông tin trong môi trường số?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-3-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 2. Thông tin trong môi trường số trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-3-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 2. Thông tin trong môi trường số, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 3: Bài 2. Thông tin trong môi trường số",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p04",
      grade: 8,
      period: 4,
      title: "Bài 3. Thực hành khai thác thông tin số",
      topic: "Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: true,
      contentDesc: "Nhiệm vụ 1, 2, 3: Khai thác, đánh giá, xử lý và trao đổi thông tin",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 4: Bài 3. Thực hành khai thác thông tin số",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 3. Thực hành khai thác thông tin số.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-4-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 3. Thực hành khai thác thông tin số, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 3. Thực hành khai thác thông tin số theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-4-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 3. Thực hành khai thác thông tin số?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-4-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 3. Thực hành khai thác thông tin số là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-4-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 3. Thực hành khai thác thông tin số lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-4-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 3. Thực hành khai thác thông tin số?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-4-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 3. Thực hành khai thác thông tin số trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-4-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 3. Thực hành khai thác thông tin số, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 4: Bài 3. Thực hành khai thác thông tin số",
        sampleFileName: "BTTH_K8_Tiet4.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet4) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 4: Bài 3. Thực hành khai thác thông tin số",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p05",
      grade: 8,
      period: 5,
      title: "Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số",
      topic: "Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số",
      isPractice: false,
      contentDesc: "1. Biểu hiện vi phạm khi sử dụng CNKTS 2. Tuân thủ quy định khi tạo ra sản phẩm số",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 5: Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-5-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-5-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-5-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-5-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-5-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-5-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-5-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 5: Bài 4. Đạo đức và văn hóa trong sử dụng công nghệ kỹ thuật số",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p06",
      grade: 8,
      period: 6,
      title: "Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Địa chỉ tương đối 2. Địa chỉ tuyệt đối",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 6: Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-6-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-6-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-6-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-6-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-6-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-6-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-6-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 6: Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p07",
      grade: 8,
      period: 7,
      title: "Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: true,
      contentDesc: "3. Thực hành bảng tính 4. Sao chép dữ liệu từ văn bản/trang chiếu",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 7: Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-7-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-7-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-7-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-7-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-7-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-7-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-7-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 7: Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet7.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet7) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 7: Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p08",
      grade: 8,
      period: 8,
      title: "Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Sử dụng phần mềm bảng tính trợ giúp giải quyết bài toán thực tế",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 8: Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-8-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-8-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-8-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-8-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-8-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-8-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-8-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 8: Bài 6. Sắp xếp và lọc dữ liệu (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p09",
      grade: 8,
      period: 9,
      title: "Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: true,
      contentDesc: "2. Thực hành sắp xếp dữ liệu 3. Thực hành lọc dữ liệu",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 9: Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-9-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-9-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-9-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-9-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-9-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-9-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-9-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 9: Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet9.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet9) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 9: Bài 6. Sắp xếp và lọc dữ liệu (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p10",
      grade: 8,
      period: 10,
      title: "Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Trình bày dữ liệu bằng biểu đồ",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 10: Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-10-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-10-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-10-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-10-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-10-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-10-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-10-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 10: Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p11",
      grade: 8,
      period: 11,
      title: "Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: true,
      contentDesc: "2. Thực hành tạo biểu đồ",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 11: Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-11-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-11-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-11-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-11-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-11-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-11-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-11-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 11: Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet11.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet11) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 11: Bài 7. Trình bày dữ liệu bằng biểu đồ (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p12",
      grade: 8,
      period: 12,
      title: "Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Danh sách dạng liệt kê 2. Hình ảnh minh họa và hình đồ họa",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 12: Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-12-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-12-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-12-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-12-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-12-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-12-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-12-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 12: Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p13",
      grade: 8,
      period: 13,
      title: "Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: true,
      contentDesc: "3. Thực hành: Tạo sản phẩm là văn bản phục vụ nhu cầu thực tế",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 13: Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-13-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-13-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-13-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-13-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-13-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-13-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-13-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 13: Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet13.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet13) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 13: Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p14",
      grade: 8,
      period: 14,
      title: "Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Đầu trang và chân trang 2. Đánh số trang",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 14: Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-14-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-14-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-14-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-14-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-14-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-14-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-14-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 14: Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p15",
      grade: 8,
      period: 15,
      title: "Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: true,
      contentDesc: "3. Thực hành: Đánh số trang, thêm đầu trang và chân trang",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 15: Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-15-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-15-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-15-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-15-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-15-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-15-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-15-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 15: Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet15.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet15) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 15: Bài 9a. Tạo đầu trang, chân trang cho văn bản (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p16",
      grade: 8,
      period: 16,
      title: "Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Văn bản và màu sắc trên trang chiếu 2. Số trang, đầu trang và chân trang",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 16: Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-16-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-16-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-16-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-16-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-16-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-16-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-16-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 16: Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p17",
      grade: 8,
      period: 17,
      title: "Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: true,
      contentDesc: "3. Thực hành: Tạo bài trình chiếu cho Lễ ra mắt CLB Tin học",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 17: Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-17-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-17-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-17-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-17-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-17-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-17-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-17-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 17: Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet17.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet17) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 17: Bài 10a. Định dạng nâng cao cho trang chiếu (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p18",
      grade: 8,
      period: 18,
      title: "Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Bản mẫu trong phần mềm trình chiếu",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 18: Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-18-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-18-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-18-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-18-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-18-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-18-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-18-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 18: Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p19",
      grade: 8,
      period: 19,
      title: "Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2)",
      topic: "Chủ đề 4: Ứng dụng tin học",
      isPractice: true,
      contentDesc: "2. Thực hành: Tạo sản phẩm số phục vụ học tập, giao lưu",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 19: Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-19-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-19-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-19-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-19-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-19-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-19-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-19-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 19: Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet19.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet19) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 19: Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p20",
      grade: 8,
      period: 20,
      title: "Bài 12. Từ thuật toán đến chương trình (Tiết 1)",
      topic: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "1. Từ thuật toán đến chương trình",
      digitalCompetency: "Năng lực số chuẩn GDPT 2018 (CV 3456)",
      worksheet: {
        title: "Phiếu học tập Tiết 20: Bài 12. Từ thuật toán đến chương trình (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 12. Từ thuật toán đến chương trình (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-20-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 12. Từ thuật toán đến chương trình (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 12. Từ thuật toán đến chương trình (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-20-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 12. Từ thuật toán đến chương trình (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-20-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 12. Từ thuật toán đến chương trình (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-20-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 12. Từ thuật toán đến chương trình (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-20-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 12. Từ thuật toán đến chương trình (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-20-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 12. Từ thuật toán đến chương trình (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-20-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 12. Từ thuật toán đến chương trình (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 20: Bài 12. Từ thuật toán đến chương trình (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p21",
      grade: 8,
      period: 21,
      title: "Bài 12. Từ thuật toán đến chương trình (Tiết 2)",
      topic: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: true,
      contentDesc: "2. Thực hành: Tạo chương trình điều khiển máy tính thực hiện thuật toán",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 21: Bài 12. Từ thuật toán đến chương trình (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 12. Từ thuật toán đến chương trình (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-21-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 12. Từ thuật toán đến chương trình (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 12. Từ thuật toán đến chương trình (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-21-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 12. Từ thuật toán đến chương trình (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-21-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 12. Từ thuật toán đến chương trình (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-21-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 12. Từ thuật toán đến chương trình (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-21-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 12. Từ thuật toán đến chương trình (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-21-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 12. Từ thuật toán đến chương trình (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-21-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 12. Từ thuật toán đến chương trình (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 21: Bài 12. Từ thuật toán đến chương trình (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet21.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet21) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 21: Bài 12. Từ thuật toán đến chương trình (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p22",
      grade: 8,
      period: 22,
      title: "Bài 13. Biểu diễn dữ liệu (Tiết 1)",
      topic: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "1. Kiểu dữ liệu 2. Hằng, biến, biểu thức",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 22: Bài 13. Biểu diễn dữ liệu (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 13. Biểu diễn dữ liệu (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-22-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 13. Biểu diễn dữ liệu (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 13. Biểu diễn dữ liệu (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-22-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 13. Biểu diễn dữ liệu (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-22-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 13. Biểu diễn dữ liệu (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-22-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 13. Biểu diễn dữ liệu (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-22-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 13. Biểu diễn dữ liệu (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-22-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 13. Biểu diễn dữ liệu (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-22-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 13. Biểu diễn dữ liệu (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 22: Bài 13. Biểu diễn dữ liệu (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p23",
      grade: 8,
      period: 23,
      title: "Bài 13. Biểu diễn dữ liệu (Tiết 2)",
      topic: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: true,
      contentDesc: "3. Thực hành: Sử dụng hằng, biến, biểu thức trong chương trình",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 23: Bài 13. Biểu diễn dữ liệu (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 13. Biểu diễn dữ liệu (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-23-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 13. Biểu diễn dữ liệu (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 13. Biểu diễn dữ liệu (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-23-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 13. Biểu diễn dữ liệu (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-23-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 13. Biểu diễn dữ liệu (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-23-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 13. Biểu diễn dữ liệu (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-23-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 13. Biểu diễn dữ liệu (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-23-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 13. Biểu diễn dữ liệu (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-23-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 13. Biểu diễn dữ liệu (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 23: Bài 13. Biểu diễn dữ liệu (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet23.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet23) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 23: Bài 13. Biểu diễn dữ liệu (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p24",
      grade: 8,
      period: 24,
      title: "Bài 14. Cấu trúc điều khiển (Tiết 1)",
      topic: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "1. Cấu trúc điều khiển cơ bản (tuần tự, rẽ nhánh, lặp)",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 24: Bài 14. Cấu trúc điều khiển (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 14. Cấu trúc điều khiển (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-24-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 14. Cấu trúc điều khiển (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 14. Cấu trúc điều khiển (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-24-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 14. Cấu trúc điều khiển (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-24-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 14. Cấu trúc điều khiển (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-24-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 14. Cấu trúc điều khiển (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-24-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 14. Cấu trúc điều khiển (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-24-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 14. Cấu trúc điều khiển (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-24-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 14. Cấu trúc điều khiển (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 24: Bài 14. Cấu trúc điều khiển (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p25",
      grade: 8,
      period: 25,
      title: "Bài 14. Cấu trúc điều khiển (Tiết 2)",
      topic: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: true,
      contentDesc: "2. Thực hành: Xây dựng trò chơi Đoán số",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 25: Bài 14. Cấu trúc điều khiển (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 14. Cấu trúc điều khiển (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-25-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 14. Cấu trúc điều khiển (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 14. Cấu trúc điều khiển (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-25-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 14. Cấu trúc điều khiển (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-25-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 14. Cấu trúc điều khiển (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-25-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 14. Cấu trúc điều khiển (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-25-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 14. Cấu trúc điều khiển (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-25-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 14. Cấu trúc điều khiển (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-25-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 14. Cấu trúc điều khiển (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 25: Bài 14. Cấu trúc điều khiển (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet25.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet25) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 25: Bài 14. Cấu trúc điều khiển (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p26",
      grade: 8,
      period: 26,
      title: "Bài 15. Gỡ lỗi (Tiết 1)",
      topic: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "1. Kiểm thử và phân loại lỗi 2. Phát hiện lỗi và sửa lỗi lôgic",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 26: Bài 15. Gỡ lỗi (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 15. Gỡ lỗi (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-26-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 15. Gỡ lỗi (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 15. Gỡ lỗi (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-26-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 15. Gỡ lỗi (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-26-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 15. Gỡ lỗi (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-26-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 15. Gỡ lỗi (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-26-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 15. Gỡ lỗi (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-26-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 15. Gỡ lỗi (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-26-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 15. Gỡ lỗi (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 26: Bài 15. Gỡ lỗi (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p27",
      grade: 8,
      period: 27,
      title: "Bài 15. Gỡ lỗi (Tiết 2)",
      topic: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: true,
      contentDesc: "3. Thực hành: Gỡ lỗi",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 27: Bài 15. Gỡ lỗi (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 15. Gỡ lỗi (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-27-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 15. Gỡ lỗi (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 15. Gỡ lỗi (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-27-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 15. Gỡ lỗi (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-27-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 15. Gỡ lỗi (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-27-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 15. Gỡ lỗi (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-27-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 15. Gỡ lỗi (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-27-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 15. Gỡ lỗi (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-27-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 15. Gỡ lỗi (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 27: Bài 15. Gỡ lỗi (Tiết 2)",
        sampleFileName: "BTTH_K8_Tiet27.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet27) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 27: Bài 15. Gỡ lỗi (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p28",
      grade: 8,
      period: 28,
      title: "Bài 16. Tin học với nghề nghiệp (Tiết 1)",
      topic: "Chủ đề 6: Hướng nghiệp với Tin học",
      isPractice: false,
      contentDesc: "1. Tin học giúp nâng cao hiệu quả công việc",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 28: Bài 16. Tin học với nghề nghiệp (Tiết 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 16. Tin học với nghề nghiệp (Tiết 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-28-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 16. Tin học với nghề nghiệp (Tiết 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 16. Tin học với nghề nghiệp (Tiết 1) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-28-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 16. Tin học với nghề nghiệp (Tiết 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-28-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 16. Tin học với nghề nghiệp (Tiết 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-28-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 16. Tin học với nghề nghiệp (Tiết 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-28-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 16. Tin học với nghề nghiệp (Tiết 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-28-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 16. Tin học với nghề nghiệp (Tiết 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-28-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 16. Tin học với nghề nghiệp (Tiết 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 28: Bài 16. Tin học với nghề nghiệp (Tiết 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k8-p29",
      grade: 8,
      period: 29,
      title: "Bài 16. Tin học với nghề nghiệp (Tiết 2)",
      topic: "Chủ đề 6: Hướng nghiệp với Tin học",
      isPractice: false,
      contentDesc: "2. Bình đẳng giới trong sử dụng máy tính và ứng dụng tin học",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 29: Bài 16. Tin học với nghề nghiệp (Tiết 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 16. Tin học với nghề nghiệp (Tiết 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-8-29-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 16. Tin học với nghề nghiệp (Tiết 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 16. Tin học với nghề nghiệp (Tiết 2) theo chuẩn chương trình Tin học 8."
          },
          {
                    "id": "rq-8-29-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 16. Tin học với nghề nghiệp (Tiết 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-8-29-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 16. Tin học với nghề nghiệp (Tiết 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-8-29-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 16. Tin học với nghề nghiệp (Tiết 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-8-29-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 16. Tin học với nghề nghiệp (Tiết 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-8-29-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 16. Tin học với nghề nghiệp (Tiết 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-8-29-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 16. Tin học với nghề nghiệp (Tiết 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 29: Bài 16. Tin học với nghề nghiệp (Tiết 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
  ],
  9: [
    {
      id: "k9-p01",
      grade: 9,
      period: 1,
      title: "Bài 1. Thế giới kĩ thuật số (mục 1,2)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "1. Thiết bị có gắn bộ xử lý thông tin ở khắp nơi. 2. Khả năng của máy tính.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 1: Bài 1. Thế giới kĩ thuật số (mục 1,2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 1. Thế giới kĩ thuật số (mục 1,2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-1-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 1. Thế giới kĩ thuật số (mục 1,2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 1. Thế giới kĩ thuật số (mục 1,2) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-1-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 1. Thế giới kĩ thuật số (mục 1,2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-1-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 1. Thế giới kĩ thuật số (mục 1,2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-1-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 1. Thế giới kĩ thuật số (mục 1,2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-1-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 1. Thế giới kĩ thuật số (mục 1,2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-1-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 1. Thế giới kĩ thuật số (mục 1,2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-1-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 1. Thế giới kĩ thuật số (mục 1,2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 1: Bài 1. Thế giới kĩ thuật số (mục 1,2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p02",
      grade: 9,
      period: 2,
      title: "Bài 1. Thế giới kĩ thuật số (mục 3)",
      topic: "Chủ đề 1. Máy tính và cộng đồng",
      isPractice: false,
      contentDesc: "3. Tác động của công nghệ thông tin lên giáo dục và xã hội.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 2: Bài 1. Thế giới kĩ thuật số (mục 3)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 1. Thế giới kĩ thuật số (mục 3).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-2-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 1. Thế giới kĩ thuật số (mục 3), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 1. Thế giới kĩ thuật số (mục 3) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-2-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 1. Thế giới kĩ thuật số (mục 3)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-2-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 1. Thế giới kĩ thuật số (mục 3) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-2-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 1. Thế giới kĩ thuật số (mục 3) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-2-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 1. Thế giới kĩ thuật số (mục 3)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-2-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 1. Thế giới kĩ thuật số (mục 3) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-2-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 1. Thế giới kĩ thuật số (mục 3), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 2: Bài 1. Thế giới kĩ thuật số (mục 3)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p03",
      grade: 9,
      period: 3,
      title: "Bài 2. Thông tin trong giải quyết vấn đề (mục 1)",
      topic: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: false,
      contentDesc: "1. Vai trò của chất lượng thông tin trong giải quyết vấn đề.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 3: Bài 2. Thông tin trong giải quyết vấn đề (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 2. Thông tin trong giải quyết vấn đề (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-3-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 2. Thông tin trong giải quyết vấn đề (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 2. Thông tin trong giải quyết vấn đề (mục 1) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-3-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 2. Thông tin trong giải quyết vấn đề (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-3-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 2. Thông tin trong giải quyết vấn đề (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-3-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 2. Thông tin trong giải quyết vấn đề (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-3-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 2. Thông tin trong giải quyết vấn đề (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-3-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 2. Thông tin trong giải quyết vấn đề (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-3-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 2. Thông tin trong giải quyết vấn đề (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 3: Bài 2. Thông tin trong giải quyết vấn đề (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p04",
      grade: 9,
      period: 4,
      title: "Bài 2. Thông tin trong giải quyết vấn đề (mục 2)",
      topic: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: false,
      contentDesc: "2. Các tiêu chí đánh giá chất lượng thông tin.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 4: Bài 2. Thông tin trong giải quyết vấn đề (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 2. Thông tin trong giải quyết vấn đề (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-4-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 2. Thông tin trong giải quyết vấn đề (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 2. Thông tin trong giải quyết vấn đề (mục 2) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-4-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 2. Thông tin trong giải quyết vấn đề (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-4-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 2. Thông tin trong giải quyết vấn đề (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-4-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 2. Thông tin trong giải quyết vấn đề (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-4-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 2. Thông tin trong giải quyết vấn đề (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-4-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 2. Thông tin trong giải quyết vấn đề (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-4-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 2. Thông tin trong giải quyết vấn đề (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 4: Bài 2. Thông tin trong giải quyết vấn đề (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p05",
      grade: 9,
      period: 5,
      title: "Bài 3. Thực hành: Đánh giá chất lượng thông tin",
      topic: "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
      isPractice: true,
      contentDesc: "Nhiệm vụ 1: Tìm kiếm theo mục đích. Nhiệm vụ 2: Đánh giá chất lượng thông tin.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 5: Bài 3. Thực hành: Đánh giá chất lượng thông tin",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 3. Thực hành: Đánh giá chất lượng thông tin.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-5-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 3. Thực hành: Đánh giá chất lượng thông tin, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 3. Thực hành: Đánh giá chất lượng thông tin theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-5-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 3. Thực hành: Đánh giá chất lượng thông tin?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-5-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 3. Thực hành: Đánh giá chất lượng thông tin là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-5-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 3. Thực hành: Đánh giá chất lượng thông tin lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-5-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 3. Thực hành: Đánh giá chất lượng thông tin?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-5-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 3. Thực hành: Đánh giá chất lượng thông tin trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-5-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 3. Thực hành: Đánh giá chất lượng thông tin, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 5: Bài 3. Thực hành: Đánh giá chất lượng thông tin",
        sampleFileName: "BTTH_K9_Tiet5.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet5) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 5: Bài 3. Thực hành: Đánh giá chất lượng thông tin",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p06",
      grade: 9,
      period: 6,
      title: "Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1)",
      topic: "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số",
      isPractice: false,
      contentDesc: "1. Một số tác động tiêu cực của công nghệ kĩ thuật số.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 6: Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-6-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-6-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-6-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-6-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-6-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-6-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-6-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 6: Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p07",
      grade: 9,
      period: 7,
      title: "Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2)",
      topic: "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số",
      isPractice: false,
      contentDesc: "2. Hành vi vi phạm pháp luật và văn hoá trong môi trường số.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 7: Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-7-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-7-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-7-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-7-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-7-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-7-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-7-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 7: Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p08",
      grade: 9,
      period: 8,
      title: "Bài 5. Tìm hiểu phần mềm mô phỏng",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Phần mềm mô phỏng. 2. Khám phá tri thức với phần mềm mô phỏng.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 8: Bài 5. Tìm hiểu phần mềm mô phỏng",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 5. Tìm hiểu phần mềm mô phỏng.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-8-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 5. Tìm hiểu phần mềm mô phỏng, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 5. Tìm hiểu phần mềm mô phỏng theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-8-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 5. Tìm hiểu phần mềm mô phỏng?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-8-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 5. Tìm hiểu phần mềm mô phỏng là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-8-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 5. Tìm hiểu phần mềm mô phỏng lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-8-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 5. Tìm hiểu phần mềm mô phỏng?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-8-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 5. Tìm hiểu phần mềm mô phỏng trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-8-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 5. Tìm hiểu phần mềm mô phỏng, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 8: Bài 5. Tìm hiểu phần mềm mô phỏng",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p09",
      grade: 9,
      period: 9,
      title: "Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "Nhiệm vụ 1: Chuyển hoá năng lượng. Nhiệm vụ 2: Đo năng lượng.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 9: Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-9-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-9-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-9-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-9-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-9-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-9-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-9-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 9: Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2)",
        sampleFileName: "BTTH_K9_Tiet9.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet9) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 9: Bài 6. Thực hành: Khai thác phần mềm mô phỏng (nhiệm vụ 1,2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p10",
      grade: 9,
      period: 10,
      title: "Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "Nhiệm vụ 3: Tỉ lệ vàng trong ngôi sao năm cánh.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 10: Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-10-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-10-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-10-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-10-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-10-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-10-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-10-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 10: Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3)",
        sampleFileName: "BTTH_K9_Tiet10.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet10) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 10: Bài 6. Thực hành: Khai thác phần mềm mô phỏng (Nhiệm vụ 3)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p11",
      grade: 9,
      period: 11,
      title: "Bài 7. Trình bày thông tin trong trao đổi và hợp tác",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: false,
      contentDesc: "1. Trình bày thông tin trong trao đổi và hợp tác. 2. Sử dụng công cụ trực quan.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 11: Bài 7. Trình bày thông tin trong trao đổi và hợp tác",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 7. Trình bày thông tin trong trao đổi và hợp tác.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-11-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 7. Trình bày thông tin trong trao đổi và hợp tác, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 7. Trình bày thông tin trong trao đổi và hợp tác theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-11-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 7. Trình bày thông tin trong trao đổi và hợp tác?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-11-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 7. Trình bày thông tin trong trao đổi và hợp tác là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-11-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 7. Trình bày thông tin trong trao đổi và hợp tác lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-11-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 7. Trình bày thông tin trong trao đổi và hợp tác?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-11-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 7. Trình bày thông tin trong trao đổi và hợp tác trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-11-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 7. Trình bày thông tin trong trao đổi và hợp tác, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 11: Bài 7. Trình bày thông tin trong trao đổi và hợp tác",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p12",
      grade: 9,
      period: 12,
      title: "Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "Nhiệm vụ 1: Sơ đồ tư duy đính kèm dữ liệu. Nhiệm vụ 2: Liên kết dữ liệu trong bài trình chiếu.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 12: Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-12-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-12-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-12-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-12-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-12-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-12-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-12-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 12: Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2)",
        sampleFileName: "BTTH_K9_Tiet12.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet12) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 12: Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 1, 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p13",
      grade: 9,
      period: 13,
      title: "Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3)",
      topic: "Chủ đề 4. Ứng dụng tin học",
      isPractice: true,
      contentDesc: "Nhiệm vụ 3: Tạo bài trình chiếu có sử dụng công cụ trực quan.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 13: Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-13-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-13-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-13-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-13-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-13-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-13-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-13-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 13: Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3)",
        sampleFileName: "BTTH_K9_Tiet13.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet13) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 13: Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin... (nhiệm vụ 3)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p14",
      grade: 9,
      period: 14,
      title: "Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1)",
      topic: "Chủ đề 4. Ứng dụng tin học - a. Sử dụng bảng tính điện tử nâng cao",
      isPractice: false,
      contentDesc: "1. Công cụ xác thực dữ liệu trong bảng tính.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 14: Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-14-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-14-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-14-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-14-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-14-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-14-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-14-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 14: Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p15",
      grade: 9,
      period: 15,
      title: "Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành)",
      topic: "Chủ đề 4. Ứng dụng tin học - a. Sử dụng bảng tính điện tử nâng cao",
      isPractice: true,
      contentDesc: "2. Thực hành: Sử dụng công cụ xác thực dữ liệu.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 15: Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-15-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-15-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-15-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-15-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-15-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-15-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-15-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 15: Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành)",
        sampleFileName: "BTTH_K9_Tiet15.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet15) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 15: Bài 9a. Sử dụng công cụ xác thực dữ liệu (mục 2 – thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p16",
      grade: 9,
      period: 16,
      title: "Bài 10a. Sử dụng hàm COUNTIF",
      topic: "Chủ đề 4. Ứng dụng tin học - a. Sử dụng bảng tính điện tử nâng cao",
      isPractice: true,
      contentDesc: "1. Hàm COUNTIF. 2. Thực hành sử dụng hàm COUNTIF.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 16: Bài 10a. Sử dụng hàm COUNTIF",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 10a. Sử dụng hàm COUNTIF.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-16-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 10a. Sử dụng hàm COUNTIF, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 10a. Sử dụng hàm COUNTIF theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-16-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 10a. Sử dụng hàm COUNTIF?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-16-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 10a. Sử dụng hàm COUNTIF là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-16-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 10a. Sử dụng hàm COUNTIF lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-16-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 10a. Sử dụng hàm COUNTIF?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-16-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 10a. Sử dụng hàm COUNTIF trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-16-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 10a. Sử dụng hàm COUNTIF, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 16: Bài 10a. Sử dụng hàm COUNTIF",
        sampleFileName: "BTTH_K9_Tiet16.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet16) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 16: Bài 10a. Sử dụng hàm COUNTIF",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p17",
      grade: 9,
      period: 17,
      title: "Bài 11a. Sử dụng hàm SUMIF",
      topic: "Chủ đề 4. Ứng dụng tin học - a. Sử dụng bảng tính điện tử nâng cao",
      isPractice: true,
      contentDesc: "1. Hàm SUMIF. 2. Thực hành sử dụng hàm SUMIF.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 17: Bài 11a. Sử dụng hàm SUMIF",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 11a. Sử dụng hàm SUMIF.",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-17-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 11a. Sử dụng hàm SUMIF, khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 11a. Sử dụng hàm SUMIF theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-17-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 11a. Sử dụng hàm SUMIF?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-17-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 11a. Sử dụng hàm SUMIF là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-17-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 11a. Sử dụng hàm SUMIF lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-17-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 11a. Sử dụng hàm SUMIF?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-17-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 11a. Sử dụng hàm SUMIF trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-17-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 11a. Sử dụng hàm SUMIF, cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 17: Bài 11a. Sử dụng hàm SUMIF",
        sampleFileName: "BTTH_K9_Tiet17.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet17) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 17: Bài 11a. Sử dụng hàm SUMIF",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p18",
      grade: 9,
      period: 18,
      title: "Bài 12a. Sử dụng hàm IF (mục 1)",
      topic: "Chủ đề 4. Ứng dụng tin học - a. Sử dụng bảng tính điện tử nâng cao",
      isPractice: false,
      contentDesc: "1. Hàm IF (Quy tắc logic rẽ nhánh điều kiện).",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 18: Bài 12a. Sử dụng hàm IF (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 12a. Sử dụng hàm IF (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-18-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 12a. Sử dụng hàm IF (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 12a. Sử dụng hàm IF (mục 1) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-18-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 12a. Sử dụng hàm IF (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-18-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 12a. Sử dụng hàm IF (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-18-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 12a. Sử dụng hàm IF (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-18-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 12a. Sử dụng hàm IF (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-18-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 12a. Sử dụng hàm IF (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-18-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 12a. Sử dụng hàm IF (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 18: Bài 12a. Sử dụng hàm IF (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p19",
      grade: 9,
      period: 19,
      title: "Bài 12a. Sử dụng hàm IF (mục 2 – thực hành)",
      topic: "Chủ đề 4. Ứng dụng tin học - a. Sử dụng bảng tính điện tử nâng cao",
      isPractice: true,
      contentDesc: "2. Thực hành: Sử dụng hàm IF trong bảng tính.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 19: Bài 12a. Sử dụng hàm IF (mục 2 – thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 12a. Sử dụng hàm IF (mục 2 – thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-19-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 12a. Sử dụng hàm IF (mục 2 – thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 12a. Sử dụng hàm IF (mục 2 – thực hành) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-19-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 12a. Sử dụng hàm IF (mục 2 – thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-19-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 12a. Sử dụng hàm IF (mục 2 – thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-19-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 12a. Sử dụng hàm IF (mục 2 – thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-19-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 12a. Sử dụng hàm IF (mục 2 – thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-19-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 12a. Sử dụng hàm IF (mục 2 – thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-19-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 12a. Sử dụng hàm IF (mục 2 – thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 19: Bài 12a. Sử dụng hàm IF (mục 2 – thực hành)",
        sampleFileName: "BTTH_K9_Tiet19.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet19) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 19: Bài 12a. Sử dụng hàm IF (mục 2 – thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p20",
      grade: 9,
      period: 20,
      title: "Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1)",
      topic: "Chủ đề 4. Ứng dụng tin học - a. Sử dụng bảng tính điện tử nâng cao",
      isPractice: false,
      contentDesc: "1. Trang tính tổng hợp liên kết dữ liệu.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 20: Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-20-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-20-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-20-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-20-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-20-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-20-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-20-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 20: Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p21",
      grade: 9,
      period: 21,
      title: "Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành)",
      topic: "Chủ đề 4. Ứng dụng tin học - a. Sử dụng bảng tính điện tử nâng cao",
      isPractice: true,
      contentDesc: "2. Thực hành: Hoàn thiện bảng tính quản lí tài chính gia đình.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 21: Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-21-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-21-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-21-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-21-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-21-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-21-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-21-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 21: Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành)",
        sampleFileName: "BTTH_K9_Tiet21.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet21) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 21: Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (mục 2 – Thực hành)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p22",
      grade: 9,
      period: 22,
      title: "Bài 14. Giải quyết vấn đề (mục 1)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "1. Khái niệm và 5 bước trong quy trình giải quyết vấn đề.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 22: Bài 14. Giải quyết vấn đề (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 14. Giải quyết vấn đề (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-22-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 14. Giải quyết vấn đề (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 14. Giải quyết vấn đề (mục 1) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-22-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 14. Giải quyết vấn đề (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-22-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 14. Giải quyết vấn đề (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-22-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 14. Giải quyết vấn đề (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-22-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 14. Giải quyết vấn đề (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-22-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 14. Giải quyết vấn đề (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-22-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 14. Giải quyết vấn đề (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 22: Bài 14. Giải quyết vấn đề (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p23",
      grade: 9,
      period: 23,
      title: "Bài 14. Giải quyết vấn đề (mục 2)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "2. Mô tả giải pháp dưới dạng thuật toán (sơ đồ khối và ngôn ngữ tự nhiên).",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 23: Bài 14. Giải quyết vấn đề (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 14. Giải quyết vấn đề (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-23-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 14. Giải quyết vấn đề (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 14. Giải quyết vấn đề (mục 2) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-23-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 14. Giải quyết vấn đề (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-23-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 14. Giải quyết vấn đề (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-23-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 14. Giải quyết vấn đề (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-23-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 14. Giải quyết vấn đề (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-23-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 14. Giải quyết vấn đề (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-23-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 14. Giải quyết vấn đề (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 23: Bài 14. Giải quyết vấn đề (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p24",
      grade: 9,
      period: 24,
      title: "Bài 15. Bài toán Tin học (mục 1)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "1. Khái niệm bài toán Tin học và xác định Input/Output.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 24: Bài 15. Bài toán Tin học (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 15. Bài toán Tin học (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-24-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 15. Bài toán Tin học (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 15. Bài toán Tin học (mục 1) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-24-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 15. Bài toán Tin học (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-24-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 15. Bài toán Tin học (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-24-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 15. Bài toán Tin học (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-24-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 15. Bài toán Tin học (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-24-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 15. Bài toán Tin học (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-24-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 15. Bài toán Tin học (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 24: Bài 15. Bài toán Tin học (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p25",
      grade: 9,
      period: 25,
      title: "Bài 15. Bài toán Tin học (mục 2)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: false,
      contentDesc: "2. Quy trình con người giao bài toán cho máy tính giải quyết (4 bước).",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 25: Bài 15. Bài toán Tin học (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 15. Bài toán Tin học (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-25-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 15. Bài toán Tin học (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 15. Bài toán Tin học (mục 2) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-25-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 15. Bài toán Tin học (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-25-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 15. Bài toán Tin học (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-25-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 15. Bài toán Tin học (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-25-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 15. Bài toán Tin học (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-25-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 15. Bài toán Tin học (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-25-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 15. Bài toán Tin học (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 25: Bài 15. Bài toán Tin học (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p26",
      grade: 9,
      period: 26,
      title: "Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: true,
      contentDesc: "Nhiệm vụ 1: Lập chương trình Scratch tính tiền lương.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 26: Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-26-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-26-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-26-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-26-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-26-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-26-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-26-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 26: Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1)",
        sampleFileName: "BTTH_K9_Tiet26.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet26) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 26: Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p27",
      grade: 9,
      period: 27,
      title: "Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2)",
      topic: "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
      isPractice: true,
      contentDesc: "Nhiệm vụ 2: Lập chương trình Scratch tìm giá trị lớn nhất trong dãy số.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 27: Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-27-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-27-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-27-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-27-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-27-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-27-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-27-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      practicalTask: {
        title: "Thực hành Tiết 27: Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2)",
        sampleFileName: "BTTH_K9_Tiet27.xlsx",
        sampleFileUrl: "/practice-files/BTTH_Ham_IF_SUMIF_COUNTIF.xlsx",
        steps: [
          "Bước 1: Tải tệp bài tập mẫu về máy tính phòng thực hành.",
          "Bước 2: Mở tệp, kiểm tra dữ liệu đầu vào và đọc kỹ yêu cầu nhiệm vụ.",
          "Bước 3: Thực hiện thao tác nhập liệu, định dạng hoặc lập công thức tính toán.",
          "Bước 4: Kiểm tra tính đúng đắn của kết quả và khắc phục lỗi nếu có.",
          "Bước 5: Định dạng bảng biểu hoặc trang chiếu sạch đẹp, thẩm mỹ.",
          "Bước 6: Lưu tệp theo đúng cú pháp (Lop_HoTen_Tiet27) và nộp trực tiếp lên website."
        ],
        rubric: [
          { criterion: "Thao tác đúng quy trình kỹ thuật", maxPoints: 3.0, note: "Thực hiện chuẩn các bước theo hướng dẫn" },
          { criterion: "Kết quả bài làm chính xác tuyệt đối", maxPoints: 4.0, note: "Công thức và nội dung không có sai sót" },
          { criterion: "Hình thức trình bày thẩm mỹ, khoa học", maxPoints: 2.0, note: "Định dạng font, màu sắc, căn lề chuẩn" },
          { criterion: "Kỷ luật phòng máy và nộp bài đúng hạn", maxPoints: 1.0, note: "Nộp bài trực tuyến đúng quy định" }
        ]
      },
      homework: {
        title: "Bài tập về nhà Tiết 27: Bài 16. Thực hành: Lập chương trình máy tính. (nhiệm vụ 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p28",
      grade: 9,
      period: 28,
      title: "Bài 17. Tin học và thế giới nghề nghiệp (mục 1)",
      topic: "Chủ đề 6. Hướng nghiệp với tin học",
      isPractice: false,
      contentDesc: "1. Các nhóm nghề nghiệp chính trong lĩnh vực Tin học.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 28: Bài 17. Tin học và thế giới nghề nghiệp (mục 1)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 17. Tin học và thế giới nghề nghiệp (mục 1).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-28-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 17. Tin học và thế giới nghề nghiệp (mục 1), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 17. Tin học và thế giới nghề nghiệp (mục 1) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-28-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 17. Tin học và thế giới nghề nghiệp (mục 1)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-28-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 17. Tin học và thế giới nghề nghiệp (mục 1) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-28-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 17. Tin học và thế giới nghề nghiệp (mục 1) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-28-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 17. Tin học và thế giới nghề nghiệp (mục 1)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-28-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 17. Tin học và thế giới nghề nghiệp (mục 1) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-28-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 17. Tin học và thế giới nghề nghiệp (mục 1), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 28: Bài 17. Tin học và thế giới nghề nghiệp (mục 1)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
    {
      id: "k9-p29",
      grade: 9,
      period: 29,
      title: "Bài 17. Tin học và thế giới nghề nghiệp (mục 2)",
      topic: "Chủ đề 6. Hướng nghiệp với tin học",
      isPractice: false,
      contentDesc: "2. Đặc điểm nghề nghiệp Tin học và Bình đẳng giới trong công nghệ.",
      digitalCompetency: "Tích hợp nhận thức AI (QĐ 3439)",
      worksheet: {
        title: "Phiếu học tập Tiết 29: Bài 17. Tin học và thế giới nghề nghiệp (mục 2)",
        phase1_khoi_dong: "Xem tình huống dẫn nhập, trao đổi cặp đôi và trả lời câu hỏi mở đầu về Bài 17. Tin học và thế giới nghề nghiệp (mục 2).",
        phase2_kham_pha: "Đọc SGK, quan sát thao tác mẫu và ghi chép nội dung kiến thức trọng tâm.",
        phase3_luyen_tap: "Thực hiện bài tập luyện tập trắc nghiệm và điền khuyết trên phiếu điện tử.",
        phase4_van_dung: "Liên hệ tình huống thực tế tại trường THCS Mão Điền và đề xuất giải pháp số.",
        xpReward: 30,
        timeLimitMin: 15
      },
      reinforcement: {
        questionsCount: 7,
        matrix: "3 Biết - 2 Hiểu - 2 Vận dụng",
        questions: [
          {
                    "id": "rq-9-29-1",
                    "level": "Nhận biết",
                    "question": "Trong nội dung Bài 17. Tin học và thế giới nghề nghiệp (mục 2), khái niệm hoặc thao tác cơ bản nào sau đây là chuẩn xác nhất?",
                    "options": [
                              "Thao tác theo đúng quy trình hướng dẫn của bài học",
                              "Không cần tuân thủ quy tắc an toàn thông tin khi thực hiện",
                              "Chỉ áp dụng được trên máy tính để bàn thế hệ cũ",
                              "Bỏ qua các bước kiểm tra dữ liệu trước khi kết thúc"
                    ],
                    "correctIndex": 0,
                    "explanation": "Đây là kiến thức nhận biết cốt lõi trong Bài 17. Tin học và thế giới nghề nghiệp (mục 2) theo chuẩn chương trình Tin học 9."
          },
          {
                    "id": "rq-9-29-2",
                    "level": "Nhận biết",
                    "question": "Công cụ hoặc biểu tượng nào sau đây được sử dụng phổ biến nhất khi làm việc với Bài 17. Tin học và thế giới nghề nghiệp (mục 2)?",
                    "options": [
                              "Biểu tượng công cụ chuyên dụng trên thanh bảng chọn (Ribbon/Menu)",
                              "Nút nguồn khởi động lại máy tính",
                              "Cáp kết nối màn hình",
                              "Bàn phím cơ không dây"
                    ],
                    "correctIndex": 0,
                    "explanation": "Học sinh cần ghi nhớ vị trí công cụ trên giao diện phần mềm của bài học."
          },
          {
                    "id": "rq-9-29-3",
                    "level": "Nhận biết",
                    "question": "Mục tiêu quan trọng nhất khi hoàn thành bài học Bài 17. Tin học và thế giới nghề nghiệp (mục 2) là gì?",
                    "options": [
                              "Nắm vững lý thuyết nền tảng và vận dụng an toàn trong môi trường số",
                              "Tải thật nhiều trò chơi về máy tính phòng thực hành",
                              "Thay đổi mật khẩu máy tính của nhà trường",
                              "Sao chép nguyên văn bài làm của bạn bên cạnh"
                    ],
                    "correctIndex": 0,
                    "explanation": "Mục tiêu giáo dục Tin học là phát triển phẩm chất trung thực và năng lực số an toàn."
          },
          {
                    "id": "rq-9-29-4",
                    "level": "Thông hiểu",
                    "question": "Tại sao việc tuân thủ quy tắc tổ chức dữ liệu trong Bài 17. Tin học và thế giới nghề nghiệp (mục 2) lại giúp nâng cao hiệu quả làm việc?",
                    "options": [
                              "Giúp tìm kiếm, quản lý thông tin khoa học và tránh sai sót",
                              "Làm cho dung lượng ổ đĩa luôn đạt 100%",
                              "Khiến các ứng dụng khác không thể hoạt động được",
                              "Để làm bài tập dài hơn quy định"
                    ],
                    "correctIndex": 0,
                    "explanation": "Tổ chức dữ liệu bài bản giúp tiết kiệm thời gian truy xuất và chia sẻ thông tin chính xác."
          },
          {
                    "id": "rq-9-29-5",
                    "level": "Thông hiểu",
                    "question": "Điều gì sẽ xảy ra nếu thực hiện sai quy trình trong bài học Bài 17. Tin học và thế giới nghề nghiệp (mục 2)?",
                    "options": [
                              "Kết quả đầu ra sẽ bị sai lệch hoặc mất mát dữ liệu",
                              "Máy tính sẽ tự động sửa đúng 100% không cần can thiệp",
                              "Không có bất kỳ ảnh hưởng nào",
                              "Tất cả màn hình phòng máy sẽ tắt"
                    ],
                    "correctIndex": 0,
                    "explanation": "Hiểu được bản chất thuật toán và quy trình xử lý giúp học sinh chủ động tránh lỗi sai."
          },
          {
                    "id": "rq-9-29-6",
                    "level": "Vận dụng",
                    "question": "Khi gặp một tình huống thực tế liên quan đến Bài 17. Tin học và thế giới nghề nghiệp (mục 2) trong đời sống học đường, em nên làm gì?",
                    "options": [
                              "Áp dụng kiến thức đã học, lập kế hoạch từng bước và kiểm chứng kết quả",
                              "Từ chối giải quyết vì không có trong sách giáo khoa",
                              "Chờ đợi người khác làm hộ",
                              "Sử dụng công cụ không rõ nguồn gốc trên mạng"
                    ],
                    "correctIndex": 0,
                    "explanation": "Năng lực vận dụng đòi hỏi học sinh chuyển hóa tri thức sách giáo khoa vào bài toán thực tiễn."
          },
          {
                    "id": "rq-9-29-7",
                    "level": "Vận dụng",
                    "question": "Để giải quyết tối ưu nhiệm vụ trong Bài 17. Tin học và thế giới nghề nghiệp (mục 2), cách kết hợp nào sau đây là khoa học nhất?",
                    "options": [
                              "Kết hợp tư duy phân tích, sử dụng phần mềm hỗ trợ và kiểm tra chéo",
                              "Chỉ thử nghiệm ngẫu nhiên cho đến khi đúng",
                              "Sao chép dữ liệu từ nguồn không được kiểm duyệt",
                              "Bỏ qua bước xem lại kết quả"
                    ],
                    "correctIndex": 0,
                    "explanation": "Phương pháp học tập Tin học hiện đại đề cao tư duy máy tính (Computational Thinking) và kiểm chứng độc lập."
          }
]
      },
      homework: {
        title: "Bài tập về nhà Tiết 29: Bài 17. Tin học và thế giới nghề nghiệp (mục 2)",
        description: "Em hãy hoàn thành bài tập củng cố trong vở ghi chép, chụp ảnh trang vở rõ nét hoặc hoàn thiện tệp bài làm và nộp lên hệ thống trước tiết học tuần sau.",
        acceptedFormats: ["image", "xlsx", "docx"],
        dueInDays: 7
      }
    },
  ],
};
