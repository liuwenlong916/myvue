# MVVM 三要素

1. 数据响应式
   Proxy(Vue3),Object.defineProperty(Vu2)实现
2. 摸板语法
   插值：{{}}
   指令：v-model,v-bind,v-for,v-if

3. 渲染
   模板=>vdom=>dom

# kvue 实现

1. 实现 Vue 类
2. ObServer:数据响应式（数据类型：对象，数组如何拦截）
3. Complier:编译摸板，初始化视图，收集依赖，生成更新函数，watcher 创建
4. Watcher:执行更新函数
5. Dep:管理多个 Watcher，数据更新，批量更新(根据属性名称调用所有 Watcher)

# 数组响应式

1. 找到数组原型
2. 重写更新修改数组的方法（7 个），使其可以通知更新
3. 新的原型设置到数组实例原型上

##
