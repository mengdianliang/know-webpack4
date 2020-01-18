let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let optimizeCss = require("optimize-css-assets-webpack-plugin");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  optimization: {
    // 优化项
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new optimizeCss()
    ]
  },
  devServer: {
    // 开发服务器的配置
    port: 3000,
    progress: true,
    contentBase: "./build",
    compress: true
  },
  mode: "development", // 模式 默认两种 production development
  entry: "./src/index.js", // 入口
  output: {
    filename: "bundle.[hash:8].js", // 打包后的文件名
    path: path.resolve(__dirname, "build") //路径必须是一个绝对路径
  },
  plugins: [
    // 数组，存放着webpack的插件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        // 压缩文件
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true // 折叠空行
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css"
    })
  ],
  externals: {
    jquery: "$"
  },
  module: {
    // 模块
    rules: [
      // 规则
      // loader默认从右向左，从下到上
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "eslint-loader",
      //     options: {
      //       enforce: "pre" // 强制先执行 post
      //     }
      //   }
      // },
      {
        test: /\.(htm|html)$/i,
        use: ["html-withimg-loader"]
      },
      // 可以限制大小，转化为base64,超过限制的，用file-loader处理
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              outputPath: "/img/",
              publicPath: "http://www.baidu.com",
              limit: 2 * 1024
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            //用babel-loader需要把es6-es5
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      // css-loader 解析@import语法
      // style-loader 把css插入到header中
      // loader执行顺序，默认从右向左执行
      // loader可以是一个字符串，数组，对象
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: "style-loader"
          // },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: "style-loader"
          // },
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  }
};
