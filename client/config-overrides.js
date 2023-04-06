
const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox
} = require("customize-cra");

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    return config;
  }
 module.exports = {
    resolve: {
        extensions: [".js", ".jsx"]
      },
  };