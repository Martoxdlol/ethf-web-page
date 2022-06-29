/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
module.exports = function getStrapiURL(path = "") {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
        }${path}`;
}