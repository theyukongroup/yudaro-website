import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The apex is canonical. Every other hostname we own lands on it in one
      // hop, keeping path and query so old sign-in links still work.
      ...['www.yudaro.com', 'yudaro.ai', 'www.yudaro.ai'].map((host) => ({
        source: '/:path*',
        has: [{ type: 'host' as const, value: host }],
        destination: 'https://yudaro.com/:path*',
        permanent: true,
      })),
      { source: '/how-nexavoris-works', destination: '/how-yudaro-works', permanent: true },
      { source: '/how-yuhoo-works', destination: '/how-yudaro-works', permanent: true },
    ];
  },
};
export default nextConfig;
