let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
// 多线程打包
let Happypack = require("happypack");
module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    contentBase: "./dist"
  },
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new Happypack({
      id: "css",
      use: ["style-loader", "css-loader"]
    }),
    new Happypack({
      id: "js",
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      ]
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dist", "manifest.json")
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
  ],
  module: {
    // 不解析
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve("src"),
        use: "happypack/loader?id=js"
      },
      {
        test: /\.css$/,
        use: "happypack/loader?id=css"
      }
    ]
  }
};
