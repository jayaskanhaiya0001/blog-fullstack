/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all domains (not recommended for security)
      },
    ],
  },
};

export default nextConfig;
