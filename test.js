var fs = require('fs');
var parse = require('./index');
var content = fs.readFileSync('./test/src.js');

var config = {
  defines: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'FUN': function() {
      console.log('fun');
    },
    OBJECT: {
      a: 'a',
      b: 'b',
      c: 'c'
    },
    STR: JSON.stringify('i am comming !'),
    NULL: null,
    UNDEFINED: undefined,
    TEST: 'window.test'
  },
  replacers: [
    {
      pattern: 'hello world !',
      replacer: 'HELLO WORLD !'
    },
    {
      pattern: /hello ([ABCD]) ([ABCD]) ([ABCD]) ([ABCD]) !/ig,
      replacer: function($0, $1, $2, $3, $4) {
        return 'hello ' + $1 + ' `I AM B` ' + $3 + ' ' + $4 + ' !';
      }
    }
  ]
};

content = String(content);
fs.writeFile('./test/build.js', parse(content, null, config));
