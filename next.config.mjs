import { withFaust } from "@faustwp/core";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: [process.env.WP_IMAGES_URL],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
    legacyBrowsers: false,
  },
};

export default withFaust(nextConfig);
