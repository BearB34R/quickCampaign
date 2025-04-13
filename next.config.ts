/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    maxDuration: 60, // This sets a 60-second timeout
  },
};

export default nextConfig;
