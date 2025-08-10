// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "res.cloudinary.com",
//       "via.placeholder.com",
//       "placehold.co",
//       "images.unsplash.com", // ✅ added this
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "via.placeholder.com",
      "placehold.co",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
