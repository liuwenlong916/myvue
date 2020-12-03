//与视图显示属性一一对应

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;

    Dep.target = this;
    this.vm[key]; //调用get方法,
    Dep.target = null;
  }
  update() {
    //内部逻辑复杂后需要this指向vue实例，当前实例可以不更改。
    //this.updateFn.call(this.vm, this.vm[this.key]);
    this.updateFn(this.vm[this.key]);
  }
}

// export default Watcher;
