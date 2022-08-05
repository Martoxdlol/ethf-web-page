const getStrapiURL = require('./lib/getStrapiUrl');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost", "10.0.31.28", "cms.henryford.edu.ar"],
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
