const { BASE_PATH, getPath } = require("./src/constants");

const withPWA = require("next-pwa")({
  dest: "public",
  fallbacks: {
    document: getPath("/_offline.html"),
  },
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : BASE_PATH,
  basePath: BASE_PATH,
});
