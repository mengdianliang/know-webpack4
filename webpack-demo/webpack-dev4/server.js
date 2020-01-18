// express
let express = require("express");

let app = express();
// 中间件
let webpack = require("webpack");
let middle = require("webpack-dev-middleware");
let config = require("./webpack.config");
let complier = webpack(config);
app.use(middle(complier));
app.get("/user", (req, res) => {
  res.json({ name: "珠峰" });
});
app.listen(3000, function() {
  console.log("running...");
});
