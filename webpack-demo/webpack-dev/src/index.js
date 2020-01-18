// expose-loader 暴漏全局的loader 内联的loader
// pre 前面执行的loader normal 普通的loader 内联的loader 后置postloader
import $ from "jquery";
console.log($);
console.log("hello");
require("./index.css");
require("./b.less");
require("@babel/polyfill");
let fn = () => {
  console.log("log");
};
fn();
@log
class A {
  a = 1;
}
let a = new A();
console.log(a.a);
function log(target) {
  console.log(target, "23");
}

function* gen(params) {
  yield 1;
}
console.log(gen().next());
"aaaaa".includes("a");
import fu from "./fu.jpg";
let image = new Image();
console.log(fu);
image.src = fu;
document.body.appendChild(image);
