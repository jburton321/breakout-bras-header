import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    // Stale webpack filesystem cache can emit manifests that reference missing numeric chunks.
    config.cache = false;

    // Named server chunks are easier to trace and avoid brittle numeric id maps (e.g. ./331.js).
    if (isServer) {
      config.optimization = {
        ...config.optimization,
        chunkIds: "named",
        moduleIds: "named",
      };
    }

    return config;
  },
};

export default nextConfig;
