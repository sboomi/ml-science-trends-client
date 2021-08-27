/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  ignoreDuringBuilds: true, // Turn this off just in case
};

module.exports = nextConfig;
