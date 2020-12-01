# MVVM 三要素

1. 数据响应式
   Proxy(Vue3),Object.defineProperty(Vu2)实现
2. 摸板语法
   插值：{{}}
   指令：v-model,v-bind,v-for,v-if

3. 渲染
   模板=>vdom=>dom

# kvue 实现

1. dep 与属性一对一，
2. watcher 与页面显示属性一对一，更新页面数据
3. Compile 编译器，编译模板，同时生成更新视图方法，赋到 watcher
