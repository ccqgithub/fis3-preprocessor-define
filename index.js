// polyfill for RegExp.escape
function escapeReg(str) {
  return String(str).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

// 将配置转换为适合插入的代码
function toCode(code) {
  if (code === null) return "null";
  else if (code === undefined) return "undefined";
  else if (code instanceof RegExp && code.toString) return code.toString();
  else if (typeof code === "function" && code.toString) return "(" + code.toString() + ")";
  else if (typeof code === "object") return stringifyObj(code);
  else return code + "";
}

// 处理object
function stringifyObj(obj) {
  return "{" + Object.keys(obj).map(function(key) {
    var code = obj[key];
    return JSON.stringify(key) + ":" + toCode(code);
  }).join(",") + "}";
}

// exports
module.exports = function(content, file, conf) {
  if (typeof conf != "object") conf = {};
  if (typeof conf.defines != "object") conf.defines = {};
  if (!Array.isArray(conf.replacers)) conf.replacers = [];

  Object.keys(conf.defines).forEach(function(key) {
    var regStr = '((?:[^\.\\s]|^)\\s*)' + escapeReg(key);
    var reg = new RegExp(regStr, 'g');
    content = content.replace(reg, '$1' + toCode(conf.defines[key]));
  });

  conf.replacers.forEach(function(obj) {
    content = content.replace(obj.pattern, obj.replacer);
  });

  return content;
};
