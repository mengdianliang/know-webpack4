function loader(source) {
  let style = `
  let style = dcoument.createElement('style');
  style.innerHTML = ${JSON.stringify(source)}
  document.head.appendChild(style)`;
  return style;
}
module.exports = loader;
