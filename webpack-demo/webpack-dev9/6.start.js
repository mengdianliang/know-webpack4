let { AsyncParallelHook } = require("tapable");
// 异步的钩子 （串行）并行 需要等待所有并发的异步事件执行后再执行回调方法
// 同时发送多个请求
// 注册方法 分为 tap注册 tapAsync tapPromise
// AsyncParallelBailHook 带保险的并发钩子, 多了一个error
class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(["name"])
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
