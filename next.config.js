/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  webpack: (config, options) => {
    if (options.isServer) {
      // https://github.com/prisma/prisma/issues/6899
      config.externals.push('_http_common');
    }

    return config;
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
