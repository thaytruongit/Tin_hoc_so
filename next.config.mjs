/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Cấu hình triển khai chuẩn cho GitHub Pages: https://thaytruongit.github.io/Tin_hoc_so
// basePath luôn là '/Tin_hoc_so' khi build production trên GitHub Pages repo Tin_hoc_so
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (isProd ? '/Tin_hoc_so' : '');

const nextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
