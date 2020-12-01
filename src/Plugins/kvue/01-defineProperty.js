//Object.defineProperty不支持数组，如何实现。
//Vue._util.defineReactive()

//利用闭包，val不会被释放
function defineReactive(obj, key, val) {
  observe(val); //递归，遍历对象内对象
  Object.defineProperty(obj, key, {
    get() {
      return val; //val在内存中，所以更新后被保存，再次获取时，是最新值
    },
    set(newVal) {
      if (val !== newVal) {
        observe(newVal); //observe内部判断是否是对象。
        val = newVal;
      }
    },
  });
}

function observe(obj) {
  if (typeof obj !== "object" || obj === undefined) {
    return obj;
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}
function set(obj, key, val) {
  defineReactive(obj, key, val);
}

// const obj = {};
// defineReactive(obj, "foo", "foo");

const obj = { foo: "fooo" };
observe(obj);

obj.foo; //get
obj.foo = "fopoooo"; //set

// obj.dong='dong';//直接设置不是响应式
set(obj, "dong", "dong"); //新增属性，响应式处理
