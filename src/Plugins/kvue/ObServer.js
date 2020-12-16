class ObServer {
  constructor(val) {
    this.value = val;
    this.walk(val);
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      this.defineReactive(obj, key, obj[key]);
    });
  }

  defineReactive(obj, key, val) {
    //TODO 创建管家Dep，递归
    const dep = new Dep(); //闭包，内存驻留

    Object.defineProperty(obj, key, {
      get() {
        //TODO往管家内部添加小秘书Watcher，
        Dep.target && dep.addWatcher(Dep.target);
        return val;
      },
      set(newVal) {
        //TODO遍历管家内部的小秘书集合Watcher，执行watcher 的update函数。
        dep.notify();
        val = newVal; //利用闭包使val在内存驻留。
      },
    });
  }
}
// export default ObServer;
