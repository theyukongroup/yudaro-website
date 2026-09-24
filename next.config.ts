import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }],
      },
      ...[
        '/login/:path*',
        '/forgot-password',
        '/reset-password',
        '/account/:path*',
        '/admin/:path*',
        '/api/:path*',
      ].map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      })),
      {
        source: '/catalog/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
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
      {
        source: '/how-nexavoris-works',
        destination: '/how-yudaro-works',
        permanent: true,
      },
      {
        source: '/how-yuhoo-works',
        destination: '/how-yudaro-works',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
