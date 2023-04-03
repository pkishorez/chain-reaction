const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = "";
if (isGithubActions) {
  // trim off `<owner>/`
  basePath = `/${process.env.GITHUB_REPOSITORY.replace(/.*?\//, "")}`;
}

const MAX_WIDTH = 750;
const MARGIN = 40;
const BASE_PATH = basePath;

module.exports = {
  MAX_WIDTH,
  MARGIN,
  BASE_PATH: "/out",
};
