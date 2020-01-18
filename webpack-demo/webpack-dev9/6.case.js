class AsyncParallelHook {
  // 异步钩子
  constructor(args) {
    // args => ['name']
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  callPromise(...args) {
    let tasks = this.tasks.map(task => {
      return task(...args);
    });
    return Promise.all(tasks);
  }
}
let hook = new AsyncParallelHook(["name"]);
let total = 0;
hook.tapPromise("react", function(name) {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      console.log("react", name);
      reslove();
    }, 1000);
  });
});
hook.tapPromise("node", function(name, cb) {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      console.log("node", name);
      reslove();
    }, 1000);
  });
});
hook.callPromise("meng").then(function() {
  console.log("end");
});
