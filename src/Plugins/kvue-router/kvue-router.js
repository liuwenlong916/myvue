let _Vue;
//TODO 实现嵌套路由
class VueRouter {
  constructor(options) {
    this.routeMap = {};
    this.$options = options;
    this.$options.routes.forEach(item => {
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
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    render(h) {
      // console.log(this.$router);
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default,
      );
    },
  });
  //3.router-view
  Vue.component("router-view", {
    render(h) {
      //当前this指向当前实例(router-view)
      //mixin使所有vue实例都有$router;
      const { routeMap, current } = this.$router; //VueRouter实例。

      //使用$parent造成耦合。
      // console.log(this.$parent.$options.router === this.$router);//true
      const component = routeMap[current] ? routeMap[current] : null;
      return h(component);
    },
  });
};

export default VueRouter;
