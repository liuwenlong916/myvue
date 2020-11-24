let _Vue;
class store {
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
    this._actions = optins.actions;

    //为啥bind：dispatch异步时，this指向改变，手动绑定this，使用箭头函数也可以
    //bind，call apply区别
    //call,apply 立即指向，bind返回方法体
    //apply参数是数组形式。
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

  }

  //调用mutations
  commit(type, payload){
    const fn = this._mutations[type];
    if(!fn){
      
        console.log("unknow mutation");
        return;
    }
    fn(this.state, payload);
  }

  //调用action，可以异步
  dispatch(type, payload){
      const fn = this._mutations[type];
      if(!fn){
          console.log('unknow action');
          return;
      }
      return fn(this, payload);
  }
  get state() {
    return this._vm._data.$$state;
  }
  set state(){
      console.error('please use replaceState to reset state');
  }
}

function install(Vue) {
  _Vue = Vue;
  Vue.mixin({
    beforeCreate() {
      if (Vue.$options.store) {
        Vue.prototype.$store = Vue.$options.store;
      }
    },
  });
}

//使用：export default new Vuex.Store({});
//区分router插件
// export Router.install(){};
// export default Router;
export default { store, install };
