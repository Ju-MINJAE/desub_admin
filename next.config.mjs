/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/desub_admin" : "",
  basePath: process.env.NODE_ENV === "production" ? "/desub_admin" : "",
};

export default nextConfig;
