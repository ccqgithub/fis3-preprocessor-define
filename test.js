var fs = require('fs');
var parse = require('./index');
var content = fs.readFileSync('./test/src.js');

content = String(content);
fs.writeFile('./test/build.js', parse(content, null, {
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    TEST_FUN: function () {
      alert(1)
    },
    TEST_OBJ: {
      a: 1,
      b: 3,
      c: 3
    },
    test_obj: {
      a: 1
    }
  },
  'TEST_ENV': JSON.stringify('test_env')
}));
