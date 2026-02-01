import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
  // Allow loading images from private IPs (localhost) in development
  allowedDevOrigins: ["http://localhost:5000"],
};

export default nextConfig;
