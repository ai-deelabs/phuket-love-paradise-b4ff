/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    // images are pre-optimized to WebP by scripts/optimize-images.mjs
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    // lib/content.ts reads these with fs at runtime in the checkout API route
    '/api/checkout': ['./content/**/*'],
  },
  async redirects() {
    return ['/v1.html', '/v2.html', '/v3.html'].map((source) => ({
      source,
      destination: '/',
      permanent: true,
    }));
  },
};

export default nextConfig;
