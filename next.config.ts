import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // The old two-page structure moved to the new information architecture.
  // Permanent redirects keep inbound links and search equity.
  async redirects() {
    return [
      { source: "/services", destination: "/solutions", permanent: true },
      { source: "/team", destination: "/company", permanent: true },
    ];
  },
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
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
