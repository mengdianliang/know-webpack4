let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");
let webpack = require("webpack");
// 1) cleanWebpackPlugin
// 2) copyWebpackPlugin
// 3) bannerPlugin
module.exports = {
  devServer: {
    // 3) 有服务器，不用代理，启动服务器端口，即webpack端口
    // 2) 我们只想前端mock数据
    // before(app) {
    //   // 提供的方法
    //   app.get("/user", (req, res) => {
    //     res.json({ name: "珠峰" });
    //   });
    // }
    // 1) proxy: {
    //   "/api": {
    //     target: "http://localhost:3000", // 配置代理
    //     pathRewrite: { "/api": "" }
    //   }
    // }
  },
  mode: "production",
  entry: {
    home: "./src/index.js"
  },
  // 1）源码映射 会单独生成一个socurcemap文件，报错时，会标识道歉报错的列和行，大和全
  devtool: "source-map", // 映射文件，可以帮我们调试代码
  // 2) 不会产生单独的文件，但是可以显示行和列
  // devtool: "eval-source-map",
  // 3) 不会产生列，但是会生成一个单独的文件
  // devtool: "cheap-module-source-map",
  // 4) 不会产生文件，不会产生列，会集成在打包后的文件中
  // devtool: "cheap-module-eval-source-map",
  // watch: true,
  // watchOptions: {
  //   poll: 1000, // 每秒问我1000次
  //   aggregateTimeout: 500, // 防抖，我一直输入代码
  //   ignored: /node_modules/
  // }, // 监控的选项
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html"
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: __dirname + "/doc",
        to: __dirname + "/dist"
      }
    ]),
    new webpack.BannerPlugin("make 2020 by meng")
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  resolve: {
    // 解析第三方包
    modules: [path.resolve("node_modules")],
    mainFields: ["style", "main"],
    extensions: [".js", ".css", ".json", ".vue"]
    // mainFiles: [] // 入口文件名字 index.js
    // alias: {
    //   // 别名
    //   bootstrap: "bootstrap/dist/css/bootstrap.css"
    // }
  }
};
