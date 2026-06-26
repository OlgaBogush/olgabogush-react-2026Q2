/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  distDir: './dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
};

export default nextConfig;
