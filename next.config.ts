import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The root layout lives in the [locale] segment, so unmatched addresses
    // have no layout to compose a 404 from.
    globalNotFound: true,
  },
};

export default nextConfig;
