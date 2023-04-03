const { BASE_PATH } = require("./src/constants");

/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : BASE_PATH,
  basePath: BASE_PATH,
};
