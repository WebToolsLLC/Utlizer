/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  
  // Image optimization for static export
  images: {
    unoptimized: true,
    domains: ['ultizer.pages.dev'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression and performance
  compress: true,
  
  // Cloudflare Pages configuration
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://ultizer.pages.dev' : '',
  
  // SEO and performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  
  // Webpack configuration for better bundling
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/tools/:category/:tool',
        destination: '/tools/:category/:tool/',
        permanent: true,
      },
      {
        source: '/tools/:category',
        destination: '/tools/:category/',
        permanent: true,
      },
    ];
  },
  
  // Environment variables
  env: {
    SITE_URL: 'https://ultizer.pages.dev',
    SITE_NAME: 'Utlizer',
    SITE_DESCRIPTION: 'Free online utility tools for productivity, conversion, and daily tasks',
  },
};

module.exports = nextConfig;