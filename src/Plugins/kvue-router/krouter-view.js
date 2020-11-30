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
  //嵌套路由 由于 router-view多次使用，该方法多次执行，matched包含从上到下的所有route，
  //循环判断routerView，为真depth++，获取需要渲染的route
  //
  render(h) {
    this.$vnode.data.routerView = true;
    let depth = 0;
    let parent = this.$parent;
    //每次都需要从当前route-view的父节点循环到根节点，有没有必要优化？
    //网上循环直到父节点为null。
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          // 说明当前parent是一个router-view
          depth++;
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
