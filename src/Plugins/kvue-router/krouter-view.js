// export default {
//   render(h) {
//     //当前this指向当前实例(router-view)
//     //mixin使所有vue实例都有$router;
//     const { routeMap, current } = this.$router; //VueRouter实例。

//     //使用$parent造成耦合。
//     // console.log(this.$parent.$options.router === this.$router);//true
//     const component = routeMap[current] ? routeMap[current] : null;
//     return h(component);
//   },
// };
export default {
  render(h) {
    this.$vnode.data.routerView = true;
    let depth = 0;
    let parent = this.$parent;

    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          // 说明当前parent是一个router-view
          depth++; //因为嵌套无限循环
        }
      }

      parent = parent.$parent;
    }
    let component = null;
    // const { matched, current } = this.$router; //VueRouter实例。
    const route = this.$router.matched[depth];
    if (route) {
      component = route.component;
    }
    return h(component);
  },
};
