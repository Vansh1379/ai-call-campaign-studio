/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: [],
  },
  
  // Experimental features
  experimental: {
    // Enable optimized package imports for better performance
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

module.exports = nextConfig;
