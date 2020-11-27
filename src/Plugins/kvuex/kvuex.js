let _Vue;
//TODO 实现module
//1, state 添加子对象
//mutation/action/getters 直接添加
class Store {
  constructor(options) {
    //响应式state
    // this._state = options.state;
    this._vm = new _Vue({
      data() {
        return {
          $$state: options.state,
        };
      },
    });
    this._mutations = options.mutations;
    this._actions = options.actions; //actions内部调用commit 外层包裹异步，可以返回一个promise
    //为啥bind：dispatch异步时，this指向改变，手动绑定this，使用箭头函数也可以
    //bind，call apply区别
    //call,apply 立即指向，bind返回方法体
    //apply参数是数组形式。
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.getters = {};
    //遍历options.getters往getters里写属性，只有get。
    // Object.defineProperty劫持 get set
    if (options.getters) {
      Object.keys(options.getters).forEach((key) => {
        Object.defineProperty(this.getters, key, {
          get: () => {
            return options.getters[key](this.state);
          },
        });
      });
    }

    if (options.modules) {
      Object.keys(options.modules).forEach((key) => {
        this.state[key] = options.modules[key].state;
        // Object.defineProperty(this.state, key, {
        //   get: () => {
        //     return options.modules[key].state;
        //   },
        //   set:()=>{

        //   }
        // });
        this._mutations = {
          ...this._mutations,
          ...options.modules[key].mutations,
        };
        this._actions = {
          ...this._actions,
          ...options.modules[key].actions,
        };

        Object.keys(options.modules[key].getters).forEach((k) => {
          Object.defineProperty(this.getters, k, {
            get: () => {
              return options.modules[key].getters[k](this.state);
            },
          });
        });
      });
    }
  }

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
  get state() {
    return this._vm._data.$$state ? this._vm._data.$$state : {};
  }
  set state(s) {
    console.error("please use replaceState to reset state");
  }
}

function install(Vue) {
  _Vue = Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        console.log(this.$options.store);
        //使用this，this指向当前vue实例(所有被实例化的vue都会执行)
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

//使用：export default new Vuex.Store({});
//区分router插件
// export Router.install(){};
// export default Router;
//导出对象就是Vuex
export default { Store, install };
