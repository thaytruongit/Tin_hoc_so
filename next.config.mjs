/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
// Nếu chạy trên GitHub Pages repo /teacher thì cần basePath: '/teacher'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '/teacher' : '');

const nextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
