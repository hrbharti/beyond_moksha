import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https', 
        hostname: 'www.beyondmoksha.com.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.beyondmoksha.com',
        pathname: '/**',
      }
    ]
  },
  
  // Performance optimizations for Vercel
  experimental: {
    optimizePackageImports: ['mammoth', 'axios']
  },
  
  // Security headers
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
          }
        ]
      }
    ]
  },

  // Remove console logs in production, keep errors and warnings
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  }
};

export default nextConfig;
