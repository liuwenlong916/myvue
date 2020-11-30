//Object.defineProperty
//Vue._util.defineReactive()

//利用闭包，val不会被释放
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
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
