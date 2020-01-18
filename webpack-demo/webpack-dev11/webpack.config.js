let path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")]
    // 配别名
    // alias: {
    //   loader1: path.resolve(__dirname, "loaders", "loader1.js")
    // }
  },
  devtool: "source-map",
  watch: true,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.jpg$/,
        // 目的就是根据图片生成一个md5戳 发生到dist目录下，file-loader还会返回当前的图片路径
        // use: "file-loader"
        // url-loader 1) file-loader会处理路径
        use: {
          loader: "url-loader",
          options: {
            limit: 20 * 1024
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: "banner-loader",
          options: {
            text: "珠峰",
            filename: path.resolve(__dirname, "banner.js")
          }
        }
      }
    ]
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: "babel-loader",
    //       options: {
    //         presets: ["@babel/preset-env"]
    //       }
    //     }
    //   }
    // ]
    // loader加载顺序 pre + normal + inline + post
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: "loader1"
    //     },
    //     enforce: "pre"
    //   },
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: "loader2"
    //     }
    //   },
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: "loader3"
    //     },
    //     enforce: "post"
    //   }
    // ]
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: ["loader3", "loader2", "loader1"]
    //   }
    // ]
  }
};
