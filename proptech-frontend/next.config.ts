import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "via.placeholder.com",
      "placehold.co",
      "images.unsplash.com", // ✅ added this
    ],
  },
};

export default nextConfig;
