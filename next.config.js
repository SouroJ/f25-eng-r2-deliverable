/** @type {import('next').NextConfig} */

await import("./env.mjs");

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },

  // ✅ prevents Vercel build from running ESLint (and crashing on __dirname)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
