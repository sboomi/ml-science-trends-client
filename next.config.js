/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  ignoreDuringBuilds: false, // Turn this off just in case
};

module.exports = nextConfig;
