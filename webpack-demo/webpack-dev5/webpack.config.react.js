let path = require("path");
let webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    react: ["react", "react-dom"]
    // test: "./src/test.js"
  },
  output: {
    // filename: "[name].js",
    filename: "_dll_[name].js",
    path: path.resolve(__dirname, "dist"),
    // library: "ab",
    // libraryTarget: "var"
    library: "_dll_[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.resolve(__dirname, "dist", "manifest.json")
    })
  ]
};
