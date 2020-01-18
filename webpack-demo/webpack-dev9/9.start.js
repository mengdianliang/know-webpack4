let { AsyncSeriesWaterfallHook } = require("tapable");
// 异步串行钩子
// AsyncParallelBailHook 带保险的并发钩子, 多了一个error
class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(["name"])
    };
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tapAsync("node", (name, cb) => {
      setTimeout(() => {
        console.log("node", name);
        // cb(null, "result");
        cb("error", "result");
      }, 1000);
    });
    this.hooks.arch.tapAsync("react", (name, cb) => {
      setTimeout(() => {
        console.log("react", name);
        cb(null);
      }, 1000);
    });
  }
  start() {
    this.hooks.arch.callAsync("meng", function() {
      console.log("end");
    });
  }
}
let l = new Lesson();
l.tap(); // 注册了这两个事件
l.start(); // 启动钩子
