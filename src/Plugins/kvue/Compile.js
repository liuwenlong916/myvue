export default class Compile {
  //el宿主实例，vm KVue实例
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;

    //解析模板
    //
  }

  //解析
  compile(el) {
    el.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        console.log("element");
      } else if (this.isInter(node)) {
        console.log("编译文本");
      } //继续判断@开头，v-model等

      //递归
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
    //chilren和childNodes区别：childNode可以获取文本
    //NodeType == 1 >element
  }

  //编译方法。模板转视图。
  //编译文本
  compileText(node) {
    node.textContent = this.$vm[RegExp.$1];
  }

  //编译元素 分析指令，@事件

  //高阶函数,实例化Watcher
  update() {}

  //判断{{xx}}
  isInter(node) {
    //(.*)分组可以RegExp.$1获取内部内容
    return node.NodeType === 3 && /\{\{(,*)\}\}/;
  }

  //判断指令 k-xxx
  isDirective(attr) {
    return attr.indexOf("k-") === 0; //以k-开头
  }
}
