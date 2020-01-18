class AsyncSeriesWaterfallHook {
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
    let next = (err, data) => {
      let task = this.tasks[index];
      if (!task) return finalCallback();
      if (index === 0) {
        task(...args, next);
      } else {
        task(data, next);
      }
      index++;
    };
    next();
  }
}
let hook = new AsyncSeriesWaterfallHook(["name"]);
let total = 0;
hook.tapAsync("react", function(name, cb) {
  setTimeout(() => {
    console.log("react", name);
    cb(null, "结果");
  }, 1000);
});
hook.tapAsync("node", function(name, cb) {
  setTimeout(() => {
    console.log("node", name);
    cb(null);
  }, 1000);
});
hook.callAsync("meng", function() {
  console.log("end");
});
