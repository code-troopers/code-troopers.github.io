const { merge } = require("webpack-merge");
const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "[name].[fullhash:8].js",
    chunkFilename: "[name].[fullhash:8].js",
    path: path.resolve(__dirname, "dist"),
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
        },
        exclude: /\/node_modules\//,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash:8].css",
      chunkFilename: "[name].[fullhash:8].css",
    }),
  ],
});
