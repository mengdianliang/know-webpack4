// 把外链的标签 变成内联的标签
const HtmlWebpackPlugin = require("html-webpack-plugin");
class InlineSourcePlugin {
  constructor({ match }) {
    this.reg = match;
  }
  processTag(tag, compilation) {
    let newTag, url;
    // 处理引入标签的数据
    if (tag.tagname === "link" && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: "style"
      };
      url = tag.attributes.href;
    }
    if (tag.tagname === "js" && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: "script"
      };
      url = tag.attributes.src;
    }
    if (url) {
      newTag.innerHTML = compilation.assets[url].source();
      delete compilation.assets[url];
      return newTag;
    }
    return tag;
  }
  processTags(data, compilation) {
    // 处理引入标签的数据
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach(headTag => {
      headTags.push(this.processTags(headTag, compilation));
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTags(bodyTag, compilation));
    });
    return { ...data, headTags, bodyTags };
  }
  apply(compiler) {
    // 要通过HtmlWebpackPlugin来实现这个功能
    compiler.hooks.compilation.tap("InlineSourcePlugin", compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        "alterPlugin",
        (data, cb) => {
          data = this.processTags(data, compilation);
          cb(null, data);
        }
      );
    });
  }
}
module.exports = InlineSourcePlugin;
