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
  },
  pagesDirectory: '/pages', // Adjust the path to match your custom structure
};

export default nextConfig;