if ("production" == 'test') {
  console.log('ha ha ha !')
}

// defines
var fun = (function () {
      console.log('fun');
    })
var obj = {"a":a,"b":b,"c":c}
var str = "i am comming !"
var nul = null
var udf = undefined

// has prefix, not replace
var a = prefix.TEST
var b = prefix
.
TEST

// has suffix
var c = window.test.suffix
var d = window.test
.
suffix
var e = window.test['suffix']

// not suffix
var f = window.test
['suffix']

// replacers
var replaceA = 'HELLO WORLD !';
var replaceB = 'hello A `I AM B` C D !';
