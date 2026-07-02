/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // static export: images are pre-optimized to WebP by scripts/optimize-images.mjs
    unoptimized: true,
  },
};

export default nextConfig;
