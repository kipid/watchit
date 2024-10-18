/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/movies/:id',
        destination: '/films/:id',
        permanent: true, // false: 307 Temporary redirect
        // true: 308 Permanent Redirect
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/watchit/**',
      },
    ],
  },
}

module.exports = nextConfig
