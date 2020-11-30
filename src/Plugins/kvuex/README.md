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

```javascript
//实现数据响应式。
this._vm = new _Vue({
  data() {
    return {
      $$state: options.state,
    };
  },
  computed,//getters数据
});
get state() {
  return this._vm._data.$$state ? this._vm._data.$$state : {};
}
set state(s) {
  console.error("please use replaceState to reset state");
}
```

## 4.store 容器，包含以上所有

## getter 实现

    类似计算属性
    实现原理：
    1.遍历getters，放入变量computed中，computed写入vue实例里。
    由于computed没有参数需要封装，升阶。
    2.定义getters，只有get使用Object.defineProperty.

```javascript
this._wrapppedGetters = options.getters;
//遍历options.getters往getters里写属性，只有get。
//Object.defineProperty劫持 get set

const computed = {};
this.getters = {};
const store = this;
if (options.getters) {
  Object.keys(this._wrapppedGetters).forEach((key) => {
    const fn = store._wrapppedGetters[key];
    computed[key] = function() {
      return fn(store.state);
    };
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
    });
  });
}
```

## commite dispatch 区别

    1.commite调用mutations
    2.dispatch调用actions, dispatch可以异步 .then()

```javascript
//调用mutations
  commit(type, payload) {
    const fn = this._mutations[type];
    if (!fn) {
      console.log("unknow mutation");
      return;
    }
    fn(this.state, payload);
  }

  //调用action，可以异步
  dispatch(type, payload) {
    const fn = this._actions[type];
    if (!fn) {
      console.log("unknow action");
      return;
    }
    //action可以返回一个promise ，所以区别commit需要返回执行结果
    //dispatch().then(()=>{})
    return fn(this, payload);
  }
```

## mutations action 区别

    1.mutations是同步的，是唯一更新state的方法，action更新需要调用commite
    2.action可以异步，返回一个promise。

## module

    数据变大后需要分类，同一类型或者同意作用的变量放入一个module，module定义和store一致，秩序在store.module引入即可。
