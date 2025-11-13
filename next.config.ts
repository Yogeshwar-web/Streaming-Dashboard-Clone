import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Modern image config
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org", // TMDB image host
        pathname: "/**",
      },
    ],
  },

  // ✅ Correct position for typedRoutes in v16
  typedRoutes: true,
};

export default nextConfig;
