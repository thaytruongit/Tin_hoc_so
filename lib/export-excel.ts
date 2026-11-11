import { Student } from './types';

/**
 * Xuất dữ liệu học sinh ra tệp Excel (.xls) chuẩn UTF-8
 * Tương thích 100% với Microsoft Excel, Google Sheets, LibreOffice Calc
 */
export function exportStudentsToExcel(students: Student[], fileName = 'So_Diem_Tin_Hoc_THCS_Mao_Dien.xls') {
  if (!students || students.length === 0) {
    alert('Không có dữ liệu học sinh để xuất!');
    return;
  }

  // Tiêu đề bảng tính sư phạm
  let tableHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Sổ Điểm Tin Học</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
      <style>
        th { background-color: #2563eb; color: #ffffff; font-weight: bold; border: 0.5pt solid #000000; text-align: center; }
        td { border: 0.5pt solid #cccccc; vertical-align: middle; }
        .title { font-size: 16pt; font-weight: bold; text-align: center; color: #1e3a8a; }
        .subtitle { font-size: 11pt; font-style: italic; text-align: center; color: #475569; }
        .num { text-align: center; }
        .score { text-align: right; font-weight: bold; }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <td colspan="9" class="title">TRƯỜNG THCS MÃO ĐIỀN - BẮC NINH</td>
        </tr>
        <tr>
          <td colspan="9" class="title">SỔ ĐIỂM HỌC TẬP SỐ MÔN TIN HỌC</td>
        </tr>
        <tr>
          <td colspan="9" class="subtitle">Giáo viên phụ trách: Thầy Đỗ Mạnh Trường | Xuất ngày: ${new Date().toLocaleDateString('vi-VN')}</td>
        </tr>
        <tr><td></td></tr>
        <thead>
          <tr>
            <th style="width: 50px;">STT</th>
            <th style="width: 100px;">Mã Học Sinh</th>
            <th style="width: 220px;">Họ và Tên</th>
            <th style="width: 80px;">Lớp</th>
            <th style="width: 60px;">Khối</th>
            <th style="width: 90px;">Mật Khẩu</th>
            <th style="width: 100px;">Điểm Tích Lũy (XP)</th>
            <th style="width: 100px;">Cấp Độ</th>
            <th style="width: 120px;">Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
  `;

  students.forEach((st, index) => {
    tableHtml += `
      <tr>
        <td class="num">${index + 1}</td>
        <td class="num" style="mso-number-format:'\\@';">${st.studentCode}</td>
        <td>${st.fullName}</td>
        <td class="num">${st.className}</td>
        <td class="num">${st.className.charAt(0)}</td>
        <td class="num" style="mso-number-format:'\\@';">123</td>
        <td class="score">${st.totalXp}</td>
        <td class="num">Cấp ${st.level || 1}</td>
        <td class="num" style="color: #16a34a; font-weight: bold;">Hoạt động</td>
      </tr>
    `;
  });

  tableHtml += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Tạo blob dạng application/vnd.ms-excel với BOM UTF-8
  const blob = new Blob(['\ufeff', tableHtml], {
    type: 'application/vnd.ms-excel;charset=utf-8;'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

