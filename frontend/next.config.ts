import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@cod-amp/shared"],
  output: "export"
};

export default nextConfig;
