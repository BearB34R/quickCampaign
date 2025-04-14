/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the existing maxDuration setting
  serverRuntimeConfig: {
    maxDuration: 60, // This sets a 60-second timeout
  },
};

export default nextConfig;
