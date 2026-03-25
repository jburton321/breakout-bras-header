import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /** Avoids dev 500s: "SegmentViewNode" missing from React Client Manifest (Next devtools + webpack). */
  experimental: {
    devtoolSegmentExplorer: false,
  },
  // Used when you run `npm run dev:turbopack` (optional). Default `npm run dev` uses webpack — better
  // on Desktop/iCloud-synced folders where Turbopack’s churn under .next can race with sync daemons.
  turbopack: {
    moduleIds: "named",
  },
  webpack: (config, { isServer, dev }) => {
    // In dev, disable persistent webpack cache — same class of issue as stale .next (missing
    // vendor chunks → 500 / "Internal Server Error"), especially on synced or busy disks.
    if (dev) {
      config.cache = false;
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
