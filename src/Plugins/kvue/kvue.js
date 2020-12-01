import ObServer from "ObServer";

//实现vue构造函数
//1.数据响应式
class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = this.$options.data;

    //响应式
    //TODO数组响应式如何实现/
    new ObServer(this.$data);

    //代理
  }
}

new KVue();

//Observer,监听所有属性

//Compiler,解析
