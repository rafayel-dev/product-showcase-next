import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    // Allow localhost images in development
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === "development",
  },
  // Allow loading images from private IPs (localhost) and the current network IP in development
  // This prevents Next.js from triggering refreshes when HMR connections are blocked
  // We include multiple formats to ensure the dev server recognizes the origin correctly
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://10.10.20.43:3000",
    "10.10.20.43:3000",
    "10.10.20.43",
    "http://localhost:5000",
  ],
};

export default nextConfig;
