
const {
  override,
  addWebpackResolve
} = require("customize-cra");

module.exports = override({
  resolve: {
    extensions: [".js", ".jsx"]
  }
  }
)
  