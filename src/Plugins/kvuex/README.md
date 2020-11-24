# 实现步骤

    1.定义一个 Store 类
        1.定义state
            响应式操作，可以使用new Vue({})或者defineReactive
            vue实例 data内部定义变量，添加$不会被代理
            定义get set禁止直接修改。
        2.实现dispatch commite方法
        3.bind action内部this为store实例。
        注意：区别commite, dispatch 传入的是store实例，因为异步需要返回
    2.定义一个方法 install
        1.mixin 混入 store
    3.导出{store, install}//配合使用方式 new Vuex.Store

## 1.state 状态、数据

## 2.mutations 更新状态函数

## 3.actions 异步操作

## 4.store 容器，包含以上所有

## getter

## commite dispatch 区别

## mutations action 区别

## module
