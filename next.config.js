const { BASE_PATH } = require("./src/constants");

const withPWA = require("next-pwa")({
  dest: "public",
  basePath: BASE_PATH,
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : BASE_PATH,
  basePath: BASE_PATH,
});
