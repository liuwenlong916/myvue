import kVueLink from "./krouter-link";
import kVueView from "./krouter-view";

let _Vue;
//TODO 实现嵌套路由
class VueRouter {
  constructor(options) {
    this.$options = options;
    // this.routeMap = {};
    // this.$options.routes.forEach((item) => {
    //   this.routeMap[item.path.toLowerCase()] = item.component;
    // });

    //定义响应的current，改变后更新view/
    //区分大小写
    // const initial = window.location.hash.slice(1).toLowerCase() || "/";
    // _Vue.util.defineReactive(this, "current", initial);
    //bind this否则onHashChanged 里this指向widnow
    window.addEventListener("hashchange", this.onHashChanged.bind(this));

    this.current = window.location.hash.slice(1) || "/";
    //当前matched只包含需要显示的route,如 地址是/Home/About，只包含 /Home和Home/About两个route.
    _Vue.util.defineReactive(this, "matched", []);
    this.match();
  }
  onHashChanged() {
    this.current = window.location.hash.slice(1);
    this.matched = [];
    this.match();
  }

  match(routes) {
    routes = routes || this.$options.routes;
    // 递归遍历
    for (const route of routes) {
      if (route.path === "/" && this.current === "/") {
        this.matched.push(route);
        return;
      }
      // /about/info
      if (route.path !== "/" && this.current.indexOf(route.path) != -1) {
        this.matched.push(route);
        if (route.children) {
          this.match(route.children);
        }
        return;
      }
    }
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
