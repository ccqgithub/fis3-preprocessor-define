var p = process;

var env = {"NODE_ENV":"production","TEST_FUN":(function () {
      alert(1)
    }),"TEST_OBJ":{"a":1,"b":3,"c":3},"test_obj":{"a":1}}

var node_env = "production";

var test_env ="test_env";

var test_fun = (function () {
      alert(1)
    });

var test_obj = {"a":1,"b":3,"c":3};

var test_other = process.env.TEST_OTHER;
