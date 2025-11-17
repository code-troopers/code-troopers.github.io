const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");

class RemoveNodeSchemePlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap("RemoveNodeSchemePlugin", (nmf) => {
      nmf.hooks.beforeResolve.tap("RemoveNodeSchemePlugin", (data) => {
        if (!data || !data.request) return;
        if (data.request.startsWith("node:")) {
          data.request = data.request.replace(/^node:/, "");
        }
      });
    });
  }
}

module.exports = {
  ignoreWarnings: [
    {
      module: /@sveltia\/cms/,
      message: /Critical dependency:/,
    },
  ],
  entry: {
    main: path.join(__dirname, "src", "index.js"),
    cms: path.join(__dirname, "src", "js", "cms.js"),
  },

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },

  stats: {
    all: false,
    assets: true,
    chunks: false,
    modules: false,
  },

  module: {
    rules: [
      {
        test: /\.map$/,
        enforce: "pre",
        use: "ignore-loader",
      },
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      },
      {
        test: /\.(png|eot|woff2?|ttf|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { cacheDirectory: true },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "resolve-url-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: { outputStyle: "expanded" },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".scss"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    fallback: {
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/browser"),
      url: require.resolve("url/"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
    },
  },

  plugins: [
    new NodePolyfillPlugin(),
    new RemoveNodeSchemePlugin(),

    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true,
      includeAllFileTypes: false,
      processOutput: (assets) => {
        if (assets[""]) {
          delete assets[""];
        }
        return JSON.stringify(assets, null, 2);
      },
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/fonts/", to: "fonts/" },
        { from: "./site/data/cloud.json", to: "data/cloud.json" },
      ],
    }),

    new HtmlWebpackPlugin({
      filename: "admin/index.html",
      template: "src/cms.html",
      inject: true,
    }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};
