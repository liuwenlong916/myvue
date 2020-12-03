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

## Vue 类

1. 响应式处理
2. 数据代理，data/methods
3. 模板解析

## proxy 代理

1. 简化写法
2. vm.\$data.xx 代理为 vm.xx
3. vm.\$methods.xxx 代理为 vm.xxx

## 编译器 Compiler

1. 根据模板语法解析为浏览器识别的标签属性等。
2. 文本解析
3. 指令解析:v-text,v-html, v-model, @click 等
4. 生成视图元素标签与 Watcher 实例对应关系,
5. 更新视图函数(dom 操作)放入 Watcher 实例中，vue2.0 使用虚拟 dom。

## ObServer

1. 数据响应式处理，使用 Object.defineProperty,
2. 缺点无法拦截数组，需要手动重写数组更新方法（7 个）
3. vue3 使用 proxy，不再需要单独处理数组。
4. get 方法内，Watcher 与 Dep 实例对应关系，Dep 与字段关系一对一
5. set 方法出发 Dep.notify(),遍历与 Dep 关联的 Watcher 实例，执行 updateFn，更新视图元素标签，实现响应式。

## Watcher 小秘书

1. 与视图元素一对一
2. 更新视图方法。

## Dep 大管家

1. 与响应式数据属性一对一
2. 批量执行 Watcher 更新方法。

# 数组响应式

1. 找到数组原型
2. 重写更新修改数组的方法（7 个），使其可以通知更新
3. 新的原型设置到数组实例原型上
