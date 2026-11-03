import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev overlay sits on top of the Core and gets in the way of judging it.
  devIndicators: false,
  // three.js ships untranspiled ESM addons; keep the graph tidy for the server build.
  transpilePackages: ["three"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stops browsers second-guessing a file's declared type.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Nothing here is meant to be framed.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site uses none of these, so they are switched off outright.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "motion"],
  },
};

export default nextConfig;
