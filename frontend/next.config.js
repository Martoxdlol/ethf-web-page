const getStrapiURL = require('./lib/getStrapiUrl');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost", "10.0.31.28", "cms.henryford.edu.ar", "backend--admin.coder.henryford.edu.ar"],
  },
  rewrites
}

console.log("Strapi URL", getStrapiURL(""))

function rewrites() {
  return [
    {
      source: "/uploads/:id",
      destination: getStrapiURL("/uploads/:id"),
    },
    {
      source: "/sitemap.xml",
      destination: "/api/sitemap.xml",
    },
  ];
};

module.exports = nextConfig
