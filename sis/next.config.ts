import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Add the rewrites proxy route here
  async rewrites() {
    return [
      {
        source: "/stream-proxy/:path*",
        destination: "https://niues.live*",
      },
    ];
  },
};

export default nextConfig;
