//数组响应式
const orginalProto = Array.prototype;
//备份，修改备份
const arrayProto = Object.create(orginalProto);
["push", "pop", "shift", "unshift"].forEach((method) => {
  arrayProto[method] = function() {
    //原始操作
    orginalProto[method].apply(this, arguments);
    //覆盖
    //视图更新操作。
    console.log("array 更新");
  };
});

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

  if (Array.isArray(obj)) {
    obj.__proto__ = arrayProto; //覆盖原型替换7个变更操作。
    //对数组内部响应式
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      observe(obj[i]);
    }
  }
  Object.keys(obj).forEach((key) => {
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
