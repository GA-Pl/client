/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'gapple-client.vercel.app' }],
        destination: 'https://www.gapple-ai.io/:path*',
        permanent: true,
      },

      {
        source: '/:path*',
        has: [{ type: 'host', value: 'gapple-ai.io' }],
        destination: 'https://www.gapple-ai.io/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.kyobobook.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'contents.kyobobook.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'phinf.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'img1.kakaocdn.net',
      },
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'gapple-files.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'gapple-ai.io',
      },
      {
        protocol: 'https',
        hostname: 'gapple-client.vercel.app',
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
