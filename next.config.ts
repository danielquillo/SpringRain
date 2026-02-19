import type { NextConfig } from "next";
const repo = "SpringRain"; // your repo name EXACTLY

const nextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: { unoptimized: true },
};

module.exports = nextConfig;
