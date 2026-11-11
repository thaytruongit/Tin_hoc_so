/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isVercel = Boolean(process.env.VERCEL);
// Khi chạy trên Vercel: basePath là '' (trực tiếp tại root domain).
// Khi chạy trên GitHub Pages repo thaytruongit/teacher: basePath là '/teacher'.
// Có thể tùy biến qua biến môi trường NEXT_PUBLIC_BASE_PATH nếu cần.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (isVercel ? '' : (isProd ? '/teacher' : ''));

const nextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
