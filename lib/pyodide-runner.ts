'use client';

// ============================================================================
// TRÌNH CHẤM CODE PYTHON THỰC TẾ TRÊN WEBASSEMBLY (PYODIDE RUNNER)
// Giáo viên: Thầy Đỗ Mạnh Trường — THCS Mão Điền
// Chạy Python 3.12 thật 100% trong sandbox WebAssembly ngay trên trình duyệt
// ============================================================================

export interface PythonExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  isCorrect?: boolean;
  expectedOutput?: string;
  executionTimeMs: number;
  errorMessage?: string;
}

declare global {
  interface Window {
    loadPyodide?: any;
    __pyodideInstance?: any;
    __pyodideLoadingPromise?: Promise<any>;
  }
}

const PYODIDE_CDN_SCRIPT = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';

/**
 * Tải script Pyodide từ CDN an toàn
 */
function loadPyodideScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Chỉ chạy trên trình duyệt'));
    if (window.loadPyodide) return resolve();

    const existing = document.querySelector(`script[src="${PYODIDE_CDN_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.src = PYODIDE_CDN_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Không thể tải Pyodide WebAssembly từ CDN. Vui lòng kiểm tra kết nối mạng!'));
    document.head.appendChild(script);
  });
}

/**
 * Khởi tạo singleton Pyodide instance
 */
export async function getPyodideInstance(onStatusUpdate?: (msg: string) => void): Promise<any> {
  if (typeof window === 'undefined') return null;

  if (window.__pyodideInstance) {
    return window.__pyodideInstance;
  }

  if (window.__pyodideLoadingPromise) {
    return window.__pyodideLoadingPromise;
  }

  window.__pyodideLoadingPromise = (async () => {
    if (onStatusUpdate) onStatusUpdate('Đang nạp nhân Python WebAssembly từ CDN (lần đầu có thể mất 3-5 giây)...');
    await loadPyodideScript();

    if (onStatusUpdate) onStatusUpdate('Đang khởi tạo môi trường Python 3.12 Sandbox...');
    const pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
    });

    window.__pyodideInstance = pyodide;
    return pyodide;
  })();

  return window.__pyodideLoadingPromise;
}

/**
 * Chuẩn hóa chuỗi kết quả để so khớp công bằng (bỏ dấu cách thừa và \r\n)
 */
function normalizeOutput(str: string): string {
  return str
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
}

/**
 * Chạy mã Python của học sinh với Input và so khớp Test Case
 */
export async function runPythonCodeReal(
  code: string,
  inputData: string = '',
  expectedOutput?: string,
  onStatusUpdate?: (msg: string) => void
): Promise<PythonExecutionResult> {
  const startTime = performance.now();

  try {
    const pyodide = await getPyodideInstance(onStatusUpdate);

    if (onStatusUpdate) onStatusUpdate('Đang thực thi mã nguồn trên Sandbox...');

    // Thiết lập chuyển hướng sys.stdin, sys.stdout, sys.stderr bên trong Python
    const runnerScript = `
import sys
import io

# Giả lập đầu vào bàn phím (stdin)
sys.stdin = io.StringIO('''${inputData.replace(/\\/g, '\\\\').replace(/'''/g, "\\'\\'\\'")}''')

# Bắt đầu ra màn hình (stdout và stderr)
sys_stdout_backup = sys.stdout
sys_stderr_backup = sys.stderr
captured_stdout = io.StringIO()
captured_stderr = io.StringIO()
sys.stdout = captured_stdout
sys.stderr = captured_stderr
`;
    pyodide.runPython(runnerScript);

    // Chạy mã nguồn của học sinh
    let runtimeError: any = null;
    try {
      await pyodide.runPythonAsync(code);
    } catch (err: any) {
      runtimeError = err;
    }

    // Khôi phục stdout/stderr và lấy kết quả
    const collectScript = `
sys.stdout = sys_stdout_backup
sys.stderr = sys_stderr_backup
__out_str = captured_stdout.getvalue()
__err_str = captured_stderr.getvalue()
`;
    pyodide.runPython(collectScript);

    const stdout = pyodide.globals.get('__out_str') || '';
    let stderr = pyodide.globals.get('__err_str') || '';

    const executionTimeMs = Math.round(performance.now() - startTime);

    if (runtimeError) {
      const errMessage = runtimeError.message || String(runtimeError);
      return {
        success: false,
        stdout,
        stderr: stderr ? `${stderr}\n${errMessage}` : errMessage,
        executionTimeMs,
        errorMessage: errMessage,
      };
    }

    let isCorrect: boolean | undefined = undefined;
    if (expectedOutput !== undefined) {
      isCorrect = normalizeOutput(stdout) === normalizeOutput(expectedOutput);
    }

    return {
      success: true,
      stdout,
      stderr,
      isCorrect,
      expectedOutput,
      executionTimeMs,
    };
  } catch (error: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      stdout: '',
      stderr: error.message || 'Lỗi không xác định khi khởi tạo môi trường Python',
      executionTimeMs,
      errorMessage: error.message,
    };
  }
}

export interface TestCaseResult {
  index: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  isCorrect: boolean;
  executionTimeMs: number;
  errorMessage?: string;
  isSecret?: boolean;
}

export interface MultiTestSummary {
  totalTests: number;
  passedTests: number;
  score: number; // thang 10
  totalTimeMs: number;
  allPassed: boolean;
  results: TestCaseResult[];
}

/**
 * Chạy tự động lần lượt qua danh sách Test Cases (Chấm điểm chuẩn VNOI/LeetCode)
 */
export async function runMultipleTestCases(
  code: string,
  testCases: { input: string; expectedOutput: string; isSecret?: boolean }[],
  onProgress?: (current: number, total: number) => void
): Promise<MultiTestSummary> {
  const results: TestCaseResult[] = [];
  let passedCount = 0;
  let totalTime = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    if (onProgress) onProgress(i + 1, testCases.length);

    const exec = await runPythonCodeReal(code, tc.input, tc.expectedOutput);
    totalTime += exec.executionTimeMs;

    const isCorrect = Boolean(exec.success && exec.isCorrect);
    if (isCorrect) passedCount++;

    results.push({
      index: i + 1,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: exec.stdout,
      isCorrect,
      executionTimeMs: exec.executionTimeMs,
      errorMessage: exec.errorMessage || exec.stderr,
      isSecret: tc.isSecret,
    });
  }

  const score = testCases.length > 0 ? Number(((passedCount / testCases.length) * 10).toFixed(1)) : 10;

  return {
    totalTests: testCases.length,
    passedTests: passedCount,
    score,
    totalTimeMs: totalTime,
    allPassed: passedCount === testCases.length,
    results,
  };
}
