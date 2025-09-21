/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages deployment
  output: 'export',
  
  // Add trailing slash for better compatibility
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Configure asset prefix and base path for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mindful-connect' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/mindful-connect' : '',
  
  // Enable experimental features
  experimental: {
    // Enable app directory
    appDir: true,
  },
  
  // Configure webpack for better performance
  webpack: (config, { isServer }) => {
    // Optimize for client-side rendering
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Configure headers for better security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  
  // Configure redirects for better UX
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE || 'true',
  },
  
  // Disable TypeScript errors during build (for demo purposes)
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Disable ESLint during build (for demo purposes)
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Configure PWA settings
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
};

module.exports = nextConfig;
