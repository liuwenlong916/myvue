//与属性一一对应，管理多个Watcher
class Dep {
  constructor() {
    this.watchers = [];
  }

  addWatcher(watcher) {
    this.watchers.push(watcher);
  }
  //批量更新视图(Watcher集合)
  notify() {
    this.watchers.forEach((watcher) => {
      watcher.update();
    });
  }
}
// export default Dep;
