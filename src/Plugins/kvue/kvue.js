// import ObServer from "ObServer.js";
// Cannot use import statement outside a module

//实现vue构造函数
//1.数据响应式
class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = this.$options.data;

    //响应式
    //TODO数组响应式如何实现/
    this.observe(this.$data);

    //代理
    proxy(this, "$data");
    //proxy(this,'$methods');

    //解析模板，视图显示
    new Compile(this.$options.el, this);
  }
  observe(obj) {
    //TODO数组如何响应式处理
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    //Observer,监听所有属性
    new ObServer(obj);
  }
}

//Compiler,解析
