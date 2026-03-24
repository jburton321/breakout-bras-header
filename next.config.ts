import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Dev (`next dev --turbopack`) uses Turbopack; keep module id strategy explicit so it matches
  // the intent of the production webpack server config below and avoids “webpack only” drift.
  turbopack: {
    moduleIds: "named",
  },
  webpack: (config, { isServer, dev }) => {
    // Only tune webpack for production builds. In dev, mixing custom webpack cache/optimization
    // with Turbopack or rapid HMR can contribute to stale chunk manifests (e.g. missing ./331.js).
    if (dev) {
      return config;
    }

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
