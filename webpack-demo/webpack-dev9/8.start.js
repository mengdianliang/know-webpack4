let { AsyncSeriesHook } = require("tapable");
// 异步串行钩子
// AsyncParallelBailHook 带保险的并发钩子, 多了一个error
class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(["name"])
    };
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tapPromise("node", name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("node", name);
          resolve();
        }, 1000);
      });
    });
    this.hooks.arch.tapPromise("react", name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("react", name);
          resolve();
        }, 1000);
      });
    });
  }
  start() {
    this.hooks.arch.promise("meng").then(function() {
      console.log("end");
    });
  }
}
let l = new Lesson();
l.tap(); // 注册了这两个事件
l.start(); // 启动钩子
