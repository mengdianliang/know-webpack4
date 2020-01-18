import calc from "./test";
// import 在生产环境下，会自动去除掉没用的代码
// tree-shaking 把没用的代码自动删除掉
console.log(calc.sum(1, 2));
// es6模块 即require会把结果放到default上

// scope hosting 作用域提升
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c; // webpack会自动省略一些可以简化的代码
console.log(d, "------");
