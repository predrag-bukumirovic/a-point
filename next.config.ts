import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // 404 za adrese van /en i /ar (koren aplikacije je dinamički segment [locale]).
    globalNotFound: true,
  },
};

export default nextConfig;
