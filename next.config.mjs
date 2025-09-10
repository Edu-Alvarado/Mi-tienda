/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'ae01.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'imgmedia.larepublica.pe',
      },
      {
        protocol: 'https',
        hostname: '**.bing.com',
      },
      {
        protocol: 'https',
        hostname: '**.bing.net',
      },
    ],
  },
};

export default nextConfig;
