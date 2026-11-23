const {merge} = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  output: {
    filename: "[name].js",
    chunkFilename: "[id].js"
  },

  devServer: {
    port: process.env.PORT || 3000,
    static: {
      directory: path.join(process.cwd(), "./dist"),
      watch: true
    },
    open: true,
    historyApiFallback: {
      rewrites: [{from: /./, to: "404.html"}]
    }
  }
});
