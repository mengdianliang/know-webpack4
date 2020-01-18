function loader(source) {
  // loader的参数其实就是源码
  console.log("loader1----");
  return source;
}
loader.pich = function() {};
module.exports = loader;
