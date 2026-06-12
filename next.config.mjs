/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // এটি আপনার আগের এরর দূর করবে
    // এবং বান্ডেল সাইজ কমাতে সাহায্য করবে
    optimizePackageImports: ['@supabase/ssr', '@supabase/supabase-js', 'lucide-react'], 
  },
  // এটি খুব জরুরি
  // ফাংশনগুলোকে ছোট করতে এটি সাহায্য করে
  output: 'standalone',
  /** @type {import('next').NextConfig} */


  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = config.plugins || [];
    }
    return config;
  },
  initialKind: 'edge',
  // এই ফাংশনটি সব ব্যাকএন্ড ও ডাইনামিক রাউটকে ক্লাউডফ্লেয়ার এজের সাথে মানিয়ে নিতে সাহায্য করবে
  experimental: {
    runtime: 'edge',
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.vercelusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudflare.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Common misspellings and alternatives
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/shop-all',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/order-track',
        destination: '/orders/track',
        permanent: true,
      },
      {
        source: '/track-order',
        destination: '/orders/track',
        permanent: true,
      },
      {
        source: '/return-policy',
        destination: '/returns',
        permanent: true,
      },
      {
        source: '/shipping',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/help',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/policy',
        destination: '/privacy',
        permanent: true,
      },
    ]
  },

  compress: true,
  productionBrowserSourceMaps: false,
  trailingSlash: false,
}

export default nextConfig;
