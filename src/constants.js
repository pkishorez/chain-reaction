const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = "/chain-reaction";
if (isGithubActions) {
  // trim off `<owner>/`
  basePath = `/${process.env.GITHUB_REPOSITORY.replace(/.*?\//, "")}`;
}

const MAX_WIDTH = 750;
const MARGIN = 40;
const BASE_PATH = process.env.NODE_ENV === "development" ? "" : basePath;

module.exports = {
  MAX_WIDTH,
  MARGIN,
  BASE_PATH,
  getPath: (path) => `${BASE_PATH}${path}`,
};
