export default {
  render(h) {
    //当前this指向当前实例(router-view)
    //mixin使所有vue实例都有$router;
    const { routeMap, current } = this.$router; //VueRouter实例。

    //使用$parent造成耦合。
    // console.log(this.$parent.$options.router === this.$router);//true
    const component = routeMap[current] ? routeMap[current] : null;
    return h(component);
  },
};
