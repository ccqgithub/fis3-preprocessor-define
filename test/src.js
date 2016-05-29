if (process.env.NODE_ENV == 'test') {
  console.log('ha ha ha !')
}

// defines
var fun = FUN
var obj = OBJECT
var str = STR
var nul = NULL
var udf = UNDEFINED

// has prefix, not replace
var a = prefix.TEST
var b = prefix
.
TEST

// has suffix
var c = TEST.suffix
var d = TEST
.
suffix
var e = TEST['suffix']

// not suffix
var f = TEST
['suffix']

// replacers
var replaceA = 'hello world !';
var replaceB = 'hello A B C D !';
