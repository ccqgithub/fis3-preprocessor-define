function toCode(code) {
  if (code === null) return "null";
  else if (code === undefined) return "undefined";
  else if (code instanceof RegExp && code.toString) return code.toString();
  else if (typeof code === "function" && code.toString) return "(" + code.toString() + ")";
  else if (typeof code === "object") return stringifyObj(code);
  else return code + "";
}

function stringifyObj(obj) {
  return "{" + Object.keys(obj).map(function(key) {
    var code = obj[key];
    return JSON.stringify(key) + ":" + toCode(code);
  }).join(",") + "}";
}

function escapeReg(str) {
  return str.replace(/[\.\\\+\*\?\[\^\]\$\(\){}=!<>\|:\/]/g, '\\$&');
};

module.exports = function(content, file, conf) {
  var patternMap = {},
    pattern, arr, reg;

  if (typeof conf != "object") conf = {};

  arr = [];
  (function walkDefinitions(definitions, prefix) {
    Object.keys(definitions).forEach(function(key) {
      var code = definitions[key];
      patternMap[prefix + key] = code;
      arr.push("(" + escapeReg(prefix + key) + ")");
      if (code && typeof code === "object" && !(code instanceof RegExp)) {
        walkDefinitions(code, prefix + key + ".");
      }
    });
  })(conf, "");

  // reverse: 长的先匹配
  reg = new RegExp("[^\.\[]\s*" + arr.reverse().join("|") + "\s*[^\.\[]", "g");

  return content.replace(reg, function() {
    var args = [].slice.call(arguments, 1, arr.length + 1),
      key, i, len;

    for (i = 0, len = args.length; i < len; i++) {
      if (args[i] !== undefined) {
        key = args[i];
        break;
      }
    }

    return toCode(patternMap[key]);
  });
};
