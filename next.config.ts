import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: 'yudaro.com' }], destination: 'https://www.yudaro.com/:path*', permanent: true },
      { source: '/how-nexavoris-works', destination: '/how-yudaro-works', permanent: true },
      { source: '/how-yuhoo-works', destination: '/how-yudaro-works', permanent: true },
    ];
  },
};
export default nextConfig;
