import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Sajt je bio na /en i /ar; stare adrese trajno vode na iste strane bez jezika.
  async redirects() {
    return [
      { source: "/:lang(en|ar)", destination: "/", permanent: true },
      { source: "/:lang(en|ar)/:path+", destination: "/:path+", permanent: true },
    ];
  },
};

export default nextConfig;
