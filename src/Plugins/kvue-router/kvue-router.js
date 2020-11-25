import kVueLink from "./krouter-link";
import kVueView from "./krouter-view";

let _Vue;
//TODO 实现嵌套路由
class VueRouter {
  constructor(options) {
    this.routeMap = {};
    this.$options = options;
    this.$options.routes.forEach((item) => {
      this.routeMap[item.path.toLowerCase()] = item.component;
    });

    //定义响应的current，改变后更新view/
    //区分大小写
    const initial = window.location.hash.slice(1).toLowerCase() || "/";
    _Vue.util.defineReactive(this, "current", initial);
    //bind this否则onHashChanged 里this指向widnow
    window.addEventListener("hashchange", this.onHashChanged.bind(this));
  }
  onHashChanged() {
    this.current = window.location.hash.slice(1).toLowerCase();
  }
}

VueRouter.install = function(Vue) {
  //1.mixin挂载
  _Vue = Vue; //上面使用

  //会混入到所有vue实例中
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        //把router挂载到Vue上，所有Vue实例都有
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  //2.router-link全局组件
  Vue.component("router-link", kVueLink);
  //3.router-view
  Vue.component("router-view", kVueView);
};

export default VueRouter;
