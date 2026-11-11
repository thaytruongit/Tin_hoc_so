'use client';

import { compressImageFile } from './image-compressor';

// ============================================================================
// DỊCH VỤ ĐỒNG BỘ & LƯU TRỮ GOOGLE DRIVE ONLINE (GOOGLE APPS SCRIPT WEB APP)
// Giáo viên: Thầy Đỗ Mạnh Trường — THCS Mão Điền
// ============================================================================

export interface DriveUploadResult {
  status: 'ok' | 'error' | 'skipped';
  fileUrl?: string;
  downloadUrl?: string;
  fileId?: string;
  folderPath?: string;
  message: string;
}

const DEFAULT_GAS_URL = process.env.NEXT_PUBLIC_GAS_WEB_APP_URL || '';

export function getGasWebAppUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_GAS_URL;
  return localStorage.getItem('truong_gas_web_app_url') || DEFAULT_GAS_URL;
}

export function setGasWebAppUrl(url: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('truong_gas_web_app_url', url.trim());
}

/**
 * Chuyển đổi File sang Base64 chuẩn
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Cắt bỏ phần header data:image/png;base64,
      const base64 = result.split(',')[1] || result;
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * Tải bài tập về nhà trực tiếp lên Google Drive Online của Thầy Đỗ Mạnh Trường
 */
export async function uploadHomeworkToDriveOnline(params: {
  file: File;
  grade: number;
  period: number;
  className: string;
  studentId: string;
  studentName: string;
  assignmentTitle: string;
  note?: string;
}): Promise<DriveUploadResult> {
  const gasUrl = getGasWebAppUrl();

  // Nếu chưa cấu hình GAS Web App, vẫn lưu an toàn trên máy khách
  if (!gasUrl || !gasUrl.startsWith('http')) {
    return {
      status: 'skipped',
      message: 'Chưa cấu hình Google Apps Script Web App URL. Bài làm được lưu trữ cục bộ trên hệ thống.'
    };
  }

  try {
    let fileToUpload = params.file;
    if (fileToUpload.type.startsWith('image/') || /\.(jpe?g|png|webp|bmp)$/i.test(fileToUpload.name)) {
      try {
        const comp = await compressImageFile(fileToUpload, { maxWidth: 1600, maxHeight: 1600, quality: 0.8 });
        if (comp.isCompressed) {
          fileToUpload = comp.file;
        }
      } catch (err) {
        console.warn('Lỗi khi nén ảnh ngầm trước khi tải lên Drive:', err);
      }
    }

    const fileBase64 = await fileToBase64(fileToUpload);
    const ext = fileToUpload.name.split('.').pop() || 'dat';
    const cleanStudentName = params.studentName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '_');
    const standardizedFileName = `${params.className}_${params.studentId}_${cleanStudentName}_Tiet${params.period < 10 ? '0' : ''}${params.period}_BTVN.${ext}`;

    const payload = {
      action: 'uploadHomeworkFile',
      grade: params.grade,
      period: params.period,
      className: params.className,
      studentId: params.studentId,
      studentName: params.studentName,
      assignmentTitle: params.assignmentTitle,
      fileName: params.file.name,
      standardizedFileName: standardizedFileName,
      fileBase64: fileBase64,
      base64Data: fileBase64,
      mimeType: params.file.type || 'application/octet-stream',
      note: params.note || '',
      submittedAt: new Date().toISOString()
    };

    const res = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Google Apps Script trả về mã lỗi HTTP: ${res.status}`);
    }

    const data = await res.json();
    if (data.status === 'ok') {
      return {
        status: 'ok',
        fileUrl: data.fileUrl || data.webViewLink,
        downloadUrl: data.downloadUrl,
        fileId: data.fileId,
        folderPath: `Giảng dạy/NOP_BAI_VE_NHA/KHOI_${params.grade}/Tiet_${params.period < 10 ? '0' : ''}${params.period}`,
        message: data.message || 'Đã tải thành công lên Google Drive Online của Thầy Đỗ Mạnh Trường!'
      };
    } else {
      return {
        status: 'error',
        message: data.message || 'Không thể lưu lên Google Drive.'
      };
    }
  } catch (err: any) {
    console.error('Lỗi khi tải lên Google Drive Online:', err);
    return {
      status: 'error',
      message: `Lỗi kết nối Google Drive: ${err.message || 'Không có phản hồi'}`
    };
  }
}

/**
 * Tải bài tập thực hành phòng máy trực tiếp lên Google Drive Online của Thầy Đỗ Mạnh Trường
 */
export async function uploadPracticalToDriveOnline(params: {
  file: File;
  grade: number;
  period: number;
  className: string;
  studentId: string;
  studentName: string;
  taskTitle: string;
}): Promise<DriveUploadResult> {
  const gasUrl = getGasWebAppUrl();

  if (!gasUrl || !gasUrl.startsWith('http')) {
    return {
      status: 'skipped',
      message: 'Chưa cấu hình Google Apps Script URL.'
    };
  }

  try {
    let fileToUpload = params.file;
    if (fileToUpload.type.startsWith('image/') || /\.(jpe?g|png|webp|bmp)$/i.test(fileToUpload.name)) {
      try {
        const comp = await compressImageFile(fileToUpload, { maxWidth: 1600, maxHeight: 1600, quality: 0.8 });
        if (comp.isCompressed) {
          fileToUpload = comp.file;
        }
      } catch (err) {
        console.warn('Lỗi khi nén ảnh ngầm trước khi tải lên Drive:', err);
      }
    }

    const fileBase64 = await fileToBase64(fileToUpload);
    const ext = fileToUpload.name.split('.').pop() || 'dat';
    const cleanStudentName = params.studentName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '_');
    const standardizedFileName = `${params.className}_${params.studentId}_${cleanStudentName}_Tiet${params.period < 10 ? '0' : ''}${params.period}_ThucHanh.${ext}`;

    const payload = {
      action: 'uploadPracticalFile',
      grade: params.grade,
      period: params.period,
      className: params.className,
      studentId: params.studentId,
      studentName: params.studentName,
      taskTitle: params.taskTitle,
      fileName: params.file.name,
      standardizedFileName: standardizedFileName,
      fileBase64: fileBase64,
      base64Data: fileBase64,
      mimeType: params.file.type || 'application/octet-stream',
      submittedAt: new Date().toISOString()
    };

    const res = await fetch(gasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.status === 'ok') {
      return {
        status: 'ok',
        fileUrl: data.fileUrl || data.webViewLink,
        downloadUrl: data.downloadUrl,
        fileId: data.fileId,
        folderPath: `Giảng dạy/NOP_BAI_THUC_HANH/KHOI_${params.grade}/Tiet_${params.period < 10 ? '0' : ''}${params.period}`,
        message: data.message || 'Đã lưu thành công vào thư mục bài thực hành trên Google Drive!'
      };
    } else {
      return {
        status: 'error',
        message: data.message || 'Lỗi lưu Google Drive.'
      };
    }
  } catch (err: any) {
    return {
      status: 'error',
      message: `Lỗi kết nối: ${err.message}`
    };
  }
}

/**
 * Kiểm tra kết nối trực tiếp đến Google Drive Web App
 */
export async function testDriveOnlineConnection(url: string): Promise<{ success: boolean; message: string; version?: string }> {
  if (!url || !url.startsWith('http')) {
    return { success: false, message: 'URL không hợp lệ. Phải bắt đầu bằng https://script.google.com/macros/s/...' };
  }

  try {
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) {
      return { success: false, message: `Máy chủ Google trả về mã lỗi: ${res.status}` };
    }
    const data = await res.json();
    if (data.status === 'ok') {
      return {
        success: true,
        version: data.version,
        message: `Kết nối thành công! ${data.message || 'Google Drive Online sẵn sàng nhận bài 24/7!'}`
      };
    } else {
      return { success: false, message: data.message || 'Google Apps Script không phản hồi trạng thái OK.' };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Không thể kết nối tới Google Apps Script: ${err.message}. Đảm bảo đã chọn 'Bất kỳ ai (Anyone)' khi triển khai Web App.`
    };
  }
}
