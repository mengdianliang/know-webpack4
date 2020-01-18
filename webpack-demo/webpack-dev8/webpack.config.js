let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
module.exports = {
  mode: "development",
  devServer: {
    hot: true, // 启用热更新
    port: 3000,
    open: true,
    contentBase: "./dist"
  },
  entry: {
    index: "./src/index.js"
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
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.NamedModulesPlugin() // 打印更新的模块路径
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
