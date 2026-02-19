const repo = "SpringRain";

const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? `/${repo}` : "",
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === "production" ? `/${repo}` : "",
  },
};

export default nextConfig;
