const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    vendor: ["react", "react-dom"],
  },
  output: {
    filename: "_dll_[name].js",
    path: path.resolve(__dirname, "../dist/manifest"),
    library: "_dll_[name]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.resolve(__dirname, "../dist/manifest", "manifest.json"),
    }),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["manifest"] }),
  ],
};
