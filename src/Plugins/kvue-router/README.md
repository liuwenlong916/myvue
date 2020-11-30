    //调用
    import router from './kvue-router'
    Vue.use(router)

# 1. 实现 kvue-router.js 构造函数

    TODO
    1.install, 把router.js挂载到vue实例上$router
    2.监听url变化，监听方法需要bind(this)，
    3.生成url对应component集合对象。
    4.遍历routes数组，生成path对应component对象
    5.定义响应式数据Vue.util.defineReactive(this,current,'') ，也可以用new Vue的方式

# 2.install 方法(插件必须，使用插件 Vue.use())

    参数：Vue实例，options参数

## 1. mixin 挂载

    Vue.use()此时还没有vue实例，所以需要用mixin
    把router实例挂载到Vue上,所有Vue实例都有$router属性，避免使用$parent,解耦。
    Vue.prototype.$router = Vue.$options.router

## 2. 实现 router-link

    返回一个a标签
    使用 render(h)函数
    h函数== createElement
    h('a',{attr:{href:''}},[this.$slots.default])// 标签, 属性,子组件

## 2. 实现 router-view

    响应式数据current 跟新时重新渲染，根据current去routeMap查找compoent，新建的routeMap对象省去循环。
    根据url更新对应component

## router 嵌套实现原理

    1.根据当前路由地址，递归依次获取匹配的route
    如 /Home/About/Test，依次获取/Home /Home/About  /Home/About/Test三个route。

```javascript
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
```

    2.对router-view实例添加routerView标识，定义depth，依次网上查找父节点，
    routerView为true则depth++，matched[depth]获取组件。

```javascript
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
```
