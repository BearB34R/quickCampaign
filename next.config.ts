/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable edge runtime globally
  experimental: {
    runtime: "edge",
  },
  // Keep the existing maxDuration setting
  serverRuntimeConfig: {
    maxDuration: 60, // This sets a 60-second timeout
  },
};

export default nextConfig;
