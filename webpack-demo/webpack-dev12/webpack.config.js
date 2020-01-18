let path = require("path");
let DonePlugin = require("./plugins/DonePlugin");
let AsyncPlugin = require("./plugins/AsyncPlugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let FileListPlugin = require("./plugins/FileListPlugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let InlineSourcePlugin = require("./plugins/InlineSourcePlugin");
// let UploadPlugin = require("./plugins/UploadPlugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new FileListPlugin({
      filename: "list.md"
    })
    // new UploadPlugin({
    //   bucket: "",
    //   domain: "",
    //   accessKey: "",
    //   secretKey: ""
    // })
    // new InlineSourcePlugin({
    //   match: /\.(js|css)/
    // })
    // new DonePlugin(),
    // new AsyncPlugin()
  ]
};
