//Object.defineProperty
//Vue._util.defineReactive()

//利用闭包，val不会被释放
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val; //val在内存中，所以更新后被保存，再次获取时，是最新值
    },
    set(newVal) {
      if (val !== newVal) {
        console.log("set", key);
        val = newVal;
      }
    },
  });
}

const obj = {};

defineReactive(obj, "foo", "foo");

obj.foo; //get
obj.foo = "fopoooo"; //set
