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
