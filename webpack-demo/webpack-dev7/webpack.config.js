let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
module.exports = {
  optimization: {
    splitChunks: {
      // 分割代码块
      cacheGroups: {
        // 缓存组
        common: {
          // 公共的模块
          chunks: "initial",
          minSize: 0,
          minChunks: 2
        },
        vendor: {
          priority: 1,
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    contentBase: "./dist"
  },
  entry: {
    index: "./src/index.js",
    other: "./src/other.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, "dist", "manifest.json")
    // }),
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
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
