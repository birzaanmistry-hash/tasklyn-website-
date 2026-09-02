import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev overlay sits on top of the Core and gets in the way of judging it.
  devIndicators: false,
  // three.js ships untranspiled ESM addons; keep the graph tidy for the server build.
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "motion"],
  },
};

export default nextConfig;
