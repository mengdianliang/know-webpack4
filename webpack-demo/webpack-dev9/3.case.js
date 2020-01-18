class SyncWaterfallHook {
  // 同步钩子
  constructor(args) {
    // args => ['name']
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    let [first, ...other] = this.tasks;
    let ret = first(...args);
    other.reduce((a, b) => {
      return b(a);
    }, ret);
  }
}
let hook = new SyncWaterfallHook(["name"]);
hook.tap("react", function(name) {
  console.log("react", name);
  return "reactok";
});
hook.tap("node", function(data) {
  console.log("node", data);
  return "nodeok";
});
hook.tap("webpack", function(data) {
  console.log("webpack", data);
});
hook.call("meng");
