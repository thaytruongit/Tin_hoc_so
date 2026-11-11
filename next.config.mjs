/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Cấu hình triển khai chuẩn cho GitHub Pages: https://thaytruongit.github.io/teacher
// basePath luôn là '/teacher' khi build production trên GitHub Pages
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (isProd ? '/teacher' : '');

const nextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
