class AsyncSeriesHook {
  // 异步钩子
  constructor(args) {
    // args => ['name']
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    let finalCallback = args.pop(); // 拿出最终的函数
    let index = 0;
    let next = () => {
      if (index === this.tasks.length) {
        finalCallback();
        return;
      }
      let task = this.tasks[index++];
      task(...args, next);
    };
    next();
  }
}
let hook = new AsyncSeriesHook(["name"]);
let total = 0;
hook.tapAsync("react", function(name, cb) {
  setTimeout(() => {
    console.log("react", name);
    cb();
  }, 1000);
});
hook.tapAsync("node", function(name, cb) {
  setTimeout(() => {
    console.log("node", name);
    cb();
  }, 1000);
});
hook.callAsync("meng", function() {
  console.log("end");
});
