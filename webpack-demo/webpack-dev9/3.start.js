let { SyncWaterfallHook } = require("tapable");
// 瀑布，关联
class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(["name"])
    };
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tap("node", function(name) {
      console.log("node", name);
      return "node学的还不错";
    });
    this.hooks.arch.tap("react", function(data) {
      console.log("react", data);
    });
  }
  start() {
    this.hooks.arch.call("meng");
  }
}
let l = new Lesson();
l.tap(); // 注册了这两个事件
l.start(); // 启动钩子
