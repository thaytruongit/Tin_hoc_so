/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isVercel = Boolean(process.env.VERCEL);

// Cấu hình triển khai chuẩn:
// - Trên Vercel: basePath là '' (phục vụ trực tiếp tại root domain).
// - Trên GitHub Pages repo Tin_hoc_so: basePath là '/Tin_hoc_so'.
// - Tùy chỉnh qua biến môi trường NEXT_PUBLIC_BASE_PATH nếu cần.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (isVercel ? '' : (isProd ? '/Tin_hoc_so' : ''));

const nextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
