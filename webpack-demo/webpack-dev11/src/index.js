console.log("loader");
// -！不会再让文件通过 pre + normal来处理了
// ! 没有normal
// !! 什么都不要
// let str = require("-!inline-loader!./a.js");

// loader 默认由两部分组成 pitch normal

// class Meng {
//   constructor() {
//     this.name = "meng";
//   }
//   getName() {
//     return this.name;
//   }
// }
// let meng = new Meng();
// console.log(meng.getName());

import p from "./193.jpg";
let img = document.createElement("img");
img.src = p;
document.body.appendChild(img);
import "./index.less";
