/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  
  images: {
    domains: ['imgur.com'],
  },

  async rewrites() {
    return [
      {
        source: '/character/:id',
        destination: '/characters/[id]'
      }
    ];
  }
};

export default nextConfig;