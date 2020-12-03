class Compile {
  //el宿主实例，vm KVue实例
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;

    //解析模板
    this.compile(this.$el);
  }

  //解析
  compile(el) {
    el.childNodes.forEach((node) => {
      if (node.nodeType === 1) {
      } else if (this.isInter(node)) {
        // console.log("编译文本");
        this.compileText(node);
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
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }

  //编译元素 分析指令，@事件
  //编译标签元素属性 v-text v-html v-model @click等。
  compileElement(node) {
    //判断不同指令执行相应方法，更新
  }

  text(node, exp) {
    this.update(node, exp, "text");
  }
  textUpdater(node, val) {
    node.textContent = val;
  }
  //高阶函数,实例化Watcher
  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    fn && fn(node, this.$vm[exp]); //首次加载更新视图，

    //Watcher与node一一对应，把watcher实例push到dep里，字段更新后调用watcher.updateFn。
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val);
    });
  }

  //判断{{xx}}
  isInter(node) {
    //(.*)分组可以RegExp.$1获取内部内容
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  //判断指令 k-xxx
  isDirective(attr) {
    return attr.indexOf("k-") === 0; //以k-开头
  }
}
// export default Compile;
