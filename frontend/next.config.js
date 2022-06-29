const getStrapiURL = require('./lib/getStrapiUrl');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost"],
  },
  rewrites
}

function rewrites() {
  return [
    {
      source: "/uploads/:id",
      destination: getStrapiURL("/uploads/:id"),
    },
  ];
};

module.exports = nextConfig
